import { Spinner } from "./Spinner";

interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}

export const LoadingButton = ({
  isLoading,
  children,
  onClick,
  type = "button",
}: LoadingButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="relative flex items-center justify-center rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
      disabled={isLoading}
    >
      {isLoading && <Spinner size="sm" />}
      <span className={isLoading ? "ml-2" : ""}>{children}</span>
    </button>
  );
};
