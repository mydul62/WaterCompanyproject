"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronUp } from "lucide-react";
import { api } from "@/lib/api";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);

    // Fetch live backend footer settings
    api.settings
      .getMap()
      .then((res) => {
        if (res?.data) setSettings(res.data);
      })
      .catch(() => {});

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="w-full bg-white relative">
      {/* 4 Columns Main Footer Container matching 1920px fluid canvas */}
      <div className="w-[98%] max-w-[1920px] mx-auto px-4 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand Info & Contacts */}
          <div data-reveal="up" className="space-y-5">
            {/* Noor Plastic Brand Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5 group focus:outline-none">
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
                  fill="#094E9B"
                />
                <path
                  d="M2.5 20C7 17.6 10.6 15.6 13.6 15.6C16 15.6 17.8 17.6 17.8 20C17.8 22.4 16 24.4 13.6 24.4C10.6 24.4 7 22.4 2.5 20Z"
                  fill="#1D8FE1"
                />
                <path
                  d="M37.5 20C33 22.4 29.4 24.4 26.4 24.4C24 24.4 22.2 22.4 22.2 20C22.2 17.6 24 15.6 26.4 15.6C29.4 15.6 33 17.6 37.5 20Z"
                  fill="#35A7E8"
                />
                <circle cx="14" cy="14" r="1.4" fill="#1D8FE1" />
                <circle cx="26" cy="14" r="1.4" fill="#5EC5F2" />
                <circle cx="14" cy="26" r="1.4" fill="#094E9B" />
                <circle cx="26" cy="26" r="1.4" fill="#1D8FE1" />
              </svg>
              <span className="font-hero-display text-[28px] leading-none text-[#0D1E3A] tracking-[-0.01em]">
                {settings["header_brand_name"] || "Noor Plastic"}
              </span>
            </Link>

            <h3 className="font-bold text-lg text-slate-900">
              {settings["site_name"] || "Noor Plastic Industries"}
            </h3>

            <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
              <p>
                {settings["factory_gazipur"] ||
                  settings["headquarters"] ||
                  "Holding #5, Ward #02, Latifpur-B, Kaliakoir-1750, Gazipur, Dhaka, Bangladesh."}
              </p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                <span className="font-semibold text-slate-800 block">
                  Proprietor: {settings["proprietor_name"] || "Nurul Islam"} &bull; Est. 2024
                </span>
                Trade License: {settings["trade_license_no"] || "242501300583"} (Kaliakoir Pourashava)
                <br />
                BIN: {settings["bin_number"] || "007122199-1205"} &bull; TIN: {settings["tin_number"] || "636404586599"}
              </p>
            </div>

            <div className="space-y-1.5 text-sm sm:text-base text-slate-700">
              <p className="font-bold text-slate-900">Phone:</p>
              <p>
                Sales &amp; Office: {settings["phone_sales"] || settings["phone_sales_1"] || "+880 1711-987275"}
              </p>
            </div>

            <div className="space-y-1.5 text-sm sm:text-base text-slate-700">
              <p className="font-bold text-slate-900">Email:</p>
              <p>
                Sales &amp; Inquiry: {settings["email_sales"] || "info@noorplastic.com"}
              </p>
              <p>
                Commercial: {settings["email_procurement"] || "sales@noorplastic.com"}
              </p>
            </div>

            {/* Social Icons (Black rounded square buttons matching Screenshot) */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center hover:bg-slate-800 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center hover:bg-slate-800 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center hover:bg-slate-800 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links matching Screenshot */}
          <div data-reveal="up" className="delay-100 space-y-4">
            <h3 className="font-bold text-xl text-black">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm sm:text-base text-slate-700">
              <li>
                <Link href="/faqs" className="hover:text-black">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/" className="text-[#38bdf8] font-bold hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-black flex items-center justify-between group">
                  <span>About Us</span>
                  <span className="text-slate-400 group-hover:text-black">∨</span>
                </Link>
              </li>
              <li>
                <Link href="#overview" className="hover:text-black flex items-center justify-between group">
                  <span>Sustainability</span>
                  <span className="text-slate-400 group-hover:text-black">∨</span>
                </Link>
              </li>
              <li>
                <Link href="#overview" className="hover:text-black flex items-center justify-between group">
                  <span>Knowledge Hub</span>
                  <span className="text-slate-400 group-hover:text-black">∨</span>
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="hover:text-black flex items-center justify-between group">
                  <span>Achievements</span>
                  <span className="text-slate-400 group-hover:text-black">∨</span>
                </Link>
              </li>
              <li>
                <Link href="/brands-we-work-with" className="hover:text-black flex items-center justify-between group">
                  <span>Our Clients</span>
                  <span className="text-slate-400 group-hover:text-black">∨</span>
                </Link>
              </li>
              <li>
                <Link href="#media" className="hover:text-black flex items-center justify-between group">
                  <span>Media And Contacts</span>
                  <span className="text-slate-400 group-hover:text-black">∨</span>
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#0284c7] font-medium flex items-center justify-between group">
                  <span>Careers</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-50 text-[#0284c7] font-bold">Hiring</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Products matching Screenshot */}
          <div data-reveal="up" className="delay-150 space-y-4">
            <h3 className="font-bold text-xl text-black">
              Our Products
            </h3>
            <ul className="space-y-2.5 text-sm sm:text-base text-slate-700">
              <li>
                <Link href="#about" className="hover:text-black">
                  Factory
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-black">
                  Plastic
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-black">
                  Metal
                </Link>
              </li>
              <li>
                <Link href="#supply-chain" className="hover:text-black">
                  Export
                </Link>
              </li>
              <li>
                <a
                  href="#overview"
                  className="hover:text-black hover:underline"
                >
                  Download Catalog
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Certificates Seal Image matching Screenshot */}
          <div data-reveal="up" className="delay-200 space-y-4">
            <h3 className="font-bold text-xl text-black">
              Certificates
            </h3>
            <div className="relative w-full max-w-[280px] h-48 sm:h-52">
              <Image
                src="/cropped/certificates-exact.png"
                alt="LEED Platinum, Intertek ISO 9001:2015, Intertek FSSC 22000, GMP Certified"
                fill
                className="object-contain object-left-top"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Dark Bar */}
      <div className="w-full bg-[#161a22] py-4 text-slate-400 text-sm sm:text-base">
        <div className="w-[98%] max-w-[1920px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>
            {settings["footer_copyright"] ||
              settings["copyright_text"] ||
              "Copyright © 2024 - 2026 Noor Plastic Industries. All rights reserved."}
          </p>
          <div className="flex items-center gap-6">
            <Link href="#overview" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#overview" className="hover:text-white transition-colors">
              Terms of Services
            </Link>
            <Link href="#overview" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Scroll-to-Top Button matching Screenshot */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full border-2 border-[#5dade2] bg-white text-[#2980b9] shadow-xl hover:bg-sky-50 transition-all flex items-center justify-center active:scale-95 animate-in fade-in duration-200"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 stroke-[2.5]" />
        </button>
      )}
    </footer>
  );
}
