import { PlayerDto } from "@/features/players/types/Player.type";
import { create } from "zustand";

interface UserStore {
  userMap: Map<string, PlayerDto>;
  positionMap: Record<string, PlayerDto[]>;
  setUserMap: (users: PlayerDto[]) => void;
}

export const useUserStore = create<UserStore>()((set) => ({
  userMap: new Map<string, PlayerDto>(),
  positionMap: {},
  setUserMap: (users) => {
    const playerMap = new Map<string, PlayerDto>(users.map((p) => [p.id, p]));
    const positionMap: Record<string, PlayerDto[]> = {
      PG: [],
      SG: [],
      SF: [],
      PF: [],
      C: [],
      기타: [],
    };

    for (const player of users) {
      const position = player.position ?? "기타";
      if (!positionMap[position]) positionMap[position] = [];
      positionMap[position].push(player);
    }
    return set({ userMap: playerMap, positionMap: positionMap });
  },
}));
