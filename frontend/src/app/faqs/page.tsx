"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { siteButtonClass, siteFilterTabClass } from "@/components/common/SiteButton";
import { smoothScrollToElement } from "@/lib/smoothScroll";
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Box,
  Wrench,
  Truck,
  FileText,
} from "lucide-react";

interface FaqItem {
  id: string;
  category: "MOQs & Ordering" | "Custom Tooling & R&D" | "Quality & Certifications" | "Delivery & Logistics";
  question: string;
  answer: string;
  tags: string[];
}

const FAQS_DATA: FaqItem[] = [
  {
    id: "faq-1",
    category: "MOQs & Ordering",
    question: "What are your Minimum Order Quantities (MOQs) for custom tin cans and plastic containers?",
    answer:
      "For standard catalog items (such as standard paint pails and chemical drums), our MOQ begins at 1,000 to 2,500 units depending on the size. For custom-engineered containers requiring new mold development or custom lithographic printing, MOQs typically range from 5,000 to 10,000 units. We also support pilot sample runs (50–200 units) for laboratory filling trials and structural drop-testing before mass commercial scaling.",
    tags: ["MOQ", "Ordering", "Custom Production", "Pilot Runs"],
  },
  {
    id: "faq-2",
    category: "MOQs & Ordering",
    question: "Can we request physical product samples before placing a commercial contract?",
    answer:
      "Yes, absolutely. We provide structural 3D-printed prototypes and rapid pilot samples within 48 to 72 hours for fitment and closure validation. Once the pilot mold is cut, we provide production-grade samples molded from client-specified resin (e.g., food-grade Virgin PP, HDPE, or PCR blends) so your team can test real-world filling line sealing and drop-impact resistance.",
    tags: ["Samples", "Prototyping", "Validation"],
  },
  {
    id: "faq-3",
    category: "Custom Tooling & R&D",
    question: "How long does custom mold design and tooling development take in your in-house Tool Room?",
    answer:
      "Because Noor Plastic Industries operates an integrated in-house Tool Room equipped with 5-axis CNC machining, wire EDM spark erosion, and optical CMM metrology, our tooling lead time is among the fastest in Bangladesh. Typical timeline:\n• 3D CAD & Moldflow Simulation: 3–5 working days\n• Tooling Machining & EDM Spark Cutting: 10–14 working days\n• Manual Lapping, Fitting & Pilot Trial: 4–6 working days\nOverall tooling turnaround is generally 3 to 4 weeks from final CAD approval to first pilot articles.",
    tags: ["Tooling", "CNC", "Lead Time", "In-House Tool Room"],
  },
  {
    id: "faq-4",
    category: "Custom Tooling & R&D",
    question: "Who retains ownership and intellectual property (IP) of custom packaging molds?",
    answer:
      "All custom molds manufactured under client proprietary contracts belong exclusively to the client. We sign mutual Non-Disclosure Agreements (NDAs) and IP protection contracts before engineering begins. Your molds are cataloged with unique identification serials, stored in our climate-controlled mold vaults, and used solely for your authorized purchase orders.",
    tags: ["IP Protection", "Mold Ownership", "NDA", "Confidentiality"],
  },
  {
    id: "faq-5",
    category: "Quality & Certifications",
    question: "Which international food-grade and environmental certifications does Noor Plastic Industries hold?",
    answer:
      "Our Kaliakoir, Gazipur manufacturing campus operates under world-class international standards, including:\n• ISO 9001:2015 (Total Quality Management)\n• ISO 14001:2015 (Environmental Management System)\n• FSSC 22000 & HACCP (Food-Grade Packaging & Water Dispenser Compliance)\n• BSTI & e-Trade Licensed Commercial Compliance\n• DGDA Cleanroom Standards (Class 100k sterile pharmaceutical production).",
    tags: ["LEED Platinum", "ISO 9001", "FSSC 22000", "Food Grade", "UN Hazmat"],
  },
  {
    id: "faq-6",
    category: "Quality & Certifications",
    question: "How do you guarantee leakproof integrity on metal can seams and plastic tamper rings?",
    answer:
      "We utilize 100% automated inline optical seam inspection and pressurized helium/air leak testing across all production stages. For aerosol and chemical cans, each container undergoes hydrostatic burst-pressure validation up to 18 bar. For plastic injection containers, our triple-lock tamper-evident lids undergo vacuum leak decay testing to guarantee zero migration of volatile solvent vapors or liquids.",
    tags: ["Leak Testing", "Quality Assurance", "Seam Integrity", "Zero Defect"],
  },
  {
    id: "faq-7",
    category: "Delivery & Logistics",
    question: "What are standard delivery lead times across Bangladesh and export markets?",
    answer:
      "For repeat orders of cataloged products, dispatch from our Kaliakoir, Gazipur distribution center occurs within 3 to 7 business days. For specialized seasonal runs, delivery schedules are aligned with client enterprise forecasts. We maintain dedicated fleet logistics covering Dhaka, Gazipur, Chattagong, Narayanganj, and key industrial corridors.",
    tags: ["Delivery", "Logistics", "Supply Chain", "Export"],
  },
  {
    id: "faq-8",
    category: "Delivery & Logistics",
    question: "Do you offer vendor-managed inventory (VMI) or warehouse buffer stock agreements?",
    answer:
      "Yes. For enterprise contract partners (such as Berger, Asian Paints, Unilever, and Square), we operate Vendor-Managed Inventory (VMI) programs. We maintain 30 to 45 days of safety buffer stock in our clean warehouses, allowing clients to call off packaging on a 24-hour Just-In-Time (JIT) basis to avoid factory downtime during peak seasonal surges.",
    tags: ["VMI", "Buffer Stock", "JIT Delivery", "Enterprise Contracts"],
  },
  {
    id: "faq-9",
    category: "Custom Tooling & R&D",
    question: "Can you assist with package lightweighting and PCR (Post-Consumer Resin) integration?",
    answer:
      "Yes. Our R&D engineering laboratory specializes in Finite Element Analysis (FEA) to strategically remove resin from non-stress zones without sacrificing vertical compressive top-load strength. We routinely engineer packaging solutions incorporating up to 30%–50% food-grade PCR resins, helping multinational brand owners meet strict corporate ESG and plastic reduction mandates.",
    tags: ["Lightweighting", "PCR", "Sustainability", "FEA Analysis"],
  },
  {
    id: "faq-10",
    category: "MOQs & Ordering",
    question: "What high-definition printing and decoration options are available for tin and plastic containers?",
    answer:
      "We offer comprehensive in-house decoration technologies:\n• High-Speed Metal Lithography: 6-color UV offset printing with spot gloss, matte, metallic, and tactile textures\n• In-Mold Labeling (IML): High-resolution photographic graphics permanently fused with polypropylene containers\n• Screen & Pad Printing: Scratch-resistant UV curable inks for cylindrical bottles and closures\n• Heat-Shrink Sleeving: 360-degree full-body decorative sleeve labeling with tamper seals.",
    tags: ["Decoration", "IML", "Metal Lithography", "UV Printing"],
  },
  {
    id: "faq-11",
    category: "Quality & Certifications",
    question: "Are your chemical containers certified for hazardous materials transport under UN regulations?",
    answer:
      "Yes. Our tight-head and open-top industrial steel drums and HDPE containers are rigorously tested in certified metrology labs for UN Hazmat Packaging Groups I, II, and III. Tests include 1.8-meter drop tests at -18°C, 250 kPa hydraulic internal pressure holds, and 28-day chemical compatibility stress tests.",
    tags: ["UN Certified", "Hazmat", "Drop Test", "Chemical Packaging"],
  },
  {
    id: "faq-12",
    category: "Delivery & Logistics",
    question: "How do you package finished containers to prevent transit scuffing and contamination?",
    answer:
      "All containers leave our Class 100k automated lines directly into dust-proof polybag liners, automated corrugated carton packings, or automated stretch-wrapped palletized stacks with corner protector boards. Export orders are containerized with desiccants and moisture-barrier covers to guarantee zero atmospheric corrosion during ocean transit.",
    tags: ["Transit Protection", "Cleanroom Packing", "Palletization"],
  },
];

export default function FaqsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [expandedId, setExpandedId] = useState<string | null>("faq-1");

  // Toggle FAQ accordion
  const toggleFaq = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === "ALL" || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f4f8fb] text-[#0a1f33] font-sans antialiased selection:bg-[#0b6e99] selection:text-white">
      <Navbar />

      <main className="relative w-full">
        {/* ============================================================ */}
        {/* 1. HERO SECTION: FULL-HEIGHT ARCHITECTURE (100VH)             */}
        {/* ============================================================ */}
        <section
          id="faq-hero"
          className="relative w-full min-h-[540px] sm:min-h-[640px] lg:h-screen lg:min-h-[800px] bg-[#0a1f33] overflow-hidden flex flex-col justify-between items-center select-none"
        >
          {/* Background Hero Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80"
              alt="Engineering Knowledge Hub & FAQs"
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
              <HelpCircle className="w-4 h-4 text-[#38bdf8] animate-pulse" />
              <span>Knowledge Hub &bull; Frequently Asked Questions</span>
            </div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-[0.2em] sm:tracking-[0.25em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] uppercase pl-[0.2em]">
              FAQs
            </h1>

            <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] font-bold text-[#38bdf8] drop-shadow-lg pl-[0.3em] max-w-2xl mx-auto">
              MOQs &bull; Custom Tooling &bull; Lead Times &bull; Regulatory Compliance
            </p>
          </div>

          {/* Animated Scroll Down Indicator */}
          <button
            type="button"
            onClick={() => smoothScrollToElement("faq-content")}
            className="relative z-10 pb-8 sm:pb-12 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="text-[11px] uppercase tracking-widest font-semibold group-hover:tracking-[0.25em] transition-all">
              Explore Questions &amp; Answers
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
          className="relative bg-[#f4f8fb]"
        >
          {/* ============================================================ */}
          {/* 2. SEARCH & FILTER CONTROLS                                  */}
          {/* ============================================================ */}
          <section id="faq-content" className="pt-14 sm:pt-16 lg:pt-20 pb-8 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search Input */}
            <div className="relative w-full max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions by keyword (e.g. MOQ, tooling, food-grade, leak test)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0b6e99] focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-1 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-8">
              {[
                { id: "ALL", label: "All Questions", count: FAQS_DATA.length },
                { id: "MOQs & Ordering", label: "MOQs & Ordering", count: 3 },
                { id: "Custom Tooling & R&D", label: "Custom Tooling & R&D", count: 3 },
                { id: "Quality & Certifications", label: "Quality & Compliance", count: 3 },
                { id: "Delivery & Logistics", label: "Delivery & Logistics", count: 3 },
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
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. ACCORDION FAQ ITEMS                                       */}
        {/* ============================================================ */}
        <section className="bg-[#f4f8fb] pb-16 sm:pb-20 lg:pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800">No matching questions found</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                  Try searching with different keywords or reach out directly to our engineering support team.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("ALL");
                  }}
                  className={siteButtonClass({ variant: "primary", size: "sm", className: "mt-4" })}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = expandedId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden"
                  >
                    {/* Header Button */}
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-[#0b6e99] uppercase tracking-wider bg-[#0b6e99]/10 px-2.5 py-0.5 rounded-md">
                            {faq.category}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            Q{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#0a1f33] leading-snug">
                          {faq.question}
                        </h3>
                      </div>

                      <div
                        className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center transition-all ${
                          isOpen
                            ? "bg-[#0b6e99] text-white rotate-180"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>

                    {/* Accordion Body */}
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 animate-fadeIn">
                        <p className="font-normal whitespace-pre-line text-sm sm:text-base text-[#4a5f73] leading-relaxed">
                          {faq.answer}
                        </p>

                        {/* Tag Chips */}
                        <div className="mt-4 pt-3 flex items-center flex-wrap gap-2 border-t border-slate-50">
                          <span className="text-xs text-slate-400 font-medium">Related:</span>
                          {faq.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* Quick Contact Hotline Callout */}
            <div className="mt-12 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#0a1f33] to-[#12385c] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2 text-center md:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-cyan-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  Direct Technical Support
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold">Have a specific packaging requirement?</h3>
                <p className="text-sm text-slate-300 max-w-xl">
                  Our senior tooling engineers and QA specialists are available for custom consultations, mold feasibility reviews, and RFQ pricing.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <Link
                  href="/request-quote"
                  className={siteButtonClass({ variant: "light", className: "w-full sm:w-auto" })}
                >
                  Request a Quote
                </Link>
                <a
                  href="tel:+8801711987275"
                  className={siteButtonClass({ variant: "ghost", className: "w-full sm:w-auto" })}
                >
                  <Phone className="w-4 h-4 text-[#75B5F5]" />
                  <span>Call Hotline</span>
                </a>
              </div>
            </div>
          </div>
        </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

