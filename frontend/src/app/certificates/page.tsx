"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RFQDrawer from "@/components/rfq/RFQDrawer";
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
} from "lucide-react";

interface CertificateItem {
  id: string;
  title: string;
  code: string;
  category: string;
  image: string;
  aspect: "portrait" | "landscape" | "square";
  bullets: string[];
  accreditation: string;
}

const CERTIFICATES_LIST: CertificateItem[] = [
  {
    id: "iso-9001",
    title: "ISO 9001:2015",
    code: "Quality Management System",
    category: "Quality Management",
    image: "/images/cert-iso-9001.jpg",
    aspect: "portrait",
    bullets: [
      "Certified Quality Management System covering end-to-end design, precision tooling, and high-speed automated production.",
      "Strict incoming raw material inspection (tinplate, virgin polymers, lacquers) and computerized statistical process control (SPC).",
      "Full batch-level traceability from raw material intake to final palletized delivery across all packaging formats.",
    ],
    accreditation: "International Organization for Standardization (ISO) / UKAS Accredited",
  },
  {
    id: "iso-14001",
    title: "ISO 14001:2015",
    code: "Environmental Management System",
    category: "Environmental Standard",
    image: "/images/cert-iso-14001.jpg",
    aspect: "portrait",
    bullets: [
      "Globally audited Environmental Management System ensuring sustainable and eco-conscious factory operations.",
      "Zero-landfill industrial waste management, 100% recyclable tin scrap reclamation, and low-VOC printing processes.",
      "Optimized water recycling and energy management across our Majukhan and Tongi industrial campuses.",
    ],
    accreditation: "ISO Environmental Management System / Global Certification Authority",
  },
  {
    id: "iso-45001",
    title: "ISO 45001:2018",
    code: "Occupational Health & Safety",
    category: "Workplace Safety",
    image: "/images/cert-iso-45001.jpg",
    aspect: "portrait",
    bullets: [
      "International standard for proactive occupational health, safety management, and hazard reduction.",
      "Zero-incident workforce protocol, ergonomic automated workstations, and protective engineering barriers.",
      "Comprehensive emergency response systems and continuous technician safety training.",
    ],
    accreditation: "International Safety Standards / Accredited Certification Body",
  },
  {
    id: "national-award",
    title: "National Export Trophy & Industrial Excellence",
    code: "National Honor",
    category: "Commercial Excellence",
    image: "/images/cert-national-award.jpg",
    aspect: "square",
    bullets: [
      "Conferred by the Government of Bangladesh for outstanding contribution to the national packaging industry and export expansion.",
      "Recognition of superior product durability, technological innovation, and sustainable employment generation.",
      "Prestigious benchmark acknowledging Xclusive Can Limited as an industry vanguard in precision metal container engineering.",
    ],
    accreditation: "Ministry of Commerce, People's Republic of Bangladesh",
  },
  {
    id: "dgda-bsti",
    title: "DGDA & BSTI Regulatory Clearances",
    code: "Statutory Approvals",
    category: "Regulatory Compliance",
    image: "/images/cert-dgda-bsti.jpg",
    aspect: "landscape",
    bullets: [
      "Approved supplier under the Directorate General of Drug Administration (DGDA) for sterile pharmaceutical packaging.",
      "Full compliance with Bangladesh Standards and Testing Institution (BSTI) national packaging standards and metrology.",
      "Rigorous barrier testing, migration compliance, and tamper-evident closure verification for healthcare containers.",
    ],
    accreditation: "Directorate General of Drug Administration & BSTI, Bangladesh",
  },
  {
    id: "haccp",
    title: "HACCP Food Safety Certification",
    code: "Hazard Analysis Critical Control Point",
    category: "Food Safety",
    image: "/images/cert-haccp.jpg",
    aspect: "portrait",
    bullets: [
      "Systematic preventive approach to biological, chemical, and physical hazards in food-contact packaging.",
      "Food-grade virgin polymers, bisphenol-free internal lacquers, and airtight hermetic seaming for edible oils and dairy.",
      "Controlled clean manufacturing zones preventing microbial and airborne contamination.",
    ],
    accreditation: "HACCP International Food Safety Compliance System",
  },
  {
    id: "iso-22000",
    title: "ISO 22000:2018",
    code: "Food Safety Management System",
    category: "Food Safety System",
    image: "/images/cert-iso-22000.jpg",
    aspect: "portrait",
    bullets: [
      "Certified Food Safety Management System ensuring complete integrity across the food packaging supply chain.",
      "Comprehensive prerequisite programs (PRPs), interactive communication, and hazard control protocols.",
      "Validated for edible oil pails, dairy containers, culinary food cans, and consumer beverage closures.",
    ],
    accreditation: "ISO Food Safety Management / International Certification Board",
  },
  {
    id: "leed-platinum",
    title: "USGBC LEED Platinum Green Building Certification",
    code: "Sustainable Infrastructure",
    category: "Green Campus",
    image: "/images/cert-leed-green.jpg",
    aspect: "portrait",
    bullets: [
      "Certified green building facility recognized by the U.S. Green Building Council (USGBC) for sustainable industrial design.",
      "Extensive rooftop photovoltaic solar energy generation supplying clean power to manufacturing lines.",
      "Rainwater harvesting reservoirs, advanced cleanroom air purification, and energy-efficient LED automation.",
    ],
    accreditation: "U.S. Green Building Council (USGBC) Platinum Rating",
  },
  {
    id: "membership",
    title: "Certificate of Membership & Corporate Standing",
    code: "Industry Affiliation",
    category: "Trade Standing",
    image: "/images/cert-membership.jpg",
    aspect: "landscape",
    bullets: [
      "Recognized corporate member of national chambers of commerce, packaging manufacturer federations, and industrial bodies.",
      "Commitment to ethical labor standards, fair trade practices, and transparent corporate governance.",
      "Active participant in national circular economy initiatives and post-consumer plastic recycling frameworks.",
    ],
    accreditation: "Federation of Bangladesh Chambers of Commerce and Industry (FBCCI)",
  },
];

const QUALITY_STANDARDS_DETAILS = [
  {
    title: "ISO 9001:2015 Practice",
    desc: "Our ISO 9001:2015 certified operations establish a standardized quality framework spanning raw material procurement, computerized statistical process control (SPC), high-speed forming, automated visual inspection, and final lot clearance. Every production run undergoes rigorous dimensional and structural testing to ensure zero defect delivery.",
  },
  {
    title: "Good Manufacturing Practices (GMP)",
    desc: "We enforce strict Good Manufacturing Practices across our pharmaceutical and cosmetic packaging divisions. Production takes place in positive-pressure, Class 100,000 cleanroom environments equipped with centralized HEPA filtration systems, automated hygiene locks, and stringent personnel sanitation controls to prevent any airborne or physical contamination.",
  },
  {
    title: "HACCP Food Safety System",
    desc: "Our Hazard Analysis Critical Control Point (HACCP) system systematically identifies, evaluates, and controls hazards that could affect food safety. From non-toxic virgin polymer selection to specialized BPA-NI protective coatings for edible oil tinplate containers, every touchpoint is engineered to preserve product freshness and shelf-life.",
  },
  {
    title: "BSTI Compliance",
    desc: "We maintain continuous compliance with all statutory standards mandated by the Bangladesh Standards and Testing Institution (BSTI). Periodic surveillance audits, destructive burst tests, seam tightness analysis, and metrological verifications confirm our packaging consistently surpasses national quality and safety benchmarks.",
  },
  {
    title: "Quality Assurance Commitment",
    desc: "Our on-site metrology and materials laboratory is equipped with state-of-the-art diagnostic instruments: drop impact test rigs, ultrasonic wall-thickness gauges, hydraulic pressure testers, spectrophotometers for color accuracy, and double-seam computer projectors. Each batch must satisfy strict tolerance criteria prior to warehouse dispatch.",
  },
  {
    title: "International Standards Compliance",
    desc: "As an audited and preferred packaging supplier to multinational conglomerates across pharmaceuticals, paints, lubricants, and chemicals (including Radiant Pharma, Asian Paints, Berger, Square, and Samuda), our plants adhere to world-class international standards, ESG benchmarks, and complete supply chain transparency.",
  },
];

export default function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [isRFQOpen, setIsRFQOpen] = useState<boolean>(false);

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
        <section
          id="hero"
          className="sticky top-0 z-0 w-full h-screen min-h-[640px] max-h-[920px] overflow-hidden select-none flex items-center justify-center"
        >
          {/* Authentic Trophy and Framed Certificate Background */}
          <Image
            src="/images/certificates-hero.jpg"
            alt="Xclusive Can Limited Awards and Certificates Trophy Spotlight"
            fill
            className="object-cover object-center"
            priority
          />

          {/* Moody Spotlight Vignette Matching Reference */}
          <div className="absolute inset-0 bg-black/45 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

          {/* Centered Headline strictly matching reference screenshot */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
              Awards &amp; Certificates
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-200/90 font-normal max-w-2xl mx-auto drop-shadow-md leading-relaxed">
              Internationally recognized manufacturing accreditations, statutory regulatory approvals, and national honors upholding quality excellence since 1992.
            </p>
          </div>

          {/* Subtle Bottom Scroll Cue */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none text-white/70">
            <span className="text-[11px] uppercase tracking-widest font-semibold">Scroll to explore</span>
            <div className="w-5 h-8 rounded-full border border-white/40 flex items-start justify-center p-1">
              <div className="w-1.5 h-2.5 rounded-full bg-white animate-bounce" />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            CURTAIN BODY: Smooth Rise on Scroll into Pure White Editorial Canvas
           ══════════════════════════════════════════════════════════════ */}
        <div
          id="content"
          className="relative z-10 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.18)]"
        >
          {/* ══════════════════════════════════════════════════════════════
              SECTION 1: Our Certificates & Accreditations (Sequential List)
              (Layout strictly mirrors media_1794031714995_c54b0437.png)
             ══════════════════════════════════════════════════════════════ */}
          <section className="pt-20 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16 sm:mb-20">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                  Our Certificates &amp; Accreditations
                </h2>
                {/* Clean Underline Accent */}
                <div className="w-16 h-[2px] bg-slate-900 mx-auto mt-3 mb-5" />
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
                  Our manufacturing systems, green campuses, and hygienic production lines are certified by the world’s leading standardization, environmental, and drug administration bodies.
                </p>
              </div>

              {/* Sequential 2-Column List Matching Reference Screenshot */}
              <div className="space-y-12 sm:space-y-16">
                {CERTIFICATES_LIST.map((cert, index) => (
                  <article
                    key={cert.id}
                    className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 pb-12 sm:pb-16 border-b border-slate-100 last:border-b-0"
                  >
                    {/* Left Column: Framed Certificate Document Thumbnail */}
                    <div
                      onClick={() => setSelectedCert(cert)}
                      className={`relative shrink-0 bg-white p-2 sm:p-2.5 rounded-xl border border-slate-200 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] hover:border-slate-400 transition-all duration-300 cursor-pointer group ${
                        cert.aspect === "landscape"
                          ? "w-[240px] sm:w-[260px] aspect-[4/3]"
                          : cert.aspect === "square"
                          ? "w-[200px] sm:w-[220px] aspect-square"
                          : "w-[190px] sm:w-[210px] aspect-[3/4]"
                      }`}
                      title={`Click to view full ${cert.title}`}
                    >
                      <div className="relative w-full h-full rounded-lg overflow-hidden bg-slate-50 flex items-center justify-center">
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          fill
                          className="object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 240px, 260px"
                        />
                      </div>

                      {/* Zoom Indicator Badge */}
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-center justify-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-slate-900 text-xs font-semibold shadow-md">
                          <ZoomIn className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </span>
                      </div>
                    </div>

                    {/* Right Column: Title and Structured Scope Details */}
                    <div className="flex-1 space-y-3 text-center sm:text-left">
                      <div className="space-y-1">
                        <div className="inline-block text-xs font-bold text-[#1f5f8b] uppercase tracking-wider">
                          {cert.code}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                          {cert.title}
                        </h3>
                      </div>

                      {/* Bulleted Points */}
                      <ul className="space-y-2 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed">
                        {cert.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-left">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Accreditation Body Footnote */}
                      <div className="pt-2 text-xs font-medium text-slate-400">
                        <span className="text-slate-500 font-semibold">Accreditation:</span>{" "}
                        {cert.accreditation}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              SECTION 2: How Certifications Matter in Our Manufacturing
              (Layout strictly mirrors media_1794031714995_c54b0437.png)
             ══════════════════════════════════════════════════════════════ */}
          <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-100 bg-[#fafafa]">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  How Certifications Matter in Our Manufacturing
                </h2>
                {/* Clean Underline Accent */}
                <div className="w-16 h-[2px] bg-slate-900 mx-auto mt-3 mb-5" />
              </div>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed text-justify sm:text-left">
                <p>
                  Certifications and international management systems are not merely credentials framed on our walls—they serve as the operational backbone of every manufacturing line at Xclusive Can Limited. In the realm of industrial metal containers, high-speed aerosol production, and pharmaceutical cleanroom bottles, microscopic tolerances dictate container performance, hermetic seals, and shelf-life protection.
                </p>
                <p>
                  Our adherence to ISO, HACCP, GMP, and BSTI directives ensures rigorous incoming material audits, defect-free automated tooling, zero-landfill ecological stewardship, and continuous batch traceability. For our multinational FMCG and pharmaceutical clients, these verified accreditations deliver unwavering supply security, regulatory compliance, and total peace of mind.
                </p>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              SECTION 3: Our Certifications and Quality Standards
              (Layout strictly mirrors bottom half of reference screenshot)
             ══════════════════════════════════════════════════════════════ */}
          <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-14">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Our Certifications and Quality Standards
                </h3>
                {/* Clean Underline Accent */}
                <div className="w-16 h-[2px] bg-slate-900 mx-auto mt-3 mb-5" />
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  A comprehensive overview of the statutory and voluntary quality disciplines enforced across our manufacturing facilities.
                </p>
              </div>

              {/* The 6 Quality Standards Detailed Text Blocks */}
              <div className="space-y-8 sm:space-y-10">
                {QUALITY_STANDARDS_DETAILS.map((std, idx) => (
                  <div
                    key={idx}
                    className="space-y-2 border-l-2 border-slate-300 hover:border-slate-900 pl-4 sm:pl-6 transition-colors duration-200"
                  >
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                      {std.title}
                    </h4>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {std.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Dossier Request Callout */}
              <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-lg font-bold text-slate-900">
                    Need an Official Audit Dossier?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Our compliance team provides certified high-resolution PDF copies and audit documentation for corporate vendors and procurement managers.
                  </p>
                </div>
                <button
                  onClick={() => setIsRFQOpen(true)}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all active:scale-95 shrink-0 cursor-pointer flex items-center gap-2"
                >
                  <span>Request Quality Dossier</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors cursor-pointer self-end sm:self-auto"
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
