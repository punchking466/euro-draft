"use client";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { TeamListSection } from "@/components/team/squad/dnd-kit-core/TeamListSection";
import { PlayerPool } from "@/components/team/squad/dnd-kit-core/PlayerPool";
import { PlayerDto } from "@/types/Player.type";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

interface TeamSquadClientProps {
  players: PlayerDto[];
}

export function TeamSquadClient({ players }: TeamSquadClientProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));
  const activePlayer = players.find((p) => p.id === activeId);
  const poolRef = useRef<HTMLDivElement>(null); // 🔹 DOM 직접 참조

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        console.log(active.id);
        setActiveId(active.id as string);
        if (poolRef.current) {
          poolRef.current.style.overflow = "hidden";
        }
      }}
      onDragEnd={() => {
        setActiveId(null);
        if (poolRef.current) {
          poolRef.current.style.overflowY = "auto";
        }
      }}
      onDragCancel={() => {
        setActiveId(null);
        if (poolRef.current) {
          poolRef.current.style.overflowY = "auto";
        }
      }}
    >
      <div className="flex-[6]">
        <TeamListSection />
      </div>

      <PlayerPool ref={poolRef} players={players} />
    </DndContext>
  );
}
