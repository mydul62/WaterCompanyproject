"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Droplet,
  ShieldCheck,
  RotateCcw,
  GlassWater,
  Sparkles,
  Check,
} from "lucide-react";

interface SlideData {
  id: number;
  titleLines: string[];
  description: string;
  primaryBtn: {
    label: string;
    href?: string;
    action?: "open-rfq" | "scroll";
  };
  secondaryBtn: {
    label: string;
    href: string;
  };
  bottleImage: string;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    titleLines: ["Always Want Safe", "and Good Water", "for Healthy Life"],
    description:
      "Excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit.",
    primaryBtn: {
      label: "Our Services",
      href: "#features",
    },
    secondaryBtn: {
      label: "Discover",
      href: "/products",
    },
    bottleImage: "/acuasafe/water-bottle-splash.jpg",
  },
  {
    id: 2,
    titleLines: ["Pure & Mineral Rich", "Drinking Water", "For Healthy Family"],
    description:
      "Advanced 5-stage reverse osmosis filtration ensuring 100% chlorine-free, pure natural hydration for everyday life.",
    primaryBtn: {
      label: "Order Bottled Water",
      href: "/products",
    },
    secondaryBtn: {
      label: "Purity Standards",
      href: "/sustainability",
    },
    bottleImage: "/acuasafe/water-bottle-splash.jpg",
  },
  {
    id: 3,
    titleLines: ["Fast & Reliable", "Commercial Delivery", "Anytime, Anywhere"],
    description:
      "Scheduled deliveries, bulk 5-gallon jars, automated subscriptions, and sanitized dispenser maintenance.",
    primaryBtn: {
      label: "Request A Quote",
      action: "open-rfq",
    },
    secondaryBtn: {
      label: "Explore Catalog",
      href: "/products",
    },
    bottleImage: "/acuasafe/water-bottle-splash.jpg",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const touchStartX = useRef(0);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  // Auto slide interval (pauses on hover)
  const startTimer = () => {
    stopTimer();
    autoPlayTimer.current = setInterval(() => {
      handleNextSlide();
    }, 6500);
  };

  const stopTimer = () => {
    if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [currentSlide]);

  // Monitor scroll for scroll-to-top floating button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeSlide = (newIndex: number) => {
    if (isAnimating || newIndex === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(newIndex);
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  const handleNextSlide = () => {
    changeSlide((currentSlide + 1) % SLIDES.length);
  };

  const handlePrevSlide = () => {
    changeSlide((currentSlide - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) handleNextSlide();
      else handlePrevSlide();
    }
  };

  const triggerRFQ = () => {
    window.dispatchEvent(new CustomEvent("open-rfq"));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeSlide = SLIDES[currentSlide];

  return (
    <div
      id="hero"
      className="relative w-full bg-white select-none overflow-hidden"
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 
        ========================================================================
        HERO BANNER WRAPPER WITH TOP & BOTTOM ORGANIC WATER WAVES
        ========================================================================
      */}
      <div className="relative w-full bg-gradient-to-br from-[#06339f] via-[#0941ba] to-[#042880] text-white pt-10 sm:pt-16 pb-36 sm:pb-44 lg:pb-52 overflow-hidden">
        {/* Subtle Top Organic Wave Cutout */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none opacity-95">
          <svg
            viewBox="0 0 1440 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-8 sm:h-12 text-white fill-current"
            preserveAspectRatio="none"
          >
            <path d="M0,0 L1440,0 L1440,24 C1160,56 860,10 640,38 C380,72 160,20 0,38 Z" />
          </svg>
        </div>

        {/* Ambient Water Light Glow behind the bottle */}
        <div className="absolute right-[5%] lg:right-[12%] top-1/2 -translate-y-1/2 w-[480px] sm:w-[650px] lg:w-[780px] h-[480px] sm:h-[650px] lg:h-[780px] bg-[#1a5ee6]/35 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute left-[10%] bottom-[15%] w-[320px] h-[320px] bg-[#00c2e8]/15 rounded-full blur-[90px] pointer-events-none" />

        {/* Main Content Grid */}
        <div className="relative z-20 max-w-[1638px] mx-auto px-6 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[480px] sm:min-h-[520px] lg:min-h-[580px]">
            {/* 
              LEFT COLUMN: Animated Text & Buttons (Coming from bottom smoothly)
            */}
            <div className="lg:col-span-7 flex flex-col justify-center pt-4 lg:pt-0">
              <div key={`text-${currentSlide}`} className="flex flex-col">
                {/* Headline: Slide in from bottom smoothly with custom easing */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[68px] font-extrabold text-white leading-[1.12] tracking-tight drop-shadow-md animate-in fade-in slide-in-from-bottom-12 duration-700 ease-out fill-mode-both">
                  {activeSlide.titleLines.map((line, lIdx) => (
                    <span key={lIdx} className="block">
                      {line}
                    </span>
                  ))}
                </h1>

                {/* Subtitle: Slide in from bottom with slight delay */}
                <p
                  className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-[19px] text-[#e0edff] max-w-[560px] leading-relaxed drop-shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both"
                  style={{ animationDelay: "120ms" }}
                >
                  {activeSlide.description}
                </p>

                {/* Action Buttons: Slide in from bottom smoothly */}
                <div
                  className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-5 animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out fill-mode-both"
                  style={{ animationDelay: "240ms" }}
                >
                  {/* Primary CTA (Cyan Pill) */}
                  {activeSlide.primaryBtn.action === "open-rfq" ? (
                    <button
                      onClick={triggerRFQ}
                      className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#00c2e8] hover:bg-[#00acc1] text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_10px_28px_rgba(0,194,232,0.45)] transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 group"
                    >
                      <span>{activeSlide.primaryBtn.label}</span>
                      <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
                    </button>
                  ) : (
                    <Link
                      href={activeSlide.primaryBtn.href || "#features"}
                      className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#00c2e8] hover:bg-[#00acc1] text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_10px_28px_rgba(0,194,232,0.45)] transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                      {activeSlide.primaryBtn.label}
                    </Link>
                  )}

                  {/* Secondary CTA (Dark Navy Pill with soft border) */}
                  <Link
                    href={activeSlide.secondaryBtn.href}
                    className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#031d54]/75 hover:bg-[#031d54] border border-white/25 text-white font-bold text-sm sm:text-base tracking-wide shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    {activeSlide.secondaryBtn.label}
                  </Link>
                </div>
              </div>
            </div>

            {/* 
              RIGHT COLUMN: Water Bottle & Splash (Slide in from bottom smoothly)
            */}
            <div className="lg:col-span-5 flex items-center justify-center relative mt-4 lg:mt-0">
              <div
                key={`bottle-${currentSlide}`}
                className="relative w-full max-w-[480px] sm:max-w-[540px] aspect-[4/3] sm:aspect-[1/1] flex items-center justify-center animate-in fade-in slide-in-from-bottom-16 duration-800 ease-out fill-mode-both"
                style={{ animationDelay: "150ms" }}
              >
                {/* Water Bottle with Splash Image */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_100%)]">
                  <Image
                    src={activeSlide.bottleImage}
                    alt="Acuasafe Pure 5-Gallon Bottled Water with Splash"
                    fill
                    className="object-contain object-center scale-105 sm:scale-110 drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                    priority
                  />
                </div>

                {/* Gentle floating water droplet badges */}
                <div className="absolute top-6 right-4 sm:right-8 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-2 text-xs font-bold text-white shadow-lg animate-pulse hidden sm:flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-[#00c2e8] fill-[#00c2e8]" />
                  <span>100% Pure H₂O</span>
                </div>
              </div>
            </div>
          </div>

          {/* 
            SLIDER CONTROLS (Dots & Arrows at bottom of hero)
          */}
          <div className="mt-8 sm:mt-12 flex items-center justify-between">
            {/* Interactive Smooth Slider Dots */}
            <div className="flex items-center gap-3">
              {SLIDES.map((_, dotIdx) => {
                const isActive = currentSlide === dotIdx;
                return (
                  <button
                    key={dotIdx}
                    onClick={() => changeSlide(dotIdx)}
                    className={`h-3 rounded-full transition-all duration-500 ${
                      isActive
                        ? "w-10 bg-[#00c2e8] shadow-[0_0_12px_rgba(0,194,232,0.8)]"
                        : "w-3 bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                );
              })}
            </div>

            {/* Prev / Next Chevrons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevSlide}
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-[#00c2e8] text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextSlide}
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-[#00c2e8] text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 
          BOTTOM ORGANIC WATER WAVE CUTOUT
        */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg
            viewBox="0 0 1440 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-14 sm:h-20 lg:h-24 text-white fill-current"
            preserveAspectRatio="none"
          >
            <path d="M0,32 C240,85 480,95 720,55 C960,15 1200,65 1440,32 L1440,96 L0,96 Z" />
          </svg>
        </div>
      </div>

      {/* 
        ========================================================================
        BOTTOM FLOATING CARD: "A Trusted Name In Bottled Water Industry"
        (Matches Screenshot a98e2658.jpg - Comes from bottom smoothly)
        ========================================================================
      */}
      <div id="features" className="relative z-30 -mt-20 sm:-mt-28 max-w-[1340px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,34,102,0.14)] border border-slate-100 p-8 sm:p-12 lg:p-14 animate-in fade-in slide-in-from-bottom-12 duration-800 ease-out fill-mode-both">
          {/* Card Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f172a] text-center tracking-tight mb-10 sm:mb-14">
            A Trusted Name In Bottled Water Industry
          </h2>

          {/* 4 Feature Columns with Custom Wavy Dividers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 items-start">
            {/* 1. Maxium Purity */}
            <div className="flex flex-col items-center text-center px-4 group">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-[#00c2e8] mb-5 transition-transform duration-300 group-hover:scale-110">
                {/* Concentric ripple droplet SVG */}
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="#00c2e8"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M24 6C24 6 12 22 12 29C12 35.6 17.4 41 24 41C30.6 41 36 35.6 36 29C36 22 24 6 24 6Z" />
                  <path d="M19 32C19.5 34 21.5 36 24 36" />
                  <path d="M6 38C10 42 16 44 24 44C32 44 38 42 42 38" strokeDasharray="3 3" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#0f172a] mb-2">Maxium Purity</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-[220px]">
                Lorem ipsum dolor sit amet adipelit sed eiusmte.
              </p>
            </div>

            {/* 2. Cholorine Free */}
            <div className="relative flex flex-col items-center text-center px-4 group">
              {/* Left Wavy Divider for large screens */}
              <div className="hidden lg:block absolute -left-2 top-4 bottom-4 w-4 pointer-events-none opacity-40">
                <svg width="12" height="100%" viewBox="0 0 12 120" preserveAspectRatio="none">
                  <path
                    d="M6,0 Q12,15 6,30 T6,60 T6,90 T6,120"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <div className="w-16 h-16 rounded-full flex items-center justify-center text-[#00c2e8] mb-5 transition-transform duration-300 group-hover:scale-110">
                {/* Cupped hands holding water SVG */}
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="#00c2e8"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M24 10C24 10 18 20 18 24C18 27.3 20.7 30 24 30C27.3 30 30 27.3 30 24C30 20 24 10 24 10Z" />
                  <path d="M8 28C10 34 16 38 24 38C32 38 38 34 40 28" />
                  <path d="M12 24C10 20 6 22 6 26C6 32 14 38 20 40" />
                  <path d="M36 24C38 20 42 22 42 26C42 32 34 38 28 40" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#0f172a] mb-2">Cholorine Free</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-[220px]">
                Lorem ipsum dolor sit amet adipelit sed eiusmte.
              </p>
            </div>

            {/* 3. 5 Steps Filtration */}
            <div className="relative flex flex-col items-center text-center px-4 group">
              {/* Left Wavy Divider */}
              <div className="hidden lg:block absolute -left-2 top-4 bottom-4 w-4 pointer-events-none opacity-40">
                <svg width="12" height="100%" viewBox="0 0 12 120" preserveAspectRatio="none">
                  <path
                    d="M6,0 Q12,15 6,30 T6,60 T6,90 T6,120"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <div className="w-16 h-16 rounded-full flex items-center justify-center text-[#00c2e8] mb-5 transition-transform duration-300 group-hover:scale-110">
                {/* 3 Arrows Triangle Recycle Filtration SVG */}
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="#00c2e8"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M24 8L16 22H32L24 8Z" />
                  <path d="M14 26L6 38H22L14 26Z" />
                  <path d="M34 26L26 38H42L34 26Z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#0f172a] mb-2">5 Steps Filtration</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-[220px]">
                Lorem ipsum dolor sit amet adipelit sed eiusmte.
              </p>
            </div>

            {/* 4. Healthy Water */}
            <div className="relative flex flex-col items-center text-center px-4 group">
              {/* Left Wavy Divider */}
              <div className="hidden lg:block absolute -left-2 top-4 bottom-4 w-4 pointer-events-none opacity-40">
                <svg width="12" height="100%" viewBox="0 0 12 120" preserveAspectRatio="none">
                  <path
                    d="M6,0 Q12,15 6,30 T6,60 T6,90 T6,120"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <div className="w-16 h-16 rounded-full flex items-center justify-center text-[#00c2e8] mb-5 transition-transform duration-300 group-hover:scale-110">
                {/* Clean Water Glass SVG */}
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="#00c2e8"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 8L15 40H33L36 8H12Z" />
                  <path d="M14 20C18 22 30 18 34 20" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#0f172a] mb-2">Healthy Water</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-[220px]">
                Lorem ipsum dolor sit amet adipelit sed eiusmte.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        FLOATING SCROLL-TO-TOP BUTTON (Cyan Square matching a98e2658.jpg)
        ========================================================================
      */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-11 h-11 rounded-lg bg-[#00c2e8] hover:bg-[#00acc1] text-white flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 animate-in fade-in zoom-in-75"
          aria-label="Scroll to top"
          title="Back to top"
        >
          <ChevronUp className="w-6 h-6 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
}
