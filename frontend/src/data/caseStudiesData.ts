export interface CaseStudy {
  id: string;
  slug?: string;
  client: string;
  industry: string;
  title: string;
  subtitle: string;
  coverImage: string;
  stats: { label: string; value: string }[];
  challenge: string;
  solution: string;
  results: string[];
  specs: { key: string; value: string }[];
  quote: { text: string; author: string; role: string };
  isActive?: boolean;
  sortOrder?: number;
}

export const CASE_STUDY_INDUSTRIES = [
  "Paints & Coatings",
  "Pharmaceuticals",
  "Chemicals & Lubricants",
  "FMCG & Food",
];

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: "case-berger",
    slug: "case-berger",
    client: "Berger Paints & Asian Paints",
    industry: "Paints & Coatings",
    title: "Transitioning 20L Heavy-Duty Pails to 100% Recyclable Polypropylene",
    subtitle: "Custom-engineered triple-lock tamper-evident lids preventing transit leakage and stacking deformation.",
    coverImage: "/images/business-banner.jpg",
    stats: [
      { label: "Transit Leakage", value: "0.00%" },
      { label: "Top-Load Compressive Strength", value: "+32%" },
      { label: "Recyclability", value: "100% PP" },
    ],
    challenge:
      "Large 20-liter industrial paint pails were suffering from lid popping and perimeter seal leakage during rugged transport across remote distributor networks. Existing packaging designs also used mixed materials that prevented easy post-consumer recycling.",
    solution:
      "Noor Plastic's R&D team deployed 3D Moldflow simulations to redesign the rim geometry, introducing a triple-lock elastomeric bead profile. Using our precision multi-cavity molds, we inject 100% pure virgin polypropylene with integrated tamper-evident tear bands.",
    results: [
      "Zero reported transit leakages across high-volume national deliveries.",
      "Achieved 6-tier vertical warehouse stacking without container buckling.",
      "Delivered 100% monomaterial PP design supporting enterprise recycling mandates.",
    ],
    specs: [
      { key: "Container Capacity", value: "20 Liters (5.28 Gallons)" },
      { key: "Material", value: "Impact-Modified Polypropylene (PP)" },
      { key: "Closure System", value: "Triple-Lock Tear Band with Gasketless Seal" },
      { key: "Drop Test Height", value: "1.8 Meters (Full Container)" },
    ],
    quote: {
      text: "Noor Plastic transformed our flagship industrial packaging. Zero leaks and superior sidewall rigidity gave our brand reliable protection across nationwide distribution.",
      author: "Head of Supply Chain",
      role: "Tier-1 Paint Corporation, Bangladesh",
    },
  },
  {
    id: "case-square",
    slug: "case-square",
    client: "Square Pharma & Healthcare Partners",
    industry: "Pharmaceuticals",
    title: "Hygienic Cleanroom Production of Precision Dropper Bottles",
    subtitle: "Gamma-compatible medical bottles with calibrated drop-tip orifices and child-resistant closures.",
    coverImage: "/images/rnd/rnd-lab-testing.jpg",
    stats: [
      { label: "Cleanroom Standard", value: "ISO Class 8" },
      { label: "Drop Volume Accuracy", value: "±0.02 mL" },
      { label: "DGDA Compliance", value: "100%" },
    ],
    challenge:
      "Pharmaceutical formulations required sterile ophthalmic and oral dropper containers manufactured in particulate-controlled zones. Conventional suppliers suffered from inconsistent dropper orifice tolerances causing dosage variances.",
    solution:
      "We configured an enclosed cleanroom manufacturing cell at our Kaliakoir campus with HEPA positive air pressure and automated optical sorting to maintain sub-micron tip tolerances.",
    results: [
      "Full adherence to strict pharmaceutical cleanroom container tolerances.",
      "Dosage accuracy validated within ±0.02 mL across continuous production lots.",
      "Automated demolding and sanitary bagging eliminating manual handling.",
    ],
    specs: [
      { key: "Volume Capacities", value: "10 mL, 15 mL, 30 mL" },
      { key: "Resin Specification", value: "Medical-Grade LDPE & HDPE" },
      { key: "Sterilization Compatibility", value: "Gamma Radiation & ETO" },
      { key: "Cleanroom Standard", value: "Positive-Pressure Clean Zone" },
    ],
    quote: {
      text: "Their automated cleanroom workflow and strict lot documentation make Noor Plastic a dependable primary packaging supplier.",
      author: "Director of Quality Assurance",
      role: "Leading Pharmaceutical Manufacturer",
    },
  },
  {
    id: "case-mobil",
    slug: "case-mobil",
    client: "Lubricant & Automotive Distributors",
    industry: "Chemicals & Lubricants",
    title: "High-Barrier 1L & 5L HDPE Containers for Synthetic Lubricants",
    subtitle: "Multi-layer chemical-resistant HDPE containers with tamper-evident induction foil seals.",
    coverImage: "/cropped/product-card-1.png",
    stats: [
      { label: "Hydrostatic Pressure", value: "250 kPa" },
      { label: "Seal Integrity", value: "100% Inline" },
      { label: "Drop Rating", value: "UN Group II" },
    ],
    challenge:
      "High-performance synthetic motor oils and additives can induce paneling or environmental stress cracking inside thin-walled bottles stored in warm warehouses.",
    solution:
      "Noor Plastic engineered fluorinated and thick-barrier HDPE bottles with induction-weld aluminum foil liners and anti-glug neck geometry for zero spillage.",
    results: [
      "Eliminated bottle paneling deformability across 50°C tropical storage trials.",
      "100% induction seal verification preventing transit seepage and counterfeiting.",
      "Ergonomic pour handle geometry reducing operator fatigue.",
    ],
    specs: [
      { key: "Container Format", value: "1L, 4L & 5L Ergonomic Jerrycans" },
      { key: "Material", value: "High-Molecular Weight HDPE" },
      { key: "Neck Closure", value: "Tamper-Evident Ratchet Cap + Induction Liner" },
      { key: "Barrier Performance", value: "Zero Hydrocarbon Vapor Migration" },
    ],
    quote: {
      text: "The structural integrity and anti-counterfeit seals on Noor Plastic containers protect our lubricants from transit damage and market imitation.",
      author: "Operations Manager",
      role: "Regional Energy & Lubricants Distributor",
    },
  },
  {
    id: "case-unilever",
    slug: "case-unilever",
    client: "FMCG Beverage & Hydration Brands",
    industry: "FMCG & Food",
    title: "18% Package Lightweighting Without Sacrificing Top-Load Strength",
    subtitle: "Finite element stress analysis delivering substantial polymer savings across pure water bottle lines.",
    coverImage: "/images/rnd/rnd-green-caps.jpg",
    stats: [
      { label: "Weight Reduction", value: "18%" },
      { label: "Annual Resin Saved", value: "140 Tons" },
      { label: "Drop Survival Rate", value: "99.9%" },
    ],
    challenge:
      "Brand owners needed to reduce virgin PET & HDPE usage across high-volume water and home-care bottles without compromising pallet stacking strength or high-speed capping torque.",
    solution:
      "Our engineering team optimized parison wall distribution and introduced reinforced shoulder micro-ribbing, cutting 18% resin mass while improving vertical crush load.",
    results: [
      "Substantial virgin polymer savings across annual high-volume runs.",
      "Preserved identical conveyor dimensions with zero filling-line downtime.",
      "Full drop-test pass compliance from 1.5 meters.",
    ],
    specs: [
      { key: "Product Line", value: "Pure Water & Home-Care Bottles" },
      { key: "Resin Base", value: "Food-Grade Virgin PET / HDPE" },
      { key: "Weight Optimization", value: "18% Controlled Parison Reduction" },
      { key: "Tooling Method", value: "Multi-Cavity Stretch Blow Molding" },
    ],
    quote: {
      text: "Noor Plastic proved that lightweighting and structural stacking performance go hand in hand.",
      author: "Sustainability & Packaging Lead",
      role: "National FMCG Beverage Group",
    },
  },
  {
    id: "case-edible-oil",
    slug: "case-edible-oil",
    client: "Edible Oil & Food Processors",
    industry: "FMCG & Food",
    title: "5-Liter Food-Grade Virgin PET & PP Jars with Air-Tight Pour Spouts",
    subtitle: "Crystal-clear food safety packaging preserving freshness from refinery to kitchen.",
    coverImage: "/cropped/product-card-2.png",
    stats: [
      { label: "Shelf Freshness", value: "24 Months" },
      { label: "Migration Safety", value: "100% Virgin" },
      { label: "Line Speed Fitment", value: "160 bpm" },
    ],
    challenge:
      "Edible oil and culinary processors required odorless, crystal-clear 2L and 5L containers with heavy-duty ergonomic carry handles able to handle high-speed automated filling lines.",
    solution:
      "We engineered double-ribbed 5L virgin PET and PP food-grade jars paired with snap-on drip-free spouts verified for oxygen barrier stability.",
    results: [
      "Zero flavor or aroma migration certified under food-contact testing.",
      "High-clarity shelf presence boosting retail consumer preference.",
      "Smooth operation at high bottling conveyor velocities.",
    ],
    specs: [
      { key: "Application", value: "Edible Oils, Ghee & Drinking Water" },
      { key: "Polymer Grade", value: "100% Virgin BPA-Free Food-Grade PET/PP" },
      { key: "Handle Spec", value: "Reinforced Integrated Carry Grip" },
      { key: "Closure", value: "Tamper-Evident Snap-Spout Cap" },
    ],
    quote: {
      text: "Consistent neck finish and crystal-clear sidewalls from Noor Plastic keep our automated filling lines running at peak efficiency.",
      author: "Plant Manager",
      role: "National Food & Edible Oil Brand",
    },
  },
  {
    id: "case-chemical-pails",
    slug: "case-chemical-pails",
    client: "Textile Dyes & Industrial Chemical Buyers",
    industry: "Chemicals & Lubricants",
    title: "Heavy-Duty 25L HDPE Open-Head Drums with EPDM Gasketed Clamps",
    subtitle: "Stackable chemical containment engineered for humid monsoon warehouse conditions.",
    coverImage: "/cropped/factory-building-user.png",
    stats: [
      { label: "Stacking Load", value: "Up to 4 Tiers" },
      { label: "Moisture Seal", value: "100% Airtight" },
      { label: "ESCR Rating", value: "> 1,000 hrs" },
    ],
    challenge:
      "Textile dye powders clumped whenever moisture penetrated conventional container lids during monsoon transit across Gazipur and Narayanganj factories.",
    solution:
      "We supplied high-density copolymer HDPE drums with recessed nesting bottoms and galvanized steel lever-lock EPDM gasketed clamping rings.",
    results: [
      "Zero moisture ingress complaints during peak monsoon shipments.",
      "Reusable heavy-duty drum walls supporting multi-trip factory logistics.",
      "Unified pallet footprint increasing container truck loading density by 14%.",
    ],
    specs: [
      { key: "Nominal Capacity", value: "25 Liters / 50 Liters" },
      { key: "Closure Gasket", value: "Chemical-Resistant EPDM Rubber Seal" },
      { key: "Locking Ring", value: "Galvanized Steel Lever-Lock Latch" },
      { key: "UV Stabilization", value: "Outdoor-Rated UV8 Additive Package" },
    ],
    quote: {
      text: "Noor Plastic's heavy-duty HDPE pails ended moisture spoilage in our dye shipments across Bangladesh.",
      author: "Senior Procurement Lead",
      role: "Textile & Chemical Supply Group",
    },
  },
];

