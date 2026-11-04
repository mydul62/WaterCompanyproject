"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>("ABOUT US");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "ABOUT US", id: "about" },
    { name: "SUSTAINABILITY", id: "sustainability" },
    { name: "FIND OUR PRODUCT", id: "product", href: "#products" },
    { name: "KNOWLEDGE HUB", id: "knowledge" },
    { name: "ACHIEVEMENTS", id: "achievements" },
    { name: "MEDIA AND CONTACTS", id: "media", href: "#media" },
  ];

  const subMenus: Record<string, { label: string; href: string }[]> = {
    "ABOUT US": [
      { label: "Our Business", href: "#about" },
      { label: "Our Story", href: "#about" },
      { label: "Q Pail", href: "#products" },
      { label: "Xclusive", href: "#overview" },
      { label: "Career", href: "#explore" },
    ],
    SUSTAINABILITY: [
      { label: "Sustainability", href: "#overview" },
      { label: "R & D", href: "#supply-chain" },
      { label: "Tool Room", href: "#explore" },
    ],
    "KNOWLEDGE HUB": [
      { label: "FAQs", href: "#footer" },
      { label: "Case Studies", href: "#explore" },
      { label: "Blog", href: "#media" },
    ],
    ACHIEVEMENTS: [
      { label: "Awards & Certificates", href: "#footer" },
      { label: "Brands We Work With", href: "#explore" },
    ],
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-3"
          : "pt-4 pb-2"
      }`}
    >
      <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-8">
        {/* Main Floating / Fixed Bar */}
        <div
          className={`relative transition-all duration-300 ${
            isScrolled
              ? "flex items-center justify-between"
              : "rounded-2xl bg-[#989288]/85 backdrop-blur-md border border-white/20 shadow-lg px-6 py-3 flex items-center justify-between"
          }`}
        >
          {/* Logo with Exact Cropped High-Res Graphic */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-10 sm:h-12 w-28 sm:w-36">
              <Image
                src="/cropped/xclusive-logo.png"
                alt="Xclusive Can Limited Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold tracking-wider">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  if (subMenus[item.name]) {
                    setActiveMenu(activeMenu === item.name ? null : item.name);
                  } else if (item.href) {
                    window.location.hash = item.href;
                    setActiveMenu(null);
                  }
                }}
                onMouseEnter={() => {
                  if (subMenus[item.name]) {
                    setActiveMenu(item.name);
                  }
                }}
                className={`transition-colors py-1 ${
                  isScrolled
                    ? activeMenu === item.name
                      ? "text-sky-600 font-extrabold"
                      : "text-slate-700 hover:text-black"
                    : activeMenu === item.name
                    ? "text-[#93c5fd]"
                    : "text-white hover:text-sky-200"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-black/20"
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Submenu Bar (Attached Directly Under Header - Matches Screenshots 2, 3, 4, 5) */}
        {!isScrolled && activeMenu && subMenus[activeMenu] && (
          <div className="mt-1.5 rounded-2xl bg-[#34373d]/95 backdrop-blur-md text-white py-2.5 px-6 shadow-xl flex items-center justify-around text-xs font-semibold tracking-wide border border-white/10 animate-in fade-in slide-in-from-top-1 duration-200">
            {subMenus[activeMenu].map((sub, idx) => (
              <Link
                key={idx}
                href={sub.href}
                className="hover:text-[#93c5fd] transition-colors py-1 px-3 rounded-lg hover:bg-white/5"
              >
                {sub.label}
              </Link>
            ))}
          </div>
        )}

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-2xl bg-white shadow-2xl border border-slate-200 text-slate-800 space-y-3">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-slate-100 pb-2">
                <button
                  onClick={() => {
                    if (subMenus[item.name]) {
                      setActiveMenu(activeMenu === item.name ? null : item.name);
                    } else if (item.href) {
                      window.location.hash = item.href;
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="w-full text-left font-bold text-xs uppercase tracking-wider text-slate-900 py-1 flex items-center justify-between"
                >
                  <span>{item.name}</span>
                  {subMenus[item.name] && <span className="text-slate-400 text-xs">▼</span>}
                </button>
                {activeMenu === item.name && subMenus[item.name] && (
                  <div className="pl-3 mt-1.5 space-y-1.5 border-l-2 border-sky-400">
                    {subMenus[item.name].map((sub, sIdx) => (
                      <Link
                        key={sIdx}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-xs font-medium text-slate-600 hover:text-sky-600 py-1"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
