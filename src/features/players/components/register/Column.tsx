"use client";
import { PlayerDto } from "@/features/players/types/Player.type";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash } from "lucide-react";
import { EditUserSheet } from "./EditUserSheet";
import { Badge } from "@/components/ui/badge";

export const getColumns = (
  userTypes: { label: string; value: string }[],
  onDelete: (user: PlayerDto) => void,
): ColumnDef<PlayerDto>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="!px-0"
        >
          이름
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "position",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="!px-0"
        >
          포지션
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "backNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="!px-0"
        >
          등번호
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "score",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="!px-0"
        >
          점수
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("score")}</div>;
    },
  },
  {
    accessorKey: "userType",
    header: "회원유형",
    cell: ({ row }) => {
      const userType = row.getValue("userType") as {
        value: string;
        label: string;
      };
      return <div className="font-medium">{userType.label}</div>;
    },
  },
  {
    accessorKey: "birthYear",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="!px-0"
        >
          출생연도
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const birthYear = row.getValue("birthYear") as number;
      return (
        <div className="font-medium">
          {birthYear} ({new Date().getFullYear() - birthYear + 1}세)
        </div>
      );
    },
  },
  {
    accessorKey: "lastPlayed",
    header: "마지막참가일",
    cell: ({ row }) => {
      // Parse ISO string for display.
      const lastPlayed = row.getValue("lastPlayed") as string;
      return (
        <div className="font-medium">
          {lastPlayed
            ? new Date(lastPlayed).toLocaleDateString("ko-KR")
            : "정보 없음"}
        </div>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex gap-2">
          <EditUserSheet user={user} userTypes={userTypes}>
            <Badge variant="secondary" className="mr-2">
              <div
                role="button"
                tabIndex={0}
                className="flex cursor-pointer gap-2"
              >
                <Pencil className="h-4 w-4" />
                <div>수정</div>
              </div>
            </Badge>
          </EditUserSheet>

          <Badge variant="destructive">
            <div
              role="button"
              tabIndex={0}
              className="flex cursor-pointer items-center gap-2"
              onClick={() => onDelete(user)}
            >
              <Trash className="h-4 w-4" />
              <span>삭제</span>
            </div>
          </Badge>
        </div>
      );
    },
  },
];
