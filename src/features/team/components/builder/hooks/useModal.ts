import { useState } from "react";

/**
 * 여러 모달 상태를 하나로 통합 관리하는 커스텀 훅
 *
 * @returns {Object} 모달 상태 및 제어 함수
 * @property {("none" | string)} openModal - 현재 열려 있는 모달 키. "none"이면 모두 닫힌 상태.
 * @property {(key: string) => void} open - 특정 모달을 여는 함수
 * @property {() => void} close - 모든 모달을 닫는 함수
 * @property {(key: string) => boolean} isOpen - 주어진 모달 키가 현재 열려 있는지 여부
 *
 * @example
 * const { open, close, isOpen } = useAlertModal();
 * open("edit"); // edit 모달 열기
 * isOpen("edit"); // true
 * close(); // 모든 모달 닫기
 */
export function useModalState(): {
  open: (key: string) => void;
  close: () => void;
  isOpen: (key: string) => boolean;
} {
  const [openModal, setOpenModal] = useState<"none" | string>("none");

  const open = (key: string) => setOpenModal(key);
  const close = () => setOpenModal("none");
  const isOpen = (key: string) => key === openModal;

  return {
    open,
    close,
    isOpen,
  };
}
