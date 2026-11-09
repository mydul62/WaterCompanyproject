import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Xclusive Can Limited database...");

  // 1. Super Admin User
  const passwordHash = await bcrypt.hash("admin123456", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@xclusivecan.com" },
    update: { password: passwordHash },
    create: {
      email: "admin@xclusivecan.com",
      name: "System Administrator",
      password: passwordHash,
      role: "SUPER_ADMIN",
      avatar: "/cropped/xclusive-logo.png",
    },
  });
  console.log("Admin user seeded:", admin.email);

  // 2. Global Site Settings
  const settingsData = [
    { key: "site_name", value: "Xclusive Can Limited", category: "BRANDING" },
    { key: "brand_group", value: "Xclusive Can & Q Pail Ltd.", category: "BRANDING" },
    { key: "tagline", value: "Beyond Packaging, We Craft Solutions", category: "BRANDING" },
    { key: "founded_year", value: "1992", category: "BRANDING" },
    { key: "logo_url", value: "/cropped/xclusive-logo.png", category: "BRANDING" },
    { key: "logo_white_url", value: "/cropped/xclusive-logo-white.png", category: "BRANDING" },
    { key: "headquarters", value: "Plot#53/1, Block#B, Kaligonj Road, Majukhan, Gazipur, Dhaka, Bangladesh", category: "CONTACT" },
    { key: "plant_tongi", value: "Plot#B 196, BSCIC I/A, Tongi, Gazipur, Dhaka, Bangladesh", category: "CONTACT" },
    { key: "phone_sales_1", value: "+8801819343635", category: "CONTACT" },
    { key: "phone_sales_2", value: "+8801680240524", category: "CONTACT" },
    { key: "phone_foreign_purchase", value: "+8801841984208", category: "CONTACT" },
    { key: "email_sales", value: "marketing@qpail.com", category: "CONTACT" },
    { key: "email_procurement", value: "commercial@qpail.com", category: "CONTACT" },
    { key: "social_facebook", value: "https://facebook.com", category: "SOCIAL" },
    { key: "social_youtube", value: "https://youtube.com", category: "SOCIAL" },
    { key: "social_linkedin", value: "https://linkedin.com", category: "SOCIAL" },
    { key: "seo_meta_title", value: "Xclusive Can Limited | Industrial Packaging Solutions", category: "SEO" },
    { key: "seo_meta_description", value: "Bangladesh's premier manufacturer of custom-engineered tin cans, aerosol containers, and plastic packaging solutions since 1992. LEED Platinum certified manufacturing in Gazipur & Tongi.", category: "SEO" },
    { key: "seo_meta_keywords", value: "Xclusive Can, Q Pail, Tin Cans Bangladesh, Packaging Manufacturer, Aerosol Cans, Plastic Bottles PET HDPE, LEED Platinum Factory", category: "SEO" },
    { key: "footer_copyright", value: "Copyright © 1992 - 2026 Xclusive Can Limited. All rights reserved.", category: "FOOTER" },
  ];

  for (const item of settingsData) {
    await prisma.siteSetting.upsert({
      where: { key: item.key },
      update: { value: item.value, category: item.category },
      create: item,
    });
  }
  console.log("Site settings seeded:", settingsData.length);

  // 3. Centralized Link Registry
  const linksData = [
    { title: "Home", slug: "link-home", destinationUrl: "/", category: "NAV" },
    { title: "Our Story", slug: "link-our-story", destinationUrl: "/our-story", category: "NAV" },
    { title: "Our Business", slug: "link-our-business", destinationUrl: "/our-business", category: "NAV" },
    { title: "Products", slug: "link-products", destinationUrl: "/products", category: "NAV" },
    { title: "Certificates", slug: "link-certificates", destinationUrl: "/certificates", category: "NAV" },
    { title: "Careers", slug: "link-careers", destinationUrl: "/careers", category: "NAV" },
    { title: "Brands We Work With", slug: "link-brands", destinationUrl: "/brands-we-work-with", category: "NAV" },
    { title: "Media and News", slug: "link-media", destinationUrl: "/media", category: "NAV" },
    { title: "Factory Location", slug: "link-factory", destinationUrl: "/#about", category: "NAV" },
    { title: "Sustainability", slug: "link-sustainability", destinationUrl: "/#overview", category: "NAV" },
    { title: "Request Quote (RFQ)", slug: "link-rfq", destinationUrl: "/request-quote", category: "BUTTON" },
  ];

  for (const link of linksData) {
    await prisma.linkItem.upsert({
      where: { slug: link.slug },
      update: { destinationUrl: link.destinationUrl, title: link.title, category: link.category },
      create: link,
    });
  }
  console.log("Centralized links seeded:", linksData.length);

  // 4. Navigation Menus
  const primaryMenu = await prisma.navigationMenu.upsert({
    where: { location: "HEADER_PRIMARY" },
    update: { name: "Primary Header Menu", isPublished: true },
    create: { name: "Primary Header Menu", location: "HEADER_PRIMARY", isPublished: true },
  });

  // Clear existing items to re-seed clean tree
  await prisma.navigationItem.deleteMany({ where: { menuId: primaryMenu.id } });

  // Add Header Primary Menu Items
  const aboutUsParent = await prisma.navigationItem.create({
    data: {
      menuId: primaryMenu.id,
      label: "About Us",
      url: "/#about",
      order: 1,
      children: {
        create: [
          {
            menuId: primaryMenu.id,
            label: "Our Business",
            url: "/our-business",
            description: "2 specialized packaging plants: Q Pail & Xclusive Can",
            iconName: "Building2",
            order: 1,
          },
          {
            menuId: primaryMenu.id,
            label: "Our Story",
            url: "/our-story",
            description: "Pioneering engineered containers since 1992",
            iconName: "BookOpen",
            order: 2,
          },
          {
            menuId: primaryMenu.id,
            label: "Brand & Quality",
            url: "/#overview",
            description: "DGDA compliant, USGBC LEED Platinum audited",
            iconName: "ShieldCheck",
            order: 3,
          },
          {
            menuId: primaryMenu.id,
            label: "Career",
            url: "/careers",
            description: "Join our automated cleanroom engineering team",
            iconName: "Briefcase",
            order: 4,
          },
        ],
      },
    },
  });

  await prisma.navigationItem.create({
    data: {
      menuId: primaryMenu.id,
      label: "Sustainability",
      url: "/#overview",
      order: 2,
    },
  });

  await prisma.navigationItem.create({
    data: {
      menuId: primaryMenu.id,
      label: "Find Our Product",
      url: "/products",
      order: 3,
    },
  });

  await prisma.navigationItem.create({
    data: {
      menuId: primaryMenu.id,
      label: "Knowledge Hub",
      url: "/#explore",
      order: 4,
      children: {
        create: [
          {
            menuId: primaryMenu.id,
            label: "FAQs",
            url: "/#footer",
            description: "Answers regarding MOQs, custom tooling & delivery",
            iconName: "HelpCircle",
            order: 1,
          },
          {
            menuId: primaryMenu.id,
            label: "Case Studies",
            url: "/#explore",
            description: "How we scaled packaging for pharma & paints",
            iconName: "FileText",
            order: 2,
          },
          {
            menuId: primaryMenu.id,
            label: "Blog & Insights",
            url: "/#media",
            description: "Trends in biodegradable polymers and can welding",
            iconName: "Sparkles",
            order: 3,
          },
        ],
      },
    },
  });

  await prisma.navigationItem.create({
    data: {
      menuId: primaryMenu.id,
      label: "Achievements",
      url: "/certificates",
      order: 5,
      children: {
        create: [
          {
            menuId: primaryMenu.id,
            label: "Awards & Certificates",
            url: "/certificates",
            description: "ISO 9001, HACCP, GMP & DGDA compliance",
            iconName: "Award",
            order: 1,
          },
          {
            menuId: primaryMenu.id,
            label: "Brands We Work With",
            url: "/brands-we-work-with",
            description: "Radiant Pharma, Asian Paints, Samuda & more",
            iconName: "Users",
            order: 2,
          },
        ],
      },
    },
  });

  await prisma.navigationItem.create({
    data: {
      menuId: primaryMenu.id,
      label: "Media and Contacts",
      url: "/media",
      order: 6,
    },
  });

  console.log("Primary Navigation Menu items seeded.");

  // 5. Product Categories
  const categoriesData = [
    { name: "Pails & Drums", slug: "pail-bucket", material: "HDPE_PLASTIC", description: "Industrial paint, chemical and lubricant buckets from 1L to 25L." },
    { name: "Tin Cans", slug: "tin-can", material: "TINPLATE", description: "Lithographed round, rectangular, and cone-top metal cans." },
    { name: "Bottles & Jars", slug: "jar-dropper", material: "PET_PLASTIC", description: "Cleanroom Class 100k sterile dropper and pharmaceutical bottles." },
    { name: "Aerosols", slug: "aerosol-can", material: "TINPLATE", description: "3-piece welded high-pressure aerosol cans up to 18 bar burst test." },
    { name: "Closures & Caps", slug: "caps-closures", material: "PP_PLASTIC", description: "Tamper-evident, hermetic seal, child-resistant closures." },
  ];

  const catMap: Record<string, string> = {};
  for (const cat of categoriesData) {
    const c = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, material: cat.material, description: cat.description },
      create: cat,
    });
    catMap[cat.slug] = c.id;
  }
  console.log("Categories seeded:", Object.keys(catMap).length);

  // 6. Products Catalog
  const productsData = [
    {
      name: "Industrial Paint & Chemical Pail (Q Pail)",
      slug: "industrial-paint-chemical-pail-q-pail",
      sku: "QP-PAIL-20L",
      categoryId: catMap["pail-bucket"],
      material: "HDPE_PLASTIC",
      capacityRange: "1 Liter - 25 Liters",
      factory: "Q Pail Limited",
      description: "Heavy-duty plastic pail with reinforced ribs, airtight gasket lid, and steel handle with plastic grip.",
      applications: JSON.stringify(["Emulsion Paints", "Industrial Inks", "Lubricants", "Adhesives"]),
      features: JSON.stringify(["Triple seal leak-proof lid", "Drop impact resistant", "100% recyclable virgin copolymer PP"]),
      specifications: JSON.stringify({ capacity: "20L", height: "385mm", diameter: "305mm", handle: "Galvanized Steel", wallThickness: "2.2mm" }),
      imageUrl: "/Infoimages/Screenshot 2026-11-04 130154.png",
      galleryUrls: JSON.stringify(["/Infoimages/Screenshot 2026-11-04 130154.png", "/Infoimages/Screenshot 2026-11-04 130237.png"]),
      isFeatured: true,
      isActive: true,
      order: 1,
    },
    {
      name: "Aerosol & High-Pressure Tin Container",
      slug: "aerosol-high-pressure-tin-container",
      sku: "XC-AERO-400ML",
      categoryId: catMap["aerosol-can"] || catMap["tin-can"],
      material: "TINPLATE",
      capacityRange: "150ml - 750ml",
      factory: "Xclusive Can Limited",
      description: "Three-piece welded aerosol tinplate cans tested up to 18 bar burst pressure with epoxy-phenolic internal lacquer.",
      applications: JSON.stringify(["Insecticides", "Air Fresheners", "Spray Paints", "Automotive Polish"]),
      features: JSON.stringify(["18-bar burst pressure rated", "High precision welded seam", "Rust-inhibiting internal coating"]),
      specifications: JSON.stringify({ capacity: "400ml", height: "195mm", diameter: "65mm", burstPressure: "18 Bar" }),
      imageUrl: "/Infoimages/Screenshot 2026-11-04 130154.png",
      galleryUrls: JSON.stringify(["/Infoimages/Screenshot 2026-11-04 130154.png"]),
      isFeatured: true,
      isActive: true,
      order: 2,
    },
    {
      name: "Pharmaceutical Dropper & Eye Drop Bottle",
      slug: "pharmaceutical-dropper-eye-drop-bottle",
      sku: "XC-PHARM-15ML",
      categoryId: catMap["jar-dropper"],
      material: "PET_PLASTIC",
      capacityRange: "5ml - 30ml",
      factory: "Xclusive Can Limited",
      description: "Produced in cleanroom Class 100,000 environment with precise drop volume tip and child-resistant cap.",
      applications: JSON.stringify(["Ophthalmic Solutions", "Nasal Sprays", "Herbal Drops"]),
      features: JSON.stringify(["Class 100k cleanroom sterile", "Calibrated drop tip", "DGDA compliant"]),
      specifications: JSON.stringify({ capacity: "15ml", height: "65mm", diameter: "25mm", cleanroomClass: "100,000" }),
      imageUrl: "/Infoimages/Screenshot 2026-11-04 130325.png",
      galleryUrls: JSON.stringify(["/Infoimages/Screenshot 2026-11-04 130325.png"]),
      isFeatured: true,
      isActive: true,
      order: 3,
    },
    {
      name: "Round Decorative & Food Grade Metal Can",
      slug: "round-decorative-food-grade-metal-can",
      sku: "XC-FOOD-1KG",
      categoryId: catMap["tin-can"],
      material: "TINPLATE",
      capacityRange: "250g - 5kg",
      factory: "Xclusive Can Limited",
      description: "Airtight tinplate container featuring high-definition offset lithography and BPA-NI certified interior lacquer.",
      applications: JSON.stringify(["Edible Oils", "Milk Powder", "Biscuits & Confectionery", "Ghee & Butter"]),
      features: JSON.stringify(["BPA-NI certified internal lacquer", "Airtight seamed end", "Hermetic freshness preservation"]),
      specifications: JSON.stringify({ capacity: "1kg", height: "140mm", diameter: "100mm", foodGradeCert: "HACCP / ISO 22000" }),
      imageUrl: "/Infoimages/Screenshot 2026-11-04 130219.png",
      galleryUrls: JSON.stringify(["/Infoimages/Screenshot 2026-11-04 130219.png"]),
      isFeatured: true,
      isActive: true,
      order: 4,
    },
    {
      name: "Rectangular Metal Can for Solvents & Paint Thinners",
      slug: "rectangular-metal-can-solvents-thinners",
      sku: "XC-RECT-4L",
      categoryId: catMap["tin-can"],
      material: "TINPLATE",
      capacityRange: "500ml - 5 Liters",
      factory: "Xclusive Can Limited",
      description: "Oblong rectangular tin container with bridge metal handle and screw cap with inner seal plug.",
      applications: JSON.stringify(["Paint Thinners", "Brake Fluids", "Wood Stains", "Industrial Solvents"]),
      features: JSON.stringify(["Heavy-gauge welded body", "Leak-tight screw cap", "Space-saving rectangular stacking"]),
      specifications: JSON.stringify({ capacity: "4L", height: "240mm", width: "170mm", depth: "115mm" }),
      imageUrl: "/Infoimages/Screenshot 2026-11-04 130226.png",
      galleryUrls: JSON.stringify(["/Infoimages/Screenshot 2026-11-04 130226.png"]),
      isFeatured: false,
      isActive: true,
      order: 5,
    },
  ];

  for (const prod of productsData) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod,
    });
  }
  console.log("Products seeded:", productsData.length);

  // 7. Pages & Visual Elementor-Style Sections
  const pagesData = [
    {
      title: "Home - Beyond Packaging, We Craft Solutions",
      slug: "home",
      description: "Official Homepage of Xclusive Can Limited & Q Pail Platform",
      status: "PUBLISHED",
      sections: [
        {
          sectionType: "hero_slider",
          name: "Homepage Hero Slider",
          order: 1,
          settings: JSON.stringify({ height: "100vh", autoPlayInterval: 5000 }),
          content: JSON.stringify({
            slides: [
              {
                badge: "100% Recyclable • USGBC Benchmark",
                title: "Beyond Packaging We",
                highlight: "Drive Innovation",
                tagline: "Custom engineered tin cans, aerosol containers, and industrial plastic pails manufactured in Gazipur & Tongi.",
                primaryBtnText: "Explore Product Range",
                primaryBtnLink: "/products",
                secondaryBtnText: "Request Quote (RFQ)",
                secondaryBtnLink: "/request-quote",
              },
            ],
          }),
        },
        {
          sectionType: "b2b_banner",
          name: "B2B Solutions Banner",
          order: 2,
          settings: JSON.stringify({ background: "#ffffff", padding: "py-16" }),
          content: JSON.stringify({
            title: "Custom Engineered Packaging for Fortune 500 & National Leaders",
            subtitle: "Serving Berger, Asian Paints, Square, Radiant, Reckitt, and Unilever since 1992.",
          }),
        },
        {
          sectionType: "stats_counter",
          name: "Key Performance Metrics",
          order: 3,
          settings: JSON.stringify({ background: "#0f172a", textTheme: "dark" }),
          content: JSON.stringify({
            metrics: [
              { value: "32+", label: "Years of Excellence" },
              { value: "50M+", label: "Monthly Units Capacity" },
              { value: "850+", label: "Expert Workforce" },
              { value: "100%", label: "LEED Platinum Audited" },
            ],
          }),
        },
      ],
    },
    {
      title: "Our Story - Since 1992",
      slug: "our-story",
      description: "Company journey, humble beginnings in Chittagong to LEED Platinum campuses in Gazipur & Tongi.",
      status: "PUBLISHED",
      sections: [
        {
          sectionType: "hero",
          name: "Our Story Hero",
          order: 1,
          settings: JSON.stringify({ background: "/images/story-hero-buildings.jpg" }),
          content: JSON.stringify({
            title: "Since 1992",
            subtitle: "A Three-Decade Journey of Industrial Mastery and Sustainability",
          }),
        },
      ],
    },
    {
      title: "Our Business - Industrial Packaging Pioneers",
      slug: "our-business",
      description: "Detailed overview of Xclusive Can Limited & Q Pail manufacturing capabilities.",
      status: "PUBLISHED",
      sections: [
        {
          sectionType: "hero",
          name: "Our Business Hero",
          order: 1,
          settings: JSON.stringify({ background: "/images/business-hero-office.jpg" }),
          content: JSON.stringify({
            title: "Our Business",
            subtitle: "Eco-Friendly Green Building Industrial Complex Featuring Centralized Automated Cleanrooms",
          }),
        },
      ],
    },
    {
      title: "Awards & Certificates",
      slug: "certificates",
      description: "ISO 9001, HACCP, GMP, DGDA, BSTI, and USGBC LEED Platinum Accreditations.",
      status: "PUBLISHED",
      sections: [
        {
          sectionType: "hero",
          name: "Certificates Hero",
          order: 1,
          settings: JSON.stringify({ background: "/images/certificates-hero.jpg" }),
          content: JSON.stringify({
            title: "Awards & Certificates",
            subtitle: "Globally Accredited Manufacturing and Cleanroom Standards",
          }),
        },
      ],
    },
    {
      title: "Careers at Xclusive Can Limited",
      slug: "careers",
      description: "Job openings, talent pool, and engineering opportunities at Gazipur and Tongi plants.",
      status: "PUBLISHED",
      sections: [
        {
          sectionType: "hero",
          name: "Careers Hero",
          order: 1,
          settings: JSON.stringify({ background: "/images/business-hero-office.jpg" }),
          content: JSON.stringify({
            title: "Shape the Future of Packaging",
            subtitle: "Join our high-performance engineering, cleanroom, and commercial teams.",
          }),
        },
      ],
    },
    {
      title: "Brands We Work With",
      slug: "brands-we-work-with",
      description: "49+ leading enterprise clients across paints, pharmaceuticals, FMCG, and lubricants.",
      status: "PUBLISHED",
      sections: [
        {
          sectionType: "hero",
          name: "Brands Hero",
          order: 1,
          settings: JSON.stringify({ background: "/images/brands-hero.jpg" }),
          content: JSON.stringify({
            title: "Brands We Work With",
            subtitle: "Trusted by Bangladesh's and global multinational market leaders.",
          }),
        },
      ],
    },
    {
      title: "Product Catalog",
      slug: "products",
      description: "Explore our comprehensive portfolio of tin cans, aerosol containers, and plastic pails.",
      status: "PUBLISHED",
      sections: [
        {
          sectionType: "hero",
          name: "Product Catalog Hero",
          order: 1,
          settings: JSON.stringify({ background: "#0f172a" }),
          content: JSON.stringify({
            title: "Industrial Packaging Portfolio",
            subtitle: "Engineered for durability, chemical resistance, and premium shelf appeal.",
          }),
        },
      ],
    },
    {
      title: "Press & Media Coverage",
      slug: "media",
      description: "National news features, press releases, factory inauguration stories, and media gallery.",
      status: "PUBLISHED",
      sections: [
        {
          sectionType: "hero",
          name: "Media Hero",
          order: 1,
          settings: JSON.stringify({ background: "#0f172a" }),
          content: JSON.stringify({
            title: "Press & Media Center",
            subtitle: "Latest industrial milestones and news clippings featuring Xclusive Can & Q Pail.",
          }),
        },
      ],
    },
    {
      title: "Research & Development (R&D)",
      slug: "rnd",
      description: "Advanced tooling, polymer testing, structural finite element analysis, and sustainability research.",
      status: "PUBLISHED",
      sections: [
        {
          sectionType: "hero",
          name: "R&D Hero Banner",
          order: 1,
          settings: JSON.stringify({ background: "#020617" }),
          content: JSON.stringify({
            title: "Pioneering Precision Packaging",
            subtitle: "European tooling labs and in-house polymer research driving packaging performance.",
          }),
        },
      ],
    },
    {
      title: "Tool Room Facility",
      slug: "tool-room",
      description: "State-of-the-art mold making, CNC milling, wire EDM, and precision optical inspection.",
      status: "PUBLISHED",
      sections: [
        {
          sectionType: "hero",
          name: "Tool Room Hero",
          order: 1,
          settings: JSON.stringify({ background: "#020617" }),
          content: JSON.stringify({
            title: "Precision Tool Room & Mold Engineering",
            subtitle: "Sub-micron tolerance die crafting with Japanese CNC and Swiss EDM machinery.",
          }),
        },
      ],
    },
    {
      title: "Frequently Asked Questions (FAQs)",
      slug: "faqs",
      description: "Common questions about ordering, minimum order quantities (MOQ), tooling, and deliveries.",
      status: "PUBLISHED",
      sections: [
        {
          sectionType: "hero",
          name: "FAQs Hero",
          order: 1,
          settings: JSON.stringify({ background: "#0f172a" }),
          content: JSON.stringify({
            title: "Knowledge Hub & FAQ",
            subtitle: "Answers to common commercial, technical, and logistics inquiries.",
          }),
        },
      ],
    },
    {
      title: "Case Studies & Client Impact",
      slug: "case-studies",
      description: "Real-world packaging transformations for Berger, Asian Paints, Radiant Pharma, and Square.",
      status: "PUBLISHED",
      sections: [
        {
          sectionType: "hero",
          name: "Case Studies Hero",
          order: 1,
          settings: JSON.stringify({ background: "#0f172a" }),
          content: JSON.stringify({
            title: "Proven Impact & Case Studies",
            subtitle: "How our packaging innovations reduced leakage, cut costs, and protected product integrity.",
          }),
        },
      ],
    },
    {
      title: "Blog & Technical Insights",
      slug: "blog",
      description: "Technical articles on tinplate corrosion inhibition, barrier properties of virgin HDPE, and recycling.",
      status: "PUBLISHED",
      sections: [
        {
          sectionType: "hero",
          name: "Blog Hero",
          order: 1,
          settings: JSON.stringify({ background: "#0f172a" }),
          content: JSON.stringify({
            title: "Engineering Insights & Articles",
            subtitle: "Technical papers and industry trends in metal lithography and plastic polymers.",
          }),
        },
      ],
    },
    {
      title: "Q Pail - Industrial Packaging Division",
      slug: "q-pail",
      description: "Specialized HDPE and PP plastic injection-molded buckets, drums, and pails.",
      status: "PUBLISHED",
      sections: [
        {
          sectionType: "hero",
          name: "Q Pail Hero",
          order: 1,
          settings: JSON.stringify({ background: "#0f172a" }),
          content: JSON.stringify({
            title: "Q Pail Limited",
            subtitle: "Heavy-duty plastic pails and airtight containers for paints, chemicals, and food.",
          }),
        },
      ],
    },
    {
      title: "Request a Quote (RFQ)",
      slug: "request-quote",
      description: "Submit custom container specifications and get an expedited quotation within 24 hours.",
      status: "PUBLISHED",
      sections: [
        {
          sectionType: "hero",
          name: "RFQ Hero",
          order: 1,
          settings: JSON.stringify({ background: "#0f172a" }),
          content: JSON.stringify({
            title: "Request an Engineered Quote",
            subtitle: "Tell us your volume, material requirements, and printing specifications.",
          }),
        },
      ],
    },
  ];

  for (const p of pagesData) {
    const page = await prisma.page.upsert({
      where: { slug: p.slug },
      update: { title: p.title, description: p.description, status: p.status },
      create: {
        title: p.title,
        slug: p.slug,
        description: p.description,
        status: p.status,
      },
    });

    // Create default sections if none exist
    const count = await prisma.pageSection.count({ where: { pageId: page.id } });
    if (count === 0 && p.sections) {
      for (const s of p.sections) {
        await prisma.pageSection.create({
          data: {
            pageId: page.id,
            sectionType: s.sectionType,
            name: s.name,
            order: s.order,
            settings: s.settings,
            content: s.content,
          },
        });
      }
    }
  }
  console.log("Pages & Visual Sections seeded:", pagesData.length);

  // 8. Pre-index Media Assets
  const defaultAssets = [
    { filename: "xclusive-logo.png", originalName: "xclusive-logo.png", mimeType: "image/png", size: 7689, url: "/cropped/xclusive-logo.png", altText: "Xclusive Can Limited Logo" },
    { filename: "xclusive-logo-white.png", originalName: "xclusive-logo-white.png", mimeType: "image/png", size: 11111, url: "/cropped/xclusive-logo-white.png", altText: "Xclusive Can White Logo" },
    { filename: "business-hero-office.jpg", originalName: "business-hero-office.jpg", mimeType: "image/jpeg", size: 305977, url: "/images/business-hero-office.jpg", altText: "Office & Operations Team" },
    { filename: "story-hero-buildings.jpg", originalName: "story-hero-buildings.jpg", mimeType: "image/jpeg", size: 95539, url: "/images/story-hero-buildings.jpg", altText: "Factory Campuses at Sunset" },
    { filename: "certificates-hero.jpg", originalName: "certificates-hero.jpg", mimeType: "image/jpeg", size: 19263, url: "/images/certificates-hero.jpg", altText: "Awards & Trophies Spotlight" },
    { filename: "brands-hero.jpg", originalName: "brands-hero.jpg", mimeType: "image/jpeg", size: 54092, url: "/images/brands-hero.jpg", altText: "Corporate Partnership Handshake" },
    { filename: "brands-logos-only.png", originalName: "brands-logos-only.png", mimeType: "image/png", size: 85200, url: "/images/brands-logos-only.png", altText: "Client Brand Logos Grid" },
    // Tool Room Gallery Seed Assets
    { filename: "tool-room-hero.jpg", originalName: "tool-room-hero.jpg", mimeType: "image/jpeg", size: 480000, url: "https://api.xclusivecanltd.com/files/public/uploads/images/112025/IMG-20251109-130659705-HDR-PORTRAIT-upscayl-2x-upscayl-standard-4x-1764497084873.jpg", altText: "Tool Room Hero Banner Workshop", folder: "tool-room" },
    { filename: "tool-room-cnc-milling.jpg", originalName: "tool-room-cnc-milling.jpg", mimeType: "image/jpeg", size: 380000, url: "https://api.xclusivecanltd.com/files/public/uploads/images/122025/22-1764578175589.jpg", altText: "High-Speed CNC Milling Center", folder: "tool-room" },
    { filename: "tool-room-wire-edm.jpg", originalName: "tool-room-wire-edm.jpg", mimeType: "image/jpeg", size: 360000, url: "https://api.xclusivecanltd.com/files/public/uploads/images/122025/Tool-Room-3-1764648592595.jpg", altText: "Wire EDM Spark Erosion Machine", folder: "tool-room" },
    { filename: "tool-room-surface-grinding.jpg", originalName: "tool-room-surface-grinding.jpg", mimeType: "image/jpeg", size: 410000, url: "https://api.xclusivecanltd.com/files/public/uploads/images/122025/IMG-20251109-130659705-HDR-PORTRAIT-upscayl-2x-upscayl-standard-4x-1764648646339.jpg", altText: "Surface Grinding & Mirror Lapping", folder: "tool-room" },
    { filename: "tool-room-lathe-turning.jpg", originalName: "tool-room-lathe-turning.jpg", mimeType: "image/jpeg", size: 395000, url: "https://api.xclusivecanltd.com/files/public/uploads/images/122025/IMG-20251109-134305764-HDR-PORTRAIT-1764651460591.jpg", altText: "Heavy-Duty Precision Lathe & Turning", folder: "tool-room" },
    { filename: "tool-room-mold-assembly.jpg", originalName: "tool-room-mold-assembly.jpg", mimeType: "image/jpeg", size: 420000, url: "https://api.xclusivecanltd.com/files/public/uploads/images/122025/IMG-20251109-134127254-HDR-PORTRAIT-1764651467357.jpg", altText: "Multi-Cavity Mold Assembly & Fitting", folder: "tool-room" },
    { filename: "tool-room-cmm-inspection.jpg", originalName: "tool-room-cmm-inspection.jpg", mimeType: "image/jpeg", size: 375000, url: "https://api.xclusivecanltd.com/files/public/uploads/images/122025/IMG-20251109-134740442-HDR-PORTRAIT-1764651472146.jpg", altText: "Optical CMM Metrology & Inspection Stage", folder: "tool-room" },
    { filename: "tool-room-master-panorama.jpg", originalName: "tool-room-master-panorama.jpg", mimeType: "image/jpeg", size: 520000, url: "https://api.xclusivecanltd.com/files/public/uploads/images/122025/WhatsApp-Image-2025-11-27-at-10-01-24-AM-upscayl-2x-upscayl-standard-4x-1764651474874.jpg", altText: "Tool Room Master Engineering Hall & Crane Bay", folder: "tool-room" },
  ];

  for (const asset of defaultAssets) {
    const existing = await prisma.mediaAsset.findFirst({ where: { filename: asset.filename } });
    if (!existing) {
      await prisma.mediaAsset.create({ data: asset });
    }
  }
  console.log("Initial Media Assets registered in Media Library.");

  console.log("=================================================");
  console.log("  DATABASE SEEDING COMPLETED SUCCESSFULLY!        ");
  console.log("  Admin login: admin@xclusivecan.com / admin123456 ");
  console.log("=================================================");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

