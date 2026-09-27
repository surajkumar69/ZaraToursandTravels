import { CheckCircle, Shield, Award, IndianRupee, Map, Compass } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <CheckCircle className="w-8 h-8 text-gold-500" />,
      title: "Comfortable Vehicles",
      desc: "Well-maintained fleet ensuring a smooth journey."
    },
    {
      icon: <Shield className="w-8 h-8 text-gold-500" />,
      title: "Experienced Drivers",
      desc: "Professional drivers prioritizing your safety."
    },
    {
      icon: <Award className="w-8 h-8 text-gold-500" />,
      title: "Reliable Service",
      desc: "Punctual and dependable travel arrangements."
    },
    {
      icon: <IndianRupee className="w-8 h-8 text-gold-500" />,
      title: "Affordable Pricing",
      desc: "Transparent rates with no hidden charges."
    },
    {
      icon: <Map className="w-8 h-8 text-gold-500" />,
      title: "Local Travel Knowledge",
      desc: "Deep understanding of Ooty's best spots."
    },
    {
      icon: <Compass className="w-8 h-8 text-gold-500" />,
      title: "Flexible Options",
      desc: "Customizable trips tailored to your schedule."
    }
  ];

  return (
    <section className="py-20 bg-white text-navy-900 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h4 className="text-gold-500 font-bold uppercase tracking-wider mb-2">Our Values</h4>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Zara Tours & Travels?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <div key={idx} className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-gray-100 hover:border-gold-500/30 hover:bg-slate-100 transition-colors">
              <div className="shrink-0">{reason.icon}</div>
              <div>
                <h3 className="text-lg font-bold mb-2">{reason.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
