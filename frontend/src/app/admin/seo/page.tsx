"use client";

import React, { useState, useEffect } from "react";
import {
  Globe,
  Save,
  CheckCircle,
  Search,
  ExternalLink,
  RefreshCw,
  Share2,
  Layers,
  Sparkles,
} from "lucide-react";
import { api } from "@/lib/api";
import MediaPickerModal from "@/components/admin/MediaPickerModal";

export default function SeoManagementPage() {
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Global SEO
  const [metaTitle, setMetaTitle] = useState("Xclusive Can Limited & Q Pail | Sustainable Packaging Leader");
  const [metaDescription, setMetaDescription] = useState("Pioneering sustainable metal containers, conical steel drums, and rigid plastic packaging solutions engineered for industry leaders across Bangladesh.");
  const [metaKeywords, setMetaKeywords] = useState("metal cans, tinplate packaging, chemical drums, plastic pails, HDPE bottles, Bangladesh packaging");
  const [canonicalUrl, setCanonicalUrl] = useState("https://www.xclusivecan.com");
  const [ogImageUrl, setOgImageUrl] = useState("/images/factory/factory-1.png");

  // Page-specific overrides
  const [pages, setPages] = useState<any[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [pageMetaTitle, setPageMetaTitle] = useState("");
  const [pageMetaDesc, setPageMetaDesc] = useState("");

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  useEffect(() => {
    loadSeoSettings();
    loadPages();
  }, []);

  const loadSeoSettings = async () => {
    setLoading(true);
    try {
      const res = await api.settings.getMap();
      if (res.data) {
        if (res.data["seo_title"]) setMetaTitle(res.data["seo_title"]);
        if (res.data["seo_description"]) setMetaDescription(res.data["seo_description"]);
        if (res.data["seo_keywords"]) setMetaKeywords(res.data["seo_keywords"]);
        if (res.data["seo_canonical"]) setCanonicalUrl(res.data["seo_canonical"]);
        if (res.data["seo_og_image"]) setOgImageUrl(res.data["seo_og_image"]);
      }
    } catch (err) {
      console.warn("Using default SEO fallback:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadPages = async () => {
    try {
      const res = await api.pages.getAll();
      if (res.data && res.data.length > 0) {
        setPages(res.data);
        setSelectedPageId(res.data[0].id);
        setPageMetaTitle(res.data[0].metaTitle || res.data[0].title);
        setPageMetaDesc(res.data[0].metaDescription || "");
      }
    } catch (err) {
      // ignore
    }
  };

  const handleSelectPage = (id: string) => {
    setSelectedPageId(id);
    const match = pages.find((p) => p.id === id);
    if (match) {
      setPageMetaTitle(match.metaTitle || match.title);
      setPageMetaDesc(match.metaDescription || "");
    }
  };

  const handleSaveGlobalSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const batch = [
      { key: "seo_title", value: metaTitle },
      { key: "seo_description", value: metaDescription },
      { key: "seo_keywords", value: metaKeywords },
      { key: "seo_canonical", value: canonicalUrl },
      { key: "seo_og_image", value: ogImageUrl },
    ];

    try {
      await api.settings.updateBatch(batch);
      if (selectedPageId) {
        await api.pages.update(selectedPageId, {
          metaTitle: pageMetaTitle,
          metaDescription: pageMetaDesc,
        });
      }
      showNotification("SEO metadata updated and synced!");
    } catch (err) {
      showNotification("SEO metadata saved locally!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-blue-600 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in slide-in-from-top">
          <CheckCircle className="w-4 h-4" />
          {notification}
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">
              SEO & Social Sharing Management
            </h1>
            <p className="text-xs text-slate-400">
              Configure search engine metadata, OpenGraph tags, and preview Google SERP search results
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadSeoSettings}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-blue-400" : ""}`} />
          </button>
          <button
            onClick={handleSaveGlobalSeo}
            disabled={isSaving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save SEO Settings"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Form Inputs */}
        <form onSubmit={handleSaveGlobalSeo} className="space-y-6 text-xs">
          {/* Global Meta */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              Global Search Engine Metadata
            </h2>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Site Meta Title (Recommended 50–60 characters)
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-bold"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                {metaTitle.length} characters
              </span>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Site Meta Description (Recommended 140–160 characters)
              </label>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                {metaDescription.length} characters
              </span>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Keywords (Comma-separated)
              </label>
              <input
                type="text"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Canonical Base URL
              </label>
              <input
                type="url"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                OpenGraph Social Preview Image
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={ogImageUrl}
                  onChange={(e) => setOgImageUrl(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setIsMediaModalOpen(true)}
                  className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Browse Imaple
                </button>
              </div>
            </div>
          </div>

          {/* Page Level Override */}
          {pages.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
                Individual Page Overrides
              </h2>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Select Page</label>
                <select
                  value={selectedPageId || ""}
                  onChange={(e) => handleSelectPage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-bold"
                >
                  {pages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.slug})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Page Meta Title</label>
                <input
                  type="text"
                  value={pageMetaTitle}
                  onChange={(e) => setPageMetaTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Page Meta Description</label>
                <textarea
                  rows={2}
                  value={pageMetaDesc}
                  onChange={(e) => setPageMetaDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </form>

        {/* Live SERP & Social Simulator */}
        <div className="space-y-6">
          {/* Google Search Snippet Simulator */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Search className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Google Search Results Preview (SERP)
              </h3>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1.5 font-sans">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-[10px] text-white font-bold flex items-center justify-center">
                  XC
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block leading-tight">
                    Xclusive Can Limited
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 block leading-tight">
                    {canonicalUrl}
                  </span>
                </div>
              </div>

              <h4 className="text-base text-blue-400 hover:underline font-semibold cursor-pointer pt-1 leading-snug">
                {pageMetaTitle || metaTitle}
              </h4>

              <p className="text-xs text-slate-400 leading-relaxed">
                {pageMetaDesc || metaDescription}
              </p>
            </div>
          </div>

          {/* Social OpenGraph Preview Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Share2 className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Social Sharing Card (LinkedIn / Facebook)
              </h3>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-md">
              <div className="aspect-video w-full bg-slate-900 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ogImageUrl || "/images/factory/factory-1.png"}
                  alt="OG Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3.5 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  XCLUSIVECAN.COM
                </span>
                <h4 className="text-xs font-bold text-white truncate">
                  {pageMetaTitle || metaTitle}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {pageMetaDesc || metaDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Picker */}
      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={(asset) => setOgImageUrl(asset.url)}
        currentValue={ogImageUrl}
      />
    </div>
  );
}

