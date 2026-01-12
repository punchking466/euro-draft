"use server";

import { connectDB } from "@/lib/mongodb";
import { Player } from "@/lib/models/player.model";
import { revalidatePath } from "next/cache";
import {
  PlayerSchema,
  PlayerSchemaWithId,
} from "@/lib/validation/player-schema";
import { extractFirstErrors } from "@/utils/zodErrorHelper";
import { UserType } from "@/lib/models/user-type.model";
import { Types } from "mongoose";

interface FormState {
  value: Record<string, string> | undefined;
  errors: Partial<Record<string, string>>;
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
        backNumber: formObj["backNumber"] as string,
        userType: formObj["userType"] as string,
        score: formObj["score"] as string,
        birthYear: formObj["birthYear"] as string,
        // Preserve user's date input on validation failure.
        lastPlayed: formObj["lastPlayed"] as string,
      },
      errors: extractFirstErrors(errors),
    };
  }
  const { name, position, backNumber, userType, score, birthYear, lastPlayed } =
    result.data;
  try {
    await connectDB();

    const foundUserType = await UserType.findOne({
      code: Number(userType),
    })
      .lean<{ _id: Types.ObjectId }>()
      .exec();

    if (!foundUserType) throw new Error("존재하지 않는 유형입니다.");

    await Player.create({
      name,
      position,
      backNumber,
      userType: foundUserType._id,
      score,
      birthYear,
      lastPlayed,
    });
  } catch (error) {
    console.error("Failed to create player:", error);
    return {
      value: undefined,
      errors: {
        global: "예상치 못한 오류가 발생하였습니다.",
      },
    };
  }
  revalidatePath("/register");

  return {
    value: undefined,
    errors: {},
  };
}

export async function upsertPlayer(prevState: FormState, formData: FormData) {
  const formObj = Object.fromEntries(formData.entries());
  const result = PlayerSchemaWithId.safeParse(formObj);
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return {
      value: {
        id: formObj["id"] as string,
        name: formObj["name"] as string,
        position: formObj["position"] as string,
        backNumber: formObj["backNumber"] as string,
        score: formObj["score"] as string,
        birthYear: formObj["birthYear"] as string,
        // Preserve user's date input on validation failure.
        lastPlayed: formObj["lastPlayed"] as string,
      },
      errors: extractFirstErrors(errors),
    };
  }

  const { name, position, backNumber, userType, score, birthYear, lastPlayed } =
    result.data;
  try {
    await connectDB();
    const foundUserType = await UserType.findOne({
      code: Number(userType),
    })
      .lean<{ _id: Types.ObjectId }>()
      .exec();
    if (!foundUserType) throw new Error("존재하지 않는 유형입니다.");

    await Player.findByIdAndUpdate(formObj.id, {
      name,
      position,
      backNumber,
      userType: foundUserType._id,
      score,
      birthYear,
      lastPlayed,
    });
  } catch (error) {
    console.error("Failed to create player:", error);
    return {
      value: undefined,
      errors: {
        global: "예상치 못한 오류가 발생하였습니다.",
      },
    };
  }

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
