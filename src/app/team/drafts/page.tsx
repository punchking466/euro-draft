// app/(your-page)/TeamSquad/page.tsx (Server Component)
import { TeamHistoryAccordion } from "@/features/team/components/drafts/TeamList";
import { getAllTeams } from "@/features/team/data/teams";

export default async function TeamSquad() {
  const rawTeams = await getAllTeams();
  const teams = rawTeams.map((entry) => ({
    name: entry.name,
    createdAt: entry.createdAt,
    teams: entry.teams.map((team) => ({
      name: team.name,
      players: team.players.map((player) => ({
        id: player.id,
        name: player.name,
        backNumber: player.backNumber,
        position: player.position,
      })),
    })),
  }));

  return (
    <div className="@container/main grid gap-10 p-5">
      <TeamHistoryAccordion data={teams} />
    </div>
  );
}
