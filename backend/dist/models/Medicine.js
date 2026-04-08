"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const medicineSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    pharmacyId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Pharmacy", required: true },
    category: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true, default: 0 },
    imageUrl: { type: String },
    requiresPrescription: { type: Boolean, default: false }
}, { timestamps: true });
const Medicine = mongoose_1.default.model("Medicine", medicineSchema);
exports.default = Medicine;
