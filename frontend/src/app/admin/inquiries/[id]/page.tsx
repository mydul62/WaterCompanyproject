"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FileText,
  Mail,
  Phone,
  Building,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Package,
  Layers,
} from "lucide-react";
import { api } from "@/lib/api";
import {
  AdminFormHeader,
  AdminEditLoadingState,
  AdminEditNotFoundState,
  AdminToast,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";
import {
  RFQItem,
  RFQ_STATUSES,
  getLocalRfqs,
  saveLocalRfqs,
  getStatusBadge,
} from "../_components/rfqStore";

export default function AdminInspectRfqPage() {
  const params = useParams();
  const id = Array.isArray(params?.id)
    ? params.id[0]
    : (params?.id as string | undefined);

  const [rfq, setRfq] = useState<RFQItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const { toast, showToast, clearToast } = useAdminToast();

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setNotFound(false);

      const localItems = getLocalRfqs();
      let found = localItems.find((item) => item.id === id) || null;

      if (!found) {
        try {
          const res = await api.inquiries.getAll();
          if (Array.isArray(res?.data)) {
            const match = res.data.find((row: any) => row.id === id);
            if (match) {
              found = {
                id: match.id,
                company: match.company || match.companyName || "Enterprise Client",
                contact: match.contact || match.contactName || match.name || "—",
                email: match.email || "",
                phone: match.phone || "",
                category: match.category || match.productCategory || "Custom Packaging",
                volume: match.volume || match.estimatedVolume || "—",
                capacity: match.capacity || match.capacitySpec || "—",
                date: match.date || (match.createdAt ? String(match.createdAt).slice(0, 16).replace("T", " ") : "—"),
                status: match.status || "New Inquiry",
                notes: match.notes || match.message || "",
              };
            }
          }
        } catch {
          // Use local state only when backend endpoint is unavailable
        }
      }

      if (!active) return;
      if (found) {
        setRfq(found);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }

    load();
    return () => {
      active = false;
    };
  }, [id]);

  const handleStatusChange = async (newStatus: RFQItem["status"]) => {
    if (!rfq) return;
    setUpdatingStatus(true);

    const updatedRfq: RFQItem = { ...rfq, status: newStatus };
    setRfq(updatedRfq);

    const localItems = getLocalRfqs();
    const updatedList = localItems.some((item) => item.id === rfq.id)
      ? localItems.map((item) => (item.id === rfq.id ? updatedRfq : item))
      : [updatedRfq, ...localItems];
    saveLocalRfqs(updatedList);

    try {
      await api.inquiries.updateStatus(rfq.id, newStatus);
    } catch {
      // Saved locally when backend is unavailable
    } finally {
      setUpdatingStatus(false);
    }
    showToast(`RFQ status updated to "${newStatus}".`);
  };

  return (
    <div className="w-full space-y-6 pb-10">
      <AdminFormHeader
        backHref="/admin/inquiries"
        backLabel="Back to RFQ Pipeline"
        icon={<FileText className="w-6 h-6 text-cyan-400" />}
        title={rfq ? rfq.company : "Inspect Quotation Request"}
        subtitle={
          rfq
            ? `Quote Reference: ${rfq.id} • Submitted ${rfq.date}`
            : "Review enterprise contact details, container specifications, and pipeline stage."
        }
      />

      {loading ? (
        <AdminEditLoadingState label="Loading quotation request..." />
      ) : notFound || !rfq ? (
        <AdminEditNotFoundState
          title="RFQ Inquiry Not Found"
          description="This quotation request could not be found in the RFQ pipeline."
          backHref="/admin/inquiries"
          backLabel="Back to RFQ Pipeline"
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
          {/* Left: Details & Technical Spec */}
          <div className="lg:col-span-8 space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <span className="font-mono text-xs font-bold text-cyan-400 block">
                    {rfq.id}
                  </span>
                  <h2 className="text-lg font-black text-white mt-0.5 flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-400" />
                    {rfq.company}
                  </h2>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusBadge(
                    rfq.status
                  )}`}
                >
                  {rfq.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Primary Contact
                  </span>
                  <p className="text-sm font-bold text-white">{rfq.contact}</p>
                  <p className="text-slate-400 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <a
                      href={`mailto:${rfq.email}`}
                      className="text-cyan-400 hover:underline font-mono"
                    >
                      {rfq.email}
                    </a>
                  </p>
                  <p className="text-slate-400 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-mono">{rfq.phone}</span>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Container Specification
                  </span>
                  <p className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-400" />
                    {rfq.category}
                  </p>
                  <p className="text-slate-300 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-slate-500" />
                    Capacity / Unit: <span className="font-bold text-white">{rfq.capacity}</span>
                  </p>
                  <p className="text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    Received: <span className="font-mono">{rfq.date}</span>
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400 font-semibold">
                  Estimated Annual / Order Volume
                </span>
                <span className="text-base font-black text-emerald-400 font-mono">
                  {rfq.volume}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  Client Technical Requirements &amp; Notes
                </span>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {rfq.notes || "No additional technical notes attached to this quotation request."}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Workflow Status & Communication Actions */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400">
                Pipeline Stage Control
              </h3>
              <p className="text-xs text-slate-400">
                Advance or update this enterprise inquiry across quotation workflow stages.
              </p>

              <div className="space-y-2">
                {RFQ_STATUSES.map((statusOption) => {
                  const isCurrent = rfq.status === statusOption;
                  return (
                    <button
                      key={statusOption}
                      type="button"
                      disabled={updatingStatus}
                      onClick={() => handleStatusChange(statusOption)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-left font-bold flex items-center justify-between transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-blue-600/20 border-blue-500 text-white"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                      }`}
                    >
                      <span>{statusOption}</span>
                      {isCurrent && (
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2.5">
                <a
                  href={`mailto:${rfq.email}?subject=${encodeURIComponent(
                    `Re: Quotation ${rfq.id} - Noor Plastic Industries`
                  )}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Draft Reply Email
                </a>
                <Link
                  href="/admin/inquiries"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center transition-colors"
                >
                  Back to RFQ Pipeline
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <AdminToast toast={toast} onClose={clearToast} />
    </div>
  );
}

