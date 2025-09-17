"use client";

import { registerPlayer } from "@/actions/player";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Label } from "@radix-ui/react-label";
import { UserPlus } from "lucide-react";
import { use, useActionState, useEffect, useState } from "react";
import { FullscreenLoader } from "../common/Loader/FullscreenLoader";
import { CalendarPop } from "../calendar/CalendarPop";
import { SelectDropdown } from "./SelectDropdown";

interface FormState {
  value: Record<string, string> | undefined;
  errors: Record<string, string>;
}

const initialState: FormState = {
  value: undefined,
  errors: {},
};

export function AddPlayerSheet({
  userTypes,
}: {
  userTypes: Promise<{ value: string; label: string }[]>;
}) {
  const allUserTypes = use(userTypes);
  const [state, formAction, isPending] = useActionState(
    registerPlayer,
    initialState,
  );

  const [open, setOpen] = useState(false);

  const [positionValue, setPositionValue] = useState("");
  const [userTypeValue, setUserTypeValue] = useState("");
  const [lastPlayed, setLastPlayed] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (
      state &&
      Object.keys(state.errors).length === 0 &&
      state.value === undefined
    ) {
      setPositionValue("");
      setLastPlayed(undefined);
      setOpen(false);
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
        <UserPlus />
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>회원 등록</SheetTitle>
          <SheetDescription>회원을 등록하거나 수정해보세요</SheetDescription>
        </SheetHeader>

        <form action={formAction} className="grid gap-4 p-4">
          <div className="grid gap-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              name="name"
              defaultValue={state.value?.name ?? ""}
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
            <Label htmlFor="userType">회원유형</Label>
            <SelectDropdown
              inputName="userType"
              selectedValue={userTypeValue}
              selectValues={allUserTypes}
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
              defaultValue={state.value?.score ?? ""}
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
              defaultValue={state.value?.birthYear ?? ""}
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
