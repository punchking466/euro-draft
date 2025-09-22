"use client";

import { use, useState, useTransition } from "react";
import { ManageUserCards } from "./ManageUserCards";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PlayerDto } from "@/types/Player.type";
import { LayoutGrid, Table } from "lucide-react";
import { DataTable } from "../DataTable/DataTable";
import { getColumns } from "./Column";
import { useModal } from "@/contexts/ModalContext";
import { useLoading } from "@/contexts/LoadingContext";
import { toast } from "sonner";
import { deletePlayer } from "@/actions/player";

interface Props {
  players: Promise<PlayerDto[]>;
  playerTypes: Promise<{ value: string; label: string }[]>;
}

export function ManageUserView({ players, playerTypes }: Props) {
  const allPlayers = use(players);
  const allUserTypes = use(playerTypes);

  const { showModal, hideModal } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const startTransition = useTransition()[1];

  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  const handleDeleteUser = (user: PlayerDto) => {
    showModal({
      title: "삭제",
      message: `${user.name} 님을 정말 삭제하시겠습니까?`,
      confirmButtons: [
        {
          label: "취소",
          action: hideModal,
          variant: "secondary",
        },
        {
          label: "삭제",
          variant: "danger",
          action: () => {
            showLoading();
            startTransition(async () => {
              try {
                await deletePlayer(user.id);
                toast(`${user.name} 님이 삭제되었습니다.`);
              } catch (error) {
                console.error(error);

                toast("삭제 중 오류가 발생했습니다.");
              } finally {
                hideLoading();
              }
            });
          },
        },
      ],
    });
  };

  return (
    <div className="space-y-4 p-4">
      <ToggleGroup
        type="single"
        value={viewMode}
        onValueChange={(val) => setViewMode(val as "card" | "table")}
      >
        <ToggleGroupItem value="card">
          <LayoutGrid />
        </ToggleGroupItem>
        <ToggleGroupItem value="table">
          <Table />
        </ToggleGroupItem>
      </ToggleGroup>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 p-4 md:gap-6 md:py-6">
          {viewMode === "card" ? (
            <ManageUserCards players={allPlayers} userTypes={allUserTypes} />
          ) : (
            <DataTable
              columns={getColumns(allUserTypes, handleDeleteUser)}
              data={allPlayers}
            />
          )}
        </div>
      </div>
    </div>
  );
}
