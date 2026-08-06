import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import ScrubGround from "@/components/sections/ScrubGround";
import TextImageSection from "@/components/sections/TextImageSection";
import ScrubFirstFloor from "@/components/sections/ScrubFirstFloor";
import Finale from "@/components/sections/Finale";
import Close from "@/components/sections/Close";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";
import { livingKitchenCopy, suitesCopy } from "@/lib/content";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <ScrubGround />
      <TextImageSection
        dataLevel="living"
        eyebrow={livingKitchenCopy.eyebrow}
        heading={livingKitchenCopy.heading}
        paragraphs={livingKitchenCopy.paragraphs}
        tags={livingKitchenCopy.tags}
        image="/images/kitchen-island.webp"
        imageAlt="Dolomite kitchen island with brass pendant lighting"
        imageSide="right"
      />
      <ScrubFirstFloor />
      <TextImageSection
        eyebrow={suitesCopy.eyebrow}
        heading={suitesCopy.heading}
        paragraphs={suitesCopy.paragraphs}
        tags={suitesCopy.tags}
        image="/images/ensuite-arch-mirror.webp"
        imageAlt="Ensuite bathroom with arched mirror and freestanding bath"
        imageSide="left"
      />
      <Finale />
      <Close />
      <Gallery />
      <Contact />
    </main>
  );
}
