"use client";

import React from "react";
import Image from "next/image";

export default function OperationalPillars() {
  return (
    <section id="supply-chain" className="relative w-full bg-white overflow-hidden py-16 sm:py-24 min-h-[500px] lg:min-h-[580px] flex items-center">
      {/* Full-bleed background harbor logistics image touching the left screen edge (Screenshot 2026-11-04 130318.png) */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[55%] xl:w-[50%] h-full pointer-events-none opacity-20 lg:opacity-100 transition-opacity">
        <Image
          src="/cropped/harbor-supply.png"
          alt="Harbor and Supply Chain Logistics Infrastructure"
          fill
          className="object-cover object-left"
          priority
        />
      </div>

      {/* Main Content Container strictly constrained to max-w-[1638px] */}
      <div className="relative z-10 w-full max-w-[1638px] mx-auto px-6 sm:px-12 flex justify-end">
        <div className="w-full lg:w-[54%] xl:w-[50%] space-y-8 pl-0 lg:pl-10">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight leading-tight">
              Managing Supply Chain &amp; <br className="hidden sm:inline" />
              Business Challenges
            </h2>
          </div>

          {/* Exact 9 Triangles Image Strip from Screenshot 2026-11-04 130318.png */}
          <div className="relative w-full max-w-[620px] h-16 sm:h-20">
            <Image
              src="/cropped/triangle-icons.png"
              alt="Operational Pillars Triangles (Agile Logistics, Timely Delivery, Expert Engineers, Certified Quality, Eco Sustainable, Advanced Mold Tooling, Documented Compliance, Collaborative Team, Innovative Machinery)"
              fill
              className="object-contain object-left"
            />
          </div>

          <div>
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
