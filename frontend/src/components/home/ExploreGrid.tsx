"use client";

import React from "react";
import Link from "next/link";

const CARDS_DATA = [
  {
    title: "Find Our Products",
    description: "Browse our complete range of tin cans, plastic bottles, and packaging solutions.",
    href: "#products",
  },
  {
    title: "Our Story",
    description: "Learn about our journey from 1992 to becoming Bangladesh's leading packaging manufacturer.",
    href: "#about",
  },
  {
    title: "Careers",
    description: "Join our team and build a career in packaging manufacturing.",
    href: "#overview",
  },
  {
    title: "Sustainability",
    description: "Discover our commitment to environmental responsibility and sustainable packaging.",
    href: "#overview",
  },
  {
    title: "Research & Development",
    description: "Explore our innovation in packaging technology and material science.",
    href: "#supply-chain",
  },
  {
    title: "Tool Room",
    description: "Learn about our precision tooling and custom mold development capabilities.",
    href: "#supply-chain",
  },
  {
    title: "Blog",
    description: "Read industry insights, packaging trends, and company news.",
    href: "#media",
  },
  {
    title: "Case Studies",
    description: "See how we've helped businesses solve their packaging challenges.",
    href: "#about",
  },
  {
    title: "About Xclusive",
    description: "Understand our values, mission, and what makes us different.",
    href: "#about",
  },
  {
    title: "About Q Pail",
    description: "Learn about our Q Pail brand and specialized packaging solutions.",
    href: "#products",
  },
  {
    title: "Videos",
    description: "Watch our manufacturing processes and company videos.",
    href: "#about",
  },
  {
    title: "Brands We Work With",
    description: "See the trusted brands that partner with Xclusive Can Limited.",
    href: "#footer",
  },
  {
    title: "Visitor Spotlight",
    description: "See who visits our facilities and learn about our partnerships.",
    href: "#about",
  },
];

export default function ExploreGrid() {
  return (
    <section id="explore" className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1480px] mx-auto px-6 sm:px-12">
        {/* Section Header matching Screenshot 2026-11-04 130357.png */}
        <div className="text-center space-y-3 mb-12 sm:mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight">
            Explore More
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Discover more about Xclusive Can Limited&apos;s capabilities, sustainability initiatives, career
            opportunities, and industry insights.
          </p>
        </div>

        {/* 3-Column Card Grid matching Screenshot 2026-11-04 130357.png */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARDS_DATA.map((card, idx) => (
            <Link
              key={idx}
              href={card.href}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow space-y-2 block"
            >
              <h3 className="text-lg sm:text-xl font-bold text-black tracking-tight">
                {card.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
