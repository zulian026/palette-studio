import { converter, formatHex, formatCss, wcagContrast } from "culori";

const toRgb = converter("rgb");
const toHsl = converter("hsl");
const toOklch = converter("oklch");

export function normalizeHex(color: string) {
  const rgb = toRgb(color);

  if (!rgb) {
    return "#000000";
  }

  return formatHex(rgb).toUpperCase();
}

export function getRgb(color: string) {
  const rgb = toRgb(color);

  if (!rgb) {
    return {
      r: 0,
      g: 0,
      b: 0,
    };
  }

  return {
    r: Math.round((rgb.r ?? 0) * 255),
    g: Math.round((rgb.g ?? 0) * 255),
    b: Math.round((rgb.b ?? 0) * 255),
  };
}

export function getHsl(color: string) {
  const hsl = toHsl(color);

  if (!hsl) {
    return {
      h: 0,
      s: 0,
      l: 0,
    };
  }

  return {
    h: Math.round(hsl.h ?? 0),
    s: Math.round((hsl.s ?? 0) * 100),
    l: Math.round((hsl.l ?? 0) * 100),
  };
}

export function getOklch(color: string) {
  const oklch = toOklch(color);

  if (!oklch) {
    return {
      l: 0,
      c: 0,
      h: 0,
    };
  }

  return {
    l: Number((oklch.l ?? 0).toFixed(3)),
    c: Number((oklch.c ?? 0).toFixed(3)),
    h: Math.round(oklch.h ?? 0),
  };
}

export function getCssColor(color: string) {
  return formatCss(color);
}

export function getContrast(foreground: string, background: string) {
  return wcagContrast(foreground, background);
}
