"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Main Footer Content */}
        <div className="grid gap-12 py-16 md:grid-cols-[1.5fr_1fr] lg:py-20">
          {/* Brand Info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white shadow-sm">
                <div className="grid grid-cols-2 gap-[3px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </div>
              </div>

              <span className="text-sm font-bold tracking-tight text-slate-900">
                Palette Studio
              </span>
            </div>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-600">
              Generator sistem warna sederhana dan presisi untuk desainer serta
              pengembang produk digital.
            </p>
          </motion.div>

          {/* Footer Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="grid grid-cols-2 gap-8 sm:grid-cols-3"
          >
            {/* Column 1: Product */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Product
              </p>

              <div className="mt-4 flex flex-col items-start gap-2.5">
                <FooterLink href="#generator">Generator</FooterLink>
                <FooterLink href="#collections">Collections</FooterLink>
                <FooterLink href="#workflow">Workflow</FooterLink>
              </div>
            </div>

            {/* Column 2: Resources */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Resources
              </p>

              <div className="mt-4 flex flex-col items-start gap-2.5">
                <FooterLink href="#about">About</FooterLink>
                <FooterLink href="#shortcuts">Shortcuts</FooterLink>
                <FooterLink href="#export">Export</FooterLink>
              </div>
            </div>

            {/* Column 3: Palette Spectrum */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Palette
              </p>

              <div className="mt-4 flex items-center gap-1.5">
                <PaletteDot color="#72199E" />
                <PaletteDot color="#52605C" />
                <PaletteDot color="#0ECCD6" />
                <PaletteDot color="#2920D3" />
                <PaletteDot color="#E06BCC" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-3 border-t border-slate-200 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {currentYear} Palette Studio. All rights reserved.</span>

          <div className="flex items-center gap-4">
            <span>Built for designers & developers.</span>

            <span className="flex items-center gap-1.5">
              Made with color
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: "#E06BCC" }}
              />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-1 text-xs font-semibold text-slate-600 transition-colors hover:text-slate-900"
    >
      {children}

      <ArrowUpRight
        size={12}
        strokeWidth={2}
        className="-translate-x-1 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
      />
    </a>
  );
}

function PaletteDot({ color }: { color: string }) {
  return (
    <span
      className="h-5 w-5 rounded-md border border-slate-200 shadow-sm transition-transform duration-200 hover:scale-110"
      style={{ backgroundColor: color }}
      title={color}
    />
  );
}
