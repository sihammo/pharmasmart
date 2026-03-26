import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Order from "../models/Order";
import Medicine from "../models/Medicine";
import Pharmacy from "../models/Pharmacy";
import { startOfMonth, endOfMonth } from "date-fns";


const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || "default_dev_secret", {
    expiresIn: "30d",
  });
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, phone, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteUser = async (req: any, res: Response): Promise<void> => {
  try {
    // Prevent self-deletion
    if (req.user && req.user._id.toString() === req.params.id) {
       res.status(400).json({ message: "Administrators cannot delete their own accounts." });
       return;
    }

    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: "User removed" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalMedicines = await Medicine.countDocuments();
    const totalPharmacies = await Pharmacy.countDocuments();
    
    const revenueData = await Order.aggregate([
      { $match: { status: "Completed" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const totalRevenue = revenueData[0]?.total || 0;

    const recentOrders = await Order.find()
      .populate("userId", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    const pharmacies = await Pharmacy.find({});

    res.json({
      stats: [
        { title: "Total Users", value: totalUsers.toString(), change: "+5%", trend: "up", icon: "Users", color: "#0F766E" },
        { title: "Total Orders", value: totalOrders.toString(), change: "+8%", trend: "up", icon: "ShoppingBag", color: "#2F8F7E" },
        { title: "Medicines", value: totalMedicines.toString(), change: "+2%", trend: "up", icon: "Pill", color: "#5FA79A" },
        { title: "Revenue", value: `$${totalRevenue.toFixed(2)}`, change: "+12%", trend: "up", icon: "DollarSign", color: "#0F766E" },
        { title: "Pharmacies", value: totalPharmacies.toString(), change: "+4%", trend: "up", icon: "MapPin", color: "#2F8F7E" },
        { title: "Growth Rate", value: "15.5%", change: "+2%", trend: "up", icon: "TrendingUp", color: "#5FA79A" },
      ],
      recentOrders,
      pharmacies
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


