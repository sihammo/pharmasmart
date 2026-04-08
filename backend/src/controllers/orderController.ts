import { Request, Response } from "express";
import Order from "../models/Order";
import Medicine from "../models/Medicine";
import Pharmacy from "../models/Pharmacy";
import { getIO } from "../socket";

export const createOrder = async (req: Request | any, res: Response) => {
  try {
    const { pharmacyId, items, totalAmount, prescriptionUrl } = req.body;
    
    if (req.user.role !== "CUSTOMER") {
      res.status(403).json({ message: "Only customers can place new orders" });
      return;
    }

    if (!items || items.length === 0) {
      res.status(400).json({ message: "No order items" });
      return;
    }

    // 1. Check stock availability for all items
    for (const item of items) {
      const medicine = await Medicine.findById(item.medicineId);
      if (!medicine) {
        res.status(404).json({ message: `Medicine not found: ${item.name}` });
        return;
      }
      if (medicine.stockQuantity < item.quantity) {
        res.status(400).json({ message: `Insufficient stock for ${medicine.name}. Available: ${medicine.stockQuantity}` });
        return;
      }
    }

    // 2. Reduce stock and create order
    const order = new Order({
      userId: req.user._id,
      pharmacyId,
      items,
      totalAmount,
      prescriptionUrl,
      status: "PENDING"
    });

    const createdOrder = await order.save();

    // Deduct from stock
    for (const item of items) {
      await Medicine.findByIdAndUpdate(item.medicineId, {
        $inc: { stockQuantity: -item.quantity }
      });
    }

    // 3. Emit real-time notification to the Pharmacy
    try {
      getIO().to(pharmacyId).emit("new_order", createdOrder);
    } catch (socketError) {
      console.error("Socket error on order creation:", socketError);
    }

    res.status(201).json(createdOrder);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserOrders = async (req: Request | any, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate("pharmacyId", "name address")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({})
      .populate("userId", "name email")
      .populate("pharmacyId", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getPharmacyOrders = async (req: Request | any, res: Response) => {
  try {
    const orders = await Order.find({ pharmacyId: req.params.pharmacyId })
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateOrderStatus = async (req: Request | any, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Allow if ADMIN or if user is the PHARMACY_OWNER of this pharmacy
    if (req.user.role !== "ADMIN") {
      const pharmacy = await Pharmacy.findById(order.pharmacyId);
      if (!pharmacy || pharmacy.ownerId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized to update this order" });
      }
    }

    order.status = req.body.status;
    await order.save();
    
    res.json(order);
  } catch (error: any) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};
