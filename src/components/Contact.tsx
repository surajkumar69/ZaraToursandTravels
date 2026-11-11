import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-ivory-50 text-charcoal-900 relative border-t border-ivory-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-16">
          <p className="text-champagne-600 font-semibold uppercase tracking-[0.2em] text-xs mb-3">
            Get In Touch
          </p>
          <h2
            className="font-display font-bold text-forest-900 text-balance mb-4"
            style={{ fontSize: "clamp(2rem, 1.4rem + 2.2vw, 3.25rem)" }}
          >
            Plan Your Journey With Us
          </h2>
          <p className="text-charcoal-600 max-w-2xl mx-auto text-base sm:text-lg text-pretty">
            Reach our Ketti, Ooty office directly by phone, WhatsApp, or email
            for swift dispatch and local itinerary support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Contact Concierge Card */}
          <div className="luxury-card bg-forest-900 text-ivory-50 p-7 sm:p-10 rounded-3xl border border-champagne-400/20 shadow-xl flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-champagne-300 font-semibold mb-2">
                Direct Dispatch
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-8 text-ivory-50">
                ZARA TOURS &amp; TRAVELS
              </h3>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="bg-forest-800 text-champagne-300 border border-champagne-400/30 p-3.5 rounded-2xl shrink-0">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-ivory-200/70 font-medium mb-1">
                      Phone
                    </p>
                    <a
                      href="tel:8523923843"
                      className="text-lg font-semibold text-ivory-50 hover:text-champagne-300 transition-colors"
                    >
                      8523923843
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-forest-800 text-champagne-300 border border-champagne-400/30 p-3.5 rounded-2xl shrink-0">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-ivory-200/70 font-medium mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:Dhanushjr279@gmail.com"
                      className="text-lg font-semibold text-ivory-50 hover:text-champagne-300 transition-colors break-all"
                    >
                      Dhanushjr279@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-forest-800 text-champagne-300 border border-champagne-400/30 p-3.5 rounded-2xl shrink-0">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-ivory-200/70 font-medium mb-1">
                      Location
                    </p>
                    <p className="text-lg font-semibold text-ivory-50 leading-snug">
                      Bharathi Nagar, Ketti, Ooty,
                      <br />
                      Tamil Nadu, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5">
              <a
                href="tel:8523923843"
                className="flex-1 min-h-[48px] bg-champagne-400 hover:bg-champagne-300 text-forest-950 py-3 px-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>Call Now</span>
              </a>
              <a
                href="https://wa.me/918523923843"
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-h-[48px] bg-emerald-700 hover:bg-emerald-600 text-white py-3 px-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>WhatsApp Us</span>
              </a>
              <a
                href="mailto:Dhanushjr279@gmail.com"
                className="flex-1 min-h-[48px] bg-forest-800 hover:bg-forest-700 text-ivory-50 border border-champagne-400/25 py-3 px-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4 text-champagne-300" aria-hidden="true" />
                <span>Send Email</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="bg-ivory-200 rounded-3xl overflow-hidden shadow-inner min-h-[380px] lg:min-h-full relative border border-ivory-200">
            <iframe
              src="https://maps.google.com/maps?q=Bharathi%20Nagar,%20Ketti,%20Ooty,%20Tamil%20Nadu,%20India&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "380px" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
              title="Zara Tours & Travels Location in Bharathi Nagar, Ketti, Ooty"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
