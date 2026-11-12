"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RFQDrawer from "@/components/rfq/RFQDrawer";
import { api } from "@/lib/api";
import { smoothScrollToElement } from "@/lib/smoothScroll";
import { PublicStateMessage } from "@/components/common/PublicStateMessage";
import { siteButtonClass, siteFilterTabClass } from "@/components/common/SiteButton";
import { CertificatesSkeletonItems } from "@/components/common/Skeletons";
import {
  CERTIFICATE_CATEGORIES,
  type CertificateItem,
} from "@/data/certificatesData";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  ZoomIn,
  X,
  ChevronRight,
  ExternalLink,
  Download,
  Building2,
  Sparkles,
  Check,
  FileText,
  Shield,
  Layers,
  ArrowRight,
} from "lucide-react";

type Category = (typeof CERTIFICATE_CATEGORIES)[number];

const QUALITY_STANDARDS_DETAILS = [
  {
    icon: Award,
    tag: "Standardized Framework",
    title: "ISO 9001:2015 Practice",
    desc: "Our ISO 9001:2015 certified operations establish a standardized quality framework spanning raw material procurement, computerized statistical process control (SPC), high-speed forming, automated visual inspection, and final lot clearance. Every production run undergoes rigorous dimensional and structural testing to ensure zero defect delivery.",
  },
  {
    icon: ShieldCheck,
    tag: "Class 100,000 Cleanroom",
    title: "Good Manufacturing Practices (GMP)",
    desc: "We enforce strict Good Manufacturing Practices across our pharmaceutical and cosmetic packaging divisions. Production takes place in positive-pressure, Class 100,000 cleanroom environments equipped with centralized HEPA filtration systems, automated hygiene locks, and stringent personnel sanitation controls to prevent any airborne or physical contamination.",
  },
  {
    icon: CheckCircle2,
    tag: "Food Contact Compliance",
    title: "HACCP Food Safety System",
    desc: "Our Hazard Analysis Critical Control Point (HACCP) system systematically identifies, evaluates, and controls hazards that could affect food safety. From non-toxic virgin polymer selection to specialized BPA-NI protective coatings for edible oil tinplate containers, every touchpoint is engineered to preserve product freshness and shelf-life.",
  },
  {
    icon: FileCheck2,
    tag: "Statutory Approval",
    title: "BSTI Compliance",
    desc: "We maintain continuous compliance with all statutory standards mandated by the Bangladesh Standards and Testing Institution (BSTI). Periodic surveillance audits, destructive burst tests, seam tightness analysis, and metrological verifications confirm our packaging consistently surpasses national quality and safety benchmarks.",
  },
  {
    icon: Sparkles,
    tag: "Zero-Defect Metrology",
    title: "Quality Assurance Commitment",
    desc: "Our on-site metrology and materials laboratory is equipped with state-of-the-art diagnostic instruments: drop impact test rigs, ultrasonic wall-thickness gauges, hydraulic pressure testers, spectrophotometers for color accuracy, and double-seam computer projectors. Each batch must satisfy strict tolerance criteria prior to warehouse dispatch.",
  },
  {
    icon: Building2,
    tag: "Multinational ESG Partner",
    title: "International Standards Compliance",
    desc: "As an audited and preferred packaging supplier to multinational conglomerates across pharmaceuticals, paints, lubricants, and chemicals (including Radiant Pharma, Asian Paints, Berger, Square, and Samuda), our plants adhere to world-class international standards, ESG benchmarks, and complete supply chain transparency.",
  },
];

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [isRFQOpen, setIsRFQOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<Category>("All Accreditations");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setLoadError(null);
    api.certificates
      .getPublic()
      .then((res) => {
        if (!active) return;
        setCertificates(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        if (!active) return;
        setCertificates([]);
        setLoadError(
          err instanceof Error && err.message
            ? err.message
            : "Unable to load quality certificates from server."
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [reloadKey]);

  const filteredCerts =
    activeCategory === "All Accreditations"
      ? certificates
      : certificates.filter((cert) => cert.category === activeCategory);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Floating Glass Navigation Bar */}
      <Navbar />

      <main className="flex-1 relative">
        {/* ══════════════════════════════════════════════════════════════
            HERO SECTION: Full-Height Sticky Hero with Authentic Trophy Spotlight
            (Exact match to client reference banner)
           ══════════════════════════════════════════════════════════════ */}
        {/* ============================================================ */}
        {/* HERO SECTION: FULL-HEIGHT ARCHITECTURE (100VH)             */}
        {/* ============================================================ */}
        <section
          id="hero"
          className="relative w-full min-h-[540px] sm:min-h-[640px] lg:h-screen lg:min-h-[800px] bg-[#0a1f33] overflow-hidden flex flex-col justify-between items-center select-none"
        >
          {/* Authentic Trophy and Framed Certificate Background */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/certificates-hero.jpg"
              alt="Noor Plastic Industries Awards and Certificates Trophy Spotlight"
              fill
              className="object-cover object-center opacity-85 scale-102 transition-transform duration-1000 ease-out"
              priority
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
              <Award className="w-4 h-4 text-[#38bdf8] animate-pulse" />
              <span>Achievements &bull; Quality Accreditations &bull; Kaliakoir, Gazipur</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-[0.16em] sm:tracking-[0.2em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] uppercase pl-[0.16em]">
              Certificates
            </h1>

            <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.28em] font-bold text-[#38bdf8] drop-shadow-lg pl-[0.28em] max-w-2xl mx-auto">
              ISO 9001:2015 &bull; ISO 14001 &bull; Intertek &bull; Statutory Approvals
            </p>
          </div>

          {/* Animated Scroll Down Indicator */}
          <button
            type="button"
            onClick={() => smoothScrollToElement("content")}
            className="relative z-10 pb-8 sm:pb-12 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="text-[11px] uppercase tracking-widest font-semibold group-hover:tracking-[0.25em] transition-all">
              Explore Accreditations &amp; Awards
            </span>
            <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5 backdrop-blur-sm group-hover:border-[#38bdf8] transition-colors">
              <div className="w-1.5 h-3 rounded-full bg-[#38bdf8] animate-bounce" />
            </div>
          </button>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            CURTAIN BODY: Smooth Rise on Scroll into Pure White Editorial Canvas
           ══════════════════════════════════════════════════════════════ */}
        <div
          id="content"
          className="relative bg-white"
        >
          {/* ══════════════════════════════════════════════════════════════
              SECTION 1: Our Certificates & Accreditations (Executive Wide Grid)
             ══════════════════════════════════════════════════════════════ */}
          <section id="certificates-grid" className="pt-20 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
            <div className="max-w-[1520px] w-[96%] mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-bold text-slate-700 uppercase tracking-widest mb-4">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0284c7]" />
                  <span>Verified Global Compliance &bull; Noor Plastic Industries</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  Our Certificates &amp; Accreditations
                </h2>
                <div className="w-20 h-1 bg-[#0284c7] mx-auto mt-4 mb-5 rounded-full" />
                <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
                  Our manufacturing systems, cleanroom environments, and green campuses are certified by the world’s leading standardization, environmental, and drug administration authorities.
                </p>
              </div>

              {/* Accreditation Trust Metrics Ribbon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14">
                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#002B49] flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">{certificates.length}+ Standards</div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      ISO 9001, 14001, 45001, 22000, HACCP, DGDA &amp; BSTI
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">Eco-Compliant</div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Energy-Efficient Blow &amp; Injection Molding with Zero-Waste Scrap Recovery
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">DGDA &amp; BSTI Aligned</div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Food-Grade Virgin Resin &amp; Controlled Pharma Cleanroom Standards
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">100% Statutory Record</div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Verified Kaliakoir Municipal &amp; Industrial Quality Clearances
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12">
                {CERTIFICATE_CATEGORIES.map((cat) => {
                  const count =
                    cat === "All Accreditations"
                      ? certificates.length
                      : certificates.filter((c) => c.category === cat).length;
                  const isActive = activeCategory === cat;

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={siteFilterTabClass(isActive)}
                    >
                      <span>{cat}</span>
                      <span
                        className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-white text-slate-600 border border-slate-200"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Certificates Executive 2-Column Wide Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-10">
                {loading ? (
                  <CertificatesSkeletonItems count={6} />
                ) : loadError ? (
                  <PublicStateMessage
                    variant="error"
                    title="Unable to load certifications"
                    description={loadError}
                    onRetry={() => setReloadKey((k) => k + 1)}
                    className="col-span-full"
                  />
                ) : certificates.length === 0 ? (
                  <PublicStateMessage
                    variant="empty"
                    title="No certifications published yet"
                    description="Quality assurance accreditations and compliance documents will appear here once published."
                    className="col-span-full"
                  />
                ) : filteredCerts.length === 0 ? (
                  <PublicStateMessage
                    variant="empty"
                    title="No matching certificates"
                    description="No certifications found in this category."
                    className="col-span-full"
                  />
                ) : (
                  filteredCerts.map((cert) => (
                  <article
                    key={cert.id}
                    className="group bg-white rounded-3xl border border-slate-200/80 hover:border-slate-300 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(10,31,51,0.09)] transition-all duration-300 p-6 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 items-start relative overflow-hidden"
                  >
                    {/* Top Hover Gradient Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#002B49] via-[#0284c7] to-[#38bdf8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Left Side: Framed Document Thumbnail */}
                    <div
                      onClick={() => setSelectedCert(cert)}
                      className={`relative shrink-0 w-full md:w-[220px] lg:w-[240px] rounded-2xl bg-slate-50 border border-slate-200/90 shadow-inner group-hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden flex items-center justify-center p-2.5 ${
                        cert.aspect === "landscape"
                          ? "aspect-[4/3]"
                          : cert.aspect === "square"
                          ? "aspect-square"
                          : "aspect-[3/4]"
                      }`}
                      title={`Click to view full ${cert.title}`}
                    >
                      <div className="relative w-full h-full rounded-xl overflow-hidden bg-white flex items-center justify-center">
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          fill
                          unoptimized={Boolean(cert.image?.startsWith("/uploads/") || cert.image?.startsWith("http"))}
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 240px, 260px"
                        />
                      </div>

                      {/* Zoom Indicator Badge */}
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl flex items-center justify-center">
                        <span className={siteButtonClass({ variant: "light", size: "xs" })}>
                          <ZoomIn className="w-3.5 h-3.5 text-[#094E9B]" />
                          <span>Inspect Full Certificate</span>
                        </span>
                      </div>
                    </div>

                    {/* Right Side: Title, Category Badges & Detailed Scopes */}
                    <div className="flex-1 space-y-3.5 text-left flex flex-col justify-between h-full">
                      <div className="space-y-2">
                        {/* Badges Row */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200/70">
                            {cert.category}
                          </span>
                          <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">
                            {cert.code}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#002B49] transition-colors leading-tight">
                          {cert.title}
                        </h3>
                      </div>

                      {/* Bulleted Points */}
                      <ul className="space-y-2.5 pt-1 text-slate-600 text-sm leading-relaxed">
                        {cert.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-left">
                            <CheckCircle2 className="w-4 h-4 text-[#0284c7] mt-0.5 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Footer: Accreditation and Inspect Button */}
                      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="text-slate-500 font-medium leading-tight">
                          <span className="text-slate-700 font-bold">Validating Body:</span>{" "}
                          {cert.accreditation}
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedCert(cert)}
                          className={siteButtonClass({
                            variant: "outline",
                            size: "xs",
                            className: "shrink-0 self-start sm:self-auto",
                          })}
                        >
                          <span>Enlarge Document</span>
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))
                )}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              SECTION 2: How Certifications Matter in Our Manufacturing (Wide)
             ══════════════════════════════════════════════════════════════ */}
          <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-100 bg-[#fafafa]">
            <div className="max-w-[1520px] w-[96%] mx-auto">
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-widest mb-3 shadow-sm">
                  <Award className="w-3.5 h-3.5 text-[#0284c7]" />
                  <span>Operational Backbone</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  How Certifications Matter in Our Manufacturing
                </h2>
                <div className="w-20 h-1 bg-[#0284c7] mx-auto mt-4 mb-5 rounded-full" />
                <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  Certifications and international management systems are not merely credentials framed on our walls—they serve as the operational backbone of every manufacturing line at Noor Plastic Industries.
                </p>
              </div>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
                <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0284c7] flex items-center justify-center font-black text-lg mb-6">
                    01
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                    Micro-Tolerance Precision
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    In industrial metal containers, aerosol production, and pharmaceutical cleanroom bottles, microscopic tolerances dictate container hermetic seals, drop survival, and 100% shelf-life protection.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0284c7] flex items-center justify-center font-black text-lg mb-6">
                    02
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                    Multinational Supply Security
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    For our multinational FMCG and pharmaceutical clients (including Berger, Asian Paints, Radiant Pharma, Square, and Samuda), our verified accreditations deliver unwavering supply security and total regulatory compliance.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0284c7] flex items-center justify-center font-black text-lg mb-6">
                    03
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                    Closed-Loop Ecological Stewardship
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Our commitment to ISO 14001 environmental management drives closed-loop polymer scrap recovery, energy-efficient molding lines, low-VOC industrial inks, and responsible water stewardship across our Kaliakoir plant.
                  </p>
                </div>
              </div>

              {/* Leadership Narrative Card */}
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0a1f33] to-[#002B49] text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="space-y-3 text-center lg:text-left max-w-3xl">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#38bdf8] uppercase tracking-wider">
                    Quality Management Directive
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    &ldquo;Zero-Defect is Not a Metric—It Is Our Manufacturing Culture.&rdquo;
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Our adherence to ISO, HACCP, GMP, and BSTI directives ensures rigorous incoming material audits, computerized double-seam verification, and continuous batch traceability from raw coil to final palletized delivery.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRFQOpen(true)}
                  className={siteButtonClass({ variant: "light", size: "lg", className: "shrink-0" })}
                >
                  <span>Request Full Quality Audit Dossier</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              SECTION 3: Our Certifications and Quality Standards (Wide 3-Col Grid)
             ══════════════════════════════════════════════════════════════ */}
          <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-[1520px] w-[96%] mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-widest mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0284c7]" />
                  <span>Disciplines &amp; Metrology</span>
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  Our Certifications and Quality Standards
                </h3>
                <div className="w-20 h-1 bg-[#0284c7] mx-auto mt-4 mb-5 rounded-full" />
                <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  A comprehensive overview of the statutory, sanitary, and voluntary engineering disciplines enforced daily across our manufacturing plants.
                </p>
              </div>

              {/* The 6 Quality Standards in 3-Column Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {QUALITY_STANDARDS_DETAILS.map((std, idx) => {
                  const Icon = std.icon;
                  return (
                    <div
                      key={idx}
                      className="group p-8 rounded-3xl bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-[0_16px_36px_rgba(10,31,51,0.08)] transition-all duration-300 flex flex-col justify-between space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 group-hover:bg-[#002B49] group-hover:text-white transition-colors flex items-center justify-center text-[#0284c7] shadow-sm">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white border border-slate-200/80 text-slate-600">
                            {std.tag}
                          </span>
                        </div>

                        <h4 className="text-xl font-bold text-slate-900 group-hover:text-[#002B49] transition-colors tracking-tight">
                          {std.title}
                        </h4>

                        <p className="text-sm text-slate-600 leading-relaxed font-normal">
                          {std.desc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-bold text-[#0284c7]">
                        <span>Audit Protocol Active</span>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Executive Dossier Callout Banner (Wide Full-Width) */}
              <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-slate-950 border border-slate-800 text-white flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
                <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#0284c7]/10 blur-3xl pointer-events-none" />

                <div className="space-y-2 text-center lg:text-left relative z-10 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#38bdf8] uppercase tracking-wider mb-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Vendor Pre-Qualification Desk</span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Need an Official Audit Dossier for Your Vendor Review?
                  </h4>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                    Our compliance division supplies certified high-resolution PDF copies, migration lab reports, BSTI test results, and complete audit documentation for corporate vendors and procurement executives.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsRFQOpen(true)}
                    className={siteButtonClass({ variant: "light" })}
                  >
                    <span>Request Quality Dossier</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <Link
                    href="/media"
                    className={siteButtonClass({ variant: "ghost" })}
                  >
                    <span>Contact Compliance Desk</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ══════════════════════════════════════════════════════════════
          LIGHTBOX MODAL FOR CERTIFICATES
          (Enlarges document when clicked, clean modal with Esc / backdrop close)
         ══════════════════════════════════════════════════════════════ */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-xs font-bold text-[#1f5f8b] uppercase tracking-wider">
                  {selectedCert.code}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {selectedCert.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="relative flex-1 p-6 bg-slate-100/60 overflow-y-auto flex items-center justify-center min-h-[350px] max-h-[65vh]">
              <div className="relative w-full h-[500px] max-w-md rounded-lg overflow-hidden shadow-md bg-white border border-slate-200">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  unoptimized={Boolean(selectedCert.image?.startsWith("/uploads/") || selectedCert.image?.startsWith("http"))}
                  className="object-contain p-2"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-white border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
              <div>
                <span className="font-semibold text-slate-900">Validating Body:</span>{" "}
                {selectedCert.accreditation}
              </div>
              <button
                onClick={() => {
                  setSelectedCert(null);
                  setIsRFQOpen(true);
                }}
                className={siteButtonClass({ variant: "primary", size: "sm", className: "self-end sm:self-auto" })}
              >
                <span>Request Certified Copy</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Corporate RFQ / Dossier Request Drawer */}
      <RFQDrawer isOpen={isRFQOpen} onClose={() => setIsRFQOpen(false)} />

      {/* Global Site Footer */}
      <Footer />
    </div>
  );
}
