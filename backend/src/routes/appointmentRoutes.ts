import express from "express";
import { protect, doctorOnly, customerOnly, adminOnly } from "../middleware/authMiddleware";
import {
  createAppointment,
  getDoctorAppointments,
  getTodayAppointments,
  updateAppointmentStatus,
  getPatientAppointments,
  adminCreateAppointment,
  getDoctorDashboardStats
} from "../controllers/appointmentController";

const router = express.Router();

router.post("/", protect, customerOnly, createAppointment);
router.post("/admin-assign", protect, adminOnly, adminCreateAppointment);
router.get("/doctor", protect, doctorOnly, getDoctorAppointments);
router.get("/doctor/today", protect, doctorOnly, getTodayAppointments);
router.get("/doctor/stats", protect, doctorOnly, getDoctorDashboardStats);
router.put("/:id/status", protect, updateAppointmentStatus);
router.get("/patient", protect, customerOnly, getPatientAppointments);

export default router;
