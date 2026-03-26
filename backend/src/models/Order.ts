import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pharmacyId: { type: mongoose.Schema.Types.ObjectId, ref: "Pharmacy", required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["PENDING", "ACCEPTED", "READY", "DELIVERED", "CANCELLED"], default: "PENDING" },
    prescriptionUrl: { type: String }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
