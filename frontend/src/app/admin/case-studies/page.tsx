"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  FolderKanban,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { api } from "@/lib/api";
import {
  CASE_STUDIES_DATA,
  CASE_STUDY_INDUSTRIES,
  CaseStudy,
} from "@/data/caseStudiesData";
import {
  AdminToast,
  AdminPageHeader,
  AdminSearchToolbar,
  AdminConfirmDeleteModal,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";

export default function AdminCaseStudiesPage() {
  const [cases, setCases] = useState<CaseStudy[]>(CASE_STUDIES_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [storageMode, setStorageMode] = useState<"database" | "fallback">("database");
  const [search, setSearch] = useState("");
  const [activeIndustry, setActiveIndustry] = useState("ALL");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const { toast, showToast, clearToast } = useAdminToast();

  const loadCases = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.caseStudies.getAll(true);
      if (Array.isArray(res.data)) {
        setCases(res.data);
        setStorageMode("database");
      }
    } catch {
      setCases(CASE_STUDIES_DATA);
      setStorageMode("fallback");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCases();
  }, [loadCases]);

  const handleToggleActive = async (item: CaseStudy) => {
    try {
      await api.caseStudies.update(item.id, { isActive: !(item.isActive ?? true) });
      await loadCases();
      showToast(item.isActive === false ? "Case study published." : "Case study hidden.");
    } catch (err: any) {
      showToast(err?.message || "Failed to update visibility.", "error");
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setSaving(true);
    try {
      await api.caseStudies.delete(confirmDeleteId);
      setConfirmDeleteId(null);
      await loadCases();
      showToast("Case study deleted.");
    } catch (err: any) {
      showToast(err?.message || "Delete failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setSaving(true);
    try {
      await api.caseStudies.reset();
      await loadCases();
      showToast("Case studies restored to defaults.");
    } catch (err: any) {
      showToast(err?.message || "Reset failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  const filtered = cases.filter((c) => {
    const matchesInd = activeIndustry === "ALL" || c.industry === activeIndustry;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      c.client.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.subtitle.toLowerCase().includes(q);
    return matchesInd && matchesSearch;
  });

  return (
    <div className="w-full space-y-6">
      <AdminPageHeader
        icon={<FolderKanban className="w-6 h-6 text-cyan-400" />}
        title="Client Case Studies"
        subtitle="Manage enterprise packaging case studies, performance metrics, technical specs & thumbnails on /case-studies."
        addLabel="New Case Study"
        addHref="/admin/case-studies/new"
        onRefresh={loadCases}
        onReset={handleReset}
        loading={loading}
        storageMode={storageMode}
      />

      <AdminSearchToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search client, industry, or project title..."
        categories={CASE_STUDY_INDUSTRIES}
        activeCategory={activeIndustry}
        onCategoryChange={setActiveIndustry}
        totalCount={filtered.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`bg-slate-900 border rounded-2xl overflow-hidden flex flex-col justify-between transition-all ${
              item.isActive === false ? "border-slate-800/60 opacity-65" : "border-slate-800 hover:border-slate-700"
            }`}
          >
            <div>
              <div className="relative h-44 bg-slate-950 border-b border-slate-800 overflow-hidden">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-cyan-600/90 text-white">
                  {item.industry}
                </span>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                    Client Partnership
                  </div>
                  <div className="text-sm font-bold text-white truncate">{item.client}</div>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-base font-bold text-white leading-snug line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">{item.subtitle}</p>
                {item.stats?.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/70">
                    {item.stats.slice(0, 3).map((st, idx) => (
                      <div key={idx} className="bg-slate-950 rounded-lg p-2 text-center border border-slate-800">
                        <div className="text-xs font-extrabold text-cyan-400">{st.value}</div>
                        <div className="text-[10px] text-slate-500 truncate">{st.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="px-5 py-3.5 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/case-studies/${item.id}/edit`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white"
                >
                  <Pencil className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Edit</span>
                </Link>
                <button
                  type="button"
                  onClick={() => handleToggleActive(item)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer"
                  title={item.isActive === false ? "Publish" : "Hide"}
                >
                  {item.isActive === false ? (
                    <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={() => setConfirmDeleteId(item.id)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-800 cursor-pointer"
                title="Delete Case Study"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AdminConfirmDeleteModal
        isOpen={Boolean(confirmDeleteId)}
        title="Delete Case Study?"
        description="This removes the client case study from SQLite and /case-studies."
        onCancel={() => setConfirmDeleteId(null)}
        onConfirm={handleDelete}
        loading={saving}
      />

      <AdminToast toast={toast} onClose={clearToast} />
    </div>
  );
}
