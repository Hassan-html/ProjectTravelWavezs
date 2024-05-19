import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, "Please provide username"] },
  email: {
    type: String,
    required: [true, "Please provide a email"],
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpire: Date,
  verifyToken: String,
  verifyTokenExpirey: Date,
});

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
