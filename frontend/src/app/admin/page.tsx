"use client";

import React from "react";
import Link from "next/link";
import {
  Package,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Building,
} from "lucide-react";
import { PRODUCTS_CATALOG, COMPANY_INFO } from "@/data/companyData";

const MOCK_RFQS = [
  {
    id: "RFQ-2026-XCL-8841",
    company: "Berger Paints Bangladesh Ltd.",
    contact: "Engr. Shamimur Rahman",
    category: "Q Pail Industrial Buckets",
    volume: "120,000 units/year",
    capacity: "20 Liters & 4 Liters",
    date: "2 hours ago",
    status: "New Inquiry",
    statusColor: "bg-blue-950 text-cyan-400 border border-cyan-800/60",
  },
  {
    id: "RFQ-2026-XCL-8839",
    company: "Square Pharmaceuticals Ltd.",
    contact: "Dr. Farhana Yasmin",
    category: "Pharma Droppers & Jars",
    volume: "250,000 units/year",
    capacity: "10ml Calibrated Dropper",
    date: "5 hours ago",
    status: "Technical Review",
    statusColor: "bg-amber-950 text-amber-400 border border-amber-800/60",
  },
  {
    id: "RFQ-2026-XCL-8835",
    company: "Akij Food & Beverage Ltd.",
    contact: "Zahid Hasan",
    category: "PET Beverage Bottles",
    volume: "500,000 units/year",
    capacity: "500ml Crystal PET",
    date: "Yesterday",
    status: "Sample Dispatched",
    statusColor: "bg-emerald-950 text-emerald-400 border border-emerald-800/60",
  },
  {
    id: "RFQ-2026-XCL-8828",
    company: "Dulux / AkzoNobel Bangladesh",
    contact: "Kamrul Islam",
    category: "Tin Cans & Aerosols",
    volume: "80,000 units/year",
    capacity: "1 Liter Paint Tin",
    date: "2 days ago",
    status: "Quotation Sent",
    statusColor: "bg-purple-950 text-purple-400 border border-purple-800/60",
  },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8 max-w-[1480px] mx-auto">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Executive Dashboard Overview</h1>
          <p className="text-slate-400 text-xs mt-1">
            Manufacturing telemetry, B2B quotation pipeline, and catalog control suite.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-600/25 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New Product
          </Link>
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            Storefront
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Active Products</span>
            <Package className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{PRODUCTS_CATALOG.length}</div>
          <p className="text-[11px] text-cyan-400">Metal Cans, PET &amp; Pails with TDS</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Pending RFQ Inquiries</span>
            <FileText className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{MOCK_RFQS.length}</div>
          <p className="text-[11px] text-emerald-400">4 New Enterprise Quotes</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Annual Production Cap</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">500M+</div>
          <p className="text-[11px] text-slate-400">Gazipur &amp; Tongi facilities</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Plant Energy Benchmark</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 font-mono">LEED Plat.</div>
          <p className="text-[11px] text-slate-400">U.S. GBC Zero-Waste Certified</p>
        </div>
      </div>

      {/* Main Table: Incoming Corporate RFQs */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Recent Request for Quotation (RFQ) Pipeline</h2>
            <p className="text-slate-400 text-xs mt-0.5">Corporate procurement inquiries submitted via website</p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40">
            Real-time Sync
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-4">RFQ Ref</th>
                <th className="p-4">Client / Brand</th>
                <th className="p-4">Category</th>
                <th className="p-4">Capacity &amp; Spec</th>
                <th className="p-4">Annual Volume</th>
                <th className="p-4">Time</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {MOCK_RFQS.map((rfq) => (
                <tr key={rfq.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-cyan-400">{rfq.id}</td>
                  <td className="p-4">
                    <strong className="text-white block">{rfq.company}</strong>
                    <span className="text-[11px] text-slate-400">{rfq.contact}</span>
                  </td>
                  <td className="p-4">{rfq.category}</td>
                  <td className="p-4 font-mono text-slate-400">{rfq.capacity}</td>
                  <td className="p-4 font-mono font-bold text-white">{rfq.volume}</td>
                  <td className="p-4 text-slate-400 font-mono text-[11px]">{rfq.date}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${rfq.statusColor}`}>
                      {rfq.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="px-3 py-1 rounded bg-slate-800 hover:bg-blue-600 text-white font-semibold text-[11px] transition-colors">
                      Review Specs
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Grid: Products & Facility Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Quick List */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white">Live Product Catalog (6 Items)</h3>
            <Link href="#products" className="text-xs text-cyan-400 hover:underline">
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {PRODUCTS_CATALOG.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{p.name}</h4>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {p.material} &bull; {p.capacityRange}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-blue-800/40">
                  {p.categoryLabel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Manufacturing Base & System Status */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white">Plant Status &amp; Quality Metrics</h3>
            <span className="text-xs font-mono text-emerald-400">100% Online</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <strong className="text-white block">Plant 1 (Gazipur HQ):</strong>
                <span className="text-slate-400 text-[11px]">{COMPANY_INFO.headquarters}</span>
              </div>
              <span className="text-emerald-400 font-bold">Active</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <strong className="text-white block">Plant 2 (Tongi BSCIC I/A):</strong>
                <span className="text-slate-400 text-[11px]">{COMPANY_INFO.plant2}</span>
              </div>
              <span className="text-emerald-400 font-bold">Active</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <strong className="text-white block">Certifications Audit:</strong>
                <span className="text-slate-400 text-[11px]">ISO 9001:2015, ISO 22000, HACCP, GMP, LEED Platinum</span>
              </div>
              <span className="text-cyan-400 font-bold">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

