import { CustomDialog } from "@/components/dialog/CustomDiaglog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddPlayerDialogBody } from "./AddPlayerDialogBody";

interface Props {
  teamKey: string;
  assignedIds: string[];
  onSubmit: (to: string, from: string, target: string) => void;
}
export function PlyaerToTeam({ teamKey, assignedIds, onSubmit }: Props) {
  return (
    <CustomDialog
      title="팀원 추가"
      trigger={
        <Button
          variant="outline"
          className="mt-4 flex w-fit items-center gap-1 px-2 py-1 text-sm text-blue-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
        >
          <Plus className="h-4 w-4" />
          팀원 추가
        </Button>
      }
    >
      <AddPlayerDialogBody
        assignedIds={assignedIds}
        onConfirm={(selectedIds) => {
          for (const id of selectedIds) {
            onSubmit("pool", teamKey, id);
          }
        }}
      />
    </CustomDialog>
  );
}
