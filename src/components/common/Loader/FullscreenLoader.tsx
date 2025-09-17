import { Spinner } from "./Spinner";

export const FullscreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 opacity-30">
      <Spinner size="lg" />
    </div>
  );
};
