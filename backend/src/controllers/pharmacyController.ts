import { Request, Response } from "express";
import Pharmacy from "../models/Pharmacy";

export const getPharmacies = async (req: Request, res: Response) => {
  try {
    const pharmacies = await Pharmacy.find({ isApproved: true });
    res.json(pharmacies);
  } catch (error: any) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const createPharmacy = async (req: Request, res: Response) => {
  try {
    const pharmacy = new Pharmacy(req.body);
    const createdPharmacy = await pharmacy.save();
    res.status(201).json(createdPharmacy);
  } catch (error: any) {
    res.status(400).json({ message: "Invalid data", error: error.message });
  }
};

export const updatePharmacy = async (req: Request, res: Response) => {
  try {
    const pharmacy = await Pharmacy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pharmacy) return res.status(404).json({ message: "Pharmacy not found" });
    res.json(pharmacy);
  } catch (error: any) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};

export const deletePharmacy = async (req: Request, res: Response) => {
  try {
    const pharmacy = await Pharmacy.findByIdAndDelete(req.params.id);
    if (!pharmacy) return res.status(404).json({ message: "Pharmacy not found" });
    res.json({ message: "Pharmacy deleted" });
  } catch (error: any) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};

