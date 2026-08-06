"use client";

import { useRef } from "react";
import ScrollScrubSection from "@/components/ScrollScrubSection";
import TitleBlock from "@/components/scrub/TitleBlock";
import CornerReadout from "@/components/scrub/CornerReadout";
import frameManifest from "@/lib/frame-manifest.json";
import { applyTitleBlock, applyCornerProgress } from "@/lib/scrub-title";

export default function ScrubGround() {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const cornerRef = useRef<HTMLDivElement | null>(null);

  const handleProgress = (p: number) => {
    applyTitleBlock(titleRef.current, p);
    applyCornerProgress(cornerRef.current, p);
  };

  return (
    <ScrollScrubSection
      id="scrub-ground"
      dataLevel="ground"
      folder="ground"
      count={frameManifest.ground.count}
      pinVh={6.3}
      onProgress={handleProgress}
    >
      <CornerReadout ref={cornerRef} index="01" name="GROUND" />
      <TitleBlock
        ref={titleRef}
        index="01"
        name="GROUND"
        heading="A private world below"
        subheading="Suites · family lounge · heated lap pool"
      />
    </ScrollScrubSection>
  );
}
