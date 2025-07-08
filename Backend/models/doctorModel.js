import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String, // store image URL
    default: "",
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
