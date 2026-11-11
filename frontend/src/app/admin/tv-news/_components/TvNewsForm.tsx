"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Tv, Save, PlayCircle, CheckCircle2, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";
import {
  TvNewsVideoItem,
  DEFAULT_TV_NEWS_VIDEOS,
  TV_NEWS_CATEGORY_OPTIONS,
  extractYouTubeVideoId,
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
  normalizeTvNewsVideo,
} from "@/data/tvNewsData";
import ImageFieldWithUpload from "@/components/admin/ImageFieldWithUpload";
import {
  AdminFormHeader,
  AdminEditLoadingState,
  AdminEditNotFoundState,
  AdminToast,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";

interface TvNewsFormState {
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  channel: string;
  category: string;
  publishedLabel: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
}

const EMPTY_FORM: TvNewsFormState = {
  title: "",
  youtubeUrl: "",
  thumbnailUrl: "",
  channel: "Independent TV",
  category: "TV Broadcast",
  publishedLabel: "2026",
  description: "",
  sortOrder: 0,
  isActive: true,
};

function videoToForm(video: TvNewsVideoItem): TvNewsFormState {
  return {
    title: video.title,
    youtubeUrl: video.youtubeUrl,
    thumbnailUrl: video.thumbnailUrl || "",
    channel: video.channel || "TV News",
    category: video.category || "TV Broadcast",
    publishedLabel: video.publishedLabel || "",
    description: video.description || "",
    sortOrder: video.sortOrder ?? 0,
    isActive: video.isActive ?? true,
  };
}

export default function TvNewsForm({
  mode,
  videoRecordId,
}: {
  mode: "create" | "edit";
  videoRecordId?: string;
}) {
  const router = useRouter();
  const [form, setForm] = useState<TvNewsFormState>(EMPTY_FORM);
  const [loading, setLoading] = useState(mode === "edit");
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [storageMode, setStorageMode] = useState<"database" | "fallback">("database");
  const { toast, showToast, clearToast } = useAdminToast();

  useEffect(() => {
    let active = true;

    async function init() {
      if (mode === "create") {
        try {
          const res = await api.tvNews.getAll(true);
          if (active && Array.isArray(res.data)) {
            setForm((prev) => ({ ...prev, sortOrder: res.data.length + 1 }));
            setStorageMode("database");
          }
        } catch {
          if (active) {
            setForm((prev) => ({
              ...prev,
              sortOrder: DEFAULT_TV_NEWS_VIDEOS.length + 1,
            }));
            setStorageMode("fallback");
          }
        }
        return;
      }

      if (!videoRecordId) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await api.tvNews.getById(videoRecordId);
        if (!active) return;
        if (res?.data) {
          setForm(videoToForm(normalizeTvNewsVideo(res.data)));
          setStorageMode("database");
        } else {
          setNotFound(true);
        }
      } catch {
        const fallback = DEFAULT_TV_NEWS_VIDEOS.find((v) => v.id === videoRecordId);
        if (fallback && active) {
          setForm(videoToForm(fallback));
          setStorageMode("fallback");
        } else if (active) {
          setNotFound(true);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    init();
    return () => {
      active = false;
    };
  }, [mode, videoRecordId]);

  const parsedVideoId = useMemo(
    () => extractYouTubeVideoId(form.youtubeUrl),
    [form.youtubeUrl]
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast("Please enter the TV News video title.", "error");
      return;
    }
    if (!parsedVideoId) {
      showToast(
        "Please paste a valid YouTube link, video ID, or YouTube <iframe> embed code.",
        "error"
      );
      return;
    }

    setSaving(true);
    const payload = {
      title: form.title.trim(),
      youtubeUrl: form.youtubeUrl.trim(),
      videoId: parsedVideoId,
      embedUrl: getYouTubeEmbedUrl(parsedVideoId, false),
      thumbnailUrl: form.thumbnailUrl.trim(),
      channel: form.channel.trim() || "TV News",
      category: form.category,
      publishedLabel: form.publishedLabel.trim(),
      description: form.description.trim(),
      sortOrder: Number(form.sortOrder) || 0,
      isActive: form.isActive,
    };

    try {
      if (mode === "edit" && videoRecordId) {
        await api.tvNews.update(videoRecordId, payload);
      } else {
        await api.tvNews.create(payload);
      }
      router.push("/admin/tv-news");
      router.refresh();
    } catch (err: any) {
      showToast(err?.message || "Failed to save TV News video.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full space-y-6 pb-10">
      <AdminFormHeader
        backHref="/admin/tv-news"
        backLabel="Back to TV News & YouTube Videos"
        icon={<Tv className="w-6 h-6 text-red-400" />}
        title={mode === "edit" ? "Edit TV News Video" : "Add YouTube TV News Video"}
        subtitle="Paste any YouTube watch URL, share link, Shorts URL, or <iframe> embed snippet — live embed preview is generated automatically."
        storageMode={storageMode}
      />

      {loading ? (
        <AdminEditLoadingState label="Loading TV News video details..." />
      ) : notFound ? (
        <AdminEditNotFoundState
          title="TV News Video Not Found"
          description="This video record could not be loaded or may have been deleted."
          backHref="/admin/tv-news"
          backLabel="Back to TV News"
        />
      ) : (
        <form
          onSubmit={handleSave}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
        >
          {/* Left 2 Columns: Video Metadata & YouTube URL Input */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                YouTube Link or &lt;iframe&gt; Embed Code *
              </label>
              <div className="relative">
                <PlayCircle className="w-4 h-4 text-red-400 absolute left-3.5 top-3" />
                <textarea
                  required
                  rows={2}
                  value={form.youtubeUrl}
                  onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                  placeholder='Paste e.g. https://www.youtube.com/watch?v=... or https://youtu.be/... or <iframe src="https://www.youtube.com/embed/..."></iframe>'
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs font-mono text-cyan-300 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                {parsedVideoId ? (
                  <>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      Extracted Video ID: <code className="font-mono">{parsedVideoId}</code>
                    </span>
                    <span className="text-slate-400 font-mono truncate max-w-md">
                      {getYouTubeEmbedUrl(parsedVideoId, false)}
                    </span>
                  </>
                ) : form.youtubeUrl.trim() ? (
                  <span className="inline-flex items-center gap-1 text-rose-400 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Could not detect a valid 11-character YouTube video ID from this input.
                  </span>
                ) : (
                  <span className="text-slate-500">
                    Supports youtube.com/watch?v=, youtu.be/, /shorts/, /live/, /embed/, or pasted &lt;iframe&gt; HTML.
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Video Title (English or Bangla) *
              </label>
              <input
                required
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. পরিবেশবান্ধব কারখানার জন্য গ্রিন সনদ পেল নূর প্লাস্টিক | Independent TV"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  TV Channel / Source
                </label>
                <input
                  type="text"
                  value={form.channel}
                  onChange={(e) => setForm({ ...form, channel: e.target.value })}
                  placeholder="e.g. Channel I / Independent TV"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
                >
                  {TV_NEWS_CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Year / Broadcast Date
                </label>
                <input
                  type="text"
                  value={form.publishedLabel}
                  onChange={(e) =>
                    setForm({ ...form, publishedLabel: e.target.value })
                  }
                  placeholder="e.g. 2026"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
                />
              </div>
            </div>

            <ImageFieldWithUpload
              label="Custom Thumbnail Poster (Optional)"
              value={form.thumbnailUrl}
              onChange={(url) => setForm({ ...form, thumbnailUrl: url })}
              placeholder="Leave blank to render live YouTube embed directly on /tv-news"
              helperText="Blank = displays live YouTube embed player directly. Set a custom image URL only if you prefer a poster cover before click."
            />

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Short Broadcast Notes (Shown inside Theater View)
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief summary of the TV feature or documentary..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Display Order
                </label>
                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) =>
                    setForm({ ...form, sortOrder: Number(e.target.value) })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
                />
              </div>

              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer self-end">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="w-4 h-4 accent-emerald-500"
                />
                <span className="text-xs font-bold text-slate-200">
                  Publish publicly on /tv-news
                </span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => router.push("/admin/tv-news")}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-xs font-bold text-white shadow-lg shadow-blue-600/25 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {saving
                  ? "Saving..."
                  : mode === "edit"
                  ? "Update TV News Video"
                  : "Save & Publish Video"}
              </button>
            </div>
          </div>

          {/* Right Column: Live YouTube Embed Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-2.5">
              Live Storefront Preview
            </h2>

            {parsedVideoId ? (
              <div className="space-y-3">
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-700">
                  <iframe
                    src={getYouTubeEmbedUrl(parsedVideoId, false)}
                    title={form.title || "YouTube Preview"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white leading-snug">
                    {form.title || "Untitled TV News Feature"}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {form.channel || "TV News"}
                    {form.publishedLabel ? ` • ${form.publishedLabel}` : ""}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Resolved Poster Thumbnail
                  </span>
                  <img
                    src={
                      form.thumbnailUrl.trim() ||
                      getYouTubeThumbnailUrl(parsedVideoId, "hq")
                    }
                    alt="Thumbnail preview"
                    className="w-full aspect-video object-cover rounded-lg border border-slate-800"
                  />
                </div>
              </div>
            ) : (
              <div className="aspect-video rounded-xl bg-slate-950 border border-dashed border-slate-800 flex flex-col items-center justify-center p-6 text-center space-y-2">
                <PlayCircle className="w-8 h-8 text-slate-600" />
                <p className="text-xs font-semibold text-slate-400">
                  Paste any YouTube link on the left to preview the embedded player here
                </p>
              </div>
            )}
          </div>
        </form>
      )}

      <AdminToast toast={toast} onClose={clearToast} />
    </div>
  );
}
