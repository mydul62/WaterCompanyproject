"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  Layers,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Building,
  Image as ImageIcon,
  Link2,
  Sparkles,
  MenuSquare,
  Globe,
  RefreshCw,
} from "lucide-react";
import { api } from "@/lib/api";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    products: 12,
    pages: 8,
    media: 24,
    links: 11,
    rfqs: 4,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOverview();
  }, []);

  const loadOverview = async () => {
    setLoading(true);
    try {
      const [prodRes, pageRes, mediaRes, linkRes] = await Promise.allSettled([
        api.products.getAll(),
        api.pages.getAll(),
        api.media.getAll(),
        api.links.getAll(),
      ]);

      setStats({
        products: prodRes.status === "fulfilled" && prodRes.value.data ? prodRes.value.data.length : 12,
        pages: pageRes.status === "fulfilled" && pageRes.value.data ? pageRes.value.data.length : 8,
        media: mediaRes.status === "fulfilled" && mediaRes.value.data ? mediaRes.value.data.length : 24,
        links: linkRes.status === "fulfilled" && linkRes.value.data ? linkRes.value.data.length : 11,
        rfqs: 4,
      });
    } catch (err) {
      console.warn("Using overview defaults:", err);
    } finally {
      setLoading(false);
    }
  };

  const CORE_PAGES = [
    { title: "Home Page", slug: "/", id: "page-home", status: "PUBLISHED", blocks: 6 },
    { title: "Our Story", slug: "/our-story", id: "page-story", status: "PUBLISHED", blocks: 5 },
    { title: "Our Business & Plants", slug: "/our-business", id: "page-business", status: "PUBLISHED", blocks: 4 },
    { title: "Product Catalog", slug: "/products", id: "page-products", status: "PUBLISHED", blocks: 4 },
    { title: "Certificates & Quality", slug: "/certificates", id: "page-certificates", status: "PUBLISHED", blocks: 4 },
    { title: "Careers Portal", slug: "/careers", id: "page-careers", status: "PUBLISHED", blocks: 4 },
    { title: "Brands We Work With", slug: "/brands-we-work-with", id: "page-brands", status: "PUBLISHED", blocks: 3 },
  ];

  return (
    <div className="space-y-8 w-full">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Executive Dashboard Overview</h1>
          <p className="text-slate-400 text-xs mt-1">
            Manufacturing telemetry, dynamic page CMS builder, and centralized content control suite.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/banner"
            className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/25 transition-all hover:scale-[1.02]"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Manage Hero Banner
          </Link>
          <Link
            href="/admin/pages"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Visual Page Builder
          </Link>
          <Link
            href="/admin/products"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 border border-slate-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Product
          </Link>
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            Public Site
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Statistic Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Dynamic Pages */}
        <Link
          href="/admin/pages"
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/60 transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Dynamic CMS Pages</span>
            <Layers className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{stats.pages}</div>
          <p className="text-[11px] text-cyan-400 font-semibold">Visual Page Builder</p>
        </Link>

        {/* Catalog Products */}
        <Link
          href="/admin/products"
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/60 transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Catalog Products</span>
            <Package className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{stats.products}</div>
          <p className="text-[11px] text-purple-400 font-semibold">Metal, Pails &amp; Bottles</p>
        </Link>

        {/* Media Assets */}
        <Link
          href="/admin/media-library"
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/60 transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Imaple Media Assets</span>
            <ImageIcon className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{stats.media}</div>
          <p className="text-[11px] text-emerald-400 font-semibold">Zero-Duplicate Library</p>
        </Link>

        {/* Centralized Links */}
        <Link
          href="/admin/links"
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/60 transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Universal Links</span>
            <Link2 className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{stats.links}</div>
          <p className="text-[11px] text-amber-400 font-semibold">Platform Link Registry</p>
        </Link>

        {/* Plant Certification */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Green Benchmark</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 font-mono">LEED Plat.</div>
          <p className="text-[11px] text-slate-400">Zero-Waste Certified</p>
        </div>
      </div>

      {/* Pages Publishing Status & Visual Editor Quick Launch */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              Website Pages &amp; Dedicated Visual Builders
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Every website page is independent and visual-builder ready. Click to open editor.
            </p>
          </div>
          <Link
            href="/admin/pages"
            className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            Manage All Pages
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {CORE_PAGES.map((page) => (
            <div
              key={page.id}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-white text-xs block">{page.title}</span>
                <span className="text-[11px] font-mono text-cyan-400">{page.slug}</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                    {page.status}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {page.blocks} blocks
                  </span>
                </div>
              </div>

              <Link
                href={`/admin/pages/${page.id}/builder`}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
              >
                <Sparkles className="w-3 h-3" />
                Builder
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
