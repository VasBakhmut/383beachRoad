"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { scrollToSelector } from "@/lib/smooth-scroll";

const LEVELS = [
  { key: "ground", label: "Ground" },
  { key: "living", label: "Living" },
  { key: "first-floor", label: "First Floor" },
  { key: "rooftop", label: "Rooftop" },
] as const;

export default function FloorProgressRail() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [fill, setFill] = useState(0);
  const railBoundsRef = useRef<{ top: number; bottom: number } | null>(null);

  useEffect(() => {
    if (!isHome) return;

    const markers = LEVELS.map((l) => document.querySelector<HTMLElement>(`[data-level="${l.key}"]`)).filter(
      (el): el is HTMLElement => !!el
    );
    if (markers.length === 0) return;

    const first = markers[0];
    const last = markers[markers.length - 1];

    const computeBounds = () => {
      railBoundsRef.current = {
        top: first.offsetTop,
        bottom: last.offsetTop + last.offsetHeight,
      };
    };
    computeBounds();
    window.addEventListener("resize", computeBounds);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.getAttribute("data-level");
            const idx = LEVELS.findIndex((l) => l.key === key);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    markers.forEach((m) => observer.observe(m));

    const onScroll = () => {
      const bounds = railBoundsRef.current;
      if (!bounds) return;
      const scrollY = window.scrollY + window.innerHeight / 2;
      setVisible(scrollY > bounds.top - window.innerHeight * 0.4);
      const range = bounds.bottom - bounds.top || 1;
      const p = (scrollY - bounds.top) / range;
      setFill(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", computeBounds);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  if (!isHome) return null;

  return (
    <div
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-0 transition-opacity duration-700 lg:flex"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      <div className="relative flex flex-col gap-8 py-2">
        <div className="absolute left-[3px] top-0 bottom-0 w-px bg-line" />
        <div
          className="absolute left-[3px] top-0 w-px bg-fg transition-[height] duration-300 ease-out"
          style={{ height: `${fill * 100}%` }}
        />
        {LEVELS.map((level, i) => (
          <button
            key={level.key}
            onClick={() => scrollToSelector(`[data-level="${level.key}"]`)}
            className="group flex items-center gap-3"
          >
            <span
              className="relative z-10 h-[7px] w-[7px] rounded-full transition-all duration-300"
              style={{
                background: i <= active ? "var(--fg)" : "var(--bg)",
                border: `1px solid var(--fg)`,
                transform: i === active ? "scale(1.4)" : "scale(1)",
              }}
            />
            <span
              className="font-display whitespace-nowrap text-[10px] uppercase tracking-[0.2em] transition-opacity duration-300"
              style={{ opacity: i === active ? 1 : 0.4 }}
            >
              {level.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
