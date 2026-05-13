import { Request, Response } from "express";
import Appointment from "../models/Appointment";
import User from "../models/User";

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
    );
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
