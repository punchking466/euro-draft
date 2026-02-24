import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    name: String,
    position: String,
    backNumber: Number,
    score: Number,
    userType: { type: mongoose.Schema.Types.ObjectId, ref: "UserType" },
    birthYear: Number,
    lastPlayed: Date,
  },
  {
    timestamps: true,
  },
);

export const Member =
  mongoose.models.Member || mongoose.model("Member", MemberSchema);
