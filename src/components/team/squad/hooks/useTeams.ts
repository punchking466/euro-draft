import { registerTeams } from "@/actions/teamSquad";
import { handleShareKakao } from "@/lib/KakaoScript";
import { useUserStore } from "@/store/user/useUserStore";
import { useState } from "react";

export function useTeams(pool: string[]) {
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState<Record<string, string[]>>({
    pool: [...(pool ?? [])],
    ["Black 1팀"]: [],
    ["White 1팀"]: [],
  });
  const userMap = useUserStore((state) => state.userMap);

  const changeTeam = (count: number) => {
    const newTeams = { ...teams };
    if (count > teamCount) {
      for (let i = teamCount; i < count; i++) {
        newTeams[
          `${i % 2 === 0 ? "Black" : "White"} ${Math.floor(i / 2) + 1}팀`
        ] = [];
      }
      setTeams(newTeams);
      setTeamCount(count);
    } else if (count < teamCount) {
      setTeams((prev) => {
        const newTeams = { ...prev };
        for (let i = count; i < teamCount; i++) {
          const key = `${i % 2 === 0 ? "Black" : "White"} ${Math.floor(i / 2) + 1}팀`;
          const users = newTeams[key] ?? [];
          newTeams["pool"] = [...(newTeams["pool"] ?? []), ...users];
          delete newTeams[key];
        }
        return newTeams;
      });
      setTeamCount(count);
    } else {
      return;
    }
  };

  const swapTeam = (from: string, to: string, target: string) => {
    if (from === to) return;
    setTeams((prev) => {
      const newFrom = [...(prev[from] ?? [])];
      const newTo = [...(prev[to] ?? [])];
      const targetIndex = newFrom.indexOf(target);
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

  const addToTeam = (team: string, ids: string[]) => {
    if (!ids) return;
    setTeams((prev) => ({
      ...prev,
      [team]: [...(prev[team] ?? []), ...ids],
    }));
  };

  const removeFromTeam = (team: string, target: string) => {
    setTeams((prev) => {
      const newTeams = { ...prev };

      return {
        ...prev,
        ["pool"]: [...(newTeams["pool"] ?? []), target],
        [team]: [...(newTeams[team] ?? []).filter((id) => id !== target)],
      };
    });
  };

  const removeAllFromTeam = (teamKey: string) => {
    if (!teams[teamKey]) return;

    setTeams((prev) => {
      const newTeams = { ...prev };
      newTeams["pool"] = [...(newTeams["pool"] ?? []), ...newTeams[teamKey]];
      delete newTeams[teamKey];
      return newTeams;
    });
  };

  const resetTeams = () => {
    setTeams((prev) => {
      const newTeams: Record<string, string[]> = { ...prev };

      const recoveredPlayers = Object.entries(newTeams)
        .filter(([key, _]) => key !== "pool")
        .flatMap(([_, value]) => value ?? []);

      for (const key in newTeams) {
        if (key !== "pool") newTeams[key] = [];
      }
      newTeams["pool"] = [...(newTeams["pool"] ?? []), ...recoveredPlayers];

      return newTeams;
    });
  };

  const saveTeams = (name: string) => {
    const transformedTeams = Object.entries(teams)
      .filter(([key]) => key !== "pool")
      .map(([_, players], index) => ({
        name: `${index % 2 === 0 ? "Black" : "White"} ${Math.floor(index / 2) + 1}팀`,
        players,
      }));

    registerTeams({
      name: name,
      createdBy: "68cb5e5d97e476f644d61caf",
      teamCount,
      teams: transformedTeams,
    });
  };

  const shareKakao = () => {
    const filtered = Object.entries(teams).filter(([key]) => key !== "pool");

    const transformedTeams = filtered.map(([key, playerIds]) => {
      const players = playerIds
        .map(
          (id) =>
            `No.${userMap.get(id)?.backNumber.toString().padStart(2, "0")} ${userMap.get(id)?.name}`,
        )
        .filter(Boolean);

      return {
        name: key,
        players,
      };
    });

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
    addToTeam,
    removeFromTeam,
    removeAllFromTeam,
    resetTeams,
    shareKakao,
    isValidTeams,
  };
}
