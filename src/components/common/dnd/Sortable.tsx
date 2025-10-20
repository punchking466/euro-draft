import React from "react";
import { useSortable } from "@dnd-kit/react/sortable";

export function Sortable({
  id,
  index,
  children,
}: {
  id: string;
  index: number;
  children: React.ReactNode;
}) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "item",
    accept: ["item"],
  });

  return (
    <div
      ref={ref}
      className={isDragging ? "rounded-md ring-2 ring-blue-400" : ""}
    >
      {children}
    </div>
  );
}
