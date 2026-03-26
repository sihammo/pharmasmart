import { Request, Response } from "express";
import Medicine from "../models/Medicine";

export const getMedicines = async (req: Request, res: Response) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const createMedicine = async (req: Request, res: Response) => {
  try {
    const medicine = new Medicine(req.body);
    const createdMedicine = await medicine.save();
    res.status(201).json(createdMedicine);
  } catch (error: any) {
    res.status(400).json({ message: "Invalid data", error: error.message });
  }
};
