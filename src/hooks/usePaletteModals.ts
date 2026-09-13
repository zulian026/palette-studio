"use client";

import { useCallback, useState } from "react";

export function usePaletteModals() {
  const [isImportOpen, setIsImportOpen] = useState(false);

  const [isExportOpen, setIsExportOpen] = useState(false);

  const openImport = useCallback(() => {
    setIsImportOpen(true);
    setIsExportOpen(false);
  }, []);

  const closeImport = useCallback(() => {
    setIsImportOpen(false);
  }, []);

  const openExport = useCallback(() => {
    setIsExportOpen(true);
    setIsImportOpen(false);
  }, []);

  const closeExport = useCallback(() => {
    setIsExportOpen(false);
  }, []);

  const closeAll = useCallback(() => {
    setIsImportOpen(false);
    setIsExportOpen(false);
  }, []);

  return {
    isImportOpen,
    isExportOpen,

    openImport,
    closeImport,

    openExport,
    closeExport,

    closeAll,
  };
}
