"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function SelectPosition({
  positionValue,
  isError,
  onChange,
}: {
  positionValue: string;
  isError: boolean;
  onChange: (val: string) => void;
}) {
  return (
    <>
      <Select value={positionValue} onValueChange={(val) => onChange(val)}>
        <SelectTrigger
          className={cn(
            "w-full",
            isError && "border-red-500 ring-1 ring-red-500",
          )}
        >
          <SelectValue placeholder="포지션을 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PG">PG</SelectItem>
          <SelectItem value="SG">SG</SelectItem>
          <SelectItem value="SF">SF</SelectItem>
          <SelectItem value="PF">PF</SelectItem>
          <SelectItem value="C">C</SelectItem>
        </SelectContent>
      </Select>
      <input
        type="hidden"
        id="position"
        name="position"
        value={positionValue}
      />
    </>
  );
}
