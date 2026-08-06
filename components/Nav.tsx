"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { scrollToSelector } from "@/lib/smooth-scroll";

export default function Nav() {
  const [scrolledOnHome, setScrolledOnHome] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const solid = !isHome || scrolledOnHome || menuOpen;

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolledOnHome(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const handleBook = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    if (isHome) {
      scrollToSelector("#contact");
    } else {
      router.push("/#contact");
    }
  };

  const color = solid ? "var(--fg)" : "#ffffff";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
      style={{
        backgroundColor: solid ? "color-mix(in srgb, var(--bg) 88%, transparent)" : "transparent",
        backdropFilter: solid ? "blur(10px)" : "none",
        borderBottom: solid ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="flex h-[var(--nav-h)] items-center justify-between gap-2 px-4 sm:gap-3 sm:px-6 md:px-10">
        <Link
          href="/"
          className="font-display min-w-0 flex-1 truncate text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors duration-500 sm:flex-none sm:text-xs sm:tracking-[0.25em]"
          style={{ color }}
        >
          383B Beach Road
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/#gallery"
            className="font-display text-xs uppercase tracking-[0.2em] opacity-80 transition-opacity hover:opacity-100"
            style={{ color }}
          >
            Gallery
          </Link>
          <Link
            href="/floor-plans"
            className="font-display text-xs uppercase tracking-[0.2em] opacity-80 transition-opacity hover:opacity-100"
            style={{ color }}
          >
            Plans
          </Link>
        </nav>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          className="flex shrink-0 flex-col items-center justify-center gap-[5px] p-1 md:hidden"
        >
          <span
            className="h-px w-4 transition-transform duration-300"
            style={{ backgroundColor: color, transform: menuOpen ? "translateY(3px) rotate(45deg)" : "none" }}
          />
          <span
            className="h-px w-4 transition-transform duration-300"
            style={{ backgroundColor: color, transform: menuOpen ? "translateY(-3px) rotate(-45deg)" : "none" }}
          />
        </button>

        <button
          onClick={handleBook}
          className="font-display shrink-0 cursor-pointer rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.1em] transition-colors duration-300 hover:bg-white hover:text-black sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-[0.2em]"
          style={{ borderColor: solid ? "var(--fg)" : "rgba(255,255,255,0.7)", color }}
        >
          <span className="sm:hidden">Book</span>
          <span className="hidden sm:inline">Book Inspection</span>
        </button>
      </div>

      <div
        className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden"
        style={{ gridTemplateRows: menuOpen ? "1fr" : "0fr" }}
      >
        <div className="min-h-0">
          <nav className="flex flex-col border-t border-line px-4 py-2" style={{ borderColor: "var(--line)" }}>
            <Link
              href="/#gallery"
              onClick={() => setMenuOpen(false)}
              className="font-display border-b border-line py-4 text-xs uppercase tracking-[0.2em]"
              style={{ color: "var(--fg)" }}
            >
              Gallery
            </Link>
            <Link
              href="/floor-plans"
              onClick={() => setMenuOpen(false)}
              className="font-display py-4 text-xs uppercase tracking-[0.2em]"
              style={{ color: "var(--fg)" }}
            >
              Floor Plans
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
