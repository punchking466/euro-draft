import { CustomDialog } from "@/components/dialog/CustomDiaglog";
import { AddPlayerDialogBody } from "./AddPlayerDialogBody";

interface Props {
  open: boolean;
  teamKey: string;
  assignedIds: string[];
  onClose: () => void;
  onSubmit: (to: string, from: string, target: string) => void;
}
export function PlyaerToTeam({
  open,
  teamKey,
  assignedIds,
  onClose,
  onSubmit,
}: Props) {
  return (
    <CustomDialog title="팀원 추가" open={open} onClose={onClose}>
      <AddPlayerDialogBody
        assignedIds={assignedIds}
        onConfirm={(selectedIds) => {
          for (const id of selectedIds) {
            onSubmit("pool", teamKey, id);
          }
          onClose();
        }}
      />
    </CustomDialog>
  );
}
