import express from "express";
import { createOrder, getUserOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/")
  .post(protect, createOrder)
  .get(protect, adminOnly, getAllOrders);

router.get("/myorders", protect, getUserOrders);

router.put("/:id/status", protect, adminOnly, updateOrderStatus);

export default router;
