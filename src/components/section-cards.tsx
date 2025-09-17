import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { useModal } from "@/contexts/ModalContext";
import { useTransition, useMemo } from "react";
import { toast } from "sonner";
import { deletePlayer } from "@/actions/player";
import { useLoading } from "@/contexts/LoadingContext";

interface User {
  id: string;
  name: string;
  position: string;
  score: number;
  birthYear: number;
  lastPlayed: Date | undefined;
}

export function SectionCard({ user }: { user: User }) {
  const { showModal, hideModal } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const [isPending, startTransition] = useTransition();

  const age = useMemo(
    () => new Date().getFullYear() - user.birthYear + 1,
    [user.birthYear],
  );
  const formattedDate = useMemo(
    () =>
      user.lastPlayed
        ? new Date(user.lastPlayed).toLocaleDateString("ko-KR")
        : "정보 없음",
    [user.lastPlayed],
  );

  const confirmDelete = () => {
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
          action: () => handleDelete(user.id, user.name),
          variant: "danger",
        },
      ],
    });
  };

  const handleDelete = (id: string, name: string) => {
    showLoading();
    startTransition(async () => {
      try {
        await deletePlayer(id);
        toast(`${name} 님이 삭제되었습니다.`);
      } catch (error) {
        console.error(error);
        toast("삭제 중 오류가 발생했습니다.");
      } finally {
        hideLoading();
      }
    });
  };

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {user.name}
        </CardTitle>
        <CardAction>
          <Badge variant="secondary" className="mr-2">
            회원
          </Badge>
          <Badge
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              confirmDelete();
            }}
            className={isPending ? "pointer-events-none opacity-50" : ""}
          >
            삭제
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="text-muted-foreground flex flex-col gap-1 text-sm">
        <div>
          <span className="text-foreground font-medium">포지션:</span>{" "}
          {user.position}
        </div>
        <div>
          <span className="text-foreground font-medium">점수:</span>{" "}
          {user.score}
        </div>
        <div>
          <span className="text-foreground font-medium">출생년도:</span>{" "}
          {user.birthYear} ({age}세)
        </div>
        <div>
          <span className="text-foreground font-medium">마지막 참석일:</span>{" "}
          {formattedDate}
        </div>
      </CardContent>
    </Card>
  );
}
