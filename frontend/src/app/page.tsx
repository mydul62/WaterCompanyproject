"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSlider from "@/components/home/HeroSlider";
import SafeWaterStorySection from "@/components/home/SafeWaterStorySection";
import WaterFilteringServices from "@/components/home/WaterFilteringServices";
import BestFilteringSystemSection from "@/components/home/BestFilteringSystemSection";
import QualityBottlePacksSection from "@/components/home/QualityBottlePacksSection";
import ClientTestimonialsSection from "@/components/home/ClientTestimonialsSection";
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
      {/* Acuasafe Modern Sticky Header Bar (Screenshot c1caf1c3) */}
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Acuasafe Hero Slider with Bottom Floating Card (Screenshots c1caf1c3 & a98e2658) */}
        <HeroSlider />

        {/* Section 2: Safe and Healthy Water Story (Screenshot e82811f7) */}
        <SafeWaterStorySection />

        {/* Section 3: Water Filtering System Services & Delivery Specialist (Screenshot 076cf6d4) */}
        <WaterFilteringServices />

        {/* Section 4: Best Water Filtering System in Royal Blue Wave (Screenshot f111777f) */}
        <BestFilteringSystemSection />

        {/* Section 5: Best Quality Bottle Packs with Pricing (Screenshot 39c7284a) */}
        <QualityBottlePacksSection />

        {/* Section 6: What Our Client are Saying Testimonials (Screenshot 27e76023) */}
        <ClientTestimonialsSection />

        {/* Section 7: Industrial Factory & LEED Platinum Plant Showcase */}
        <FacilityShowcase />

        {/* Section 8: Managing Supply Chain & Manufacturing Triangles */}
        <OperationalPillars />

        {/* Section 9: Discover Our Product Catalog (Plastic & Tin Container) */}
        <ProductShowcase />

        {/* Section 10: Latest Stories & Media Clippings */}
        <PressStoriesSection />

        {/* Section 11: Packaging Solutions Always Made Right & B2B Overview */}
        <B2BBanner onOpenRFQ={() => handleOpenRFQ()} />

        {/* Section 12: Explore More 13 Cards Grid */}
        <ExploreGrid />
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
