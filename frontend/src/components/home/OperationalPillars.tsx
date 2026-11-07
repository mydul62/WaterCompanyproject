"use client";

import React from "react";
import Image from "next/image";

export default function OperationalPillars() {
  return (
    <section
      id="supply-chain"
      className="relative w-full bg-white overflow-hidden py-16 sm:py-24 min-h-[460px] lg:min-h-[520px] flex items-center select-none"
    >
      {/* Background harbor supply chain image touching left screen edge and fading seamlessly to the right */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[58%] xl:w-[54%] h-full pointer-events-none opacity-40 lg:opacity-100 transition-opacity z-0">
        <div className="relative w-full h-full">
          <Image
            src="/cropped/harbor-supply.png"
            alt="Harbor and Supply Chain Logistics Infrastructure"
            fill
            className="object-cover object-left"
            priority
          />
          {/* Seamless soft white gradient fade to the right */}
          <div className="absolute inset-y-0 right-0 w-44 sm:w-72 bg-gradient-to-l from-white via-white/90 to-transparent lg:block hidden" />
        </div>
      </div>

      {/* Main Content Container: Clean typography directly on white background on the right */}
      <div className="relative z-10 w-[98%] max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 flex justify-end">
        <div className="w-full lg:w-[52%] xl:w-[48%] space-y-7">
          {/* Heading with Solid Underline */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 tracking-tight leading-[1.2]">
              <span className="pb-2 border-b-[3px] border-slate-900 inline-block">
                Managing Supply Chain &amp;
              </span>
              <br />
              Business Challenges
            </h2>
          </div>

          {/* Authentic Triangle Icons Row from Reference Screenshot */}
          <div className="pt-2">
            <div className="relative w-full max-w-[560px] h-12 sm:h-14">
              <Image
                src="/cropped/triangle-icons.png"
                alt="Supply Chain Operational Icons"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </div>

          {/* Clean Rounded Read More Button matching Screenshot */}
          <div className="pt-2">
            <a
              href="/products"
              className="inline-block px-7 py-2.5 rounded-lg border border-slate-900 text-slate-900 bg-white font-semibold text-xs sm:text-sm tracking-wide hover:bg-slate-900 hover:text-white transition-all shadow-xs active:scale-95"
            >
              Read More..
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
