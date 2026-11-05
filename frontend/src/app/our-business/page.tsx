"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RFQDrawer from "@/components/rfq/RFQDrawer";
import { CheckCircle2, ChevronRight } from "lucide-react";

export default function OurBusinessPage() {
  const [isRFQOpen, setIsRFQOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const whyChooseUsPoints = [
    "Over 32 years of experience in custom plastic and metal packaging manufacturing with unmatched market expertise.",
    "State-of-the-art green manufacturing facilities in Gazipur and Tongi, Dhaka, equipped with advanced automation and technology.",
    "Full adherence to global standards: ISO 22000, GMP, and HACCP certifications for packaging safety and excellence.",
    "End-to-end packaging solutions: from 3D modeling and mold tooling to high-speed blow molding and printing.",
    "Dependable client partnerships: responsive customer service and dedicated supply chain reliability across Asia, Middle East, and Africa.",
    "Sustainable packaging solutions: 100% recyclable virgin materials with eco-friendly manufacturing practices.",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Glassmorphic Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Banner matching Screenshot 6408e270 */}
        <div
          id="hero"
          className="relative w-full h-[260px] sm:h-[340px] lg:h-[400px] overflow-hidden flex items-center justify-center select-none"
        >
          <Image
            src="/images/business-banner.jpg"
            alt="Our Business - Xclusive Can Limited"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[0.5px]" />
          <div className="relative z-10 text-center px-4 pt-16 sm:pt-20">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-wider drop-shadow-md">
              Our Business
            </h1>
          </div>
        </div>

        {/* Section 1: Who We Are matching Screenshot */}
        <section className="w-full py-16 sm:py-24 border-b border-slate-100">
          <div className="w-full max-w-[1638px] mx-auto px-6 sm:px-12 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight mb-6">
              Who We Are
            </h2>
            <p className="max-w-4xl mx-auto text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal mb-8">
              The Xclusive Can Ltd. Majukhan factory is eco-friendly and green building compliant, architecturally recent,
              and aesthetic, hygienic, neat and clean, having conductive working environment with all utility services
              centralized, automated and sophisticated.
            </p>

            <div className="mb-14">
              <button
                onClick={() => setIsRFQOpen(true)}
                className="inline-block px-7 py-2.5 rounded-lg border-2 border-black bg-white text-black font-bold text-sm hover:bg-black hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Points of Excellence
              </button>
            </div>

            {/* Two Plant & Green Campus Photos matching Screenshot 6408e270 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-10 max-w-4xl mx-auto">
              {/* Photo 1: Bamboo Grove / Sunlit Path */}
              <div className="relative w-full sm:w-[320px] aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-100 group">
                <Image
                  src="/images/business-plant-1.jpg"
                  alt="Xclusive Can Limited Majukhan Eco-Friendly Campus"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Photo 2: Green Vertical Vines Facade */}
              <div className="relative w-full sm:w-[320px] aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-100 group mt-0 sm:mt-10">
                <Image
                  src="/images/business-plant-2.jpg"
                  alt="LEED Platinum Certified Vertical Green Building Facade"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The value we offer matching Screenshot */}
        <section className="w-full py-16 sm:py-20 border-b border-slate-100">
          <div className="w-full max-w-[1638px] mx-auto px-6 sm:px-12">
            <div className="max-w-4xl">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight inline-block border-b-4 border-black pb-1 mb-6">
                  The value we offer
                </h2>
              </div>

              <div className="space-y-5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                <p>
                  Our core values form our shape our company culture — guiding every decision, action, and interaction.
                  They unite our team around what Xclusive Can Ltd. stands for globally, inspiring a shared sense of
                  purpose and pride. True to our heritage, these values also serve as an inspiration for the future,
                  ensuring our continued relevance in an increasingly dynamic and competitive world.
                </p>
                <p>
                  At Xclusive Can Ltd., we believe that value goes beyond the product itself — it lies in the trust we
                  build, the relationships we nurture, and the reliability we deliver. Our commitment to excellence,
                  innovation, and sustainability drives us to create packaging solutions that not only meet but consistently
                  exceed expectations.
                </p>
                <p>
                  We offer our clients comprehensive support, from initial concepts to final delivery, ensuring
                  efficiency, quality, and circumspection at every stage. Whether it&apos;s developing advanced packaging
                  for fast-moving consumer goods or crafting specialized solutions for industrial needs, our focus
                  remains on delivering tangible results and long-term value for our partners worldwide.
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => toggleSection("value")}
                  className="inline-block px-7 py-2 rounded-lg border-2 border-black bg-white text-black font-bold text-sm hover:bg-black hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  {expandedSections["value"] ? "View Less..." : "View More..."}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Our purpose drives our culture matching Screenshot */}
        <section className="w-full py-16 sm:py-20 border-b border-slate-100">
          <div className="w-full max-w-[1638px] mx-auto px-6 sm:px-12">
            <div className="max-w-4xl">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight inline-block border-b-4 border-black pb-1 mb-6">
                  Our purpose drives our culture
                </h2>
              </div>

              <div className="space-y-5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                <p>
                  Our culture at Xclusive Can Ltd. is built around a shared purpose: to shape the future of sustainable
                  and intelligent packaging through innovation and collaboration. This purpose fuels every decision we
                  make and every challenge we embrace. We believe that true innovation thrives in a culture of curiosity,
                  teamwork, and continuous learning. Every member of our organization — from R&amp;D engineers to
                  production specialists — contributes ideas that move us forward. Our open, progressive environment
                  inspires creativity, accountability, and excellence in every project we undertake.
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => toggleSection("purpose")}
                  className="inline-block px-7 py-2 rounded-lg border-2 border-black bg-white text-black font-bold text-sm hover:bg-black hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  {expandedSections["purpose"] ? "View Less..." : "View More..."}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Our Strength matching Screenshot */}
        <section className="w-full py-16 sm:py-20 border-b border-slate-100">
          <div className="w-full max-w-[1638px] mx-auto px-6 sm:px-12">
            <div className="max-w-4xl">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight inline-block border-b-4 border-black pb-1 mb-6">
                  Our Strength
                </h2>
              </div>

              <div className="space-y-5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                <p>
                  With over 32 years of hands-on experience in the manufacturing of plastic and metal packaging products,
                  we have built a legacy of excellence, innovation, and trust. Our strength lies in our deep industry
                  expertise, cutting-edge technology, and unwavering commitment to quality.
                </p>
                <p>
                  We specialize in delivering innovative packaging solutions tailored to meet diverse industry needs — from
                  concept design to full-scale production. Our end-to-end capability allows us to provide precision
                  engineered results that align perfectly with our clients&apos; functional and branding requirements.
                </p>
                <p>
                  Supported by state-of-the-art machinery, a skilled technical workforce, and a dedicated R&amp;D team, we
                  consistently achieve the highest standards of performance, durability, and aesthetics. But beyond
                  technology, our greatest strength is our people — passionate professionals who transform ideas into
                  superior, reliable, and sustainable packaging solutions.
                </p>
                <p>
                  Together, we deliver not just products, but trust, consistency, and long-term value that help our clients
                  succeed in competitive global markets.
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => toggleSection("strength")}
                  className="inline-block px-7 py-2 rounded-lg border-2 border-black bg-white text-black font-bold text-sm hover:bg-black hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  {expandedSections["strength"] ? "View Less..." : "View More..."}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Why Choose Us matching Screenshot 6408e270 */}
        <section className="w-full py-20 sm:py-24">
          <div className="w-full max-w-[1638px] mx-auto px-6 sm:px-12 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight mb-10">
              Why Choose Us
            </h2>

            <div className="max-w-3xl mx-auto text-left space-y-4">
              {whyChooseUsPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-black shrink-0 mt-2" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
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
