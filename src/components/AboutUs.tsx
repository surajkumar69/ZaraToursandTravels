import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function AboutUs() {
  const features = [
    "Comfortable Vehicles",
    "Experienced Drivers",
    "Reliable Service",
    "Family & Group Travel",
    "Local Ooty Expertise",
    "Affordable Travel Options"
  ];

  return (
    <section id="about" className="py-20 bg-white text-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-width Banner Image uploaded by User */}
        <div className="w-full mb-12 rounded-3xl overflow-hidden shadow-2xl relative bg-slate-100 border border-gray-100">
          <img 
            src="/images/about.jpg" 
            alt="Zara Tours and Travels - Your Trusted Travel Partner in Ooty" 
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          {/* Main Description */}
          <div className="lg:col-span-2">
            <h4 className="text-gold-500 font-bold uppercase tracking-wider mb-4">About Zara Tours & Travels</h4>
            <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
              Based in Ketti, Ooty, we are a trusted local travel service offering comfortable and reliable transportation for sightseeing, family trips, group tours, outstation journeys, and special travel requirements. We are dedicated to making every journey memorable, safe, and entirely hassle-free for you and your family.
            </p>
            
            <div className="mt-8">
              <a href="#vehicles" className="inline-block bg-navy-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-navy-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                View Our Fleet
              </a>
            </div>
          </div>

          {/* Features Sidebar */}
          <div className="lg:col-span-1 bg-slate-50 p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-navy-900 mb-6 border-b border-gray-200 pb-4">Our Highlights</h3>
            <div className="flex flex-col gap-5">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-600 shrink-0" size={24} />
                  <span className="font-medium text-gray-800">{feature}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
