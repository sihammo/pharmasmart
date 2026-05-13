import express from "express";
import { protect, doctorOnly, customerOnly, pharmacyOnly } from "../middleware/authMiddleware";
import {
  createPrescription,
  getDoctorPrescriptions,
  getPatientPrescriptions,
  sendPrescriptionToPharmacy,
  getPharmacyPrescriptions
} from "../controllers/prescriptionController";

const router = express.Router();

router.post("/", protect, doctorOnly, createPrescription);
router.get("/doctor", protect, doctorOnly, getDoctorPrescriptions);
router.get("/patient", protect, customerOnly, getPatientPrescriptions);
router.post("/send-to-pharmacy", protect, customerOnly, sendPrescriptionToPharmacy);
router.get("/pharmacy", protect, pharmacyOnly, getPharmacyPrescriptions);

export default router;
