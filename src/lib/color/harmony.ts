import { converter, formatHex, hsl } from "culori";

const toHsl = converter("hsl");

function normalizeHue(hue: number) {
  return ((hue % 360) + 360) % 360;
}

function createHslColor(hue: number, saturation: number, lightness: number) {
  return formatHex(
    hsl({
      mode: "hsl",
      h: normalizeHue(hue),
      s: saturation,
      l: lightness,
    }),
  );
}

export function generateAnalogous(baseColor: string) {
  const color = toHsl(baseColor);

  if (!color) {
    return [];
  }

  const hue = color.h ?? 0;
  const saturation = color.s ?? 0;
  const lightness = color.l ?? 0.5;

  return [
    createHslColor(hue - 40, saturation, lightness),

    createHslColor(hue - 20, saturation, lightness),

    createHslColor(hue, saturation, lightness),

    createHslColor(hue + 20, saturation, lightness),

    createHslColor(hue + 40, saturation, lightness),
  ];
}

export function generateComplementary(baseColor: string) {
  const color = toHsl(baseColor);

  if (!color) {
    return [];
  }

  const hue = color.h ?? 0;
  const saturation = color.s ?? 0.7;
  const lightness = color.l ?? 0.5;

  return [
    createHslColor(hue, saturation, Math.min(lightness + 0.25, 0.95)),

    createHslColor(hue, saturation, lightness),

    createHslColor(hue, saturation, Math.max(lightness - 0.2, 0.1)),

    createHslColor(hue + 180, saturation, lightness),

    createHslColor(hue + 180, saturation, Math.max(lightness - 0.15, 0.1)),
  ];
}

export function generateTriadic(baseColor: string) {
  const color = toHsl(baseColor);

  if (!color) {
    return [];
  }

  const hue = color.h ?? 0;
  const saturation = color.s ?? 0.7;
  const lightness = color.l ?? 0.5;

  return [
    createHslColor(hue, saturation, lightness),

    createHslColor(hue + 120, saturation, lightness),

    createHslColor(hue + 240, saturation, lightness),

    createHslColor(hue + 120, saturation * 0.7, Math.min(lightness + 0.2, 0.9)),

    createHslColor(
      hue + 240,
      saturation * 0.7,
      Math.max(lightness - 0.15, 0.1),
    ),
  ];
}

export function generateMonochromatic(baseColor: string) {
  const color = toHsl(baseColor);

  if (!color) {
    return [];
  }

  const hue = color.h ?? 0;
  const saturation = color.s ?? 0;
  const lightness = color.l ?? 0.5;

  return [
    createHslColor(hue, saturation, 0.95),

    createHslColor(hue, saturation, 0.75),

    createHslColor(hue, saturation, lightness),

    createHslColor(hue, saturation, 0.35),

    createHslColor(hue, saturation, 0.15),
  ];
}
