import mongoose from "mongoose";

const UserTypeSchema = new mongoose.Schema({
  code: { type: Number, required: true },
  label: { type: String, required: true },
});

export const UserType =
  mongoose.models.UserType || mongoose.model("UserType", UserTypeSchema);
