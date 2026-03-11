"use client";

import Image from "next/image";
import { businessInfo } from "../data/business";
import { services } from "../data/services";
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Deep dark background */}
      <div className="absolute inset-0 bg-stone-950" />
      {/* Subtle grain */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px 256px",
      }} />

      <div className="relative">
        {/* Top accent line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-700/30 to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-12 sm:pt-20 pb-8 sm:pb-12 pb-safe">
          {/* Top brand row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-14 sm:mb-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Kaveri Traders Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">Kaveri Traders</span>
                <span className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-stone-500 -mt-0.5">Premium Wood Supply</span>
              </div>
            </div>
            <a
              href={businessInfo.socialLinks[0]?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-full font-semibold text-sm hover:bg-green-700 transition-colors duration-300 hover:shadow-lg hover:shadow-green-600/15"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>

          {/* Grid — 3 columns: About (wide), Services, Contact */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.5fr] gap-12 sm:gap-10 lg:gap-16">
            {/* About */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-stone-500 font-medium mb-5">About</h4>
              <p className="text-stone-400 text-sm leading-[1.8] font-light max-w-sm">
                {businessInfo.tagline}. Trusted wood cutting, transport, and
                firewood supply partner with {businessInfo.experience} of
                experience.
              </p>
              <a
                href="#contact"
                className="btn-shine inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-full text-white text-sm font-semibold tracking-wide transition-all duration-500 hover:shadow-lg hover:shadow-amber-700/15 border border-white/10"
                style={{ background: "linear-gradient(135deg, #FF8F00, #5D4037)" }}
              >
                Request Quote
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-stone-500 font-medium mb-5">Services</h4>
              <ul className="space-y-1">
                {services.map((s) => (
                  <li key={s.id}>
                    <a href="#services" className="group inline-flex items-center gap-1.5 text-stone-400 hover:text-amber-400 transition-colors text-sm font-light py-1.5 min-h-[44px]">
                      {s.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="min-w-0">
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-stone-500 font-medium mb-5">Contact</h4>
              <div className="space-y-1 text-sm">
                {businessInfo.phone.map((p) => (
                  <a key={p} href={`tel:${p}`} className="flex items-center gap-2.5 text-stone-400 hover:text-amber-400 transition-colors font-light py-1.5 min-h-[44px]">
                    <Phone className="w-3.5 h-3.5 text-stone-600 flex-shrink-0" />
                    <span className="truncate">{p}</span>
                  </a>
                ))}
                <a href={`mailto:${businessInfo.email}`} className="flex items-center gap-2.5 text-stone-400 hover:text-amber-400 transition-colors font-light py-1.5 min-h-[44px]">
                  <Mail className="w-3.5 h-3.5 text-stone-600 flex-shrink-0" />
                  <span className="truncate break-all">{businessInfo.email}</span>
                </a>
                <div className="flex items-start gap-2.5 text-stone-400 font-light">
                  <MapPin className="w-3.5 h-3.5 text-stone-600 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{businessInfo.address}</span>
                </div>
                <div className="flex items-center gap-2.5 text-stone-400 font-light">
                  <Clock className="w-3.5 h-3.5 text-stone-600 flex-shrink-0" />
                  <span>{businessInfo.workingHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 sm:mt-16 pt-6 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[12px] text-stone-600 font-light tracking-wide">GST: {businessInfo.gstNumber}</p>
            <p className="text-[12px] text-stone-600 font-light tracking-wide">&copy; {new Date().getFullYear()} Kaveri Traders. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
