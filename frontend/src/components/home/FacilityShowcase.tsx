"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Zap, Factory, ShieldCheck, ArrowRight, Play, X } from "lucide-react";

export default function FacilityShowcase() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const pillars = [
    {
      icon: <Award className="w-5 h-5 text-emerald-600" />,
      metric: "LEED Platinum",
      label: "Eco Factory Campus",
      desc: "USGBC certified zero-carbon plant",
    },
    {
      icon: <Zap className="w-5 h-5 text-cyan-600" />,
      metric: "100% Green",
      label: "Renewable Energy",
      desc: "Solar powered sustainable operations",
    },
    {
      icon: <Factory className="w-5 h-5 text-blue-600" />,
      metric: "50M+ Units",
      label: "Monthly Capacity",
      desc: "High-speed precision automated lines",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />,
      metric: "Class 100k",
      label: "Pharma Cleanrooms",
      desc: "Sterile dust-free packaging hygiene",
    },
  ];

  return (
    <section
      id="about"
      className="relative w-full bg-gradient-to-b from-white via-[#fbfdff] to-[#f4f8fb] overflow-hidden py-16 sm:py-24 min-h-[560px] lg:min-h-[640px] flex items-center select-none"
    >
      {/* Ambient Radial Glow Orbs */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-cyan-400/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-emerald-400/8 rounded-full blur-[140px] pointer-events-none" />

      {/* Right Side: High-res factory campus backdrop touching the right screen edge */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[58%] lg:w-[54%] xl:w-[52%] h-full pointer-events-none opacity-40 md:opacity-100 transition-opacity z-0">
        <div className="relative w-full h-full">
          <Image
            src="/cropped/factory-building.png"
            alt="Xclusive Can Limited LEED Platinum Factory Campus"
            fill
            className="object-cover object-right"
            priority
          />
          {/* Subtle soft white gradient feather on left edge only so text stays readable */}
          <div className="absolute inset-y-0 left-0 w-36 sm:w-56 bg-gradient-to-r from-white via-white/85 to-transparent md:block hidden" />
        </div>
      </div>

      {/* Main Content Container matching fluid grand canvas */}
      <div className="relative z-10 w-[98%] max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="max-w-[700px] space-y-6 sm:space-y-7">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-50/90 border border-cyan-200/70 text-cyan-800 text-xs font-bold uppercase tracking-wider shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>World-Class Packaging Plant &bull; Since 2010</span>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-slate-900 tracking-tight leading-[1.08]">
              About{" "}
              <span className="bg-gradient-to-r from-slate-900 via-[#1f5f8b] to-[#18b2a0] bg-clip-text text-transparent">
                Us
              </span>
            </h2>
            <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#1f5f8b] to-[#18b2a0]" />
          </div>

          {/* Core Message in Slate-Blue */}
          <p className="text-lg sm:text-xl lg:text-[21px] font-semibold text-[#3b667e] leading-[1.48] tracking-normal">
            We empower your brand with custom engineered tin and plastic packaging solutions that give you a
            competitive edge in domestic and global markets.
          </p>

          {/* 4 Minimalist Luxury Stat Cards */}
          <div className="grid grid-cols-2 gap-3.5 pt-1">
            {pillars.map((item, idx) => (
              <div
                key={idx}
                className="group p-3.5 sm:p-4 rounded-2xl bg-white/85 hover:bg-white backdrop-blur-md border border-slate-200/70 hover:border-cyan-300 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <b className="block text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-cyan-700 transition-colors">
                      {item.metric}
                    </b>
                    <small className="text-[11px] text-slate-500 font-medium block">
                      {item.label}
                    </small>
                  </div>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium pl-0.5 line-clamp-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-[#1f5f8b] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all active:scale-95 group"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <button
              onClick={() => setIsVideoOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 bg-white/80 hover:bg-white text-slate-700 font-bold text-sm shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 text-cyan-600 fill-cyan-600" />
              <span>Plant Video Tour</span>
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          onClick={() => setIsVideoOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20"
          >
            <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-white/10 text-white">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-300">
                Xclusive Can Limited &bull; LEED Platinum Factory Campus
              </span>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Factory Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
