"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RFQDrawer from "@/components/rfq/RFQDrawer";
import { ChevronLeft, ChevronRight, CheckCircle2, Factory } from "lucide-react";

export default function QPailPage() {
  const [isRFQOpen, setIsRFQOpen] = useState(false);
  const [facilitySlide, setFacilitySlide] = useState(0);

  const facilityImages = [
    "/images/qpail/qpail-facility.jpg",
    "/cropped/factory-building.png",
    "/images/qpail/qpail-hero.jpg",
  ];

  const specs = [
    { label: "Location", value: "Plot#196, BSCIC I/A, Tongi, Gazipur, Bangladesh" },
    { label: "Working Area", value: "54,000 sq ft" },
    { label: "Total Employee", value: "450" },
    { label: "Production Process", value: "Molding of Plastic Packaging Items as well as Printing" },
    { label: "Production System", value: "Automated" },
  ];

  const printingFacilities = [
    { title: "Screen Printing", desc: "High-definition multi-color precision silk screen printing" },
    { title: "Heat Transfer Print (HTP)", desc: "Durable full-color thermal transfer for complex graphics" },
    { title: "Dry Offset Print (DOP)", desc: "High-speed high-volume cylindrical container decoration" },
    { title: "Hot Stamping", desc: "Metallic foil and luxury security brand finish" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Glassmorphic Navbar */}
      <Navbar />

      <main className="flex-1 relative">
        {/* ============================================================ */}
        {/* 1. HERO SECTION: FULL-HEIGHT ARCHITECTURE (100VH)             */}
        {/* ============================================================ */}
        <section
          id="hero"
          className="relative lg:sticky lg:top-0 z-0 w-full min-h-[540px] sm:min-h-[640px] lg:h-screen lg:min-h-[800px] bg-[#0a1f33] overflow-hidden flex flex-col justify-between items-center select-none"
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/qpail/qpail-hero.jpg"
              alt="Q Pail Limited Industrial Complex"
              fill
              className="object-cover object-center opacity-85 scale-102 transition-transform duration-1000 ease-out"
              priority
            />
            {/* Multi-layer Gradient Vignettes */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f33] via-black/45 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,31,51,0.6)_100%)]" />
          </div>

          {/* Top Spacer for Navbar */}
          <div className="h-28 sm:h-36 shrink-0" />

          {/* Centered Typography */}
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-bold shadow-xl shadow-black/20">
              <Factory className="w-4 h-4 text-[#38bdf8] animate-pulse" />
              <span>Sister Concern &bull; High-Capacity Plastic Molding &bull; Est. 1992</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-[0.2em] sm:tracking-[0.25em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] uppercase pl-[0.2em]">
              Q Pail
            </h1>

            <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.28em] font-bold text-[#38bdf8] drop-shadow-lg pl-[0.28em] max-w-3xl mx-auto">
              54,000 SQ FT Facility &bull; Automated Molding &bull; High-Definition Decoration
            </p>
          </div>

          {/* Animated Scroll Down Indicator */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("qpail-content");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="relative z-10 pb-8 sm:pb-12 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="text-[11px] uppercase tracking-widest font-semibold group-hover:tracking-[0.25em] transition-all">
              Explore Plant Specs &amp; Facilities
            </span>
            <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5 backdrop-blur-sm group-hover:border-[#38bdf8] transition-colors">
              <div className="w-1.5 h-3 rounded-full bg-[#38bdf8] animate-bounce" />
            </div>
          </button>
        </section>

        {/* Section 1: Logo, Heading & Specs - Lifts over Hero */}
        <section
          id="qpail-content"
          className="relative z-10 w-full pt-14 pb-16 bg-white rounded-t-[28px] sm:rounded-t-[36px] lg:rounded-t-[48px] shadow-sm lg:shadow-[0_-25px_60px_rgba(0,0,0,0.22)] border-t border-white/60"
        >
          <div className="w-full max-w-[1643px] mx-auto px-6 sm:px-12 text-center">
            {/* Q Pail Circular Logo matching Screenshot */}
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-slate-200 bg-white shadow-sm">
                <span className="w-4 h-4 rounded-full bg-[#d32f2f] flex items-center justify-center text-[9px] text-white font-bold">
                  Q
                </span>
                <span className="font-bold text-sm tracking-wider text-slate-800 uppercase">
                  Q Pail Limited
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight mb-14">
              Leading Industrial and Manufacturing Company, Servicing With Global Experience &amp; Strategies
            </h1>

            {/* Two-Column: Specs Table + Facility Slider */}
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 mb-20 text-left">
              {/* Left Column: Specifications Table */}
              <div className="w-full lg:w-[48%] bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-8">
                <table className="w-full text-xs sm:text-sm">
                  <tbody>
                    {specs.map((item, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-slate-100 last:border-b-0 ${
                          idx % 2 === 0 ? "bg-slate-50/50" : "bg-white"
                        }`}
                      >
                        <td className="py-4 px-4 font-semibold text-slate-500 w-1/3 align-top">
                          {item.label}
                        </td>
                        <td className="py-4 px-4 font-bold text-slate-900 align-top">
                          {item.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Right Column: Facility Photo Slider */}
              <div className="w-full lg:w-[52%]">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 bg-slate-100 group">
                  <Image
                    src={facilityImages[facilitySlide]}
                    alt="Q Pail Manufacturing Plant Facility"
                    fill
                    className="object-cover transition-all duration-500"
                  />

                  {/* Navigation Arrows */}
                  <button
                    onClick={() =>
                      setFacilitySlide((prev) => (prev - 1 + facilityImages.length) % facilityImages.length)
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() =>
                      setFacilitySlide((prev) => (prev + 1) % facilityImages.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Slider Indicators */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                    {facilityImages.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${
                          facilitySlide === i ? "w-6 bg-white" : "w-1.5 bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Split Card matching Screenshot 652ab805 */}
            <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 mb-16 text-left">
              {/* Left Photo */}
              <div className="relative w-full md:w-1/2 min-h-[280px] bg-slate-100">
                <Image
                  src="/images/qpail/qpail-facility.jpg"
                  alt="Q Pail Facility Tongi"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right Slate Block */}
              <div className="w-full md:w-1/2 bg-[#566067] p-8 sm:p-12 text-white flex flex-col justify-center">
                <h2 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight">
                  Q Pail
                </h2>
                <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
                  The company commenced its journey back in 1992 in a very limited scope with scarce resources. Its stride
                  was embarked from the port city of Chittagong. At the inception stage it was a family enterprise with no
                  business background of the persons behind. It had to pass through many vicissitudes of business prior to
                  coming to the present position. Q Pail Factory kicked off in 2007 in BSCIC, Tongi.
                </p>
              </div>
            </div>

            {/* Detailed Company Journey Paragraphs matching Screenshot 652ab805 */}
            <div className="max-w-4xl mx-auto space-y-6 text-sm sm:text-base text-slate-600 leading-relaxed font-normal text-left mb-20">
              <p>
                At the inception, the company had to solo focus in metal package manufacturing and printing tin cans for the
                paint sector. However, because of continuous growth in the market demand, it has started making rigid plastic
                packing items for industrial uses. Over the period, it also accrued market reputation and brand value as one of
                the best choices for other FMCG products as well beyond Paint.
              </p>
              <p>
                Quality Paint and Lubricant consumer products require various Printings and Sizes. Some of the major Paint
                brands the Q Pail factory serves are Berger Paints BD Ltd, Paint Packaging, Asian Paints (Bangladesh) Ltd, Paint
                Packaging, Nippon Paint (BD) Private Limited, Rainbow Paints, Al-Karim Paint &amp; Chemicals Ltd, RAK Paints,
                Nippon Paint, Roxy Paints, Paragon Paints &amp; Chemicals Ltd, Imperial Paint Co and many more.
              </p>
              <p>
                Some of the local brands of Lubricants the factory caters with specialized packaging are BPCL, MJL Bangladesh
                Ltd, Mobil Lubricants Packaging, Meghna Petroleum Ltd, Jamuna Oil Company Ltd, Standard Asiatic Oil Company
                Ltd, Total Energies, Omera Petroleum, Padma Oil Company Ltd, United Lubricants, Lub-rref (Bangladesh) Ltd, Asian
                Petroleum Ltd and many others.
              </p>
              <p>
                To continue our contribution to the industrial growth of Bangladesh, we have focused on future trends and
                continuous modern technical equipment to produce products that help clients succeed in competitive markets.
              </p>

              <div className="pt-4 text-center">
                <button
                  onClick={() => setIsRFQOpen(true)}
                  className="px-8 py-3 rounded-xl bg-[#5a8ea7] hover:bg-[#487388] text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Request Industrial Pail Quotation
                </button>
              </div>
            </div>

            {/* Printing Facilities Section matching Screenshot 652ab805 */}
            <div className="border-t border-slate-100 pt-16">
              <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight text-center mb-10">
                Printing Facilities
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {printingFacilities.map((facility, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-center group"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-full bg-[#f0f6f9] group-hover:bg-[#5a8ea7] text-[#5a8ea7] group-hover:text-white flex items-center justify-center mx-auto mb-4 transition-colors font-bold text-sm">
                        0{idx + 1}
                      </div>
                      <h3 className="font-bold text-base text-slate-900 mb-2">
                        {facility.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {facility.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* RFQ / Quotation Drawer */}
      <RFQDrawer
        isOpen={isRFQOpen}
        onClose={() => setIsRFQOpen(false)}
      />
    </div>
  );
}

