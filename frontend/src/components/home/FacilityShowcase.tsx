"use client";

import React from "react";
import Image from "next/image";

export default function FacilityShowcase() {
  return (
    <section id="about" className="relative w-full bg-white overflow-hidden py-16 sm:py-24 min-h-[500px] lg:min-h-[580px] flex items-center">
      {/* Full-bleed background factory image touching the right screen edge (Screenshot 2026-11-04 130311.png) */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[52%] xl:w-[50%] h-full pointer-events-none opacity-20 lg:opacity-100 transition-opacity">
        <Image
          src="/cropped/factory-building.png"
          alt="Xclusive Can Limited Green Factory Campus"
          fill
          className="object-cover object-left"
          priority
        />
      </div>

      {/* Main Content Container strictly constrained to max-w-[1480px] */}
      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-6 sm:px-12">
        <div className="max-w-xl space-y-6">
          <div>
            <h2 className="text-4xl sm:text-5xl font-black text-black tracking-tight inline-block">
              About Us
            </h2>
            {/* Solid Thick Black Horizontal Underline directly below text */}
            <div className="w-28 sm:w-32 h-1 bg-black mt-2" />
          </div>

          <p className="text-xl sm:text-2xl font-semibold text-[#3b7997] leading-snug">
            We empower your brand with custom engineered tin and plastic packaging solutions that give you a
            competitive edge.
          </p>

          <div className="pt-2">
            <a
              href="#overview"
              className="inline-block px-7 py-2.5 rounded-lg border-2 border-black bg-white text-black font-semibold text-sm hover:bg-black hover:text-white transition-all shadow-sm active:scale-95"
            >
              Read More...
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
