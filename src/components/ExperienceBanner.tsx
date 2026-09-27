export default function ExperienceBanner() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/images/banner.jpg')" }}
      />
      <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Travel More. Explore More. <br />
          <span className="text-gold-400">Worry Less.</span>
        </h2>
        
        <p className="text-xl text-gray-300 mb-10 text-balance">
          From local sightseeing in Ooty to long-distance group journeys, we make your travel comfortable and hassle-free.
        </p>

        <a 
          href="#booking"
          className="inline-block bg-gold-500 hover:bg-gold-400 text-navy-900 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-gold-500/25"
        >
          Book Your Journey
        </a>
      </div>
    </section>
  );
}
