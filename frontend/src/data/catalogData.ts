export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  specification?: string;
  usage?: string;
  image: string;
  gallery: string[];
  factory: "Q Pail Limited" | "Xclusive Can Limited";
  genre: "Plastic" | "Metal";
  subCategory: string;
  shape: "Square" | "Oblong" | "Oval" | "Rectangular" | "Circular";
  material?: string;
  capacity?: string;
}

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: "p1",
    slug: "pharmaceutical-bottle",
    name: "Pharmaceutical Bottle",
    description: "100 ml HDPE Pharmaceuticals Bottle made with food grade virgin material",
    specification: "Food grade HDPE, 100ml nominal capacity, tamper-proof seal cap, manufactured in Class 100,000 cleanroom.",
    usage: "Prescription liquids, syrups, and pharmaceutical oral medications.",
    image: "/images/catalog/cat-prod-1.png",
    gallery: [
      "/images/catalog/cat-prod-1.png",
      "/images/catalog/cat-prod-3.png",
      "/cropped/product-card-3.png",
    ],
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    subCategory: "Pharmaceutical",
    shape: "Circular",
    material: "100% Food-Grade Virgin HDPE",
    capacity: "100 ml",
  },
  {
    id: "p2",
    slug: "liquid-washing-container",
    name: "Liquid Washing Container",
    description: "HDPE Washing Powder Container For Home care usage",
    specification: "High-density polyethylene container with reinforced ergonomic handle, measuring cap, and anti-leak induction seal.",
    usage: "Liquid laundry detergents, liquid washing powder, fabric conditioners, and general home care cleaning products.",
    image: "/images/catalog/cat-prod-2.png",
    gallery: [
      "/images/catalog/cat-prod-2.png",
      "/images/catalog/cat-prod-8.png",
      "/images/catalog/prod-7.png",
    ],
    factory: "Q Pail Limited",
    genre: "Plastic",
    subCategory: "Home Care",
    shape: "Square",
    material: "High-Density Polyethylene (HDPE)",
    capacity: "1000 ml - 2000 ml",
  },
  {
    id: "p3",
    slug: "vitamin-container",
    name: "Vitamin Container",
    description: "26 gm Container (Menacal-D) with Cap for Pharmaceutical uses. It is used for Radiant Pharma.",
    specification: "Pharmaceutical grade HDPE with moisture-barrier child resistant screw cap and hermetic induction foil.",
    usage: "Tablets, capsules, dietary supplements, and multivitamins.",
    image: "/images/catalog/cat-prod-3.png",
    gallery: [
      "/images/catalog/cat-prod-3.png",
      "/images/catalog/cat-prod-1.png",
      "/images/catalog/cat-prod-7.png",
    ],
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    subCategory: "Pharmaceutical",
    shape: "Circular",
    material: "Pharmaceutical Virgin HDPE",
    capacity: "26 gm",
  },
  {
    id: "p4",
    slug: "round-jerry-can",
    name: "Round Jerry Can",
    description: "HDPE Round Jerry Can for Asian Paints and industrial fluid packaging",
    specification: "Heavy-duty UN certified extrusion blow molded HDPE jerry can with ribbed sidewall reinforcement.",
    usage: "Emulsion paints, industrial thinners, surface primers, and coatings.",
    image: "/images/catalog/prod-7.png",
    gallery: [
      "/images/catalog/prod-7.png",
      "/images/catalog/cat-prod-8.png",
      "/images/catalog/cat-prod-2.png",
    ],
    factory: "Q Pail Limited",
    genre: "Plastic",
    subCategory: "Paint",
    shape: "Circular",
    material: "Virgin HDPE with Tamper Cap",
    capacity: "4 Liter",
  },
  {
    id: "p5",
    slug: "oral-syringe",
    name: "Oral Syringe & Dropper",
    description: "Oral syringes are used to accurately measure and safely administer liquid medication by mouth.",
    specification: "Medical grade PP with high-transparency barrel, indelible graduations, and smooth silicone-free plunger.",
    usage: "Pediatric liquid dosing, veterinary medication, and precision oral dosage.",
    image: "/cropped/product-card-3.png",
    gallery: [
      "/cropped/product-card-3.png",
      "/images/catalog/cat-prod-1.png",
      "/images/catalog/cat-prod-3.png",
    ],
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    subCategory: "Pharmaceutical",
    shape: "Oblong",
    material: "Medical Grade Polypropylene (PP)",
    capacity: "5 ml - 20 ml",
  },
  {
    id: "p6",
    slug: "agro-bottle",
    name: "Agro Vet Bottle",
    description: "500 ML White color HDPE Agro Vet Bottle with Inner Seal and Cap",
    specification: "Chemical-barrier HDPE resin formulated to withstand agrochemical solvents, pesticides, and fertilizers.",
    usage: "Insecticides, liquid fertilizers, veterinary treatments, and plant stimulants.",
    image: "/cropped/product-card-1.png",
    gallery: [
      "/cropped/product-card-1.png",
      "/images/catalog/cat-prod-7.png",
      "/images/catalog/cat-prod-9.png",
    ],
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    subCategory: "Agro Vet",
    shape: "Circular",
    material: "Chemical Resistant Virgin HDPE",
    capacity: "500 ml",
  },
  {
    id: "p7",
    slug: "chemical-bottle",
    name: "Chemical Reagent Bottle",
    description: "500 ML Chemical Bottle used for Samuda Chemical Industries.",
    specification: "Fluorinated HDPE with chemical-resistant threaded closure and degassing vent option.",
    usage: "Industrial reagents, acids, bleaching agents, and corrosive liquids.",
    image: "/images/catalog/cat-prod-7.png",
    gallery: [
      "/images/catalog/cat-prod-7.png",
      "/images/catalog/cat-prod-9.png",
      "/cropped/product-card-1.png",
    ],
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    subCategory: "Chemical",
    shape: "Circular",
    material: "HDPE with Threaded Locking Cap",
    capacity: "500 ml",
  },
  {
    id: "p8",
    slug: "double-handle-can",
    name: "Double Handle Jerry Can",
    description: "4.8 Ltr Double Handle HDPE Jerry Can for bulk fluids and industrial liquids",
    specification: "Dual-handle ergonomic balance for effortless pouring and stacking, compatible with hazardous liquid transport.",
    usage: "Lubricants, engine oils, industrial chemical solutions, and agrochemicals.",
    image: "/images/catalog/cat-prod-8.png",
    gallery: [
      "/images/catalog/cat-prod-8.png",
      "/images/catalog/prod-7.png",
      "/images/catalog/cat-prod-2.png",
    ],
    factory: "Q Pail Limited",
    genre: "Plastic",
    subCategory: "Chemical",
    shape: "Square",
    material: "Industrial Heavy HDPE",
    capacity: "4.8 Liter",
  },
  {
    id: "p9",
    slug: "1-ltr-chemical-bottle",
    name: "1 Ltr Calibrated Bottle",
    description: "1 Ltr industrial chemical bottle with graduated measurement markings.",
    specification: "Fluorinated barrier layer bottle with calibrated viewing stripe and tamper-evident cap.",
    usage: "Solvent thinners, textile chemicals, lab reagents, and cleaning concentrates.",
    image: "/images/catalog/cat-prod-9.png",
    gallery: [
      "/images/catalog/cat-prod-9.png",
      "/images/catalog/cat-prod-7.png",
      "/cropped/product-card-1.png",
    ],
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    subCategory: "Chemical",
    shape: "Circular",
    material: "HDPE / Fluorinated Barrier",
    capacity: "1000 ml",
  },
  {
    id: "p10",
    slug: "body-wash-bottle",
    name: "Personal Care Body Wash Bottle",
    description: "PET Body-Wash Bottle with Flip Top Cap for cosmetics and personal hygiene.",
    specification: "Crystal-clear PET resin, 28/410 neck finish, compatible with pump dispensers or flip-top caps.",
    usage: "Shampoos, body washes, sanitizers, and luxury cosmetic lotions.",
    image: "/images/catalog/prod-4.png",
    gallery: [
      "/images/catalog/prod-4.png",
      "/images/catalog/cat-prod-1.png",
      "/images/catalog/cat-prod-2.png",
    ],
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    subCategory: "Personal Care",
    shape: "Oval",
    material: "Clear PET Resin",
    capacity: "250 ml - 400 ml",
  },
  {
    id: "p11",
    slug: "3-piece-industrial-paint-can",
    name: "3-Piece Industrial Paint Can",
    description: "Welded tinplate metal can for decorative paint & industrial coatings.",
    specification: "Electrolytic tinplate body with triple-tight friction lid and epoxy internal lining.",
    usage: "Solvent-based paints, varnishes, wood coatings, and industrial enamels.",
    image: "/Infoimages/Screenshot 2026-11-04 130154.png",
    gallery: [
      "/Infoimages/Screenshot 2026-11-04 130154.png",
      "/images/catalog/cat-prod-8.png",
      "/cropped/product-card-2.png",
    ],
    factory: "Xclusive Can Limited",
    genre: "Metal",
    subCategory: "Paint",
    shape: "Circular",
    material: "Electrolytic Tinplate (ETP)",
    capacity: "1 Gallon",
  },
  {
    id: "p12",
    slug: "aerosol-spray-can",
    name: "Aerosol Spray Can",
    description: "High-pressure tinplate aerosol container tested up to 18 bar pressure.",
    specification: "Three-piece welded can tested up to 18 bar burst pressure with specialized interior protective lacquer.",
    usage: "Insecticides, air fresheners, automotive lubricants, and spray paints.",
    image: "/Infoimages/Screenshot 2026-11-04 130154.png",
    gallery: [
      "/Infoimages/Screenshot 2026-11-04 130154.png",
      "/cropped/product-card-2.png",
      "/cropped/product-card-1.png",
    ],
    factory: "Xclusive Can Limited",
    genre: "Metal",
    subCategory: "Personal Care",
    shape: "Circular",
    material: "Three-Piece Welded Tinplate",
    capacity: "300 ml - 500 ml",
  },
  {
    id: "p13",
    slug: "paint-pail",
    name: "Paint Pail",
    description: "Round pail with metal handle for decorative and industrial paints.",
    specification: "Reinforced rim, heavy-gauge wire bail handle with roller grip, impact-resistant copolymer.",
    usage: "Decorative emulsion, exterior paints, putty, and chemical adhesives.",
    image: "/images/catalog/prod-7.png",
    gallery: [
      "/images/catalog/prod-7.png",
      "/images/catalog/cat-prod-8.png",
      "/images/catalog/cat-prod-2.png",
    ],
    factory: "Q Pail Limited",
    genre: "Plastic",
    subCategory: "Paint",
    shape: "Circular",
    material: "Virgin Polypropylene Copolymer",
    capacity: "5 L - 20 L",
  },
  {
    id: "p14",
    slug: "bitumen-paint-can",
    name: "Bitumen Paint Can",
    description: "Heavy-gauge tin can for bituminous paint with tight-seal lid.",
    specification: "Three-piece welded tinplate with rust-inhibitive internal varnish and airtight friction lid.",
    usage: "Bituminous paints, roof coatings, waterproofing compounds, and asphalt sealants.",
    image: "/Infoimages/Screenshot 2026-11-04 130154.png",
    gallery: [
      "/Infoimages/Screenshot 2026-11-04 130154.png",
      "/cropped/product-card-2.png",
      "/images/catalog/cat-prod-8.png",
    ],
    factory: "Xclusive Can Limited",
    genre: "Metal",
    subCategory: "Paint",
    shape: "Circular",
    material: "Heavy-Gauge Tinplate",
    capacity: "1 Liter - 5 Liter",
  },
  {
    id: "p15",
    slug: "lubricant-container",
    name: "Lubricant Container",
    description: "Leak-proof lubricant bottle with tamper-evident closure.",
    specification: "Multi-layer barrier against oil migration, translucent view stripe, leak-proof induction foil cap.",
    usage: "Automotive engine lubricants, gear oils, brake fluids, and hydraulic fluids.",
    image: "/images/catalog/cat-prod-8.png",
    gallery: [
      "/images/catalog/cat-prod-8.png",
      "/images/catalog/prod-7.png",
      "/cropped/product-card-1.png",
    ],
    factory: "Q Pail Limited",
    genre: "Plastic",
    subCategory: "Lubricant",
    shape: "Square",
    material: "HDPE Multi-Layer Co-Extrusion",
    capacity: "1 Liter - 4 Liter",
  },
  {
    id: "p16",
    slug: "engine-oil-bottle",
    name: "Engine Oil Bottle",
    description: "1 Liter HDPE automotive engine oil bottle with view stripe.",
    specification: "Multi-layer co-extrusion with clear vertical level indicator line and tamper-evident cap.",
    usage: "Engine oils, 4T motor oils, and high-performance lubricants.",
    image: "/images/catalog/cat-prod-8.png",
    gallery: [
      "/images/catalog/cat-prod-8.png",
      "/cropped/product-card-1.png",
      "/images/catalog/prod-7.png",
    ],
    factory: "Q Pail Limited",
    genre: "Plastic",
    subCategory: "Lubricant",
    shape: "Square",
    material: "HDPE with Transparent Level Strip",
    capacity: "1 Liter",
  },
  {
    id: "p17",
    slug: "food-grade-spice-jar",
    name: "Food Grade Spice Jar",
    description: "Wide-mouth PET jar with airtight closure for dry food and spices.",
    specification: "100% FDA food grade PET with induction seal liner cap, crystal clarity, and impact strength.",
    usage: "Spices, powders, dry fruits, confectionery, and culinary herbs.",
    image: "/cropped/product-card-4.png",
    gallery: [
      "/cropped/product-card-4.png",
      "/images/catalog/cat-prod-3.png",
      "/cropped/product-card-2.png",
    ],
    factory: "Xclusive Can Limited",
    genre: "Plastic",
    subCategory: "Food",
    shape: "Circular",
    material: "Food Grade Virgin PET",
    capacity: "250 gm - 1000 gm",
  },
  {
    id: "p18",
    slug: "rectangular-food-tub",
    name: "Rectangular Food Tub",
    description: "Tamper-evident rectangular container with snap-on lid for dairy & confectionery.",
    specification: "Injection molded polypropylene with break-away corner security tab and in-mold labeling option.",
    usage: "Ice creams, butter, yogurt, cookies, and processed food packaging.",
    image: "/cropped/product-card-2.png",
    gallery: [
      "/cropped/product-card-2.png",
      "/cropped/product-card-4.png",
      "/images/catalog/cat-prod-2.png",
    ],
    factory: "Q Pail Limited",
    genre: "Plastic",
    subCategory: "Food",
    shape: "Rectangular",
    material: "Food Grade Polypropylene (PP)",
    capacity: "500 ml - 1500 ml",
  },
  {
    id: "p19",
    slug: "industrial-grease-can",
    name: "Industrial Grease Can",
    description: "Seamless lithographed tinplate can for heavy automotive and industrial grease.",
    specification: "Seamless drawn tinplate with curled top edge and leak-proof press lid, litho printed exterior.",
    usage: "Chassis grease, high-temp wheel bearing lubricants, and heavy industrial greases.",
    image: "/Infoimages/Screenshot 2026-11-04 130154.png",
    gallery: [
      "/Infoimages/Screenshot 2026-11-04 130154.png",
      "/cropped/product-card-2.png",
      "/images/catalog/cat-prod-8.png",
    ],
    factory: "Xclusive Can Limited",
    genre: "Metal",
    subCategory: "Chemical",
    shape: "Circular",
    material: "Seamless Drawn Tinplate",
    capacity: "500 gm - 1 Kg",
  },
  {
    id: "p20",
    slug: "tamper-evident-container",
    name: "Tamper-Evident Food Container",
    description: "BPA-free food contact certified container with secure locking tab.",
    specification: "Microwave & dishwasher safe, certified food-grade PP with tamper-proof pull lock.",
    usage: "Takeaway meals, confectionery, sweets, and chilled foods.",
    image: "/cropped/product-card-4.png",
    gallery: [
      "/cropped/product-card-4.png",
      "/cropped/product-card-2.png",
      "/images/catalog/cat-prod-1.png",
    ],
    factory: "Q Pail Limited",
    genre: "Plastic",
    subCategory: "Food",
    shape: "Rectangular",
    material: "BPA-Free Food Grade PP",
    capacity: "500 ml - 1000 ml",
  },
];

export function getProductById(idOrSlug: string): CatalogProduct | undefined {
  if (!idOrSlug) return CATALOG_PRODUCTS[0];
  const query = decodeURIComponent(idOrSlug).toLowerCase().trim();

  // 1. Direct match on id or slug
  const direct = CATALOG_PRODUCTS.find(
    (p) => p.id.toLowerCase() === query || p.slug.toLowerCase() === query
  );
  if (direct) return direct;

  // 2. Map template IDs like tp1, tp2, tp3
  const tpMap: Record<string, string> = {
    tp1: "pharmaceutical-bottle",
    tp2: "liquid-washing-container",
    tp3: "vitamin-container",
    tp4: "paint-pail",
    tp5: "bitumen-paint-can",
    tp6: "lubricant-container",
  };
  if (tpMap[query]) {
    const found = CATALOG_PRODUCTS.find((p) => p.slug === tpMap[query]);
    if (found) return found;
  }

  // 3. Match normalized name
  const byName = CATALOG_PRODUCTS.find(
    (p) =>
      p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === query ||
      query.includes(p.slug) ||
      p.slug.includes(query)
  );
  if (byName) return byName;

  // 4. Fallback to default product (Liquid Washing Container or first)
  return (
    CATALOG_PRODUCTS.find((p) => p.slug === "liquid-washing-container") ||
    CATALOG_PRODUCTS[0]
  );
}
