// Converts the curated set of source photos into optimized webp files under
// public/images/, with clean semantic names used throughout the site.
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "photos");
const OUT = path.join(ROOT, "public", "images");
mkdirSync(OUT, { recursive: true });

// [source file, output name, max width, quality]
const JOBS = [
  ["Beaumories1.jpg", "living-bay-view.webp", 2000, 80],
  ["Beaumories2.jpg", "sunset-balcony.webp", 2000, 80],
  ["Beaumories3.jpg", "facade-twilight.webp", 2000, 80],
  ["Beaumories4.jpg", "living-dining-fireplace.webp", 2000, 80],
  ["Beaumories5.jpg", "kitchen-island.webp", 2000, 82],
  ["Beaumories6.jpg", "rooftop-bbq.webp", 2000, 80],
  ["Beaumories7.jpg", "rooftop-spa-sunset.webp", 2000, 80],
  ["Beaumories8.jpg", "suite-bedroom.webp", 2000, 80],
  ["Beaumories9.jpg", "suite-ensuite-tub.webp", 2000, 80],
  ["Beaumories10.jpg", "ground-lounge.webp", 2000, 80],
  ["Beaumories11.jpg", "pool-dusk-exterior.webp", 2000, 80],
  ["Beaumories12.jpg", "pool-lap-side.webp", 2000, 80],
  ["Beaumories13.jpg", "suite-bedroom-two.webp", 2000, 80],
  ["Beaumories14.jpg", "ensuite-arch-mirror.webp", 2000, 80],
  ["Beaumories15.jpg", "lift-interior.webp", 1400, 78],
  ["Beaumories16.jpg", "garage-turntable.webp", 2000, 80],
  ["Beaumories24.webp", "powder-room.webp", 2000, 80],
  ["Beaumories29.webp", "ensuite-double-vanity.webp", 2000, 80],
  ["Beaumories30.webp", "facade-day-portrait.webp", 1200, 82],
  ["Beaumories31.webp", "facade-dusk-portrait.webp", 900, 82],
  ["Beaumoriesplan.png", "floor-plans.webp", 3000, 92],
  ["secondscreen.png", "rooftop-terrace-wide.webp", 2000, 82],
  ["Screenshot 2026-07-28 211007.png", "bedroom-tub-moody.webp", 1400, 78],
  ["Screenshot 2026-07-29 120242.png", "staircase-detail.webp", 2000, 78],
  ["Screenshot 2026-08-04 164455.png", "garage-alt-angle.webp", 2000, 78],
];

const run = async () => {
  for (const [src, out, width, quality] of JOBS) {
    const srcPath = path.join(SRC, src);
    const outPath = path.join(OUT, out);
    await sharp(srcPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(outPath);
    console.log(`${src} -> images/${out}`);
  }
};

run().then(() => console.log("\nDone."));
