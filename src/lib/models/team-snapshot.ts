import mongoose, { Schema, Types, Document } from "mongoose";

interface Team {
  name: string;
  players: Types.ObjectId[];
}

export interface TeamSnapshotDocument extends Document {
  name: string;
  createdBy: Types.ObjectId;
  teamCount: number;
  teams: Team[];
  createdAt: Date;
  updatedAt: Date;
}

const TeamSchema = new Schema<Team>(
  {
    name: { type: String, required: true },
    players: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { _id: false },
);

const TeamSnapshotSchema = new Schema<TeamSnapshotDocument>(
  {
    name: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    teamCount: { type: Number, required: true },
    teams: { type: [TeamSchema], required: true },
  },
  { timestamps: true },
);

export const TeamSnapshot =
  mongoose.models.TeamSnapshot ||
  mongoose.model<TeamSnapshotDocument>("TeamSnapshot", TeamSnapshotSchema);
