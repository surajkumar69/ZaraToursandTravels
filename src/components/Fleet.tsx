import { Users, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";

const vehicles = [
  {
    name: "4-Seater Sedan",
    capacity: "4 Seats",
    description: "Comfortable sedan for couples, families and small groups.",
    image: "/images/sedan.jpg",
  },
  {
    name: "7-Seater Bolero",
    capacity: "7 Seats",
    description:
      "Spacious and reliable SUV for family trips and local sightseeing.",
    image: "/images/bolero.jpg",
  },
  {
    name: "8-Seater Xylo",
    capacity: "8 Seats",
    description: "Comfortable MPV suitable for family and group travel.",
    image: "/images/xylo.jpg",
  },
  {
    name: "8-Seater Innova",
    capacity: "8 Seats",
    description:
      "Premium and comfortable vehicle for long-distance and family journeys.",
    image: "/images/innova.jpg",
  },
  {
    name: "14-Seater Tempo Traveller",
    capacity: "14 Seats",
    description: "Ideal for medium-sized groups and sightseeing tours.",
    image: "/images/tempo.jpg",
  },
  {
    name: "21-Seater Van",
    capacity: "21 Seats",
    description: "Spacious transportation for larger groups and tours.",
    image: "/images/van.jpg",
  },
  {
    name: "30-Seater Bus",
    capacity: "30 Seats",
    description:
      "Comfortable group transportation for large tours and events.",
    image: "/images/bus.jpg",
  },
];

export default function Fleet() {
  const standardVehicles = vehicles.slice(0, 6);
  const flagshipBus = vehicles[6];

  return (
    <section
      id="vehicles"
      className="py-20 md:py-28 bg-ivory-50 text-charcoal-900 border-t border-ivory-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-16">
          <p className="text-champagne-600 font-semibold uppercase tracking-[0.2em] text-xs mb-3">
            Our Fleet
          </p>
          <h2
            className="font-display font-bold text-forest-900 text-balance mb-4"
            style={{ fontSize: "clamp(2rem, 1.4rem + 2.2vw, 3.25rem)" }}
          >
            Our Vehicles
          </h2>
          <p className="text-charcoal-600 max-w-2xl mx-auto text-base sm:text-lg text-pretty">
            Choose the right vehicle for your journey. We offer a wide range of
            well-maintained vehicles for all group sizes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {standardVehicles.map((vehicle) => (
            <article
              key={vehicle.name}
              className="luxury-card bg-ivory-100/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_22px_50px_rgba(7,22,16,0.12)] transition-all duration-300 group border border-ivory-200 flex flex-col"
            >
              <div className="relative h-60 sm:h-64 overflow-hidden bg-forest-950">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-forest-950/55 via-transparent to-transparent opacity-60"
                />
                <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 text-xs font-semibold bg-forest-950/85 backdrop-blur-md text-champagne-300 border border-champagne-400/35 px-3.5 py-1.5 rounded-full shadow-md">
                  <Users className="w-3.5 h-3.5" aria-hidden="true" />
                  {vehicle.capacity}
                </span>
              </div>

              <div className="p-6 sm:p-7 flex flex-col flex-grow">
                <div className="mb-3">
                  <h3 className="font-display text-2xl font-bold text-forest-900">
                    {vehicle.name}
                  </h3>
                </div>

                <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed mb-5 flex-grow text-pretty">
                  {vehicle.description}
                </p>

                <div className="pt-4 border-t border-ivory-200/90 flex items-center justify-between text-xs font-medium text-charcoal-600 mb-5">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck
                      className="w-4 h-4 text-champagne-600"
                      aria-hidden="true"
                    />
                    Experienced Driver Included
                  </span>
                  <span className="text-champagne-700 font-semibold">
                    Custom Quote
                  </span>
                </div>

                <a
                  href={`#booking?vehicle=${encodeURIComponent(vehicle.name)}`}
                  className="inline-flex items-center justify-center gap-2 w-full min-h-[48px] bg-forest-900 hover:bg-forest-800 text-ivory-50 py-3 px-5 rounded-xl font-semibold transition-all group-hover:shadow-md"
                >
                  <span>Book Now</span>
                  <ArrowRight
                    className="w-4 h-4 text-champagne-300 group-hover:translate-x-0.5 transition-transform"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </article>
          ))}

          {/* Flagship 30-Seater Bus Showcase */}
          <article className="luxury-card md:col-span-2 lg:col-span-2 bg-ivory-100/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_22px_50px_rgba(7,22,16,0.12)] transition-all duration-300 group border border-ivory-200 grid grid-cols-1 md:grid-cols-2">
            <div className="relative min-h-[260px] md:min-h-full overflow-hidden bg-forest-950">
              <Image
                src={flagshipBus.image}
                alt={flagshipBus.name}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 text-xs font-semibold bg-forest-950/85 backdrop-blur-md text-champagne-300 border border-champagne-400/35 px-3.5 py-1.5 rounded-full shadow-md">
                <Users className="w-3.5 h-3.5" aria-hidden="true" />
                {flagshipBus.capacity}
              </span>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-champagne-600 font-semibold mb-2">
                  Flagship Group Coach
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-forest-900 mb-3">
                  {flagshipBus.name}
                </h3>
                <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed mb-6 text-pretty">
                  {flagshipBus.description}
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-ivory-200/90 flex items-center justify-between text-xs font-medium text-charcoal-600 mb-5">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck
                      className="w-4 h-4 text-champagne-600"
                      aria-hidden="true"
                    />
                    Tour &amp; Event Ready
                  </span>
                  <span className="text-champagne-700 font-semibold">
                    Custom Quote
                  </span>
                </div>

                <a
                  href={`#booking?vehicle=${encodeURIComponent(
                    flagshipBus.name
                  )}`}
                  className="inline-flex items-center justify-center gap-2 w-full min-h-[48px] bg-forest-900 hover:bg-forest-800 text-ivory-50 py-3 px-5 rounded-xl font-semibold transition-all"
                >
                  <span>Book Now</span>
                  <ArrowRight
                    className="w-4 h-4 text-champagne-300 group-hover:translate-x-0.5 transition-transform"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </article>

          {/* Concierge Custom Arrangement Card */}
          <aside className="luxury-card md:col-span-2 lg:col-span-1 bg-forest-900 text-ivory-50 rounded-3xl p-7 sm:p-8 border border-champagne-400/25 flex flex-col justify-between shadow-lg">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-800 border border-champagne-400/30 text-champagne-300 text-xs font-semibold uppercase tracking-wider mb-5">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                Tailored Itinerary
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ivory-50 mb-3">
                Planning a Multi-Day or Group Tour?
              </h3>
              <p className="text-ivory-200/80 text-sm sm:text-base leading-relaxed mb-6 text-pretty">
                Whether you need airport pickups, multi-vehicle wedding
                convoys, or a custom South India circuit, our dispatch desk
                arranges the ideal vehicle mix.
              </p>
            </div>
            <a
              href="#booking"
              className="inline-flex items-center justify-center gap-2 w-full min-h-[48px] bg-champagne-400 hover:bg-champagne-300 text-forest-950 py-3 px-5 rounded-xl font-bold transition-colors"
            >
              <span>Request Custom Quote</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
