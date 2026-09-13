"use client";

import { Check, Download, Pencil, Save, Sparkles } from "lucide-react";

type PaletteHeaderProps = {
  paletteName: string;
  colorCount: number;
  mode: string;
  isEditing: boolean;
  isSaved: boolean;

  onGenerate: () => void;
  onEditName: () => void;
  onSave: () => void;
  onExport: () => void;
  onNameChange: (name: string) => void;
  onFinishNameEdit: () => void;
};

export function PaletteHeader({
  paletteName,
  colorCount,
  mode,
  isEditing,
  isSaved,
  onGenerate,
  onEditName,
  onSave,
  onExport,
  onNameChange,
  onFinishNameEdit,
}: PaletteHeaderProps) {
  return (
    <section className="flex flex-col gap-6 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <input
              autoFocus
              value={paletteName}
              onChange={(event) => onNameChange(event.target.value)}
              onBlur={onFinishNameEdit}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === "Escape") {
                  onFinishNameEdit();
                }
              }}
              className="min-w-0 max-w-[360px] border-b-2 border-slate-900 bg-transparent text-2xl font-bold tracking-tight text-slate-900 outline-none"
              aria-label="Palette name"
            />
          ) : (
            <button
              type="button"
              onClick={onEditName}
              className="group flex min-w-0 items-center gap-2 text-left"
            >
              <h1 className="truncate text-2xl font-bold tracking-tight text-slate-900">
                {paletteName}
              </h1>

              <Pencil
                size={14}
                className="shrink-0 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100"
              />
            </button>
          )}
        </div>

        <div className="mt-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <span>{colorCount} colors</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>{mode}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Generate Primary Button */}
        <button
          type="button"
          onClick={onGenerate}
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-slate-800"
        >
          <Sparkles size={14} strokeWidth={2} />
          Generate
        </button>

        {/* Save/Update Button */}
        <button
          type="button"
          onClick={onSave}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          {isSaved ? (
            <Check size={14} strokeWidth={2.5} className="text-emerald-600" />
          ) : (
            <Save size={14} strokeWidth={2} />
          )}
          {isSaved ? "Update" : "Save"}
        </button>

        {/* Export Button */}
        <button
          type="button"
          onClick={onExport}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <Download size={14} strokeWidth={2} />
          Export
        </button>
      </div>
    </section>
  );
}
