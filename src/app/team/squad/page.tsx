import { TeamSquadClient } from "@/features/team/components/squad/TeamSquadClient";
import { getAllPlayers } from "@/features/players/data/player";

export default async function TeamSquad() {
  const players = await getAllPlayers();

  return (
    <div className="@container/main grid gap-10 p-5">
      <TeamSquadClient players={players} />
    </div>
  );
}
