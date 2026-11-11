"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  attachLightDismissFallback,
  closeDialogSmoothly,
} from "@/lib/dialogUtils";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Vehicles", href: "#vehicles" },
  { name: "Services", href: "#services" },
  { name: "Destinations", href: "#destinations" },
  { name: "Gallery", href: "#gallery" },
  { name: "Reviews", href: "#reviews" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeDrawer = useCallback(async () => {
    await closeDialogSmoothly(drawerRef.current);
    setIsMobileMenuOpen(false);
  }, []);

  const openDrawer = () => {
    const dialog = drawerRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    setIsMobileMenuOpen(true);
  };

  useEffect(() => {
    const dialog = drawerRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      void closeDrawer();
    };

    const handleClose = () => {
      setIsMobileMenuOpen(false);
    };

    const detachFallback = attachLightDismissFallback(dialog, () => {
      void closeDrawer();
    });

    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("close", handleClose);

    return () => {
      detachFallback();
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("close", handleClose);
    };
  }, [closeDrawer]);

  const handleMobileNavClick = async (href: string) => {
    await closeDrawer();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-forest-950/95 backdrop-blur-md shadow-[0_10px_30px_rgba(7,22,16,0.35)] border-b border-champagne-400/20 py-2.5"
          : "bg-gradient-to-b from-forest-950/80 via-forest-950/40 to-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-4">
          {/* Brand Logo */}
          <Link
            href="#home"
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="relative h-12 w-12 md:h-13 md:w-13 rounded-full overflow-hidden border-2 border-champagne-400 shadow-[0_0_20px_rgba(212,180,110,0.3)] group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/logo.jpg"
                alt="Zara Tours & Travels Logo"
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-display text-xl md:text-2xl font-bold tracking-wider text-ivory-50 leading-none">
                ZARA <span className="text-champagne-400">TOURS</span>
              </span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-ivory-200/80 mt-1">
                Ooty &bull; The Nilgiris
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-6 xl:gap-7"
          >
            <ul className="flex items-center gap-5 xl:gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="relative py-2 text-xs xl:text-[13px] uppercase tracking-[0.14em] font-medium text-ivory-100/90 hover:text-champagne-300 transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-champagne-400 hover:after:w-full after:transition-all after:duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="#booking"
              className="inline-flex items-center gap-2 bg-champagne-400 hover:bg-champagne-300 text-forest-950 px-5 py-2.5 min-h-[44px] rounded-full font-semibold text-sm tracking-wide transition-all shadow-lg shadow-black/20 hover:-translate-y-0.5"
            >
              Book Now
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </nav>

          {/* Tablet / Mobile Action & Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="tel:8523923843"
              aria-label="Call Zara Tours & Travels at 8523923843"
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-3 rounded-full border border-champagne-400/40 bg-forest-900/70 text-champagne-300 hover:bg-forest-800 transition-colors"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={openDrawer}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              className="inline-flex items-center justify-center min-h-[48px] min-w-[48px] rounded-full border border-ivory-100/25 bg-forest-900/70 text-ivory-50 hover:border-champagne-400/60 hover:text-champagne-300 transition-colors"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Native Modal Navigation Drawer */}
      <dialog
        id="mobile-nav-drawer"
        ref={drawerRef}
        aria-labelledby="mobile-drawer-title"
        {...({ closedby: "any" } as Record<string, string>)}
        className="mobile-drawer m-0 ml-auto h-[100dvh] max-h-none w-[min(22rem,86vw)] bg-forest-950 text-ivory-50 border-l border-champagne-400/20 p-0 shadow-2xl"
      >
        <div className="flex flex-col h-full justify-between p-6 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-ivory-100/10">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full overflow-hidden border border-champagne-400">
                  <Image
                    src="/images/logo.jpg"
                    alt=""
                    width={44}
                    height={44}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h2
                    id="mobile-drawer-title"
                    className="font-display text-xl font-bold tracking-wide text-ivory-50"
                  >
                    ZARA <span className="text-champagne-400">TOURS</span>
                  </h2>
                  <p className="text-xs text-ivory-200/70 tracking-wider uppercase">
                    Your Journey, Our Priority
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => void closeDrawer()}
                aria-label="Close navigation menu"
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full bg-forest-900 text-ivory-100 hover:text-champagne-300 border border-ivory-100/15 transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-6">
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        void handleMobileNavClick(link.href);
                      }}
                      className="flex items-center justify-between min-h-[48px] px-4 rounded-xl text-base font-medium text-ivory-100 hover:bg-forest-800/80 hover:text-champagne-300 transition-colors"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight
                        className="w-4 h-4 text-champagne-400/70"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="pt-6 mt-6 border-t border-ivory-100/10 space-y-3">
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                void handleMobileNavClick("#booking");
              }}
              className="flex items-center justify-center gap-2 w-full min-h-[48px] bg-champagne-400 hover:bg-champagne-300 text-forest-950 font-bold rounded-full transition-colors shadow-lg"
            >
              Book Your Ride
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:8523923843"
                className="flex items-center justify-center gap-2 min-h-[46px] rounded-xl bg-forest-800 hover:bg-forest-700 text-ivory-50 text-sm font-semibold border border-ivory-100/10 transition-colors"
              >
                <Phone className="w-4 h-4 text-champagne-400" aria-hidden="true" />
                Call Now
              </a>
              <a
                href="https://wa.me/918523923843"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 min-h-[46px] rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </header>
  );
}
