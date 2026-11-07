"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Play, X, Sparkles } from "lucide-react";
import GlassyHeroCanvas from "./GlassyHeroCanvas";

const HERO_DATA = [
  {
    id: "slide-1",
    image: "/images/hero-bottle-sky.jpg",
    badge: "Sustainable Packaging & Industrial Solutions",
    line1Bold: "Beyond",
    line1Light: "packaging",
    line2We: "we",
    line2Outline: "Drive Innovation",
  },
  {
    id: "slide-2",
    image: "/images/hero-bottle-splash.jpg",
    badge: "Precision Engineered Bottles & Canisters",
    line1Bold: "Beyond",
    line1Light: "packaging",
    line2We: "we",
    line2Outline: "Craft Solution",
  },
  {
    id: "slide-3",
    image: "/images/hero-water-glass.jpg",
    badge: "Eco-Friendly High Performance Polymers",
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
    <section
      id="hero"
      className="relative w-full h-screen min-h-[700px] bg-[#0c1626] overflow-hidden select-none"
    >
      {/* Background Image Layer with Crossfade */}
      <div className="absolute inset-0 w-full h-full">
        {HERO_DATA.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100 z-0 scale-100" : "opacity-0 -z-10 scale-105"
            }`}
            style={{ transition: "opacity 1.2s ease-in-out, transform 8s ease-out" }}
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

      {/* Subtle Radial Glass Gradient Accents */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/25 pointer-events-none z-[5]" />
      <div className="absolute top-1/4 left-10 w-[420px] h-[420px] bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none z-[5]" />
      <div className="absolute bottom-1/4 right-10 w-[480px] h-[480px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-[5]" />

      {/* Three.js Interactive 3D Glass Orbs & Botanical Leaves Canvas */}
      <GlassyHeroCanvas />

      {/* Hero Content Overlay strictly constrained to fluid grand canvas */}
      <div className="relative z-20 w-[98%] h-full max-w-[1920px] mx-auto px-4 sm:px-8 flex flex-col justify-between pt-36 sm:pt-44 pb-12 pointer-events-none">
        {/* Left Side: Exact Typography with Frosted Glass Backdrop */}
        <div className="flex-1 flex items-center">
          <div className="space-y-4 pointer-events-auto max-w-2xl pl-2 sm:pl-8">
            {/* Glassy Tag Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/40 bg-white/20 backdrop-blur-md text-white text-sm sm:text-base font-bold shadow-lg shadow-black/10">
              <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
              <span>{slide.badge}</span>
            </div>

            {/* Typography */}
            <div className="space-y-1 sm:space-y-2">
              {/* Line 1 */}
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                <span className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]">
                  {slide.line1Bold}
                </span>
                <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-white/95 tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]">
                  {slide.line1Light}
                </span>
              </div>

              {/* Line 2 with Hollow Stroke Outline Text */}
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]">
                  {slide.line2We}
                </span>
                <span
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)] transition-all duration-300"
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
        </div>

        {/* Center Circular Glass Video Play Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          <div className="relative group">
            {/* Concentric Ambient Ripples */}
            <div className="absolute inset-0 rounded-full bg-cyan-400/25 blur-md animate-ping" style={{ animationDuration: "3s" }} />
            <div className="absolute -inset-3 rounded-full border border-white/35 backdrop-blur-sm group-hover:scale-125 transition-transform duration-500" />

            <button
              onClick={() => setIsVideoOpen(true)}
              className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-xl border-2 border-white/80 text-white flex items-center justify-center shadow-[0_0_40px_rgba(0,229,255,0.45)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Play Facility Video Tour"
            >
              <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-white text-white ml-1 drop-shadow-md group-hover:text-cyan-300 transition-colors" />
            </button>
          </div>
        </div>

        {/* Bottom Slide Indicators (Glass Capsule) */}
        <div className="flex items-center justify-center gap-2.5 pointer-events-auto">
          <div className="px-4 py-2 rounded-full bg-black/30 backdrop-blur-xl border border-white/20 flex items-center gap-2 shadow-lg">
            {HERO_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 transition-all rounded-full cursor-pointer ${
                  currentSlide === idx
                    ? "w-8 bg-cyan-400 shadow-[0_0_12px_rgba(0,229,255,0.8)]"
                    : "w-2.5 bg-white/40 hover:bg-white/80"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Glass Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl bg-neutral-900/90 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.8)] border border-white/25">
            <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-white/10 text-white">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Xclusive Can Limited &bull; Cleanroom &amp; Packaging Facility
              </span>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
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
