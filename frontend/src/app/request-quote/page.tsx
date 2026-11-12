"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { api } from "@/lib/api";
import { normalizeApiProduct, type NormalizedProduct } from "@/lib/productMapper";
import { PublicStateMessage } from "@/components/common/PublicStateMessage";
import { siteButtonClass } from "@/components/common/SiteButton";
import { AlertTriangle as FormAlertIcon } from "lucide-react";
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  PackageCheck,
  Send,
  Building2,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";

function RequestQuoteContent() {
  const searchParams = useSearchParams();
  const productQuery = searchParams.get("product") || "";
  const initialType = searchParams.get("type") === "sample" ? "sample" : "quote";

  const [activeType, setActiveType] = useState<"quote" | "sample">(initialType);
  const [productsList, setProductsList] = useState<NormalizedProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [reloadProductsKey, setReloadProductsKey] = useState(0);
  const [chosenProductSlug, setChosenProductSlug] = useState<string>(productQuery);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    country: "Bangladesh",
    state: "",
    quantity: "10,000 - 50,000 units",
    material: "Virgin HDPE",
    closure: "Standard Tamper-Evident Cap",
    comments: "",
    needPhysicalSample: initialType === "sample",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submittedQuoteNumber, setSubmittedQuoteNumber] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    setProductsLoading(true);
    setProductsError(null);
    api.products
      .getAll()
      .then((res) => {
        if (!active) return;
        const normalized = Array.isArray(res.data)
          ? res.data.map(normalizeApiProduct)
          : [];
        setProductsList(normalized);
        if (normalized.length > 0) {
          const matched = productQuery
            ? normalized.find(
                (p) => p.slug === productQuery || p.id === productQuery
              )
            : null;
          const initialProduct = matched || normalized[0];
          setChosenProductSlug((prev) => {
            if (prev && normalized.some((p) => p.slug === prev)) return prev;
            return initialProduct.slug;
          });
          if (initialProduct?.genre === "Metal") {
            setFormData((prev) => ({
              ...prev,
              material: "Electrolytic Tinplate",
            }));
          }
        }
      })
      .catch((err) => {
        if (!active) return;
        setProductsList([]);
        setProductsError(
          err instanceof Error && err.message
            ? err.message
            : "Unable to load product catalog from server."
        );
      })
      .finally(() => {
        if (active) setProductsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [productQuery, reloadProductsKey]);

  const currentProduct: NormalizedProduct | null =
    productsList.find((p) => p.slug === chosenProductSlug || p.id === chosenProductSlug) ||
    productsList[0] ||
    null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const res = await api.inquiries.submit({
        companyName:
          formData.company.trim() || `${formData.firstName} ${formData.lastName}`.trim(),
        contactPerson:
          `${formData.firstName} ${formData.lastName}`.trim() || formData.company.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        category: currentProduct?.name || "Engineered Packaging",
        volume: formData.quantity,
        capacity: formData.material,
        notes: `Product: ${currentProduct?.name || "Custom Engineered Packaging"} | Closure: ${formData.closure} | Country: ${formData.country} | Physical Sample: ${formData.needPhysicalSample ? "Yes" : "No"} | Notes: ${formData.comments}`,
      });
      setSubmittedQuoteNumber(res?.data?.quoteNumber || res?.data?.id || "");
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to submit quotation request right now. Please try again or contact our sales team by phone."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 select-none">
      {/* Floating Glass Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* Sky-Blue Hero Banner matching Brand Reference */}
        <div
          id="hero"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 0 100%)" }}
          className="relative w-full h-[240px] sm:h-[300px] bg-gradient-to-r from-[#8fcfe7] via-[#9ad7ec] to-[#ace0f3] overflow-hidden flex items-center select-none"
        >
          {/* Subtle Vector Background Illustration Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[55%] pointer-events-none opacity-25 flex items-center justify-end pr-8 sm:pr-16">
            <svg
              className="w-full h-full max-h-[220px]"
              viewBox="0 0 600 240"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="50" y="70" width="70" height="110" rx="16" />
              <rect x="70" y="50" width="30" height="20" rx="4" />
              <rect x="160" y="40" width="80" height="140" rx="12" />
              <circle cx="200" cy="110" r="24" />
              <rect x="280" y="50" width="90" height="130" rx="14" />
              <path d="M295 50 V30 H320 V50" />
              <circle cx="325" cy="115" r="16" />
              <ellipse cx="440" cy="80" rx="40" ry="18" />
              <path d="M400 80 V160 C400 172 480 172 480 160 V80" />
              <ellipse cx="440" cy="160" rx="40" ry="18" />
              <circle cx="530" cy="90" r="18" />
              <path d="M500 170 C500 135 560 135 560 170" />
            </svg>
          </div>

          <div className="relative z-10 w-[98%] max-w-[1920px] mx-auto px-4 sm:px-8 pt-16 pb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Direct Factory Pricing &amp; Sample Ordering</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-sm">
              Request a Quote &amp; Samples
            </h1>
            <p className="text-base sm:text-xl font-medium text-white/95 mt-2 drop-shadow-sm max-w-2xl">
              Partner directly with Noor Plastic Industries — authorized plastic manufacturing, importing &amp; supply in Kaliakoir, Gazipur.
            </p>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="w-[98%] max-w-[1920px] mx-auto px-4 sm:px-8 pt-8 pb-4 text-xs sm:text-sm text-slate-500 font-medium">
          <Link href="/" className="hover:text-[#5a8ea7] transition-colors">
            Home
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <Link href="/products" className="hover:text-[#5a8ea7] transition-colors">
            Find Our Product
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900 font-bold">Request Quotation &amp; Samples</span>
        </div>

        {/* Main Content Area strictly constrained to fluid grand canvas */}
        <section className="w-full pb-24 pt-4">
          <div className="w-[98%] max-w-[1920px] mx-auto px-4 sm:px-8">
            {submitted ? (
              /* Success State */
              <div className="bg-white rounded-3xl p-8 sm:p-16 border border-slate-200/90 shadow-xl text-center max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    Quotation Request Received!
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg">
                    Thank you, <span className="font-bold text-slate-900">{formData.firstName || "valued partner"}</span>. Our commercial sales engineering team is preparing your official formal quotation for{" "}
                    <span className="font-bold text-[#1f5f8b]">
                      {currentProduct?.name || "Custom Packaging Solution"}
                    </span>.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-sm text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reference ID:</span>
                    <span className="font-mono font-bold text-slate-900">
                      {submittedQuoteNumber || "Recorded in CRM"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target Response Time:</span>
                    <span className="font-semibold text-emerald-600">Within 24 Hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Physical Lab Sample:</span>
                    <span className="font-semibold">{formData.needPhysicalSample ? "Yes (Requested)" : "Price quotation only"}</span>
                  </div>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/products"
                    className={siteButtonClass({ variant: "primary" })}
                  >
                    Explore More Products
                  </Link>
                  <button
                    onClick={() => setSubmitted(false)}
                    className={siteButtonClass({ variant: "outline" })}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              /* Two-Column Responsive Layout */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                {/* LEFT COLUMN: Visual Product Showcase & Credentials (5 cols) */}
                <div className="lg:col-span-5 space-y-8">
                  {/* Active Product Preview Card */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                    {productsLoading ? (
                      <div className="space-y-4 animate-pulse">
                        <div className="h-5 w-36 bg-slate-200 rounded" />
                        <div className="w-full aspect-[4/3] rounded-2xl bg-slate-100" />
                        <div className="h-6 w-2/3 bg-slate-200 rounded" />
                        <div className="h-10 w-full bg-slate-100 rounded-xl" />
                      </div>
                    ) : productsError ? (
                      <PublicStateMessage
                        variant="error"
                        title="Product list unavailable"
                        description={productsError}
                        onRetry={() => setReloadProductsKey((k) => k + 1)}
                      />
                    ) : !currentProduct ? (
                      <PublicStateMessage
                        variant="empty"
                        title="Custom Packaging Inquiry"
                        description="No standard catalog products are currently published. Describe your packaging requirements in the form to request a custom quote."
                      />
                    ) : (
                      <>
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Selected Container
                          </span>
                          <span className="px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold">
                            {currentProduct.subCategory}
                          </span>
                        </div>

                        {/* Product Photo on Studio Pedestal */}
                        <div className="relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-b from-[#f8fafc] to-[#edf2f7] border border-slate-200/80 flex items-center justify-center p-6 overflow-hidden">
                          {currentProduct.image ? (
                            <Image
                              src={currentProduct.image}
                              alt={currentProduct.name}
                              fill
                              className="object-contain p-4 drop-shadow-[0_12px_16px_rgba(0,0,0,0.12)] hover:scale-105 transition-transform duration-300"
                              priority
                            />
                          ) : (
                            <PackageCheck className="w-12 h-12 text-slate-300" />
                          )}
                        </div>

                        {/* Product Metadata */}
                        <div className="space-y-3">
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                            {currentProduct.name}
                          </h3>
                          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                            {currentProduct.description}
                          </p>

                          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs text-slate-700">
                            <div>
                              <span className="text-slate-400 block font-medium">Manufacturer:</span>
                              <span className="font-bold text-[#1f5f8b]">{currentProduct.factory}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block font-medium">Standard Material:</span>
                              <span className="font-bold text-slate-900">{currentProduct.material || "Virgin HDPE"}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block font-medium">Nominal Volume:</span>
                              <span className="font-bold text-slate-900">{currentProduct.capacity || "Custom"}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block font-medium">Shape Geometry:</span>
                              <span className="font-bold text-slate-900">{currentProduct.shape}</span>
                            </div>
                          </div>
                        </div>

                        {/* Switch Product Dropdown */}
                        <div className="pt-2">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Change Container Model:
                          </label>
                          <select
                            value={chosenProductSlug}
                            onChange={(e) => setChosenProductSlug(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#1f5f8b] cursor-pointer"
                          >
                            {productsList.map((prod) => (
                              <option key={prod.id} value={prod.slug}>
                                {prod.name} ({prod.factory})
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}
                  </div>

                  {/* 3 Industry Trust Credentials */}
                  <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-5">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-600" />
                      Our OEM Service Guarantees
                    </h4>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3.5">
                        <div className="p-2.5 rounded-xl bg-cyan-50 text-[#1f5f8b] shrink-0">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-slate-900">24-Hour Quotation Turnaround</h5>
                          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                            Receive a detailed breakdown including unit pricing, tooling options, and production schedules.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5">
                        <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
                          <PackageCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-slate-900">Free Physical Lab Samples</h5>
                          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                            Complimentary sample units dispatched for chemical testing, drop testing, and line filling trials.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5">
                        <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 shrink-0">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-slate-900">Class 100k Cleanroom Standards</h5>
                          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                            Manufacturing in sterile, automated environments compliant with DGDA and international food packaging norms.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Direct Plant Sales Hotline Box */}
                  <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-[#12283b] p-6 sm:p-7 text-white shadow-lg space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      Need Urgent Technical Guidance?
                    </span>
                    <h4 className="text-lg font-bold">Speak Directly With Our Plant Engineering Team</h4>
                    <div className="space-y-2 text-sm text-slate-300">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-cyan-400" />
                        <span className="font-semibold text-white">+880 1711-987275</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-cyan-400" />
                        <span className="font-medium">info@noorplastic.com</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Spacious Luxury Form - NO INTERNAL SCROLLBAR (7 cols) */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-sm">
                  {/* Mode Selector Toggle: Price Quote vs Lab Sample */}
                  <div className="flex p-1.5 rounded-full bg-slate-100 border border-slate-200 mb-8 max-w-md">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveType("quote");
                        setFormData((prev) => ({ ...prev, needPhysicalSample: false }));
                      }}
                      className={`flex-1 py-2.5 px-4 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeType === "quote"
                        ? "bg-[#094E9B] text-white shadow-[0_4px_12px_rgba(9,78,155,0.28)]"
                        : "text-slate-600 hover:text-[#094E9B]"
                        }`}
                    >
                      Request Quotation
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveType("sample");
                        setFormData((prev) => ({ ...prev, needPhysicalSample: true }));
                      }}
                      className={`flex-1 py-2.5 px-4 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeType === "sample"
                        ? "bg-[#094E9B] text-white shadow-[0_4px_12px_rgba(9,78,155,0.28)]"
                        : "text-slate-600 hover:text-[#094E9B]"
                        }`}
                    >
                      Request Physical Samples
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* SECTION 1: Contact Information */}
                    <div className="space-y-4">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
                        <span>1. Contact Person</span>
                        <span className="text-xs font-normal text-slate-400">* Required fields</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Mohammad"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm sm:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1f5f8b] transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Rahman"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm sm:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1f5f8b] transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                            Corporate Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. corporate@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm sm:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1f5f8b] transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                            Phone / WhatsApp <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. +880 1711 000000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm sm:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1f5f8b] transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: Organization & Location */}
                    <div className="space-y-4">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 pb-2 border-b border-slate-100">
                        2. Company &amp; Delivery Destination
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                            Company / Organization <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Apex Pharma / Asian Paints"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm sm:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1f5f8b] transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                            Country
                          </label>
                          <select
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm sm:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1f5f8b] transition-all"
                          >
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="India">India</option>
                            <option value="Myanmar">Myanmar</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                            <option value="Other International">Other International</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                            State / District / Delivery City
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Gazipur, Dhaka / Chittagong Industrial Zone"
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm sm:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1f5f8b] transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: Production Requirements */}
                    <div className="space-y-4">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 pb-2 border-b border-slate-100">
                        3. Order Specifications
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                            Estimated Quantity (MOQ)
                          </label>
                          <select
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm sm:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1f5f8b] transition-all"
                          >
                            <option value="5,000 - 10,000 units">5,000 - 10,000 units</option>
                            <option value="10,000 - 50,000 units">10,000 - 50,000 units</option>
                            <option value="50,000 - 100,000 units">50,000 - 100,000 units</option>
                            <option value="100,000+ units (Bulk Contract)">100,000+ units (Bulk Annual Contract)</option>
                            <option value="Sample Evaluation Only">Sample Evaluation Only</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                            Closure / Neck Finish
                          </label>
                          <select
                            value={formData.closure}
                            onChange={(e) => setFormData({ ...formData, closure: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm sm:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1f5f8b] transition-all"
                          >
                            <option value="Standard Tamper-Evident Cap">Standard Tamper-Evident Cap</option>
                            <option value="Child-Resistant Cap (CRC)">Child-Resistant Cap (CRC)</option>
                            <option value="Measuring Cup / Pour Spout">Measuring Cup / Pour Spout</option>
                            <option value="Triple-Tight Friction Lid (Metal)">Triple-Tight Friction Lid (Metal)</option>
                            <option value="Custom Engineered Closure">Custom Engineered Closure</option>
                          </select>
                        </div>
                      </div>

                      {/* Comments / Notes */}
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                          Project Requirements &amp; Notes
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Provide specific details such as chemical filling temperatures, label decoration, custom embossing, or targeted delivery dates..."
                          value={formData.comments}
                          onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm sm:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1f5f8b] transition-all"
                        />
                      </div>

                      {/* Sample Checkbox */}
                      <label className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/90 cursor-pointer hover:bg-slate-100/60 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.needPhysicalSample}
                          onChange={(e) => setFormData({ ...formData, needPhysicalSample: e.target.checked })}
                          className="w-5 h-5 mt-0.5 rounded text-[#1f5f8b] focus:ring-[#1f5f8b] cursor-pointer"
                        />
                        <span className="text-xs sm:text-sm text-slate-700 font-medium">
                          <strong className="text-slate-900 font-bold block">
                            Dispatch Physical Testing Samples
                          </strong>
                          Yes, please courier physical test containers to our quality lab for seal integrity and drop-testing before final order confirmation.
                        </span>
                      </label>
                    </div>

                    {submitError && (
                      <div
                        role="alert"
                        className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"
                      >
                        <FormAlertIcon className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={siteButtonClass({ variant: "primary", size: "lg", fullWidth: true })}
                      >
                        {isSubmitting ? (
                          <span>Processing Inquiry...</span>
                        ) : (
                          <>
                            <span>
                              {formData.needPhysicalSample ? "Submit Sample & Quotation Request" : "Submit Official Quotation Request"}
                            </span>
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                      <p className="text-xs text-center text-slate-500 mt-3 font-medium">
                        By submitting, you agree to our confidential OEM manufacturing guidelines. No spam guaranteed.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default function RequestQuotePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f5f8b]" />
        </div>
      }
    >
      <RequestQuoteContent />
    </Suspense>
  );
}

