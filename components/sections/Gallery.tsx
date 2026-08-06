"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { galleryImages } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      // Same pinned, vertical-scroll-drives-horizontal-move technique on
      // every screen size — mobile included.
      const getDistance = () => track.scrollWidth - section.clientWidth;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      return () => tween.kill();
    },
    { scope: sectionRef }
  );

  return (
    <section id="gallery" ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-bg">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pt-[calc(var(--nav-h)+1.5rem)] md:px-10">
        <p className="eyebrow">The Gallery</p>
        <p className="font-display text-[11px] uppercase tracking-[0.2em] text-muted">Scroll</p>
      </div>

      <div
        ref={trackRef}
        className="flex h-full w-max items-center gap-6 px-6 pt-16 will-change-transform md:gap-8 md:px-10"
      >
        {galleryImages.map((img, i) => (
          <figure
            key={img.src}
            className={`relative h-[50vh] shrink-0 overflow-hidden rounded-sm sm:h-[62vh] ${
              i % 3 === 1 ? "w-[72vw] sm:w-[42vw] md:w-[32vw]" : "w-[85vw] sm:w-[62vw] md:w-[44vw]"
            }`}
          >
            <Image src={img.src} alt={img.alt} fill sizes="60vw" className="object-cover" />
            <figcaption className="absolute bottom-4 left-4 font-display text-[10px] uppercase tracking-[0.25em] text-white/80">
              {String(i + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
