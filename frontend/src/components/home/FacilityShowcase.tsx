"use client";

import React from "react";
import Image from "next/image";

export default function FacilityShowcase() {
  return (
    <section
      id="about"
      className="relative w-full bg-white overflow-hidden py-14 sm:py-20 lg:py-24 min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] flex items-center select-none"
    >
      {/* Full-bleed background factory campus image touching the right screen edge (Matches media_1793780928940_a9f2bd5f.jpg 100%) */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[60%] lg:w-[56%] xl:w-[54%] h-full pointer-events-none opacity-25 md:opacity-100 transition-opacity">
        <Image
          src="/cropped/factory-building.png"
          alt="Xclusive Can Limited LEED Platinum Factory Campus"
          fill
          className="object-cover object-right"
          priority
        />
      </div>

      {/* Main Content Container strictly constrained to max-w-[1638px] */}
      <div className="relative z-10 w-full max-w-[1638px] mx-auto px-6 sm:px-12">
        <div className="max-w-[540px] space-y-6 sm:space-y-7">
          {/* Heading with Solid Black Underline exactly matching text width */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-black text-black tracking-tight border-b-4 border-black pb-2 inline-block">
              About Us
            </h2>
          </div>

          {/* Subtext in Authentic Slate-Blue (#5a8ea7) with Exact 3-Line Wrap */}
          <p className="text-xl sm:text-2xl font-semibold text-[#5a8ea7] leading-[1.35] tracking-normal">
            We empower your brand with custom engineered tin <br className="hidden sm:inline" />
            and plastic packaging solutions that give you a <br className="hidden sm:inline" />
            competitive edge.
          </p>

          {/* Read More... Button with Black Rounded Outline */}
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
