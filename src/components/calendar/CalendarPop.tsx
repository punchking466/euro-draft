"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function CalendarPop({
  lastPlayed,
  isError,
  onChange,
}: {
  lastPlayed: Date | undefined;
  isError: boolean;
  onChange: (date: Date | undefined) => void;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={cn(
              "justify-between font-normal",
              isError && "border-red-500 ring-1 ring-red-500",
            )}
          >
            {lastPlayed
              ? new Date(lastPlayed).toLocaleDateString()
              : "날짜를 선택하세요"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={lastPlayed}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>

      <input
        type="hidden"
        name="lastPlayed"
        value={lastPlayed ? lastPlayed.toISOString() : ""}
      />
    </>
  );
}
