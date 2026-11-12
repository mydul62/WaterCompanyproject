"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Handshake,
  Leaf,
  Microscope,
  Package,
  Sparkles,
  Users,
} from "lucide-react";

interface GridExploreCard {
  num: string;
  tag: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: React.ComponentType<{ className?: string }>;
  iconWrapClass: string;
  badgeClass: string;
  tintClass: string;
  barClass: string;
}

const COMPACT_EXPLORE_CARDS: GridExploreCard[] = [
  {
    num: "02",
    tag: "Company Heritage",
    title: "Our Story",
    description:
      "Learn about our journey to becoming Bangladesh's leading packaging pioneer.",
    href: "/our-story",
    cta: "Read Story",
    icon: BookOpen,
    iconWrapClass:
      "bg-sky-50 border-sky-200/80 text-sky-600 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600",
    badgeClass: "text-sky-700 bg-sky-50/90 border-sky-200/70",
    tintClass: "from-white/95 via-white/90 to-sky-50/50",
    barClass: "from-sky-400 to-blue-600",
  },
  {
    num: "03",
    tag: "LEED Platinum",
    title: "Sustainability",
    description:
      "Discover our LEED Platinum zero-carbon & recyclable polymer vision.",
    href: "/sustainability",
    cta: "Green Vision",
    icon: Leaf,
    iconWrapClass:
      "bg-emerald-50 border-emerald-200/80 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600",
    badgeClass: "text-emerald-700 bg-emerald-50/90 border-emerald-200/70",
    tintClass: "from-white/95 via-white/90 to-emerald-50/60",
    barClass: "from-emerald-400 to-teal-600",
  },
  {
    num: "04",
    tag: "CAD & Testing",
    title: "R & D Center",
    description:
      "Explore our in-house CAD tooling and polymer barrier testing labs.",
    href: "/rnd",
    cta: "Explore Lab",
    icon: Microscope,
    iconWrapClass:
      "bg-cyan-50 border-cyan-200/80 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-600",
    badgeClass: "text-cyan-700 bg-cyan-50/90 border-cyan-200/70",
    tintClass: "from-white/95 via-white/90 to-cyan-50/55",
    barClass: "from-cyan-400 to-sky-600",
  },
  {
    num: "05",
    tag: "Client Impact",
    title: "Case Studies",
    description:
      "See how we've helped Fortune 500 brands scale their packaging needs.",
    href: "/case-studies",
    cta: "View Cases",
    icon: BarChart3,
    iconWrapClass:
      "bg-indigo-50 border-indigo-200/80 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600",
    badgeClass: "text-indigo-700 bg-indigo-50/90 border-indigo-200/70",
    tintClass: "from-white/95 via-white/90 to-indigo-50/50",
    barClass: "from-indigo-400 to-blue-600",
  },
];

interface WideExploreCard {
  num: string;
  tag: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  highlights: string[];
  icon: React.ComponentType<{ className?: string }>;
  iconWrapClass: string;
  badgeClass: string;
  barClass: string;
}

const WIDE_EXPLORE_CARDS: WideExploreCard[] = [
  {
    num: "06",
    tag: "Brands & OEM",
    title: "Partnerships",
    description:
      "Collaborate on private labeling, OEM manufacturing and global export.",
    href: "/brands-we-work-with",
    cta: "Partner Brands",
    highlights: ["Private Labeling", "OEM Supply", "Enterprise Contracts"],
    icon: Handshake,
    iconWrapClass:
      "bg-blue-50 border-blue-200/80 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600",
    badgeClass: "text-blue-700 bg-blue-50/90 border-blue-200/70",
    barClass: "from-blue-500 to-cyan-500",
  },
  {
    num: "07",
    tag: "Engineering & Ops",
    title: "Careers",
    description:
      "Join our innovative engineering and cleanroom manufacturing team.",
    href: "/careers",
    cta: "Open Positions",
    highlights: ["Class 100k Cleanrooms", "Tooling & QC", "Kaliakoir Campus"],
    icon: Users,
    iconWrapClass:
      "bg-teal-50 border-teal-200/80 text-teal-600 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600",
    badgeClass: "text-teal-700 bg-teal-50/90 border-teal-200/70",
    barClass: "from-teal-400 to-emerald-500",
  },
];

export default function ExploreGrid() {
  return (
    <section
      id="explore"
      className="relative w-full bg-gradient-to-b from-[#f8fafc] via-[#f2f8fc] to-[#f8fafc] py-20 sm:py-28 overflow-hidden select-none"
    >
      {/* Subtle Ambient Coastal Backdrop Glows */}
      <div
        aria-hidden="true"
        className="absolute -top-10 right-1/4 w-[620px] h-[620px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-10 w-[660px] h-[660px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)" }}
      />

      <div className="w-[98%] max-w-[1920px] mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Heading */}
        <div
          data-reveal="up"
          className="text-center space-y-4 mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-cyan-200/90 text-cyan-800 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>Corporate Knowledge Base</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.1]">
              Explore{" "}
              <span className="bg-gradient-to-r from-[#094e9b] via-[#127bc4] to-[#00a8c6] bg-clip-text text-transparent">
                More
              </span>
            </h2>
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#094e9b] to-[#00c2d8] mx-auto" />
          </div>

          <p className="text-slate-600 font-medium text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Deep dive into our engineering capabilities, sustainability metrics,
            and corporate divisions.
          </p>
        </div>

        {/* Balanced 7-Card Editorial Bento Grid (Zero Orphan Slots Across Viewports) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-stretch">
          {/* 01 — Flagship Card: Find Our Products */}
          <Link
            href="/products"
            data-reveal="scale"
            className="group relative sm:col-span-2 lg:col-span-6 lg:row-span-2 rounded-3xl bg-gradient-to-br from-[#061d34] via-[#0a3154] to-[#0e4e73] text-white p-7 sm:p-9 lg:p-10 shadow-[0_20px_50px_rgba(6,29,52,0.22)] hover:shadow-[0_28px_65px_rgba(0,168,198,0.28)] border border-white/15 hover:border-cyan-300/40 hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between overflow-hidden min-h-[320px] lg:min-h-[420px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {/* Ambient Concentric Rings & Light Sheen */}
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full border border-cyan-400/15 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
            <div className="absolute -top-6 -right-6 w-52 h-52 rounded-full border border-cyan-300/20 pointer-events-none" />
            <div className="absolute -bottom-24 right-8 w-80 h-80 rounded-full bg-cyan-400/20 blur-[90px] pointer-events-none" />

            {/* Subtle Bottle Product Visual Anchored Bottom-Right */}
            <div className="absolute right-1 sm:right-5 bottom-0 w-32 sm:w-44 lg:w-48 xl:w-52 h-[78%] pointer-events-none opacity-85 sm:opacity-95 group-hover:scale-105 group-hover:-translate-y-1.5 transition-all duration-700">
              <Image
                src="/images/hero/bottle-vertical.png"
                alt="Noor Plastic engineered PET bottle"
                fill
                sizes="(max-width: 640px) 140px, 220px"
                className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)]"
              />
            </div>

            {/* Top Meta Row */}
            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-colors duration-300">
                  <Package className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-400/15 border border-cyan-300/30 text-cyan-200 text-xs font-bold uppercase tracking-wider">
                  Product Portfolio
                </span>
              </div>
              <span className="text-xs font-extrabold tracking-widest text-cyan-200/60">
                01
              </span>
            </div>

            {/* Main Copy (Constrained Width So Image Never Overlaps Copy) */}
            <div className="relative z-10 max-w-[66%] sm:max-w-[62%] space-y-3 my-8">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white group-hover:text-cyan-200 transition-colors leading-tight">
                Find Our Products
              </h3>
              <p className="text-sm sm:text-base lg:text-[17px] text-slate-200/90 leading-relaxed font-medium">
                Browse our complete range of bottles, canisters and industrial
                jars engineered for purity and durability.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["PET Bottles", "Water Jars", "Industrial Cans"].map((pill) => (
                  <span
                    key={pill}
                    className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-[11px] sm:text-xs font-semibold text-cyan-100"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/15 max-w-[66%] sm:max-w-[62%]">
              <span className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-cyan-300 group-hover:text-white transition-colors">
                <span>Browse Catalog</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </div>
          </Link>

          {/* 02–05 — Top-Right 2x2 Quadrant Cards */}
          {COMPACT_EXPLORE_CARDS.map((item, idx) => {
            const Icon = item.icon;
            const delays = ["delay-75", "delay-100", "delay-150", "delay-200"];
            return (
              <Link
                key={item.title}
                href={item.href}
                data-reveal="scale"
                className={`water-fill-card group relative lg:col-span-3 p-6 sm:p-7 rounded-3xl bg-gradient-to-br ${item.tintClass} backdrop-blur-xl border border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.04)] flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${delays[idx % delays.length]}`}
              >
                <div className="space-y-4">
                  {/* Top Icon + Number Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-xs transition-all duration-300 group-hover:scale-105 ${item.iconWrapClass}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-extrabold tracking-widest text-slate-300 group-hover:text-cyan-600 transition-colors">
                      {item.num}
                    </span>
                  </div>

                  {/* Badge + Heading + Description */}
                  <div className="space-y-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[11px] font-bold uppercase tracking-wider ${item.badgeClass}`}
                    >
                      {item.tag}
                    </span>

                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-[#094e9b] transition-colors flex items-center justify-between gap-2 leading-snug pt-0.5">
                      <span>{item.title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-cyan-600 shrink-0" />
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action & Expanding Accent Line */}
                <div className="pt-5 mt-5 border-t border-slate-100/90 space-y-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-700 group-hover:text-[#094e9b] transition-colors">
                    <span>{item.cta}</span>
                    <ArrowRight className="w-4 h-4 -translate-x-1 opacity-70 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-cyan-600" />
                  </div>
                  <div
                    className={`w-0 group-hover:w-full h-0.5 bg-gradient-to-r ${item.barClass} rounded-full transition-all duration-500`}
                  />
                </div>
              </Link>
            );
          })}

          {/* 06–07 — Bottom Wide Paired Cards */}
          {WIDE_EXPLORE_CARDS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                data-reveal="scale"
                className={`water-fill-card group relative lg:col-span-6 p-6 sm:p-7 lg:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.04)] flex flex-col justify-between gap-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${idx === 1 ? "delay-100" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center shadow-xs transition-all duration-300 group-hover:scale-105 shrink-0 ${item.iconWrapClass}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[11px] font-bold uppercase tracking-wider ${item.badgeClass}`}
                      >
                        {item.tag}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-[#094e9b] transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-extrabold tracking-widest text-slate-300 group-hover:text-cyan-600 transition-colors">
                      {item.num}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-500 group-hover:bg-[#094e9b] group-hover:text-white group-hover:border-[#094e9b] transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-slate-100/90 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      {item.highlights.map((chip) => (
                        <span
                          key={chip}
                          className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200/70 text-xs font-semibold text-slate-600 group-hover:bg-white transition-colors"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#094e9b] group-hover:text-cyan-700 transition-colors shrink-0">
                      <span>{item.cta}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>

                  <div
                    className={`w-0 group-hover:w-full h-0.5 bg-gradient-to-r ${item.barClass} rounded-full transition-all duration-500`}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
