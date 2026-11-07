"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function SafeWaterStorySection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-[1643px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual: Exact Circular Icy Bottle Artwork from Screenshot e82811f7 */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-[520px] aspect-[1.08/1] flex items-center justify-center group">
              {/* Soft ambient back glow */}
              <div className="absolute inset-0 bg-[#00c2e8]/10 rounded-full blur-3xl transform -translate-y-4 pointer-events-none group-hover:scale-110 transition-transform duration-700" />

              {/* High-fidelity cropped graphic container */}
              <div className="relative w-full h-full overflow-hidden rounded-3xl transition-transform duration-500 hover:scale-[1.02]">
                <div className="w-[205%] h-full relative -left-[3%] -top-[1%]">
                  <Image
                    src="/acuasafe/section-safe-water.jpg"
                    alt="Acuasafe Icy Crystal Pure Bottled Water with Mint & Splash"
                    fill
                    className="object-cover object-left"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0f172a] leading-[1.18] tracking-tight">
              We Always Want Safe <br className="hidden sm:inline" />
              and Healthy Water for <br className="hidden sm:inline" />
              Healthy Life.
            </h2>

            <p className="mt-6 text-slate-500 text-base sm:text-[17px] leading-relaxed">
              Dolor sit amet consectur elit sed eiusmod tempor incid dunt labore
              dolore magna aliqua enim minim veniam quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex comodo consequat.duis aute irure dolor in
              reprehenderit. in voluptate velit esse cillum dolore eu fugiat.
            </p>

            <p className="mt-4 text-slate-500 text-base sm:text-[17px] leading-relaxed">
              Cepteur sint occaecat cupidatat non proident sunt in culpa qui officia
              deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste
              natus error sit voluptatem.
            </p>

            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-slate-100 text-slate-500 text-base leading-relaxed animate-in fade-in duration-300">
                <p>
                  Our advanced multi-stage mineral filtration removes 99.9% of
                  dissolved impurities while retaining vital natural electrolytes
                  (calcium, magnesium, potassium) necessary for human health and daily
                  vitality.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00c2e8]" />
                    <span>100% Microplastic-Free</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00c2e8]" />
                    <span>Natural pH 7.4 Balance</span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#00c2e8] hover:bg-[#00acc1] text-white font-bold text-sm tracking-wide shadow-[0_8px_22px_rgba(0,194,232,0.35)] transition-all duration-200 hover:scale-105 active:scale-95 group"
              >
                <span>{isExpanded ? "Show Less" : "Read More"}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
