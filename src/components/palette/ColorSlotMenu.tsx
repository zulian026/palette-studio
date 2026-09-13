"use client";

import { Copy, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { useEffect, useRef, useState } from "react";

type ColorSlotMenuProps = {
  colorName: string;
  isLight: boolean;

  onEdit: () => void;
  onRename: () => void;
  onDuplicate: () => void;
  onDelete: () => void;

  canDelete: boolean;
};

export function ColorSlotMenu({
  colorName,
  isLight,
  onEdit,
  onRename,
  onDuplicate,
  onDelete,
  canDelete,
}: ColorSlotMenuProps) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  /*
   * Close menu when clicking outside.
   */
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  /*
   * Close menu with Escape.
   */
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const textColor = isLight ? "text-black" : "text-white";

  const borderColor = isLight ? "border-black/15" : "border-white/20";

  const buttonBackground = isLight ? "bg-white/75" : "bg-black/45";

  const handleEdit = () => {
    setOpen(false);
    onEdit();
  };

  const handleRename = () => {
    setOpen(false);
    onRename();
  };

  const handleDuplicate = () => {
    setOpen(false);
    onDuplicate();
  };

  const handleDelete = () => {
    if (!canDelete) return;

    setOpen(false);
    onDelete();
  };

  return (
    <div
      ref={menuRef}
      className="
        absolute
        right-3
        top-1/2
        z-30
        -translate-y-1/2
      "
    >
      <div
        className="
          relative
          flex
          flex-col
          items-center
          gap-1.5
        "
      >
        {/* ====================================================
            MORE MENU
        ==================================================== */}

        <div
          className={`
            absolute
            right-10
            top-1/2
            -translate-y-1/2
            origin-right
            transition-all
            duration-200
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              open
                ? "translate-x-0 scale-100 opacity-100"
                : "pointer-events-none translate-x-2 scale-95 opacity-0"
            }
          `}
        >
          <div
            className={`
              flex
              flex-col
              gap-0.5
              rounded-[10px]
              border
              ${borderColor}
              ${isLight ? "bg-white/90" : "bg-black/60"}
              p-1
              shadow-[0_10px_30px_rgba(0,0,0,0.16)]
              backdrop-blur-xl
            `}
          >
            {/* Rename */}
            <MenuAction
              label="Rename"
              icon={<Pencil size={11} strokeWidth={1.8} />}
              onClick={handleRename}
              textColor={textColor}
            />

            {/* Duplicate */}
            <MenuAction
              label="Duplicate"
              icon={<Copy size={11} strokeWidth={1.8} />}
              onClick={handleDuplicate}
              textColor={textColor}
            />

            {/* Delete */}
            <MenuAction
              label="Delete"
              icon={<Trash2 size={11} strokeWidth={1.8} />}
              onClick={handleDelete}
              textColor={textColor}
              disabled={!canDelete}
              danger
            />
          </div>
        </div>

        {/* ====================================================
            EDIT BUTTON
        ==================================================== */}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleEdit();
          }}
          aria-label={`Edit ${colorName}`}
          className={`
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            ${borderColor}
            ${buttonBackground}
            ${textColor}
            shadow-sm
            backdrop-blur-md
            opacity-0
            transition-all
            duration-200
            group-hover:opacity-100
            hover:scale-105
            hover:bg-white
            hover:text-black
            focus:opacity-100
            focus:outline-none
            focus:ring-2
            focus:ring-white/50
          `}
        >
          <Pencil size={13} strokeWidth={1.8} />
        </button>

        {/* ====================================================
            MORE BUTTON
        ==================================================== */}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setOpen((value) => !value);
          }}
          aria-label={`More actions for ${colorName}`}
          aria-expanded={open}
          className={`
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            ${borderColor}
            ${buttonBackground}
            ${textColor}
            shadow-sm
            backdrop-blur-md
            opacity-0
            transition-all
            duration-200
            group-hover:opacity-100
            hover:scale-105
            hover:bg-white
            hover:text-black
            focus:opacity-100
            focus:outline-none
            focus:ring-2
            focus:ring-white/50
          `}
        >
          <MoreHorizontal size={14} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   MENU ACTION
============================================================ */

function MenuAction({
  label,
  icon,
  onClick,
  textColor,
  disabled = false,
  danger = false,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  textColor: string;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={`
        flex
        w-full
        items-center
        gap-2
        rounded-[7px]
        px-2.5
        py-1.5
        whitespace-nowrap
        text-[9px]
        font-medium
        transition-all
        duration-150
        ${
          danger
            ? "text-red-500 hover:bg-red-500/10"
            : `${textColor} hover:bg-black/5`
        }
        disabled:cursor-not-allowed
        disabled:opacity-30
      `}
    >
      {icon}

      <span>{label}</span>
    </button>
  );
}
