"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="border-t border-slate-200 bg-white px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-slate-900 bg-slate-900 px-8 py-14 text-center text-white shadow-xl sm:px-16 sm:py-20"
        >
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          <div className="relative z-10 mx-auto max-w-2xl">
            {/* Badge Indicator */}
            <span className="inline-block rounded-full border border-slate-700 bg-slate-800 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-slate-300">
              Ready to build?
            </span>

            {/* Headline */}
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Buat sistem warna impian Anda sekarang.
            </h2>

            {/* Subtitle */}
            <p className="mt-4 text-base text-slate-400 sm:text-lg">
              Tanpa pendaftaran, 100% gratis, dan dapat diekspor langsung ke
              sistem UI Anda dalam hitungan detik.
            </p>

            {/* CTA Button */}
            <div className="mt-8 flex justify-center">
              <Link
                href="/generator"
                className="group flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-900 shadow-md transition-all hover:bg-slate-100 hover:shadow-lg active:scale-95"
              >
                Buka Generator Warna
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
