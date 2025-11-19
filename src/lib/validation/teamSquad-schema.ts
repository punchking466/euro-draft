import { z } from "zod";

export const TeamSchema = z.object({
  name: z.string().min(1, "경기명은 필수입니다."),
  createdBy: z.string().min(1, "createdBy is not null"),
  teamCount: z.number().min(1, "최소 1개 이상의 팀이 필요합니다."),
  teams: z
    .array(
      z.object({
        name: z.string().min(1, "팀 이름은 필수입니다."),
        players: z
          .array(z.string().min(1))
          .min(1, "각 팀에는 최소 1명 이상의 선수가 필요합니다."),
      }),
    )
    .min(1, "최소 1개 이상의 팀이 필요합니다."),
});
