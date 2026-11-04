"use client";

import React from "react";
import Link from "next/link";

interface B2BBannerProps {
  onOpenRFQ?: () => void;
}

export default function B2BBanner({ onOpenRFQ }: B2BBannerProps) {
  return (
    <section id="overview" className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 space-y-16 sm:space-y-20">
        {/* Floating Call to Action Card matching Screenshot 2026-11-04 130341.png */}
        <div className="rounded-2xl bg-gradient-to-r from-white via-[#e8f5fb] to-[#c7e8f6] p-6 sm:p-10 border border-slate-200/80 shadow-md">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            {/* Logo on Left */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center">
                <div className="relative flex items-center font-black text-[#0d226b] text-2xl tracking-tighter">
                  <span className="text-3xl font-black">X</span>
                  <div className="absolute top-0.5 left-1.5 w-3 h-3 rounded-full border-2 border-[#0d226b] bg-cyan-400" />
                  <span className="text-xl font-bold ml-0.5">clusive</span>
                </div>
                <div className="ml-1 border border-[#0d226b] px-1 py-0.2 rounded text-[8px] font-bold uppercase tracking-wider text-[#0d226b]">
                  Can Limited
                </div>
              </div>
            </div>

            {/* Middle Copy */}
            <div className="space-y-1.5 text-center lg:text-left flex-1 max-w-3xl">
              <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight">
                Packaging Solutions Always Made Right&reg;
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                With a diverse stock bottle portfolio and an innovative design team working to produce creative packaging
                solutions, we can help you find the perfect solution.
              </p>
            </div>

            {/* Right Button */}
            <div className="shrink-0">
              <button
                onClick={onOpenRFQ}
                className="px-8 py-3 rounded-lg border-2 border-black bg-white text-black font-bold text-sm hover:bg-black hover:text-white transition-all shadow-sm"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Leading Packaging Company in Bangladesh Section */}
        <div className="space-y-12">
          {/* Main Statement */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight">
              Leading Packaging Company in Bangladesh
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Xclusive Can Limited is Bangladesh&apos;s leading manufacturer of tin cans and plastic bottles since 1992.
              Headquartered in Gazipur, Dhaka, we specialize in producing high-quality metal cans, plastic bottles,
              plastic buckets, and custom packaging solutions for the food, beverage, personal care, and industrial
              sectors. With state-of-the-art manufacturing facilities in Gazipur and Tongi, experienced professionals,
              and ISO 22000, GMP, and HACCP certifications, we serve clients across Asia, Middle East, and Africa.
            </p>
          </div>

          {/* Two Columns: Our Products & Why Choose Us (Screenshot 2026-11-04 130347.png) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 pt-4">
            {/* Column 1: Our Products */}
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                Our Products
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                We manufacture a comprehensive range of packaging solutions including tin cans (3-piece, aerosol,
                decorative), plastic bottles (PET, HDPE, PP), plastic buckets, and custom metal packaging. Our products
                are designed to meet the highest standards of food safety, durability, and aesthetic appeal. We use
                premium-grade tinplate, PET, HDPE, and PP materials, advanced manufacturing technology, and rigorous
                quality control processes to ensure every product exceeds customer expectations. All materials are
                FDA-compliant and food-grade certified.
              </p>
            </div>

            {/* Column 2: Why Choose Us */}
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                Why Choose Us
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Xclusive Can Limited offers competitive pricing, reliable delivery schedules, custom packaging
                solutions, and dedicated customer support. Our strategically located facilities in Gazipur and Tongi,
                Dhaka provide easy access to raw materials and shipping ports, enabling us to serve both domestic and
                international markets efficiently. We accept both small-batch and bulk orders, offer custom sizes and
                printing options, and are committed to continuous innovation, environmental sustainability, and building
                long-term partnerships with our clients.
              </p>
            </div>
          </div>

          {/* Our Commitment to Quality and Sustainability */}
          <div className="text-center max-w-4xl mx-auto space-y-4 pt-8">
            <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              Our Commitment to Quality and Sustainability
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              At Xclusive Can Limited, quality is not just a goal &mdash; it is a culture. We follow internationally
              recognized quality management systems and hold ISO 22000, GMP, and HACCP certifications that validate our
              commitment to excellence. Our manufacturing processes are designed to minimize waste, reduce energy
              consumption, and protect the environment. We believe that sustainable manufacturing is not just good for the
              planet, but also good for business. By choosing Xclusive Can Limited as your packaging partner, you are
              supporting a company that values quality, innovation, and environmental responsibility. All our packaging
              materials are recyclable and designed for circular economy principles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
