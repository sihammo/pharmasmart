import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "CUSTOMER", "PHARMACY_OWNER"], default: "CUSTOMER" },
    phone: { type: String },
    address: { type: String },
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
