"use client";

import { ArrowLeft, Trash2 } from "lucide-react";

import type { SavedPalette } from "@/types/palette";

type CollectionsPanelProps = {
  palettes: SavedPalette[];
  onSelect: (palette: SavedPalette) => void;
  onDelete: (id: string) => void;
};

export function CollectionsPanel({
  palettes,
  onSelect,
  onDelete,
}: CollectionsPanelProps) {
  return (
    <section className="mt-20">
      {/* Header */}

      <div className="flex items-end justify-between border-b border-black/10 pb-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/35">
            Collections
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Saved palettes
          </h2>
        </div>

        <span className="text-xs text-black/35">
          {palettes.length} {palettes.length === 1 ? "palette" : "palettes"}
        </span>
      </div>

      {/* Empty state */}

      {palettes.length === 0 ? (
        <div
          className="
            mt-4
            flex
            min-h-[220px]
            items-center
            justify-center
            rounded-[18px]
            border
            border-dashed
            border-black/10
            bg-white/50
          "
        >
          <div className="text-center">
            <p className="text-sm font-medium text-black/60">
              No saved palettes yet
            </p>

            <p className="mt-1 text-xs text-black/35">
              Save a palette to see it here.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {palettes.map((palette) => (
            <CollectionCard
              key={palette.id}
              palette={palette}
              onSelect={() => onSelect(palette)}
              onDelete={() => onDelete(palette.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/* ============================================================
   COLLECTION CARD
============================================================ */

function CollectionCard({
  palette,
  onSelect,
  onDelete,
}: {
  palette: SavedPalette;
  onSelect: () => void;
  onDelete: () => void;
}) {
  const formattedDate = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(palette.updatedAt));

  return (
    <article
      className="
        group
        overflow-hidden
        rounded-[18px]
        border
        border-black/10
        bg-white
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-black/15
        hover:shadow-[0_16px_50px_rgba(0,0,0,0.07)]
      "
    >
      {/* Color preview */}

      <button
        type="button"
        onClick={onSelect}
        className="
          block
          w-full
          text-left
          focus:outline-none
        "
      >
        <div className="flex h-28">
          {palette.colors.map((color) => (
            <div
              key={color.id}
              className="min-w-0 flex-1"
              style={{
                backgroundColor: color.hex,
              }}
            />
          ))}
        </div>

        {/* Information */}

        <div className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-medium tracking-tight">
                {palette.name}
              </h3>

              <p className="mt-1 text-[11px] text-black/40">
                {palette.colors.length}{" "}
                {palette.colors.length === 1 ? "color" : "colors"}
              </p>
            </div>

            <ArrowLeft
              size={14}
              className="
                rotate-180
                shrink-0
                text-black/20
                opacity-0
                transition-all
                duration-200
                group-hover:translate-x-0.5
                group-hover:text-black/50
                group-hover:opacity-100
              "
            />
          </div>

          <p className="mt-4 font-mono text-[9px] uppercase tracking-wide text-black/30">
            Updated {formattedDate}
          </p>
        </div>
      </button>

      {/* Delete */}

      <div className="border-t border-black/5 px-4 py-2.5">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onDelete();
          }}
          className="
            flex
            items-center
            gap-1.5
            text-[10px]
            font-medium
            text-black/30
            transition-colors
            hover:text-red-500
          "
        >
          <Trash2 size={11} />
          Delete
        </button>
      </div>
    </article>
  );
}
