"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  FileText,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  X,
  ExternalLink,
  Layers,
  Cpu,
  BarChart3,
  Building2,
  Award,
} from "lucide-react";

interface CaseStudy {
  id: string;
  client: string;
  industry: "Paints & Coatings" | "Pharmaceuticals" | "Chemicals & Lubricants" | "FMCG & Food";
  title: string;
  subtitle: string;
  coverImage: string;
  stats: { label: string; value: string }[];
  challenge: string;
  solution: string;
  results: string[];
  specs: { key: string; value: string }[];
  quote: { text: string; author: string; role: string };
}

const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: "case-berger",
    client: "Berger Paints & Asian Paints",
    industry: "Paints & Coatings",
    title: "Transitioning 20L Heavy-Duty Pails to 100% Recyclable Polypropylene",
    subtitle: "Custom-engineered triple-lock tamper-evident lids preventing transit leakage and stacking deformation.",
    coverImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "Transit Leakage", value: "0.00%" },
      { label: "Top-Load Compressive Strength", value: "+32%" },
      { label: "Recyclability", value: "100% PP" },
    ],
    challenge:
      "Large 20-liter industrial paint pails were suffering from lid popping and perimeter seal leakage during rugged transport across remote distributor networks. Existing packaging designs also used mixed materials that prevented easy post-consumer recycling.",
    solution:
      "Xclusive Can's R&D team deployed 3D Moldflow simulations to redesign the rim geometry, introducing a patented triple-lock elastomeric bead profile. Using our in-house 5-axis CNC machines, we cut hardened multi-cavity molds that inject 100% pure virgin polypropylene with integrated tamper-evident tear bands.",
    results: [
      "Zero reported transit leakages across 2.4 million units delivered nationwide.",
      "Achieved 6-tier vertical warehouse stacking without container buckling.",
      "Conformed to USGBC LEED and brand owner sustainability targets with 100% monomaterial design.",
    ],
    specs: [
      { key: "Container Capacity", value: "20 Liters (5.28 Gallons)" },
      { key: "Material", value: "Impact-Modified Polypropylene (PP)" },
      { key: "Closure System", value: "Triple-Lock Tear Band with Gasketless Seal" },
      { key: "Drop Test Height", value: "1.8 Meters (Full Container)" },
    ],
    quote: {
      text: "Xclusive Can transformed our flagship industrial packaging. Zero leaks and superior in-mold graphics gave our brand unmatched presence on store shelves.",
      author: "Head of Supply Chain",
      role: "Tier-1 Paint Corporation, Bangladesh",
    },
  },
  {
    id: "case-square",
    client: "Square Pharma & Beximco",
    industry: "Pharmaceuticals",
    title: "Class 100k Sterile Production of Precision Dropper Bottles",
    subtitle: "Gamma-sterilized medical bottles with calibrated drop-tip orifices and child-resistant closures.",
    coverImage: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "Cleanroom Standard", value: "Class 100k" },
      { label: "Drop Volume Accuracy", value: "±0.02 mL" },
      { label: "DGDA Compliance", value: "100%" },
    ],
    challenge:
      "Pharmaceutical formulations required sterile ophthalmic and oral dropper containers manufactured in automated particulate-controlled cleanrooms. Conventional suppliers suffered from inconsistent dropper orifice tolerances causing medication dosage variances.",
    solution:
      "We established a dedicated Class 100,000 automated cleanroom manufacturing cell at our Gazipur campus with HEPA-filtered air positive pressure. In our Tool Room, we fabricated optical-grade EDM tooling with sub-micron tip orifices, backed by automated optical sorting machines.",
    results: [
      "Certified by the Directorate General of Drug Administration (DGDA) for sterile formulation packaging.",
      "Dosage accuracy validated within ±0.02 mL across 10 million produced units.",
      "Completely automated production eliminating human physical contact from pellet to hermetic carton sealing.",
    ],
    specs: [
      { key: "Volume Capacities", value: "10 mL, 15 mL, 30 mL" },
      { key: "Resin Specification", value: "Medical-Grade LDPE & HDPE" },
      { key: "Sterilization Compatibility", value: "Gamma Radiation & ETO" },
      { key: "Cleanroom Standard", value: "ISO Class 8 (Class 100,000)" },
    ],
    quote: {
      text: "Their automated cleanroom facility and strict microbiological audits make Xclusive Can our most reliable primary packaging partner.",
      author: "Director of Quality Assurance",
      role: "Leading Pharmaceutical Manufacturer",
    },
  },
  {
    id: "case-mobil",
    client: "Mobil 1 & TotalEnergies",
    industry: "Chemicals & Lubricants",
    title: "UN-Certified Tin Containers for Volatile Automotive Lubricants",
    subtitle: "High-speed electrical resistance seam welding with zero solvent vapor migration.",
    coverImage: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "Hydrostatic Pressure", value: "250 kPa" },
      { label: "Weld Integrity", value: "100% Inline" },
      { label: "UN Hazmat Rating", value: "Group II / III" },
    ],
    challenge:
      "High-performance synthetic motor oils and industrial solvents can attack container internal coatings, leading to seam corrosion, pinhole leaks, and vapor escaping during high-temperature warehouse storage.",
    solution:
      "Xclusive Can integrated high-speed European Soudronic electrical resistance seam welders and automated robotic spray lacquer booths. We developed a proprietary epoxy-phenolic internal barrier lacquer cured under infrared tunnels to resist aggressive solvent formulations.",
    results: [
      "Full UN Hazmat Packaging Certification for inland and maritime chemical freight.",
      "2-year accelerated shelf-life stability tests confirmed zero interior lacquer degradation.",
      "High-definition 6-color metal lithography delivered premium anti-counterfeit holographic effects.",
    ],
    specs: [
      { key: "Can Form Factor", value: "Rectangular & Cylindrical Steel Cans" },
      { key: "Material", value: "Electrolytic Tinplate (ETP) 0.28mm" },
      { key: "Seam Technology", value: "Automated Electrical Resistance Welding" },
      { key: "Internal Coating", value: "Double Epoxy-Phenolic Lacquer" },
    ],
    quote: {
      text: "The structural integrity and anti-counterfeit finishes on Xclusive Can's tin packaging have protected our premium lubricants from transit damage and market imitation.",
      author: "Operations Manager",
      role: "Global Energy & Lubricants Brand",
    },
  },
  {
    id: "case-unilever",
    client: "Unilever Bangladesh",
    industry: "FMCG & Food",
    title: "18% Package Lightweighting Without Sacrificing Top-Load Strength",
    subtitle: "Finite element stress analysis delivering substantial carbon footprint savings across millions of units.",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "Weight Reduction", value: "18%" },
      { label: "Annual Polymer Saved", value: "140 Tons" },
      { label: "Drop Survival Rate", value: "99.9%" },
    ],
    challenge:
      "Under corporate net-zero sustainability commitments, the client needed to reduce virgin resin usage across high-volume liquid detergent bottles by at least 15% without compromising drop survival or capping torque integrity.",
    solution:
      "Our R&D department performed comprehensive FEA drop and compression simulations. By introducing structural micro-ribbing along the bottle shoulders and optimizing base parison thickness, we removed 18% of resin while actually improving vertical compression strength.",
    results: [
      "Eliminated 140 metric tons of virgin polymer annually from the supply chain.",
      "Preserved identical bottle exterior dimensions, requiring zero modifications to client automated filling lines.",
      "Achieved full drop pass compliance from 1.5 meters onto steel plate surfaces.",
    ],
    specs: [
      { key: "Product Line", value: "High-Volume Liquid Detergent Containers" },
      { key: "Original Weight vs New", value: "48 grams → 39.3 grams" },
      { key: "Polymer Base", value: "High-Density Polyethylene (HDPE)" },
      { key: "Tooling Method", value: "Multi-Cavity Extrusion Blow Molding" },
    ],
    quote: {
      text: "Xclusive Can proved that sustainability and structural performance can go hand in hand. They delivered our lightweighting target seamlessly.",
      author: "Sustainability Lead",
      role: "Multinational FMCG Conglomerate",
    },
  },
  {
    id: "case-marico",
    client: "Marico Bangladesh (Parachute)",
    industry: "FMCG & Food",
    title: "Premium Embossed Tin Cans with High-Gloss Barrier Lacquers",
    subtitle: "Protecting purity, extending shelf freshness, and elevating consumer shelf prestige.",
    coverImage: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "Barrier Freshness", value: "36 Months" },
      { label: "Embossing Precision", value: "±0.05 mm" },
      { label: "Line Speed Compatibility", value: "180 cans/min" },
    ],
    challenge:
      "Consumer brand requirements called for an iconic, embossed metal packaging solution that would preserve organic oils against rancidity and oxygen permeation while resisting denting during nationwide distribution.",
    solution:
      "We engineered micro-embossed tinplate tooling in our Tool Room, combining tactile 3D relief with food-contact gold lacquer interiors. Our high-speed seaming tooling ensured consistent dimensional fitment on the client's automated filling lines.",
    results: [
      "Zero flavor or aroma degradation over a certified 36-month shelf life.",
      "Delivered an iconic, luxury look that boosted retail consumer pickup by 24%.",
      "Seamless operation at 180 cans per minute on client automated packaging lines.",
    ],
    specs: [
      { key: "Application", value: "Pure Edible & Cosmetic Oils" },
      { key: "Interior Finish", value: "Gold Organosol Food-Contact Lacquer" },
      { key: "Exterior Finish", value: "High-Gloss UV Litho + 3D Micro-Embossing" },
      { key: "Hermetic Seal", value: "Double-Seamed Compound Flange" },
    ],
    quote: {
      text: "The precision of the embossing and the flawless barrier coating have made these tins a hallmark of quality for our customers.",
      author: "Brand Packaging Manager",
      role: "Leading FMCG Brand",
    },
  },
  {
    id: "case-reckitt",
    client: "Reckitt Benckiser",
    industry: "Chemicals & Lubricants",
    title: "Calibrated Aerosol Can Lines with Pressure Relief Domes",
    subtitle: "High-pressure aerosol containment engineered for consumer safety and leakproof aerosolization.",
    coverImage: "https://images.unsplash.com/photo-1581091870621-1e9b2512f718?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "Burst Test Rating", value: "> 18 Bar" },
      { label: "Inline Leak Testing", value: "100% Water Bath" },
      { label: "Aerosol Speed", value: "240 cans/min" },
    ],
    challenge:
      "Aerosol containers for household insecticides and sanitizers require extreme pressure containment and failsafe buckle-resistance under hot tropical storage conditions reaching 50°C.",
    solution:
      "We engineered specialized dome and bottom end geometries using high-temper tinplate. Every aerosol can passes through an automated warm water bath leak detector and dimensional vision check before palletizing.",
    results: [
      "Burst test performance exceeding 18 bar, well above international safety benchmarks.",
      "Zero safety incidents or seam ruptures across multi-million can deployments.",
      "Integrated aerosol valve crimping profile delivering 100% airtight closure fitment.",
    ],
    specs: [
      { key: "Nominal Diameters", value: "52mm, 57mm, 65mm" },
      { key: "Testing Protocol", value: "100% Heated Water Bath at 55°C" },
      { key: "Buckle Resistance", value: "Exceeds 15 Bar Pressure" },
      { key: "Valve Collar Standard", value: "1-inch Universal Aperture" },
    ],
    quote: {
      text: "Safety is paramount in aerosol production. Xclusive Can's automated testing lines ensure every container meets our global audit standards.",
      author: "Senior Technical Auditor",
      role: "Global Consumer Goods Corporation",
    },
  },
];

export default function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  // Filtered Case Studies
  const filteredCases = useMemo(() => {
    if (activeCategory === "ALL") return CASE_STUDIES_DATA;
    return CASE_STUDIES_DATA.filter((c) => c.industry === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#f4f8fb] text-[#0a1f33] font-sans antialiased selection:bg-[#0b6e99] selection:text-white">
      <Navbar />

      <main className="relative w-full">
        {/* ============================================================ */}
        {/* 1. HERO SECTION: FULL-HEIGHT ARCHITECTURE (100VH)             */}
        {/* ============================================================ */}
        <section
          id="case-hero"
          className="relative lg:sticky lg:top-0 z-0 w-full min-h-[540px] sm:min-h-[640px] lg:h-screen lg:min-h-[800px] bg-[#0a1f33] overflow-hidden flex flex-col justify-between items-center select-none"
        >
          {/* Background Hero Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80"
              alt="Industrial Packaging Case Studies & Engineering Solutions"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-85 scale-102 transition-transform duration-1000 ease-out"
            />
            {/* Multi-layer Gradient Vignettes */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f33] via-black/45 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,31,51,0.6)_100%)]" />
          </div>

          {/* Top Spacer to account for Navbar */}
          <div className="h-28 sm:h-36 shrink-0" />

          {/* Centered Typography */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-bold shadow-xl shadow-black/20">
              <FileText className="w-4 h-4 text-[#38bdf8] animate-pulse" />
              <span>Real-World Engineering Impact &bull; Client Success Stories</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-[0.2em] sm:tracking-[0.25em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] uppercase pl-[0.2em]">
              Case Studies
            </h1>

            <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] font-bold text-[#38bdf8] drop-shadow-lg pl-[0.3em] max-w-2xl mx-auto">
              Pharmaceuticals &bull; Chemicals &amp; Paints &bull; FMCG &bull; Industrial Oils
            </p>
          </div>

          {/* Animated Scroll Down Indicator */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("case-content");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="relative z-10 pb-8 sm:pb-12 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="text-[11px] uppercase tracking-widest font-semibold group-hover:tracking-[0.25em] transition-all">
              Explore Proven Deployments
            </span>
            <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5 backdrop-blur-sm group-hover:border-[#38bdf8] transition-colors">
              <div className="w-1.5 h-3 rounded-full bg-[#38bdf8] animate-bounce" />
            </div>
          </button>
        </section>

        {/* ============================================================ */}
        {/* CURTAIN REVEAL BODY: Rises smoothly over the hero on scroll   */}
        {/* ============================================================ */}
        <div
          id="curtain-reveal"
          className="relative z-10 bg-white rounded-t-[28px] sm:rounded-t-[36px] lg:rounded-t-[48px] shadow-sm lg:shadow-[0_-25px_60px_rgba(0,0,0,0.22)] border-t border-white/60 overflow-hidden"
        >
          {/* ============================================================ */}
          {/* 2. PROVEN METRICS STATS BAR                                  */}
          {/* ============================================================ */}
          <section className="bg-white border-b border-slate-200/90 py-10 sm:py-12 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b6e99]">99.98%</div>
                <div className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">Seam Leakproof Rate</div>
                <p className="text-xs text-slate-400">Validated across 50M+ containers</p>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b6e99]">40%</div>
                <div className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">Faster Tooling Turnaround</div>
                <p className="text-xs text-slate-400">In-house CNC &amp; EDM Tool Room</p>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b6e99]">49+</div>
                <div className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">Enterprise Brands</div>
                <p className="text-xs text-slate-400">Paints, Pharma, FMCG, Oils</p>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b6e99]">0</div>
                <div className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">Filling Line Downtime</div>
                <p className="text-xs text-slate-400">JIT safety buffer stock logistics</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. CASE STUDY GRID & FILTERS                                 */}
        {/* ============================================================ */}
        <section id="case-content" className="bg-[#f4f8fb] py-14 sm:py-16 lg:py-20 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b6e99]/10 text-[#0b6e99] text-xs font-bold uppercase tracking-wider mb-3">
                <Award className="w-3.5 h-3.5" />
                Industry Deployments
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1f33] tracking-tight">
                Engineering Solutions for Industry Leaders
              </h2>
              <p className="text-sm sm:text-base text-[#4a5f73] mt-3">
                Discover how our in-house Tool Room, Class 100k cleanrooms, and automated seam welders solve complex packaging challenges.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-10">
              {[
                { id: "ALL", label: "All Industries" },
                { id: "Paints & Coatings", label: "Paints & Coatings" },
                { id: "Pharmaceuticals", label: "Pharmaceuticals" },
                { id: "Chemicals & Lubricants", label: "Chemicals & Lubricants" },
                { id: "FMCG & Food", label: "FMCG & Food" },
              ].map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm ${
                      isActive
                        ? "bg-[#0b6e99] text-white shadow-md shadow-[#0b6e99]/25 scale-102"
                        : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* 6 Cards Grid (2 cols on tablet, 3 cols on desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCases.map((study) => (
                <div
                  key={study.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group"
                >
                  <div>
                    {/* Cover Image Frame */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900">
                      <Image
                        src={study.coverImage}
                        alt={study.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Industry Pill */}
                      <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#0b6e99]/90 backdrop-blur-md text-white text-xs font-semibold tracking-wide shadow-md">
                        {study.industry}
                      </span>

                      {/* Client Name at bottom of photo */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5">
                        <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
                          Client Partnership
                        </span>
                        <h4 className="text-white font-bold text-base drop-shadow-sm line-clamp-1">
                          {study.client}
                        </h4>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-bold text-[#0a1f33] leading-snug group-hover:text-[#0b6e99] transition-colors">
                        {study.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#4a5f73] line-clamp-2 leading-relaxed">
                        {study.subtitle}
                      </p>

                      {/* Stats Pills Bar */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                        {study.stats.map((s, idx) => (
                          <div key={idx} className="bg-slate-50 p-2 rounded-xl">
                            <div className="text-xs sm:text-sm font-bold text-[#0b6e99]">{s.value}</div>
                            <div className="text-[10px] text-slate-500 font-medium truncate">{s.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Button */}
                  <div className="p-6 pt-0">
                    <button
                      type="button"
                      onClick={() => setSelectedCase(study)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-[#0b6e99] text-[#0a1f33] hover:text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 group-hover:bg-[#0b6e99] group-hover:text-white"
                    >
                      <span>Read Case Study</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        </div>
      </main>

      {/* ============================================================ */}
      {/* 4. DEEP-DIVE CASE STUDY MODAL                                */}
      {/* ============================================================ */}
      {selectedCase && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] bg-[#030a10]/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
          onClick={() => setSelectedCase(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl my-auto text-slate-900 border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Banner */}
            <div className="relative w-full h-56 sm:h-64 bg-slate-900 overflow-hidden">
              <Image
                src={selectedCase.coverImage}
                alt={selectedCase.title}
                fill
                priority
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                aria-label="Close Case Study"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all border border-white/20 shadow-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Floating Header Info */}
              <div className="absolute bottom-5 left-6 right-6 text-white space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-xs font-bold">
                    {selectedCase.industry}
                  </span>
                  <span className="text-xs text-slate-300 font-semibold">{selectedCase.client}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold leading-tight">{selectedCase.title}</h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Highlight Stats */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                {selectedCase.stats.map((s, idx) => (
                  <div key={idx}>
                    <div className="text-base sm:text-xl font-black text-[#0b6e99]">{s.value}</div>
                    <div className="text-xs text-slate-600 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* The Challenge */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  The Packaging Challenge
                </h4>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {selectedCase.challenge}
                </p>
              </div>

              {/* The Solution */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  The Engineering Solution
                </h4>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {selectedCase.solution}
                </p>
              </div>

              {/* Measurable Results */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  Measurable Commercial Results
                </h4>
                <ul className="space-y-2">
                  {selectedCase.results.map((res, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Technical Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedCase.specs.map((sp, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-xs text-slate-500">{sp.key}</div>
                      <div className="text-sm font-semibold text-slate-900">{sp.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Quote */}
              <div className="p-5 rounded-2xl bg-[#0a1f33] text-white space-y-3">
                <p className="text-sm sm:text-base italic text-slate-200">
                  &ldquo;{selectedCase.quote.text}&rdquo;
                </p>
                <div className="text-xs text-cyan-300 font-semibold">
                  {selectedCase.quote.author} &bull; <span className="text-slate-400">{selectedCase.quote.role}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between flex-wrap gap-4">
              <span className="text-xs text-slate-500">
                Want similar packaging engineered for your product?
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href="/request-quote"
                  className="px-5 py-2.5 rounded-xl bg-[#0b6e99] hover:bg-[#09577a] text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-[#0b6e99]/20"
                >
                  Request Feasibility Review
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedCase(null)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

