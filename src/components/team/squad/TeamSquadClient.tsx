"use client";
import { PlayerDto } from "@/types/Player.type";
import { TeamSquadHeader } from "./TeamSquadHeader";
import { useEffect, useState } from "react";
import { TeamSection } from "./TeamSection";
import { DragDropProvider } from "@dnd-kit/react";
import { useUserStore } from "@/store/user/useUserStore";
import { PlayerSection } from "./PlayerSection";
import { Droppable } from "../../common/dnd/Droppable";
import { move } from "@dnd-kit/helpers";
import { useTeams } from "./hooks/useTeams";
import { useModalState } from "./hooks/useModal";
import { SaveTeamDialog } from "./modal/SaveTeamDialog";
import { PlyaerToTeam } from "./modal/PlayerToTeamModal";
import { PlayerTeamModal } from "./modal/PlayerTeamModal";

interface TeamSquadClientProps {
  players: PlayerDto[];
}

export interface OpenEditArgs {
  teamKey: string;
  modalId: string;
  mode?: "move" | "edit";
  targetId?: string;
}

export function TeamSquadClient({ players }: TeamSquadClientProps) {
  const {
    teams,
    teamCount,
    saveTeams,
    changeTeam,
    setTeams,
    swapTeam,
    removeFromTeam,
    removeAllFromTeam,
    resetTeams,
    shareKakao,
    isValidTeams,
  } = useTeams([...new Set(players.map((p) => p.id))]);

  const setUserMap = useUserStore((state) => state.setUserMap);
  const { open, close, isOpen } = useModalState();
  const [selectTeamKey, setSelectTeamKey] = useState("");
  const [targetPlayerInfo, setTargetPlayerInfo] = useState<{
    targetId: string;
    mode: "move" | "edit";
  } | null>(null);

  useEffect(() => {
    setUserMap(players);
  }, [players, setUserMap]);

  const onOpenEdit = ({ teamKey, modalId, targetId, mode }: OpenEditArgs) => {
    open(modalId);
    setSelectTeamKey(teamKey);
    setTargetPlayerInfo({
      targetId: targetId ?? "",
      mode: mode ?? "move",
    });
  };

  return (
    <div className="max-h-(--main-content-height) flex-[6] space-y-4 overflow-y-auto">
      <div className="flex flex-row items-end gap-4">
        <TeamSquadHeader
          teamCount={teamCount}
          onChange={(val) => changeTeam(val)}
          onSwapTeam={swapTeam}
          onResetTeams={resetTeams}
          onShareKakao={shareKakao}
          isValidTeam={isValidTeams()}
          onOpenEdit={() => open("save-team")}
        />
        {/* 스쿼드 저장 모달 */}
        <SaveTeamDialog
          open={isOpen("save-team")}
          onClose={close}
          onSubmit={saveTeams}
        />
      </div>
      <DragDropProvider
        onDragOver={(event) => {
          setTeams((item) => move(item, event));
        }}
      >
        <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2">
          {Array.from({ length: teamCount }).map((_, teamIdx) => {
            const teamKey = `${teamIdx % 2 === 0 ? "Black" : "White"} ${Math.floor(teamIdx / 2) + 1}팀`;
            return (
              <Droppable key={teamKey} id={teamKey}>
                <TeamSection
                  teamData={{ teamKey, teams, teamCount }}
                  onSwapTeam={swapTeam}
                  onRemoveTeam={removeFromTeam}
                  onRemoveAllFromTeam={removeAllFromTeam}
                  onOpenEdit={onOpenEdit}
                />
              </Droppable>
            );
          })}
        </div>
        <PlayerSection pool={teams.pool} onOpenEdit={onOpenEdit} />
      </DragDropProvider>

      {/* 팀원 추가 모달 */}
      <PlyaerToTeam
        open={isOpen("add-player")}
        teamKey={selectTeamKey}
        assignedIds={Object.entries(teams)
          .filter(([key]) => key !== "pool")
          .flatMap(([, ids]) => ids)}
        onSubmit={swapTeam}
        onClose={close}
      />
      {/* Player 클릭시 나오는 팀이동 모달 */}
      {targetPlayerInfo && (
        <PlayerTeamModal
          open={isOpen("move-player")}
          currentTeam={selectTeamKey}
          teams={Object.keys(teams).filter((key) => key !== "pool")}
          targetPlayerInfo={targetPlayerInfo}
          onSwapTeam={swapTeam}
          onRemoveTeam={removeFromTeam}
          onClose={close}
        />
      )}
    </div>
  );
}
