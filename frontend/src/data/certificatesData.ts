export interface CertificateItem {
  id: string;
  slug?: string;
  title: string;
  code: string;
  category: string;
  image: string;
  aspect: "portrait" | "landscape" | "square";
  bullets: string[];
  accreditation: string;
  isActive?: boolean;
  sortOrder?: number;
}

export const CERTIFICATE_CATEGORIES = [
  "All Accreditations",
  "Quality Management",
  "Environmental & Green",
  "Workplace Safety",
  "Food & Pharma Compliance",
  "National Honors",
] as const;

export const CERTIFICATE_CATEGORY_OPTIONS = [
  "Quality Management",
  "Environmental & Green",
  "Workplace Safety",
  "Food & Pharma Compliance",
  "National Honors",
];

export const CERTIFICATES_LIST: CertificateItem[] = [
  {
    id: "iso-9001",
    slug: "iso-9001",
    title: "ISO 9001:2015",
    code: "Quality Management System",
    category: "Quality Management",
    image: "/images/cert-iso-9001.jpg",
    aspect: "portrait",
    bullets: [
      "Certified Quality Management System covering end-to-end design, precision tooling, and high-speed automated production.",
      "Strict incoming raw material inspection (virgin polymers, masterbatches, seals) and computerized statistical process control (SPC).",
      "Full batch-level traceability from raw material intake to final palletized delivery across all packaging formats.",
    ],
    accreditation: "International Organization for Standardization (ISO) / UKAS Accredited",
  },
  {
    id: "iso-14001",
    slug: "iso-14001",
    title: "ISO 14001:2015",
    code: "Environmental Management System",
    category: "Environmental & Green",
    image: "/images/cert-iso-14001.jpg",
    aspect: "portrait",
    bullets: [
      "Audited Environmental Management System ensuring sustainable and eco-conscious factory operations.",
      "Zero-landfill industrial waste management, 100% recyclable polymer regrind reclamation, and energy-efficient drives.",
      "Optimized water recycling and energy management across our Kaliakoir, Gazipur industrial campus.",
    ],
    accreditation: "ISO Environmental Management System / Global Certification Authority",
  },
  {
    id: "iso-45001",
    slug: "iso-45001",
    title: "ISO 45001:2018",
    code: "Occupational Health & Safety",
    category: "Workplace Safety",
    image: "/images/cert-iso-45001.jpg",
    aspect: "portrait",
    bullets: [
      "International standard for proactive occupational health, safety management, and hazard reduction.",
      "Zero-incident workforce protocol, ergonomic automated workstations, and protective engineering barriers.",
      "Comprehensive emergency response systems and continuous technician safety training.",
    ],
    accreditation: "International Safety Standards / Accredited Certification Body",
  },
  {
    id: "national-award",
    slug: "national-award",
    title: "Kaliakoir Pourashava Trade & Industrial Registration",
    code: "Trade License #242501300583",
    category: "National Honors",
    image: "/images/cert-national-award.jpg",
    aspect: "square",
    bullets: [
      "Licensed under Kaliakoir Pourashava for plastic manufacturing, import, and industrial container supply (BIN 007122199-1205).",
      "Recognition of reliable commercial standing, transparent statutory compliance, and local employment generation.",
      "Benchmark commitment acknowledging Noor Plastic Industries as a trusted partner in precision polymer and water container engineering.",
    ],
    accreditation: "Kaliakoir Pourashava / Bangladesh Statutory Trade Authority",
  },
  {
    id: "dgda-bsti",
    slug: "dgda-bsti",
    title: "DGDA & BSTI Regulatory Clearances",
    code: "Statutory Approvals",
    category: "Food & Pharma Compliance",
    image: "/images/cert-dgda-bsti.jpg",
    aspect: "landscape",
    bullets: [
      "Adheres to Bangladesh Standards and Testing Institution (BSTI) specifications for food-grade water jars and plastic pails.",
      "Cleanroom packaging standards supporting pharmaceutical and medical device primary containers.",
      "Rigorous barrier testing, migration compliance, and tamper-evident closure verification.",
    ],
    accreditation: "BSTI National Testing & Regulatory Compliance Framework",
  },
  {
    id: "haccp",
    slug: "haccp",
    title: "HACCP Food Safety Certification",
    code: "Hazard Analysis Critical Control Point",
    category: "Food & Pharma Compliance",
    image: "/images/cert-haccp.jpg",
    aspect: "portrait",
    bullets: [
      "Systematic preventive approach to biological, chemical, and physical hazards in food-contact packaging.",
      "100% virgin food-grade polymers, BPA-free resins, and airtight tamper-evident closures for drinking water and edible oils.",
      "Controlled clean manufacturing zones preventing microbial and airborne contamination.",
    ],
    accreditation: "HACCP International Food Safety Compliance System",
  },
  {
    id: "iso-22000",
    slug: "iso-22000",
    title: "ISO 22000:2018",
    code: "Food Safety Management System",
    category: "Food & Pharma Compliance",
    image: "/images/cert-iso-22000.jpg",
    aspect: "portrait",
    bullets: [
      "Certified Food Safety Management System guidelines across our food & beverage packaging production lines.",
      "Comprehensive prerequisite programs (PRPs), traceability, and hazard control protocols.",
      "Validated for water dispenser bottles, edible oil jars, dairy containers, and food pails.",
    ],
    accreditation: "ISO Food Safety Management / International Certification Board",
  },
  {
    id: "leed-green",
    slug: "leed-green",
    title: "Green Energy & Closed-Loop Water Campus",
    code: "Sustainable Infrastructure",
    category: "Environmental & Green",
    image: "/images/cert-leed-green.jpg",
    aspect: "portrait",
    bullets: [
      "Energy-efficient industrial manufacturing infrastructure engineered with daylight harvesting and servo-hydraulic drives.",
      "Closed-loop chilled water cooling eliminating freshwater wastage during blow molding cycles.",
      "100% closed-loop clean polymer regrind reuse supporting zero-landfill sustainability.",
    ],
    accreditation: "Sustainable Industrial Operations Standard, Gazipur",
  },
  {
    id: "membership",
    slug: "membership",
    title: "Certificate of Membership & Corporate Standing",
    code: "Industry Affiliation",
    category: "National Honors",
    image: "/images/cert-membership.jpg",
    aspect: "landscape",
    bullets: [
      "Registered corporate entity (TIN 636404586599, BIN 007122199-1205) upholding full tax, VAT, and trade transparency.",
      "Commitment to ethical labor standards, workplace welfare, and transparent corporate governance.",
      "Active supporter of circular polymer recycling and safe water packaging initiatives across Bangladesh.",
    ],
    accreditation: "National Trade & Plastic Manufacturers Framework, Bangladesh",
  },
];

