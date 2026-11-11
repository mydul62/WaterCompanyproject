"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Link2, Save } from "lucide-react";
import { api } from "@/lib/api";
import {
  AdminFormHeader,
  AdminEditLoadingState,
  AdminEditNotFoundState,
  AdminToast,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";

export interface LinkRecord {
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

export const DEFAULT_LINKS: LinkRecord[] = [
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
    url: "https://www.linkedin.com/company/noor-plastic-industries",
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
    url: "https://www.youtube.com/@noorplasticindustries",
    type: "EXTERNAL",
    target: "_blank",
    category: "SOCIAL_MEDIA",
    clicks: 180,
    updatedAt: new Date().toISOString(),
  },
];

export default function LinkForm({
  mode,
  linkId,
}: {
  mode: "create" | "edit";
  linkId?: string;
}) {
  const router = useRouter();
  const [formKey, setFormKey] = useState("");
  const [formLabel, setFormLabel] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [formType, setFormType] = useState<"INTERNAL" | "EXTERNAL" | "ANCHOR" | "FILE">("INTERNAL");
  const [formTarget, setFormTarget] = useState<"_self" | "_blank">("_self");
  const [formCategory, setFormCategory] = useState("NAVIGATION");

  const [loading, setLoading] = useState(mode === "edit");
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [storageMode, setStorageMode] = useState<"database" | "fallback">("database");
  const { toast, showToast, clearToast } = useAdminToast();

  useEffect(() => {
    let active = true;
    if (mode === "create") return;

    if (!linkId) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    async function load() {
      setLoading(true);
      try {
        const res = await api.links.getById(linkId!);
        if (!active) return;
        const l = res?.data;
        if (l) {
          setFormKey(l.key || "");
          setFormLabel(l.label || "");
          setFormUrl(l.url || "");
          setFormType(l.type || "INTERNAL");
          setFormTarget(l.target || "_self");
          setFormCategory(l.category || "NAVIGATION");
          setStorageMode("database");
        } else {
          setNotFound(true);
        }
      } catch {
        const fallback = DEFAULT_LINKS.find((l) => l.id === linkId || l.key === linkId);
        if (fallback && active) {
          setFormKey(fallback.key);
          setFormLabel(fallback.label);
          setFormUrl(fallback.url);
          setFormType(fallback.type);
          setFormTarget(fallback.target);
          setFormCategory(fallback.category || "NAVIGATION");
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
  }, [mode, linkId]);

  const handleSaveLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formKey.trim() || !formLabel.trim() || !formUrl.trim()) {
      showToast("System Link Key, Label, and Destination URL are required.", "error");
      return;
    }

    setSaving(true);
    const payload = {
      key: formKey.trim().toLowerCase().replace(/[^a-z0-9_]+/g, "_"),
      label: formLabel.trim(),
      url: formUrl.trim(),
      type: formType,
      target: formTarget,
      category: formCategory,
    };

    try {
      if (mode === "edit" && linkId) {
        await api.links.update(linkId, payload);
      } else {
        await api.links.create(payload);
      }
      router.push("/admin/links");
      router.refresh();
    } catch (err: any) {
      showToast(err?.message || "Failed to save link.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full space-y-6 pb-10">
      <AdminFormHeader
        backHref="/admin/links"
        backLabel="Back to Universal Link Registry"
        icon={<Link2 className="w-6 h-6 text-blue-400" />}
        title={
          mode === "edit"
            ? `Edit Link Key${formKey ? `: ${formKey}` : ""}`
            : "Register New Universal Link"
        }
        subtitle="Manage centralized destination URLs referenced across menus, CTA buttons, and footers."
        storageMode={storageMode}
      />

      {loading ? (
        <AdminEditLoadingState label="Loading link registration..." />
      ) : notFound ? (
        <AdminEditNotFoundState
          title="Link Record Not Found"
          description="This link entry could not be loaded or may have been deleted."
          backHref="/admin/links"
          backLabel="Back to Link Registry"
        />
      ) : (
        <form
          onSubmit={handleSaveLink}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Unique System Link Key *
              </label>
              <input
                type="text"
                required
                value={formKey}
                onChange={(e) => setFormKey(e.target.value)}
                placeholder="e.g. cta_primary_quote"
                disabled={mode === "edit"}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-mono text-cyan-400 focus:outline-none focus:border-blue-500 disabled:opacity-50"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Reference this key in navigation menus, buttons, and footers.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Display Label *
              </label>
              <input
                type="text"
                required
                value={formLabel}
                onChange={(e) => setFormLabel(e.target.value)}
                placeholder="e.g. Request an Instant Quote"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Destination URL / Path *
            </label>
            <input
              type="text"
              required
              value={formUrl}
              onChange={(e) => setFormUrl(e.target.value)}
              placeholder="e.g. /request-quote or https://..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Link Type</label>
              <select
                value={formType}
                onChange={(e) => setFormType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="INTERNAL">INTERNAL (Next.js route)</option>
                <option value="EXTERNAL">EXTERNAL (Full URL)</option>
                <option value="FILE">FILE / DOWNLOAD (PDF/Media)</option>
                <option value="ANCHOR">ANCHOR (#section)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Target Window</label>
              <select
                value={formTarget}
                onChange={(e) => setFormTarget(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="_self">Same Tab (_self)</option>
                <option value="_blank">New Tab (_blank)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Category Classification
              </label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="NAVIGATION">NAVIGATION</option>
                <option value="CTA_BUTTONS">CTA_BUTTONS</option>
                <option value="SOCIAL_MEDIA">SOCIAL_MEDIA</option>
                <option value="FOOTER_LEGAL">FOOTER_LEGAL</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Link
              href="/admin/links"
              className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 cursor-pointer disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving..." : mode === "edit" ? "Update Link" : "Save Link"}</span>
            </button>
          </div>
        </form>
      )}

      <AdminToast toast={toast} onClose={clearToast} />
    </div>
  );
}

