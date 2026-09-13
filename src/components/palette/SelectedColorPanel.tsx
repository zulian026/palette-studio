"use client";

import { Edit3 } from "lucide-react";

import type { PaletteColor } from "@/types/palette";

import { ColorInspector } from "@/components/palette/ColorInspector";

type SelectedColorPanelProps = {
  color: PaletteColor | null;
  onEdit: () => void;
};

export function SelectedColorPanel({ color, onEdit }: SelectedColorPanelProps) {
  // Tidak ada warna yang dipilih.
  // Jangan render panel apa pun.
  if (!color) {
    return null;
  }

  return (
    <section
      className="
        mt-6
        grid
        gap-6
        lg:grid-cols-[1fr_380px]
      "
    >
      {/* ======================================================
          COLOR PREVIEW
      ====================================================== */}

      <div
        className="
          hidden
          rounded-[18px]
          border
          border-black/10
          bg-white
          p-8
          lg:block
        "
      >
        <div
          className="
            flex
            h-full
            min-h-[300px]
            flex-col
            items-center
            justify-center
          "
        >
          {/* Color Preview */}
          <div
            className="
              h-24
              w-24
              rounded-[24px]
              border
              border-black/10
              shadow-sm
            "
            style={{
              backgroundColor: color.hex,
            }}
          />

          {/* Color Name */}
          <p
            className="
              mt-5
              text-lg
              font-medium
              tracking-tight
            "
          >
            {color.name}
          </p>

          {/* HEX */}
          <p
            className="
              mt-1
              font-mono
              text-xs
              uppercase
              text-black/40
            "
          >
            {color.hex}
          </p>

          {/* Edit Button */}
          <button
            type="button"
            onClick={onEdit}
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-black/10
              bg-white
              px-4
              py-2
              text-[11px]
              font-medium
              text-black/55
              transition-all
              duration-200
              hover:border-black/20
              hover:bg-black/[0.03]
              hover:text-black
            "
          >
            <Edit3 size={13} strokeWidth={1.8} />
            Edit color
          </button>
        </div>
      </div>

      {/* ======================================================
          COLOR INSPECTOR
      ====================================================== */}

      <ColorInspector color={color} />
    </section>
  );
}
