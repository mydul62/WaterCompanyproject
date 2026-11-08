"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Sustainability & PCR" | "Tooling Engineering" | "Industry Standards" | "Company News";
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  coverImage: string;
  featured?: boolean;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
      bullets?: string[];
    }[];
    quote?: string;
    conclusion: string;
  };
  tags: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    slug: "post-consumer-resins-future",
    title: "The Future of Post-Consumer Resins (PCR) in Rigid FMCG Packaging: Balancing Tensile Strength and Circular Goals",
    excerpt:
      "How advanced polymer compounding and finite element stress analysis allow enterprise brand owners to integrate 30%–50% recycled resins without compromising drop-impact durability.",
    category: "Sustainability & PCR",
    featured: true,
    author: {
      name: "Engr. Tanvir Ahmed",
      role: "Lead Materials Scientist & Polymer R&D",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    date: "November 4, 2026",
    readTime: "7 min read",
    coverImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80",
    tags: ["PCR Resins", "Circular Economy", "Tensile Strength", "LEED Platinum"],
    content: {
      intro:
        "As global brand owners face mounting statutory pressures to curb virgin plastic consumption, Post-Consumer Recycled (PCR) polymers have moved from a corporate CSR talking point to an urgent operational requirement. However, integrating recycled resins into high-speed blow molding lines introduces complex technical hurdles: inconsistent melt flow index (MFI), degraded molecular chains, and reduced environmental stress crack resistance (ESCR).",
      sections: [
        {
          heading: "The Microscopic Reality of Recycled Polyolefins",
          body: "Unlike virgin resins with uniform molecular weight distributions, post-consumer flakes typically contain varying thermal histories. When processed under conventional thermal profiles, these irregularities can cause uneven wall cooling, microscopic voiding, and micro-fractures under top-load compressive stress.",
          bullets: [
            "Melt Flow Index (MFI) variance across heterogeneous resin batches.",
            "Lower impact resistance at cold warehouse storage temperatures (-5°C to 10°C).",
            "Potential sensory and odor migration in food-contact applications.",
          ],
        },
        {
          heading: "Engineering Solutions: Multi-Layer Barrier Co-Extrusion",
          body: "At Xclusive Can Limited, our R&D laboratory overcomes these hurdles through co-extrusion technology. We encapsulate the PCR core between virgin polymer barrier skins. The outer virgin layers preserve pristine aesthetic gloss and chemical seal, while the inner 40% core utilizes certified post-consumer resin.",
          bullets: [
            "Triple-layer ABA parison co-extrusion technology.",
            "Reinforced structural micro-ribbing on bottle shoulder geometries.",
            "100% compliance with FDA and EU food-contact migration thresholds.",
          ],
        },
      ],
      quote:
        "True sustainability is not about sacrificing package performance; it is about engineering intelligent polymer structures that perform flawlessly across their entire lifecycle.",
      conclusion:
        "By pairing predictive Finite Element Analysis (FEA) with high-purity recycled feedstock compounding, Xclusive Can enables partners like Unilever and Berger to meet circular packaging milestones ahead of statutory schedules.",
    },
  },
  {
    id: "post-2",
    slug: "conformal-cooling-cnc-molds",
    title: "Why Conformal Cooling Channels in CNC Molds Reduce Plastic Injection Cycle Times by 28%",
    excerpt:
      "A deep dive into advanced Tool Room thermal management: how curved internal waterways eliminate hotspots and warp distortion in high-cavity molds.",
    category: "Tooling Engineering",
    author: {
      name: "Md. Rafiqul Islam",
      role: "Head of Tool Room & CNC Machining",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    date: "October 28, 2026",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1600&q=80",
    tags: ["CNC Tooling", "Conformal Cooling", "Cycle Time", "Moldflow"],
    content: {
      intro:
        "In high-volume plastic injection molding, cooling time accounts for over 65% of the total cycle duration. Traditional straight-drilled cooling lines cannot follow the complex contoured geometries of modern packaging cores, creating uneven thermal gradients and cycle bottlenecks.",
      sections: [
        {
          heading: "The Physics of Thermal Dissipation in Mold Cores",
          body: "When molten polypropylene at 230°C enters a multi-cavity mold, heat must be evacuated uniformly. Straight gun-drilled channels leave deep core corners under-cooled, leading to differential shrinkage, thermal sink marks, and post-demolding part warpage.",
        },
        {
          heading: "Conformal Waterways via 5-Axis Milling & Micro-EDM",
          body: "Our in-house Tool Room designs curved conformal cooling circuits that follow the exact equidistant contours of the bottle cavity. Operating under 6-bar turbulent flow, these circuits extract calories at nearly double the rate of conventional mold bases.",
          bullets: [
            "28% average reduction in cycle duration (from 14.2s down to 10.2s).",
            "Elimination of differential shrinkage on threaded bottle closures.",
            "Extended mold tooling lifespan due to reduced thermal fatigue cycles.",
          ],
        },
      ],
      conclusion:
        "Investing in precision tooling architecture yields exponential energy savings and throughput multipliers for enterprise packaging clients over multi-million production runs.",
    },
  },
  {
    id: "post-3",
    slug: "un-certified-hazmat-tin-packaging",
    title: "Understanding UN-Certified Hazmat Packaging: Drop Tests, Hydraulic Pressure & Chemical Seams",
    excerpt:
      "A comprehensive guide to regulatory testing requirements for industrial metal drums transporting solvent-borne paints and hazardous agrochemicals.",
    category: "Industry Standards",
    author: {
      name: "Dr. K. M. Hossain",
      role: "Director of Quality Assurance & Compliance",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    date: "October 16, 2026",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80",
    tags: ["UN Hazmat", "Chemical Drums", "Hydraulic Pressure", "Drop Testing"],
    content: {
      intro:
        "Transporting volatile chemicals, solvents, and agrochemical concentrates demands uncompromising containment. Under United Nations hazardous materials regulations, packaging must withstand extreme physical drops, internal hydrostatic pressure, and stacking loads without catastrophic rupture.",
      sections: [
        {
          heading: "Key Tests Mandated by UN Packaging Codes",
          body: "To receive official UN certification (e.g., 1A1/Y1.8/250), steel drums undergo rigorous multi-stage laboratory validation:",
          bullets: [
            "1.8-meter diagonal drop test onto hardened steel plate at -18°C.",
            "250 kPa hydraulic internal pressure test held continuously for 30 minutes.",
            "3-meter vertical stacking test under 40°C thermal conditions for 28 days.",
            "Leakproof vacuum immersion test validating seam airtightness.",
          ],
        },
        {
          heading: "Electrical Resistance Seam Welding vs Traditional Soldering",
          body: "Xclusive Can utilizes European automated continuous wire electrical resistance welding. By delivering continuous forged metal fusion along the container cylinder, our seams achieve 100% molecular bond strength with zero solder embrittlement.",
        },
      ],
      conclusion:
        "Ensuring complete regulatory compliance protects both the environment and corporate liability across hazardous logistics chains.",
    },
  },
  {
    id: "post-4",
    slug: "leed-platinum-manufacturing-standards",
    title: "LEED Platinum Green Manufacturing: Redefining Bangladesh's Industrial Packaging Landscape",
    excerpt:
      "How rooftop solar arrays, zero-liquid discharge effluent plants, and natural ventilation systems create a carbon-conscious packaging campus in Gazipur.",
    category: "Sustainability & PCR",
    author: {
      name: "Nusrat Jahan",
      role: "Sustainability & ESG Compliance Director",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    },
    date: "October 02, 2026",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
    tags: ["LEED Platinum", "Green Campus", "Zero Waste", "Solar Energy"],
    content: {
      intro:
        "Industrial packaging production is traditionally energy-intensive. Xclusive Can's Gazipur facility was engineered from the foundation to achieve the United States Green Building Council's (USGBC) highest honor: LEED Platinum Certification.",
      sections: [
        {
          heading: "Pillars of Our LEED Platinum Campus",
          body: "Our green manufacturing framework combines cutting-edge architecture with sustainable resource stewardship:",
          bullets: [
            "1.2 MW rooftop solar photovoltaic micro-grid supplying clean factory power.",
            "Zero Liquid Discharge (ZLD) effluent treatment plant recycling 100% of process water.",
            "Daylight harvesting architecture reducing artificial lighting energy consumption by 45%.",
            "Zero landfill waste policy with closed-loop steel and polymer regrind recycling.",
          ],
        },
      ],
      conclusion:
        "Partnering with a LEED Platinum packaging manufacturer directly reduces Scope 3 supply chain carbon emissions for multinational enterprise brands.",
    },
  },
  {
    id: "post-5",
    slug: "aerosol-can-metallurgy-pressure-domes",
    title: "The Metallurgy of Aerosol Cans: Tinplate Hardness, Seam Temperatures & Internal Lacquers",
    excerpt:
      "Technical analysis of high-pressure aerosol container engineering: selecting optimal temper classifications and compound seaming flanges for volatile gases.",
    category: "Industry Standards",
    author: {
      name: "Engr. Tanvir Ahmed",
      role: "Lead Materials Scientist & Polymer R&D",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    date: "September 18, 2026",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1581091870621-1e9b2512f718?auto=format&fit=crop&w=1600&q=80",
    tags: ["Aerosol Cans", "Tinplate", "Pressure Domes", "Barrier Lacquer"],
    content: {
      intro:
        "Aerosol cans operate under continuous internal pressures exceeding 8 to 12 bar at elevated ambient temperatures. Engineered safety begins at the atomic level with precision selection of tinplate temper classifications.",
      sections: [
        {
          heading: "Temper Selection: TH580 vs TH620",
          body: "The can body requires ductile continuous rollability, whereas the top dome and bottom concave dish demand high-temper steel capable of resisting outward buckling force.",
          bullets: [
            "Continuous automated weld monitoring preventing micro-void porosity.",
            "Food-contact organosol barrier lacquers preventing aerosol propellant corrosion.",
            "Heated water-bath testing validating 100% leak-free integrity before packing.",
          ],
        },
      ],
      conclusion:
        "Rigorous metallurgical control ensures consumer peace of mind across millions of aerosol units.",
    },
  },
  {
    id: "post-6",
    slug: "cleanroom-automation-robotics",
    title: "Automation in Class 100k Cleanrooms: Minimizing Particulate Contamination with Robotic Cells",
    excerpt:
      "How robotic pick-and-place arms and automated inline vision systems ensure zero-particulate pharmaceutical and food packaging safety.",
    category: "Company News",
    author: {
      name: "Md. Rafiqul Islam",
      role: "Head of Tool Room & CNC Machining",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    date: "September 05, 2026",
    readTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1600&q=80",
    tags: ["Automation", "Cleanroom", "Robotics", "Pharma Packaging"],
    content: {
      intro:
        "In pharmaceutical primary packaging, the single greatest source of particulate and microbial contamination is human intervention. Our automated cleanroom lines eliminate human contact from resin melting to final box sealing.",
      sections: [
        {
          heading: "High-Speed Robotic Demolding & Sealing",
          body: "Within our positive-pressure ISO Class 8 cleanrooms, articulated robotic pick-and-place arms remove newly molded dropper bottles directly from the core pins, transferring them inside sealed laminar flow tunnels to automated visual inspection cameras.",
        },
      ],
      conclusion:
        "Automation guarantees consistent sterility, eliminates microbiological hazards, and enables 24/7 high-speed production reliability.",
    },
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Filtered Blog Posts
  const filteredPosts = useMemo(() => {
    if (activeCategory === "ALL") return BLOG_POSTS;
    return BLOG_POSTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  return (
    <div className="min-h-screen bg-[#f4f8fb] text-[#0a1f33] font-sans antialiased selection:bg-[#0b6e99] selection:text-white">
      <Navbar />

      <main className="relative w-full">
        {/* ============================================================ */}
        {/* 1. HERO SECTION: FULL-HEIGHT ARCHITECTURE (100VH)             */}
        {/* ============================================================ */}
        <section
          id="blog-hero"
          className="sticky top-0 z-0 w-full h-screen min-h-[640px] sm:min-h-[720px] lg:min-h-[800px] bg-[#0a1f33] overflow-hidden flex flex-col justify-between items-center select-none"
        >
          {/* Background Hero Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1920&q=80"
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
              Circular Polymers &bull; High-Speed Tin Welding &bull; LEED Platinum Standards
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
          className="relative z-10 bg-[#f4f8fb] rounded-t-[32px] sm:rounded-t-[48px] shadow-[0_-25px_60px_rgba(0,0,0,0.22)] border-t border-white/60"
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
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. CATEGORY FILTER & ARTICLES GRID                           */}
        {/* ============================================================ */}
        <section className="bg-[#f4f8fb] pb-16 sm:pb-20 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Tabs */}
            <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-10">
              {[
                { id: "ALL", label: "All Insights", count: BLOG_POSTS.length },
                { id: "Sustainability & PCR", label: "Sustainability & PCR", count: 2 },
                { id: "Tooling Engineering", label: "Tooling Engineering", count: 1 },
                { id: "Industry Standards", label: "Industry Standards", count: 2 },
                { id: "Company News", label: "Company News & Tech", count: 1 },
              ].map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm ${
                      isActive
                        ? "bg-[#0b6e99] text-white shadow-md shadow-[#0b6e99]/25 scale-102"
                        : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
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
              {filteredPosts.map((post) => (
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
              ))}
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
                  className="px-5 py-2.5 rounded-xl bg-[#0b6e99] hover:bg-[#09577a] text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-[#0b6e99]/20"
                >
                  Connect with R&amp;D Team
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-100 transition-colors"
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

