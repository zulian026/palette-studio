"use client";

import { motion } from "motion/react";
import { useState } from "react";

const COLLECTIONS = [
  {
    name: "Modern Minimalist",
    colors: ["#18181B", "#3F3F46", "#71717A", "#A1A1AA", "#F4F4F5"],
  },
  {
    name: "Nordic Frost",
    colors: ["#0F172A", "#1E293B", "#334155", "#38BDF8", "#F8FAFC"],
  },
  {
    name: "Cyber Neon",
    colors: ["#09090B", "#18181B", "#7C3AED", "#06B6D4", "#F43F5E"],
  },
  {
    name: "Warm Editorial",
    colors: ["#27272A", "#78350F", "#D97706", "#FDE68A", "#FEF3C7"],
  },
];

export function Collections() {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopy = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(color);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <section
      id="collections"
      className="border-t border-slate-200 bg-slate-50 px-6 py-20 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Curated Palettes
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Popular Collections
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-500">
            Koleksi palet siap pakai yang telah diuji rasio kontrasnya untuk
            sistem UI.
          </p>
        </div>

        {/* Grid Collections */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COLLECTIONS.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
            >
              <h3 className="text-sm font-bold text-slate-900 mb-4">
                {item.name}
              </h3>
              <div className="flex h-20 overflow-hidden rounded-xl border border-slate-100">
                {item.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleCopy(color)}
                    className="group relative flex-1 transition-transform hover:z-10 hover:scale-105"
                    style={{ backgroundColor: color }}
                    title={`Copy ${color}`}
                  >
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded bg-slate-900 px-1.5 py-0.5 text-[9px] font-mono text-white opacity-0 transition-opacity group-hover:opacity-100">
                      {copiedIndex === color ? "Done!" : color}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
