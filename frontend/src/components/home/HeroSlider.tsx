"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

const HERO_DATA = [
  {
    id: "slide-1",
    image: "/images/hero-bottle-sky.jpg",
    line1Bold: "Beyond",
    line1Light: "packaging",
    line2We: "we",
    line2Outline: "Drive Innovation",
  },
  {
    id: "slide-2",
    image: "/images/hero-bottle-splash.jpg",
    line1Bold: "Beyond",
    line1Light: "packaging",
    line2We: "we",
    line2Outline: "Craft Solution",
  },
  {
    id: "slide-3",
    image: "/images/hero-water-glass.jpg",
    line1Bold: "Beyond",
    line1Light: "packaging",
    line2We: "we",
    line2Outline: "Shape the Future",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_DATA.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_DATA[currentSlide];

  return (
    <section className="relative w-full h-[600px] sm:h-[720px] lg:h-[820px] bg-[#d9d4cc] overflow-hidden select-none">
      {/* Dynamic Background Image - Using the user-provided pristine high-res images */}
      <div className="absolute inset-0 w-full h-full">
        {HERO_DATA.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100 z-0" : "opacity-0 -z-10"
            }`}
          >
            <Image
              src={item.image}
              alt={item.line2Outline}
              fill
              className="object-cover object-center"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Hero Content Overlay matching Screenshot 2026-11-04 130237.png */}
      <div className="relative z-10 w-full h-full max-w-[1480px] mx-auto px-6 sm:px-12 flex flex-col justify-between pt-36 sm:pt-44 pb-8 pointer-events-none">
        {/* Left Side: Exact Typography ("Beyond packaging / we Drive Innovation") */}
        <div className="flex-1 flex items-center">
          <div className="space-y-1 sm:space-y-2 pointer-events-auto max-w-2xl pl-2 sm:pl-8">
            {/* Line 1 */}
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
              <span className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]">
                {slide.line1Bold}
              </span>
              <span className="text-3xl sm:text-5xl lg:text-6xl font-medium text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]">
                {slide.line1Light}
              </span>
            </div>

            {/* Line 2 with Hollow Stroke Outline Text */}
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
              <span className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]">
                {slide.line2We}
              </span>
              <span
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "2px #ffffff",
                }}
              >
                {slide.line2Outline}
              </span>
            </div>
          </div>
        </div>

        {/* Center Circular Video Play Button matching Screenshots */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          <button
            onClick={() => setIsVideoOpen(true)}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1b2229]/85 hover:bg-black text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95"
            aria-label="Play Facility Video"
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
              aria-label={`Slide ${idx + 1}`}
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
                Xclusive Can Limited &bull; Cleanroom &amp; Packaging Facility
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
