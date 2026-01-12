import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayerDto } from "@/features/players/types/Player.type";
import { DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/store/user/useUserStore";

interface RandomTeamDialogBodyProps {
  teamCount: number;
  onSwapTeam: (from: string, to: string, target: string) => void;
  onResetTeams: () => void;
}

export function RandomTeamDialogBody({
  teamCount,
  onSwapTeam,
  onResetTeams,
}: RandomTeamDialogBodyProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const userMap = useUserStore((state) => state.userMap);
  const groupbyPosition = useUserStore((state) => state.positionMap);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const onRandomDistribute = (selectedPlayers: string[]) => {
    // 1. 팀 초기화
    onResetTeams();

    // 2. 현재 연도 계산
    const currentYear = new Date().getFullYear();
    const now = new Date();

    // 3. 점수 계산 및 필터링
    const scoredPlayers = selectedPlayers
      .map((playerId) => {
        const player = userMap.get(playerId);
        if (!player) return null;

        let score = 0;

        // 실력 점수
        score += player.score ?? 50;

        // 나이 가중치
        const age = currentYear - (player.birthYear ?? currentYear);
        if (age >= 50) score -= 20;
        else if (age >= 40) score -= 10;
        else if (age >= 30) score -= 5;

        // 미참석자 감점
        const lastPlayed = new Date(player.lastPlayed);
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(now.getMonth() - 1);
        const isAbsent = lastPlayed < oneMonthAgo;
        if (isAbsent) score -= 10;

        // 랜덤 가중치
        score += Math.random() * 10;

        return { player, score };
      })
      .filter((v): v is { player: PlayerDto; score: number } => v !== null);

    // 4. 포지션별로 분리 및 정렬
    const positionGroups: Record<
      string,
      { player: PlayerDto; score: number }[]
    > = {};
    for (const item of scoredPlayers) {
      const pos = item.player.position ?? "기타";
      if (!positionGroups[pos]) positionGroups[pos] = [];
      positionGroups[pos].push(item);
    }

    for (const pos in positionGroups) {
      positionGroups[pos].sort((a, b) => b.score - a.score);
    }

    // 5. 팀 이름 생성 (Black 1팀, White 1팀 ...)
    const teamNames = Array.from({ length: teamCount }).map((_, idx) => {
      const color = idx % 2 === 0 ? "Black" : "White";
      const group = Math.floor(idx / 2) + 1;
      return `${color} ${group}팀`;
    });

    // 6. 팀 구조 초기화
    const teams: Record<string, PlayerDto[]> = {};
    for (const name of teamNames) {
      teams[name] = [];
    }

    // 7. Snake Draft 배치
    for (const pos in positionGroups) {
      const list = positionGroups[pos];
      let direction = 1; // 1: →, -1: ←
      let teamIdx = 0;

      for (const { player } of list) {
        const teamName = teamNames[teamIdx];
        teams[teamName].push(player);

        if (direction === 1) {
          teamIdx++;
          if (teamIdx >= teamNames.length) {
            direction = -1;
            teamIdx = teamNames.length - 1;
          }
        } else {
          teamIdx--;
          if (teamIdx < 0) {
            direction = 1;
            teamIdx = 0;
          }
        }
      }
    }

    // 8. 실제 팀에 할당
    for (const [teamKey, users] of Object.entries(teams)) {
      users.forEach((user) => {
        onSwapTeam("pool", teamKey, user.id);
      });
    }
  };

  return (
    <div className="space-y-2">
      {Object.entries(groupbyPosition).map(([position, players]) => (
        <div key={position}>
          <div className="mb-1 font-semibold">{position}</div>
          <div className="flex flex-wrap gap-2">
            {players.map((player) => (
              <Badge
                key={player.id}
                onClick={() => toggle(player.id)}
                className={`cursor-pointer px-3 py-1 text-sm text-black ${
                  selected.has(player.id)
                    ? "bg-blue-600 text-white"
                    : "bg-muted"
                }`}
              >
                No.{player.backNumber} {player.name}
              </Badge>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-4 flex justify-end">
        <DialogClose asChild>
          <Button
            className="w-full"
            onClick={() => onRandomDistribute([...selected])}
            disabled={selected.size === 0}
          >
            랜덤 팀 생성
          </Button>
        </DialogClose>
      </div>
    </div>
  );
}
