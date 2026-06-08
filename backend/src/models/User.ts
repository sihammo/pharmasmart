import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "CUSTOMER", "PHARMACY_OWNER", "DOCTOR"], default: "CUSTOMER" },
    phone: { type: String },
    address: { type: String },
    specialization: { type: String },
    licenseNumber: { type: String },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
    schedule: {
      days: [{ type: String }], // e.g. ["Monday", "Tuesday"]
      timeSlots: [{ type: String }] // e.g. ["09:00", "10:00", "11:00"]
    },
    healthProfile: {
      conditions: [{ type: String }],
      allergies: [{ type: String }],
      medications: [{ type: String }],
      bloodType: { type: String },
      emergencyContact: {
        name: { type: String },
        relationship: { type: String },
        phone: { type: String },
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
