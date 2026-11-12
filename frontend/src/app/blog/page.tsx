"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { api } from "@/lib/api";
import type { BlogPost } from "@/data/blogData";
import { PublicStateMessage } from "@/components/common/PublicStateMessage";
import { siteButtonClass, siteFilterTabClass } from "@/components/common/SiteButton";
import { BlogFeaturedSkeletonCard, BlogCardsSkeletonItems } from "@/components/common/Skeletons";
import {
  BookOpen,
  Sparkles,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Share2,
  X,
  CheckCircle2,
  Tag,
  ChevronRight,
  Send,
  Leaf,
  Cpu,
  ShieldCheck,
} from "lucide-react";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setLoadError(null);
    api.blogs
      .getPublic()
      .then((res) => {
        if (!active) return;
        setPosts(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        if (!active) return;
        setPosts([]);
        setLoadError(
          err instanceof Error && err.message
            ? err.message
            : "Unable to load articles from server."
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [reloadKey]);

  // Filtered Blog Posts
  const filteredPosts = useMemo(() => {
    if (activeCategory === "ALL") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [activeCategory, posts]);

  const featuredPost = posts.find((p) => p.featured) || posts[0] || null;

  return (
    <div className="min-h-screen bg-[#f4f8fb] text-[#0a1f33] font-sans antialiased selection:bg-[#0b6e99] selection:text-white">
      <Navbar />

      <main className="relative w-full">
        {/* ============================================================ */}
        {/* 1. HERO SECTION: FULL-HEIGHT ARCHITECTURE (100VH)             */}
        {/* ============================================================ */}
        <section
          id="blog-hero"
          className="relative w-full min-h-[540px] sm:min-h-[640px] lg:h-screen lg:min-h-[800px] bg-[#0a1f33] overflow-hidden flex flex-col justify-between items-center select-none"
        >
          {/* Background Hero Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/rnd/rnd-hero-banner.jpg"
              alt="Engineering Knowledge Hub & Industry Insights"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-85 scale-102 transition-transform duration-1000 ease-out"
            />
            {/* Multi-layer Gradient Vignettes */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f33] via-black/45 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,31,51,0.6)_100%)]" />
          </div>

          {/* Top Spacer to account for Navbar */}
          <div className="h-28 sm:h-36 shrink-0" />

          {/* Centered Typography */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-bold shadow-xl shadow-black/20">
              <BookOpen className="w-4 h-4 text-[#38bdf8] animate-pulse" />
              <span>Knowledge Hub &bull; Engineering Whitepapers &amp; Trends</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-[0.2em] sm:tracking-[0.25em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] uppercase pl-[0.2em]">
              Blog &amp; Insights
            </h1>

            <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] font-bold text-[#38bdf8] drop-shadow-lg pl-[0.3em] max-w-2xl mx-auto">
              Circular Polymers &bull; Food-Grade Plastics &bull; Noor Plastic Standards
            </p>
          </div>

          {/* Animated Scroll Down Indicator */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("blog-content");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="relative z-10 pb-8 sm:pb-12 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="text-[11px] uppercase tracking-widest font-semibold group-hover:tracking-[0.25em] transition-all">
              Read Latest Whitepapers
            </span>
            <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5 backdrop-blur-sm group-hover:border-[#38bdf8] transition-colors">
              <div className="w-1.5 h-3 rounded-full bg-[#38bdf8] animate-bounce" />
            </div>
          </button>
        </section>

        {/* ============================================================ */}
        {/* CURTAIN REVEAL BODY: Rises smoothly over the hero on scroll   */}
        {/* ============================================================ */}
        <div
          id="curtain-reveal"
          className="relative bg-[#f4f8fb]"
        >
          {/* ============================================================ */}
          {/* 2. FEATURED ARTICLE BANNER                                   */}
          {/* ============================================================ */}
          <section id="blog-content" className="pt-14 sm:pt-16 lg:pt-20 pb-10 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b6e99]/10 text-[#0b6e99] text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Whitepaper
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1f33] tracking-tight">
                  Latest from Our Materials Laboratory
                </h2>
              </div>

              {/* Featured Hero Card */}
              {loading ? (
                <BlogFeaturedSkeletonCard />
              ) : loadError ? (
                <PublicStateMessage
                  variant="error"
                  title="Unable to load blog articles"
                  description={loadError}
                  onRetry={() => setReloadKey((k) => k + 1)}
                />
              ) : !featuredPost ? (
                <PublicStateMessage
                  variant="empty"
                  title="No articles published yet"
                  description="Check back soon for technical whitepapers and industry insights."
                />
              ) : (
                <div
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 cursor-pointer group"
                  onClick={() => setSelectedPost(featuredPost)}
                >
                  {/* Image Frame */}
                  <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] bg-slate-900 overflow-hidden">
                    <Image
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      fill
                      priority
                      unoptimized={Boolean(featuredPost.coverImage?.startsWith("/uploads/") || featuredPost.coverImage?.startsWith("http"))}
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:hidden" />
                    <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-cyan-400 text-slate-950 text-xs font-bold shadow-md">
                      Featured Whitepaper
                    </span>
                  </div>

                  {/* Text Frame */}
                  <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                        <span className="font-bold text-[#0b6e99] uppercase tracking-wider">
                          {featuredPost.category}
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {featuredPost.date}
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {featuredPost.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0a1f33] leading-tight group-hover:text-[#0b6e99] transition-colors">
                        {featuredPost.title}
                      </h3>

                      <p className="text-sm sm:text-base text-[#4a5f73] line-clamp-3 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden relative">
                          <Image
                            src={featuredPost.author.avatar}
                            alt={featuredPost.author.name}
                            fill
                            unoptimized={Boolean(featuredPost.author.avatar?.startsWith("/uploads/") || featuredPost.author.avatar?.startsWith("http"))}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-slate-900">{featuredPost.author.name}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">{featuredPost.author.role}</div>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0b6e99] group-hover:translate-x-1 transition-transform">
                        Read Article <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ============================================================ */}
          {/* 3. CATEGORY FILTER & ARTICLES GRID                           */}
          {/* ============================================================ */}
          <section id="blog-articles" className="bg-[#f4f8fb] pb-16 sm:pb-20 lg:pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Filter Tabs */}
              <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-10">
                {[
                  { id: "ALL", label: "All Insights", count: posts.length },
                  { id: "Sustainability & PCR", label: "Sustainability & PCR", count: posts.filter((p) => p.category === "Sustainability & PCR").length },
                  { id: "Tooling Engineering", label: "Tooling Engineering", count: posts.filter((p) => p.category === "Tooling Engineering").length },
                  { id: "Industry Standards", label: "Industry Standards", count: posts.filter((p) => p.category === "Industry Standards").length },
                  { id: "Company News", label: "Company News & Tech", count: posts.filter((p) => p.category === "Company News").length },
                ].map((tab) => {
                  const isActive = activeCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveCategory(tab.id)}
                      className={siteFilterTabClass(isActive)}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                          }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Articles Grid (3 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                  <BlogCardsSkeletonItems count={6} />
                ) : loadError || posts.length === 0 ? null : filteredPosts.length === 0 ? (
                  <PublicStateMessage
                    variant="empty"
                    title="No articles in this category"
                    description="Try selecting another category tab to view published articles."
                    className="col-span-full"
                  />
                ) : (
                  filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div>
                      {/* Image Frame */}
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          unoptimized={Boolean(post.coverImage?.startsWith("/uploads/") || post.coverImage?.startsWith("http"))}
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#0b6e99]/90 backdrop-blur-md text-white text-xs font-semibold shadow-md">
                          {post.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span>{post.date}</span>
                          <span>&bull;</span>
                          <span>{post.readTime}</span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-[#0a1f33] leading-snug group-hover:text-[#0b6e99] transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#4a5f73] line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Author Bar */}
                    <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden relative">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            unoptimized={Boolean(post.author.avatar?.startsWith("/uploads/") || post.author.avatar?.startsWith("http"))}
                            className="object-cover"
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-700">{post.author.name}</span>
                      </div>

                      <span className="text-xs font-bold text-[#0b6e99] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </article>
                ))
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ============================================================ */}
      {/* 4. FULL ARTICLE READER MODAL                                 */}
      {/* ============================================================ */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] bg-[#030a10]/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl my-auto text-slate-900 border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Cover */}
            <div className="relative w-full h-56 sm:h-72 bg-slate-900 overflow-hidden">
              <Image
                src={selectedPost.coverImage}
                alt={selectedPost.title}
                fill
                priority
                unoptimized={Boolean(selectedPost.coverImage?.startsWith("/uploads/") || selectedPost.coverImage?.startsWith("http"))}
                className="object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                aria-label="Close Article"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all border border-white/20 shadow-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Floating Header Info */}
              <div className="absolute bottom-5 left-6 right-6 text-white space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-xs font-bold">
                    {selectedPost.category}
                  </span>
                  <span className="text-xs text-slate-300">{selectedPost.date}</span>
                  <span className="text-xs text-slate-300">&bull; {selectedPost.readTime}</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold leading-tight">{selectedPost.title}</h3>
              </div>
            </div>

            {/* Modal Article Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[62vh] overflow-y-auto">
              {/* Author Strip */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                  <Image
                    src={selectedPost.author.avatar}
                    alt={selectedPost.author.name}
                    fill
                    unoptimized={Boolean(selectedPost.author.avatar?.startsWith("/uploads/") || selectedPost.author.avatar?.startsWith("http"))}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{selectedPost.author.name}</div>
                  <div className="text-xs text-slate-500">{selectedPost.author.role}</div>
                </div>
              </div>

              {/* Lead Intro */}
              <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed italic border-l-4 border-[#0b6e99] pl-4">
                {selectedPost.content.intro}
              </p>

              {/* Content Sections */}
              {selectedPost.content.sections.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">{sec.heading}</h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{sec.body}</p>
                  {sec.bullets && (
                    <ul className="space-y-2 pl-2">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-[#0b6e99] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Pull Quote */}
              {selectedPost.content.quote && (
                <div className="p-6 rounded-2xl bg-[#0a1f33] text-white">
                  <p className="text-sm sm:text-base italic text-slate-200">
                    &ldquo;{selectedPost.content.quote}&rdquo;
                  </p>
                </div>
              )}

              {/* Conclusion */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">Conclusion &amp; Outlook</h4>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {selectedPost.content.conclusion}
                </p>
              </div>

              {/* Tags */}
              <div className="flex items-center flex-wrap gap-2 pt-2">
                <span className="text-xs text-slate-400 font-medium">Keywords:</span>
                {selectedPost.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between flex-wrap gap-4">
              <span className="text-xs text-slate-500">
                Interested in collaboration or custom whitepaper consultation?
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href="/request-quote"
                  className={siteButtonClass({ variant: "primary", size: "sm" })}
                >
                  Connect with R&amp;D Team
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className={siteButtonClass({ variant: "outline", size: "sm" })}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

