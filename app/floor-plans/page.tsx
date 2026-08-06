import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RevealSlide from "@/components/RevealSlide";
import { levels } from "@/lib/content";

export const metadata: Metadata = {
  title: "Floor Plans — 383B Beach Road, Beaumaris",
  description: "Explore 383B Beach Road level by level — basement, ground floor, first floor and rooftop terrace.",
};

export default function FloorPlansPage() {
  return (
    <main className="bg-bg pt-[var(--nav-h)]">
      <section className="px-6 pt-20 pb-16 md:px-10 md:pt-28 md:pb-24 lg:px-16">
        <RevealSlide direction="left">
          <p className="eyebrow mb-6">Four Lift-Accessed Levels</p>
          <h1 className="font-display max-w-2xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            The home,
            <br />
            line by line.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
            Move from the car turntable to the rooftop horizon. Each level has its own rhythm &mdash; the
            lift binds the whole composition together.
          </p>
          <a
            href="#plan"
            className="font-display mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-fg opacity-80 transition-opacity hover:opacity-100"
          >
            View architectural plan ↓
          </a>
        </RevealSlide>
      </section>

      {levels.map((level, i) => (
        <section
          key={level.key}
          className="grid grid-cols-1 gap-12 border-t border-line px-6 py-24 md:grid-cols-12 md:gap-8 md:px-10 md:py-32 lg:px-16"
        >
          <div className={`md:col-span-4 ${i % 2 === 1 ? "md:order-2" : ""}`}>
            <RevealSlide direction={i % 2 === 1 ? "right" : "left"}>
              <span className="font-display text-5xl font-semibold tracking-tight text-muted/50">
                {level.number}
              </span>
              <p className="eyebrow mt-4 mb-4">Level</p>
              <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{level.title}</h2>
              <p className="mt-6 text-base leading-relaxed text-muted">{level.description}</p>
              <p className="font-display mt-6 text-[11px] uppercase tracking-[0.2em] text-muted">{level.dims}</p>
            </RevealSlide>
          </div>

          <div className={`md:col-span-8 ${i % 2 === 1 ? "md:order-1" : ""}`}>
            <div className="grid grid-cols-2 gap-4">
              {level.images.map((img, idx) => (
                <RevealSlide
                  key={img}
                  direction={i % 2 === 1 ? "left" : "right"}
                  delay={idx * 0.08}
                  className={`relative overflow-hidden rounded-sm ${
                    idx === 0 && level.images.length > 1 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${level.title} interior`}
                    fill
                    sizes="(min-width: 768px) 40vw, 90vw"
                    className="object-cover"
                  />
                </RevealSlide>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section id="plan" className="border-t border-line px-6 py-24 md:px-10 md:py-32 lg:px-16">
        <RevealSlide direction="left" className="mb-12">
          <p className="eyebrow mb-6">Architectural Plan</p>
          <h2 className="font-display max-w-xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl">
            One vertical
            <br />
            sequence.
          </h2>
          <p className="font-display mt-5 text-[11px] uppercase tracking-[0.2em] text-muted">
            Basement &middot; Ground floor &middot; First floor &middot; Rooftop
          </p>
        </RevealSlide>

        <RevealSlide direction="up">
          <div className="relative w-full overflow-hidden rounded-sm border border-line bg-panel p-4 md:p-8">
            <Image
              src="/images/floor-plans.webp"
              alt="Floor plans for 383B Beach Road — basement, ground floor, first floor, rooftop and site plan"
              width={3000}
              height={1462}
              sizes="100vw"
              className="h-auto w-full"
            />
          </div>
        </RevealSlide>
      </section>

      <section className="border-t border-line px-6 py-24 text-center md:px-10 lg:px-16">
        <RevealSlide direction="up">
          <p className="eyebrow mb-6">Ready to walk through?</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Experience 383B
            <br />
            Beach Road.
          </h2>
          <Link
            href="/#contact"
            className="font-display mt-8 inline-block rounded-full bg-fg px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-bg transition-opacity hover:opacity-85"
          >
            Book a private inspection ↗
          </Link>
        </RevealSlide>
      </section>
    </main>
  );
}
