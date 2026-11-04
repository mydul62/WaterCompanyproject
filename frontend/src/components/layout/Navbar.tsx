"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>("ABOUT US");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="absolute top-4 left-0 right-0 z-50 px-4 sm:px-8 max-w-[1400px] mx-auto pointer-events-auto">
      {/* Main Floating Rounded Header Bar (Matches Screenshots 1-5 exactly) */}
      <div className="relative rounded-2xl bg-[#aba59c]/80 backdrop-blur-md border border-white/20 shadow-lg px-6 py-4 flex items-center justify-between">
        {/* Logo matching the original Xclusive Can Limited branding */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center">
            {/* Custom stylized X with globe circle */}
            <div className="relative flex items-center font-black text-[#0d226b] text-2xl tracking-tighter">
              <span className="text-3xl font-black">X</span>
              <div className="absolute top-0.5 left-1.5 w-3 h-3 rounded-full border-2 border-[#0d226b] bg-cyan-400/80" />
              <span className="text-xl font-bold ml-0.5">clusive</span>
            </div>
            <div className="ml-1 border border-[#0d226b] px-1 py-0.2 rounded text-[8px] font-bold uppercase tracking-wider text-[#0d226b]">
              Can Limited
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold text-white tracking-wide">
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
              className={`transition-colors py-1 hover:text-slate-900 ${
                activeMenu === item.name ? "text-cyan-200" : "text-white"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 rounded-lg text-white hover:bg-black/20"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Submenu Bar (Attached Directly Under Header - Matches Screenshots 2, 3, 4, 5) */}
      {activeMenu && subMenus[activeMenu] && (
        <div className="mt-1 rounded-xl bg-[#3f3f3f]/95 backdrop-blur-md text-white py-2.5 px-6 shadow-xl border border-white/10 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-xs font-medium text-slate-200">
            {subMenus[activeMenu].map((sub, idx) => (
              <a
                key={idx}
                href={sub.href}
                className="hover:text-cyan-300 transition-colors py-0.5"
              >
                {sub.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 rounded-xl bg-[#3c3c3c] text-white space-y-3 shadow-2xl">
          {navItems.map((item) => (
            <div key={item.name} className="border-b border-white/10 pb-2">
              <button
                onClick={() => setActiveMenu(activeMenu === item.name ? null : item.name)}
                className="w-full text-left font-bold text-xs py-1"
              >
                {item.name}
              </button>
              {activeMenu === item.name && subMenus[item.name] && (
                <div className="pl-4 mt-2 space-y-1.5 text-xs text-slate-300">
                  {subMenus[item.name].map((sub, idx) => (
                    <a
                      key={idx}
                      href={sub.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1 hover:text-cyan-400"
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
