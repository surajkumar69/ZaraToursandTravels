"use client";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

const galleryImages = [
  "/images/gallery1.jpg",
  "/images/gallery2.jpg",
  "/images/gallery3.jpg",
  "/images/gallery4.jpg",
];

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <section id="gallery" className="py-20 bg-slate-50 text-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h4 className="text-gold-500 font-bold uppercase tracking-wider mb-2">Memories</h4>
          <h2 className="text-3xl md:text-4xl font-bold">Our Gallery</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {galleryImages.map((src, idx) => (
            <div 
              key={idx} 
              className="relative h-[300px] md:h-[400px] overflow-hidden rounded-2xl cursor-pointer group shadow-lg"
              onClick={() => openLightbox(idx)}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                style={{ backgroundImage: `url('${src}')` }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>
          ))}
        </div>

      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-gold-400 z-50 transition-colors"
          >
            <X size={36} />
          </button>
          
          <div className="relative w-full max-w-5xl h-[80vh] px-4">
            <div 
              className="w-full h-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${galleryImages[currentImageIndex]}')` }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
