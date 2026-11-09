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
  Eye,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Copy,
  Settings as SettingsIcon,
  RefreshCw,
  X,
  FileCode,
} from "lucide-react";
import { api } from "@/lib/api";

interface PageRecord {
  id: string;
  title: string;
  slug: string;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  metaTitle?: string;
  metaDescription?: string;
  updatedAt: string;
  sections?: any[];
  _count?: {
    sections: number;
    revisions: number;
  };
}

const DEFAULT_PAGES: PageRecord[] = [
  {
    id: "page-home",
    title: "Home",
    slug: "/",
    status: "PUBLISHED",
    metaTitle: "Xclusive Can Limited & Q Pail - Sustainable Packaging Leader",
    metaDescription: "Pioneering sustainable metal & rigid plastic packaging since 1992.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 6, revisions: 4 },
  },
  {
    id: "page-story",
    title: "Our Story",
    slug: "/our-story",
    status: "PUBLISHED",
    metaTitle: "Our Journey Since 1992 - Xclusive Can Limited",
    metaDescription: "Over three decades of precision packaging engineering and green manufacturing.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 5, revisions: 3 },
  },
  {
    id: "page-business",
    title: "Our Business & Plants",
    slug: "/our-business",
    status: "PUBLISHED",
    metaTitle: "Advanced Manufacturing Plants - Gazipur & Tongi",
    metaDescription: "High-speed automated production lines with European robotic technology.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 4, revisions: 2 },
  },
  {
    id: "page-products",
    title: "Product Catalog",
    slug: "/products",
    status: "PUBLISHED",
    metaTitle: "Industrial & Food Grade Can Packaging Solutions",
    metaDescription: "Explore our comprehensive range of UN-certified drums and food pails.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 4, revisions: 1 },
  },
  {
    id: "page-certificates",
    title: "Certificates & Accreditations",
    slug: "/certificates",
    status: "PUBLISHED",
    metaTitle: "LEED Platinum, ISO 9001:2015 & FSSC 22000 Certifications",
    metaDescription: "World-class compliance, quality assurance, and environmental standards.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 4, revisions: 2 },
  },
  {
    id: "page-careers",
    title: "Careers & Culture",
    slug: "/careers",
    status: "PUBLISHED",
    metaTitle: "Join Our Engineering Team - Xclusive Can",
    metaDescription: "Build your career with Bangladesh's premier packaging innovator.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 4, revisions: 2 },
  },
  {
    id: "page-brands",
    title: "Brands We Work With",
    slug: "/brands-we-work-with",
    status: "PUBLISHED",
    metaTitle: "Trusted by Industry Leaders Across Bangladesh",
    metaDescription: "Partnership with Berger, Asian Paints, Unilever, Square, and Marico.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 3, revisions: 1 },
  },
  {
    id: "page-media",
    title: "Press & Media",
    slug: "/media",
    status: "PUBLISHED",
    metaTitle: "Latest News & Corporate Announcements",
    metaDescription: "Press releases, achievements, and trade exhibitions.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 3, revisions: 1 },
  },
  {
    id: "page-rnd",
    title: "Research & Development (R&D)",
    slug: "/rnd",
    status: "PUBLISHED",
    metaTitle: "Research & Development - Xclusive Can Ltd.",
    metaDescription: "Pioneering sustainable barrier polymers and micron-precision mold engineering.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 6, revisions: 2 },
  },
  {
    id: "page-tool-room",
    title: "Tool Room Facility",
    slug: "/tool-room",
    status: "PUBLISHED",
    metaTitle: "Precision Tool Room Facility - Xclusive Can Ltd.",
    metaDescription: "High-speed CNC milling, wire EDM machines, surface grinders, and multi-cavity molds.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 4, revisions: 1 },
  },
  {
    id: "page-faqs",
    title: "FAQs (Frequently Asked Questions)",
    slug: "/faqs",
    status: "PUBLISHED",
    metaTitle: "Frequently Asked Questions - Xclusive Can Ltd.",
    metaDescription: "Answers regarding MOQs, custom CNC tooling, lead times, and international regulatory compliance.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 4, revisions: 1 },
  },
  {
    id: "page-case-studies",
    title: "Case Studies & Client Impact",
    slug: "/case-studies",
    status: "PUBLISHED",
    metaTitle: "Industrial Packaging Case Studies - Xclusive Can Ltd.",
    metaDescription: "Real-world engineering impact across paints, pharma, chemicals, and FMCG sectors.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 4, revisions: 1 },
  },
  {
    id: "page-blog",
    title: "Blog & Technical Insights",
    slug: "/blog",
    status: "PUBLISHED",
    metaTitle: "Engineering Whitepapers & Insights - Xclusive Can Ltd.",
    metaDescription: "Technical whitepapers on circular polymers, high-speed tin welding, and green manufacturing.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 4, revisions: 1 },
  },
  {
    id: "page-q-pail",
    title: "Q Pail - Industrial Packaging Division",
    slug: "/q-pail",
    status: "PUBLISHED",
    metaTitle: "Q Pail Limited | Industrial Injection Molded Pails & Drums",
    metaDescription: "Heavy-duty plastic pails and airtight containers for paints, chemicals, and lubricants.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 5, revisions: 2 },
  },
  {
    id: "page-request-quote",
    title: "Request a Quote (RFQ)",
    slug: "/request-quote",
    status: "PUBLISHED",
    metaTitle: "Request an Engineered Container Quote | Fast SLA",
    metaDescription: "Custom tin can, aerosol, and plastic pail quotations delivered within 24 hours.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 4, revisions: 1 },
  },
];

export default function PageManagementPage() {
  const [pages, setPages] = useState<PageRecord[]>(DEFAULT_PAGES);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Create Page Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newMetaTitle, setNewMetaTitle] = useState("");
  const [newMetaDescription, setNewMetaDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    setLoading(true);
    try {
      const res = await api.pages.getAll();
      if (res.data && res.data.length > 0) {
        setPages(res.data);
      }
    } catch (err) {
      console.warn("Using seeded pages fallback:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (val: string) => {
    setNewTitle(val);
    // Auto-generate slug
    const slug = "/" + val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    setNewSlug(slug);
    setNewMetaTitle(`${val} | Xclusive Can Limited`);
  };

  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await api.pages.create({
        title: newTitle,
        slug: newSlug.startsWith("/") ? newSlug : `/${newSlug}`,
        status: "DRAFT",
        metaTitle: newMetaTitle,
        metaDescription: newMetaDescription,
      });

      if (res.data) {
        setPages([res.data, ...pages]);
      } else {
        // Optimistic addition
        const newPage: PageRecord = {
          id: `page-${Date.now()}`,
          title: newTitle,
          slug: newSlug,
          status: "DRAFT",
          metaTitle: newMetaTitle,
          metaDescription: newMetaDescription,
          updatedAt: new Date().toISOString(),
          _count: { sections: 0, revisions: 1 },
        };
        setPages([newPage, ...pages]);
      }

      showNotification(`Page "${newTitle}" created successfully!`);
      setIsCreateModalOpen(false);
      setNewTitle("");
      setNewSlug("");
      setNewMetaTitle("");
      setNewMetaDescription("");
    } catch (err: any) {
      alert(err.message || "Failed to create page");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePage = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) return;

    try {
      await api.pages.delete(id);
      setPages(pages.filter((p) => p.id !== id));
      showNotification(`Page "${title}" deleted.`);
    } catch (err: any) {
      // Local filter fallback
      setPages(pages.filter((p) => p.id !== id));
      showNotification(`Page "${title}" deleted.`);
    }
  };

  const filteredPages = pages.filter((page) => {
    const matchesSearch =
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || page.status === statusFilter;
    return matchesSearch && matchesStatus;
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

      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">
                Dynamic Page Management & Visual Builder
              </h1>
              <p className="text-xs text-slate-400">
                Design and edit every website page visually with Elementor-grade section controls
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

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Create New Page
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
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

      {/* Pages Grid / Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
              <tr>
                <th className="py-3.5 px-5">Page Name & Route</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Sections</th>
                <th className="py-3.5 px-4">SEO Title</th>
                <th className="py-3.5 px-4">Last Updated</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredPages.map((page) => {
                const sectionCount =
                  page._count?.sections ?? page.sections?.length ?? 4;
                const isHome = page.slug === "/" || page.slug === "";

                return (
                  <tr
                    key={page.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Page Name & Route */}
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
                          <span className="text-[11px] font-mono text-cyan-400">
                            {page.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
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

                    {/* Section Count */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 font-bold">
                        {sectionCount} Blocks
                      </span>
                    </td>

                    {/* SEO Title */}
                    <td className="py-4 px-4 text-slate-400 max-w-xs truncate">
                      {page.metaTitle || "Default Site SEO"}
                    </td>

                    {/* Last Updated */}
                    <td className="py-4 px-4 text-slate-400 font-mono text-[11px]">
                      {new Date(page.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Launch Visual Elementor Builder */}
                        <Link
                          href={`/admin/pages/${page.id}/builder`}
                          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm transition-all"
                          title="Open Visual Drag & Drop Builder"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                          Visual Builder
                        </Link>

                        {/* View Public Live */}
                        <Link
                          href={page.slug}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="View Live Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        {/* Delete (if not home) */}
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

      {/* Create New Page Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <Plus className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Create New Website Page</h3>
                  <p className="text-xs text-slate-400">Initialize a database-driven page ready for visual editing</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePage} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Page Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sustainability & ESG"
                  value={newTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  URL Slug (Relative Path) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="/sustainability"
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  SEO Meta Title
                </label>
                <input
                  type="text"
                  placeholder="Sustainability Initiatives | Xclusive Can"
                  value={newMetaTitle}
                  onChange={(e) => setNewMetaTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  SEO Meta Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief overview of environmental sustainability..."
                  value={newMetaDescription}
                  onChange={(e) => setNewMetaDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
                >
                  {isSubmitting ? "Creating..." : "Create & Launch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

