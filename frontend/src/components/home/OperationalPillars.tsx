"use client";

import React from "react";
import Image from "next/image";

export default function OperationalPillars() {
  return (
    <section id="supply-chain" className="relative w-full bg-white overflow-hidden py-12 lg:py-16">
      <div className="max-w-[1480px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px]">
          {/* Left Column: Aerial Harbor Water Image from Screenshot */}
          <div className="lg:col-span-5 relative h-[320px] sm:h-[420px] lg:h-[480px] w-full overflow-hidden">
            <Image
              src="/cropped/harbor-supply.png"
              alt="Harbor and Supply Chain Logistics"
              fill
              className="object-contain object-left"
            />
          </div>

          {/* Right Column: Heading, Exact 9 Triangles Image & Button matching Screenshot 2026-11-04 130318.png */}
          <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-6 z-10">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight leading-tight max-w-xl">
                Managing Supply Chain &amp; Business Challenges
              </h2>
            </div>

            {/* Exact 9 Triangles Image Strip from Screenshot */}
            <div className="relative w-full max-w-[620px] h-16 sm:h-20">
              <Image
                src="/cropped/triangle-icons.png"
                alt="Supply Chain Operational Pillars"
                fill
                className="object-contain object-left"
              />
            </div>

            <div>
              <a
                href="#overview"
                className="inline-block px-7 py-2.5 rounded-lg border-2 border-black bg-white text-black font-semibold text-sm hover:bg-black hover:text-white transition-all shadow-sm"
              >
                Read More...
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
