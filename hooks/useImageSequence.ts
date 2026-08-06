"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseImageSequenceOptions {
  folder: string;
  count: number;
  /** 0..1 lerp factor applied per animation frame; higher = snappier, lower = silkier. */
  lerp?: number;
}

const pad4 = (n: number) => String(n).padStart(4, "0");

export function useImageSequence({ folder, count, lerp = 0.09 }: UseImageSequenceOptions) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  // Written to by the ScrollTrigger onUpdate callback (0..1 scroll progress).
  const progressTarget = useRef(0);
  const current = useRef(0);
  const rafRef = useRef<number | null>(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  const srcFor = useCallback((i: number) => `/frames/${folder}/frame_${pad4(i + 1)}.webp`, [folder]);

  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = new Array(count);

    const first = new window.Image();
    first.decoding = "async";
    imgs[0] = first;

    const markFirstReady = () => {
      if (cancelled) return;
      setFirstFrameReady(true);
      setLoadedCount(1);
    };

    if (first.complete && first.src) {
      markFirstReady();
    } else {
      first.onload = markFirstReady;
      first.onerror = markFirstReady;
    }
    first.src = srcFor(0);

    let loaded = 1;
    for (let i = 1; i < count; i++) {
      const img = new window.Image();
      img.decoding = "async";
      img.onload = img.onerror = () => {
        loaded++;
        if (!cancelled) setLoadedCount(loaded);
      };
      img.src = srcFor(i);
      imgs[i] = img;
    }

    imagesRef.current = imgs;

    return () => {
      cancelled = true;
    };
  }, [count, srcFor]);

  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[idx];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = canvas.clientWidth || 1;
    const cssH = canvas.clientHeight || 1;
    const pxW = Math.round(cssW * dpr);
    const pxH = Math.round(cssH * dpr);
    if (canvas.width !== pxW || canvas.height !== pxH) {
      canvas.width = pxW;
      canvas.height = pxH;
    }

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = pxW / pxH;
    let dw: number, dh: number, dx: number, dy: number;
    if (imgRatio > canvasRatio) {
      dh = pxH;
      dw = dh * imgRatio;
      dx = (pxW - dw) / 2;
      dy = 0;
    } else {
      dw = pxW;
      dh = dw / imgRatio;
      dx = 0;
      dy = (pxH - dh) / 2;
    }

    ctx.clearRect(0, 0, pxW, pxH);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  useEffect(() => {
    const loop = () => {
      current.current += (progressTarget.current - current.current) * lerp;
      if (Math.abs(current.current - progressTarget.current) < 0.0006) {
        current.current = progressTarget.current;
      }
      const idx = Math.min(count - 1, Math.max(0, Math.round(current.current * (count - 1))));
      drawFrame(idx);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame, count, lerp]);

  return {
    canvasRef,
    progressTarget,
    loadedCount,
    total: count,
    firstFrameReady,
    isFullyLoaded: loadedCount >= count,
  };
}
