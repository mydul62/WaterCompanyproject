"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Building,
  Phone,
  Mail,
  ShieldCheck,
  Save,
  Database,
  Server,
  ImageIcon,
  RefreshCw,
} from "lucide-react";
import { API_BASE_URL, api } from "@/lib/api";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import {
  AdminErrorBanner,
  AdminToast,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";
import { AdminFormSkeleton } from "@/components/common/Skeletons";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast, showToast, clearToast } = useAdminToast();

  // Settings State
  const [siteName, setSiteName] = useState("");
  const [siteTagline, setSiteTagline] = useState("");
  const [logoDark, setLogoDark] = useState("");
  const [logoLight, setLogoLight] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");
  const [businessHours, setBusinessHours] = useState("");
  const [factoryGazipur, setFactoryGazipur] = useState("");
  const [factoryTongi, setFactoryTongi] = useState("");
  const [phoneSales, setPhoneSales] = useState("");
  const [phoneProcurement, setPhoneProcurement] = useState("");
  const [emailSales, setEmailSales] = useState("");
  const [emailProcurement, setEmailProcurement] = useState("");

  // Media Picker Modal
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [activeMediaTarget, setActiveMediaTarget] = useState<"logoDark" | "logoLight" | "favicon">("logoDark");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await api.settings.getMap();
      const map = res.data || {};
      setSiteName(map["site_name"] || "");
      setSiteTagline(map["site_tagline"] || "");
      setLogoDark(map["logo_dark"] || "");
      setLogoLight(map["logo_light"] || "");
      setFaviconUrl(map["favicon"] || "");
      setBusinessHours(map["business_hours"] || "");
      setFactoryGazipur(map["factory_gazipur"] || "");
      setFactoryTongi(map["factory_tongi"] || "");
      setPhoneSales(map["phone_sales"] || "");
      setPhoneProcurement(map["phone_procurement"] || "");
      setEmailSales(map["email_sales"] || "");
      setEmailProcurement(map["email_procurement"] || "");
    } catch (err: any) {
      setLoadError(err?.message || "Failed to load facility settings from PostgreSQL.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const batch = [
      { key: "site_name", value: siteName },
      { key: "site_tagline", value: siteTagline },
      { key: "logo_dark", value: logoDark },
      { key: "logo_light", value: logoLight },
      { key: "favicon", value: faviconUrl },
      { key: "business_hours", value: businessHours },
      { key: "factory_gazipur", value: factoryGazipur },
      { key: "factory_tongi", value: factoryTongi },
      { key: "phone_sales", value: phoneSales },
      { key: "phone_procurement", value: phoneProcurement },
      { key: "email_sales", value: emailSales },
      { key: "email_procurement", value: emailProcurement },
    ];

    try {
      await api.settings.updateBatch(batch);
      showToast("Website settings successfully synchronized with PostgreSQL!");
    } catch (err: any) {
      showToast(err?.message || "Failed to save settings to PostgreSQL.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenMediaPicker = (target: "logoDark" | "logoLight" | "favicon") => {
    setActiveMediaTarget(target);
    setIsMediaModalOpen(true);
  };

  const handleMediaSelected = (asset: { url: string }) => {
    if (activeMediaTarget === "logoDark") setLogoDark(asset.url);
    else if (activeMediaTarget === "logoLight") setLogoLight(asset.url);
    else setFaviconUrl(asset.url);
    showToast("Branding asset selected (click Save Settings to persist)");
  };

  return (
    <div className="space-y-6">
      <AdminToast toast={toast} onClose={clearToast} />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">
              Website &amp; Facility Settings
            </h1>
            <p className="text-xs text-slate-400">
              Corporate identity, branding logos, plant operating schedules, and database connectivity
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadSettings}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-blue-400" : ""}`} />
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>

      <AdminErrorBanner error={loadError} onRetry={loadSettings} />

      {/* Settings Grid */}
      {loading ? (
        <AdminFormSkeleton />
      ) : (
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start text-xs">
        {/* Left Column: Branding & Identity */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-sm font-black text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <Building className="w-4 h-4 text-cyan-400" />
              Corporate Identity &amp; Branding
            </h2>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Company Legal Name</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Company Tagline / Motto</label>
              <input
                type="text"
                value={siteTagline}
                onChange={(e) => setSiteTagline(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">
                Header Logo (Dark Theme Version)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={logoDark}
                  onChange={(e) => setLogoDark(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleOpenMediaPicker("logoDark")}
                  className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Browse Imaple
                </button>
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">
                Header Logo (Light Theme Version)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={logoLight}
                  onChange={(e) => setLogoLight(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleOpenMediaPicker("logoLight")}
                  className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Browse Imaple
                </button>
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Operating Business Hours</label>
              <input
                type="text"
                value={businessHours}
                onChange={(e) => setBusinessHours(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Communications & Plant Parameters */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-sm font-black text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <Phone className="w-4 h-4 text-cyan-400" />
              Factory Plants &amp; Direct Desks
            </h2>

            <div>
              <label className="text-slate-300 font-bold block mb-1">
                Main Manufacturing Facility (Kaliakoir, Gazipur)
              </label>
              <textarea
                rows={2}
                value={factoryGazipur}
                onChange={(e) => setFactoryGazipur(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">
                Plastic &amp; Pail Dispatch Facility
              </label>
              <textarea
                rows={2}
                value={factoryTongi}
                onChange={(e) => setFactoryTongi(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Sales Hotline</label>
                <input
                  type="text"
                  value={phoneSales}
                  onChange={(e) => setPhoneSales(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-slate-300 font-bold block mb-1">Procurement Phone</label>
                <input
                  type="text"
                  value={phoneProcurement}
                  onChange={(e) => setPhoneProcurement(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Sales Department Email</label>
                <input
                  type="email"
                  value={emailSales}
                  onChange={(e) => setEmailSales(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-slate-300 font-bold block mb-1">Commercial Desk Email</label>
                <input
                  type="email"
                  value={emailProcurement}
                  onChange={(e) => setEmailProcurement(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Database & System Architecture Status */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h2 className="text-sm font-black text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <Database className="w-4 h-4 text-cyan-400" />
              Database Engine &amp; Health Architecture
            </h2>

            <div className="space-y-2 text-[11px] font-mono">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">Database Engine:</span>
                <span className="text-emerald-400 font-bold">PostgreSQL (Prisma ORM)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">Database Target:</span>
                <span className="text-cyan-400 font-bold">noor_plastic_db</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">REST API Gateway:</span>
                <span className="text-cyan-400 font-bold break-all">{API_BASE_URL}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">LEED Platinum Compliance:</span>
                <span className="text-emerald-400 font-bold">Active (Audit Verified)</span>
              </div>
            </div>
          </div>
        </div>
      </form>
      )}

      {/* Media Picker */}
      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={handleMediaSelected}
        currentValue={
          activeMediaTarget === "logoDark"
            ? logoDark
            : activeMediaTarget === "logoLight"
            ? logoLight
            : faviconUrl
        }
      />
    </div>
  );
}
