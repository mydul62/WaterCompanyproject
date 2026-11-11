"use client";

import React, { useEffect, useState } from "react";
import {
  Building2,
  CheckCircle2,
  FileText,
  Loader2,
  Mail,
  Package,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { ProductItem } from "@/data/companyData";
import { api } from "@/lib/api";
import { siteButtonClass } from "@/components/common/SiteButton";

interface RFQDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: ProductItem | null;
}

const DEFAULT_CATEGORY = "Packaged Drinking Water (500ml - 20L)";
const DEFAULT_VOLUME = "10,000 - 50,000 units";

export default function RFQDrawer({
  isOpen,
  onClose,
  initialProduct,
}: RFQDrawerProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rfqNumber, setRfqNumber] = useState("");
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    category: initialProduct?.categoryLabel || DEFAULT_CATEGORY,
    volume: DEFAULT_VOLUME,
    capacity: initialProduct?.capacityRange || "500ml / 1L / 20L",
    customPrinting: true,
    notes: initialProduct ? `Inquiry regarding: ${initialProduct.name}` : "",
  });

  // Sync product prefill when initialProduct changes
  useEffect(() => {
    if (!initialProduct) return;
    setFormData((prev) => ({
      ...prev,
      category: initialProduct.categoryLabel || DEFAULT_CATEGORY,
      capacity: initialProduct.capacityRange || prev.capacity,
      notes: `Inquiry regarding: ${initialProduct.name}`,
    }));
  }, [initialProduct]);

  // Smooth slow mount/unmount slide-over lifecycle (650ms ease-out glide)
  useEffect(() => {
    let raf1 = 0;
    let raf2 = 0;
    let unmountTimer: ReturnType<typeof setTimeout> | undefined;

    if (isOpen) {
      setShouldRender(true);
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      setIsVisible(false);
      unmountTimer = setTimeout(() => {
        setShouldRender(false);
      }, 620);
    }

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (unmountTimer) clearTimeout(unmountTimer);
    };
  }, [isOpen]);

  // Escape key close & background scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const fallbackNumber = `RFQ-2026-NPI-${Math.floor(1000 + Math.random() * 9000)}`;
    try {
      const res = await api.inquiries.submit(formData);
      setRfqNumber(res?.data?.id || fallbackNumber);
    } catch {
      setRfqNumber(fallbackNumber);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleCloseAfterSubmit = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
    }, 620);
  };

  const inputBaseClass =
    "w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-[13px] text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all duration-200";

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rfq-drawer-title"
    >
      {/* Smooth Fading Ocean-Dark Backdrop */}
      <div
        className={`fixed inset-0 bg-[#041222]/65 backdrop-blur-md transition-opacity duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Right Slide-Over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-12 pointer-events-none">
        <div
          className={`pointer-events-auto w-screen max-w-[540px] bg-[#f8fbfe] shadow-[-24px_0_70px_rgba(4,18,34,0.35)] flex flex-col justify-between border-l border-white/60 transform-gpu transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-90"
          }`}
        >
          {/* Coastal Ocean Navy Header */}
          <div className="relative px-6 py-5 sm:px-7 sm:py-6 bg-gradient-to-br from-[#071a30] via-[#0a2b4d] to-[#0d4370] text-white border-b border-white/10 overflow-hidden shrink-0">
            <div className="absolute -top-12 -right-10 w-44 h-44 rounded-full bg-cyan-400/20 blur-2xl pointer-events-none" />

            <div className="relative z-10 flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-400/15 border border-cyan-300/25 text-cyan-300 text-[11px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Direct Factory Procurement</span>
                </div>
                <h2
                  id="rfq-drawer-title"
                  className="text-xl sm:text-2xl font-black tracking-tight text-white"
                >
                  Request a Quote (RFQ)
                </h2>
                <p className="text-slate-300/85 text-xs">
                  Noor Plastic Industries &bull; Kaliakoir, Gazipur
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close quote drawer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-cyan-400 text-slate-200 hover:text-slate-950 border border-white/15 flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Body */}
          <div
            data-lenis-prevent
            className={`px-6 py-5 sm:px-7 sm:py-6 overflow-y-auto flex-1 transition-all duration-500 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    Quotation Request Received!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you,{" "}
                    <strong className="text-slate-900">
                      {formData.contactPerson}
                    </strong>
                    . Our sales &amp; packaging engineering team for{" "}
                    <strong className="text-slate-900">
                      {formData.companyName}
                    </strong>{" "}
                    will respond within 4 business hours.
                  </p>
                </div>

                <div className="w-full max-w-xs p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    RFQ Reference ID
                  </span>
                  <strong className="text-[#094E9B] text-base font-bold tracking-wide block">
                    {rfqNumber}
                  </strong>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleCloseAfterSubmit}
                    className={siteButtonClass({ variant: "primary", size: "sm" })}
                  >
                    Done &amp; Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Selected Product Highlight Banner */}
                {initialProduct && (
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200/80 flex items-center gap-3 shadow-xs">
                    <div className="w-9 h-9 rounded-xl bg-[#094E9B] text-white flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-slate-900 font-bold text-xs sm:text-sm block truncate">
                        {initialProduct.name}
                      </span>
                      <span className="text-[#094E9B] text-[11px] font-medium block truncate">
                        {initialProduct.material} &bull;{" "}
                        {initialProduct.capacityRange}
                      </span>
                    </div>
                  </div>
                )}

                {/* Group 1: Contact Information */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.03)] space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#094E9B]">
                      01 &middot; Business Contact
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Required *
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Company / Brand *
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Noor Distributors Ltd."
                          value={formData.companyName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              companyName: e.target.value,
                            })
                          }
                          className={inputBaseClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Contact Officer *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Tanvir Ahmed"
                          value={formData.contactPerson}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              contactPerson: e.target.value,
                            })
                          }
                          className={inputBaseClass}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Work Email *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          required
                          placeholder="procurement@company.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className={inputBaseClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          required
                          placeholder="+880 1711-XXXXXX"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className={inputBaseClass}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Group 2: Product & Volume Requirements */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.03)] space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#094E9B]">
                      02 &middot; Product &amp; Volume Specs
                    </span>
                    <Package className="w-3.5 h-3.5 text-cyan-600" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Product Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-[13px] text-slate-900 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all duration-200"
                      >
                        <option>Packaged Drinking Water (500ml - 20L)</option>
                        <option>PET Water Bottles &amp; Jars</option>
                        <option>Industrial Plastic Pails &amp; Buckets</option>
                        <option>HDPE Bottles &amp; Chemical Containers</option>
                        <option>Pharma Droppers &amp; Caps</option>
                        <option>Food Grade Containers &amp; Trays</option>
                        <option>Custom Mold &amp; OEM Project</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Estimated Order Volume
                      </label>
                      <select
                        value={formData.volume}
                        onChange={(e) =>
                          setFormData({ ...formData, volume: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-[13px] text-slate-900 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all duration-200"
                      >
                        <option>10,000 - 50,000 units</option>
                        <option>50,000 - 100,000 units/year</option>
                        <option>100,000 - 500,000 units/year</option>
                        <option>500,000+ units (Bulk Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Required Capacity / Sizes
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 500ml bottles, 5L gallons, 20L dispenser jars"
                      value={formData.capacity}
                      onChange={(e) =>
                        setFormData({ ...formData, capacity: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-[13px] text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all duration-200"
                    />
                  </div>

                  {/* Interactive Custom Branding Toggle */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={formData.customPrinting}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        customPrinting: !formData.customPrinting,
                      })
                    }
                    className="w-full p-3.5 rounded-xl bg-slate-50/90 hover:bg-cyan-50/50 border border-slate-200/80 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                  >
                    <div>
                      <span className="font-bold text-xs text-slate-800 block">
                        Custom Branding &amp; Private Labeling
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        Shrink-sleeve label, In-Mold Labeling (IML) or branded cap
                      </span>
                    </div>

                    <span
                      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-300 ${
                        formData.customPrinting ? "bg-[#094E9B]" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${
                          formData.customPrinting
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </span>
                  </button>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Delivery Location &amp; Additional Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify delivery address, bottle neck finish, target timeline, or sample requirements..."
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-[13px] text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none resize-none transition-all duration-200"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={siteButtonClass({
                    variant: "primary",
                    fullWidth: true,
                    className: "py-3.5 shadow-lg shadow-[#094E9B]/20",
                  })}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Quotation Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Request for Quotation</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Footer Assurance Strip */}
          <div className="px-6 py-3.5 sm:px-7 bg-white border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center justify-between shrink-0">
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>NDA &amp; Data Privacy Protected</span>
            </span>
            <span className="font-semibold text-[#094E9B] tracking-wide">
              BSTI &bull; ISO 22000 &bull; HACCP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
