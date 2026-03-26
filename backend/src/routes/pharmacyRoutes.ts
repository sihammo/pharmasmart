import express from "express";
import { getPharmacies, createPharmacy } from "../controllers/pharmacyController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(getPharmacies).post(protect, createPharmacy);

export default router;
