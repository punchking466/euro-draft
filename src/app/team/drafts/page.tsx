// app/(your-page)/TeamSquad/page.tsx (Server Component)
import { TeamHistoryAccordion } from "@/features/team/components/drafts/TeamList";
import { getAllTeams } from "@/features/team/data/teams";

export default async function TeamSquad() {
  const rawTeams = await getAllTeams();

  const teams = rawTeams.map((entry) => ({
    name: entry.name,
    createdAt: entry.createdAt.toISOString(), // ✅ 변환
    teams: entry.teams.map((team) => ({
      name: team.name,
      players: team.players.map((player) => ({
        id: player,
        name: "이름미정", // ✅ 아직 없으면 기본값
        backNumber: 0, // ✅ 추후 매핑 필요
        position: "미정", // ✅ 추후 매핑 필요
      })),
    })),
  }));

  return <TeamHistoryAccordion data={teams} />;
}
