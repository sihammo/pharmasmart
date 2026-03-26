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
