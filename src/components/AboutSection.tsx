"use client";

import { motion } from "framer-motion";
import { businessInfo } from "../data/business";
import { Axe, Truck, Flame, ShieldCheck, MapPin, BadgeCheck } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  },
};

const features = [
  {
    icon: Axe,
    title: "Expert Cutting",
    desc: "Precision sawmills for any dimension — logs, planks, poles, or beams.",
    color: "#8D6E63",
  },
  {
    icon: Truck,
    title: "Own Fleet",
    desc: "20+ trucks ensuring reliable, GPS-tracked delivery across the region.",
    color: "#6D4C41",
  },
  {
    icon: Flame,
    title: "Premium Firewood",
    desc: "Properly seasoned, split & ready to burn with low moisture content.",
    color: "#D84315",
  },
  {
    icon: ShieldCheck,
    title: "Trusted & Certified",
    desc: "GST registered, certified weighbridge, full legal compliance.",
    color: "#2E7D32",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-14 sm:py-28 md:py-36 px-3 sm:px-8 overflow-x-clip overflow-y-hidden">
      {/* Light warm background — brown-900 text for maximum contrast on light bg */}
      <div className="absolute inset-0 bg-stone-50" />
      {/* Subtle warm accent glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-amber-100/30 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-brown-100/40 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto max-w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-12 sm:mb-20 md:mb-24"
        >
          <span className="inline-block text-[11px] uppercase tracking-[0.3em] text-amber-700 font-medium mb-5">
            About Us
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-brown-900 tracking-tight leading-[1.1]">
            {businessInfo.experience} in the
            <br />
            <span className="italic text-brown-700">Wood Business</span>
          </h2>
          <div className="mt-5 mx-auto h-[1px] w-16 bg-gradient-to-r from-transparent via-amber-600/40 to-transparent" />
          <p className="mt-5 text-[15px] sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed font-light px-2 sm:px-0">
            {businessInfo.about}
          </p>
        </motion.div>

        {/* Feature cards — staggered */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 mb-14 sm:mb-20"
        >
          {features.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              onMouseMove={(e) => {
                if (window.matchMedia('(hover: none)').matches) return;
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
              className="card-hover card-glow bg-white rounded-2xl p-5 sm:p-7 border border-stone-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] group"
            >
              <div
                className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110"
                style={{ background: `${item.color}12` }}
              >
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <h3 className="relative z-10 text-base font-bold text-brown-900 mb-2 tracking-tight">{item.title}</h3>
              <p className="relative z-10 text-stone-500 text-sm leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Service Areas & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="grid md:grid-cols-2 gap-6 sm:gap-8"
        >
          {/* Service Areas */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-stone-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-2.5 mb-5">
              <MapPin className="w-4.5 h-4.5 text-amber-700" />
              <h3 className="text-lg font-bold text-brown-900 tracking-tight">Service Areas</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {businessInfo.serviceAreas.map((area) => (
                <span
                  key={area}
                  className="px-3.5 py-1.5 bg-amber-50 text-amber-800 rounded-full text-xs font-medium border border-amber-100/80"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-stone-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-2.5 mb-5">
              <BadgeCheck className="w-4.5 h-4.5 text-forest-600" />
              <h3 className="text-lg font-bold text-brown-900 tracking-tight">Certifications & Trust</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {businessInfo.certifications.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-green-50 text-green-800 rounded-full text-xs font-medium border border-green-100/80"
                >
                  <ShieldCheck className="w-3 h-3" />
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
