"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Layers, Save, Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import {
  AdminFormHeader,
  AdminEditLoadingState,
  AdminEditNotFoundState,
  AdminToast,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";

export interface PageRecord {
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

export const DEFAULT_PAGES: PageRecord[] = [
  {
    id: "page-home",
    title: "Home",
    slug: "/",
    status: "PUBLISHED",
    metaTitle: "Noor Plastic Industries - Water Dispenser & Plastic Manufacturing",
    metaDescription: "High-precision PET/HDPE water bottles, industrial plastic pails, and cleanroom packaging from Kaliakoir, Gazipur.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 6, revisions: 4 },
  },
  {
    id: "page-story",
    title: "Our Story",
    slug: "/our-story",
    status: "PUBLISHED",
    metaTitle: "Our Journey - Noor Plastic Industries",
    metaDescription: "Precision polymer engineering, clean water dispenser systems, and green manufacturing in Kaliakoir, Gazipur.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 5, revisions: 3 },
  },
  {
    id: "page-business",
    title: "Our Business & Plants",
    slug: "/our-business",
    status: "PUBLISHED",
    metaTitle: "Advanced Manufacturing Plant - Kaliakoir, Gazipur",
    metaDescription: "High-speed automated injection & blow molding lines at Latifpur-B, Kaliakoir-1750, Gazipur.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 4, revisions: 2 },
  },
  {
    id: "page-products",
    title: "Product Catalog",
    slug: "/products",
    status: "PUBLISHED",
    metaTitle: "Water Bottles & Industrial Plastic Packaging Solutions",
    metaDescription: "Explore our comprehensive range of food-grade dispenser bottles, jars, and industrial pails.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 4, revisions: 1 },
  },
  {
    id: "page-certificates",
    title: "Certificates & Accreditations",
    slug: "/certificates",
    status: "PUBLISHED",
    metaTitle: "ISO 9001:2015, BSTI & Food-Grade Certifications",
    metaDescription: "World-class compliance, quality assurance, and environmental standards.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 4, revisions: 2 },
  },
  {
    id: "page-careers",
    title: "Careers & Culture",
    slug: "/careers",
    status: "PUBLISHED",
    metaTitle: "Join Our Engineering Team - Noor Plastic Industries",
    metaDescription: "Build your career with Noor Plastic Industries in Kaliakoir, Gazipur.",
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
    metaTitle: "Research & Development - Noor Plastic Industries",
    metaDescription: "Pioneering sustainable barrier polymers and micron-precision mold engineering.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 6, revisions: 2 },
  },
  {
    id: "page-tool-room",
    title: "Tool Room Facility",
    slug: "/tool-room",
    status: "PUBLISHED",
    metaTitle: "Precision Tool Room Facility - Noor Plastic Industries",
    metaDescription: "High-speed CNC milling, wire EDM machines, surface grinders, and multi-cavity molds.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 4, revisions: 1 },
  },
  {
    id: "page-faqs",
    title: "FAQs (Frequently Asked Questions)",
    slug: "/faqs",
    status: "PUBLISHED",
    metaTitle: "Frequently Asked Questions - Noor Plastic Industries",
    metaDescription: "Answers regarding MOQs, custom CNC tooling, lead times, and international regulatory compliance.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 4, revisions: 1 },
  },
  {
    id: "page-case-studies",
    title: "Case Studies & Client Impact",
    slug: "/case-studies",
    status: "PUBLISHED",
    metaTitle: "Industrial Packaging Case Studies - Noor Plastic Industries",
    metaDescription: "Real-world engineering impact across water, paints, pharma, chemicals, and FMCG sectors.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 4, revisions: 1 },
  },
  {
    id: "page-blog",
    title: "Blog & Technical Insights",
    slug: "/blog",
    status: "PUBLISHED",
    metaTitle: "Engineering Whitepapers & Insights - Noor Plastic Industries",
    metaDescription: "Technical whitepapers on circular polymers, precision molding, and green manufacturing.",
    updatedAt: new Date().toISOString(),
    _count: { sections: 4, revisions: 1 },
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

export default function PageForm({
  mode,
  pageId,
}: {
  mode: "create" | "edit";
  pageId?: string;
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState<"PUBLISHED" | "DRAFT" | "ARCHIVED">("DRAFT");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const [loading, setLoading] = useState(mode === "edit");
  const [notFound, setNotFound] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [storageMode, setStorageMode] = useState<"database" | "fallback">("database");
  const { toast, showToast, clearToast } = useAdminToast();

  useEffect(() => {
    let active = true;
    if (mode === "create") return;

    if (!pageId) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    async function load() {
      setLoading(true);
      try {
        const res = await api.pages.getById(pageId!);
        if (!active) return;
        const p = res?.data;
        if (p) {
          setTitle(p.title || "");
          setSlug(p.slug || "");
          setStatus(p.status || "PUBLISHED");
          setMetaTitle(p.metaTitle || "");
          setMetaDescription(p.metaDescription || "");
          setStorageMode("database");
        } else {
          setNotFound(true);
        }
      } catch {
        const fallback = DEFAULT_PAGES.find((p) => p.id === pageId);
        if (fallback && active) {
          setTitle(fallback.title);
          setSlug(fallback.slug);
          setStatus(fallback.status);
          setMetaTitle(fallback.metaTitle || "");
          setMetaDescription(fallback.metaDescription || "");
          setStorageMode("fallback");
        } else if (active) {
          setNotFound(true);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [mode, pageId]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (mode === "create") {
      const nextSlug = "/" + val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      setSlug(nextSlug);
      setMetaTitle(`${val} | Noor Plastic Industries`);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast("Page Title is required.", "error");
      return;
    }

    setIsSubmitting(true);
    const normalizedSlug = slug.trim().startsWith("/") || slug.trim() === "" ? slug.trim() || "/" : `/${slug.trim()}`;

    try {
      if (mode === "edit" && pageId) {
        await api.pages.update(pageId, {
          title: title.trim(),
          slug: normalizedSlug,
          status,
          metaTitle: metaTitle.trim(),
          metaDescription: metaDescription.trim(),
        });
      } else {
        await api.pages.create({
          title: title.trim(),
          slug: normalizedSlug,
          status,
          metaTitle: metaTitle.trim(),
          metaDescription: metaDescription.trim(),
        });
      }
      router.push("/admin/pages");
      router.refresh();
    } catch (err: any) {
      showToast(err?.message || "Failed to save page.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-6 pb-10">
      <AdminFormHeader
        backHref="/admin/pages"
        backLabel="Back to Dynamic Page Management"
        icon={<Layers className="w-6 h-6 text-blue-400" />}
        title={mode === "edit" ? `Edit Page Settings${title ? `: ${title}` : ""}` : "Create New Website Page"}
        subtitle="Initialize or update a database-driven page route, publish state, and SEO metadata."
        storageMode={storageMode}
      />

      {loading ? (
        <AdminEditLoadingState label="Loading page configuration..." />
      ) : notFound ? (
        <AdminEditNotFoundState
          title="Page Not Found"
          description="This website page could not be loaded or may have been removed."
          backHref="/admin/pages"
          backLabel="Back to Pages"
        />
      ) : (
        <form
          onSubmit={handleSave}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Page Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sustainability & ESG"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Publish Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="DRAFT">Draft Mode</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              URL Slug (Relative Path) *
            </label>
            <input
              type="text"
              required
              placeholder="/sustainability"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              disabled={mode === "edit" && (slug === "/" || slug === "")}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-mono text-cyan-400 focus:outline-none focus:border-blue-500 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              SEO Meta Title
            </label>
            <input
              type="text"
              placeholder="Sustainability Initiatives | Noor Plastic Industries"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              SEO Meta Description
            </label>
            <textarea
              rows={3}
              placeholder="Brief overview of environmental sustainability..."
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-800">
            {mode === "edit" && pageId ? (
              <Link
                href={`/admin/pages/${pageId}/builder`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open Visual Builder</span>
              </Link>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-3">
              <Link
                href="/admin/pages"
                className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                <span>
                  {isSubmitting
                    ? "Saving..."
                    : mode === "edit"
                    ? "Update Page Settings"
                    : "Create & Launch"}
                </span>
              </button>
            </div>
          </div>
        </form>
      )}

      <AdminToast toast={toast} onClose={clearToast} />
    </div>
  );
}

