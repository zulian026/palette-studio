"use client";

import { Check, Copy, Lock, Palette } from "lucide-react";
import { useEffect } from "react";

export type ToastType = "success" | "copy" | "lock" | "palette";

type ToastProps = {
  message: string;
  type?: ToastType;
  onClose: () => void;
};

export function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 2200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [onClose]);

  const Icon =
    type === "copy"
      ? Copy
      : type === "lock"
        ? Lock
        : type === "palette"
          ? Palette
          : Check;

  return (
    <div
      className="
        pointer-events-none
        fixed
        bottom-6
        left-1/2
        z-[200]
        -translate-x-1/2
        animate-[toast-in_220ms_cubic-bezier(0.22,1,0.36,1)]
      "
    >
      <div
        className="
          flex
          items-center
          gap-2.5
          rounded-full
          border
          border-black/10
          bg-black
          px-3.5
          py-2.5
          text-white
          shadow-[0_12px_40px_rgba(0,0,0,0.18)]
        "
      >
        <span
          className="
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-full
            bg-white/15
          "
        >
          <Icon size={11} strokeWidth={2} />
        </span>

        <span className="text-[11px] font-medium">{message}</span>
      </div>
    </div>
  );
}
