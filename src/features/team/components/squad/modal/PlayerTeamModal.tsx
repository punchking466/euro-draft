import { CustomDialog } from "@/components/dialog/CustomDiaglog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  teams: string[];
  currentTeam: string;
  targetPlayerInfo: { targetId: string; mode: "move" | "edit" };
  onSwapTeam: (from: string, to: string, target: string) => void;
  onRemoveTeam?: (team: string, target: string) => void;
  onClose: () => void;
}

export function PlayerTeamModal({
  open,
  teams,
  currentTeam,
  targetPlayerInfo,
  onSwapTeam,
  onRemoveTeam,
  onClose,
}: Props) {
  if (!targetPlayerInfo || !targetPlayerInfo.targetId) return;
  const { targetId, mode } = targetPlayerInfo;

  return (
    <CustomDialog
      key={targetId}
      contentClassName="w-52"
      title="선수 이동"
      open={open}
      onClose={onClose}
    >
      {teams.map((team) => (
        <Button
          key={team}
          variant="outline"
          className="w-full"
          onClick={() => {
            onSwapTeam(currentTeam, team, targetId);
            onClose();
          }}
        >
          {team}으로 이동
        </Button>
      ))}
      {mode === "edit" && onRemoveTeam && (
        <Button
          variant="destructive"
          onClick={() => {
            onRemoveTeam(currentTeam, targetId);
            onClose();
          }}
        >
          제거
        </Button>
      )}
    </CustomDialog>
  );
}
