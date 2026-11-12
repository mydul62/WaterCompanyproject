"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Tv,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  PlayCircle,
  Settings2,
  Save,
  ChevronDown,
} from "lucide-react";
import { api } from "@/lib/api";
import {
  TvNewsVideoItem,
  TV_NEWS_HERO_IMAGE,
  normalizeTvNewsVideo,
  getYouTubeThumbnailUrl,
} from "@/data/tvNewsData";
import ImageFieldWithUpload from "@/components/admin/ImageFieldWithUpload";
import {
  AdminToast,
  AdminPageHeader,
  AdminErrorBanner,
  AdminSearchToolbar,
  AdminConfirmDeleteModal,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";
import { AdminCardSkeletonItems } from "@/components/common/Skeletons";

export default function AdminTvNewsPage() {
  const [videos, setVideos] = useState<TvNewsVideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [storageMode, setStorageMode] = useState<"database" | "fallback">("database");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Hero Settings Drawer State
  const [showHeroConfig, setShowHeroConfig] = useState(false);
  const [heroTitle, setHeroTitle] = useState("TV News");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Noor Plastic Industries • Broadcast Coverage & Factory Features"
  );
  const [heroImage, setHeroImage] = useState(TV_NEWS_HERO_IMAGE);
  const [savingHero, setSavingHero] = useState(false);

  const { toast, showToast, clearToast } = useAdminToast();

  const loadVideos = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const [videosRes, settingsRes] = await Promise.allSettled([
        api.tvNews.getAll(true),
        api.settings.getMap(),
      ]);

      if (
        videosRes.status === "fulfilled" &&
        Array.isArray(videosRes.value?.data)
      ) {
        setVideos(
          videosRes.value.data.map((row: any, idx: number) =>
            normalizeTvNewsVideo(row, idx)
          )
        );
        setStorageMode("database");
      } else {
        setVideos([]);
        setStorageMode("fallback");
        const reasonMsg =
          videosRes.status === "rejected"
            ? (videosRes.reason as Error)?.message
            : undefined;
        setLoadError(reasonMsg || "Failed to load TV News videos from PostgreSQL.");
      }

      if (settingsRes.status === "fulfilled" && settingsRes.value?.data) {
        const map = settingsRes.value.data;
        if (map.tv_news_hero_title) setHeroTitle(map.tv_news_hero_title);
        if (map.tv_news_hero_subtitle) setHeroSubtitle(map.tv_news_hero_subtitle);
        if (map.tv_news_hero_image) setHeroImage(map.tv_news_hero_image);
      }
    } catch (err: any) {
      setVideos([]);
      setStorageMode("fallback");
      setLoadError(err?.message || "Failed to load TV News videos from PostgreSQL.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  const handleToggleActive = async (video: TvNewsVideoItem) => {
    try {
      await api.tvNews.update(video.id, { isActive: !(video.isActive ?? true) });
      await loadVideos();
      showToast(
        video.isActive === false
          ? "TV News video published to /tv-news."
          : "TV News video hidden from public view."
      );
    } catch (err: any) {
      showToast(err?.message || "Failed to update visibility.", "error");
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setSaving(true);
    try {
      await api.tvNews.delete(confirmDeleteId);
      setConfirmDeleteId(null);
      await loadVideos();
      showToast("TV News video deleted.");
    } catch (err: any) {
      showToast(err?.message || "Failed to delete video.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setSaving(true);
    try {
      await api.tvNews.reset();
      await loadVideos();
      showToast("Default TV News broadcast archive restored.");
    } catch (err: any) {
      showToast(err?.message || "Reset failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingHero(true);
    try {
      await api.settings.updateBatch([
        { key: "tv_news_hero_title", value: heroTitle.trim() || "TV News" },
        { key: "tv_news_hero_subtitle", value: heroSubtitle.trim() },
        {
          key: "tv_news_hero_image",
          value: heroImage.trim() || TV_NEWS_HERO_IMAGE,
        },
      ]);
      showToast("TV News hero banner updated.");
    } catch (err: any) {
      showToast(err?.message || "Failed to update hero banner.", "error");
    } finally {
      setSavingHero(false);
    }
  };

  const filtered = videos.filter((v) => {
    const q = search.trim().toLowerCase();
    return (
      !q ||
      v.title.toLowerCase().includes(q) ||
      v.videoId.toLowerCase().includes(q) ||
      (v.channel || "").toLowerCase().includes(q) ||
      (v.category || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full space-y-6">
      <AdminPageHeader
        icon={<Tv className="w-6 h-6 text-red-400" />}
        title="TV News & YouTube Videos"
        subtitle="Manage embedded YouTube TV reports, factory documentaries & broadcast links displayed on /tv-news."
        addLabel="Add YouTube Video"
        addHref="/admin/tv-news/new"
        onRefresh={loadVideos}
        onReset={handleReset}
        loading={loading}
        storageMode={storageMode}
      />

      <AdminErrorBanner error={loadError} onRetry={loadVideos} />

      {/* Collapsible Hero Banner Config & Live Page Link */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
          <button
            type="button"
            onClick={() => setShowHeroConfig((prev) => !prev)}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-200 hover:text-white cursor-pointer"
          >
            <Settings2 className="w-4 h-4 text-cyan-400" />
            <span>Customize TV News Hero Banner (Heading &amp; Backdrop)</span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${
                showHeroConfig ? "rotate-180" : ""
              }`}
            />
          </button>

          <Link
            href="/tv-news"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
          >
            <span>Open Live /tv-news Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {showHeroConfig && (
          <form
            onSubmit={handleSaveHero}
            className="p-5 pt-4 border-t border-slate-800 space-y-4 bg-slate-950/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Hero Banner Heading
                </label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Hero Eyebrow Subtitle
                </label>
                <input
                  type="text"
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>
            </div>

            <ImageFieldWithUpload
              label="Broadcast Camera Hero Image"
              value={heroImage}
              onChange={setHeroImage}
            />

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={savingHero}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                {savingHero ? "Saving..." : "Save Hero Banner"}
              </button>
            </div>
          </form>
        )}
      </div>

      <AdminSearchToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search video title, YouTube ID, channel, or category..."
        totalCount={filtered.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <AdminCardSkeletonItems count={6} />
        ) : (
          filtered.map((video) => {
            const thumb =
              video.thumbnailUrl || getYouTubeThumbnailUrl(video.videoId, "hq");
            return (
              <div
                key={video.id}
                className={`bg-slate-900 border rounded-2xl overflow-hidden flex flex-col justify-between transition-all ${
                  video.isActive === false
                    ? "border-slate-800/60 opacity-65"
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="relative aspect-video bg-slate-950 border-b border-slate-800 overflow-hidden">
                    <img
                      src={thumb}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-600 text-white shadow">
                        <PlayCircle className="w-3 h-3" />
                        {video.channel || "TV News"}
                      </span>
                      {video.isActive === false && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/90 text-amber-300 border border-amber-700/50">
                          Hidden
                        </span>
                      )}
                    </div>

                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-slate-950/85 text-[11px] font-bold text-slate-300 border border-slate-800">
                      Order #{video.sortOrder ?? 0}
                    </span>

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-slate-200">
                      <span className="px-2 py-0.5 rounded bg-black/75 border border-white/10">
                        ID: {video.videoId}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-black/75 border border-white/10">
                        {video.thumbnailUrl ? "Custom Poster" : "Direct Embed"}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                      <span className="text-cyan-400">{video.category}</span>
                      <span>{video.publishedLabel || "TV Broadcast"}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-2">
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="px-5 py-3.5 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/admin/tv-news/${video.id}/edit`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white"
                    >
                      <Pencil className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Edit</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleToggleActive(video)}
                      title={video.isActive === false ? "Publish" : "Hide"}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                    >
                      {video.isActive === false ? (
                        <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-red-400 border border-slate-800"
                      title="Watch on YouTube"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(video.id)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-800 cursor-pointer"
                      title="Delete Video"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <AdminConfirmDeleteModal
        isOpen={Boolean(confirmDeleteId)}
        title="Delete TV News Video?"
        description="This will remove the YouTube broadcast item from /tv-news and the Admin Dashboard."
        onCancel={() => setConfirmDeleteId(null)}
        onConfirm={handleDelete}
        loading={saving}
      />

      <AdminToast toast={toast} onClose={clearToast} />
    </div>
  );
}

