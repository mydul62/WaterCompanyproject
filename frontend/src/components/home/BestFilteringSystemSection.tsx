"use client";

import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

export default function BestFilteringSystemSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-br from-[#06339f] via-[#0941ba] to-[#042880] text-white overflow-hidden">
      {/* Top Wave Cutout */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none opacity-90">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 text-white fill-current"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L1440,0 L1440,24 C1080,60 720,0 360,40 L0,20 Z" />
        </svg>
      </div>

      {/* Ambient Blue Radial Glow */}
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1a5ee6]/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1638px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading and Checkmarks (Screenshot f111777f) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.18] tracking-tight">
              Protect Your Family with <br />
              One of The Best Water <br />
              Filtering System.
            </h2>

            <div className="mt-10 space-y-8">
              {/* Feature 1 */}
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full bg-[#00c2e8] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,194,232,0.6)] transition-transform group-hover:scale-110">
                  <Check className="w-6 h-6 text-white stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1.5">
                    Content Marketing
                  </h3>
                  <p className="text-[#d8e7ff] text-base leading-relaxed max-w-[460px]">
                    Lorem ipsum dolor amet consectetur adipisicing sed do eiusmod
                    tempor incididunt labore.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full bg-[#00c2e8] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,194,232,0.6)] transition-transform group-hover:scale-110">
                  <Check className="w-6 h-6 text-white stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1.5">
                    Marketing Strategy
                  </h3>
                  <p className="text-[#d8e7ff] text-base leading-relaxed max-w-[460px]">
                    Lorem ipsum dolor amet consectetur adipisicing sed do eiusmod
                    tempor incididunt labore.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Framed Splash Water Bottle Card (Screenshot f111777f) */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-[540px] aspect-[4/3] rounded-2xl bg-white p-2.5 sm:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.35)] overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-900">
                <div className="w-[190%] h-full relative -left-[88%] -top-[0%]">
                  <Image
                    src="/acuasafe/section-filtering-system.jpg"
                    alt="Acuasafe Pure Mineral Water Bottle in Splash"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Cutout */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 text-white fill-current"
          preserveAspectRatio="none"
        >
          <path d="M0,30 C360,60 720,0 1080,45 C1260,55 1380,40 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}
