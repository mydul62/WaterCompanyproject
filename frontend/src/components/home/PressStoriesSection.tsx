"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Newspaper, ArrowRight, Calendar, Clock, ZoomIn, X, ExternalLink, Sparkles } from "lucide-react";
import { PRESS_STORIES, PressStory } from "@/data/mediaData";

export default function PressStoriesSection() {
  const [lightboxStory, setLightboxStory] = useState<PressStory | null>(null);

  const outlets = [
    { name: "প্রথম আলো", en: "Prothom Alo" },
    { name: "The Daily Star", en: "The Daily Star" },
    { name: "সমকাল", en: "Samakal" },
    { name: "বণিক বার্তা", en: "Bonik Barta" },
  ];

  return (
    <section id="media" className="relative w-full bg-[#f8fafc] py-20 sm:py-28 overflow-hidden select-none">
      {/* Ambient Radial Glass Glow Orbs */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-400/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 w-[98%] max-w-[1920px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div data-reveal="up" className="text-center space-y-4 mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
            <span>Media Coverage &amp; Press Highlights</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Latest Stories in National Media
          </h2>

          <p className="text-sm sm:text-base text-slate-500 font-medium max-w-2xl mx-auto">
            দেশের শীর্ষস্থানীয় জাতীয় গণমাধ্যমে এক্সক্লুসিভ ক্যান ও কিউ পাইলের শিল্প রূপান্তর, উদ্ভাবন ও বাণিজ্যিক সাফল্যের বিশেষ প্রতিবেদন।
          </p>

          {/* Media Trust Logo / Name Strip */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
              Featured In:
            </span>
            {outlets.map((item, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1 rounded-full bg-white/80 border border-slate-200/70 text-slate-700 text-xs font-bold shadow-xs hover:border-cyan-300 transition-colors"
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>

        {/* 4 High-End Editorial Press Cards with Liquid Water Wave Hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {PRESS_STORIES.map((story, idx) => {
            const delays = ["delay-75", "delay-150", "delay-200", "delay-250"];
            return (
              <article
                key={story.id}
                data-reveal="scale"
                className={`water-fill-card group rounded-3xl bg-white border border-slate-200/80 p-4 shadow-[0_10px_35px_rgba(0,0,0,0.04)] flex flex-col justify-between overflow-hidden cursor-pointer ${delays[idx % delays.length]}`}
              >
              <div className="space-y-3.5">
                {/* Card Top Metadata Strip */}
                <div className="flex items-center justify-between gap-2 px-1 pt-1">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs"
                    style={{ backgroundColor: story.outletColor }}
                  >
                    {story.outlet}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{story.date}</span>
                  </div>
                </div>

                {/* Newspaper Clipping Visual with Realistic Paper Depth */}
                <div className="relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-200/60 overflow-hidden flex items-center justify-center p-2.5 group-hover:border-cyan-300 transition-all">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-contain p-2 group-hover:scale-106 transition-transform duration-500 drop-shadow-sm"
                  />

                  {/* Zoom Lightbox Trigger Overlay */}
                  <div className="absolute inset-0 bg-slate-900/35 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => setLightboxStory(story)}
                      className="px-3 py-1.5 rounded-full bg-white text-slate-900 text-xs font-bold shadow-lg inline-flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      title="কাটিং বড় করে দেখুন"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Zoom Scan</span>
                    </button>
                    <Link
                      href={`/media/${story.slug}`}
                      className="px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-lg inline-flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all"
                      title="পূর্ণাঙ্গ প্রতিবেদন পড়ুন"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Title & Category */}
                <div className="px-1 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md inline-block">
                    {story.category}
                  </span>
                  <Link href={`/media/${story.slug}`}>
                    <h3 className="text-base sm:text-[17px] font-bold text-slate-900 group-hover:text-cyan-700 transition-colors line-clamp-2 leading-snug">
                      {story.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {story.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer: Read More Link */}
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
          );
        })}
      </div>

        {/* View All Press Link */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/media"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-800 font-bold text-sm shadow-xs hover:shadow-md hover:border-cyan-300 hover:text-cyan-700 transition-all active:scale-95"
          >
            <Newspaper className="w-4 h-4 text-cyan-600" />
            <span>View All National Press Articles ({PRESS_STORIES.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Full-Screen High-Res Scan Lightbox */}
      {lightboxStory && (
        <div
          onClick={() => setLightboxStory(null)}
          className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl p-6 shadow-2xl flex flex-col space-y-4 overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs"
                  style={{ backgroundColor: lightboxStory.outletColor }}
                >
                  {lightboxStory.outlet}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1">
                  {lightboxStory.title}
                </h4>
              </div>
              <button
                onClick={() => setLightboxStory(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scanned Image Full View */}
            <div className="relative w-full h-[65vh] rounded-2xl bg-slate-50 overflow-hidden flex items-center justify-center border border-slate-100">
              <Image
                src={lightboxStory.image}
                alt={lightboxStory.title}
                fill
                className="object-contain p-4"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 font-medium">
                প্রকাশের তারিখ: {lightboxStory.date}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLightboxStory(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                  বন্ধ করুন
                </button>
                <Link
                  href={`/media/${lightboxStory.slug}`}
                  onClick={() => setLightboxStory(null)}
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold shadow-md transition-colors inline-flex items-center gap-1.5"
                >
                  <span>পূর্ণাঙ্গ প্রতিবেদন পেজে পড়ুন</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
