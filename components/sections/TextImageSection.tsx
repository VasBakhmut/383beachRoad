import Image from "next/image";
import RevealSlide from "@/components/RevealSlide";

interface TextImageSectionProps {
  id?: string;
  dataLevel?: string;
  eyebrow: string;
  heading: string;
  paragraphs: readonly string[];
  tags?: readonly string[];
  image: string;
  imageAlt: string;
  imageSide?: "left" | "right";
}

export default function TextImageSection({
  id,
  dataLevel,
  eyebrow,
  heading,
  paragraphs,
  tags,
  image,
  imageAlt,
  imageSide = "right",
}: TextImageSectionProps) {
  const textOrder = imageSide === "right" ? "md:order-1" : "md:order-2";
  const imageOrder = imageSide === "right" ? "md:order-2" : "md:order-1";
  const textDirection = imageSide === "right" ? "left" : "right";
  const imageDirection = imageSide === "right" ? "right" : "left";

  return (
    <section id={id} data-level={dataLevel} className="relative grid grid-cols-1 gap-14 bg-bg px-6 py-28 md:grid-cols-2 md:gap-10 md:px-10 md:py-32 lg:px-16">
      <div className={`flex flex-col justify-center ${textOrder}`}>
        <RevealSlide direction={textDirection}>
          <p className="eyebrow mb-6">{eyebrow}</p>
          <h2 className="font-display max-w-lg text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            {heading}
          </h2>
          <div className="mt-6 flex max-w-lg flex-col gap-5">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-base leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
          {tags && tags.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6">
              {tags.map((tag) => (
                <li key={tag} className="font-display text-[11px] uppercase tracking-[0.18em] text-muted">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </RevealSlide>
      </div>

      <div className={`${imageOrder}`}>
        <RevealSlide direction={imageDirection} className="relative h-[55vh] w-full overflow-hidden rounded-sm md:h-full md:min-h-[32rem]">
          <Image src={image} alt={imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </RevealSlide>
      </div>
    </section>
  );
}
