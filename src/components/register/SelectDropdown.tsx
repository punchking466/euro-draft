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

export function SelectDropdown({
  inputName,
  selectedValue,
  selectValues,
  placeholder,
  isError,
  onChange,
}: {
  inputName: string;
  selectedValue: string;
  placeholder: string;
  selectValues: { label: string; value: string }[];
  isError: boolean;
  onChange: (val: string) => void;
}) {
  const selectedLabel =
    selectValues.find((item) => item.value === selectedValue)?.label || "";
  return (
    <>
      <Select value={selectedValue} onValueChange={(val) => onChange(val)}>
        <SelectTrigger
          className={cn(
            "w-full",
            isError && "border-red-500 ring-1 ring-red-500",
          )}
        >
          <SelectValue placeholder={placeholder}>{selectedLabel}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {selectValues.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <input
        type="hidden"
        id={inputName}
        name={inputName}
        value={selectedValue}
      />
    </>
  );
}
