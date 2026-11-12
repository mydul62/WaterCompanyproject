"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Award, Save } from "lucide-react";
import { api } from "@/lib/api";
import {
  CERTIFICATE_CATEGORY_OPTIONS,
  CertificateItem,
} from "@/data/certificatesData";
import ImageFieldWithUpload from "@/components/admin/ImageFieldWithUpload";
import {
  AdminFormHeader,
  AdminErrorBanner,
  AdminEditLoadingState,
  AdminEditNotFoundState,
  AdminToast,
  useAdminToast,
  linesToArray,
  arrayToLines,
} from "@/components/admin/AdminCrudShell";

interface CertificateFormState {
  title: string;
  code: string;
  category: string;
  image: string;
  aspect: "portrait" | "landscape" | "square";
  bulletsText: string;
  accreditation: string;
  sortOrder: number;
  isActive: boolean;
}

const EMPTY_CERT_FORM: CertificateFormState = {
  title: "",
  code: "",
  category: "Quality Management",
  image: "/images/cert-iso-9001.jpg",
  aspect: "portrait",
  bulletsText: "",
  accreditation: "",
  sortOrder: 0,
  isActive: true,
};

function certToForm(cert: CertificateItem): CertificateFormState {
  return {
    title: cert.title,
    code: cert.code,
    category: cert.category,
    image: cert.image || "/images/cert-iso-9001.jpg",
    aspect: cert.aspect || "portrait",
    bulletsText: arrayToLines(cert.bullets),
    accreditation: cert.accreditation || "",
    sortOrder: cert.sortOrder ?? 0,
    isActive: cert.isActive ?? true,
  };
}

export default function CertificateForm({
  mode,
  certificateId,
}: {
  mode: "create" | "edit";
  certificateId?: string;
}) {
  const router = useRouter();
  const [form, setForm] = useState<CertificateFormState>(EMPTY_CERT_FORM);
  const [loading, setLoading] = useState(mode === "edit");
  const [notFound, setNotFound] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [storageMode, setStorageMode] = useState<"database" | "fallback">("database");
  const { toast, showToast, clearToast } = useAdminToast();

  useEffect(() => {
    let active = true;

    async function init() {
      if (mode === "create") {
        try {
          const res = await api.certificates.getAll(true);
          if (active && Array.isArray(res.data)) {
            setForm((prev) => ({ ...prev, sortOrder: res.data.length + 1 }));
            setStorageMode("database");
          }
        } catch {
          if (active) {
            setStorageMode("fallback");
          }
        }
        return;
      }

      if (!certificateId) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      setLoadError(null);
      try {
        const res = await api.certificates.getById(certificateId);
        if (!active) return;
        if (res?.data) {
          setForm(certToForm(res.data));
          setStorageMode("database");
        } else {
          setNotFound(true);
        }
      } catch (err: any) {
        if (!active) return;
        setStorageMode("fallback");
        if (err?.status === 404 || err?.message?.toLowerCase().includes("not found")) {
          setNotFound(true);
        } else {
          setLoadError(err?.message || "Failed to load certificate details from PostgreSQL.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    init();
    return () => {
      active = false;
    };
  }, [mode, certificateId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast("Certificate title is required.", "error");
      return;
    }

    setSaving(true);
    const payload = {
      title: form.title.trim(),
      code: form.code.trim(),
      category: form.category,
      image: form.image.trim() || "/images/cert-iso-9001.jpg",
      aspect: form.aspect,
      bullets: linesToArray(form.bulletsText),
      accreditation: form.accreditation.trim(),
      sortOrder: Number(form.sortOrder) || 0,
      isActive: form.isActive,
    };

    try {
      if (mode === "edit" && certificateId) {
        await api.certificates.update(certificateId, payload);
      } else {
        await api.certificates.create(payload);
      }
      router.push("/admin/certificates");
      router.refresh();
    } catch (err: any) {
      showToast(err?.message || "Failed to save certificate.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full space-y-6 pb-10">
      <AdminFormHeader
        backHref="/admin/certificates"
        backLabel="Back to Certificates & Accreditations"
        icon={<Award className="w-6 h-6 text-cyan-400" />}
        title={mode === "edit" ? "Edit Certificate" : "Add Certificate"}
        subtitle="Manage ISO accreditation details, scan image, frame aspect ratio & compliance audit bullets."
        storageMode={storageMode}
      />

      {loading ? (
        <AdminEditLoadingState label="Loading certificate details..." />
      ) : loadError ? (
        <AdminErrorBanner error={loadError} />
      ) : notFound ? (
        <AdminEditNotFoundState
          title="Certificate Not Found"
          description="This certificate record could not be loaded or may have been deleted."
          backHref="/admin/certificates"
          backLabel="Back to Certificates"
        />
      ) : (
        <form
          onSubmit={handleSave}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Certificate Title *
              </label>
              <input
                required
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. ISO 9001:2015"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Standard / Code Label
              </label>
              <input
                type="text"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder="e.g. Quality Management System"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
              >
                {CERTIFICATE_CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Frame Aspect
              </label>
              <select
                value={form.aspect}
                onChange={(e) =>
                  setForm({
                    ...form,
                    aspect: e.target.value as "portrait" | "landscape" | "square",
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
                <option value="square">Square</option>
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

          <ImageFieldWithUpload
            label="Certificate Scan Image"
            value={form.image}
            onChange={(url) => setForm({ ...form, image: url })}
            category="CERTIFICATES"
            helperText="Upload scanned certificate JPG/PNG or select from Media Library."
          />

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Validating Body / Accreditation
            </label>
            <input
              type="text"
              value={form.accreditation}
              onChange={(e) => setForm({ ...form, accreditation: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Key Compliance Highlights (One bullet per line)
            </label>
            <textarea
              rows={4}
              value={form.bulletsText}
              onChange={(e) => setForm({ ...form, bulletsText: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="rounded border-slate-700 bg-slate-950"
              />
              <span>Visible on /certificates</span>
            </label>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/certificates"
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
                <span>{saving ? "Saving..." : mode === "edit" ? "Update Certificate" : "Save Certificate"}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      <AdminToast toast={toast} onClose={clearToast} />
    </div>
  );
}

