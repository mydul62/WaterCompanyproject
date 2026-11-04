"use client";

import React, { useState, useMemo } from "react";
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Send,
  Building,
  Mail,
  Phone,
  Calendar,
  X,
  Download,
  AlertCircle,
} from "lucide-react";

interface RFQItem {
  id: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  category: string;
  volume: string;
  capacity: string;
  date: string;
  status: "New Inquiry" | "Technical Review" | "Sample Dispatched" | "Quotation Sent" | "Closed Won";
  notes?: string;
}

const INITIAL_RFQS: RFQItem[] = [
  {
    id: "RFQ-2026-XCL-8841",
    company: "Berger Paints Bangladesh Ltd.",
    contact: "Engr. Shamimur Rahman",
    email: "shamim.rahman@bergerbd.com",
    phone: "+880 1711-234567",
    category: "Q Pail Industrial Buckets",
    volume: "120,000 units/year",
    capacity: "20 Liters & 4 Liters",
    date: "2026-11-04 14:30",
    status: "New Inquiry",
    notes: "Requires UN certification for export-grade solvent-based emulsion paint.",
  },
  {
    id: "RFQ-2026-XCL-8839",
    company: "Square Pharmaceuticals Ltd.",
    contact: "Dr. Farhana Yasmin",
    email: "f.yasmin@squarepharma.com.bd",
    phone: "+880 1819-876543",
    category: "Pharma Droppers & Jars",
    volume: "250,000 units/year",
    capacity: "10ml Calibrated Dropper",
    date: "2026-11-04 11:15",
    status: "Technical Review",
    notes: "Cleanroom Class 100,000 protocol required. Gamma radiation test certificate requested.",
  },
  {
    id: "RFQ-2026-XCL-8835",
    company: "Akij Food & Beverage Ltd.",
    contact: "Zahid Hasan",
    email: "zahid.hasan@akij.net",
    phone: "+880 1912-345678",
    category: "PET Beverage Bottles",
    volume: "500,000 units/year",
    capacity: "500ml Crystal PET",
    date: "2026-11-03 16:45",
    status: "Sample Dispatched",
    notes: "Sample batch of 50 preforms sent via Gazipur express courier.",
  },
  {
    id: "RFQ-2026-XCL-8828",
    company: "Dulux / AkzoNobel Bangladesh",
    contact: "Kamrul Islam",
    email: "kamrul.islam@akzonobel.com",
    phone: "+880 1680-112233",
    category: "Tin Cans & Aerosols",
    volume: "80,000 units/year",
    capacity: "1 Liter Paint Tin",
    date: "2026-11-02 10:20",
    status: "Quotation Sent",
    notes: "Official price breakdown per thousand units provided. Awaiting commercial sign-off.",
  },
  {
    id: "RFQ-2026-XCL-8819",
    company: "Marico Bangladesh Limited",
    contact: "Nusrat Jahan",
    email: "nusrat.jahan@marico.com",
    phone: "+880 1714-998877",
    category: "Plastic Bottles",
    volume: "350,000 units/year",
    capacity: "200ml Hair Oil Bottle",
    date: "2026-10-31 09:00",
    status: "Closed Won",
    notes: "Annual master contract executed for Tongi plant supply line.",
  },
];

export default function AdminInquiriesPage() {
  const [rfqs, setRfqs] = useState<RFQItem[]>(INITIAL_RFQS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRfq, setSelectedRfq] = useState<RFQItem | null>(null);

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

  const handleUpdateStatus = (id: string, newStatus: RFQItem["status"]) => {
    setRfqs((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    if (selectedRfq && selectedRfq.id === id) {
      setSelectedRfq({ ...selectedRfq, status: newStatus });
    }
  };

  const getStatusBadge = (status: RFQItem["status"]) => {
    switch (status) {
      case "New Inquiry":
        return "bg-blue-950 text-cyan-400 border border-cyan-800/60";
      case "Technical Review":
        return "bg-amber-950 text-amber-400 border border-amber-800/60";
      case "Sample Dispatched":
        return "bg-emerald-950 text-emerald-400 border border-emerald-800/60";
      case "Quotation Sent":
        return "bg-purple-950 text-purple-400 border border-purple-800/60";
      case "Closed Won":
        return "bg-green-950 text-green-300 border border-green-700/80 font-black";
    }
  };

  return (
    <div className="space-y-8 max-w-[1638px] mx-auto">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-cyan-400" />
            Request for Quotation (RFQ) Pipeline
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Corporate enterprise leads, sample dispatches, and custom manufacturing quotation workflows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
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
            className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-2 transition-colors active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            Export to CSV
          </button>
        </div>
      </div>

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
              {filteredRfqs.map((rfq) => (
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
                    <button
                      onClick={() => setSelectedRfq(rfq)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RFQ Detail Modal */}
      {selectedRfq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold">{selectedRfq.id}</span>
                <h2 className="text-lg font-black text-white">{selectedRfq.company}</h2>
              </div>
              <button
                onClick={() => setSelectedRfq(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 block font-semibold">Contact Person</span>
                <span className="text-white font-bold">{selectedRfq.contact}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block font-semibold">Phone Number</span>
                <span className="text-white font-mono">{selectedRfq.phone}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block font-semibold">Email Address</span>
                <span className="text-cyan-400 font-mono">{selectedRfq.email}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block font-semibold">Timestamp</span>
                <span className="text-slate-300 font-mono">{selectedRfq.date}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block font-semibold">Category &amp; Size</span>
                <span className="text-white">{selectedRfq.category} ({selectedRfq.capacity})</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block font-semibold">Production Volume</span>
                <span className="text-emerald-400 font-mono font-bold">{selectedRfq.volume}</span>
              </div>
            </div>

            {selectedRfq.notes && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-slate-400 block font-bold mb-1">Buyer Notes &amp; Specifications</span>
                <p className="text-slate-300 leading-relaxed">{selectedRfq.notes}</p>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Current Status:</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${getStatusBadge(selectedRfq.status)}`}>
                  {selectedRfq.status}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${selectedRfq.email}?subject=Xclusive Can Limited - Quotation for ${selectedRfq.category}`}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/30"
                >
                  <Send className="w-3.5 h-3.5" />
                  Email Quotation
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

