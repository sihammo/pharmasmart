import mongoose from "mongoose";

const pharmacyPrescriptionSchema = new mongoose.Schema(
  {
    prescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: "Prescription", required: true },
    pharmacyId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["Received", "Processing", "Ready for Pickup", "Completed"],
      default: "Received"
    },
    pharmacistNotes: { type: String, default: "" },
    sentAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const PharmacyPrescription = mongoose.model("PharmacyPrescription", pharmacyPrescriptionSchema);
export default PharmacyPrescription;
