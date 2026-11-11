import {
  CheckCircle,
  Shield,
  Award,
  IndianRupee,
  Map,
  Compass,
} from "lucide-react";

const reasons = [
  {
    icon: CheckCircle,
    title: "Comfortable Vehicles",
    desc: "Well-maintained fleet ensuring a smooth journey.",
  },
  {
    icon: Shield,
    title: "Experienced Drivers",
    desc: "Professional drivers prioritizing your safety.",
  },
  {
    icon: Award,
    title: "Reliable Service",
    desc: "Punctual and dependable travel arrangements.",
  },
  {
    icon: IndianRupee,
    title: "Affordable Pricing",
    desc: "Transparent rates with no hidden charges.",
  },
  {
    icon: Map,
    title: "Local Travel Knowledge",
    desc: "Deep understanding of Ooty's best spots.",
  },
  {
    icon: Compass,
    title: "Flexible Options",
    desc: "Customizable trips tailored to your schedule.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-ivory-100 text-charcoal-900 border-t border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-16">
          <p className="text-champagne-600 font-semibold uppercase tracking-[0.2em] text-xs mb-3">
            Our Values
          </p>
          <h2
            className="font-display font-bold text-forest-900 text-balance mb-4"
            style={{ fontSize: "clamp(2rem, 1.4rem + 2.2vw, 3.25rem)" }}
          >
            Why Choose Zara Tours &amp; Travels?
          </h2>
          <p className="text-charcoal-600 max-w-2xl mx-auto text-base sm:text-lg text-pretty">
            Built on genuine local hospitality, disciplined mountain driving,
            and complete transparency from pickup to drop-off.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <article
                key={reason.title}
                className="luxury-card flex items-start gap-5 p-7 bg-ivory-50 rounded-3xl border border-ivory-200 hover:border-champagne-500/50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-forest-900 text-champagne-300 flex items-center justify-center shrink-0 shadow-sm">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-forest-900 mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed text-pretty">
                    {reason.desc}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
