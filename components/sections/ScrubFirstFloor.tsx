"use client";

import { useRef } from "react";
import ScrollScrubSection from "@/components/ScrollScrubSection";
import TitleBlock from "@/components/scrub/TitleBlock";
import CornerReadout from "@/components/scrub/CornerReadout";
import frameManifest from "@/lib/frame-manifest.json";
import { applyTitleBlock, applyCornerProgress } from "@/lib/scrub-title";

export default function ScrubFirstFloor() {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const cornerRef = useRef<HTMLDivElement | null>(null);

  const handleProgress = (p: number) => {
    applyTitleBlock(titleRef.current, p);
    applyCornerProgress(cornerRef.current, p);
  };

  return (
    <ScrollScrubSection
      id="scrub-first-floor"
      dataLevel="first-floor"
      folder="first-floor"
      count={frameManifest["first-floor"].count}
      pinVh={7.5}
      onProgress={handleProgress}
    >
      <CornerReadout ref={cornerRef} index="02" name="FIRST FLOOR" />
      <TitleBlock
        ref={titleRef}
        index="02"
        name="FIRST FLOOR"
        heading="Rooms that reveal themselves"
        subheading="Living · kitchen · primary suite · ensuite"
      />
    </ScrollScrubSection>
  );
}
