"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Award,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { api } from "@/lib/api";
import {
  CERTIFICATES_LIST,
  CERTIFICATE_CATEGORY_OPTIONS,
  CertificateItem,
} from "@/data/certificatesData";
import {
  AdminToast,
  AdminPageHeader,
  AdminSearchToolbar,
  AdminConfirmDeleteModal,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";

export default function AdminCertificatesPage() {
  const [certs, setCerts] = useState<CertificateItem[]>(CERTIFICATES_LIST);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [storageMode, setStorageMode] = useState<"database" | "fallback">("database");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const { toast, showToast, clearToast } = useAdminToast();

  const loadCerts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.certificates.getAll(true);
      if (Array.isArray(res.data)) {
        setCerts(res.data);
        setStorageMode("database");
      }
    } catch {
      setCerts(CERTIFICATES_LIST);
      setStorageMode("fallback");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCerts();
  }, [loadCerts]);

  const handleToggleActive = async (cert: CertificateItem) => {
    try {
      await api.certificates.update(cert.id, { isActive: !(cert.isActive ?? true) });
      await loadCerts();
      showToast(cert.isActive === false ? "Certificate visible." : "Certificate hidden.");
    } catch (err: any) {
      showToast(err?.message || "Failed to update status.", "error");
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setSaving(true);
    try {
      await api.certificates.delete(confirmDeleteId);
      setConfirmDeleteId(null);
      await loadCerts();
      showToast("Certificate deleted.");
    } catch (err: any) {
      showToast(err?.message || "Delete failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setSaving(true);
    try {
      await api.certificates.reset();
      await loadCerts();
      showToast("Certificates restored to Noor Plastic defaults.");
    } catch (err: any) {
      showToast(err?.message || "Reset failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  const filtered = certs.filter((c) => {
    const matchesCat = activeCategory === "ALL" || c.category === activeCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.accreditation.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full space-y-6">
      <AdminPageHeader
        icon={<Award className="w-6 h-6 text-cyan-400" />}
        title="Certificates & Accreditations"
        subtitle="Manage ISO certifications, Trade License & BSTI approvals, scan images & audit highlights on /certificates."
        addLabel="Add Certificate"
        addHref="/admin/certificates/new"
        onRefresh={loadCerts}
        onReset={handleReset}
        loading={loading}
        storageMode={storageMode}
      />

      <AdminSearchToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search certificate title, ISO code, or accreditor..."
        categories={CERTIFICATE_CATEGORY_OPTIONS}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        totalCount={filtered.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((cert) => (
          <div
            key={cert.id}
            className={`bg-slate-900 border rounded-2xl overflow-hidden flex flex-col justify-between transition-all ${
              cert.isActive === false ? "border-slate-800/60 opacity-65" : "border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="p-5 flex gap-4">
              <div className="w-24 h-32 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center p-1.5">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="max-w-full max-h-full object-contain rounded"
                />
              </div>

              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/60 truncate">
                    {cert.category}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    #{cert.sortOrder ?? 0}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-[11px] font-semibold text-blue-400 truncate">
                  {cert.code}
                </p>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {cert.accreditation}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{cert.bullets?.length || 0} verification points</span>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/certificates/${cert.id}/edit`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white"
                >
                  <Pencil className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Edit</span>
                </Link>
                <button
                  type="button"
                  onClick={() => handleToggleActive(cert)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer"
                  title={cert.isActive === false ? "Publish" : "Hide"}
                >
                  {cert.isActive === false ? (
                    <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={() => setConfirmDeleteId(cert.id)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-800 cursor-pointer"
                title="Delete Certificate"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AdminConfirmDeleteModal
        isOpen={Boolean(confirmDeleteId)}
        title="Delete Certificate?"
        description="This removes the certificate from SQLite and /certificates."
        onCancel={() => setConfirmDeleteId(null)}
        onConfirm={handleDelete}
        loading={saving}
      />

      <AdminToast toast={toast} onClose={clearToast} />
    </div>
  );
}
