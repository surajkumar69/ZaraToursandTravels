import { Users } from "lucide-react";

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
    description: "Spacious and reliable SUV for family trips and local sightseeing.",
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
    description: "Premium and comfortable vehicle for long-distance and family journeys.",
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
    description: "Comfortable group transportation for large tours and events.",
    image: "/images/bus.jpg",
  }
];

export default function Fleet() {
  return (
    <section id="vehicles" className="py-20 bg-slate-50 text-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h4 className="text-gold-500 font-bold uppercase tracking-wider mb-2">Our Fleet</h4>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Vehicles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Choose the right vehicle for your journey. We offer a wide range of well-maintained vehicles for all group sizes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100">
              <div className="relative h-60 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${vehicle.image}')` }}
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-navy-900">{vehicle.name}</h3>
                  <span className="flex items-center gap-1 text-sm font-medium bg-navy-50 text-navy-900 px-3 py-1 rounded-full">
                    <Users size={16} />
                    {vehicle.capacity}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-6 line-clamp-2">
                  {vehicle.description}
                </p>
                
                <a 
                  href={`#booking?vehicle=${encodeURIComponent(vehicle.name)}`}
                  className="block text-center w-full bg-navy-900 hover:bg-navy-800 text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
