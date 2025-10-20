import { CustomDialog } from "@/components/dialog/CustomDiaglog";
import { Button } from "@/components/ui/button";
import { PlayerDto } from "@/types/Player.type";

interface Props {
  teamCount: number;
  currentTeam: string;
  targetPlayer: PlayerDto;
  onSwapTeam: (from: string, to: string, target: string) => void;
  onRemoveTeam?: (team: string, target: string) => void;
}

export function PlayerTeamModal({
  teamCount,
  currentTeam,
  targetPlayer,
  onSwapTeam,
  onRemoveTeam,
}: Props) {
  if (!targetPlayer) return;

  return (
    <CustomDialog
      key={targetPlayer.id}
      contentClassName="w-52"
      trigger={
        <Button variant="secondary" className="text-lg">
          No.{targetPlayer.backNumber} {targetPlayer.name}
        </Button>
      }
      title="선수 이동"
    >
      {[...Array(teamCount)].map((_, targetTeamIdx) => (
        <Button
          key={targetTeamIdx}
          variant="outline"
          className="w-full"
          onClick={() => {
            onSwapTeam(
              currentTeam,
              `team${targetTeamIdx + 1}`,
              targetPlayer.id,
            );
          }}
        >
          Team {targetTeamIdx + 1}으로 이동
        </Button>
      ))}
      {onRemoveTeam && (
        <Button
          variant="destructive"
          onClick={() => onRemoveTeam(currentTeam, targetPlayer.id)}
        >
          제거
        </Button>
      )}
    </CustomDialog>
  );
}
