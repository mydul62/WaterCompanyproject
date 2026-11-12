"use client";

import React from "react";
import Image from "next/image";
import { siteButtonClass } from "@/components/common/SiteButton";

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
            sizes="(max-width: 1024px) 100vw, 56vw"
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
          <div data-reveal="up">
            <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-black text-slate-900 tracking-tight leading-[1.2]">
              <span className="pb-2 border-b-[3px] border-slate-900 inline-block">
                Managing Supply Chain &amp;
              </span>
              <br />
              Business Challenges
            </h2>
          </div>

          {/* Authentic Triangle Icons Row from Reference Screenshot */}
          <div data-reveal="scale" className="delay-150 pt-2">
            <div className="relative w-full max-w-[560px] h-12 sm:h-14">
              <Image
                src="/cropped/triangle-icons.png"
                alt="Supply Chain Operational Icons"
                fill
                sizes="(max-width: 640px) 100vw, 560px"
                className="object-contain object-left"
                priority
              />
            </div>
          </div>

          {/* Unified Header-Matched Read More Button */}
          <div data-reveal="up" className="delay-200 pt-2">
            <a
              href="/products"
              className={siteButtonClass({ variant: "outline" })}
            >
              <span>Read More..</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
