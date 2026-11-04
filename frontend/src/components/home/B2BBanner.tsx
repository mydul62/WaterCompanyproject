"use client";

import React from "react";
import Image from "next/image";

interface B2BBannerProps {
  onOpenRFQ?: () => void;
}

export default function B2BBanner({ onOpenRFQ }: B2BBannerProps) {
  return (
    <section id="overview" className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1480px] mx-auto px-6 sm:px-12 space-y-16 sm:space-y-20">
        {/* Exact Floating CTA Banner Card matching Screenshot 2026-11-04 130341.png */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-[1420px] aspect-[1417/223] shadow-md rounded-2xl overflow-hidden">
            <Image
              src="/cropped/cta-banner-exact.png"
              alt="Packaging Solutions Always Made Right - Contact Us"
              fill
              className="object-contain"
              priority
            />
            {/* Clickable Transparent Trigger over the 'Contact Us' button area */}
            <button
              onClick={onOpenRFQ}
              className="absolute right-[3%] sm:right-[4%] top-[35%] bottom-[35%] w-[18%] sm:w-[14%] rounded-lg cursor-pointer hover:bg-black/5 active:bg-black/10 transition-colors"
              aria-label="Contact Us"
            />
          </div>
        </div>

        {/* Leading Packaging Company in Bangladesh (Screenshot 2026-11-04 130341.png) */}
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
