"use client";

import Navbar from "../components/Navbar";
import ServiceShowcaseScroll from "../components/ServiceShowcaseScroll";
import HeroTextOverlays from "../components/ServiceTextOverlays";
import AllServices from "../components/AllServices";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";
import ScrollProgress from "../components/ScrollProgress";
import FloatingActions from "../components/FloatingActions";

export default function Home() {
  return (
    <main id="home" className="relative overflow-x-clip">
      {/* Smooth scrolling engine */}
      <SmoothScroll />
      {/* Scroll progress bar at top */}
      <ScrollProgress />
      {/* Noise texture overlay for premium depth */}
      <div className="noise-overlay" />

      <Navbar />

      {/* Hero Scroll Showcase */}
      <div className="relative">
        <ServiceShowcaseScroll />
        <HeroTextOverlays />
      </div>

      {/* Transition: dark hero → dark services (seamless) */}
      <AllServices />

      {/* Visual divider between dark services and light about */}
      <div className="relative h-16 sm:h-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 to-stone-50" />
      </div>

      {/* About — light bg */}
      <AboutSection />

      {/* Subtle divider */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="section-divider" />
      </div>

      {/* Contact — warm bg */}
      <ContactSection />

      {/* Footer — dark */}
      <Footer />

      {/* Floating WhatsApp + Back to Top */}
      <FloatingActions />
    </main>
  );
}
