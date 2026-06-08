import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  duration: { type: String, required: true },
});

const prescriptionSchema = new mongoose.Schema(
  {
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pharmacyId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Assigned when patient sends it to a pharmacy
    medications: [medicationSchema],
    diagnosis: { type: String },
    notes: { type: String },
    status: { 
      type: String, 
      enum: ["ACTIVE", "SENT_TO_PHARMACY", "COMPLETED", "EXPIRED"], 
      default: "ACTIVE" 
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;
