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
import { CalendarPop } from "../calendar/CalendarPop";
import { useActionState, useEffect, useState } from "react";
import { FullscreenLoader } from "../common/Loader/FullscreenLoader";
import { toast } from "sonner";
import { PlayerDto } from "@/types/Player.type";
import { SelectDropdown } from "./SelectDropdown";

interface FormState {
  value: Record<string, string> | undefined;
  errors: Partial<Record<string, string>>;
}

const initialState: FormState = {
  value: undefined,
  errors: {},
};

export function EditUserSheet({
  user,
  userTypes,
  children,
}: {
  user: PlayerDto;
  userTypes: { value: string; label: string }[];
  children: React.ReactNode;
}) {
  const [state, formAction, isPending] = useActionState(
    upsertPlayer,
    initialState,
  );

  const [open, setOpen] = useState(false);

  const [positionValue, setPositionValue] = useState(user.position ?? "");
  const [userTypeValue, setUserTypeValue] = useState("");
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

      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>회원 수정</SheetTitle>
          <SheetDescription>회원 수정</SheetDescription>
        </SheetHeader>

        <form
          action={formAction}
          className="grid gap-4 p-4"
          onSubmit={() => {
            if (
              state &&
              (!state.errors || Object.keys(state.errors).length === 0)
            ) {
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
            <SelectDropdown
              inputName="position"
              selectedValue={positionValue}
              selectValues={[
                { label: "PG", value: "PG" },
                { label: "SG", value: "SG" },
                { label: "SF", value: "SF" },
                { label: "PF", value: "PF" },
                { label: "C", value: "C" },
              ]}
              placeholder="포지션을 선택해 주세요"
              isError={!!state.errors?.position}
              onChange={(val: string) => setPositionValue(val)}
            />

            {state && state.errors?.position && (
              <p className="text-sm text-red-500">{state.errors.position}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">등번호</Label>
            <Input
              id="backNumber"
              name="backNumber"
              type="number"
              inputMode="numeric"
              defaultValue={state.value?.backNumber ?? user.backNumber}
              className={
                state && state.errors?.name
                  ? "border-red-500 ring-1 ring-red-500"
                  : ""
              }
            />
            {state && state.errors?.backNumber && (
              <p className="text-sm text-red-500">
                {state.errors["backNumber"]}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="userType">회원유형</Label>
            <SelectDropdown
              inputName="userType"
              selectedValue={(userTypeValue || `${user.userType?.code}`) ?? ""}
              selectValues={userTypes}
              placeholder="회원 유형을 선택해 주세요"
              isError={!!state.errors?.position}
              onChange={(val: string) => setUserTypeValue(val)}
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
            <Label htmlFor="birthYear">출생연도</Label>
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
            <Button type="submit">저장</Button>
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
