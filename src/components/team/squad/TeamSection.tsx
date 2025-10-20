import { useUserStore } from "@/store/user/useUserStore";
import { Sortable } from "../../common/dnd/Sortable";
import { PlayerTeamModal } from "./modal/PlayerTeamModal";
import { useModal } from "@/contexts/ModalContext";
import { RotateCcw } from "lucide-react";
import { PlyaerToTeam } from "./modal/PlayerToTeamModal";

interface Props {
  teamIdx: number;
  teamCount: number;
  teams: Record<string, string[]>;
  onSwapTeam: (from: string, to: string, target: string) => void;
  onRemoveTeam: (team: string, target: string) => void;
  onRemoveAllFromTeam: (teamKey: string) => void;
}

export function TeamSection({
  teamIdx,
  teamCount,
  teams,
  onSwapTeam,
  onRemoveTeam,
  onRemoveAllFromTeam,
}: Props) {
  const { showModal, hideModal } = useModal();
  const userMap = useUserStore((state) => state.userMap);
  const teamKey = `team${teamIdx + 1}`;

  return (
    <div className="flex min-h-[200px] flex-col justify-between gap-2 rounded-lg border p-4">
      <div className="flex flex-row items-center justify-between">
        <div className="font-bold">
          {teamIdx / 2 === 0 ? "Black" : "White"} {teamIdx + 1}
        </div>
        <button
          className="hover:bg-muted rounded-lg p-2"
          onClick={() => {
            if (!teams[teamKey] || teams[teamKey].length < 1) return;
            showModal({
              title: "팀 초기화",
              message: "현재 팀을 초기화 하시겠습니까?",
              confirmButtons: [
                {
                  label: "취소",
                  action: hideModal,
                  variant: "secondary",
                },
                {
                  label: "확인",
                  action: () => onRemoveAllFromTeam(teamKey),
                  variant: "danger",
                },
              ],
            });
          }}
        >
          <RotateCcw />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {(teams[teamKey] ?? []).map((player, index) => {
          const targetPlayer = userMap.get(player);
          if (!targetPlayer) return;

          return (
            <Sortable key={targetPlayer.id} id={targetPlayer.id} index={index}>
              <PlayerTeamModal
                teamCount={teamCount}
                currentTeam={teamKey}
                targetPlayer={targetPlayer}
                onSwapTeam={onSwapTeam}
                onRemoveTeam={onRemoveTeam}
              />
            </Sortable>
          );
        })}
      </div>
      <PlyaerToTeam
        teamKey={teamKey}
        assignedIds={Object.entries(teams)
          .filter(([key]) => key !== "pool")
          .flatMap(([, ids]) => ids)}
        onSubmit={onSwapTeam}
      />
    </div>
  );
}
