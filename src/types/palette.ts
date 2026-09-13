export type PaletteColor = {
  id: string;
  name: string;
  hex: string;
  locked: boolean;
};

export type Palette = {
  id: string;
  name: string;
  colors: PaletteColor[];
};

export type SavedPalette = {
  id: string;
  name: string;
  colors: PaletteColor[];
  createdAt: number;
  updatedAt: number;
};
