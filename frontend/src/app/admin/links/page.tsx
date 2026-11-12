"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Link2,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle,
  RefreshCw,
  MousePointerClick,
} from "lucide-react";
import { api } from "@/lib/api";
import type { LinkRecord } from "./_components/LinkForm";
import {
  AdminErrorBanner,
  AdminToast,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";
import { AdminTableSkeletonRows } from "@/components/common/Skeletons";

export default function CentralizedLinkManagementPage() {
  const [links, setLinks] = useState<LinkRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const { toast, showToast, clearToast } = useAdminToast();

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await api.links.getAll();
      setLinks(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      setLinks([]);
      setLoadError(err?.message || "Unable to load centralized links from PostgreSQL.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLink = async (id: string, key: string) => {
    if (!confirm(`Are you sure you want to delete link key "${key}"?`)) return;
    try {
      await api.links.delete(id);
      setLinks((prev) => prev.filter((l) => l.id !== id));
      showToast(`Link key "${key}" deleted.`);
    } catch (err: any) {
      showToast(err?.message || `Failed to delete link key "${key}".`, "error");
    }
  };

  const filteredLinks = links.filter((l) => {
    const matchesSearch =
      l.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "ALL" || l.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <AdminToast toast={toast} onClose={clearToast} />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <Link2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">
              Centralized Universal Link Registry
            </h1>
            <p className="text-xs text-slate-400">
              Manage destination URLs centrally. Updating a link here instantly updates all menus, CTAs, and footers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadLinks}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-blue-400" : ""}`} />
          </button>
          <Link
            href="/admin/links/new"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Register New Link
          </Link>
        </div>
      </div>

      <AdminErrorBanner error={loadError} onRetry={loadLinks} />

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search links by key, label, or URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {["ALL", "NAVIGATION", "CTA_BUTTONS", "SOCIAL_MEDIA"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`text-xs font-bold px-3 py-2 rounded-xl transition-all ${categoryFilter === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
            >
              {cat.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Links Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
              <tr>
                <th className="py-3.5 px-5">System Link Key</th>
                <th className="py-3.5 px-4">Label &amp; Category</th>
                <th className="py-3.5 px-4">Destination Target</th>
                <th className="py-3.5 px-4">Type &amp; Target Window</th>
                <th className="py-3.5 px-4 text-center">Telemetry</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {loading ? <AdminTableSkeletonRows rows={6} columns={6} /> : filteredLinks.map((link) => (
                <tr key={link.id} className="hover:bg-slate-800/40 transition-colors group">
                  <td className="py-4 px-5">
                    <span className="font-mono font-bold text-cyan-400 text-xs px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800">
                      {link.key}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-bold text-white text-sm block">{link.label}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {link.category || "GENERAL"}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-300">
                      <span className="truncate max-w-xs">{link.url}</span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950 border border-slate-800 text-slate-300">
                        {link.type}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-500">
                        {link.target === "_blank" ? "New Tab (_blank)" : "Same Tab (_self)"}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 font-mono text-[11px] font-bold">
                      <MousePointerClick className="w-3 h-3" />
                      {link.clicks || 0} clicks
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/links/${link.id}/edit`}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
                        title="Edit Link"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      <a
                        href={link.url}
                        target={link.target}
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Test Destination"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleDeleteLink(link.id, link.key)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 hover:text-red-400 text-slate-400 transition-colors"
                        title="Delete Link"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
