"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { services } from "../data/services";
import { Axe, Truck, Flame, ArrowRight, ChevronRight } from "lucide-react";

const serviceIcons = [Axe, Truck, Flame];

// Animated counter component
function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(() =>
    /[\d.]+/.test(value) ? "0" : value
  );

  useEffect(() => {
    if (!isInView) return;
    const numericMatch = value.match(/[\d.]+/);
    if (!numericMatch) return;
    const target = parseFloat(numericMatch[0]);
    const prefix = value.slice(0, value.indexOf(numericMatch[0]));
    const postfix = value.slice(value.indexOf(numericMatch[0]) + numericMatch[0].length);
    const duration = 1600;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = target * ease;
      setDisplay(`${prefix}${target >= 10 ? Math.round(current) : current.toFixed(1)}${postfix}`);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  },
};

export default function AllServices() {
  return (
    <section id="services" className="relative overflow-hidden">
      {/* Dark premium background band */}
      <div className="absolute inset-0 bg-stone-950" />
      {/* Subtle grain */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px 256px",
      }} />
      {/* Amber accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-700/8 rounded-full blur-[120px]" />

      <div className="relative py-16 sm:py-28 md:py-36 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="text-center mb-12 sm:mb-20 md:mb-24"
          >
            <span className="inline-block text-[11px] uppercase tracking-[0.3em] text-amber-400/80 font-medium mb-5">
              What We Do
            </span>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              Our Services
            </h2>
            <div className="mt-5 mx-auto h-[1px] w-16 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            <p className="mt-5 text-base sm:text-lg text-stone-400 max-w-lg mx-auto font-light tracking-wide">
              From precision cutting to doorstep delivery — we handle the entire wood supply chain.
            </p>
          </motion.div>

          {/* Service Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-12 sm:space-y-20 md:space-y-28"
          >
            {services.map((service, idx) => {
              const Icon = serviceIcons[idx];
              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className="grid md:grid-cols-2 gap-6 sm:gap-12 md:gap-16 items-center"
                >
                  {/* Text side */}
                  <div className={idx % 2 === 1 ? "md:order-2" : ""}>
                    {/* Icon + label */}
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${service.themeColor}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: service.themeColor }} />
                      </div>
                      <span
                        className="text-[11px] uppercase tracking-[0.2em] font-semibold"
                        style={{ color: service.themeColor }}
                      >
                        {service.name}
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-[1.15] mb-3 sm:mb-5">
                      {service.detailsSection.title}
                    </h3>
                    <p className="text-stone-400 text-sm sm:text-base leading-relaxed mb-5 sm:mb-8 max-w-lg font-light">
                      {service.detailsSection.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                      {service.highlights.map((h) => (
                        <span
                          key={h}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-stone-300 rounded-full text-xs font-medium border border-white/5 tracking-wide"
                        >
                          <ChevronRight className="w-3 h-3 text-amber-500/70" />
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Stats with counter animation */}
                    <div className="flex gap-6 sm:gap-10">
                      {service.stats.map((s) => (
                        <div key={s.label}>
                          <div
                            className="text-xl sm:text-2xl font-bold tracking-tight"
                            style={{ color: service.themeColor }}
                          >
                            <AnimatedCounter value={s.val} />
                          </div>
                          <div className="text-[10px] sm:text-xs uppercase tracking-[0.12em] text-stone-500 mt-1 font-medium">
                            {s.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual side — premium card */}
                  <div className={idx % 2 === 1 ? "md:order-1" : ""}>
                    <div
                      className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-72 sm:h-80 md:h-96 group cursor-pointer"
                      onMouseMove={(e) => {
                        if (window.matchMedia('(hover: none)').matches) return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width) * 100;
                        const y = ((e.clientY - rect.top) / rect.height) * 100;
                        e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                        e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
                        const tiltX = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
                        const tiltY = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
                        e.currentTarget.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
                      }}
                      onMouseLeave={(e) => {
                        if (window.matchMedia('(hover: none)').matches) return;
                        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                      }}
                      style={{ transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)' }}
                    >
                      {/* Gradient background */}
                      <div
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                        style={{ background: service.gradient }}
                      />
                      {/* Decorative pattern overlay */}
                      <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)`
                      }} />
                      {/* Cursor-following spotlight */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.12), transparent 40%)',
                        }}
                      />
                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8 md:p-10">
                        <div>
                          <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white/30 mb-4" />
                        </div>
                        <div>
                          <h4 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
                            {service.heroSection.title}
                          </h4>
                          <p className="text-white/70 text-sm sm:text-base font-light">
                            {service.heroSection.subtitle}
                          </p>
                          <div className="mt-4 sm:mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                            <span className="text-white/50 text-xs sm:text-sm font-light">
                              {service.enquirySection.minOrder}
                            </span>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                              <ArrowRight className="w-3.5 h-3.5 text-white/70" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Divider */}
          <div className="mt-20 sm:mt-28 md:mt-32 section-divider opacity-30" />

          {/* Why Casurina Wood — refined */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="mt-16 sm:mt-20 md:mt-24 grid md:grid-cols-[1fr_1.5fr] gap-8 sm:gap-12 items-start"
          >
            <div>
              <span className="inline-block text-[11px] uppercase tracking-[0.25em] text-amber-400/70 font-medium mb-4">
                The Material
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.15]">
                Why Casurina &amp; Eucalyptus?
              </h3>
            </div>
            <div>
              <p className="text-stone-400 text-sm sm:text-base leading-[1.8] font-light">
                Casurina and Eucalyptus are among the fastest-growing hardwoods, known for
                exceptional strength-to-weight ratio, termite resistance, and straight-grained structure.
                They&apos;re ideal for construction poles, fencing, scaffolding, paper pulp, and fuel. We source
                from plantations across Andhra Pradesh, Telangana, Karnataka, Odisha, and Maharashtra —
                sustainably harvested and legally compliant.
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="mt-16 sm:mt-20 text-center"
          >
            <a
              href="#contact"
              className="btn-shine inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 text-white font-semibold text-sm sm:text-base tracking-wide rounded-full transition-all duration-500 hover:shadow-lg hover:shadow-amber-700/20 border border-white/10"
              style={{ background: "linear-gradient(135deg, #FF8F00, #5D4037)" }}
            >
              Request a Quote
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
