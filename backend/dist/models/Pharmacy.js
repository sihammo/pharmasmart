"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const pharmacySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    ownerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    isApproved: { type: Boolean, default: true },
    location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], index: "2dsphere" } // [longitude, latitude]
    },
    openingHours: {
        open: { type: String, default: "08:00" },
        close: { type: String, default: "22:00" }
    }
}, { timestamps: true });
const Pharmacy = mongoose_1.default.model("Pharmacy", pharmacySchema);
exports.default = Pharmacy;
