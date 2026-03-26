import express from "express";
import { getPharmacies, createPharmacy, updatePharmacy, deletePharmacy } from "../controllers/pharmacyController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/")
  .get(getPharmacies)
  .post(protect, adminOnly, createPharmacy);

router.route("/:id")
  .put(protect, adminOnly, updatePharmacy)
  .delete(protect, adminOnly, deletePharmacy);

export default router;
