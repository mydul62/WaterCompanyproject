"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  Image as ImageIcon,
  Search,
  Check,
  X,
  RefreshCw,
  Folder,
  FileCheck,
  AlertCircle,
} from "lucide-react";
import { api } from "@/lib/api";

export interface MediaAssetItem {
  id: string;
  title: string;
  url: string;
  altText?: string;
  category?: string;
  size?: number;
  width?: number;
  height?: number;
}

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (asset: { url: string; altText?: string; title?: string }) => void;
  currentValue?: string;
  categoryFilter?: string;
}

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  currentValue,
  categoryFilter,
}: MediaPickerModalProps) {
  const [activeTab, setActiveTab] = useState<"library" | "upload">("library");
  const [assets, setAssets] = useState<MediaAssetItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFilter || "ALL");
  const [selectedAsset, setSelectedAsset] = useState<MediaAssetItem | null>(null);

  // Upload Tab State
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [altTextInput, setAltTextInput] = useState("");
  const [uploadCategory, setUploadCategory] = useState("GENERAL");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Categories list
  const CATEGORIES = ["ALL", "GENERAL", "PRODUCTS", "HERO", "FACTORY", "STORY", "CERTIFICATES", "CLIENT_LOGOS"];

  useEffect(() => {
    if (isOpen) {
      loadAssets();
    }
  }, [isOpen]);

  const loadAssets = async () => {
    setLoading(true);
    try {
      const res = await api.media.getAll();
      if (res.data) {
        setAssets(res.data);
        if (currentValue) {
          const match = res.data.find((a: any) => a.url === currentValue);
          if (match) setSelectedAsset(match);
        }
      }
    } catch (err) {
      console.error("Failed to load media assets:", err);
      // Fallback mock list if backend is not yet populated
      setAssets([
        {
          id: "m-1",
          title: "Factory Main Plant",
          url: "/images/factory/factory-1.png",
          altText: "Gazipur Modern High-Speed Production Plant",
          category: "FACTORY",
        },
        {
          id: "m-2",
          title: "20L Industrial Steel Pail",
          url: "/images/catalog/cat-prod-1.png",
          altText: "UN-Certified Conical Steel Drum",
          category: "PRODUCTS",
        },
        {
          id: "m-3",
          title: "Food-Grade Plastic Container",
          url: "/images/catalog/cat-prod-2.png",
          altText: "100% Virgin HDPE Bottle",
          category: "PRODUCTS",
        },
        {
          id: "m-4",
          title: "LEED Platinum Award",
          url: "/images/awards/leed-green.png",
          altText: "USGBC LEED Platinum Green Building Certificate",
          category: "CERTIFICATES",
        },
        {
          id: "m-5",
          title: "Berger Paints Brand Logo",
          url: "/images/clients/berger.png",
          altText: "Berger Paints Strategic Partner",
          category: "CLIENT_LOGOS",
        },
      ]);
    } finally {
      setLoading(false);
    }
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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setUploadError(null);
    setAltTextInput(file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));

    const reader = new FileReader();
    reader.onload = (e) => {
      setFilePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setUploadError(null);

    try {
      const res = await api.media.upload(selectedFile, {
        altText: altTextInput,
        category: uploadCategory,
      });

      if (res.data) {
        onSelect({
          url: res.data.url,
          altText: res.data.altText || altTextInput,
          title: res.data.title || selectedFile.name,
        });
        onClose();
      }
    } catch (err: any) {
      setUploadError(err.message || "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirmSelect = () => {
    if (selectedAsset) {
      onSelect({
        url: selectedAsset.url,
        altText: selectedAsset.altText,
        title: selectedAsset.title,
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                Media Asset Manager & Imaple Uploader
              </h2>
              <p className="text-xs text-slate-400">
                Select from reusable repository or upload high-resolution media
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between px-5 pt-3 border-b border-slate-800 bg-slate-950/40">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("library")}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === "library"
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Folder className="w-4 h-4" />
              Media Library ({assets.length})
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === "upload"
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              Imaple Uploader
            </button>
          </div>

          {activeTab === "library" && (
            <button
              onClick={loadAssets}
              disabled={loading}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 pb-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-blue-400" : ""}`} />
              Refresh
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          {activeTab === "library" ? (
            <>
              {/* Main Asset Grid & Filter */}
              <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
                {/* Search & Category Pills */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search assets by name or keyword..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    {CATEGORIES.slice(0, 5).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                          selectedCategory === cat
                            ? "bg-blue-600 text-white"
                            : "bg-slate-800/80 text-slate-400 hover:text-white"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Assets Grid */}
                {loading ? (
                  <div className="h-64 flex flex-col items-center justify-center gap-3 text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
                    <p className="text-xs">Loading media assets...</p>
                  </div>
                ) : filteredAssets.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center gap-3 text-slate-500 border border-dashed border-slate-800 rounded-xl">
                    <ImageIcon className="w-8 h-8 text-slate-600" />
                    <p className="text-xs font-medium">No media assets found</p>
                    <button
                      onClick={() => setActiveTab("upload")}
                      className="text-xs text-blue-400 hover:underline font-bold"
                    >
                      Upload your first file
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {filteredAssets.map((asset) => {
                      const isSelected = selectedAsset?.url === asset.url;
                      return (
                        <div
                          key={asset.id}
                          onClick={() => setSelectedAsset(asset)}
                          className={`group relative rounded-xl border p-2 cursor-pointer transition-all flex flex-col bg-slate-950/60 ${
                            isSelected
                              ? "border-blue-500 ring-2 ring-blue-500/30 bg-blue-950/20"
                              : "border-slate-800 hover:border-slate-700"
                          }`}
                        >
                          {/* Image Box */}
                          <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-slate-900 border border-slate-800/80 flex items-center justify-center">
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
                              <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            )}
                          </div>
                          {/* Asset Name */}
                          <div className="mt-2">
                            <p className="text-xs font-bold text-white truncate">{asset.title}</p>
                            <p className="text-[10px] text-slate-400 truncate mt-0.5">{asset.category || "GENERAL"}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Sidebar Inspector / Confirmation */}
              <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-slate-800 p-4 sm:p-5 bg-slate-950/80 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                    Selected Asset Details
                  </h3>
                  {selectedAsset ? (
                    <div className="space-y-3">
                      <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={selectedAsset.url}
                          alt={selectedAsset.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase font-mono block">Filename</span>
                          <span className="font-bold text-slate-200 break-all">{selectedAsset.title}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase font-mono block">URL Destination</span>
                          <span className="font-mono text-[10px] text-cyan-400 break-all">{selectedAsset.url}</span>
                        </div>
                        {selectedAsset.altText && (
                          <div>
                            <span className="text-[10px] text-slate-500 uppercase font-mono block">Alt Text</span>
                            <span className="text-slate-300">{selectedAsset.altText}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 text-center text-slate-500 text-xs">
                      Select an image from the library to inspect and insert.
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex gap-2">
                  <button
                    onClick={onClose}
                    className="flex-1 py-2 px-3 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!selectedAsset}
                    onClick={handleConfirmSelect}
                    className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/30"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Insert Asset
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Imaple Uploader Tab */
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelected(e.target.files[0]);
                  }
                }}
                className="hidden"
              />

              {!selectedFile ? (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-4 ${
                    dragActive
                      ? "border-blue-500 bg-blue-950/20"
                      : "border-slate-700 bg-slate-950/40 hover:border-slate-600 hover:bg-slate-900/50"
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-600/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Drag & drop image files here</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Supports JPG, PNG, WEBP, SVG up to 15MB with high-fidelity optimization
                    </p>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-md transition-colors"
                  >
                    Browse Files
                  </button>
                </div>
              ) : (
                <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                      {filePreview && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={filePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{selectedFile.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setFilePreview(null);
                        }}
                        className="text-[11px] text-red-400 hover:text-red-300 font-semibold mt-2"
                      >
                        Remove and choose another
                      </button>
                    </div>
                  </div>

                  {uploadError && (
                    <div className="p-3 bg-red-950/50 border border-red-800/80 rounded-xl text-xs text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{uploadError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Descriptive Alt Text (for SEO & Accessibility)
                      </label>
                      <input
                        type="text"
                        value={altTextInput}
                        onChange={(e) => setAltTextInput(e.target.value)}
                        placeholder="e.g. 20L Conical Industrial Drum"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Category Classification
                      </label>
                      <select
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      >
                        {CATEGORIES.filter((c) => c !== "ALL").map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setFilePreview(null);
                      }}
                      className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800"
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={handleUploadSubmit}
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-blue-600/30"
                    >
                      {isUploading ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          Uploading via Imaple...
                        </>
                      ) : (
                        <>
                          <FileCheck className="w-3.5 h-3.5" />
                          Upload & Select
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

