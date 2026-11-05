"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Building2,
  Filter,
  Droplets,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface ServiceCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  position: "top-left" | "bottom-left" | "top-right" | "bottom-right";
  link: string;
}

const SERVICES: ServiceCard[] = [
  {
    id: "residential",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        stroke="#00c2e8"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 6h12v22H10z" />
        <path d="M14 6V3h4v3" />
        <path d="M13 14h6" />
        <circle cx="16" cy="20" r="2" fill="#00c2e8" />
      </svg>
    ),
    title: "Residential Waters",
    desc: "Lorem ipsum dolor sit amet adilit sed eiusmte mpor.",
    position: "top-left",
    link: "/#contact",
  },
  {
    id: "filtration",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        stroke="#00c2e8"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 4l-4 6c-2 3-2 6 0 8a5.7 5.7 0 008 0c2-2 2-5 0-8l-4-6z" />
        <path d="M7 26c3 2 7 2 10 0s7-2 10 0" />
        <path d="M7 29c3 2 7 2 10 0s7-2 10 0" />
      </svg>
    ),
    title: "Filtration Plants",
    desc: "Lorem ipsum dolor sit amet adilit sed eiusmte mpor.",
    position: "bottom-left",
    link: "/sustainability",
  },
  {
    id: "commercial",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        stroke="#00c2e8"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 4h8v24h-8z" />
        <path d="M14 4V2h4v2" />
        <path d="M12 11l8 3" />
        <path d="M12 18l8 3" />
      </svg>
    ),
    title: "Commercial Waters",
    desc: "Lorem ipsum dolor sit amet adilit sed eiusmte mpor.",
    position: "top-right",
    link: "/products",
  },
  {
    id: "softening",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        stroke="#00c2e8"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 6c0 0-4 6-4 9a4 4 0 008 0c0-3-4-9-4-9z" />
        <path d="M6 20c2 4 6 7 10 7s8-3 10-7" />
        <path d="M8 17c-2 2-2 4-2 6s2 3 4 3" />
        <path d="M24 17c2 2 2 4 2 6s-2 3-4 3" />
      </svg>
    ),
    title: "Water Softening",
    desc: "Lorem ipsum dolor sit amet adilit sed eiusmte mpor.",
    position: "bottom-right",
    link: "/sustainability",
  },
];

export default function WaterFilteringServices() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const openRFQ = () => {
    window.dispatchEvent(new CustomEvent("open-rfq"));
  };

  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-[#f5fafe] via-[#edf6fd] to-white overflow-hidden">
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

      <div className="max-w-[1638px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0f172a] leading-[1.2] tracking-tight">
            Protect Your Family with Best Water <br className="hidden sm:inline" />
            Filtering System Services
          </h2>
        </div>

        {/* 
          Desktop Composition: Center Delivery Man flanked by 4 Floating White Cards 
          (Matching Screenshot 076cf6d4 exactly)
        */}
        <div className="relative min-h-[520px] lg:min-h-[600px] flex items-center justify-center">
          {/* Subtle Circular Radial Glow behind the man */}
          <div className="absolute w-[440px] sm:w-[540px] h-[440px] sm:h-[540px] rounded-full bg-white shadow-[0_15px_60px_rgba(0,194,232,0.12)] border border-white/60 pointer-events-none" />

          {/* Center Delivery Technician Image with 5-Gallon Bottle */}
          <div className="relative z-10 w-full max-w-[420px] sm:max-w-[480px] aspect-[4/5] flex items-end justify-center">
            {/* Cropped exact delivery person graphic from Screenshot 076cf6d4 */}
            <div className="relative w-full h-full overflow-hidden rounded-full">
              <div className="w-[280%] h-[120%] relative -left-[90%] -top-[10%]">
                <Image
                  src="/acuasafe/section-delivery-man.png"
                  alt="Acuasafe Professional Water Delivery Specialist with 5-Gallon Jar"
                  fill
                  className="object-contain object-center drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* 
            FLOATING CARDS (Positioned on Left & Right)
          */}
          {/* 1. Top-Left: Residential Waters */}
          <div
            onMouseEnter={() => setHoveredCard("residential")}
            onMouseLeave={() => setHoveredCard(null)}
            className="lg:absolute left-4 xl:left-12 top-8 z-20 w-full sm:w-[280px] xl:w-[310px] bg-white rounded-2xl p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,34,102,0.08)] border border-slate-100 hover:shadow-[0_20px_50px_rgba(0,194,232,0.2)] hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer mb-6 lg:mb-0"
            onClick={openRFQ}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              {SERVICES[0].icon}
            </div>
            <h3 className="text-lg font-bold text-[#0f172a] mb-2 group-hover:text-[#00c2e8] transition-colors">
              {SERVICES[0].title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {SERVICES[0].desc}
            </p>
          </div>

          {/* 2. Bottom-Left: Filtration Plants */}
          <div
            onMouseEnter={() => setHoveredCard("filtration")}
            onMouseLeave={() => setHoveredCard(null)}
            className="lg:absolute left-4 xl:left-12 bottom-8 z-20 w-full sm:w-[280px] xl:w-[310px] bg-white rounded-2xl p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,34,102,0.08)] border border-slate-100 hover:shadow-[0_20px_50px_rgba(0,194,232,0.2)] hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer mb-6 lg:mb-0"
            onClick={openRFQ}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              {SERVICES[1].icon}
            </div>
            <h3 className="text-lg font-bold text-[#0f172a] mb-2 group-hover:text-[#00c2e8] transition-colors">
              {SERVICES[1].title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {SERVICES[1].desc}
            </p>
          </div>

          {/* 3. Top-Right: Commercial Waters */}
          <div
            onMouseEnter={() => setHoveredCard("commercial")}
            onMouseLeave={() => setHoveredCard(null)}
            className="lg:absolute right-4 xl:right-12 top-8 z-20 w-full sm:w-[280px] xl:w-[310px] bg-white rounded-2xl p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,34,102,0.08)] border border-slate-100 hover:shadow-[0_20px_50px_rgba(0,194,232,0.2)] hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer mb-6 lg:mb-0"
            onClick={openRFQ}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              {SERVICES[2].icon}
            </div>
            <h3 className="text-lg font-bold text-[#0f172a] mb-2 group-hover:text-[#00c2e8] transition-colors">
              {SERVICES[2].title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {SERVICES[2].desc}
            </p>
          </div>

          {/* 4. Bottom-Right: Water Softening */}
          <div
            onMouseEnter={() => setHoveredCard("softening")}
            onMouseLeave={() => setHoveredCard(null)}
            className="lg:absolute right-4 xl:right-12 bottom-8 z-20 w-full sm:w-[280px] xl:w-[310px] bg-white rounded-2xl p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,34,102,0.08)] border border-slate-100 hover:shadow-[0_20px_50px_rgba(0,194,232,0.2)] hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
            onClick={openRFQ}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              {SERVICES[3].icon}
            </div>
            <h3 className="text-lg font-bold text-[#0f172a] mb-2 group-hover:text-[#00c2e8] transition-colors">
              {SERVICES[3].title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {SERVICES[3].desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
