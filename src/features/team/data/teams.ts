import { TeamSnapshot } from "@/lib/models/team-snapshot";
import { connectDB } from "@/lib/mongodb";
import "@/lib/models/member.model";
import { Types } from "mongoose";

export async function getAllTeams(): Promise<TeamSnapshot[]> {
  await connectDB();
  const docs = await TeamSnapshot.find()
    .populate("teams.players", "name backNumber position")
    .lean<LeanTeamSnapshot[]>();

  return docs.map((doc) => ({
    name: doc.name,
    teamCount: doc.teamCount,
    teams: doc.teams.map((team) => ({
      name: team.name,
      players: team.players.map((p) => ({
        id: p._id.toString(),
        name: p.name ?? "이름미정",
        backNumber: p.backNumber ?? 0,
        position: p.position ?? "미정",
      })),
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
    players: LeanPlayer[];
  }[];
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface LeanPlayer {
  _id: Types.ObjectId;
  name?: string;
  backNumber?: number;
  position?: string;
}

// Player ID만 담고 있음
export interface TeamSnapshot {
  name: string;
  teamCount: number;
  teams: {
    name: string;
    players: {
      id: string;
      name: string;
      backNumber: number;
      position: string;
    }[];
  }[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
