"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteButtonClass } from "@/components/common/SiteButton";
import {
  Phone,
  Clock,
  Mail,
  Search,
  X,
  Menu,
  ChevronDown,
  Building2,
  BookOpen,
  ShieldCheck,
  Briefcase,
  FlaskConical,
  Wrench,
  Package,
  FileText,
  HelpCircle,
  Award,
  Handshake,
  Newspaper,
  ArrowRight,
  Leaf,
  Tv,
} from "lucide-react";
import { api } from "@/lib/api";

interface SubLinkItem {
  label: string;
  href: string;
  description: string;
  icon: React.ReactNode;
}

interface TopNavItem {
  label: string;
  href: string;
  hasPlus?: boolean;
  children?: SubLinkItem[];
}

const NAV_ITEMS: TopNavItem[] = [
  {
    label: "HOME",
    href: "/",
    hasPlus: false,
  },
  {
    label: "SERVICES",
    href: "/our-business",
    hasPlus: true,
    children: [
      {
        label: "Our Business",
        href: "/our-business",
        description: "Noor Plastic Industries: manufacturing, import & supply",
        icon: <Building2 className="w-4 h-4 text-[#094E9B]" />,
      },
      {
        label: "R & D Lab",
        href: "/rnd",
        description: "Precision material testing & polymer innovation",
        icon: <FlaskConical className="w-4 h-4 text-[#094E9B]" />,
      },
      {
        label: "Tool Room",
        href: "/tool-room",
        description: "In-house CNC mold engineering & maintenance",
        icon: <Wrench className="w-4 h-4 text-[#094E9B]" />,
      },
      {
        label: "Request Custom Quote",
        href: "/request-quote",
        description: "Direct MOQ pricing & custom container specs",
        icon: <FileText className="w-4 h-4 text-[#094E9B]" />,
      },
    ],
  },
  {
    label: "PRODUCTS",
    href: "/products",
    hasPlus: true,
    children: [
      {
        label: "All Products Catalog",
        href: "/products",
        description: "Dispenser bottles, pails, caps & industrial cans",
        icon: <Package className="w-4 h-4 text-[#094E9B]" />,
      },
      {
        label: "Request Bulk Quote",
        href: "/request-quote",
        description: "Direct factory MOQ pricing from Noor Plastic Industries",
        icon: <ShieldCheck className="w-4 h-4 text-[#094E9B]" />,
      },
    ],
  },
  {
    label: "BLOG",
    href: "/blog",
    hasPlus: true,
    children: [
      {
        label: "Blog & Insights",
        href: "/blog",
        description: "Industry perspectives, filtration & hydration",
        icon: <Newspaper className="w-4 h-4 text-[#094E9B]" />,
      },
      {
        label: "Case Studies",
        href: "/case-studies",
        description: "Enterprise supply & bottling success stories",
        icon: <BookOpen className="w-4 h-4 text-[#094E9B]" />,
      },
      {
        label: "TV News",
        href: "/tv-news",
        description: "Broadcast coverage & factory YouTube features",
        icon: <Tv className="w-4 h-4 text-[#094E9B]" />,
      },
      {
        label: "FAQs",
        href: "/faqs",
        description: "Delivery schedules, bulk orders & quality",
        icon: <HelpCircle className="w-4 h-4 text-[#094E9B]" />,
      },
    ],
  },
  {
    label: "PAGES",
    href: "/our-story",
    hasPlus: true,
    children: [
      {
        label: "Our Story",
        href: "/our-story",
        description: "Noor Plastic Industries heritage in Kaliakoir, Gazipur",
        icon: <BookOpen className="w-4 h-4 text-[#094E9B]" />,
      },
      {
        label: "Sustainability",
        href: "/sustainability",
        description: "LEED Platinum green factory & eco-responsible manufacturing",
        icon: <Leaf className="w-4 h-4 text-[#094E9B]" />,
      },
      {
        label: "Awards & Certificates",
        href: "/certificates",
        description: "ISO, BSTI & LEED Platinum certifications",
        icon: <Award className="w-4 h-4 text-[#094E9B]" />,
      },
      {
        label: "Brands We Work With",
        href: "/brands-we-work-with",
        description: "Trusted by leading consumer & enterprise partners",
        icon: <Handshake className="w-4 h-4 text-[#094E9B]" />,
      },
      {
        label: "Careers",
        href: "/careers",
        description: "Join our engineering & logistics team",
        icon: <Briefcase className="w-4 h-4 text-[#094E9B]" />,
      },
    ],
  },
  {
    label: "TV NEWS",
    href: "/tv-news",
    hasPlus: false,
  },
  {
    label: "CONTACT",
    href: "/media",
    hasPlus: false,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // CMS Settings with Noor Plastic Industries trade-license defaults
  const [headerInfo, setHeaderInfo] = useState({
    brandName: "Noor Plastic",
    customLogo: "",
    deliveryText: "Immediate Delivery",
    phone: "+880 1711-987275",
    hours: "Sat - Thu: 08.00 to 20.00",
    email: "info@noorplastic.com",
  });

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 28;
      setIsScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    api.settings
      .getMap()
      .then((res) => {
        if (res?.data) {
          const d = res.data;
          setHeaderInfo((prev) => ({
            brandName: d["header_brand_name"] || prev.brandName,
            customLogo: d["header_logo_url"] || "",
            deliveryText: d["header_delivery_text"] || prev.deliveryText,
            phone: d["header_phone"] || prev.phone,
            hours: d["header_hours"] || prev.hours,
            email: d["header_email"] || prev.email,
          }));
        }
      })
      .catch(() => {
        // Fallback smoothly to default header values
      });
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!searchOpen) return;
    const t = setTimeout(() => {
      searchInputRef.current?.focus({ preventScroll: true });
    }, 180);
    return () => clearTimeout(t);
  }, [searchOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleOrderNow = () => {
    setMobileMenuOpen(false);
    if (pathname === "/") {
      window.dispatchEvent(new Event("open-rfq"));
    } else {
      router.push("/request-quote");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    setSearchOpen(false);
    if (q) {
      router.push(`/products?search=${encodeURIComponent(q)}`);
    } else {
      router.push("/products");
    }
  };

  const isNavItemActive = (item: TopNavItem) => {
    if (item.href === "/") return pathname === "/";
    if (pathname.startsWith(item.href)) return true;
    return item.children?.some((c) => c.href !== "/" && pathname.startsWith(c.href)) ?? false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full pointer-events-none transition-transform duration-300 ease-out transform-gpu ${
          isScrolled ? "-translate-y-11" : "translate-y-0"
        }`}
      >
        {/* Tier 1: Slim Dark-Blue Top Utility Bar */}
        <div
          className={`w-full h-11 bg-[#0E489C] text-white transition-opacity duration-200 overflow-hidden ${
            isScrolled
              ? "opacity-0 pointer-events-none"
              : "opacity-100 pointer-events-auto border-b border-white/10"
          }`}
        >
          <div className="w-[98%] max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="px-4 sm:px-7 lg:px-10 h-11 flex items-center justify-between text-[13px] sm:text-[14px] tracking-[0.01em]">
              {/* Left Info Items */}
              <div className="flex items-center gap-4 sm:gap-7">
                <span className="font-semibold text-white whitespace-nowrap">
                  {headerInfo.deliveryText}
                </span>
                <a
                  href={`tel:${headerInfo.phone.replace(/[^+\d]/g, "")}`}
                  className="inline-flex items-center gap-1.5 text-white/95 hover:text-[#75B5F5] transition-colors whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 text-[#75B5F5] shrink-0" />
                  <span>{headerInfo.phone}</span>
                </a>
                <span className="hidden md:inline-flex items-center gap-1.5 text-white/90 whitespace-nowrap">
                  <Clock className="w-3.5 h-3.5 text-[#75B5F5] shrink-0" />
                  <span>{headerInfo.hours}</span>
                </span>
              </div>

              {/* Right Email */}
              <a
                href={`mailto:${headerInfo.email}`}
                className="hidden sm:inline-flex items-center gap-1.5 text-white/95 hover:text-[#75B5F5] transition-colors whitespace-nowrap"
              >
                <Mail className="w-3.5 h-3.5 text-[#75B5F5] shrink-0" />
                <span>{headerInfo.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tier 2: White Navigation Container matching section width */}
        <div className="w-[98%] max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 pointer-events-auto">
          <div className="relative">
            <div
              className={`bg-white flex items-center justify-between px-4 sm:px-7 lg:px-10 h-[76px] lg:h-[82px] rounded-b-[14px] transition-shadow duration-300 ${
                isScrolled
                  ? "shadow-[0_14px_35px_rgba(4,34,82,0.18)] border-x border-b border-slate-100"
                  : "shadow-[0_10px_28px_rgba(4,32,78,0.18)]"
              }`}
            >
              {/* Brand Logo on Left */}
              <Link
                href="/"
                className="flex items-center gap-2.5 shrink-0 group focus:outline-none"
              >
                {headerInfo.customLogo ? (
                  <img
                    src={headerInfo.customLogo}
                    alt={headerInfo.brandName}
                    className="h-9 sm:h-10 w-auto object-contain"
                  />
                ) : (
                  <>
                    {/* 4-Petal Noor Plastic Water Droplet Emblem */}
                    <svg
                      viewBox="0 0 40 40"
                      className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 transition-transform duration-300 group-hover:scale-105"
                      aria-hidden="true"
                    >
                      {/* Top petal */}
                      <path
                        d="M20 2.5C22.4 7 24.4 10.6 24.4 13.6C24.4 16 22.4 17.8 20 17.8C17.6 17.8 15.6 16 15.6 13.6C15.6 10.6 17.6 7 20 2.5Z"
                        fill="#5EC5F2"
                      />
                      {/* Bottom petal */}
                      <path
                        d="M20 37.5C17.6 33 15.6 29.4 15.6 26.4C15.6 24 17.6 22.2 20 22.2C22.4 22.2 24.4 24 24.4 26.4C24.4 29.4 22.4 33 20 37.5Z"
                        fill="#094E9B"
                      />
                      {/* Left petal */}
                      <path
                        d="M2.5 20C7 17.6 10.6 15.6 13.6 15.6C16 15.6 17.8 17.6 17.8 20C17.8 22.4 16 24.4 13.6 24.4C10.6 24.4 7 22.4 2.5 20Z"
                        fill="#1D8FE1"
                      />
                      {/* Right petal */}
                      <path
                        d="M37.5 20C33 22.4 29.4 24.4 26.4 24.4C24 24.4 22.2 22.4 22.2 20C22.2 17.6 24 15.6 26.4 15.6C29.4 15.6 33 17.6 37.5 20Z"
                        fill="#35A7E8"
                      />
                      {/* Center diagonal micro droplets */}
                      <circle cx="14" cy="14" r="1.4" fill="#1D8FE1" />
                      <circle cx="26" cy="14" r="1.4" fill="#5EC5F2" />
                      <circle cx="14" cy="26" r="1.4" fill="#094E9B" />
                      <circle cx="26" cy="26" r="1.4" fill="#1D8FE1" />
                    </svg>
                    <span className="font-hero-display text-[25px] sm:text-[29px] leading-none text-[#0D1E3A] tracking-[-0.01em]">
                      {headerInfo.brandName}
                    </span>
                  </>
                )}
              </Link>

              {/* Desktop Right Side: Navigation Links + Search + ORDER NOW */}
              <div className="hidden lg:flex items-center gap-3.5 lg:gap-4 xl:gap-7">
                <nav className="flex items-center gap-3 lg:gap-4 xl:gap-6" aria-label="Primary">
                  {NAV_ITEMS.map((item) => {
                    const active = isNavItemActive(item);
                    const isOpen = openDropdown === item.label;
                    return (
                      <div
                        key={item.label}
                        className="relative"
                        onMouseEnter={() =>
                          item.children && handleMouseEnter(item.label)
                        }
                        onMouseLeave={handleMouseLeave}
                      >
                        <Link
                          href={item.href}
                          className={`inline-flex items-center gap-0.5 py-2 whitespace-nowrap text-[12.5px] xl:text-[14px] font-bold uppercase tracking-[0.05em] transition-colors ${active
                            ? "text-[#094E9B]"
                            : "text-[#162336] hover:text-[#094E9B]"
                            }`}
                        >
                          <span>{item.label}</span>
                          {item.hasPlus && (
                            <span
                              className={`text-[12px] xl:text-[13px] font-bold leading-none ml-0.5 -mt-1.5 ${active ? "text-[#38A4E8]" : "text-[#094E9B]/65"
                                }`}
                            >
                              +
                            </span>
                          )}
                        </Link>

                        {/* Clean Smooth Hover Dropdown */}
                        {item.children && (
                          <div
                            className={`absolute left-0 top-full pt-2.5 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${
                              isOpen
                                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto visible"
                                : "opacity-0 -translate-y-2 scale-[0.97] pointer-events-none invisible"
                            }`}
                          >
                            <div className="w-[275px] bg-white rounded-xl shadow-[0_20px_50px_rgba(7,41,94,0.18)] border border-slate-100 p-2.5">
                              {item.children.map((sub) => (
                                <Link
                                  key={sub.href + sub.label}
                                  href={sub.href}
                                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-sky-50/80 transition-colors group/sub"
                                >
                                  <div className="mt-0.5 w-8 h-8 rounded-lg bg-[#094E9B]/8 flex items-center justify-center shrink-0 group-hover/sub:bg-[#094E9B]/15 transition-colors">
                                    {sub.icon}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-[14px] font-semibold text-[#0E1E36] group-hover/sub:text-[#094E9B] leading-tight">
                                      {sub.label}
                                    </div>
                                    <div className="text-[12.5px] text-slate-500 mt-0.5 leading-snug line-clamp-2 whitespace-normal">
                                      {sub.description}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>

                {/* Circular Search Button & ORDER NOW Pill */}
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setSearchOpen((v) => !v)}
                    aria-label="Search products"
                    className="w-10 h-10 xl:w-11 xl:h-11 rounded-full bg-[#094E9B] hover:bg-[#073E7E] text-white flex items-center justify-center shadow-[0_6px_16px_rgba(9,78,155,0.28)] transition-all duration-200 cursor-pointer hover:scale-105"
                  >
                    {searchOpen ? (
                      <X className="w-4 h-4" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleOrderNow}
                    className="relative inline-flex items-center justify-center rounded-full bg-[#094E9B] hover:bg-[#073E7E] text-white text-[12.5px] xl:text-[13.5px] font-bold uppercase tracking-[0.08em] px-6 xl:px-7 py-3 overflow-hidden shadow-[0_8px_20px_rgba(9,78,155,0.3)] transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-[#75B5F5]"
                    />
                    <span className="relative z-10">ORDER NOW</span>
                  </button>
                </div>
              </div>

              {/* Mobile / Tablet Action Group */}
              <div className="flex lg:hidden items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setSearchOpen((v) => !v)}
                  aria-label="Search products"
                  className="w-9 h-9 rounded-full bg-[#094E9B] text-white flex items-center justify-center shadow-sm"
                >
                  {searchOpen ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open menu"
                  className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50 text-[#0E1E36] flex items-center justify-center hover:bg-slate-100 transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Subtle Dark-Blue Under-Lip beneath Centered White Container (Reference Detail) */}
            <div
              aria-hidden="true"
              className={`mx-5 sm:mx-8 h-[6px] bg-[#084D98] rounded-b-[10px] shadow-md transition-opacity duration-200 pointer-events-none ${
                isScrolled ? "opacity-0" : "opacity-90"
              }`}
            />
          </div>
        </div>
      </header>

      {/* Full-Screen Dark-Shadow Search Overlay (Rises Smoothly from Bottom) */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search site products"
        aria-hidden={!searchOpen}
        onClick={() => setSearchOpen(false)}
        className={`fixed inset-0 z-[80] bg-[#020A14]/85 backdrop-blur-[2px] flex justify-center pt-[24vh] sm:pt-[27vh] px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          searchOpen
            ? "opacity-100 pointer-events-auto visible"
            : "opacity-0 pointer-events-none invisible"
        }`}
      >
        {/* Top-Right Close X Icon */}
        <button
          type="button"
          onClick={() => setSearchOpen(false)}
          aria-label="Close search"
          tabIndex={searchOpen ? 0 : -1}
          className="absolute top-5 right-5 sm:top-7 sm:right-9 p-2 text-white/85 hover:text-white transition-all duration-300 hover:rotate-90 cursor-pointer focus:outline-none"
        >
          <X className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
        </button>

        {/* Bottom-to-Up Rising Search Bar Matching Reference */}
        <form
          onSubmit={handleSearchSubmit}
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-[660px] h-[56px] sm:h-[62px] bg-white rounded-[4px] overflow-hidden flex items-stretch shadow-[0_24px_65px_rgba(0,0,0,0.65)] transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            searchOpen
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-40 sm:translate-y-56 opacity-0 scale-[0.98]"
          }`}
        >
          <input
            ref={searchInputRef}
            type="text"
            tabIndex={searchOpen ? 0 : -1}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Here"
            className="flex-1 min-w-0 bg-white text-[#111E32] placeholder:text-[#6B7280] text-[15px] sm:text-[16px] px-5 sm:px-6 focus:outline-none"
          />
          <button
            type="submit"
            tabIndex={searchOpen ? 0 : -1}
            className="bg-[#5DC7F4] hover:bg-[#3EB8EE] active:bg-[#2DA8E0] text-white text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.06em] px-6 sm:px-9 shrink-0 transition-colors cursor-pointer whitespace-nowrap"
          >
            SEARCH NOW!
          </button>
        </form>
      </div>

      {/* Mobile Slide-Over Navigation Drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${mobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className="absolute inset-0 bg-[#051B3A]/60 backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
        />
        <aside
          className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-[340px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="bg-[#0E489C] text-white px-5 py-4 flex items-center justify-between">
            <span className="font-hero-display text-2xl tracking-tight">
              {headerInfo.brandName}
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const expanded = mobileExpanded === item.label;
              return (
                <div
                  key={item.label}
                  className="border-b border-slate-100 last:border-b-0 pb-1.5"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className="py-2.5 px-2 text-[15px] font-bold uppercase tracking-wide text-[#111E32] hover:text-[#094E9B] flex-1"
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpanded(expanded ? null : item.label)
                        }
                        aria-label={`Expand ${item.label}`}
                        className="p-2 text-slate-500 hover:text-[#094E9B]"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            expanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {hasChildren && (
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        expanded
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0 pointer-events-none"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div
                          className={`pl-3 pb-2 space-y-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            expanded ? "translate-y-0" : "-translate-y-2"
                          }`}
                        >
                          {item.children!.map((sub) => (
                            <Link
                              key={sub.href + sub.label}
                              href={sub.href}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[14px] font-medium text-slate-600 hover:bg-sky-50 hover:text-[#094E9B] transition-colors duration-200"
                            >
                              {sub.icon}
                              <span>{sub.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
            <div className="text-[13px] text-slate-600 space-y-1.5">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#094E9B]" />
                <span>{headerInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#094E9B]" />
                <span>{headerInfo.hours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#094E9B]" />
                <span>{headerInfo.email}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleOrderNow}
              className={siteButtonClass({ variant: "primary", fullWidth: true })}
            >
              <span>ORDER NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
