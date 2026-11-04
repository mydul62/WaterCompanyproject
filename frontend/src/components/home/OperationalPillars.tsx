"use client";

import React from "react";
import Image from "next/image";

export default function OperationalPillars() {
  return (
    <section id="supply-chain" className="relative w-full bg-white overflow-hidden py-12 lg:py-20 border-t border-slate-100">
      <div className="max-w-[1480px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px]">
          {/* Left Column: Aerial Harbor Sea Photo with White Gradient Fade */}
          <div className="lg:col-span-5 relative h-[320px] sm:h-[420px] lg:h-[480px] w-full rounded-xl overflow-hidden">
            <Image
              src="/Infoimages/Screenshot 2026-11-04 130318.png"
              alt="Harbor and Supply Chain Logistics"
              fill
              className="object-cover object-left"
            />
            {/* White gradient fade on the right side */}
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-white" />
          </div>

          {/* Right Column: Heading, 9 Triangles & Button matching Screenshot */}
          <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-6 z-10">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight leading-tight max-w-xl">
                Managing Supply Chain &amp; Business Challenges
              </h2>
            </div>

            {/* Row of 9 Triangle Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 py-2">
              {/* Triangle 1: Upright - Logistics */}
              <div className="relative w-11 h-11 flex items-center justify-center filter drop-shadow-md">
                <svg className="w-11 h-11 text-[#6ea8c7]" viewBox="0 0 40 36" fill="white" stroke="currentColor" strokeWidth="2">
                  <polygon points="20,2 38,34 2,34" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-slate-800 text-xs font-bold pt-1">
                  &#8644;
                </span>
              </div>

              {/* Triangle 2: Inverted - Clock / Punctuality */}
              <div className="relative w-11 h-11 flex items-center justify-center filter drop-shadow-md">
                <svg className="w-11 h-11 text-[#6ea8c7]" viewBox="0 0 40 36" fill="white" stroke="currentColor" strokeWidth="2">
                  <polygon points="2,2 38,2 20,34" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-slate-800 text-xs font-bold pb-1">
                  &#9200;
                </span>
              </div>

              {/* Triangle 3: Upright - Innovation / Lightbulb */}
              <div className="relative w-11 h-11 flex items-center justify-center filter drop-shadow-md">
                <svg className="w-11 h-11 text-[#6ea8c7]" viewBox="0 0 40 36" fill="white" stroke="currentColor" strokeWidth="2">
                  <polygon points="20,2 38,34 2,34" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-slate-800 text-xs font-bold pt-1">
                  &#128161;
                </span>
              </div>

              {/* Triangle 4: Inverted - Quality Check */}
              <div className="relative w-11 h-11 flex items-center justify-center filter drop-shadow-md">
                <svg className="w-11 h-11 text-[#6ea8c7]" viewBox="0 0 40 36" fill="white" stroke="currentColor" strokeWidth="2">
                  <polygon points="2,2 38,2 20,34" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-slate-800 text-xs font-bold pb-1">
                  &#10003;
                </span>
              </div>

              {/* Triangle 5: Upright - Eco / Recycling */}
              <div className="relative w-11 h-11 flex items-center justify-center filter drop-shadow-md">
                <svg className="w-11 h-11 text-[#6ea8c7]" viewBox="0 0 40 36" fill="white" stroke="currentColor" strokeWidth="2">
                  <polygon points="20,2 38,34 2,34" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-slate-800 text-xs font-bold pt-1">
                  &#9851;
                </span>
              </div>

              {/* Triangle 6: Inverted - Tooling / Gear */}
              <div className="relative w-11 h-11 flex items-center justify-center filter drop-shadow-md">
                <svg className="w-11 h-11 text-[#6ea8c7]" viewBox="0 0 40 36" fill="white" stroke="currentColor" strokeWidth="2">
                  <polygon points="2,2 38,2 20,34" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-slate-800 text-xs font-bold pb-1">
                  &#9881;
                </span>
              </div>

              {/* Triangle 7: Inverted - Supply Security / Shield */}
              <div className="relative w-11 h-11 flex items-center justify-center filter drop-shadow-md">
                <svg className="w-11 h-11 text-[#6ea8c7]" viewBox="0 0 40 36" fill="white" stroke="currentColor" strokeWidth="2">
                  <polygon points="2,2 38,2 20,34" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-slate-800 text-xs font-bold pb-1">
                  &#128737;
                </span>
              </div>

              {/* Triangle 8: Inverted - Skilled Workforce */}
              <div className="relative w-11 h-11 flex items-center justify-center filter drop-shadow-md">
                <svg className="w-11 h-11 text-[#6ea8c7]" viewBox="0 0 40 36" fill="white" stroke="currentColor" strokeWidth="2">
                  <polygon points="2,2 38,2 20,34" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-slate-800 text-xs font-bold pb-1">
                  &#128101;
                </span>
              </div>

              {/* Triangle 9: Upright - High Precision Target */}
              <div className="relative w-11 h-11 flex items-center justify-center filter drop-shadow-md">
                <svg className="w-11 h-11 text-[#6ea8c7]" viewBox="0 0 40 36" fill="white" stroke="currentColor" strokeWidth="2">
                  <polygon points="20,2 38,34 2,34" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-slate-800 text-xs font-bold pt-1">
                  &#9678;
                </span>
              </div>
            </div>

            <div>
              <a
                href="#overview"
                className="inline-block px-7 py-3 rounded-lg border-2 border-black bg-white text-black font-semibold text-sm hover:bg-black hover:text-white transition-all shadow-sm"
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
