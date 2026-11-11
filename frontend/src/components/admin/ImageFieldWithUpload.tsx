"use client";

import React, { useRef, useState } from "react";
import { Upload, FolderOpen, Loader2, Image as ImageIcon } from "lucide-react";
import { api } from "@/lib/api";
import MediaPickerModal from "./MediaPickerModal";

interface ImageFieldWithUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  category?: string;
  helperText?: string;
}

export default function ImageFieldWithUpload({
  label,
  value,
  onChange,
  placeholder = "/images/... or /uploads/...",
  category = "GENERAL",
  helperText,
}: ImageFieldWithUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      const res = await api.media.upload(file, { category });
      if (res.data?.url) {
        onChange(res.data.url);
      } else {
        setUploadError("Upload completed without image URL.");
      }
    } catch (err: any) {
      setUploadError(err?.message || "Failed to upload image.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-slate-300">{label}</label>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="w-16 h-12 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
          {value ? (
            <img
              src={value}
              alt={label}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <ImageIcon className="w-5 h-5 text-slate-600" />
          )}
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors cursor-pointer disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            ) : (
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
            )}
            <span>{uploading ? "Uploading..." : "Upload"}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPickerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            <FolderOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Library</span>
          </button>
        </div>
      </div>

      {helperText && !uploadError && (
        <p className="text-[11px] text-slate-500">{helperText}</p>
      )}
      {uploadError && (
        <p className="text-[11px] text-red-400 font-medium">{uploadError}</p>
      )}

      <MediaPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        currentValue={value}
        categoryFilter={category}
        onSelect={(asset) => onChange(asset.url)}
      />
    </div>
  );
}

