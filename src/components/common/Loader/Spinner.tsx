import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-10 h-10 border-4",
};

export const Spinner = ({ size = "md" }: SpinnerProps) => {
  return (
    <div
      className={`animate-spin rounded-full border-blue-500 border-t-transparent ${sizeClasses[size]}`}
    />
  );
};
