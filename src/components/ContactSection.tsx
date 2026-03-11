"use client";

import { motion } from "framer-motion";
import { businessInfo } from "../data/business";
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowRight } from "lucide-react";

const contactItems = [
  { icon: MapPin, label: "Address", key: "address" },
  { icon: Clock, label: "Working Hours", key: "hours" },
  { icon: Phone, label: "Phone", key: "phone" },
  { icon: Mail, label: "Email", key: "email" },
] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  },
};

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-16 sm:py-28 md:py-32 px-4 sm:px-8 overflow-hidden">
      {/* Warm neutral background */}
      <div className="absolute inset-0 bg-brown-50" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-amber-200/20 rounded-full blur-[120px]" />

      <div className="relative max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-12 sm:mb-14"
        >
          <span className="inline-block text-[11px] uppercase tracking-[0.3em] text-amber-700 font-medium mb-5">
            Contact
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-brown-900 tracking-tight leading-[1.1]">
            Get In <span className="italic text-brown-700">Touch</span>
          </h2>
          <div className="mt-5 mx-auto h-[1px] w-16 bg-gradient-to-r from-transparent via-amber-600/40 to-transparent" />
          <p className="mt-5 text-base sm:text-lg text-stone-500 font-light tracking-wide">
            Ready to place an order? We&apos;re here to help.
          </p>
        </motion.div>

        {/* Contact grid — 4 cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-8"
        >
          {/* Address */}
          <motion.div variants={itemVariants} className="card-hover bg-white rounded-2xl p-6 sm:p-7 border border-stone-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] group">
            <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
              <MapPin className="w-5 h-5 text-amber-700" />
            </div>
            <div className="text-[11px] uppercase tracking-[0.15em] text-stone-400 font-medium mb-1.5">Address</div>
            <p className="text-brown-800 text-sm font-medium leading-relaxed">{businessInfo.address}</p>
          </motion.div>

          {/* Working Hours */}
          <motion.div variants={itemVariants} className="card-hover bg-white rounded-2xl p-6 sm:p-7 border border-stone-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] group">
            <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
              <Clock className="w-5 h-5 text-amber-700" />
            </div>
            <div className="text-[11px] uppercase tracking-[0.15em] text-stone-400 font-medium mb-1.5">Working Hours</div>
            <p className="text-brown-800 text-sm font-medium leading-relaxed">{businessInfo.workingHours}</p>
          </motion.div>

          {/* Phone */}
          <motion.div variants={itemVariants} className="card-hover bg-white rounded-2xl p-6 sm:p-7 border border-stone-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] group">
            <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
              <Phone className="w-5 h-5 text-amber-700" />
            </div>
            <div className="text-[11px] uppercase tracking-[0.15em] text-stone-400 font-medium mb-1.5">Phone</div>
            {businessInfo.phone.map((p) => (
              <a key={p} href={`tel:${p}`} className="block text-brown-800 text-sm font-medium hover:text-amber-700 transition-colors leading-relaxed py-1 min-h-[44px] flex items-center">
                {p}
              </a>
            ))}
          </motion.div>

          {/* Email */}
          <motion.div variants={itemVariants} className="card-hover bg-white rounded-2xl p-6 sm:p-7 border border-stone-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] group">
            <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
              <Mail className="w-5 h-5 text-amber-700" />
            </div>
            <div className="text-[11px] uppercase tracking-[0.15em] text-stone-400 font-medium mb-1.5">Email</div>
            <a href={`mailto:${businessInfo.email}`} className="text-brown-800 text-sm font-medium hover:text-amber-700 transition-colors py-1 min-h-[44px] flex items-center break-all">
              {businessInfo.email}
            </a>
          </motion.div>
        </motion.div>

        {/* WhatsApp CTA — full width banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="bg-stone-900 rounded-2xl p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5 text-center sm:text-left"
        >
          <div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">Need a quick response?</h3>
            <p className="text-stone-400 text-sm font-light mt-1">Chat with us directly on WhatsApp for the fastest reply.</p>
          </div>
          <a
            href={businessInfo.socialLinks[0]?.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-flex items-center gap-2.5 px-7 py-3.5 bg-green-600 text-white rounded-full font-semibold text-sm hover:bg-green-700 transition-colors duration-300 hover:shadow-lg hover:shadow-green-600/20 flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
