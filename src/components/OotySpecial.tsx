import Image from "next/image";
import { ArrowRight } from "lucide-react";

const spots = [
  {
    name: "Ooty Lake",
    subtitle: "Tranquil boating amidst misty eucalyptus shores",
    image: "/images/ooty_lake.jpg",
    featured: true,
  },
  {
    name: "Tea Gardens",
    subtitle: "Verdant terraced slopes at dawn",
    image: "/images/ooty_tea.jpg",
    featured: false,
  },
  {
    name: "Doddabetta Peak",
    subtitle: "Highest summit of the Nilgiris",
    image: "/images/ooty_peak.jpg",
    featured: false,
  },
  {
    name: "Coonoor",
    subtitle: "Heritage estates & Sim's Park",
    image: "/images/dest_coonoor.jpg",
    featured: false,
  },
  {
    name: "Mountain Railway",
    subtitle: "UNESCO World Heritage Nilgiri train",
    image: "/images/ooty_rail.jpg",
    featured: false,
  },
];

export default function OotySpecial() {
  const mainSpot = spots[0];
  const secondarySpots = spots.slice(1);

  return (
    <section className="py-20 md:py-28 bg-ivory-50 text-charcoal-900 border-t border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <p className="text-champagne-600 font-semibold uppercase tracking-[0.2em] text-xs mb-3">
              Nilgiris Charm
            </p>
            <h2
              className="font-display font-bold text-forest-900 text-balance"
              style={{ fontSize: "clamp(2rem, 1.4rem + 2.4vw, 3.5rem)" }}
            >
              Discover the Beauty of Ooty
            </h2>
          </div>
          <a
            href="#booking"
            className="inline-flex items-center gap-2 min-h-[48px] bg-forest-900 hover:bg-forest-800 text-ivory-50 px-7 py-3 rounded-full font-semibold transition-all shadow-md shrink-0"
          >
            <span>Plan Your Ooty Trip</span>
            <ArrowRight className="w-4 h-4 text-champagne-300" aria-hidden="true" />
          </a>
        </div>

        {/* Curated Bento Collage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:h-[580px]">
          <div className="sm:col-span-2 lg:row-span-2 relative min-h-[280px] sm:min-h-[340px] lg:min-h-0 rounded-3xl overflow-hidden group shadow-lg border border-ivory-200 bg-forest-950">
            <Image
              src={mainSpot.image}
              alt={`${mainSpot.name} — ${mainSpot.subtitle}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/20 to-transparent"
            />
            <div className="absolute bottom-6 left-6 right-6 text-ivory-50">
              <p className="text-xs uppercase tracking-[0.18em] text-champagne-300 font-semibold mb-1">
                Signature Experience
              </p>
              <h3 className="font-display text-3xl font-bold mb-1">
                {mainSpot.name}
              </h3>
              <p className="text-ivory-200/90 text-sm">{mainSpot.subtitle}</p>
            </div>
          </div>

          {secondarySpots.map((spot) => (
            <div
              key={spot.name}
              className="relative min-h-[220px] lg:min-h-0 rounded-3xl overflow-hidden group shadow-md border border-ivory-200 bg-forest-950"
            >
              <Image
                src={spot.image}
                alt={`${spot.name} — ${spot.subtitle}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/25 to-transparent"
              />
              <div className="absolute bottom-5 left-5 right-5 text-ivory-50">
                <h3 className="font-display text-xl font-bold mb-0.5">
                  {spot.name}
                </h3>
                <p className="text-ivory-200/85 text-xs">{spot.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
