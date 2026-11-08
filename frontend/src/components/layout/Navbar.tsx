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
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const [siteLogo, setSiteLogo] = useState<string>("/cropped/xclusive-logo.png");

  // Lock body scroll when mobile off-canvas drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    setExpandedMobile(null);
  }, [pathname]);

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
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
        isPastHero ? "top-0" : "top-0 lg:top-12"
      }`}
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
          MOBILE HEADER BAR (Clean Glass Bar)
         ══════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden px-4 py-3 flex items-center justify-between bg-white/75 backdrop-blur-xl border-b border-white/60 shadow-xs">
        <Link
          aria-label="header logo"
          className="block relative overflow-hidden w-[6.3125rem] aspect-[1.74/1]"
          href="/"
          onClick={() => setMobileOpen(false)}
        >
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
          className="relative size-10 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform cursor-pointer"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MOBILE OFF-CANVAS SLIDE-OVER DRAWER (Smooth Slide-In from Right)
         ══════════════════════════════════════════════════════════════ */}
      {/* Backdrop Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-50 w-[86%] max-w-[380px] h-full bg-[#0a1f33]/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block relative overflow-hidden w-[6rem] aspect-[1.74/1]"
          >
            <Image
              alt="Website logo"
              src={siteLogo}
              fill
              className="object-contain brightness-0 invert"
              priority
            />
          </Link>

          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close mobile menu"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Links with Accordion Submenus */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1.5 divide-y divide-white/5">
          {navItems.map((item, idx) => {
            const hasSub = item.sub && item.sub.length > 0;
            const isExpanded = expandedMobile === item.label;

            return (
              <div key={idx} className="pt-2 first:pt-0">
                {hasSub ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => setExpandedMobile(isExpanded ? null : item.label)}
                      className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white/5 text-left text-white font-bold text-sm tracking-wide transition-colors cursor-pointer group"
                    >
                      <span className="group-hover:text-[#38bdf8] transition-colors">
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-[#38bdf8]" : ""
                        }`}
                      />
                    </button>

                    {/* Accordion Submenu Items */}
                    {isExpanded && (
                      <div className="pl-3 pr-1 py-1.5 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150 border-l border-[#0284c7]/40 ml-3 mt-1">
                        {item.sub!.map((s, sIdx) => {
                          const Icon = s.icon;
                          return (
                            <Link
                              key={sIdx}
                              href={s.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                            >
                              <div
                                className={`w-7 h-7 rounded-md ${s.iconBg} ${s.iconColor} flex items-center justify-center shrink-0`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-white truncate">{s.label}</div>
                                <div className="text-[10.5px] text-slate-400 truncate">{s.desc}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2.5 px-3 rounded-xl hover:bg-white/5 text-white font-bold text-sm tracking-wide hover:text-[#38bdf8] transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-5 border-t border-white/10 bg-white/5 space-y-3">
          <Link
            href="/media"
            onClick={() => setMobileOpen(false)}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] text-white font-bold text-xs uppercase tracking-wider text-center block shadow-lg shadow-[#0284c7]/20 active:scale-95 transition-all"
          >
            Contact &amp; Plant Inquiries
          </Link>
          <div className="text-center text-[10.5px] text-slate-400">
            &copy; {new Date().getFullYear()} Xclusive Can Limited
          </div>
        </div>
      </div>
    </header>
  );
}
