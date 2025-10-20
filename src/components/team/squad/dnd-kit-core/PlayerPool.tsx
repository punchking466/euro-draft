"use client";

import { Badge } from "@/components/ui/badge";
import { PlayerDto } from "@/types/Player.type";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { forwardRef } from "react";
import { positive } from "zod";

interface PlayerPoolProps {
  players: PlayerDto[];
}

export const PlayerPool = forwardRef<HTMLDivElement, PlayerPoolProps>(
  ({ players }, ref) => {
    const groupbyPosition = players.reduce<Record<string, PlayerDto[]>>(
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
      <div
        ref={ref}
        className="max-h-[50lvh] overflow-y-auto rounded-2xl border-2 px-4 py-3"
      >
        {Object.entries(groupbyPosition).map(([position, players]) => (
          <section key={position} className="mb-4">
            <h3 className="mb-1 font-bold">{position}</h3>
            <div className="flex flex-wrap gap-4">
              {players.map((player) => (
                <DraggleablePlayer
                  key={player.id}
                  id={player.id}
                  backNumber={player.backNumber}
                  name={player.name}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  },
);

PlayerPool.displayName = "PlayerPool";

function DraggleablePlayer({
  id,
  backNumber,
  name,
}: {
  id: string;
  backNumber: number;
  name: string;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Badge
      ref={setNodeRef}
      key={id}
      style={style}
      {...attributes}
      {...listeners}
      variant="secondary"
      className="text-lg"
    >
      No.{backNumber} {name}
    </Badge>
  );
}
