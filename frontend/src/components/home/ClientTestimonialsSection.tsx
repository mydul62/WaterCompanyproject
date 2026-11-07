"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarCropOffset: string;
  quote: string;
}

const TESTIMONIAL_SETS: Testimonial[][] = [
  [
    {
      id: "nicolas",
      name: "Nicolas Lawson",
      role: "Designer",
      avatarCropOffset: "-left-[18%]",
      quote:
        "Lorem ipsum dolor amet consectur adicing elit sed do usmod tempor incididunt enim ad minim veniam.",
    },
    {
      id: "michael",
      name: "Michael Bean",
      role: "Founder CEO",
      avatarCropOffset: "-left-[122%]",
      quote:
        "Lorem ipsum dolor amet consectur adicing elit sed do usmod tempor incididunt enim ad minim veniam.",
    },
  ],
  [
    {
      id: "sarah",
      name: "Sarah Jenkins",
      role: "Operations Director",
      avatarCropOffset: "-left-[18%]",
      quote:
        "Acuasafe provides exceptionally pure drinking water with immaculate scheduled corporate deliveries.",
    },
    {
      id: "david",
      name: "David Chen",
      role: "Facility Manager",
      avatarCropOffset: "-left-[122%]",
      quote:
        "The automated 5-gallon jar refilling service has completely eliminated bottled water stockouts across our office campus.",
    },
  ],
  [
    {
      id: "elena",
      name: "Elena Rostova",
      role: "Quality Assurance Lead",
      avatarCropOffset: "-left-[18%]",
      quote:
        "Their 5-step filtration and certified laboratory standards give our medical facility complete peace of mind.",
    },
    {
      id: "robert",
      name: "Robert Miller",
      role: "Hospitality Manager",
      avatarCropOffset: "-left-[122%]",
      quote:
        "Custom mineral water bottles designed specifically for our boutique hotel guests have received non-stop praise.",
    },
  ],
];

export default function ClientTestimonialsSection() {
  const [activeSet, setActiveSet] = useState(0);

  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-[#f4f9fd] via-[#eaf4fc] to-[#f4f9fd] overflow-hidden">
      {/* Top Wave Divider */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 text-white fill-current"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L1440,0 L1440,16 C1080,48 720,0 360,32 L0,16 Z" />
        </svg>
      </div>

      <div className="max-w-[1643px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        {/* Header Row: Title & Pagination Dots (Screenshot 27e76023) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0f172a] leading-[1.2] tracking-tight">
              What Our Client are Saying <br className="hidden sm:inline" />
              About Acuasafe
            </h2>
          </div>

          {/* Interactive Pagination Dots matching Screenshot */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {TESTIMONIAL_SETS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSet(idx)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  activeSet === idx
                    ? "w-8 bg-[#00c2e8] shadow-[0_0_10px_rgba(0,194,232,0.6)]"
                    : "w-3 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Show testimonials set ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 2 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-10">
          {TESTIMONIAL_SETS[activeSet].map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_15px_45px_rgba(0,34,102,0.06)] border border-slate-100 flex flex-col sm:flex-row items-start gap-6 sm:gap-8 transition-all duration-300 hover:shadow-[0_20px_55px_rgba(0,194,232,0.14)] hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-300"
            >
              {/* Circular Avatar from Screenshot 27e76023 */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md">
                <div
                  className="w-[280%] h-[120%] relative -top-[10%]"
                  style={{
                    left: t.id === "nicolas" || t.id === "sarah" || t.id === "elena" ? "-18%" : "-125%",
                  }}
                >
                  <Image
                    src="/acuasafe/section-testimonials.png"
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* 5 Gold Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, sIdx) => (
                    <Star
                      key={sIdx}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base text-slate-500 leading-relaxed mb-4">
                  {t.quote}
                </p>

                {/* Name & Role */}
                <div>
                  <h4 className="text-base font-bold text-[#0f172a]">{t.name}</h4>
                  <p className="text-xs font-semibold text-[#00c2e8]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 text-white fill-current"
          preserveAspectRatio="none"
        >
          <path d="M0,24 C360,48 720,0 1080,36 C1260,44 1380,30 1440,24 L1440,48 L0,48 Z" />
        </svg>
      </div>
    </section>
  );
}
