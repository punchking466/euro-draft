import { useState } from "react";

export function useTeams(pool: string[]) {
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState<Record<string, string[]>>({
    pool: [...(pool ?? [])],
    team1: [],
    team2: [],
  });

  const changeTeam = (count: number) => {
    const newTeams = { ...teams };
    if (count > teamCount) {
      for (let i = teamCount + 1; i < count; i++) {
        newTeams[`team${i}`] = [];
      }
      setTeams(newTeams);
      setTeamCount(count);
    } else if (count < teamCount) {
      setTeams((prev) => {
        const newTeams = { ...prev };
        for (let i = count + 1; i <= teamCount; i++) {
          const key = `team${i}`;
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
      const recoveredPlayers: string[] = [];

      for (let i = 1; i <= teamCount; i++) {
        const teamKey = `team${i}`;
        recoveredPlayers.push(...(newTeams[teamKey] ?? []));
        newTeams[teamKey] = [];
      }

      newTeams["pool"] = [...(newTeams["pool"] ?? []), ...recoveredPlayers];

      return newTeams;
    });
  };
  return {
    teams,
    teamCount,
    changeTeam,
    setTeams,
    swapTeam,
    addToTeam,
    removeFromTeam,
    removeAllFromTeam,
    resetTeams,
  };
}
