"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function ProductShowcase() {
  const [activeIcon, setActiveIcon] = useState(0);

  const productImages = [
    {
      title: "Plastic Bottle with Ribbed Cap",
      image: "/Infoimages/Screenshot 2026-11-04 130325.png",
      alt: "White Plastic Bottle with Blue Cap",
    },
  ];

  return (
    <section id="products" className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        {/* Section Header matching Screenshot 2026-11-04 130325.png */}
        <div className="text-center space-y-2 mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight">
            Discover Our Product
          </h2>
          <p className="text-slate-600 font-medium text-base sm:text-lg">
            Plastic &amp; Tin Container
          </p>
        </div>

        {/* 5 Blue Outline Category Icons matching Screenshot */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 lg:gap-14 mb-12 sm:mb-16">
          {/* Icon 1: Tin Can */}
          <button
            onClick={() => setActiveIcon(0)}
            className={`p-3 rounded-xl transition-all ${
              activeIcon === 0 ? "scale-110 opacity-100" : "opacity-80 hover:opacity-100"
            }`}
            aria-label="Tin Can"
          >
            <svg className="w-9 h-9 sm:w-12 sm:h-12 text-[#568ca7]" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="8" y="10" width="24" height="24" rx="3" />
              <line x1="8" y1="15" x2="32" y2="15" />
              <line x1="8" y1="29" x2="32" y2="29" />
              <circle cx="20" cy="22" r="4.5" />
            </svg>
          </button>

          {/* Icon 2: Tall Bottle */}
          <button
            onClick={() => setActiveIcon(1)}
            className={`p-3 rounded-xl transition-all ${
              activeIcon === 1 ? "scale-110 opacity-100" : "opacity-80 hover:opacity-100"
            }`}
            aria-label="Bottle"
          >
            <svg className="w-9 h-9 sm:w-12 sm:h-12 text-[#568ca7]" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="12" y="14" width="16" height="22" rx="3" />
              <path d="M15 14V6h10v8" />
              <line x1="14" y1="6" x2="26" y2="6" />
            </svg>
          </button>

          {/* Icon 3: Jerrycan with X */}
          <button
            onClick={() => setActiveIcon(2)}
            className={`p-3 rounded-xl transition-all ${
              activeIcon === 2 ? "scale-110 opacity-100" : "opacity-80 hover:opacity-100"
            }`}
            aria-label="Jerrycan"
          >
            <svg className="w-9 h-9 sm:w-12 sm:h-12 text-[#568ca7]" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="12" width="22" height="24" rx="2" />
              <path d="M9 12l6-6h10v6" />
              <line x1="13" y1="18" x2="27" y2="30" />
              <line x1="27" y1="18" x2="13" y2="30" />
            </svg>
          </button>

          {/* Icon 4: Cylinder Drum */}
          <button
            onClick={() => setActiveIcon(3)}
            className={`p-3 rounded-xl transition-all ${
              activeIcon === 3 ? "scale-110 opacity-100" : "opacity-80 hover:opacity-100"
            }`}
            aria-label="Drum"
          >
            <svg className="w-9 h-9 sm:w-12 sm:h-12 text-[#568ca7]" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="20" cy="10" rx="11" ry="5" />
              <path d="M9 10v18c0 2.76 4.92 5 11 5s11-2.24 11-5V10" />
            </svg>
          </button>

          {/* Icon 5: Rectangular Container with X */}
          <button
            onClick={() => setActiveIcon(4)}
            className={`p-3 rounded-xl transition-all ${
              activeIcon === 4 ? "scale-110 opacity-100" : "opacity-80 hover:opacity-100"
            }`}
            aria-label="Tray"
          >
            <svg className="w-9 h-9 sm:w-12 sm:h-12 text-[#568ca7]" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="10" width="28" height="20" rx="3" />
              <line x1="6" y1="14" x2="34" y2="14" />
              <line x1="12" y1="17" x2="28" y2="27" />
              <line x1="28" y1="17" x2="12" y2="27" />
            </svg>
          </button>
        </div>

        {/* 4 Product Cards matching Screenshot 2026-11-04 130325.png */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: White bottle with blue cap */}
          <div className="rounded-2xl overflow-hidden bg-[#edf1f4] shadow-sm hover:shadow-md transition-shadow border border-slate-100 h-52 sm:h-60 relative flex items-center justify-center p-4">
            <Image
              src="/Infoimages/Screenshot 2026-11-04 130325.png"
              alt="White Plastic Bottle with Blue Cap"
              fill
              className="object-cover object-left"
            />
          </div>

          {/* Card 2: White cup container */}
          <div className="rounded-2xl overflow-hidden bg-[#edf1f4] shadow-sm hover:shadow-md transition-shadow border border-slate-100 h-52 sm:h-60 relative flex items-center justify-center p-4">
            <Image
              src="/Infoimages/Screenshot 2026-11-04 130325.png"
              alt="White Cup Container"
              fill
              className="object-cover"
              style={{ objectPosition: "33% center" }}
            />
          </div>

          {/* Card 3: Eye drop bottle */}
          <div className="rounded-2xl overflow-hidden bg-[#edf1f4] shadow-sm hover:shadow-md transition-shadow border border-slate-100 h-52 sm:h-60 relative flex items-center justify-center p-4">
            <Image
              src="/Infoimages/Screenshot 2026-11-04 130325.png"
              alt="Dropper Bottle with Yellow Cap"
              fill
              className="object-cover"
              style={{ objectPosition: "66% center" }}
            />
          </div>

          {/* Card 4: Rectangular plastic tub with lid */}
          <div className="rounded-2xl overflow-hidden bg-[#edf1f4] shadow-sm hover:shadow-md transition-shadow border border-slate-100 h-52 sm:h-60 relative flex items-center justify-center p-4">
            <Image
              src="/Infoimages/Screenshot 2026-11-04 130325.png"
              alt="Rectangular Plastic Container with Lid"
              fill
              className="object-cover object-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
