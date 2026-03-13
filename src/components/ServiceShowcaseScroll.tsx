"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useScroll } from "framer-motion";
import Preloader from "./Preloader";

const TOTAL_FRAMES = 200;
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const FOLDER_PATH = `${BASE_PATH}/images/wood`;

export default function ServiceShowcaseScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
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

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // Load images
  useEffect(() => {
    loadedCountRef.current = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const padded = String(i).padStart(3, "0");
      img.src = `${FOLDER_PATH}/ezgif-frame-${padded}.jpg`;
      img.onload = () => {
        loadedCountRef.current++;
        const pct = (loadedCountRef.current / TOTAL_FRAMES) * 100;
        setLoadProgress(pct);
        if (loadedCountRef.current === 1) {
          drawFrame(0);
        }
        if (loadedCountRef.current >= TOTAL_FRAMES) {
          setTimeout(() => setLoaded(true), 400);
        }
      };
      img.onerror = () => {
        loadedCountRef.current++;
        const pct = (loadedCountRef.current / TOTAL_FRAMES) * 100;
        setLoadProgress(pct);
        if (loadedCountRef.current >= TOTAL_FRAMES) {
          setTimeout(() => setLoaded(true), 400);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, [drawFrame]);

  // Canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [drawFrame]);

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
      <div ref={containerRef} className="h-[500svh] md:h-[500vh] relative">
        <div className="sticky top-0 h-svh md:h-screen w-full overflow-hidden">
          {/* Canvas background */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: "#1C1917" }}
          />
          {/* Cinematic gradient overlays — strong enough for text readability on bright images */}
          <div className="absolute inset-0 bg-black/35 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/70 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />
          {/* Center radial vignette — darkens where text sits */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 100%)' }} />
          {/* Top gradient for navbar readability */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
          {/* Bottom vignette */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-stone-950/60 to-transparent pointer-events-none" />
        </div>
      </div>
    </>
  );
}
