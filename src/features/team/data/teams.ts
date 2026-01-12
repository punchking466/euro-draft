import { TeamSnapshot } from "@/lib/models/team-snapshot";
import { connectDB } from "@/lib/mongodb";
import { Types } from "mongoose";

export async function getAllTeams(): Promise<TeamSnapshot[]> {
  await connectDB();
  const docs = await TeamSnapshot.find().lean<LeanTeamSnapshot[]>();

  return docs.map((doc) => ({
    name: doc.name,
    teamCount: doc.teamCount,
    teams: doc.teams.map((team) => ({
      name: team.name,
      players: team.players.map((p) => p.toString()), // ObjectId → string
    })),
    createdBy: doc.createdBy.toString(),
    createdAt: new Date(doc.createdAt),
    updatedAt: new Date(doc.updatedAt),
  }));
}

interface LeanTeamSnapshot {
  _id: Types.ObjectId;
  name: string;
  teamCount: number;
  teams: {
    name: string;
    players: Types.ObjectId[];
  }[];
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

// Player ID만 담고 있음
export interface TeamSnapshot {
  name: string;
  teamCount: number;
  teams: {
    name: string;
    players: string[]; // 또는 ObjectId[]
  }[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
