"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Find the active hero or top banner section on the current page
      const heroEl =
        document.getElementById("hero") ||
        document.getElementById("top") ||
        document.getElementById("page-banner");

      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // Transition when the bottom of the hero section reaches or passes the header height
        setIsPastHero(rect.bottom <= 96);
      } else {
        // Fallback for pages without an explicit hero section
        setIsPastHero(window.scrollY > 300);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navItems = [
    {
      label: "About Us",
      href: "/#about",
      sub: [
        { label: "Our Business", href: "/#about" },
        { label: "Our Story", href: "/#about" },
        { label: "Brand", href: "/#overview" },
        { label: "Career", href: "/#explore" },
      ],
    },
    {
      label: "Sustainability",
      href: "/#overview",
      sub: [
        { label: "Sustainability", href: "/#overview" },
        { label: "R & D", href: "/#supply-chain" },
        { label: "Plant", href: "/#about" },
      ],
    },
    {
      label: "Find Our Product",
      href: "/products",
    },
    {
      label: "Knowledge Hub",
      href: "/#explore",
      sub: [
        { label: "FAQs", href: "/#footer" },
        { label: "Case Studies", href: "/#explore" },
        { label: "Blog", href: "/#media" },
      ],
    },
    {
      label: "Achievements",
      href: "/#footer",
      sub: [
        { label: "Awards & Certificates", href: "/#footer" },
        { label: "Brands We Work With", href: "/#explore" },
      ],
    },
    {
      label: "Media and Contacts",
      href: "/#media",
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isPastHero
          ? "w-full p-0 bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.08)] border-b border-slate-200/80"
          : "p-3 sm:px-8 sm:py-5 lg:px-12 lg:py-6"
      }`}
    >
      <div
        className={`relative flex items-center justify-between transition-all duration-500 ease-in-out ${
          isPastHero
            ? "w-full max-w-[1638px] mx-auto h-[88px] sm:h-[94px] px-6 sm:px-12 rounded-none border-none bg-transparent text-[#1a1a1a]"
            : "w-full max-w-[1638px] mx-auto h-[96px] sm:h-[104px] px-7 sm:px-10 rounded-full bg-white/20 sm:bg-white/25 backdrop-blur-[16px] border border-white/35 text-white shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
        }`}
      >
        {/* Brand Logo: Droplet Icon + AquaPure */}
        <Link
          href="#top"
          className="flex items-center gap-3 font-bold text-2xl sm:text-3xl tracking-tight transition-colors group select-none"
        >
          <span className="dr group-hover:scale-110 transition-transform duration-300" />
          <span
            className={`font-black tracking-tight transition-colors duration-300 ${
              isPastHero ? "text-[#0b2a8a]" : "text-white drop-shadow-md"
            }`}
          >
            AquaPure
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-7 xl:gap-11 list-none text-[13.5px] xl:text-[14.5px] uppercase font-bold tracking-wider">
          {navItems.map((item, idx) => {
            const isActive =
              (item.href === "/products" &&
                (pathname === "/products" || pathname === "/find-our-product")) ||
              (item.href === "/" && pathname === "/");

            return (
              <li
                key={idx}
                className="relative py-8 xl:py-9 group cursor-pointer"
                onMouseEnter={() => item.sub && setActiveHover(item.label)}
                onMouseLeave={() => setActiveHover(null)}
              >
                <Link
                  href={item.href}
                  className={`transition-colors duration-200 hover:text-[#38bdf8] ${
                    isActive
                      ? "text-[#38bdf8] font-extrabold"
                      : isPastHero
                      ? "text-slate-800 hover:text-[#0b2a8a]"
                      : "text-white/95 drop-shadow-sm hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>

                {/* Submenu Dropdown Bar */}
                {item.sub && activeHover === item.label && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full min-w-[520px] bg-[rgba(32,38,46,0.95)] backdrop-blur-md text-white rounded-b-2xl py-4 px-8 flex justify-center gap-8 text-[14px] font-semibold shadow-2xl border border-white/10 animate-in fade-in slide-in-from-top-1 duration-200">
                    {item.sub.map((s, sIdx) => (
                      <Link
                        key={sIdx}
                        href={s.href}
                        className="hover:text-[#7fd8f0] transition-colors whitespace-nowrap"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 rounded-lg text-2xl transition-colors ${
            isPastHero ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"
          }`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden mx-4 sm:mx-8 mt-3 p-6 rounded-2xl bg-[rgba(26,32,40,0.98)] backdrop-blur-xl text-white shadow-2xl border border-white/15 space-y-3.5 animate-in fade-in duration-200">
          {navItems.map((item, idx) => (
            <div key={idx} className="border-b border-white/10 pb-2.5">
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-bold uppercase tracking-wider hover:text-[#7fd8f0] py-1"
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
                      className="block text-xs text-slate-300 hover:text-[#7fd8f0] py-0.5"
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
