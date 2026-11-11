"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RFQDrawer from "@/components/rfq/RFQDrawer";
import {
  ShieldCheck,
  Award,
  Zap,
  Factory,
  Leaf,
  Globe,
  Clock,
  ArrowRight,
  Sparkles,
  Building2,
  Users,
  Layers,
  Recycle,
  Microscope,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  FileCheck2,
} from "lucide-react";

export default function OurBusinessPage() {
  const [isRFQOpen, setIsRFQOpen] = useState(false);
  const [expandedValue, setExpandedValue] = useState(false);

  // 4 Core Value Pillars
  const valueOfferings = [
    {
      num: "01",
      title: "Unwavering Trust & Partnership",
      desc: "Nurturing lasting relationships with multinational FMCG and pharmaceutical conglomerates through open communication, mutual integrity, and consistency.",
      icon: ShieldCheck,
    },
    {
      num: "02",
      title: "Precision Engineering & Tooling",
      desc: "In-house 3D CAD modeling, custom mold fabrication, and robotic blow/injection molding engineered to achieve microscopic dimensional accuracy.",
      icon: Factory,
    },
    {
      num: "03",
      title: "100% Eco-Friendly Materials",
      desc: "Zero-compromise safety using 100% recyclable virgin polymers and eco-friendly tinplate to safeguard food, pharmaceuticals, and our planet.",
      icon: Leaf,
    },
    {
      num: "04",
      title: "Synchronized Regional Supply Chain",
      desc: "From raw resin intake to dockside delivery, our synchronized logistics guarantee on-time delivery across Bangladesh, Asia, and global markets.",
      icon: Clock,
    },
  ];

  // 6 Why Choose Us Bento Cards
  const whyChooseUsCards = [
    {
      icon: Award,
      title: "32+ Years Industry Leadership",
      desc: "Over three decades of specialized mastery in custom plastic and metal packaging manufacturing with unmatched market expertise.",
    },
    {
      icon: Building2,
      title: "Kaliakoir Industrial Operations",
      desc: "Plastic manufacturing, importing & supplying facility at Holding #5, Ward #02, Latifpur-B, Kaliakoir-1750, Gazipur, Dhaka.",
    },
    {
      icon: FileCheck2,
      title: "Global Safety Certifications",
      desc: "Full adherence to international standards: ISO 22000, GMP, and HACCP certifications for flawless packaging hygiene and compliance.",
    },
    {
      icon: Layers,
      title: "End-to-End Turnkey Packaging",
      desc: "Complete lifecycle capability: from 3D conceptual modeling and mold tooling to high-speed blow molding, screen printing, and hermetic sealing.",
    },
    {
      icon: Globe,
      title: "Dependable Regional Supply Chain",
      desc: "Agile, responsive supply agreements ensuring uninterrupted production schedules for clients across Asia, the Middle East, and Africa.",
    },
    {
      icon: Recycle,
      title: "100% Recyclable Solutions",
      desc: "Circular economy initiatives utilizing food-safe virgin recyclable polymers and sustainable tinplate, minimizing environmental footprint.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Glassmorphic Floating Header */}
      <Navbar />

      <main className="flex-1 relative">
        {/* ══════════════════════════════════════════════════════════════
            HERO SECTION: Full-Height Sticky Hero with Corporate Office
           ══════════════════════════════════════════════════════════════ */}
        {/* ============================================================ */}
        {/* 1. HERO SECTION: FULL-HEIGHT ARCHITECTURE (100VH)             */}
        {/* ============================================================ */}
        <section
          id="hero"
          className="relative w-full min-h-[540px] sm:min-h-[640px] lg:h-screen lg:min-h-[820px] bg-[#0a1f33] overflow-hidden flex flex-col justify-between items-center select-none"
        >
          {/* Authentic Corporate Office Team & Workstation Background */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/business-hero-office.jpg"
              alt="Noor Plastic Industries Office and Operations Team"
              fill
              className="object-cover object-center opacity-85 scale-102 transition-transform duration-1000 ease-out"
              priority
            />
            {/* Multi-layer Gradient Vignettes */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f33] via-black/50 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/55" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,31,51,0.6)_100%)]" />
          </div>

          {/* Top Spacer for Navbar */}
          <div className="h-28 sm:h-36 shrink-0" />

          {/* Centered Typography & CTAs */}
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-bold shadow-xl shadow-black/20">
              <Building2 className="w-4 h-4 text-[#38bdf8] animate-pulse" />
              <span>About Us &bull; Noor Plastic Industries &bull; Kaliakoir, Gazipur</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-[0.18em] sm:tracking-[0.22em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] uppercase pl-[0.18em]">
              Our Business
            </h1>

            <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.28em] font-bold text-[#38bdf8] drop-shadow-lg pl-[0.28em] max-w-3xl mx-auto">
              LEED Platinum Campus &bull; Automated Cleanrooms &bull; 50M+ Monthly Units
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setIsRFQOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#0a1f33] font-bold text-xs sm:text-sm shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Request Consultation</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <a
                href="#curtain-reveal"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xs sm:text-sm transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Capabilities</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Bottom Area: KPI Bar + Animated Scroll Indicator */}
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-6 sm:pb-8 flex flex-col items-center gap-6">
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <div className="text-xl sm:text-2xl font-black text-white">32+ Years</div>
                <div className="text-[11px] text-cyan-200/90 font-medium uppercase tracking-wider mt-0.5">Manufacturing Mastery</div>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <div className="text-xl sm:text-2xl font-black text-white">50M+ Units</div>
                <div className="text-[11px] text-cyan-200/90 font-medium uppercase tracking-wider mt-0.5">Monthly Production</div>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <div className="text-xl sm:text-2xl font-black text-white">Class 100k</div>
                <div className="text-[11px] text-cyan-200/90 font-medium uppercase tracking-wider mt-0.5">Automated Cleanrooms</div>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <div className="text-xl sm:text-2xl font-black text-white">LEED Platinum</div>
                <div className="text-[11px] text-cyan-200/90 font-medium uppercase tracking-wider mt-0.5">Zero-Carbon Campus</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("curtain-reveal");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer group"
            >
              <span className="text-[11px] uppercase tracking-widest font-semibold group-hover:tracking-[0.25em] transition-all">
                Explore Facilities &amp; Campus
              </span>
              <div className="w-7 h-11 rounded-full border-2 border-white/30 flex items-start justify-center p-1 backdrop-blur-sm group-hover:border-[#38bdf8] transition-colors">
                <div className="w-1.5 h-2.5 rounded-full bg-[#38bdf8] animate-bounce" />
              </div>
            </button>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            CURTAIN BODY: Smooth 3D Rise on Scroll
           ══════════════════════════════════════════════════════════════ */}
        <div
          id="curtain-reveal"
          className="relative bg-white overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow Orbs */}
          <div className="absolute top-40 -left-20 w-[500px] h-[500px] bg-cyan-400/6 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-[800px] -right-20 w-[500px] h-[500px] bg-emerald-400/6 rounded-full blur-[140px] pointer-events-none" />

          {/* ══════════════════════════════════════════════════════════════
              SECTION 1: Who We Are & Eco-Industrial Campus
             ══════════════════════════════════════════════════════════════ */}
          <section id="overview" className="relative w-full py-20 sm:py-28 border-b border-slate-100">
            <div className="w-[91.6667%] max-w-[1920px] mx-auto px-4 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Left Column: Narrative & 3 Feature Highlights (7 Cols) */}
                <div data-reveal="up" className="lg:col-span-7 space-y-7">
                  {/* Eyebrow Badge */}
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-50/90 border border-cyan-200/70 text-cyan-800 text-xs font-bold uppercase tracking-wider shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>World-Class Eco-Industrial Campus</span>
                  </div>

                  {/* Heading */}
                  <div className="space-y-2">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                      Who We{" "}
                      <span className="bg-gradient-to-r from-slate-900 via-[#1f5f8b] to-[#18b2a0] bg-clip-text text-transparent">
                        Are
                      </span>
                    </h2>
                    <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#1f5f8b] to-[#18b2a0]" />
                  </div>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                    The Noor Plastic Industries Kaliakoir facility in Latifpur-B is modern, hygienic, and compliant with
                    Bangladesh industrial safety standards, built for clean polymer processing, pure water bottle packaging, and reliable nationwide supply.
                  </p>

                  {/* 3 Core Highlight Feature Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                    <div className="p-4 rounded-2xl bg-[#f8fbfe] border border-slate-200/70 hover:border-cyan-400/50 hover:shadow-md transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 mb-3 group-hover:scale-110 transition-transform">
                        <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">Class 100k Cleanroom</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">Pristine dust-free packaging for pharmaceuticals and food.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#f8fbfe] border border-slate-200/70 hover:border-emerald-400/50 hover:shadow-md transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-3 group-hover:scale-110 transition-transform">
                        <Award className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">LEED Platinum Plant</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">Zero-carbon emissions, solar energy, and rainwater harvesting.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#f8fbfe] border border-slate-200/70 hover:border-cyan-400/50 hover:shadow-md transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                        <Zap className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">Automated Utilities</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">Centralized European blow molding & injection machinery.</p>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => setIsRFQOpen(true)}
                      className="water-fill-btn inline-flex items-center gap-2.5 px-8 py-3 rounded-xl border-2 border-slate-900 bg-white text-slate-900 font-bold text-sm hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                    >
                      <span>Points of Excellence</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Column: Dual Campus Photos (5 Cols) */}
                <div data-reveal="scale" className="delay-150 lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-center gap-6">
                  {/* Photo 1: Bamboo Grove / Sunlit Path */}
                  <div className="water-fill-card relative w-full sm:w-[280px] lg:w-full xl:w-[280px] aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.08)] border border-slate-200/80 bg-slate-100 group cursor-pointer">
                    <Image
                      src="/images/business-plant-1.jpg"
                      alt="Noor Plastic Industries Kaliakoir Eco-Friendly Campus"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 backdrop-blur-sm px-2.5 py-0.5 rounded-full">Eco Campus</span>
                      <h4 className="text-sm font-bold mt-1 text-white">Kaliakoir Green Grounds</h4>
                    </div>
                  </div>

                  {/* Photo 2: Green Vertical Living Vines Facade */}
                  <div className="water-fill-card relative w-full sm:w-[280px] lg:w-full xl:w-[280px] aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.08)] border border-slate-200/80 bg-slate-100 group mt-0 sm:mt-8 lg:mt-0 xl:mt-8 cursor-pointer">
                    <Image
                      src="/images/business-plant-2.jpg"
                      alt="LEED Platinum Certified Vertical Green Building Facade"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/60 backdrop-blur-sm px-2.5 py-0.5 rounded-full">LEED Platinum</span>
                      <h4 className="text-sm font-bold mt-1 text-white">Vertical Living Garden</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              SECTION 2: The Value We Offer (Interactive 4-Card Bento Grid)
             ══════════════════════════════════════════════════════════════ */}
          <section className="relative w-full py-20 sm:py-28 bg-[#fbfdff] border-b border-slate-100">
            <div className="w-[91.6667%] max-w-[1920px] mx-auto px-4 sm:px-8">
              {/* Header */}
              <div data-reveal="up" className="max-w-3xl mb-14 space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Delivering Tangible Impact</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                  The Value{" "}
                  <span className="bg-gradient-to-r from-slate-900 via-[#1f5f8b] to-[#18b2a0] bg-clip-text text-transparent">
                    We Offer
                  </span>
                </h2>
                <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#1f5f8b] to-[#18b2a0]" />
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal pt-2">
                  At Noor Plastic Industries, value goes beyond the physical container. It lies in the trust we build,
                  the relationships we nurture, and the operational reliability we deliver every day.
                </p>
              </div>

              {/* 4 Interactive Bento Value Cards with Liquid Water Hover */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {valueOfferings.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <article
                      key={idx}
                      data-reveal="up"
                      style={{ animationDelay: `${idx * 100}ms` }}
                      className="water-fill-card group relative rounded-3xl bg-white p-7 sm:p-8 border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,194,232,0.12)] hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Top Row: Number & Icon */}
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-xs font-black text-cyan-600/80 uppercase tracking-widest">
                            {item.num}
                          </span>
                          <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-6 h-6 stroke-[2.2]" />
                          </div>
                        </div>

                        {/* Title & Desc */}
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1f5f8b] transition-colors mb-3 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>

                      {/* Bottom Accent */}
                      <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-[#1f5f8b] transition-colors">
                        <span>Pillar {item.num}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Expandable Deep Corporate Narrative */}
              <div data-reveal="up" className="mt-10 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-bold text-slate-900">
                      Our End-to-End Partnership Model
                    </h4>
                    <p className="text-sm text-slate-500">
                      Explore how we guide projects from 3D concept prototyping to global delivery.
                    </p>
                  </div>
                  <button
                    onClick={() => setExpandedValue(!expandedValue)}
                    className="water-fill-btn px-6 py-2.5 rounded-xl border border-slate-900 bg-white text-slate-900 font-bold text-xs uppercase tracking-wider hover:shadow transition-all shrink-0 cursor-pointer"
                  >
                    <span>{expandedValue ? "Hide Details" : "Read Full Philosophy"}</span>
                  </button>
                </div>

                {expandedValue && (
                  <div className="mt-6 pt-6 border-t border-slate-100 text-sm sm:text-base text-slate-600 leading-relaxed space-y-4 animate-in fade-in duration-300">
                    <p>
                      Our core values shape our company culture — guiding every decision, action, and interaction.
                      They unite our team around what Noor Plastic Industries stands for globally, inspiring a shared sense of
                      purpose and pride. True to our heritage, these values also serve as an inspiration for the future,
                      ensuring our continued relevance in an increasingly dynamic and competitive world.
                    </p>
                    <p>
                      We offer our clients comprehensive support, from initial concepts to final delivery, ensuring
                      efficiency, quality, and circumspection at every stage. Whether it&apos;s developing advanced packaging
                      for fast-moving consumer goods or crafting specialized solutions for industrial needs, our focus
                      remains on delivering tangible results and long-term value for our partners worldwide.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              SECTION 3: Our Purpose Drives Our Culture (Balanced Split Layout)
             ══════════════════════════════════════════════════════════════ */}
          <section className="relative w-full py-20 sm:py-28 bg-white border-b border-slate-100">
            <div className="w-[91.6667%] max-w-[1920px] mx-auto px-4 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Left Column: Mission Narrative (6 Cols) */}
                <div data-reveal="up" className="lg:col-span-6 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Corporate Mission &amp; Purpose</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                    Our Purpose Drives{" "}
                    <span className="bg-gradient-to-r from-slate-900 via-[#1f5f8b] to-[#18b2a0] bg-clip-text text-transparent">
                      Our Culture
                    </span>
                  </h2>
                  <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#1f5f8b] to-[#18b2a0]" />

                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                    Our culture at Noor Plastic Industries is built around a shared purpose: to shape the future of sustainable
                    and intelligent packaging through innovation and collaboration. This purpose fuels every decision we
                    make and every challenge we embrace.
                  </p>

                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
                    We believe that true innovation thrives in a culture of curiosity, teamwork, and continuous learning.
                    Every member of our organization contributes ideas that move us forward, creating a progressive
                    environment that inspires accountability and excellence.
                  </p>

                  {/* Highlights Checklist */}
                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Zero-Defect Quality Assurance Protocol</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Continuous Technical Workforce Training</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Inclusive Workplace Safety Standards</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: 3 Culture Pillar Cards (6 Cols) */}
                <div data-reveal="scale" className="delay-150 lg:col-span-6 space-y-4">
                  <div className="p-6 rounded-2xl bg-[#f8fbfe] border border-slate-200/80 hover:border-cyan-400/50 hover:shadow-md transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shrink-0 group-hover:scale-110 transition-transform">
                        <TrendingUp className="w-6 h-6 stroke-[2.2]" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-[#1f5f8b] transition-colors">
                          Curiosity &amp; Boundless Innovation
                        </h4>
                        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                          Empowering our engineers to pioneer novel polymer blends and ergonomic shapes that reduce raw material usage while increasing bottle durability.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#f8fbfe] border border-slate-200/80 hover:border-emerald-400/50 hover:shadow-md transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 transition-transform">
                        <Users className="w-6 h-6 stroke-[2.2]" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-[#1f5f8b] transition-colors">
                          Team Synergy &amp; Personal Ownership
                        </h4>
                        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                          Every team member holds personal ownership of packaging safety, ensuring that every batch leaving the dock is compliant with international benchmarks.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#f8fbfe] border border-slate-200/80 hover:border-blue-400/50 hover:shadow-md transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
                        <Globe className="w-6 h-6 stroke-[2.2]" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-[#1f5f8b] transition-colors">
                          Global Relevance &amp; Sustainability
                        </h4>
                        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                          Aligning industrial practices with international climate goals by investing in post-consumer recycled resins and zero-landfill manufacturing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              SECTION 4: Our Strength (32+ Years Manufacturing Powerhouse)
             ══════════════════════════════════════════════════════════════ */}
          <section className="relative w-full py-20 sm:py-28 bg-[#fbfdff] border-b border-slate-100">
            <div className="w-[91.6667%] max-w-[1920px] mx-auto px-4 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Left Column: Heading & Capabilities (6 Cols) */}
                <div data-reveal="up" className="lg:col-span-6 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Decades of Proven Mastery</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                    Our{" "}
                    <span className="bg-gradient-to-r from-slate-900 via-[#1f5f8b] to-[#18b2a0] bg-clip-text text-transparent">
                      Strength
                    </span>
                  </h2>
                  <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#1f5f8b] to-[#18b2a0]" />

                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                    With over 32 years of hands-on experience in the manufacturing of plastic and metal packaging products,
                    we have built a legacy of excellence, innovation, and trust. Our strength lies in our deep industry
                    expertise, cutting-edge technology, and unwavering commitment to quality.
                  </p>

                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
                    Supported by state-of-the-art European blow molding and injection machinery, a skilled technical workforce,
                    and a dedicated R&amp;D team, we consistently achieve the highest standards of performance, durability,
                    and aesthetic finish.
                  </p>

                  {/* Highlights Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Custom 3D CAD Mold Tooling</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>European Robotic Lines</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>In-House Stress &amp; Drop Lab</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>DGDA &amp; Pharma Certified</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: 4 Clean Power Stat Cards Grid (6 Cols) */}
                <div data-reveal="scale" className="delay-150 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-cyan-400/50 transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 mb-4 group-hover:scale-105 transition-transform">
                      <Clock className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div className="text-4xl font-black text-slate-900 tracking-tight">100%</div>
                    <div className="text-sm font-bold text-slate-700 mt-1">Licensed Operations</div>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      Operating engineered plastic containers &amp; supply from Kaliakoir, Gazipur.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-cyan-400/50 transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 mb-4 group-hover:scale-105 transition-transform">
                      <Factory className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div className="text-4xl font-black text-slate-900 tracking-tight">50M+</div>
                    <div className="text-sm font-bold text-slate-700 mt-1">Monthly Units</div>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      Mass automated throughput delivering consistent supply to Fortune 500 partners.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-emerald-400/50 transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-105 transition-transform">
                      <Award className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div className="text-4xl font-black text-slate-900 tracking-tight">ISO Class</div>
                    <div className="text-sm font-bold text-slate-700 mt-1">Kaliakoir Facility</div>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      Specialized metal container and high-density plastic polymer industrial campuses.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-cyan-400/50 transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-105 transition-transform">
                      <Microscope className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div className="text-4xl font-black text-slate-900 tracking-tight">100%</div>
                    <div className="text-sm font-bold text-slate-700 mt-1">Virgin Quality</div>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      Zero-compromise food &amp; pharmaceutical grade polymer certifications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              SECTION 5: Why Choose Us (6-Card Bento Grid)
             ══════════════════════════════════════════════════════════════ */}
          <section className="relative w-full py-20 sm:py-28 bg-white border-b border-slate-100">
            <div className="w-[91.6667%] max-w-[1920px] mx-auto px-4 sm:px-8">
              {/* Center Heading */}
              <div data-reveal="up" className="max-w-3xl mx-auto text-center space-y-3 mb-16">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-cyan-600" />
                  <span>The Noor Plastic Advantage</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                  Why Choose{" "}
                  <span className="bg-gradient-to-r from-slate-900 via-[#1f5f8b] to-[#18b2a0] bg-clip-text text-transparent">
                    Us
                  </span>
                </h2>
                <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#1f5f8b] to-[#18b2a0] mx-auto" />
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal pt-2">
                  Six foundational pillars that make Noor Plastic Industries the preferred packaging manufacturing
                  partner for leading pharmaceutical, chemical, and food conglomerates.
                </p>
              </div>

              {/* 6-Card Interactive Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {whyChooseUsCards.map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <article
                      key={idx}
                      data-reveal="up"
                      style={{ animationDelay: `${idx * 80}ms` }}
                      className="water-fill-card group relative rounded-3xl bg-[#fbfdff] p-7 sm:p-8 border border-slate-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_18px_45px_rgba(0,194,232,0.12)] hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Icon Badge */}
                        <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xs">
                          <Icon className="w-6 h-6 stroke-[2.2]" />
                        </div>

                        {/* Title & Desc */}
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#1f5f8b] transition-colors mb-2.5">
                          {card.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed font-normal">
                          {card.desc}
                        </p>
                      </div>

                      {/* Bottom Micro Indicator */}
                      <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-[#1f5f8b] transition-colors">
                        <span>Pillar {idx + 1}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              SECTION 6: B2B Closing Consultation Banner
             ══════════════════════════════════════════════════════════════ */}
          <section className="relative w-full py-20 sm:py-24 bg-gradient-to-b from-white to-[#f4f8fb]">
            <div className="w-[91.6667%] max-w-[1920px] mx-auto px-4 sm:px-8">
              <div
                data-reveal="scale"
                className="relative rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#0c2236] via-[#10334f] to-[#174668] text-white p-8 sm:p-14 lg:p-16 shadow-[0_25px_65px_rgba(12,34,54,0.3)] overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10"
              >
                {/* Ambient Ripple Rings */}
                <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full border border-cyan-400/20 pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-60 h-60 rounded-full border border-cyan-400/30 pointer-events-none" />

                <div className="relative z-10 max-w-2xl space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Start Your Project</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
                    Ready to Transform Your{" "}
                    <span className="bg-gradient-to-r from-cyan-200 via-sky-300 to-white bg-clip-text text-transparent">
                      Packaging Line?
                    </span>
                  </h3>
                  <p className="text-base sm:text-lg text-cyan-100/85 leading-relaxed font-normal">
                    Partner with Bangladesh&apos;s premier LEED Platinum certified packaging manufacturer.
                    Request custom mold quotes, technical datasheets, or schedule a campus visit.
                  </p>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => setIsRFQOpen(true)}
                    className="water-fill-btn w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white text-slate-900 font-extrabold text-sm tracking-wide shadow-xl hover:shadow-2xl transition-all cursor-pointer active:scale-95"
                  >
                    <span>Request A Quote</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <Link
                    href="/products"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-white/40 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-sm transition-all active:scale-95 text-center"
                  >
                    <span>View Product Catalog</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Quotation / Consultation Drawer */}
      <RFQDrawer
        isOpen={isRFQOpen}
        onClose={() => setIsRFQOpen(false)}
      />
    </div>
  );
}
