"use client";

import { forwardRef } from "react";

interface CornerReadoutProps {
  index: string;
  name: string;
}

const CornerReadout = forwardRef<HTMLDivElement, CornerReadoutProps>(function CornerReadout(
  { index, name },
  ref
) {
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute right-4 top-[calc(var(--nav-h)+1.25rem)] z-10 flex flex-col items-end gap-1.5 sm:right-6 sm:top-[calc(var(--nav-h)+1.75rem)] sm:gap-2 md:right-10"
    >
      <span className="font-display whitespace-nowrap text-[9px] uppercase tracking-[0.18em] text-white/70 sm:text-[11px] sm:tracking-[0.3em]">
        {index} / {name}
      </span>
      <span className="h-px w-14 overflow-hidden bg-white/25">
        <span className="block h-full origin-left bg-white/80" style={{ width: "calc(var(--p, 0) * 100%)" }} />
      </span>
    </div>
  );
});

export default CornerReadout;
