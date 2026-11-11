"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ChevronDown,
  Wrench,
} from "lucide-react";

interface GallerySlide {
  src: string;
  title: string;
  caption?: string;
}

interface GalleryCardItem {
  id: number;
  title: string;
  coverImage: string;
  slides: GallerySlide[];
}

const GALLERY_CARDS: GalleryCardItem[] = [
  {
    id: 1,
    title: "CNC Milling & High-Precision Tooling",
    coverImage:
      "https://api.xclusivecanltd.com/files/public/uploads/images/122025/22-1764578175589.jpg",
    slides: [
      {
        src: "https://api.xclusivecanltd.com/files/public/uploads/images/122025/22-1764578175589.jpg",
        title: "5-Axis High-Speed CNC Machining Center",
        caption: "High-precision spindle milling hardened mold alloy cores with micron-level accuracy.",
      },
      {
        src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80",
        title: "Automated Spindle Cutting in Action",
        caption: "Pressurized synthetic coolant ensuring mirror-finish surface quality during deep cavity milling.",
      },
      {
        src: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1600&q=80",
        title: "Digital CNC Toolpath Optimization",
        caption: "CAD/CAM programmed trajectories for optimal tool life and cycle speed.",
      },
      {
        src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
        title: "In-Process Precision Telemetry",
        caption: "Laser probe checking cutter dimensional tolerances in real-time.",
      },
    ],
  },
  {
    id: 2,
    title: "Wire EDM Spark Erosion Bay",
    coverImage:
      "https://api.xclusivecanltd.com/files/public/uploads/images/122025/Tool-Room-3-1764648592595.jpg",
    slides: [
      {
        src: "https://api.xclusivecanltd.com/files/public/uploads/images/122025/Tool-Room-3-1764648592595.jpg",
        title: "Submerged Wire EDM Machining Tank",
        caption: "Submerged brass wire spark-eroding complex contours and razor-sharp radii in tool steel.",
      },
      {
        src: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80",
        title: "Die-Sinker Spark Erosion Unit",
        caption: "Custom graphite electrodes sinking micro-features into pre-hardened mold steel blocks.",
      },
      {
        src: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1600&q=80",
        title: "Micro-Precision Wire Guiding Head",
        caption: "Continuous brass wire maintaining zero vertical taper drift on deep mold passes.",
      },
      {
        src: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1600&q=80",
        title: "Finished Core Inserts & Precision Inserts",
        caption: "High-precision core inserts prepared for dimensional verification and assembly.",
      },
    ],
  },
  {
    id: 3,
    title: "Surface Grinding & Mirror Lapping",
    coverImage:
      "https://api.xclusivecanltd.com/files/public/uploads/images/122025/IMG-20251109-130659705-HDR-PORTRAIT-upscayl-2x-upscayl-standard-4x-1764648646339.jpg",
    slides: [
      {
        src: "https://api.xclusivecanltd.com/files/public/uploads/images/122025/IMG-20251109-130659705-HDR-PORTRAIT-upscayl-2x-upscayl-standard-4x-1764648646339.jpg",
        title: "Hydraulic Surface Grinding Machine",
        caption: "Rotary magnetic chuck delivering Ra < 0.2µm optical flatness across mold parting plates.",
      },
      {
        src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80",
        title: "High-Power Electromagnetic Chuck",
        caption: "Ensuring rigid, vibration-free clamping during precision finishing passes.",
      },
      {
        src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
        title: "Hand-Lapped Diamond Mirror Polish",
        caption: "Manual diamond compound polishing preventing mold sticking and plastic burrs.",
      },
      {
        src: "https://images.unsplash.com/photo-1581091870621-1e9b2512f718?auto=format&fit=crop&w=1600&q=80",
        title: "Granite Surface Plate Flatness Check",
        caption: "Zero-runout verification using digital micrometer indicators.",
      },
    ],
  },
  {
    id: 4,
    title: "Precision Lathe Turning & Cylindrical Tooling",
    coverImage:
      "https://api.xclusivecanltd.com/files/public/uploads/images/122025/IMG-20251109-134305764-HDR-PORTRAIT-1764651460591.jpg",
    slides: [
      {
        src: "https://api.xclusivecanltd.com/files/public/uploads/images/122025/IMG-20251109-134305764-HDR-PORTRAIT-1764651460591.jpg",
        title: "Heavy-Duty Tool Room Turning Center",
        caption: "Turning hardened cylindrical stock for multi-cavity injection cores and neck rings.",
      },
      {
        src: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1600&q=80",
        title: "Carbide Thread & Taper Profiling",
        caption: "Precision thread profiling for packaging neck finishes and tamper-evident closures.",
      },
      {
        src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80",
        title: "Internal Concentric Bore Machining",
        caption: "Precision boring maintaining smooth guide bush travel under thermal expansion.",
      },
      {
        src: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1600&q=80",
        title: "Precision Ground Core Pins",
        caption: "High-hardness core pins ready for ultrasonic cleaning and assembly.",
      },
    ],
  },
  {
    id: 5,
    title: "Mold Assembly & Blue-Spotting Bench",
    coverImage:
      "https://api.xclusivecanltd.com/files/public/uploads/images/122025/IMG-20251109-134127254-HDR-PORTRAIT-1764651467357.jpg",
    slides: [
      {
        src: "https://api.xclusivecanltd.com/files/public/uploads/images/122025/IMG-20251109-134127254-HDR-PORTRAIT-1764651467357.jpg",
        title: "Mold Fitting & Blue-Spotting Bench",
        caption: "Master technicians checking 100% airtight parting-line contact with Prussian blue paste.",
      },
      {
        src: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1600&q=80",
        title: "Hot-Runner Manifold Integration",
        caption: "Multi-zone thermal balanced runner manifolds fitted with precision thermocouples.",
      },
      {
        src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80",
        title: "Hydraulic Core Puller Synchronization",
        caption: "Dry-cycling mechanical sliders, ejector pins, and interlocks before production trials.",
      },
      {
        src: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80",
        title: "Completed Multi-Cavity Mold Assembly",
        caption: "Assembled mold base ready for crane hoisting and cleanroom pilot runs.",
      },
    ],
  },
  {
    id: 6,
    title: "Optical CMM Metrology & Inspection Stage",
    coverImage:
      "https://api.xclusivecanltd.com/files/public/uploads/images/122025/IMG-20251109-134740442-HDR-PORTRAIT-1764651472146.jpg",
    slides: [
      {
        src: "https://api.xclusivecanltd.com/files/public/uploads/images/122025/IMG-20251109-134740442-HDR-PORTRAIT-1764651472146.jpg",
        title: "3D Coordinate Measuring Machine (CMM)",
        caption: "Automated ruby stylus measuring critical mold coordinates against original 3D CAD data.",
      },
      {
        src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
        title: "Non-Contact Laser 3D Scanning",
        caption: "Color-coded deviation heat maps validating microscopic wall thicknesses.",
      },
      {
        src: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1600&q=80",
        title: "Rockwell Steel Hardness Testing",
        caption: "Validating hardened H13/2344 core blocks satisfy specified HRC tolerances.",
      },
      {
        src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80",
        title: "QA Sign-off & Pilot Certification",
        caption: "Official quality inspection certification signed before releasing molds to production lines.",
      },
    ],
  },
  {
    id: 7,
    title: "Tool Room Master Workshop & Engineering Floor",
    coverImage:
      "https://api.xclusivecanltd.com/files/public/uploads/images/122025/WhatsApp-Image-2025-11-27-at-10-01-24-AM-upscayl-2x-upscayl-standard-4x-1764651474874.jpg",
    slides: [
      {
        src: "https://api.xclusivecanltd.com/files/public/uploads/images/122025/WhatsApp-Image-2025-11-27-at-10-01-24-AM-upscayl-2x-upscayl-standard-4x-1764651474874.jpg",
        title: "Tool Room Master Engineering Hall",
        caption: "Panoramic view of our world-class tooling facility at Xclusive Can Limited, Gazipur.",
      },
      {
        src: "https://api.xclusivecanltd.com/files/public/uploads/images/112025/IMG-20251109-130659705-HDR-PORTRAIT-upscayl-2x-upscayl-standard-4x-1764497084873.jpg",
        title: "Precision Machining & EDM Avenue",
        caption: "Climate-controlled workshop ensuring zero thermal expansion during high-precision tooling.",
      },
      {
        src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
        title: "Overhead 10-Ton Crane & Heavy Die Bay",
        caption: "Safe hydraulic hoisting and transfer of multi-ton steel molds across production bays.",
      },
      {
        src: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80",
        title: "Dedicated Preventative Maintenance Bay",
        caption: "Scheduled ultrasonic cleaning, cavity relapping, and spare component inventory.",
      },
    ],
  },
];

export default function ToolRoomPage() {
  // Modal / Slider Lightbox State
  const [activeCard, setActiveCard] = useState<GalleryCardItem | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Open modal for a specific card
  const handleOpenPreview = (card: GalleryCardItem) => {
    setActiveCard(card);
    setCurrentSlideIndex(0);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setActiveCard(null);
      setCurrentSlideIndex(0);
    }, 200);
  };

  // Next Slide
  const handleNextSlide = useCallback(() => {
    if (!activeCard) return;
    setCurrentSlideIndex((prev) => (prev + 1) % activeCard.slides.length);
  }, [activeCard]);

  // Prev Slide
  const handlePrevSlide = useCallback(() => {
    if (!activeCard) return;
    setCurrentSlideIndex((prev) => (prev - 1 + activeCard.slides.length) % activeCard.slides.length);
  }, [activeCard]);

  // Keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseModal();
      if (e.key === "ArrowRight") handleNextSlide();
      if (e.key === "ArrowLeft") handlePrevSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, handleNextSlide, handlePrevSlide]);

  return (
    <div className="min-h-screen bg-[#f4f8fb] text-[#0a1f33] font-sans antialiased">
      <Navbar />

      <main className="relative w-full">
        {/* ============================================================ */}
        {/* 1. HERO SECTION: FULL-HEIGHT (100VH) TOOL ROOM SHOWCASE      */}
        {/* ============================================================ */}
        <section
          id="tool-hero"
          aria-label="Tool Room page background image/background video/background moving image section"
          className="relative w-full min-h-[540px] sm:min-h-[640px] lg:h-screen lg:min-h-[800px] bg-[#0a1f33] overflow-hidden flex flex-col justify-between items-center select-none"
        >
          {/* Background Hero Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="https://api.xclusivecanltd.com/files/public/uploads/images/112025/IMG-20251109-130659705-HDR-PORTRAIT-upscayl-2x-upscayl-standard-4x-1764497084873.jpg"
              alt="Tool Room page background image"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-90 scale-102 transition-transform duration-1000 ease-out"
            />
            {/* Multi-layer Gradient Vignettes */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f33] via-black/40 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,31,51,0.6)_100%)]" />
          </div>

          {/* Top Spacer to account for Navbar */}
          <div className="h-28 sm:h-36 shrink-0" />

          {/* Centered Tool Room Typography */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-bold shadow-xl shadow-black/20">
              <Wrench className="w-4 h-4 text-[#38bdf8] animate-pulse" />
              <span>Center for Advanced Micron-Precision Mold Engineering</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-[0.2em] sm:tracking-[0.25em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] uppercase pl-[0.2em]">
              Tool Room
            </h1>

            <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] font-bold text-[#38bdf8] drop-shadow-lg pl-[0.3em] max-w-2xl mx-auto">
              European CNC Milling &bull; Wire EDM Spark Erosion &bull; Multi-Cavity Molds
            </p>
          </div>

          {/* Animated Scroll Down Indicator */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("tool-dynamic");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="relative z-10 pb-8 sm:pb-12 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="text-[11px] uppercase tracking-widest font-semibold group-hover:tracking-[0.25em] transition-all">
              Explore Machineries &amp; Gallery
            </span>
            <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5 backdrop-blur-sm group-hover:border-[#38bdf8] transition-colors">
              <div className="w-1.5 h-3 rounded-full bg-[#38bdf8] animate-bounce" />
            </div>
          </button>
        </section>

        {/* ============================================================ */}
        {/* CURTAIN REVEAL BODY: Rises smoothly over the hero on scroll   */}
        {/* ============================================================ */}
        <div
          id="curtain-reveal"
          className="relative bg-[#f4f8fb]"
        >
          {/* ============================================================ */}
          {/* 2. DYNAMIC CONTENT SECTION: Machineries & Work Process       */}
          {/* ============================================================ */}
          <section
            id="tool-dynamic"
            aria-label="Tool Room page dynamic section"
            className="scroll-mt-20 py-14 sm:py-16 lg:py-20 2xl:py-24"
          >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full flex flex-col items-center gap-8 md:gap-12 lg:gap-16 2xl:gap-20">
              {/* BLOCK 1: Machineries */}
              <div className="w-full flex flex-col gap-4 sm:gap-5 lg:gap-6 2xl:gap-8">
                <h3 className="font-bold text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl text-[#0a1f33]">
                  Machineries
                </h3>
                <p className="font-normal whitespace-pre-line text-sm sm:text-base lg:text-lg 2xl:text-xl text-[#4a5f73] leading-relaxed">
                  The Tool Room at Xclusive Can Limited is the heart of our precision engineering operations, equipped with a diverse range of advanced machinery that ensures uncompromising accuracy and quality. Our facility features high-speed CNC milling machines, EDM (Electrical Discharge Machines), surface grinders, lathes, and precision drilling equipment. Each machine is carefully selected and regularly upgraded to meet evolving production demands and technological advancements. The CNC units allow us to craft intricate mold components with micron-level precision, while EDM machines enable complex shapes and fine finishes that traditional cutting methods cannot achieve. Surface grinders ensure smooth and flawless mold surfaces for consistent product release and durability.
                  {"\n\n"}
                  Beyond the equipment itself, our tool room is powered by a team of skilled engineers and technicians who blend craftsmanship with automation. Every machine is meticulously calibrated and maintained under strict quality protocols, ensuring continuous performance and minimal downtime. Together, our technology and talent create molds that not only meet but exceed international standards for packaging precision, longevity, and reliability.
                </p>
                <div>
                  <a
                    href="#tool-gallery"
                    className="inline-block w-fit px-6 py-2.5 rounded-lg bg-[#0b6e99] hover:bg-[#09577a] text-white font-semibold text-sm transition-all hover:-translate-y-0.5 shadow-md shadow-[#0b6e99]/20"
                  >
                    View More...
                  </a>
                </div>
              </div>

              {/* BLOCK 2: Work Process */}
              <div className="w-full flex flex-col gap-4 sm:gap-5 lg:gap-6 2xl:gap-8">
                <h3 className="font-bold text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl text-[#0a1f33]">
                  Work Process
                </h3>
                <p className="font-normal whitespace-pre-line text-sm sm:text-base lg:text-lg 2xl:text-xl text-[#4a5f73] leading-relaxed">
                  The work process in our Tool Room follows a disciplined, multi-stage approach designed for efficiency, accuracy, and innovation. It begins with concept development using state-of-the-art CAD software to design molds according to each product’s specific technical and aesthetic requirements. The digital designs are then validated through advanced simulation tools, allowing our engineers to detect and resolve potential performance issues before physical production begins. Once approved, the design data is transferred to our CNC and EDM machines for high-precision machining, ensuring each component aligns perfectly with the intended specifications.
                  {"\n\n"}
                  After machining, our expert technicians carry out manual finishing, polishing, and dimensional verification under controlled conditions. This stage is critical to achieving perfect alignment, surface quality, and longevity of the mold. Every mold is then assembled and undergoes multiple test runs to ensure flawless functionality under real production conditions. The final phase involves documentation, inspection, and sign-off by our Quality Assurance team before release to the manufacturing floor. This structured workflow allows Xclusive Can Limited to maintain superior mold accuracy, minimize production downtime, and guarantee consistency across thousands of production cycles — reflecting our philosophy of ‘precision built into every detail.’
                </p>
                <div>
                  <a
                    href="#tool-gallery"
                    className="inline-block w-fit px-6 py-2.5 rounded-lg bg-[#0b6e99] hover:bg-[#09577a] text-white font-semibold text-sm transition-all hover:-translate-y-0.5 shadow-md shadow-[#0b6e99]/20"
                  >
                    View More...
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. IMAGE GALLERY SECTION: Exact replica from HTML            */}
        {/* ============================================================ */}
        <section
          id="tool-gallery"
          aria-label="Tool Room page image gallery section"
          className="bg-[#f4f8fb] py-14 sm:py-16 lg:py-20 2xl:py-24"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* 7 Cards Grid: 1 / 2 / 3 cols, gap 32px, last item full width */}
            <div className="gal-grid">
              {GALLERY_CARDS.map((card, index) => {
                const isLastItem = index === GALLERY_CARDS.length - 1;

                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => handleOpenPreview(card)}
                    className={`gi-card ${isLastItem ? "gi-last" : ""}`}
                    aria-label={`Preview ${card.title}`}
                  >
                    {/* Image Layer */}
                    <div className="gi-img">
                      <Image
                        src={card.coverImage}
                        alt={`Tool room gallery image ${card.id}`}
                        fill
                        sizes={
                          isLastItem
                            ? "100vw"
                            : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        }
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Dark Hover Overlay */}
                    <div className="gi-ov" />

                    {/* Centered Preview Button */}
                    <span className="gi-pv">Preview</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
        </div>
      </main>

      {/* ============================================================ */}
      {/* 4. MULTI-IMAGE SLIDER LIGHTBOX MODAL                         */}
      {/* ============================================================ */}
      {isModalOpen && activeCard && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] bg-[#030a10]/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-5 md:p-8 animate-fadeIn"
          onClick={handleCloseModal}
        >
          {/* Top Control Bar */}
          <div
            className="w-full max-w-6xl mx-auto flex items-center justify-between text-white z-20 pb-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] animate-pulse" />
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  {activeCard.title}
                </h3>
                <p className="text-xs text-slate-300">
                  Image {currentSlideIndex + 1} of {activeCard.slides.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-xs text-slate-300">
                <span>Use</span>
                <kbd className="px-1.5 py-0.5 rounded bg-black/40 text-[10px] font-mono">←</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-black/40 text-[10px] font-mono">→</kbd>
                <span>keys</span>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close Preview"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all border border-white/10 shadow-lg cursor-pointer"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Center Stage: Image Slider Canvas */}
          <div
            className="relative w-full max-w-5xl mx-auto flex-1 flex items-center justify-center my-auto px-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Stage Frame */}
            <div
              style={{ aspectRatio: "1.67 / 1" }}
              className="relative w-full max-h-[68vh] rounded-2xl overflow-hidden shadow-2xl bg-black/60 border border-white/15"
            >
              <Image
                key={activeCard.slides[currentSlideIndex].src}
                src={activeCard.slides[currentSlideIndex].src}
                alt={activeCard.slides[currentSlideIndex].title}
                fill
                priority
                sizes="(min-width: 1280px) 1100px, 95vw"
                className="object-contain sm:object-cover transition-opacity duration-300 ease-out"
              />

              {/* Bottom Caption Pill */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-6 text-white">
                <div className="max-w-3xl">
                  <span className="text-[11px] sm:text-xs font-bold text-[#38bdf8] uppercase tracking-wider block mb-1">
                    Photo {currentSlideIndex + 1} &bull; {activeCard.slides[currentSlideIndex].title}
                  </span>
                  {activeCard.slides[currentSlideIndex].caption && (
                    <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed">
                      {activeCard.slides[currentSlideIndex].caption}
                    </p>
                  )}
                </div>
              </div>

              {/* Left Arrow Button */}
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Previous Image"
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#0b6e99] active:scale-90 text-white flex items-center justify-center transition-all border border-white/20 backdrop-blur-md shadow-lg cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              {/* Right Arrow Button */}
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Next Image"
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#0b6e99] active:scale-90 text-white flex items-center justify-center transition-all border border-white/20 backdrop-blur-md shadow-lg cursor-pointer"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            </div>
          </div>

          {/* Bottom Thumbnail Strip Rail */}
          <div
            className="w-full max-w-4xl mx-auto pt-3 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto py-1 px-2">
              {activeCard.slides.map((slide, idx) => {
                const isActive = idx === currentSlideIndex;
                return (
                  <button
                    key={slide.src + idx}
                    type="button"
                    onClick={() => setCurrentSlideIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    style={{ aspectRatio: "1.67 / 1" }}
                    className={`relative flex-shrink-0 w-16 sm:w-24 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      isActive
                        ? "border-[#38bdf8] ring-2 ring-[#38bdf8]/50 scale-105 opacity-100"
                        : "border-white/20 opacity-60 hover:opacity-100 hover:border-white/60"
                    }`}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* Scoped CSS matching the exact replica file tool-room-replica (1).html */}
      <style jsx>{`
        .gal-grid {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        @media (min-width: 640px) {
          .gal-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .gal-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .gi-card {
          position: relative;
          overflow: hidden;
          width: 100%;
          aspect-ratio: 1.67 / 1;
          min-height: 220px;
          border-radius: 12px;
          box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.25);
          cursor: pointer;
          border: 0;
          padding: 0;
          background: #0a1f33;
          color: #fff;
          font: inherit;
          display: block;
        }
        .gi-last {
          grid-column: 1 / -1;
        }
        .gi-img {
          position: absolute;
          inset: 0;
          transition: transform 0.5s ease;
        }
        .gi-card:hover .gi-img {
          transform: scale(1.06);
        }
        .gi-ov {
          position: absolute;
          inset: 0;
          background: rgba(10, 31, 51, 0.6);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .gi-card:hover .gi-ov,
        .gi-card:focus-visible .gi-ov {
          opacity: 1;
        }
        .gi-pv {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          visibility: hidden;
          opacity: 0;
          padding: 10px 26px;
          border-radius: 8px;
          background: #fff;
          color: #0b6e99;
          font-weight: 700;
          font-size: 15px;
          transition: 0.25s ease;
          pointer-events: none;
        }
        .gi-card:hover .gi-pv,
        .gi-card:focus-visible .gi-pv {
          visibility: visible;
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.1);
        }
      `}</style>
    </div>
  );
}
