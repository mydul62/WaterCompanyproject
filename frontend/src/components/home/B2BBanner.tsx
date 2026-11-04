"use client";

import React from "react";
import Image from "next/image";

interface B2BBannerProps {
  onOpenRFQ?: () => void;
}

export default function B2BBanner({ onOpenRFQ }: B2BBannerProps) {
  return (
    <section id="overview" className="w-full bg-white py-16 sm:py-24">
      <div className="w-full max-w-[1480px] mx-auto px-6 sm:px-12 space-y-16 sm:space-y-20">
        {/* Exact Floating Sky-Blue CTA Banner Card matching Screenshot 2026-11-04 130341.png */}
        <div className="w-full rounded-2xl sm:rounded-3xl bg-gradient-to-r from-white via-[#eaf5fc] to-[#bfe6f9] border border-sky-100 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Exact Xclusive Logo */}
          <div className="relative h-12 sm:h-14 w-32 sm:w-40 shrink-0">
            <Image
              src="/cropped/xclusive-logo.png"
              alt="Xclusive Can Limited"
              fill
              className="object-contain object-left"
              priority
            />
          </div>

          {/* Center: Title & Description */}
          <div className="flex-1 text-center md:text-left space-y-1 sm:space-y-2">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-black tracking-tight">
              Packaging Solutions Always Made Right&reg;
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-slate-800 leading-relaxed max-w-3xl">
              With a diverse stock bottle portfolio and an innovative design team working to produce creative packaging
              solutions, we can help you find the perfect solution.
            </p>
          </div>

          {/* Right: Contact Us Button */}
          <div className="shrink-0">
            <button
              onClick={onOpenRFQ}
              className="px-8 py-3 rounded-xl border-2 border-black bg-white text-black font-bold text-sm sm:text-base hover:bg-black hover:text-white transition-all shadow-sm active:scale-95"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Leading Packaging Company in Bangladesh (Screenshot 2026-11-04 130341.png & 130347.png) */}
        <div className="space-y-14">
          {/* Main Statement */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight">
              Leading Packaging Company in Bangladesh
            </h2>
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
              Xclusive Can Limited is Bangladesh&apos;s leading manufacturer of tin cans and plastic bottles since 1992.
              Headquartered in Gazipur, Dhaka, we specialize in producing high-quality metal cans, plastic bottles,
              plastic buckets, and custom packaging solutions for the food, beverage, personal care, and industrial
              sectors. With state-of-the-art manufacturing facilities in Gazipur and Tongi, experienced professionals,
              and ISO 22000, GMP, and HACCP certifications, we serve clients across Asia, Middle East, and Africa.
            </p>
          </div>

          {/* Two Columns: Our Products & Why Choose Us (Screenshot 2026-11-04 130347.png) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 pt-2">
            {/* Left Column: Our Products */}
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                Our Products
              </h3>
              <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
                We manufacture a comprehensive range of packaging solutions including tin cans (3-piece, aerosol,
                decorative), plastic bottles (PET, HDPE, PP), plastic buckets, and custom metal packaging. Our products
                are designed to meet the highest standards of food safety, durability, and aesthetic appeal. We use
                premium-grade tinplate, PET, HDPE, and PP materials, advanced manufacturing technology, and rigorous
                quality control processes to ensure every product exceeds customer expectations. All materials are
                FDA-compliant and food-grade certified.
              </p>
            </div>

            {/* Right Column: Why Choose Us */}
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                Why Choose Us
              </h3>
              <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
                Xclusive Can Limited offers competitive pricing, reliable delivery schedules, custom packaging
                solutions, and dedicated customer support. Our strategically located facilities in Gazipur and Tongi,
                Dhaka provide easy access to raw materials and shipping ports, enabling us to serve both domestic and
                international markets efficiently. We accept both small-batch and bulk orders, offer custom sizes and
                printing options, and are committed to continuous innovation, environmental sustainability, and building
                long-term partnerships with our clients.
              </p>
            </div>
          </div>

          {/* Our Commitment to Quality and Sustainability (Screenshot 2026-11-04 130347.png) */}
          <div className="text-center max-w-4xl mx-auto space-y-4 pt-6">
            <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              Our Commitment to Quality and Sustainability
            </h3>
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
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
