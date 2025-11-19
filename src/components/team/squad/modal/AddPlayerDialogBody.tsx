import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user/useUserStore";
import { cn } from "@/lib/utils";

interface Props {
  assignedIds: string[];
  onConfirm: (selectedIds: string[]) => void;
}

export const AddPlayerDialogBody = ({ assignedIds, onConfirm }: Props) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const groupByPosition = useUserStore((state) => state.positionMap);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  return (
    <div className="space-y-2">
      {Object.entries(groupByPosition).map(([pos, players]) => (
        <div key={pos}>
          <div className="mb-1 text-sm font-semibold">{pos}</div>
          <div className="flex flex-wrap gap-2">
            {players.map((player) => {
              const isSelected = selectedIds.has(player.id);
              const isDisabled = assignedIds.includes(player.id);
              if (!player) return;
              return (
                <Badge
                  key={player.id}
                  onClick={() => {
                    if (!isDisabled) toggleSelect(player.id);
                  }}
                  className={cn(
                    `cursor-pointer px-3 py-1 text-sm text-black`,
                    `${isDisabled ? "cursor-not-allowed bg-gray-300 text-gray-500" : ""}`,
                    `${isSelected ? "bg-blue-600 text-white" : "bg-muted"}`,
                  )}
                >
                  No.{player.backNumber} {player.name}
                </Badge>
              );
            })}
          </div>
        </div>
      ))}

      <div className="pt-3">
        <Button
          className="w-full"
          onClick={() => onConfirm(Array.from(selectedIds))}
        >
          저장
        </Button>
      </div>
    </div>
  );
};
