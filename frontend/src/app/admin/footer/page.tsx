"use client";

import React, { useState, useEffect } from "react";
import {
  PanelBottom,
  Save,
  MapPin,
  Phone,
  Mail,
  Share2,
  ShieldCheck,
  RefreshCw,
  Copy,
} from "lucide-react";
import { api } from "@/lib/api";
import {
  AdminErrorBanner,
  AdminToast,
  useAdminToast,
} from "@/components/admin/AdminCrudShell";
import { AdminFormSkeleton } from "@/components/common/Skeletons";

export default function FooterManagementPage() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast, showToast, clearToast } = useAdminToast();

  // Footer Fields
  const [companyName, setCompanyName] = useState("");
  const [plantGazipur, setPlantGazipur] = useState("");
  const [plantTongi, setPlantTongi] = useState("");
  const [phoneForeign, setPhoneForeign] = useState("");
  const [phoneDomestic, setPhoneDomestic] = useState("");
  const [emailSales, setEmailSales] = useState("");
  const [emailProcurement, setEmailProcurement] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [copyrightText, setCopyrightText] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [developerUrl, setDeveloperUrl] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await api.settings.getMap();
      const map = res.data || {};
      setCompanyName(map["site_name"] || "");
      setPlantGazipur(map["factory_gazipur"] || "");
      setPlantTongi(map["factory_tongi"] || "");
      setPhoneForeign(map["phone_sales"] || "");
      setPhoneDomestic(map["phone_domestic"] || "");
      setEmailSales(map["email_sales"] || "");
      setEmailProcurement(map["email_procurement"] || "");
      setLinkedinUrl(map["social_linkedin"] || "");
      setYoutubeUrl(map["social_youtube"] || "");
      setFacebookUrl(map["social_facebook"] || "");
      setCopyrightText(map["footer_copyright"] || map["copyright_text"] || "");
      setDeveloperName(map["developer_name"] || "");
      setDeveloperUrl(map["developer_url"] || "");
    } catch (err: any) {
      setLoadError(err?.message || "Failed to load footer settings from PostgreSQL.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFooter = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const batch = [
      { key: "site_name", value: companyName },
      { key: "factory_gazipur", value: plantGazipur },
      { key: "factory_tongi", value: plantTongi },
      { key: "phone_sales", value: phoneForeign },
      { key: "phone_domestic", value: phoneDomestic },
      { key: "email_sales", value: emailSales },
      { key: "email_procurement", value: emailProcurement },
      { key: "social_linkedin", value: linkedinUrl },
      { key: "social_youtube", value: youtubeUrl },
      { key: "social_facebook", value: facebookUrl },
      { key: "copyright_text", value: copyrightText },
      { key: "footer_copyright", value: copyrightText },
      { key: "developer_name", value: developerName },
      { key: "developer_url", value: developerUrl },
    ];

    try {
      await api.settings.updateBatch(batch);
      showToast("Footer settings synchronized with PostgreSQL!");
    } catch (err: any) {
      showToast(err?.message || "Failed to save footer settings to PostgreSQL.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminToast toast={toast} onClose={clearToast} />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <PanelBottom className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">
              Footer Content & Legal Information
            </h1>
            <p className="text-xs text-slate-400">
              Update factory plant locations, emergency sales phone lines, procurement emails, and social links
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
            onClick={handleSaveFooter}
            disabled={isSaving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Footer"}
          </button>
        </div>
      </div>

      <AdminErrorBanner error={loadError} onRetry={loadSettings} />

      {/* Form Grid */}
      {loading ? (
        <AdminFormSkeleton />
      ) : (
        <form onSubmit={handleSaveFooter} className="space-y-6 text-xs">
        {/* Plant Locations */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Plant & Factory Physical Addresses
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Main Manufacturing Facility (Kaliakoir, Gazipur)
              </label>
              <textarea
                rows={3}
                value={plantGazipur}
                onChange={(e) => setPlantGazipur(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Plastic &amp; Water Container Dispatch Hub
              </label>
              <textarea
                rows={3}
                value={plantTongi}
                onChange={(e) => setPlantTongi(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Communications */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Phone className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Phone & Official Email Desks
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Foreign Purchase / Corporate Hotline
              </label>
              <input
                type="text"
                value={phoneForeign}
                onChange={(e) => setPhoneForeign(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Domestic Sales Department Line
              </label>
              <input
                type="text"
                value={phoneDomestic}
                onChange={(e) => setPhoneDomestic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Sales & Marketing Official Email
              </label>
              <input
                type="email"
                value={emailSales}
                onChange={(e) => setEmailSales(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Procurement & Supply Chain Email
              </label>
              <input
                type="email"
                value={emailProcurement}
                onChange={(e) => setEmailProcurement(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links & Copyright */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Share2 className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Social Channels & Copyright
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">LinkedIn Profile</label>
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">YouTube Channel</label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Facebook Page</label>
              <input
                type="url"
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-slate-300 font-bold mb-1">
              Footer Copyright Notice
            </label>
            <input
              type="text"
              value={copyrightText}
              onChange={(e) => setCopyrightText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Developer Company Name
              </label>
              <input
                type="text"
                value={developerName}
                onChange={(e) => setDeveloperName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Developer Website URL
              </label>
              <input
                type="url"
                value={developerUrl}
                onChange={(e) => setDeveloperUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-cyan-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </form>
      )}
    </div>
  );
}

