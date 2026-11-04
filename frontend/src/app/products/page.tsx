"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RFQDrawer from "@/components/rfq/RFQDrawer";
import { ChevronDown, ChevronUp, Search, Download, ArrowRight, ArrowLeft } from "lucide-react";

interface CatalogProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  factory: "Q Pail Limited" | "Xclusive Can Limited";
  genre: "Plastic" | "Metal";
  shape: "Bottle" | "Jar" | "Jerry Can" | "Handle Bottle" | "Specialty" | "Tin Can";
}

const CATALOG_DATA: CatalogProduct[] = [
  {
    id: "p1",
    name: "Pharmaceutical Bottle",
    description: "100 ml HDPE Pharmaceuticals Bottle made with food grade virgin material",
    image: "/images/catalog/cat-prod-1.png",
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    shape: "Bottle",
  },
  {
    id: "p2",
    name: "Liquid Washing Container",
    description: "HDPE Washing Powder Container For Home care usage",
    image: "/images/catalog/cat-prod-2.png",
    factory: "Q Pail Limited",
    genre: "Plastic",
    shape: "Handle Bottle",
  },
  {
    id: "p3",
    name: "Vitamin Container",
    description: "26 gm Container (Menacal-D) with Cap for Pharmaceutical uses. It is used for Radiant Pharma....",
    image: "/images/catalog/cat-prod-3.png",
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    shape: "Jar",
  },
  {
    id: "p4",
    name: "Body-wash Bottle",
    description: "PET Body-Wash Bottle with Flip Top Cap",
    image: "/images/catalog/prod-4.png",
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    shape: "Bottle",
  },
  {
    id: "p5",
    name: "Chemical Bottle",
    description: "1 Ltr HDPE Chemical Bottle with Handle uses for Nippon, Asian Paints",
    image: "/cropped/product-card-1.png",
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    shape: "Handle Bottle",
  },
  {
    id: "p6",
    name: "4L Jerry Can",
    description: "This is 4 Ltr Jerry can, used liquid Thinner, cleaner, chemical, Etc.",
    image: "/cropped/product-card-4.png",
    factory: "Q Pail Limited",
    genre: "Plastic",
    shape: "Jerry Can",
  },
  {
    id: "p7",
    name: "Round Jerry Can",
    description: "HDPE Round Jerry Can for Asian Paints",
    image: "/images/catalog/prod-7.png",
    factory: "Q Pail Limited",
    genre: "Plastic",
    shape: "Jerry Can",
  },
  {
    id: "p8",
    name: "Oral Syringe",
    description: "Oral syringes are used to accurately measure and safely administer liquid...",
    image: "/cropped/product-card-3.png",
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    shape: "Specialty",
  },
  {
    id: "p9",
    name: "Agro Bottle",
    description: "500 ML White color HDPE Agro Vet Bottle with Inner Seal and Cap",
    image: "/cropped/product-card-1.png",
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    shape: "Bottle",
  },
  {
    id: "p10",
    name: "Chemical Bottle",
    description: "500 ML Chemical Bottle uses for Samuda Chemical Industries...",
    image: "/cropped/product-card-2.png",
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    shape: "Bottle",
  },
  {
    id: "p11",
    name: "Double Handle Can",
    description: "4.6 Ltr Double Handle HDPE Jerry Can",
    image: "/cropped/product-card-4.png",
    factory: "Q Pail Limited",
    genre: "Plastic",
    shape: "Jerry Can",
  },
  {
    id: "p12",
    name: "1 Ltr Chemical Bottle",
    description: "1 Ltr Chemical Bottle",
    image: "/images/catalog/prod-12.png",
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    shape: "Bottle",
  },
  {
    id: "p13",
    name: "3-Piece Industrial Paint Can (1 Gal)",
    description: "Triple-tight welded tinplate can for decorative paints and industrial coatings",
    image: "/Infoimages/Screenshot 2026-11-04 130154.png",
    factory: "Xclusive Can Limited",
    genre: "Metal",
    shape: "Tin Can",
  },
  {
    id: "p14",
    name: "High-Pressure Aerosol Container",
    description: "Electrolytic tinplate aerosol spray can tested to 18 bar burst pressure",
    image: "/Infoimages/Screenshot 2026-11-04 130154.png",
    factory: "Xclusive Can Limited",
    genre: "Metal",
    shape: "Tin Can",
  },
  {
    id: "p15",
    name: "Industrial Chemical Pail (20L Q Pail)",
    description: "Reinforced HDPE industrial pail with airtight gasket lid and wire handle",
    image: "/Infoimages/Screenshot 2026-11-04 130311.png",
    factory: "Q Pail Limited",
    genre: "Plastic",
    shape: "Jerry Can",
  },
  {
    id: "p16",
    name: "Food-Grade Sealed Biscuit & Sweet Tin",
    description: "Decorative litho-printed food tin with airtight hermetic lid",
    image: "/Infoimages/Screenshot 2026-11-04 130154.png",
    factory: "Xclusive Can Limited",
    genre: "Metal",
    shape: "Tin Can",
  },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFactories, setSelectedFactories] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [isFactoryOpen, setIsFactoryOpen] = useState(true);
  const [isGenreOpen, setIsGenreOpen] = useState(true);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isShapeOpen, setIsShapeOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [isRFQOpen, setIsRFQOpen] = useState(false);
  const [selectedProductForRFQ, setSelectedProductForRFQ] = useState<any>(null);

  const toggleFactory = (factory: string) => {
    setSelectedFactories((prev) =>
      prev.includes(factory) ? prev.filter((f) => f !== factory) : [...prev, factory]
    );
    setCurrentPage(1);
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return CATALOG_DATA.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFactory =
        selectedFactories.length === 0 || selectedFactories.includes(product.factory);

      const matchesGenre =
        selectedGenres.length === 0 || selectedGenres.includes(product.genre);

      return matchesSearch && matchesFactory && matchesGenre;
    });
  }, [searchQuery, selectedFactories, selectedGenres]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenRFQ = (product: CatalogProduct) => {
    setSelectedProductForRFQ({
      id: product.id,
      name: product.name,
      category: product.genre.toLowerCase(),
      categoryLabel: product.genre,
      material: product.genre === "Metal" ? "Electrolytic Tinplate" : "HDPE / PET",
      capacityRange: "Custom",
      applications: [product.shape],
      image: product.image,
      description: product.description,
      features: ["Custom Branding Available", "ISO Certified Manufacturing"],
    });
    setIsRFQOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* Exact Hero Banner matching Screenshot media_1793808390182_d0c1254c.jpg */}
        <div className="relative w-full h-[260px] sm:h-[340px] lg:h-[380px] overflow-hidden flex items-center justify-center">
          <Image
            src="/images/products-banner.jpg"
            alt="Products We Manufacture - Xclusive Can Limited"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[0.5px]" />
          <div className="relative z-10 text-center px-4 pt-16 sm:pt-20">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-wider uppercase drop-shadow-md">
              Products We Manufacture
            </h1>
          </div>
        </div>

        {/* Catalog Container */}
        <section className="w-full py-10 sm:py-14">
          <div className="w-full max-w-[1638px] mx-auto px-6 sm:px-12">
            {/* Section Subheading matching Screenshot media_1793808422351_3bb45b91.jpg */}
            <h2 className="text-xl sm:text-2xl font-bold text-[#5a8ea7] tracking-tight mb-8">
              Find faster than you can search - with our Category
            </h2>

            {/* Two-Column Layout: Sidebar + Grid */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              {/* Left Sidebar: Categories Accordion */}
              <aside className="w-full lg:w-64 xl:w-72 shrink-0 space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 pb-2">
                  Categories
                </h3>

                {/* 1. Factory Accordion */}
                <div className="space-y-2">
                  <button
                    onClick={() => setIsFactoryOpen(!isFactoryOpen)}
                    className="w-full bg-[#5a8ea7] text-white px-4 py-2.5 rounded-lg flex items-center justify-between font-bold text-sm shadow-sm transition-colors hover:bg-[#4f8097]"
                  >
                    <span>Factory</span>
                    {isFactoryOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {isFactoryOpen && (
                    <div className="pl-4 pr-2 py-2 space-y-2 bg-slate-50/60 rounded-lg text-sm text-slate-700">
                      <label className="flex items-center gap-2.5 cursor-pointer hover:text-black">
                        <input
                          type="checkbox"
                          checked={selectedFactories.includes("Q Pail Limited")}
                          onChange={() => toggleFactory("Q Pail Limited")}
                          className="w-4 h-4 rounded text-[#5a8ea7] focus:ring-[#5a8ea7]"
                        />
                        <span>Q Pail Limited</span>
                      </label>
                      <label className="flex items-center gap-2.5 cursor-pointer hover:text-black">
                        <input
                          type="checkbox"
                          checked={selectedFactories.includes("Xclusive Can Limited")}
                          onChange={() => toggleFactory("Xclusive Can Limited")}
                          className="w-4 h-4 rounded text-[#5a8ea7] focus:ring-[#5a8ea7]"
                        />
                        <span>Xclusive Can Limited</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* 2. Genre / Section Accordion */}
                <div className="space-y-2">
                  <button
                    onClick={() => setIsGenreOpen(!isGenreOpen)}
                    className="w-full bg-[#5a8ea7] text-white px-4 py-2.5 rounded-lg flex items-center justify-between font-bold text-sm shadow-sm transition-colors hover:bg-[#4f8097]"
                  >
                    <span>Genre / Section</span>
                    {isGenreOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {isGenreOpen && (
                    <div className="pl-4 pr-2 py-2 space-y-2 bg-slate-50/60 rounded-lg text-sm text-slate-700">
                      <button
                        onClick={() => toggleGenre("Plastic")}
                        className={`w-full flex items-center justify-between py-1 hover:text-black text-left ${
                          selectedGenres.includes("Plastic") ? "font-bold text-[#5a8ea7]" : ""
                        }`}
                      >
                        <span>Plastic</span>
                        <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-slate-400" />
                      </button>
                      <button
                        onClick={() => toggleGenre("Metal")}
                        className={`w-full flex items-center justify-between py-1 hover:text-black text-left ${
                          selectedGenres.includes("Metal") ? "font-bold text-[#5a8ea7]" : ""
                        }`}
                      >
                        <span>Metal</span>
                        <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-slate-400" />
                      </button>
                      <label className="flex items-center gap-2.5 pt-1 border-t border-slate-200 cursor-pointer hover:text-black">
                        <input
                          type="checkbox"
                          checked={selectedGenres.length === 2}
                          onChange={() => {
                            if (selectedGenres.length === 2) {
                              setSelectedGenres([]);
                            } else {
                              setSelectedGenres(["Plastic", "Metal"]);
                            }
                          }}
                          className="w-4 h-4 rounded text-[#5a8ea7] focus:ring-[#5a8ea7]"
                        />
                        <span>Group Products</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* 3. Export Accordion */}
                <div className="border-b border-slate-200 py-1">
                  <button
                    onClick={() => setIsExportOpen(!isExportOpen)}
                    className="w-full py-2.5 flex items-center justify-between font-bold text-sm text-[#5a8ea7] hover:text-[#416e83] transition-colors"
                  >
                    <span>Export</span>
                    {isExportOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {isExportOpen && (
                    <div className="pl-4 pb-2 text-xs text-slate-500">
                      Export grade packaging compliant with FDA and international transit specs.
                    </div>
                  )}
                </div>

                {/* 4. Shape Accordion */}
                <div className="border-b border-slate-200 py-1">
                  <button
                    onClick={() => setIsShapeOpen(!isShapeOpen)}
                    className="w-full py-2.5 flex items-center justify-between font-bold text-sm text-[#5a8ea7] hover:text-[#416e83] transition-colors"
                  >
                    <span>Shape</span>
                    {isShapeOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {isShapeOpen && (
                    <div className="pl-4 pb-2 space-y-1 text-xs text-slate-600">
                      <div>Round / Cylindrical</div>
                      <div>Conical / Tub</div>
                      <div>Rectangular Pail</div>
                      <div>Square Jerry Can</div>
                    </div>
                  )}
                </div>

                {/* Download Catalog Link */}
                <div className="pt-2">
                  <a
                    href="#download"
                    className="text-[#5a8ea7] font-bold text-sm hover:underline inline-flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Catalog</span>
                  </a>
                </div>
              </aside>

              {/* Right Content Area: Search Bar + 3-Col Product Grid */}
              <div className="flex-1 w-full space-y-6">
                {/* Search Bar matching Screenshot */}
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search for product..."
                    className="w-full px-4 py-2.5 sm:py-3 pl-10 rounded-lg sm:rounded-xl border border-slate-300 focus:border-[#5a8ea7] focus:ring-2 focus:ring-[#5a8ea7]/20 outline-none text-sm transition-all text-slate-900 bg-white"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-black font-bold"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Active Filter Chips */}
                {(selectedFactories.length > 0 || selectedGenres.length > 0 || searchQuery) && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs text-slate-500 font-semibold">Active Filters:</span>
                    {selectedFactories.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-full font-medium"
                      >
                        {f}
                        <button
                          onClick={() => toggleFactory(f)}
                          className="hover:text-red-500 font-bold ml-1"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                    {selectedGenres.map((g) => (
                      <span
                        key={g}
                        className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-full font-medium"
                      >
                        {g}
                        <button
                          onClick={() => toggleGenre(g)}
                          className="hover:text-red-500 font-bold ml-1"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                    <button
                      onClick={() => {
                        setSelectedFactories([]);
                        setSelectedGenres([]);
                        setSearchQuery("");
                      }}
                      className="text-xs text-[#5a8ea7] hover:underline font-bold ml-2"
                    >
                      Reset All
                    </button>
                  </div>
                )}

                {/* 3-Column Product Cards Grid matching Screenshot */}
                {displayedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {displayedProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleOpenRFQ(product)}
                        className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-4 flex flex-col cursor-pointer"
                      >
                        {/* Image Container */}
                        <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#f4f7f9] mb-3.5 flex items-center justify-center p-2">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1c8bff] transition-colors line-clamp-1">
                          {product.name}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-1.5 leading-relaxed flex-1">
                          {product.description}
                        </p>

                        {/* Subtle Footer Tag */}
                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                          <span>{product.factory}</span>
                          <span className="text-[#5a8ea7] group-hover:translate-x-1 transition-transform">
                            Quote &rarr;
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl space-y-3">
                    <p className="text-slate-500 font-medium">No products match your current filters.</p>
                    <button
                      onClick={() => {
                        setSelectedFactories([]);
                        setSelectedGenres([]);
                        setSearchQuery("");
                      }}
                      className="px-4 py-2 bg-[#5a8ea7] text-white text-xs font-bold rounded-lg hover:bg-[#487388]"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}

                {/* Pagination matching Screenshot */}
                <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-600 font-medium">
                  {/* Left: Item Counter */}
                  <div>
                    1-{displayedProducts.length} of {filteredProducts.length > 12 ? "300" : filteredProducts.length} item
                  </div>

                  {/* Center: Page Numbers */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-1.5 rounded hover:bg-slate-100 disabled:opacity-40"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    {[1, 2, 3, 4, 5].map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-7 h-7 rounded text-xs font-bold transition-colors ${
                          currentPage === page
                            ? "bg-[#5a8ea7] text-white"
                            : "hover:bg-slate-100 text-slate-700"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <span className="px-1 text-slate-400">...</span>
                    <button
                      onClick={() => setCurrentPage(25)}
                      className={`w-7 h-7 rounded text-xs font-bold hover:bg-slate-100 text-slate-700`}
                    >
                      25
                    </button>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-1.5 rounded hover:bg-slate-100 disabled:opacity-40"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Right: Per page & Go to Page */}
                  <div className="flex items-center gap-3">
                    <div className="border border-slate-200 rounded px-2 py-1 text-xs bg-white">
                      12 / page
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <span>Go to</span>
                      <input
                        type="text"
                        defaultValue="1"
                        className="w-9 px-1.5 py-0.5 border border-slate-200 rounded text-center text-xs"
                      />
                      <span>Page</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* RFQ Drawer for direct quotes */}
      <RFQDrawer
        isOpen={isRFQOpen}
        onClose={() => {
          setIsRFQOpen(false);
          setSelectedProductForRFQ(null);
        }}
        initialProduct={selectedProductForRFQ}
      />
    </div>
  );
}

