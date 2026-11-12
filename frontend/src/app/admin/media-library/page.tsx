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
import { AdminMediaSkeletonItems } from "@/components/common/Skeletons";
import {
  AdminErrorBanner,
  AdminToast,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";
import {
  MEDIA_CATEGORIES,
  NormalizedMediaAsset,
  filterMediaAssets,
  normalizeMediaAsset,
} from "@/lib/media";

type MediaAsset = NormalizedMediaAsset;

export default function MediaLibraryPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);

  // Image Uploader State
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadCategory, setUploadCategory] = useState("GENERAL");
  const { toast, showToast, clearToast } = useAdminToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await api.media.getAll();
      const rows = Array.isArray(res.data) ? res.data : [];
      setAssets(rows.map((item: any) => normalizeMediaAsset(item)));
    } catch (err: any) {
      setAssets([]);
      setLoadError(err?.message || "Failed to load media library assets from PostgreSQL.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);

    try {
      let uploadedCount = 0;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const res = await api.media.upload(file, {
          category: uploadCategory,
          altText: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
        });

        if (res.data) {
          setAssets((prev) => [normalizeMediaAsset(res.data), ...prev]);
          uploadedCount += 1;
        }
      }
      if (uploadedCount > 0) {
        showToast(`Successfully uploaded ${uploadedCount} file(s)!`);
      }
    } catch (err: any) {
      showToast(
        err?.message || "Upload failed. Ensure the backend server is running.",
        "error"
      );
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDeleteAsset = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete asset "${title}"?`)) return;
    try {
      await api.media.delete(id);
      setAssets((prev) => prev.filter((a) => a.id !== id));
      if (selectedAsset?.id === id) setSelectedAsset(null);
      showToast(`Asset "${title}" deleted.`);
    } catch (err: any) {
      showToast(err?.message || `Failed to delete asset "${title}" from PostgreSQL.`, "error");
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast("URL copied to clipboard!");
  };

  const filteredAssets = filterMediaAssets(assets, searchQuery, selectedCategory);

  return (
    <div className="space-y-6">
      <AdminToast toast={toast} onClose={clearToast} />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">
              Media Asset Library & Image Uploader
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

      <AdminErrorBanner error={loadError} onRetry={loadAssets} />

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
            {isUploading ? "Uploading image..." : "Drag & Drop Media Files to Image Uploader"}
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
          {MEDIA_CATEGORIES.map((cat) => (
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
          {loading ? (
            <AdminMediaSkeletonItems count={8} />
          ) : filteredAssets.length === 0 ? (
            <div className="col-span-full py-12 text-center rounded-2xl border border-slate-800 bg-slate-900/50 text-xs text-slate-400">
              {loadError
                ? "Unable to display media assets while database connection is unavailable."
                : "No media assets match your filter in PostgreSQL."}
            </div>
          ) : (
            filteredAssets.map((asset) => {
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
            })
          )}
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

