"use server";

import { TeamSnapshot } from "@/lib/models/team-snapshot";
import { connectDB } from "@/lib/mongodb";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

type UpsertTeamSnapshotInput = {
  teamId?: string;
  name: string;
  createdBy?: string;
  teamCount: number;
  teams: Array<{
    name: string;
    players: Array<{
      id?: string;
      name: string;
      backNumber: number;
      position: string;
      isGuest: boolean;
    }>;
  }>;
};

export async function upsertTeamSnapshot(input: UpsertTeamSnapshotInput) {
  await connectDB();

  const basePayload = {
    name: input.name,
    teamCount: input.teamCount,
    teams: input.teams,
  };

  if (input.teamId) {
    if (!Types.ObjectId.isValid(input.teamId)) {
      throw new Error("Invalid teamId");
    }

    const updated = await TeamSnapshot.findByIdAndUpdate(
      input.teamId,
      { $set: basePayload },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updated) {
      throw new Error("Team snapshot not found");
    }

    revalidatePath("/team/builder");
    revalidatePath("/team/snapshots");
    return { mode: "update" as const, id: updated._id.toString() };
  }

  if (!input.createdBy || !Types.ObjectId.isValid(input.createdBy)) {
    throw new Error("Invalid createdBy");
  }

  const created = await TeamSnapshot.create({
    ...basePayload,
    createdBy: input.createdBy,
  });

  revalidatePath("/team/builder");
  revalidatePath("/team/snapshots");
  return { mode: "create" as const, id: created._id.toString() };
}
