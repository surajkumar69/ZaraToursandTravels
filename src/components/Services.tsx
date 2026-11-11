import {
  Map,
  Car,
  MapPin,
  Users,
  Building,
  Plane,
  PartyPopper,
  Cog,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: Map,
    title: "Ooty Sightseeing",
    description: "Explore the beautiful attractions of Ooty comfortably.",
  },
  {
    icon: Car,
    title: "Local Taxi Service",
    description: "Reliable transportation around Ooty and nearby areas.",
  },
  {
    icon: MapPin,
    title: "Outstation Trips",
    description:
      "Comfortable travel to destinations across Tamil Nadu and South India.",
  },
  {
    icon: Users,
    title: "Family Tours",
    description: "Safe and comfortable travel tailored for families.",
  },
  {
    icon: Building,
    title: "Group Tours",
    description:
      "Spacious vehicles for schools, groups, friends and organizations.",
  },
  {
    icon: Plane,
    title: "Airport / Railway Transfers",
    description: "Convenient pickup and drop services on time.",
  },
  {
    icon: PartyPopper,
    title: "Wedding & Event Transportation",
    description:
      "Vehicle arrangements for weddings, functions and special events.",
  },
  {
    icon: Cog,
    title: "Customized Travel",
    description:
      "Customized travel arrangements based on your specific customer requirements.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 md:py-28 bg-forest-900 text-ivory-50 relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,180,110,0.08),transparent_55%)]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-16">
          <div>
            <p className="text-champagne-300 font-semibold uppercase tracking-[0.2em] text-xs mb-3">
              What We Do
            </p>
            <h2
              className="font-display font-bold text-ivory-50 text-balance"
              style={{ fontSize: "clamp(2rem, 1.4rem + 2.2vw, 3.25rem)" }}
            >
              Our Travel Services
            </h2>
          </div>
          <p className="text-ivory-200/80 max-w-md text-sm sm:text-base text-pretty">
            Seamless local sightseeing, airport transfers, family holidays, and
            bespoke South India journeys backed by warm Nilgiris hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const num = String(idx + 1).padStart(2, "0");
            return (
              <article
                key={service.title}
                className="luxury-card group bg-forest-800/65 hover:bg-forest-800 rounded-2xl p-7 border border-champagne-400/15 hover:border-champagne-400/45 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-forest-950/80 border border-champagne-400/25 flex items-center justify-center text-champagne-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-7 h-7" aria-hidden="true" />
                    </div>
                    <span className="font-display text-2xl font-semibold text-champagne-400/45">
                      {num}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-ivory-50 mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-ivory-200/75 text-sm leading-relaxed text-pretty">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-ivory-100/10">
                  <a
                    href="#booking"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-champagne-300 hover:text-champagne-200 transition-colors"
                  >
                    <span>Enquire Now</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
