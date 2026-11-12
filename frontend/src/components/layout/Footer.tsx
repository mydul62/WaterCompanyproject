"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronUp, Mail, MapPin, Phone } from "lucide-react";
import { api } from "@/lib/api";
import { smoothScrollToTop } from "@/lib/smoothScroll";

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/our-story" },
  { label: "Products", href: "/products" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "TV News", href: "/tv-news" },
];

const COMPANY_LINKS = [
  { label: "R & D Center", href: "/rnd" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Partner Brands", href: "/brands-we-work-with" },
  { label: "Media & Contacts", href: "/media" },
  { label: "Careers", href: "/careers", badge: "Hiring" },
];

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    api.settings
      .getMap()
      .then((res) => {
        if (res?.data) setSettings(res.data);
      })
      .catch(() => {});

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    smoothScrollToTop();
  };

  const brandName = settings["header_brand_name"] || "Noor Plastic";
  const companyName = settings["site_name"] || "Noor Plastic Industries";
  const address =
    settings["factory_gazipur"] ||
    settings["headquarters"] ||
    "Holding #5, Ward #02, Latifpur-B, Kaliakoir-1750, Gazipur, Dhaka, Bangladesh.";
  const phone = settings["phone_sales"] || settings["phone_sales_1"] || "+880 1711-987275";
  const salesEmail = settings["email_sales"] || "info@noorplastic.com";
  const commercialEmail = settings["email_procurement"] || "sales@noorplastic.com";

  const socialLinks = [
    {
      name: "Facebook",
      href: settings["social_facebook"] || "https://www.facebook.com",
      path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    },
    {
      name: "YouTube",
      href: settings["social_youtube"] || "https://www.youtube.com",
      path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    },
    {
      name: "LinkedIn",
      href: settings["social_linkedin"] || "https://www.linkedin.com",
      path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76m1.4 9.74v-8.37H5.06v8.37h2.8z",
    },
  ];

  return (
    <footer
      id="footer"
      className="relative w-full bg-gradient-to-b from-[#071a30] via-[#061527] to-[#040f1c] text-slate-300 overflow-hidden"
    >
      {/* Top Ocean Accent Hairline & Subtle Radial Ambient Glow */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
      <div
        aria-hidden="true"
        className="absolute -top-24 right-1/4 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.11) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-10 w-[440px] h-[440px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.13) 0%, transparent 70%)" }}
      />

      {/* Main Footer Grid */}
      <div className="relative z-10 w-[98%] max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Summary */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
            >
              <svg
                viewBox="0 0 40 40"
                className="w-9 h-9 shrink-0 transition-transform duration-300 group-hover:scale-105"
                aria-hidden="true"
              >
                <path
                  d="M20 2.5C22.4 7 24.4 10.6 24.4 13.6C24.4 16 22.4 17.8 20 17.8C17.6 17.8 15.6 16 15.6 13.6C15.6 10.6 17.6 7 20 2.5Z"
                  fill="#5EC5F2"
                />
                <path
                  d="M20 37.5C17.6 33 15.6 29.4 15.6 26.4C15.6 24 17.6 22.2 20 22.2C22.4 22.2 24.4 24 24.4 26.4C24.4 29.4 22.4 33 20 37.5Z"
                  fill="#1D8FE1"
                />
                <path
                  d="M2.5 20C7 17.6 10.6 15.6 13.6 15.6C16 15.6 17.8 17.6 17.8 20C17.8 22.4 16 24.4 13.6 24.4C10.6 24.4 7 22.4 2.5 20Z"
                  fill="#35A7E8"
                />
                <path
                  d="M37.5 20C33 22.4 29.4 24.4 26.4 24.4C24 24.4 22.2 22.4 22.2 20C22.2 17.6 24 15.6 26.4 15.6C29.4 15.6 33 17.6 37.5 20Z"
                  fill="#7DD3FC"
                />
                <circle cx="14" cy="14" r="1.4" fill="#5EC5F2" />
                <circle cx="26" cy="14" r="1.4" fill="#BAE6FD" />
                <circle cx="14" cy="26" r="1.4" fill="#1D8FE1" />
                <circle cx="26" cy="26" r="1.4" fill="#35A7E8" />
              </svg>
              <div className="leading-none">
                <span className="font-hero-display text-[28px] text-white tracking-[-0.01em] block">
                  {brandName}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300/80 block mt-1">
                  {companyName}
                </span>
              </div>
            </Link>

            <p className="text-sm sm:text-[15px] text-slate-300/90 leading-relaxed max-w-sm">
              Sealed pure drinking water &amp; precision food-grade plastic packaging crafted cleanly in Kaliakoir, Gazipur.
            </p>

            {/* Glassmorphic Social Buttons */}
            <div className="flex items-center gap-2.5 pt-1">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="w-9 h-9 rounded-xl bg-white/8 border border-white/15 hover:bg-cyan-500 hover:border-cyan-400 text-slate-200 hover:text-slate-950 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={item.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column 1: Explore */}
          <div className="lg:col-span-2 lg:col-start-6 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-300">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Column 2: Company */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-300">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              {COMPANY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 font-bold uppercase tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Direct Quote Card */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-300">
              Contact Factory
            </h3>

            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                <span className="leading-relaxed text-slate-300/90">{address}</span>
              </div>

              <a
                href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                className="flex items-center gap-2.5 text-slate-200 hover:text-cyan-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{phone}</span>
              </a>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                <div className="space-y-1">
                  <a
                    href={`mailto:${salesEmail}`}
                    className="block text-slate-200 hover:text-cyan-300 transition-colors"
                  >
                    {salesEmail}
                  </a>
                  {commercialEmail && commercialEmail !== salesEmail && (
                    <a
                      href={`mailto:${commercialEmail}`}
                      className="block text-slate-400 hover:text-cyan-300 transition-colors text-xs"
                    >
                      {commercialEmail}
                    </a>
                  )}
                </div>
              </div>
            </div>

            <Link
              href="/request-quote"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-cyan-500 border border-white/15 hover:border-cyan-400 text-white hover:text-slate-950 text-xs sm:text-sm font-bold transition-all duration-300 group"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Slim Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 bg-black/25 py-4 text-slate-400 text-xs sm:text-sm">
        <div className="w-[98%] max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-center sm:text-left">
            {settings["footer_copyright"] ||
              settings["copyright_text"] ||
              "Copyright © 2026 Noor Plastic Industries. All rights reserved."}
          </p>

          <div className="flex items-center gap-5">
            <Link href="/faqs" className="hover:text-cyan-300 transition-colors">
              FAQs
            </Link>
            <span className="text-slate-600" aria-hidden="true">
              &bull;
            </span>
            <span>
              Developed by{" "}
              <a
                href={settings["developer_url"] || "https://brainforge26.tech/"}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white hover:text-cyan-300 transition-colors"
              >
                {settings["developer_name"] || "BrainForce"}
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full border border-cyan-400/50 bg-[#094E9B] hover:bg-[#073E7E] text-white shadow-[0_8px_20px_rgba(9,78,155,0.35)] transition-all flex items-center justify-center hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}
    </footer>
  );
}
