import { Map, Car, MapPin, Users, Building, Plane, PartyPopper, Cog } from "lucide-react";

const services = [
  {
    icon: <Map className="w-8 h-8 text-gold-500" />,
    title: "Ooty Sightseeing",
    description: "Explore the beautiful attractions of Ooty comfortably.",
  },
  {
    icon: <Car className="w-8 h-8 text-gold-500" />,
    title: "Local Taxi Service",
    description: "Reliable transportation around Ooty and nearby areas.",
  },
  {
    icon: <MapPin className="w-8 h-8 text-gold-500" />,
    title: "Outstation Trips",
    description: "Comfortable travel to destinations across Tamil Nadu and South India.",
  },
  {
    icon: <Users className="w-8 h-8 text-gold-500" />,
    title: "Family Tours",
    description: "Safe and comfortable travel tailored for families.",
  },
  {
    icon: <Building className="w-8 h-8 text-gold-500" />,
    title: "Group Tours",
    description: "Spacious vehicles for schools, groups, friends and organizations.",
  },
  {
    icon: <Plane className="w-8 h-8 text-gold-500" />,
    title: "Airport / Railway Transfers",
    description: "Convenient pickup and drop services on time.",
  },
  {
    icon: <PartyPopper className="w-8 h-8 text-gold-500" />,
    title: "Wedding & Event Transportation",
    description: "Vehicle arrangements for weddings, functions and special events.",
  },
  {
    icon: <Cog className="w-8 h-8 text-gold-500" />,
    title: "Customized Travel",
    description: "Customized travel arrangements based on your specific customer requirements.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h4 className="text-gold-400 font-bold uppercase tracking-wider mb-2">What We Do</h4>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Travel Services</h2>
          <div className="w-20 h-1 bg-gold-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-navy-800 rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-white/5">
              <div className="bg-navy-900 w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
