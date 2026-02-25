import { z } from "zod";

export const TeamSchema = z.object({
  name: z.string().min(1, "경기명은 필수입니다."),
  createdBy: z.string().min(1, "createdBy is not null"),
  teamCount: z.number().min(1, "최소 1개 이상의 팀이 필요합니다."),
  teams: z
    .array(
      z.object({
        name: z.string().min(1, "팀 이름은 필수입니다."),
        players: z.array(
          z.object({
            id: z.string().optional(),
            name: z.string().min(1, "선수 이름은 필수입니다."),
            backNumber: z.number(),
            position: z.string().min(1, "포지션은 필수입니다."),
            isGuest: z.boolean(),
          }),
        ),
      }),
    )
    .min(1, "최소 1개 이상의 팀이 필요합니다."),
});
