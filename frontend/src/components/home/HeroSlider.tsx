"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface HeroSlide {
  id: string;
  badge: string;
  titleLight: string;
  titleBold: string;
  outlineText: string;
  description: string;
  bgGradient: string;
  image: string;
  hasLeaves?: boolean;
}

const SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    badge: "💧 Safe Drinking Water",
    titleBold: "Beyond",
    titleLight: "water",
    outlineText: "Bottle Purity",
    description: "Multi-stage purified, mineral-balanced drinking water for homes, offices and businesses.",
    bgGradient: "radial-gradient(ellipse at 70% 90%, #f3e6dc, transparent 60%), linear-gradient(#8f8178, #d9c8bb)",
    image: "/images/hero-bottle-sky.jpg",
  },
  {
    id: "slide-2",
    badge: "🌿 Natural & Fresh",
    titleBold: "Beyond",
    titleLight: "water",
    outlineText: "Deliver Freshness",
    description: "From our modern plant to your doorstep, fresh water delivered on time, every time.",
    bgGradient: "linear-gradient(#4f7f96, #9fe0f2 55%, #d7f1fb)",
    image: "/images/hero-bottle-splash.jpg",
    hasLeaves: true,
  },
  {
    id: "slide-3",
    badge: "🏭 Bulk & Private Label",
    titleBold: "Beyond",
    titleLight: "water",
    outlineText: "Protect Health",
    description: "20-litre jars and custom-label bottles for hotels, events and corporate partners.",
    bgGradient: "linear-gradient(#7b8794, #c9dae6 60%, #e3eef5)",
    image: "/images/hero-water-glass.jpg",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const touchStartX = useRef(0);

  // Auto slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const goToSlide = (idx: number) => {
    setCurrentSlide((idx + SLIDES.length) % SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      goToSlide(currentSlide + (dx < 0 ? 1 : -1));
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-[100svh] min-h-[640px] overflow-hidden text-white select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide Tracks */}
      <div className="absolute inset-0 w-full h-full">
        {SLIDES.map((slide, idx) => {
          const isActive = currentSlide === idx;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
              style={{ background: slide.bgGradient }}
            >
              {/* Pristine High-Resolution Background Photo Layer */}
              <div className="absolute inset-0 w-full h-full opacity-80 mix-blend-multiply">
                <Image
                  src={slide.image}
                  alt={slide.outlineText}
                  fill
                  className="object-cover object-center"
                  priority={idx === 0}
                />
              </div>

              {/* Cloud Blur Accents */}
              <div
                className="cloud absolute bg-white/70 rounded-full pointer-events-none"
                style={{
                  left: idx === 0 ? "5%" : idx === 1 ? "-5%" : "10%",
                  bottom: idx === 0 ? "-8%" : idx === 1 ? "5%" : "-10%",
                  width: idx === 0 ? "50%" : idx === 1 ? "45%" : "60%",
                  height: "30%",
                  filter: "blur(28px)",
                }}
              />

              {/* Floating Leaves (Slide 2) */}
              {slide.hasLeaves && (
                <>
                  <div className="floating-leaf" style={{ left: "4%", top: "24%" }} />
                  <div
                    className="floating-leaf"
                    style={{ left: "46%", top: "44%", animationDelay: "1s" }}
                  />
                  <div
                    className="floating-leaf"
                    style={{ right: "12%", top: "36%", animationDelay: "2s" }}
                  />
                </>
              )}

              {/* Slide Content Overlay */}
              <div className="relative z-20 w-full h-full max-w-[1638px] mx-auto px-6 sm:px-12 flex items-center">
                <div
                  className={`max-w-[640px] drop-shadow-[0_3px_12px_rgba(0,0,0,0.25)] transition-all duration-700 ${
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  {/* Badge */}
                  <span className="inline-block px-4 py-2 rounded-full bg-white/22 backdrop-blur-md border border-white/40 text-[13px] font-semibold mb-5 shadow-sm">
                    {slide.badge}
                  </span>

                  {/* Title Line 1: Beyond water */}
                  <div className="text-[clamp(44px,7vw,86px)] font-extrabold leading-none tracking-tight">
                    {slide.titleBold}{" "}
                    <small className="text-[0.55em] font-medium opacity-90">
                      {slide.titleLight}
                    </small>
                  </div>

                  {/* Title Line 2: we Bottle Purity */}
                  <div className="mt-4 text-[clamp(28px,4.5vw,54px)] font-bold flex flex-wrap items-baseline gap-3">
                    <span>we</span>
                    <span className="out">{slide.outlineText}</span>
                  </div>

                  {/* Subtitle Description */}
                  <p className="text-base sm:text-lg text-white/95 max-w-[480px] my-6 leading-relaxed">
                    {slide.description}
                  </p>

                  {/* Action Buttons matching snippet */}
                  <div className="flex items-center gap-3.5 flex-wrap pt-1">
                    <a
                      href="#products"
                      className="px-7 py-3 rounded-full bg-white text-[#0b2a5c] font-bold text-sm sm:text-base hover:scale-105 transition-transform shadow-lg"
                    >
                      Explore Products
                    </a>
                    <a
                      href="#overview"
                      className="px-7 py-3 rounded-full bg-white/18 text-white font-bold text-sm sm:text-base border-2 border-white/75 hover:bg-white/25 transition-all shadow-md backdrop-blur-sm"
                    >
                      Get a Quote
                    </a>
                  </div>
                </div>

                {/* Decorative Bottle Cluster on the Right (as specified in snippet) */}
                <div className="hidden lg:flex absolute right-[8%] bottom-[14%] items-end gap-2.5 pointer-events-none opacity-85">
                  <div className="bt-bottle w-[70px] h-[150px]" />
                  <div className="bt-bottle w-[90px] h-[220px]" />
                  <div className="bt-bottle w-[130px] h-[300px]" />
                  <div className="bt-bottle w-[100px] h-[190px]" />
                  <div className="bt-bottle w-[60px] h-[120px]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pulsing Video Play Button in Center-Bottom */}
      <button
        onClick={() => setIsVideoOpen(true)}
        className="play-btn"
        aria-label="Play facility presentation video"
      />

      {/* Navigation Arrow: Previous (‹) */}
      <button
        onClick={() => goToSlide(currentSlide - 1)}
        className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/55 text-white text-3xl items-center justify-center hover:bg-white hover:text-[#0b2a5c] transition-all z-30 shadow-xl cursor-pointer"
        aria-label="Previous Slide"
      >
        &#8249;
      </button>

      {/* Navigation Arrow: Next (›) */}
      <button
        onClick={() => goToSlide(currentSlide + 1)}
        className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/55 text-white text-3xl items-center justify-center hover:bg-white hover:text-[#0b2a5c] transition-all z-30 shadow-xl cursor-pointer"
        aria-label="Next Slide"
      >
        &#8250;
      </button>

      {/* Progress Bars / Dots at bottom center */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-30">
        {SLIDES.map((_, idx) => (
          <div
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`progress-dot ${currentSlide === idx ? "active" : ""}`}
            title={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Counter indicator in bottom right matching snippet */}
      <div className="hidden sm:block absolute right-10 bottom-7 text-white font-bold tracking-widest text-sm z-30">
        0{currentSlide + 1} / 0{SLIDES.length}
      </div>

      {/* Video Modal Triggered by Play Button */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <div className="flex items-center justify-between p-3.5 bg-neutral-900 text-white">
              <span className="text-xs font-bold uppercase tracking-wider">
                AquaPure &bull; Pure Water Manufacturing Plant Tour
              </span>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-1 rounded text-neutral-400 hover:text-white"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="AquaPure Facility Tour"
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
