import Image from "next/image";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <>
      {/* Final Pre-Footer CTA */}
      <section className="bg-forest-800 text-ivory-50 py-16 md:py-20 border-t border-champagne-400/20 border-b border-ivory-100/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-champagne-300 font-semibold mb-3">
            24/7 Local &amp; Outstation Dispatch
          </p>
          <h2
            className="font-display font-bold mb-4 text-balance"
            style={{ fontSize: "clamp(1.9rem, 1.3rem + 2vw, 3rem)" }}
          >
            Ready For Your Next Journey?
          </h2>
          <p className="text-ivory-100/85 text-base sm:text-lg mb-8 max-w-xl mx-auto text-pretty">
            Book a comfortable vehicle and explore Ooty with Zara Tours &amp;
            Travels.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#booking"
              className="inline-flex items-center justify-center gap-2 min-h-[50px] bg-champagne-400 hover:bg-champagne-300 text-forest-950 px-8 py-3.5 rounded-full font-bold text-base transition-all shadow-lg"
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="tel:8523923843"
              className="inline-flex items-center justify-center gap-2 min-h-[50px] bg-forest-900/70 hover:bg-forest-900 border border-champagne-400/35 text-ivory-50 px-8 py-3.5 rounded-full font-bold text-base transition-colors"
            >
              <Phone className="w-4 h-4 text-champagne-300" aria-hidden="true" />
              <span>Call 8523923843</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest-950 text-ivory-200/80 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-champagne-400 shadow-lg shrink-0">
                  <Image
                    src="/images/logo.jpg"
                    alt="Zara Tours Logo"
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="font-display text-ivory-50 text-xl font-bold tracking-wider leading-tight">
                  ZARA <br />
                  <span className="text-champagne-400">TOURS &amp; TRAVELS</span>
                </p>
              </div>
              <p className="font-display italic text-base text-champagne-300 mb-3">
                &ldquo;Your Journey, Our Priority&rdquo;
              </p>
              <p className="text-sm leading-relaxed text-ivory-200/70 max-w-sm">
                Trusted travel agency offering comfortable rides, local
                sightseeing, and outstation trips in and around Ooty.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h2 className="font-display text-lg text-ivory-50 font-bold mb-4">
                Quick Links
              </h2>
              <nav aria-label="Footer">
                <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm">
                  <li>
                    <a
                      href="#home"
                      className="hover:text-champagne-300 transition-colors"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="hover:text-champagne-300 transition-colors"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#vehicles"
                      className="hover:text-champagne-300 transition-colors"
                    >
                      Vehicles
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      className="hover:text-champagne-300 transition-colors"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="#destinations"
                      className="hover:text-champagne-300 transition-colors"
                    >
                      Destinations
                    </a>
                  </li>
                  <li>
                    <a
                      href="#gallery"
                      className="hover:text-champagne-300 transition-colors"
                    >
                      Gallery
                    </a>
                  </li>
                  <li>
                    <a
                      href="#reviews"
                      className="hover:text-champagne-300 transition-colors"
                    >
                      Reviews
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="hover:text-champagne-300 transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-display text-lg text-ivory-50 font-bold mb-4">
                Contact Info
              </h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2.5">
                  <Phone
                    className="w-4 h-4 text-champagne-400 shrink-0"
                    aria-hidden="true"
                  />
                  <a
                    href="tel:8523923843"
                    className="hover:text-champagne-300 transition-colors"
                  >
                    8523923843
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail
                    className="w-4 h-4 text-champagne-400 shrink-0"
                    aria-hidden="true"
                  />
                  <a
                    href="mailto:Dhanushjr279@gmail.com"
                    className="hover:text-champagne-300 transition-colors break-all"
                  >
                    Dhanushjr279@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin
                    className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    Bharathi Nagar, Ketti, Ooty,
                    <br />
                    Tamil Nadu, India
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-ivory-100/10 text-center text-xs sm:text-sm text-ivory-200/60">
            <p>&copy; 2026 Zara Tours &amp; Travels. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
