import React from "react";
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";

export function Droppable({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const { ref } = useDroppable({
    id,
    type: "column",
    accept: ["item"],
    collisionPriority: CollisionPriority.Low,
  });
  // console.log(id);
  return <div ref={ref}>{children}</div>;
}
