"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FolderKanban, Plus, X, Save } from "lucide-react";
import { api } from "@/lib/api";
import {
  CASE_STUDIES_DATA,
  CASE_STUDY_INDUSTRIES,
  CaseStudy,
} from "@/data/caseStudiesData";
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

interface CaseFormState {
  client: string;
  industry: string;
  title: string;
  subtitle: string;
  coverImage: string;
  stats: { label: string; value: string }[];
  challenge: string;
  solution: string;
  resultsText: string;
  specs: { key: string; value: string }[];
  quoteText: string;
  quoteAuthor: string;
  quoteRole: string;
  sortOrder: number;
  isActive: boolean;
}

const EMPTY_CASE_FORM: CaseFormState = {
  client: "",
  industry: "Paints & Coatings",
  title: "",
  subtitle: "",
  coverImage: "/images/business-banner.jpg",
  stats: [
    { label: "Transit Leakage", value: "0.00%" },
    { label: "Stack Strength", value: "+30%" },
  ],
  challenge: "",
  solution: "",
  resultsText: "",
  specs: [{ key: "Material", value: "100% Virgin Polypropylene / HDPE" }],
  quoteText: "",
  quoteAuthor: "",
  quoteRole: "",
  sortOrder: 0,
  isActive: true,
};

function caseToForm(item: CaseStudy): CaseFormState {
  return {
    client: item.client,
    industry: item.industry,
    title: item.title,
    subtitle: item.subtitle,
    coverImage: item.coverImage || "/images/business-banner.jpg",
    stats: item.stats?.length ? item.stats : [{ label: "", value: "" }],
    challenge: item.challenge,
    solution: item.solution,
    resultsText: arrayToLines(item.results),
    specs: item.specs?.length ? item.specs : [{ key: "", value: "" }],
    quoteText: item.quote?.text || "",
    quoteAuthor: item.quote?.author || "",
    quoteRole: item.quote?.role || "",
    sortOrder: item.sortOrder ?? 0,
    isActive: item.isActive ?? true,
  };
}

export default function CaseStudyForm({
  mode,
  caseStudyId,
}: {
  mode: "create" | "edit";
  caseStudyId?: string;
}) {
  const router = useRouter();
  const [form, setForm] = useState<CaseFormState>(EMPTY_CASE_FORM);
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
          const res = await api.caseStudies.getAll(true);
          if (active && Array.isArray(res.data)) {
            setForm((prev) => ({ ...prev, sortOrder: res.data.length + 1 }));
            setStorageMode("database");
          }
        } catch {
          if (active) {
            setForm((prev) => ({ ...prev, sortOrder: CASE_STUDIES_DATA.length + 1 }));
            setStorageMode("fallback");
          }
        }
        return;
      }

      if (!caseStudyId) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await api.caseStudies.getById(caseStudyId);
        if (!active) return;
        if (res?.data) {
          setForm(caseToForm(res.data));
          setStorageMode("database");
        } else {
          setNotFound(true);
        }
      } catch {
        const fallback = CASE_STUDIES_DATA.find((c) => c.id === caseStudyId || c.slug === caseStudyId);
        if (fallback && active) {
          setForm(caseToForm(fallback));
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
  }, [mode, caseStudyId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.client.trim() || !form.title.trim()) {
      showToast("Client name and case study title are required.", "error");
      return;
    }

    setSaving(true);
    const payload = {
      client: form.client.trim(),
      industry: form.industry,
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      coverImage: form.coverImage.trim() || "/images/business-banner.jpg",
      stats: form.stats.filter((s) => s.label.trim() && s.value.trim()),
      challenge: form.challenge.trim(),
      solution: form.solution.trim(),
      results: linesToArray(form.resultsText),
      specs: form.specs.filter((s) => s.key.trim() && s.value.trim()),
      quote: {
        text: form.quoteText.trim(),
        author: form.quoteAuthor.trim(),
        role: form.quoteRole.trim(),
      },
      sortOrder: Number(form.sortOrder) || 0,
      isActive: form.isActive,
    };

    try {
      if (mode === "edit" && caseStudyId) {
        await api.caseStudies.update(caseStudyId, payload);
      } else {
        await api.caseStudies.create(payload);
      }
      router.push("/admin/case-studies");
      router.refresh();
    } catch (err: any) {
      showToast(err?.message || "Failed to save case study.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full space-y-6 pb-10">
      <AdminFormHeader
        backHref="/admin/case-studies"
        backLabel="Back to Client Case Studies"
        icon={<FolderKanban className="w-6 h-6 text-cyan-400" />}
        title={mode === "edit" ? "Edit Case Study" : "New Client Case Study"}
        subtitle="Manage enterprise packaging case studies, KPI metrics, technical specs & thumbnails."
        storageMode={storageMode}
      />

      {loading ? (
        <AdminEditLoadingState label="Loading case study details..." />
      ) : notFound ? (
        <AdminEditNotFoundState
          title="Case Study Not Found"
          description="This case study could not be loaded or may have been deleted."
          backHref="/admin/case-studies"
          backLabel="Back to Case Studies"
        />
      ) : (
        <form
          onSubmit={handleSave}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Client / Partner *
              </label>
              <input
                required
                type="text"
                value={form.client}
                onChange={(e) => setForm({ ...form, client: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Industry</label>
              <select
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
              >
                {CASE_STUDY_INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Sort Order</label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Title *</label>
              <input
                required
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Subtitle</label>
              <input
                type="text"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
              />
            </div>
          </div>

          <ImageFieldWithUpload
            label="Case Study Cover Image"
            value={form.coverImage}
            onChange={(url) => setForm({ ...form, coverImage: url })}
            category="GENERAL"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Engineering Challenge
              </label>
              <textarea
                rows={3}
                value={form.challenge}
                onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Noor Plastic Solution
              </label>
              <textarea
                rows={3}
                value={form.solution}
                onChange={(e) => setForm({ ...form, solution: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Measured Results (One line per achievement)
            </label>
            <textarea
              rows={3}
              value={form.resultsText}
              onChange={(e) => setForm({ ...form, resultsText: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400">Impact KPIs</span>
                <button
                  type="button"
                  onClick={() =>
                    setForm({ ...form, stats: [...form.stats, { label: "", value: "" }] })
                  }
                  className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add KPI
                </button>
              </div>
              {form.stats.map((st, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Label"
                    value={st.label}
                    onChange={(e) => {
                      const next = [...form.stats];
                      next[idx] = { ...next[idx], label: e.target.value };
                      setForm({ ...form, stats: next });
                    }}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    value={st.value}
                    onChange={(e) => {
                      const next = [...form.stats];
                      next[idx] = { ...next[idx], value: e.target.value };
                      setForm({ ...form, stats: next });
                    }}
                    className="w-28 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-cyan-300 font-bold"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        stats: form.stats.filter((_, i) => i !== idx),
                      })
                    }
                    className="text-slate-500 hover:text-red-400 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400">Technical Specs</span>
                <button
                  type="button"
                  onClick={() =>
                    setForm({ ...form, specs: [...form.specs, { key: "", value: "" }] })
                  }
                  className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Spec
                </button>
              </div>
              {form.specs.map((sp, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Parameter"
                    value={sp.key}
                    onChange={(e) => {
                      const next = [...form.specs];
                      next[idx] = { ...next[idx], key: e.target.value };
                      setForm({ ...form, specs: next });
                    }}
                    className="w-36 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Specification"
                    value={sp.value}
                    onChange={(e) => {
                      const next = [...form.specs];
                      next[idx] = { ...next[idx], value: e.target.value };
                      setForm({ ...form, specs: next });
                    }}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        specs: form.specs.filter((_, i) => i !== idx),
                      })
                    }
                    className="text-slate-500 hover:text-red-400 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Client Endorsement Quote
              </label>
              <input
                type="text"
                value={form.quoteText}
                onChange={(e) => setForm({ ...form, quoteText: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
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
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Author Role</label>
              <input
                type="text"
                value={form.quoteRole}
                onChange={(e) => setForm({ ...form, quoteRole: e.target.value })}
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
                className="rounded border-slate-700 bg-slate-950"
              />
              <span>Published on /case-studies</span>
            </label>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/case-studies"
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
                <span>{saving ? "Saving..." : mode === "edit" ? "Update Case Study" : "Save Case Study"}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      <AdminToast toast={toast} onClose={clearToast} />
    </div>
  );
}

