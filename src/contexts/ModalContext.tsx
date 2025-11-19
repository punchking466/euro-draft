"use client";

import React, { createContext, useContext, useState } from "react";

interface ModalOptions {
  title?: string;
  message: string;
  type?: "info" | "error" | "success";
  confirmButtons?: {
    label: string;
    action: () => void;
    variant?: "primary" | "secondary" | "danger";
  }[];
}

interface ModalContextValue {
  showModal: (options: ModalOptions) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextValue>({
  showModal: () => {},
  hideModal: () => {},
});

export const useAlertModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ModalOptions | null>(null);

  const showModal = (opts: ModalOptions) => {
    setOptions(opts);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    setOptions(null);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {isOpen && options && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(0,0,0,0.3)] p-10">
          <div className="w-full max-w-sm rounded bg-white p-6 shadow-lg">
            {options.title && (
              <h2 className="mb-2 text-lg font-bold">{options.title}</h2>
            )}
            <p className="mb-4 whitespace-pre-line text-gray-700">
              {options.message}
            </p>
            <div className="flex justify-end gap-2">
              {(
                options.confirmButtons || [
                  { label: "확인", action: hideModal, variant: "primary" },
                ]
              ).map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    btn.action();
                    hideModal();
                  }}
                  className={`rounded px-4 py-2 text-white ${
                    {
                      primary: "bg-blue-500",
                      secondary: "bg-gray-500",
                      danger: "bg-red-500",
                    }[btn.variant || "primary"]
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
