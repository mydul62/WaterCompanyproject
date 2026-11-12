"use client";

import React from "react";
import Image from "next/image";
import { siteButtonClass } from "@/components/common/SiteButton";
import {
  Droplets,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  Factory,
  Check,
  ArrowRight,
  TrendingUp,
  Clock,
  Layers,
  Recycle,
  Microscope,
} from "lucide-react";

interface B2BBannerProps {
  onOpenRFQ?: () => void;
}

export default function B2BBanner({ onOpenRFQ }: B2BBannerProps) {
  const bottleSizes = [
    { size: "500 ml", use: "Personal & On-The-Go", icon: "💧" },
    { size: "1 Litre", use: "Active Daily Hydration", icon: "💧" },
    { size: "1.5 Litre", use: "Home & Dining Table", icon: "💧" },
    { size: "5 Litre", use: "Kitchen & Travel Canteen", icon: "💧" },
    { size: "20 Litre", use: "Office & Home Dispenser Jar", icon: "💧" },
  ];

  const qualityChecks = [
    "100% Food-Grade Virgin PET",
    "Tamper-Evident Hermetic Seal",
    "9-Stage Reverse Osmosis (RO)",
    "Ozone & UV Sterilization",
    "Every Batch Lab Certified",
    "B2B Private Label Available",
  ];

  const whyChooseUs = [
    {
      num: "01",
      title: "Certified Purity Standards",
      desc: "Licensed by BSTI and certified under ISO 22000, HACCP, and GMP standards.",
    },
    {
      num: "02",
      title: "Touchless Automated Lines",
      desc: "Fully robotic bottling in Class 100,000 cleanrooms without human contact.",
    },
    {
      num: "03",
      title: "Agile Fleet & Scheduled Delivery",
      desc: "Dedicated logistics for timely supply to homes, corporate offices, and retailers.",
    },
    {
      num: "04",
      title: "Dedicated Client & Dealer Care",
      desc: "Priority account manager for volume contracts, hotels, and custom labeling.",
    },
  ];

  const certifications = [
    { label: "ISO 22000:2018", sub: "Food Safety Management" },
    { label: "HACCP Certified", sub: "Hazard Analysis & Critical Control" },
    { label: "GMP Compliant", sub: "Good Manufacturing Practice" },
    { label: "BSTI BDS 1414", sub: "National Drinking Water Standard" },
  ];

  return (
    <section id="overview" className="relative w-full bg-[#f8fafc] py-20 sm:py-28 overflow-hidden select-none">
      {/* Ambient Radial Glass Glow Orbs */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[880px] h-[880px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-10 w-[580px] h-[580px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-[98%] max-w-[1920px] mx-auto px-4 sm:px-8">
        {/* Top Floating Glass CTA Banner: Packaging Solutions Always Made Right */}
        <div
          data-reveal="scale"
          className="w-full rounded-3xl bg-gradient-to-r from-white/90 via-[#eef7fd]/90 to-[#d8eefc]/90 backdrop-blur-2xl border border-white/90 p-7 sm:p-10 shadow-[0_15px_45px_rgba(0,194,232,0.1)] flex flex-col md:flex-row items-center justify-between gap-6 mb-16 sm:mb-24 transition-all duration-300 hover:shadow-[0_20px_55px_rgba(0,194,232,0.18)]"
        >
          {/* Left: Noor Plastic Official Brand Mark */}
          <div className="flex items-center gap-3 shrink-0">
            <svg
              viewBox="0 0 40 40"
              className="w-10 h-10 shrink-0 drop-shadow-xs"
              aria-hidden="true"
            >
              <path
                d="M20 2.5C22.4 7 24.4 10.6 24.4 13.6C24.4 16 22.4 17.8 20 17.8C17.6 17.8 15.6 16 15.6 13.6C15.6 10.6 17.6 7 20 2.5Z"
                fill="#5EC5F2"
              />
              <path
                d="M20 37.5C17.6 33 15.6 29.4 15.6 26.4C15.6 24 17.6 22.2 20 22.2C22.4 22.2 24.4 24 24.4 26.4C24.4 29.4 22.4 33 20 37.5Z"
                fill="#094E9B"
              />
              <path
                d="M2.5 20C7 17.6 10.6 15.6 13.6 15.6C16 15.6 17.8 17.6 17.8 20C17.8 22.4 16 24.4 13.6 24.4C10.6 24.4 7 22.4 2.5 20Z"
                fill="#1D8FE1"
              />
              <path
                d="M37.5 20C33 22.4 29.4 24.4 26.4 24.4C24 24.4 22.2 22.4 22.2 20C22.2 17.6 24 15.6 26.4 15.6C29.4 15.6 33 17.6 37.5 20Z"
                fill="#35A7E8"
              />
              <circle cx="14" cy="14" r="1.4" fill="#1D8FE1" />
              <circle cx="26" cy="14" r="1.4" fill="#5EC5F2" />
              <circle cx="14" cy="26" r="1.4" fill="#094E9B" />
              <circle cx="26" cy="26" r="1.4" fill="#1D8FE1" />
            </svg>
            <div className="leading-tight">
              <span className="font-hero-display text-[28px] text-[#0D1E3A] tracking-[-0.01em] block">
                Noor Plastic
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#094E9B] block">
                Noor Plastic Industries
              </span>
            </div>
          </div>

          {/* Center: Title & Description */}
          <div className="flex-1 text-center md:text-left space-y-1.5 sm:space-y-2">
            <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-slate-900 tracking-tight">
              Packaging Solutions Always Made Right&reg;
            </h3>
            <p className="text-sm sm:text-base lg:text-[17px] text-slate-600 leading-relaxed max-w-3xl">
              With a diverse stock bottle portfolio and an innovative engineering team producing custom packaging
              solutions, we provide the highest quality containers for leading brands.
            </p>
          </div>

          {/* Right: Contact Us Button matching Header Button Style */}
          <div className="shrink-0">
            <button
              onClick={onOpenRFQ}
              className={siteButtonClass({ variant: "primary", size: "lg" })}
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Section Header: About Noor Plastic */}
        <div data-reveal="up" className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 sm:mb-18">
          <div className="max-w-2xl space-y-3.5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/90 text-cyan-800 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
              <span>About Noor Plastic &bull; Trade License #242501300583</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.12]">
              Trusted Plastic &amp; Water Packaging in{" "}
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Bangladesh
              </span>
            </h2>
          </div>

          <div className="max-w-xl space-y-4">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              Noor Plastic Industries (Proprietor: Nurul Islam) is a licensed manufacturer, importer, and supplier at Holding #5, Ward #02, Latifpur-B, Kaliakoir-1750, Gazipur (BIN: 007122199-1205, TIN: 636404586599), serving homes and commercial clients across Bangladesh.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#products"
                className={siteButtonClass({ variant: "primary", size: "sm" })}
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenRFQ}
                className={siteButtonClass({ variant: "outline", size: "sm" })}
              >
                <span>Partner With Us</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modern Glass Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Card 1: Our Products Portfolio (col-span-7) with Liquid Water Fill */}
          <article data-reveal="scale" className="water-fill-card lg:col-span-7 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/90 p-7 sm:p-9 shadow-[0_12px_40px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shadow-sm">
                  <Droplets className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full">
                  Full Bottle Range
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-[32px] font-extrabold text-slate-900 tracking-tight">
                  Our Products
                </h3>
                <p className="text-base sm:text-lg text-slate-600 mt-1">
                  A complete range of packaged drinking water, crafted to the highest international standards of safety,
                  mineral balance, and pure crisp taste.
                </p>
              </div>

              {/* Modern Glass Size Badges with Liquid Water Rise */}
              <div className="pt-2">
                <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider block mb-3">
                  Available Formats &amp; Capacities
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {bottleSizes.map((item, idx) => (
                    <div
                      key={idx}
                      className="water-fill-card p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center group cursor-pointer"
                    >
                      <b className="block text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-cyan-700">
                        {item.size}
                      </b>
                      <small className="text-xs sm:text-[13px] text-slate-500 font-medium line-clamp-1">
                        {item.use}
                      </small>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quality Checklist */}
            <div className="pt-6 mt-6 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {qualityChecks.map((check, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm sm:text-base font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 stroke-[2.5]" />
                    <span>{check}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Card 2: 10+ Years Stat Card (col-span-5) */}
          <article data-reveal="scale" className="delay-150 lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#0b2236] via-[#10334f] to-[#174668] text-white p-7 sm:p-9 shadow-[0_15px_45px_rgba(11,34,54,0.3)] flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient Water Rings Animation */}
            <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full border border-cyan-400/20 group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
            <div className="absolute -top-4 -right-4 w-48 h-48 rounded-full border border-cyan-400/30 pointer-events-none" />
            <div className="absolute top-4 right-4 w-32 h-32 rounded-full border border-cyan-400/40 pointer-events-none" />

            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-cyan-300" />
                <span>Est. Oct 2024 &bull; Kaliakoir, Gazipur</span>
              </div>

              <div className="pt-4">
                <span className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
                  100%
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  Licensed Quality Assurance
                </h3>
                <p className="text-cyan-100/80 text-base sm:text-lg leading-relaxed mt-2 max-w-sm">
                  Certified plastic manufacturing, import &amp; supply delivering crisp, mineral-balanced hydration for homes and businesses.
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm text-cyan-200/90 font-medium">
              <span>Trade License #242501300583</span>
              <span>&bull;</span>
              <span>BIN 007122199-1205</span>
            </div>
          </article>

          {/* Card 3: Why Choose Us (col-span-5) */}
          <article data-reveal="scale" className="delay-100 lg:col-span-5 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/90 p-7 sm:p-9 shadow-[0_12px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,194,232,0.12)] transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
                Core Advantages
              </span>
            </div>

            <h3 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 tracking-tight">
              Why Choose Noor Plastic
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-1 mb-6">
              Reliable supply and dedicated service you can build a long-term partnership on.
            </p>

            <div className="space-y-4">
              {whyChooseUs.map((item, idx) => (
                <div
                  key={idx}
                  className="water-fill-card flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 transition-all cursor-pointer"
                >
                  <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-cyan-700 font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                    {item.num}
                  </span>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Card 4: State-of-the-art Visual Showcase & Stats (col-span-7) with Liquid Water Fill */}
          <article data-reveal="scale" className="delay-200 water-fill-card lg:col-span-7 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/90 p-7 sm:p-9 shadow-[0_12px_40px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shadow-sm">
                  <Factory className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full">
                  Cleanroom Facility
                </span>
              </div>

              <h3 className="text-2xl sm:text-[32px] font-extrabold text-slate-900 tracking-tight">
                Kaliakoir Automated Plastic &amp; Bottling Plant
              </h3>
              <p className="text-base sm:text-lg text-slate-600 mt-1">
                Precision molding, import logistics, and non-contact bottling at Latifpur-B, Kaliakoir-1750, Gazipur ensure food-grade strength and purity.
              </p>
            </div>

            {/* Visual Glass Showcase Banner */}
            <div className="relative w-full h-48 sm:h-56 rounded-2xl bg-gradient-to-r from-sky-50 via-cyan-50 to-blue-50 border border-cyan-100/60 overflow-hidden my-6 flex items-center justify-center group">
              <Image
                src="/acuasafe/mineral-bottle-splash.jpg"
                alt="Noor Plastic Purified Water Containers"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent flex items-end p-5">
                <div>
                  <span className="text-white font-extrabold text-xl sm:text-2xl drop-shadow">
                    Pure Hydration. Naturally Balanced.
                  </span>
                  <p className="text-cyan-200 text-sm sm:text-base drop-shadow">
                    Enriched with essential minerals &bull; pH 7.2 - 7.5
                  </p>
                </div>
              </div>
            </div>

            {/* 3 Real-Time Stats */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <b className="block text-2xl sm:text-3xl font-black text-cyan-600">24/7</b>
                <span className="text-xs sm:text-sm text-slate-500 font-semibold leading-tight block mt-0.5">
                  Automated QC Lab
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <b className="block text-2xl sm:text-3xl font-black text-cyan-600">100%</b>
                <span className="text-xs sm:text-sm text-slate-500 font-semibold leading-tight block mt-0.5">
                  Virgin Food-Grade PET
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <b className="block text-2xl sm:text-3xl font-black text-cyan-600">9-Stage</b>
                <span className="text-xs sm:text-sm text-slate-500 font-semibold leading-tight block mt-0.5">
                  RO &amp; UV Filtration
                </span>
              </div>
            </div>
          </article>
        </div>

        {/* Commitment to Quality & Sustainability (Bottom Glass Plate) */}
        <div className="rounded-3xl bg-gradient-to-br from-[#061e36] via-[#092d4f] to-[#0e3b64] text-white p-8 sm:p-12 shadow-[0_20px_60px_rgba(6,30,54,0.4)] relative overflow-hidden">
          {/* Subtle Ambient Water Ripple Glow */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Description & Accreditations */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
                <Recycle className="w-3.5 h-3.5" />
                <span>Quality &amp; Sustainability</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold text-white tracking-tight leading-tight">
                Our Commitment to Quality and Sustainability
              </h3>

              <p className="text-base sm:text-lg text-cyan-100/80 leading-relaxed max-w-xl">
                Quality is our uncompromising culture. We follow internationally recognized safety systems, minimize
                process waste, and engineer all bottles from 100% recyclable, circular-economy materials.
              </p>

              {/* Accreditations Badges */}
              <div className="pt-2">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-300/80 block mb-3">
                  Recognized Accreditations
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:border-cyan-400/50 transition-all text-center"
                    >
                      <b className="block text-sm sm:text-base font-extrabold text-white">
                        {cert.label}
                      </b>
                      <small className="text-xs text-cyan-200/70 font-medium block mt-0.5 line-clamp-1">
                        {cert.sub}
                      </small>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: 4 Core Environmental & Purity Pillars */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
                <span className="text-sm font-extrabold text-cyan-300">01</span>
                <b className="block text-base sm:text-lg font-bold text-white">Certified</b>
                <small className="text-xs sm:text-sm text-cyan-100/70 block">
                  Internationally audited food safety
                </small>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
                <span className="text-sm font-extrabold text-cyan-300">02</span>
                <b className="block text-base sm:text-lg font-bold text-white">Recyclable</b>
                <small className="text-xs sm:text-sm text-cyan-100/70 block">
                  100% circular PET packaging
                </small>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
                <span className="text-sm font-extrabold text-cyan-300">03</span>
                <b className="block text-base sm:text-lg font-bold text-white">Low Waste</b>
                <small className="text-xs sm:text-sm text-cyan-100/70 block">
                  Optimized energy &amp; water cycles
                </small>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
                <span className="text-sm font-extrabold text-cyan-300">04</span>
                <b className="block text-base sm:text-lg font-bold text-white">Lab Tested</b>
                <small className="text-xs sm:text-sm text-cyan-100/70 block">
                  Continuous batch traceability
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
