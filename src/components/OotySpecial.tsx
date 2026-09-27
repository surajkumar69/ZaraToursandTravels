export default function OotySpecial() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h4 className="text-gold-500 font-bold uppercase tracking-wider mb-2">Nilgiris Charm</h4>
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900">Discover the Beauty of Ooty</h2>
          </div>
          <a href="#booking" className="bg-navy-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-navy-800 transition-colors shrink-0">
            Plan Your Ooty Trip
          </a>
        </div>

        {/* Collage / Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-auto md:h-[600px]">
          
          <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-[url('/images/ooty_lake.jpg')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold">Ooty Lake</h3>
            </div>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden group h-48 md:h-auto">
            <div className="absolute inset-0 bg-[url('/images/ooty_tea.jpg')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-bold">Tea Gardens</h3>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden group h-48 md:h-auto">
            <div className="absolute inset-0 bg-[url('/images/ooty_peak.jpg')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-bold">Doddabetta Peak</h3>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden group h-48 md:h-auto">
            <div className="absolute inset-0 bg-[url('/images/dest_coonoor.jpg')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-bold">Coonoor</h3>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden group h-48 md:h-auto">
            <div className="absolute inset-0 bg-[url('/images/ooty_rail.jpg')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-bold">Mountain Railway</h3>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
