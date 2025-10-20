import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ReactNode } from "react";

interface CustomDialogProps {
  contentClassName?: string;
  trigger: ReactNode;
  title: ReactNode;
  children: ReactNode;
}

export function CustomDialog({
  contentClassName,
  trigger,
  title,
  children,
}: CustomDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={contentClassName}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
