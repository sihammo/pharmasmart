import { Request, Response } from "express";
import Prescription from "../models/Prescription";
import Appointment from "../models/Appointment";

export const createPrescription = async (req: Request, res: Response): Promise<void> => {
  try {
    const { patientId, medications, notes, appointmentId } = req.body;
    const doctorId = (req as any).user._id;

    const prescription = await Prescription.create({
      doctorId,
      patientId,
      medications,
      notes
    });

    if (appointmentId) {
      await Appointment.findByIdAndUpdate(appointmentId, { status: "COMPLETED" });
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
    const prescription = await Prescription.findById(prescriptionId);

    if (!prescription) {
      res.status(404).json({ message: "Prescription not found" });
      return;
    }

    prescription.pharmacyId = pharmacyId;
    prescription.status = "SENT_TO_PHARMACY";
    await prescription.save();

    res.json(prescription);
  } catch (error: any) {
    res.status(500).json({ message: "Error sending prescription", error: error.message });
  }
};

export const getPharmacyPrescriptions = async (req: Request, res: Response): Promise<void> => {
  try {
    const pharmacyId = (req as any).user._id;
    const prescriptions = await Prescription.find({ pharmacyId, status: "SENT_TO_PHARMACY" })
      .populate("doctorId", "name specialization")
      .populate("patientId", "name email phone");
    res.json(prescriptions);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching prescriptions", error: error.message });
  }
};
