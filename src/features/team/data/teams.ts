import { TeamSnapshot as TeamSnapshotModel } from "@/lib/models/team-snapshot";
import { connectDB } from "@/lib/mongodb";
import { Types } from "mongoose";

export interface TeamPlayerSnapshot {
  id?: string;
  name: string;
  backNumber: number;
  position: string;
  isGuest: boolean;
}

export interface TeamSnapshot {
  id: string;
  name: string;
  teamCount: number;
  teams: {
    name: string;
    players: TeamPlayerSnapshot[];
  }[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

interface LeanTeamSnapshot {
  _id: Types.ObjectId;
  name: string;
  teamCount: number;
  teams: {
    name: string;
    players: Array<LeanTeamPlayer | Types.ObjectId | string>;
  }[];
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface LeanTeamPlayer {
  id?: string;
  name?: string;
  backNumber?: number;
  position?: string;
  isGuest?: boolean;
}

export async function getAllTeams(): Promise<TeamSnapshot[]> {
  await connectDB();
  const docs = await TeamSnapshotModel.find()
    .sort({ createdAt: -1 })
    .lean<LeanTeamSnapshot[]>();

  return docs.map(normalizeTeamSnapshot);
}

export async function getTeamById(teamId: string): Promise<TeamSnapshot | null> {
  if (!Types.ObjectId.isValid(teamId)) return null;

  await connectDB();
  const doc = await TeamSnapshotModel.findById(teamId).lean<LeanTeamSnapshot | null>();
  if (!doc) return null;

  return normalizeTeamSnapshot(doc);
}

function normalizeTeamSnapshot(doc: LeanTeamSnapshot): TeamSnapshot {
  return {
    id: doc._id.toString(),
    name: doc.name,
    teamCount: doc.teamCount,
    teams: doc.teams.map((team) => ({
      name: team.name,
      players: team.players.map(normalizePlayerSnapshot),
    })),
    createdBy: doc.createdBy.toString(),
    createdAt: new Date(doc.createdAt),
    updatedAt: new Date(doc.updatedAt),
  };
}

function normalizePlayerSnapshot(
  player: LeanTeamPlayer | Types.ObjectId | string,
): TeamPlayerSnapshot {
  if (player instanceof Types.ObjectId || typeof player === "string") {
    const id = player.toString();
    return {
      id,
      name: "삭제된 회원",
      backNumber: 0,
      position: "미정",
      isGuest: false,
    };
  }

  return {
    id: player.id,
    name: player.name ?? "이름미정",
    backNumber: player.backNumber ?? 0,
    position: player.position ?? "미정",
    isGuest: player.isGuest ?? false,
  };
}
