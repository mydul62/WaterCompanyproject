"use client";

import React from "react";
import Image from "next/image";

export default function FacilityShowcase() {
  return (
    <section id="about" className="relative w-full bg-white overflow-hidden py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[420px]">
          {/* Left Column: Text Content matching Screenshot 2026-11-04 130311.png */}
          <div className="lg:col-span-5 space-y-6 z-10">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black text-black tracking-tight inline-block relative pb-3">
                About Us
                {/* Thick Solid Black Line Directly Under Heading */}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-black" />
              </h2>
            </div>

            <p className="text-xl sm:text-2xl font-semibold text-[#5a8ea7] leading-snug max-w-xl">
              We empower your brand with custom engineered tin and plastic packaging solutions that give you a
              competitive edge.
            </p>

            <div className="pt-2">
              <a
                href="#overview"
                className="inline-block px-7 py-3 rounded-lg border-2 border-black bg-white text-black font-semibold text-sm hover:bg-black hover:text-white transition-all shadow-sm"
              >
                Read More...
              </a>
            </div>
          </div>

          {/* Right Column: Factory Building Image matching Screenshot */}
          <div className="lg:col-span-7 relative h-[350px] sm:h-[450px] lg:h-[520px] w-full">
            <div className="relative w-full h-full overflow-hidden rounded-xl">
              <Image
                src="/Infoimages/Screenshot 2026-11-04 130311.png"
                alt="Xclusive Can Limited Headquarters & Factory"
                fill
                className="object-cover object-right"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
