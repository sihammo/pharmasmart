import express from "express";
import { protect, doctorOnly, customerOnly, pharmacyOnly } from "../middleware/authMiddleware";
import {
  createPrescription,
  getDoctorPrescriptions,
  getPatientPrescriptions,
  sendPrescriptionToPharmacy,
  getPharmacyPrescriptions,
  updatePharmacyPrescriptionStatus,
  getPatientSentPrescriptions
} from "../controllers/prescriptionController";

const router = express.Router();

router.post("/", protect, doctorOnly, createPrescription);
router.get("/doctor", protect, doctorOnly, getDoctorPrescriptions);
router.get("/patient", protect, customerOnly, getPatientPrescriptions);
router.get("/patient/tracking", protect, customerOnly, getPatientSentPrescriptions);
router.post("/send-to-pharmacy", protect, customerOnly, sendPrescriptionToPharmacy);
router.get("/pharmacy", protect, pharmacyOnly, getPharmacyPrescriptions);
router.put("/pharmacy/:id/status", protect, pharmacyOnly, updatePharmacyPrescriptionStatus);

export default router;
