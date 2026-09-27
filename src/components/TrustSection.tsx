import { ShieldCheck, HeartHandshake, Navigation, Wrench } from "lucide-react";

export default function TrustSection() {
  return (
    <section className="py-20 bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Travel With Confidence</h2>
          <div className="w-20 h-1 bg-gold-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-navy-800 rounded-full flex items-center justify-center mb-4 border border-white/10 text-gold-400">
              <HeartHandshake size={36} />
            </div>
            <h3 className="text-lg font-bold">Comfortable Travel</h3>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-navy-800 rounded-full flex items-center justify-center mb-4 border border-white/10 text-gold-400">
              <ShieldCheck size={36} />
            </div>
            <h3 className="text-lg font-bold">Reliable Service</h3>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-navy-800 rounded-full flex items-center justify-center mb-4 border border-white/10 text-gold-400">
              <Navigation size={36} />
            </div>
            <h3 className="text-lg font-bold">Professional Drivers</h3>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-navy-800 rounded-full flex items-center justify-center mb-4 border border-white/10 text-gold-400">
              <Wrench size={36} />
            </div>
            <h3 className="text-lg font-bold">Well-Maintained Vehicles</h3>
          </div>

        </div>
      </div>
    </section>
  );
}
