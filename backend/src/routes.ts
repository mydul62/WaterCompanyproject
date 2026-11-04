import { Router, Request, Response } from "express";

const router = Router();

// In-Memory store initialized with realistic industrial data
let productsStore = [
  {
    id: "prod-1",
    name: "Industrial Paint & Chemical Pail (Q Pail)",
    category: "pail-bucket",
    categoryLabel: "Pails & Drums",
    material: "Virgin HDPE / Impact Copolymer PP",
    capacityRange: "1 Liter - 25 Liters",
    factory: "Q Pail Limited",
    applications: ["Emulsion Paints", "Industrial Inks", "Lubricants", "Adhesives"],
    description: "Heavy-duty plastic pail with reinforced ribs, airtight gasket lid, and steel handle with plastic grip.",
    isActive: true,
    image: "/Infoimages/Screenshot 2026-11-04 130154.png",
  },
  {
    id: "prod-2",
    name: "Aerosol & High-Pressure Tin Container",
    category: "tin-can",
    categoryLabel: "Tin Cans",
    material: "Electrolytic Tinplate (ETP)",
    capacityRange: "150ml - 750ml",
    factory: "Xclusive Can Limited",
    applications: ["Insecticides", "Air Fresheners", "Spray Paints", "Automotive Polish"],
    description: "Three-piece welded aerosol tinplate cans tested up to 18 bar burst pressure with epoxy-phenolic internal lacquer.",
    isActive: true,
    image: "/Infoimages/Screenshot 2026-11-04 130154.png",
  },
  {
    id: "prod-3",
    name: "Pharmaceutical Dropper & Eye Drop Bottle",
    category: "jar-dropper",
    categoryLabel: "Bottles & Jars",
    material: "Medical Grade Low-Density Polyethylene (LDPE)",
    capacityRange: "5ml - 30ml",
    factory: "Xclusive Can Limited",
    applications: ["Ophthalmic Solutions", "Nasal Sprays", "Herbal Drops"],
    description: "Produced in cleanroom Class 100,000 environment with precise drop volume tip and child-resistant cap.",
    isActive: true,
    image: "/Infoimages/Screenshot 2026-11-04 130325.png",
  },
  {
    id: "prod-4",
    name: "Crystal Clear PET Beverage & Water Bottle",
    category: "plastic-bottle",
    categoryLabel: "Plastic Bottles",
    material: "100% Virgin Food-Grade PET",
    capacityRange: "250ml - 2000ml",
    factory: "Xclusive Can Limited",
    applications: ["Mineral Water", "Carbonated Beverages", "Fruit Juices"],
    description: "Lightweight blow-molded PET bottle with high carbonation barrier and crystal optical clarity.",
    isActive: true,
    image: "/Infoimages/Screenshot 2026-11-04 130237.png",
  },
  {
    id: "prod-cat-1",
    name: "Pharmaceutical Bottle (100ml)",
    category: "plastic-bottle",
    categoryLabel: "Bottles & Jars",
    material: "100% Food-Grade Virgin HDPE",
    capacityRange: "100 ml",
    factory: "Xclusive Can Limited",
    applications: ["Pharmaceutical", "Radiant Pharma"],
    description: "100 ml HDPE Pharmaceuticals Bottle made with food grade virgin material.",
    isActive: true,
    image: "/images/catalog/cat-prod-1.png",
  },
  {
    id: "prod-cat-2",
    name: "Liquid Washing Container (1L-2L)",
    category: "pail-bucket",
    categoryLabel: "Pails & Drums",
    material: "High-Density Polyethylene (HDPE)",
    capacityRange: "1000 ml - 2000 ml",
    factory: "Q Pail Limited",
    applications: ["Home Care", "Liquid Detergent"],
    description: "HDPE Washing Powder Container For Home care usage.",
    isActive: true,
    image: "/images/catalog/cat-prod-2.png",
  },
  {
    id: "prod-cat-7",
    name: "Chemical Bottle (500 ML)",
    category: "plastic-bottle",
    categoryLabel: "Plastic Bottles",
    material: "HDPE Chemical Resistant Resin",
    capacityRange: "500 ml",
    factory: "Xclusive Can Limited",
    applications: ["Samuda Chemical Industries", "Industrial Reagents"],
    description: "500 ML Chemical Bottle uses for Samuda Chemical Industries.",
    isActive: true,
    image: "/images/catalog/cat-prod-7.png",
  },
  {
    id: "prod-cat-8",
    name: "Double Handle Can (4.8L)",
    category: "pail-bucket",
    categoryLabel: "Jerrycans & Drums",
    material: "Industrial Heavy HDPE",
    capacityRange: "4.8 Liter",
    factory: "Q Pail Limited",
    applications: ["Automotive Oil", "Industrial Solvents"],
    description: "4.8 Ltr Double Handle HDPE jerry Can.",
    isActive: true,
    image: "/images/catalog/cat-prod-8.png",
  },
];

let rfqStore = [
  {
    id: "RFQ-2026-XCL-8841",
    companyName: "Berger Paints Bangladesh Ltd.",
    contactPerson: "Engr. Shamimur Rahman",
    email: "shamim.rahman@bergerbd.com",
    phone: "+880 1711-234567",
    category: "Q Pail Industrial Buckets",
    volume: "120,000 units/year",
    capacity: "20 Liters & 4 Liters",
    status: "New Inquiry",
    notes: "Requires UN certification for export-grade solvent-based emulsion paint.",
    createdAt: "2026-11-04T14:30:00.000Z",
  },
  {
    id: "RFQ-2026-XCL-8839",
    companyName: "Square Pharmaceuticals Ltd.",
    contactPerson: "Dr. Farhana Yasmin",
    email: "f.yasmin@squarepharma.com.bd",
    phone: "+880 1819-876543",
    category: "Pharma Droppers & Jars",
    volume: "250,000 units/year",
    capacity: "10ml Calibrated Dropper",
    status: "Technical Review",
    notes: "Cleanroom Class 100,000 protocol required.",
    createdAt: "2026-11-04T11:15:00.000Z",
  },
  {
    id: "RFQ-2026-XCL-8835",
    companyName: "Akij Food & Beverage Ltd.",
    contactPerson: "Zahid Hasan",
    email: "zahid.hasan@akij.net",
    phone: "+880 1912-345678",
    category: "PET Beverage Bottles",
    volume: "500,000 units/year",
    capacity: "500ml Crystal PET",
    status: "Sample Dispatched",
    notes: "Sample batch of 50 preforms sent via Gazipur express courier.",
    createdAt: "2026-11-03T16:45:00.000Z",
  },
  {
    id: "RFQ-2026-XCL-8828",
    companyName: "Dulux / AkzoNobel Bangladesh",
    contactPerson: "Kamrul Islam",
    email: "kamrul.islam@akzonobel.com",
    phone: "+880 1680-112233",
    category: "Tin Cans & Aerosols",
    volume: "80,000 units/year",
    capacity: "1 Liter Paint Tin",
    status: "Quotation Sent",
    notes: "Price breakdown provided.",
    createdAt: "2026-11-02T10:20:00.000Z",
  },
];

let mediaStore = [
  {
    id: "story-1",
    title: "Nasir's Packaging Enterprise Crosses 100-Crore Milestone",
    banglaTitle: "নাসিরের ব্যবসা এখন শতকোটি টাকার",
    newspaper: "The Daily Prothom Alo",
    date: "Special Industrial Report",
    summary: "A deep-dive investigation into how visionary entrepreneur Nasir built Xclusive Can Limited from an ambitious local workshop into Bangladesh's leading packaging powerhouse.",
    highlightQuote: "From struggling beginnings to establishing a 100-crore state-of-the-art packaging benchmark with LEED Platinum certification.",
    image: "/Infoimages/Screenshot 2026-11-04 130333.png",
    tag: "Founder's Journey",
  },
];

let careerStore = [
  {
    id: "APP-2026-001",
    name: "Tanvir Ahmed",
    position: "Senior Quality Assurance Engineer (Cleanroom)",
    experience: "6 Years (Pharma Packaging)",
    email: "tanvir.engr@gmail.com",
    phone: "+880 1712-456789",
    date: "2026-11-04",
    status: "New",
    facility: "Gazipur Facility",
  },
  {
    id: "APP-2026-002",
    name: "Mehedi Hasan",
    position: "High-Speed Blow Molding Technician",
    experience: "4 Years (PET Preforms)",
    email: "mehedi.tech@yahoo.com",
    phone: "+880 1819-334455",
    date: "2026-11-03",
    status: "Shortlisted",
    facility: "Tongi Plant",
  },
];

let companySettings = {
  name: "Xclusive Can Limited",
  brandGroup: "Xclusive Can & Q Pail Ltd.",
  foundedYear: 1992,
  headquarters: "Plot#53/1, Block#B, Kaligonj Road, Majukhan, Gazipur, Dhaka, Bangladesh",
  plant2: "Plot#B 196, BSCIC I/A, Tongi, Gazipur, Dhaka, Bangladesh",
  contacts: {
    sales1: "+8801819343635",
    sales2: "+8801680240524",
    foreignPurchase: "+8801841984208",
    emailMarketing: "marketing@qpail.com",
  },
  certifications: ["LEED Platinum", "ISO 9001:2015", "FSSC 22000", "GMP Certified"],
};

// ==========================================
// 1. PRODUCTS API
// ==========================================
router.get("/products", (req: Request, res: Response) => {
  const { category, factory, search } = req.query;
  let result = productsStore;

  if (category && category !== "all") {
    result = result.filter((p) => p.category === category);
  }
  if (factory && factory !== "all") {
    result = result.filter((p) => p.factory === factory);
  }
  if (search) {
    const q = String(search).toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    count: result.length,
    data: result,
  });
});

router.get("/products/:id", (req: Request, res: Response) => {
  const product = productsStore.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }
  res.json({ success: true, data: product });
});

router.post("/products", (req: Request, res: Response) => {
  const { name, category, categoryLabel, material, capacityRange, factory, description, image } = req.body;

  if (!name || !description) {
    return res.status(400).json({ success: false, message: "Product name and description are required" });
  }

  const newProduct = {
    id: `prod-${Date.now()}`,
    name,
    category: category || "plastic-bottle",
    categoryLabel: categoryLabel || "Plastic Bottles",
    material: material || "Virgin HDPE",
    capacityRange: capacityRange || "Custom",
    factory: factory || "Xclusive Can Limited",
    applications: ["Industrial Packaging", "Consumer Goods"],
    description,
    isActive: true,
    image: image || "/cropped/product-card-1.png",
  };

  productsStore.unshift(newProduct);
  res.status(201).json({ success: true, message: "Product created successfully", data: newProduct });
});

router.put("/products/:id", (req: Request, res: Response) => {
  const index = productsStore.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  productsStore[index] = { ...productsStore[index], ...req.body };
  res.json({ success: true, message: "Product updated successfully", data: productsStore[index] });
});

router.delete("/products/:id", (req: Request, res: Response) => {
  const initialLength = productsStore.length;
  productsStore = productsStore.filter((p) => p.id !== req.params.id);

  if (productsStore.length === initialLength) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.json({ success: true, message: "Product deleted successfully" });
});

// ==========================================
// 2. RFQ & INQUIRIES API
// ==========================================
router.get("/rfq", (req: Request, res: Response) => {
  const { status, search } = req.query;
  let result = rfqStore;

  if (status && status !== "all") {
    result = result.filter((r) => r.status === status);
  }
  if (search) {
    const q = String(search).toLowerCase();
    result = result.filter(
      (r) =>
        r.companyName.toLowerCase().includes(q) ||
        r.contactPerson.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    count: result.length,
    data: result,
  });
});

router.post("/rfq", (req: Request, res: Response) => {
  const { companyName, contactPerson, email, phone, category, volume, capacity, notes } = req.body;

  if (!companyName || !email || !phone) {
    return res.status(400).json({ success: false, message: "Company name, email, and phone are required" });
  }

  const quoteNumber = `RFQ-2026-XCL-${Math.floor(1000 + Math.random() * 9000)}`;
  const newRfq = {
    id: quoteNumber,
    companyName,
    contactPerson: contactPerson || companyName,
    email,
    phone,
    category: category || "General Packaging",
    volume: volume || "Standard Production Batch",
    capacity: capacity || "Standard",
    status: "New Inquiry",
    notes: notes || "",
    createdAt: new Date().toISOString(),
  };

  rfqStore.unshift(newRfq);

  res.status(201).json({
    success: true,
    message: "Request for Quotation registered successfully",
    quoteNumber,
    receivedAt: newRfq.createdAt,
    data: newRfq,
  });
});

router.patch("/rfq/:id/status", (req: Request, res: Response) => {
  const { status } = req.body;
  const rfq = rfqStore.find((r) => r.id === req.params.id);

  if (!rfq) {
    return res.status(404).json({ success: false, message: "RFQ record not found" });
  }

  rfq.status = status;
  res.json({ success: true, message: `Status updated to ${status}`, data: rfq });
});

// ==========================================
// 3. MEDIA & PRESS STORIES API
// ==========================================
router.get("/media", (_req: Request, res: Response) => {
  res.json({ success: true, data: mediaStore });
});

router.post("/media", (req: Request, res: Response) => {
  const { title, banglaTitle, newspaper, date, summary, highlightQuote, image, tag } = req.body;

  if (!title || !newspaper) {
    return res.status(400).json({ success: false, message: "Title and newspaper name are required" });
  }

  const newStory = {
    id: `story-${Date.now()}`,
    title,
    banglaTitle: banglaTitle || title,
    newspaper,
    date: date || "Special Industrial Report",
    summary: summary || "",
    highlightQuote: highlightQuote || "",
    image: image || "/Infoimages/Screenshot 2026-11-04 130333.png",
    tag: tag || "Milestone",
  };

  mediaStore.unshift(newStory);
  res.status(201).json({ success: true, message: "Press story published", data: newStory });
});

router.delete("/media/:id", (req: Request, res: Response) => {
  mediaStore = mediaStore.filter((s) => s.id !== req.params.id);
  res.json({ success: true, message: "Story deleted" });
});

// ==========================================
// 4. CAREERS & TALENT ACQUISITION API
// ==========================================
router.get("/careers", (_req: Request, res: Response) => {
  res.json({ success: true, count: careerStore.length, data: careerStore });
});

router.post("/careers", (req: Request, res: Response) => {
  const { name, position, experience, email, phone, facility } = req.body;

  if (!name || !email || !position) {
    return res.status(400).json({ success: false, message: "Name, email, and position are required" });
  }

  const newApp = {
    id: `APP-2026-${Math.floor(100 + Math.random() * 900)}`,
    name,
    position,
    experience: experience || "1-3 Years",
    email,
    phone: phone || "Not Provided",
    date: new Date().toISOString().slice(0, 10),
    status: "New",
    facility: facility || "Gazipur Facility",
  };

  careerStore.unshift(newApp);
  res.status(201).json({ success: true, message: "Application submitted successfully", data: newApp });
});

router.patch("/careers/:id/status", (req: Request, res: Response) => {
  const { status } = req.body;
  const app = careerStore.find((a) => a.id === req.params.id);
  if (!app) {
    return res.status(404).json({ success: false, message: "Application not found" });
  }
  app.status = status;
  res.json({ success: true, message: "Candidate status updated", data: app });
});

// ==========================================
// 5. EXECUTIVE DASHBOARD ANALYTICS API
// ==========================================
router.get("/analytics", (_req: Request, res: Response) => {
  res.json({
    success: true,
    telemetry: {
      activeProducts: productsStore.length,
      pendingRfqs: rfqStore.filter((r) => r.status === "New Inquiry").length,
      annualCapacity: "500 Million Containers",
      leedStandard: "LEED Platinum (USGBC)",
      operationalFacilities: ["Gazipur Main Complex", "Tongi High-Speed Plant"],
      systemHealth: "100% Operational",
    },
  });
});

// ==========================================
// 6. WEBSITE & COMPANY SETTINGS API
// ==========================================
router.get("/settings", (_req: Request, res: Response) => {
  res.json({ success: true, data: companySettings });
});

router.put("/settings", (req: Request, res: Response) => {
  companySettings = { ...companySettings, ...req.body };
  res.json({ success: true, message: "Settings updated successfully", data: companySettings });
});

export default router;
