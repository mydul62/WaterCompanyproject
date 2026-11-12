"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  FileText,
  Search,
  Calendar,
  Download,
  RefreshCw,
} from "lucide-react";
import { api } from "@/lib/api";
import {
  RFQItem,
  normalizeRfqItem,
  getStatusBadge,
} from "./_components/rfqStore";
import {
  AdminErrorBanner,
  AdminToast,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";
import { AdminTableSkeletonRows } from "@/components/common/Skeletons";

export default function AdminInquiriesPage() {
  const [rfqs, setRfqs] = useState<RFQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast, showToast, clearToast } = useAdminToast();

  const loadRfqs = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await api.inquiries.getAll();
      const rows = Array.isArray(res?.data) ? res.data : [];
      setRfqs(rows.map(normalizeRfqItem));
    } catch (err: any) {
      setRfqs([]);
      setLoadError(err?.message || "Unable to load RFQ inquiries from PostgreSQL.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRfqs();
  }, [loadRfqs]);

  const filteredRfqs = useMemo(() => {
    return rfqs.filter((item) => {
      const matchSearch =
        item.company.toLowerCase().includes(search.toLowerCase()) ||
        item.contact.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter === "all" || item.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [rfqs, search, statusFilter]);

  const handleUpdateStatus = async (id: string, newStatus: RFQItem["status"]) => {
    try {
      await api.inquiries.updateStatus(id, newStatus);
      setRfqs((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
      showToast(`Status updated to "${newStatus}".`);
    } catch (err: any) {
      showToast(err?.message || "Failed to update inquiry status in database.", "error");
    }
  };

  return (
    <div className="space-y-8 w-full">
      <AdminToast toast={toast} onClose={clearToast} />

      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-cyan-400" />
            Request for Quotation (RFQ) Pipeline
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Corporate enterprise leads, sample dispatches, and custom manufacturing quotation workflows stored in PostgreSQL.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadRfqs}
            disabled={loading}
            className="px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-cyan-400" : ""}`} />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => {
              const headers = "Quote ID,Company,Contact,Email,Phone,Category,Volume,Date,Status\n";
              const rows = rfqs.map(r => `"${r.id}","${r.company}","${r.contact}","${r.email}","${r.phone}","${r.category}","${r.volume}","${r.date}","${r.status}"`).join("\n");
              const blob = new Blob([headers + rows], { type: "text/csv" });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `XCL-RFQ-Export-${new Date().toISOString().slice(0, 10)}.csv`;
              a.click();
            }}
            className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-2 transition-colors active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            Export to CSV
          </button>
        </div>
      </div>

      <AdminErrorBanner error={loadError} onRetry={loadRfqs} />

      {/* KPI Tickers */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block font-medium">Total RFQs Received</span>
          <span className="text-2xl font-black text-white font-mono mt-1 block">{rfqs.length}</span>
          <span className="text-[11px] text-cyan-400">FMCG &amp; Paints Enterprise</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block font-medium">New Unreviewed</span>
          <span className="text-2xl font-black text-cyan-400 font-mono mt-1 block">
            {rfqs.filter((r) => r.status === "New Inquiry").length}
          </span>
          <span className="text-[11px] text-slate-500">Requires technical response</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block font-medium">Samples Dispatched</span>
          <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">
            {rfqs.filter((r) => r.status === "Sample Dispatched").length}
          </span>
          <span className="text-[11px] text-slate-500">Physical evaluation stage</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block font-medium">Closed Won Deals</span>
          <span className="text-2xl font-black text-green-400 font-mono mt-1 block">
            {rfqs.filter((r) => r.status === "Closed Won").length}
          </span>
          <span className="text-[11px] text-green-500 font-semibold">Supply contracts active</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by company, person or quote ID..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="New Inquiry">New Inquiry</option>
            <option value="Technical Review">Technical Review</option>
            <option value="Sample Dispatched">Sample Dispatched</option>
            <option value="Quotation Sent">Quotation Sent</option>
            <option value="Closed Won">Closed Won</option>
          </select>
        </div>
      </div>

      {/* RFQ Inquiries Table */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-extrabold">
              <tr>
                <th className="py-3.5 px-4">Quote Identifier</th>
                <th className="py-3.5 px-4">Enterprise / Client</th>
                <th className="py-3.5 px-4">Container Category</th>
                <th className="py-3.5 px-4">Requested Volume</th>
                <th className="py-3.5 px-4">Status &amp; Stage</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {loading ? (
                <AdminTableSkeletonRows rows={4} columns={6} />
              ) : filteredRfqs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 px-4 text-center text-slate-500">
                    {rfqs.length === 0
                      ? "No quotation inquiries have been submitted yet."
                      : "No inquiries match your current search or status filter."}
                  </td>
                </tr>
              ) : (
                filteredRfqs.map((rfq) => (
                <tr key={rfq.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-cyan-400 block">{rfq.id}</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {rfq.date}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-white block text-sm">{rfq.company}</span>
                    <span className="text-[11px] text-slate-400">
                      {rfq.contact} &bull; {rfq.phone}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-slate-300 font-semibold block">{rfq.category}</span>
                    <span className="text-[11px] text-slate-500">{rfq.capacity}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-white">
                    {rfq.volume}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={rfq.status}
                      onChange={(e) => handleUpdateStatus(rfq.id, e.target.value as RFQItem["status"])}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full cursor-pointer focus:outline-none ${getStatusBadge(
                        rfq.status
                      )}`}
                    >
                      <option value="New Inquiry" className="bg-slate-900 text-cyan-400">New Inquiry</option>
                      <option value="Technical Review" className="bg-slate-900 text-amber-400">Technical Review</option>
                      <option value="Sample Dispatched" className="bg-slate-900 text-emerald-400">Sample Dispatched</option>
                      <option value="Quotation Sent" className="bg-slate-900 text-purple-400">Quotation Sent</option>
                      <option value="Closed Won" className="bg-slate-900 text-green-400">Closed Won</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/admin/inquiries/${rfq.id}`}
                      className="inline-block px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
                    >
                      Inspect
                    </Link>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

