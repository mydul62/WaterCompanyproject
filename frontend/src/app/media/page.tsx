"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PRESS_STORIES, PressStory, normalizePressStory } from "@/data/mediaData";
import { api } from "@/lib/api";
import { siteButtonClass, siteFilterTabClass } from "@/components/common/SiteButton";
import { PressCardsSkeletonItems } from "@/components/common/Skeletons";
import {
  Newspaper,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Search,
  Building2,
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Quote,
  Award,
  Factory,
  ChevronDown,
} from "lucide-react";

export default function MediaAndContactsPage() {
  const [stories, setStories] = useState<PressStory[]>(PRESS_STORIES);
  const [loading, setLoading] = useState(true);
  const [selectedOutlet, setSelectedOutlet] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    department: "Sales & New Orders",
    message: "",
  });

  useEffect(() => {
    let active = true;
    api.mediaStories
      .getPublic()
      .then((res) => {
        if (active && Array.isArray(res.data) && res.data.length > 0) {
          setStories(res.data.map(normalizePressStory));
        }
      })
      .catch(() => {
        // Keep static defaults
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const outlets = useMemo(
    () => ["All", ...Array.from(new Set(stories.map((s) => s.outlet).filter(Boolean)))],
    [stories]
  );

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchOutlet = selectedOutlet === "All" || story.outlet === selectedOutlet;
      const matchQuery =
        !searchQuery ||
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.outlet.toLowerCase().includes(searchQuery.toLowerCase());
      return matchOutlet && matchQuery;
    });
  }, [stories, selectedOutlet, searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        department: "Sales & New Orders",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 select-none">
      {/* Floating Glass Navbar */}
      <Navbar />

      <main className="flex-1 relative">
        {/* ============================================================ */}
        {/* 1. HERO SECTION: FULL-HEIGHT MEDIA & CONTACTS SHOWCASE        */}
        {/* ============================================================ */}
        <section
          id="media-hero"
          className="relative w-full min-h-[540px] sm:min-h-[640px] lg:h-screen lg:min-h-[820px] bg-[#0a1f33] overflow-hidden flex flex-col justify-between items-center select-none"
        >
          {/* Background Hero Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/business-hero-office.jpg"
              alt="Media Coverage & Corporate Contacts - Noor Plastic Industries"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-80 scale-102 transition-transform duration-1000 ease-out"
            />
            {/* Multi-layer Gradient Vignettes */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f33] via-black/45 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,31,51,0.6)_100%)]" />
          </div>

          {/* Top Spacer for Navbar */}
          <div className="h-28 sm:h-36 shrink-0" />

          {/* Centered Typography & Quick Action CTAs */}
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-bold shadow-xl shadow-black/20">
              <Newspaper className="w-4 h-4 text-[#38bdf8] animate-pulse" />
              <span>Corporate Communications &bull; Press Archive &bull; Plant Network</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-[0.16em] sm:tracking-[0.2em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] uppercase pl-[0.16em]">
              Media &amp; Contacts
            </h1>

            <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.28em] font-bold text-[#38bdf8] drop-shadow-lg pl-[0.28em] max-w-3xl mx-auto">
              National Press Stories &bull; Editorial Highlights &bull; Plant Campuses &bull; Direct Inquiries
            </p>

            {/* Quick Action Navigation Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
              <a
                href="#press-stories"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#0a1f33] font-bold text-xs sm:text-sm shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <Newspaper className="w-4 h-4 text-[#0b6e99]" />
                <span>National Press Stories</span>
              </a>
              <a
                href="#press-highlights"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xs sm:text-sm transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#38bdf8]" />
                <span>Editorial Highlights</span>
              </a>
              <a
                href="#contact-locations"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0b6e99] hover:bg-[#09577a] text-white font-bold text-xs sm:text-sm shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-cyan-200" />
                <span>Plants &amp; Contact</span>
              </a>
            </div>
          </div>

          {/* Animated Scroll Down Indicator */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("curtain-reveal");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="relative z-10 pb-8 sm:pb-12 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="text-[11px] uppercase tracking-widest font-semibold group-hover:tracking-[0.25em] transition-all">
              Explore Media Stories &amp; Contact Info
            </span>
            <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5 backdrop-blur-sm group-hover:border-[#38bdf8] transition-colors">
              <div className="w-1.5 h-3 rounded-full bg-[#38bdf8] animate-bounce" />
            </div>
          </button>
        </section>

        {/* ============================================================ */}
        {/* 2. CURTAIN REVEAL BODY: Rises smoothly over the hero on scroll*/}
        {/* ============================================================ */}
        <div
          id="curtain-reveal"
          className="relative bg-[#f8fafc] pt-12 sm:pt-16 pb-20 sm:pb-28"
        >
          <div className="w-full max-w-[1643px] mx-auto px-4 sm:px-8 lg:px-12 space-y-20 sm:space-y-28">

            {/* ══════════════════════════════════════════════════════════ */}
            {/* SECTION A: NATIONAL PRESS STORIES (Filtered News Grid)    */}
            {/* ══════════════════════════════════════════════════════════ */}
            <section id="press-stories" className="scroll-mt-24 space-y-10">
              {/* Header Title */}
              <div className="text-center space-y-3.5 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-xs font-bold uppercase tracking-wider shadow-xs">
                  <Newspaper className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
                  <span>National Dailies &bull; Media Coverage</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                  National Press Stories
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                  জাতীয় ও আন্তর্জাতিক গণমাধ্যমে এক্সক্লুসিভ ক্যান লিমিটেড এবং কিউ পাইল লিমিটেডের শিল্প বিকাশ, উদ্ভাবনী প্যাকেজিং প্রযুক্তি ও সাফল্যগাথার সম্পূর্ণ আর্কাইভ।
                </p>
                <div className="pt-1">
                  <Link
                    href="/tv-news"
                    className={siteButtonClass({ variant: "primary", size: "sm" })}
                  >
                    <span>Watch TV News &amp; YouTube Features</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Filter Bar & Search Box */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
                {/* Outlet Filter Tabs */}
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  {outlets.map((outlet) => (
                    <button
                      key={outlet}
                      type="button"
                      onClick={() => setSelectedOutlet(outlet)}
                      className={siteFilterTabClass(selectedOutlet === outlet)}
                    >
                      {outlet === "All" ? "সকল সংবাদপত্র" : outlet}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="সংবাদ খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium focus:bg-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              {/* Stories Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {loading ? <PressCardsSkeletonItems count={4} /> : filteredStories.map((story) => (
                  <article
                    key={story.id}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col group"
                  >
                    {/* Story Cover Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        unoptimized={Boolean(story.image?.startsWith("/uploads/") || story.image?.startsWith("http"))}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-sm" style={{ backgroundColor: story.outletColor }}>
                        {story.outlet}
                      </div>
                    </div>

                    {/* Story Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-slate-400 text-[11px] font-medium">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            {story.date}
                          </span>
                          <span>&bull;</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {story.readTime}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug line-clamp-2">
                          {story.title}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {story.summary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500">{story.category}</span>
                        <Link
                          href={`/media/${story.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 hover:text-cyan-800 transition-colors group-hover:translate-x-0.5 transition-transform"
                        >
                          <span>প্রতিবেদন পড়ুন</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* ══════════════════════════════════════════════════════════ */}
            {/* SECTION B: PRESS HIGHLIGHTS & EDITORIAL QUOTES             */}
            {/* ══════════════════════════════════════════════════════════ */}
            <section id="press-highlights" className="scroll-mt-24 space-y-12">
              <div className="text-center space-y-3.5 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold uppercase tracking-wider shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Curated Highlights &bull; Founder's Message</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                  Press Highlights &amp; Milestones
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                  জাতীয় শিল্পায়নে অনন্য অবদান ও উন্নত প্রযুক্তির টেকসই মোড়ক সমাধানে এক্সক্লুসিভ ক্যানের উল্লেখযোগ্য অর্জনসমূহ।
                </p>
              </div>

              {/* Founder Quote Spotlight Card */}
              <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0a1f33] via-[#0f2d4a] to-[#0a1f33] text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                    <Quote className="w-10 h-10 text-[#38bdf8]" />
                  </div>
                  <div className="space-y-4 text-center md:text-left">
                    <p className="text-lg sm:text-2xl font-semibold leading-relaxed text-slate-100 italic">
                      &ldquo;কোয়ালিটিতে আপস না করাই আমাদের এগিয়ে যাওয়ার একমাত্র মূলমন্ত্র। আমরা কেবল পাত্র বানাই না, একটি ব্র্যান্ডের পণ্যের দীর্ঘমেয়াদী সুরক্ষা ও গ্রাহক আস্থা নিশ্চিত করি।&rdquo;
                    </p>
                    <div className="pt-2 border-t border-white/15">
                      <div className="font-extrabold text-base text-white">নাসির উদ্দিন</div>
                      <div className="text-xs text-[#38bdf8] font-medium uppercase tracking-wider mt-0.5">
                        প্রতিষ্ঠাতা ও ব্যবস্থাপনা পরিচালক &bull; এক্সক্লুসিভ ক্যান লিমিটেড ও কিউ পাইল লিমিটেড
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Pillars of Press Recognition */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#0b6e99]">
                    <Award className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">১০০ কোটি টাকার মাইলফলক</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    প্রথম আলোর বাণিজ্য প্রতিবেদনে দেশের প্যাকেজিং শিল্পে শতকোটি টাকার ব্যবসায়িক টার্নওভারের দৃষ্টান্ত স্থাপন।
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <Factory className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">ক্লাস ১০০k ক্লিনরুম</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ফার্মাসিউটিক্যাল ও ফুড গ্রেড পাত্র তৈরিতে সর্বাধুনিক সেন্ট্রালাইজড ক্লিনরুম সুবিধা স্থাপন।
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">লিড প্লাটিনাম ক্যাম্পাস</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    পরিবেশবান্ধব গ্রিন ইন্ডাস্ট্রিয়াল পার্ক হিসেবে আন্তর্জাতিক ইউএসজিবিসি লিড প্লাটিনাম মানদণ্ড অর্জন।
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">৫০ মিলিয়ন মাসিক কন্টেইনার</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    পেইন্ট, লুব্রিকেন্ট ও ফার্মা খাতের নিরবচ্ছিন্ন সাপ্লাই চেইন নিশ্চিতকরণে উচ্চ উৎপাদন সক্ষমতা।
                  </p>
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════════════════════════ */}
            {/* SECTION C: CONTACT INQUIRY, HEAD OFFICE & PLANT NETWORK   */}
            {/* ══════════════════════════════════════════════════════════ */}
            <section id="contact-locations" className="scroll-mt-24 space-y-12">
              <div className="text-center space-y-3.5 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-xs font-bold uppercase tracking-wider shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Manufacturing Facilities &bull; Direct Corporate Inquiries</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                  Plant Locations &amp; Direct Contacts
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                  আমাদের আধুনিক কারখানা পরিদর্শন, কাস্টম টুলিং আলোচনা কিংবা সরাসরি বাণিজ্যিক কোটেশনের জন্য যোগাযোগ করুন।
                </p>
              </div>

              {/* 3 Facility Location Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {/* Plant 1: Noor Plastic Industries */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg transition-all space-y-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                      <span>Kaliakoir Pourashava Registered Plant</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Noor Plastic Industries</h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">Proprietor: Nurul Islam &bull; Trade License #242501300583</p>
                    </div>
                    <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span>Holding #5, Ward #02, Latifpur-B, Kaliakoir-1750, Gazipur, Dhaka, Bangladesh.</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-cyan-600 shrink-0" />
                        <span className="font-semibold text-slate-800">+880 1711-987275</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-cyan-600 shrink-0" />
                        <span>info@noorplastic.com</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                    Business Type: Plastic Manufacturing, Importing &amp; Supplying
                  </div>
                </div>

                {/* Plant 2: Commercial & Wholesale */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg transition-all space-y-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                      <span>Plastic Supply &amp; Distribution</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Noor Plastic Supply Wing</h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">Latifpur-B Operations, Gazipur</p>
                    </div>
                    <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span>Ward #02, Latifpur, Post Office: Kaliakoir-1750, District: Gazipur, Bangladesh.</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-cyan-600 shrink-0" />
                        <span className="font-semibold text-slate-800">+880 1711-987275</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-cyan-600 shrink-0" />
                        <span>sales@noorplastic.com</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                    Specialization: Purified Water Containers, Plastic Bottles &amp; Industrial Pails
                  </div>
                </div>

                {/* Office 3: Regulatory & Tax Compliance */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg transition-all space-y-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold border border-cyan-100">
                      <span>Official Business Registration</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Compliance &amp; Inquiries</h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">BIN: 007122199-1205 &bull; TIN: 636404586599</p>
                    </div>
                    <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      <div className="flex items-start gap-2.5">
                        <Building2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span>Kaliakoir Pourashava e-Trade License #242501300583 (FY 2026–2027).</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-cyan-600 shrink-0" />
                        <span>Sat - Thu: 08:00 AM - 08:00 PM (GMT+6)</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-cyan-600 shrink-0" />
                        <span>info@noorplastic.com</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                    Wholesale, Import Supply &amp; Corporate Partner Onboarding
                  </div>
                </div>
              </div>

              {/* Direct Interactive Message Form */}
              <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-md">
                <div className="max-w-3xl mx-auto space-y-8">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                      Send Us a Direct Message
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Fill out this quick form and our enterprise account specialists will get back to you within 24 business hours.
                    </p>
                  </div>

                  {formSubmitted ? (
                    <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                      <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                      <h4 className="text-lg font-bold text-emerald-900">Thank You! Your Message Has Been Sent.</h4>
                      <p className="text-sm text-emerald-700">
                        Our corporate relations team has received your inquiry. We will contact you shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Mohammad Rahim"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:outline-none focus:border-cyan-500 transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            Company / Organization *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Berger Paints / Square Pharma"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:outline-none focus:border-cyan-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:outline-none focus:border-cyan-500 transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            Phone / Mobile *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+8801..."
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:outline-none focus:border-cyan-500 transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            Inquiry Department
                          </label>
                          <select
                            value={formData.department}
                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                          >
                            <option>Sales &amp; New Orders</option>
                            <option>Custom Mould / Tool Room</option>
                            <option>Press &amp; Media Relations</option>
                            <option>Procurement &amp; Commercial</option>
                            <option>Factory Campus Visit</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Your Inquiry / Requirements *
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Please provide specifics such as container type, estimated monthly volume, mold requirements, or media inquiry..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                        />
                      </div>

                      <div className="text-center pt-2">
                        <button
                          type="submit"
                          className={siteButtonClass({ variant: "primary", size: "lg" })}
                        >
                          <Send className="w-4 h-4" />
                          <span>Submit Corporate Inquiry</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
