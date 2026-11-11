"use client";

import { motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Compass, ShieldCheck, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="home"
        className="relative min-h-[660px] h-[94svh] max-h-[960px] w-full flex items-center justify-center overflow-hidden bg-forest-950 pt-24 pb-28 md:pb-32"
      >
        {/* High-priority LCP Hero Photograph */}
        <Image
          src="/images/hero.jpg"
          alt="Sunlit Nilgiri mountain peaks, emerald tea gardens, and a luxury white touring SUV along a winding Ooty road at sunrise"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.02]"
        />

        {/* Atmospheric Deep Forest Green & Charcoal Vignette Overlays */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-forest-950/75 via-forest-950/35 to-forest-950/90"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(7,22,16,0.18)_0%,rgba(7,22,16,0.68)_100%)]"
        />

        {/* Editorial Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-champagne-400/40 bg-forest-950/60 backdrop-blur-md text-champagne-300 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-champagne-400" aria-hidden="true" />
            <span>Your Journey, Our Priority</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="font-display font-semibold text-ivory-50 text-balance leading-[1.06] tracking-tight drop-shadow-lg mb-6"
            style={{ fontSize: "clamp(2.5rem, 1.5rem + 4.2vw, 4.85rem)" }}
          >
            Discover Ooty.
            <span className="block italic text-champagne-300 mt-1">
              Experience Every Journey.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="max-w-[60ch] text-pretty text-base sm:text-lg md:text-xl text-ivory-100/90 leading-relaxed mb-10 font-normal"
          >
            Explore the beauty of the Nilgiris with comfortable rides, trusted
            drivers and unforgettable travel experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto mb-12"
          >
            <a
              href="#booking"
              className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-8 py-3.5 rounded-full bg-champagne-400 hover:bg-champagne-300 text-forest-950 font-bold text-base tracking-wide transition-all shadow-[0_14px_34px_rgba(7,22,16,0.45)] hover:-translate-y-0.5"
            >
              <span>Book Your Ride</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="#vehicles"
              className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-8 py-3.5 rounded-full border border-ivory-100/35 bg-forest-950/45 hover:bg-forest-900/75 backdrop-blur-md text-ivory-50 font-semibold text-base tracking-wide transition-all"
            >
              <span>Explore Vehicles</span>
            </a>
          </motion.div>

          {/* Subtle Architectural Trust Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm font-medium text-ivory-200/90 tracking-wide"
          >
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-champagne-400"
              />
              Comfortable Vehicles
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck
                className="w-4 h-4 text-champagne-400"
                aria-hidden="true"
              />
              Trusted Local Drivers
            </span>
            <span className="inline-flex items-center gap-2">
              <Compass
                className="w-4 h-4 text-champagne-400"
                aria-hidden="true"
              />
              Ketti, Ooty &amp; South India
            </span>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
