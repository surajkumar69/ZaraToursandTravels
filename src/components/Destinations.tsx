import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

const destinations = [
  {
    name: "Ooty",
    image: "/images/dest_ooty.jpg",
    desc: "The Queen of Hill Stations",
  },
  {
    name: "Coonoor",
    image: "/images/dest_coonoor.jpg",
    desc: "Tea gardens and scenic valleys",
  },
  {
    name: "Ketti Valley",
    image: "/images/dest_ketti.jpg",
    desc: "The Switzerland of Southern India",
  },
  {
    name: "Kotagiri",
    image: "/images/dest_kotagiri.jpg",
    desc: "Peaceful hill retreat",
  },
  {
    name: "Coimbatore",
    image: "/images/dest_coimbatore.jpg",
    desc: "The Manchester of South India",
  },
  {
    name: "Mysore",
    image: "/images/dest_mysore.jpg",
    desc: "City of Palaces",
  },
  {
    name: "Bangalore",
    image: "/images/dest_bangalore.jpg",
    desc: "The Garden City",
  },
  {
    name: "Wayanad",
    image: "/images/dest_wayanad.jpg",
    desc: "Nature's own paradise",
  },
];

export default function Destinations() {
  return (
    <section
      id="destinations"
      className="py-20 md:py-28 bg-ivory-100 text-charcoal-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-16">
          <p className="text-champagne-600 font-semibold uppercase tracking-[0.2em] text-xs mb-3">
            Discover Places
          </p>
          <h2
            className="font-display font-bold text-forest-900 text-balance mb-4"
            style={{ fontSize: "clamp(2rem, 1.4rem + 2.2vw, 3.25rem)" }}
          >
            Explore Beautiful Destinations
          </h2>
          <p className="text-charcoal-600 max-w-2xl mx-auto text-base sm:text-lg text-pretty">
            We provide comfortable travel options to all major destinations
            across South India.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <article
              key={dest.name}
              className="group relative h-80 sm:h-[22rem] rounded-3xl overflow-hidden shadow-md hover:shadow-[0_20px_45px_rgba(7,22,16,0.2)] transition-all duration-500 border border-ivory-200 bg-forest-950"
            >
              <Image
                src={dest.image}
                alt={`${dest.name} — ${dest.desc}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/40 to-transparent"
              />

              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-forest-950/70 backdrop-blur-md border border-champagne-400/30 text-[11px] font-medium uppercase tracking-wider text-champagne-300">
                  <MapPin className="w-3 h-3" aria-hidden="true" />
                  South India
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-ivory-50">
                <h3 className="font-display text-2xl font-bold mb-1">
                  {dest.name}
                </h3>
                <p className="text-ivory-200/90 text-sm mb-4">{dest.desc}</p>
                <a
                  href="#booking"
                  className="inline-flex items-center gap-1.5 text-champagne-300 font-semibold text-xs uppercase tracking-[0.14em] hover:text-champagne-200 transition-colors min-h-[44px]"
                >
                  <span>Plan Your Trip</span>
                  <ArrowRight
                    className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
