import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// ✅ Fix OverwriteModelError by checking if model already exists
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
