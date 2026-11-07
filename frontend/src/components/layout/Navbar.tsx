"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Building2,
  BookOpen,
  ShieldCheck,
  Briefcase,
  Leaf,
  FlaskConical,
  Factory,
  HelpCircle,
  FileText,
  Sparkles,
  Award,
  Users,
  Newspaper,
  ArrowRight,
} from "lucide-react";

interface SubMenuItem {
  label: string;
  href: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
}

interface NavItem {
  label: string;
  href: string;
  sub?: SubMenuItem[];
  spotlight?: {
    image: string;
    title: string;
    subtitle: string;
    badge: string;
    href: string;
  };
}

export default function Navbar() {
  const pathname = usePathname();
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsPastHero(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navItems: NavItem[] = [
    {
      label: "About Us",
      href: "/#about",
      sub: [
        {
          label: "Our Business",
          href: "/our-business",
          desc: "2 specialized packaging plants: Q Pail & Xclusive Can",
          icon: Building2,
          iconColor: "text-blue-600",
          iconBg: "bg-blue-50 border-blue-100",
        },
        {
          label: "Our Story",
          href: "/our-story",
          desc: "Pioneering engineered containers since 1992",
          icon: BookOpen,
          iconColor: "text-amber-600",
          iconBg: "bg-amber-50 border-amber-100",
        },
        {
          label: "Brand & Quality",
          href: "/#overview",
          desc: "DGDA compliant, USGBC LEED Platinum audited",
          icon: ShieldCheck,
          iconColor: "text-emerald-600",
          iconBg: "bg-emerald-50 border-emerald-100",
        },
        {
          label: "Career",
          href: "/careers",
          desc: "Join our automated cleanroom engineering team",
          icon: Briefcase,
          iconColor: "text-purple-600",
          iconBg: "bg-purple-50 border-purple-100",
        },
      ],
      spotlight: {
        image: "/cropped/factory-bg-clean.png",
        title: "Tongi & Kaligonj Plant",
        subtitle: "50M+ Monthly Units Capacity with Class 100k Cleanrooms",
        badge: "LEED Platinum Campus",
        href: "/#about",
      },
    },
    {
      label: "Sustainability",
      href: "/#overview",
      sub: [
        {
          label: "Zero-Carbon Campus",
          href: "/#overview",
          desc: "USGBC certified zero-carbon & solar powered",
          icon: Leaf,
          iconColor: "text-emerald-600",
          iconBg: "bg-emerald-50 border-emerald-100",
        },
        {
          label: "R & D Lab",
          href: "/#supply-chain",
          desc: "In-house precision CNC molds & barrier polymers",
          icon: FlaskConical,
          iconColor: "text-cyan-600",
          iconBg: "bg-cyan-50 border-cyan-100",
        },
        {
          label: "Plant Facility",
          href: "/#about",
          desc: "Class 100k automated sterile production lines",
          icon: Factory,
          iconColor: "text-blue-600",
          iconBg: "bg-blue-50 border-blue-100",
        },
      ],
      spotlight: {
        image: "/cropped/harbor-supply.png",
        title: "100% Green Operations",
        subtitle: "Zero landfill waste & 100% recyclable food-grade polymers",
        badge: "USGBC Verified",
        href: "/#overview",
      },
    },
    {
      label: "Find Our Product",
      href: "/products",
    },
    {
      label: "Knowledge Hub",
      href: "/#explore",
      sub: [
        {
          label: "FAQs",
          href: "/#footer",
          desc: "Answers regarding MOQs, custom tooling & delivery",
          icon: HelpCircle,
          iconColor: "text-indigo-600",
          iconBg: "bg-indigo-50 border-indigo-100",
        },
        {
          label: "Case Studies",
          href: "/#explore",
          desc: "How we scaled packaging for pharma & paints",
          icon: FileText,
          iconColor: "text-cyan-600",
          iconBg: "bg-cyan-50 border-cyan-100",
        },
        {
          label: "Blog & Insights",
          href: "/#media",
          desc: "Trends in biodegradable polymers and can welding",
          icon: Sparkles,
          iconColor: "text-amber-600",
          iconBg: "bg-amber-50 border-amber-100",
        },
      ],
      spotlight: {
        image: "/cropped/category-icons-exact.png",
        title: "Technical Knowledge",
        subtitle: "Engineering whitepapers, drop test standards & material guides",
        badge: "Free Resource",
        href: "/#explore",
      },
    },
    {
      label: "Achievements",
      href: "/certificates",
      sub: [
        {
          label: "Awards & Certificates",
          href: "/certificates",
          desc: "ISO 9001, HACCP, GMP & DGDA compliance",
          icon: Award,
          iconColor: "text-amber-600",
          iconBg: "bg-amber-50 border-amber-100",
        },
        {
          label: "Brands We Work With",
          href: "/brands-we-work-with",
          desc: "Radiant Pharma, Asian Paints, Samuda & more",
          icon: Users,
          iconColor: "text-blue-600",
          iconBg: "bg-blue-50 border-blue-100",
        },
      ],
      spotlight: {
        image: "/cropped/triangle-icons.png",
        title: "National Industrial Trust",
        subtitle: "Partner of choice for Fortune 500 pharmaceutical and chemical conglomerates",
        badge: "Certified Excellence",
        href: "/#footer",
      },
    },
    {
      label: "Media and Contacts",
      href: "/media",
      sub: [
        {
          label: "National Press Stories",
          href: "/media",
          desc: "Prothom Alo, Daily Star, Samakal & Bonik Barta",
          icon: Newspaper,
          iconColor: "text-red-600",
          iconBg: "bg-red-50 border-red-100",
        },
        {
          label: "Press Highlights",
          href: "/#media",
          desc: "Curated cuttings, editorial photos & transcripts",
          icon: Sparkles,
          iconColor: "text-cyan-600",
          iconBg: "bg-cyan-50 border-cyan-100",
        },
      ],
      spotlight: {
        image: "/cropped/product-card-1.png",
        title: "Featured in Top Dailies",
        subtitle: "Read the story of industrial transformation in national headlines",
        badge: "Press Archive",
        href: "/media",
      },
    },
  ];

  return (
    <header
      className="fixed w-full z-50 transition-all duration-300 ease-in-out"
      style={isPastHero ? { top: "0px" } : { top: "48px" }}
    >
      {/* ══════════════════════════════════════════════════════════════
          DESKTOP HEADER CONTAINER (Exact Client Source)
          Width 91.6667% (w-11/12) Centered with 0.75rem rounded corners
         ══════════════════════════════════════════════════════════════ */}
      <div
        className="hidden lg:block absolute left-1/2 top-0 transition-all duration-300 ease-in-out"
        style={
          isPastHero
            ? { width: "100%", transform: "translateX(-50%)" }
            : { width: "91.6667%", transform: "translateX(-50%)" }
        }
      >
        <div
          className={`transition-all duration-300 ease-in-out ${
            isPastHero
              ? "bg-white/95 backdrop-blur-xl border-b border-black/8 shadow-sm rounded-none"
              : "bg-white/50 backdrop-blur-md border border-white/60 shadow-[0_12px_35px_rgba(0,0,0,0.08)]"
          }`}
          style={
            !isPastHero
              ? {
                  borderRadius: "0.75rem",
                  backgroundColor: "rgba(255, 255, 255, 0.48)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: "1px solid rgba(255, 255, 255, 0.55)",
                  boxShadow:
                    "0 12px 35px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                }
              : undefined
          }
        >
          <div
            className={`transition-all duration-300 ${
              isPastHero
                ? "w-full max-w-[1920px] mx-auto px-6 xl:px-8 py-4"
                : "px-5 sm:px-6 xl:px-8 py-4.5 xl:py-5"
            }`}
          >
            <div className="flex items-center justify-between gap-4 xl:gap-6">
              {/* Header Logo matching exact aspect-[1.74/1] */}
              <div style={{ opacity: 1, filter: "blur(0px)", transform: "none" }}>
                <Link
                  aria-label="header logo"
                  className="block relative overflow-hidden w-[6.3125rem] xl:w-[7.2rem] aspect-[1.74/1] transition-transform hover:scale-[1.02] select-none shrink-0"
                  href="/"
                >
                  <Image
                    alt="Website header logo"
                    src="/cropped/xclusive-logo.png"
                    fill
                    className="object-contain"
                    priority
                  />
                </Link>
              </div>

              {/* Header Content Navigation List for Larger Devices */}
              <nav aria-label="header content navigation list for larger devices">
                <ul className="flex justify-center items-center gap-2.5 lg:gap-3 xl:gap-5 2xl:gap-8 list-none select-none">
                  {navItems.map((item, idx) => {
                    const isActive =
                      (item.href === "/products" &&
                        (pathname === "/products" || pathname === "/find-our-product")) ||
                      (item.label === "About Us" &&
                        (pathname === "/our-story" || pathname === "/our-business" || pathname === "/careers" || pathname === "/career")) ||
                      (item.label === "Achievements" &&
                        (pathname === "/certificates" || pathname === "/achievements" || pathname === "/brands-we-work-with" || pathname === "/brands")) ||
                      (item.href === "/" && pathname === "/");

                    return (
                      <li
                        key={idx}
                        aria-label={`${item.label} link`}
                        className="relative group cursor-pointer"
                        onMouseEnter={() => item.sub && setActiveHover(item.label)}
                        onMouseLeave={() => setActiveHover(null)}
                      >
                        <div>
                          <Link
                            href={item.href}
                            className={`flex items-center justify-center transition-all duration-200 uppercase font-extrabold text-[14px] tracking-wide whitespace-nowrap select-none px-1.5 xl:px-2.5 py-1 rounded-lg ${
                              isActive
                                ? "text-[#0284c7] font-black bg-cyan-500/10 shadow-[0_0_15px_rgba(0,194,232,0.15)]"
                                : isPastHero
                                ? "text-slate-900 hover:text-[#0284c7] hover:bg-black/5"
                                : "text-slate-900 hover:text-[#0284c7] hover:bg-white/60 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
                            }`}
                          >
                            <span className="block text-nowrap text-start uppercase">
                              {item.label}
                            </span>
                          </Link>
                        </div>

                {/* ══════════════════════════════════════════════════════════════
                    OPTION 3: Stripe / Tesla Style Informative Glass Mega Panel
                   ══════════════════════════════════════════════════════════════ */}
                {item.sub && activeHover === item.label && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-[85%] pt-3 z-50 animate-in fade-in slide-in-from-top-3 duration-250">
                    {/* Triangular Pointer Notch */}
                    <div className="w-4 h-4 bg-white/95 rotate-45 border-t border-l border-white/80 absolute top-1 left-1/2 -translate-x-1/2 z-10 shadow-xs" />

                    <div
                      className="min-w-[640px] max-w-[700px] rounded-3xl p-5 shadow-[0_30px_70px_rgba(0,0,0,0.2)] border border-white/90 grid grid-cols-12 gap-5 items-stretch"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.96)",
                        backdropFilter: "blur(32px)",
                        WebkitBackdropFilter: "blur(32px)",
                      }}
                    >
                      {/* Left Column: Interactive Rich Links (7 cols) */}
                      <div className="col-span-7 space-y-1.5 text-left">
                        <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          {item.label} Overview
                        </div>
                        {item.sub.map((s, sIdx) => {
                          const Icon = s.icon;
                          return (
                            <Link
                              key={sIdx}
                              href={s.href}
                              className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-pointer"
                            >
                              <div className={`p-2.5 rounded-xl border ${s.iconBg} ${s.iconColor} shrink-0 group-hover/item:scale-105 transition-transform`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-sm font-bold text-slate-900 group-hover/item:text-[#1f5f8b] transition-colors">
                                    {s.label}
                                  </h4>
                                  <ArrowRight className="w-3.5 h-3.5 text-[#1f5f8b] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" />
                                </div>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-1 mt-0.5">
                                  {s.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Right Column: Featured Spotlight Visual Card (5 cols) */}
                      {item.spotlight && (
                        <div className="col-span-5 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200/80 p-4 flex flex-col justify-between text-left space-y-3">
                          <div className="space-y-2">
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-100 text-[#1f5f8b] text-[10.5px] font-bold uppercase tracking-wider">
                              {item.spotlight.badge}
                            </span>
                            <div className="relative w-full h-24 rounded-xl overflow-hidden bg-white border border-slate-200/60">
                              <Image
                                src={item.spotlight.image}
                                alt={item.spotlight.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <h5 className="text-xs font-bold text-slate-900 line-clamp-1">
                              {item.spotlight.title}
                            </h5>
                            <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                              {item.spotlight.subtitle}
                            </p>
                          </div>
                          <Link
                            href={item.spotlight.href}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1f5f8b] hover:text-cyan-600 transition-colors pt-1"
                          >
                            <span>Learn More</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  </div>
</div>
</div>

{/* ══════════════════════════════════════════════════════════════
    MOBILE HEADER (Exact Client Source)
   ══════════════════════════════════════════════════════════════ */}
<div className="lg:hidden p-3 sm:p-4 flex items-center justify-between bg-white/20 backdrop-blur-md border-b border-white/20">
  <Link aria-label="header logo" className="block relative overflow-hidden w-[6.3125rem] aspect-[1.74/1]" href="/">
    <Image
      alt="Website header logo"
      src="/cropped/xclusive-logo.png"
      fill
      className="object-contain"
      priority
    />
  </Link>

  <button
    onClick={() => setMobileOpen(!mobileOpen)}
    aria-label="mobile menu sidebar toggle button"
    className="relative block overflow-hidden size-10 bg-slate-900/60 rounded-full backdrop-blur-md group active:scale-[0.9] transition-all duration-300"
  >
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-6 flex items-center justify-center text-white">
      {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
    </div>
  </button>
</div>

      {/* Mobile Menu Glass Dropdown */}
      {mobileOpen && (
        <div
          className="lg:hidden mx-4 sm:mx-8 mt-3 p-6 rounded-2xl text-white shadow-2xl border border-white/20 space-y-3.5 animate-in fade-in duration-200"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.96)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          {navItems.map((item, idx) => (
            <div key={idx} className="border-b border-white/10 pb-2.5">
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-bold uppercase tracking-wider hover:text-cyan-300 py-1"
              >
                {item.label}
              </Link>
              {item.sub && (
                <div className="pl-4 mt-1.5 space-y-1.5 border-l border-white/20">
                  {item.sub.map((s, sIdx) => (
                    <Link
                      key={sIdx}
                      href={s.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-xs text-slate-300 hover:text-cyan-300 py-0.5"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
