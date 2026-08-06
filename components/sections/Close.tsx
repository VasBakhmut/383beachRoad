import Image from "next/image";
import RevealSlide from "@/components/RevealSlide";
import { closeCopy, additionalFeatures } from "@/lib/content";

export default function Close() {
  return (
    <section className="relative bg-bg px-6 py-28 md:px-10 md:py-36 lg:px-16">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-10">
        <RevealSlide direction="left" className="flex flex-col justify-center">
          <p className="eyebrow mb-6">{closeCopy.eyebrow}</p>
          <h2 className="font-display max-w-lg text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            {closeCopy.heading}
          </h2>
          <div className="mt-6 flex max-w-lg flex-col gap-5">
            {closeCopy.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-base leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
        </RevealSlide>

        <RevealSlide direction="right" className="relative h-[55vh] w-full overflow-hidden rounded-sm md:h-full md:min-h-[30rem]">
          <Image
            src="/images/facade-twilight.webp"
            alt="383B Beach Road facade at twilight"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </RevealSlide>
      </div>

      <RevealSlide direction="up" className="mt-24">
        <div className="grid grid-cols-1 gap-8 border-t border-line pt-12 sm:grid-cols-3">
          {closeCopy.highlights.map((h) => (
            <div key={h.title}>
              <h3 className="font-display text-lg font-semibold tracking-tight">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{h.body}</p>
            </div>
          ))}
        </div>
      </RevealSlide>

      <RevealSlide direction="up" delay={0.1} className="mt-16">
        <ul className="flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-8">
          {additionalFeatures.map((f) => (
            <li key={f} className="font-display text-[11px] uppercase tracking-[0.18em] text-muted">
              {f}
            </li>
          ))}
        </ul>
      </RevealSlide>
    </section>
  );
}
