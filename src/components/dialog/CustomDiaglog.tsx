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
  open?: boolean;
  contentClassName?: string;
  trigger?: ReactNode;
  title: ReactNode;
  children: ReactNode;
  onClose?: () => void;
}

export function CustomDialog({
  open,
  contentClassName,
  trigger,
  title,
  children,
  onClose = () => {},
}: CustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
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
