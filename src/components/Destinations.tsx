const destinations = [
  { name: "Ooty", image: "/images/dest_ooty.jpg", desc: "The Queen of Hill Stations" },
  { name: "Coonoor", image: "/images/dest_coonoor.jpg", desc: "Tea gardens and scenic valleys" },
  { name: "Ketti Valley", image: "/images/dest_ketti.jpg", desc: "The Switzerland of Southern India" },
  { name: "Kotagiri", image: "/images/dest_kotagiri.jpg", desc: "Peaceful hill retreat" },
  { name: "Coimbatore", image: "/images/dest_coimbatore.jpg", desc: "The Manchester of South India" },
  { name: "Mysore", image: "/images/dest_mysore.jpg", desc: "City of Palaces" },
  { name: "Bangalore", image: "/images/dest_bangalore.jpg", desc: "The Garden City" },
  { name: "Wayanad", image: "/images/dest_wayanad.jpg", desc: "Nature's own paradise" },
];

export default function Destinations() {
  return (
    <section id="destinations" className="py-20 bg-white text-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h4 className="text-gold-500 font-bold uppercase tracking-wider mb-2">Discover Places</h4>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Beautiful Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We provide comfortable travel options to all major destinations across South India.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, idx) => (
            <div key={idx} className="group relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url('${dest.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-1">{dest.name}</h3>
                <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {dest.desc}
                </p>
                <a 
                  href="#booking"
                  className="inline-block text-gold-400 font-semibold text-sm uppercase tracking-wider hover:text-gold-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"
                >
                  Plan Your Trip &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
