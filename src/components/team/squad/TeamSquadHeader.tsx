import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useModal } from "@/contexts/ModalContext";
import { RotateCcw } from "lucide-react";
import { RandomTeamModal } from "./modal/RandomTeamModal";

export function TeamSquadHeader({
  teamCount,
  onChange,
  onSwapTeam,
  onResetTeams,
}: {
  teamCount: number;
  onChange: (val: number) => void;
  onSwapTeam: (from: string, to: string, target: string) => void;
  onResetTeams: () => void;
}) {
  const { showModal, hideModal } = useModal();
  return (
    <div className="flex flex-row items-end gap-4">
      <div className="grid gap-2">
        <Label>생성할 팀 수</Label>
        <ToggleGroup
          variant="outline"
          type="single"
          defaultValue={`${teamCount}`}
          value={`${teamCount}`}
          onValueChange={(val: string) => onChange(Number(val))}
        >
          <ToggleGroupItem value="1">1</ToggleGroupItem>
          <ToggleGroupItem value="2">2</ToggleGroupItem>
          <ToggleGroupItem value="3">3</ToggleGroupItem>
          <ToggleGroupItem value="4">4</ToggleGroupItem>
          <ToggleGroupItem value="5">5</ToggleGroupItem>
          <ToggleGroupItem value="6">6</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <RandomTeamModal
        teamCount={teamCount}
        onSwapTeam={onSwapTeam}
        onResetTeams={onResetTeams}
      />
      <button
        className="hover:bg-muted rounded-lg p-2"
        onClick={() => {
          showModal({
            title: "전체 팀 초기화",
            message: "모든 팀을 초기화 하시겠습니까?",
            confirmButtons: [
              {
                label: "취소",
                action: hideModal,
                variant: "secondary",
              },
              {
                label: "확인",
                action: onResetTeams,
                variant: "danger",
              },
            ],
          });
        }}
      >
        <RotateCcw />
      </button>
    </div>
  );
}
