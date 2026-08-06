import RevealSlide from "@/components/RevealSlide";
import CountUp from "@/components/CountUp";
import { BedIcon, BathIcon, CarIcon, LevelsIcon, AreaIcon } from "@/components/icons";

const items = [
  { Icon: BedIcon, value: "4", label: "Bed" },
  { Icon: BathIcon, value: "4", label: "Bath" },
  { Icon: CarIcon, value: "4+", label: "Car" },
  { Icon: LevelsIcon, value: "4", label: "Levels" },
  { Icon: AreaIcon, value: "335m²", label: "Internal" },
] as const;

export default function Stats() {
  return (
    <section className="relative bg-bg px-6 py-14 md:px-10 md:py-16 lg:px-16">
      <RevealSlide direction="up">
        <div className="flex flex-col gap-8 border-y border-line py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
          <div className="max-w-sm">
            <p className="eyebrow mb-3">The Numbers</p>
            <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
              Four levels, every detail considered.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-5 sm:gap-x-8">
            {items.map(({ Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon className="h-5 w-5 shrink-0 text-muted" />
                <span className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  <CountUp value={value} />
                </span>
                <span className="font-display text-[11px] uppercase tracking-[0.15em] text-muted">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </RevealSlide>
    </section>
  );
}
