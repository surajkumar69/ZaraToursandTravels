import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ExperienceBanner() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden bg-forest-950">
      <Image
        src="/images/banner.jpg"
        alt="Winding mountain road curving through misty Nilgiris tea plantations at golden twilight"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-forest-950/70 backdrop-blur-[2px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-forest-950/85 via-forest-950/55 to-forest-950/85"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-ivory-50">
        <p className="text-xs uppercase tracking-[0.24em] text-champagne-300 font-semibold mb-4">
          Curated Nilgiris &amp; Outstation Journeys
        </p>
        <h2
          className="font-display font-bold mb-6 leading-[1.1] text-balance"
          style={{ fontSize: "clamp(2.1rem, 1.4rem + 3vw, 3.75rem)" }}
        >
          Travel More. Explore More.
          <span className="block italic text-champagne-300 mt-1">
            Worry Less.
          </span>
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-ivory-100/90 max-w-2xl mx-auto mb-10 text-pretty">
          From local sightseeing in Ooty to long-distance group journeys, we
          make your travel comfortable and hassle-free.
        </p>

        <a
          href="#booking"
          className="inline-flex items-center gap-2.5 min-h-[52px] bg-champagne-400 hover:bg-champagne-300 text-forest-950 px-8 py-3.5 rounded-full font-bold text-base sm:text-lg transition-all shadow-[0_14px_34px_rgba(7,22,16,0.45)] hover:-translate-y-0.5"
        >
          <span>Book Your Journey</span>
          <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
