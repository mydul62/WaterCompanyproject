"use client";

import React, { useState } from "react";
import {
  Settings,
  Building,
  Phone,
  Mail,
  ShieldCheck,
  Save,
  CheckCircle,
  Database,
  Server,
} from "lucide-react";
import { COMPANY_INFO } from "@/data/companyData";

export default function AdminSettingsPage() {
  const [info, setInfo] = useState(COMPANY_INFO);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-[1643px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-slate-400" />
            Website &amp; Facility Settings
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Global enterprise metadata, corporate contacts, LEED Platinum plant parameters, and server health telemetry.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-600/30 transition-all active:scale-95"
        >
          <Save className="w-4 h-4" />
          Save Configurations
        </button>
      </div>

      {saved && (
        <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800/80 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>System configurations and plant contact metadata updated successfully!</span>
        </div>
      )}

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Corporate & Contact Details */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h2 className="text-sm font-black text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <Building className="w-4 h-4 text-cyan-400" />
              Corporate Identity &amp; Factory Campus
            </h2>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Company Legal Name</label>
              <input
                type="text"
                value={info.name}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Brand Portfolio Group</label>
              <input
                type="text"
                value={info.brandGroup}
                onChange={(e) => setInfo({ ...info, brandGroup: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 font-bold focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Main Plant &amp; HQ (Gazipur)</label>
              <textarea
                rows={2}
                value={info.headquarters}
                onChange={(e) => setInfo({ ...info, headquarters: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Plant 2 Location (Tongi)</label>
              <textarea
                rows={2}
                value={info.plant2}
                onChange={(e) => setInfo({ ...info, plant2: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h2 className="text-sm font-black text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <Phone className="w-4 h-4 text-emerald-400" />
              Direct Factory Hotlines &amp; Purchase Desks
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Sales Hotline 1</label>
                <input
                  type="text"
                  value={info.contacts.sales1}
                  onChange={(e) =>
                    setInfo({ ...info, contacts: { ...info.contacts, sales1: e.target.value } })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Sales Hotline 2</label>
                <input
                  type="text"
                  value={info.contacts.sales2}
                  onChange={(e) =>
                    setInfo({ ...info, contacts: { ...info.contacts, sales2: e.target.value } })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Foreign Purchase Desk</label>
                <input
                  type="text"
                  value={info.contacts.foreignPurchase}
                  onChange={(e) =>
                    setInfo({
                      ...info,
                      contacts: { ...info.contacts, foreignPurchase: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Marketing Email</label>
                <input
                  type="text"
                  value={info.contacts.emailMarketing}
                  onChange={(e) =>
                    setInfo({
                      ...info,
                      contacts: { ...info.contacts, emailMarketing: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Global Certifications & System Telemetry */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h2 className="text-sm font-black text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              International Certifications &amp; Accreditations
            </h2>

            <div className="space-y-3">
              {info.certifications.map((c, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{c.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950 text-cyan-400 border border-cyan-800/60 font-mono">
                      {c.issuer}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{c.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h2 className="text-sm font-black text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <Server className="w-4 h-4 text-emerald-400" />
              REST API &amp; Server Infrastructure Status
            </h2>

            <div className="space-y-2 font-mono text-[11px]">
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400">Backend API URL:</span>
                <span className="text-cyan-400">http://localhost:5000/api/v1</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400">API Gateway Status:</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE (200 OK)
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400">Database Engine:</span>
                <span className="text-slate-300">PostgreSQL (Prisma ORM)</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Environment:</span>
                <span className="text-amber-400">Production Ready (Turbopack)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

