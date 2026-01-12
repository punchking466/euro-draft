"use server";

import { TeamSnapshot } from "@/lib/models/team-snapshot";
import { connectDB } from "@/lib/mongodb";
import { TeamSchema } from "@/lib/validation/teamSquad-schema";
import { extractFirstErrors } from "@/utils/zodErrorHelper";
import { revalidatePath } from "next/cache";

interface FormState {
  value: Record<string, string> | undefined;
  errors: Partial<Record<string, string>>;
}

export async function registerTeams2(prevState: FormState, formData: FormData) {
  const fromObj = Object.fromEntries(formData.entries());
  const result = TeamSchema.safeParse(fromObj);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return {
      value: {
        name: fromObj["name"] as string,
        createdBy: fromObj["createdBy"] as string,
        teamCount: fromObj["teamCount"] as string,
        teams: fromObj["teams"] as string,
      },
      // Align with FormState.errors key.
      errors: extractFirstErrors(errors),
    };
  }

  const { name, createdBy, teamCount, teams } = result.data;

  try {
    await connectDB();
    await TeamSnapshot.create({
      name,
      createdBy,
      teamCount,
      teams,
    });
  } catch (error) {
    console.error(error);
    return {
      value: undefined,
      errors: {
        global: "예상치 못한 오류가 발생하였습니다.",
      },
    };
  }
  revalidatePath("/team/squad");
  return {
    value: undefined,
    // Align with FormState.errors key.
    errors: {},
  };
}

export async function registerTeams(teamSnapshot: {
  name: string;
  createdBy: string;
  teamCount: number;
  teams: { name: string; players: string[] }[];
}) {
  if (!teamSnapshot) return;

  await connectDB();
  await TeamSnapshot.create({
    ...teamSnapshot,
  });
}
