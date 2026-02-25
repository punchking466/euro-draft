import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAlertModal } from "@/contexts/ModalContext";
import { RotateCcw, Save, Share } from "lucide-react";
import { RandomTeamModal } from "./modal/RandomTeamModal";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function TeamBuilderHeader({
  teamCount,
  isValidTeam,
  onChange,
  onSwapTeam,
  onResetTeams,
  onShareKakao,
  onOpenEdit,
}: {
  teamCount: number;
  isValidTeam: boolean;
  onChange: (val: number) => void;
  onSwapTeam: (from: string, to: string, target: string) => void;
  onResetTeams: () => void;
  onShareKakao: () => void;
  onOpenEdit: () => void;
}) {
  const { showModal, hideModal } = useAlertModal();
  return (
    <div className="flex w-full flex-row items-end justify-between">
      <div className="flex flex-row items-end justify-between gap-4">
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
      </div>
      <ButtonGroup>
        <RandomTeamModal
          teamCount={teamCount}
          onSwapTeam={onSwapTeam}
          onResetTeams={onResetTeams}
        />
        <Button
          variant="outline"
          className="hover:bg-blue-50 hover:text-blue-600"
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
          <span className="btn-icon-text">전체 초기화</span>
        </Button>
        <Button
          variant="outline"
          className="hover:bg-blue-50 hover:text-blue-600"
          onClick={onShareKakao}
          disabled={!isValidTeam}
        >
          <Share className="h-4 w-4" />
          <span className="btn-icon-text">카카오톡 공유</span>
        </Button>
        <Button
          variant="outline"
          className="hover:bg-blue-50 hover:text-blue-600"
          disabled={!isValidTeam}
          onClick={onOpenEdit}
        >
          <Save className="h-4 w-4" />
          <span className="btn-icon-text">스쿼드 저장</span>
        </Button>
      </ButtonGroup>
    </div>
  );
}
