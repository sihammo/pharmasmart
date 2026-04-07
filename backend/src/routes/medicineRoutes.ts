import express from "express";
import { getMedicines, createMedicine, updateMedicine, deleteMedicine, getMyMedicines } from "../controllers/medicineController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/pharmacy/:pharmacyId", getMyMedicines);

router.route("/")
  .get(getMedicines)
  .post(protect, createMedicine);

router.route("/:id")
  .put(protect, updateMedicine)
  .delete(protect, deleteMedicine);

export default router;
