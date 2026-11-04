"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

const HERO_DATA = [
  {
    id: "slide-1",
    image: "/Infoimages/Screenshot 2026-11-04 130154.png",
    textPrefix: "Beyond packaging",
    textWe: "we",
    textOutline: "Craft Solution",
  },
  {
    id: "slide-2",
    image: "/Infoimages/Screenshot 2026-11-04 130302.png",
    textPrefix: "Beyond packaging",
    textWe: "we",
    textOutline: "Shape the Future",
  },
  {
    id: "slide-3",
    image: "/Infoimages/Screenshot 2026-11-04 130237.png",
    textPrefix: "Beyond packaging",
    textWe: "we",
    textOutline: "Drive Innovation",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_DATA.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_DATA[currentSlide];

  return (
    <section className="relative w-full h-[650px] sm:h-[750px] lg:h-[820px] bg-[#d9d4cc] overflow-hidden select-none">
      {/* Background Hero Image - Exactly matching Screenshots 1, 4, 5 */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={slide.image}
          alt={slide.textOutline}
          fill
          className="object-cover object-center transition-all duration-700"
          priority
        />
      </div>

      {/* Hero Interactive Elements Overlay */}
      <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-6 sm:px-12 flex flex-col justify-end pb-12 pointer-events-none">
        {/* Center Play Button Overlay (Clickable) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          <button
            onClick={() => setIsVideoOpen(true)}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1e242b]/90 hover:bg-black text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95"
            aria-label="Play Video"
          >
            <Play className="w-8 h-8 fill-white text-white ml-1" />
          </button>
        </div>

        {/* Bottom Slide Indicators (Dots) matching Screenshots */}
        <div className="flex items-center justify-center gap-2 pointer-events-auto">
          {HERO_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 transition-all rounded-full ${
                currentSlide === idx ? "w-8 bg-white" : "w-2.5 bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <div className="flex items-center justify-between p-3 bg-neutral-900 text-white">
              <span className="text-xs font-bold uppercase tracking-wider">
                Xclusive Can Limited &bull; Manufacturing Facility Tour
              </span>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-1 rounded text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Xclusive Can Limited Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
