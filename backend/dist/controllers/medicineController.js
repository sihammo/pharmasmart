"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyMedicines = exports.deleteMedicine = exports.createMedicine = exports.updateMedicine = exports.getMedicines = void 0;
const Medicine_1 = __importDefault(require("../models/Medicine"));
const getMedicines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medicines = yield Medicine_1.default.find().populate("pharmacyId", "name address");
        res.json(medicines);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});
exports.getMedicines = getMedicines;
const updateMedicine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medicine = yield Medicine_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!medicine)
            return res.status(404).json({ message: "Medicine not found" });
        res.json(medicine);
    }
    catch (error) {
        res.status(400).json({ message: "Update failed", error: error.message });
    }
});
exports.updateMedicine = updateMedicine;
const createMedicine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medicine = new Medicine_1.default(req.body);
        const createdMedicine = yield medicine.save();
        res.status(201).json(createdMedicine);
    }
    catch (error) {
        res.status(400).json({ message: "Invalid data", error: error.message });
    }
});
exports.createMedicine = createMedicine;
const deleteMedicine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medicine = yield Medicine_1.default.findByIdAndDelete(req.params.id);
        if (!medicine)
            return res.status(404).json({ message: "Medicine not found" });
        res.json({ message: "Medicine deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Delete failed", error: error.message });
    }
});
exports.deleteMedicine = deleteMedicine;
const getMyMedicines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medicines = yield Medicine_1.default.find({ pharmacyId: req.params.pharmacyId }).populate("pharmacyId", "name");
        res.json(medicines);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});
exports.getMyMedicines = getMyMedicines;
