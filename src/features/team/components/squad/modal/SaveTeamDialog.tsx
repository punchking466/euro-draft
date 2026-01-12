import { CustomDialog } from "@/components/dialog/CustomDiaglog";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDateTypeA } from "@/utils/dateFormat";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export function SaveTeamDialog({ open, onClose, onSubmit }: Props) {
  const [teamName, setTeamName] = useState(() => {
    return `${formatDateTypeA(new Date())} 유로 정규 경기`;
  });
  return (
    <CustomDialog
      contentClassName="max-h-[70lvh] overflow-y-auto"
      title="스쿼드 저장"
      open={open}
      onClose={onClose}
    >
      <form className="grid gap-2">
        <Label htmlFor="team-name">팀 이름</Label>
        <Input
          id="team-name"
          name="team-name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </form>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">닫기</Button>
        </DialogClose>

        <Button
          type="submit"
          onClick={() => {
            onSubmit(teamName);
            onClose();
          }}
        >
          저장
        </Button>
      </DialogFooter>
    </CustomDialog>
  );
}
