import { connectDB } from "@/lib/mongodb";
import { Member } from "@/lib/models/member.model";
import { Types } from "mongoose";
import { UserType } from "@/lib/models/user-type.model";
import { PlayerDto } from "@/features/players/types/Player.type";

interface MemberType {
  _id: Types.ObjectId;
  name: string;
  backNumber: number;
  position: string;
  userType: {
    _id: Types.ObjectId;
    code: number;
    label: string;
  };
  score: number;
  birthYear: number;
  lastPlayed: Date;
}

export async function getAllPlayers() {
  await connectDB();
  const docs = await Member.find()
    .populate("userType")
    .sort({ name: "asc" })
    .lean<MemberType[]>()
    .exec();

  return docs.map((doc) => ({
    id: doc._id.toString(),
    name: doc.name,
    position: doc.position,
    backNumber: doc.backNumber,
    userType: {
      id: doc.userType._id.toString(),
      code: doc.userType.code,
      label: doc.userType.label,
    },
    score: doc.score,
    birthYear: doc.birthYear,
    // Serialize Date for client component props.
    lastPlayed: doc.lastPlayed.toISOString(),
  }));
}

export async function getAllPlayersGroupedByPosition() {
  await connectDB();
  const docs = await Member.find()
    .populate("userType")
    .sort({ name: "asc" })
    .lean<MemberType[]>()
    .exec();

  const grouped = docs.reduce<Record<string, PlayerDto[]>>(
    (acc, doc) => {
      const position = doc.position ?? "기타";
      if (!acc[position]) acc[position] = [];
      acc[position].push({
        id: doc._id.toString(),
        name: doc.name,
        position: doc.position,
        backNumber: doc.backNumber,
        userType: {
          id: doc.userType._id.toString(),
          code: doc.userType.code,
          label: doc.userType.label,
        },
        score: doc.score,
        birthYear: doc.birthYear,
        // Serialize Date for client component props.
        lastPlayed: doc.lastPlayed.toISOString(),
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
