"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RFQDrawer from "@/components/rfq/RFQDrawer";
import { siteButtonClass, siteFilterTabClass } from "@/components/common/SiteButton";
import { smoothScrollToElement } from "@/lib/smoothScroll";
import type { ProductItem } from "@/data/companyData";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  CheckCircle2,
  Cpu,
  Droplets,
  Factory,
  FlaskConical,
  Globe,
  Handshake,
  Layers,
  Leaf,
  PackageCheck,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

type BrandCategory =
  | "water"
  | "paints"
  | "pharma"
  | "fmcg"
  | "food"
  | "industrial";

interface BrandPartner {
  id: string;
  name: string;
  monogram: string;
  category: BrandCategory;
  categoryLabel: string;
  scope: string;
  packagingFormat: string;
  tier: "Multinational" | "National Leader" | "Regional Export" | "Industrial Partner";
  accentClass: string;
}

interface SectorShowcase {
  id: BrandCategory;
  label: string;
  headline: string;
  summary: string;
  image: string;
  imageAlt: string;
  compliance: string[];
  formats: { label: string; value: string }[];
  anchorClients: string[];
  rfqPreset: ProductItem;
}

const HERO_METRICS = [
  { value: "250+", label: "Active Enterprise Clients" },
  { value: "500M+", label: "Annual Containers Supplied" },
  { value: "6", label: "Core Industry Verticals" },
  { value: "99.8%", label: "On-Time JIT Dispatch" },
];

const SECTOR_SHOWCASES: SectorShowcase[] = [
  {
    id: "water",
    label: "Water & Beverage",
    headline: "Crystal-Clear Virgin PET Bottles, Preforms & Tamper-Evident Closures",
    summary:
      "Precision blow-molded drinking water bottles from 250ml retail packs to 20L dispenser jars, paired with synchronized tamper-evident neck caps for continuous high-speed bottling lines.",
    image: "/images/hero-bottle-splash.jpg",
    imageAlt: "Pure drinking water PET bottle packaging engineered by Noor Plastic Industries",
    compliance: ["BSTI BDS 1414", "ISO 22000:2018", "100% Virgin Food-Grade PET"],
    formats: [
      { label: "Bottle Volumes", value: "250ml, 500ml, 1L, 1.5L, 2L, 5L & 20L" },
      { label: "Preform & Neck", value: "28mm / 30mm PCO & Alaska Closures" },
      { label: "Line Speed", value: "Compatible with 24,000+ BPH rotary fillers" },
      { label: "Quality Check", value: "Top-load crush & in-line leak testing" },
    ],
    anchorClients: ["PRAN Beverage", "Fresh Drinking Water", "Pusti", "Spa / Akij"],
    rfqPreset: {
      id: "sector-water",
      name: "Food-Grade PET Water Bottles & Preforms",
      category: "plastic-bottle",
      categoryLabel: "Packaged Drinking Water & Beverage PET",
      material: "100% Virgin Food-Grade PET",
      capacityRange: "250ml - 20L",
      applications: ["Mineral Water", "Purified Water", "Carbonated Beverages"],
      image: "/images/hero-bottle-splash.jpg",
      description: "Virgin PET bottles, preforms, and tamper-evident closures.",
      features: ["BSTI compliant", "Zero BPA"],
    },
  },
  {
    id: "paints",
    label: "Paints & Coatings",
    headline: "UN-Rated HDPE Pails & Hermetic Lithographed Tinplate Containers",
    summary:
      "Heavy-duty Q-Pail polymer buckets and precision-seamed metal cans designed to resist solvent permeation, automated tinting shaker stress, and stacked warehouse transit.",
    image: "/images/qpail/qpail-facility.jpg",
    imageAlt: "Industrial paint pails and coatings packaging production at Noor Plastic",
    compliance: ["UN Drop-Impact Tested", "Electrolytic Tinplate", "IML & Offset Litho"],
    formats: [
      { label: "Pail Capacities", value: "1L, 4L, 10L, 18L & 20L Reinforced Pails" },
      { label: "Metal Cans", value: "200ml to 4L Seamed Tin Containers" },
      { label: "Decoration", value: "High-definition offset & In-Mold Labeling" },
      { label: "Lid Seal", value: "Airtight gasket & tear-tab tamper locks" },
    ],
    anchorClients: ["Berger Paints", "Asian Paints", "Nippon Paint", "AkzoNobel", "Jotun"],
    rfqPreset: {
      id: "sector-paints",
      name: "Industrial Q-Pail & Lithographed Paint Tin Cans",
      category: "pail-bucket",
      categoryLabel: "Pails & Drums / Tin Cans",
      material: "Impact Copolymer HDPE & ETP Steel",
      capacityRange: "1L - 20L",
      applications: ["Emulsion Paints", "Solvent Coatings", "Varnishes"],
      image: "/images/qpail/qpail-facility.jpg",
      description: "Heavy-duty pails and seamed tinplate cans for paint leaders.",
      features: ["Stackable rib design", "IML compatible"],
    },
  },
  {
    id: "pharma",
    label: "Pharma Cleanroom",
    headline: "Class 100,000 Cleanroom Sterile Bottles, Dropper Vials & Caps",
    summary:
      "Positive-pressure pharmaceutical molding lines producing calibrated ophthalmic droppers, amber liquid syrup bottles, and child-resistant closures under full batch traceability.",
    image: "/images/rnd/rnd-lab-testing.jpg",
    imageAlt: "Pharmaceutical cleanroom container inspection and testing laboratory",
    compliance: ["Class 100k Cleanroom", "DGDA & cGMP", "USP Class VI Resins"],
    formats: [
      { label: "Vial & Dropper", value: "5ml - 30ml Calibrated LDPE Ophthalmic" },
      { label: "Syrup Bottles", value: "60ml - 200ml Amber PET & Medical HDPE" },
      { label: "Closures", value: "CRC / Tamper-Evident Induction Seals" },
      { label: "Validation", value: "Microbiological, torque & drop tests" },
    ],
    anchorClients: ["Square Pharma", "Renata Limited", "ACME Labs", "Radiant Pharma"],
    rfqPreset: {
      id: "sector-pharma",
      name: "Class 100k Cleanroom Pharmaceutical Bottles & Droppers",
      category: "jar-dropper",
      categoryLabel: "Pharmaceutical & Cleanroom Containers",
      material: "USP Medical Grade HDPE / LDPE / Amber PET",
      capacityRange: "5ml - 500ml",
      applications: ["Ophthalmic Drops", "Oral Syrups", "Diagnostic Liquids"],
      image: "/images/rnd/rnd-lab-testing.jpg",
      description: "Cleanroom sterile pharmaceutical containers & tamper caps.",
      features: ["cGMP compliant", "Gamma sterilizable"],
    },
  },
  {
    id: "fmcg",
    label: "FMCG & Edible Oil",
    headline: "High-Volume Consumer Bottles, Jerry Cans & Edible Oil Tinplate",
    summary:
      "Synchronized daily supply agreements built for fast-moving consumer goods, refined edible oils, and household care brands demanding consistent shelf appeal and zero assembly downtime.",
    image: "/images/catalog/prod-1.png",
    imageAlt: "FMCG and industrial HDPE containers and bottles",
    compliance: ["HACCP Certified", "Food-Contact Safe", "99.8% JIT Line Sync"],
    formats: [
      { label: "Edible Oil Packs", value: "500ml, 1L, 2L, 5L PET & 16L Tin Cans" },
      { label: "Household Care", value: "Detergent, Disinfectant & Shampoo HDPE" },
      { label: "Ergonomics", value: "Custom embossed grips & drip-free spouts" },
      { label: "Supply Cadence", value: "Gazipur fleet scheduled daily dispatch" },
    ],
    anchorClients: ["Unilever", "City Group", "TK Group", "Fresh / MGI", "Marico"],
    rfqPreset: {
      id: "sector-fmcg",
      name: "FMCG Bottles & Edible Oil Containers",
      category: "plastic-bottle",
      categoryLabel: "FMCG & Edible Oil Packaging",
      material: "Food-Grade PET & Virgin HDPE",
      capacityRange: "200ml - 16L",
      applications: ["Edible Oils", "Personal Care", "Household Cleaners"],
      image: "/images/catalog/prod-1.png",
      description: "High-speed custom bottles and edible oil containers.",
      features: ["Custom embossing", "High clarity"],
    },
  },
  {
    id: "food",
    label: "Food, Dairy & Lubricants",
    headline: "Hermetic Food Containers, Aerosol Cans & Chemical Barrier Drums",
    summary:
      "Ultra-clear freezer-safe PP dairy tubs alongside corrosion-resistant lubricant cans, aerosol containers, and adhesive pails engineered for multi-sector industrial reliability.",
    image: "/images/catalog/prod-4.png",
    imageAlt: "Food-grade containers, dairy tubs, and specialized packaging",
    compliance: ["FSSC / ISO 22000", "18-Bar Aerosol Burst", "LEED Platinum Plant"],
    formats: [
      { label: "Dairy & Ice Cream", value: "250ml - 2L Freeze-Grade Clear PP Tubs" },
      { label: "Automotive Oils", value: "1L - 5L HDPE Bottles & Metal Engine Tins" },
      { label: "Adhesives & Chem", value: "Solvent-barrier buckets & lacquer tins" },
      { label: "Printing", value: "In-Mold Labeling & multi-color screen print" },
    ],
    anchorClients: ["Aarong Dairy", "Polar Ice Cream", "Pidilite (Fevicol)", "Amoil"],
    rfqPreset: {
      id: "sector-food-industrial",
      name: "Dairy Tubs, Aerosol Cans & Lubricant Packaging",
      category: "food-container",
      categoryLabel: "Food, Dairy & Industrial Packaging",
      material: "BPA-Free Virgin PP / HDPE / ETP Tinplate",
      capacityRange: "150ml - 25L",
      applications: ["Dairy & Ice Cream", "Motor Oils", "Adhesives"],
      image: "/images/catalog/prod-4.png",
      description: "Freezer-grade food tubs and solvent-resistant industrial tins.",
      features: ["HACCP & ISO 22000", "Hermetic seal"],
    },
  },
];

const BRANDS_DIRECTORY: BrandPartner[] = [
  // Water & Beverage Bottlers
  {
    id: "pran-bev",
    name: "PRAN-RFL Beverage",
    monogram: "PR",
    category: "water",
    categoryLabel: "Water & Beverage",
    scope: "High-volume PET mineral water bottles, preforms & 28mm caps",
    packagingFormat: "250ml - 2L PET",
    tier: "National Leader",
    accentClass: "from-cyan-500 to-blue-600",
  },
  {
    id: "mgi-fresh",
    name: "Fresh (Meghna Group)",
    monogram: "FR",
    category: "water",
    categoryLabel: "Water & Beverage",
    scope: "Crystal-clear drinking water PET bottles & 5L bulk dispensers",
    packagingFormat: "500ml - 5L PET",
    tier: "National Leader",
    accentClass: "from-sky-500 to-cyan-600",
  },
  {
    id: "akij-food",
    name: "Akij Food & Beverage",
    monogram: "AF",
    category: "water",
    categoryLabel: "Water & Beverage",
    scope: "Food-grade beverage preforms & tamper-evident closures",
    packagingFormat: "Preforms & Closures",
    tier: "National Leader",
    accentClass: "from-blue-500 to-indigo-600",
  },
  {
    id: "partex-star",
    name: "Partex Beverage (Mum)",
    monogram: "PB",
    category: "water",
    categoryLabel: "Water & Beverage",
    scope: "Lightweighted PET water containers & nitrogen-drop compatible necks",
    packagingFormat: "300ml - 2L PET",
    tier: "National Leader",
    accentClass: "from-cyan-600 to-teal-600",
  },
  {
    id: "city-jibon",
    name: "City Group (Jibon)",
    monogram: "CG",
    category: "water",
    categoryLabel: "Water & Beverage",
    scope: "Packaged drinking water bottles & 20L polycarbonate/PET jars",
    packagingFormat: "500ml - 20L Jars",
    tier: "National Leader",
    accentClass: "from-blue-600 to-cyan-600",
  },

  // Paints & Coatings
  {
    id: "berger",
    name: "Berger Paints Bangladesh",
    monogram: "BP",
    category: "paints",
    categoryLabel: "Paints & Coatings",
    scope: "Custom lithographed tinplate cans & Q-Pail industrial emulsion buckets",
    packagingFormat: "1L - 20L Pails & Tins",
    tier: "Multinational",
    accentClass: "from-indigo-500 to-blue-600",
  },
  {
    id: "asian-paints",
    name: "Asian Paints",
    monogram: "AP",
    category: "paints",
    categoryLabel: "Paints & Coatings",
    scope: "Precision-seamed tin containers & In-Mold Labeled plastic pails",
    packagingFormat: "500ml - 20L IML",
    tier: "Multinational",
    accentClass: "from-amber-500 to-orange-600",
  },
  {
    id: "nippon",
    name: "Nippon Paint",
    monogram: "NP",
    category: "paints",
    categoryLabel: "Paints & Coatings",
    scope: "Solvent-resistant HDPE pails & airtight snap-lock coating buckets",
    packagingFormat: "1L - 20L HDPE Pails",
    tier: "Multinational",
    accentClass: "from-rose-500 to-red-600",
  },
  {
    id: "akzonobel",
    name: "AkzoNobel (Dulux)",
    monogram: "AN",
    category: "paints",
    categoryLabel: "Paints & Coatings",
    scope: "High-durability protective metal cans & custom closure assemblies",
    packagingFormat: "1L - 18L Steel Cans",
    tier: "Multinational",
    accentClass: "from-blue-600 to-sky-500",
  },
  {
    id: "jotun",
    name: "Jotun Bangladesh",
    monogram: "JT",
    category: "paints",
    categoryLabel: "Paints & Coatings",
    scope: "Marine & heavy-duty industrial epoxy tinplate pails & UN drums",
    packagingFormat: "4L - 20L Heavy Tin",
    tier: "Multinational",
    accentClass: "from-slate-700 to-blue-800",
  },
  {
    id: "elite-paint",
    name: "Elite Paint & Chemical",
    monogram: "EP",
    category: "paints",
    categoryLabel: "Paints & Coatings",
    scope: "Decorative & weather-coat metal tins and copolymer paint buckets",
    packagingFormat: "1L - 20L Containers",
    tier: "National Leader",
    accentClass: "from-cyan-600 to-blue-700",
  },
  {
    id: "kansai-nerolac",
    name: "Kansai Nerolac Paints",
    monogram: "KN",
    category: "paints",
    categoryLabel: "Paints & Coatings",
    scope: "Automotive refinish cans & decorative interior coating pails",
    packagingFormat: "500ml - 18L Pails",
    tier: "Multinational",
    accentClass: "from-indigo-600 to-purple-600",
  },
  {
    id: "rainbow-paints",
    name: "Rainbow Paints",
    monogram: "RP",
    category: "paints",
    categoryLabel: "Paints & Coatings",
    scope: "Engineered copolymer paint buckets & seamed litho cans",
    packagingFormat: "1L - 20L Pails",
    tier: "National Leader",
    accentClass: "from-teal-500 to-emerald-600",
  },
  {
    id: "ujala-paints",
    name: "Ujala Paints",
    monogram: "UP",
    category: "paints",
    categoryLabel: "Paints & Coatings",
    scope: "Seamed tinplate packaging & commercial enamel containers",
    packagingFormat: "500ml - 18L Tins",
    tier: "Industrial Partner",
    accentClass: "from-sky-500 to-blue-600",
  },
  {
    id: "roxy-paints",
    name: "Roxy Paints",
    monogram: "RX",
    category: "paints",
    categoryLabel: "Paints & Coatings",
    scope: "Household emulsion pails & automotive metal cans",
    packagingFormat: "1L - 20L Pails",
    tier: "Industrial Partner",
    accentClass: "from-cyan-500 to-teal-600",
  },
  {
    id: "aqua-paints",
    name: "Aqua Paints",
    monogram: "AQ",
    category: "paints",
    categoryLabel: "Paints & Coatings",
    scope: "Water-based exterior coating pails with reinforced handles",
    packagingFormat: "4L - 20L HDPE",
    tier: "Industrial Partner",
    accentClass: "from-blue-500 to-cyan-500",
  },

  // Pharmaceuticals & Healthcare
  {
    id: "square-pharma",
    name: "Square Pharmaceuticals",
    monogram: "SQ",
    category: "pharma",
    categoryLabel: "Pharmaceuticals",
    scope: "Class 100k cleanroom sterile bottles, amber syrups & tamper caps",
    packagingFormat: "10ml - 200ml Cleanroom",
    tier: "National Leader",
    accentClass: "from-emerald-500 to-teal-600",
  },
  {
    id: "renata",
    name: "Renata Limited",
    monogram: "RN",
    category: "pharma",
    categoryLabel: "Pharmaceuticals",
    scope: "Medical-grade HDPE tablet jars & calibrated ophthalmic droppers",
    packagingFormat: "5ml - 500ml USP",
    tier: "National Leader",
    accentClass: "from-teal-600 to-cyan-700",
  },
  {
    id: "acme-labs",
    name: "ACME Laboratories",
    monogram: "AC",
    category: "pharma",
    categoryLabel: "Pharmaceuticals",
    scope: "cGMP liquid syrup containers & tamper-evident induction caps",
    packagingFormat: "60ml - 450ml PET/HDPE",
    tier: "National Leader",
    accentClass: "from-cyan-500 to-blue-600",
  },
  {
    id: "radiant-pharma",
    name: "Radiant Pharmaceuticals",
    monogram: "RD",
    category: "pharma",
    categoryLabel: "Pharmaceuticals",
    scope: "Positive-pressure cleanroom oral suspension & antiseptic bottles",
    packagingFormat: "30ml - 200ml Pharma",
    tier: "National Leader",
    accentClass: "from-blue-600 to-indigo-600",
  },
  {
    id: "aristopharma",
    name: "Aristopharma Ltd.",
    monogram: "AR",
    category: "pharma",
    categoryLabel: "Pharmaceuticals",
    scope: "Ophthalmic LDPE dropper bottles & sterile nasal spray vials",
    packagingFormat: "5ml - 100ml LDPE",
    tier: "National Leader",
    accentClass: "from-emerald-600 to-cyan-600",
  },
  {
    id: "healthcare-pharma",
    name: "Healthcare Pharmaceuticals",
    monogram: "HP",
    category: "pharma",
    categoryLabel: "Pharmaceuticals",
    scope: "Child-resistant closures & amber PET liquid formulation bottles",
    packagingFormat: "50ml - 200ml PET",
    tier: "National Leader",
    accentClass: "from-sky-600 to-blue-700",
  },
  {
    id: "popular-pharma",
    name: "Popular Pharmaceuticals",
    monogram: "PP",
    category: "pharma",
    categoryLabel: "Pharmaceuticals",
    scope: "Cleanroom hygienic closures, vials & topical ointment jars",
    packagingFormat: "15ml - 250ml Jars",
    tier: "National Leader",
    accentClass: "from-teal-500 to-blue-600",
  },
  {
    id: "reckitt",
    name: "Reckitt (Dettol / Harpic)",
    monogram: "RK",
    category: "pharma",
    categoryLabel: "Healthcare & Hygiene",
    scope: "Antiseptic PET bottles, directional neck toilet bottles & aerosols",
    packagingFormat: "100ml - 5L HDPE/Tin",
    tier: "Multinational",
    accentClass: "from-emerald-500 to-green-600",
  },

  // FMCG & Edible Oil Conglomerates
  {
    id: "unilever",
    name: "Unilever Bangladesh",
    monogram: "UL",
    category: "fmcg",
    categoryLabel: "FMCG & Household",
    scope: "Ergonomic personal care HDPE bottles, shampoo packs & home care jars",
    packagingFormat: "100ml - 2L HDPE",
    tier: "Multinational",
    accentClass: "from-blue-600 to-indigo-700",
  },
  {
    id: "marico",
    name: "Marico (Parachute)",
    monogram: "MR",
    category: "fmcg",
    categoryLabel: "Personal Care",
    scope: "Signature rigid hair-oil bottles & tamper-evident flip-top closures",
    packagingFormat: "100ml - 500ml HDPE",
    tier: "Multinational",
    accentClass: "from-cyan-500 to-sky-600",
  },
  {
    id: "tk-group",
    name: "TK Group (Pusti)",
    monogram: "TK",
    category: "fmcg",
    categoryLabel: "Edible Oil & FMCG",
    scope: "Soybean edible oil PET bottles, 5L jerry cans & 16L tinplate oil cans",
    packagingFormat: "500ml - 16L Oil",
    tier: "National Leader",
    accentClass: "from-amber-500 to-yellow-600",
  },
  {
    id: "city-teer",
    name: "City Group (Teer)",
    monogram: "CT",
    category: "fmcg",
    categoryLabel: "Edible Oil & FMCG",
    scope: "Food-grade refined oil PET containers & commercial bulk tin cans",
    packagingFormat: "1L - 16L Oil Packs",
    tier: "National Leader",
    accentClass: "from-sky-500 to-blue-600",
  },
  {
    id: "bashundhara-food",
    name: "Bashundhara Food",
    monogram: "BF",
    category: "fmcg",
    categoryLabel: "FMCG Conglomerate",
    scope: "Edible oil PET bottles, wide-mouth food jars & HDPE jerry cans",
    packagingFormat: "500ml - 5L PET/HDPE",
    tier: "National Leader",
    accentClass: "from-blue-600 to-cyan-600",
  },
  {
    id: "quazi",
    name: "Quazi Enterprises",
    monogram: "QE",
    category: "fmcg",
    categoryLabel: "Household Care",
    scope: "18-bar tested aerosol insecticide cans & household liquid pails",
    packagingFormat: "250ml - 750ml Aerosol",
    tier: "National Leader",
    accentClass: "from-indigo-500 to-blue-600",
  },
  {
    id: "kohinoor",
    name: "Kohinoor Chemical (Tibet)",
    monogram: "KC",
    category: "fmcg",
    categoryLabel: "Personal Care",
    scope: "Cosmetic jars, detergent containers & flip-top closures",
    packagingFormat: "50ml - 2L Rigid",
    tier: "National Leader",
    accentClass: "from-teal-500 to-cyan-600",
  },

  // Food & Dairy
  {
    id: "aarong-dairy",
    name: "Aarong Dairy (BRAC)",
    monogram: "AD",
    category: "food",
    categoryLabel: "Dairy & Food",
    scope: "HACCP certified tamper-proof yogurt tubs, ghee jars & milk bottles",
    packagingFormat: "200ml - 2L PP/PET",
    tier: "National Leader",
    accentClass: "from-amber-500 to-orange-500",
  },
  {
    id: "polar",
    name: "Polar Ice Cream",
    monogram: "PL",
    category: "food",
    categoryLabel: "Dairy & Frozen",
    scope: "Deep-freeze virgin polypropylene ice cream tubs with IML branding",
    packagingFormat: "500ml - 2L Freezer PP",
    tier: "National Leader",
    accentClass: "from-sky-500 to-blue-500",
  },
  {
    id: "savoy",
    name: "Savoy Ice Cream",
    monogram: "SV",
    category: "food",
    categoryLabel: "Dairy & Frozen",
    scope: "High-clarity hermetic frozen dessert tubs & snap-fit lids",
    packagingFormat: "500ml - 1.5L PP Tubs",
    tier: "Regional Export",
    accentClass: "from-cyan-500 to-indigo-500",
  },
  {
    id: "acme-agro",
    name: "Lalbagh Food & Flavors",
    monogram: "LB",
    category: "food",
    categoryLabel: "Culinary Packaging",
    scope: "Airtight spice jars & culinary essence tinplate containers",
    packagingFormat: "100ml - 1L Jars/Tins",
    tier: "Industrial Partner",
    accentClass: "from-emerald-500 to-teal-600",
  },

  // Industrial, Adhesives & Lubricants
  {
    id: "pidilite",
    name: "Pidilite (Fevicol / M-Seal)",
    monogram: "PD",
    category: "industrial",
    categoryLabel: "Adhesives",
    scope: "Solvent-proof adhesive containers, precision nozzles & resin buckets",
    packagingFormat: "500g - 20kg Buckets",
    tier: "Multinational",
    accentClass: "from-blue-600 to-cyan-600",
  },
  {
    id: "navana-lube",
    name: "Navana Lubricants",
    monogram: "NV",
    category: "industrial",
    categoryLabel: "Automotive Oils",
    scope: "Engine oil HDPE bottles with level strips & 20L lubricant pails",
    packagingFormat: "1L - 20L HDPE/Tin",
    tier: "National Leader",
    accentClass: "from-slate-600 to-blue-700",
  },
  {
    id: "amoil",
    name: "Amoil Lubricants",
    monogram: "AM",
    category: "industrial",
    categoryLabel: "Automotive Oils",
    scope: "Lithographed motor oil tinplate cans & anti-counterfeit induction caps",
    packagingFormat: "1L - 5L Oil Cans",
    tier: "Industrial Partner",
    accentClass: "from-indigo-600 to-slate-700",
  },
  {
    id: "kp-lube",
    name: "KP Lubricants",
    monogram: "KP",
    category: "industrial",
    categoryLabel: "Lubricants",
    scope: "Heavy-duty grease pails & multi-layer barrier automotive bottles",
    packagingFormat: "1L - 18L Pails",
    tier: "Industrial Partner",
    accentClass: "from-cyan-700 to-slate-800",
  },
  {
    id: "prestige-bengal",
    name: "Prestige Bengal Chemicals",
    monogram: "PB",
    category: "industrial",
    categoryLabel: "Industrial Chemicals",
    scope: "UN-grade industrial solvent drums & chemical-barrier jerry cans",
    packagingFormat: "5L - 25L Jerry Cans",
    tier: "Industrial Partner",
    accentClass: "from-blue-700 to-indigo-800",
  },
];

const ONBOARDING_STEPS = [
  {
    step: "01",
    icon: Cpu,
    title: "CAD & Container Spec Brief",
    desc: "Share your liquid viscosity, neck finish, weight target, and shelf design. Our R&D engineers build 3D CAD drawings in 48 hours.",
  },
  {
    step: "02",
    icon: Factory,
    title: "In-House CNC Tooling & Sample",
    desc: "Our Kaliakoir tool room fabricates precision pilot molds and dispatches physical sample bottles or pails for line-fit trials.",
  },
  {
    step: "03",
    icon: FlaskConical,
    title: "Cleanroom QC & Validation",
    desc: "Every container passes drop-impact, top-load crush, vacuum leak, and BSTI / ISO 22000 material safety verification.",
  },
  {
    step: "04",
    icon: Truck,
    title: "Synchronized JIT Supply",
    desc: "Dedicated transport fleet delivers sealed, palletized containers directly to your filling line on a locked monthly schedule.",
  },
];

const CATEGORY_TABS: { id: "all" | BrandCategory; label: string }[] = [
  { id: "all", label: `All Partners (${BRANDS_DIRECTORY.length})` },
  { id: "water", label: "Water & Beverage" },
  { id: "paints", label: "Paints & Coatings" },
  { id: "pharma", label: "Pharmaceuticals" },
  { id: "fmcg", label: "FMCG & Edible Oil" },
  { id: "food", label: "Food & Dairy" },
  { id: "industrial", label: "Adhesives & Lubricants" },
];

export default function BrandsWeWorkWithPage() {
  const [activeSector, setActiveSector] = useState<BrandCategory>("water");
  const [selectedCategory, setSelectedCategory] = useState<"all" | BrandCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllPartners, setShowAllPartners] = useState(false);
  const [isRFQOpen, setIsRFQOpen] = useState(false);
  const [selectedProductForRFQ, setSelectedProductForRFQ] = useState<ProductItem | null>(null);

  const currentSector = useMemo(
    () => SECTOR_SHOWCASES.find((s) => s.id === activeSector) || SECTOR_SHOWCASES[0],
    [activeSector]
  );

  const filteredBrands = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return BRANDS_DIRECTORY.filter((brand) => {
      const matchesCat = selectedCategory === "all" || brand.category === selectedCategory;
      const matchesQuery =
        !q ||
        brand.name.toLowerCase().includes(q) ||
        brand.scope.toLowerCase().includes(q) ||
        brand.packagingFormat.toLowerCase().includes(q) ||
        brand.categoryLabel.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const displayedBrands = useMemo(() => {
    if (showAllPartners || selectedCategory !== "all" || searchQuery.trim() !== "") {
      return filteredBrands;
    }
    return filteredBrands.slice(0, 12);
  }, [filteredBrands, showAllPartners, selectedCategory, searchQuery]);

  const openRFQWithPreset = (preset: ProductItem | null) => {
    setSelectedProductForRFQ(preset);
    setIsRFQOpen(true);
  };

  const handleBrandCardClick = (brand: BrandPartner) => {
    openRFQWithPreset({
      id: `brand-${brand.id}`,
      name: `Similar Spec to ${brand.name} (${brand.packagingFormat})`,
      category:
        brand.category === "paints"
          ? "pail-bucket"
          : brand.category === "pharma"
          ? "jar-dropper"
          : brand.category === "food"
          ? "food-container"
          : "plastic-bottle",
      categoryLabel: brand.categoryLabel,
      material: "Food / Industrial Grade Polymer or Tinplate",
      capacityRange: brand.packagingFormat,
      applications: [brand.scope],
      image: "/images/catalog/prod-1.png",
      description: brand.scope,
      features: [brand.tier],
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f8fb] text-[#0a1f33]">
      <Navbar />

      <main className="flex-1 relative">
        {/* ============================================================ */}
        {/* 1. ATMOSPHERIC OCEAN-GLASS HERO SECTION                      */}
        {/* ============================================================ */}
        <section
          id="hero"
          className="relative w-full min-h-[580px] sm:min-h-[660px] lg:min-h-[82vh] bg-[#04182b] overflow-hidden flex flex-col justify-between pt-28 sm:pt-32 pb-10 sm:pb-14 select-none"
        >
          {/* Partnership Photo Backdrop + Oceanic Gradient Layering */}
          <div className="absolute inset-0">
            <Image
              src="/images/brands-hero.jpg"
              alt="Noor Plastic Industries Corporate Packaging Partnerships"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-55"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#04182b]/95 via-[#093256]/80 to-[#06243d]/90" />
            <div
              aria-hidden="true"
              className="absolute -top-24 right-1/4 w-[620px] h-[620px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(34,211,238,0.20) 0%, transparent 70%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-32 -left-24 w-[560px] h-[560px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
              }}
            />
          </div>

          {/* Main Hero Editorial Block */}
          <div className="relative z-10 w-[96%] max-w-[1440px] mx-auto px-4 sm:px-8 my-auto py-8">
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-300/30 bg-white/10 backdrop-blur-md text-cyan-200 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg">
                <Handshake className="w-4 h-4 text-cyan-300" />
                <span>Enterprise OEM Alliances &bull; Kaliakoir, Gazipur</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-black text-white tracking-tight leading-[1.07]">
                Packaging Partners Behind{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-teal-300">
                  Bangladesh&apos;s Leading Brands
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200/90 max-w-2xl leading-relaxed font-normal">
                From BSTI-compliant PET drinking water lines and Class 100k pharmaceutical cleanrooms to
                multinational paint pails, edible oils, and FMCG giants — Noor Plastic Industries
                engineers packaging built for zero assembly-line downtime.
              </p>

              {/* Hero CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => openRFQWithPreset(null)}
                  className={siteButtonClass({ variant: "primary" })}
                >
                  <span>Become a Supply Partner</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => smoothScrollToElement("partner-directory")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/25 bg-white/10 backdrop-blur-md text-white text-sm font-bold hover:bg-white/20 hover:border-cyan-300/50 transition-colors cursor-pointer"
                >
                  <span>Explore Partner Directory</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Frosted Glass KPI Metrics Strip */}
          <div className="relative z-10 w-[96%] max-w-[1440px] mx-auto px-4 sm:px-8 pt-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {HERO_METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-5 py-4 flex flex-col justify-between"
                >
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-xs sm:text-sm text-cyan-100/80 font-medium mt-0.5">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. INTERACTIVE SECTOR PACKAGING SHOWCASE                      */}
        {/* ============================================================ */}
        <section className="relative py-16 sm:py-24 px-4 sm:px-8 bg-white border-b border-slate-100 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-[620px] h-[620px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 w-[96%] max-w-[1440px] mx-auto">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-700 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sector-Specific Engineering</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Tailored Containers Built Around Each Industry&apos;s Standard
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 max-w-md leading-relaxed">
                Select an industry vertical below to inspect material grades, compliance standards,
                and the packaging lines we operate for our partners.
              </p>
            </div>

            {/* Interactive Sector Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              {SECTOR_SHOWCASES.map((sector) => {
                const isActive = sector.id === activeSector;
                return (
                  <button
                    key={sector.id}
                    type="button"
                    onClick={() => setActiveSector(sector.id)}
                    className={siteFilterTabClass(isActive)}
                  >
                    {sector.label}
                  </button>
                );
              })}
            </div>

            {/* Active Sector Architectural Feature Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-[32px] bg-[#f7fbff] border border-slate-200/80 p-5 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(8,47,78,0.06)]">
              {/* Visual Column */}
              <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[340px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/60">
                <Image
                  src={currentSector.image}
                  alt={currentSector.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061d34]/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {currentSector.compliance.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-[11px] font-bold shadow-sm"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specifications & Anchor Brands Column */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700">
                    <Layers className="w-4 h-4" />
                    <span>{currentSector.label} Vertical</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {currentSector.headline}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {currentSector.summary}
                  </p>

                  {/* 2x2 Technical Specs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {currentSector.formats.map((spec) => (
                      <div
                        key={spec.label}
                        className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs"
                      >
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {spec.label}
                        </div>
                        <div className="text-sm font-bold text-slate-900 mt-1">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Anchor Clients + Action Bar */}
                <div className="pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Anchor Partners in This Sector
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {currentSector.anchorClients.map((client) => (
                        <span
                          key={client}
                          className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700"
                        >
                          {client}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => openRFQWithPreset(currentSector.rfqPreset)}
                      className={siteButtonClass({ variant: "primary" })}
                    >
                      <span>Request Sector Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. ENTERPRISE BRAND DIRECTORY (INTERACTIVE CARDS)            */}
        {/* ============================================================ */}
        <section
          id="partner-directory"
          className="relative py-16 sm:py-24 px-4 sm:px-8 bg-[#f4f8fb] border-b border-slate-200/60"
        >
          <div className="w-[96%] max-w-[1440px] mx-auto">
            {/* Section Title + Search */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-[#094e9b] text-xs font-bold uppercase tracking-wider shadow-2xs">
                  <Building2 className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Verified B2B Portfolio</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Brands &amp; Business Associates
                </h2>
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
                  Filter by industry sector or search by container specification. Click any partner
                  card to request a matched packaging quotation.
                </p>
              </div>

              {/* Search Input */}
              <div className="relative w-full lg:w-80 shrink-0">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search brand, PET, HDPE, tin can..."
                  aria-label="Search partner brands"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200/90 text-sm text-slate-900 placeholder-slate-400 shadow-xs focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-8 pb-6 border-b border-slate-200/80">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(tab.id);
                    setShowAllPartners(false);
                  }}
                  className={siteFilterTabClass(selectedCategory === tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Directory Status Line */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 text-xs font-bold uppercase tracking-wider text-slate-500">
              <span>
                Showing {displayedBrands.length} of {filteredBrands.length} Enterprise Partners
              </span>
              <span className="inline-flex items-center gap-1.5 text-cyan-700">
                <PackageCheck className="w-4 h-4" />
                Click any card to request matched packaging specs
              </span>
            </div>

            {/* Responsive Interactive Partner Cards (Stationary Hitboxes - Zero Shake) */}
            {displayedBrands.length === 0 ? (
              <div className="rounded-3xl bg-white border border-slate-200/80 p-12 text-center space-y-3">
                <p className="text-lg font-bold text-slate-900">No matching brand partner found</p>
                <p className="text-sm text-slate-500">
                  Try clearing your search keyword or switching to &ldquo;All Partners&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className={siteButtonClass({ variant: "primary", className: "mt-2" })}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {displayedBrands.map((brand) => (
                  <button
                    key={brand.id}
                    type="button"
                    onClick={() => handleBrandCardClick(brand)}
                    className="water-fill-card group text-left rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 p-5 sm:p-6 shadow-[0_6px_24px_rgba(15,23,42,0.04)] flex flex-col justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                  >
                    <div className="space-y-3.5">
                      {/* Monogram Emblem + Origin Tier Pill */}
                      <div className="flex items-start justify-between gap-3">
                        <div
                          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${brand.accentClass} text-white font-black text-sm tracking-tight flex items-center justify-center shadow-sm shrink-0`}
                        >
                          {brand.monogram}
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200/70 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                          {brand.tier}
                        </span>
                      </div>

                      {/* Brand Name & Vertical */}
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-700">
                          {brand.categoryLabel}
                        </div>
                        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-[#094e9b] transition-colors mt-0.5 leading-snug">
                          {brand.name}
                        </h3>
                      </div>

                      {/* Supply Scope */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                        {brand.scope}
                      </p>
                    </div>

                    {/* Packaging Spec Footer */}
                    <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2 text-xs font-bold">
                      <span className="text-slate-700 truncate">{brand.packagingFormat}</span>
                      <span className="inline-flex items-center gap-1 text-[#094e9b] group-hover:text-cyan-600 transition-colors shrink-0">
                        <span>Quote</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Expand / Collapse All Partners Button */}
            {selectedCategory === "all" && searchQuery.trim() === "" && filteredBrands.length > 12 && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllPartners((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white border border-slate-300 text-slate-900 text-sm font-bold shadow-xs hover:border-cyan-500 hover:text-[#094e9b] transition-colors cursor-pointer"
                >
                  <span>
                    {showAllPartners
                      ? "Show Featured 12 Partners"
                      : `View All ${filteredBrands.length} Enterprise Partners`}
                  </span>
                  <ArrowRight className="w-4 h-4 text-cyan-600" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. HOW BRANDS ONBOARD WITH US (4-STEP WORKFLOW)              */}
        {/* ============================================================ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 bg-white border-b border-slate-100">
          <div className="w-[96%] max-w-[1440px] mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#094e9b] text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
                <span>OEM Partnership Workflow</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                From Packaging Brief to Synchronized Line Supply
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                A transparent, engineering-first onboarding pipeline built for fast-moving production teams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {ONBOARDING_STEPS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="rounded-3xl bg-[#f7fbff] border border-slate-200/80 p-6 sm:p-7 flex flex-col justify-between space-y-5 hover:border-cyan-300/70 hover:shadow-[0_16px_40px_rgba(6,182,212,0.12)] transition-[box-shadow,border-color] duration-500"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-cyan-100 text-[#094e9b] flex items-center justify-center shadow-xs">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-black text-cyan-600/35 tracking-tight">
                          {item.step}
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="h-1 w-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. OCEAN-NAVY PARTNERSHIP CTA & PROOF LINKS                  */}
        {/* ============================================================ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#f4f8fb]">
          <div className="w-[96%] max-w-[1440px] mx-auto">
            <div className="relative rounded-[36px] bg-gradient-to-br from-[#061d34] via-[#0a3154] to-[#0e4e73] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-[0_25px_65px_rgba(6,29,52,0.22)]">
              {/* Ambient Orbs */}
              <div
                aria-hidden="true"
                className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(34,211,238,0.22) 0%, transparent 70%)",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-24 left-12 w-80 h-80 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(59,130,246,0.20) 0%, transparent 70%)",
                }}
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-cyan-200 text-xs font-bold uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5 text-cyan-300" />
                    <span>LEED Platinum Green Supply Chain</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                    Ready to Scale Your Brand&apos;s Container &amp; Water Packaging Supply?
                  </h2>
                  <p className="text-sm sm:text-base text-cyan-100/85 leading-relaxed max-w-2xl">
                    Book a technical consultation with our Kaliakoir engineering team for custom mold
                    prototyping, high-volume contract pricing, or physical packaging samples.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm text-cyan-100/90 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <Droplets className="w-4 h-4 text-cyan-300" /> Virgin PET &amp; HDPE
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-cyan-300" /> Class 100k Cleanrooms
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Leaf className="w-4 h-4 text-emerald-300" /> 100% Recyclable Polymers
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-end justify-end gap-3.5">
                  <button
                    type="button"
                    onClick={() => openRFQWithPreset(null)}
                    className={siteButtonClass({ variant: "primary", className: "justify-center" })}
                  >
                    <span>Open B2B RFQ Drawer</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    href="/case-studies"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/25 bg-white/10 backdrop-blur-md text-white text-sm font-bold hover:bg-white/20 transition-colors"
                  >
                    <span>Read Case Studies</span>
                    <Globe className="w-4 h-4 text-cyan-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <RFQDrawer
        isOpen={isRFQOpen}
        onClose={() => setIsRFQOpen(false)}
        initialProduct={selectedProductForRFQ}
      />

      <Footer />
    </div>
  );
}
