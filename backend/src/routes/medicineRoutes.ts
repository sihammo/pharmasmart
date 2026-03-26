import express from "express";
import { getMedicines, createMedicine, updateMedicine, deleteMedicine } from "../controllers/medicineController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/")
  .get(getMedicines)
  .post(protect, createMedicine); // Will add logic to controller for ownership check

router.route("/:id")
  .put(protect, updateMedicine)
  .delete(protect, deleteMedicine);

export default router;
