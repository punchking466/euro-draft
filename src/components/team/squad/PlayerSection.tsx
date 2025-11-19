import { useUserStore } from "@/store/user/useUserStore";
import { PlayerDto } from "@/types/Player.type";
import { Droppable } from "../../common/dnd/Droppable";
import { Sortable } from "../../common/dnd/Sortable";
import { Button } from "@/components/ui/button";
import { OpenEditArgs } from "./TeamSquadClient";

interface Props {
  pool: string[];
  onOpenEdit: ({ mode, teamKey, modalId, targetId }: OpenEditArgs) => void;
}

export function PlayerSection({ pool, onOpenEdit }: Props) {
  const userMap = useUserStore((state) => state.userMap);
  const filteredPlayers = [...pool]
    .map((id) => userMap.get(id))
    .filter((p): p is PlayerDto => !!p)
    .sort((a, b) => a.name.localeCompare(b.name, "ko"));

  const groupbyPosition = filteredPlayers.reduce<Record<string, PlayerDto[]>>(
    (acc, player) => {
      const pos = player.position ?? "기타";
      if (!acc[pos]) acc[pos] = [];
      acc[pos].push(player);
      return acc;
    },
    {
      PG: [],
      SG: [],
      SF: [],
      PF: [],
      C: [],
      기타: [],
    },
  );

  return (
    <Droppable id="pool">
      <div className="max-h-[50lvh] overflow-y-auto rounded-2xl border-2 px-4 py-3">
        {Object.entries(groupbyPosition).map(([position, players]) => (
          <section key={position} className="mb-4">
            <h3 className="mb-1 font-bold">{position}</h3>
            <div className="flex flex-wrap gap-4">
              {players.map((player, index) => (
                <Sortable key={player.id} id={player.id} index={index}>
                  <Button
                    variant="secondary"
                    className="text-lg"
                    onClick={() => {
                      onOpenEdit({
                        teamKey: "pool",
                        modalId: "move-player",
                        targetId: player.id,
                        mode: "move",
                      });
                    }}
                  >
                    No.{player.backNumber} {player.name}
                  </Button>
                </Sortable>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Droppable>
  );
}
