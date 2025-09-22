import { z } from "zod";

export const PlayerSchema = z.object({
  name: z.string().min(1, "이름은 필수입니다."),
  position: z.string().min(1, "포지션은 필수입니다."),
  backNumber: z
    .string()
    .min(1, "등번호는 필수 입니다.")
    .transform((val) => Number(val)),
  userType: z.string().min(1, "회원 유형은 필수입니다."),
  score: z.coerce
    .number()
    .min(1, "최소 점수는 1점입니다.")
    .max(100, "최대 점수는 100입니다.")
    .transform((val) => Number(val)),
  birthYear: z.coerce
    .number()
    .min(1920, "출생연도는 1920년 이후여야 합니다.")
    .max(2010, "출생연도는 2025년 이전이어야 합니다."),
  lastPlayed: z
    .string()
    .min(1, "참석일은 필수입니다.")
    .transform((val) => new Date(val)),
});

export const PlayerSchemaWithId = PlayerSchema.extend({
  id: z.string().min(1, "id는 필수입니다."),
});

export const PlayerSchemaId = z.object({
  id: z.string().min(1, "id는 필수입니다."),
});
