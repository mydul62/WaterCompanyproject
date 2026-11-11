import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  PRESS_STORIES,
  PressStory,
  getStoryBySlug,
  normalizePressStory,
} from "@/data/mediaData";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Share2,
  CheckCircle2,
  Quote,
  Newspaper,
  Building2,
  Sparkles,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;

async function fetchLiveStories(): Promise<PressStory[]> {
  try {
    const apiBase =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
    const res = await fetch(`${apiBase}/media/stories`, {
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json?.data) && json.data.length > 0) {
        return json.data.map(normalizePressStory);
      }
    }
  } catch {
    // Fallback to static editorial defaults
  }
  return PRESS_STORIES;
}

export default async function MediaStoryPage({ params }: PageProps) {
  const { slug } = await params;
  const allStories = await fetchLiveStories();
  const story = getStoryBySlug(slug, allStories);

  if (!story) {
    notFound();
  }

  const otherStories = allStories.filter((s) => s.id !== story.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 select-none">
      {/* Floating Glass Navbar */}
      <Navbar />

      <main className="flex-1 pt-32 sm:pt-40 pb-20 sm:pb-28">
        <div className="w-full max-w-[1643px] mx-auto px-6 sm:px-10 lg:px-14">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <Link href="/" className="hover:text-cyan-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/media" className="hover:text-cyan-600 transition-colors">
              Media Coverage
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-bold truncate max-w-[280px] sm:max-w-md">
              {story.title}
            </span>
          </nav>

          {/* Top Article Header Box */}
          <header className="rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.04)] mb-10 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-xs"
                  style={{ backgroundColor: story.outletColor }}
                >
                  {story.outlet}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">
                  {story.category}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {story.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {story.readTime}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.2]">
                {story.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-500 font-semibold">
                {story.englishTitle}
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-4xl pt-2 border-t border-slate-100 italic">
              &ldquo;{story.summary}&rdquo;
            </p>
          </header>

          {/* Two-Column Editorial Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Main Column: Scanned Clipping + Full Readable Article */}
            <article className="lg:col-span-8 space-y-8">
              {/* Scanned Newspaper Paper Frame */}
              <div className="rounded-3xl bg-white border border-slate-200/80 p-5 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.05)] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 pb-2 border-b border-slate-100">
                  <span className="flex items-center gap-2">
                    <Newspaper className="w-4 h-4 text-cyan-600" />
                    জাতীয় দৈনিকে প্রকাশিত মূল পেপার কাটিং (Scanned Newspaper Scan)
                  </span>
                  <span className="text-[11px] text-cyan-700 font-semibold bg-cyan-50 px-2.5 py-0.5 rounded-full">
                    Archived Copy
                  </span>
                </div>

                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200/60 overflow-hidden flex items-center justify-center p-3">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    unoptimized={Boolean(story.image?.startsWith("/uploads/") || story.image?.startsWith("http"))}
                    className="object-contain p-2"
                    priority
                  />
                </div>
              </div>

              {/* Transcribed Digital Article */}
              <div className="rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.05)] space-y-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                  <span>প্রতিবেদনের সম্পূর্ণ ডিজিটাল পাঠ</span>
                </div>

                <div className="space-y-5 text-base sm:text-[17px] text-slate-700 leading-[1.8] font-normal">
                  {story.fullArticle.map((paragraph, idx) => (
                    <p key={idx} className={idx === 0 ? "first-letter:text-4xl first-letter:font-black first-letter:text-slate-900 first-letter:float-left first-letter:mr-2.5 first-letter:leading-none" : ""}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Key Highlights Checklist */}
                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 mb-3.5">
                    প্রতিবেদনের মূল মাইলফলক ও তথ্যসূচক:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {story.keyHighlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm font-semibold text-slate-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Editorial Quote Card */}
                {story.quote && (
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-50/70 to-blue-50/70 border border-cyan-200/70 space-y-3 relative overflow-hidden">
                    <Quote className="w-10 h-10 text-cyan-200 absolute -top-1 -right-1 pointer-events-none" />
                    <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed italic relative z-10">
                      &ldquo;{story.quote.text}&rdquo;
                    </p>
                    <div className="text-xs font-bold text-slate-900 pt-1">
                      — {story.quote.author},{" "}
                      <span className="text-cyan-800 font-normal">{story.quote.role}</span>
                    </div>
                  </div>
                )}

                {/* Source Verification Link & Share */}
                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={story.originalSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:border-cyan-500 bg-white hover:bg-cyan-50 text-slate-800 text-xs sm:text-sm font-bold shadow-xs transition-all"
                  >
                    <span>{story.outlet}-এর অনলাইন পোর্টালে দেখুন</span>
                    <ExternalLink className="w-4 h-4 text-cyan-600" />
                  </a>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <Share2 className="w-4 h-4 text-slate-400" />
                    <span>শেয়ার করুন:</span>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://noorplastic.com/media/" + story.slug)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      Facebook
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://noorplastic.com/media/" + story.slug)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-sky-600 hover:text-white transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </article>

            {/* Right Sidebar: Other Press Stories & Company Profile */}
            <aside className="lg:col-span-4 space-y-8 sticky top-28">
              {/* Other Media Features */}
              <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)] space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                  <span>অন্যান্য জাতীয় সংবাদ</span>
                  <Link href="/media" className="text-xs text-cyan-700 hover:underline">
                    সব দেখুন ({PRESS_STORIES.length})
                  </Link>
                </h3>

                <div className="space-y-4">
                  {otherStories.map((other) => (
                    <Link
                      key={other.id}
                      href={`/media/${other.slug}`}
                      className="group block p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200/70 transition-all"
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: other.outletColor }}
                        >
                          {other.outlet}
                        </span>
                        <span className="text-slate-400">{other.date}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-cyan-700 transition-colors line-clamp-2 leading-snug">
                        {other.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Factory Campus Card */}
              <div className="rounded-3xl bg-gradient-to-br from-[#0b2236] to-[#12405f] text-white p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-4 h-4" />
                  <span>Noor Plastic Industries</span>
                </div>

                <h4 className="text-lg font-bold text-white leading-snug">
                  উন্নত প্যাকেজিং ও টেকসই উৎপাদন পরিকাঠামো
                </h4>

                <p className="text-xs text-cyan-100/80 leading-relaxed">
                  দেশের শীর্ষস্থানীয় খাদ্য, পেইন্ট ও ফার্মাসিউটিক্যালস ব্র্যান্ডের বিশ্বস্ত অংশীদার। ৩০০+ পণ্যের ক্যাটালগ দেখুন।
                </p>

                <div className="pt-2">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    <span>প্রোডাক্ট ক্যাটালগ এক্সপ্লোর করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Back to Home Link */}
              <div className="text-center">
                <Link
                  href="/#media"
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>হোমপেজে ফিরে যান</span>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

