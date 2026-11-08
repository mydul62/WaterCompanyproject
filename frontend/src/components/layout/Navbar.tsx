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
  Wrench,
  HelpCircle,
  FileText,
  Sparkles,
  Award,
  Users,
  Newspaper,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { api } from "@/lib/api";

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
  const [siteLogo, setSiteLogo] = useState<string>("/cropped/xclusive-logo.png");

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

    // Live settings
    api.settings
      .getMap()
      .then((res) => {
        if (res?.data && res.data["logo_dark"]) {
          setSiteLogo(res.data["logo_dark"]);
        }
      })
      .catch(() => { });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navItems: NavItem[] = [
    {
      label: "Home",
      href: "/",
    },
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
          href: "/rnd",
          desc: "In-house precision CNC molds & barrier polymers",
          icon: FlaskConical,
          iconColor: "text-cyan-600",
          iconBg: "bg-cyan-50 border-cyan-100",
        },
        {
          label: "Tool Room",
          href: "/tool-room",
          desc: "Precision CNC tooling, EDM molds & tool engineering",
          icon: Wrench,
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
      href: "/faqs",
      sub: [
        {
          label: "FAQs",
          href: "/faqs",
          desc: "Answers regarding MOQs, custom tooling & delivery",
          icon: HelpCircle,
          iconColor: "text-indigo-600",
          iconBg: "bg-indigo-50 border-indigo-100",
        },
        {
          label: "Case Studies",
          href: "/case-studies",
          desc: "How we scaled packaging for pharma & paints",
          icon: FileText,
          iconColor: "text-cyan-600",
          iconBg: "bg-cyan-50 border-cyan-100",
        },
        {
          label: "Blog & Insights",
          href: "/blog",
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
          className={`transition-all duration-300 ease-in-out ${isPastHero
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
            className={`transition-all duration-300 ${isPastHero
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
                    src={siteLogo}
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
                      (item.href === "/media" &&
                        (pathname === "/media" || pathname.startsWith("/media/"))) ||
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
                            className={`flex items-center justify-center transition-all duration-200 uppercase font-extrabold text-[14px] tracking-wide whitespace-nowrap select-none px-1.5 xl:px-2.5 py-1 rounded-lg ${isActive
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
                            OPTION 1: Ultra-Sleek Liquid Glass Dropdown (Glassmorphism)
                           ══════════════════════════════════════════════════════════════ */}
                        {item.sub && activeHover === item.label && (
                          <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            {/* Triangular Glass Pointer Notch with Sheen */}
                            <div
                              className="w-3.5 h-3.5 rotate-45 absolute top-1 left-1/2 -translate-x-1/2 z-10 border-t border-l border-white/90 shadow-xs"
                              style={{
                                backgroundColor: "rgba(255, 255, 255, 0.65)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                              }}
                            />

                            <div
                              className="w-[330px] sm:w-[350px] rounded-2xl p-2 relative z-20 overflow-hidden border border-white/75 shadow-[0_24px_50px_rgba(15,23,42,0.14),inset_0_1px_1px_rgba(255,255,255,0.95)]"
                              style={{
                                backgroundColor: "rgba(255, 255, 255, 0.62)",
                                backdropFilter: "blur(24px) saturate(180%)",
                                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                              }}
                            >
                              {/* Top Glass Refraction Sheen */}
                              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

                              {/* Submenu Top Header Bar */}
                              <div className="px-3 pt-2 pb-1.5 flex items-center justify-between border-b border-black/[0.06] mb-1 relative z-10">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                  {item.label}
                                </span>
                                <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider">
                                  Directory
                                </span>
                              </div>

                              {/* Vertical List of Clean Action Cards */}
                              <div className="space-y-0.5 relative z-10">
                                {item.sub.map((s, sIdx) => {
                                  const Icon = s.icon;
                                  return (
                                    <Link
                                      key={sIdx}
                                      href={s.href}
                                      className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/75 hover:shadow-xs transition-all duration-150 cursor-pointer text-left"
                                    >
                                      <div
                                        className={`w-9 h-9 rounded-xl border border-white/90 ${s.iconBg} ${s.iconColor} backdrop-blur-md flex items-center justify-center shrink-0 group-hover/item:scale-105 group-hover/item:shadow-xs transition-all`}
                                      >
                                        <Icon className="w-4 h-4" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                          <h4 className="text-[13px] font-extrabold text-slate-900 group-hover/item:text-[#0284c7] transition-colors leading-snug">
                                            {s.label}
                                          </h4>
                                          <ArrowRight className="w-3.5 h-3.5 text-[#0284c7] opacity-0 -translate-x-1.5 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150 shrink-0" />
                                        </div>
                                        <p className="text-[11px] text-slate-600 font-medium leading-tight line-clamp-1 mt-0.5">
                                          {s.desc}
                                        </p>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>

                              {/* Minimal Bottom Action Footer */}
                              <div className="mt-1.5 pt-1.5 border-t border-black/[0.06] px-2 pb-0.5 relative z-10">
                                <Link
                                  href={item.href}
                                  className="flex items-center justify-between py-1 px-2 rounded-lg text-[11px] font-bold text-slate-600 hover:text-[#0284c7] hover:bg-white/70 transition-colors"
                                >
                                  <span>Explore all {item.label}</span>
                                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-[#0284c7]" />
                                </Link>
                              </div>
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
            src={siteLogo}
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
