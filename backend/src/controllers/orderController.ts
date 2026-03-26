import { Request, Response } from "express";
import Order from "../models/Order";

export const createOrder = async (req: Request | any, res: Response) => {
  try {
    const { pharmacyId, items, totalAmount, prescriptionUrl } = req.body;
    
    if (items && items.length === 0) {
      res.status(400).json({ message: "No order items" });
      return;
    }

    const order = new Order({
      userId: req.user._id,
      pharmacyId,
      items,
      totalAmount,
      prescriptionUrl,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserOrders = async (req: Request | any, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate("pharmacyId", "name address");
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
