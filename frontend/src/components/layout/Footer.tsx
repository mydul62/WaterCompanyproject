"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronUp } from "lucide-react";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="w-full bg-white relative">
      {/* 4 Columns Main Footer Container (Screenshot 2026-11-04 130404.png) */}
      <div className="w-full max-w-[1480px] mx-auto px-6 sm:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand Info & Contacts */}
          <div className="space-y-5">
            {/* Logo */}
            <div className="relative h-12 w-36">
              <Image
                src="/cropped/xclusive-logo.png"
                alt="Xclusive Can Limited"
                fill
                className="object-contain object-left"
              />
            </div>

            <h3 className="font-bold text-base text-slate-900">
              Xclusive Can Limited
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                Plot#53/1, Block#B, Kaligonj Road, Majukhan, Gazipur, Dhaka, Bangladesh.
              </p>
              <p>
                Plot#B 196, BSCIC I/A, Tongi, Gazipur, Dhaka, Bangladesh
              </p>
            </div>

            <div className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              <p className="font-bold text-slate-900">Phone:</p>
              <p>Sales &amp; Marketing: +8801819343635, +8801680240524, +8801914238240</p>
              <p>Local Procurement: +8801818950946, +8801819312914</p>
              <p>Foreign Purchase: +8801841984208</p>
            </div>

            <div className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              <p className="font-bold text-slate-900">Email:</p>
              <p>Sales &amp; Marketing: marketing@qpail.com</p>
              <p>Procurement: commercial@qpail.com</p>
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
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-black">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li>
                <Link href="#footer" className="hover:text-black">
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
                <Link href="#footer" className="hover:text-black flex items-center justify-between group">
                  <span>Achievements</span>
                  <span className="text-slate-400 group-hover:text-black">∨</span>
                </Link>
              </li>
              <li>
                <Link href="#media" className="hover:text-black flex items-center justify-between group">
                  <span>Media And Contacts</span>
                  <span className="text-slate-400 group-hover:text-black">∨</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Products matching Screenshot */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-black">
              Our Products
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
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
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-black">
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

      {/* Bottom Full-Width Dark Bar matching Screenshot 2026-11-04 130404.png */}
      <div className="w-full bg-[#161a22] py-4 text-slate-400 text-xs sm:text-sm">
        <div className="w-full max-w-[1480px] mx-auto px-6 sm:px-12 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>
            Copyright &copy; 1992 - 2026 Xclusive Can Limited.
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
