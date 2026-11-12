"use client";

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { api } from "@/lib/api";
import { smoothScrollToElement } from "@/lib/smoothScroll";
import { PublicStateMessage } from "@/components/common/PublicStateMessage";
import {
  TvNewsVideoItem,
  TV_NEWS_HERO_IMAGE,
  normalizeTvNewsVideo,
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
} from "@/data/tvNewsData";
import { siteFilterTabClass } from "@/components/common/SiteButton";
import { SkeletonBox } from "@/components/common/Skeletons";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Play,
  Maximize2,
  X,
  Search,
  Tv,
  ExternalLink,
} from "lucide-react";

const PAGE_SIZE_OPTIONS = [9, 10, 12, 18, 24] as const;

export default function TvNewsPage() {
  const [videos, setVideos] = useState<TvNewsVideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [heroTitle, setHeroTitle] = useState("TV News");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Noor Plastic Industries • Broadcast Coverage & Factory Features"
  );
  const [heroImage, setHeroImage] = useState(TV_NEWS_HERO_IMAGE);

  const [activeChannel, setActiveChannel] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(9);
  const [jumpInput, setJumpInput] = useState("");
  const [inlinePlayingIds, setInlinePlayingIds] = useState<Record<string, boolean>>({});
  const [theaterVideo, setTheaterVideo] = useState<TvNewsVideoItem | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setLoadError(null);

    Promise.allSettled([api.tvNews.getPublic(), api.settings.getMap()])
      .then(([videosRes, settingsRes]) => {
        if (!active) return;

        if (videosRes.status === "fulfilled") {
          const rows = Array.isArray(videosRes.value?.data)
            ? videosRes.value.data
            : [];
          setVideos(
            rows.map((row: any, idx: number) => normalizeTvNewsVideo(row, idx))
          );
        } else {
          setVideos([]);
          setLoadError(
            videosRes.reason instanceof Error && videosRes.reason.message
              ? videosRes.reason.message
              : "Unable to load TV news videos from server."
          );
        }

        if (settingsRes.status === "fulfilled" && settingsRes.value?.data) {
          const map = settingsRes.value.data;
          if (map.tv_news_hero_title) setHeroTitle(map.tv_news_hero_title);
          if (map.tv_news_hero_subtitle) setHeroSubtitle(map.tv_news_hero_subtitle);
          if (map.tv_news_hero_image) setHeroImage(map.tv_news_hero_image);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [reloadKey]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTheaterVideo(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const channels = useMemo(() => {
    const unique = Array.from(
      new Set(videos.map((v) => v.channel).filter((c): c is string => Boolean(c)))
    );
    return ["All", ...unique];
  }, [videos]);

  const filteredVideos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return videos.filter((v) => {
      const matchChannel = activeChannel === "All" || v.channel === activeChannel;
      const matchQuery =
        !q ||
        v.title.toLowerCase().includes(q) ||
        (v.channel || "").toLowerCase().includes(q) ||
        (v.category || "").toLowerCase().includes(q);
      return matchChannel && matchQuery;
    });
  }, [videos, activeChannel, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredVideos.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeChannel, searchQuery, pageSize]);

  const paginatedVideos = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredVideos.slice(start, start + pageSize);
  }, [filteredVideos, safePage, pageSize]);

  const startItem = filteredVideos.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endItem = Math.min(safePage * pageSize, filteredVideos.length);

  const goToPage = (page: number) => {
    const clamped = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(clamped);
    smoothScrollToElement("tv-news-grid");
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number.parseInt(jumpInput, 10);
    if (Number.isFinite(num)) {
      goToPage(num);
    }
    setJumpInput("");
  };

  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "ellipsis")[] = [1];
    if (safePage > 3) pages.push("ellipsis");
    for (
      let p = Math.max(2, safePage - 1);
      p <= Math.min(totalPages - 1, safePage + 1);
      p += 1
    ) {
      pages.push(p);
    }
    if (safePage < totalPages - 2) pages.push("ellipsis");
    pages.push(totalPages);
    return pages;
  }, [totalPages, safePage]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar />

      <main className="flex-1">
        {/* 1. Full-Viewport Broadcast Camera Hero Banner */}
        <section
          id="tv-news-hero"
          aria-label="TV News hero banner"
          className="relative w-full min-h-[100svh] h-screen h-[100dvh] overflow-hidden bg-[#0c141c] flex flex-col justify-between items-center"
          style={{ minHeight: "100svh", height: "100dvh" }}
        >
          <img
            src={heroImage}
            alt={heroTitle}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-black/70" />

          <div className="h-24 sm:h-28 shrink-0" />

          <div className="relative z-10 text-center px-4 space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wide text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.65)]">
              {heroTitle}
            </h1>
            {heroSubtitle && (
              <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-white/85 font-medium drop-shadow-sm max-w-2xl mx-auto">
                {heroSubtitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => smoothScrollToElement("tv-news-grid")}
            aria-label="Scroll to TV News videos"
            className="relative z-10 pb-8 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold">
              Watch Broadcasts
            </span>
            <ChevronDown className="w-5 h-5 animate-bounce text-cyan-300" />
          </button>
        </section>

        {/* 2. YouTube Embeds & Broadcast Coverage Grid */}
        <section
          id="tv-news-grid"
          aria-label="TV News video archive"
          className="bg-white py-12 sm:py-16 lg:py-20"
        >
          <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
            {/* Compact Filter & Search Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-2">
                {channels.map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => setActiveChannel(ch)}
                    className={siteFilterTabClass(activeChannel === ch)}
                  >
                    {ch === "All" ? "All Channels" : ch}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72 shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search TV News title or channel..."
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            {/* Video Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="space-y-3">
                    <SkeletonBox className="w-full aspect-video rounded-xl" />
                    <SkeletonBox className="h-4 w-5/6" />
                    <SkeletonBox className="h-3.5 w-1/2 bg-slate-100" />
                  </div>
                ))}
              </div>
            ) : loadError ? (
              <PublicStateMessage
                variant="error"
                title="Unable to load TV news videos"
                description={loadError}
                onRetry={() => setReloadKey((k) => k + 1)}
              />
            ) : videos.length === 0 ? (
              <PublicStateMessage
                variant="empty"
                title="No TV news coverage published yet"
                description="Broadcast videos added from the Admin Panel will appear here."
              />
            ) : paginatedVideos.length === 0 ? (
              <div className="py-16 text-center space-y-3 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <Tv className="w-10 h-10 text-slate-400 mx-auto" />
                <p className="text-base font-bold text-slate-700">
                  No matching TV News videos found
                </p>
                <p className="text-xs text-slate-500">
                  Try clearing the search query or selecting another TV channel filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {paginatedVideos.map((video) => {
                  const hasCustomPoster = Boolean(video.thumbnailUrl);
                  const isPlayingInline = Boolean(inlinePlayingIds[video.id]);
                  const showLiveIframe = isPlayingInline || !hasCustomPoster;
                  const posterSrc =
                    video.thumbnailUrl || getYouTubeThumbnailUrl(video.videoId, "hq");

                  return (
                    <article key={video.id} className="flex flex-col group">
                      {/* 16:9 Rounded Embed / Poster Slot */}
                      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 shadow-[0_6px_26px_rgba(15,23,42,0.09)] border border-slate-200/80">
                        {showLiveIframe ? (
                          <iframe
                            src={getYouTubeEmbedUrl(video.videoId, isPlayingInline)}
                            title={video.title}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="w-full h-full border-0"
                          />
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setInlinePlayingIds((prev) => ({
                                ...prev,
                                [video.id]: true,
                              }))
                            }
                            aria-label={`Play ${video.title}`}
                            className="relative w-full h-full block cursor-pointer text-left focus:outline-none"
                          >
                            <img
                              src={posterSrc}
                              alt={video.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/20 transition-opacity group-hover:opacity-90" />

                            {/* Centered Play Pill */}
                            <span className="absolute inset-0 flex items-center justify-center">
                              <span className="w-14 h-10 sm:w-16 sm:h-11 rounded-2xl bg-red-600/95 group-hover:bg-red-600 shadow-lg shadow-black/40 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                                <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                              </span>
                            </span>

                            {/* Channel Stamp */}
                            {video.channel && (
                              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-xs text-[11px] font-semibold text-white">
                                {video.channel}
                              </span>
                            )}
                          </button>
                        )}

                        {/* Theater Lightbox Button */}
                        <button
                          type="button"
                          onClick={() => setTheaterVideo(video)}
                          title="Open Cinema View"
                          className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-black/65 hover:bg-black/85 text-white/90 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Clean Title & Subtle Meta Below */}
                      <div className="pt-3 space-y-1">
                        <h2
                          onClick={() =>
                            setInlinePlayingIds((prev) => ({
                              ...prev,
                              [video.id]: true,
                            }))
                          }
                          className="text-sm sm:text-[15px] font-medium text-slate-900 group-hover:text-[#094E9B] transition-colors leading-snug line-clamp-2 cursor-pointer"
                        >
                          {video.title}
                        </h2>
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span>
                            {video.channel || "TV News"}
                            {video.publishedLabel ? ` • ${video.publishedLabel}` : ""}
                          </span>
                          <a
                            href={video.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 hover:text-red-600 transition-colors font-medium"
                          >
                            <span>YouTube</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Pagination Bar (Matches Reference Design + Functional Controls) */}
            {filteredVideos.length > 0 && (
              <div className="mt-12 sm:mt-14 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-[13px] text-slate-600">
                <span className="text-slate-600 mr-1">
                  {startItem}-{endItem} of {filteredVideos.length} items
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={safePage <= 1}
                    onClick={() => goToPage(safePage - 1)}
                    aria-label="Previous page"
                    className="w-8 h-8 rounded-md border border-slate-200 flex items-center justify-center text-slate-500 hover:border-slate-400 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {pageNumbers.map((entry, idx) =>
                    entry === "ellipsis" ? (
                      <span key={`e-${idx}`} className="px-1.5 text-slate-400">
                        &bull;&bull;&bull;
                      </span>
                    ) : (
                      <button
                        key={entry}
                        type="button"
                        onClick={() => goToPage(entry)}
                        className={`min-w-8 h-8 px-2 rounded-md text-xs sm:text-[13px] transition-colors cursor-pointer ${
                          entry === safePage
                            ? "border border-[#1677ff] text-[#1677ff] font-semibold bg-blue-50/40"
                            : "border border-transparent text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {entry}
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    disabled={safePage >= totalPages}
                    onClick={() => goToPage(safePage + 1)}
                    aria-label="Next page"
                    className="w-8 h-8 rounded-md border border-slate-200 flex items-center justify-center text-slate-500 hover:border-slate-400 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Page Size Selector */}
                <select
                  aria-label="Videos per page"
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="h-8 px-2.5 rounded-md border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:border-[#1677ff] cursor-pointer"
                >
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <option key={size} value={size}>
                      {size} / page
                    </option>
                  ))}
                </select>

                {/* Go to Page Jump */}
                <form onSubmit={handleJumpSubmit} className="inline-flex items-center gap-1.5">
                  <span className="text-slate-600">Go to</span>
                  <input
                    type="number"
                    min={1}
                    max={totalPages}
                    value={jumpInput}
                    onChange={(e) => setJumpInput(e.target.value)}
                    className="w-12 h-8 px-2 rounded-md border border-slate-200 text-center text-xs text-slate-800 focus:outline-none focus:border-[#1677ff]"
                  />
                  <span className="text-slate-600">Page</span>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Cinema Theater Lightbox */}
      {theaterVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={theaterVideo.title}
          onClick={() => setTheaterVideo(null)}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl bg-slate-950 border border-white/15 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-white/10">
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                  {theaterVideo.channel || "TV News"}
                  {theaterVideo.publishedLabel ? ` • ${theaterVideo.publishedLabel}` : ""}
                </p>
                <h3 className="text-sm sm:text-base font-bold text-white truncate">
                  {theaterVideo.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setTheaterVideo(null)}
                aria-label="Close video player"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              <iframe
                src={getYouTubeEmbedUrl(theaterVideo.videoId, true)}
                title={theaterVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {theaterVideo.description && (
              <div className="px-5 py-4 bg-slate-900/80 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {theaterVideo.description}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

