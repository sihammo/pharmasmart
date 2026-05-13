import { Request, Response } from "express";
import Appointment from "../models/Appointment";

export const createAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { doctorId, date, time, reason } = req.body;
    const patientId = (req as any).user._id;

    const appointment = new Appointment({
      doctorId,
      patientId,
      date,
      time,
      reason,
      status: "SCHEDULED"
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (error: any) {
    res.status(500).json({ message: "Error creating appointment", error: error.message });
  }
};

export const getDoctorAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctorId = (req as any).user._id;
    const appointments = await Appointment.find({ doctorId }).populate("patientId", "name email phone");
    res.json(appointments);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching appointments", error: error.message });
  }
};

export const getTodayAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctorId = (req as any).user._id;
    const today = new Date().toISOString().split("T")[0];
    const appointments = await Appointment.find({ 
      doctorId, 
      date: today,
      status: { $ne: "CANCELLED" }
    }).populate("patientId", "name email phone");
    res.json(appointments);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching today's appointments", error: error.message });
  }
};

export const updateAppointmentStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
    res.json(appointment);
  } catch (error: any) {
    res.status(500).json({ message: "Error updating appointment", error: error.message });
  }
};

export const getPatientAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const patientId = (req as any).user._id;
    const appointments = await Appointment.find({ patientId }).populate("doctorId", "name specialization");
    res.json(appointments);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching your appointments", error: error.message });
  }
};
