"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, ShoppingCart } from "lucide-react";

interface BottlePack {
  id: string;
  subLabel: string;
  title: string;
  price: string;
  desc: string;
  cropLeft: string; // CSS position offset
}

const PACKS: BottlePack[] = [
  {
    id: "pack-1",
    subLabel: "2L 3 Bottles",
    title: "Mineral Water Bottle",
    price: "$70.00",
    desc: "Lorem ipsum dolor sit amet adipelit sed eiusmte.mpor encid dolore.",
    cropLeft: "left-[2%]",
  },
  {
    id: "pack-2",
    subLabel: "2L 3 Bottles",
    title: "Mineral Water Bottle",
    price: "$60.00",
    desc: "Lorem ipsum dolor sit amet adipelit sed eiusmte.mpor encid dolore.",
    cropLeft: "left-[35%]",
  },
  {
    id: "pack-3",
    subLabel: "3L 3 Bottles",
    title: "Mineral Water Bottle",
    price: "$55.00",
    desc: "Lorem ipsum dolor sit amet adipelit sed eiusmte.mpor encid dolore.",
    cropLeft: "left-[68%]",
  },
];

export default function QualityBottlePacksSection() {
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddToCart = (id: string) => {
    setAddedId(id);
    setTimeout(() => {
      setAddedId(null);
    }, 2000);
  };

  return (
    <section className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-[1638px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Section Header (Screenshot 39c7284a) */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0f172a] leading-[1.2] tracking-tight">
            We Deliver Best Quality <br className="hidden sm:inline" />
            Bottle Packs.
          </h2>
        </div>

        {/* 3 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {PACKS.map((pack, idx) => (
            <div
              key={pack.id}
              className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_15px_45px_rgba(0,34,102,0.06)] border border-slate-100 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,194,232,0.16)] group"
            >
              {/* Product Pack Artwork Cropped from Screenshot 39c7284a */}
              <div className="relative w-full max-w-[260px] aspect-[4/3] mb-6 overflow-hidden rounded-2xl flex items-center justify-center">
                <div
                  className="w-[320%] h-[120%] relative -top-[10%]"
                  style={{
                    left: idx === 0 ? "-7%" : idx === 1 ? "-110%" : "-214%",
                  }}
                >
                  <Image
                    src="/acuasafe/section-bottle-packs.png"
                    alt={pack.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Sub-label */}
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {pack.subLabel}
              </span>

              {/* Subtle Wavy Divider */}
              <div className="w-16 h-2 mb-3 opacity-60">
                <svg width="64" height="8" viewBox="0 0 64 8" fill="none">
                  <path
                    d="M0,4 Q8,0 16,4 T32,4 T48,4 T64,4"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Product Title */}
              <h3 className="text-xl font-bold text-[#0f172a] mb-2 group-hover:text-[#00c2e8] transition-colors">
                {pack.title}
              </h3>

              {/* Price (Cyan) */}
              <div className="text-xl font-extrabold text-[#00c2e8] mb-3">
                {pack.price}
              </div>

              {/* Description */}
              <p className="text-sm text-slate-500 leading-relaxed max-w-[240px] mb-8">
                {pack.desc}
              </p>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(pack.id)}
                className={`mt-auto px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-200 flex items-center gap-2 ${
                  addedId === pack.id
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-[#00c2e8] hover:text-white hover:border-[#00c2e8] shadow-sm hover:shadow-[0_8px_20px_rgba(0,194,232,0.35)]"
                }`}
              >
                {addedId === pack.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to cart</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
