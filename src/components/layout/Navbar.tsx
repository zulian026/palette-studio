"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command, Download, Import, Menu, X } from "lucide-react";
import { useState } from "react";

type NavbarProps = {
  onImport?: () => void;
  onExport?: () => void;
};

export function Navbar({ onImport, onExport }: NavbarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isHome = pathname === "/";
  const isGenerator =
    pathname === "/generator" || pathname.startsWith("/generator/");

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-slate-50/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Brand */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          {/* Logo Icon Solid Clean */}
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
        </Link>

        {/* Desktop Navigation */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm md:flex">
          <NavLink href="/" active={isHome}>
            Home
          </NavLink>

          <NavLink href="/generator" active={isGenerator}>
            Generator
          </NavLink>
        </nav>

        {/* Actions Bar */}
        <div className="flex items-center gap-2">
          {onImport && (
            <button
              type="button"
              onClick={onImport}
              className="hidden items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-100 sm:flex"
            >
              <Import size={14} strokeWidth={2} />
              Import
            </button>
          )}

          {onExport && (
            <button
              type="button"
              onClick={onExport}
              className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
            >
              <Download size={14} strokeWidth={2} />
              Export
            </button>
          )}

          {/* Shortcut badge */}
          <div className="ml-1 hidden items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-400 lg:flex">
            <Command size={11} />
            <span className="font-mono">K</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen((open) => !open)}
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 md:hidden"
          >
            {isMobileOpen ? (
              <X size={18} strokeWidth={2} />
            ) : (
              <Menu size={18} strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`overflow-hidden border-t border-slate-200 bg-slate-50 transition-all duration-300 md:hidden ${
          isMobileOpen
            ? "max-h-[320px] opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="px-6 py-4">
          <nav className="flex flex-col gap-1.5">
            <MobileNavLink href="/" active={isHome} onClick={closeMobileMenu}>
              Home
            </MobileNavLink>

            <MobileNavLink
              href="/generator"
              active={isGenerator}
              onClick={closeMobileMenu}
            >
              Generator
            </MobileNavLink>
          </nav>

          {/* Mobile Action Buttons */}
          {(onImport || onExport) && (
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-200 pt-4">
              {onImport && (
                <button
                  type="button"
                  onClick={() => {
                    onImport();
                    closeMobileMenu();
                  }}
                  className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                >
                  <Import size={15} strokeWidth={2} />
                  Import
                </button>
              )}

              {onExport && (
                <button
                  type="button"
                  onClick={() => {
                    onExport();
                    closeMobileMenu();
                  }}
                  className="flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
                >
                  <Download size={15} strokeWidth={2} />
                  Export
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Sub-components (Subtle Pill Navigation)                                    */
/* -------------------------------------------------------------------------- */

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? "bg-slate-900 text-white"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  active,
  children,
  onClick,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex h-11 items-center rounded-xl px-4 text-sm font-semibold transition-colors ${
        active
          ? "bg-slate-900 text-white"
          : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900"
      }`}
    >
      {children}
    </Link>
  );
}
