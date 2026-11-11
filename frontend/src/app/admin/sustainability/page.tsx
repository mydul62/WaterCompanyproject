"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Leaf,
  Save,
  RefreshCw,
  RotateCcw,
  ExternalLink,
  Image as ImageIcon,
  Plus,
  Trash2,
  Sparkles,
  Layers,
  Award,
  CheckCircle2,
  Database,
  HardDrive,
} from "lucide-react";
import { api } from "@/lib/api";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import { AdminFormSkeleton } from "@/components/common/Skeletons";
import {
  AdminToast,
  useAdminToast,
  linesToArray,
  arrayToLines,
} from "@/components/admin/AdminCrudShell";
import {
  SustainabilityPageContent,
  SustainabilityHighlight,
  EnvironmentalPractice,
  SustainabilityPillar,
  SUSTAINABILITY_SETTING_KEY,
  SUSTAINABILITY_LOCAL_CACHE_KEY,
  SUSTAINABILITY_UPDATED_EVENT,
  cloneDefaultSustainabilityContent,
  parseSustainabilityContent,
} from "@/data/sustainabilityData";

type TabId = "hero" | "highlights" | "practices" | "pillars";

type MediaTarget =
  | { kind: "hero" }
  | { kind: "leafTexture" }
  | { kind: "highlightsBg" }
  | { kind: "foliageBanner" }
  | { kind: "practiceIcon"; index: number };

const INPUT_CLASS =
  "w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors";

const MONO_INPUT_CLASS =
  "flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400 focus:outline-none focus:border-emerald-500 transition-colors";

function MediaImageField({
  label,
  hint,
  value,
  onChange,
  onOpenPicker,
  previewClass = "w-20 h-14 object-cover rounded-lg border border-slate-700 bg-slate-950",
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (nextUrl: string) => void;
  onOpenPicker: () => void;
  previewClass?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <label className="text-slate-300 font-bold text-xs block">{label}</label>
        {hint && <span className="text-[11px] text-slate-500">{hint}</span>}
      </div>
      <div className="flex items-center gap-2.5">
        {value && (
          <img
            src={value}
            alt={label}
            className={previewClass}
          />
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={MONO_INPUT_CLASS}
          placeholder="/images/sustainability/..."
        />
        <button
          type="button"
          onClick={onOpenPicker}
          className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
        >
          <ImageIcon className="w-3.5 h-3.5" />
          Browse Imaple
        </button>
      </div>
    </div>
  );
}

export default function AdminSustainabilityPage() {
  const [content, setContent] = useState<SustainabilityPageContent>(() =>
    cloneDefaultSustainabilityContent()
  );
  const [activeTab, setActiveTab] = useState<TabId>("hero");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [storageMode, setStorageMode] = useState<"database" | "local">("database");
  const [mediaTarget, setMediaTarget] = useState<MediaTarget | null>(null);
  const { toast, showToast, clearToast } = useAdminToast();

  const loadContent = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.settings.getMap();
      const raw = res?.data?.[SUSTAINABILITY_SETTING_KEY];
      const loaded = raw
        ? parseSustainabilityContent(raw)
        : cloneDefaultSustainabilityContent();
      setContent(loaded);
      setStorageMode("database");
    } catch {
      try {
        const cached = localStorage.getItem(SUSTAINABILITY_LOCAL_CACHE_KEY);
        if (cached) {
          setContent(parseSustainabilityContent(cached));
        } else {
          setContent(cloneDefaultSustainabilityContent());
        }
      } catch {
        setContent(cloneDefaultSustainabilityContent());
      }
      setStorageMode("local");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const persistContent = async (
    nextContent: SustainabilityPageContent,
    successMessage: string
  ) => {
    setIsSaving(true);
    const serialized = JSON.stringify(nextContent);
    try {
      localStorage.setItem(SUSTAINABILITY_LOCAL_CACHE_KEY, serialized);
    } catch {
      // ignore storage quota errors
    }

    try {
      await api.settings.updateBatch([
        { key: SUSTAINABILITY_SETTING_KEY, value: serialized },
      ]);
      setStorageMode("database");
      window.dispatchEvent(new Event(SUSTAINABILITY_UPDATED_EVENT));
      showToast(successMessage, "success");
    } catch {
      setStorageMode("local");
      window.dispatchEvent(new Event(SUSTAINABILITY_UPDATED_EVENT));
      showToast(
        "Saved to local browser cache (backend unreachable — check API connection).",
        "error"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = (e?: React.FormEvent) => {
    e?.preventDefault();
    persistContent(content, "Sustainability page saved and published!");
  };

  const handleResetDefaults = async () => {
    const defaults = cloneDefaultSustainabilityContent();
    setContent(defaults);
    setConfirmReset(false);
    await persistContent(defaults, "Sustainability page reset to default content.");
  };

  const getCurrentMediaValue = (): string => {
    if (!mediaTarget) return "";
    switch (mediaTarget.kind) {
      case "hero":
        return content.hero.image;
      case "leafTexture":
        return content.intro.leafTextureImage;
      case "highlightsBg":
        return content.highlightsBgImage;
      case "foliageBanner":
        return content.naturalResourcesImage;
      case "practiceIcon":
        return content.practices[mediaTarget.index]?.icon || "";
    }
  };

  const handleMediaSelected = (asset: { url: string }) => {
    if (!mediaTarget) return;
    setContent((prev) => {
      switch (mediaTarget.kind) {
        case "hero":
          return { ...prev, hero: { ...prev.hero, image: asset.url } };
        case "leafTexture":
          return {
            ...prev,
            intro: { ...prev.intro, leafTextureImage: asset.url },
          };
        case "highlightsBg":
          return { ...prev, highlightsBgImage: asset.url };
        case "foliageBanner":
          return { ...prev, naturalResourcesImage: asset.url };
        case "practiceIcon":
          return {
            ...prev,
            practices: prev.practices.map((item, idx) =>
              idx === mediaTarget.index ? { ...item, icon: asset.url } : item
            ),
          };
      }
    });
    setMediaTarget(null);
  };

  // Highlights Mutators
  const updateHighlight = (
    index: number,
    updater: (item: SustainabilityHighlight) => SustainabilityHighlight
  ) => {
    setContent((prev) => ({
      ...prev,
      highlights: prev.highlights.map((item, idx) =>
        idx === index ? updater(item) : item
      ),
    }));
  };

  const addHighlight = () => {
    setContent((prev) => ({
      ...prev,
      highlights: [
        ...prev.highlights,
        {
          id: `highlight-${Date.now()}`,
          segments: [
            { text: "100%", emphasize: true },
            { text: " Recyclable Stream" },
          ],
          description: "Describe the sustainability metric and operational impact.",
          defaultExpanded: false,
        },
      ],
    }));
  };

  const removeHighlight = (index: number) => {
    if (content.highlights.length <= 1) {
      showToast("Keep at least one highlight card.", "error");
      return;
    }
    setContent((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, idx) => idx !== index),
    }));
  };

  // Practices Mutators
  const updatePractice = (
    index: number,
    patch: Partial<EnvironmentalPractice>
  ) => {
    setContent((prev) => ({
      ...prev,
      practices: prev.practices.map((item, idx) =>
        idx === index ? { ...item, ...patch } : item
      ),
    }));
  };

  const addPractice = () => {
    setContent((prev) => ({
      ...prev,
      practices: [
        ...prev.practices,
        {
          id: `practice-${Date.now()}`,
          titleTop: "Closed-Loop",
          titleBottom: "Water Recovery",
          fullTitle: "Closed-Loop Water Recovery",
          icon: "/images/sustainability/icon-energy.png",
          description:
            "Detail how our Kaliakoir campus minimizes freshwater draw and treats process water.",
        },
      ],
    }));
  };

  const removePractice = (index: number) => {
    if (content.practices.length <= 1) {
      showToast("Keep at least one environmental practice.", "error");
      return;
    }
    setContent((prev) => ({
      ...prev,
      practices: prev.practices.filter((_, idx) => idx !== index),
    }));
  };

  // Pillars Mutators
  const updatePillar = (index: number, patch: Partial<SustainabilityPillar>) => {
    setContent((prev) => ({
      ...prev,
      pillars: prev.pillars.map((item, idx) =>
        idx === index ? { ...item, ...patch } : item
      ),
    }));
  };

  const addPillar = () => {
    setContent((prev) => ({
      ...prev,
      pillars: [
        ...prev.pillars,
        {
          id: `pillar-${Date.now()}`,
          barLabel: "Circular Economy & Polymer Traceability",
          description: "Describe the long-term corporate commitment for this pillar.",
          metrics: [
            "100% Virgin & Recycled Food-Grade Resin",
            "Zero Landfill Polymer Offcuts",
            "ISO 14001 Environmental Management",
          ],
        },
      ],
    }));
  };

  const removePillar = (index: number) => {
    if (content.pillars.length <= 1) {
      showToast("Keep at least one vision pillar.", "error");
      return;
    }
    setContent((prev) => ({
      ...prev,
      pillars: prev.pillars.filter((_, idx) => idx !== index),
    }));
  };

  const tabs: { id: TabId; label: string; count?: number; icon: React.ReactNode }[] = [
    { id: "hero", label: "Hero & Intro", icon: <Leaf className="w-3.5 h-3.5" /> },
    {
      id: "highlights",
      label: "Highlight Cards",
      count: content.highlights.length,
      icon: <Layers className="w-3.5 h-3.5" />,
    },
    {
      id: "practices",
      label: "Eco Practices",
      count: content.practices.length,
      icon: <Sparkles className="w-3.5 h-3.5" />,
    },
    {
      id: "pillars",
      label: "Banner & Vision Pillars",
      count: content.pillars.length,
      icon: <Award className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="space-y-6">
      <AdminToast toast={toast} onClose={clearToast} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg font-black text-white">
                Sustainability Page CMS
              </h1>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  storageMode === "database"
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                    : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                }`}
              >
                {storageMode === "database" ? (
                  <>
                    <Database className="w-3 h-3" /> SQLite Synced
                  </>
                ) : (
                  <>
                    <HardDrive className="w-3 h-3" /> Local Fallback
                  </>
                )}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Edit the full-height LEED Platinum hero, intro narrative, dark stone highlight metrics, environmental practices, foliage banner &amp; vision pillars.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/sustainability"
            target="_blank"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            Live Page
          </Link>

          {confirmReset ? (
            <div className="flex items-center gap-1.5 bg-rose-950/60 border border-rose-500/40 px-2.5 py-1.5 rounded-xl">
              <span className="text-[11px] font-bold text-rose-200">
                Reset all sections?
              </span>
              <button
                type="button"
                onClick={handleResetDefaults}
                disabled={isSaving}
                className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold cursor-pointer"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Defaults
            </button>
          )}

          <button
            type="button"
            onClick={loadContent}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Reload from Database"
          >
            <RefreshCw
              className={`w-4 h-4 ${loading ? "animate-spin text-emerald-400" : ""}`}
            />
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSaving || loading}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/80"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Form Body */}
      {loading ? (
        <AdminFormSkeleton />
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* TAB 1: HERO & INTRO */}
          {activeTab === "hero" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Hero Banner Card */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h2 className="text-sm font-black text-white">
                    1. Full-Height Hero Banner (100dvh)
                  </h2>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    Full Viewport
                  </span>
                </div>

                <div>
                  <label className="text-slate-300 font-bold text-xs block mb-1">
                    Hero Display Heading
                  </label>
                  <input
                    type="text"
                    value={content.hero.title}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, title: e.target.value },
                      }))
                    }
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold text-xs block mb-1">
                    Hero Eyebrow / Subtitle
                  </label>
                  <input
                    type="text"
                    value={content.hero.subtitle}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, subtitle: e.target.value },
                      }))
                    }
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold text-xs block mb-1">
                    Scroll Cue Label
                  </label>
                  <input
                    type="text"
                    value={content.hero.scrollLabel}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, scrollLabel: e.target.value },
                      }))
                    }
                    className={INPUT_CLASS}
                  />
                </div>

                <MediaImageField
                  label="Hero Architecture Image"
                  hint="Recommended 16:9+ high-res"
                  value={content.hero.image}
                  onChange={(url) =>
                    setContent((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, image: url },
                    }))
                  }
                  onOpenPicker={() => setMediaTarget({ kind: "hero" })}
                />
              </div>

              {/* Botanical Intro Section Card */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h2 className="text-sm font-black text-white border-b border-slate-800 pb-3">
                  2. Intro Narrative &amp; USGBC LEED Seal
                </h2>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-300 font-bold text-xs">
                      Leaf-Clipped Display Statement
                    </label>
                    <span className="text-[11px] text-slate-500">
                      Press Enter for line breaks
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={content.intro.heading}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        intro: { ...prev.intro, heading: e.target.value },
                      }))
                    }
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold text-xs block mb-1">
                    Editorial Overview Paragraph
                  </label>
                  <textarea
                    rows={5}
                    value={content.intro.description}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        intro: { ...prev.intro, description: e.target.value },
                      }))
                    }
                    className={INPUT_CLASS}
                  />
                </div>

                <MediaImageField
                  label="Leaf Typography Fill Texture"
                  hint="Used inside gradient headline text"
                  value={content.intro.leafTextureImage}
                  onChange={(url) =>
                    setContent((prev) => ({
                      ...prev,
                      intro: { ...prev.intro, leafTextureImage: url },
                    }))
                  }
                  onOpenPicker={() => setMediaTarget({ kind: "leafTexture" })}
                />

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Display Metallic USGBC LEED Platinum Seal
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Shown beside the intro editorial paragraph
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={content.intro.showLeedSeal}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        intro: {
                          ...prev.intro,
                          showLeedSeal: e.target.checked,
                        },
                      }))
                    }
                    className="w-4 h-4 accent-emerald-500 cursor-pointer"
                  />
                </label>
              </div>
            </div>
          )}

          {/* TAB 2: HIGHLIGHT CARDS */}
          {activeTab === "highlights" && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="flex-1 max-w-2xl">
                  <MediaImageField
                    label="Dark Stone Section Background Texture"
                    hint="Shared by Highlight Cards & Vision Pillar bars"
                    value={content.highlightsBgImage}
                    onChange={(url) =>
                      setContent((prev) => ({ ...prev, highlightsBgImage: url }))
                    }
                    onOpenPicker={() => setMediaTarget({ kind: "highlightsBg" })}
                  />
                </div>
                <button
                  type="button"
                  onClick={addHighlight}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Add Highlight Card
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {content.highlights.map((card, idx) => (
                  <div
                    key={card.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
                        Highlight Card #{idx + 1}
                      </span>
                      <div className="flex items-center gap-3">
                        <label className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(card.defaultExpanded)}
                            onChange={(e) =>
                              updateHighlight(idx, (cur) => ({
                                ...cur,
                                defaultExpanded: e.target.checked,
                              }))
                            }
                            className="accent-emerald-500"
                          />
                          Show detail initially
                        </label>
                        <button
                          type="button"
                          onClick={() => removeHighlight(idx)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Delete card"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Live Stone Card Metric Preview */}
                    <div className="rounded-xl p-4 bg-neutral-950 border border-slate-700/80 min-h-[76px] flex items-center">
                      <div className="text-white leading-tight">
                        {card.segments.map((seg, sIdx) => (
                          <span
                            key={sIdx}
                            className={
                              seg.emphasize
                                ? "text-2xl font-bold text-white"
                                : "text-sm font-medium text-slate-300"
                            }
                          >
                            {seg.text}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Segments Builder */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-slate-300 font-bold text-xs">
                          Metric Headline Segments
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            updateHighlight(idx, (cur) => ({
                              ...cur,
                              segments: [
                                ...cur.segments,
                                { text: " metric", emphasize: false },
                              ],
                            }))
                          }
                          className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" /> Add Segment
                        </button>
                      </div>

                      <div className="space-y-2">
                        {card.segments.map((seg, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={seg.text}
                              onChange={(e) =>
                                updateHighlight(idx, (cur) => ({
                                  ...cur,
                                  segments: cur.segments.map((s, i) =>
                                    i === sIdx ? { ...s, text: e.target.value } : s
                                  ),
                                }))
                              }
                              placeholder="Text (preserve spacing)"
                              className={INPUT_CLASS}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                updateHighlight(idx, (cur) => ({
                                  ...cur,
                                  segments: cur.segments.map((s, i) =>
                                    i === sIdx
                                      ? { ...s, emphasize: !s.emphasize }
                                      : s
                                  ),
                                }))
                              }
                              className={`px-2.5 py-2 rounded-xl text-[11px] font-bold shrink-0 border transition-colors cursor-pointer ${
                                seg.emphasize
                                  ? "bg-emerald-600/25 border-emerald-500 text-emerald-300"
                                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                              }`}
                            >
                              {seg.emphasize ? "Large Stat" : "Regular"}
                            </button>
                            {card.segments.length > 1 && (
                              <button
                                type="button"
                                onClick={() =>
                                  updateHighlight(idx, (cur) => ({
                                    ...cur,
                                    segments: cur.segments.filter(
                                      (_, i) => i !== sIdx
                                    ),
                                  }))
                                }
                                className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-rose-400 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-slate-300 font-bold text-xs block mb-1">
                        Click-to-Expand Description
                      </label>
                      <textarea
                        rows={3}
                        value={card.description}
                        onChange={(e) =>
                          updateHighlight(idx, (cur) => ({
                            ...cur,
                            description: e.target.value,
                          }))
                        }
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ENVIRONMENTAL PRACTICES */}
          {activeTab === "practices" && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <h2 className="text-sm font-black text-white">
                    Environmental Practices Section Heading
                  </h2>
                  <button
                    type="button"
                    onClick={addPractice}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-1.5 self-start cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Add Eco Practice
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 font-bold text-xs block mb-1">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={content.practicesSectionTitle}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          practicesSectionTitle: e.target.value,
                        }))
                      }
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-bold text-xs block mb-1">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={content.practicesSectionSubtitle}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          practicesSectionSubtitle: e.target.value,
                        }))
                      }
                      className={INPUT_CLASS}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {content.practices.map((practice, idx) => (
                  <div
                    key={practice.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center p-2.5 shrink-0"
                          style={{
                            background:
                              "linear-gradient(225deg, #a2d7e9 0%, #99ddd1 100%)",
                          }}
                        >
                          <img
                            src={practice.icon}
                            alt={practice.fullTitle}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <span className="text-xs font-black text-white block">
                            {practice.fullTitle}
                          </span>
                          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                            Practice Circle #{idx + 1}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePractice(idx)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Remove practice"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-300 font-bold text-xs block mb-1">
                          Circle Title Line 1
                        </label>
                        <input
                          type="text"
                          value={practice.titleTop}
                          onChange={(e) =>
                            updatePractice(idx, {
                              titleTop: e.target.value,
                              fullTitle: `${e.target.value} ${practice.titleBottom}`.trim(),
                            })
                          }
                          className={INPUT_CLASS}
                        />
                      </div>
                      <div>
                        <label className="text-slate-300 font-bold text-xs block mb-1">
                          Circle Title Line 2
                        </label>
                        <input
                          type="text"
                          value={practice.titleBottom}
                          onChange={(e) =>
                            updatePractice(idx, {
                              titleBottom: e.target.value,
                              fullTitle: `${practice.titleTop} ${e.target.value}`.trim(),
                            })
                          }
                          className={INPUT_CLASS}
                        />
                      </div>
                    </div>

                    <MediaImageField
                      label="White Practice Icon PNG"
                      hint="Transparent white SVG/PNG looks best"
                      value={practice.icon}
                      onChange={(url) => updatePractice(idx, { icon: url })}
                      onOpenPicker={() =>
                        setMediaTarget({ kind: "practiceIcon", index: idx })
                      }
                      previewClass="w-11 h-11 object-contain p-1.5 rounded-full bg-teal-600/80 border border-teal-400/50"
                    />

                    <div>
                      <label className="text-slate-300 font-bold text-xs block mb-1">
                        Modal Narrative Description
                      </label>
                      <textarea
                        rows={4}
                        value={practice.description}
                        onChange={(e) =>
                          updatePractice(idx, { description: e.target.value })
                        }
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BANNER & VISION PILLARS */}
          {activeTab === "pillars" && (
            <div className="space-y-6">
              {/* Foliage Banner & Section Title */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <h2 className="text-sm font-black text-white border-b border-slate-800 pb-3">
                    Natural Resources Fade Banner
                  </h2>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-slate-300 font-bold text-xs">
                        Banner Display Quote
                      </label>
                      <span className="text-[11px] text-slate-500">
                        Use Enter for line breaks
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={content.naturalResourcesHeading}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          naturalResourcesHeading: e.target.value,
                        }))
                      }
                      className={INPUT_CLASS}
                    />
                  </div>

                  <MediaImageField
                    label="Architectural Foliage Banner Image"
                    value={content.naturalResourcesImage}
                    onChange={(url) =>
                      setContent((prev) => ({
                        ...prev,
                        naturalResourcesImage: url,
                      }))
                    }
                    onOpenPicker={() =>
                      setMediaTarget({ kind: "foliageBanner" })
                    }
                  />
                </div>

                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h2 className="text-sm font-black text-white border-b border-slate-800 pb-3">
                      Vision Accordion Section
                    </h2>

                    <div>
                      <label className="text-slate-300 font-bold text-xs block mb-1">
                        Section Heading
                      </label>
                      <input
                        type="text"
                        value={content.visionHeading}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            visionHeading: e.target.value,
                          }))
                        }
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <span className="text-xs text-slate-400">
                      Each stone bar expands smoothly on click.
                    </span>
                    <button
                      type="button"
                      onClick={addPillar}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add Vision Pillar
                    </button>
                  </div>
                </div>
              </div>

              {/* Pillar Bars List */}
              <div className="space-y-4">
                {content.pillars.map((pillar, idx) => (
                  <div
                    key={pillar.id}
                    className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Stone Accordion Pillar #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removePillar(idx)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Remove pillar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="text-slate-300 font-bold text-xs block mb-1">
                        Stone Bar Title
                      </label>
                      <input
                        type="text"
                        value={pillar.barLabel}
                        onChange={(e) =>
                          updatePillar(idx, { barLabel: e.target.value })
                        }
                        className={INPUT_CLASS}
                      />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="text-slate-300 font-bold text-xs block mb-1">
                          Expanded Narrative Description
                        </label>
                        <textarea
                          rows={4}
                          value={pillar.description}
                          onChange={(e) =>
                            updatePillar(idx, { description: e.target.value })
                          }
                          className={INPUT_CLASS}
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-slate-300 font-bold text-xs">
                            Key Outcome Badges
                          </label>
                          <span className="text-[11px] text-slate-500">
                            One badge per line
                          </span>
                        </div>
                        <textarea
                          rows={4}
                          value={arrayToLines(pillar.metrics)}
                          onChange={(e) =>
                            updatePillar(idx, {
                              metrics: linesToArray(e.target.value),
                            })
                          }
                          className={INPUT_CLASS}
                          placeholder={"Metric badge 1\nMetric badge 2\nMetric badge 3"}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
      )}

      {/* Imaple Media Library Picker */}
      <MediaPickerModal
        isOpen={Boolean(mediaTarget)}
        onClose={() => setMediaTarget(null)}
        onSelect={handleMediaSelected}
        currentValue={getCurrentMediaValue()}
      />
    </div>
  );
}

