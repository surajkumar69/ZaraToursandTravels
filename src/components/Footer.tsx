export default function Footer() {
  return (
    <>
      {/* Final CTA */}
      <section className="bg-navy-800 text-white py-16 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready For Your Next Journey?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Book a comfortable vehicle and explore Ooty with Zara Tours & Travels.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#booking"
              className="bg-gold-500 hover:bg-gold-400 text-navy-900 px-8 py-3 rounded-full font-bold text-lg transition-colors shadow-lg"
            >
              Book Now
            </a>
            <a 
              href="tel:8523923843"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3 rounded-full font-bold text-lg transition-colors"
            >
              Call 8523923843
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
            
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/images/logo.jpg" 
                  alt="Zara Tours Logo" 
                  className="h-16 w-16 rounded-full object-cover border-2 border-gold-500 shadow-lg"
                />
                <h3 className="text-white text-xl font-bold tracking-wider leading-tight">
                  ZARA <br/><span className="text-gold-400">TOURS & TRAVELS</span>
                </h3>
              </div>
              <p className="text-sm italic text-gray-500 mb-4">“Your Journey, Our Priority”</p>
              <p className="text-sm">
                Trusted travel agency offering comfortable rides, local sightseeing, and outstation trips in and around Ooty.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#home" className="hover:text-gold-400 transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-gold-400 transition-colors">About Us</a></li>
                <li><a href="#vehicles" className="hover:text-gold-400 transition-colors">Vehicles</a></li>
                <li><a href="#services" className="hover:text-gold-400 transition-colors">Services</a></li>
                <li><a href="#destinations" className="hover:text-gold-400 transition-colors">Destinations</a></li>
                <li><a href="#gallery" className="hover:text-gold-400 transition-colors">Gallery</a></li>
                <li><a href="#contact" className="hover:text-gold-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm">
                <li>📞 <a href="tel:8523923843" className="hover:text-gold-400 transition-colors">8523923843</a></li>
                <li>📧 <a href="mailto:Dhanushjr279@gmail.com" className="hover:text-gold-400 transition-colors">Dhanushjr279@gmail.com</a></li>
                <li className="flex items-start gap-1">
                  <span className="shrink-0">📍</span> 
                  <span>Bharathi Nagar, Ketti, Ooty,<br />Tamil Nadu, India</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-white/10 text-center text-sm">
            <p>&copy; 2026 Zara Tours & Travels. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
