// Imperative bridge from the finale scroll-scrub to the global CSS theme
// variable (--theme-t). Kept outside React state so it can update every
// animation frame without triggering re-renders.
export function setThemeProgress(t: number) {
  if (typeof document === "undefined") return;
  const clamped = Math.min(1, Math.max(0, t));
  document.documentElement.style.setProperty("--theme-t", String(clamped));
}

export function remap(value: number, inMin: number, inMax: number, outMin = 0, outMax = 1) {
  if (inMax === inMin) return outMin;
  const t = (value - inMin) / (inMax - inMin);
  const clamped = Math.min(1, Math.max(0, t));
  return outMin + clamped * (outMax - outMin);
}
