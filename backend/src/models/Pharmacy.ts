import mongoose from "mongoose";

const pharmacySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], index: "2dsphere" } // [longitude, latitude]
    },
    openingHours: {
      open: { type: String, default: "08:00" },
      close: { type: String, default: "22:00" }
    }
  },
  { timestamps: true }
);

const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);
export default Pharmacy;
