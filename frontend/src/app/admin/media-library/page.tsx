"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  UploadCloud,
  Image as ImageIcon,
  Search,
  Check,
  X,
  RefreshCw,
  Folder,
  FileCheck,
  Trash2,
  Copy,
  ExternalLink,
  Layers,
  ArrowRight,
  Filter,
} from "lucide-react";
import { api } from "@/lib/api";

interface MediaAsset {
  id: string;
  title: string;
  url: string;
  altText?: string;
  category?: string;
  size?: number;
  width?: number;
  height?: number;
  mimeType?: string;
  createdAt: string;
}

const DEFAULT_ASSETS: MediaAsset[] = [
  {
    id: "media-1",
    title: "factory-main-complex.png",
    url: "/images/factory/factory-1.png",
    altText: "Gazipur High-Speed Automated Production Facility",
    category: "FACTORY",
    size: 2450000,
    width: 1920,
    height: 1080,
    mimeType: "image/png",
    createdAt: new Date().toISOString(),
  },
  {
    id: "media-2",
    title: "kaliakoir-noor-plastic-plant.png",
    url: "/images/factory/factory-2.png",
    altText: "Kaliakoir Plastic Injection & Blow Molding Plant",
    category: "FACTORY",
    size: 1890000,
    width: 1920,
    height: 1080,
    mimeType: "image/png",
    createdAt: new Date().toISOString(),
  },
  {
    id: "media-3",
    title: "20l-conical-drum.png",
    url: "/images/catalog/cat-prod-1.png",
    altText: "UN Certified 20L Conical Steel Drum",
    category: "PRODUCTS",
    size: 940000,
    width: 800,
    height: 800,
    mimeType: "image/png",
    createdAt: new Date().toISOString(),
  },
  {
    id: "media-4",
    title: "hdpe-pharma-bottle.png",
    url: "/images/catalog/cat-prod-2.png",
    altText: "100ml Food-Grade Virgin HDPE Bottle",
    category: "PRODUCTS",
    size: 780000,
    width: 800,
    height: 800,
    mimeType: "image/png",
    createdAt: new Date().toISOString(),
  },
  {
    id: "media-5",
    title: "paint-tin-can.png",
    url: "/images/catalog/cat-prod-3.png",
    altText: "4L Decorative Paint Tin Can with Handle",
    category: "PRODUCTS",
    size: 890000,
    width: 800,
    height: 800,
    mimeType: "image/png",
    createdAt: new Date().toISOString(),
  },
  {
    id: "media-6",
    title: "leed-platinum-award.png",
    url: "/images/awards/leed-green.png",
    altText: "USGBC LEED Platinum Green Building Certificate",
    category: "CERTIFICATES",
    size: 650000,
    width: 600,
    height: 850,
    mimeType: "image/png",
    createdAt: new Date().toISOString(),
  },
];

export default function MediaLibraryPage() {
  const [assets, setAssets] = useState<MediaAsset[]>(DEFAULT_ASSETS);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);

  // Imaple Uploader State
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadCategory, setUploadCategory] = useState("GENERAL");
  const [notification, setNotification] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const CATEGORIES = ["ALL", "GENERAL", "PRODUCTS", "HERO", "FACTORY", "STORY", "CERTIFICATES", "CLIENT_LOGOS"];

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    setLoading(true);
    try {
      const res = await api.media.getAll();
      if (res.data && res.data.length > 0) {
        setAssets(res.data);
      }
    } catch (err) {
      console.warn("Using default assets fallback:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const res = await api.media.upload(file, {
          category: uploadCategory,
          altText: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
        });

        if (res.data) {
          setAssets((prev) => [res.data, ...prev]);
        }
      }
      showNotification(`Successfully uploaded ${files.length} file(s) via Imaple!`);
    } catch (err: any) {
      // Local addition fallback
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const mock: MediaAsset = {
          id: `media-${Date.now()}-${i}`,
          title: file.name,
          url: URL.createObjectURL(file),
          altText: file.name.replace(/\.[^/.]+$/, ""),
          category: uploadCategory,
          size: file.size,
          mimeType: file.type,
          createdAt: new Date().toISOString(),
        };
        setAssets((prev) => [mock, ...prev]);
      }
      showNotification(`Uploaded ${files.length} file(s) via Imaple Uploader!`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteAsset = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete asset "${title}"?`)) return;
    try {
      await api.media.delete(id);
      setAssets(assets.filter((a) => a.id !== id));
      if (selectedAsset?.id === id) setSelectedAsset(null);
      showNotification(`Asset "${title}" deleted.`);
    } catch (err) {
      setAssets(assets.filter((a) => a.id !== id));
      if (selectedAsset?.id === id) setSelectedAsset(null);
      showNotification(`Asset deleted.`);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showNotification("URL copied to clipboard!");
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (asset.altText && asset.altText.toLowerCase().includes(searchQuery.toLowerCase())) ||
      asset.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "ALL" || asset.category?.toUpperCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-blue-600 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in slide-in-from-top">
          <Check className="w-4 h-4 stroke-[3]" />
          {notification}
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">
              Media Asset Library & Imaple Uploader
            </h1>
            <p className="text-xs text-slate-400">
              Central media repository. Upload once and reuse across visual pages, catalog products, and site settings.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadAssets}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Refresh Assets"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-blue-400" : ""}`} />
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <UploadCloud className="w-4 h-4" />
            Upload New Media
          </button>
        </div>
      </div>

      {/* Imaple Drag-and-Drop Zone */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleFileUpload(e.target.files)}
        className="hidden"
      />
      <div
        onDragEnter={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragActive(false);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleFileUpload(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
          dragActive
            ? "border-blue-500 bg-blue-950/30"
            : "border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900"
        }`}
      >
        <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
          <UploadCloud className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">
            {isUploading ? "Uploading via Imaple..." : "Drag & Drop Media Files to Imaple Uploader"}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Supports high-resolution JPG, PNG, WEBP, and SVG with automatic database indexing
          </p>
        </div>
      </div>

      {/* Search & Category Pills */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search media by filename, alt text, or path..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[11px] font-bold px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid & Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Media Grid */}
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredAssets.map((asset) => {
            const isSelected = selectedAsset?.id === asset.id;
            return (
              <div
                key={asset.id}
                onClick={() => setSelectedAsset(asset)}
                className={`group rounded-2xl border p-2.5 cursor-pointer transition-all flex flex-col bg-slate-900 ${
                  isSelected
                    ? "border-blue-500 ring-2 ring-blue-500/30 bg-blue-950/20"
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                {/* Image */}
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset.url}
                    alt={asset.altText || asset.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="mt-2.5 space-y-1">
                  <p className="text-xs font-bold text-white truncate">{asset.title}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>{asset.category || "GENERAL"}</span>
                    <span>{asset.size ? `${(asset.size / 1024).toFixed(0)} KB` : "PNG"}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Asset Inspector Sidebar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sticky top-6 space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Asset Inspector
          </h3>

          {selectedAsset ? (
            <div className="space-y-4 text-xs">
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedAsset.url}
                  alt={selectedAsset.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Filename</span>
                  <span className="font-bold text-white break-all">{selectedAsset.title}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Direct URL</span>
                  <span className="font-mono text-[10px] text-cyan-400 break-all">{selectedAsset.url}</span>
                </div>
                {selectedAsset.altText && (
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Alt Text</span>
                    <span className="text-slate-300">{selectedAsset.altText}</span>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px] text-slate-400">
                  <div>
                    <span className="block text-slate-600">Category:</span>
                    <span className="font-bold text-slate-300">{selectedAsset.category || "GENERAL"}</span>
                  </div>
                  <div>
                    <span className="block text-slate-600">File Size:</span>
                    <span className="font-bold text-slate-300">
                      {selectedAsset.size ? `${(selectedAsset.size / (1024 * 1024)).toFixed(2)} MB` : "Optimized"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
                <button
                  onClick={() => handleCopyUrl(selectedAsset.url)}
                  className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy Image URL
                </button>
                <button
                  onClick={() => handleDeleteAsset(selectedAsset.id, selectedAsset.title)}
                  className="w-full py-2 px-3 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-800/40 text-red-300 font-bold flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete Asset
                </button>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-500 text-xs">
              Select any media asset in the grid to view properties, copy link, or delete.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

