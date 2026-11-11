"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RFQDrawer from "@/components/rfq/RFQDrawer";
import {
  Users,
  ShieldCheck,
  Building2,
  Award,
  Factory,
  ChevronRight,
  ArrowRight,
  Search,
  Sparkles,
  CheckCircle2,
  Cpu,
  Leaf,
  Layers,
  Handshake,
} from "lucide-react";

interface BrandItem {
  name: string;
  category: "paints" | "pharma" | "fmcg" | "food" | "industrial";
  categoryLabel: string;
  scope: string;
  country: string;
}

const BRANDS_DATA: BrandItem[] = [
  // Paints & Coatings
  { name: "Berger Paints", category: "paints", categoryLabel: "Paints & Coatings", scope: "Custom Tin Cans & Industrial Pails", country: "Multinational" },
  { name: "Asian Paints", category: "paints", categoryLabel: "Paints & Coatings", scope: "Lithographed Tin Containers & Caps", country: "Multinational" },
  { name: "Nippon Paint", category: "paints", categoryLabel: "Paints & Coatings", scope: "Solvent & Water-Base Pails", country: "Multinational" },
  { name: "AkzoNobel", category: "paints", categoryLabel: "Paints & Coatings", scope: "High-Durability Industrial Cans", country: "Global" },
  { name: "Jotun Paints", category: "paints", categoryLabel: "Paints & Coatings", scope: "Marine & Heavy Duty Coating Packaging", country: "Multinational" },
  { name: "Elite Paint", category: "paints", categoryLabel: "Paints & Coatings", scope: "Decorative & Industrial Tinplate Pails", country: "Bangladesh" },
  { name: "Kansai Nerolac", category: "paints", categoryLabel: "Paints & Coatings", scope: "Automotive & Architectural Cans", country: "Multinational" },
  { name: "Rainbow Paints", category: "paints", categoryLabel: "Paints & Coatings", scope: "Engineered Plastic & Metal Cans", country: "PRAN-RFL Group" },
  { name: "Ujala Paints", category: "paints", categoryLabel: "Paints & Coatings", scope: "Seamed Tin Packaging & Plastic Pails", country: "Bangladesh" },
  { name: "Aqua Paints", category: "paints", categoryLabel: "Paints & Coatings", scope: "Eco-Friendly Water Coating Pails", country: "Bangladesh" },
  { name: "Roxy Paints", category: "paints", categoryLabel: "Paints & Coatings", scope: "Automotive & Household Paint Cans", country: "Bangladesh" },
  { name: "Dunlop Paints", category: "paints", categoryLabel: "Paints & Coatings", scope: "Heavy-Duty Metal Drums & Pails", country: "Industrial" },
  { name: "Moon Star Paints", category: "paints", categoryLabel: "Paints & Coatings", scope: "Specialized Varnish & Coating Containers", country: "Bangladesh" },
  { name: "Classic Paints", category: "paints", categoryLabel: "Paints & Coatings", scope: "Metal Cans & Custom Closures", country: "Bangladesh" },
  { name: "Esquire Paints", category: "paints", categoryLabel: "Paints & Coatings", scope: "Decorative Tin Containers", country: "Bangladesh" },
  { name: "Indigo Paints", category: "paints", categoryLabel: "Paints & Coatings", scope: "Custom Engineered Emulsion Packaging", country: "Regional" },
  { name: "Royal Crown Paints", category: "paints", categoryLabel: "Paints & Coatings", scope: "Hermetic Seal Industrial Metal Cans", country: "Bangladesh" },
  { name: "Welcome Paints", category: "paints", categoryLabel: "Paints & Coatings", scope: "Commercial Paint Containers", country: "Bangladesh" },

  // Pharmaceuticals & Healthcare
  { name: "Square Pharmaceuticals", category: "pharma", categoryLabel: "Pharmaceuticals", scope: "Sterile Cleanroom Bottles & Closures", country: "National Leader" },
  { name: "Radiant Pharmaceuticals", category: "pharma", categoryLabel: "Pharmaceuticals", scope: "Class 100k Cleanroom Syrups & Liquids", country: "Bangladesh" },
  { name: "ACME Laboratories", category: "pharma", categoryLabel: "Pharmaceuticals", scope: "Medical Grade HDPE/PET Containers", country: "Bangladesh" },
  { name: "Healthcare Pharma", category: "pharma", categoryLabel: "Pharmaceuticals", scope: "Tamper-Evident Pharma Bottles", country: "Bangladesh" },
  { name: "Popular Pharmaceuticals", category: "pharma", categoryLabel: "Pharmaceuticals", scope: "Hygienic Cleanroom Closures & Vials", country: "Bangladesh" },
  { name: "Aristopharma", category: "pharma", categoryLabel: "Pharmaceuticals", scope: "Pharmaceutical Liquid Packaging", country: "Bangladesh" },
  { name: "Renata Limited", category: "pharma", categoryLabel: "Pharmaceuticals", scope: "Specialized Medical Plastic Containers", country: "Bangladesh" },
  { name: "Reckitt (Dettol / Lysol)", category: "pharma", categoryLabel: "Healthcare & Pharma", scope: "Antiseptic Bottles & Aerosol Cans", country: "Multinational" },

  // FMCG & Consumer Conglomerates
  { name: "Unilever", category: "fmcg", categoryLabel: "FMCG Leader", scope: "Personal Care & Household Containers", country: "Multinational" },
  { name: "PRAN-RFL Group", category: "fmcg", categoryLabel: "FMCG Conglomerate", scope: "High-Volume Food & Beverage Closures", country: "Global" },
  { name: "City Group", category: "fmcg", categoryLabel: "FMCG Conglomerate", scope: "Edible Oil Tin Cans & Large Pails", country: "Bangladesh" },
  { name: "TK Group", category: "fmcg", categoryLabel: "FMCG Conglomerate", scope: "Culinary & Industrial Oil Containers", country: "Bangladesh" },
  { name: "United Group", category: "fmcg", categoryLabel: "Industrial Conglomerate", scope: "Enterprise Packaging Solutions", country: "Bangladesh" },
  { name: "Quazi Enterprises", category: "fmcg", categoryLabel: "Household Products", scope: "Insecticide Aerosol & Detergent Pails", country: "Bangladesh" },
  { name: "Marico", category: "fmcg", categoryLabel: "Consumer Goods", scope: "Personal Care Rigid Plastic Containers", country: "Multinational" },
  { name: "Fresh / MGI", category: "fmcg", categoryLabel: "FMCG Conglomerate", scope: "Consumer Food Packaging & Pails", country: "Bangladesh" },
  { name: "Pusti / Bashundhara", category: "fmcg", categoryLabel: "Consumer Goods", scope: "Food Oil Cans & Packaging", country: "Bangladesh" },
  { name: "Navana Group", category: "fmcg", categoryLabel: "Automotive & FMCG", scope: "Lubricant Metal Cans & Chemical Pails", country: "Bangladesh" },

  // Food & Dairy
  { name: "Aarong Dairy (BRAC)", category: "food", categoryLabel: "Dairy & Food", scope: "Food-Grade HACCP Certified Dairy Tubs", country: "Bangladesh" },
  { name: "Polar Ice Cream", category: "food", categoryLabel: "Dairy & Frozen", scope: "Ultra-Clean Injection Molded Tubs", country: "Bangladesh" },
  { name: "Savoy Ice Cream", category: "food", categoryLabel: "Dairy & Frozen", scope: "Hermetic Seal Culinary Containers", country: "Bangladesh" },
  { name: "Lalbagh Chemical", category: "food", categoryLabel: "Culinary Packaging", scope: "Specialized Food Flavoring Cans", country: "Bangladesh" },
  { name: "Party Star", category: "food", categoryLabel: "Confectionery", scope: "Rigid Plastic Food Containers", country: "Bangladesh" },

  // Industrial Adhesives, Lubricants & Chemicals
  { name: "Fevicol (Pidilite)", category: "industrial", categoryLabel: "Adhesives", scope: "Solvent-Proof Adhesive Cans & Pails", country: "Multinational" },
  { name: "Amoil Lubricants", category: "industrial", categoryLabel: "Automotive Oils", scope: "Lubricant Engine Oil Tin Containers", country: "Bangladesh" },
  { name: "Prestige Bengal", category: "industrial", categoryLabel: "Chemicals", scope: "Industrial Solvent & Sealant Drums", country: "Bangladesh" },
  { name: "Casper Chemicals", category: "industrial", categoryLabel: "Chemicals", scope: "Corrosion-Proof Resin Containers", country: "Industrial" },
  { name: "Union Chemicals", category: "industrial", categoryLabel: "Chemicals", scope: "Precision Stamped Chemical Cans", country: "Bangladesh" },
  { name: "KP Lubricants", category: "industrial", categoryLabel: "Lubricants", scope: "Metal Motor Oil Cans & Closures", country: "Bangladesh" },
];

const VALUE_PROPOSITIONS = [
  {
    icon: Factory,
    title: "High-Speed Automated Precision",
    desc: "German and Japanese robotic can-seaming and blow-molding lines delivering over 50 million zero-defect packaging units every month.",
  },
  {
    icon: ShieldCheck,
    title: "Class 100k Cleanroom Assurance",
    desc: "Sterile, positive-pressure cleanroom production compliant with strict DGDA, cGMP, and HACCP standards for pharma and food brands.",
  },
  {
    icon: Cpu,
    title: "In-House Tooling & Rapid CAD/CAM",
    desc: "3D CAD modeling, custom progressive stamping dies, and rapid tooling fabrication reducing launch times from months to days.",
  },
  {
    icon: Leaf,
    title: "LEED Platinum Zero-Carbon Supply",
    desc: "100% recyclable tinplate and virgin polymers manufactured in a solar-powered green industrial campus in Gazipur.",
  },
];

export default function BrandsWeWorkWithPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isRFQOpen, setIsRFQOpen] = useState<boolean>(false);

  const categories = [
    { id: "all", label: "All Partners (49+)" },
    { id: "paints", label: "Paints & Coatings" },
    { id: "pharma", label: "Pharmaceuticals & Healthcare" },
    { id: "fmcg", label: "FMCG & Conglomerates" },
    { id: "food", label: "Food & Dairy" },
    { id: "industrial", label: "Adhesives & Lubricants" },
  ];

  const filteredBrands = BRANDS_DATA.filter((brand) => {
    const matchesCategory = selectedCategory === "all" || brand.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.scope.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Floating Glass Navigation Bar */}
      <Navbar />

      <main className="flex-1 relative">
        {/* ══════════════════════════════════════════════════════════════
            HERO SECTION: Full-Height Sticky Hero with Authentic Handshake
            (Matches uploaded client reference screenshot exactly)
           ══════════════════════════════════════════════════════════════ */}
        {/* ============================================================ */}
        {/* HERO SECTION: FULL-HEIGHT ARCHITECTURE (100VH)             */}
        {/* ============================================================ */}
        <section
          id="hero"
          className="relative w-full min-h-[540px] sm:min-h-[640px] lg:h-screen lg:min-h-[800px] bg-[#0a1f33] overflow-hidden flex flex-col justify-between items-center select-none"
        >
          {/* Authentic Handshake Photo Background */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/brands-hero.jpg"
              alt="Xclusive Can Limited - Brands We Work With Partnership Handshake"
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
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-bold shadow-xl shadow-black/20">
              <Handshake className="w-4 h-4 text-[#38bdf8] animate-pulse" />
              <span>Achievements &bull; Trusted Enterprise Partnerships &bull; Since 1992</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-[0.14em] sm:tracking-[0.18em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] uppercase pl-[0.14em]">
              Brands We Work With
            </h1>

            <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.28em] font-bold text-[#38bdf8] drop-shadow-lg pl-[0.28em] max-w-3xl mx-auto">
              Paints &bull; Pharmaceuticals &bull; FMCG &bull; Industrial Lubricants
            </p>
          </div>

          {/* Animated Scroll Down Indicator */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("content");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="relative z-10 pb-8 sm:pb-12 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="text-[11px] uppercase tracking-widest font-semibold group-hover:tracking-[0.25em] transition-all">
              Explore Brand Partners &amp; Clients
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
              SECTION 1: Our Clients & Business Associates
              (Strictly reflects layout and header from client screenshot)
             ══════════════════════════════════════════════════════════════ */}
          <section className="pt-20 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
            <div className="w-[91.6667%] max-w-[1920px] mx-auto">
              {/* Header: Exact Match to Screenshot */}
              <div className="mb-10 sm:mb-14">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                  Our Clients
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide mt-0.5">
                  and business associates
                </p>
              </div>

              {/* Filter Tabs and Live Search Bar */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
                {/* Sector Tabs */}
                <div className="flex flex-wrap items-center gap-2 select-none">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        selectedCategory === cat.id
                          ? "bg-slate-900 text-white shadow-md shadow-slate-900/15"
                          : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full lg:w-72">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search brand by name or scope..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 transition-all"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Authentic Client Screenshot Full-Resolution Grid Display */}
              <div className="mb-12 p-4 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center overflow-hidden">
                <div className="relative w-full max-w-[1200px] aspect-[557/380] sm:aspect-[1200/520]">
                  <Image
                    src="/images/brands-logos-only.png"
                    alt="Xclusive Can Limited Client Brand Logos Grid"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Interactive Enterprise Brand Directory Grid (8 Columns on Large Screens) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  <span>Directory View ({filteredBrands.length} Partners)</span>
                  <span>Click any partner to request packaging specifications</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
                  {filteredBrands.map((brand, idx) => (
                    <div
                      key={idx}
                      onClick={() => setIsRFQOpen(true)}
                      className="group p-3.5 sm:p-4 rounded-xl bg-slate-50/70 hover:bg-white border border-slate-200/70 hover:border-slate-400 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[110px]"
                    >
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {brand.categoryLabel}
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#1f5f8b] transition-colors mt-1 leading-snug">
                          {brand.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-2 leading-tight">
                        {brand.scope}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              SECTION 2: Why Leading Enterprises Partner With Us
             ══════════════════════════════════════════════════════════════ */}
          <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-100 bg-[#fafafa]">
            <div className="w-[91.6667%] max-w-[1920px] mx-auto">
              <div className="text-center mb-16">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Why Industry Giants Choose Xclusive Can Limited
                </h3>
                <div className="w-16 h-[2px] bg-slate-900 mx-auto mt-3 mb-5" />
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Decades of uncompromised precision, synchronized supply chains, and LEED Platinum sustainability built for multinational scale.
                </p>
              </div>

              {/* 4 Value Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
                {VALUE_PROPOSITIONS.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                          <Icon className="w-6 h-6 stroke-[2]" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 tracking-tight">
                          {pillar.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Corporate Partnership Callout */}
              <div className="mt-16 max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900">
                    Ready to Upgrade Your Packaging Supply Chain?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Consult with our technical sales engineers for custom mold engineering, volume pricing, and physical sample container dispatch.
                  </p>
                </div>
                <button
                  onClick={() => setIsRFQOpen(true)}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all active:scale-95 shrink-0 cursor-pointer flex items-center gap-2"
                >
                  <span>Request Consultation</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Global RFQ / Consultation Drawer */}
      <RFQDrawer isOpen={isRFQOpen} onClose={() => setIsRFQOpen(false)} />

      {/* Global Site Footer */}
      <Footer />
    </div>
  );
}

