"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sliders,
  Save,
  ExternalLink,
  Play,
  CheckCircle,
  Eye,
} from "lucide-react";
import { HERO_SLIDES } from "@/data/companyData";

export default function AdminSliderPage() {
  const [slides, setSlides] = useState(HERO_SLIDES);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleUpdate = (field: string, val: string) => {
    setSlides((prev) =>
      prev.map((s, idx) => (idx === activeSlideIdx ? { ...s, [field]: val } : s))
    );
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const current = slides[activeSlideIdx];

  return (
    <div className="space-y-8 max-w-[1638px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Sliders className="w-6 h-6 text-cyan-400" />
            Homepage Hero Carousel Management
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Configure dynamic headlines, industrial photography, and walkthrough video URLs for public storefront slides.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            Live Hero
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </Link>
          <button
            onClick={handleSave}
            className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-600/30 transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800/80 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>Carousel slide configuration updated and published successfully!</span>
        </div>
      )}

      {/* Slide Selector Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setActiveSlideIdx(idx)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSlideIdx === idx
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            Slide 0{idx + 1}: {s.badge}
          </button>
        ))}
      </div>

      {/* Slide Editor Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Form Controls */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 text-xs">
          <div>
            <label className="text-slate-300 font-bold block mb-1">Industrial Badge Label</label>
            <input
              type="text"
              value={current.badge}
              onChange={(e) => handleUpdate("badge", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-bold block mb-1">Headline Static Prefix</label>
              <input
                type="text"
                value={current.headlinePrefix}
                onChange={(e) => handleUpdate("headlinePrefix", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 font-bold"
              />
            </div>
            <div>
              <label className="text-slate-300 font-bold block mb-1">Dynamic Accent Headline</label>
              <input
                type="text"
                value={current.headlineDynamic}
                onChange={(e) => handleUpdate("headlineDynamic", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 focus:outline-none focus:border-blue-500 font-black"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-bold block mb-1">Subheading Description</label>
            <textarea
              rows={4}
              value={current.subheading}
              onChange={(e) => handleUpdate("subheading", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500 leading-relaxed font-normal"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-bold block mb-1">Primary CTA Button</label>
              <input
                type="text"
                value={current.ctaPrimary}
                onChange={(e) => handleUpdate("ctaPrimary", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-slate-300 font-bold block mb-1">Secondary CTA Button</label>
              <input
                type="text"
                value={current.ctaSecondary}
                onChange={(e) => handleUpdate("ctaSecondary", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-bold block mb-1">Video Walkthrough URL (YouTube)</label>
            <input
              type="text"
              value={current.videoUrl}
              onChange={(e) => handleUpdate("videoUrl", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 font-mono focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Right: Real-time Live Preview */}
        <div className="space-y-3">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
            Storefront Slide Mockup
          </span>

          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl p-6 flex flex-col justify-end">
            <Image
              src={current.image}
              alt={current.badge}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/30" />

            <div className="relative z-10 space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold text-white border border-white/20">
                {current.badge}
              </span>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                {current.headlinePrefix} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {current.headlineDynamic}
                </span>
              </h2>

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {current.subheading}
              </p>

              <div className="flex items-center gap-2 pt-2">
                <span className="px-4 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs shadow-md">
                  {current.ctaPrimary}
                </span>
                <span className="px-4 py-1.5 rounded-lg bg-white/10 text-white font-semibold text-xs border border-white/20">
                  {current.ctaSecondary}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

