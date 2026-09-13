"use client";

import { useState } from "react";
import { Lock, LockOpen } from "lucide-react";

import { ColorSlotMenu } from "@/components/palette/ColorSlotMenu";

type ColorBlockProps = {
  color: string;
  name: string;
  index: number;
  locked: boolean;

  isSelected?: boolean;

  onSelect: () => void;
  onEdit: () => void;
  onRename: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onToggleLock: () => void;

  canDelete: boolean;
};

export function ColorBlock({
  color,
  name,
  index,
  locked,
  isSelected = false,

  onSelect,
  onEdit,
  onRename,
  onDuplicate,
  onDelete,
  onToggleLock,

  canDelete,
}: ColorBlockProps) {
  const [copied, setCopied] = useState(false);

  const isLight = isLightColor(color);

  const handleCopy = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    try {
      await navigator.clipboard.writeText(color);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1200);
    } catch (error) {
      console.error("Failed to copy color:", error);
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`
        group
        relative
        flex
        min-h-[230px]
        cursor-pointer
        flex-col
        justify-between
        p-5
        transition-all
        duration-300
        ease-out
        hover:scale-[1.01]
        md:min-h-[440px]

        ${isSelected ? "z-10 ring-2 ring-black ring-offset-2" : ""}
      `}
      style={{
        backgroundColor: color,
      }}
    >
      {/* =====================================================
          COLOR ACTIONS
      ===================================================== */}

      <ColorSlotMenu
        colorName={name}
        isLight={isLight}
        onEdit={onEdit}
        onRename={onRename}
        onDuplicate={onDuplicate}
        onDelete={onDelete}
        canDelete={canDelete}
      />

      {/* =====================================================
          TOP
      ===================================================== */}

      <div
        className={`
          flex
          items-center
          justify-between
          ${isLight ? "text-black" : "text-white"}
        `}
      >
        <span
          className="
            text-[11px]
            font-medium
            uppercase
            tracking-[0.12em]
            opacity-50
          "
        >
          Color
        </span>

        <div
          className="
            flex
            items-center
            gap-3
            pr-[44px]
          "
        >
          <span
            className="
              font-mono
              text-[10px]
              opacity-50
            "
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* LOCK */}

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onToggleLock();
            }}
            aria-label={locked ? "Unlock color" : "Lock color"}
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              border
              border-current
              opacity-0
              transition-all
              duration-200
              group-hover:opacity-100
              hover:bg-current/10
              focus:opacity-100
              focus:outline-none
            "
          >
            {locked ? (
              <Lock size={12} strokeWidth={2} />
            ) : (
              <LockOpen size={12} strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          BOTTOM
      ===================================================== */}

      <div
        className={`
          flex
          items-end
          justify-between
          gap-4
          ${isLight ? "text-black" : "text-white"}
        `}
      >
        <div
          className="
            min-w-0
            pr-12
          "
        >
          <p
            className="
              truncate
              text-sm
              font-medium
              tracking-tight
            "
          >
            {name}
          </p>

          <p
            className="
              mt-1
              font-mono
              text-[11px]
              uppercase
              opacity-50
            "
          >
            {color}
          </p>
        </div>

        {/* COPY */}

        <button
          type="button"
          onClick={handleCopy}
          className="
            shrink-0
            rounded-full
            border
            border-current
            px-3
            py-1.5
            text-[10px]
            font-medium
            opacity-0
            transition-all
            duration-200
            group-hover:opacity-100
            hover:bg-current/10
            focus:opacity-100
            focus:outline-none
          "
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* =====================================================
          LOCKED LABEL
      ===================================================== */}

      {locked && (
        <div
          className={`
            absolute
            left-5
            top-14
            flex
            items-center
            gap-1.5
            text-[10px]
            font-medium
            uppercase
            tracking-[0.12em]
            ${isLight ? "text-black" : "text-white"}
          `}
        >
          <Lock size={10} strokeWidth={2} />

          <span className="opacity-50">Locked</span>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   LIGHT COLOR DETECTION
============================================================ */

function isLightColor(hex: string) {
  const cleanHex = hex.replace("#", "");

  if (cleanHex.length !== 6) {
    return true;
  }

  const r = parseInt(cleanHex.substring(0, 2), 16);

  const g = parseInt(cleanHex.substring(2, 4), 16);

  const b = parseInt(cleanHex.substring(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.65;
}
