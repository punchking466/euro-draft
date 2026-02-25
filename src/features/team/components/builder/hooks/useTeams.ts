import { upsertTeamSnapshot } from "@/features/team/actions/teamBuilder";
import { TeamSnapshot as TeamSnapshotDto } from "@/features/team/data/teams";
import { PlayerDto } from "@/features/players/types/Player.type";
import { handleShareKakao } from "@/lib/KakaoScript";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface TeamPlayerItem {
  id: string;
  name: string;
  backNumber: number;
  position: string;
  isGuest: boolean;
}

type TeamMap = Record<string, TeamPlayerItem[]>;

function teamKeyByIndex(index: number) {
  return `${index % 2 === 0 ? "Black" : "White"} ${Math.floor(index / 2) + 1}팀`;
}

function playerToItem(player: PlayerDto): TeamPlayerItem {
  return {
    id: player.id,
    name: player.name,
    backNumber: player.backNumber,
    position: player.position,
    isGuest: false,
  };
}

function buildInitialState(
  players: PlayerDto[],
  initialSnapshot?: TeamSnapshotDto | null,
): { teamCount: number; teams: TeamMap } {
  const memberPool = players.map(playerToItem);

  if (!initialSnapshot) {
    return {
      teamCount: 2,
      teams: {
        pool: memberPool,
        [teamKeyByIndex(0)]: [],
        [teamKeyByIndex(1)]: [],
      },
    };
  }

  const nextTeams: TeamMap = { pool: [] };
  const assignedIds = new Set<string>();

  for (const [index, team] of initialSnapshot.teams.entries()) {
    const key = teamKeyByIndex(index);
    nextTeams[key] = team.players.map((player, playerIndex) => {
      const id = player.id ?? `guest:${index}:${playerIndex}:${player.name}`;
      if (!player.isGuest && player.id) {
        assignedIds.add(player.id);
      }
      return {
        id,
        name: player.name,
        backNumber: player.backNumber,
        position: player.position,
        isGuest: player.isGuest,
      };
    });
  }

  nextTeams.pool = memberPool.filter((player) => !assignedIds.has(player.id));

  return {
    teamCount: initialSnapshot.teamCount,
    teams: nextTeams,
  };
}

export function useTeams(
  players: PlayerDto[],
  initialSnapshot?: TeamSnapshotDto | null,
) {
  const router = useRouter();
  const initialState = buildInitialState(players, initialSnapshot);
  const [teamCount, setTeamCount] = useState(initialState.teamCount);
  const [teams, setTeams] = useState<TeamMap>(initialState.teams);

  const changeTeam = (count: number) => {
    const newTeams = { ...teams };
    if (count > teamCount) {
      for (let i = teamCount; i < count; i++) {
        newTeams[teamKeyByIndex(i)] = [];
      }
      setTeams(newTeams);
      setTeamCount(count);
    } else if (count < teamCount) {
      setTeams((prev) => {
        const reducedTeams = { ...prev };
        for (let i = count; i < teamCount; i++) {
          const key = teamKeyByIndex(i);
          const users = reducedTeams[key] ?? [];
          reducedTeams.pool = [...(reducedTeams.pool ?? []), ...users];
          delete reducedTeams[key];
        }
        return reducedTeams;
      });
      setTeamCount(count);
    }
  };

  const swapTeam = (from: string, to: string, target: string) => {
    if (from === to) return;
    setTeams((prev) => {
      const newFrom = [...(prev[from] ?? [])];
      const newTo = [...(prev[to] ?? [])];
      const targetIndex = newFrom.findIndex((player) => player.id === target);
      if (targetIndex === -1) return prev;
      const [removed] = newFrom.splice(targetIndex, 1);
      newTo.push(removed);

      return {
        ...prev,
        [from]: newFrom,
        [to]: newTo,
      };
    });
  };

  const removeFromTeam = (team: string, target: string) => {
    setTeams((prev) => {
      const currentTeam = [...(prev[team] ?? [])];
      const targetIndex = currentTeam.findIndex(
        (player) => player.id === target,
      );
      if (targetIndex === -1) return prev;
      const [removed] = currentTeam.splice(targetIndex, 1);
      return {
        ...prev,
        pool: [...(prev.pool ?? []), removed],
        [team]: currentTeam,
      };
    });
  };

  const removeAllFromTeam = (teamKey: string) => {
    if (!teams[teamKey]) return;

    setTeams((prev) => {
      const newTeams = { ...prev };
      newTeams.pool = [...(newTeams.pool ?? []), ...newTeams[teamKey]];
      delete newTeams[teamKey];
      return newTeams;
    });
  };

  const resetTeams = () => {
    setTeams((prev) => {
      const nextTeams: TeamMap = { ...prev };
      const recoveredPlayers = Object.entries(nextTeams)
        .filter(([key]) => key !== "pool")
        .flatMap(([, value]) => value ?? []);

      for (const key in nextTeams) {
        if (key !== "pool") nextTeams[key] = [];
      }
      nextTeams.pool = [...(nextTeams.pool ?? []), ...recoveredPlayers];

      return nextTeams;
    });
  };

  const saveTeams = async (name: string) => {
    const transformedTeams = Object.entries(teams)
      .filter(([key]) => key !== "pool")
      .map(([teamName, players]) => ({
        name: teamName,
        players: players.map((player) => ({
          id: player.id,
          name: player.name,
          backNumber: player.backNumber,
          position: player.position,
          isGuest: player.isGuest,
        })),
      }));
    try {
      await upsertTeamSnapshot({
        teamId: initialSnapshot?.id,
        name,
        createdBy: "68cb5e5d97e476f644d61caf",
        teamCount,
        teams: transformedTeams,
      });
      toast.success("성공적으로 저장되었습니다.", { position: "top-right" });
      router.push("/team/snapshots");
    } catch (error) {
      console.error(error);
      toast.error("알수 없는 오류로 저장에 실패하였습니다.", {
        position: "top-right",
      });
    }
  };

  const shareKakao = () => {
    const transformedTeams = Object.entries(teams)
      .filter(([key]) => key !== "pool")
      .map(([key, players]) => ({
        name: key,
        players: players.map(
          (player) =>
            `No.${player.backNumber.toString().padStart(2, "0")} ${player.name}`,
        ),
      }));

    handleShareKakao(transformedTeams, new Date());
  };

  const isValidTeams = () => {
    for (const teamKey of Object.keys(teams)) {
      if (teamKey === "pool") continue;
      if (teams[teamKey].length < 1) return false;
    }
    return true;
  };

  return {
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
  };
}
