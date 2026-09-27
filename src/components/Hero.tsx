"use client";
import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image - Using a high-quality Unsplash image as placeholder for AI generated Ooty landscape */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
        }}
      />
      
      {/* Dark/Navy Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-navy-900/70 via-navy-900/50 to-navy-900/90" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gold-400 font-semibold tracking-widest uppercase mb-4 text-sm md:text-base"
        >
          Your Journey, Our Priority
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg text-balance"
        >
          Explore Ooty & Beyond <br className="hidden md:block"/> With Comfort
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl text-lg md:text-xl text-gray-200 mb-10 text-balance"
        >
          Reliable travel services and comfortable vehicles for sightseeing, family trips, group tours and outstation journeys.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <a
            href="#booking"
            className="bg-gold-500 hover:bg-gold-400 text-navy-900 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-gold-500/25 flex items-center justify-center gap-2"
          >
            Book Your Ride
          </a>
          <a
            href="#vehicles"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all"
          >
            Explore Vehicles
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center gap-4 text-sm md:text-base font-medium text-gray-300"
        >
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gold-400"></div> Comfortable
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gold-400"></div> Reliable
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gold-400"></div> Affordable
          </span>
        </motion.div>
        
      </div>
    </section>
  );
}
