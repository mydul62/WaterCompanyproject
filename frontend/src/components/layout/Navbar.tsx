"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "p-0" : "p-[10px] sm:px-[40px] sm:py-[18px]"
      }`}
    >
      <div
        className={`relative flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? "h-[70px] px-6 sm:px-10 rounded-none bg-white text-[#1a1a1a] shadow-[0_4px_18px_rgba(0,0,0,0.12)] border-b border-slate-200"
            : "h-[78px] px-6 sm:px-8 rounded-full bg-white/25 backdrop-blur-[14px] border border-white/35 text-white shadow-lg"
        }`}
      >
        {/* Logo: Droplet Icon + AquaPure matching snippet */}
        <Link
          href="#top"
          className="flex items-center gap-2.5 font-bold text-2xl tracking-tight transition-colors"
        >
          <span className="dr" />
          <span
            className={
              isScrolled
                ? "text-[#0b2a8a] font-extrabold"
                : "text-white font-extrabold drop-shadow-sm"
            }
          >
            AquaPure
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-8 xl:gap-11 list-none text-[13px] uppercase font-semibold tracking-wider">
          {navItems.map((item, idx) => {
            const isActive =
              (item.href === "/products" &&
                (pathname === "/products" || pathname === "/find-our-product")) ||
              (item.href === "/" && pathname === "/");

            return (
              <li
                key={idx}
                className="relative py-7 group"
                onMouseEnter={() => item.sub && setActiveHover(item.label)}
                onMouseLeave={() => setActiveHover(null)}
              >
                <Link
                  href={item.href}
                  className={`transition-colors hover:text-[#4aa3d8] ${
                    isActive
                      ? "text-[#38bdf8] font-bold"
                      : isScrolled
                      ? "text-slate-800"
                      : "text-white"
                  }`}
                >
                  {item.label}
                </Link>

                {/* Submenu Bar (matches exact style in snippet) */}
                {item.sub && activeHover === item.label && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full min-w-[500px] bg-[rgba(40,46,52,0.92)] backdrop-blur-md text-white rounded-b-2xl py-4 px-8 flex justify-center gap-8 text-[14px] font-medium shadow-2xl border border-white/10 animate-in fade-in slide-in-from-top-1 duration-200">
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
          className={`lg:hidden p-2 text-2xl transition-colors ${
            isScrolled ? "text-slate-900" : "text-white"
          }`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden mt-2 p-5 rounded-2xl bg-[rgba(30,36,42,0.96)] backdrop-blur-xl text-white shadow-2xl border border-white/15 space-y-3">
          {navItems.map((item, idx) => (
            <div key={idx} className="border-b border-white/10 pb-2">
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-bold uppercase tracking-wider hover:text-[#7fd8f0] py-1"
              >
                {item.label}
              </Link>
              {item.sub && (
                <div className="pl-4 mt-1 space-y-1 border-l border-white/20">
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
