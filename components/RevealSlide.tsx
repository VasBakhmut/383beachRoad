"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealSlideProps {
  children: ReactNode;
  direction?: "left" | "right" | "up";
  delay?: number;
  distance?: number;
  className?: string;
  as?: "div" | "span";
}

export default function RevealSlide({
  children,
  direction = "left",
  delay = 0,
  distance = 70,
  className = "",
}: RevealSlideProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const x = direction === "left" ? -distance : direction === "right" ? distance : 0;
      const y = direction === "up" ? distance * 0.5 : 0;

      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, x, y },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 1.2,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
