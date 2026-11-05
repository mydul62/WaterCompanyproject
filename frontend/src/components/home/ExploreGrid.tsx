"use client";

import React, { useEffect } from "react";
import Link from "next/link";

interface ExploreItem {
  icon: string;
  title: string;
  description: string;
  href: string;
}

const EXPLORE_ITEMS: ExploreItem[] = [
  {
    icon: "🛍️",
    title: "Find Our Products",
    description: "Browse our complete range of bottles and jars for every need.",
    href: "#products",
  },
  {
    icon: "📖",
    title: "Our Story",
    description: "Learn about our journey to becoming a trusted water brand in Bangladesh.",
    href: "#about",
  },
  {
    icon: "👥",
    title: "Careers",
    description: "Join our team and build a career in beverage manufacturing.",
    href: "#overview",
  },
  {
    icon: "🌱",
    title: "Sustainability",
    description: "Discover our commitment to environmental responsibility and recyclable packaging.",
    href: "#overview",
  },
  {
    icon: "🔬",
    title: "Research & Development",
    description: "Explore our innovation in water treatment and packaging technology.",
    href: "#supply-chain",
  },
  {
    icon: "🏭",
    title: "Plant Tour",
    description: "Learn about our purification, bottling and quality-control facilities.",
    href: "#facilities",
  },
  {
    icon: "✍️",
    title: "Blog",
    description: "Read industry insights, hydration tips and company news.",
    href: "#media",
  },
  {
    icon: "📊",
    title: "Case Studies",
    description: "See how we’ve helped businesses solve their water supply challenges.",
    href: "#about",
  },
  {
    icon: "🏭",
    title: "About Xclusive",
    description: "Understand our values, mission, and what makes us different.",
    href: "/our-business",
  },
  {
    icon: "🪣",
    title: "About Q Pail",
    description: "Learn about our Q Pail brand and specialized packaging solutions.",
    href: "/q-pail",
  },
  {
    icon: "🎬",
    title: "Videos",
    description: "Watch our production process and company videos.",
    href: "#about",
  },
  {
    icon: "🤝",
    title: "Brands We Work With",
    description: "See the trusted brands and partners that work with AquaPure.",
    href: "#footer",
  },
  {
    icon: "⭐",
    title: "Visitor Spotlight",
    description: "See who visits our plant and learn about our partnerships.",
    href: "#about",
  },
];

export default function ExploreGrid() {
  useEffect(() => {
    const elements = document.querySelectorAll(".explore-section .rv");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="explore" className="w-full explore-section">
      <div className="explore-wrap">
        {/* Section Header */}
        <div className="explore-head rv">
          <span className="explore-pill">
            <i />
            Discover AquaPure
          </span>
          <h2>
            Explore <span>More</span>
          </h2>
          <p>
            Discover more about AquaPure’s capabilities, sustainability initiatives, career opportunities and industry
            insights.
          </p>
        </div>

        {/* 12-Card Modern Interactive Grid */}
        <div className="explore-grid" id="explore-cards-grid">
          {EXPLORE_ITEMS.map((item, index) => {
            const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;
            return (
              <Link
                key={index}
                href={item.href}
                className="explore-card rv"
                style={{ "--i": index } as React.CSSProperties}
                onPointerMove={handlePointerMove}
              >
                <div className="explore-top">
                  <div className="explore-ic">{item.icon}</div>
                  <span className="explore-no">{formattedIndex}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="explore-go">
                  Learn more <b>&rarr;</b>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
