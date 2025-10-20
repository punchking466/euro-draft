"use client";
import { PlayerDto } from "@/types/Player.type";
import { TeamSquadHeader } from "./TeamSquadHeader";
import { useEffect } from "react";
import { TeamSection } from "./TeamSection";
import { DragDropProvider } from "@dnd-kit/react";
import { useUserStore } from "@/store/user/useUserStore";
import { PlayerSection } from "./PlayerSection";
import { Droppable } from "../../common/dnd/Droppable";
import { move } from "@dnd-kit/helpers";
import { useTeams } from "./hooks/useTeams";

interface TeamSquadClientProps {
  players: PlayerDto[];
}

export function TeamSquadClient({ players }: TeamSquadClientProps) {
  const {
    teams,
    teamCount,
    changeTeam,
    setTeams,
    swapTeam,
    removeFromTeam,
    removeAllFromTeam,
    resetTeams,
  } = useTeams([...new Set(players.map((p) => p.id))]);

  const setUserMap = useUserStore((state) => state.setUserMap);

  useEffect(() => {
    setUserMap(players);
  }, [players, setUserMap]);

  return (
    <div className="max-h-(--main-content-height) flex-[6] space-y-4 overflow-y-auto">
      <div className="flex flex-row items-end gap-4">
        <TeamSquadHeader
          teamCount={teamCount}
          onChange={(val) => changeTeam(val)}
          onSwapTeam={swapTeam}
          onResetTeams={resetTeams}
        />
      </div>
      <DragDropProvider
        onDragOver={(event) => {
          setTeams((item) => move(item, event));
        }}
      >
        <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2">
          {Array.from({ length: teamCount }).map((_, teamIdx) => (
            <Droppable key={teamIdx} id={`team${teamIdx + 1}`}>
              <TeamSection
                teamIdx={teamIdx}
                teams={teams}
                teamCount={teamCount}
                onSwapTeam={swapTeam}
                onRemoveTeam={removeFromTeam}
                onRemoveAllFromTeam={removeAllFromTeam}
              />
            </Droppable>
          ))}
        </div>
        <PlayerSection
          pool={teams.pool}
          teamCount={teamCount}
          onSwapTeam={swapTeam}
        />
      </DragDropProvider>
    </div>
  );
}
