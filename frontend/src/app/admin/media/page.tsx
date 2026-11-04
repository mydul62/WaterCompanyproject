"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Newspaper,
  Plus,
  Trash2,
  ExternalLink,
  Calendar,
  X,
  FileCheck,
} from "lucide-react";
import { PRESS_STORIES } from "@/data/companyData";

interface MediaItem {
  id: string;
  title: string;
  banglaTitle: string;
  newspaper: string;
  date: string;
  summary: string;
  highlightQuote: string;
  image: string;
  tag: string;
}

export default function AdminMediaPage() {
  const [stories, setStories] = useState<MediaItem[]>(PRESS_STORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStory, setNewStory] = useState({
    title: "",
    banglaTitle: "",
    newspaper: "",
    date: "Special Industrial Report",
    summary: "",
    highlightQuote: "",
    image: "/Infoimages/Screenshot 2026-11-04 130333.png",
    tag: "Milestone",
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this press story?")) {
      setStories((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleCreateStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStory.title || !newStory.newspaper) return;

    const created: MediaItem = {
      id: `story-${Date.now()}`,
      title: newStory.title,
      banglaTitle: newStory.banglaTitle || newStory.title,
      newspaper: newStory.newspaper,
      date: newStory.date,
      summary: newStory.summary,
      highlightQuote: newStory.highlightQuote,
      image: newStory.image,
      tag: newStory.tag,
    };

    setStories([created, ...stories]);
    setIsModalOpen(false);
    setNewStory({
      title: "",
      banglaTitle: "",
      newspaper: "",
      date: "Special Industrial Report",
      summary: "",
      highlightQuote: "",
      image: "/Infoimages/Screenshot 2026-11-04 130333.png",
      tag: "Milestone",
    });
  };

  return (
    <div className="space-y-8 max-w-[1638px] mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Newspaper className="w-6 h-6 text-purple-400" />
            Press &amp; Media Publications
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Curate national newspaper clippings, founder profiles, and corporate industrial milestone reports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/#media"
            target="_blank"
            className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            Public Stories
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-600/30 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add Press Story
          </button>
        </div>
      </div>

      {/* Grid of Stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story.id}
            className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden border-b border-slate-800">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-mono font-bold text-cyan-400 border border-white/10">
                  {story.newspaper}
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                  {story.tag}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-base font-bold text-white line-clamp-1">{story.title}</h3>
                <h4 className="text-sm font-semibold text-cyan-300 font-sans line-clamp-1">
                  {story.banglaTitle}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {story.summary}
                </p>

                {story.highlightQuote && (
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 italic border-l-2 border-l-blue-500">
                    &ldquo;{story.highlightQuote}&rdquo;
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-mono text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                {story.date}
              </span>

              <button
                onClick={() => handleDelete(story.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                title="Delete story"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Press Story Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-purple-400" />
                Add National Press Story
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStory} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Headline (English)</label>
                <input
                  type="text"
                  required
                  value={newStory.title}
                  onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                  placeholder="e.g. Xclusive Can Crosses 100-Crore Benchmark"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Headline (Bengali)</label>
                <input
                  type="text"
                  value={newStory.banglaTitle}
                  onChange={(e) => setNewStory({ ...newStory, banglaTitle: e.target.value })}
                  placeholder="e.g. নাসিরের ব্যবসা এখন শতকোটি টাকার"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Newspaper Publication</label>
                  <input
                    type="text"
                    required
                    value={newStory.newspaper}
                    onChange={(e) => setNewStory({ ...newStory, newspaper: e.target.value })}
                    placeholder="e.g. The Daily Prothom Alo"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Category Tag</label>
                  <input
                    type="text"
                    value={newStory.tag}
                    onChange={(e) => setNewStory({ ...newStory, tag: e.target.value })}
                    placeholder="e.g. Industrial Milestone"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Summary</label>
                <textarea
                  rows={3}
                  required
                  value={newStory.summary}
                  onChange={(e) => setNewStory({ ...newStory, summary: e.target.value })}
                  placeholder="Brief synopsis of the newspaper coverage..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Publish Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

