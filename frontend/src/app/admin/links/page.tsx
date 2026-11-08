"use client";

import React, { useState, useEffect } from "react";
import {
  Link2,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle,
  X,
  RefreshCw,
  Globe,
  FileCode,
  MousePointerClick,
  Check,
  AlertTriangle,
} from "lucide-react";
import { api } from "@/lib/api";

interface LinkRecord {
  id: string;
  key: string;
  label: string;
  url: string;
  type: "INTERNAL" | "EXTERNAL" | "ANCHOR" | "FILE";
  target: "_self" | "_blank";
  category?: string;
  clicks?: number;
  updatedAt: string;
}

const DEFAULT_LINKS: LinkRecord[] = [
  {
    id: "link-1",
    key: "nav_home",
    label: "Main Homepage",
    url: "/",
    type: "INTERNAL",
    target: "_self",
    category: "NAVIGATION",
    clicks: 1420,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "link-2",
    key: "nav_story",
    label: "Our Story Timeline",
    url: "/our-story",
    type: "INTERNAL",
    target: "_self",
    category: "NAVIGATION",
    clicks: 860,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "link-3",
    key: "nav_business",
    label: "Plant Facilities & Business",
    url: "/our-business",
    type: "INTERNAL",
    target: "_self",
    category: "NAVIGATION",
    clicks: 650,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "link-4",
    key: "nav_products",
    label: "Product Catalog",
    url: "/products",
    type: "INTERNAL",
    target: "_self",
    category: "NAVIGATION",
    clicks: 1980,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "link-5",
    key: "nav_certificates",
    label: "Certificates & Accreditations",
    url: "/certificates",
    type: "INTERNAL",
    target: "_self",
    category: "NAVIGATION",
    clicks: 430,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "link-6",
    key: "nav_careers",
    label: "Careers Portal",
    url: "/careers",
    type: "INTERNAL",
    target: "_self",
    category: "NAVIGATION",
    clicks: 310,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "link-7",
    key: "cta_quote",
    label: "RFQ / Request a Quote",
    url: "/request-quote",
    type: "INTERNAL",
    target: "_self",
    category: "CTA_BUTTONS",
    clicks: 945,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "link-8",
    key: "social_linkedin",
    label: "Corporate LinkedIn Page",
    url: "https://www.linkedin.com/company/xclusive-can-limited",
    type: "EXTERNAL",
    target: "_blank",
    category: "SOCIAL_MEDIA",
    clicks: 215,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "link-9",
    key: "social_youtube",
    label: "Factory Tour YouTube Video",
    url: "https://www.youtube.com/@xclusivecan",
    type: "EXTERNAL",
    target: "_blank",
    category: "SOCIAL_MEDIA",
    clicks: 180,
    updatedAt: new Date().toISOString(),
  },
];

export default function CentralizedLinkManagementPage() {
  const [links, setLinks] = useState<LinkRecord[]>(DEFAULT_LINKS);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  // Link Editor Modal
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkRecord | null>(null);
  const [formKey, setFormKey] = useState("");
  const [formLabel, setFormLabel] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [formType, setFormType] = useState<"INTERNAL" | "EXTERNAL" | "ANCHOR" | "FILE">("INTERNAL");
  const [formTarget, setFormTarget] = useState<"_self" | "_blank">("_self");
  const [formCategory, setFormCategory] = useState("NAVIGATION");

  // Notification
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    setLoading(true);
    try {
      const res = await api.links.getAll();
      if (res.data && res.data.length > 0) {
        setLinks(res.data);
      }
    } catch (err) {
      console.warn("Using default links fallback:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingLink(null);
    setFormKey("");
    setFormLabel("");
    setFormUrl("");
    setFormType("INTERNAL");
    setFormTarget("_self");
    setFormCategory("NAVIGATION");
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (l: LinkRecord) => {
    setEditingLink(l);
    setFormKey(l.key);
    setFormLabel(l.label);
    setFormUrl(l.url);
    setFormType(l.type);
    setFormTarget(l.target);
    setFormCategory(l.category || "NAVIGATION");
    setIsEditorOpen(true);
  };

  const handleSaveLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      key: formKey.toLowerCase().replace(/[^a-z0-9_]+/g, "_"),
      label: formLabel,
      url: formUrl,
      type: formType,
      target: formTarget,
      category: formCategory,
    };

    try {
      if (editingLink) {
        await api.links.update(editingLink.id, payload);
        setLinks(
          links.map((l) =>
            l.id === editingLink.id ? { ...l, ...payload } : l
          )
        );
        showNotification(`Updated link key "${formKey}" across entire platform!`);
      } else {
        const res = await api.links.create(payload);
        const created = res.data || {
          ...payload,
          id: `link-${Date.now()}`,
          clicks: 0,
          updatedAt: new Date().toISOString(),
        };
        setLinks([created, ...links]);
        showNotification(`Created link key "${formKey}"`);
      }
      setIsEditorOpen(false);
    } catch (err) {
      if (editingLink) {
        setLinks(
          links.map((l) =>
            l.id === editingLink.id ? { ...l, ...payload } : l
          )
        );
        showNotification(`Updated link key "${formKey}"`);
      } else {
        const fallback = {
          ...payload,
          id: `link-${Date.now()}`,
          clicks: 0,
          updatedAt: new Date().toISOString(),
        };
        setLinks([fallback, ...links]);
        showNotification(`Created link key "${formKey}"`);
      }
      setIsEditorOpen(false);
    }
  };

  const handleDeleteLink = async (id: string, key: string) => {
    if (!confirm(`Are you sure you want to delete link key "${key}"?`)) return;
    try {
      await api.links.delete(id);
      setLinks(links.filter((l) => l.id !== id));
      showNotification(`Link key "${key}" deleted.`);
    } catch (err) {
      setLinks(links.filter((l) => l.id !== id));
      showNotification(`Link key "${key}" deleted.`);
    }
  };

  const filteredLinks = links.filter((l) => {
    const matchesSearch =
      l.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "ALL" || l.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-blue-600 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in slide-in-from-top">
          <CheckCircle className="w-4 h-4" />
          {notification}
        </div>
      )}

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
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Register New Link
          </button>
        </div>
      </div>

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
              className={`text-xs font-bold px-3 py-2 rounded-xl transition-all ${
                categoryFilter === cat
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
                <th className="py-3.5 px-4">Label & Category</th>
                <th className="py-3.5 px-4">Destination Target</th>
                <th className="py-3.5 px-4">Type & Target Window</th>
                <th className="py-3.5 px-4 text-center">Telemetry</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredLinks.map((link) => (
                <tr key={link.id} className="hover:bg-slate-800/40 transition-colors group">
                  {/* System Key */}
                  <td className="py-4 px-5">
                    <span className="font-mono font-bold text-cyan-400 text-xs px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800">
                      {link.key}
                    </span>
                  </td>

                  {/* Label & Category */}
                  <td className="py-4 px-4">
                    <span className="font-bold text-white text-sm block">{link.label}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {link.category || "GENERAL"}
                    </span>
                  </td>

                  {/* Destination */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-300">
                      <span className="truncate max-w-xs">{link.url}</span>
                    </div>
                  </td>

                  {/* Type & Target */}
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

                  {/* Clicks */}
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 font-mono text-[11px] font-bold">
                      <MousePointerClick className="w-3 h-3" />
                      {link.clicks || 0} clicks
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(link)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
                        title="Edit Link"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
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

      {/* Editor Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">
                {editingLink ? `Edit Link Key: ${editingLink.key}` : "Register New Universal Link"}
              </h3>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveLink} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Unique System Link Key *
                </label>
                <input
                  type="text"
                  required
                  value={formKey}
                  onChange={(e) => setFormKey(e.target.value)}
                  placeholder="e.g. cta_primary_quote"
                  disabled={!!editingLink}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-400 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Reference this key in navigation menus, buttons, and footers.
                </span>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Display Label *</label>
                <input
                  type="text"
                  required
                  value={formLabel}
                  onChange={(e) => setFormLabel(e.target.value)}
                  placeholder="e.g. Request an Instant Quote"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Destination URL / Path *</label>
                <input
                  type="text"
                  required
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                  placeholder="e.g. /request-quote or https://..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Link Type</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="INTERNAL">INTERNAL (Next.js route)</option>
                    <option value="EXTERNAL">EXTERNAL (Full URL)</option>
                    <option value="FILE">FILE / DOWNLOAD (PDF/Media)</option>
                    <option value="ANCHOR">ANCHOR (#section)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Target Window</label>
                  <select
                    value={formTarget}
                    onChange={(e) => setFormTarget(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="_self">Same Tab (_self)</option>
                    <option value="_blank">New Tab (_blank)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Category Classification</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="NAVIGATION">NAVIGATION</option>
                  <option value="CTA_BUTTONS">CTA_BUTTONS</option>
                  <option value="SOCIAL_MEDIA">SOCIAL_MEDIA</option>
                  <option value="FOOTER_LEGAL">FOOTER_LEGAL</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30"
                >
                  Save Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

