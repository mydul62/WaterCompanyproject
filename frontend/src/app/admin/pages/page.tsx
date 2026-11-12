"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Layers,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle,
  Clock,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { api } from "@/lib/api";
import type { PageRecord } from "./_components/PageForm";
import {
  AdminErrorBanner,
  AdminToast,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";
import { AdminTableSkeletonRows } from "@/components/common/Skeletons";

export default function PageManagementPage() {
  const [pages, setPages] = useState<PageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const { toast, showToast, clearToast } = useAdminToast();

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await api.pages.getAll();
      setPages(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      setPages([]);
      setLoadError(err?.message || "Unable to load CMS pages from PostgreSQL.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePage = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) return;

    try {
      await api.pages.delete(id);
      setPages((prev) => prev.filter((p) => p.id !== id));
      showToast(`Page "${title}" deleted.`);
    } catch (err: any) {
      showToast(err?.message || `Failed to delete page "${title}".`, "error");
    }
  };

  const filteredPages = pages.filter((page) => {
    const matchesSearch =
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || page.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <AdminToast toast={toast} onClose={clearToast} />

      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">
                Dynamic Page Management &amp; Visual Builder
              </h1>
              <p className="text-xs text-slate-400">
                Design and edit every website page visually with live section controls
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadPages}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Refresh Pages"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-blue-400" : ""}`} />
          </button>

          <Link
            href="/admin/pages/new"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Create New Page
          </Link>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <AdminErrorBanner error={loadError} onRetry={loadPages} />
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pages by title or URL slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {["ALL", "PUBLISHED", "DRAFT"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`text-xs font-bold px-3 py-2 rounded-xl transition-all ${
                statusFilter === status
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
              <tr>
                <th className="py-3.5 px-5">Page Name &amp; Route</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Sections</th>
                <th className="py-3.5 px-4">SEO Title</th>
                <th className="py-3.5 px-4">Last Updated</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {loading ? <AdminTableSkeletonRows rows={6} columns={6} /> : filteredPages.map((page) => {
                const sectionCount = page._count?.sections ?? page.sections?.length ?? 4;
                const isHome = page.slug === "/" || page.slug === "";

                return (
                  <tr key={page.id} className="hover:bg-slate-800/40 transition-colors group">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/40 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                          {page.title.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                              {page.title}
                            </span>
                            {isHome && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-500/10 border border-amber-500/30 text-amber-300">
                                Frontpage
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-mono text-cyan-400">{page.slug}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      {page.status === "PUBLISHED" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 border border-emerald-800/60 text-emerald-300">
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-950 border border-amber-800/60 text-amber-300">
                          <Clock className="w-3 h-3 text-amber-400" />
                          Draft Mode
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 font-bold">
                        {sectionCount} Blocks
                      </span>
                    </td>

                    <td className="py-4 px-4 text-slate-400 max-w-xs truncate">
                      {page.metaTitle || "Default Site SEO"}
                    </td>

                    <td className="py-4 px-4 text-slate-400 font-mono text-[11px]">
                      {new Date(page.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/pages/${page.id}/builder`}
                          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm transition-all"
                          title="Open Visual Drag & Drop Builder"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                          Visual Builder
                        </Link>

                        <Link
                          href={`/admin/pages/${page.id}/edit`}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
                          title="Edit Page Settings & SEO"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>

                        <Link
                          href={page.slug}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="View Live Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        {!isHome && (
                          <button
                            onClick={() => handleDeletePage(page.id, page.title)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 hover:text-red-400 text-slate-400 transition-colors"
                            title="Delete Page"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
