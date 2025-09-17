"use server";

import { connectDB } from "@/lib/mongodb";
import { Player } from "@/lib/models/player.model";
import { revalidatePath } from "next/cache";
import {
  PlayerSchema,
  PlayerSchemaWithId,
} from "@/lib/validation/player-schema";
import { extractFirstErrors } from "@/utils/zodErrorHelper";

interface FormState {
  value: Record<string, string> | undefined;
  errors: Record<string, string>;
}

export async function registerPlayer(prevState: FormState, formData: FormData) {
  const formObj = Object.fromEntries(formData.entries());
  const result = PlayerSchema.safeParse(formObj);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return {
      value: {
        name: formObj["name"] as string,
        position: formObj["position"] as string,
        score: formObj["score"] as string,
        birthYear: formObj["birthYear"] as string,
        lastPlayed: formObj["birthYear"] as string,
      },
      errors: extractFirstErrors(errors),
    };
  }
  const { name, position, score, birthYear, lastPlayed } = result.data;
  await connectDB();

  await Player.create({
    name,
    position,
    score,
    birthYear,
    lastPlayed,
  });
  revalidatePath("/register");

  return {
    value: undefined,
    errors: {},
  };
}

export async function upsertPlayer(prevState: FormState, formData: FormData) {
  const formObj = Object.fromEntries(formData.entries());
  const result = PlayerSchemaWithId.safeParse(formObj);
  console.log(result);
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return {
      value: {
        id: formObj["id"] as string,
        name: formObj["name"] as string,
        position: formObj["position"] as string,
        score: formObj["score"] as string,
        birthYear: formObj["birthYear"] as string,
        lastPlayed: formObj["birthYear"] as string,
      },
      errors: extractFirstErrors(errors),
    };
  }
  const { name, position, score, birthYear, lastPlayed } = result.data;
  await connectDB();

  await Player.findByIdAndUpdate(formObj.id, {
    name,
    position,
    score,
    birthYear,
    lastPlayed,
  });
  revalidatePath("/register");

  return {
    value: undefined,
    errors: {},
  };
}
export async function deletePlayer(userId: string) {
  if (!userId) throw new Error("ID 미존재");

  await connectDB();

  await Player.findByIdAndDelete(userId);
  revalidatePath("/register");
}
