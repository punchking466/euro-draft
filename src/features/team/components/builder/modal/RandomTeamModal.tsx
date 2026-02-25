import { CustomDialog } from "@/components/dialog/CustomDiaglog";
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";
import { RandomTeamDialogBody } from "./RandomTeamDialogBody";

interface Props {
  teamCount: number;
  onSwapTeam: (from: string, to: string, target: string) => void;
  onResetTeams: () => void;
}

export function RandomTeamModal({
  teamCount,
  onSwapTeam,
  onResetTeams,
}: Props) {
  return (
    <CustomDialog
      contentClassName="max-h-[70lvh] overflow-y-auto"
      title="랜덤 팀 생성"
      trigger={
        <Button
          variant="outline"
          className="hover:bg-blue-50 hover:text-blue-600"
        >
          <Shuffle className="h-4 w-4" />
          <span className="btn-icon-text">랜덤 생성</span>
        </Button>
      }
    >
      <RandomTeamDialogBody
        teamCount={teamCount}
        onSwapTeam={onSwapTeam}
        onResetTeams={onResetTeams}
      />
    </CustomDialog>
  );
}
