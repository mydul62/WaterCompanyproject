"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { normalizeApiProduct } from "@/lib/productMapper";
import { PublicStateMessage } from "@/components/common/PublicStateMessage";
import { X, Search, ChevronDown, ArrowRight, Sparkles, Layers } from "lucide-react";
import { api } from "@/lib/api";
import { smoothScrollToElement } from "@/lib/smoothScroll";
import { ProductsCatalogSkeletonItems } from "@/components/common/Skeletons";

interface ProductItem {
  id: string;
  n: string; // name
  d: string; // description
  f: string; // factory
  m: "Plastic" | "Metal"; // material line: Plastic | Metal
  c: string; // category
  s: string; // svg icon key
  img?: string; // real photo if available
  slug?: string;
  spec?: string;
}

export default function ProductsPage() {
  const [productsList, setProductsList] = useState<ProductItem[]>([]);
  const [categoriesData, setCategoriesData] = useState<
    { name: string; genre: "Plastic" | "Metal" }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedFac, setSelectedFac] = useState<string[]>([]);
  const [selectedCat, setSelectedCat] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setLoadError(null);
    Promise.all([
      api.products.getAll(),
      api.categories.getAll().catch(() => ({ data: [] })),
    ])
      .then(([prodRes, catRes]) => {
        if (!active) return;
        const rawProds = Array.isArray(prodRes?.data) ? prodRes.data : [];
        const backendItems: ProductItem[] = rawProds.map((raw: any) => {
          const p = normalizeApiProduct(raw);
          return {
            id: p.id,
            n: p.name,
            d: p.description,
            f: p.factory,
            m: p.genre,
            c: p.subCategory,
            s: p.genre === "Metal" ? "can" : "bottle",
            img: p.image || undefined,
            slug: p.slug,
            spec: p.capacity,
          };
        });
        setProductsList(backendItems);

        const rawCats = Array.isArray(catRes?.data) ? catRes.data : [];
        setCategoriesData(
          rawCats
            .filter((cat: any) => cat?.name)
            .map((cat: any) => {
              const mat = `${cat.material || ""} ${cat.slug || ""} ${cat.name || ""}`.toLowerCase();
              const genre: "Plastic" | "Metal" = /(tin|tinplate|metal|aerosol|alum|steel|can\b)/.test(mat)
                ? "Metal"
                : "Plastic";
              return { name: String(cat.name), genre };
            })
        );
      })
      .catch((err) => {
        if (!active) return;
        setProductsList([]);
        setLoadError(
          err instanceof Error && err.message
            ? err.message
            : "Unable to load product catalog from server."
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [reloadKey]);

  const factories = useMemo(() => {
    const set = new Set(productsList.map((p) => p.f).filter(Boolean));
    return set.size > 0 ? Array.from(set) : ["Noor Plastic Industries"];
  }, [productsList]);

  const { plasticCats, metalCats } = useMemo(() => {
    const plasticSet = new Set<string>();
    const metalSet = new Set<string>();
    categoriesData.forEach((c) => {
      if (c.genre === "Metal") metalSet.add(c.name);
      else plasticSet.add(c.name);
    });
    productsList.forEach((p) => {
      if (p.m === "Metal") metalSet.add(p.c);
      else plasticSet.add(p.c);
    });
    return {
      plasticCats: Array.from(plasticSet),
      metalCats: Array.from(metalSet),
    };
  }, [categoriesData, productsList]);

  // Accordion toggle states
  const [factoryOpen, setFactoryOpen] = useState(true);
  const [genreOpen, setGenreOpen] = useState(true);

  // Mobile drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Toggle factory filter
  const toggleFac = (fac: string) => {
    setSelectedFac((prev) =>
      prev.includes(fac) ? prev.filter((f) => f !== fac) : [...prev, fac]
    );
  };

  // Toggle category filter
  const toggleCat = (cat: string) => {
    setSelectedCat((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Remove chip
  const removeChip = (val: string) => {
    setSelectedFac((prev) => prev.filter((f) => f !== val));
    setSelectedCat((prev) => prev.filter((c) => c !== val));
  };

  // Clear all filters
  const clearAll = () => {
    setQuery("");
    setSelectedFac([]);
    setSelectedCat([]);
  };

  // Counts for filters
  const counts = useMemo(() => {
    const facCounts: Record<string, number> = {};
    const catCounts: Record<string, number> = {};

    factories.forEach((f) => {
      facCounts[f] = productsList.filter((p) => p.f === f).length;
    });

    plasticCats.forEach((c) => {
      catCounts[c] = productsList.filter((p) => p.m === "Plastic" && p.c === c).length;
    });

    metalCats.forEach((c) => {
      catCounts[c] = productsList.filter((p) => p.m === "Metal" && p.c === c).length;
    });

    return { facCounts, catCounts };
  }, [productsList, factories, plasticCats, metalCats]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return productsList.filter((p) => {
      const matchFac = selectedFac.length === 0 || selectedFac.includes(p.f);
      const matchCat = selectedCat.length === 0 || selectedCat.includes(p.c);
      const matchQuery =
        !q ||
        p.n.toLowerCase().includes(q) ||
        p.d.toLowerCase().includes(q) ||
        p.c.toLowerCase().includes(q) ||
        p.f.toLowerCase().includes(q);

      return matchFac && matchCat && matchQuery;
    });
  }, [productsList, query, selectedFac, selectedCat]);

  const activeChips = [...selectedFac, ...selectedCat];

  // Render SVG illustration
  const renderThumbIcon = (prod: ProductItem) => {
    if (prod.img) {
      return (
        <div className="relative w-full h-full p-4 flex items-center justify-center">
          <Image
            src={prod.img}
            alt={prod.n}
            fill
            className="object-contain p-4 drop-shadow-[0_12px_14px_rgba(15,30,46,0.18)] transition-transform duration-350 group-hover:scale-108"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
      );
    }

    switch (prod.s) {
      case "detergent":
        return (
          <svg viewBox="0 0 80 120" className="w-[46%] h-auto drop-shadow-[0_14px_14px_rgba(15,30,46,0.18)] transition-transform duration-350">
            <rect x="24" y="2" width="22" height="12" rx="3" fill="#dfe7ee" />
            <path d="M22 14h26l6 10c10 6 14 14 14 28v52c0 8-5 14-13 14H15c-8 0-13-6-13-14V52c0-14 4-22 14-28z" fill="#fff" stroke="#cbd6df" />
            <ellipse cx="52" cy="50" rx="10" ry="14" fill="#e3ebf1" stroke="#cbd6df" />
          </svg>
        );
      case "jar":
        return (
          <svg viewBox="0 0 80 100" className="w-[46%] h-auto drop-shadow-[0_14px_14px_rgba(15,30,46,0.18)] transition-transform duration-350">
            <rect x="8" y="4" width="64" height="16" rx="5" fill="#dfe7ee" />
            <rect x="10" y="18" width="60" height="78" rx="10" fill="#fff" stroke="#cbd6df" />
            <rect x="18" y="40" width="44" height="30" rx="4" fill="#e8f2f9" />
          </svg>
        );
      case "pail":
        return (
          <svg viewBox="0 0 100 100" className="w-[46%] h-auto drop-shadow-[0_14px_14px_rgba(15,30,46,0.18)] transition-transform duration-350">
            <path d="M18 30c8-30 56-30 64 0" fill="none" stroke="#9fb0bf" strokeWidth="3" />
            <rect x="10" y="26" width="80" height="10" rx="4" fill="#dfe7ee" />
            <path d="M14 36h72l-6 56c-.5 4-3 6-7 6H27c-4 0-6.5-2-7-6z" fill="#fff" stroke="#cbd6df" />
            <rect x="26" y="50" width="48" height="26" rx="4" fill="#e8f2f9" />
          </svg>
        );
      case "can":
        return (
          <svg viewBox="0 0 100 100" className="w-[46%] h-auto drop-shadow-[0_14px_14px_rgba(15,30,46,0.18)] transition-transform duration-350">
            <ellipse cx="50" cy="18" rx="38" ry="9" fill="#cfd8e0" />
            <path d="M12 18v66c0 5 17 10 38 10s38-5 38-10V18c0 5-17 10-38 10S12 23 12 18z" fill="#aab7c3" />
            <rect x="12" y="44" width="76" height="30" fill="#1f5f8b" opacity=".85" />
            <path d="M20 26h60" stroke="#fff" strokeOpacity=".5" strokeWidth="3" />
          </svg>
        );
      case "bottle":
      default:
        return (
          <svg viewBox="0 0 60 120" className="w-[46%] h-auto drop-shadow-[0_14px_14px_rgba(15,30,46,0.18)] transition-transform duration-350">
            <rect x="22" y="2" width="16" height="14" rx="3" fill="#dfe7ee" />
            <path d="M20 16h20v10c10 6 12 14 12 26v56c0 6-4 10-10 10H18c-6 0-10-4-10-10V52c0-12 2-20 12-26z" fill="#fff" stroke="#cbd6df" />
            <rect x="14" y="58" width="32" height="34" rx="4" fill="#e8f2f9" />
          </svg>
        );
    }
  };

  return (
    <div className="prd-root min-h-screen flex flex-col bg-[#f5f8fb] text-[#0f1e2e]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .prd-root {
          --ink: #0f1e2e;
          --muted: #5b6b7b;
          --line: #e3e9ef;
          --bg: #f5f8fb;
          --card: #fff;
          --brand: #1f5f8b;
          --brand-2: #2a86b8;
          --accent: #18b2a0;
          --brand-soft: #e8f2f9;
          --radius: 18px;
          --shadow: 0 1px 2px rgba(15,30,46,.05), 0 8px 24px rgba(15,30,46,.06);
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }

        /* HERO */
        .prd-hero {
          position: relative;
          padding: 170px 24px 110px;
          text-align: center;
          color: #fff;
          overflow: hidden;
          background: radial-gradient(900px 400px at 85% -10%, rgba(24,178,160,.45), transparent 60%),
                      radial-gradient(700px 400px at 0% 100%, rgba(42,134,184,.5), transparent 60%),
                      linear-gradient(135deg, #0b2236, #12405f 60%, #1b5d86);
        }
        .prd-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: .07;
          background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px);
          background-size: 44px 44px;
          pointer-events: none;
        }
        .prd-hero > * {
          position: relative;
        }
        .prd-eyebrow {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .18em;
          text-transform: uppercase;
          padding: 7px 14px;
          border: 1px solid rgba(255,255,255,.3);
          border-radius: 999px;
          margin-bottom: 20px;
          background: rgba(255,255,255,.08);
          backdrop-filter: blur(8px);
        }
        .prd-hero h1 {
          font-size: clamp(34px, 6vw, 64px);
          font-weight: 800;
          letter-spacing: -.03em;
          line-height: 1.05;
        }
        .prd-hero h1 em {
          font-style: normal;
          background: linear-gradient(90deg, #7fe3d6, #9fd3f3);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .prd-hero p {
          max-width: 560px;
          margin: 18px auto 0;
          color: #cfe0ec;
          font-size: 17px;
          line-height: 1.5;
        }
        .prd-stats {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 38px;
          flex-wrap: wrap;
        }
        .prd-stats b {
          display: block;
          font-size: 26px;
          font-weight: 800;
        }
        .prd-stats small {
          color: #aac4d6;
          font-size: 13px;
        }

        /* LAYOUT */
        .prd-wrap {
          width: min(1920px, 98%);
          margin: 0 auto 80px;
          position: relative;
          display: grid;
          grid-template-columns: 290px 1fr;
          gap: 28px;
          align-items: start;
        }
        .prd-panel {
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
        }

        /* SIDEBAR */
        .prd-side {
          padding: 22px;
          position: sticky;
          top: 90px;
          max-height: calc(100vh - 110px);
          overflow-y: auto;
        }
        .prd-side h2 {
          font-size: 18px;
          font-weight: 800;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .prd-clear {
          font-size: 12px;
          font-weight: 700;
          color: var(--brand-2);
          background: none;
          border: 0;
          cursor: pointer;
        }
        .prd-clear:hover {
          text-decoration: underline;
        }
        .prd-group {
          border-top: 1px solid var(--line);
          padding: 14px 0;
        }
        .prd-group:first-of-type {
          border-top: 0;
        }
        .prd-gh {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: none;
          border: 0;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: var(--brand);
          padding: 2px 0;
          cursor: pointer;
        }
        .prd-gh svg {
          transition: transform .25s ease;
        }
        .prd-group.closed .prd-gh svg {
          transform: rotate(-90deg);
        }
        .prd-gb {
          display: grid;
          gap: 2px;
          margin-top: 10px;
        }
        .prd-group.closed .prd-gb {
          display: none;
        }
        .prd-sub {
          font-size: 12px;
          font-weight: 700;
          color: var(--muted);
          margin: 10px 0 2px;
          text-transform: uppercase;
          letter-spacing: .05em;
        }
        .prd-opt {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 8px;
          border-radius: 10px;
          font-size: 14px;
          cursor: pointer;
          transition: background .15s;
          color: #2a3a4a;
          user-select: none;
        }
        .prd-opt:hover {
          background: var(--brand-soft);
        }
        .prd-opt input {
          appearance: none;
          width: 18px;
          height: 18px;
          border: 1.8px solid #b9c7d3;
          border-radius: 6px;
          display: grid;
          place-items: center;
          transition: .15s;
          flex: none;
          cursor: pointer;
        }
        .prd-opt input:checked {
          background: var(--brand);
          border-color: var(--brand);
        }
        .prd-opt input:checked::after {
          content: "";
          width: 9px;
          height: 5px;
          border: 2px solid #fff;
          border-top: 0;
          border-right: 0;
          transform: rotate(-45deg) translate(1px, -1px);
        }
        .prd-opt .prd-n {
          margin-left: auto;
          font-size: 12px;
          color: var(--muted);
        }

        /* MAIN */
        .prd-top {
          display: flex;
          gap: 12px;
          padding: 12px;
          margin-bottom: 18px;
          align-items: center;
        }
        .prd-search {
          flex: 1;
          position: relative;
        }
        .prd-search svg {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          pointer-events: none;
          width: 20px;
          height: 20px;
        }
        .prd-search input {
          width: 100%;
          height: 54px;
          border: 1.5px solid var(--line);
          border-radius: 14px;
          padding: 0 18px 0 52px;
          font: inherit;
          font-size: 16px;
          background: var(--bg);
          outline: 0;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }
        .prd-search input:focus {
          border-color: var(--brand-2);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(42, 134, 184, .14);
        }
        .prd-fbtn {
          display: none;
          height: 50px;
          padding: 0 22px;
          border-radius: 9999px;
          border: 1.5px solid #094E9B;
          background: #ffffff;
          font-weight: 700;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          cursor: pointer;
          color: #094E9B;
          transition: all 0.2s ease;
        }
        .prd-fbtn:hover {
          background: #094E9B;
          color: #ffffff;
        }
        .prd-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 4px 14px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .prd-meta h3 {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -.01em;
        }
        .prd-count {
          color: var(--muted);
          font-size: 14px;
        }
        .prd-chips {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .prd-chip {
          display: inline-flex;
          gap: 6px;
          align-items: center;
          background: var(--brand-soft);
          color: var(--brand);
          font-size: 12.5px;
          font-weight: 700;
          padding: 6px 8px 6px 12px;
          border-radius: 999px;
          border: 0;
          cursor: pointer;
          transition: background .15s;
        }
        .prd-chip:hover {
          background: #d9eaf5;
        }
        .prd-chip i {
          font-style: normal;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          display: grid;
          place-items: center;
          font-size: 13px;
          line-height: 1;
        }

        /* GRID */
        .prd-grid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 20px;
        }
        @media (min-width: 540px) {
          .prd-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 900px) {
          .prd-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (min-width: 1200px) {
          .prd-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        .prd-card {
          position: relative;
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          overflow: hidden;
          isolation: isolate;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          transition: transform .35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow .35s ease, border-color .35s ease;
          animation: prd-in .4s both;
          cursor: pointer;
        }
        .prd-card::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 250%;
          height: 250%;
          background: radial-gradient(circle at bottom left, 
            rgba(2, 132, 199, 0.3) 0%, 
            rgba(6, 182, 212, 0.22) 40%, 
            rgba(56, 189, 248, 0.14) 68%, 
            transparent 100%);
          transform: translate(-100%, 100%);
          border-radius: 0 95% 0 0;
          transition: transform 1.4s cubic-bezier(0.25, 0.1, 0.25, 1), border-radius 1.2s ease;
          z-index: 0;
          pointer-events: none;
        }
        .prd-card:hover::before {
          transform: translate(0, 0);
          border-radius: 0;
          transition: transform 2.4s cubic-bezier(0.25, 0.1, 0.25, 1), border-radius 2.2s ease;
        }
        .prd-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 22px 50px -12px rgba(6, 182, 212, 0.26);
          border-color: rgba(6, 182, 212, 0.68);
        }
        .prd-card > * {
          position: relative;
          z-index: 1;
        }
        @keyframes prd-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .prd-thumb {
          position: relative;
          aspect-ratio: 1/.9;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 10px;
          border-radius: 12px;
          background: radial-gradient(circle at 50% 35%, #fff, #e6edf3 75%);
          overflow: hidden;
        }
        .prd-thumb svg {
          width: 46%;
          height: auto;
          filter: drop-shadow(0 14px 14px rgba(15,30,46,.18));
          transition: transform .35s ease;
        }
        .prd-card:hover .prd-thumb svg {
          transform: scale(1.08) rotate(-3deg);
        }
        .prd-tag {
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .04em;
          text-transform: uppercase;
          background: #fff;
          color: var(--brand);
          padding: 5px 10px;
          border-radius: 999px;
          box-shadow: 0 2px 6px rgba(15,30,46,.08);
          z-index: 2;
        }
        .prd-body {
          padding: 8px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }
        .prd-body h4 {
          font-size: 18.5px;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.3;
        }
        .prd-body p {
          font-size: 14.5px;
          color: var(--muted);
          flex: 1;
          line-height: 1.48;
        }
        .prd-foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
          padding-top: 14px;
          border-top: 1px dashed var(--line);
        }
        .prd-fac {
          font-size: 13px;
          color: var(--muted);
          font-weight: 600;
        }
        .prd-more {
          font-size: 14px;
          font-weight: 700;
          color: var(--brand);
          display: inline-flex;
          gap: 6px;
          align-items: center;
          transition: gap .2s ease, color .2s ease;
          background: none;
          border: 0;
          cursor: pointer;
        }
        .prd-card:hover .prd-more {
          gap: 10px;
          color: var(--brand-2);
        }
        .prd-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: var(--muted);
        }
        .prd-empty b {
          display: block;
          color: var(--ink);
          font-size: 18px;
          margin-bottom: 6px;
        }

        /* DRAWER / RESPONSIVE */
        .prd-scrim {
          display: none;
        }
        @media (max-width: 960px) {
          .prd-wrap {
            grid-template-columns: 1fr;
          }
          .prd-fbtn {
            display: block;
          }
          .prd-side {
            position: fixed;
            inset: 0 auto 0 0;
            width: min(320px, 88vw);
            max-height: none;
            border-radius: 0 var(--radius) var(--radius) 0;
            z-index: 80;
            transform: translateX(-105%);
            transition: transform .3s ease;
            box-shadow: 0 10px 40px rgba(0,0,0,0.25);
          }
          .prd-side.open {
            transform: none;
          }
          .prd-scrim.open {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(10, 20, 30, .45);
            backdrop-filter: blur(4px);
            z-index: 70;
          }
          .prd-hero {
            padding-top: 140px;
          }
        }
      `}</style>

      {/* Floating Glass Navbar */}
      <Navbar />

      {/* ============================================================ */}
      {/* 1. HERO SECTION: FULL-HEIGHT ARCHITECTURE (100VH)             */}
      {/* ============================================================ */}
      <section
        id="hero"
        className="relative w-full min-h-[540px] sm:min-h-[640px] lg:h-screen lg:min-h-[800px] bg-[#0a1f33] overflow-hidden flex flex-col justify-between items-center select-none"
      >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80"
            alt="Products Catalogue - Noor Plastic Industries"
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
            <Layers className="w-4 h-4 text-[#38bdf8] animate-pulse" />
            <span>Find Our Product &bull; High-Precision Packaging Solutions</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-[0.2em] sm:tracking-[0.25em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] uppercase pl-[0.2em]">
            Products
          </h1>

          <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.28em] font-bold text-[#38bdf8] drop-shadow-lg pl-[0.28em] max-w-3xl mx-auto">
            Plastic &bull; Metal Packaging &bull; 2 Mega Plants &bull; 9 Specialized Categories
          </p>
        </div>

        {/* Animated Scroll Down Indicator */}
        <button
          type="button"
          onClick={() => smoothScrollToElement("product-content")}
          className="relative z-10 pb-8 sm:pb-12 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="text-[11px] uppercase tracking-widest font-semibold group-hover:tracking-[0.25em] transition-all">
            Explore Product Catalogue &amp; Filters
          </span>
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5 backdrop-blur-sm group-hover:border-[#38bdf8] transition-colors">
            <div className="w-1.5 h-3 rounded-full bg-[#38bdf8] animate-bounce" />
          </div>
        </button>
      </section>

      {/* ============================================================ */}
      {/* 2. MAIN TWO-COLUMN CONTENT: Smooth Rise Over Hero             */}
      {/* ============================================================ */}
      <div
        id="product-content"
        className="relative bg-[#f5f8fb] pt-12 sm:pt-16 pb-16"
      >
        <main className="prd-wrap">
          {/* SIDEBAR FILTER PANEL */}
          <aside className={`prd-panel prd-side ${isDrawerOpen ? "open" : ""}`} id="side">
            <h2>
              <span>Filters</span>
              {(selectedFac.length > 0 || selectedCat.length > 0 || query) && (
                <button className="prd-clear" onClick={clearAll}>
                  Clear all
                </button>
              )}
            </h2>

            {/* Group 1: Factory */}
            <div className={`prd-group ${factoryOpen ? "" : "closed"}`}>
              <button
                className="prd-gh"
                onClick={() => setFactoryOpen((prev) => !prev)}
              >
                <span>Factory</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className="prd-gb">
                {factories.map((fac) => (
                  <label key={fac} className="prd-opt">
                    <input
                      type="checkbox"
                      checked={selectedFac.includes(fac)}
                      onChange={() => toggleFac(fac)}
                    />
                    <span>{fac}</span>
                    <span className="prd-n">{counts.facCounts[fac] || 0}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Group 2: Genre / Section */}
            <div className={`prd-group ${genreOpen ? "" : "closed"}`}>
              <button
                className="prd-gh"
                onClick={() => setGenreOpen((prev) => !prev)}
              >
                <span>Genre / Section</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className="prd-gb">
                {plasticCats.length > 0 && (
                  <>
                    <div className="prd-sub">Plastic</div>
                    {plasticCats.map((cat) => (
                      <label key={`plastic-${cat}`} className="prd-opt">
                        <input
                          type="checkbox"
                          checked={selectedCat.includes(cat)}
                          onChange={() => toggleCat(cat)}
                        />
                        <span>{cat}</span>
                        <span className="prd-n">{counts.catCounts[cat] || 0}</span>
                      </label>
                    ))}
                  </>
                )}

                {metalCats.length > 0 && (
                  <>
                    <div className="prd-sub">Metal</div>
                    {metalCats.map((cat) => (
                      <label key={`metal-${cat}`} className="prd-opt">
                        <input
                          type="checkbox"
                          checked={selectedCat.includes(cat)}
                          onChange={() => toggleCat(cat)}
                        />
                        <span>{cat}</span>
                        <span className="prd-n">{counts.catCounts[cat] || 0}</span>
                      </label>
                    ))}
                  </>
                )}
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT COLUMN */}
          <section>
            {/* Top Search & Filter Bar */}
            <div className="prd-panel prd-top">
              <button
                className="prd-fbtn"
                onClick={() => setIsDrawerOpen(true)}
              >
                ☰ Filters
              </button>
              <label className="prd-search">
                <Search className="w-4.5 h-4.5" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for product…"
                  autoComplete="off"
                />
              </label>
            </div>

            {/* Meta & Active Chips Strip */}
            <div className="prd-meta">
              <div>
                <h3>All products</h3>
                <span className="prd-count">
                  {filteredProducts.length} product
                  {filteredProducts.length === 1 ? "" : "s"} found
                </span>
              </div>
              {activeChips.length > 0 && (
                <div className="prd-chips">
                  {activeChips.map((chip) => (
                    <button
                      key={chip}
                      className="prd-chip"
                      onClick={() => removeChip(chip)}
                    >
                      <span>{chip}</span>
                      <i>×</i>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Cards Grid */}
            <div className="prd-grid">
              {loading ? (
                <ProductsCatalogSkeletonItems count={6} />
              ) : loadError ? (
                <PublicStateMessage
                  variant="error"
                  title="Unable to load product catalog"
                  description={loadError}
                  onRetry={() => setReloadKey((k) => k + 1)}
                  className="col-span-full"
                />
              ) : productsList.length === 0 ? (
                <PublicStateMessage
                  variant="empty"
                  title="No products published yet"
                  description="Industrial packaging products added via the Admin Panel will appear here."
                  className="col-span-full"
                />
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((p, idx) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug || p.id}`}
                    className="prd-card group"
                    style={{ animationDelay: `${idx * 40}ms` }}
                  >
                    <div className="prd-thumb">
                      <span className="prd-tag">{p.c}</span>
                      {renderThumbIcon(p)}
                    </div>
                    <div className="prd-body">
                      <h4>{p.n}</h4>
                      <p>{p.d}</p>
                      <div className="prd-foot">
                        <span className="prd-fac">{p.f}</span>
                        <span className="prd-more">
                          <span>Details</span>
                          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="prd-empty">
                  <b>No products match</b>
                  <p>Try removing a filter or searching a different term.</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* Scrim Overlay for Mobile Drawer */}
      <div
        className={`prd-scrim ${isDrawerOpen ? "open" : ""}`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
