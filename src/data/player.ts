import { connectDB } from "@/lib/mongodb";
import { Player } from "@/lib/models/player.model";
import { Types } from "mongoose";
import { UserType } from "@/lib/models/user-type.model";

interface PlayerType {
  _id: Types.ObjectId;
  name: string;
  position: string;
  score: number;
  birthYear: number;
  lastPlayed: Date;
}

export type PlayerDto = Omit<PlayerType, "_id"> & { id: string };

export async function getAllPlayers() {
  await connectDB();
  const docs = await Player.find().lean<PlayerType[]>().exec();
  return docs.map((doc) => ({
    id: doc._id.toString(),
    name: doc.name,
    position: doc.position,
    score: doc.score,
    birthYear: doc.birthYear,
    lastPlayed: doc.lastPlayed,
  }));
}

export async function getAllPlayersGroupedByPosition() {
  await connectDB();
  const docs = await Player.find().lean<PlayerType[]>().exec();

  const grouped = docs.reduce<Record<string, PlayerDto[]>>(
    (acc, doc) => {
      const position = doc.position ?? "기타";
      if (!acc[position]) acc[position] = [];
      acc[position].push({
        id: doc._id.toString(),
        name: doc.name,
        position: doc.position,
        score: doc.score,
        birthYear: doc.birthYear,
        lastPlayed: doc.lastPlayed,
      });
      return acc;
    },
    {
      PG: [],
      SG: [],
      SF: [],
      PF: [],
      C: [],
    },
  );
  return grouped;
}

export async function getUserTypes() {
  await connectDB();
  const docs = await UserType.find()
    .lean<{ code: number; label: string }[]>()
    .exec();

  return docs.map(({ code, label }) => ({
    value: `${code}`,
    label: label,
  }));
}
