import { TeamBuilderClient } from "@/features/team/components/builder/TeamBuilderClient";
import { getAllPlayers } from "@/features/players/data/player";
import { getTeamById } from "@/features/team/data/teams";

export default async function TeamBuilderPage({
  searchParams,
}: {
  searchParams?: Promise<{ teamId?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const players = await getAllPlayers();
  const initialSnapshot = params.teamId
    ? await getTeamById(params.teamId)
    : null;

  return (
    <div className="@container/main grid gap-10 p-5">
      <TeamBuilderClient players={players} initialSnapshot={initialSnapshot} />
    </div>
  );
}
