"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Sliders,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Copy,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  RotateCcw,
  Database,
  HardDrive,
} from "lucide-react";
import { api } from "@/lib/api";
import { AdminErrorBanner } from "@/components/admin/AdminCrudShell";
import {
  HeroSlide,
  normalizeHeroSlide,
  resolveBannerMediaUrl,
  emitBannersUpdated,
} from "@/data/heroBanners";
import { AdminCardGridSkeleton } from "@/components/common/Skeletons";

export default function AdminBannerPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [storageMode, setStorageMode] = useState<"database" | "local">("database");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Delete / Reset Confirmation
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 3500);
  };

  const loadSlides = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await api.banners.getAll();
      const rows = Array.isArray(res?.data) ? res.data : [];
      const normalized = rows.map((row, idx) =>
        normalizeHeroSlide(row, idx)
      );
      setSlides(normalized);
      setStorageMode("database");
    } catch (err: any) {
      setSlides([]);
      setStorageMode("local");
      setLoadError(err?.message || "Unable to load hero banners from PostgreSQL.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSlides();
  }, [loadSlides]);

  const handleDuplicate = async (slide: HeroSlide) => {
    setSaving(true);
    const payload = {
      line1: `${slide.lines[0]} (Copy)`,
      line2: slide.lines[1] || "",
      line3: slide.lines[2] || "",
      lines: [
        `${slide.lines[0]} (Copy)`,
        slide.lines[1] || "",
        slide.lines[2] || "",
      ] as [string, string, string],
      description: slide.description || "",
      readMoreLabel: slide.readMoreLabel || "READ MORE",
      readMoreHref: slide.readMoreHref || "/products",
      watchVideoLabel: slide.watchVideoLabel || "WATCH VIDEO",
      watchVideoSub: slide.watchVideoSub || "Production to Delivery",
      videoUrl: slide.videoUrl || "",
      showOfferBadge: slide.showOfferBadge,
      offerEyebrow1: slide.offerEyebrow1 || "",
      offerEyebrow2: slide.offerEyebrow2 || "",
      offerPrice: slide.offerPrice || "",
      offerUnit: slide.offerUnit || "",
      visualLayout: slide.visualLayout,
      foregroundImage: slide.foregroundImage || "/images/hero/bottle-vertical.png",
      secondaryImage: slide.secondaryImage || "/images/hero/bottle-horizontal.png",
      platformImage: slide.platformImage || "/images/hero/hero-splash-platform.jpg",
      backgroundImage: slide.backgroundImage || "/images/hero/hero-bubbles-bg.jpg",
      isActive: slide.isActive,
    };
    try {
      await api.banners.create(payload);
      await loadSlides();
      emitBannersUpdated();
      showToast("Banner duplicated successfully.");
    } catch (err: any) {
      showToast(err?.message || "Could not duplicate banner in PostgreSQL.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    try {
      await api.banners.delete(id);
      await loadSlides();
      emitBannersUpdated();
      setConfirmDeleteId(null);
      showToast("Banner deleted.");
    } catch (err: any) {
      setConfirmDeleteId(null);
      showToast(err?.message || "Failed to delete banner from PostgreSQL.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (slide: HeroSlide) => {
    const nextActive = !slide.isActive;
    try {
      await api.banners.update(slide.id, { isActive: nextActive });
      await loadSlides();
      emitBannersUpdated();
      showToast(nextActive ? "Banner visible on homepage." : "Banner hidden from homepage.");
    } catch (err: any) {
      showToast(err?.message || "Could not update banner visibility.", "error");
    }
  };

  const handleMove = async (index: number, direction: -1 | 1) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= slides.length) return;

    const previous = slides;
    const reordered = [...slides];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIdx, 0, moved);
    const renumbered = reordered.map((s, i) => ({
      ...s,
      sortOrder: i + 1,
      num: String(i + 1).padStart(2, "0"),
    }));

    setSlides(renumbered);
    try {
      await api.banners.reorder(renumbered.map((s) => s.id));
      emitBannersUpdated();
      showToast("Banner order updated.");
    } catch (err: any) {
      setSlides(previous);
      showToast(err?.message || "Failed to reorder banners in PostgreSQL.", "error");
    }
  };

  const handleResetDefaults = async () => {
    setSaving(true);
    try {
      await api.banners.reset();
      await loadSlides();
      emitBannersUpdated();
      setConfirmReset(false);
      showToast("Restored default Noor Plastic banners in PostgreSQL.");
    } catch (err: any) {
      setConfirmReset(false);
      showToast(err?.message || "Failed to restore default banners.", "error");
    } finally {
      setSaving(false);
    }
  };

  const activeCount = slides.filter((s) => s.isActive).length;

  return (
    <div className="space-y-6 w-full">

      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-[110] px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold ${
            notification.type === "error"
              ? "bg-red-600 text-white"
              : "bg-blue-600 text-white"
          }`}
        >
          {notification.type === "error" ? (
            <AlertCircle className="w-4 h-4" />
          ) : (
            <CheckCircle className="w-4 h-4" />
          )}
          {notification.text}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-600/20 text-cyan-400 flex items-center justify-center border border-blue-500/30 shrink-0">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl font-black text-white tracking-tight">
                Homepage Banner Slider Manager
              </h1>
              <span
                className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  storageMode === "database"
                    ? "bg-emerald-950/60 text-emerald-300 border-emerald-700/50"
                    : "bg-red-950/60 text-red-300 border-red-700/50"
                }`}
              >
                {storageMode === "database" ? (
                  <>
                    <Database className="w-3 h-3" /> PostgreSQL Synced
                  </>
                ) : (
                  <>
                    <HardDrive className="w-3 h-3" /> Database Offline
                  </>
                )}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Add, edit, reorder, hide, or delete homepage hero banner slides with real-time storefront updates.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={loadSlides}
            className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>

          {confirmReset ? (
            <div className="flex items-center gap-1.5 bg-amber-950/70 border border-amber-700/60 rounded-xl px-2.5 py-1.5">
              <span className="text-[11px] font-bold text-amber-200">Restore 4 defaults?</span>
              <button
                type="button"
                onClick={handleResetDefaults}
                disabled={saving}
                className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-black cursor-pointer"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 text-[11px] font-bold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              Defaults
            </button>
          )}

          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5"
          >
            Live Hero
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </Link>

          <Link
            href="/admin/banner/new"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black flex items-center gap-2 shadow-lg shadow-blue-600/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Banner
          </Link>
        </div>
      </div>

      {/* Summary Stats */}
      <AdminErrorBanner error={loadError} onRetry={loadSlides} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">Total Banners</span>
            <span className="text-2xl font-black text-white font-mono">{slides.length}</span>
          </div>
          <Sliders className="w-6 h-6 text-blue-400/70" />
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">Active on Storefront</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">{activeCount}</span>
          </div>
          <Eye className="w-6 h-6 text-emerald-400/70" />
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">Hidden / Drafts</span>
            <span className="text-2xl font-black text-amber-400 font-mono">
              {slides.length - activeCount}
            </span>
          </div>
          <EyeOff className="w-6 h-6 text-amber-400/70" />
        </div>
      </div>

      {!loading && !loadError && activeCount === 0 && (
        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-700/50 text-amber-200 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            No active banners are enabled in PostgreSQL. Enable an existing slide or create a new slide to display the hero carousel on the homepage.
          </span>
        </div>
      )}

      {/* Banner Slides List */}
      <div className="space-y-4">
        {loading ? <AdminCardGridSkeleton count={4} columns={2} /> : slides.map((slide, idx) => {
          const isDeleting = confirmDeleteId === slide.id;
          return (
            <div
              key={slide.id}
              className={`rounded-2xl border p-4 sm:p-5 transition-all flex flex-col lg:flex-row lg:items-center gap-5 ${
                slide.isActive
                  ? "bg-slate-900 border-slate-800 hover:border-blue-500/40"
                  : "bg-slate-900/60 border-slate-800/70 opacity-75"
              }`}
            >
              {/* Visual Preview Thumbnail */}
              <div className="relative w-full lg:w-64 h-36 rounded-xl overflow-hidden bg-[#064B9D] border border-white/10 shrink-0">
                <img
                  src={resolveBannerMediaUrl(slide.backgroundImage)}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#043F8E]/80 via-[#0752AC]/35 to-transparent" />
                <div className="relative z-10 h-full p-3.5 flex items-center justify-between gap-2">
                  <div className="max-w-[58%] space-y-1">
                    <span className="inline-block text-[10px] font-black font-mono px-2 py-0.5 rounded bg-white/15 text-white">
                      #{slide.num || String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="text-xs font-bold text-white leading-tight line-clamp-2">
                      {slide.lines.filter(Boolean).join(" ")}
                    </div>
                  </div>
                  <div className="w-20 h-24 flex items-center justify-center shrink-0">
                    <img
                      src={resolveBannerMediaUrl(slide.foregroundImage)}
                      alt={slide.lines[0]}
                      className="max-h-full max-w-full object-contain drop-shadow-md"
                    />
                  </div>
                </div>
                {slide.showOfferBadge && (
                  <div className="absolute top-2 right-2 z-20 px-2 py-0.5 rounded-full bg-[#013B82] border border-cyan-300/40 text-white text-[10px] font-bold shadow">
                    {slide.offerPrice}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-0.5 rounded-md">
                    Slide {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      slide.isActive
                        ? "bg-emerald-950/60 text-emerald-300 border-emerald-700/50"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}
                  >
                    {slide.isActive ? "Visible" : "Hidden"}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    Layout: {slide.visualLayout}
                  </span>
                  {slide.showOfferBadge && (
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-950/60 text-blue-300 border border-blue-800/50">
                      Offer: {slide.offerPrice} ({slide.offerUnit})
                    </span>
                  )}
                </div>

                <h2 className="text-base sm:text-lg font-black text-white leading-snug">
                  {slide.lines.filter(Boolean).join(" / ")}
                </h2>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {slide.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-1">
                  <span>
                    CTA:{" "}
                    <strong className="text-slate-300">{slide.readMoreLabel}</strong>{" "}
                    &rarr; <code className="text-cyan-400">{slide.readMoreHref}</code>
                  </span>
                  {slide.videoUrl && (
                    <span>
                      Video: <code className="text-purple-300 truncate max-w-[220px] inline-block align-bottom">{slide.videoUrl}</code>
                    </span>
                  )}
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex flex-wrap lg:flex-col items-center lg:items-end justify-between gap-2 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, -1)}
                    title="Move Up"
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === slides.length - 1}
                    onClick={() => handleMove(idx, 1)}
                    title="Move Down"
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleActive(slide)}
                    title={slide.isActive ? "Hide Slide" : "Show Slide"}
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 cursor-pointer"
                  >
                    {slide.isActive ? (
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDuplicate(slide)}
                    title="Duplicate Slide"
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/banner/${slide.id}/edit`}
                    className="px-3.5 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Edit
                  </Link>

                  {isDeleting ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleDelete(slide.id)}
                        disabled={saving}
                        className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-black cursor-pointer"
                      >
                        Confirm Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="px-2.5 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(slide.id)}
                      className="px-3 py-2 rounded-lg bg-red-950/50 hover:bg-red-600 text-red-300 hover:text-white border border-red-800/50 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {slides.length === 0 && !loading && (
          <div className="p-12 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
            <Sliders className="w-10 h-10 text-slate-600 mx-auto" />
            <div>
              <h3 className="text-base font-black text-white">No Banner Slides Yet</h3>
              <p className="text-xs text-slate-400 mt-1">
                Create a new banner slide or restore the 4 starter slides.
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
              >
                Restore 4 Starter Slides
              </button>
              <Link
                href="/admin/banner/new"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Add First Banner
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

