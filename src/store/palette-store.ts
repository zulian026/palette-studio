import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Palette, PaletteColor, SavedPalette } from "@/types/palette";

import { generateRandomColor } from "@/lib/color/random";

import { normalizeHex } from "@/lib/color/utils";

import {
  generateAnalogous,
  generateComplementary,
  generateMonochromatic,
  generateTriadic,
} from "@/lib/color/harmony";

export type PaletteMode =
  "random" | "analogous" | "complementary" | "triadic" | "monochromatic";

const MAX_COLORS = 12;
const MIN_COLORS = 1;

type PaletteStore = {
  palette: Palette;

  mode: PaletteMode;

  setMode: (mode: PaletteMode) => void;

  generatePalette: () => void;

  toggleLock: (id: string) => void;

  updateColor: (id: string, updates: Partial<PaletteColor>) => void;

  addColor: () => void;

  removeColor: (id: string) => void;

  duplicateColor: (id: string) => void;

  moveColorLeft: (id: string) => void;

  moveColorRight: (id: string) => void;

  reorderColors: (activeId: string, targetId: string) => void;

  importColors: (input: string) => void;

  savedPalettes: SavedPalette[];

  savePalette: () => void;

  updateSavedPalette: (id: string) => void;

  deleteSavedPalette: (id: string) => void;

  updatePaletteName: (name: string) => void;

  loadSavedPalette: (palette: SavedPalette) => void;

  startNewPalette: () => void;
};

const initialColors: PaletteColor[] = [
  {
    id: "color-1",
    name: "Color 01",
    hex: "#111111",
    locked: false,
  },
  {
    id: "color-2",
    name: "Color 02",
    hex: "#3B3B3B",
    locked: false,
  },
  {
    id: "color-3",
    name: "Color 03",
    hex: "#6B6B6B",
    locked: false,
  },
  {
    id: "color-4",
    name: "Color 04",
    hex: "#B8B8B8",
    locked: false,
  },
  {
    id: "color-5",
    name: "Color 05",
    hex: "#F2F2F0",
    locked: false,
  },
];

function createColor(index: number, hex?: string): PaletteColor {
  return {
    id: crypto.randomUUID(),
    name: `Color ${String(index).padStart(2, "0")}`,
    hex: hex ?? generateRandomColor(),
    locked: false,
  };
}

function generateColors(
  mode: PaletteMode,
  baseColor: string,
  count: number,
): string[] {
  let generated: string[];

  switch (mode) {
    case "analogous":
      generated = generateAnalogous(baseColor);
      break;

    case "complementary":
      generated = generateComplementary(baseColor);
      break;

    case "triadic":
      generated = generateTriadic(baseColor);
      break;

    case "monochromatic":
      generated = generateMonochromatic(baseColor);
      break;

    case "random":
    default:
      generated = Array.from({ length: count }, () => generateRandomColor());
      break;
  }

  if (generated.length >= count) {
    return generated.slice(0, count);
  }

  const result = [...generated];

  while (result.length < count) {
    result.push(
      mode === "random"
        ? generateRandomColor()
        : generated[result.length % generated.length],
    );
  }

  return result;
}

export const usePaletteStore = create<PaletteStore>()(
  persist(
    (set, get) => ({
      palette: {
        id: "palette-1",
        name: "Untitled palette",
        colors: initialColors,
      },

      mode: "random",

      savedPalettes: [],

      setMode: (mode) => {
        set({
          mode,
        });
      },

      generatePalette: () => {
        set((state) => {
          const baseColor =
            state.palette.colors[0]?.hex ?? generateRandomColor();

          const colors = generateColors(
            state.mode,
            baseColor,
            state.palette.colors.length,
          );

          return {
            palette: {
              ...state.palette,
              id: crypto.randomUUID(),
              name: "Untitled palette",
              colors: state.palette.colors.map((color, index) => ({
                ...color,
                id: crypto.randomUUID(),
                hex: color.locked ? color.hex : colors[index],
                locked: false,
              })),
            },
          };
        });
      },

      toggleLock: (id) => {
        set((state) => ({
          palette: {
            ...state.palette,

            colors: state.palette.colors.map((color) =>
              color.id === id
                ? {
                    ...color,
                    locked: !color.locked,
                  }
                : color,
            ),
          },
        }));
      },

      updateColor: (id, updates) => {
        set((state) => ({
          palette: {
            ...state.palette,

            colors: state.palette.colors.map((color) =>
              color.id === id
                ? {
                    ...color,
                    ...updates,
                  }
                : color,
            ),
          },
        }));
      },

      addColor: () => {
        set((state) => {
          const colors = state.palette.colors;

          if (colors.length >= MAX_COLORS) {
            return state;
          }

          const newColor = createColor(colors.length + 1);

          return {
            palette: {
              ...state.palette,
              colors: [...colors, newColor],
            },
          };
        });
      },

      removeColor: (id) => {
        set((state) => {
          const colors = state.palette.colors;

          if (colors.length <= MIN_COLORS) {
            return state;
          }

          return {
            palette: {
              ...state.palette,
              colors: colors.filter((color) => color.id !== id),
            },
          };
        });
      },

      duplicateColor: (id) => {
        set((state) => {
          const colors = state.palette.colors;

          if (colors.length >= MAX_COLORS) {
            return state;
          }

          const index = colors.findIndex((color) => color.id === id);

          if (index === -1) {
            return state;
          }

          const source = colors[index];

          const duplicated: PaletteColor = {
            ...source,
            id: crypto.randomUUID(),
            name: `${source.name} Copy`,
            locked: false,
          };

          const nextColors = [
            ...colors.slice(0, index + 1),
            duplicated,
            ...colors.slice(index + 1),
          ];

          return {
            palette: {
              ...state.palette,
              colors: nextColors,
            },
          };
        });
      },

      moveColorLeft: (id) => {
        set((state) => {
          const colors = [...state.palette.colors];

          const index = colors.findIndex((color) => color.id === id);

          if (index <= 0) {
            return state;
          }

          [colors[index - 1], colors[index]] = [
            colors[index],
            colors[index - 1],
          ];

          return {
            palette: {
              ...state.palette,
              colors,
            },
          };
        });
      },

      moveColorRight: (id) => {
        set((state) => {
          const colors = [...state.palette.colors];

          const index = colors.findIndex((color) => color.id === id);

          if (index === -1 || index >= colors.length - 1) {
            return state;
          }

          [colors[index], colors[index + 1]] = [
            colors[index + 1],
            colors[index],
          ];

          return {
            palette: {
              ...state.palette,
              colors,
            },
          };
        });
      },

      reorderColors: (activeId, targetId) => {
        set((state) => {
          const colors = [...state.palette.colors];

          const activeIndex = colors.findIndex(
            (color) => color.id === activeId,
          );

          const targetIndex = colors.findIndex(
            (color) => color.id === targetId,
          );

          if (
            activeIndex === -1 ||
            targetIndex === -1 ||
            activeIndex === targetIndex
          ) {
            return state;
          }

          const [movedColor] = colors.splice(activeIndex, 1);

          const adjustedTargetIndex =
            activeIndex < targetIndex ? targetIndex - 1 : targetIndex;

          colors.splice(adjustedTargetIndex, 0, movedColor);

          return {
            palette: {
              ...state.palette,
              colors,
            },
          };
        });
      },

      importColors: (input) => {
        set((state) => {
          const matches =
            input.match(/#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g) ?? [];

          const uniqueColors = Array.from(
            new Set(matches.map((color) => normalizeHex(color))),
          ).slice(0, MAX_COLORS);

          if (uniqueColors.length === 0) {
            return state;
          }

          const colors = uniqueColors.map((hex, index) => ({
            id: crypto.randomUUID(),
            name: `Color ${String(index + 1).padStart(2, "0")}`,
            hex,
            locked: false,
          }));

          return {
            palette: {
              id: crypto.randomUUID(),
              name: "Untitled palette",
              colors,
            },
          };
        });
      },

      savePalette: () => {
        set((state) => {
          const now = Date.now();

          const savedPalette: SavedPalette = {
            id: crypto.randomUUID(),
            name: state.palette.name,
            colors: state.palette.colors.map((color) => ({
              ...color,
            })),
            createdAt: now,
            updatedAt: now,
          };

          return {
            savedPalettes: [savedPalette, ...state.savedPalettes],
          };
        });
      },

      updateSavedPalette: (id) => {
        set((state) => {
          const existingPalette = state.savedPalettes.find(
            (savedPalette) => savedPalette.id === id,
          );

          if (!existingPalette) {
            return state;
          }

          const now = Date.now();

          const updatedPalette: SavedPalette = {
            ...existingPalette,
            name: state.palette.name,
            colors: state.palette.colors.map((color) => ({
              ...color,
            })),
            updatedAt: now,
          };

          return {
            savedPalettes: state.savedPalettes.map((savedPalette) =>
              savedPalette.id === id ? updatedPalette : savedPalette,
            ),
          };
        });
      },

      deleteSavedPalette: (id) => {
        set((state) => ({
          savedPalettes: state.savedPalettes.filter(
            (palette) => palette.id !== id,
          ),
        }));
      },
      updatePaletteName: (name) => {
        set((state) => ({
          palette: {
            ...state.palette,
            name,
          },
        }));
      },
      loadSavedPalette: (savedPalette) => {
        set({
          palette: {
            id: savedPalette.id,
            name: savedPalette.name,
            colors: savedPalette.colors.map((color) => ({
              ...color,
            })),
          },
        });
      },

      startNewPalette: () => {
        set((state) => ({
          palette: {
            ...state.palette,
            id: crypto.randomUUID(),
            name: "Untitled palette",
            colors: state.palette.colors.map((color) => ({
              ...color,
              id: crypto.randomUUID(),
              locked: false,
            })),
          },
        }));
      },
    }),
    {
      name: "palette-studio-storage",

      partialize: (state) => ({
        palette: state.palette,
        mode: state.mode,
        savedPalettes: state.savedPalettes,
      }),
    },
  ),
);
