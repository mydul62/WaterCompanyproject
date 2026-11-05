"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RFQDrawer from "@/components/rfq/RFQDrawer";
import { ChevronDown, ChevronUp, Search, Download, ArrowRight, ArrowLeft, X, Eye } from "lucide-react";

interface CatalogProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  factory: "Q Pail Limited" | "Xclusive Can Limited";
  genre: "Plastic" | "Metal";
  subCategory: string;
  shape: "Square" | "Oblong" | "Oval" | "Rectangular" | "Circular";
  material?: string;
  capacity?: string;
}

const CATALOG_DATA: CatalogProduct[] = [
  {
    id: "p1",
    name: "Pharmaceutical Bottle",
    description: "100 ml HDPE Pharmaceuticals Bottle made with food grade virgin material",
    image: "/images/catalog/cat-prod-1.png",
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    subCategory: "Pharmaceutical",
    shape: "Circular",
    material: "100% Food-Grade Virgin HDPE",
    capacity: "100 ml",
  },
  {
    id: "p2",
    name: "Liquid Washing Container",
    description: "HDPE Washing Powder Container For Home care usage",
    image: "/images/catalog/cat-prod-2.png",
    factory: "Q Pail Limited",
    genre: "Plastic",
    subCategory: "Home Care",
    shape: "Square",
    material: "High-Density Polyethylene (HDPE)",
    capacity: "1000 ml - 2000 ml",
  },
  {
    id: "p3",
    name: "Vitamin Container",
    description: "26 gm Container (Menacal-D) with Cap for Pharmaceutical uses. It is used for Radiant Pharma....",
    image: "/images/catalog/cat-prod-3.png",
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    subCategory: "Pharmaceutical",
    shape: "Circular",
    material: "Pharmaceutical Virgin HDPE",
    capacity: "26 gm",
  },
  {
    id: "p4",
    name: "Round Jerry Can",
    description: "HDPE Round Jerry Can for Asian Paints",
    image: "/images/catalog/prod-7.png",
    factory: "Q Pail Limited",
    genre: "Plastic",
    subCategory: "Paint",
    shape: "Circular",
    material: "Virgin HDPE with Tamper Cap",
    capacity: "4 Liter",
  },
  {
    id: "p5",
    name: "Oral Syringe",
    description: "Oral syringes are used to accurately measure and safely administer liquid medication by mouth,...",
    image: "/cropped/product-card-3.png",
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    subCategory: "Pharmaceutical",
    shape: "Oblong",
    material: "Medical Grade Polypropylene (PP)",
    capacity: "5 ml - 20 ml",
  },
  {
    id: "p6",
    name: "Agro Bottle",
    description: "500 ML White color HDPE Agro Vet Bottle with Inner Seal and Cap",
    image: "/cropped/product-card-1.png",
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    subCategory: "Agro Vet",
    shape: "Circular",
    material: "Chemical Resistant Virgin HDPE",
    capacity: "500 ml",
  },
  {
    id: "p7",
    name: "Chemical Bottle",
    description: "500 ML Chemical Bottle uses for Samuda Chemical Industries.",
    image: "/images/catalog/cat-prod-7.png",
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    subCategory: "Chemical",
    shape: "Circular",
    material: "HDPE with Threaded Locking Cap",
    capacity: "500 ml",
  },
  {
    id: "p8",
    name: "Double Handle Can",
    description: "4.8 Ltr Double Handle HDPE jerry Can",
    image: "/images/catalog/cat-prod-8.png",
    factory: "Q Pail Limited",
    genre: "Plastic",
    subCategory: "Chemical",
    shape: "Square",
    material: "Industrial Heavy HDPE",
    capacity: "4.8 Liter",
  },
  {
    id: "p9",
    name: "1 Ltr Chemical Bottle",
    description: "1 Ltr Chemical Bottle",
    image: "/images/catalog/cat-prod-9.png",
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    subCategory: "Chemical",
    shape: "Circular",
    material: "HDPE / Fluorinated Barrier",
    capacity: "1000 ml",
  },
  {
    id: "p10",
    name: "Body-wash Bottle",
    description: "PET Body-Wash Bottle with Flip Top Cap",
    image: "/images/catalog/prod-4.png",
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    subCategory: "Personal Care",
    shape: "Oval",
    material: "Clear PET Resin",
    capacity: "250 ml - 400 ml",
  },
  {
    id: "p11",
    name: "3-Piece Industrial Paint Can",
    description: "Welded tinplate metal can for decorative paint & industrial coatings",
    image: "/Infoimages/Screenshot 2026-11-04 130154.png",
    factory: "Xclusive Can Limited",
    genre: "Metal",
    subCategory: "Paint",
    shape: "Circular",
    material: "Electrolytic Tinplate (ETP)",
    capacity: "1 Gallon",
  },
  {
    id: "p12",
    name: "Aerosol Spray Can",
    description: "High-pressure tinplate aerosol container tested up to 18 bar pressure",
    image: "/Infoimages/Screenshot 2026-11-04 130154.png",
    factory: "Xclusive Can Limited",
    genre: "Metal",
    subCategory: "Personal Care",
    shape: "Circular",
    material: "Three-Piece Welded Tinplate",
    capacity: "300 ml - 500 ml",
  },
];

const PLASTIC_SUB_CATEGORIES = [
  "Food",
  "Home Care",
  "Personal Care",
  "Seal and Closure",
  "Pharmaceutical",
  "Lubricant",
  "Chemical",
  "Paint",
  "Agro Vet",
];

const METAL_SUB_CATEGORIES = [
  "Food",
  "Home Care",
  "Personal Care",
  "Paint",
  "Lubricant",
  "Chemical",
  "Container",
];

const EXPORT_TYPES = ["Direct Export", "Indirect Export"];
const SHAPE_TYPES: ("Square" | "Oblong" | "Oval" | "Rectangular" | "Circular")[] = [
  "Square",
  "Oblong",
  "Oval",
  "Rectangular",
  "Circular",
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFactories, setSelectedFactories] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [selectedExports, setSelectedExports] = useState<string[]>([]);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [isGroupProductsChecked, setIsGroupProductsChecked] = useState(false);

  // Accordion open/close states exactly matching screenshots
  const [isFactoryOpen, setIsFactoryOpen] = useState(true);
  const [isGenreOpen, setIsGenreOpen] = useState(true);
  const [isPlasticOpen, setIsPlasticOpen] = useState(true);
  const [isMetalOpen, setIsMetalOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isShapeOpen, setIsShapeOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Quick View Modal & RFQ Drawer state
  const [quickViewProduct, setQuickViewProduct] = useState<CatalogProduct | null>(null);
  const [isRFQOpen, setIsRFQOpen] = useState(false);
  const [selectedProductForRFQ, setSelectedProductForRFQ] = useState<any>(null);

  const toggleFactory = (factory: string) => {
    setSelectedFactories((prev) =>
      prev.includes(factory) ? prev.filter((f) => f !== factory) : [...prev, factory]
    );
    setCurrentPage(1);
  };

  const toggleSubCategory = (sub: string) => {
    setSelectedSubCategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
    setCurrentPage(1);
  };

  const toggleExport = (exp: string) => {
    setSelectedExports((prev) =>
      prev.includes(exp) ? prev.filter((e) => e !== exp) : [...prev, exp]
    );
    setCurrentPage(1);
  };

  const toggleShape = (shape: string) => {
    setSelectedShapes((prev) =>
      prev.includes(shape) ? prev.filter((s) => s !== shape) : [...prev, shape]
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

      const matchesSubCategory =
        selectedSubCategories.length === 0 ||
        selectedSubCategories.includes(product.subCategory);

      const matchesShape =
        selectedShapes.length === 0 || selectedShapes.includes(product.shape);

      return matchesSearch && matchesFactory && matchesGenre && matchesSubCategory && matchesShape;
    });
  }, [searchQuery, selectedFactories, selectedGenres, selectedSubCategories, selectedShapes]);

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
      material: product.material || (product.genre === "Metal" ? "Electrolytic Tinplate" : "HDPE / PET"),
      capacityRange: product.capacity || "Custom",
      applications: [product.shape, product.subCategory],
      image: product.image,
      description: product.description,
      features: ["Custom Branding Available", "ISO Certified Cleanroom Manufacturing"],
    });
    setQuickViewProduct(null);
    setIsRFQOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Floating / Sticky Header */}
      <Navbar />

      <main className="flex-1">
        {/* Exact Hero Banner matching Screenshot */}
        <div id="hero" className="relative w-full h-[260px] sm:h-[340px] lg:h-[380px] overflow-hidden flex items-center justify-center">
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

        {/* Catalog Main Container strictly locked to max-w-[1638px] */}
        <section className="w-full py-10 sm:py-14">
          <div className="w-full max-w-[1638px] mx-auto px-6 sm:px-12">
            {/* Section Subheading matching Screenshot */}
            <h2 className="text-xl sm:text-2xl font-bold text-[#5a8ea7] tracking-tight mb-8">
              Find faster than you can search - with our Category
            </h2>

            {/* Two-Column Layout: Sidebar + Grid */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              {/* Left Sidebar: Categories Tree */}
              <aside className="w-full lg:w-64 xl:w-72 shrink-0 space-y-3.5 select-none">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 pb-1">
                  Categories
                </h3>

                {/* 1. Factory Accordion Header */}
                <div className="space-y-2">
                  <button
                    onClick={() => setIsFactoryOpen(!isFactoryOpen)}
                    className="w-full bg-[#5a8ea7] text-white px-4 py-2.5 rounded-lg flex items-center justify-between font-bold text-sm shadow-sm transition-colors hover:bg-[#4d7d93]"
                  >
                    <span>Factory</span>
                    {isFactoryOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {isFactoryOpen && (
                    <div className="pl-4 pr-2 py-2 space-y-2.5 bg-slate-50/70 rounded-lg text-sm text-slate-700 border border-slate-100">
                      <label className="flex items-center gap-2.5 cursor-pointer hover:text-black">
                        <input
                          type="checkbox"
                          checked={selectedFactories.includes("Q Pail Limited")}
                          onChange={() => toggleFactory("Q Pail Limited")}
                          className="w-4 h-4 rounded border-slate-300 text-[#5a8ea7] focus:ring-[#5a8ea7]"
                        />
                        <span>Q Pail Limited</span>
                      </label>
                      <label className="flex items-center gap-2.5 cursor-pointer hover:text-black">
                        <input
                          type="checkbox"
                          checked={selectedFactories.includes("Xclusive Can Limited")}
                          onChange={() => toggleFactory("Xclusive Can Limited")}
                          className="w-4 h-4 rounded border-slate-300 text-[#5a8ea7] focus:ring-[#5a8ea7]"
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
                    className="w-full bg-[#5a8ea7] text-white px-4 py-2.5 rounded-lg flex items-center justify-between font-bold text-sm shadow-sm transition-colors hover:bg-[#4d7d93]"
                  >
                    <span>Genre / Section</span>
                    {isGenreOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {isGenreOpen && (
                    <div className="space-y-2 pl-2">
                      {/* Nested Sub-Accordion: Plastic */}
                      <div className="space-y-1.5">
                        <button
                          onClick={() => setIsPlasticOpen(!isPlasticOpen)}
                          className="w-full bg-[#5a8ea7] text-white px-3.5 py-2 rounded-lg flex items-center justify-between font-bold text-xs shadow-sm transition-colors hover:bg-[#4d7d93]"
                        >
                          <span>Plastic</span>
                          {isPlasticOpen ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                        {isPlasticOpen && (
                          <div className="pl-3 pr-2 py-2 space-y-2 bg-slate-50/70 rounded-lg text-xs text-slate-700 border border-slate-100">
                            {PLASTIC_SUB_CATEGORIES.map((cat) => (
                              <label
                                key={cat}
                                className="flex items-center gap-2 cursor-pointer hover:text-black"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedSubCategories.includes(cat)}
                                  onChange={() => toggleSubCategory(cat)}
                                  className="w-3.5 h-3.5 rounded border-slate-300 text-[#5a8ea7] focus:ring-[#5a8ea7]"
                                />
                                <span>{cat}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Nested Sub-Accordion: Metal */}
                      <div className="space-y-1.5">
                        <button
                          onClick={() => setIsMetalOpen(!isMetalOpen)}
                          className="w-full bg-[#5a8ea7] text-white px-3.5 py-2 rounded-lg flex items-center justify-between font-bold text-xs shadow-sm transition-colors hover:bg-[#4d7d93]"
                        >
                          <span>Metal</span>
                          {isMetalOpen ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                        {isMetalOpen && (
                          <div className="pl-3 pr-2 py-2 space-y-2 bg-slate-50/70 rounded-lg text-xs text-slate-700 border border-slate-100">
                            {METAL_SUB_CATEGORIES.map((cat) => (
                              <label
                                key={cat}
                                className="flex items-center gap-2 cursor-pointer hover:text-black"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedSubCategories.includes(cat)}
                                  onChange={() => toggleSubCategory(cat)}
                                  className="w-3.5 h-3.5 rounded border-slate-300 text-[#5a8ea7] focus:ring-[#5a8ea7]"
                                />
                                <span>{cat}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Group Products Checkbox */}
                      <label className="flex items-center gap-2.5 pt-2 pl-2 text-xs font-semibold text-slate-700 cursor-pointer hover:text-black">
                        <input
                          type="checkbox"
                          checked={isGroupProductsChecked}
                          onChange={(e) => setIsGroupProductsChecked(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-300 text-[#5a8ea7] focus:ring-[#5a8ea7]"
                        />
                        <span>Group Products</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* 3. Export Accordion */}
                <div className="space-y-2">
                  <button
                    onClick={() => setIsExportOpen(!isExportOpen)}
                    className="w-full bg-[#5a8ea7] text-white px-4 py-2.5 rounded-lg flex items-center justify-between font-bold text-sm shadow-sm transition-colors hover:bg-[#4d7d93]"
                  >
                    <span>Export</span>
                    {isExportOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {isExportOpen && (
                    <div className="pl-4 pr-2 py-2 space-y-2 bg-slate-50/70 rounded-lg text-xs text-slate-700 border border-slate-100">
                      {EXPORT_TYPES.map((exp) => (
                        <label
                          key={exp}
                          className="flex items-center gap-2 cursor-pointer hover:text-black"
                        >
                          <input
                            type="checkbox"
                            checked={selectedExports.includes(exp)}
                            onChange={() => toggleExport(exp)}
                            className="w-3.5 h-3.5 rounded border-slate-300 text-[#5a8ea7] focus:ring-[#5a8ea7]"
                          />
                          <span>{exp}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Shape Accordion */}
                <div className="space-y-2">
                  <button
                    onClick={() => setIsShapeOpen(!isShapeOpen)}
                    className="w-full bg-[#5a8ea7] text-white px-4 py-2.5 rounded-lg flex items-center justify-between font-bold text-sm shadow-sm transition-colors hover:bg-[#4d7d93]"
                  >
                    <span>Shape</span>
                    {isShapeOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {isShapeOpen && (
                    <div className="pl-4 pr-2 py-2 space-y-2 bg-slate-50/70 rounded-lg text-xs text-slate-700 border border-slate-100">
                      {SHAPE_TYPES.map((shape) => (
                        <label
                          key={shape}
                          className="flex items-center gap-2 cursor-pointer hover:text-black"
                        >
                          <input
                            type="checkbox"
                            checked={selectedShapes.includes(shape)}
                            onChange={() => toggleShape(shape)}
                            className="w-3.5 h-3.5 rounded border-slate-300 text-[#5a8ea7] focus:ring-[#5a8ea7]"
                          />
                          <span>{shape}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* 5. Download Catalog Link */}
                <div className="pt-3 pl-1">
                  <a
                    href="#download"
                    className="text-[#5a8ea7] font-bold text-sm hover:underline inline-flex items-center gap-1.5 transition-colors"
                  >
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
                    className="w-full px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-slate-300 focus:border-[#5a8ea7] focus:ring-2 focus:ring-[#5a8ea7]/20 outline-none text-sm transition-all text-slate-900 bg-white placeholder-slate-400"
                  />
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
                {(selectedFactories.length > 0 ||
                  selectedSubCategories.length > 0 ||
                  selectedShapes.length > 0 ||
                  selectedExports.length > 0 ||
                  searchQuery) && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs text-slate-500 font-semibold">Active:</span>
                    {selectedFactories.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-full font-medium"
                      >
                        {f}
                        <button onClick={() => toggleFactory(f)} className="hover:text-red-500 ml-1 font-bold">
                          &times;
                        </button>
                      </span>
                    ))}
                    {selectedSubCategories.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-full font-medium"
                      >
                        {s}
                        <button onClick={() => toggleSubCategory(s)} className="hover:text-red-500 ml-1 font-bold">
                          &times;
                        </button>
                      </span>
                    ))}
                    {selectedShapes.map((sh) => (
                      <span
                        key={sh}
                        className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-full font-medium"
                      >
                        {sh}
                        <button onClick={() => toggleShape(sh)} className="hover:text-red-500 ml-1 font-bold">
                          &times;
                        </button>
                      </span>
                    ))}
                    <button
                      onClick={() => {
                        setSelectedFactories([]);
                        setSelectedSubCategories([]);
                        setSelectedShapes([]);
                        setSelectedExports([]);
                        setSearchQuery("");
                      }}
                      className="text-xs text-[#5a8ea7] hover:underline font-bold ml-2"
                    >
                      Reset All
                    </button>
                  </div>
                )}

                {/* 3-Column Product Cards Grid with Quick View on Hover */}
                {displayedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {displayedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 p-4 flex flex-col"
                      >
                        {/* Image Container with Exact Quick View Overlay */}
                        <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#eef3f6] mb-3.5 flex items-center justify-center p-2">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                          />

                          {/* Dark Hover Overlay matching Screenshot */}
                          <div className="absolute inset-0 bg-[#1e252f]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                            <button
                              onClick={() => setQuickViewProduct(product)}
                              className="px-6 py-2.5 rounded-lg bg-[#5a8ea7] hover:bg-[#487388] text-white font-bold text-sm shadow-lg transition-transform active:scale-95"
                            >
                              Quick View
                            </button>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1c8bff] transition-colors line-clamp-1">
                          {product.name}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-1.5 leading-relaxed flex-1">
                          {product.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl space-y-3">
                    <p className="text-slate-500 font-medium">No products match your current filters.</p>
                    <button
                      onClick={() => {
                        setSelectedFactories([]);
                        setSelectedSubCategories([]);
                        setSelectedShapes([]);
                        setSelectedExports([]);
                        setSearchQuery("");
                      }}
                      className="px-4 py-2 bg-[#5a8ea7] text-white text-xs font-bold rounded-lg hover:bg-[#487388]"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}

                {/* Pagination matching Screenshot */}
                <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-600 font-medium">
                  {/* Left: Item Counter */}
                  <div>
                    1-{displayedProducts.length} of 300 items
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
                      className="w-7 h-7 rounded text-xs font-bold hover:bg-slate-100 text-slate-700"
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
                    <div className="border border-slate-200 rounded-lg px-2.5 py-1 text-xs bg-white shadow-sm flex items-center gap-1">
                      <span>12 / page</span>
                      <ChevronDown className="w-3 h-3 text-slate-500" />
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

      {/* Quick View Product Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl p-6 border border-slate-100">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-black hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Product Image */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#f4f7f9] p-4 flex items-center justify-center">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-[#5a8ea7] uppercase tracking-wider">
                    {quickViewProduct.factory} &bull; {quickViewProduct.genre}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    {quickViewProduct.name}
                  </h3>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Material:</span>
                    <span>{quickViewProduct.material || "HDPE / PET"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Capacity:</span>
                    <span>{quickViewProduct.capacity || "Custom"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Shape:</span>
                    <span>{quickViewProduct.shape}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Category:</span>
                    <span>{quickViewProduct.subCategory}</span>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => handleOpenRFQ(quickViewProduct)}
                    className="flex-1 py-3 rounded-xl bg-[#5a8ea7] hover:bg-[#487388] text-white font-bold text-sm shadow-md transition-all active:scale-95"
                  >
                    Request Quotation
                  </button>
                  <button
                    onClick={() => setQuickViewProduct(null)}
                    className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RFQ Drawer */}
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
