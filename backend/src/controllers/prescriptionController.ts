import { Request, Response } from "express";
import Prescription from "../models/Prescription";
import Appointment from "../models/Appointment";
import PharmacyPrescription from "../models/PharmacyPrescription";

export const createPrescription = async (req: Request, res: Response): Promise<void> => {
  try {
    const { patientId, medications, diagnosis, notes, appointmentId } = req.body;
    const doctorId = (req as any).user._id;

    const prescription = await Prescription.create({
      doctorId,
      patientId,
      medications,
      diagnosis,
      notes
    });

    if (appointmentId) {
      await Appointment.findByIdAndUpdate(appointmentId, { status: "COMPLETED" });
    }

    try {
      const { getIO } = require("../socket");
      const io = getIO();
      io.to(patientId.toString()).emit("new_prescription", prescription);
    } catch (err) {
      console.error("Socket emit failed", err);
    }

    res.status(201).json(prescription);
  } catch (error: any) {
    res.status(500).json({ message: "Error creating prescription", error: error.message });
  }
};

export const getDoctorPrescriptions = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctorId = (req as any).user._id;
    const prescriptions = await Prescription.find({ doctorId }).populate("patientId", "name email");
    res.json(prescriptions);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching prescriptions", error: error.message });
  }
};

export const getPatientPrescriptions = async (req: Request, res: Response): Promise<void> => {
  try {
    const patientId = (req as any).user._id;
    const prescriptions = await Prescription.find({ patientId }).populate("doctorId", "name specialization").populate("pharmacyId", "name address");
    res.json(prescriptions);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching prescriptions", error: error.message });
  }
};

export const sendPrescriptionToPharmacy = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prescriptionId, pharmacyId } = req.body;
    const patientId = (req as any).user._id;
    const prescription = await Prescription.findById(prescriptionId);

    if (!prescription) {
      res.status(404).json({ message: "Prescription not found" });
      return;
    }

    prescription.pharmacyId = pharmacyId;
    prescription.status = "SENT_TO_PHARMACY";
    await prescription.save();

    // Create PharmacyPrescription record
    const pharmacyPresc = await PharmacyPrescription.create({
      prescriptionId,
      pharmacyId,
      patientId,
      status: "Received"
    });

    try {
      const { getIO } = require("../socket");
      const io = getIO();
      // Notify pharmacy about new prescription
      io.to(pharmacyId.toString()).emit("new_pharmacy_prescription", pharmacyPresc);
    } catch (err) {
      console.error("Socket emit failed", err);
    }

    res.json(pharmacyPresc);
  } catch (error: any) {
    res.status(500).json({ message: "Error sending prescription", error: error.message });
  }
};

export const getPharmacyPrescriptions = async (req: Request, res: Response): Promise<void> => {
  try {
    const pharmacyId = (req as any).user._id;
    const prescriptions = await PharmacyPrescription.find({ pharmacyId })
      .populate({
        path: "prescriptionId",
        populate: { path: "doctorId", select: "name specialization email phone" }
      })
      .populate("patientId", "name email phone");
    res.json(prescriptions);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching prescriptions", error: error.message });
  }
};

export const updatePharmacyPrescriptionStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, pharmacistNotes } = req.body;
    const pharmacyPresc = await PharmacyPrescription.findByIdAndUpdate(
      req.params.id,
      { status, pharmacistNotes },
      { new: true }
    ).populate("patientId").populate("pharmacyId");

    if (pharmacyPresc) {
      try {
        const { getIO } = require("../socket");
        const io = getIO();
        // Notify patient about pharmacy status update
        io.to(pharmacyPresc.patientId._id.toString()).emit("prescription_pharmacy_status_update", pharmacyPresc);
      } catch (err) {
        console.error("Socket emit failed", err);
      }
    }

    res.json(pharmacyPresc);
  } catch (error: any) {
    res.status(500).json({ message: "Error updating pharmacy prescription status", error: error.message });
  }
};

export const getPatientSentPrescriptions = async (req: Request, res: Response): Promise<void> => {
  try {
    const patientId = (req as any).user._id;
    const records = await PharmacyPrescription.find({ patientId })
      .populate("pharmacyId", "name address")
      .populate("prescriptionId");
    res.json(records);
  } catch (error: any) {
    res.status(500).json({ message: "Error getting tracking records", error: error.message });
  }
};
