"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function ProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const productCards = [
    { id: 1, image: "/cropped/product-card-1.png", title: "White Plastic Bottle with Blue Cap" },
    { id: 2, image: "/cropped/product-card-2.png", title: "White Plastic Container Cup" },
    { id: 3, image: "/cropped/product-card-3.png", title: "Dropper Bottle with Yellow Nozzle & Cap" },
    { id: 4, image: "/cropped/product-card-4.png", title: "Rectangular Plastic Food Container with Lid" },
  ];

  return (
    <section id="products" className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1480px] mx-auto px-6 sm:px-12">
        {/* Section Header matching Screenshot 2026-11-04 130325.png */}
        <div className="text-center space-y-2 mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight">
            Discover Our Product
          </h2>
          <p className="text-slate-600 font-medium text-base sm:text-lg">
            Plastic &amp; Tin Container
          </p>
        </div>

        {/* 5 Exact Blue Outline Category Icons from Screenshot */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="relative w-full max-w-[680px] h-16 sm:h-20">
            <Image
              src="/cropped/category-icons-exact.png"
              alt="Plastic and Tin Container Categories"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* 4 Exact Product Cards from Screenshot 2026-11-04 130325.png */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productCards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedProduct(card.image)}
              className="group cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative h-52 sm:h-64"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Product Image Zoom Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl p-4">
            <div className="flex justify-end pb-2">
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1 rounded text-slate-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-4/3 w-full">
              <Image
                src={selectedProduct}
                alt="Product Preview"
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
