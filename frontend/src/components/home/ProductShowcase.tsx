"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ZoomIn } from "lucide-react";

export default function ProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState<{ image: string; title: string } | null>(null);

  const productCards = [
    { id: 1, image: "/cropped/product-card-1.png", title: "White Plastic Bottle with Blue Gear-Ring Cap" },
    { id: 2, image: "/cropped/product-card-2.png", title: "Conical White Plastic Cup / Tub" },
    { id: 3, image: "/cropped/product-card-3.png", title: "Precision Dropper Bottle with Yellow Nozzle & Cap" },
    { id: 4, image: "/cropped/product-card-4.png", title: "Rectangular Translucent Container with Clear Lid" },
  ];

  return (
    <section id="products" className="w-full bg-white py-16 sm:py-24">
      <div className="w-full max-w-[1638px] mx-auto px-6 sm:px-12">
        {/* Section Header matching Screenshot 2026-11-04 130325.png */}
        <div className="text-center space-y-2 mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight">
            Discover Our Product
          </h2>
          <p className="text-slate-500 font-medium text-base sm:text-lg">
            Plastic &amp; Tin Container
          </p>
        </div>

        {/* 5 Exact Blue Outline Category Icons from Screenshot 2026-11-04 130325.png */}
        <div className="flex justify-center mb-12 sm:mb-16">
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

        {/* 4 Exact Product Cards from Screenshot 2026-11-04 130325.png */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productCards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedProduct({ image: card.image, title: card.title })}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative h-56 sm:h-64 border border-slate-100"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="p-2.5 rounded-full bg-white/90 text-black shadow-md">
                  <ZoomIn className="w-5 h-5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Link to Dedicated Products Catalog Page */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#5a8ea7] text-white font-bold text-sm sm:text-base hover:bg-[#487388] transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <span>View Full Products Catalog (300+ Items)</span>
            <span className="text-lg">&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Product Image Zoom Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-black">{selectedProduct.title}</h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1 rounded text-slate-500 hover:text-black hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-4/3 w-full mt-2">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
