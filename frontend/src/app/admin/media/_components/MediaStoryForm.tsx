"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Newspaper, Save } from "lucide-react";
import { api } from "@/lib/api";
import { PRESS_STORIES, normalizePressStory } from "@/data/mediaData";
import ImageFieldWithUpload from "@/components/admin/ImageFieldWithUpload";
import {
  AdminFormHeader,
  AdminEditLoadingState,
  AdminEditNotFoundState,
  AdminToast,
  useAdminToast,
  linesToArray,
  arrayToLines,
} from "@/components/admin/AdminCrudShell";

const OUTLET_PRESETS = [
  { name: "Prothom Alo", color: "#d9232a" },
  { name: "The Daily Star", color: "#0284c7" },
  { name: "Samakal", color: "#16a34a" },
  { name: "Bonik Barta", color: "#ea580c" },
];

interface StoryFormState {
  title: string;
  banglaTitle: string;
  outlet: string;
  outletColor: string;
  dateLabel: string;
  category: string;
  readTime: string;
  clippingUrl: string;
  summary: string;
  fullArticleText: string;
  keyHighlightsText: string;
  highlightQuote: string;
  quoteAuthor: string;
  quoteRole: string;
  originalSourceUrl: string;
  tag: string;
  sortOrder: number;
  isActive: boolean;
}

const EMPTY_FORM: StoryFormState = {
  title: "",
  banglaTitle: "",
  outlet: "Prothom Alo",
  outletColor: "#d9232a",
  dateLabel: "",
  category: "উদ্যোক্তা ও বাণিজ্য",
  readTime: "৩ মিনিট পাঠ",
  clippingUrl: "/cropped/news-card-1.png",
  summary: "",
  fullArticleText: "",
  keyHighlightsText: "",
  highlightQuote: "",
  quoteAuthor: "নূরুল ইসলাম",
  quoteRole: "স্বত্বাধিকারী, নূর প্লাস্টিক ইন্ডাস্ট্রিজ",
  originalSourceUrl: "",
  tag: "Industrial Milestone",
  sortOrder: 0,
  isActive: true,
};

interface MediaStoryFormProps {
  mode: "create" | "edit";
  storyId?: string;
}

export default function MediaStoryForm({ mode, storyId }: MediaStoryFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<StoryFormState>(EMPTY_FORM);
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
          const res = await api.mediaStories.getAll(true);
          if (active && Array.isArray(res.data)) {
            setForm((prev) => ({ ...prev, sortOrder: res.data.length + 1 }));
            setStorageMode("database");
          }
        } catch {
          if (active) {
            setForm((prev) => ({ ...prev, sortOrder: PRESS_STORIES.length + 1 }));
            setStorageMode("fallback");
          }
        }
        return;
      }

      if (!storyId) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await api.mediaStories.getById(storyId);
        if (!active) return;
        if (res?.data) {
          const story = normalizePressStory(res.data);
          setForm({
            title: story.title,
            banglaTitle: story.englishTitle || story.banglaTitle || "",
            outlet: story.outlet,
            outletColor: story.outletColor || "#0284c7",
            dateLabel: story.date || story.dateLabel || "",
            category: story.category || "উদ্যোক্তা ও বাণিজ্য",
            readTime: story.readTime || "৩ মিনিট পাঠ",
            clippingUrl: story.image || story.clippingUrl || "/cropped/news-card-1.png",
            summary: story.summary || "",
            fullArticleText: arrayToLines(story.fullArticle),
            keyHighlightsText: arrayToLines(story.keyHighlights),
            highlightQuote: story.quote?.text || "",
            quoteAuthor: story.quote?.author || "",
            quoteRole: story.quote?.role || "",
            originalSourceUrl: story.originalSourceUrl || "",
            tag: story.tag || "Industrial Milestone",
            sortOrder: story.sortOrder ?? 0,
            isActive: story.isActive ?? true,
          });
          setStorageMode("database");
        } else {
          setNotFound(true);
        }
      } catch {
        const fallback = PRESS_STORIES.find((s) => s.id === storyId || s.slug === storyId);
        if (fallback && active) {
          const story = normalizePressStory(fallback);
          setForm({
            title: story.title,
            banglaTitle: story.englishTitle || story.banglaTitle || "",
            outlet: story.outlet,
            outletColor: story.outletColor || "#0284c7",
            dateLabel: story.date || story.dateLabel || "",
            category: story.category || "উদ্যোক্তা ও বাণিজ্য",
            readTime: story.readTime || "৩ মিনিট পাঠ",
            clippingUrl: story.image || story.clippingUrl || "/cropped/news-card-1.png",
            summary: story.summary || "",
            fullArticleText: arrayToLines(story.fullArticle),
            keyHighlightsText: arrayToLines(story.keyHighlights),
            highlightQuote: story.quote?.text || "",
            quoteAuthor: story.quote?.author || "",
            quoteRole: story.quote?.role || "",
            originalSourceUrl: story.originalSourceUrl || "",
            tag: story.tag || "Industrial Milestone",
            sortOrder: story.sortOrder ?? 0,
            isActive: story.isActive ?? true,
          });
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
  }, [mode, storyId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.outlet.trim()) {
      showToast("Title and Newspaper Outlet are required.", "error");
      return;
    }

    setSaving(true);
    const payload = {
      title: form.title.trim(),
      banglaTitle: form.banglaTitle.trim() || form.title.trim(),
      newspaper: form.outlet.trim(),
      outletColor: form.outletColor.trim() || "#0284c7",
      dateLabel: form.dateLabel.trim(),
      category: form.category.trim(),
      readTime: form.readTime.trim(),
      clippingUrl: form.clippingUrl.trim() || "/cropped/news-card-1.png",
      summary: form.summary.trim(),
      fullArticle: linesToArray(form.fullArticleText),
      keyHighlights: linesToArray(form.keyHighlightsText),
      highlightQuote: form.highlightQuote.trim(),
      quoteAuthor: form.quoteAuthor.trim(),
      quoteRole: form.quoteRole.trim(),
      originalSourceUrl: form.originalSourceUrl.trim(),
      tag: form.tag.trim() || "Industrial Milestone",
      sortOrder: Number(form.sortOrder) || 0,
      isActive: form.isActive,
    };

    try {
      if (mode === "edit" && storyId) {
        await api.mediaStories.update(storyId, payload);
      } else {
        await api.mediaStories.create(payload);
      }
      router.push("/admin/media");
      router.refresh();
    } catch (err: any) {
      showToast(err?.message || "Failed to save press story.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full space-y-6 pb-10">
      <AdminFormHeader
        backHref="/admin/media"
        backLabel="Back to Press & National Media"
        icon={<Newspaper className="w-6 h-6 text-cyan-400" />}
        title={mode === "edit" ? "Edit Press Coverage" : "Add New Press Coverage"}
        subtitle="Configure headline metadata, newspaper clipping image, full article body & featured quote."
        storageMode={storageMode}
      />

      {loading ? (
        <AdminEditLoadingState label="Loading press coverage details..." />
      ) : notFound ? (
        <AdminEditNotFoundState
          title="Press Story Not Found"
          description="This press coverage record does not exist or could not be loaded from the backend."
          backHref="/admin/media"
          backLabel="Back to Press & Media"
        />
      ) : (
        <form
          onSubmit={handleSave}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Headline Title *
              </label>
              <input
                required
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Subheadline / English Title
              </label>
              <input
                type="text"
                value={form.banglaTitle}
                onChange={(e) => setForm({ ...form, banglaTitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Newspaper / Outlet *
              </label>
              <input
                required
                type="text"
                value={form.outlet}
                onChange={(e) => {
                  const val = e.target.value;
                  const preset = OUTLET_PRESETS.find((p) => p.name === val);
                  setForm({
                    ...form,
                    outlet: val,
                    outletColor: preset ? preset.color : form.outletColor,
                  });
                }}
                list="press-outlet-list"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
              <datalist id="press-outlet-list">
                {OUTLET_PRESETS.map((p) => (
                  <option key={p.name} value={p.name} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Badge Color (Hex)
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={form.outletColor}
                  onChange={(e) => setForm({ ...form, outletColor: e.target.value })}
                  className="w-11 h-10 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer"
                />
                <input
                  type="text"
                  value={form.outletColor}
                  onChange={(e) => setForm({ ...form, outletColor: e.target.value })}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Publish Date Label
              </label>
              <input
                type="text"
                value={form.dateLabel}
                onChange={(e) => setForm({ ...form, dateLabel: e.target.value })}
                placeholder="e.g. ১৪ অক্টোবর ২০২৫"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Category</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Read Time</label>
              <input
                type="text"
                value={form.readTime}
                onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Sort Order</label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <ImageFieldWithUpload
            label="Newspaper Clipping / Thumbnail Image"
            value={form.clippingUrl}
            onChange={(url) => setForm({ ...form, clippingUrl: url })}
            category="GENERAL"
            helperText="Upload a news clipping image or select an existing visual from Media Library."
          />

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Card Summary *
            </label>
            <textarea
              rows={2}
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Full Article Paragraphs (One paragraph per line)
            </label>
            <textarea
              rows={5}
              value={form.fullArticleText}
              onChange={(e) => setForm({ ...form, fullArticleText: e.target.value })}
              placeholder="Enter each article paragraph on a new line..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Key Highlights (One bullet per line)
            </label>
            <textarea
              rows={3}
              value={form.keyHighlightsText}
              onChange={(e) => setForm({ ...form, keyHighlightsText: e.target.value })}
              placeholder="Enter each bullet point on a new line..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Highlight Quote
              </label>
              <input
                type="text"
                value={form.highlightQuote}
                onChange={(e) => setForm({ ...form, highlightQuote: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Quote Author</label>
              <input
                type="text"
                value={form.quoteAuthor}
                onChange={(e) => setForm({ ...form, quoteAuthor: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Author Role</label>
              <input
                type="text"
                value={form.quoteRole}
                onChange={(e) => setForm({ ...form, quoteRole: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Original Article URL
              </label>
              <input
                type="text"
                value={form.originalSourceUrl}
                onChange={(e) => setForm({ ...form, originalSourceUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="rounded border-slate-700 bg-slate-950 text-cyan-500"
              />
              <span>Visible on public homepage &amp; /media page</span>
            </label>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/media"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold cursor-pointer disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Saving..." : mode === "edit" ? "Update Story" : "Create Story"}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      <AdminToast toast={toast} onClose={clearToast} />
    </div>
  );
}

