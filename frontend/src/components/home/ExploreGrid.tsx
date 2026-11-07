"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ExploreItem {
  icon: string;
  title: string;
  description: string;
  href: string;
}

const EXPLORE_ITEMS: ExploreItem[] = [
  {
    icon: "🛍️",
    title: "Find Our Products",
    description: "Browse our complete range of bottles, canisters and industrial jars.",
    href: "/products",
  },
  {
    icon: "📖",
    title: "Our Story",
    description: "Learn about our journey to becoming Bangladesh's leading packaging pioneer.",
    href: "/#about",
  },
  {
    icon: "👥",
    title: "Careers",
    description: "Join our innovative engineering and cleanroom manufacturing team.",
    href: "/#overview",
  },
  {
    icon: "🌱",
    title: "Sustainability",
    description: "Discover our LEED Platinum zero-carbon & recyclable polymer vision.",
    href: "/#overview",
  },
  {
    icon: "🔬",
    title: "R & D Center",
    description: "Explore our in-house CAD tooling and polymer barrier testing labs.",
    href: "/#supply-chain",
  },
  {
    icon: "🏭",
    title: "Plant Tour",
    description: "Take an interactive walkthrough of our high-speed automation lines.",
    href: "/#facilities",
  },
  {
    icon: "✍️",
    title: "Industry Blog",
    description: "Read engineering articles, polymer trends and sustainable solutions.",
    href: "/#media",
  },
  {
    icon: "📊",
    title: "Case Studies",
    description: "See how we've helped Fortune 500 brands scale their packaging needs.",
    href: "/#about",
  },
  {
    icon: "🤝",
    title: "Partnerships",
    description: "Collaborate on private labeling, OEM manufacturing and global export.",
    href: "/#overview",
  },
  {
    icon: "🎯",
    title: "Quality Certifications",
    description: "ISO 9001, HACCP, GMP and Class 100k cleanroom audited standards.",
    href: "/#footer",
  },
  {
    icon: "🌍",
    title: "Export Network",
    description: "Supplying premier packaging solutions across Asia, Europe and America.",
    href: "/#supply-chain",
  },
  {
    icon: "💡",
    title: "Innovation Lab",
    description: "Next-generation bio-degradable resins and ultra-lightweight designs.",
    href: "/#overview",
  },
  {
    icon: "📞",
    title: "Direct Engineering Support",
    description: "Talk to our mold toolmakers and packaging engineers today.",
    href: "/#footer",
  },
];

export default function ExploreGrid() {
  return (
    <section id="explore" className="relative w-full bg-[#f8fafc] py-20 sm:py-28 overflow-hidden select-none">
      {/* Ambient Radial Glass Glow */}
      <div className="absolute top-1/4 right-10 w-[550px] h-[550px] bg-sky-400/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-cyan-400/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-[98%] max-w-[1920px] mx-auto px-4 sm:px-8 relative z-10">
        <div data-reveal="up" className="text-center space-y-3 mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider shadow-sm">
            <span>Corporate Knowledge Base</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Explore More
          </h2>
          <p className="text-slate-500 font-semibold text-base sm:text-lg max-w-2xl mx-auto">
            Deep dive into our engineering capabilities, sustainability metrics, and corporate divisions.
          </p>
        </div>

          {/* 13 Glass Frosted Tiles Grid with Liquid Water Rise Hover */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {EXPLORE_ITEMS.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="water-fill-card group relative p-6 sm:p-7 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(0,194,232,0.18)] hover:border-cyan-400/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50/90 border border-slate-100 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition-colors flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-cyan-600" />
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Glowing Line on Hover */}
              <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-5 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
