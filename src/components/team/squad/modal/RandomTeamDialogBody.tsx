import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayerDto } from "@/types/Player.type";
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

    // 3. 가중치 점수 계산
    const scoredPlayers = selectedPlayers
      .map((playerId) => {
        const player = userMap.get(playerId);
        if (!player) return null;

        let score = 0;

        // 플레이 실력 점수 (0~100)
        score += player.score ?? 50;

        // 나이 가중치: 나이 많을수록 점수 낮게
        const age = currentYear - (player.birthYear ?? currentYear);
        if (age >= 50) score -= 20;
        else if (age >= 40) score -= 10;
        else if (age >= 30) score -= 5;

        // 최근 1개월 이상 미참석자 감점
        const lastPlayed = new Date(player.lastPlayed);
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(now.getMonth() - 1);
        const isAbsent = lastPlayed < oneMonthAgo;
        if (isAbsent) score -= 10;

        // 랜덤성 부여
        score += Math.random() * 10;

        return { player, score };
      })
      // null 제거 + 타입 안전화
      .filter((v): v is { player: PlayerDto; score: number } => v !== null);

    // 4. 포지션별로 분리
    const positionGroups: Record<
      string,
      { player: PlayerDto; score: number }[]
    > = {};
    for (const item of scoredPlayers) {
      const pos = item.player.position ?? "기타";
      if (!positionGroups[pos]) positionGroups[pos] = [];
      positionGroups[pos].push(item);
    }

    // 5. 포지션 내부 점수 순 정렬
    for (const pos in positionGroups) {
      positionGroups[pos].sort((a, b) => b.score - a.score);
    }

    // 6. 팀 객체 초기화
    const teams: Record<number, PlayerDto[]> = {};
    for (let i = 1; i <= teamCount; i++) teams[i] = [];

    // 7. 포지션별 Snake Draft
    for (const pos in positionGroups) {
      const list = positionGroups[pos];
      let direction = 1; // 1: → , -1: ←
      let teamIdx = 1;

      for (const { player } of list) {
        teams[teamIdx].push(player);

        // 방향 전환
        if (direction === 1) {
          teamIdx++;
          if (teamIdx > teamCount) {
            direction = -1;
            teamIdx = teamCount;
          }
        } else {
          teamIdx--;
          if (teamIdx < 1) {
            direction = 1;
            teamIdx = 1;
          }
        }
      }
    }

    // 8. 실제 할당
    for (const [key, users] of Object.entries(teams)) {
      users.forEach((user) => {
        onSwapTeam("pool", `team${key}`, user.id);
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
