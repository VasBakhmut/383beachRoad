"use client";

import { forwardRef, type ReactNode } from "react";

interface TitleBlockProps {
  index: string;
  name: string;
  heading: ReactNode;
  subheading?: ReactNode;
  size?: "lg" | "md";
  uppercase?: boolean;
}

const TitleBlock = forwardRef<HTMLDivElement, TitleBlockProps>(function TitleBlock(
  { index, name, heading, subheading, size = "md", uppercase = false },
  ref
) {
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-x-6 bottom-[14%] z-10 max-w-lg md:inset-x-auto md:left-10 lg:left-16"
    >
      <p className="font-display mb-3 text-[11px] uppercase tracking-[0.3em] text-white/70">
        {index} / {name}
      </p>
      <h2
        className={`font-display font-semibold leading-[1.05] tracking-tight text-white text-balance ${
          uppercase ? "uppercase" : ""
        } ${size === "lg" ? "text-4xl sm:text-5xl lg:text-[4.2vw]" : "text-3xl sm:text-4xl lg:text-5xl"}`}
      >
        {heading}
      </h2>
      {subheading && (
        <p className="font-display mt-3 max-w-md text-sm text-white/70 sm:text-base">{subheading}</p>
      )}
    </div>
  );
});

export default TitleBlock;
