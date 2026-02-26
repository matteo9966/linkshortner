import React from "react";
import { cn } from "@/lib/utils";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-black p-4 rounded shadow-[0_0_15px_white] text-white m-auto border-white border-2",
          "font-bold text-lg",
          "hover:shadow-[0_0_20px_cyan] transition-shadow duration-300",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="neon-text">{children}</div>
      </div>
    </div>
  );
};
