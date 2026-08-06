// Shared fade/slide curve for the title block on every scroll-scrub section:
// full brightness & resting position through 13% of the section's scroll,
// then it slides left and dims down to a minimum opacity by 70%, holding
// there for the remainder — so it reads clearly up front but never fights
// with the footage for attention once the room has been "seen".
const FULL_END = 0.13;
const MIN_START = 0.7;
const MIN_OPACITY = 0.22;
const SLIDE_PX = 56;

export function titleBlockStyle(progress: number) {
  let opacity: number;
  let t: number;
  if (progress <= FULL_END) {
    opacity = 1;
    t = 0;
  } else if (progress >= MIN_START) {
    opacity = MIN_OPACITY;
    t = 1;
  } else {
    t = (progress - FULL_END) / (MIN_START - FULL_END);
    opacity = 1 - t * (1 - MIN_OPACITY);
  }
  return { opacity, transform: `translateX(${-t * SLIDE_PX}px)` };
}

export function applyTitleBlock(el: HTMLElement | null, progress: number) {
  if (!el) return;
  const { opacity, transform } = titleBlockStyle(progress);
  el.style.opacity = String(opacity);
  el.style.transform = transform;
}

export function applyCornerProgress(el: HTMLElement | null, progress: number) {
  if (!el) return;
  el.style.setProperty("--p", String(Math.min(1, Math.max(0, progress))));
}
