"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import UsgbcLeedSeal from "@/components/sustainability/UsgbcLeedSeal";
import SustainabilityDetailModal from "@/components/sustainability/SustainabilityDetailModal";
import { api } from "@/lib/api";
import { PublicStateMessage } from "@/components/common/PublicStateMessage";
import {
  parseSustainabilityContent,
  SUSTAINABILITY_SETTING_KEY,
  SUSTAINABILITY_UPDATED_EVENT,
  SustainabilityHighlight,
  EnvironmentalPractice,
  SustainabilityPageContent,
} from "@/data/sustainabilityData";
import { ChevronDown, CheckCircle2, ArrowRight } from "lucide-react";

function buildDefaultExpandedMap(
  highlights: SustainabilityHighlight[]
): Record<string, boolean> {
  const initial: Record<string, boolean> = {};
  for (const h of highlights) {
    if (h.defaultExpanded) initial[h.id] = true;
  }
  return initial;
}

function HighlightCard({
  item,
  expanded,
  onToggle,
}: {
  item: SustainabilityHighlight;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      className="group relative border-2 border-white/80 rounded-xl bg-black/25 backdrop-blur-xs w-full aspect-[3/2] p-6 sm:p-8 lg:p-9 text-left transition-all duration-300 hover:bg-black/45 hover:border-white hover:-translate-y-0.5 cursor-pointer flex flex-col justify-center overflow-hidden shadow-lg"
    >
      {expanded ? (
        <div className="h-full overflow-y-auto pr-1 flex flex-col justify-between gap-3">
          <p className="text-start font-medium text-sm sm:text-base lg:text-lg leading-relaxed text-white/95">
            {item.description}
          </p>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#99ddd1]">
            Click to show metric
          </span>
        </div>
      ) : (
        <div className="h-full w-full flex flex-col justify-center">
          <h3 className="text-white text-start leading-tight w-full">
            {item.segments.map((seg, idx) => (
              <span
                key={idx}
                className={
                  seg.emphasize
                    ? "text-3xl sm:text-4xl xl:text-5xl 2xl:text-[3.5rem] font-bold"
                    : "text-lg sm:text-xl xl:text-2xl font-medium text-white/95"
                }
                style={{ lineHeight: 1.18 }}
              >
                {seg.text}
              </span>
            ))}
          </h3>
          <span className="mt-4 text-[11px] uppercase tracking-wider font-medium text-white/55 group-hover:text-[#99ddd1] transition-colors">
            Click for details &rarr;
          </span>
        </div>
      )}
    </button>
  );
}

export default function SustainabilityPage() {
  const [content, setContent] = useState<SustainabilityPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const [selectedPractice, setSelectedPractice] = useState<EnvironmentalPractice | null>(null);
  const [expandedPillarId, setExpandedPillarId] = useState<string | null>(null);

  const applyContent = useCallback((nextContent: SustainabilityPageContent) => {
    setContent(nextContent);
    setExpandedCards((prev) => {
      const defaults = buildDefaultExpandedMap(nextContent.highlights);
      return { ...defaults, ...prev };
    });
  }, []);

  const fetchSustainabilitySettings = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await api.settings.getMap();
      const raw = res?.data?.[SUSTAINABILITY_SETTING_KEY];
      if (!raw) {
        setContent(null);
        setLoadError("Sustainability content has not been configured in the database yet.");
        return;
      }
      const parsed = parseSustainabilityContent(raw);
      applyContent(parsed);
    } catch (err) {
      setContent(null);
      setLoadError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to load sustainability information from server."
      );
    } finally {
      setLoading(false);
    }
  }, [applyContent]);

  useEffect(() => {
    fetchSustainabilitySettings();

    const handleUpdated = () => {
      fetchSustainabilitySettings();
    };

    window.addEventListener(SUSTAINABILITY_UPDATED_EVENT, handleUpdated);
    return () => {
      window.removeEventListener(SUSTAINABILITY_UPDATED_EVENT, handleUpdated);
    };
  }, [fetchSustainabilitySettings]);

  const leafTextStyle: React.CSSProperties = useMemo(
    () => ({
      backgroundColor: "#14532d",
      backgroundImage: content?.intro?.leafTextureImage
        ? `url("${content.intro.leafTextureImage}")`
        : undefined,
      backgroundSize: "cover",
      backgroundPosition: "center",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
    }),
    [content?.intro?.leafTextureImage]
  );

  const toggleHighlightCard = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePillar = (id: string) => {
    setExpandedPillarId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {loading ? (
          <div className="w-full min-h-[75vh] bg-[#15281e] animate-pulse flex items-center justify-center px-6 pt-28 pb-16">
            <div className="max-w-xl w-full space-y-4 text-center">
              <div className="h-12 w-2/3 mx-auto rounded-xl bg-white/15" />
              <div className="h-4 w-1/2 mx-auto rounded bg-white/10" />
            </div>
          </div>
        ) : loadError || !content ? (
          <div className="bg-[#0f2218] min-h-[70vh] flex items-center justify-center px-6 pt-32 pb-20">
            <div className="max-w-xl w-full">
              <PublicStateMessage
                tone="dark"
                variant="error"
                title="Unable to load sustainability page"
                description={
                  loadError || "Sustainability data could not be loaded from PostgreSQL."
                }
                onRetry={fetchSustainabilitySettings}
              />
            </div>
          </div>
        ) : (
          <>
        {/* 1. Full-Height Architectural Hero Banner */}
        <section
          id="hero"
          aria-label="Sustainability hero banner"
          className="relative w-full min-h-[100svh] h-screen h-[100dvh] overflow-hidden bg-[#15281e] flex flex-col justify-between items-center"
          style={{ minHeight: "100svh", height: "100dvh" }}
        >
          <img
            src={content.hero.image}
            alt={content.hero.title || "Noor Plastic Industries sustainable green manufacturing building"}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/50" />

          <div className="h-24 sm:h-28 shrink-0" />

          <div className="relative z-10 text-center px-4 space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wide text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.55)]">
              {content.hero.title}
            </h1>
            {content.hero.subtitle && (
              <p className="text-xs sm:text-sm uppercase tracking-[0.26em] text-white/90 font-medium drop-shadow-sm">
                {content.hero.subtitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              document
                .getElementById("sustainability-intro")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Scroll to sustainability overview"
            className="relative z-10 pb-8 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold">
              {content.hero.scrollLabel || "Explore"}
            </span>
            <ChevronDown className="w-5 h-5 animate-bounce text-[#99ddd1]" />
          </button>
        </section>

        {/* 2. Botanical Intro Heading & Silver USGBC LEED Seal */}
        <section
          id="sustainability-intro"
          aria-label="Sustainability page first section"
          className="bg-[#f4f8f5]"
        >
          <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
            <div className="flex flex-col items-center gap-12 lg:gap-16">
              <h2
                className="font-bold whitespace-pre-line text-2xl sm:text-3xl lg:text-4xl 2xl:text-[2.75rem] text-center leading-[1.24] max-w-[1220px]"
                style={leafTextStyle}
              >
                {content.intro.heading}
              </h2>

              <div className="w-full max-w-[1200px] flex flex-col items-center md:flex-row gap-10 md:gap-14 lg:gap-20">
                <p className="font-medium whitespace-pre-line text-base sm:text-lg lg:text-[1.45rem] leading-[1.7] text-[#6d8d75] flex-1">
                  {content.intro.description}
                </p>

                {content.intro.showLeedSeal && (
                  <div className="w-56 sm:w-64 lg:w-72 md:flex-none transition-transform duration-500 hover:scale-[1.03]">
                    <UsgbcLeedSeal className="w-full h-auto drop-shadow-md" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Dark Natural Stone Section with Interactive Highlight Cards */}
        <section
          id="sustainability-highlights"
          aria-label="Sustainability page sustainability highlights section"
          className="relative bg-neutral-900 overflow-hidden"
        >
          <img
            src={content.highlightsBgImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 lg:gap-10">
              {content.highlights.map((item) => (
                <HighlightCard
                  key={item.id}
                  item={item}
                  expanded={Boolean(expandedCards[item.id])}
                  onToggle={() => toggleHighlightCard(item.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 4. Floating Aqua-Mint Environmental Practices Circles */}
        <section
          id="environmental-practices-section"
          aria-label="Sustainability page environmental practices section"
          className="bg-[#f4f8f5]"
        >
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
            <div className="text-center space-y-2 mb-12 sm:mb-16">
              <h2
                className="font-bold text-2xl sm:text-3xl lg:text-4xl 2xl:text-[2.75rem] leading-tight"
                style={leafTextStyle}
              >
                {content.practicesSectionTitle}
              </h2>
              {content.practicesSectionSubtitle && (
                <p className="text-xs sm:text-sm text-[#6d8d75] font-medium">
                  {content.practicesSectionSubtitle}
                </p>
              )}
            </div>

            {/* Balanced 3x2 Gallery Grid on Desktop (2x3 on Tablet) */}
            <div className="max-w-[980px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 sm:gap-x-14 gap-y-12 sm:gap-y-14 place-items-center">
              {content.practices.map((practice) => (
                <button
                  key={practice.id}
                  type="button"
                  onClick={() => setSelectedPractice(practice)}
                  className="group flex flex-col items-center text-center cursor-pointer focus:outline-none"
                >
                  <div
                    className="w-40 h-40 sm:w-44 sm:h-44 rounded-full flex items-center justify-center p-8 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1.5 ring-8 ring-transparent group-hover:ring-[#99ddd1]/25 group-focus-visible:ring-[#99ddd1]/50"
                    style={{
                      background: "linear-gradient(225deg, #a2d7e9 0%, #99ddd1 100%)",
                      boxShadow: "4px 12px 42px rgba(49, 88, 115, 0.16)",
                    }}
                  >
                    <img
                      src={practice.icon}
                      alt={practice.fullTitle}
                      className="w-20 h-20 sm:w-22 sm:h-22 object-contain"
                    />
                  </div>

                  <span className="mt-5 text-sm sm:text-base font-semibold text-slate-800 group-hover:text-[#1f5f6b] transition-colors leading-snug max-w-[200px]">
                    {practice.titleTop}
                    {practice.titleBottom && (
                      <>
                        <br />
                        {practice.titleBottom}
                      </>
                    )}
                  </span>

                  <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#315873] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Read standard</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Natural Resources White-Fade Banner & Smooth Stone Accordion Pillars */}
        <section
          id="sustainability-pillars"
          aria-label="Sustainability page sustainability pillars section"
          className="bg-white"
        >
          {/* Full-width Natural Resources Fade Banner */}
          <div className="relative w-full aspect-[2/1] sm:aspect-[2.85/1] max-h-[500px] overflow-hidden bg-white">
            <img
              src={content.naturalResourcesImage}
              alt="Green vertical foliage architectural facade"
              className="w-full h-full object-cover object-left"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(97deg, rgba(255, 255, 255, 0) 27.9%, rgb(255, 255, 255) 72.07%)",
              }}
            />

            <div className="absolute inset-0 max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 pb-6 sm:pb-10 lg:pb-14 flex items-end justify-end">
              <h2 className="text-[#315873] italic font-bold whitespace-pre-line text-lg sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[2.75rem] leading-[1.18] text-left">
                {content.naturalResourcesHeading}
              </h2>
            </div>
          </div>

          {/* Sustainability Vision Stone Bars (Interactive Accordion) */}
          <div className="max-w-[1040px] mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-18 lg:py-22">
            <h2
              className="font-bold text-2xl sm:text-3xl lg:text-4xl 2xl:text-[2.65rem] text-center leading-tight mb-10 sm:mb-12"
              style={leafTextStyle}
            >
              {content.visionHeading}
            </h2>

            <div className="space-y-4">
              {content.pillars.map((pillar) => {
                const isOpen = expandedPillarId === pillar.id;
                return (
                  <div
                    key={pillar.id}
                    className="rounded-xl overflow-hidden shadow-sm border border-slate-200/80 bg-[#f6faf7]"
                  >
                    <button
                      type="button"
                      onClick={() => togglePillar(pillar.id)}
                      aria-expanded={isOpen}
                      className="relative w-full overflow-hidden px-6 py-4 sm:py-5 text-white font-semibold text-sm sm:text-base lg:text-lg transition-all duration-300 cursor-pointer flex items-center justify-center group"
                    >
                      <img
                        src={content.highlightsBgImage}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                      <span className="relative z-10 text-center px-6">{pillar.barLabel}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-white/80 group-hover:text-white transition-transform duration-300 absolute right-5 z-10 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Smooth Accordion Body */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="px-6 py-6 sm:px-8 sm:py-7 space-y-4 bg-white border-t border-slate-200/70">
                          <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                            {pillar.description}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                            {pillar.metrics.map((metric, metricIdx) => (
                              <div
                                key={`${pillar.id}-m-${metricIdx}`}
                                className="flex items-center gap-2 rounded-lg bg-[#f4f8f5] border border-emerald-200/60 px-3.5 py-2.5 text-xs sm:text-[13px] font-semibold text-[#285143]"
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span>{metric}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
          </>
        )}
      </main>

      <Footer />

      {content && (
        <SustainabilityDetailModal
          practice={selectedPractice}
          practices={content.practices}
          backgroundImage={content.hero.image}
          onSelectPractice={setSelectedPractice}
          onClose={() => setSelectedPractice(null)}
        />
      )}
    </div>
  );
}
