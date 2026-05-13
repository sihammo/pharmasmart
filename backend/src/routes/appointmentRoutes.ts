import express from "express";
import { protect, doctorOnly, customerOnly } from "../middleware/authMiddleware";
import {
  createAppointment,
  getDoctorAppointments,
  getTodayAppointments,
  updateAppointmentStatus,
  getPatientAppointments
} from "../controllers/appointmentController";

const router = express.Router();

router.post("/", protect, customerOnly, createAppointment);
router.get("/doctor", protect, doctorOnly, getDoctorAppointments);
router.get("/doctor/today", protect, doctorOnly, getTodayAppointments);
router.put("/:id/status", protect, updateAppointmentStatus);
router.get("/patient", protect, customerOnly, getPatientAppointments);

export default router;
