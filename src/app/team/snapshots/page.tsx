import { TeamSnapshotsAccordion } from "@/features/team/components/snapshots/TeamSnapshotsList";
import { getAllTeams } from "@/features/team/data/teams";

export default async function TeamSnapshotsPage() {
  const rawTeams = await getAllTeams();
  const teams = rawTeams.map((entry) => ({
    id: entry.id,
    name: entry.name,
    createdAt: entry.createdAt,
    teams: entry.teams.map((team) => ({
      name: team.name,
      players: team.players.map((player) => ({
        id: player.id,
        name: player.name,
        backNumber: player.backNumber,
        position: player.position,
        isGuest: player.isGuest,
      })),
    })),
  }));

  return (
    <div className="@container/main grid gap-10 p-5">
      <TeamSnapshotsAccordion data={teams} />
    </div>
  );
}
