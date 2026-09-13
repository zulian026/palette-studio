"use client";

import { ArrowUpRight, Download, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    number: "01",
    title: "Generate",
    description:
      "Buat kombinasi warna yang seimbang secara otomatis berdasarkan aturan harmoni dan kebutuhan sistem visual.",
    icon: SlidersHorizontal,
    accent: "#72199E",
  },
  {
    number: "02",
    title: "Refine",
    description:
      "Kunci warna yang sesuai, sesuaikan kontras rasio, dan atur detail setiap swatch secara presisi.",
    icon: ArrowUpRight,
    accent: "#2920D3",
  },
  {
    number: "03",
    title: "Export",
    description:
      "Ekspor palet siap pakai ke berbagai format seperti Tailwind CSS, Tokens UI, dan SVG.",
    icon: Download,
    accent: "#0ECCD6",
  },
];

export function Features() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-slate-400">
              The Workflow
            </span>
          </div>

          <div>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              From first idea <br />
              <span className="text-slate-400">to final system.</span>
            </h2>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md sm:p-8"
              >
                <div>
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold tracking-wider text-slate-400">
                      {feature.number}
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition-colors group-hover:bg-slate-900 group-hover:text-white">
                      <Icon size={18} strokeWidth={2} />
                    </div>
                  </div>

                  {/* Accent Line Indicator */}
                  <motion.div
                    className="mt-6 h-1 rounded-full"
                    style={{ backgroundColor: feature.accent }}
                    initial={{ width: 0 }}
                    whileInView={{ width: 32 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />

                  {/* Text Content */}
                  <div className="mt-8">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Border Highlight on Hover */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 rounded-b-2xl transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: feature.accent }}
                />
              </motion.article>
            );
          })}
        </div>

        {/* Palette Spectrum Footer */}
        <div className="mt-16 flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Palette Studio Spectrum
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Lima warna utama untuk membangun satu identitas sistem.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {["#72199E", "#52605C", "#0ECCD6", "#2920D3", "#E06BCC"].map(
              (color) => (
                <div
                  key={color}
                  className="h-8 w-8 rounded-xl border border-slate-200 shadow-sm transition-transform hover:scale-110 sm:h-9 sm:w-9"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
