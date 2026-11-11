"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Play, X, Droplets } from "lucide-react";
import { siteButtonClass } from "@/components/common/SiteButton";
import { HeroSliderSkeleton } from "@/components/common/Skeletons";
import { api } from "@/lib/api";
import {
  HeroSlide,
  DEFAULT_HERO_BANNERS,
  LOCAL_BANNER_STORAGE_KEY,
  BANNERS_UPDATED_EVENT,
  normalizeHeroSlide,
  resolveBannerMediaUrl,
  getLocalBanners,
} from "@/data/heroBanners";

const DEFAULT_HERO_YOUTUBE_EMBED =
  "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0";

function resolveHeroVideoSource(rawUrl: string): {
  type: "youtube" | "video";
  src: string;
} {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return { type: "youtube", src: DEFAULT_HERO_YOUTUBE_EMBED };
  }

  const cleanPath = trimmed.split("?")[0].toLowerCase();
  if (
    cleanPath.endsWith(".mp4") ||
    cleanPath.endsWith(".webm") ||
    cleanPath.endsWith(".ogg") ||
    cleanPath.endsWith(".mov")
  ) {
    return { type: "video", src: trimmed };
  }

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.replace(/^www\./, "").toLowerCase();
    let youtubeId = "";

    if (host === "youtu.be") {
      youtubeId = parsed.pathname.split("/").filter(Boolean)[0] || "";
    } else if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtube-nocookie.com"
    ) {
      if (parsed.pathname.startsWith("/watch")) {
        youtubeId = parsed.searchParams.get("v") || "";
      } else if (
        parsed.pathname.startsWith("/embed/") ||
        parsed.pathname.startsWith("/shorts/")
      ) {
        youtubeId = parsed.pathname.split("/").filter(Boolean)[1] || "";
      }
    }

    if (youtubeId && /^[a-zA-Z0-9_-]{6,}$/.test(youtubeId)) {
      return {
        type: "youtube",
        src: `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`,
      };
    }

    return { type: "youtube", src: trimmed };
  } catch {
    return { type: "youtube", src: DEFAULT_HERO_YOUTUBE_EMBED };
  }
}

// Deterministic ambient bubble parameters so SSR and CSR hydrate identically
const AMBIENT_BUBBLES = [
  { left: "16%", bottom: "12%", size: 10, dur: "10.5s", delay: "0.4s" },
  { left: "24%", bottom: "26%", size: 7, dur: "13s", delay: "1.8s" },
  { left: "34%", bottom: "8%", size: 12, dur: "11.5s", delay: "3.1s" },
  { left: "43%", bottom: "20%", size: 8, dur: "9.8s", delay: "0.9s" },
  { left: "51%", bottom: "14%", size: 14, dur: "14s", delay: "2.4s" },
  { left: "60%", bottom: "45%", size: 9, dur: "12s", delay: "4.0s" },
  { left: "72%", bottom: "56%", size: 11, dur: "11s", delay: "1.3s" },
  { left: "86%", bottom: "62%", size: 8, dur: "13.5s", delay: "2.9s" },
  { left: "28%", bottom: "58%", size: 6, dur: "15s", delay: "5.2s" },
  { left: "47%", bottom: "65%", size: 9, dur: "12.5s", delay: "0.2s" },
];

export default function HeroSlider() {
  const [slides, setSlides] = useState<HeroSlide[]>(DEFAULT_HERO_BANNERS);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [globalVideoUrl, setGlobalVideoUrl] = useState("");

  const loadBanners = useCallback(async () => {
    try {
      const res = await api.banners.getPublic();
      if (Array.isArray(res?.data)) {
        const active = res.data
          .map((item, idx) => normalizeHeroSlide(item, idx))
          .filter((s) => s.isActive);
        setSlides(active.length > 0 ? active : DEFAULT_HERO_BANNERS);
        return;
      }
    } catch {
      const local = getLocalBanners();
      if (local) {
        const active = local.filter((s) => s.isActive);
        setSlides(active.length > 0 ? active : DEFAULT_HERO_BANNERS);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBanners();

    api.settings
      .getMap()
      .then((res) => {
        if (res?.data?.["hero_video_url"]) {
          setGlobalVideoUrl(res.data["hero_video_url"]);
        }
      })
      .catch(() => {});

    const handleBannerSync = () => {
      loadBanners();
    };
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_BANNER_STORAGE_KEY) {
        loadBanners();
      }
    };

    window.addEventListener(BANNERS_UPDATED_EVENT, handleBannerSync);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener(BANNERS_UPDATED_EVENT, handleBannerSync);
      window.removeEventListener("storage", handleStorage);
    };
  }, [loadBanners]);

  useEffect(() => {
    if (activeIndex >= slides.length && slides.length > 0) {
      setActiveIndex(0);
    }
  }, [slides.length, activeIndex]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsVideoOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Auto-advance slides every 7.5s (pauses only while video modal is open)
  useEffect(() => {
    if (isVideoOpen || slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 7500);
    return () => clearInterval(timer);
  }, [activeIndex, isVideoOpen, slides.length]);

  const safeIndex = activeIndex < slides.length ? activeIndex : 0;
  const currentSlide = slides[safeIndex] || DEFAULT_HERO_BANNERS[0];

  const bgImg = resolveBannerMediaUrl(
    currentSlide.backgroundImage || "/images/hero/hero-bubbles-bg.jpg"
  );
  const platformImg = resolveBannerMediaUrl(
    currentSlide.platformImage || "/images/hero/hero-splash-platform.jpg"
  );
  const fgImg = resolveBannerMediaUrl(currentSlide.foregroundImage);
  const secondaryImg = resolveBannerMediaUrl(
    currentSlide.secondaryImage || "/images/hero/bottle-horizontal.png"
  );

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100svh] lg:min-h-0 lg:h-full overflow-hidden bg-[#064B9D] select-none"
    >
      {loading && (
        <div className="absolute inset-0 z-40">
          <HeroSliderSkeleton />
        </div>
      )}
      {/* Stage 0 (0.0s): Full-Bleed Underwater Bubbles Background + Oceanic Depth */}
      <div className="hero-anim-bg absolute inset-0 z-0 pointer-events-none">
        <img
          src={bgImg}
          alt="Underwater blue ripples and rising bubbles"
          className="w-full h-full object-cover object-center"
        />
        {/* Gentle left vignette so white typography remains sharp at all widths */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#043F8E]/65 via-[#0752AC]/20 to-transparent"
        />
        {/* Ambient Rising Water Bubbles */}
        <div className="absolute inset-0 overflow-hidden">
          {AMBIENT_BUBBLES.map((b, idx) => (
            <span
              key={idx}
              style={
                {
                  left: b.left,
                  bottom: b.bottom,
                  width: `${b.size}px`,
                  height: `${b.size}px`,
                  "--bubble-dur": b.dur,
                  "--bubble-delay": b.delay,
                } as React.CSSProperties
              }
              className="hero-ambient-bubble absolute rounded-full border border-white/35 bg-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.45)]"
            />
          ))}
        </div>
      </div>

      {/* Far-Left Vertical Slide Strip (Desktop & Tablet) */}
      <aside
        aria-label="Hero slides navigation"
        className="hidden md:flex flex-col items-center justify-center gap-8 absolute left-0 top-0 bottom-0 w-[74px] lg:w-[82px] xl:w-[92px] bg-[#2163B5]/35 backdrop-blur-[2px] border-r border-white/10 z-30 pt-24"
      >
        {slides.map((slide, idx) => {
          const isActive = idx === safeIndex;
          const displayNum = slide.num || String(idx + 1).padStart(2, "0");
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`View slide ${displayNum}`}
              aria-current={isActive ? "true" : undefined}
              className={`text-[15px] xl:text-[16px] tracking-[0.06em] transition-all duration-300 cursor-pointer px-3 py-1.5 ${
                isActive
                  ? "text-[#062346] font-bold scale-110"
                  : "text-white/85 hover:text-white font-medium"
              }`}
            >
              {displayNum}
            </button>
          );
        })}
      </aside>

      {/* Main Slide Foreground Composition */}
      <div
        key={currentSlide.id}
        className="relative z-20 w-full min-h-[100svh] lg:min-h-0 lg:h-full flex flex-col justify-between lg:block"
      >
        {/* Left Content Column (matches site-wide w-[98%] max-w-[1920px] grid) */}
        <div className="w-[98%] max-w-[1920px] mx-auto flex-1 lg:flex-none lg:h-full px-4 sm:px-8 lg:px-12 pt-36 sm:pt-40 lg:pt-32 pb-6 lg:pb-12 flex items-center">
          <div className="w-full lg:w-[50%] pl-1 md:pl-16 lg:pl-14 xl:pl-16 z-20">
            {/* Stage 1 (0.35s+): Slow Staggered Headline Drop from Top */}
            <h1 className="font-hero-display text-white font-normal text-[38px] sm:text-[50px] lg:text-[60px] xl:text-[68px] leading-[1.12] tracking-[-0.01em] mb-6">
              {currentSlide.lines[0] && (
                <span className="hero-anim-line-1 block">
                  {currentSlide.lines[0]}
                </span>
              )}
              {currentSlide.lines[1] && (
                <span className="hero-anim-line-2 block">
                  {currentSlide.lines[1]}
                </span>
              )}
              {currentSlide.lines[2] && (
                <span className="hero-anim-line-3 block">
                  {currentSlide.lines[2]}
                </span>
              )}
            </h1>

            {/* Stage 2 (0.95s): Supporting Description */}
            <p className="hero-anim-desc text-white/85 text-[15.5px] sm:text-[17px] xl:text-[18.5px] leading-[1.68] max-w-[500px] mb-9 font-normal">
              {currentSlide.description}
            </p>

            {/* Stage 3 (1.20s): Action Buttons Row */}
            <div className="hero-anim-actions flex flex-wrap items-center gap-7 sm:gap-10">
              {/* READ MORE matching unified Header pill style */}
              <Link
                href={currentSlide.readMoreHref || "/products"}
                className={siteButtonClass({ variant: "light" })}
              >
                <span>{currentSlide.readMoreLabel || "READ MORE"}</span>
              </Link>

              {/* WATCH VIDEO with Circular White Play Button */}
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex items-center gap-4 group cursor-pointer text-left focus:outline-none"
              >
                <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-[#094E9B] flex items-center justify-center shadow-[0_10px_25px_rgba(3,28,70,0.28)] group-hover:scale-105 transition-transform duration-300 shrink-0">
                  <Play className="w-5 h-5 fill-[#094E9B] ml-0.5" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.07em] text-white group-hover:text-[#CBEFFF] transition-colors">
                    {currentSlide.watchVideoLabel || "WATCH VIDEO"}
                  </span>
                  <span className="text-[13.5px] sm:text-[14.5px] text-white/80 font-normal mt-0.5">
                    {currentSlide.watchVideoSub || "Production to Delivery"}
                  </span>
                </span>
              </button>
            </div>

            {/* Mobile Slide Controls (< md) */}
            <div className="flex md:hidden items-center gap-3 mt-7">
              {slides.map((slide, idx) => {
                const isActive = idx === safeIndex;
                const displayNum = slide.num || String(idx + 1).padStart(2, "0");
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-bold tracking-wider transition-all ${
                      isActive
                        ? "bg-white text-[#094E9B] shadow-sm"
                        : "bg-white/15 text-white/85"
                    }`}
                  >
                    {displayNum}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Visual Composition (Splash Platform + Bottles + Offer Badge) */}
        <div className="relative mt-6 lg:mt-0 ml-auto w-[94%] sm:w-[82%] lg:w-[46.5%] xl:w-[45%] h-[280px] sm:h-[340px] lg:h-[58%] lg:max-h-[640px] lg:absolute lg:right-0 lg:bottom-0 z-20 pointer-events-none">
          {/* Stage 4 (1.35s): Water Splash Platform Sliding in Smoothly from RIGHT */}
          <div className="hero-anim-platform absolute inset-0 rounded-tl-[26px] lg:rounded-tl-[32px] overflow-hidden shadow-[-16px_-10px_42px_rgba(3,30,74,0.28)] bg-[#CFE7FA]">
            <img
              src={platformImg}
              alt="Crystal clear water splash platform"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {currentSlide.visualLayout === "trio" ||
          currentSlide.visualLayout === "custom" ? (
            /* Trio or Custom Single Showcase Image Rising from Bottom */
            <div className="hero-anim-bottle-vertical absolute inset-x-0 mx-auto bottom-[6%] h-[112%] sm:h-[114%] lg:h-[118%] w-[88%] z-30 flex items-end justify-center">
              <img
                src={fgImg}
                alt={currentSlide.lines.filter(Boolean).join(" ")}
                className="max-h-full w-auto max-w-full object-contain rounded-2xl drop-shadow-[0_18px_28px_rgba(3,38,94,0.34)]"
              />
            </div>
          ) : (
            <>
              {/* Stage 6 (2.05s): Horizontal Lying 5-Gallon Bottle Behind Standing Jug */}
              <div className="hero-anim-bottle-horizontal absolute right-[1%] bottom-[12%] w-[57%] z-20">
                <img
                  src={secondaryImg}
                  alt="5-Gallon horizontal water dispenser bottle"
                  className="w-full h-auto object-contain drop-shadow-[0_14px_22px_rgba(4,48,108,0.28)]"
                />
              </div>

              {/* Stage 5 (1.85s): Standing Vertical 5-Gallon Bottle Rising from Bottom */}
              <div className="hero-anim-bottle-vertical absolute left-[12%] sm:left-[13%] bottom-[6.5%] h-[116%] lg:h-[122%] z-30 flex items-end">
                <img
                  src={fgImg}
                  alt="5-Gallon 100% Pure Water bottle"
                  className="h-full w-auto object-contain drop-shadow-[0_18px_28px_rgba(3,38,94,0.34)]"
                />
              </div>
            </>
          )}

          {/* Stage 7 (2.75s): Circular Promotional Offer Badge Overlapping Standing Shoulder */}
          {currentSlide.showOfferBadge && (
            <div
              className={`hero-anim-badge absolute z-40 ${
                currentSlide.visualLayout === "trio" ||
                currentSlide.visualLayout === "custom"
                  ? "left-[57%] sm:left-[58%] -top-[10%] lg:-top-[9%] xl:-top-[10%]"
                  : "left-[34%] -top-[11%] lg:-top-[10%] xl:-top-[11%]"
              }`}
            >
              <div className="relative flex items-center justify-center">
                {/* Thin Offset Concentric Outer Circle Ring */}
                <div
                  aria-hidden="true"
                  className="w-[104px] h-[104px] sm:w-[126px] sm:h-[126px] lg:w-[138px] lg:h-[138px] xl:w-[152px] xl:h-[152px] rounded-full border border-[#094E9B]/85 absolute translate-x-[5px] -translate-y-[4px] pointer-events-none"
                />
                {/* Main Deep Royal-Blue Offer Badge Disc */}
                <div className="relative w-[100px] h-[100px] sm:w-[122px] sm:h-[122px] lg:w-[134px] lg:h-[134px] xl:w-[148px] xl:h-[148px] rounded-full bg-gradient-to-br from-[#0657AF] via-[#04499A] to-[#013B82] shadow-[0_14px_34px_rgba(2,28,72,0.38)] flex flex-col items-center justify-center text-center text-white px-2">
                  <span className="text-[11px] sm:text-[12.5px] xl:text-[14px] font-medium leading-[1.2] text-[#E4FFFF]">
                    {currentSlide.offerEyebrow1}
                  </span>
                  <span className="text-[11px] sm:text-[12.5px] xl:text-[14px] font-medium leading-[1.2] text-[#E4FFFF]">
                    {currentSlide.offerEyebrow2}
                  </span>
                  <span className="text-[22px] sm:text-[26px] xl:text-[31px] font-bold leading-none my-1 tracking-tight text-white">
                    {currentSlide.offerPrice}
                  </span>
                  <span className="text-[11px] sm:text-[12px] xl:text-[13px] font-normal text-white/90 leading-none">
                    {currentSlide.offerUnit}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video / Production-to-Delivery Modal */}
      {isVideoOpen &&
        (() => {
          const media = resolveHeroVideoSource(
            currentSlide.videoUrl || globalVideoUrl
          );
          return (
            <div
              className="fixed inset-0 z-[100] bg-[#041836]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
              onClick={() => setIsVideoOpen(false)}
            >
              <div
                className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-[#0E489C] text-white px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Droplets className="w-5 h-5 text-[#75B5F5]" />
                    <h3 className="font-hero-display text-xl sm:text-2xl tracking-wide">
                      {currentSlide.watchVideoSub || "Production to Delivery"}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsVideoOpen(false)}
                    aria-label="Close modal"
                    className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>

                <div className="aspect-video w-full bg-black">
                  {media.type === "video" ? (
                    <video
                      src={media.src}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <iframe
                      src={media.src}
                      title="Production to Delivery Video"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })()}
    </section>
  );
}
