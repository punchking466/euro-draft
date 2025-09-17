import { Spinner } from "./Spinner";

export const ModalLoader = () => {
  return (
    <div className="flex h-[200px] w-full items-center justify-center">
      <Spinner size="md" />
    </div>
  );
};
