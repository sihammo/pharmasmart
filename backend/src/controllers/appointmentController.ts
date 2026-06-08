import { Request, Response } from "express";
import Appointment from "../models/Appointment";
import User from "../models/User";
import Prescription from "../models/Prescription";

export const createAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { doctorId, date, time, reason } = req.body;
    const patientId = (req as any).user._id;

    const appointment = await Appointment.create({
      doctorId,
      patientId,
      date,
      time,
      reason
    });

    res.status(201).json(appointment);
  } catch (error: any) {
    res.status(500).json({ message: "Error creating appointment", error: error.message });
  }
};

export const adminCreateAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { doctorId, patientId, date, time, reason, notes } = req.body;

    const appointment = await Appointment.create({
      doctorId,
      patientId,
      date,
      time,
      reason,
      notes
    });

    res.status(201).json(appointment);
  } catch (error: any) {
    res.status(500).json({ message: "Error creating appointment by admin", error: error.message });
  }
};

export const getDoctorDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctorId = (req as any).user._id;
    const today = new Date().toISOString().split("T")[0];

    const todayAppointments = await Appointment.find({ doctorId, date: today });
    const completedConsultations = todayAppointments.filter(a => a.status === "COMPLETED").length;
    const pendingAppointments = todayAppointments.filter(a => a.status === "SCHEDULED" || a.status === "PENDING" || a.status === "IN_PROGRESS").length;
    
    const prescriptionsCount = await Prescription.countDocuments({ doctorId });

    res.json({
      patientsToday: todayAppointments.length,
      completedConsultations,
      pendingAppointments,
      prescriptionsSent: prescriptionsCount
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error getting doctor statistics", error: error.message });
  }
};

export const getDoctorAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctorId = (req as any).user._id;
    const appointments = await Appointment.find({ doctorId })
      .populate("patientId", "name email phone healthProfile")
      .sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching appointments", error: error.message });
  }
};

export const getTodayAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctorId = (req as any).user._id;
    const today = new Date().toISOString().split("T")[0];
    
    const appointments = await Appointment.find({ doctorId, date: today })
      .populate("patientId", "name email phone healthProfile")
      .sort({ time: 1 });
    res.json(appointments);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching today's appointments", error: error.message });
  }
};

export const updateAppointmentStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("patientId").populate("doctorId");
    
    if (appointment) {
      try {
        const { getIO } = require("../socket");
        const io = getIO();
        io.to(appointment.patientId._id.toString()).emit("appointment_status_update", appointment);
        io.to(appointment.doctorId._id.toString()).emit("appointment_status_update", appointment);
      } catch (err) {
        console.error("Socket emit failed", err);
      }
    }

    res.json(appointment);
  } catch (error: any) {
    res.status(500).json({ message: "Error updating appointment", error: error.message });
  }
};

export const getPatientAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const patientId = (req as any).user._id;
    const appointments = await Appointment.find({ patientId })
      .populate("doctorId", "name specialization")
      .sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching appointments", error: error.message });
  }
};
