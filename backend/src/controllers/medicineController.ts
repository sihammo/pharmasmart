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

export const updateMedicine = async (req: Request, res: Response) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });
    res.json(medicine);
  } catch (error: any) {
    res.status(400).json({ message: "Update failed", error: error.message });
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

export const deleteMedicine = async (req: Request, res: Response) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });
    res.json({ message: "Medicine deleted" });
  } catch (error: any) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};
