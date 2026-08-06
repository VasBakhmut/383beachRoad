"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CountUpProps {
  value: string;
  className?: string;
}

export default function CountUp({ value, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;

  useGSAP(
    () => {
      if (!ref.current || !match) return;
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = String(Math.round(counter.val));
        },
      });
    },
    { scope: ref }
  );

  if (!match) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span className={className}>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}
