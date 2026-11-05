"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Find the hero or top banner section on the page
      const heroEl =
        document.getElementById("hero") ||
        document.getElementById("top") ||
        document.getElementById("page-banner");

      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // Transition when the bottom of the hero section reaches the header height
        setIsPastHero(rect.bottom <= 96);
      } else {
        // Fallback for pages without an explicit hero element
        setIsPastHero(window.scrollY > 280);
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
          ? "w-full p-0 shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
          : "p-3 sm:px-8 sm:py-5 lg:px-12 lg:py-6"
      }`}
      style={
        isPastHero
          ? {
              backgroundColor: "rgba(255, 255, 255, 0.48)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
            }
          : undefined
      }
    >
      <div
        className={`relative flex items-center justify-between transition-all duration-500 ease-in-out ${
          isPastHero
            ? "w-full max-w-[1638px] mx-auto h-[88px] sm:h-[96px] px-6 sm:px-12 rounded-none border-none bg-transparent text-[#1a1a1a]"
            : "w-full max-w-[1638px] mx-auto h-[96px] sm:h-[104px] px-7 sm:px-10 rounded-full border border-white/35 text-white shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
        }`}
        style={
          !isPastHero
            ? {
                backgroundColor: "rgba(255, 255, 255, 0.22)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }
            : undefined
        }
      >
        {/* Brand Logo: Authentic Xclusive Can Limited matching Screenshot 6ca7749f */}
        <Link
          href="#top"
          className="flex items-center gap-3 transition-transform hover:scale-[1.02] select-none"
        >
          <div className="relative h-11 sm:h-13 w-40 sm:w-48 shrink-0">
            <Image
              src={isPastHero ? "/cropped/xclusive-logo.png" : "/cropped/xclusive-logo-white.png"}
              alt="Xclusive Can Limited"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav Links matching Screenshot exactly */}
        <ul className="hidden lg:flex items-center gap-7 xl:gap-10 list-none text-[13px] xl:text-[14px] uppercase font-bold tracking-wider">
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
                  className={`transition-colors duration-200 ${
                    isActive
                      ? "text-[#0284c7] font-extrabold"
                      : isPastHero
                      ? "text-slate-900 hover:text-[#0b2a8a]"
                      : "text-white/95 drop-shadow-sm hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>

                {/* Submenu Dropdown Bar */}
                {item.sub && activeHover === item.label && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full min-w-[520px] text-white rounded-b-2xl py-4 px-8 flex justify-center gap-8 text-[14px] font-semibold shadow-2xl border border-white/10 animate-in fade-in slide-in-from-top-1 duration-200"
                    style={{
                      backgroundColor: "rgba(26, 32, 42, 0.94)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                    }}
                  >
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
            isPastHero ? "text-slate-900 hover:bg-black/5" : "text-white hover:bg-white/10"
          }`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div
          className="lg:hidden mx-4 sm:mx-8 mt-3 p-6 rounded-2xl text-white shadow-2xl border border-white/15 space-y-3.5 animate-in fade-in duration-200"
          style={{
            backgroundColor: "rgba(22, 28, 36, 0.96)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
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
