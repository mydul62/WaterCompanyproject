"use client";

import React, { useState } from "react";
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
      {/* Floating Header Bar (Screenshots 1-5) */}
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Hero Slider with Play Button & Slide Indicators (Screenshots 1-5) */}
        <HeroSlider />

        {/* Section 2: About Us & Green Factory Campus (Screenshot 6) */}
        <FacilityShowcase />

        {/* Section 3: Managing Supply Chain & Business Challenges with 9 Triangles (Screenshot 7) */}
        <OperationalPillars />

        {/* Section 4: Discover Our Product (Plastic & Tin Container) with 5 Icons & 4 Cards (Screenshot 8) */}
        <ProductShowcase />

        {/* Section 5: Latest Stories with 4 Newspaper Clippings (Screenshot 9) */}
        <PressStoriesSection />

        {/* Section 6: Packaging Solutions Always Made Right & Company Overview (Screenshots 10-11) */}
        <B2BBanner onOpenRFQ={() => handleOpenRFQ()} />

        {/* Section 7: Explore More 13 Cards Grid (Screenshot 12) */}
        <ExploreGrid />
      </main>

      {/* Global Footer (Screenshot 13) */}
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
