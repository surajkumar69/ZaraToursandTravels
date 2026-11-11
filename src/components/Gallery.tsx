"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import Image from "next/image";
import {
  attachLightDismissFallback,
  closeDialogSmoothly,
} from "@/lib/dialogUtils";

const galleryItems = [
  {
    src: "/images/gallery1.jpg",
    title: "Group Pilgrimage & Holiday Tours",
    alt: "Happy group of travelers with Zara Tours & Travels tourist coach during a journey",
  },
  {
    src: "/images/gallery2.jpg",
    title: "Family Hill-Station Adventures",
    alt: "Families smiling together beside Zara Tours SUVs at an Ooty mountain viewpoint",
  },
  {
    src: "/images/gallery3.jpg",
    title: "Dual-Fleet Mountain Readiness",
    alt: "Two Zara Tours SUVs outfitted for family luggage at a misty Nilgiris overlook",
  },
  {
    src: "/images/gallery4.jpg",
    title: "Scenic Nilgiris Highway Drives",
    alt: "Zara Tours & Travels silver MPV parked beside emerald Nilgiris tea slopes",
  },
];

export default function Gallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  };

  const closeLightbox = useCallback(async () => {
    await closeDialogSmoothly(dialogRef.current);
  }, []);

  const showPrev = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryItems.length - 1 : prev - 1
    );
  }, []);

  const showNext = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === galleryItems.length - 1 ? 0 : prev + 1
    );
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      void closeLightbox();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!dialog.open) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        showNext();
      }
    };

    const detachFallback = attachLightDismissFallback(dialog, () => {
      void closeLightbox();
    });

    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("keydown", handleKeyDown);

    return () => {
      detachFallback();
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeLightbox, showPrev, showNext]);

  const activeItem = galleryItems[currentImageIndex];

  return (
    <section
      id="gallery"
      className="py-20 md:py-28 bg-ivory-50 text-charcoal-900 border-t border-ivory-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-champagne-600 font-semibold uppercase tracking-[0.2em] text-xs mb-3">
            Memories On The Road
          </p>
          <h2
            className="font-display font-bold text-forest-900 text-balance mb-4"
            style={{ fontSize: "clamp(2rem, 1.4rem + 2.2vw, 3.25rem)" }}
          >
            Our Gallery
          </h2>
          <p className="text-charcoal-600 max-w-2xl mx-auto text-base sm:text-lg text-pretty">
            Real journeys, smiling families, and our trusted vehicles across the
            hills of Ooty and South India.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {galleryItems.map((item, idx) => (
            <button
              key={item.src}
              type="button"
              onClick={() => openLightbox(idx)}
              aria-label={`View larger photograph: ${item.title}`}
              className="group relative h-[300px] sm:h-[360px] md:h-[400px] w-full overflow-hidden rounded-3xl cursor-pointer shadow-md hover:shadow-[0_20px_45px_rgba(7,22,16,0.16)] border border-ivory-200 bg-forest-950 text-left transition-all"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/15 to-transparent opacity-85 group-hover:opacity-95 transition-opacity"
              />
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-forest-950/75 backdrop-blur-md border border-champagne-400/40 text-champagne-300 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity">
                <Expand className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="absolute bottom-5 left-6 right-6 text-ivory-50">
                <p className="text-xs uppercase tracking-[0.16em] text-champagne-300 font-semibold mb-1">
                  Authentic Journey
                </p>
                <p className="font-display text-xl sm:text-2xl font-bold">
                  {item.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Accessible Native Modal Lightbox */}
      <dialog
        ref={dialogRef}
        aria-labelledby="lightbox-caption"
        {...({ closedby: "any" } as Record<string, string>)}
        className="luxury-dialog m-auto max-w-5xl w-[calc(100vw-2rem)] bg-transparent p-0 border-0 overflow-visible"
      >
        <div className="relative bg-forest-950 border border-champagne-400/30 rounded-3xl overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-5 py-4 border-b border-ivory-100/10 bg-forest-950/90 text-ivory-50">
            <div>
              <h3
                id="lightbox-caption"
                className="font-display text-xl font-bold text-ivory-50"
              >
                {activeItem.title}
              </h3>
              <p className="text-xs text-champagne-300">
                Photo {currentImageIndex + 1} of {galleryItems.length}
              </p>
            </div>
            <button
              type="button"
              onClick={() => void closeLightbox()}
              aria-label="Close gallery lightbox"
              autoFocus
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full bg-forest-800 hover:bg-forest-700 text-ivory-50 hover:text-champagne-300 border border-ivory-100/15 transition-colors"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative w-full h-[65vh] sm:h-[72vh] bg-charcoal-950">
            <Image
              src={activeItem.src}
              alt={activeItem.alt}
              fill
              sizes="90vw"
              className="object-contain"
            />

            <button
              type="button"
              onClick={showPrev}
              aria-label="Previous photograph"
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 min-h-[48px] min-w-[48px] rounded-full bg-forest-950/80 hover:bg-forest-900 text-ivory-50 hover:text-champagne-300 border border-champagne-400/35 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next photograph"
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 min-h-[48px] min-w-[48px] rounded-full bg-forest-950/80 hover:bg-forest-900 text-ivory-50 hover:text-champagne-300 border border-champagne-400/35 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
