"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="w-full bg-white border-t border-slate-200 relative">
      {/* 4-Column Main Content matching Screenshot 2026-11-04 130404.png */}
      <div className="max-w-[1480px] mx-auto px-6 sm:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 text-sm">
          {/* Column 1: Logo & Company Contact (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <div className="relative flex items-center font-black text-[#0d226b] text-2xl tracking-tighter">
                  <span className="text-3xl font-black">X</span>
                  <div className="absolute top-0.5 left-1.5 w-3 h-3 rounded-full border-2 border-[#0d226b] bg-cyan-400" />
                  <span className="text-xl font-bold ml-0.5">clusive</span>
                </div>
                <div className="ml-1 border border-[#0d226b] px-1 py-0.2 rounded text-[8px] font-bold uppercase tracking-wider text-[#0d226b]">
                  Can Limited
                </div>
              </div>
            </div>

            <div className="text-slate-800 text-xs sm:text-sm font-semibold">
              Xclusive Can Limited
            </div>

            {/* Addresses */}
            <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
              <p>Plot#53/1, Block#B, Kaligonj Road, Majukhan, Gazipur, Dhaka, Bangladesh.</p>
              <p>Plot#B 196, BSCIC I/A, Tongi, Gazipur, Dhaka, Bangladesh</p>
            </div>

            {/* Phones */}
            <div className="text-xs text-slate-700 space-y-1">
              <div className="font-semibold text-slate-900">Phone:</div>
              <p>Sales &amp; Marketing: +8801819343635, +8801680240524, +8801914238240</p>
              <p>Local Procurement: +8801818950946, +8801819312914</p>
              <p>Foreign Purchase: +8801841984208</p>
            </div>

            {/* Emails */}
            <div className="text-xs text-slate-700 space-y-1">
              <div className="font-semibold text-slate-900">Email:</div>
              <p>Sales &amp; Marketing: marketing@qpail.com</p>
              <p>Procurement: commercial@qpail.com</p>
            </div>

            {/* Social Icons matching Screenshot (black squares with white icons) */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-black text-black tracking-tight">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-slate-700">
              <li>
                <a href="#about" className="hover:text-black">FAQs</a>
              </li>
              <li>
                <a href="/" className="text-[#3b7999] hover:underline font-medium">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-black flex items-center gap-1">
                  About Us <span className="text-[10px]">&#709;</span>
                </a>
              </li>
              <li>
                <a href="#overview" className="hover:text-black flex items-center gap-1">
                  Sustainability <span className="text-[10px]">&#709;</span>
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-black flex items-center gap-1">
                  Knowledge Hub <span className="text-[10px]">&#709;</span>
                </a>
              </li>
              <li>
                <a href="#overview" className="hover:text-black flex items-center gap-1">
                  Achievements <span className="text-[10px]">&#709;</span>
                </a>
              </li>
              <li>
                <a href="#media" className="hover:text-black flex items-center gap-1">
                  Media And Contacts <span className="text-[10px]">&#709;</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Products (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-base font-black text-black tracking-tight">Our Products</h4>
            <ul className="space-y-2.5 text-xs text-slate-700">
              <li>
                <a href="#products" className="hover:text-black">Factory</a>
              </li>
              <li>
                <a href="#products" className="hover:text-black">Plastic</a>
              </li>
              <li>
                <a href="#products" className="hover:text-black">Metal</a>
              </li>
              <li>
                <a href="#supply-chain" className="hover:text-black">Export</a>
              </li>
              <li>
                <a href="#products" className="hover:text-black">Download Catalog</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Certificates (lg:col-span-3) - Exact Cropped Seals from Screenshot */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-black text-black tracking-tight">Certificates</h4>
            <div className="relative w-full max-w-[320px] aspect-[380/360]">
              <Image
                src="/cropped/certificates-exact.png"
                alt="LEED Platinum, ISO 9001, FSSC 22000, GMP Certified"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Charcoal Bar matching Screenshot 2026-11-04 130404.png */}
      <div className="w-full bg-[#1c1c1c] text-white py-4 px-6 sm:px-12 text-xs">
        <div className="max-w-[1480px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-300">
            Copyright &copy; 1992 - 2026 Xclusive Can Limited.
          </p>

          <div className="flex items-center gap-6 text-slate-300">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Services</Link>
            <Link href="/cookies" className="hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top Button matching Screenshot bottom right */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#598ea8] hover:bg-[#477a94] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6 stroke-[2.5]" />
      </button>
    </footer>
  );
}
