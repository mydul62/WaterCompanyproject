import React from "react";

export default function UsgbcLeedSeal({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 260"
      className={className}
      role="img"
      aria-label="U.S. Green Building Council LEED Platinum Seal"
    >
      <defs>
        <radialGradient id="leed-silver-disc" cx="35%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#e5e7eb" />
          <stop offset="45%" stopColor="#9ca3af" />
          <stop offset="85%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#4b5563" />
        </radialGradient>
        <linearGradient id="leed-ring-rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f3f4f6" />
          <stop offset="50%" stopColor="#9ca3af" />
          <stop offset="100%" stopColor="#4b5563" />
        </linearGradient>
        <path id="leed-top-arc" d="M 38,130 A 92,92 0 1,1 222,130" />
        <path id="leed-bottom-arc" d="M 36,134 A 94,94 0 0,0 224,134" />
      </defs>

      {/* Outer Metallic Silver Bevel Ring */}
      <circle
        cx="130"
        cy="130"
        r="125"
        fill="url(#leed-silver-disc)"
        stroke="#d1d5db"
        strokeWidth="4"
      />
      <circle cx="130" cy="130" r="113" fill="none" stroke="rgba(255,255,255,0.48)" strokeWidth="2" />
      <circle cx="130" cy="130" r="76" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2.5" />

      {/* Top Curved USGBC Text */}
      <text
        fill="#ffffff"
        fontSize="16"
        fontWeight="700"
        letterSpacing="2.4"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        <textPath href="#leed-top-arc" startOffset="50%" textAnchor="middle">
          U.S. GREEN BUILDING COUNCIL
        </textPath>
      </text>

      {/* Side Accent Stars */}
      <text x="34" y="138" fill="#ffffff" fontSize="14" fontWeight="700">
        ★
      </text>
      <text x="213" y="138" fill="#ffffff" fontSize="14" fontWeight="700">
        ★
      </text>

      {/* Center Stylized Three-Leaf Crest */}
      <g transform="translate(130, 128)" fill="url(#leed-ring-rim)" stroke="#ffffff" strokeWidth="1.5">
        <path d="M-8,12 C-28,6 -42,-10 -34,-28 C-24,-22 -14,-10 -6,2 Z" fill="#ffffff" />
        <path d="M8,12 C28,6 42,-10 34,-28 C24,-22 14,-10 6,2 Z" fill="#ffffff" />
        <path d="M0,-44 C14,-24 14,-2 4,18 L-4,18 C-14,-2 -14,-24 0,-44 Z" fill="#ffffff" />
        <rect x="-2.5" y="16" width="5" height="20" rx="2" fill="#ffffff" />
      </g>

      {/* Bottom Curved Recognition Text */}
      <text
        fill="#f9fafb"
        fontSize="13.5"
        fontWeight="700"
        letterSpacing="2.6"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        <textPath href="#leed-bottom-arc" startOffset="50%" textAnchor="middle">
          LEED PLATINUM STANDARD
        </textPath>
      </text>
    </svg>
  );
}
