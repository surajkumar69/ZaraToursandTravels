import {
  ShieldCheck,
  HeartHandshake,
  Navigation,
  Wrench,
} from "lucide-react";

const pillars = [
  {
    icon: HeartHandshake,
    title: "Comfortable Travel",
    desc: "Clean interiors and cushioned seating for winding hill roads.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Service",
    desc: "Dependable schedules for transfers, tours, and family trips.",
  },
  {
    icon: Navigation,
    title: "Professional Drivers",
    desc: "Courteous, seasoned Nilgiris specialists behind the wheel.",
  },
  {
    icon: Wrench,
    title: "Well-Maintained Vehicles",
    desc: "Inspected regularly for mountain safety and comfort.",
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 bg-forest-950 text-ivory-50 border-t border-champagne-400/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-champagne-300 font-semibold uppercase tracking-[0.2em] text-xs mb-3">
            Our Promise
          </p>
          <h2
            className="font-display font-bold text-ivory-50 text-balance mb-4"
            style={{ fontSize: "clamp(1.9rem, 1.3rem + 2vw, 3rem)" }}
          >
            Travel With Confidence
          </h2>
          <div className="w-16 h-0.5 bg-champagne-400 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="flex flex-col items-center p-6 rounded-3xl bg-forest-900/60 border border-champagne-400/15"
              >
                <div className="w-18 h-18 w-[72px] h-[72px] bg-forest-800 rounded-2xl flex items-center justify-center mb-5 border border-champagne-400/30 text-champagne-300 shadow-lg">
                  <Icon className="w-8 h-8" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-bold text-ivory-50 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-ivory-200/75 text-sm leading-relaxed max-w-[26ch] text-pretty">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
