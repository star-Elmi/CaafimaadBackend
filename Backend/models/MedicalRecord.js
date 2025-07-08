import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  filename: String,
  originalname: String,
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("MedicalRecord", medicalRecordSchema);
