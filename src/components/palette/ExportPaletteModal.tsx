"use client";

import { Check, Copy, Download, X } from "lucide-react";
import { useMemo, useState } from "react";

import type { Palette } from "@/types/palette";

type ExportFormat =
  "css" | "scss" | "json" | "tailwind" | "tokens" | "svg" | "png";

type ExportPaletteModalProps = {
  open: boolean;
  palette: Palette;
  onClose: () => void;
};

const formats: {
  id: ExportFormat;
  label: string;
  description: string;
}[] = [
  {
    id: "css",
    label: "CSS",
    description: "CSS custom properties",
  },
  {
    id: "scss",
    label: "SCSS",
    description: "SCSS variables",
  },
  {
    id: "json",
    label: "JSON",
    description: "Palette data",
  },
  {
    id: "tailwind",
    label: "Tailwind",
    description: "Tailwind color config",
  },
  {
    id: "tokens",
    label: "Tokens",
    description: "Design token structure",
  },

  {
    id: "svg",
    label: "SVG",
    description: "Vector palette",
  },
  {
    id: "png",
    label: "PNG",
    description: "Image palette",
  },
];

function getColorKey(name: string, index: number) {
  const normalized = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || `color-${index + 1}`;
}

function generateCss(palette: Palette) {
  const lines = palette.colors.map(
    (color, index) => `  --${getColorKey(color.name, index)}: ${color.hex};`,
  );

  return `:root {\n${lines.join("\n")}\n}`;
}

function generateScss(palette: Palette) {
  return palette.colors
    .map((color, index) => `$${getColorKey(color.name, index)}: ${color.hex};`)
    .join("\n");
}

function generateJson(palette: Palette) {
  return JSON.stringify(
    {
      name: palette.name,
      colors: palette.colors.map((color, index) => ({
        name: getColorKey(color.name, index),
        hex: color.hex,
      })),
    },
    null,
    2,
  );
}

function generateTailwind(palette: Palette) {
  const colors = palette.colors
    .map(
      (color, index) =>
        `      "${getColorKey(color.name, index)}": "${color.hex}"`,
    )
    .join(",\n");

  return `export default {
  theme: {
    extend: {
      colors: {
${colors}
      }
    }
  }
};`;
}

function generateTokens(palette: Palette) {
  return JSON.stringify(
    {
      $schema: "https://design-tokens.github.io/community-group/format/",
      [palette.name || "palette"]: {
        colors: Object.fromEntries(
          palette.colors.map((color, index) => [
            getColorKey(color.name, index),
            {
              $type: "color",
              $value: color.hex,
            },
          ]),
        ),
      },
    },
    null,
    2,
  );
}

function generateSvg(palette: Palette) {
  const width = 1200;
  const height = 500;

  const colorWidth = width / palette.colors.length;

  const rectangles = palette.colors
    .map((color, index) => {
      const x = index * colorWidth;

      return `
    <rect
      x="${x}"
      y="0"
      width="${colorWidth}"
      height="${height}"
      fill="${color.hex}"
    />
  `;
    })
    .join("");

  return `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${width}"
  height="${height}"
  viewBox="0 0 ${width} ${height}"
>
${rectangles}
</svg>`;
}

function generatePng(palette: Palette) {
  const canvas = document.createElement("canvas");

  const width = 1200;
  const height = 500;

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  const colorWidth = width / palette.colors.length;

  palette.colors.forEach((color, index) => {
    context.fillStyle = color.hex;

    context.fillRect(index * colorWidth, 0, colorWidth + 1, height);
  });

  return canvas;
}

function generateOutput(palette: Palette, format: ExportFormat) {
  switch (format) {
    case "css":
      return generateCss(palette);

    case "scss":
      return generateScss(palette);

    case "json":
      return generateJson(palette);

    case "tailwind":
      return generateTailwind(palette);

    case "tokens":
      return generateTokens(palette);

    case "svg":
      return generateSvg(palette);

    case "png":
      return "";

    default:
      return "";
  }
}

function getFileExtension(format: ExportFormat) {
  switch (format) {
    case "css":
      return "css";

    case "scss":
      return "scss";

    case "json":
    case "tokens":
      return "json";

    case "tailwind":
      return "js";

    case "svg":
      return "svg";

    case "png":
      return "png";

    default:
      return "txt";
  }
}

export function ExportPaletteModal({
  open,
  palette,
  onClose,
}: ExportPaletteModalProps) {
  const [format, setFormat] = useState<ExportFormat>("css");

  const [copied, setCopied] = useState(false);

  const output = useMemo(
    () => generateOutput(palette, format),
    [palette, format],
  );

  if (!open) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1400);
    } catch (error) {
      console.error("Failed to copy export:", error);
    }
  };

  const handleDownload = () => {
    if (format === "png") {
      const canvas = generatePng(palette);

      if (!canvas) {
        return;
      }

      const anchor = document.createElement("a");

      anchor.download = `${getColorKey(palette.name, 0)}.png`;

      anchor.href = canvas.toDataURL("image/png");

      document.body.appendChild(anchor);

      anchor.click();

      document.body.removeChild(anchor);

      return;
    }

    const extension = getFileExtension(format);

    const blob = new Blob([output], {
      type:
        format === "json" || format === "tokens"
          ? "application/json"
          : format === "svg"
            ? "image/svg+xml"
            : "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");

    anchor.href = url;

    anchor.download = `${getColorKey(palette.name, 0)}.${extension}`;

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
  };

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
      onMouseDown={onClose}
    >
      <div
        className="
          flex
          max-h-[90vh]
          w-full
          max-w-4xl
          flex-col
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
              Export palette
            </h2>

            <p className="mt-0.5 text-[11px] text-black/45">
              {palette.name} · {palette.colors.length} colors
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
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
            aria-label="Close export palette"
          >
            <X size={15} />
          </button>
        </div>

        {/* Content */}

        <div className="grid min-h-0 flex-1 lg:grid-cols-[180px_1fr]">
          {/* Formats */}

          <div
            className="
              border-b
              border-black/10
              p-3
              lg:border-b-0
              lg:border-r
            "
          >
            <p className="mb-2 px-2 text-[9px] font-medium uppercase tracking-[0.14em] text-black/35">
              Format
            </p>

            <div className="grid grid-cols-2 gap-1 lg:grid-cols-1">
              {formats.map((item) => {
                const active = format === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setFormat(item.id);
                      setCopied(false);
                    }}
                    className={`
                      rounded-lg
                      px-3
                      py-2.5
                      text-left
                      transition-all
                      ${
                        active
                          ? "bg-black text-white"
                          : "text-black/55 hover:bg-black/[0.04] hover:text-black"
                      }
                    `}
                  >
                    <span className="block text-[11px] font-medium">
                      {item.label}
                    </span>

                    <span
                      className={`
                        mt-0.5
                        block
                        text-[9px]
                        ${active ? "text-white/50" : "text-black/30"}
                      `}
                    >
                      {item.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Code preview */}

          <div className="flex min-h-0 flex-col bg-[#F7F7F5] p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-black/35">
                Preview
              </span>

              <span className="font-mono text-[9px] text-black/30">
                {format.toUpperCase()}
              </span>
            </div>

            {format === "png" ? (
              <div
                className="
                  flex
                  min-h-0
                  flex-1
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-xl
                  border
                  border-black/10
                  bg-white
                  p-6
                  shadow-sm
                "
              >
                <div
                  className="
                    flex
                    aspect-[12/5]
                    w-full
                    overflow-hidden
                    rounded-lg
                    shadow-sm
                  "
                >
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
              </div>
            ) : (
              <pre
                className="
                  min-h-0
                  flex-1
                  overflow-auto
                  rounded-xl
                  border
                  border-black/10
                  bg-white
                  p-4
                  font-mono
                  text-[11px]
                  leading-6
                  text-black/70
                  shadow-sm
                "
              >
                <code>{output}</code>
              </pre>
            )}
          </div>
        </div>

        {/* Footer */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            border-t
            border-black/10
            px-5
            py-4
          "
        >
          <span className="hidden text-[10px] text-black/35 sm:block">
            Ready to use in your project.
          </span>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="
                flex
                items-center
                gap-1.5
                rounded-full
                border
                border-black/10
                bg-white
                px-3.5
                py-2
                text-[11px]
                font-medium
                text-black/65
                transition-all
                hover:border-black/20
                hover:bg-black/[0.03]
                hover:text-black
              "
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}

              {copied ? "Copied" : "Copy"}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="
                flex
                items-center
                gap-1.5
                rounded-full
                bg-black
                px-3.5
                py-2
                text-[11px]
                font-medium
                text-white
                transition-all
                hover:bg-black/80
              "
            >
              <Download size={12} />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
