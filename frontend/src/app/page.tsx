"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSlider from "@/components/home/HeroSlider";
import FacilityShowcase from "@/components/home/FacilityShowcase";
import OperationalPillars from "@/components/home/OperationalPillars";
import ProductShowcase from "@/components/home/ProductShowcase";
import PressStoriesSection from "@/components/home/PressStoriesSection";
import B2BBanner from "@/components/home/B2BBanner";
import ExploreGrid from "@/components/home/ExploreGrid";
import Footer from "@/components/layout/Footer";
import RFQDrawer from "@/components/rfq/RFQDrawer";
import { ProductItem } from "@/data/companyData";

export default function HomePage() {
  const [isRFQOpen, setIsRFQOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    const handleOpenRFQEvent = () => {
      setIsRFQOpen(true);
    };
    window.addEventListener("open-rfq", handleOpenRFQEvent);
    return () => window.removeEventListener("open-rfq", handleOpenRFQEvent);
  }, []);

  const handleOpenRFQ = (product?: ProductItem) => {
    setSelectedProduct(product || null);
    setIsRFQOpen(true);
  };

  const handleCloseRFQ = () => {
    setIsRFQOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Floating Header Bar (Screenshot 425bbfa4) */}
      <Navbar />

      <main className="flex-1 relative">
        {/* Sticky Hero Slider */}
        <div className="sticky top-0 z-0 w-full h-screen min-h-[700px]">
          <HeroSlider />
        </div>

        {/* Curtain Body: Smoothly rises over the hero with physical 3D elevation */}
        <div
          id="curtain-reveal"
          className="relative z-10 bg-white rounded-t-[32px] sm:rounded-t-[48px] shadow-[0_-25px_60px_rgba(0,0,0,0.22)] border-t border-white/60"
        >
          {/* Section 2: About Us & Green Factory Campus */}
          <FacilityShowcase />

          {/* Section 3: Managing Supply Chain & Business Challenges with 9 Triangles */}
          <OperationalPillars />

          {/* Section 4: Discover Our Product (Plastic & Tin Container) with 5 Icons & 4 Cards */}
          <ProductShowcase />

          {/* Section 5: Latest Stories with 4 Newspaper Clippings */}
          <PressStoriesSection />

          {/* Section 6: Packaging Solutions Always Made Right & Company Overview */}
          <B2BBanner onOpenRFQ={() => handleOpenRFQ()} />

          {/* Section 7: Explore More 13 Cards Grid */}
          <ExploreGrid />
        </div>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Contact / RFQ Drawer */}
      <RFQDrawer
        isOpen={isRFQOpen}
        onClose={handleCloseRFQ}
        initialProduct={selectedProduct}
      />
    </div>
  );
}
