"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  BookOpen,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Star,
} from "lucide-react";
import { api } from "@/lib/api";
import { BLOG_POSTS, BLOG_CATEGORIES, BlogPost } from "@/data/blogData";
import {
  AdminToast,
  AdminPageHeader,
  AdminSearchToolbar,
  AdminConfirmDeleteModal,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [storageMode, setStorageMode] = useState<"database" | "fallback">("database");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const { toast, showToast, clearToast } = useAdminToast();

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.blogs.getAll(true);
      if (Array.isArray(res.data)) {
        setPosts(res.data);
        setStorageMode("database");
      }
    } catch {
      setPosts(BLOG_POSTS);
      setStorageMode("fallback");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleToggleActive = async (post: BlogPost) => {
    try {
      await api.blogs.update(post.id, { isActive: !(post.isActive ?? true) });
      await loadPosts();
      showToast(post.isActive === false ? "Article published." : "Article hidden.");
    } catch (err: any) {
      showToast(err?.message || "Failed to update status.", "error");
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setSaving(true);
    try {
      await api.blogs.delete(confirmDeleteId);
      setConfirmDeleteId(null);
      await loadPosts();
      showToast("Article deleted.");
    } catch (err: any) {
      showToast(err?.message || "Delete failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setSaving(true);
    try {
      await api.blogs.reset();
      await loadPosts();
      showToast("Blog posts restored to defaults.");
    } catch (err: any) {
      showToast(err?.message || "Reset failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  const filtered = posts.filter((p) => {
    const matchesCat = activeCategory === "ALL" || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.author?.name?.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full space-y-6">
      <AdminPageHeader
        icon={<BookOpen className="w-6 h-6 text-cyan-400" />}
        title="Blog & Materials Insights"
        subtitle="Create, edit, publish, or remove technical blog articles and featured whitepapers shown on /blog."
        addLabel="New Blog Article"
        addHref="/admin/blog/new"
        onRefresh={loadPosts}
        onReset={handleReset}
        loading={loading}
        storageMode={storageMode}
      />

      <AdminSearchToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search article title, author, or excerpt..."
        categories={BLOG_CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        totalCount={filtered.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <div
            key={post.id}
            className={`bg-slate-900 border rounded-2xl overflow-hidden flex flex-col justify-between transition-all ${
              post.isActive === false ? "border-slate-800/60 opacity-65" : "border-slate-800 hover:border-slate-700"
            }`}
          >
            <div>
              <div className="relative h-44 bg-slate-950 border-b border-slate-800 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-cyan-600/90 text-white shadow">
                    {post.category}
                  </span>
                  {post.featured && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                      <Star className="w-3 h-3 fill-current" /> Featured
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/70">
                  <img
                    src={post.author?.avatar || "/images/rnd/rnd-cad-design.jpg"}
                    alt={post.author?.name || "Author"}
                    className="w-6 h-6 rounded-full object-cover border border-slate-700"
                  />
                  <div className="text-[11px] leading-tight">
                    <div className="font-bold text-slate-200">{post.author?.name}</div>
                    <div className="text-slate-500 line-clamp-1">{post.author?.role}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 py-3.5 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/blog/${post.id}/edit`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white"
                >
                  <Pencil className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Edit</span>
                </Link>
                <button
                  type="button"
                  onClick={() => handleToggleActive(post)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer"
                  title={post.isActive === false ? "Publish" : "Hide"}
                >
                  {post.isActive === false ? (
                    <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={() => setConfirmDeleteId(post.id)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-800 cursor-pointer"
                title="Delete Article"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AdminConfirmDeleteModal
        isOpen={Boolean(confirmDeleteId)}
        title="Delete Blog Article?"
        description="This removes the blog insight permanently from SQLite and /blog."
        onCancel={() => setConfirmDeleteId(null)}
        onConfirm={handleDelete}
        loading={saving}
      />

      <AdminToast toast={toast} onClose={clearToast} />
    </div>
  );
}
