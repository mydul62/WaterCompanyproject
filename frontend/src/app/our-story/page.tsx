"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowUp, History, Sparkles } from "lucide-react";

interface Milestone {
  year: string;
  line1: string;
  line2: string;
  image: string;
  alt: string;
  description: string;
}

const MILESTONES: Milestone[] = [
  {
    year: "1992",
    line1: "Humble",
    line2: "Beginning.",
    image: "/images/story-1992-factory.jpg",
    alt: "Xclusive Can Limited Factory Entrance in Chittagong, 1992",
    description:
      "The company commenced its journey back in 1992 in a very limited scope with scarce resources. Its stride was initiated from the port city of Chittagong.",
  },
  {
    year: "1993",
    line1: "Early",
    line2: "Struggles.",
    image: "/images/story-1993-can.jpg",
    alt: "Handcrafted Small Tin Paint Containers on Wooden Bench, 1993",
    description:
      "At the beginning, the name was different, primary focus was small Tin Containers for paint industry in the port city of Chittagong.",
  },
  {
    year: "2000",
    line1: "Industrial",
    line2: "Expansion.",
    image: "/cropped/product-card-1.png",
    alt: "Industrial metal container production line",
    description:
      "Expanding our manufacturing footprint to meet surging domestic industrial demand, introducing heavy-duty aerosol cylinders and solvent cans.",
  },
  {
    year: "2007",
    line1: "High-Speed",
    line2: "Automation.",
    image: "/cropped/harbor-supply.png",
    alt: "Port Logistics and Container Shipping Operations",
    description:
      "Transitioned to semi-automated European tooling and high-speed assembly lines, drastically increasing precision, hermetic sealing, and output.",
  },
  {
    year: "2009",
    line1: "Entry Into",
    line2: "Polymers.",
    image: "/cropped/product-card-2.png",
    alt: "Precision Engineered Plastic Jerry Cans and Containers",
    description:
      "Inception of Q Pail Limited, branching into custom-engineered plastic blow molding, injection pails, and hermetically sealed food containers.",
  },
  {
    year: "2010",
    line1: "Flagship",
    line2: "Cleanroom Plant.",
    image: "/cropped/factory-building.png",
    alt: "Xclusive Can Limited Majukhan Gazipur LEED Platinum Campus",
    description:
      "Inauguration of the state-of-the-art Gazipur & Tongi industrial campuses, featuring Class 100,000 sterile cleanrooms for pharmaceutical packaging.",
  },
  {
    year: "2014",
    line1: "Global",
    line2: "Accreditations.",
    image: "/cropped/certificates-exact.png",
    alt: "ISO 22000, HACCP, GMP and DGDA Quality Certifications",
    description:
      "Achieved full compliance with ISO 22000, HACCP, and GMP standards, establishing trusted long-term partnerships with Fortune 500 pharmaceutical brands.",
  },
  {
    year: "2017",
    line1: "In-House Mold",
    line2: "& Tooling R&D.",
    image: "/images/business-plant-1.jpg",
    alt: "3D CAD Modeling and Precision CNC Mold Tooling Center",
    description:
      "Established a dedicated 3D CAD design and CNC tooling facility, reducing concept-to-prototype lead times from months to mere days.",
  },
  {
    year: "2019",
    line1: "Green Campus",
    line2: "& Zero-Carbon.",
    image: "/images/business-plant-2.jpg",
    alt: "LEED Platinum Vertical Green Living Garden Building Facade",
    description:
      "Pioneered the LEED Platinum sustainable factory initiative, integrating rooftop solar arrays, rainwater collection, and zero-landfill waste management.",
  },
  {
    year: "2020",
    line1: "Critical Supply",
    line2: "Resilience.",
    image: "/cropped/news-card-1.png",
    alt: "24/7 Essential Supply Chain Manufacturing Operations",
    description:
      "Maintained 24/7 non-stop manufacturing during global supply shocks, supplying essential sanitizer, pharmaceutical, and disinfectant packaging across the nation.",
  },
  {
    year: "2023",
    line1: "Cross-Border",
    line2: "Global Exports.",
    image: "/images/business-hero-office.jpg",
    alt: "Corporate Engineering and Global Export Logistics Hub",
    description:
      "Surpassed 50 million monthly units capacity, exporting specialized tin and plastic containers to regional hubs across Asia, the Middle East, and Africa.",
  },
  {
    year: "2025",
    line1: "Circular",
    line2: "Future.",
    image: "/cropped/product-card-3.png",
    alt: "Post-Consumer Recycled Resins and Circular Packaging Innovation",
    description:
      "Deploying 100% recyclable post-consumer circular resins (PCR) and next-generation biodegradable closures to lead the zero-waste industrial packaging revolution.",
  },
];

export default function OurStoryPage() {
  const [activeYear, setActiveYear] = useState<string>("1992");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [isTimelineVisible, setIsTimelineVisible] = useState<boolean>(false);
  const milestoneRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowScrollTop(scrollY > 400);

      // Show left timeline navigator only once scrolled past the hero
      const heroThreshold = window.innerHeight * 0.45;
      setIsTimelineVisible(scrollY >= heroThreshold);

      // Detect active milestone among the sticky stacking cards:
      // A card is active when its top is docked near top (<= 100px)
      // and the next card hasn't reached the top yet (> 100px)
      for (let i = 0; i < MILESTONES.length; i++) {
        const item = MILESTONES[i];
        const el = milestoneRefs.current[item.year];
        const nextItem = i < MILESTONES.length - 1 ? MILESTONES[i + 1] : null;
        const nextEl = nextItem ? milestoneRefs.current[nextItem.year] : null;

        if (el) {
          const rect = el.getBoundingClientRect();
          const nextRect = nextEl ? nextEl.getBoundingClientRect() : null;

          if (rect.top <= 100 && (!nextRect || nextRect.top > 100)) {
            setActiveYear(item.year);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToYear = (year: string) => {
    setActiveYear(year);
    const el = milestoneRefs.current[year];
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ded7cd]">
      {/* Floating Header Bar */}
      <Navbar />

      {/* ══════════════════════════════════════════════════════════════
          PERSISTENT LEFT TIMELINE NAVIGATOR (Sticky over all Stacking Cards)
         ══════════════════════════════════════════════════════════════ */}
      <aside
        className={`fixed left-4 sm:left-8 lg:left-14 top-1/2 -translate-y-1/2 z-50 select-none transition-all duration-500 ${
          isTimelineVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Timeline Year Navigation"
      >
        <ul className="flex flex-col space-y-3 sm:space-y-4 list-none">
          {MILESTONES.map((item) => {
            const isActive = activeYear === item.year;
            return (
              <li key={item.year}>
                <button
                  onClick={() => scrollToYear(item.year)}
                  className={`block text-left transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "text-slate-900 font-black text-lg sm:text-xl scale-110 translate-x-1.5 drop-shadow-sm"
                      : "text-slate-500/70 hover:text-slate-900 font-medium text-xs sm:text-sm"
                  }`}
                  aria-label={`Jump to year ${item.year}`}
                >
                  <span>{item.year}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <main className="flex-1 relative">
        {/* ============================================================ */}
        {/* HERO SECTION: FULL-HEIGHT ARCHITECTURE (100VH)             */}
        {/* ============================================================ */}
        <section
          id="hero"
          className="relative lg:sticky lg:top-0 z-0 w-full min-h-[540px] sm:min-h-[640px] lg:h-screen lg:min-h-[820px] bg-[#0a1f33] overflow-hidden flex flex-col justify-between items-center select-none"
        >
          {/* Authentic Dual Factory Buildings Background (Q Pail & XCL at Sunset) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/story-hero-buildings.jpg"
              alt="Xclusive Can & Q Pail Manufacturing Campuses at Sunset - Since 1992"
              fill
              className="object-cover object-center opacity-85 scale-102 transition-transform duration-1000 ease-out"
              priority
            />
            {/* Multi-layer Gradient Vignettes */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f33] via-black/45 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/55" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,31,51,0.6)_100%)]" />
          </div>

          {/* Top Spacer for Navbar */}
          <div className="h-28 sm:h-36 shrink-0" />

          {/* Centered Typography */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-bold shadow-xl shadow-black/20">
              <History className="w-4 h-4 text-[#38bdf8] animate-pulse" />
              <span>About Us &bull; Corporate Heritage &bull; Since 1992</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-[0.2em] sm:tracking-[0.25em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] uppercase pl-[0.2em]">
              Our Story
            </h1>

            <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] font-bold text-[#38bdf8] drop-shadow-lg pl-[0.3em] max-w-2xl mx-auto">
              Three Decades of Precision Packaging Excellence &bull; 1992 &ndash; 2026
            </p>
          </div>

          {/* Animated Scroll Down Indicator */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("milestone-1992");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="relative z-10 pb-8 sm:pb-12 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="text-[11px] uppercase tracking-widest font-semibold group-hover:tracking-[0.25em] transition-all">
              Explore Timeline &amp; Milestones
            </span>
            <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5 backdrop-blur-sm group-hover:border-[#38bdf8] transition-colors">
              <div className="w-1.5 h-3 rounded-full bg-[#38bdf8] animate-bounce" />
            </div>
          </button>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            STACKING CURTAIN DECK: Each year rises & stacks over the previous
           ══════════════════════════════════════════════════════════════ */}
        {MILESTONES.map((item, idx) => {
          return (
            <section
              key={item.year}
              id={`milestone-${item.year}`}
              ref={(el) => {
                milestoneRefs.current[item.year] = el;
              }}
              style={{ zIndex: 10 + idx }}
              className="relative lg:sticky lg:top-0 w-full min-h-[600px] lg:min-h-screen flex items-center bg-[#ded7cd] rounded-t-[28px] sm:rounded-t-[36px] lg:rounded-t-[48px] shadow-sm lg:shadow-[0_-25px_60px_rgba(0,0,0,0.22)] border-t border-black/8 overflow-hidden select-none transition-shadow"
            >
              <div className="w-[91.6667%] max-w-[1720px] mx-auto px-4 sm:px-8 py-16 sm:py-24 flex items-center min-h-screen pl-14 sm:pl-24 lg:pl-32">
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  {/* Left Column: Title (2 Lines) & Big Year (5 cols) */}
                  <div className="lg:col-span-5 space-y-2 sm:space-y-4">
                    <h2 className="text-4xl sm:text-5xl lg:text-[62px] xl:text-[72px] font-black text-slate-900 tracking-tight leading-[1.04]">
                      <span className="block">{item.line1}</span>
                      <span className="block">{item.line2}</span>
                    </h2>

                    <div className="text-6xl sm:text-7xl lg:text-8xl xl:text-[104px] font-black text-slate-900 tracking-tighter leading-none pt-2 sm:pt-4">
                      {item.year}
                    </div>
                  </div>

                  {/* Right Column: Rounded Photo & Caption (7 cols) */}
                  <div className="lg:col-span-7 space-y-5">
                    {/* Vintage / Historic Photo Frame */}
                    <div className="water-fill-card relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-black/10 bg-slate-200 group cursor-pointer">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    </div>

                    {/* Editorial Description below photo */}
                    <p className="text-slate-800 text-base sm:text-lg lg:text-[19px] leading-relaxed font-normal max-w-2xl pt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </main>

      {/* ══════════════════════════════════════════════════════════════
          FLOATING CIRCULAR SCROLL-TO-TOP BUTTON (Exact Screenshot 3)
         ══════════════════════════════════════════════════════════════ */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-8 right-8 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/85 hover:bg-white text-slate-800 shadow-xl border border-black/10 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
        >
          {/* Circular Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="21"
              stroke="#cbd5e1"
              strokeWidth="2.5"
              fill="transparent"
            />
            <circle
              cx="24"
              cy="24"
              r="21"
              stroke="#0284c7"
              strokeWidth="2.5"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 21}
              strokeDashoffset={2 * Math.PI * 21 * (1 - scrollProgress / 100)}
              strokeLinecap="round"
              className="transition-all duration-150"
            />
          </svg>
          <ArrowUp className="w-5 h-5 text-slate-800 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Global Footer */}
      <div className="relative z-40 bg-[#ded7cd]">
        <Footer />
      </div>
    </div>
  );
}
