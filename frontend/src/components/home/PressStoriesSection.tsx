"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function PressStoriesSection() {
  const [selectedStory, setSelectedStory] = useState<{ title: string; image: string } | null>(null);

  const stories = [
    {
      id: "story-1",
      title: "নাসিরের ব্যবসা এখন শতকোটি টাকার",
      position: "left center",
      summary: "Xclusive Can Limited's milestone journey to becoming a 100-crore manufacturing leader.",
    },
    {
      id: "story-2",
      title: "সবাইকে ঢাকায় ছুটতে হয় কেন",
      position: "33% center",
      summary: "The strategic industrial expansion into Gazipur and Tongi.",
    },
    {
      id: "story-3",
      title: "চাঁটগাঁইয়া উদ্যোক্তার কাঁদতে কাঁদতে চট্টগ্রাম ছাড়ার গল্প",
      position: "66% center",
      summary: "Entrepreneurial perseverance and construction of world-class facilities.",
    },
    {
      id: "story-4",
      title: "শিল্পবান্ধব চট্টগ্রাম ফের কবে",
      position: "right center",
      summary: "National discussions on manufacturing policy, power grids, and port infrastructure.",
    },
  ];

  return (
    <section id="media" className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        {/* Section Header matching Screenshot 2026-11-04 130333.png */}
        <div className="text-center space-y-2 mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight">
            Latest Stories
          </h2>
          <div>
            <a
              href="#media"
              className="text-slate-600 hover:text-black font-medium text-sm sm:text-base inline-block hover:underline"
            >
              View All News
            </a>
          </div>
        </div>

        {/* 4 Newspaper Clipping Cards matching Screenshot 2026-11-04 130333.png */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => setSelectedStory({ title: story.title, image: "/Infoimages/Screenshot 2026-11-04 130333.png" })}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#edf1f4] shadow-sm hover:shadow-lg transition-all border border-slate-200 h-52 sm:h-64 relative"
            >
              <Image
                src="/Infoimages/Screenshot 2026-11-04 130333.png"
                alt={story.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                style={{ objectPosition: story.position }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Reader Zoom Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-black">{selectedStory.title}</h3>
              <button
                onClick={() => setSelectedStory(null)}
                className="p-1 rounded text-slate-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-16/9 w-full mt-3 rounded-lg overflow-hidden border border-slate-200">
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
