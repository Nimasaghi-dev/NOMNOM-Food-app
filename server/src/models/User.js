import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  orders: {
    type: [String], // Array of strings
    default: [],
  },
  reviews: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: String,
    default: new Date().toISOString(),
  },
  updated_at: {
    type: String,
    default: new Date().toISOString(),
  },
});

// Middleware to update the `updated_at` field before saving
userSchema.pre("save", function (next) {
  this.updated_at = new Date().toISOString();
  next();
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("User", userSchema);

export default User;
