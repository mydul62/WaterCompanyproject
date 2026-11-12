"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { api } from "@/lib/api";
import { smoothScrollToElement } from "@/lib/smoothScroll";
import type { CaseStudy } from "@/data/caseStudiesData";
import { PublicStateMessage } from "@/components/common/PublicStateMessage";
import { siteButtonClass, siteFilterTabClass } from "@/components/common/SiteButton";
import { CaseStudiesSkeletonItems } from "@/components/common/Skeletons";
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

export default function CaseStudiesPage() {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setLoadError(null);
    api.caseStudies
      .getPublic()
      .then((res) => {
        if (!active) return;
        setCases(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        if (!active) return;
        setCases([]);
        setLoadError(
          err instanceof Error && err.message
            ? err.message
            : "Unable to load case studies from server."
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [reloadKey]);

  // Filtered Case Studies
  const filteredCases = useMemo(() => {
    if (activeCategory === "ALL") return cases;
    return cases.filter((c) => c.industry === activeCategory);
  }, [activeCategory, cases]);

  return (
    <div className="min-h-screen bg-[#f4f8fb] text-[#0a1f33] font-sans antialiased selection:bg-[#0b6e99] selection:text-white">
      <Navbar />

      <main className="relative w-full">
        {/* ============================================================ */}
        {/* 1. HERO SECTION: FULL-HEIGHT ARCHITECTURE (100VH)             */}
        {/* ============================================================ */}
        <section
          id="case-hero"
          className="relative w-full min-h-[540px] sm:min-h-[640px] lg:h-screen lg:min-h-[800px] bg-[#0a1f33] overflow-hidden flex flex-col justify-between items-center select-none"
        >
          {/* Background Hero Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/business-hero-office.jpg"
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
            onClick={() => smoothScrollToElement("case-content")}
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
          className="relative bg-white overflow-hidden"
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
                      className={siteFilterTabClass(isActive)}
                    >
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* 6 Cards Grid (2 cols on tablet, 3 cols on desktop) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                  <CaseStudiesSkeletonItems count={6} />
                ) : loadError ? (
                  <PublicStateMessage
                    variant="error"
                    title="Unable to load case studies"
                    description={loadError}
                    onRetry={() => setReloadKey((k) => k + 1)}
                    className="col-span-full"
                  />
                ) : cases.length === 0 ? (
                  <PublicStateMessage
                    variant="empty"
                    title="No case studies published yet"
                    description="Client engineering case studies will appear here once published."
                    className="col-span-full"
                  />
                ) : filteredCases.length === 0 ? (
                  <PublicStateMessage
                    variant="empty"
                    title="No matching case studies"
                    description="Try selecting another industry category filter above."
                    className="col-span-full"
                  />
                ) : (
                  filteredCases.map((study) => (
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
                            unoptimized={Boolean(study.coverImage?.startsWith("/uploads/") || study.coverImage?.startsWith("http"))}
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
                          className={siteButtonClass({ variant: "primary", size: "sm", fullWidth: true })}
                        >
                          <span>Read Case Study</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
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
                unoptimized={Boolean(selectedCase.coverImage?.startsWith("/uploads/") || selectedCase.coverImage?.startsWith("http"))}
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
                  className={siteButtonClass({ variant: "primary", size: "sm" })}
                >
                  Request Feasibility Review
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedCase(null)}
                  className={siteButtonClass({ variant: "outline", size: "sm" })}
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

