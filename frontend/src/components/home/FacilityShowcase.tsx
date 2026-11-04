"use client";

import React from "react";
import Image from "next/image";

export default function FacilityShowcase() {
  return (
    <section id="about" className="relative w-full bg-white overflow-hidden py-12 lg:py-16">
      <div className="max-w-[1480px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[440px]">
          {/* Left Column: Heading, Subtitle & Button matching Screenshot 2026-11-04 130311.png */}
          <div className="lg:col-span-5 space-y-6 z-10">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black text-black tracking-tight inline-block">
                About Us
              </h2>
              {/* Solid Thick Black Horizontal Underline directly below text */}
              <div className="w-24 sm:w-28 h-1 bg-black mt-2" />
            </div>

            <p className="text-xl sm:text-2xl font-semibold text-[#5a8ea7] leading-snug max-w-xl">
              We empower your brand with custom engineered tin and plastic packaging solutions that give you a
              competitive edge.
            </p>

            <div className="pt-2">
              <a
                href="#overview"
                className="inline-block px-7 py-2.5 rounded-lg border-2 border-black bg-white text-black font-semibold text-sm hover:bg-black hover:text-white transition-all shadow-sm"
              >
                Read More...
              </a>
            </div>
          </div>

          {/* Right Column: Exact Factory Building Image from Screenshot */}
          <div className="lg:col-span-7 relative h-[350px] sm:h-[450px] lg:h-[520px] w-full">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/cropped/factory-building.png"
                alt="Xclusive Can Limited Factory Campus"
                fill
                className="object-contain object-right"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
