"use client";

import { Shuffle, Sparkles } from "lucide-react";

import { usePaletteStore, type PaletteMode } from "@/store/palette-store";

const modes: {
  value: PaletteMode;
  label: string;
}[] = [
  {
    value: "random",
    label: "Random",
  },
  {
    value: "analogous",
    label: "Analogous",
  },
  {
    value: "complementary",
    label: "Complementary",
  },
  {
    value: "triadic",
    label: "Triadic",
  },
  {
    value: "monochromatic",
    label: "Monochromatic",
  },
];

export function GeneratorToolbar() {
  const { mode, setMode, generatePalette } = usePaletteStore();

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
        <div className="flex items-center gap-2 text-slate-900">
          <Sparkles size={15} strokeWidth={2} />
          <span className="text-xs font-bold uppercase tracking-widest">
            Harmony Mode
          </span>
        </div>

        <span className="hidden text-xs font-medium text-slate-400 sm:block">
          Select a rule to calculate color values
        </span>
      </div>

      {/* Controls Container */}
      <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Modes Pill Selector */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200/60 bg-slate-50/80 p-1.5">
          {modes.map((item) => {
            const active = mode === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setMode(item.value)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={generatePalette}
          className="group flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-slate-800 active:scale-95"
        >
          <Shuffle
            size={14}
            strokeWidth={2}
            className="transition-transform duration-300 group-hover:rotate-180"
          />
          Generate Palette
        </button>
      </div>
    </div>
  );
}
