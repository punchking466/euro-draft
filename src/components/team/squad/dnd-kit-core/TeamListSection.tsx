"use client";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

export function TeamListSection() {
  const [teamCount, setTeamCount] = useState(2);
  return (
    <div className="max-h-(--main-content-height) overflow-y-auto">
      <div className="grid gap-2">
        <Label>생성할 팀 수</Label>
        <ToggleGroup
          variant="outline"
          type="single"
          defaultValue={`${teamCount}`}
          value={`${teamCount}`}
          onValueChange={(val: string) => setTeamCount(Number(val))}
        >
          <ToggleGroupItem value="1">1</ToggleGroupItem>
          <ToggleGroupItem value="2">2</ToggleGroupItem>
          <ToggleGroupItem value="3">3</ToggleGroupItem>
          <ToggleGroupItem value="4">4</ToggleGroupItem>
          <ToggleGroupItem value="5">5</ToggleGroupItem>
          <ToggleGroupItem value="6">6</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2">
        {Array.from({ length: teamCount }).map((_, i) => (
          <div
            key={i}
            className="flex min-h-[200px] flex-col justify-between rounded-lg border p-4"
          >
            <div className="mb-2 font-bold">Team {i + 1}</div>
            <div className="flex flex-wrap gap-2">
              <Badge>홍길동</Badge>
            </div>
            <button
              className="mt-4 text-sm text-blue-500 underline"
              onClick={() => {}}
            >
              + 팀원 추가
            </button>
          </div>
        ))}
      </div>
      {/* <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2">
        <div className="min-h-[calc(var(--main-content-height)_/_2_-40px)] border">
          1
        </div>
        <div className="min-h-[calc(var(--main-content-height)_/_2_-40px)] border">
          2
        </div>
      </div> */}
    </div>
  );
}
