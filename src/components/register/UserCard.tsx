"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { upsertPlayer } from "@/actions/player";
import { SectionCard } from "../section-cards";
import { CalendarPop } from "../calendar/CalendarPop";
import { SelectPosition } from "./SelectPosition";
import { useActionState, useEffect, useState } from "react";
import { FullscreenLoader } from "../common/Loader/FullscreenLoader";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  position: string;
  score: number;
  birthYear: number;
  lastPlayed: Date | undefined;
}

interface FormState {
  value: Record<string, string> | undefined;
  errors: Record<string, string>;
}

const initialState: FormState = {
  value: undefined,
  errors: {},
};

export function UserCard({ user }: { user: User }) {
  const [state, formAction, isPending] = useActionState(
    upsertPlayer,
    initialState,
  );

  const [open, setOpen] = useState(false);

  const [positionValue, setPositionValue] = useState(user.position ?? "");
  const [lastPlayed, setLastPlayed] = useState<Date | undefined>(
    user.lastPlayed ?? undefined,
  );

  useEffect(() => {
    if (state.errors.id) {
      toast("알 수 없는 에러가 발생하였습니다!");
    }
  }, [state]);

  return (
    <Sheet
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        state.value = undefined;
        state.errors = {};
      }}
    >
      {isPending && <FullscreenLoader />}

      <SheetTrigger asChild>
        <div role="button" tabIndex={0} className="cursor-pointer">
          <SectionCard user={user} />
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>회원 등록</SheetTitle>
          <SheetDescription>회원을 등록하거나 수정해보세요</SheetDescription>
        </SheetHeader>

        <form
          action={formAction}
          className="grid gap-4 p-4"
          onSubmit={() => {
            if (
              state &&
              (!state.errors || Object.keys(state.errors).length === 0)
            ) {
              console.log(state);
              setPositionValue("");
              setLastPlayed(undefined);
              setOpen(false);
            }
          }}
        >
          <input
            type="hidden"
            name="id"
            value={state.value?.id ?? user.id}
            required
          />

          <div className="grid gap-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              name="name"
              defaultValue={state.value?.name ?? user.name}
              className={
                state && state.errors?.name
                  ? "border-red-500 ring-1 ring-red-500"
                  : ""
              }
            />
            {state && state.errors?.name && (
              <p className="text-sm text-red-500">{state.errors["name"]}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="position">포지션</Label>
            <SelectPosition
              positionValue={positionValue}
              isError={!!state.errors?.position}
              onChange={(val: string) => setPositionValue(val)}
            />

            {state && state.errors?.position && (
              <p className="text-sm text-red-500">{state.errors.position}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="score">점수</Label>
            <Input
              id="score"
              name="score"
              defaultValue={state.value?.score ?? user.score}
              className={
                state && state.errors?.score
                  ? "border-red-500 ring-1 ring-red-500"
                  : ""
              }
            />
            {state && state.errors?.score && (
              <p className="text-sm text-red-500">{state.errors.score}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="birthYear">출생년도</Label>
            <Input
              id="birthYear"
              name="birthYear"
              placeholder="ex) 1989"
              defaultValue={state.value?.birthYear ?? user.birthYear}
              className={
                state && state.errors?.birthYear
                  ? "border-red-500 ring-1 ring-red-500"
                  : ""
              }
            />
            {state && state.errors?.birthYear && (
              <p className="text-sm text-red-500">{state.errors.birthYear}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastPlayed">마지막 참석일</Label>
            <CalendarPop
              lastPlayed={lastPlayed}
              isError={!!state.errors.lastPlayed}
              onChange={(date) => setLastPlayed(date)}
            />
            {state && state.errors?.lastPlayed && (
              <p className="text-sm text-red-500">{state.errors.lastPlayed}</p>
            )}
          </div>

          <SheetFooter className="mt-4 flex justify-between">
            <Button name="intent" value="save" type="submit">
              저장
            </Button>
            <Button
              name="intent"
              value="delete"
              type="submit"
              variant="destructive"
            >
              삭제
            </Button>
            <SheetClose asChild>
              <Button type="button" variant="outline">
                닫기
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
