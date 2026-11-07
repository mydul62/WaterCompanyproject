"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PRESS_STORIES, PressStory } from "@/data/mediaData";
import { Newspaper, Calendar, Clock, ArrowRight, Sparkles, Search, Filter } from "lucide-react";

export default function MediaArchivePage() {
  const [selectedOutlet, setSelectedOutlet] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const outlets = ["All", "Prothom Alo", "The Daily Star", "Samakal", "Bonik Barta"];

  const filteredStories = useMemo(() => {
    return PRESS_STORIES.filter((story) => {
      const matchOutlet = selectedOutlet === "All" || story.outlet === selectedOutlet;
      const matchQuery =
        !searchQuery ||
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.outlet.toLowerCase().includes(searchQuery.toLowerCase());
      return matchOutlet && matchQuery;
    });
  }, [selectedOutlet, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 select-none">
      {/* Floating Glass Navbar */}
      <Navbar />

      <main className="flex-1 pt-32 sm:pt-40 pb-20 sm:pb-28">
        <div className="w-full max-w-[1643px] mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
          {/* Header Banner */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-xs font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
              <span>National Press Archive &bull; News Archive</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Media Coverage &amp; Press Highlights
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              জাতীয় ও আন্তর্জাতিক গণমাধ্যমে এক্সক্লুসিভ ক্যান লিমিটেড এবং কিউ পাইল লিমিটেডের শিল্প বিকাশ, উদ্ভাবনী প্যাকেজিং প্রযুক্তি ও সাফল্যগাঁথার সম্পূর্ণ আর্কাইভ।
            </p>
          </div>

          {/* Filter Bar & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
            {/* Outlet Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {outlets.map((outlet) => (
                <button
                  key={outlet}
                  onClick={() => setSelectedOutlet(outlet)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedOutlet === outlet
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100"
                  }`}
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

          {/* Stories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {filteredStories.map((story) => (
              <article
                key={story.id}
                className="group rounded-3xl bg-white border border-slate-200/80 hover:border-cyan-400/50 p-4 shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,194,232,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  {/* Outlet & Date */}
                  <div className="flex items-center justify-between gap-2 px-1 pt-1">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs"
                      style={{ backgroundColor: story.outletColor }}
                    >
                      {story.outlet}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {story.date}
                    </span>
                  </div>

                  {/* Scanned Image Preview */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200/60 overflow-hidden flex items-center justify-center p-2.5">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Title & Category */}
                  <div className="px-1 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md inline-block">
                      {story.category}
                    </span>
                    <Link href={`/media/${story.slug}`}>
                      <h2 className="text-base sm:text-[17px] font-bold text-slate-900 group-hover:text-cyan-700 transition-colors line-clamp-2 leading-snug">
                        {story.title}
                      </h2>
                    </Link>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {story.summary}
                    </p>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between px-1">
                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {story.readTime}
                  </span>

                  <Link
                    href={`/media/${story.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 hover:text-cyan-800 transition-colors group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>প্রতিবেদন পড়ুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

