"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Briefcase, Save } from "lucide-react";
import { api } from "@/lib/api";
import {
  JOB_OPENINGS,
  JOB_DEPARTMENTS,
  JOB_BADGE_OPTIONS,
  JobOpening,
} from "@/data/careersData";
import {
  AdminFormHeader,
  AdminEditLoadingState,
  AdminEditNotFoundState,
  AdminToast,
  useAdminToast,
  linesToArray,
  arrayToLines,
} from "@/components/admin/AdminCrudShell";

interface JobFormState {
  title: string;
  department: string;
  facility: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilitiesText: string;
  requirementsText: string;
  benefitsText: string;
  badgeColor: string;
  order: number;
  isActive: boolean;
}

const EMPTY_JOB_FORM: JobFormState = {
  title: "",
  department: "Quality Assurance",
  facility: "Kaliakoir Plant, Latifpur-B",
  location: "Kaliakoir-1750, Gazipur",
  type: "Full-Time",
  experience: "2 - 5 Years",
  summary: "",
  responsibilitiesText: "",
  requirementsText: "",
  benefitsText: "",
  badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  order: 0,
  isActive: true,
};

function jobToForm(job: JobOpening): JobFormState {
  return {
    title: job.title,
    department: job.department,
    facility: job.facility,
    location: job.location,
    type: job.type || "Full-Time",
    experience: job.experience,
    summary: job.summary,
    responsibilitiesText: arrayToLines(job.responsibilities),
    requirementsText: arrayToLines(job.requirements),
    benefitsText: arrayToLines(job.benefits),
    badgeColor: job.badgeColor || "bg-blue-50 text-blue-700 border-blue-200",
    order: job.order ?? 0,
    isActive: job.isActive ?? true,
  };
}

export default function CareerJobForm({
  mode,
  jobId,
}: {
  mode: "create" | "edit";
  jobId?: string;
}) {
  const router = useRouter();
  const [form, setForm] = useState<JobFormState>(EMPTY_JOB_FORM);
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
          const res = await api.careerJobs.getAll(true);
          if (active && Array.isArray(res.data)) {
            setForm((prev) => ({ ...prev, order: res.data.length + 1 }));
            setStorageMode("database");
          }
        } catch {
          if (active) {
            setForm((prev) => ({ ...prev, order: JOB_OPENINGS.length + 1 }));
            setStorageMode("fallback");
          }
        }
        return;
      }

      if (!jobId) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await api.careerJobs.getById(jobId);
        if (!active) return;
        if (res?.data) {
          setForm(jobToForm(res.data));
          setStorageMode("database");
        } else {
          setNotFound(true);
        }
      } catch {
        const fallback = JOB_OPENINGS.find((j) => j.id === jobId);
        if (fallback && active) {
          setForm(jobToForm(fallback));
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
  }, [mode, jobId]);

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast("Job title is required.", "error");
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      department: form.department,
      facility: form.facility.trim(),
      location: form.location.trim(),
      type: form.type.trim(),
      experience: form.experience.trim(),
      summary: form.summary.trim(),
      responsibilities: linesToArray(form.responsibilitiesText),
      requirements: linesToArray(form.requirementsText),
      benefits: linesToArray(form.benefitsText),
      badgeColor: form.badgeColor,
      order: Number(form.order) || 0,
      isActive: form.isActive,
    };

    try {
      if (mode === "edit" && jobId) {
        await api.careerJobs.update(jobId, payload);
      } else {
        await api.careerJobs.create(payload);
      }
      router.push("/admin/careers");
      router.refresh();
    } catch (err: any) {
      showToast(err?.message || "Failed to save job opening.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full space-y-6 pb-10">
      <AdminFormHeader
        backHref="/admin/careers"
        backLabel="Back to Careers & Job Openings"
        icon={<Briefcase className="w-6 h-6 text-amber-400" />}
        title={mode === "edit" ? "Edit Job Opening" : "Post New Job Opening"}
        subtitle="Manage position title, facility, responsibilities, qualifications & hiring visibility on /careers."
        storageMode={storageMode}
      />

      {loading ? (
        <AdminEditLoadingState label="Loading job opening details..." />
      ) : notFound ? (
        <AdminEditNotFoundState
          title="Job Opening Not Found"
          description="This job posting could not be loaded or may have been deleted."
          backHref="/admin/careers"
          backLabel="Back to Careers"
        />
      ) : (
        <form
          onSubmit={handleSaveJob}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Job Title *
              </label>
              <input
                required
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Department
              </label>
              <select
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
              >
                {JOB_DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Facility</label>
              <input
                type="text"
                value={form.facility}
                onChange={(e) => setForm({ ...form, facility: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Employment Type
              </label>
              <input
                type="text"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Experience Range
              </label>
              <input
                type="text"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Department Badge Style
              </label>
              <select
                value={form.badgeColor}
                onChange={(e) => setForm({ ...form, badgeColor: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
              >
                {JOB_BADGE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Sort Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Role Summary</label>
            <textarea
              rows={2}
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Key Responsibilities (One per line)
            </label>
            <textarea
              rows={3}
              value={form.responsibilitiesText}
              onChange={(e) =>
                setForm({ ...form, responsibilitiesText: e.target.value })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Candidate Requirements (One per line)
              </label>
              <textarea
                rows={3}
                value={form.requirementsText}
                onChange={(e) => setForm({ ...form, requirementsText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Benefits &amp; Perks (One per line)
              </label>
              <textarea
                rows={3}
                value={form.benefitsText}
                onChange={(e) => setForm({ ...form, benefitsText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
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
              <span>Active on /careers public portal</span>
            </label>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/careers"
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
                <span>{saving ? "Saving..." : mode === "edit" ? "Update Job Opening" : "Save Job Opening"}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      <AdminToast toast={toast} onClose={clearToast} />
    </div>
  );
}

