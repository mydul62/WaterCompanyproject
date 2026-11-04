"use client";

import React, { useEffect } from "react";
import Image from "next/image";

interface B2BBannerProps {
  onOpenRFQ?: () => void;
}

export default function B2BBanner({ onOpenRFQ }: B2BBannerProps) {
  useEffect(() => {
    const elements = document.querySelectorAll(".bento-section .rv");
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

  return (
    <section id="overview" className="w-full bento-section">
      <div className="bento-wrap">
        {/* Exact Floating Sky-Blue CTA Banner Card */}
        <div className="w-full rounded-2xl sm:rounded-3xl bg-gradient-to-r from-white via-[#eaf5fc] to-[#bfe6f9] border border-sky-100 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex flex-col md:flex-row items-center justify-between gap-6 mb-16 sm:mb-24">
          {/* Left: Exact Xclusive Logo */}
          <div className="relative h-12 sm:h-14 w-32 sm:w-40 shrink-0">
            <Image
              src="/cropped/xclusive-logo.png"
              alt="Xclusive Can Limited"
              fill
              className="object-contain object-left"
              priority
            />
          </div>

          {/* Center: Title & Description */}
          <div className="flex-1 text-center md:text-left space-y-1 sm:space-y-2">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-black tracking-tight">
              Packaging Solutions Always Made Right&reg;
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-slate-800 leading-relaxed max-w-3xl">
              With a diverse stock bottle portfolio and an innovative design team working to produce creative packaging
              solutions, we can help you find the perfect solution.
            </p>
          </div>

          {/* Right: Contact Us Button */}
          <div className="shrink-0">
            <button
              onClick={onOpenRFQ}
              className="px-8 py-3 rounded-xl border-2 border-black bg-white text-black font-bold text-sm sm:text-base hover:bg-black hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Modern Bento Header */}
        <header className="bento-top rv">
          <div>
            <span className="bento-ey">
              <i />
              About AquaPure
            </span>
            <h2 className="bento-title">
              Leading Drinking Water Company in{" "}
              <span className="bento-g">
                Bangladesh
                <svg viewBox="0 0 200 14" preserveAspectRatio="none">
                  <path d="M2 8 Q27 0 52 8 T102 8 T152 8 T198 8" />
                </svg>
              </span>
            </h2>
          </div>
          <div className="bento-intro">
            <p>
              AquaPure is a trusted manufacturer of packaged drinking water since 2014. From our modern plant in Gazipur,
              we purify and bottle safe water for homes, offices, hotels and retailers, backed by ISO 22000, GMP and
              HACCP certified systems.
            </p>
            <div className="bento-btns">
              <a href="#products" className="bento-btn pri">
                Explore Products
              </a>
              <button onClick={onOpenRFQ} className="bento-btn ghost">
                Contact Us
              </button>
            </div>
          </div>
        </header>

        {/* 4-Card Bento Grid */}
        <div className="bento-grid">
          {/* Bento Card 1: Our Products (span 7) */}
          <article className="bento-c prod rv">
            <div className="bento-ic">💧</div>
            <h2>Our Products</h2>
            <p>A complete range of packaged drinking water, made to the highest standards of safety, purity and taste.</p>
            <div className="bento-sizes">
              <span style={{ "--h": "12px" } as React.CSSProperties}>500 ml</span>
              <span style={{ "--h": "16px" } as React.CSSProperties}>1 L</span>
              <span style={{ "--h": "20px" } as React.CSSProperties}>1.5 L</span>
              <span style={{ "--h": "24px" } as React.CSSProperties}>5 L</span>
              <span style={{ "--h": "28px" } as React.CSSProperties}>20 L Jar</span>
            </div>
            <ul className="bento-ck">
              <li>Food-grade, BPA-free PET</li>
              <li>Tamper-proof sealed caps</li>
              <li>Multi-stage filtration</li>
              <li>UV and ozone treatment</li>
              <li>Every batch lab tested</li>
              <li>Custom label options</li>
            </ul>
          </article>

          {/* Bento Card 2: 10+ Years (span 5) */}
          <article className="bento-c big rv">
            <div className="bento-rp-box">
              <i />
              <i />
              <i />
            </div>
            <b>10+</b>
            <h3>Years of trusted purity</h3>
            <p>Serving thousands of homes, offices and businesses across Bangladesh.</p>
          </article>

          {/* Bento Card 3: Why Choose Us (span 5) */}
          <article className="bento-c why rv">
            <div className="bento-ic">🤝</div>
            <h2>Why Choose Us</h2>
            <p>Reliable supply and friendly service you can build a long-term partnership on.</p>
            <ol className="bento-why-list">
              <li>
                <em>01</em>
                <div>
                  <b>Competitive pricing</b>
                  <small>Fair rates for retail and bulk</small>
                </div>
              </li>
              <li>
                <em>02</em>
                <div>
                  <b>On-time delivery</b>
                  <small>Dependable schedules, every time</small>
                </div>
              </li>
              <li>
                <em>03</em>
                <div>
                  <b>Private label</b>
                  <small>Custom sizes and printing</small>
                </div>
              </li>
              <li>
                <em>04</em>
                <div>
                  <b>Dedicated support</b>
                  <small>A team for dealers and clients</small>
                </div>
              </li>
            </ol>
          </article>

          {/* Bento Card 4: Visual Bottle & Stats (span 7) */}
          <article className="bento-c vis rv">
            <div>
              <div className="bento-bot">
                <div className="bento-w" />
                <em>AQUAPURE</em>
              </div>
            </div>
            <div className="bento-sts">
              <div>
                <b>24/7</b>
                <span>Quality monitoring in our plant</span>
              </div>
              <div>
                <b>100%</b>
                <span>Food-grade, recyclable packaging</span>
              </div>
              <div>
                <b>5</b>
                <span>Bottle and jar sizes for every need</span>
              </div>
            </div>
          </article>
        </div>

        {/* Commitment to Quality & Sustainability Section */}
        <section className="bento-commit rv">
          <div>
            <span className="bento-ey lt">
              <i />
              Quality &amp; Sustainability
            </span>
            <h2>Our Commitment to Quality and Sustainability</h2>
            <p>
              Quality is not just a goal, it is our culture. We follow internationally recognised quality systems, reduce
              waste and energy use at every step, and design our packaging for recycling and circular-economy principles.
            </p>
            <div className="bento-bd">
              <span>ISO 22000</span>
              <span>GMP</span>
              <span>HACCP</span>
              <span>BSTI</span>
            </div>
          </div>
          <div className="bento-pl">
            <div>
              <em>01</em>
              <b>Certified</b>
              <small>Internationally recognised systems</small>
            </div>
            <div>
              <em>02</em>
              <b>Recyclable</b>
              <small>Packaging made to be reused</small>
            </div>
            <div>
              <em>03</em>
              <b>Low waste</b>
              <small>Less water and energy per bottle</small>
            </div>
            <div>
              <em>04</em>
              <b>Lab tested</b>
              <small>Purity checked every batch</small>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
