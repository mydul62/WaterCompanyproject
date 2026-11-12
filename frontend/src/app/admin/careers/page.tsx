"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Briefcase,
  Mail,
  Phone,
  Trash2,
  Pencil,
  Eye,
  EyeOff,
  MapPin,
  Clock,
  Building2,
  Users,
} from "lucide-react";
import { api } from "@/lib/api";
import {
  JOB_DEPARTMENTS,
  type JobOpening,
} from "@/data/careersData";
import {
  AdminErrorBanner,
  AdminToast,
  AdminPageHeader,
  AdminSearchToolbar,
  AdminConfirmDeleteModal,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";
import { AdminCardSkeletonItems, AdminTableSkeletonRows } from "@/components/common/Skeletons";

interface Application {
  id: string;
  name: string;
  position: string;
  experience: string;
  email: string;
  phone: string;
  date: string;
  status: "New" | "Shortlisted" | "Interview" | "Hired" | "Rejected";
  facility: string;
  currentCompany?: string;
  coverNote?: string;
}

export default function AdminCareersPage() {
  const [activeTab, setActiveTab] = useState<"jobs" | "applications">("jobs");
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [storageMode, setStorageMode] = useState<"database" | "fallback">("database");
  const [loadError, setLoadError] = useState<string | null>(null);

  // Search & filters
  const [jobSearch, setJobSearch] = useState("");
  const [jobDeptFilter, setJobDeptFilter] = useState("ALL");
  const [appSearch, setAppSearch] = useState("");
  const [appStatusFilter, setAppStatusFilter] = useState("all");

  const [confirmDelete, setConfirmDelete] = useState<{
    type: "job" | "app";
    id: string;
  } | null>(null);

  const { toast, showToast, clearToast } = useAdminToast();

  const loadAll = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const [jobsRes, appsRes] = await Promise.all([
        api.careerJobs.getAll(true),
        api.careers.getAll(),
      ]);
      setJobs(Array.isArray(jobsRes.data) ? jobsRes.data : []);
      setApps(Array.isArray(appsRes.data) ? appsRes.data : []);
      setStorageMode("database");
    } catch (err: any) {
      setJobs([]);
      setApps([]);
      setStorageMode("fallback");
      setLoadError(
        err?.message || "Unable to connect to PostgreSQL to load careers data."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const handleToggleJobActive = async (job: JobOpening) => {
    try {
      await api.careerJobs.update(job.id, { isActive: !(job.isActive ?? true) });
      await loadAll();
      showToast(job.isActive === false ? "Job opening reopened." : "Job opening hidden.");
    } catch (err: any) {
      showToast(err?.message || "Could not update job visibility.", "error");
    }
  };

  const handleResetJobs = async () => {
    setSaving(true);
    try {
      await api.careerJobs.reset();
      await loadAll();
      showToast("Job openings restored to Noor Plastic defaults.");
    } catch (err: any) {
      showToast(err?.message || "Reset failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleAppStatusChange = async (id: string, status: string) => {
    try {
      await api.careers.updateStatus(id, status);
      setApps((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: status as Application["status"] } : a))
      );
      showToast(`Candidate status moved to ${status}.`);
    } catch (err: any) {
      showToast(err?.message || "Could not update status.", "error");
    }
  };

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return;
    setSaving(true);
    try {
      if (confirmDelete.type === "job") {
        await api.careerJobs.delete(confirmDelete.id);
        showToast("Job opening removed.");
      } else {
        await api.careers.delete(confirmDelete.id);
        showToast("Application removed.");
      }
      setConfirmDelete(null);
      await loadAll();
    } catch (err: any) {
      showToast(err?.message || "Delete failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesDept = jobDeptFilter === "ALL" || job.department === jobDeptFilter;
    const q = jobSearch.toLowerCase();
    const matchesSearch =
      !q ||
      job.title.toLowerCase().includes(q) ||
      job.facility.toLowerCase().includes(q) ||
      job.summary.toLowerCase().includes(q);
    return matchesDept && matchesSearch;
  });

  const filteredApps = apps.filter((a) => {
    const q = appSearch.toLowerCase();
    const matchesSearch =
      !q ||
      a.name.toLowerCase().includes(q) ||
      a.position.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q);
    const matchesStatus = appStatusFilter === "all" || a.status === appStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-950 text-cyan-400 border border-cyan-800/60";
      case "Shortlisted":
        return "bg-amber-950 text-amber-400 border border-amber-800/60";
      case "Interview":
        return "bg-purple-950 text-purple-400 border border-purple-800/60";
      case "Hired":
        return "bg-emerald-950 text-emerald-300 border border-emerald-700/80";
      default:
        return "bg-red-950 text-red-300 border border-red-800/60";
    }
  };

  return (
    <div className="w-full space-y-6">
      <AdminPageHeader
        icon={<Briefcase className="w-6 h-6 text-amber-400" />}
        title="Careers, Job Openings & Applicants"
        subtitle="Create, edit & toggle open positions shown on /careers and review candidate applications stored in PostgreSQL."
        addLabel={activeTab === "jobs" ? "Post Job Opening" : undefined}
        addHref={activeTab === "jobs" ? "/admin/careers/jobs/new" : undefined}
        onRefresh={loadAll}
        onReset={activeTab === "jobs" ? handleResetJobs : undefined}
        loading={loading}
        storageMode={storageMode}
      />

      <AdminErrorBanner error={loadError} onRetry={loadAll} />

      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("jobs")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "jobs"
              ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950/50"
              : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Job Openings</span>
          <span className="px-2 py-0.5 rounded-full bg-black/25 text-[10px]">
            {jobs.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("applications")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "applications"
              ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950/50"
              : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Candidate Applications</span>
          <span className="px-2 py-0.5 rounded-full bg-black/25 text-[10px]">
            {apps.length}
          </span>
        </button>
      </div>

      {activeTab === "jobs" ? (
        <div className="space-y-5">
          <AdminSearchToolbar
            search={jobSearch}
            onSearchChange={setJobSearch}
            searchPlaceholder="Search job title, facility, or responsibilities..."
            categories={JOB_DEPARTMENTS}
            activeCategory={jobDeptFilter}
            onCategoryChange={setJobDeptFilter}
            totalCount={filteredJobs.length}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {loading ? <AdminCardSkeletonItems count={4} /> : filteredJobs.map((job) => (
              <div
                key={job.id}
                className={`bg-slate-900 border rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all ${
                  job.isActive === false ? "border-slate-800/60 opacity-65" : "border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/70">
                        {job.department}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-950 text-slate-300 border border-slate-800">
                        {job.experience}
                      </span>
                      {job.isActive === false && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800/70">
                          Closed / Hidden
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      #{job.order ?? 0}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">
                    {job.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {job.summary}
                  </p>

                  <div className="flex flex-wrap gap-4 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      {job.facility}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {job.type}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/careers/jobs/${job.id}/edit`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white"
                    >
                      <Pencil className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Edit</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleToggleJobActive(job)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer"
                      title={job.isActive === false ? "Publish Job" : "Hide Job"}
                    >
                      {job.isActive === false ? (
                        <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete({ type: "job", id: job.id })}
                    className="p-1.5 rounded-lg bg-slate-950 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-800 cursor-pointer"
                    title="Delete Job Opening"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
            <input
              type="text"
              value={appSearch}
              onChange={(e) => setAppSearch(e.target.value)}
              placeholder="Search candidates by name, position, or email..."
              className="w-full md:w-96 px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Recruitment Stage:</span>
              <select
                value={appStatusFilter}
                onChange={(e) => setAppStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
              >
                <option value="all">All Candidates</option>
                <option value="New">New Applicants</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview">Interview Scheduled</option>
                <option value="Hired">Hired / Offered</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-extrabold">
                  <tr>
                    <th className="py-3.5 px-4">Candidate Profile</th>
                    <th className="py-3.5 px-4">Target Role &amp; Location</th>
                    <th className="py-3.5 px-4">Experience</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Stage</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {loading ? <AdminTableSkeletonRows rows={5} columns={6} /> : filteredApps.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{item.name}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-3 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-500" /> {item.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-500" /> {item.phone}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-200">{item.position}</div>
                        <div className="text-[11px] text-slate-500">{item.facility}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{item.experience}</td>
                      <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                        {item.date}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={item.status}
                          onChange={(e) => handleAppStatusChange(item.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer focus:outline-none ${getBadgeStyle(
                            item.status
                          )}`}
                        >
                          <option value="New">New</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Interview">Interview</option>
                          <option value="Hired">Hired</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => setConfirmDelete({ type: "app", id: item.id })}
                          className="p-1.5 rounded-lg bg-slate-950 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-800 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredApps.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-slate-500 text-xs">
                        No matching candidate applications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <AdminConfirmDeleteModal
        isOpen={Boolean(confirmDelete)}
        title={
          confirmDelete?.type === "job"
            ? "Delete Job Opening?"
            : "Delete Candidate Application?"
        }
        description="This action permanently deletes the record from PostgreSQL."
        onCancel={() => setConfirmDelete(null)}
        onConfirm={handleConfirmDelete}
        loading={saving}
      />

      <AdminToast toast={toast} onClose={clearToast} />
    </div>
  );
}
