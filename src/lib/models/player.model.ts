import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema(
  {
    name: String,
    position: String,
    score: Number,
    userType: { type: mongoose.Schema.Types.ObjectId, ref: "UserType" },
    birthYear: Number,
    lastPlayed: Date,
  },
  {
    timestamps: true,
  },
);

export const Player =
  mongoose.models.Player || mongoose.model("Player", PlayerSchema);
