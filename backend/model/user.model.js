import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 25,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    maxLength: 25,
  },
});

export const User = mongoose.model("User", userSchema);
