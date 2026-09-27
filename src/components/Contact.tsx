import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white text-navy-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h4 className="text-gold-500 font-bold uppercase tracking-wider mb-2">Get In Touch</h4>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Plan Your Journey With Us</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="bg-slate-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold mb-8">ZARA TOURS & TRAVELS</h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="bg-gold-100 text-gold-600 p-3 rounded-full shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Phone</p>
                  <p className="text-lg font-semibold">8523923843</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold-100 text-gold-600 p-3 rounded-full shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Email</p>
                  <p className="text-lg font-semibold">Dhanushjr279@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold-100 text-gold-600 p-3 rounded-full shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Location</p>
                  <p className="text-lg font-semibold">Bharathi Nagar, Ketti, Ooty,<br />Tamil Nadu, India</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:8523923843"
                className="flex-1 bg-navy-900 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-navy-800 transition-colors"
              >
                <Phone size={18} /> Call Now
              </a>
              <a 
                href="https://wa.me/918523923843"
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-green-700 transition-colors"
              >
                <MessageCircle size={18} /> WhatsApp Us
              </a>
              <a 
                href="mailto:Dhanushjr279@gmail.com"
                className="flex-1 bg-slate-200 text-navy-900 py-3 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-slate-300 transition-colors"
              >
                <Mail size={18} /> Send Email
              </a>
            </div>
          </div>

          {/* Map area */}
          <div className="bg-slate-200 rounded-3xl overflow-hidden shadow-inner h-[400px] lg:h-auto relative">
            {/* Visual representation of a map */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/map.jpg')" }}
            >
              <div className="absolute inset-0 bg-navy-900/40 backdrop-blur-[2px]" />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
                <MapPin className="text-gold-500" size={32} />
                <div className="text-left">
                  <p className="font-bold text-navy-900">Zara Tours & Travels</p>
                  <p className="text-xs text-gray-500">Ketti, Ooty</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
