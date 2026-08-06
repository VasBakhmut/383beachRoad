"use client";

import { useRef } from "react";
import ScrollScrubSection from "@/components/ScrollScrubSection";
import TitleBlock from "@/components/scrub/TitleBlock";
import CornerReadout from "@/components/scrub/CornerReadout";
import frameManifest from "@/lib/frame-manifest.json";
import { applyTitleBlock, applyCornerProgress } from "@/lib/scrub-title";
import { setThemeProgress, remap } from "@/lib/theme-progress";
import { property } from "@/lib/content";

export default function Finale() {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const cornerRef = useRef<HTMLDivElement | null>(null);
  const sideNoteRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLDivElement | null>(null);

  const handleProgress = (p: number) => {
    applyTitleBlock(titleRef.current, p);
    applyCornerProgress(cornerRef.current, p);
    setThemeProgress(remap(p, 0.62, 0.95, 0, 1));

    if (sideNoteRef.current) {
      sideNoteRef.current.style.opacity = String(remap(p, 0.45, 0.7, 0, 1));
    }

    if (closeRef.current) {
      const o = remap(p, 0.88, 1, 0, 1);
      closeRef.current.style.opacity = String(o);
      closeRef.current.style.transform = `translateY(${(1 - o) * 16}px)`;
    }
  };

  return (
    <ScrollScrubSection
      id="scrub-finale"
      dataLevel="rooftop"
      folder="finale"
      count={frameManifest.finale.count}
      pinVh={8.3}
      onProgress={handleProgress}
    >
      <CornerReadout ref={cornerRef} index="03" name="ASCENT" />
      <TitleBlock
        ref={titleRef}
        index="03"
        name="ASCENT"
        heading="Above it all"
        subheading="Rooftop · garage · street · facade · home"
      />

      <div
        ref={sideNoteRef}
        className="pointer-events-none absolute inset-x-6 top-[22%] z-10 text-right opacity-0 md:inset-x-auto md:right-10 md:top-1/2 md:max-w-xs md:-translate-y-1/2 lg:right-16"
      >
        <p className="font-display text-sm leading-relaxed text-white/75 sm:text-base">
          Port Phillip Bay, from first light to after dark.
        </p>
      </div>

      <div
        ref={closeRef}
        className="pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center px-6 text-center opacity-0"
      >
        <p className="font-display text-[11px] uppercase tracking-[0.35em] text-white/60">{property.saleType}</p>
        <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {property.fullAddress}
        </h2>
      </div>
    </ScrollScrubSection>
  );
}
