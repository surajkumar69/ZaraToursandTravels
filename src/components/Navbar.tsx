"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Vehicles", href: "#vehicles" },
    { name: "Services", href: "#services" },
    { name: "Destinations", href: "#destinations" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-navy-900/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-3">
            <img 
              src="/images/logo.jpg" 
              alt="Zara Tours & Travels Logo" 
              className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover border-2 border-gold-500 shadow-[0_0_15px_rgba(251,191,36,0.3)]" 
            />
            <span className="text-xl md:text-2xl font-bold tracking-wider text-white hidden sm:block">
              ZARA <span className="text-gold-400">TOURS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-200 hover:text-gold-400 font-medium transition-colors text-sm uppercase tracking-wide"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="#booking"
              className="bg-gold-500 hover:bg-gold-400 text-navy-900 px-6 py-2 rounded-full font-semibold transition-all shadow-lg hover:shadow-gold-500/25"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-200 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-navy-900/95 backdrop-blur-lg shadow-xl border-t border-white/10">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-3 text-base font-medium text-gray-200 hover:text-gold-400 hover:bg-white/5 rounded-md transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="#booking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mt-4 text-center bg-gold-500 text-navy-900 px-6 py-3 rounded-full font-semibold shadow-lg"
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
