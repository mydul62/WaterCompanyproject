"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

export default function PressStoriesSection() {
  const [selectedStory, setSelectedStory] = useState<{ title: string; image: string } | null>(null);

  const stories = [
    {
      id: "story-1",
      title: "নাসিরের ব্যবসা এখন শতকোটি টাকার",
      image: "/cropped/news-card-1.png",
    },
    {
      id: "story-2",
      title: "সবাইকে ঢাকায় ছুটতে হয় কেন",
      image: "/cropped/news-card-2.png",
    },
    {
      id: "story-3",
      title: "চাাঁটগাঁইয়া উদ্যোক্তার কাঁদতে কাঁদতে চট্টগ্রাম ছাড়ার গল্প",
      image: "/cropped/news-card-3.png",
    },
    {
      id: "story-4",
      title: "শিল্পবান্ধব চট্টগ্রাম ফের কবে",
      image: "/cropped/news-card-4.png",
    },
  ];

  return (
    <section id="media" className="w-full bg-white py-16 sm:py-24">
      <div className="w-full max-w-[1480px] mx-auto px-6 sm:px-12">
        {/* Section Header matching Screenshot 2026-11-04 130333.png */}
        <div className="text-center space-y-2 mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight">
            Latest Stories
          </h2>
          <div>
            <a
              href="#media"
              className="text-slate-500 hover:text-black font-medium text-sm sm:text-base inline-block hover:underline"
            >
              View All News
            </a>
          </div>
        </div>

        {/* 4 Exact Newspaper Clipping Cards from Screenshot 2026-11-04 130333.png */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => setSelectedStory({ title: story.title, image: story.image })}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative h-56 sm:h-64 border border-slate-100"
            >
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="p-2.5 rounded-full bg-white/90 text-black shadow-md">
                  <ZoomIn className="w-5 h-5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reader Zoom Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base sm:text-lg font-bold text-black">{selectedStory.title}</h3>
              <button
                onClick={() => setSelectedStory(null)}
                className="p-1 rounded text-slate-500 hover:text-black hover:bg-slate-100 transition-colors"
                aria-label="Close reader modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-4/3 w-full mt-4">
              <Image
                src={selectedStory.image}
                alt={selectedStory.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
