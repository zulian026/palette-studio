"use client";

import { useState } from "react";

import { usePaletteStore } from "@/store/palette-store";

import { Toast } from "@/components/ui/Toast";

import { Navbar } from "@/components/layout/Navbar";

import { PaletteHeader } from "@/components/palette/PaletteHeader";
import { PaletteGrid } from "@/components/palette/PaletteGrid";
import { GeneratorToolbar } from "@/components/palette/GeneratorToolbar";
import { ColorEditor } from "@/components/palette/ColorEditor";
import { SelectedColorPanel } from "@/components/palette/SelectedColorPanel";
import { CollectionsPanel } from "@/components/palette/CollectionsPanel";
import { ImportPaletteModal } from "@/components/palette/ImportPaletteModal";
import { ExportPaletteModal } from "@/components/palette/ExportPaletteModal";

import { usePaletteShortcuts } from "@/hooks/usePaletteShortcuts";
import { usePaletteModals } from "@/hooks/usePaletteModals";
import { useToast } from "@/hooks/useToast";

import type { SavedPalette } from "@/types/palette";

export default function GeneratorPage() {
  // ============================================================
  // UI STATE
  // ============================================================

  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);

  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const [isEditingPaletteName, setIsEditingPaletteName] = useState(false);

  const [activeSavedPaletteId, setActiveSavedPaletteId] = useState<
    string | null
  >(null);

  // ============================================================
  // COLOR SELECTION
  // ============================================================

  const handleSelectColor = (id: string) => {
    setSelectedColorId(id);
  };

  // ============================================================
  // OPEN EDITOR
  // ============================================================

  const handleEditColor = (id: string) => {
    setSelectedColorId(id);
    setIsEditorOpen(true);
  };

  // ============================================================
  // RENAME COLOR
  // ============================================================

  const handleRenameColor = (id: string) => {
    setSelectedColorId(id);
    setIsEditorOpen(true);
  };

  // ============================================================
  // TOAST
  // ============================================================

  const { toast, showToast, hideToast } = useToast();

  // ============================================================
  // MODALS
  // ============================================================

  const {
    isImportOpen,
    isExportOpen,

    openImport,
    closeImport,

    openExport,
    closeExport,

    closeAll,
  } = usePaletteModals();

  // ============================================================
  // STORE
  // ============================================================

  const {
    palette,
    mode,

    toggleLock,
    updateColor,
    addColor,
    removeColor,
    duplicateColor,
    reorderColors,

    generatePalette,
    importColors,

    savePalette,
    updatePaletteName,

    savedPalettes,
    deleteSavedPalette,
    loadSavedPalette,
    updateSavedPalette,
  } = usePaletteStore();

  // ============================================================
  // DERIVED STATE
  // ============================================================

  const selectedColor =
    palette.colors.find((color) => color.id === selectedColorId) ?? null;

  const modeLabel =
    {
      random: "Random",
      analogous: "Analogous",
      complementary: "Complementary",
      triadic: "Triadic",
      monochromatic: "Monochromatic",
    }[mode] ?? "Random";

  const isSavedPalette = savedPalettes.some(
    (savedPalette) => savedPalette.id === palette.id,
  );

  // ============================================================
  // GENERATE
  // ============================================================

  const handleGenerate = () => {
    generatePalette();

    /*
     * A new palette means there is no active
     * selected color anymore.
     */
    setSelectedColorId(null);

    /*
     * Also close the editor if it happens
     * to be open while generating.
     */
    setIsEditorOpen(false);

    setActiveSavedPaletteId(null);

    setIsEditingPaletteName(false);

    showToast("New palette generated", "palette");
  };

  // ============================================================
  // COPY ALL
  // ============================================================

  const handleCopyAll = async () => {
    const hexValues = palette.colors.map((color) => color.hex).join("\n");

    try {
      await navigator.clipboard.writeText(hexValues);

      showToast("Palette copied", "copy");
    } catch (error) {
      console.error("Failed to copy palette:", error);

      showToast("Failed to copy palette", "success");
    }
  };

  // ============================================================
  // SAVE
  // ============================================================

  const handleSave = () => {
    if (isSavedPalette) {
      updateSavedPalette(palette.id);

      setActiveSavedPaletteId(palette.id);

      showToast("Palette updated", "palette");

      return;
    }

    savePalette();

    setActiveSavedPaletteId(palette.id);

    showToast("Palette saved", "palette");
  };

  // ============================================================
  // LOAD SAVED PALETTE
  // ============================================================

  const handleSelectSavedPalette = (savedPalette: SavedPalette) => {
    loadSavedPalette(savedPalette);

    setActiveSavedPaletteId(savedPalette.id);

    /*
     * Loading a different palette
     * resets the current selection.
     */
    setSelectedColorId(null);

    setIsEditorOpen(false);

    setIsEditingPaletteName(false);

    showToast("Palette loaded", "palette");
  };

  // ============================================================
  // IMPORT
  // ============================================================

  const handleImport = (input: string) => {
    importColors(input);

    setActiveSavedPaletteId(null);

    setSelectedColorId(null);

    setIsEditorOpen(false);

    setIsEditingPaletteName(false);

    closeImport();

    showToast("Palette imported", "palette");
  };

  // ============================================================
  // DELETE SAVED PALETTE
  // ============================================================

  const handleDeleteSavedPalette = (id: string) => {
    deleteSavedPalette(id);

    if (id === activeSavedPaletteId) {
      setActiveSavedPaletteId(null);
    }

    showToast("Palette deleted", "success");
  };

  // ============================================================
  // DUPLICATE COLOR
  // ============================================================

  const handleDuplicateColor = (id: string) => {
    duplicateColor(id);

    showToast("Color duplicated", "success");
  };

  // ============================================================
  // DELETE COLOR
  // ============================================================

  const handleDeleteColor = (id: string) => {
    removeColor(id);

    /*
     * Only clear the selection if the deleted
     * color was the selected color.
     */
    if (id === selectedColorId) {
      setSelectedColorId(null);
      setIsEditorOpen(false);
    }

    showToast("Color deleted", "success");
  };

  // ============================================================
  // LOCK COLOR
  // ============================================================

  const handleToggleLock = (id: string) => {
    toggleLock(id);

    showToast("Color lock updated", "lock");
  };

  // ============================================================
  // CLOSE EDITOR
  // ============================================================

  const handleCloseEditor = () => {
    /*
     * IMPORTANT:
     * Do NOT clear selectedColorId here.
     *
     * Closing the editor only closes the modal.
     * The selected color must remain selected
     * so the inspector stays visible.
     */
    setIsEditorOpen(false);
  };

  // ============================================================
  // SHORTCUTS
  // ============================================================

  usePaletteShortcuts({
    colors: palette.colors,

    paletteId: palette.id,

    selectedColorId,

    isImportOpen,

    isExportOpen,

    isSavedPalette,

    onGenerate: handleGenerate,

    onCopyAll: handleCopyAll,

    onSave: handleSave,

    onExport: openExport,

    onImport: openImport,

    onSelectColor: handleSelectColor,

    onToggleLock: toggleLock,

    onClose: () => {
      /*
       * Escape should close overlays,
       * not clear the selected color.
       */
      closeAll();

      setIsEditorOpen(false);
    },
  });

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
      <main className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
        {/* ======================================================
            NAVBAR
        ====================================================== */}

        <Navbar onImport={openImport} onExport={openExport} />

        {/* ======================================================
            GENERATOR CONTAINER
        ====================================================== */}

        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
          {/* ====================================================
              HEADER
          ==================================================== */}

          <PaletteHeader
            paletteName={palette.name}
            colorCount={palette.colors.length}
            mode={modeLabel}
            isEditing={isEditingPaletteName}
            isSaved={isSavedPalette}
            onGenerate={handleGenerate}
            onEditName={() => setIsEditingPaletteName(true)}
            onSave={handleSave}
            onExport={openExport}
            onNameChange={updatePaletteName}
            onFinishNameEdit={() => setIsEditingPaletteName(false)}
          />

          {/* ====================================================
              TOOLBAR
          ==================================================== */}

          <div id="generator-toolbar" className="mt-6">
            <GeneratorToolbar />
          </div>

          {/* ====================================================
              SHORTCUTS BAR (Solid Slate Styling)
          ==================================================== */}

          <div
            id="shortcuts"
            className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-slate-200/80 bg-white px-4 py-2.5 text-xs text-slate-500 shadow-sm"
          >
            <span className="flex items-center gap-1.5 font-medium">
              <kbd className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-700 shadow-2xs">
                SPACE
              </kbd>
              Generate
            </span>

            <span className="flex items-center gap-1.5 font-medium">
              <kbd className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-700 shadow-2xs">
                C
              </kbd>
              Copy
            </span>

            <span className="flex items-center gap-1.5 font-medium">
              <kbd className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-700 shadow-2xs">
                S
              </kbd>
              Save
            </span>

            <span className="flex items-center gap-1.5 font-medium">
              <kbd className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-700 shadow-2xs">
                E
              </kbd>
              Export
            </span>

            <span className="flex items-center gap-1.5 font-medium">
              <kbd className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-700 shadow-2xs">
                ← →
              </kbd>
              Navigate
            </span>

            <span className="flex items-center gap-1.5 font-medium">
              <kbd className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-700 shadow-2xs">
                L
              </kbd>
              Lock
            </span>
          </div>

          {/* ====================================================
              PALETTE GRID
          ==================================================== */}

          <div className="mt-8">
            <PaletteGrid
              colors={palette.colors}
              selectedColorId={selectedColorId}
              onReorder={reorderColors}
              onToggleLock={handleToggleLock}
              onSelect={handleSelectColor}
              onEdit={handleEditColor}
              onRename={handleRenameColor}
              onDuplicate={handleDuplicateColor}
              onDelete={handleDeleteColor}
              onAddColor={addColor}
            />
          </div>

          {/* ====================================================
              SELECTED COLOR INSPECTOR
          ==================================================== */}

          {selectedColor && (
            <SelectedColorPanel
              color={selectedColor}
              onEdit={() => handleEditColor(selectedColor.id)}
            />
          )}

          {/* ====================================================
              SAVED COLLECTIONS
          ==================================================== */}

          <div id="collections" className="mt-12">
            <CollectionsPanel
              palettes={savedPalettes}
              onSelect={handleSelectSavedPalette}
              onDelete={handleDeleteSavedPalette}
            />
          </div>
        </section>

        {/* ======================================================
            COLOR EDITOR MODAL
        ====================================================== */}

        {selectedColor && isEditorOpen && (
          <ColorEditor
            color={selectedColor}
            onClose={handleCloseEditor}
            onUpdate={(updates) => {
              updateColor(selectedColor.id, updates);
            }}
            onToggleLock={() => {
              handleToggleLock(selectedColor.id);
            }}
          />
        )}

        {/* ======================================================
            IMPORT MODAL
        ====================================================== */}

        <ImportPaletteModal
          open={isImportOpen}
          onClose={closeImport}
          onImport={handleImport}
        />

        {/* ======================================================
            EXPORT MODAL
        ====================================================== */}

        <ExportPaletteModal
          open={isExportOpen}
          palette={palette}
          onClose={closeExport}
        />
      </main>

      {/* ========================================================
          TOAST NOTIFICATION
      ======================================================== */}

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </>
  );
}
