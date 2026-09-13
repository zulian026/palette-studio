import { formatHex, hsl } from "culori";

export function randomHue() {
  return Math.floor(Math.random() * 360);
}

export function randomSaturation() {
  return 0.55 + Math.random() * 0.35;
}

export function randomLightness() {
  return 0.35 + Math.random() * 0.3;
}

export function generateRandomColor() {
  return formatHex(
    hsl({
      mode: "hsl",
      h: randomHue(),
      s: randomSaturation(),
      l: randomLightness(),
    }),
  );
}
