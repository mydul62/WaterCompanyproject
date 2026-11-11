"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { siteButtonClass } from "@/components/common/SiteButton";
import {
  Sparkles,
  ArrowRight,
  FlaskConical,
  Cpu,
  Layers,
  Recycle,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Box,
  Microscope,
  Leaf,
  Phone,
  Mail,
  Zap,
} from "lucide-react";

// Reusable Signature Corner Bracket Frame matching client screenshot
function CornerBracketFrame({
  children,
  badge,
  className = "",
}: {
  children: React.ReactNode;
  badge?: string;
  className?: string;
}) {
  return (
    <div className={`relative p-3 sm:p-4 group ${className}`}>
      {/* Top-Right Signature L-Bracket with Soft Glow */}
      <div className="absolute top-0 right-0 w-10 sm:w-14 h-10 sm:h-14 border-t-[3.5px] border-r-[3.5px] border-[#38bdf8] rounded-tr-xl pointer-events-none z-10 transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.5)]" />

      {/* Bottom-Left Signature L-Bracket with Soft Glow */}
      <div className="absolute bottom-0 left-0 w-10 sm:w-14 h-10 sm:h-14 border-b-[3.5px] border-l-[3.5px] border-[#38bdf8] rounded-bl-xl pointer-events-none z-10 transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.5)]" />

      {/* Main Image Container */}
      <div className="relative rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(15,23,42,0.08)] border border-slate-200/90 bg-white">
        {/* Floating Category Badge inside image */}
        {badge && (
          <div className="absolute top-3.5 left-3.5 z-20 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-[11px] font-bold text-white tracking-wide border border-white/20 shadow-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>{badge}</span>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}

export default function RndPage() {
  const sections = [
    {
      id: "sec-precision",
      badge: "Stage 01 • Digital Simulation",
      pill: "01 • Engineering Precision",
      image: "/images/rnd/rnd-cad-design.jpg",
      imageAlt: "CAD 3D Bottle Design and Finite Element Simulation",
      title: "R&D - fundamental to Noor Plastic's invisible precision",
      icon: Cpu,
      themeColor: "cyan",
      chips: [
        "3D CAD Solid Modeling",
        "Finite Element Stress Analysis",
        "±0.005mm CNC Mold Precision",
      ],
      content: [
        "From concept to prototype, precision engineering is at the heart of our research and development process.",
        "Packaging isn't just about containment; it's about safeguarding what matters. With our state-of-the-art CAD simulation, finite element analysis, and high-speed CNC mold carving, every container delivers optimal ergonomics, material efficiency, and shelf presence.",
        "Our engineering teams work in sync with global brand standards, testing structural integrity, drop resistance, and environmental stress cracking to achieve complete reliability under demanding commercial conditions.",
      ],
      imagePosition: "left" as const,
    },
    {
      id: "sec-global",
      badge: "Stage 02 • Cleanroom Testing",
      pill: "02 • Global Standards & Formulations",
      image: "/images/rnd/rnd-lab-testing.jpg",
      imageAlt: "Cleanroom Laboratory and Physical Barrier Testing",
      title: "Part of Global Organization",
      icon: FlaskConical,
      themeColor: "blue",
      chips: [
        "FMCG & Food Contact Certified",
        "DGDA Cleanroom Pharma Testing",
        "Solvent & Chemical Barrier Seal",
      ],
      content: [
        "Our team spans across a wide spectrum of industries—from the rigorous testing and packaging requirements of food products to the precision and safety regulations of heavy-moving consumer goods.",
        "Whatever packaging challenges a client faces, whether in paints, pharmaceuticals, textiles, lubricants, chemicals, inks, or cosmetics, our R&D team dives deep into understanding phase transitions to develop innovative packaging that protects, preserves, and dramatizes the product inside.",
      ],
      imagePosition: "right" as const,
    },
    {
      id: "sec-collaboration",
      badge: "Stage 03 • Rapid Prototyping",
      pill: "03 • Collaborative Co-Creation",
      image: "/images/rnd/rnd-green-caps.jpg",
      imageAlt: "Precision Engineered Caps, Jars and Threaded Closures",
      title: "Innovation Through Collaboration",
      icon: Layers,
      themeColor: "emerald",
      chips: [
        "48-Hour Rapid Physical Sampling",
        "Client Joint-Laboratory Trials",
        "Zero Assembly Line Downtime",
      ],
      content: [
        "We believe in joint innovation: partnering closely with clients, chemical formulators, and resin suppliers to co-create custom tooling, lightweight barrier coatings, and ergonomic closures.",
        "Our state-of-the-art pilot prototyping facility enables rapid tooling turnaround, allowing clients to test physical samples in real-world filling lines within days, not months. This collaborative feedback loop accelerates time-to-market while guaranteeing zero assembly line downtime.",
      ],
      imagePosition: "left" as const,
    },
    {
      id: "sec-sustainability",
      badge: "Stage 04 • Circular Future",
      pill: "04 • Sustainable Materials Science",
      image: "/images/rnd/rnd-sustainable-facility.jpg",
      imageAlt: "LEED Platinum Sustainable Green Industrial Complex",
      title: "Sustainability-Driven Research",
      icon: Recycle,
      themeColor: "teal",
      chips: [
        "Post-Consumer Resins (PCR)",
        "Zero Landfill Protocol",
        "USGBC LEED Platinum Campus",
      ],
      content: [
        "At Noor Plastic Industries, sustainability is engineered into every design. From post-consumer recycled resins (PCR) and lightweighting to energy-efficient automated cleanroom molds, our R&D initiatives focus on minimizing carbon footprints while maximizing package durability and recyclability.",
        "We develop eco-conscious packaging solutions that comply with USGBC LEED Platinum standards and international environmental protocols, driving circular packaging systems for future generations.",
      ],
      imagePosition: "right" as const,
    },
  ];

  const workflowSteps = [
    {
      num: "01",
      title: "CAD & FEA Modeling",
      desc: "Digital 3D modeling, wall-thickness optimization & drop-impact simulation.",
      icon: Cpu,
    },
    {
      num: "02",
      title: "Pilot Tooling Carving",
      desc: "High-speed CNC wire-cut mold machining in our dedicated in-house tool room.",
      icon: Box,
    },
    {
      num: "03",
      title: "Cleanroom Stress Lab",
      desc: "Helium leak detection, barrier pressure validation & optical seam analysis.",
      icon: Microscope,
    },
    {
      num: "04",
      title: "Commercial Scaling",
      desc: "High-speed automated production rollout with zero filling line downtime.",
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Floating Global Navbar */}
      <Navbar />

      <main className="flex-1 relative">
        {/* ────────────────────────────────────────────────────────────
            1. HERO SECTION: FULL-HEIGHT 100VH 3D PRINTER R&D SHOWCASE
           ──────────────────────────────────────────────────────────── */}
        <section
          id="rnd-hero"
          className="relative w-full min-h-[520px] sm:min-h-[620px] lg:h-screen lg:min-h-[700px] bg-[#0b1320] overflow-hidden flex flex-col justify-between items-center select-none"
        >
          {/* Background Hero Image with Crossfade / Cinematic Depth */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/rnd/rnd-hero-banner.jpg"
              alt="Research & Development 3D Prototyping Laboratory"
              fill
              className="object-cover object-center opacity-85 scale-102 transition-transform duration-1000 ease-out"
              priority
            />
            {/* Multi-layer Gradient Vignettes for Crystal-Clear Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1320] via-black/35 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
          </div>

          {/* Top Spacer to account for Navbar */}
          <div className="h-28 sm:h-36 shrink-0" />

          {/* Centered R & D Typography */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-4">
            {/* Luminous Pill Tag */}
            <div
              data-reveal="up"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-bold shadow-xl shadow-black/20"
            >
              <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
              <span>Center for Advanced Packaging Innovation</span>
            </div>

            {/* Main "R & D" Title matching exact client design */}
            <h1
              data-reveal="scale"
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-[0.2em] sm:tracking-[0.25em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] uppercase pl-[0.2em]"
            >
              R &amp; D
            </h1>

            <p
              data-reveal="up"
              className="text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] font-bold text-cyan-300 drop-shadow-lg pl-[0.3em] max-w-xl mx-auto"
            >
              Research &amp; Development Innovation Center
            </p>
          </div>

          {/* Bottom Floating Scroll Down Indicator */}
          <div className="relative z-10 pb-8 sm:pb-12 text-center">
            <Link
              href="#rnd-intro"
              className="inline-flex flex-col items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors group cursor-pointer"
            >
              <span className="text-[11px] font-mono tracking-widest uppercase opacity-80 group-hover:opacity-100">
                Explore Innovations
              </span>
              <div className="w-8 h-12 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5 backdrop-blur-sm bg-black/20 group-hover:border-cyan-400 transition-colors">
                <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-bounce" />
              </div>
            </Link>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────
            CURTAIN REVEAL BODY: Rises smoothly over the hero on scroll
           ──────────────────────────────────────────────────────────── */}
        <div
          id="curtain-reveal"
          className="relative bg-white overflow-hidden"
        >
          {/* ────────────────────────────────────────────────────────────
              2. INTRODUCTORY SECTION: ELEVATED LUXURY WITH 3 PILLARS
             ──────────────────────────────────────────────────────────── */}
          <section
            id="rnd-intro"
            className="relative w-full py-20 sm:py-28 bg-gradient-to-b from-[#f8fafc] via-white to-slate-50 overflow-hidden"
          >
            {/* Subtle Ambient Background Light Orbs */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-400/8 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-blue-500/8 rounded-full blur-[140px] pointer-events-none" />

            <div className="w-[94%] max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
              {/* Section Tag */}
              <div data-reveal="up" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider shadow-xs">
                <FlaskConical className="w-3.5 h-3.5 text-cyan-600" />
                <span>Next-Gen Packaging Science</span>
              </div>

              {/* Main Headline */}
              <h2
                data-reveal="up"
                className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight"
              >
                Research and Development at{" "}
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Noor Plastic Industries
                </span>
              </h2>

              {/* Introductory Description */}
              <p
                data-reveal="up"
                className="text-base sm:text-lg md:text-[19px] text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto"
              >
                At Noor Plastic Industries, the R&amp;D team is more than just a department. It is the
                heartbeat of our commitment to quality and innovation. With every prototype,
                test, and breakthrough, we push the boundaries of what packaging can achieve.
                Join us on this journey, where creativity meets advanced technology to shape the
                future of success.
              </p>

              <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto" />

              {/* 3 Core Laboratory Capabilities Cards */}
              <div
                data-reveal="up"
                className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 text-left"
              >
                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 mb-4">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">
                    CAD &amp; Finite Simulation
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    3D solid modeling, wall-thickness weight reduction &amp; high-precision CNC tooling.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">
                    Class 100k Cleanroom Testing
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Rigorous microbiological, drop-impact &amp; pressure barrier tests for pharma and foods.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                    <Recycle className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">
                    Circular Polymer Research
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    High-ratio PCR resin blending &amp; USGBC LEED Platinum zero-waste green protocols.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ────────────────────────────────────────────────────────────
            3. ALTERNATING 4 FEATURE SECTIONS (ELEVATED WITH SPECS)
           ──────────────────────────────────────────────────────────── */}
          <section className="relative w-full py-16 sm:py-24 bg-white">
            <div className="w-[94%] max-w-6xl mx-auto px-4 space-y-24 sm:space-y-32">
              {sections.map((sec) => {
                const isImageLeft = sec.imagePosition === "left";
                const IconComp = sec.icon;

                return (
                  <div
                    key={sec.id}
                    id={sec.id}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 items-center"
                  >
                    {/* Image Column */}
                    <div
                      data-reveal={isImageLeft ? "right" : "left"}
                      className={`lg:col-span-6 ${isImageLeft ? "lg:order-1" : "lg:order-2"
                        }`}
                    >
                      <CornerBracketFrame badge={sec.badge}>
                        <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-slate-100 group/img overflow-hidden">
                          <Image
                            src={sec.image}
                            alt={sec.imageAlt}
                            fill
                            className="object-cover group-hover/img:scale-108 transition-transform duration-700 ease-out"
                          />
                          {/* Shimmer Light Reflection on Hover */}
                          <div className="absolute inset-0 -translate-x-full group-hover/img:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                        </div>
                      </CornerBracketFrame>
                    </div>

                    {/* Text Column */}
                    <div
                      data-reveal={isImageLeft ? "left" : "right"}
                      className={`lg:col-span-6 space-y-5 ${isImageLeft ? "lg:order-2" : "lg:order-1"
                        }`}
                    >
                      {/* Index Pill Tag */}
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider border border-slate-200 shadow-xs">
                        <IconComp className="w-3.5 h-3.5 text-cyan-600" />
                        <span>{sec.pill}</span>
                      </div>

                      {/* Section Title */}
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                        {sec.title}
                      </h3>

                      {/* Paragraphs */}
                      <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                        {sec.content.map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>

                      {/* Micro Feature Checklist Chips */}
                      <div className="pt-2 flex flex-wrap gap-2 sm:gap-2.5">
                        {sec.chips.map((chip, cIdx) => (
                          <span
                            key={cIdx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{chip}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ────────────────────────────────────────────────────────────
            4. 4-STEP R&D LABORATORY WORKFLOW PIPELINE
           ──────────────────────────────────────────────────────────── */}
          <section className="relative w-full py-20 bg-slate-900 text-white overflow-hidden">
            {/* Ambient Lighting Orbs */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-[94%] max-w-6xl mx-auto px-4 relative z-10 space-y-12">
              <div data-reveal="up" className="text-center space-y-3 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>End-to-End Precision Pipeline</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  How We Turn Concepts into Commercial Reality
                </h3>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  From initial 3D sketch to high-speed commercial filling lines, our R&amp;D division follows an uncompromising 4-stage validation workflow.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {workflowSteps.map((step, sIdx) => {
                  const StepIcon = step.icon;

                  return (
                    <div
                      key={sIdx}
                      data-reveal="scale"
                      className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 transition-all duration-300 space-y-4 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-cyan-400 font-mono">
                          {step.num}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                          <StepIcon className="w-5 h-5" />
                        </div>
                      </div>

                      <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {step.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ────────────────────────────────────────────────────────────
            5. HIGH-IMPACT R&D CALL TO ACTION BANNER
           ──────────────────────────────────────────────────────────── */}
          <section className="relative w-full py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
            <div className="w-[94%] max-w-5xl mx-auto px-4">
              <div
                data-reveal="scale"
                className="relative rounded-[36px] bg-gradient-to-r from-slate-900 via-[#0e1e38] to-slate-900 text-white p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl border border-slate-800"
              >
                {/* Cyan Ambient Radial Glow inside CTA */}
                <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 space-y-6 text-center max-w-3xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Custom Mold &amp; Closure Tooling</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                    Have a Custom Packaging Challenge?
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
                    Our materials scientists, CAD mold masters, and automated cleanroom engineers are ready to co-create lightweight, drop-proof, and LEED-certified containers for your brand.
                  </p>

                  {/* Action Buttons */}
                  <div className="pt-4 flex flex-wrap justify-center gap-4">
                    <Link
                      href="/request-quote"
                      className={siteButtonClass({ variant: "light", size: "lg" })}
                    >
                      <span>Request Rapid Prototype</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href="/products"
                      className={siteButtonClass({ variant: "ghost", size: "lg" })}
                    >
                      <span>Explore Products Catalog</span>
                    </Link>
                  </div>

                  {/* Direct Contact Hotline Chips */}
                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-medium">
                    <span className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-cyan-400" />
                      <span>R&amp;D Sales Hotline: +880 1711-987275</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Direct Inquiries: info@noorplastic.com</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
