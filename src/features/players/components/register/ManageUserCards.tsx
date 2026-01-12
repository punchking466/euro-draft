"use client";
import { PlayerDto } from "@/features/players/types/Player.type";
import { EditUserSheet } from "./EditUserSheet";
import { SectionCard } from "./section-cards";

interface Props {
  players: PlayerDto[];
  userTypes: { value: string; label: string }[];
}

export function ManageUserCards({ players, userTypes }: Props) {
  const grouped = players.reduce<Record<string, PlayerDto[]>>(
    (acc, player) => {
      const pos = player.position ?? "기타";
      if (!acc[pos]) acc[pos] = [];
      acc[pos].push(player);
      return acc;
    },
    {
      PG: [],
      SG: [],
      SF: [],
      PF: [],
      C: [],
    },
  );
  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([position, users]) => (
        <section key={position}>
          <h2 className="mb-2 text-xl font-bold lg:px-6">{position}</h2>
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            {users.map((user) => (
              <EditUserSheet key={user.id} user={user} userTypes={userTypes}>
                <div role="button" tabIndex={0} className="cursor-pointer">
                  <SectionCard user={user} />
                </div>
              </EditUserSheet>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
