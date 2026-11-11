"use client";

import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { EnvironmentalPractice } from "@/data/sustainabilityData";

interface SustainabilityDetailModalProps {
  practice: EnvironmentalPractice | null;
  practices: EnvironmentalPractice[];
  backgroundImage: string;
  onSelectPractice: (practice: EnvironmentalPractice) => void;
  onClose: () => void;
}

export default function SustainabilityDetailModal({
  practice,
  practices,
  backgroundImage,
  onSelectPractice,
  onClose,
}: SustainabilityDetailModalProps) {
  useEffect(() => {
    if (!practice) return;
    const currentIndex = practices.findIndex((p) => p.id === practice.id);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && currentIndex >= 0) {
        onSelectPractice(practices[(currentIndex + 1) % practices.length]);
      }
      if (e.key === "ArrowLeft" && currentIndex >= 0) {
        onSelectPractice(practices[(currentIndex - 1 + practices.length) % practices.length]);
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [practice, practices, onSelectPractice, onClose]);

  if (!practice) return null;

  const currentIdx = practices.findIndex((p) => p.id === practice.id);
  const prevPractice =
    currentIdx >= 0 ? practices[(currentIdx - 1 + practices.length) % practices.length] : null;
  const nextPractice =
    currentIdx >= 0 ? practices[(currentIdx + 1) % practices.length] : null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={practice.fullTitle}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl bg-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Architectural Foliage Facade Backdrop */}
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        {/* Top-Right Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close environmental practice details"
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/35 hover:bg-black/60 text-white/90 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Inner Frosted Smoke Glass Panel */}
        <div className="relative z-10 m-4 sm:m-7 rounded-lg bg-[#192b2f]/68 backdrop-blur-md border border-white/20 p-6 sm:p-10 lg:p-12 text-white">
          <div className="mb-6 sm:mb-8 pr-8">
            <p className="text-xl sm:text-2xl lg:text-[1.85rem] font-light text-white/90 leading-snug">
              {practice.titleTop}
            </p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              {practice.titleBottom}
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">
            {/* Circular Frosted Halo Around Icon */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/15 border border-white/25 shadow-lg flex items-center justify-center shrink-0 p-5">
              <img
                src={practice.icon}
                alt={practice.fullTitle}
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-sm sm:text-base lg:text-[1.0625rem] leading-relaxed text-white/95 font-medium flex-1">
              {practice.description}
            </p>
          </div>

          {/* Subtle Prev/Next Practice Controls */}
          <div className="mt-8 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white/80">
            {prevPractice ? (
              <button
                type="button"
                onClick={() => onSelectPractice(prevPractice)}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{prevPractice.fullTitle}</span>
              </button>
            ) : (
              <span />
            )}

            <span className="text-white/55 font-medium hidden sm:inline">
              {currentIdx + 1} / {practices.length}
            </span>

            {nextPractice ? (
              <button
                type="button"
                onClick={() => onSelectPractice(nextPractice)}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              >
                <span>{nextPractice.fullTitle}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
