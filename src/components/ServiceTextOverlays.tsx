"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function HeroTextOverlays() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Section 1: Hero — visible immediately, fades out by 0.22
  const heroOpacity = useTransform(scrollYProgress, [0.0, 0.15, 0.22], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0.0, 0.15, 0.22], [0, 0, -60]);
  const heroScale = useTransform(scrollYProgress, [0.0, 0.15, 0.22], [1, 1, 1.05]);
  const heroBlur = useTransform(scrollYProgress, [0.15, 0.22], [0, 8]);

  // Section 2: Process — visible 0.25 - 0.45
  const processOpacity = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.47], [0, 1, 1, 0]);
  const processY = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.47], [60, 0, 0, -60]);
  const processScale = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.47], [0.95, 1, 1, 1.05]);

  // Section 3: Quality — visible 0.5 - 0.7
  const qualityOpacity = useTransform(scrollYProgress, [0.5, 0.55, 0.65, 0.72], [0, 1, 1, 0]);
  const qualityY = useTransform(scrollYProgress, [0.5, 0.55, 0.65, 0.72], [60, 0, 0, -60]);
  const qualityScale = useTransform(scrollYProgress, [0.5, 0.55, 0.65, 0.72], [0.95, 1, 1, 1.05]);

  // Section 4: CTA — visible 0.75 - 0.95
  const ctaOpacity = useTransform(scrollYProgress, [0.75, 0.8, 0.9, 0.97], [0, 1, 1, 0]);
  const ctaY = useTransform(scrollYProgress, [0.75, 0.8, 0.9, 0.97], [60, 0, 0, -60]);
  const ctaScale = useTransform(scrollYProgress, [0.75, 0.8, 0.9, 0.97], [0.95, 1, 1, 1.05]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 md:h-[500vh] pointer-events-none overflow-x-clip"
      style={{ height: "calc(var(--hero-vh, 100vh) * 5)" }}
    >
      <div
        className="sticky top-0 md:h-screen flex items-center justify-center overflow-x-clip"
        style={{ height: "var(--hero-vh, 100vh)" }}
      >
        <div className="relative w-full max-w-5xl mx-auto px-6 sm:px-8 overflow-x-clip">
          {/* Hero */}
          <motion.div
            style={{ opacity: heroOpacity, y: heroY, scale: heroScale, filter: useTransform(heroBlur, (v) => `blur(${v}px)`) }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <span className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.3em] text-amber-300 font-semibold mb-6 sm:mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Established &mdash; Trusted &mdash; Premium
            </span>
            <h1 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9] tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)] overflow-visible">
              Kaveri
              <br />
              <span className="italic text-amber-200 hero-shimmer">Traders</span>
            </h1>
            <div className="mt-6 sm:mt-8 h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />
            <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-white/90 font-light tracking-wide max-w-md drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
              Casurina &amp; Eucalyptus Wood Supply
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-4 mt-6 sm:mt-10 justify-center px-2">
              {["Custom Cutting", "Transport", "Firewood & Paper Wood"].map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 bg-black/30 backdrop-blur-md rounded-full text-white text-[11px] sm:text-sm font-medium border border-white/15 tracking-wide shadow-[0_2px_8px_rgba(0,0,0,0.4)] transition-all duration-300 hover:bg-amber-700/30 hover:border-amber-400/30"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(255,202,40,0.6)]" />
                  {h}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Process */}
          <motion.div
            style={{ opacity: processOpacity, y: processY, scale: processScale }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <span className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.3em] text-amber-300 font-semibold mb-5 sm:mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Our Process
            </span>
            <h2 className="font-display text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-[0.95] tracking-tight px-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
              Cut. Transport.
              <br />
              <span className="italic text-amber-200">Deliver.</span>
            </h2>
            <div className="mt-5 h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />
            <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-white/85 max-w-xl font-light leading-relaxed tracking-wide px-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
              From raw Casurina &amp; Eucalyptus logs to firewood and paper wood
              — supplied in required tons and sizes, delivered across India.
            </p>
          </motion.div>

          {/* Quality Stats */}
          <motion.div
            style={{ opacity: qualityOpacity, y: qualityY, scale: qualityScale }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <span className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.3em] text-amber-300 font-semibold mb-5 sm:mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Why Us
            </span>
            <h2 className="font-display text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-[0.95] tracking-tight px-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
              Quality you
              <br />
              <span className="italic text-amber-200">can trust.</span>
            </h2>
            <p className="mt-5 sm:mt-6 text-sm sm:text-base text-white/85 max-w-lg font-light tracking-wide px-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
              Every piece inspected. Every load secured. Delivered on time across 6+ states.
            </p>
            <div className="flex gap-6 sm:gap-16 mt-8 sm:mt-14">
              {[
                { label: "Experience", val: "15+" },
                { label: "Fleet", val: "20+" },
                { label: "On-Time", val: "98%" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)]">
                    {s.val}
                  </div>
                  <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white/70 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY, scale: ctaScale }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <span className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.3em] text-amber-300 font-semibold mb-5 sm:mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Let&apos;s Work Together
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-8xl font-bold text-white leading-[0.9] tracking-tight px-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
              Your wood
              <br />
              <span className="italic text-amber-200">partner.</span>
            </h2>
            <a
              href="#services"
              className="pointer-events-auto btn-shine mt-8 sm:mt-10 inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-white font-semibold text-sm sm:text-base tracking-wide shadow-2xl transition-all duration-500 hover:shadow-amber-500/30 border border-white/10"
              style={{ background: "linear-gradient(135deg, #FF8F00, #5D4037)" }}
            >
              Explore Our Services
              <ArrowDown className="w-4 h-4 rotate-[-90deg]" />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
