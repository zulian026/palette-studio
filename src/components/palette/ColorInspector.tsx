"use client";

import { Check, Copy } from "lucide-react";

import { useState } from "react";

import { getContrast, getHsl, getOklch, getRgb } from "@/lib/color/utils";

import type { PaletteColor } from "@/types/palette";

type ColorInspectorProps = {
  color: PaletteColor;
};

export function ColorInspector({ color }: ColorInspectorProps) {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const rgb = getRgb(color.hex);
  const hsl = getHsl(color.hex);
  const oklch = getOklch(color.hex);

  const whiteContrast = getContrast("#FFFFFF", color.hex);

  const blackContrast = getContrast("#000000", color.hex);

  const copyValue = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);

      setCopiedValue(key);

      setTimeout(() => {
        setCopiedValue(null);
      }, 1000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="rounded-[18px] border border-black/10 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/35">
            Color inspector
          </p>

          <p className="mt-1 text-sm font-medium">{color.name}</p>
        </div>

        <div
          className="h-8 w-8 rounded-full border border-black/10"
          style={{
            backgroundColor: color.hex,
          }}
        />
      </div>

      <div className="divide-y divide-black/10">
        {/* HEX */}
        <InspectorRow
          label="HEX"
          value={color.hex}
          copyKey="hex"
          copiedValue={copiedValue}
          onCopy={copyValue}
        />

        {/* RGB */}
        <InspectorRow
          label="RGB"
          value={`${rgb.r} ${rgb.g} ${rgb.b}`}
          copyKey="rgb"
          copiedValue={copiedValue}
          onCopy={copyValue}
        />

        {/* HSL */}
        <InspectorRow
          label="HSL"
          value={`${hsl.h}° ${hsl.s}% ${hsl.l}%`}
          copyKey="hsl"
          copiedValue={copiedValue}
          onCopy={copyValue}
        />

        {/* OKLCH */}
        <InspectorRow
          label="OKLCH"
          value={`${oklch.l} ${oklch.c} ${oklch.h}°`}
          copyKey="oklch"
          copiedValue={copiedValue}
          onCopy={copyValue}
        />

        {/* Contrast */}
        <div className="p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/35">
            Contrast
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <ContrastCard
              background="#FFFFFF"
              foreground="#000000"
              ratio={whiteContrast}
            />

            <ContrastCard
              background="#000000"
              foreground="#FFFFFF"
              ratio={blackContrast}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   INSPECTOR ROW
============================================================ */

function InspectorRow({
  label,
  value,
  copyKey,
  copiedValue,
  onCopy,
}: {
  label: string;
  value: string;
  copyKey: string;
  copiedValue: string | null;
  onCopy: (value: string, key: string) => void;
}) {
  const copied = copiedValue === copyKey;

  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/35">
          {label}
        </p>

        <p className="mt-1.5 font-mono text-xs text-black/70">{value}</p>
      </div>

      <button
        type="button"
        onClick={() => onCopy(value, copyKey)}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 text-black/35 transition-all hover:border-black/20 hover:bg-black/5 hover:text-black"
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
      </button>
    </div>
  );
}

/* ============================================================
   CONTRAST CARD
============================================================ */

function ContrastCard({
  background,
  foreground,
  ratio,
}: {
  background: string;
  foreground: string;
  ratio: number;
}) {
  const roundedRatio = Number(ratio.toFixed(2));

  const aaNormal = roundedRatio >= 4.5;
  const aaLarge = roundedRatio >= 3;
  const aaaNormal = roundedRatio >= 7;

  return (
    <div
      className="overflow-hidden rounded-xl border border-black/10"
      style={{
        backgroundColor: background,
        color: foreground,
      }}
    >
      <div className="p-4">
        <p className="text-xs font-medium">Aa</p>

        <p className="mt-1 text-[10px] opacity-50">{roundedRatio} : 1</p>
      </div>

      <div
        className="border-t border-current/10 px-4 py-3"
        style={{
          color: foreground,
        }}
      >
        <div className="flex items-center justify-between text-[9px]">
          <span className="opacity-50">AA</span>

          <span>{aaNormal ? "✓" : "—"}</span>
        </div>

        <div className="mt-1.5 flex items-center justify-between text-[9px]">
          <span className="opacity-50">AA Large</span>

          <span>{aaLarge ? "✓" : "—"}</span>
        </div>

        <div className="mt-1.5 flex items-center justify-between text-[9px]">
          <span className="opacity-50">AAA</span>

          <span>{aaaNormal ? "✓" : "—"}</span>
        </div>
      </div>
    </div>
  );
}
