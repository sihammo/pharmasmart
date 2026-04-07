import express from "express";
import { getPharmacies, createPharmacy, updatePharmacy, deletePharmacy, getMyPharmacy, updateMyPharmacy } from "../controllers/pharmacyController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/my-pharmacy")
  .get(protect, getMyPharmacy)
  .put(protect, updateMyPharmacy);

router.route("/")
  .get(getPharmacies)
  .post(protect, createPharmacy);

router.route("/:id")
  .put(protect, updatePharmacy)
  .delete(protect, adminOnly, deletePharmacy);

export default router;
