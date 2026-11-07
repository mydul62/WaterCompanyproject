"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function ProductShowcase() {
  const productCards = [
    {
      id: "p1",
      slug: "pharmaceutical-bottle",
      image: "/cropped/product-card-1.png",
      title: "White Plastic Bottle with Blue Gear-Ring Cap",
      category: "PET Bottle",
    },
    {
      id: "p2",
      slug: "liquid-washing-container",
      image: "/cropped/product-card-2.png",
      title: "Conical White Plastic Cup / Tub",
      category: "Container",
    },
    {
      id: "p3",
      slug: "oral-syringe",
      image: "/cropped/product-card-3.png",
      title: "Precision Dropper Bottle with Yellow Nozzle & Cap",
      category: "Pharma Dropper",
    },
    {
      id: "p4",
      slug: "vitamin-container",
      image: "/cropped/product-card-4.png",
      title: "Rectangular Translucent Container with Clear Lid",
      category: "Food Packaging",
    },
  ];

  return (
    <section id="products" className="relative w-full bg-[#f8fafc] py-20 sm:py-28 overflow-hidden select-none">
      {/* Ambient Glass Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-400/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-[98%] max-w-[1920px] mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div data-reveal="up" className="text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
            <span>Engineered Containers Catalog</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
            Discover Our Product
          </h2>
          <p className="text-slate-500 font-bold text-lg sm:text-xl">
            Plastic &amp; Tin Container
          </p>
        </div>

        {/* 5 Exact Blue Outline Category Icons in Glass Capsule */}
        <div data-reveal="scale" className="delay-100 flex justify-center mb-12 sm:mb-16">
          <div className="p-3 sm:p-5 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_10px_35px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all">
            <div className="relative w-full max-w-[680px] h-16 sm:h-20">
              <Image
                src="/cropped/category-icons-exact.png"
                alt="Plastic and Tin Container Categories (Tin Can, Cylinder Bottle, Jerry Can, Industrial Pail, Rectangular Tub)"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* 4 Glass Pedestal Product Cards - Direct Click to Product Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {productCards.map((card, idx) => (
            <Link
              key={card.id}
              href={`/products/${card.slug}`}
              data-reveal="up"
              className={`delay-${(idx + 1) * 100} group block rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white/90 p-5 shadow-[0_12px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_22px_55px_rgba(0,194,232,0.18)] hover:border-cyan-400/40 hover:-translate-y-2 transition-all duration-300 relative cursor-pointer`}
            >
              {/* Category Pill Tag */}
              <div className="absolute top-4 left-4 z-10 px-3.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-xs sm:text-sm font-extrabold text-white shadow-sm">
                {card.category}
              </div>

              {/* Image Container with Pedestal Effect - Pure & Clean, No Quick View Overlay */}
              <div className="relative w-full h-56 sm:h-64 rounded-2xl bg-gradient-to-b from-slate-50/80 to-slate-100/60 overflow-hidden flex items-center justify-center">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-contain p-4 group-hover:scale-108 group-hover:-translate-y-1 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Title */}
              <div className="pt-4 text-center">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 line-clamp-1 group-hover:text-cyan-600 transition-colors">
                  {card.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-cyan-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Product Details &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View Full Catalog CTA */}
        <div className="mt-14 sm:mt-16 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl bg-slate-900 text-white font-bold text-sm sm:text-base hover:bg-cyan-600 transition-all shadow-xl hover:shadow-[0_15px_35px_rgba(0,194,232,0.35)] active:scale-95 group cursor-pointer"
          >
            <span>View Full Products Catalog (300+ Items)</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
