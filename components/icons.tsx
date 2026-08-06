// Restrained line-style spec icons (bed / bath / car / levels / area), used
// in the compact Stats strip. Single stroke, no fill, matches the site's
// editorial tone rather than a generic icon-pack look.

type IconProps = { className?: string };

const base = "1.4";

export function BedIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6.5A2.5 2.5 0 0 1 5.5 9H10a2 2 0 0 1 2 2v2" />
      <path d="M22 18v-6.5A2.5 2.5 0 0 0 19.5 9H15a2 2 0 0 0-2 2v2" />
      <path d="M2 13.5h20V18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4.5Z" />
      <path d="M2 19v2M22 19v2" />
    </svg>
  );
}

export function BathIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12V6a2 2 0 0 1 2-2c1.1 0 2 .8 2 2" />
      <path d="M2 12h20v2a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6v-2Z" />
      <path d="M7 20v2M17 20v2" />
    </svg>
  );
}

export function CarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16V11l2-5h12l2 5v5" />
      <path d="M2 16h20v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2Z" />
      <circle cx="7" cy="16" r="1.4" />
      <circle cx="17" cy="16" r="1.4" />
    </svg>
  );
}

export function LevelsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="2.5" width="10" height="5.2" rx="0.5" />
      <rect x="4" y="9.4" width="16" height="5.2" rx="0.5" />
      <rect x="2" y="16.3" width="20" height="5.2" rx="0.5" />
    </svg>
  );
}

export function AreaIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
      <rect x="8" y="8" width="8" height="8" rx="0.5" />
    </svg>
  );
}

export function TerraceIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={base} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8 12 3l10 5" />
      <path d="M4 8v11M20 8v11" />
      <path d="M2 19h20" />
      <path d="M8 12v4M12 12v4M16 12v4" />
    </svg>
  );
}
