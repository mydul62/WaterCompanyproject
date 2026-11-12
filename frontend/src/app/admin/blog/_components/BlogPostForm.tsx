"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Plus, Trash2, Save } from "lucide-react";
import { api } from "@/lib/api";
import { BLOG_CATEGORIES, BlogPost } from "@/data/blogData";
import ImageFieldWithUpload from "@/components/admin/ImageFieldWithUpload";
import {
  AdminFormHeader,
  AdminErrorBanner,
  AdminEditLoadingState,
  AdminEditNotFoundState,
  AdminToast,
  useAdminToast,
  linesToArray,
  arrayToLines,
} from "@/components/admin/AdminCrudShell";

interface SectionDraft {
  heading: string;
  body: string;
  bulletsText: string;
}

interface BlogFormState {
  title: string;
  slug: string;
  category: string;
  featured: boolean;
  date: string;
  readTime: string;
  coverImage: string;
  excerpt: string;
  intro: string;
  quote: string;
  conclusion: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  tagsText: string;
  sections: SectionDraft[];
  sortOrder: number;
  isActive: boolean;
}

const EMPTY_BLOG_FORM: BlogFormState = {
  title: "",
  slug: "",
  category: "Sustainability & PCR",
  featured: false,
  date: "November 11, 2026",
  readTime: "5 min read",
  coverImage: "/images/rnd/rnd-hero-banner.jpg",
  excerpt: "",
  intro: "",
  quote: "",
  conclusion: "",
  authorName: "Engr. Tanvir Ahmed",
  authorRole: "Lead Materials Scientist & Polymer R&D",
  authorAvatar: "/images/rnd/rnd-cad-design.jpg",
  tagsText: "Polymer Engineering, Noor Plastic",
  sections: [{ heading: "", body: "", bulletsText: "" }],
  sortOrder: 0,
  isActive: true,
};

function postToForm(post: BlogPost): BlogFormState {
  return {
    title: post.title,
    slug: post.slug || "",
    category: post.category,
    featured: Boolean(post.featured),
    date: post.date || "",
    readTime: post.readTime || "5 min read",
    coverImage: post.coverImage || "/images/rnd/rnd-hero-banner.jpg",
    excerpt: post.excerpt || "",
    intro: post.content?.intro || "",
    quote: post.content?.quote || "",
    conclusion: post.content?.conclusion || "",
    authorName: post.author?.name || "Engr. Tanvir Ahmed",
    authorRole: post.author?.role || "Polymer & Packaging R&D",
    authorAvatar: post.author?.avatar || "/images/rnd/rnd-cad-design.jpg",
    tagsText: (post.tags || []).join(", "),
    sections:
      post.content?.sections && post.content.sections.length > 0
        ? post.content.sections.map((s) => ({
            heading: s.heading || "",
            body: s.body || "",
            bulletsText: arrayToLines(s.bullets),
          }))
        : [{ heading: "", body: "", bulletsText: "" }],
    sortOrder: post.sortOrder ?? 0,
    isActive: post.isActive ?? true,
  };
}

export default function BlogPostForm({ mode, postId }: { mode: "create" | "edit"; postId?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<BlogFormState>(EMPTY_BLOG_FORM);
  const [loading, setLoading] = useState(mode === "edit");
  const [notFound, setNotFound] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [storageMode, setStorageMode] = useState<"database" | "fallback">("database");
  const { toast, showToast, clearToast } = useAdminToast();

  useEffect(() => {
    let active = true;

    async function init() {
      if (mode === "create") {
        try {
          const res = await api.blogs.getAll(true);
          if (active && Array.isArray(res.data)) {
            setForm((prev) => ({ ...prev, sortOrder: res.data.length + 1 }));
            setStorageMode("database");
          }
        } catch {
          if (active) {
            setStorageMode("fallback");
          }
        }
        return;
      }

      if (!postId) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      setLoadError(null);
      try {
        const res = await api.blogs.getById(postId);
        if (!active) return;
        if (res?.data) {
          setForm(postToForm(res.data));
          setStorageMode("database");
        } else {
          setNotFound(true);
        }
      } catch (err: any) {
        if (!active) return;
        setStorageMode("fallback");
        if (err?.status === 404 || err?.message?.toLowerCase().includes("not found")) {
          setNotFound(true);
        } else {
          setLoadError(err?.message || "Failed to load blog article from PostgreSQL.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    init();
    return () => {
      active = false;
    };
  }, [mode, postId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast("Article title is required.", "error");
      return;
    }

    setSaving(true);
    const cleanedSections = form.sections
      .filter((s) => s.heading.trim() || s.body.trim())
      .map((s) => ({
        heading: s.heading.trim(),
        body: s.body.trim(),
        bullets: linesToArray(s.bulletsText),
      }));

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim() || undefined,
      category: form.category,
      featured: form.featured,
      date: form.date.trim(),
      readTime: form.readTime.trim(),
      coverImage: form.coverImage.trim() || "/images/rnd/rnd-hero-banner.jpg",
      excerpt: form.excerpt.trim(),
      author: {
        name: form.authorName.trim(),
        role: form.authorRole.trim(),
        avatar: form.authorAvatar.trim() || "/images/rnd/rnd-cad-design.jpg",
      },
      content: {
        intro: form.intro.trim(),
        sections: cleanedSections,
        quote: form.quote.trim() || undefined,
        conclusion: form.conclusion.trim(),
      },
      tags: form.tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      sortOrder: Number(form.sortOrder) || 0,
      isActive: form.isActive,
    };

    try {
      if (mode === "edit" && postId) {
        await api.blogs.update(postId, payload);
      } else {
        await api.blogs.create(payload);
      }
      router.push("/admin/blog");
      router.refresh();
    } catch (err: any) {
      showToast(err?.message || "Failed to save blog post.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full space-y-6 pb-10">
      <AdminFormHeader
        backHref="/admin/blog"
        backLabel="Back to Blog & Materials Insights"
        icon={<BookOpen className="w-6 h-6 text-cyan-400" />}
        title={mode === "edit" ? "Edit Blog Insight" : "Publish New Blog Article"}
        subtitle="Manage article content, multi-section layout, author details & featured whitepaper flag."
        storageMode={storageMode}
      />

      {loading ? (
        <AdminEditLoadingState label="Loading blog article..." />
      ) : loadError ? (
        <AdminErrorBanner error={loadError} />
      ) : notFound ? (
        <AdminEditNotFoundState
          title="Blog Article Not Found"
          description="This article could not be loaded or may have been removed."
          backHref="/admin/blog"
          backLabel="Back to Blog & Insights"
        />
      ) : (
        <form
          onSubmit={handleSave}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Article Title *
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
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                {BLOG_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Publish Date</label>
              <input
                type="text"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Read Time</label>
              <input
                type="text"
                value={form.readTime}
                onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Sort Order</label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
              />
            </div>
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 text-xs font-bold text-amber-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="rounded border-slate-700 bg-slate-950"
                />
                <span>Featured Whitepaper</span>
              </label>
            </div>
          </div>

          <ImageFieldWithUpload
            label="Article Cover Image"
            value={form.coverImage}
            onChange={(url) => setForm({ ...form, coverImage: url })}
            category="GENERAL"
          />

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Short Excerpt (Shown on grid card)
            </label>
            <textarea
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Author Name</label>
              <input
                type="text"
                value={form.authorName}
                onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Author Role</label>
              <input
                type="text"
                value={form.authorRole}
                onChange={(e) => setForm({ ...form, authorRole: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
              />
            </div>
            <div className="md:col-span-2">
              <ImageFieldWithUpload
                label="Author Avatar"
                value={form.authorAvatar}
                onChange={(url) => setForm({ ...form, authorAvatar: url })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Opening Introduction
            </label>
            <textarea
              rows={3}
              value={form.intro}
              onChange={(e) => setForm({ ...form, intro: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
            />
          </div>

          <div className="space-y-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Article Sections ({form.sections.length})
              </span>
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    sections: [...form.sections, { heading: "", body: "", bulletsText: "" }],
                  })
                }
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-white cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Section
              </button>
            </div>

            {form.sections.map((sec, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    placeholder={`Section ${idx + 1} Heading`}
                    value={sec.heading}
                    onChange={(e) => {
                      const next = [...form.sections];
                      next[idx] = { ...next[idx], heading: e.target.value };
                      setForm({ ...form, sections: next });
                    }}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-semibold"
                  />
                  {form.sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          sections: form.sections.filter((_, i) => i !== idx),
                        })
                      }
                      className="p-1.5 text-slate-400 hover:text-red-400 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <textarea
                  rows={2}
                  placeholder="Section body paragraph..."
                  value={sec.body}
                  onChange={(e) => {
                    const next = [...form.sections];
                    next[idx] = { ...next[idx], body: e.target.value };
                    setForm({ ...form, sections: next });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                />
                <textarea
                  rows={2}
                  placeholder="Optional bullet points (one per line)..."
                  value={sec.bulletsText}
                  onChange={(e) => {
                    const next = [...form.sections];
                    next[idx] = { ...next[idx], bulletsText: e.target.value };
                    setForm({ ...form, sections: next });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Pull Quote (Optional)
              </label>
              <input
                type="text"
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Tags (Comma-separated)
              </label>
              <input
                type="text"
                value={form.tagsText}
                onChange={(e) => setForm({ ...form, tagsText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Conclusion</label>
            <textarea
              rows={2}
              value={form.conclusion}
              onChange={(e) => setForm({ ...form, conclusion: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="rounded border-slate-700 bg-slate-950"
              />
              <span>Published on /blog</span>
            </label>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/blog"
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
                <span>{saving ? "Saving..." : mode === "edit" ? "Update Article" : "Save Article"}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      <AdminToast toast={toast} onClose={clearToast} />
    </div>
  );
}

