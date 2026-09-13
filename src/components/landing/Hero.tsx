"use client";

import { motion } from "motion/react";
import { useState } from "react";

const INITIAL_PALETTES = [
  ["#72199E", "#52605C", "#0ECCD6", "#2920D3", "#E06BCC"],
  ["#111827", "#3B82F6", "#60A5FA", "#F3F4F6", "#F97316"],
  ["#2D3748", "#4FD1C5", "#63B3ED", "#ED64A6", "#F6AD55"],
  ["#1A202C", "#2B6CB0", "#4299E1", "#9F7AEA", "#ED64A6"],
];

export function Hero() {
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const currentColors = INITIAL_PALETTES[paletteIndex];

  const handleCopy = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  const handleRandomize = () => {
    setPaletteIndex((prev) => (prev + 1) % INITIAL_PALETTES.length);
  };

  return (
    <section className="relative flex min-h-[820px] flex-col items-center justify-center overflow-hidden bg-slate-50 px-6 py-20 lg:px-10 lg:py-28">
      {/* Grid Background Pattern (Subtly Clean) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-600">
            Color System Generator v2.0
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl md:text-7xl"
        >
          Build colors <br className="hidden sm:block" />
          <span className="text-slate-400">that work together.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-base text-slate-600 sm:text-lg"
        >
          Hasilkan, uji aksesibilitas, dan ekspor palet warna siap pakai untuk
          sistem desain UI/UX Anda dalam hitungan detik.
        </motion.p>

        {/* Primary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition-colors">
            Mulai Buat Palet
          </button>
          <button className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
            Jelajahi Draf Sistem
          </button>
        </motion.div>

        {/* Interactive Palette Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-10 flex flex-col items-center justify-center gap-3"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-xl shadow-slate-200/50">
            {currentColors.map((color) => (
              <button
                key={color}
                onClick={() => handleCopy(color)}
                className="group relative flex h-10 w-10 items-center justify-center rounded-xl transition-transform hover:scale-105 sm:h-12 sm:w-12"
                style={{ backgroundColor: color }}
              >
                <span className="absolute -top-10 rounded-md bg-slate-900 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                  {copiedColor === color ? "Copied!" : color}
                </span>
              </button>
            ))}

            {/* Randomize Button */}
            <button
              onClick={handleRandomize}
              className="flex h-10 px-3 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors sm:h-12"
            >
              Acak Warna
            </button>
          </div>
          <p className="text-xs text-slate-400">
            Klik sampel warna untuk menyalin kode HEX
          </p>
        </motion.div>

        {/* Dynamic UI Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl text-left"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Pratinjau Komponen UI
            </h3>
            <span className="text-xs font-medium text-slate-500">
              Menerapkan Palet Aktif
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              className="p-4 rounded-xl text-white font-medium text-sm flex flex-col justify-between h-24"
              style={{ backgroundColor: currentColors[0] }}
            >
              <span>Primary Button</span>
              <span className="text-xs opacity-75">{currentColors[0]}</span>
            </div>
            <div
              className="p-4 rounded-xl text-white font-medium text-sm flex flex-col justify-between h-24"
              style={{ backgroundColor: currentColors[1] }}
            >
              <span>Secondary Element</span>
              <span className="text-xs opacity-75">{currentColors[1]}</span>
            </div>
            <div
              className="p-4 rounded-xl text-white font-medium text-sm flex flex-col justify-between h-24"
              style={{ backgroundColor: currentColors[2] }}
            >
              <span>Accent Highlight</span>
              <span className="text-xs opacity-75">{currentColors[2]}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
