import { CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";

const features = [
  "Comfortable Vehicles",
  "Experienced Drivers",
  "Reliable Service",
  "Family & Group Travel",
  "Local Ooty Expertise",
  "Affordable Travel Options",
];

export default function AboutUs() {
  return (
    <section id="about" className="py-20 md:py-28 bg-ivory-100 text-charcoal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Existing Client Fleet Lineup Banner */}
        <div className="w-full mb-14 md:mb-16 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(7,22,16,0.12)] border border-ivory-200 bg-forest-950">
          <Image
            src="/images/about.jpg"
            alt="Zara Tours and Travels - Your Trusted Travel Partner in Ooty featuring our complete fleet"
            width={1200}
            height={480}
            sizes="(max-width: 1280px) 100vw, 1216px"
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Editorial Story & Highlights */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <p className="text-champagne-600 font-semibold uppercase tracking-[0.2em] text-xs mb-3">
                About Zara Tours &amp; Travels
              </p>
              <h2
                className="font-display font-bold text-forest-900 text-balance leading-[1.12] mb-5"
                style={{ fontSize: "clamp(2rem, 1.4rem + 2.2vw, 3.25rem)" }}
              >
                Rooted in Ketti.{" "}
                <span className="italic text-champagne-600">
                  Trusted Across the Nilgiris.
                </span>
              </h2>
              <p className="text-charcoal-600 text-base sm:text-lg leading-relaxed max-w-[66ch] text-pretty">
                Based in Ketti, Ooty, we are a trusted local travel service
                offering comfortable and reliable transportation for
                sightseeing, family trips, group tours, outstation journeys, and
                special travel requirements. We are dedicated to making every
                journey memorable, safe, and entirely hassle-free for you and
                your family.
              </p>
            </div>

            {/* 6 Core Highlights Grid */}
            <div className="bg-ivory-50 p-6 sm:p-8 rounded-3xl border border-ivory-200 shadow-sm">
              <h3 className="font-display text-2xl font-bold text-forest-900 mb-5 pb-3 border-b border-ivory-200">
                Our Highlights
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-forest-50 border border-forest-100 flex items-center justify-center shrink-0">
                      <CheckCircle2
                        className="w-4 h-4 text-forest-800"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="font-medium text-charcoal-900 text-sm sm:text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <a
                href="#vehicles"
                className="inline-flex items-center gap-2.5 min-h-[50px] bg-forest-900 hover:bg-forest-800 text-ivory-50 px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg shadow-forest-950/15 hover:-translate-y-0.5"
              >
                <span>View Our Fleet</span>
                <ArrowRight className="w-4 h-4 text-champagne-300" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Editorial Coonoor Roadtrip Photograph */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_24px_55px_rgba(7,22,16,0.16)] border border-ivory-200 bg-forest-950 aspect-[4/3] lg:aspect-[4/4.6]">
              <Image
                src="/images/coonoor-roadtrip.jpg"
                alt="Luxury white touring SUV overlooking misty emerald tea estates along a scenic Nilgiris mountain road near Coonoor"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-ivory-50">
                <p className="text-xs uppercase tracking-[0.2em] text-champagne-300 font-semibold mb-1">
                  Bharathi Nagar, Ketti &bull; Ooty
                </p>
                <p className="font-display text-xl sm:text-2xl font-semibold leading-snug">
                  Handcrafted highland journeys with seasoned Nilgiris
                  chauffeurs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
