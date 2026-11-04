"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2, ShieldCheck, Upload, FileText, ArrowRight } from "lucide-react";
import { ProductItem } from "@/data/companyData";

interface RFQDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: ProductItem | null;
}

export default function RFQDrawer({ isOpen, onClose, initialProduct }: RFQDrawerProps) {
  const [submitted, setSubmitted] = useState(false);
  const [rfqNumber, setRfqNumber] = useState("");
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    category: initialProduct?.categoryLabel || "Tin Cans & Aerosols",
    volume: "50,000 - 100,000 units/year",
    capacity: initialProduct?.capacityRange || "500ml",
    customPrinting: true,
    notes: initialProduct ? `Inquiry regarding: ${initialProduct.name}` : "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generated = `RFQ-2026-XCL-${Math.floor(1000 + Math.random() * 9000)}`;
    setRfqNumber(generated);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200">
          {/* Header */}
          <div className="p-6 bg-slate-950 text-white border-b border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" />
                Enterprise B2B Procurement
              </div>
              <h2 className="text-xl font-black tracking-tight">Request a Quote (RFQ)</h2>
              <p className="text-slate-400 text-xs mt-0.5">Xclusive Can &amp; Q Pail Manufacturing Lines</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-1">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-950">Quotation Request Dispatched!</h3>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 max-w-sm mx-auto">
                  <span className="text-slate-500 block">RFQ Reference Tracking ID:</span>
                  <strong className="text-blue-700 text-base font-mono font-bold">{rfqNumber}</strong>
                </div>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{formData.contactPerson}</strong>. Our senior packaging engineer and corporate sales
                  director for <strong>{formData.companyName}</strong> will review your technical specifications and
                  contact you within 4 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Product Selection Alert */}
                {initialProduct && (
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 flex items-center gap-3">
                    <div className="p-1.5 rounded bg-blue-600 text-white font-bold">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-blue-900 font-bold block">{initialProduct.name}</span>
                      <span className="text-blue-700 text-[11px]">{initialProduct.material} &bull; {initialProduct.capacityRange}</span>
                    </div>
                  </div>
                )}

                {/* Company Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Company / Brand Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Berger Paints Bangladesh"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Contact Officer Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Engr. Tanvir Ahmed"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                    />
                  </div>
                </div>

                {/* Contact Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Work Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="procurement@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+88017XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                    />
                  </div>
                </div>

                {/* Packaging Category & Volume */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Container Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-600 outline-none bg-white"
                    >
                      <option>Tin Cans &amp; Aerosols</option>
                      <option>Plastic Bottles (PET/HDPE)</option>
                      <option>Q Pail Industrial Buckets</option>
                      <option>Pharma Droppers &amp; Jars</option>
                      <option>Food Grade Trays</option>
                      <option>Custom Mold &amp; Tooling Project</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Estimated Annual Volume</label>
                    <select
                      value={formData.volume}
                      onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-600 outline-none bg-white font-mono"
                    >
                      <option>10,000 &ndash; 50,000 units</option>
                      <option>50,000 &ndash; 100,000 units/year</option>
                      <option>100,000 &ndash; 500,000 units/year</option>
                      <option>500,000+ units (Bulk Enterprise)</option>
                    </select>
                  </div>
                </div>

                {/* Capacity Target */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Required Capacity / Dimensions</label>
                  <input
                    type="text"
                    placeholder="e.g. 500ml or 20 Liters with Bericap neck finish"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
                  />
                </div>

                {/* Printing Option */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800 block">Custom Printing &amp; Lithography Required</span>
                    <span className="text-[11px] text-slate-500">In-Mold Labeling (IML) or Multi-color Offset</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.customPrinting}
                    onChange={(e) => setFormData({ ...formData, customPrinting: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                </div>

                {/* Additional Technical Notes */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Technical Specs &amp; Chemical Compatibility</label>
                  <textarea
                    rows={3}
                    placeholder="Specify target liquid, viscosity, drop-test requirements, or mold delivery deadline..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-600 outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Request for Quotation (RFQ)</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer Security Badges */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Non-Disclosure (NDA) Protected
            </span>
            <span className="font-mono text-slate-400">LEED Platinum Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
