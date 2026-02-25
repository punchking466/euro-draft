import mongoose, { Schema, Types, Document } from "mongoose";

interface TeamPlayerSnapshot {
  id?: string;
  name: string;
  backNumber: number;
  position: string;
  isGuest: boolean;
}

interface Team {
  name: string;
  players: TeamPlayerSnapshot[];
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
    players: [
      {
        id: { type: String, required: false },
        name: { type: String, required: true },
        backNumber: { type: Number, required: true },
        position: { type: String, required: true },
        isGuest: { type: Boolean, required: true, default: false },
      },
    ],
  },
  { _id: false },
);

const TeamSnapshotSchema = new Schema<TeamSnapshotDocument>(
  {
    name: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    teamCount: { type: Number, required: true },
    teams: { type: [TeamSchema], required: true },
  },
  { timestamps: true },
);

export const TeamSnapshot =
  mongoose.models.TeamSnapshot ||
  mongoose.model<TeamSnapshotDocument>("TeamSnapshot", TeamSnapshotSchema);
