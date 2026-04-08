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
exports.updateMyPharmacy = exports.getMyPharmacy = exports.deletePharmacy = exports.updatePharmacy = exports.createPharmacy = exports.getPharmacies = void 0;
const Pharmacy_1 = __importDefault(require("../models/Pharmacy"));
const getPharmacies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pharmacies = yield Pharmacy_1.default.find();
        res.json(pharmacies);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});
exports.getPharmacies = getPharmacies;
const createPharmacy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existing = yield Pharmacy_1.default.findOne({ ownerId: req.user._id });
        if (existing && req.user.role !== "ADMIN") {
            return res.status(400).json({ message: "You already have a pharmacy registered" });
        }
        const pharmacyData = Object.assign(Object.assign({}, req.body), { ownerId: req.user.role === "ADMIN" ? (req.body.ownerId || req.user._id) : req.user._id });
        const pharmacy = new Pharmacy_1.default(pharmacyData);
        const createdPharmacy = yield pharmacy.save();
        res.status(201).json(createdPharmacy);
    }
    catch (error) {
        res.status(400).json({ message: "Invalid data", error: error.message });
    }
});
exports.createPharmacy = createPharmacy;
const updatePharmacy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pharmacy = yield Pharmacy_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pharmacy)
            return res.status(404).json({ message: "Pharmacy not found" });
        res.json(pharmacy);
    }
    catch (error) {
        res.status(400).json({ message: "Update failed", error: error.message });
    }
});
exports.updatePharmacy = updatePharmacy;
const deletePharmacy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pharmacy = yield Pharmacy_1.default.findByIdAndDelete(req.params.id);
        if (!pharmacy)
            return res.status(404).json({ message: "Pharmacy not found" });
        res.json({ message: "Pharmacy deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Delete failed", error: error.message });
    }
});
exports.deletePharmacy = deletePharmacy;
const getMyPharmacy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pharmacy = yield Pharmacy_1.default.findOne({ ownerId: req.user._id });
        if (!pharmacy) {
            return res.status(404).json({ message: "No pharmacy found for this owner" });
        }
        res.json(pharmacy);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});
exports.getMyPharmacy = getMyPharmacy;
const updateMyPharmacy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pharmacy = yield Pharmacy_1.default.findOneAndUpdate({ ownerId: req.user._id }, req.body, { new: true });
        if (!pharmacy)
            return res.status(404).json({ message: "Pharmacy not found" });
        res.json(pharmacy);
    }
    catch (error) {
        res.status(400).json({ message: "Update failed", error: error.message });
    }
});
exports.updateMyPharmacy = updateMyPharmacy;
