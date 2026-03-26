import express from "express";
import { getMedicines, createMedicine } from "../controllers/medicineController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(getMedicines).post(protect, createMedicine);

export default router;
