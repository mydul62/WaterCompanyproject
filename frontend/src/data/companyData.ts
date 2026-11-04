export interface ProductItem {
  id: string;
  name: string;
  category: "tin-can" | "plastic-bottle" | "pail-bucket" | "jar-dropper" | "food-container";
  categoryLabel: string;
  material: string;
  capacityRange: string;
  neckSize?: string;
  applications: string[];
  image: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
}

export interface OperationalPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  metric: string;
}

export interface PressStory {
  id: string;
  title: string;
  banglaTitle: string;
  newspaper: string;
  date: string;
  summary: string;
  highlightQuote: string;
  image: string;
  tag: string;
}

export const COMPANY_INFO = {
  name: "Xclusive Can Limited",
  brandGroup: "Xclusive Can & Q Pail Ltd.",
  foundedYear: 1992,
  tagline: "Beyond Packaging, We Craft Solutions",
  subTagline: "Packaging Solutions Always Made Right®",
  headquarters: "Plot#53/1, Block#B, Kaligonj Road, Majukhan, Gazipur, Dhaka, Bangladesh",
  plant2: "Plot#B 196, BSCIC I/A, Tongi, Gazipur, Dhaka, Bangladesh",
  contacts: {
    sales1: "+8801819343635",
    sales2: "+8801680240524",
    sales3: "+8801914238240",
    procurement1: "+8801818950946",
    procurement2: "+8801819312914",
    foreignPurchase: "+8801841984208",
    emailMarketing: "marketing@qpail.com",
    emailCommercial: "commercial@qpail.com",
  },
  stats: [
    { label: "Years of Excellence", value: "32+", change: "Since 1992" },
    { label: "Annual Container Capacity", value: "500M+", change: "Across 2 Facilities" },
    { label: "Active Enterprise Clients", value: "250+", change: "FMCG, Paints & Pharma" },
    { label: "Green Facility Standard", value: "LEED Platinum", change: "Zero Waste Protocol" },
  ],
  certifications: [
    {
      name: "LEED Platinum",
      issuer: "U.S. Green Building Council",
      description: "Highest international rating for energy efficiency, sustainable materials, and carbon-reduction.",
    },
    {
      name: "ISO 9001:2015",
      issuer: "Intertek Certification",
      description: "Globally validated Quality Management System for consistent manufacturing excellence.",
    },
    {
      name: "FSSC / ISO 22000",
      issuer: "Food Safety System Certification",
      description: "Strict cleanroom environment compliant with food and beverage contact packaging.",
    },
    {
      name: "GMP Certified",
      issuer: "Good Manufacturing Practice",
      description: "Pharmaceutical-grade hygienic handling, contamination prevention, and tracing.",
    },
  ],
};

export const HERO_SLIDES = [
  {
    id: "slide-1",
    badge: "Engineered Metal Packaging",
    headlinePrefix: "Beyond packaging",
    headlineDynamic: "we Craft Solution",
    subheading:
      "Precision-engineered 3-piece metal cans, high-pressure aerosol containers, and food tins tailored to withstand demanding industrial and retail requirements.",
    image: "/Infoimages/Screenshot 2026-11-04 130154.png",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    ctaPrimary: "Explore Metal Cans",
    ctaSecondary: "Request Quotation",
  },
  {
    id: "slide-2",
    badge: "FMCG & Household Formulations",
    headlinePrefix: "Beyond packaging",
    headlineDynamic: "we Shape the Future",
    subheading:
      "Advanced blow-molded HDPE & PET bottles engineered for Unilever, Dulux, and multinational brands with high chemical resistance and custom ergonomics.",
    image: "/Infoimages/Screenshot 2026-11-04 130302.png",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    ctaPrimary: "Explore Plastic Portfolio",
    ctaSecondary: "Download Catalog",
  },
  {
    id: "slide-3",
    badge: "Sustainable Cleanroom Precision",
    headlinePrefix: "Beyond packaging",
    headlineDynamic: "we Drive Innovation",
    subheading:
      "Crystal-clear PET beverage containers and medical dropper bottles produced under strict ISO 22000 cleanroom environments for ultimate purity.",
    image: "/Infoimages/Screenshot 2026-11-04 130237.png",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    ctaPrimary: "View Cleanroom Products",
    ctaSecondary: "LEED Green Factory",
  },
];

export const OPERATIONAL_PILLARS: OperationalPillar[] = [
  {
    id: "p1",
    title: "Supply Chain & Logistics",
    subtitle: "End-to-End Fleet Integration",
    description: "Dedicated transport fleet and regional buffer depots ensuring on-demand delivery to plants across Bangladesh.",
    iconName: "Truck",
    metric: "99.4% On-Time",
  },
  {
    id: "p2",
    title: "Punctual JIT Dispatch",
    subtitle: "Zero Assembly Downtime",
    description: "Precision Just-In-Time scheduling synchronized with client filling line production quotas.",
    iconName: "Clock",
    metric: "24/7 Dispatch",
  },
  {
    id: "p3",
    title: "Continuous R&D",
    subtitle: "Advanced Material Science",
    description: "In-house material laboratory testing barrier properties, resin weight reduction, and drop-impact resistance.",
    iconName: "Lightbulb",
    metric: "12 New Patents",
  },
  {
    id: "p4",
    title: "Rigorous Quality Assurance",
    subtitle: "100% In-Line Pressure Testing",
    description: "Automated machine vision inspection, micrometer seam analysis, and helium leak detection.",
    iconName: "ShieldCheck",
    metric: "AQL 0.4 Standard",
  },
  {
    id: "p5",
    title: "Eco & Circular Recycling",
    subtitle: "Closed-Loop Metal & Resin Cycle",
    description: "100% recyclable tinplate steel scrap reclamation and food-safe post-consumer recycled resin formulations.",
    iconName: "Recycle",
    metric: "LEED Platinum",
  },
  {
    id: "p6",
    title: "In-House Precision Tool Room",
    subtitle: "CNC & Mold Engineering",
    description: "High-precision mold design, CNC wire cutting, and die maintenance delivering rapid custom container tooling.",
    iconName: "Cog",
    metric: "±0.005mm Tolerance",
  },
  {
    id: "p7",
    title: "Raw Material Security",
    subtitle: "Strategic Global Sourcing",
    description: "Long-term partnerships with tier-1 prime electrolytic tinplate (ETP) and virgin resin polymer producers.",
    iconName: "FileCheck",
    metric: "90-Day Buffer",
  },
  {
    id: "p8",
    title: "Expert Engineering Workforce",
    subtitle: "Continuous Technical Training",
    description: "Over 800 certified packaging technicians, mold masters, and certified quality auditors.",
    iconName: "Users",
    metric: "800+ Staff",
  },
  {
    id: "p9",
    title: "High-Speed Automation",
    subtitle: "European Production Lines",
    description: "Fully automated seaming lines, multitrack blow-molding machines, and computerized litho-printing.",
    iconName: "Zap",
    metric: "1,200 CPM",
  },
];

export const PRODUCTS_CATALOG: ProductItem[] = [
  {
    id: "prod-1",
    name: "Industrial Paint & Chemical Pail (Q Pail)",
    category: "pail-bucket",
    categoryLabel: "Pails & Drums",
    material: "Virgin HDPE / Impact Copolymer PP",
    capacityRange: "1 Liter - 25 Liters",
    neckSize: "Wide-mouth Tamper Evident",
    applications: ["Emulsion Paints", "Industrial Inks", "Lubricants", "Adhesives"],
    image: "/Infoimages/Screenshot 2026-11-04 130154.png",
    description: "Heavy-duty plastic pail with reinforced ribs, airtight gasket lid, and steel handle with plastic grip.",
    features: ["UN Certified for hazardous liquids", "In-Mold Labeling (IML) compatible", "Stackable interlocking design"],
    isFeatured: true,
  },
  {
    id: "prod-2",
    name: "Aerosol & High-Pressure Tin Container",
    category: "tin-can",
    categoryLabel: "Tin Cans",
    material: "Electrolytic Tinplate (ETP)",
    capacityRange: "150ml - 750ml",
    neckSize: "1-inch Standard Valve Opening",
    applications: ["Insecticides", "Air Fresheners", "Spray Paints", "Automotive Polish"],
    image: "/Infoimages/Screenshot 2026-11-04 130154.png",
    description: "Three-piece welded aerosol tinplate cans tested up to 18 bar burst pressure with epoxy-phenolic internal lacquer.",
    features: ["100% water-bath leak checked", "High-definition litho offset printing", "Corrosion-resistant bottom seam"],
    isFeatured: true,
  },
  {
    id: "prod-3",
    name: "Pharmaceutical Dropper & Eye Drop Bottle",
    category: "jar-dropper",
    categoryLabel: "Bottles & Jars",
    material: "Medical Grade Low-Density Polyethylene (LDPE)",
    capacityRange: "5ml - 30ml",
    neckSize: "Calibrated Plug Nozzle",
    applications: ["Ophthalmic Solutions", "Nasal Sprays", "Herbal Drops", "Diagnostic Reagents"],
    image: "/Infoimages/Screenshot 2026-11-04 130325.png",
    description: "Produced in cleanroom Class 100,000 environment with precise drop volume tip and child-resistant cap.",
    features: ["Gamma irradiation compatible", "Controlled calibrated orifice", "Tamper-evident ring"],
    isFeatured: true,
  },
  {
    id: "prod-4",
    name: "Food-Grade Dairy & Sweet Container",
    category: "food-container",
    categoryLabel: "Food Containers",
    material: "Ultra-Clear Polypropylene (PP)",
    capacityRange: "250ml - 1000ml",
    neckSize: "Snap-Fit Hermetic Lid",
    applications: ["Ice Cream", "Yogurt", "Sweets & Confectionery", "Butter Paste"],
    image: "/Infoimages/Screenshot 2026-11-04 130325.png",
    description: "Microwave and deep-freeze safe transparent container preserving food aroma and hygiene.",
    features: ["HACCP & ISO 22000 certified", "BPA-Free formulation", "Anti-fog high clarity lid"],
    isFeatured: true,
  },
  {
    id: "prod-5",
    name: "Crystal Clear PET Beverage & Water Bottle",
    category: "plastic-bottle",
    categoryLabel: "Plastic Bottles",
    material: "100% Virgin Food-Grade PET",
    capacityRange: "250ml - 2000ml",
    neckSize: "28mm PCO 1881 / 30/25",
    applications: ["Mineral Water", "Carbonated Beverages", "Fruit Juices", "Edible Oils"],
    image: "/Infoimages/Screenshot 2026-11-04 130237.png",
    description: "Lightweight blow-molded PET bottle with high carbonation barrier and crystal optical clarity.",
    features: ["100% recyclable resin", "Lightweighted preform design", "Custom body debossing available"],
    isFeatured: true,
  },
  {
    id: "prod-6",
    name: "Rectangular Sealed Food & Industrial Tray",
    category: "food-container",
    categoryLabel: "Food Containers",
    material: "Thermoformed Virgin PP / Barrier Composite",
    capacityRange: "500ml - 2500ml",
    neckSize: "Heat-Sealable Rim",
    applications: ["Fresh Meals", "Bakery Goods", "Hardware Packaging", "Frozen Seafood"],
    image: "/Infoimages/Screenshot 2026-11-04 130325.png",
    description: "Modular rectangular container with flat flange suitable for top heat-sealing film or snap-fit lid.",
    features: ["Rigid rim construction", "Excellent oxygen barrier", "Efficient space-saving nested packing"],
    isFeatured: false,
  },
];

export const PRESS_STORIES: PressStory[] = [
  {
    id: "story-1",
    title: "Nasir's Packaging Enterprise Crosses 100-Crore Milestone",
    banglaTitle: "নাসিরের ব্যবসা এখন শতকোটি টাকার",
    newspaper: "The Daily Prothom Alo",
    date: "Special Industrial Report",
    summary:
      "A deep-dive investigation into how visionary entrepreneur Nasir built Xclusive Can Limited from an ambitious local workshop into Bangladesh's leading packaging powerhouse, providing critical supply-chain independence to global paint and chemical manufacturers.",
    highlightQuote: "From struggling beginnings to establishing a 100-crore state-of-the-art packaging benchmark with LEED Platinum certification.",
    image: "/Infoimages/Screenshot 2026-11-04 130333.png",
    tag: "Founder's Journey",
  },
  {
    id: "story-2",
    title: "Why Entrepreneurs Migrate to Dhaka: The Strategic Centralization",
    banglaTitle: "সবাইকে ঢাকায় ছুটতে হয় কেন",
    newspaper: "The Bonik Barta",
    date: "National Business Feature",
    summary:
      "Analyzing the industrial shifts of heavy manufacturers setting up advanced manufacturing bases across Gazipur and Tongi to connect directly to international distribution arteries and client facilities.",
    highlightQuote: "Infrastructure, raw material access, and proximity to national hubs define manufacturing survival.",
    image: "/Infoimages/Screenshot 2026-11-04 130333.png",
    tag: "Industrial Analysis",
  },
  {
    id: "story-3",
    title: "The Emotional Journey of a Chittagong Entrepreneur Relocating North",
    banglaTitle: "চাঁটগাঁইয়া উদ্যোক্তার কাঁদতে কাঁদতে চট্টগ্রাম ছাড়ার গল্প",
    newspaper: "The Daily Samakal",
    date: "Entrepreneur Profile",
    summary:
      "The heartfelt true account of surmounting infrastructure obstacles in regional zones and investing resiliently to construct Bangladesh's greenest packaging plant.",
    highlightQuote: "Painful relocations transformed into world-class manufacturing marvels.",
    image: "/Infoimages/Screenshot 2026-11-04 130333.png",
    tag: "Resilience & Growth",
  },
  {
    id: "story-4",
    title: "When Will Chittagong Become Fully Industry-Friendly Again?",
    banglaTitle: "শিল্পবান্ধব চট্টগ্রাম ফের কবে",
    newspaper: "Daily Purbokone",
    date: "Policy & Economic Editorial",
    summary:
      "A vital discussion on industrial reform, port clearance speed, utility accessibility, and lessons learned from the success of Xclusive Can's automated factories.",
    highlightQuote: "Modern manufacturing demands world-class utility stability and rapid logistics.",
    image: "/Infoimages/Screenshot 2026-11-04 130333.png",
    tag: "Economic Vision",
  },
];

export const EXPLORE_GRID_ITEMS = [
  {
    id: "find-products",
    title: "Find Our Products",
    subtitle: "Complete Range",
    description: "Browse our complete catalog of tin cans, aerosol cylinders, plastic bottles, and specialized packaging.",
    href: "/products",
    category: "Catalog",
  },
  {
    id: "our-story",
    title: "Our Story",
    subtitle: "Since 1992",
    description: "Learn about our journey from 1992 to becoming Bangladesh's leading certified packaging manufacturer.",
    href: "/about",
    category: "Heritage",
  },
  {
    id: "careers",
    title: "Careers",
    subtitle: "Join Our Team",
    description: "Build a meaningful career in advanced manufacturing, mold engineering, and green packaging operations.",
    href: "/careers",
    category: "Opportunities",
  },
  {
    id: "sustainability",
    title: "Sustainability",
    subtitle: "LEED Platinum",
    description: "Discover our commitment to environmental responsibility, energy conservation, and circular materials.",
    href: "/sustainability",
    category: "Environment",
  },
  {
    id: "rd",
    title: "Research & Development",
    subtitle: "Material Science",
    description: "Explore our innovations in packaging barrier technology, light-weighting, and sustainable resins.",
    href: "/sustainability#rd",
    category: "Technology",
  },
  {
    id: "tool-room",
    title: "Tool Room",
    subtitle: "Precision Tooling",
    description: "Learn about our in-house precision tooling, CNC machining, and custom mold fabrication capabilities.",
    href: "/sustainability#tool-room",
    category: "Engineering",
  },
  {
    id: "blog",
    title: "Blog & Insights",
    subtitle: "Industry Trends",
    description: "Read market intelligence, packaging regulatory updates, and corporate manufacturing news.",
    href: "/media",
    category: "Editorial",
  },
  {
    id: "case-studies",
    title: "Case Studies",
    subtitle: "Client Success",
    description: "See how we solved critical leak-prevention and shelf-life challenges for tier-1 paint and FMCG brands.",
    href: "/about#cases",
    category: "Solutions",
  },
  {
    id: "about-xclusive",
    title: "About Xclusive",
    subtitle: "Corporate Profile",
    description: "Understand our core values, leadership team, ethical standards, and global quality certifications.",
    href: "/about",
    category: "Corporate",
  },
  {
    id: "about-qpail",
    title: "About Q Pail",
    subtitle: "Partner Brand",
    description: "Learn about our specialized Q Pail brand for heavy industrial paint, oil, and chemical pails.",
    href: "/about#qpail",
    category: "Brand",
  },
  {
    id: "videos",
    title: "Factory Videos",
    subtitle: "Plant Tour",
    description: "Watch high-speed automated manufacturing lines and our cleanroom facilities in motion.",
    href: "/media#videos",
    category: "Multimedia",
  },
  {
    id: "brands",
    title: "Brands We Work With",
    subtitle: "Trusted Partners",
    description: "See the multinational and national market leaders that rely on Xclusive Can every day.",
    href: "/about#partners",
    category: "Partnerships",
  },
  {
    id: "visitor-spotlight",
    title: "Visitor Spotlight",
    subtitle: "Plant Delegations",
    description: "See industry ministers, international auditors, and corporate delegations visiting our Gazipur plant.",
    href: "/about#spotlight",
    category: "Recognition",
  },
];

export const TRUSTED_CLIENT_BRANDS = [
  { name: "Dulux Paints", category: "Coatings" },
  { name: "Berger Paints", category: "Decorative & Industrial" },
  { name: "Surf Excel", category: "FMCG / Unilever" },
  { name: "Dove", category: "Personal Care" },
  { name: "Reficol", category: "Industrial Adhesives" },
  { name: "Nebula Ink", category: "Specialty Printing" },
  { name: "Red Cow", category: "Dairy & Food" },
  { name: "Autoprime", category: "Automotive Coatings" },
];
