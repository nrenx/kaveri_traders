"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Stay transparent throughout the 500vh hero scroll canvas
      // Switch to solid white only after the hero section ends
      const heroEl = document.getElementById("home");
      if (heroEl) {
        // The hero's first child is the 500vh scroll container
        const scrollContainer = heroEl.querySelector(".h-\\[500vh\\]");
        if (scrollContainer) {
          const rect = scrollContainer.getBoundingClientRect();
          // Turn solid when the scroll container's bottom reaches the top of the viewport
          setScrolled(rect.bottom <= window.innerHeight);
          return;
        }
      }
      // Fallback: use a large threshold (~4x viewport height for 500vh section)
      setScrolled(window.scrollY > window.innerHeight * 4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-2xl border-b border-stone-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-18 sm:h-22">
            {/* Brand */}
            <a href="#home" className="flex items-center gap-3 group">
              {/* Logo */}
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Kaveri Traders Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className={`text-lg sm:text-xl font-bold tracking-tight transition-colors duration-500 ${
                  scrolled ? "text-stone-900" : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                }`}>
                  Kaveri Traders
                </span>
                <span className={`hidden sm:block text-[10px] uppercase tracking-[0.2em] font-medium -mt-0.5 transition-colors duration-500 ${
                  scrolled ? "text-stone-400" : "text-white/70 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
                }`}>
                  Premium Wood Supply
                </span>
              </div>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-[13px] uppercase tracking-[0.08em] font-medium transition-colors duration-300 group ${
                    scrolled
                      ? "text-stone-500 hover:text-stone-900"
                      : "text-white/80 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-4 right-4 h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                    scrolled ? "bg-amber-700" : "bg-amber-400"
                  }`} />
                </a>
              ))}
              <div className={`ml-4 h-5 w-px transition-colors duration-500 ${scrolled ? "bg-stone-200" : "bg-white/20"}`} />
              <a
                href="#contact"
                className="btn-shine btn-magnetic ml-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-[13px] font-semibold uppercase tracking-[0.06em] transition-all duration-500 hover:shadow-lg hover:shadow-amber-700/20"
                style={{
                  background: "linear-gradient(135deg, #FF8F00, #5D4037)",
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left - rect.width / 2;
                  const y = e.clientY - rect.top - rect.height / 2;
                  e.currentTarget.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                }}
              >
                Get a Quote
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-colors ${
                scrolled
                  ? "text-stone-700 hover:text-stone-900 hover:bg-stone-100"
                  : "text-white hover:text-white/90 hover:bg-white/10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="text-3xl font-display font-bold text-stone-800 hover:text-amber-700 transition-colors py-4 px-6 min-h-[48px] flex items-center"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="btn-shine mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold text-base tracking-wide"
                style={{
                  background: "linear-gradient(135deg, #FF8F00, #5D4037)",
                }}
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
