"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useImageSequence } from "@/hooks/useImageSequence";

gsap.registerPlugin(ScrollTrigger);

interface ScrollScrubSectionProps {
  id?: string;
  dataLevel?: string;
  folder: string;
  count: number;
  /** How many viewport-heights of scroll distance the pin should consume. */
  pinVh?: number;
  onProgress?: (progress: number) => void;
  children?: ReactNode;
  className?: string;
}

export default function ScrollScrubSection({
  id,
  dataLevel,
  folder,
  count,
  pinVh = 3,
  onProgress,
  children,
  className = "",
}: ScrollScrubSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { canvasRef, progressTarget, firstFrameReady, loadedCount, total } = useImageSequence({
    folder,
    count,
  });

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * pinVh)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          progressTarget.current = self.progress;
          onProgress?.(self.progress);
        },
      });

      return () => trigger.kill();
    },
    { scope: sectionRef, dependencies: [pinVh, folder, count] }
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      data-level={dataLevel}
      className={`relative h-screen w-full overflow-hidden bg-black ${className}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {children}

      <div
        ref={loaderRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-700"
        style={{ opacity: firstFrameReady ? 0 : 1 }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="h-px w-24 overflow-hidden bg-white/20">
            <div
              className="h-full bg-white/80 transition-[width] duration-200"
              style={{ width: `${Math.round((loadedCount / total) * 100)}%` }}
            />
          </div>
          <span className="font-display text-[10px] uppercase tracking-[0.3em] text-white/50">Loading</span>
        </div>
      </div>
    </section>
  );
}
