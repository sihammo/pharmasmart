import express from "express";
import { createOrder, getUserOrders, getAllOrders, updateOrderStatus, getPharmacyOrders, getIncomingOrders } from "../controllers/orderController";
import { protect, adminOnly, customerOnly } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/")
  .post(protect, customerOnly, createOrder)
  .get(protect, adminOnly, getAllOrders);

router.get("/myorders", protect, getUserOrders);
router.get("/incoming", protect, getIncomingOrders);
router.get("/pharmacy/:pharmacyId", protect, getPharmacyOrders);

router.put("/:id/status", protect, updateOrderStatus);

export default router;
