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
        {/* Full-screen Hero Slider Section */}
        <div className="relative w-full min-h-[100svh] lg:h-screen lg:min-h-[660px]">
          <HeroSlider />
        </div>

        {/* Main Page Sections */}
        <div
          id="curtain-reveal"
          className="relative bg-white"
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
