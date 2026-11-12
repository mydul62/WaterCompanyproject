"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Newspaper,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Quote,
} from "lucide-react";
import { api } from "@/lib/api";
import {
  PressStory,
  normalizePressStory,
} from "@/data/mediaData";
import {
  AdminToast,
  AdminPageHeader,
  AdminErrorBanner,
  AdminSearchToolbar,
  AdminConfirmDeleteModal,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";
import { AdminCardSkeletonItems } from "@/components/common/Skeletons";

export default function AdminMediaPage() {
  const [stories, setStories] = useState<PressStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [storageMode, setStorageMode] = useState<"database" | "fallback">("database");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const { toast, showToast, clearToast } = useAdminToast();

  const loadStories = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await api.mediaStories.getAll(true);
      if (Array.isArray(res.data)) {
        setStories(res.data.map(normalizePressStory));
        setStorageMode("database");
      } else {
        setStories([]);
      }
    } catch (err: any) {
      setStories([]);
      setStorageMode("fallback");
      setLoadError(err?.message || "Failed to load press stories from PostgreSQL.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStories();
  }, [loadStories]);

  const handleToggleActive = async (story: PressStory) => {
    try {
      await api.mediaStories.update(story.id, { isActive: !(story.isActive ?? true) });
      await loadStories();
      showToast(story.isActive === false ? "Story published publicly." : "Story hidden from public site.");
    } catch (err: any) {
      showToast(err?.message || "Failed to update visibility.", "error");
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setSaving(true);
    try {
      await api.mediaStories.delete(confirmDeleteId);
      setConfirmDeleteId(null);
      await loadStories();
      showToast("Press story deleted.");
    } catch (err: any) {
      showToast(err?.message || "Delete failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setSaving(true);
    try {
      await api.mediaStories.reset();
      await loadStories();
      showToast("Default Bangla & English press stories restored.");
    } catch (err: any) {
      showToast(err?.message || "Reset failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  const filtered = stories.filter((s) => {
    const q = search.toLowerCase();
    return (
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.outlet.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full space-y-6">
      <AdminPageHeader
        icon={<Newspaper className="w-6 h-6 text-cyan-400" />}
        title="Press & National Media"
        subtitle="Manage homepage Press Highlights cards, newspaper clippings, full Bangla/English articles & quotes."
        addLabel="Add Press Story"
        addHref="/admin/media/new"
        onRefresh={loadStories}
        onReset={handleReset}
        loading={loading}
        storageMode={storageMode}
      />

      <AdminErrorBanner error={loadError} onRetry={loadStories} />

      <AdminSearchToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search press headline, outlet, or category..."
        totalCount={filtered.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? <AdminCardSkeletonItems count={6} /> : filtered.map((story) => (
          <div
            key={story.id}
            className={`bg-slate-900 border rounded-2xl overflow-hidden flex flex-col justify-between transition-all ${
              story.isActive === false ? "border-slate-800/60 opacity-65" : "border-slate-800 hover:border-slate-700"
            }`}
          >
            <div>
              <div className="relative h-44 bg-slate-950 border-b border-slate-800 overflow-hidden">
                <img
                  src={story.image || "/cropped/news-card-1.png"}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span
                    className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow"
                    style={{ backgroundColor: story.outletColor || "#0284c7" }}
                  >
                    {story.outlet}
                  </span>
                  {story.isActive === false && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/90 text-amber-300 border border-amber-700/50">
                      Hidden
                    </span>
                  )}
                </div>
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-slate-950/85 text-[11px] font-bold text-slate-300 border border-slate-800">
                  Order #{story.sortOrder ?? 0}
                </span>
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                  <span className="text-cyan-400">{story.category}</span>
                  <span>{story.date}</span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug line-clamp-2">
                  {story.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {story.summary}
                </p>
                {story.quote?.text && (
                  <div className="flex items-start gap-2 pt-2 text-[11px] text-slate-400 italic border-t border-slate-800/70">
                    <Quote className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{story.quote.text}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="px-5 py-3.5 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <Link
                  href={`/admin/media/${story.id}/edit`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white"
                >
                  <Pencil className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Edit</span>
                </Link>
                <button
                  type="button"
                  onClick={() => handleToggleActive(story)}
                  title={story.isActive === false ? "Publish" : "Hide"}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                >
                  {story.isActive === false ? (
                    <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href={`/media/${story.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800"
                  title="View Public Story"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setConfirmDeleteId(story.id)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-800 cursor-pointer"
                  title="Delete Story"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdminConfirmDeleteModal
        isOpen={Boolean(confirmDeleteId)}
        title="Delete Press Story?"
        description="This will remove the press coverage entry from the public homepage and /media page."
        onCancel={() => setConfirmDeleteId(null)}
        onConfirm={handleDelete}
        loading={saving}
      />

      <AdminToast toast={toast} onClose={clearToast} />
    </div>
  );
}
