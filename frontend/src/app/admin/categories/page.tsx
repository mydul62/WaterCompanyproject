"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Tags,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { api } from "@/lib/api";
import type { CategoryItem } from "./_components/CategoryForm";
import {
  AdminErrorBanner,
  AdminToast,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";
import { AdminCardSkeletonItems } from "@/components/common/Skeletons";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast, showToast, clearToast } = useAdminToast();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await api.categories.getAll();
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      setCategories([]);
      setLoadError(err?.message || "Unable to load categories from PostgreSQL.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;
    try {
      await api.categories.delete(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      showToast(`Category "${name}" deleted.`);
    } catch (err: any) {
      showToast(err?.message || `Failed to delete category "${name}".`, "error");
    }
  };

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <AdminToast toast={toast} onClose={clearToast} />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <Tags className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">
              Product Categories &amp; Taxonomies
            </h1>
            <p className="text-xs text-slate-400">
              Organize packaging lines across metal drums, plastic bottles, paint cans, and pails
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadCategories}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-blue-400" : ""}`} />
          </button>
          <Link
            href="/admin/categories/new"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            New Category
          </Link>
        </div>
      </div>

      {/* Search */}
      <AdminErrorBanner error={loadError} onRetry={loadCategories} />
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search categories by name or slug..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? <AdminCardSkeletonItems count={6} /> : filteredCategories.map((cat) => (
          <div
            key={cat.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image || "/images/catalog/cat-prod-1.png"}
                    alt={cat.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 font-mono text-[10px] font-bold">
                  {cat._count?.products ?? 0} Products
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{cat.name}</h3>
                <span className="text-[11px] font-mono text-cyan-400 block mt-0.5">
                  slug: /{cat.slug}
                </span>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  {cat.description || "No description provided."}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">
                Sort Order: #{cat.sortOrder ?? (cat as any).order ?? 1}
              </span>
              <div className="flex items-center gap-1.5">
                <Link
                  href={`/admin/categories/${cat.id}/edit`}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
                  title="Edit Category"
                >
                  <Edit className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => handleDeleteCategory(cat.id, cat.name)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 hover:text-red-400 text-slate-400 transition-colors"
                  title="Delete Category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
