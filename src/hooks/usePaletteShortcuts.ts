"use client";

import { useEffect } from "react";

type UsePaletteShortcutsProps = {
  colors: {
    id: string;
    locked: boolean;
  }[];

  paletteId: string;
  selectedColorId: string | null;

  isImportOpen: boolean;
  isExportOpen: boolean;
  isSavedPalette: boolean;

  onGenerate: () => void;
  onCopyAll: () => void;
  onSave: () => void;
  onExport: () => void;
  onImport: () => void;
  onSelectColor: (id: string) => void;
  onToggleLock: (id: string) => void;
  onClose: () => void;
};

export function usePaletteShortcuts({
  colors,
  paletteId,
  selectedColorId,
  isImportOpen,
  isExportOpen,
  isSavedPalette,
  onGenerate,
  onCopyAll,
  onSave,
  onExport,
  onImport,
  onSelectColor,
  onToggleLock,
  onClose,
}: UsePaletteShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      /*
       * Do not trigger shortcuts while
       * the user is typing.
       */
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;

      if (isTyping) {
        return;
      }

      /*
       * Escape always closes the current
       * editor / modal / selection.
       */
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      /*
       * Do not trigger generator shortcuts
       * while Import / Export is open.
       */
      if (isImportOpen || isExportOpen) {
        return;
      }

      const key = event.key.toLowerCase();

      switch (key) {
        /*
         * SPACE
         * Generate new palette
         */
        case " ": {
          event.preventDefault();
          onGenerate();
          break;
        }

        /*
         * C
         * Copy entire palette
         */
        case "c": {
          event.preventDefault();
          onCopyAll();
          break;
        }

        /*
         * S
         * Save palette
         */
        case "s": {
          event.preventDefault();
          onSave();
          break;
        }

        /*
         * E
         * Open export modal
         */
        case "e": {
          event.preventDefault();
          onExport();
          break;
        }

        /*
         * I
         * Open import modal
         */
        case "i": {
          event.preventDefault();
          onImport();
          break;
        }

        /*
         * L
         * Toggle lock on selected color
         */
        case "l": {
          if (!selectedColorId) {
            return;
          }

          event.preventDefault();

          onToggleLock(selectedColorId);

          break;
        }

        /*
         * LEFT ARROW
         * Select previous color
         */
        case "arrowleft": {
          if (!colors.length) {
            return;
          }

          event.preventDefault();

          const currentIndex = colors.findIndex(
            (color) => color.id === selectedColorId,
          );

          const nextIndex =
            currentIndex <= 0 ? colors.length - 1 : currentIndex - 1;

          onSelectColor(colors[nextIndex].id);

          break;
        }

        /*
         * RIGHT ARROW
         * Select next color
         */
        case "arrowright": {
          if (!colors.length) {
            return;
          }

          event.preventDefault();

          const currentIndex = colors.findIndex(
            (color) => color.id === selectedColorId,
          );

          const nextIndex =
            currentIndex === -1 || currentIndex >= colors.length - 1
              ? 0
              : currentIndex + 1;

          onSelectColor(colors[nextIndex].id);

          break;
        }

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    colors,
    paletteId,
    selectedColorId,
    isImportOpen,
    isExportOpen,
    isSavedPalette,
    onGenerate,
    onCopyAll,
    onSave,
    onExport,
    onImport,
    onSelectColor,
    onToggleLock,
    onClose,
  ]);
}
