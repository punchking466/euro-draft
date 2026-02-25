import { Sortable } from "@/components/common/dnd/Sortable";
import { useAlertModal } from "@/contexts/ModalContext";
import { Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OpenEditArgs } from "./TeamBuilderClient";
import { TeamPlayerItem } from "./hooks/useTeams";

interface Props {
  teamData: {
    teamKey: string;
    teamCount: number;
    teams: Record<string, TeamPlayerItem[]>;
  };
  onSwapTeam: (from: string, to: string, target: string) => void;
  onRemoveTeam: (team: string, target: string) => void;
  onRemoveAllFromTeam: (teamKey: string) => void;
  onOpenEdit: ({ mode, teamKey, modalId, targetId }: OpenEditArgs) => void;
}

export function TeamSection({
  teamData,
  onRemoveAllFromTeam,
  onOpenEdit,
}: Props) {
  const { showModal, hideModal } = useAlertModal();
  const { teamKey, teams } = teamData;

  return (
    <div className="flex min-h-[200px] flex-col justify-between gap-2 rounded-lg border p-4">
      <div className="flex flex-row items-center justify-between">
        <div className="font-bold">{teamKey}</div>
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
        {(teams[teamKey] ?? []).map((targetPlayer, index) => {
          if (!targetPlayer) return;

          return (
            <Sortable key={targetPlayer.id} id={targetPlayer.id} index={index}>
              <Button
                variant="secondary"
                className="text-lg"
                onClick={() => {
                  onOpenEdit({
                    teamKey,
                    modalId: "move-player",
                    targetId: targetPlayer.id,
                    mode: "edit",
                  });
                }}
              >
                No.{targetPlayer.backNumber} {targetPlayer.name}
              </Button>
            </Sortable>
          );
        })}
      </div>

      <Button
        variant="outline"
        className="mt-4 flex w-fit items-center gap-1 px-2 py-1 text-sm text-blue-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
        onClick={() => onOpenEdit({ teamKey, modalId: "add-player" })}
      >
        <Plus className="h-4 w-4" />
        팀원 추가
      </Button>
    </div>
  );
}
