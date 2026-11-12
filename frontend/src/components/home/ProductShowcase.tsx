"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, ArrowRight, PackageCheck } from "lucide-react";
import { siteButtonClass } from "@/components/common/SiteButton";
import { api } from "@/lib/api";
import { normalizeApiProduct } from "@/lib/productMapper";
import { PublicStateMessage } from "@/components/common/PublicStateMessage";

interface ProductCardAccent {
  badge: string;
  glow: string;
  ring: string;
  button: string;
  cardBorder: string;
  cardShadow: string;
}

interface ProductCardData {
  id: string;
  slug: string;
  image: string;
  title: string;
  subtitle: string;
  badge: string;
  capacity: string;
  accent: ProductCardAccent;
}

const CARD_ACCENTS: ProductCardAccent[] = [
  {
    badge: "bg-cyan-500/10 text-cyan-600 border-cyan-400/30",
    glow: "from-cyan-400/25 to-blue-500/0",
    ring: "group-hover:border-cyan-400/60",
    button: "group-hover:bg-cyan-500",
    cardBorder: "group-hover:border-cyan-400/60",
    cardShadow: "group-hover:shadow-[0_22px_50px_-10px_rgba(6,182,212,0.28)]",
  },
  {
    badge: "bg-blue-500/10 text-blue-600 border-blue-400/30",
    glow: "from-blue-500/25 to-indigo-500/0",
    ring: "group-hover:border-blue-400/60",
    button: "group-hover:bg-blue-600",
    cardBorder: "group-hover:border-blue-400/60",
    cardShadow: "group-hover:shadow-[0_22px_50px_-10px_rgba(37,99,235,0.28)]",
  },
  {
    badge: "bg-amber-500/10 text-amber-600 border-amber-400/30",
    glow: "from-amber-400/25 to-yellow-500/0",
    ring: "group-hover:border-amber-400/60",
    button: "group-hover:bg-amber-500",
    cardBorder: "group-hover:border-amber-400/60",
    cardShadow: "group-hover:shadow-[0_22px_50px_-10px_rgba(245,158,11,0.28)]",
  },
  {
    badge: "bg-emerald-500/10 text-emerald-600 border-emerald-400/30",
    glow: "from-emerald-400/25 to-teal-500/0",
    ring: "group-hover:border-emerald-400/60",
    button: "group-hover:bg-emerald-500",
    cardBorder: "group-hover:border-emerald-400/60",
    cardShadow: "group-hover:shadow-[0_22px_50px_-10px_rgba(16,185,129,0.28)]",
  },
];

export default function ProductShowcase() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [cards, setCards] = useState<ProductCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await api.products.getAll();
      const raw = Array.isArray(res?.data) ? res.data : [];
      const normalized = raw.map(normalizeApiProduct);
      const featured = normalized.filter((p) => p.isFeatured);
      const nonFeatured = normalized.filter((p) => !p.isFeatured);
      const topFour = [...featured, ...nonFeatured].slice(0, 4);

      setCards(
        topFour.map((p, idx) => ({
          id: p.id,
          slug: p.slug,
          image: p.image,
          title: p.name,
          subtitle: p.material || p.factory,
          badge: p.subCategory,
          capacity: p.capacity || "Custom",
          accent: CARD_ACCENTS[idx % CARD_ACCENTS.length],
        }))
      );
    } catch (err) {
      setCards([]);
      setLoadError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to load featured products from server."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  void hoveredCard;

  return (
    <section
      id="products"
      className="relative w-full bg-[#f8fafc] py-20 sm:py-28 overflow-hidden select-none"
    >
      {/* Ambient Moving Atmospheric Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-cyan-400/10 via-blue-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="w-[98%] max-w-[1920px] mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div data-reveal="up" className="text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/80 text-cyan-700 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
            <span>Packaging Portfolio</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-slate-900 tracking-tight">
            Discover Our Product
          </h2>
          <p className="text-slate-500 font-bold text-lg sm:text-2xl">
            Plastic &amp; Tin Container
          </p>
        </div>

        {/* 5 Exact Blue Outline Category Icons in Glass Capsule */}
        <div data-reveal="scale" className="delay-100 flex justify-center mb-14 sm:mb-16">
          <div className="p-3 sm:p-5 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all">
            <div className="relative w-full max-w-[680px] h-16 sm:h-20">
              <Image
                src="/cropped/category-icons-exact.png"
                alt="Plastic and Tin Container Categories (Tin Can, Cylinder Bottle, Jerry Can, Industrial Pail, Rectangular Tub)"
                fill
                sizes="(max-width: 640px) 100vw, 680px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────
            4 MINIMAL, SLEEK & ANIMATED LUXURY PRODUCT CARDS
           ──────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={`showcase-skeleton-${idx}`}
                className="rounded-[32px] bg-white/90 border border-slate-200/70 p-6 animate-pulse space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="h-6 w-24 rounded-full bg-slate-200" />
                  <div className="h-4 w-16 rounded bg-slate-200" />
                </div>
                <div className="w-full h-64 sm:h-72 rounded-2xl bg-slate-100" />
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="h-5 w-3/4 rounded bg-slate-200" />
                    <div className="h-3.5 w-1/2 rounded bg-slate-100" />
                  </div>
                  <div className="w-11 h-11 rounded-full bg-slate-200 shrink-0" />
                </div>
              </div>
            ))
          ) : loadError ? (
            <PublicStateMessage
              variant="error"
              title="Unable to load featured products"
              description={loadError}
              onRetry={loadProducts}
              className="col-span-full"
            />
          ) : cards.length === 0 ? (
            <PublicStateMessage
              variant="empty"
              title="No featured products published yet"
              description="Featured industrial containers will appear here once added in the catalog."
              className="col-span-full"
            />
          ) : (
            cards.map((card, idx) => {
              const delays = ["delay-75", "delay-150", "delay-200", "delay-250"];

              return (
                <Link
                  key={card.id}
                  href={`/products/${card.slug}`}
                  data-reveal="scale"
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative block rounded-[32px] bg-white/90 backdrop-blur-xl border border-slate-200/70 p-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2.5 cursor-pointer overflow-hidden transform-gpu ${card.accent.cardBorder} ${card.accent.cardShadow} ${delays[idx % delays.length]}`}
                  style={{
                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
                  }}
                >
                  {/* 1. Animated Liquid Shimmer Beam Across Card on Hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transition-transform bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-20" />

                  {/* 2. Top Minimal Bar: Category Capsule & Capacity */}
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <span
                      className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold border backdrop-blur-md transition-colors ${card.accent.badge}`}
                    >
                      {card.badge}
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-slate-400 group-hover:text-slate-700 transition-colors">
                      {card.capacity}
                    </span>
                  </div>

                  {/* 3. Floating Product Image Stage with Breathing Radial Glow */}
                  <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden flex items-center justify-center my-2">
                    {/* Atmospheric Color Glow that Blooms on Hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-b ${card.accent.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] scale-95 group-hover:scale-105 rounded-full blur-2xl pointer-events-none`}
                    />

                    {/* Concentric Floating Ring Beneath Product */}
                    <div className="absolute bottom-6 w-36 h-6 rounded-[100%] bg-slate-900/[0.04] group-hover:scale-120 group-hover:opacity-70 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] blur-[2px] pointer-events-none" />

                    {/* The Product Image - Floats with Smooth Spring Physics */}
                    <div className="relative w-full h-full p-3 flex items-center justify-center z-10">
                      {card.image ? (
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-contain p-4 transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 drop-shadow-md"
                          priority={idx === 0}
                        />
                      ) : (
                        <PackageCheck className="w-14 h-14 text-slate-300" />
                      )}
                    </div>
                  </div>

                  {/* 4. Bottom Info: Clean Title & Animated Circle Arrow Button */}
                  <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between gap-3 relative z-10">
                    <div className="space-y-0.5 min-w-0">
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight group-hover:text-cyan-700 transition-colors line-clamp-1">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 font-medium line-clamp-1">
                        {card.subtitle}
                      </p>
                    </div>

                    {/* Minimal Animated Circle Arrow Button */}
                    <div
                      className={`w-11 h-11 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 shadow-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-white group-hover:rotate-45 group-hover:scale-105 ${card.accent.button}`}
                    >
                      <ArrowUpRight className="w-5 h-5 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* View Full Catalog CTA */}
        <div data-reveal="up" className="delay-150 mt-14 sm:mt-16 text-center">
          <Link
            href="/products"
            className={siteButtonClass({ variant: "primary", size: "lg", className: "group max-w-full" })}
          >
            <span>Explore Full Products Catalog</span>
            <ArrowRight className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
