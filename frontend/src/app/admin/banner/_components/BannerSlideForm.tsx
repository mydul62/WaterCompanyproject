"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  ImageIcon,
  Upload,
  Play,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { api } from "@/lib/api";
import {
  HeroSlide,
  HeroVisualLayout,
  DEFAULT_HERO_BANNERS,
  HERO_PRESET_IMAGES,
  normalizeHeroSlide,
  resolveBannerMediaUrl,
  getLocalBanners,
  saveLocalBanners,
  clearLocalBanners,
  emitBannersUpdated,
} from "@/data/heroBanners";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import {
  AdminFormHeader,
  AdminEditLoadingState,
  AdminEditNotFoundState,
  AdminToast,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";

interface BannerFormState {
  line1: string;
  line2: string;
  line3: string;
  description: string;
  readMoreLabel: string;
  readMoreHref: string;
  watchVideoLabel: string;
  watchVideoSub: string;
  videoUrl: string;
  showOfferBadge: boolean;
  offerEyebrow1: string;
  offerEyebrow2: string;
  offerPrice: string;
  offerUnit: string;
  visualLayout: HeroVisualLayout;
  foregroundImage: string;
  secondaryImage: string;
  platformImage: string;
  backgroundImage: string;
  isActive: boolean;
}

const EMPTY_FORM: BannerFormState = {
  line1: "",
  line2: "",
  line3: "",
  description: "",
  readMoreLabel: "READ MORE",
  readMoreHref: "/products",
  watchVideoLabel: "WATCH VIDEO",
  watchVideoSub: "Production to Delivery",
  videoUrl: "",
  showOfferBadge: true,
  offerEyebrow1: "Limited",
  offerEyebrow2: "Time Offer",
  offerPrice: "$15.50",
  offerUnit: "Per bottle",
  visualLayout: "custom",
  foregroundImage: "/images/hero/bottles-trio.png",
  secondaryImage: "/images/hero/bottle-horizontal.png",
  platformImage: "/images/hero/hero-splash-platform.jpg",
  backgroundImage: "/images/hero/hero-bubbles-bg.jpg",
  isActive: true,
};

const CREATE_INITIAL_FORM: BannerFormState = {
  ...EMPTY_FORM,
  line1: "Pure Quality",
  line2: "Plastic & Water",
  line3: "Solutions.",
  description:
    "Certified hygienic bottles, jugs, and direct factory supply across Bangladesh.",
};

function slideToForm(slide: HeroSlide): BannerFormState {
  return {
    line1: slide.lines[0] || "",
    line2: slide.lines[1] || "",
    line3: slide.lines[2] || "",
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
}

function fileToCompressedDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read file."));
    reader.onload = () => {
      const img = new window.Image();
      img.onerror = () => reject(new Error("Invalid image format."));
      img.onload = () => {
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          const ratio = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(String(reader.result));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const keepPng = file.type === "image/png" || file.type === "image/webp";
        resolve(canvas.toDataURL(keepPng ? "image/png" : "image/jpeg", 0.86));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export default function BannerSlideForm({
  mode,
  bannerId,
}: {
  mode: "create" | "edit";
  bannerId?: string;
}) {
  const router = useRouter();
  const [slides, setSlides] = useState<HeroSlide[]>(DEFAULT_HERO_BANNERS);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [form, setForm] = useState<BannerFormState>(
    mode === "create" ? CREATE_INITIAL_FORM : EMPTY_FORM
  );
  const [storageMode, setStorageMode] = useState<"database" | "fallback">("database");
  const [loading, setLoading] = useState(mode === "edit");
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);

  const [mediaTargetField, setMediaTargetField] = useState<
    keyof BannerFormState | null
  >(null);
  const [uploadingField, setUploadingField] = useState<
    keyof BannerFormState | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadTargetRef = useRef<keyof BannerFormState>("foregroundImage");

  const { toast, showToast, clearToast } = useAdminToast();

  useEffect(() => {
    let active = true;

    async function load() {
      if (mode === "edit") {
        setLoading(true);
        setNotFound(false);
      }

      try {
        const res = await api.banners.getAll();
        if (!active) return;
        if (Array.isArray(res?.data)) {
          const normalized = res.data.map((row, idx) =>
            normalizeHeroSlide(row, idx)
          );
          setSlides(normalized);
          setStorageMode("database");
          clearLocalBanners();

          if (mode === "edit" && bannerId) {
            let match = normalized.find((s) => s.id === bannerId) || null;
            if (!match) {
              try {
                const single = await api.banners.getById(bannerId);
                if (single?.data) {
                  match = normalizeHeroSlide(single.data, normalized.length);
                }
              } catch {
                // Handled by notFound state below
              }
            }
            if (!active) return;
            if (match) {
              setEditingSlide(match);
              setForm(slideToForm(match));
            } else {
              setNotFound(true);
            }
          }
          setLoading(false);
          return;
        }
      } catch {
        // Fallback to browser local storage when backend API is unavailable
      }

      if (!active) return;
      const local = getLocalBanners();
      const fallbackSlides = local ?? DEFAULT_HERO_BANNERS;
      if (!local) {
        saveLocalBanners(DEFAULT_HERO_BANNERS);
      }
      setSlides(fallbackSlides);
      setStorageMode("fallback");

      if (mode === "edit" && bannerId) {
        const match = fallbackSlides.find((s) => s.id === bannerId) || null;
        if (match) {
          setEditingSlide(match);
          setForm(slideToForm(match));
        } else {
          setNotFound(true);
        }
      }
      setLoading(false);
    }

    load();
    return () => {
      active = false;
    };
  }, [mode, bannerId]);

  const handleSaveSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.line1.trim()) {
      showToast("Headline Line 1 is required.", "error");
      return;
    }

    setSaving(true);
    const payload = {
      line1: form.line1.trim(),
      line2: form.line2.trim(),
      line3: form.line3.trim(),
      lines: [form.line1.trim(), form.line2.trim(), form.line3.trim()],
      description: form.description.trim(),
      readMoreLabel: form.readMoreLabel.trim() || "READ MORE",
      readMoreHref: form.readMoreHref.trim() || "/products",
      watchVideoLabel: form.watchVideoLabel.trim() || "WATCH VIDEO",
      watchVideoSub: form.watchVideoSub.trim() || "Production to Delivery",
      videoUrl: form.videoUrl.trim(),
      showOfferBadge: form.showOfferBadge,
      offerEyebrow1: form.offerEyebrow1.trim(),
      offerEyebrow2: form.offerEyebrow2.trim(),
      offerPrice: form.offerPrice.trim(),
      offerUnit: form.offerUnit.trim(),
      visualLayout: form.visualLayout,
      foregroundImage:
        form.foregroundImage.trim() || "/images/hero/bottle-vertical.png",
      secondaryImage:
        form.secondaryImage.trim() || "/images/hero/bottle-horizontal.png",
      platformImage:
        form.platformImage.trim() || "/images/hero/hero-splash-platform.jpg",
      backgroundImage:
        form.backgroundImage.trim() || "/images/hero/hero-bubbles-bg.jpg",
      isActive: form.isActive,
    };

    try {
      if (mode === "edit" && bannerId) {
        try {
          await api.banners.update(bannerId, payload);
          emitBannersUpdated();
        } catch {
          const baseSlides = getLocalBanners() ?? slides;
          const updated = baseSlides.map((s, idx) =>
            s.id === bannerId ? normalizeHeroSlide({ ...s, ...payload }, idx) : s
          );
          saveLocalBanners(updated);
        }
      } else {
        try {
          await api.banners.create(payload);
          emitBannersUpdated();
        } catch {
          const baseSlides = getLocalBanners() ?? slides;
          const created = normalizeHeroSlide(
            {
              ...payload,
              id: `slide-${Date.now()}`,
              sortOrder: baseSlides.length + 1,
            },
            baseSlides.length
          );
          saveLocalBanners([...baseSlides, created]);
        }
      }
      router.push("/admin/banner");
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  const handleTriggerFileUpload = (field: keyof BannerFormState) => {
    uploadTargetRef.current = field;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const field = uploadTargetRef.current;
    setUploadingField(field);
    try {
      const res = await api.media.upload(file, {
        altText: form.line1 || "Hero Banner Image",
        category: "HERO",
      });
      if (res?.data?.url) {
        setForm((prev) => ({ ...prev, [field]: res.data.url }));
        showToast("Uploaded image to server Media Library!");
        return;
      }
    } catch {
      try {
        const dataUrl = await fileToCompressedDataUrl(file);
        setForm((prev) => ({ ...prev, [field]: dataUrl }));
        showToast("Image attached from computer.");
      } catch (err: any) {
        showToast(err?.message || "Failed to load image.", "error");
      }
    } finally {
      setUploadingField(null);
    }
  };

  return (
    <div className="w-full space-y-6 pb-10">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <AdminFormHeader
        backHref="/admin/banner"
        backLabel="Back to Banner Slider"
        icon={<Sparkles className="w-6 h-6 text-cyan-400" />}
        title={
          mode === "edit"
            ? `Edit Banner Slide${editingSlide?.num ? ` (${editingSlide.num})` : ""}`
            : "Create New Hero Banner Slide"
        }
        subtitle="Configure headline, CTA link, circular offer badge, visual layout, and inspect the live desktop composition."
        storageMode={storageMode}
      />

      {loading ? (
        <AdminEditLoadingState label="Loading banner slide..." />
      ) : notFound ? (
        <AdminEditNotFoundState
          title="Banner Slide Not Found"
          description="This hero banner slide could not be found or may have been deleted."
          backHref="/admin/banner"
          backLabel="Back to Banner Slider"
        />
      ) : (
        <form
          onSubmit={handleSaveSlide}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs"
        >
          {/* Left Form Fields */}
          <div className="lg:col-span-7 space-y-5">
            {/* Headline & Description */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400">
                  1. Headline &amp; Description
                </h3>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) =>
                      setForm({ ...form, isActive: e.target.checked })
                    }
                    className="rounded border-slate-700 bg-slate-950 text-blue-600"
                  />
                  <span className="text-xs font-bold text-slate-200">
                    Active on Homepage
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Headline Line 1 *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.line1}
                    onChange={(e) =>
                      setForm({ ...form, line1: e.target.value })
                    }
                    placeholder="e.g. Delivered Right"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Headline Line 2
                  </label>
                  <input
                    type="text"
                    value={form.line2}
                    onChange={(e) =>
                      setForm({ ...form, line2: e.target.value })
                    }
                    placeholder="e.g. To Your Home &"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Headline Line 3
                  </label>
                  <input
                    type="text"
                    value={form.line3}
                    onChange={(e) =>
                      setForm({ ...form, line3: e.target.value })
                    }
                    placeholder="e.g. Office Door."
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Supporting Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Short value proposition displayed below the headline..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>
            </div>

            {/* CTA & Video */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400">
                2. CTA Link &amp; Video Button
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={form.readMoreLabel}
                    onChange={(e) =>
                      setForm({ ...form, readMoreLabel: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Destination URL
                  </label>
                  <input
                    type="text"
                    value={form.readMoreHref}
                    onChange={(e) =>
                      setForm({ ...form, readMoreHref: e.target.value })
                    }
                    placeholder="/products"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "/products",
                  "/our-business",
                  "/certificates",
                  "/request-quote",
                  "/our-story",
                ].map((route) => (
                  <button
                    key={route}
                    type="button"
                    onClick={() => setForm({ ...form, readMoreHref: route })}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-mono border cursor-pointer ${
                      form.readMoreHref === route
                        ? "bg-blue-600 text-white border-blue-500"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    }`}
                  >
                    {route}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Video Button Title
                  </label>
                  <input
                    type="text"
                    value={form.watchVideoLabel}
                    onChange={(e) =>
                      setForm({ ...form, watchVideoLabel: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Video Subtitle
                  </label>
                  <input
                    type="text"
                    value={form.watchVideoSub}
                    onChange={(e) =>
                      setForm({ ...form, watchVideoSub: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    YouTube / MP4 URL
                  </label>
                  <input
                    type="text"
                    value={form.videoUrl}
                    onChange={(e) =>
                      setForm({ ...form, videoUrl: e.target.value })
                    }
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Offer Badge */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400">
                  3. Circular Offer Badge
                </h3>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.showOfferBadge}
                    onChange={(e) =>
                      setForm({ ...form, showOfferBadge: e.target.checked })
                    }
                    className="rounded border-slate-700 bg-slate-950 text-blue-600"
                  />
                  <span className="text-xs font-bold text-slate-200">
                    Show Offer Badge
                  </span>
                </label>
              </div>

              {form.showOfferBadge && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">
                      Top Line 1
                    </label>
                    <input
                      type="text"
                      value={form.offerEyebrow1}
                      onChange={(e) =>
                        setForm({ ...form, offerEyebrow1: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">
                      Top Line 2
                    </label>
                    <input
                      type="text"
                      value={form.offerEyebrow2}
                      onChange={(e) =>
                        setForm({ ...form, offerEyebrow2: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">
                      Price Highlight
                    </label>
                    <input
                      type="text"
                      value={form.offerPrice}
                      onChange={(e) =>
                        setForm({ ...form, offerPrice: e.target.value })
                      }
                      placeholder="$15.50"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 font-black focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">
                      Unit Label
                    </label>
                    <input
                      type="text"
                      value={form.offerUnit}
                      onChange={(e) =>
                        setForm({ ...form, offerUnit: e.target.value })
                      }
                      placeholder="Per bottle"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Visual Layout & Images */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400">
                4. Visual Layout &amp; Banner Images
              </h3>

              <div className="grid grid-cols-3 gap-2.5">
                {(
                  [
                    { id: "duo", title: "2-Bottle Duo", sub: "Standing + Lying" },
                    { id: "trio", title: "3-Bottle Trio", sub: "Centered Pack" },
                    { id: "custom", title: "Custom Image", sub: "Single Visual" },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        visualLayout: item.id,
                        foregroundImage:
                          item.id === "trio" &&
                          prev.foregroundImage === "/images/hero/bottle-vertical.png"
                            ? "/images/hero/bottles-trio.png"
                            : item.id === "duo" &&
                              prev.foregroundImage === "/images/hero/bottles-trio.png"
                            ? "/images/hero/bottle-vertical.png"
                            : prev.foregroundImage,
                      }))
                    }
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      form.visualLayout === item.id
                        ? "bg-blue-600/20 border-blue-500 text-white"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className="font-black block text-xs">{item.title}</span>
                    <span className="text-[10px] opacity-75">{item.sub}</span>
                  </button>
                ))}
              </div>

              {/* Main Foreground Image */}
              <div className="space-y-2">
                <label className="block text-slate-300 font-bold">
                  Primary Bottle / Banner Image URL
                </label>
                <div className="flex flex-wrap gap-2">
                  <input
                    type="text"
                    value={form.foregroundImage}
                    onChange={(e) =>
                      setForm({ ...form, foregroundImage: e.target.value })
                    }
                    className="flex-1 min-w-[200px] px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleTriggerFileUpload("foregroundImage")}
                    className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-cyan-400" />
                    {uploadingField === "foregroundImage" ? "Uploading..." : "Upload"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaTargetField("foregroundImage")}
                    className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                    Library
                  </button>
                </div>

                {/* Quick Presets */}
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-1">
                  {HERO_PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          foregroundImage: preset.url,
                        })
                      }
                      title={preset.label}
                      className={`aspect-square rounded-lg border overflow-hidden p-1 bg-slate-950 cursor-pointer transition-all ${
                        form.foregroundImage === preset.url
                          ? "border-cyan-400 ring-2 ring-cyan-400/30"
                          : "border-slate-800 hover:border-slate-600"
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {form.visualLayout === "duo" && (
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Secondary Horizontal Bottle Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.secondaryImage}
                      onChange={(e) =>
                        setForm({ ...form, secondaryImage: e.target.value })
                      }
                      className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setMediaTargetField("secondaryImage")}
                      className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                      Library
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">
                    Splash Platform Image URL
                  </label>
                  <input
                    type="text"
                    value={form.platformImage}
                    onChange={(e) =>
                      setForm({ ...form, platformImage: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">
                    Background Bubbles Image URL
                  </label>
                  <input
                    type="text"
                    value={form.backgroundImage}
                    onChange={(e) =>
                      setForm({ ...form, backgroundImage: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Scaled Hero Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="sticky top-6 space-y-4 bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" /> Live Banner Preview
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  Desktop Composition
                </span>
              </div>

              <div className="relative h-80 rounded-2xl overflow-hidden bg-[#064B9D] border border-white/15 shadow-2xl">
                <img
                  src={resolveBannerMediaUrl(form.backgroundImage)}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#043F8E]/75 via-[#0752AC]/30 to-transparent" />

                {/* Left rail indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-7 bg-[#2163B5]/40 border-r border-white/10 flex flex-col items-center justify-center gap-2 text-[9px] font-bold text-white/80 z-20">
                  <span className="text-[#062346] font-black bg-white/70 px-1 rounded">
                    {editingSlide?.num || String(slides.length + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Text Preview */}
                <div className="relative z-20 pl-10 pr-4 pt-6 w-[62%] space-y-2">
                  <h4 className="font-hero-display text-white text-xl leading-[1.1]">
                    {[form.line1, form.line2, form.line3]
                      .filter(Boolean)
                      .map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                  </h4>
                  <p className="text-[10px] text-white/85 line-clamp-3 leading-relaxed">
                    {form.description}
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white bg-[#66C0EA]/30 px-2 py-1 rounded">
                      {form.readMoreLabel || "READ MORE"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-white">
                      <span className="w-5 h-5 rounded-full bg-white text-[#094E9B] flex items-center justify-center">
                        <Play className="w-2.5 h-2.5 fill-[#094E9B]" />
                      </span>
                      {form.watchVideoLabel || "WATCH VIDEO"}
                    </span>
                  </div>
                </div>

                {/* Right Showcase Preview */}
                <div className="absolute right-0 bottom-0 w-[48%] h-[58%] z-10">
                  <div className="absolute inset-0 rounded-tl-2xl overflow-hidden bg-[#CFE7FA]">
                    <img
                      src={resolveBannerMediaUrl(form.platformImage)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {form.visualLayout === "duo" ? (
                    <>
                      <img
                        src={resolveBannerMediaUrl(form.secondaryImage)}
                        alt=""
                        className="absolute right-1 bottom-2 w-[56%] h-auto object-contain z-10"
                      />
                      <img
                        src={resolveBannerMediaUrl(form.foregroundImage)}
                        alt=""
                        className="absolute left-[10%] bottom-1 h-[112%] w-auto object-contain z-20 drop-shadow-lg"
                      />
                    </>
                  ) : (
                    <div className="absolute inset-x-0 mx-auto bottom-1 h-[112%] w-[88%] z-20 flex items-end justify-center">
                      <img
                        src={resolveBannerMediaUrl(form.foregroundImage)}
                        alt=""
                        className="max-h-full max-w-full object-contain rounded-lg drop-shadow-lg"
                      />
                    </div>
                  )}

                  {form.showOfferBadge && (
                    <div
                      className={`absolute -top-5 z-30 w-16 h-16 rounded-full bg-gradient-to-br from-[#0657AF] to-[#013B82] border border-cyan-300/40 shadow-lg flex flex-col items-center justify-center text-white text-center px-1 ${
                        form.visualLayout === "duo" ? "left-[28%]" : "left-[54%]"
                      }`}
                    >
                      <span className="text-[7px] leading-tight text-cyan-100">
                        {form.offerEyebrow1}
                      </span>
                      <span className="text-[7px] leading-tight text-cyan-100">
                        {form.offerEyebrow2}
                      </span>
                      <span className="text-xs font-black leading-none my-0.5">
                        {form.offerPrice}
                      </span>
                      <span className="text-[7px] leading-none opacity-85">
                        {form.offerUnit}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <Link
                  href="/admin/banner"
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4" />
                  {saving
                    ? "Saving..."
                    : mode === "edit"
                    ? "Save Banner Changes"
                    : "Add Banner to Slider"}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaTargetField !== null}
        onClose={() => setMediaTargetField(null)}
        currentValue={
          mediaTargetField ? String(form[mediaTargetField] || "") : undefined
        }
        categoryFilter="HERO"
        onSelect={(asset) => {
          if (mediaTargetField) {
            setForm((prev) => ({ ...prev, [mediaTargetField]: asset.url }));
          }
          setMediaTargetField(null);
        }}
      />

      <AdminToast toast={toast} onClose={clearToast} />
    </div>
  );
}

