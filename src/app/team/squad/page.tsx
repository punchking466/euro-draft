import { TeamSquadClient } from "@/components/team/squad/TeamSquadClient";
import { getAllPlayers } from "@/data/player";

export default async function TeamSquad() {
  const players = await getAllPlayers();

  return (
    <div className="@container/main grid gap-10 p-5">
      <TeamSquadClient players={players} />
    </div>
  );
}
