"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Check, X } from "lucide-react";

type ImportPaletteModalProps = {
  open: boolean;
  onClose: () => void;
  onImport: (input: string) => void;
};

const HEX_REGEX = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g;

const MAX_COLORS = 12;

function extractHexColors(input: string) {
  const trimmed = input.trim();

  if (!trimmed) {
    return [];
  }

  // JSON array support
  try {
    const parsed = JSON.parse(trimmed);

    if (Array.isArray(parsed)) {
      const jsonColors = parsed
        .filter((item): item is string => typeof item === "string")
        .flatMap((item) => item.match(HEX_REGEX) ?? []);

      if (jsonColors.length > 0) {
        return Array.from(
          new Set(jsonColors.map((color) => normalizeHex(color))),
        ).slice(0, MAX_COLORS);
      }
    }
  } catch {
    // Not JSON — continue with normal HEX parsing.
  }

  const matches = trimmed.match(HEX_REGEX) ?? [];

  return Array.from(new Set(matches.map((color) => normalizeHex(color)))).slice(
    0,
    MAX_COLORS,
  );
}

function normalizeHex(color: string) {
  let hex = color.toUpperCase();

  if (hex.length === 4) {
    hex =
      "#" +
      hex
        .slice(1)
        .split("")
        .map((char) => char + char)
        .join("");
  }

  return hex;
}

export function ImportPaletteModal({
  open,
  onClose,
  onImport,
}: ImportPaletteModalProps) {
  const [value, setValue] = useState("");

  const colors = useMemo(() => extractHexColors(value), [value]);

  const hasInput = value.trim().length > 0;
  const hasColors = colors.length > 0;

  const handleClose = () => {
    setValue("");
    onClose();
  };

  const handleImport = () => {
    if (!hasColors) {
      return;
    }

    onImport(value);

    setValue("");
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/20
        p-4
        backdrop-blur-sm
      "
      onMouseDown={handleClose}
    >
      <div
        className="
          w-full
          max-w-lg
          overflow-hidden
          rounded-2xl
          border
          border-black/10
          bg-white
          shadow-[0_24px_80px_rgba(0,0,0,0.18)]
        "
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-black/10
            px-5
            py-4
          "
        >
          <div>
            <h2 className="text-sm font-semibold tracking-tight">
              Import palette
            </h2>

            <p className="mt-0.5 text-[11px] text-black/45">
              Paste HEX colors, a list, or JSON.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              text-black/45
              transition
              hover:bg-black/5
              hover:text-black
            "
            aria-label="Close import palette"
          >
            <X size={15} />
          </button>
        </div>

        {/* Content */}

        <div className="p-5">
          <textarea
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={`#6366F1
#8B5CF6
#EC4899
#F97316
#FACC15`}
            className="
              min-h-[150px]
              w-full
              resize-none
              rounded-xl
              border
              border-black/10
              bg-[#F7F7F5]
              px-4
              py-3
              font-mono
              text-xs
              leading-6
              text-black
              outline-none
              transition
              placeholder:text-black/25
              focus:border-black/25
              focus:bg-white
            "
            autoFocus
          />

          {/* Format hints */}

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-black/35">
            <span>HEX</span>
            <span>Comma separated</span>
            <span>JSON array</span>
          </div>

          {/* Preview */}

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-black/40">
                Preview
              </span>

              <span className="text-[10px] text-black/35">
                {colors.length}/{MAX_COLORS} colors
              </span>
            </div>

            <div
              className="
                grid
                min-h-12
                grid-cols-6
                overflow-hidden
                rounded-xl
                border
                border-black/10
              "
            >
              {colors.length > 0 ? (
                colors.map((color) => (
                  <div
                    key={color}
                    className="
                      group
                      relative
                      h-12
                      transition-transform
                      duration-200
                      hover:z-10
                      hover:scale-y-110
                    "
                    style={{
                      backgroundColor: color,
                    }}
                    title={color}
                  >
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded bg-black/20 px-1 font-mono text-[7px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                      {color}
                    </span>
                  </div>
                ))
              ) : (
                <div
                  className="
                    col-span-6
                    flex
                    h-12
                    items-center
                    justify-center
                    text-[10px]
                    text-black/30
                  "
                >
                  Paste HEX colors to preview
                </div>
              )}
            </div>
          </div>

          {/* Status */}

          <div className="mt-4 min-h-5">
            {!hasInput ? (
              <div className="flex items-center gap-1.5 text-[10px] text-black/35">
                <span>Example: #FF6B6B, #4ECDC4, #45B7D1</span>
              </div>
            ) : hasColors ? (
              <div className="flex items-center gap-1.5 text-[10px] text-black/45">
                <Check size={12} />
                <span>
                  {colors.length} valid{" "}
                  {colors.length === 1 ? "color" : "colors"} detected.
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[10px] text-red-500">
                <AlertCircle size={12} />
                <span>No valid HEX colors detected.</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}

        <div
          className="
            flex
            items-center
            justify-between
            border-t
            border-black/10
            px-5
            py-4
          "
        >
          <span className="text-[10px] text-black/35">
            Maximum {MAX_COLORS} colors
          </span>

          <button
            type="button"
            onClick={handleImport}
            disabled={!hasColors}
            className="
              rounded-full
              bg-black
              px-4
              py-2
              text-[11px]
              font-medium
              text-white
              transition-all
              hover:scale-[1.02]
              hover:bg-black/85
              disabled:cursor-not-allowed
              disabled:opacity-25
            "
          >
            Import palette
          </button>
        </div>
      </div>
    </div>
  );
}
