"use client";

import { useRef } from "react";
import ScrollScrubSection from "@/components/ScrollScrubSection";
import TitleBlock from "@/components/scrub/TitleBlock";
import CornerReadout from "@/components/scrub/CornerReadout";
import frameManifest from "@/lib/frame-manifest.json";
import { applyTitleBlock, applyCornerProgress } from "@/lib/scrub-title";

export default function Hero() {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const cornerRef = useRef<HTMLDivElement | null>(null);

  const handleProgress = (p: number) => {
    applyTitleBlock(titleRef.current, p);
    applyCornerProgress(cornerRef.current, p);
  };

  return (
    <ScrollScrubSection id="hero" folder="hero" count={frameManifest.hero.count} pinVh={4.3} onProgress={handleProgress}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/5 to-black/45" />

      <div className="pointer-events-none absolute left-4 top-[calc(var(--nav-h)+1.25rem)] z-10 max-w-[54%] sm:max-w-none sm:left-6 sm:top-[calc(var(--nav-h)+1.75rem)] md:left-10">
        <p className="font-display text-[9px] leading-snug uppercase tracking-[0.12em] text-white/70 sm:text-[11px] sm:tracking-[0.25em]">
          Private Sale &middot; $3.4M&mdash;$3.6M AUD
        </p>
      </div>

      <CornerReadout ref={cornerRef} index="00" name="ARRIVAL" />

      <TitleBlock
        ref={titleRef}
        index="00"
        name="ARRIVAL"
        heading="383B Beach Road, Beaumaris"
        subheading="Four levels of magnificent beachfront living"
        size="lg"
        uppercase
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-9 z-10 flex flex-col items-center gap-2 text-white/70">
        <span className="font-display text-[10px] uppercase tracking-[0.3em]">Scroll to enter</span>
        <span className="h-8 w-px animate-pulse bg-white/50" />
      </div>
    </ScrollScrubSection>
  );
}
