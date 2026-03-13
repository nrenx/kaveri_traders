"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useScroll } from "framer-motion";
import Preloader from "./Preloader";

const TOTAL_FRAMES = 200;
const INITIAL_READY_FRAMES = 24;
const PRIORITY_FRAMES = 48;
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const FOLDER_PATH = `${BASE_PATH}/images/wood`;

export default function ServiceShowcaseScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lockedVhRef = useRef<number>(0);
  const prevWidthRef = useRef<number>(0);
  const prevHeightRef = useRef<number>(0);
  const loadedFlagsRef = useRef<boolean[]>(Array(TOTAL_FRAMES).fill(false));
  const loadedCountRef = useRef(0);
  const currentFrameRef = useRef(0);
  const isReadyRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const applyLockedViewport = useCallback((nextHeight: number) => {
    lockedVhRef.current = nextHeight;
    document.documentElement.style.setProperty("--hero-vh", `${nextHeight}px`);
  }, []);

  const findNearestLoadedFrame = useCallback((targetIndex: number) => {
    if (loadedFlagsRef.current[targetIndex]) return targetIndex;
    for (let delta = 1; delta < TOTAL_FRAMES; delta++) {
      const prev = targetIndex - delta;
      if (prev >= 0 && loadedFlagsRef.current[prev]) return prev;
      const next = targetIndex + delta;
      if (next < TOTAL_FRAMES && loadedFlagsRef.current[next]) return next;
    }
    return -1;
  }, []);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resolvedIndex = findNearestLoadedFrame(frameIndex);
    if (resolvedIndex < 0) return;

    const img = imagesRef.current[resolvedIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // "cover" fit for full-bleed cinematic look
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    // Fill first to avoid any transient transparent flash during rapid viewport changes.
    ctx.fillStyle = "#1C1917";
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, [findNearestLoadedFrame]);

  // Load images
  useEffect(() => {
    loadedCountRef.current = 0;
    loadedFlagsRef.current = Array(TOTAL_FRAMES).fill(false);
    isReadyRef.current = false;
    const images: HTMLImageElement[] = [];

    const setReadyIfNeeded = (count: number) => {
      if (!isReadyRef.current && count >= INITIAL_READY_FRAMES) {
        isReadyRef.current = true;
        setTimeout(() => setLoaded(true), 200);
      }
    };

    const handleLoadProgress = (index: number) => {
      loadedCountRef.current++;
      loadedFlagsRef.current[index] = true;
      const pct = (loadedCountRef.current / TOTAL_FRAMES) * 100;
      setLoadProgress(pct);
      setReadyIfNeeded(loadedCountRef.current);

      // Draw immediately when nearby frames become available.
      if (Math.abs(index - currentFrameRef.current) <= 2) {
        drawFrame(currentFrameRef.current);
      }
    };

    const loadFrame = (index: number) => {
      const img = new Image();
      img.decoding = "async";
      const padded = String(index + 1).padStart(3, "0");
      img.src = `${FOLDER_PATH}/ezgif-frame-${padded}.jpg`;
      img.onload = () => {
        handleLoadProgress(index);
      };
      img.onerror = () => {
        loadedCountRef.current++;
        const pct = (loadedCountRef.current / TOTAL_FRAMES) * 100;
        setLoadProgress(pct);
        setReadyIfNeeded(loadedCountRef.current);
      };
      images[index] = img;
    };

    // Fast path: load a startup chunk first so hero becomes interactive sooner.
    for (let i = 0; i < Math.min(PRIORITY_FRAMES, TOTAL_FRAMES); i++) {
      loadFrame(i);
    }

    // Background path: keep loading remaining frames without blocking initial experience.
    const restStart = Math.min(PRIORITY_FRAMES, TOTAL_FRAMES);
    const loadRest = () => {
      for (let i = restStart; i < TOTAL_FRAMES; i++) {
        loadFrame(i);
      }
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadRest);
    } else {
      setTimeout(loadRest, 0);
    }

    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
    };
  }, [drawFrame]);

  // Canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    const initialHeight = Math.round(window.visualViewport?.height ?? window.innerHeight);
    applyLockedViewport(initialHeight);
    prevWidthRef.current = window.innerWidth;
    prevHeightRef.current = initialHeight;

    const resize = () => {
      const nextWidth = window.innerWidth;
      const nextHeight = Math.round(window.visualViewport?.height ?? window.innerHeight);

      // On touch devices, ignore small viewport-height changes from browser chrome animation.
      const widthChanged = Math.abs(nextWidth - prevWidthRef.current) > 40;
      const heightChanged = Math.abs(nextHeight - prevHeightRef.current) > 120;
      if (!isTouchDevice || widthChanged || heightChanged) {
        applyLockedViewport(nextHeight);
        prevWidthRef.current = nextWidth;
        prevHeightRef.current = nextHeight;
      }

      canvas.width = window.innerWidth;
      canvas.height = Math.max(1, lockedVhRef.current || nextHeight);
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", resize);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
      document.documentElement.style.removeProperty("--hero-vh");
    };
  }, [applyLockedViewport, drawFrame]);

  // Scroll -> frame mapping
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const frameIndex = Math.min(
        Math.floor(v * TOTAL_FRAMES),
        TOTAL_FRAMES - 1
      );
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
      }
    });

    return () => {
      unsubscribe();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollYProgress, drawFrame]);

  return (
    <>
      <Preloader progress={loadProgress} isComplete={loaded} />
      <div
        ref={containerRef}
        className="md:h-[500vh] relative bg-stone-950"
        style={{ height: "calc(var(--hero-vh, 100vh) * 5)" }}
      >
        <div
          className="sticky top-0 md:h-screen w-full overflow-hidden bg-stone-950"
          style={{ height: "var(--hero-vh, 100vh)" }}
        >
          {/* Canvas background */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: "#1C1917" }}
          />
          {/* Cinematic gradient overlays — tuned lighter to reveal more frame detail */}
          <div className="absolute inset-0 bg-black/22 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/5 to-black/45 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
          {/* Center radial vignette — lighter so mid-frame visuals stay visible */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.3) 100%)' }} />
          {/* Top gradient for navbar readability */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/45 to-transparent pointer-events-none" />
          {/* Bottom vignette */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-stone-950/50 to-transparent pointer-events-none" />
        </div>
      </div>
    </>
  );
}
