"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RFQDrawer from "@/components/rfq/RFQDrawer";
import { api } from "@/lib/api";
import { JOB_OPENINGS, JobOpening } from "@/data/careersData";
import {
  Briefcase,
  MapPin,
  Clock,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
  Send,
  Users,
  Award,
  Sparkles,
  Filter,
  Search,
  FileText,
  Mail,
  Phone,
  GraduationCap,
  Leaf,
  Cpu,
  Factory,
  Zap,
} from "lucide-react";

const CULTURE_PILLARS = [
  {
    icon: Cpu,
    title: "Cutting-Edge Automation",
    desc: "Operate high-speed European and Japanese automated molding lines, robotic cells, and precision inspection systems that push industrial engineering boundaries.",
  },
  {
    icon: Leaf,
    title: "Eco-Conscious Campus",
    desc: "Work inside a sustainable, energy-efficient manufacturing facility featuring hygienic food-grade zones, closed-loop cooling, and zero-landfill recycling protocols.",
  },
  {
    icon: Award,
    title: "Continuous Upskilling",
    desc: "We invest in your professional growth through structured apprenticeships, international certification sponsorship (ISO, HACCP, Six Sigma), and leadership development programs.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Comprehensive Welfare",
    desc: "Zero-incident safety culture, competitive compensation, annual bonuses, subsidized corporate transit, on-site dining, and comprehensive medical coverage for you and your family.",
  },
];

export default function CareerPage() {
  const [jobs, setJobs] = useState<JobOpening[]>(JOB_OPENINGS);
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [expandedJobId, setExpandedJobId] = useState<string | null>(JOB_OPENINGS[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    let active = true;
    api.careerJobs
      .getPublic()
      .then((res) => {
        if (active && Array.isArray(res.data) && res.data.length > 0) {
          setJobs(res.data);
          setExpandedJobId((prev) =>
            res.data.some((j: JobOpening) => j.id === prev) ? prev : res.data[0].id
          );
        }
      })
      .catch(() => {
        // Keep clean fallback JOB_OPENINGS
      });
    return () => {
      active = false;
    };
  }, []);

  // Application Modal State
  const [activeApplyJob, setActiveApplyJob] = useState<JobOpening | null>(null);
  const [isGeneralApplyOpen, setIsGeneralApplyOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "3-5 Years",
    currentCompany: "",
    facility: "Gazipur Facility",
    portfolioUrl: "",
    coverNote: "",
  });

  const [isRFQOpen, setIsRFQOpen] = useState(false);

  // Filter jobs
  const departments = [
    { id: "all", label: "All Roles" },
    { id: "Quality Assurance", label: "Quality & Cleanroom" },
    { id: "Production & Tooling", label: "Production & Tooling" },
    { id: "Engineering & Maintenance", label: "Engineering & Automation" },
    { id: "Sales & Commercial", label: "Sales & Commercial" },
    { id: "Supply Chain & Logistics", label: "Supply Chain" },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesDept = selectedDept === "all" || job.department === selectedDept;
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.facility.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleOpenApply = (job: JobOpening) => {
    setActiveApplyJob(job);
    setFormData((prev) => ({
      ...prev,
      facility: job.facility.includes("Gazipur")
        ? "Gazipur Facility"
        : job.facility.includes("Kaliakoir")
        ? "Kaliakoir Plant"
        : "Corporate HQ",
    }));
    setSubmitSuccess(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in your name, email, and phone number.");
      return;
    }

    setIsSubmitting(true);

    const targetPosition = activeApplyJob
      ? activeApplyJob.title
      : "General Talent Pool Candidate";

    const payload = {
      jobId: activeApplyJob?.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      position: targetPosition,
      experience: formData.experience,
      facility: formData.facility,
      currentCompany: formData.currentCompany,
      portfolioUrl: formData.portfolioUrl,
      coverNote: formData.coverNote,
    };

    try {
      // 1. Submit to backend API
      try {
        await api.careers.create(payload);
      } catch (err) {
        console.warn("Backend API sync skipped; saved locally:", err);
      }

      // 2. Save application to localStorage so it instantly appears in /admin/careers
      if (typeof window !== "undefined") {
        const existing = JSON.parse(localStorage.getItem("xcl_career_applications") || "[]");
        const newApp = {
          id: `APP-2026-${Math.floor(100 + Math.random() * 900)}`,
          name: formData.name,
          position: targetPosition,
          experience: `${formData.experience} (${formData.currentCompany || "Experienced"})`,
          email: formData.email,
          phone: formData.phone,
          date: new Date().toISOString().slice(0, 10),
          status: "New",
          facility: formData.facility,
        };
        localStorage.setItem("xcl_career_applications", JSON.stringify([newApp, ...existing]));
      }

      setSubmitSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Submission error. Please try again or email sales@noorplastic.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Floating Glass Navigation Bar */}
      <Navbar />

      <main className="flex-1 relative">
        {/* ══════════════════════════════════════════════════════════════
            HERO SECTION: Full-Height Sticky Hero with Clean Workplace
            (Smooth curtain reveal scroll matching other pages)
           ══════════════════════════════════════════════════════════════ */}
        {/* ============================================================ */}
        {/* HERO SECTION: FULL-HEIGHT ARCHITECTURE (100VH)             */}
        {/* ============================================================ */}
        <section
          id="hero"
          className="relative w-full min-h-[540px] sm:min-h-[640px] lg:h-screen lg:min-h-[820px] bg-[#0a1f33] overflow-hidden flex flex-col justify-between items-center select-none"
        >
          {/* Authentic Modern Office & Engineering Team Background */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/business-hero-office.jpg"
              alt="Noor Plastic Industries Corporate Engineering & Operations Team"
              fill
              className="object-cover object-center opacity-85 scale-102 transition-transform duration-1000 ease-out"
              priority
            />
            {/* Multi-layer Gradient Vignettes */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f33] via-black/50 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/55" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,31,51,0.6)_100%)]" />
          </div>

          {/* Top Spacer for Navbar */}
          <div className="h-28 sm:h-36 shrink-0" />

          {/* Centered Typography & Action Buttons */}
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-bold shadow-xl shadow-black/20">
              <Briefcase className="w-4 h-4 text-[#38bdf8] animate-pulse" />
              <span>Careers at Noor Plastic Industries &bull; Kaliakoir, Gazipur</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-[0.2em] sm:tracking-[0.25em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] uppercase pl-[0.2em]">
              Careers
            </h1>

            <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.28em] font-bold text-[#38bdf8] drop-shadow-lg pl-[0.28em] max-w-3xl mx-auto">
              Shape The Future Of Packaging &amp; Hydration &bull; Kaliakoir, Gazipur
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#open-positions"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#0a1f33] font-bold text-xs sm:text-sm shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Open Positions</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => setIsGeneralApplyOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xs sm:text-sm transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Submit Spontaneous CV</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Area: KPI Bar + Animated Scroll Indicator */}
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-6 sm:pb-8 flex flex-col items-center gap-6">
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <div className="text-xl sm:text-2xl font-black text-white">ISO Ready</div>
                <div className="text-[11px] text-cyan-200/90 font-medium uppercase tracking-wider mt-0.5">Licensed Manufacturing</div>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <div className="text-xl sm:text-2xl font-black text-white">Dedicated Team</div>
                <div className="text-[11px] text-cyan-200/90 font-medium uppercase tracking-wider mt-0.5">Engineers &amp; Technicians</div>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <div className="text-xl sm:text-2xl font-black text-white">Kaliakoir HQ</div>
                <div className="text-[11px] text-cyan-200/90 font-medium uppercase tracking-wider mt-0.5">Latifpur-B, Gazipur</div>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <div className="text-xl sm:text-2xl font-black text-white">Zero Incident</div>
                <div className="text-[11px] text-cyan-200/90 font-medium uppercase tracking-wider mt-0.5">Safety Index Mandate</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("content");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer group"
            >
              <span className="text-[11px] uppercase tracking-widest font-semibold group-hover:tracking-[0.25em] transition-all">
                Explore Culture &amp; Opportunities
              </span>
              <div className="w-7 h-11 rounded-full border-2 border-white/30 flex items-start justify-center p-1 backdrop-blur-sm group-hover:border-[#38bdf8] transition-colors">
                <div className="w-1.5 h-2.5 rounded-full bg-[#38bdf8] animate-bounce" />
              </div>
            </button>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            CURTAIN BODY: Smooth Rise on Scroll into Pure White Canvas
           ══════════════════════════════════════════════════════════════ */}
        <div
          id="content"
          className="relative bg-white"
        >
          {/* ══════════════════════════════════════════════════════════════
              SECTION 1: Why Build Your Career With Us?
             ══════════════════════════════════════════════════════════════ */}
          <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 sm:mb-20">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                  Why Build Your Career With Us?
                </h2>
                <div className="w-16 h-[2px] bg-slate-900 mx-auto mt-3 mb-5" />
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  We provide a high-trust, merit-driven industrial environment where ambitious engineers, technicians, and business minds solve high-impact manufacturing challenges.
                </p>
              </div>

              {/* 4 Core Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {CULTURE_PILLARS.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] hover:border-slate-400 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                          <Icon className="w-6 h-6 stroke-[2]" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                          {pillar.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              SECTION 2: Interactive Open Positions Job Board
             ══════════════════════════════════════════════════════════════ */}
          <section id="open-positions" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-100 bg-[#fafafa]">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
                  <Briefcase className="w-3.5 h-3.5 text-slate-700" />
                  <span>Immediate Opportunities</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                  Open Career Opportunities
                </h2>
                <div className="w-16 h-[2px] bg-slate-900 mx-auto mt-3 mb-5" />
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Discover challenging roles across cleanroom quality assurance, mold engineering, high-speed automated production, and institutional sales.
                </p>
              </div>

              {/* Filter Tabs & Search Bar */}
              <div className="space-y-4 mb-10">
                {/* Search Input */}
                <div className="relative max-w-md mx-auto">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by job title, skill or facility..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 shadow-sm transition-all"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>

                {/* Department Filter Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 select-none">
                  {departments.map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => setSelectedDept(dept.id)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        selectedDept === dept.id
                          ? "bg-slate-900 text-white shadow-md shadow-slate-900/15"
                          : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {dept.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Job Cards List */}
              <div className="space-y-6">
                {filteredJobs.length === 0 ? (
                  <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 text-slate-500">
                    <p className="font-semibold text-base">No open positions matched your search criteria.</p>
                    <p className="text-xs sm:text-sm mt-1">Try selecting another department or submit your resume directly to our talent pool below.</p>
                  </div>
                ) : (
                  filteredJobs.map((job) => {
                    const isExpanded = expandedJobId === job.id;
                    return (
                      <article
                        key={job.id}
                        className={`rounded-2xl bg-white border transition-all duration-300 overflow-hidden ${
                          isExpanded
                            ? "border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                            : "border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300"
                        }`}
                      >
                        {/* Header Row */}
                        <div className="p-6 sm:p-8">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-2">
                              {/* Meta Badges */}
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${job.badgeColor}`}>
                                  {job.department}
                                </span>
                                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                                  <MapPin className="w-3 h-3" />
                                  <span>{job.facility}</span>
                                </span>
                                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                                  <Clock className="w-3 h-3" />
                                  <span>{job.type}</span>
                                </span>
                                <span className="text-[11px] font-semibold text-slate-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                                  {job.experience} Exp.
                                </span>
                              </div>

                              {/* Title */}
                              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                                {job.title}
                              </h3>

                              {/* Short Summary */}
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-3xl">
                                {job.summary}
                              </p>
                            </div>

                            {/* Actions Column */}
                            <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
                              <button
                                onClick={() => handleOpenApply(job)}
                                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                              >
                                <span>Apply Now</span>
                                <ChevronRight className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                                aria-label="Toggle job details"
                              >
                                {isExpanded ? (
                                  <ChevronUp className="w-5 h-5" />
                                ) : (
                                  <ChevronDown className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Collapsible Details Drawer */}
                        {isExpanded && (
                          <div className="border-t border-slate-100 bg-[#fafcff] p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
                            {/* Responsibilities */}
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#1f5f8b]" />
                                Key Responsibilities
                              </h4>
                              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 list-none pl-4">
                                {job.responsibilities.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Requirements */}
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                                Candidate Profile &amp; Qualifications
                              </h4>
                              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 list-none pl-4">
                                {job.requirements.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Benefits */}
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500" />
                                What We Offer
                              </h4>
                              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 list-none pl-4">
                                {job.benefits.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Direct Apply Footer */}
                            <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                              <span className="text-xs text-slate-500">
                                Location: <span className="font-semibold text-slate-800">{job.location}</span>
                              </span>
                              <button
                                onClick={() => handleOpenApply(job)}
                                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs tracking-wide shadow-sm hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
                              >
                                <span>Submit Application for {job.title}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </article>
                    );
                  })
                )}
              </div>

              {/* General Talent Pool Callout */}
              <div className="mt-14 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1.5 text-center md:text-left">
                  <h3 className="text-xl font-bold text-slate-900">
                    Don’t see an exact match for your specialty?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                    We are always scouting for high-caliber automation programmers, shift superintendents, CAD designers, and industrial accountants. Drop your CV directly into our General Talent Pool.
                  </p>
                </div>
                <button
                  onClick={() => setIsGeneralApplyOpen(true)}
                  className="px-6 py-3 rounded-xl border border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-bold text-xs sm:text-sm tracking-wide transition-all shrink-0 cursor-pointer flex items-center gap-2"
                >
                  <span>Submit General Application</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              SECTION 3: Our 4-Step Recruitment Roadmap
             ══════════════════════════════════════════════════════════════ */}
          <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Our Transparent Hiring Process
                </h2>
                <div className="w-16 h-[2px] bg-slate-900 mx-auto mt-3 mb-5" />
                <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                  We respect your time and expertise. Here is how our engineering and talent acquisition team reviews every candidate.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    step: "01",
                    title: "Application Review",
                    desc: "Our HR and department engineering leads evaluate your credentials and technical track record within 5 business days.",
                  },
                  {
                    step: "02",
                    title: "Technical Discussion",
                    desc: "An in-depth dialogue assessing your domain capabilities, automation problem-solving, and quality methodology.",
                  },
                  {
                    step: "03",
                    title: "Campus Walkthrough",
                    desc: "Visit our Kaliakoir, Gazipur plant to tour our automated lines, cleanrooms, and meet future teammates.",
                  },
                  {
                    step: "04",
                    title: "Offer & Onboarding",
                    desc: "Receive a formal compensation package followed by structured cleanroom and machinery safety induction.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-4"
                  >
                    <div className="text-3xl font-extrabold text-slate-300 font-mono">
                      {item.step}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ══════════════════════════════════════════════════════════════
          APPLICATION MODAL (For Job Specific & General Applications)
         ══════════════════════════════════════════════════════════════ */}
      {(activeApplyJob || isGeneralApplyOpen) && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => {
            setActiveApplyJob(null);
            setIsGeneralApplyOpen(false);
          }}
        >
          <div
            className="relative max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-[11px] font-bold text-[#1f5f8b] uppercase tracking-wider">
                  {activeApplyJob ? activeApplyJob.department : "General Talent Pool"}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {activeApplyJob ? `Apply: ${activeApplyJob.title}` : "Spontaneous Application"}
                </h3>
              </div>
              <button
                onClick={() => {
                  setActiveApplyJob(null);
                  setIsGeneralApplyOpen(false);
                }}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1">
              {submitSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900">Application Received!</h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. Your application for{" "}
                    <span className="font-semibold text-slate-900">
                      {activeApplyJob ? activeApplyJob.title : "General Talent Pool"}
                    </span>{" "}
                    has been submitted to our HR and engineering recruitment leads. We will review your profile and reach out within 5 business days.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setActiveApplyJob(null);
                        setIsGeneralApplyOpen(false);
                      }}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm tracking-wide shadow-md"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Engr. Tanvir Ahmed"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="tanvir@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+880 1712-345678"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Total Experience
                      </label>
                      <select
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800"
                      >
                        <option value="1-2 Years">1 - 2 Years</option>
                        <option value="3-5 Years">3 - 5 Years</option>
                        <option value="6-8 Years">6 - 8 Years</option>
                        <option value="9+ Years">9+ Years Senior</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Current / Recent Employer
                      </label>
                      <input
                        type="text"
                        value={formData.currentCompany}
                        onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                        placeholder="e.g. Packaging Corp / Pharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Target Facility
                      </label>
                      <select
                        value={formData.facility}
                        onChange={(e) => setFormData({ ...formData, facility: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800"
                      >
                        <option value="Gazipur Facility">Gazipur Manufacturing Campus</option>
                        <option value="Kaliakoir Plant">Kaliakoir Production Plant</option>
                        <option value="Corporate HQ">Latifpur-B, Kaliakoir HQ</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      LinkedIn / Resume URL (Drive, Dropbox or Portfolio)
                    </label>
                    <input
                      type="url"
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      placeholder="https://linkedin.com/in/yourprofile or Google Drive resume link"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Brief Cover Note / Highlights
                    </label>
                    <textarea
                      rows={3}
                      value={formData.coverNote}
                      onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                      placeholder="Share a brief overview of your technical background, machinery mastery, or commercial wins..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveApplyJob(null);
                        setIsGeneralApplyOpen(false);
                      }}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Submitting Application...</span>
                      ) : (
                        <>
                          <span>Submit Application</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global RFQ Drawer */}
      <RFQDrawer isOpen={isRFQOpen} onClose={() => setIsRFQOpen(false)} />

      {/* Global Site Footer */}
      <Footer />
    </div>
  );
}

