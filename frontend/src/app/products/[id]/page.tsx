"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RFQDrawer from "@/components/rfq/RFQDrawer";
import { getProductById, CATALOG_PRODUCTS } from "@/data/catalogData";
import { Share2, Check } from "lucide-react";

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const resolvedParams = use(params);
  const product = getProductById(resolvedParams.id) || CATALOG_PRODUCTS[0];

  const [activeImage, setActiveImage] = useState(product.image);
  const [isRFQOpen, setIsRFQOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fallback thumbnails if gallery is shorter than 3
  const thumbnails =
    product.gallery && product.gallery.length >= 3
      ? product.gallery.slice(0, 3)
      : [product.image, "/images/catalog/cat-prod-2.png", "/images/catalog/cat-prod-1.png"];

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      const shareUrl = window.location.href;
      if (navigator.share) {
        try {
          await navigator.share({
            title: `${product.name} | Xclusive Can Limited`,
            text: product.description,
            url: shareUrl,
          });
          return;
        } catch {
          // fallback to clipboard
        }
      }
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Glassmorphic Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* Sky-Blue Hero Banner matching Screenshot be6f6ac5 */}
        <div
          id="hero"
          className="relative w-full h-[220px] sm:h-[280px] bg-gradient-to-r from-[#8fcfe7] via-[#9ad7ec] to-[#ace0f3] overflow-hidden flex items-center select-none"
        >
          {/* Subtle Vector Background Illustration Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[55%] pointer-events-none opacity-20 flex items-center justify-end pr-8 sm:pr-16">
            <svg
              className="w-full h-full max-h-[220px]"
              viewBox="0 0 600 240"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Can, Bottle, Jerrycan & Drum sketches matching reference */}
              <rect x="50" y="70" width="70" height="110" rx="16" />
              <rect x="70" y="50" width="30" height="20" rx="4" />
              <rect x="160" y="40" width="80" height="140" rx="12" />
              <circle cx="200" cy="110" r="24" />
              <rect x="280" y="50" width="90" height="130" rx="14" />
              <path d="M295 50 V30 H320 V50" />
              <circle cx="325" cy="115" r="16" />
              <ellipse cx="440" cy="80" rx="40" ry="18" />
              <path d="M400 80 V160 C400 172 480 172 480 160 V80" />
              <ellipse cx="440" cy="160" rx="40" ry="18" />
              {/* Technician silhouette */}
              <circle cx="530" cy="90" r="18" />
              <path d="M500 170 C500 135 560 135 560 170" />
            </svg>
          </div>

          <div className="relative z-10 w-full max-w-[1638px] mx-auto px-6 sm:px-12 pt-14">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-sm">
              Product Details
            </h1>
            <p className="text-lg sm:text-2xl font-semibold text-white/95 mt-1.5 drop-shadow-sm">
              {product.name}
            </p>
          </div>
        </div>

        {/* Breadcrumb Navigation matching Screenshot */}
        <div className="w-full max-w-[1638px] mx-auto px-6 sm:px-12 pt-8 pb-4 text-xs sm:text-sm text-slate-500 font-medium">
          <Link href="/" className="hover:text-[#5a8ea7] transition-colors">
            Home
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <Link href="/products" className="hover:text-[#5a8ea7] transition-colors">
            Find Our Product
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900 font-bold">{product.name}</span>
        </div>

        {/* Product Details Section strictly constrained to max-w-[1638px] */}
        <section className="w-full pb-20 pt-2">
          <div className="w-full max-w-[1638px] mx-auto px-6 sm:px-12">
            {/* Main Product Heading in Soft Slate Blue */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#5a8ea7] tracking-tight mb-8 sm:mb-10">
              {product.name}
            </h2>

            {/* Two-Column Layout matching Screenshot be6f6ac5 */}
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
              {/* Left Column: Big Product Image + 3 Thumbnails */}
              <div className="w-full lg:w-[48%] space-y-4">
                {/* Main Large Image Card */}
                <div className="relative aspect-[4/3] w-full rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden p-6 flex items-center justify-center">
                  <Image
                    src={activeImage}
                    alt={product.name}
                    fill
                    className="object-contain p-6 transition-all duration-300"
                    priority
                  />
                </div>

                {/* 3 Thumbnails Row matching Screenshot be6f6ac5 */}
                <div className="flex items-center gap-3.5 sm:gap-4">
                  {thumbnails.map((thumb, idx) => {
                    const isSelected = activeImage === thumb;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(thumb)}
                        className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-white border-2 p-2 overflow-hidden cursor-pointer transition-all ${
                          isSelected
                            ? "border-[#5a8ea7] shadow-md ring-2 ring-[#5a8ea7]/20 scale-105"
                            : "border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100"
                        }`}
                        aria-label={`View angle ${idx + 1}`}
                      >
                        <Image
                          src={thumb}
                          alt={`${product.name} angle ${idx + 1}`}
                          fill
                          className="object-contain p-2"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Description, Specification, Usage & Action Buttons */}
              <div className="w-full lg:w-[52%] space-y-8 flex-1 select-none">
                {/* 1. Description */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#5a8ea7] mb-2 tracking-tight">
                    Description
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {product.description}
                  </p>
                </div>

                {/* 2. Specification */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#5a8ea7] mb-2 tracking-tight">
                    Specification
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {product.specification || "No specification available"}
                  </p>
                  <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-700">
                    <div>
                      <span className="text-slate-400 font-semibold block">Material:</span>
                      <span className="font-medium text-slate-800">{product.material || "Food Grade HDPE / PET"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">Capacity:</span>
                      <span className="font-medium text-slate-800">{product.capacity || "Standard"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">Shape:</span>
                      <span className="font-medium text-slate-800">{product.shape}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">Manufacturer:</span>
                      <span className="font-medium text-slate-800">{product.factory}</span>
                    </div>
                  </div>
                </div>

                {/* 3. Usage */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#5a8ea7] mb-2 tracking-tight">
                    Usage
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {product.usage || "No usage description available"}
                  </p>
                </div>

                {/* 4. Action Buttons Row matching Screenshot be6f6ac5 */}
                <div className="pt-4 flex flex-wrap items-center gap-3.5 sm:gap-4">
                  {/* Request For Sample Button */}
                  <button
                    onClick={() => setIsRFQOpen(true)}
                    className="px-7 py-3 rounded-lg bg-[#5f686d] hover:bg-[#4b5358] text-white font-semibold text-sm transition-all shadow-sm active:scale-95 cursor-pointer"
                  >
                    Request For Sample
                  </button>

                  {/* Request A Quote Button */}
                  <button
                    onClick={() => setIsRFQOpen(true)}
                    className="px-7 py-3 rounded-lg bg-[#6ba3be] hover:bg-[#5890ab] text-white font-semibold text-sm transition-all shadow-sm active:scale-95 cursor-pointer"
                  >
                    Request A Quote
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={handleShare}
                    className="px-7 py-3 rounded-lg bg-[#1a1a1a] hover:bg-black text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-sm active:scale-95 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Quotation & Sample Request Drawer */}
      <RFQDrawer
        isOpen={isRFQOpen}
        onClose={() => setIsRFQOpen(false)}
        initialProduct={{
          id: product.id,
          name: product.name,
          category: product.genre.toLowerCase() as any,
          categoryLabel: product.genre,
          material: product.material || "Virgin HDPE",
          capacityRange: product.capacity || "Custom",
          applications: [product.subCategory],
          image: product.image,
          description: product.description,
          features: [],
        }}
      />
    </div>
  );
}

