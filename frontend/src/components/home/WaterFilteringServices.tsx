"use client";

import React from "react";

export default function WaterFilteringServices() {
  const openRFQ = () => {
    window.dispatchEvent(new CustomEvent("open-rfq"));
  };

  return (
    <section className="wfs-services" id="services">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700;800;900&display=swap');

        .wfs-services {
          position: relative;
          background: #f3f9ff;
          margin-top: 0;
          padding: 140px 20px 120px;
          min-height: 840px;
          overflow: hidden;
          font-family: 'League Spartan', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          color: #0a1f44;
          box-sizing: border-box;
        }
        .wfs-wave {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 180px;
          pointer-events: none;
        }
        .wfs-title {
          position: relative;
          text-align: center;
          font-size: clamp(30px, 4vw, 42px);
          line-height: 1.18;
          font-weight: 800;
          max-width: 780px;
          margin: 0 auto 56px;
          color: #001f4d;
          letter-spacing: -0.4px;
        }
        .wfs-stage {
          position: relative;
          width: 1020px;
          height: 560px;
          margin: 0 auto;
        }
        .wfs-circ {
          position: absolute;
          border-radius: 50%;
          background: #fff;
          pointer-events: none;
        }
        .wfs-c1 {
          width: 440px;
          height: 440px;
          left: 290px;
          top: 70px;
          opacity: 0.95;
          box-shadow: 0 0 50px rgba(255,255,255,0.8);
        }
        .wfs-c2 {
          width: 620px;
          height: 620px;
          left: 200px;
          top: 160px;
          opacity: 0.55;
        }
        .wfs-c3 {
          width: 800px;
          height: 800px;
          left: 110px;
          top: 240px;
          opacity: 0.35;
        }
        .wfs-man {
          position: absolute;
          left: 325px;
          top: 110px;
          width: 370px;
          height: auto;
          z-index: 2;
          user-select: none;
          pointer-events: none;
          filter: drop-shadow(0 15px 35px rgba(0, 40, 100, 0.14));
        }
        .wfs-card {
          position: absolute;
          width: 280px;
          height: 205px;
          background: #fff;
          border-radius: 16px;
          padding: 26px 24px 22px;
          text-align: center;
          box-shadow: 0 10px 35px rgba(30, 70, 140, 0.08);
          z-index: 3;
          box-sizing: border-box;
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease;
          cursor: pointer;
        }
        .wfs-card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 20px 48px rgba(30, 70, 140, 0.16);
        }
        .wfs-tl {
          left: 25px;
          top: 0;
        }
        .wfs-tr {
          left: 715px;
          top: 0;
        }
        .wfs-bl {
          left: 0;
          top: 265px;
        }
        .wfs-br {
          left: 740px;
          top: 265px;
        }
        .wfs-ic {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 48px;
          margin-bottom: 14px;
        }
        .wfs-ic svg {
          height: 44px;
          width: auto;
          max-width: 48px;
          display: inline-block;
          transition: transform 0.25s ease;
        }
        .wfs-card:hover .wfs-ic svg {
          transform: scale(1.12);
        }
        .wfs-card h3 {
          font-size: 21px;
          font-weight: 800;
          letter-spacing: 0.1px;
          color: #001f4d;
          margin-bottom: 8px;
          line-height: 25px;
          text-align: center;
          transition: color 0.2s ease;
        }
        .wfs-card:hover h3 {
          color: #00c8f5;
        }
        .wfs-card p {
          font-size: 14px;
          line-height: 22px;
          color: #556987;
          font-weight: 500;
          text-align: center;
          margin: 0;
        }

        @media (max-width: 1080px) and (min-width: 821px) {
          .wfs-stage {
            transform: scale(0.85);
            transform-origin: top center;
            margin-bottom: -60px;
          }
        }

        @media (max-width: 820px) {
          .wfs-services {
            padding-top: 130px;
            padding-bottom: 70px;
          }
          .wfs-stage {
            width: 100%;
            max-width: 440px;
            height: auto;
            display: grid;
            gap: 18px;
            padding-bottom: 0;
          }
          .wfs-circ {
            display: none;
          }
          .wfs-card,
          .wfs-man {
            position: static;
            width: 100%;
          }
          .wfs-man {
            order: 5;
            width: 80%;
            max-width: 320px;
            margin: 15px auto 0;
          }
          .wfs-card {
            height: auto;
            padding: 24px 20px;
            text-align: center;
          }
          .wfs-card h3 {
            font-size: 20px;
            line-height: 24px;
          }
          .wfs-card p {
            font-size: 14px;
            line-height: 20px;
          }
          .wfs-title {
            font-size: 28px;
            line-height: 34px;
            margin-bottom: 34px;
          }
        }
      `}</style>

      {/* Top Wave Divider */}
      <svg
        className="wfs-wave"
        viewBox="0 0 1912 180"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0H1912V175C1500,150 1100,70 820,70C500,70 250,130 0,130Z"
          fill="#fff"
        />
      </svg>

      {/* Section Heading */}
      <h2 className="wfs-title">
        Protect Your Family with Best Water
        <br />
        Filtering System Services
      </h2>

      {/* Stage Container */}
      <div className="wfs-stage">
        {/* Concentric Glow Discs */}
        <i className="wfs-circ wfs-c3" />
        <i className="wfs-circ wfs-c2" />
        <i className="wfs-circ wfs-c1" />

        {/* 1. Top-Left: Residential Waters */}
        <div className="wfs-card wfs-tl" onClick={openRFQ}>
          <span className="wfs-ic">
            <svg
              viewBox="0 0 24 36"
              fill="none"
              stroke="#00c8f5"
              strokeWidth="2.2"
              strokeLinejoin="round"
            >
              <rect x="8" y="1.5" width="8" height="4" rx=".8" />
              <path d="M5 5.5h14a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-24a2 2 0 0 1 2-2z" />
              <path d="M3 11h18M3 29h18" />
              <path d="M12 15c2.2 2.8 3.2 4.2 3.2 5.7a3.2 3.2 0 0 1-6.4 0c0-1.5 1-2.9 3.2-5.7z" />
            </svg>
          </span>
          <h3>Residential Waters</h3>
          <p>
            Lorem ipsum dolor sit amet adilit
            <br />
            sed elusmte mpor.
          </p>
        </div>

        {/* 2. Top-Right: Commercial Waters */}
        <div className="wfs-card wfs-tr" onClick={openRFQ}>
          <span className="wfs-ic">
            <svg
              viewBox="0 0 40 40"
              fill="none"
              stroke="#00c8f5"
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <path d="M24 4l3-2 4 4-2 3M21 7l12 12-4 3" />
              <path d="M26 6l5 5-4 4-5-5z" />
              <path d="M19 14L6 27a3 3 0 0 0 0 4.2l2.8 2.8a3 3 0 0 0 4.2 0L26 21" />
              <path d="M13 22l5 5M9 26l5 5M16 19l5 5" />
            </svg>
          </span>
          <h3>Commercial Waters</h3>
          <p>
            Lorem ipsum dolor sit amet adilit
            <br />
            sed elusmte mpor.
          </p>
        </div>

        {/* 3. Bottom-Left: Filtration Plants */}
        <div className="wfs-card wfs-bl" onClick={openRFQ}>
          <span className="wfs-ic">
            <svg
              viewBox="0 0 40 40"
              fill="none"
              stroke="#00c8f5"
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <path d="M9 5c1.5 2 2 3 2 4a2 2 0 0 1-4 0c0-1 .5-2 2-4zM20 5c1.5 2 2 3 2 4a2 2 0 0 1-4 0c0-1 .5-2 2-4zM31 5c1.5 2 2 3 2 4a2 2 0 0 1-4 0c0-1 .5-2 2-4z" />
              <path d="M3 18h34M3 26c4-3 7-3 11 0s7 3 11 0 7-3 12 0M3 34c4-3 7-3 11 0s7 3 11 0 7-3 12 0" />
            </svg>
          </span>
          <h3>Filtration Plants</h3>
          <p>
            Lorem ipsum dolor sit amet adilit
            <br />
            sed elusmte mpor.
          </p>
        </div>

        {/* 4. Bottom-Right: Water Softening */}
        <div className="wfs-card wfs-br" onClick={openRFQ}>
          <span className="wfs-ic">
            <svg
              viewBox="0 0 40 40"
              fill="none"
              stroke="#00c8f5"
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <path d="M20 2c4.5 5.5 6.5 8.8 6.5 12a6.5 6.5 0 0 1-13 0c0-3.2 2-6.5 6.5-12z" />
              <path d="M17 15.5c.3 2 1.5 3.2 3.3 3.5" />
              <path d="M13 25l-4 3-6-4v-3l5-1 5 2h6a2 2 0 0 1 0 4h-6" />
              <path d="M27 25l4 3 6-4v-3l-5-1-5 2" />
              <path d="M13 25l7 7 7-7" />
            </svg>
          </span>
          <h3>Water Softening</h3>
          <p>
            Lorem ipsum dolor sit amet adilit
            <br />
            sed elusmte mpor.
          </p>
        </div>

        {/* Center Delivery Specialist Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="wfs-man"
          alt="Water delivery man carrying a water jar"
          src="/acuasafe/section-delivery-man.png"
        />
      </div>
    </section>
  );
}
