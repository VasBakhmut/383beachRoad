// Two-stage pipeline for the scroll-scrub frame sequences:
//   1. Retime each source clip with a piecewise setpts speed ramp, so uneven
//      camera/motion speed in the raw footage doesn't read as stutter once we
//      sample it at a constant fps for the scrub.
//   2. Sample the retimed clip into a numbered webp frame sequence (and, for
//      the hero clip, blur out the baked-in AI-tool watermark corner).
// Run with `node scripts/extract-frames.mjs`.
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_ROOT = path.join(ROOT, "public", "frames");
const RETIMED_DIR = path.join(ROOT, "video", ".retimed");

// Each clip is described as a list of contiguous [start, end) segments (in
// the ORIGINAL source's seconds) with a speed `factor`: factor > 1 slows
// that segment down (setpts=PTS*factor), factor < 1 speeds it up.
const CLIPS = [
  {
    key: "hero",
    src: "video/firstScreenBeaumaries.mp4",
    width: 1600,
    quality: 76,
    fpsTarget: 170 / 5.75,
    segments: [
      { start: 0.0, end: 1.464, factor: 1 },
      { start: 1.464, end: 2.722, factor: 3 }, // was too fast
      { start: 2.722, end: 5.05, factor: 1 }, // trims last ~0.7s: source pillarboxes from ~5.1s to the end
    ],
    // Bottom-right "KlingAI 3.0" watermark, in the 1600x900 output frame.
    watermark: { x: 1370, y: 815, w: 230, h: 85 },
  },
  {
    key: "ground",
    src: "video/beaumaris_graund_floor.mp4",
    width: 1600,
    quality: 68,
    fpsTarget: 340 / 23.92,
    segments: [
      { start: 0.0, end: 2.865, factor: 1 },
      { start: 2.865, end: 4.621, factor: 3 }, // too fast
      { start: 4.621, end: 9.0, factor: 1 },
      { start: 9.0, end: 9.28, factor: 0.7 }, // transition freeze around 9.14s, nudge it along
      { start: 9.28, end: 17.15, factor: 1 },
      { start: 17.15, end: 17.43, factor: 0.7 }, // transition freeze around 17.29s
      { start: 17.43, end: 23.92, factor: 1 },
    ],
  },
  {
    key: "first-floor",
    src: "video/beaumaris_living_to_bathroom_eight_clips.mp4",
    width: 1600,
    quality: 68,
    fpsTarget: 360 / 25.45,
    segments: [
      { start: 0.0, end: 0.676, factor: 1 },
      { start: 0.676, end: 2.598, factor: 4 }, // very fast
      { start: 2.598, end: 9.212, factor: 1 },
      { start: 9.212, end: 10.647, factor: 1.5 }, // fast
      { start: 10.647, end: 13.109, factor: 1 },
      { start: 13.109, end: 14.687, factor: 2 }, // very fast
      { start: 14.687, end: 14.727, factor: 1 },
      { start: 14.727, end: 18.159, factor: 0.5 }, // very slow, speed up
      { start: 18.159, end: 25.45, factor: 1 },
    ],
  },
  {
    key: "finale",
    src: "video/beaumaris_FINAL_v2_correct_sequence.mp4",
    width: 1600,
    quality: 72,
    fpsTarget: 400 / 27.25,
    segments: [
      { start: 0.0, end: 2.824, factor: 2 }, // very fast
      { start: 2.824, end: 27.25, factor: 1 },
    ],
  },
];

const run = (args) => spawnSync(ffmpegPath, args, { stdio: "inherit" });

const retime = (clip) => {
  const srcPath = path.join(ROOT, clip.src);
  if (!existsSync(srcPath)) {
    console.error(`Missing source video: ${srcPath}`);
    process.exit(1);
  }
  mkdirSync(RETIMED_DIR, { recursive: true });
  const outPath = path.join(RETIMED_DIR, `${clip.key}.mp4`);

  const segs = clip.segments;
  const trimChain = segs
    .map((s, i) => `[0:v]trim=start=${s.start}:end=${s.end},setpts=(PTS-STARTPTS)*${s.factor}[s${i}]`)
    .join(";");
  const concatChain = `${segs.map((_, i) => `[s${i}]`).join("")}concat=n=${segs.length}:v=1:a=0[vout]`;
  const filterComplex = `${trimChain};${concatChain}`;

  const totalDuration = segs.reduce((acc, s) => acc + (s.end - s.start) * s.factor, 0);

  console.log(`\n[${clip.key}] retiming ${segs.length} segments -> ${totalDuration.toFixed(2)}s`);

  const result = run([
    "-y",
    "-i",
    srcPath,
    "-filter_complex",
    filterComplex,
    "-map",
    "[vout]",
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-crf",
    "16",
    "-pix_fmt",
    "yuv420p",
    "-an",
    outPath,
  ]);

  if (result.status !== 0) {
    console.error(`ffmpeg retime failed for ${clip.key}`);
    process.exit(result.status ?? 1);
  }

  return { outPath, totalDuration };
};

const extractFrames = (clip, retimedPath, totalDuration) => {
  const outDir = path.join(OUT_ROOT, clip.key);
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  const frameCount = Math.round(clip.fpsTarget * totalDuration);
  const fps = frameCount / totalDuration;
  const pattern = path.join(outDir, "frame_%04d.webp");

  console.log(`[${clip.key}] extracting ${frameCount} frames @ ${fps.toFixed(2)}fps -> ${outDir}`);

  let args;
  if (clip.watermark) {
    const { x, y, w, h } = clip.watermark;
    const filter =
      `fps=${fps},scale=${clip.width}:-2:flags=lanczos,split=2[base][wm];` +
      `[wm]crop=${w}:${h}:${x}:${y},boxblur=18:2[wmb];` +
      `[base][wmb]overlay=${x}:${y}[vout]`;
    args = [
      "-y",
      "-i",
      retimedPath,
      "-frames:v",
      String(frameCount),
      "-filter_complex",
      filter,
      "-map",
      "[vout]",
      "-c:v",
      "libwebp",
      "-lossless",
      "0",
      "-quality",
      String(clip.quality),
      pattern,
    ];
  } else {
    args = [
      "-y",
      "-i",
      retimedPath,
      "-frames:v",
      String(frameCount),
      "-vf",
      `fps=${fps},scale=${clip.width}:-2:flags=lanczos`,
      "-c:v",
      "libwebp",
      "-lossless",
      "0",
      "-quality",
      String(clip.quality),
      pattern,
    ];
  }

  const result = run(args);
  if (result.status !== 0) {
    console.error(`ffmpeg extract failed for ${clip.key}`);
    process.exit(result.status ?? 1);
  }

  const actualCount = readdirSync(outDir).filter((f) => f.endsWith(".webp")).length;
  console.log(`[${clip.key}] wrote ${actualCount} frames`);
  return actualCount;
};

const manifestPath = path.join(ROOT, "lib", "frame-manifest.json");
const requestedKeys = process.argv.slice(2);
const clipsToRun = requestedKeys.length ? CLIPS.filter((c) => requestedKeys.includes(c.key)) : CLIPS;

let manifest = {};
if (existsSync(manifestPath)) {
  manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
}

for (const clip of clipsToRun) {
  const { outPath, totalDuration } = retime(clip);
  const count = extractFrames(clip, outPath, totalDuration);
  manifest[clip.key] = { count, width: clip.width };
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\nWrote manifest -> ${manifestPath}`);
console.log(JSON.stringify(manifest, null, 2));
