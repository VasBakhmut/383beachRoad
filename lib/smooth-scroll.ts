import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function scrollToSelector(selector: string) {
  if (typeof window === "undefined") return;
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(selector, { duration: 1.3 });
  } else {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  }
}
