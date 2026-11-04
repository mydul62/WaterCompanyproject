# MASTER SUPER PROMPT: XCLUSIVE CAN LIMITED (waterWeb)
## Build an Enterprise-Grade Industrial Packaging Platform & Management System

---

### 1. Project Mission & Identity

Act as a **Principal Software Architect, Lead UI/UX Product Designer, Next.js Full-Stack Developer, PostgreSQL/Prisma Database Architect, Security Engineer, and QA Specialist**.

Build a complete, production-ready, high-performance corporate platform and B2B management system for **Xclusive Can Limited** (and partner brand **Q Pail**), Bangladesh's premier manufacturer of custom-engineered tin cans, aerosol containers, food cans, and plastic (PET, HDPE, PP) bottles and pails since 1992, with state-of-the-art LEED Platinum certified manufacturing facilities in Gazipur and Tongi.

This is a real client project. It must not look like a dated brochure, generic template, or disposable toy prototype. It must embody a **"Hard, Bold & High-Tech Modern Industrial"** design language that immediately establishes undisputed market leadership, technical engineering precision, and sustainability credentials.

#### Core Priorities:
1. **Hard & Modern Industrial UI/UX:** High visual impact, crisp architectural typography, refined micro-interactions, dark/light contrast balance, and precision aesthetics.
2. **Comprehensive Information Architecture:** Faithful elevation of all 13 reference sections (Hero Slider, About Facility, Supply Chain Pillars, Product Spec Catalog, Press & Media Stories, B2B CTA, Explore Hub, Certifications).
3. **Interactive B2B Conversion Funnel:** Interactive Request for Quotation (RFQ) and Sample Request workflow allowing corporate buyers to specify materials, dimensions, volume, and upload CAD/artwork.
4. **Mandatory Persistent Sidebar Admin Dashboard (`/admin`):** Complete back-office system to manage products, categories, RFQs, press articles, job applications, hero slides, and website settings.
5. **Decoupled Full-Stack Architecture:** Next.js (App Router) frontend and Express.js + TypeScript + Prisma ORM + PostgreSQL backend.
6. **Frontend-First Milestone Strategy:** Complete and polish the entire storefront and dashboard UI with realistic demo data before full backend wiring.
7. **Strict Code & Documentation Integrity:** Clean TypeScript without `any`, modular structure, robust error boundaries, and zero unreviewed code dumps.

---

### 2. Technology Stack

#### Frontend
- **Framework:** Next.js 15+ (App Router, Server Components by default, Client Components where interaction is required)
- **Library:** React 19
- **Language:** TypeScript (strict type-checking enabled)
- **Styling:** Tailwind CSS (v4) with `clsx` and `tailwind-merge` (`cn` helper)
- **Components & Primitives:** Radix UI / shadcn/ui architecture
- **Icons:** `lucide-react`
- **Forms & Validation:** React Hook Form + Zod validation
- **Animations & Effects:** Clean CSS keyframes, subtle GPU-accelerated transitions, interactive hover cards, and accessible dialogs/drawers

#### Backend
- **Runtime:** Node.js (v24 LTS)
- **Framework:** Express.js with TypeScript (`tsx` for live development, `tsc` for production builds)
- **API Pattern:** RESTful API architecture with domain-driven feature modules (`modules/<domain>/[controller, service, routes, validation]`)
- **Validation:** Zod schema validation for all endpoints
- **Database & ORM:** PostgreSQL with Prisma ORM (relational schema, migrations, `prisma db push`, and realistic seed scripts)
- **Authentication:** JSON Web Tokens (JWT) stored in HTTP-only secure cookies with bcryptjs password hashing
- **File & Media Storage:** Multer middleware with Cloudinary integration (with local fallback for development)
- **Email Service:** Nodemailer for quotation confirmations, contact inquiries, and career submissions

---

### 3. Repository & Directory Structure

```text
waterWeb/
├── frontend/                        # Next.js App Router (Storefront + /admin dashboard)
│   ├── public/                      # Static assets, factory photos, logos, certificate badges
│   ├── src/
│   │   ├── app/                     # Route handlers & layouts
│   │   │   ├── (storefront)/        # Public marketing & product catalog routes
│   │   │   │   ├── page.tsx         # Modern Homepage
│   │   │   │   ├── about/           # About Us, Story, Plant & Facility
│   │   │   │   ├── products/        # Filterable Product Catalog with Spec Sheets
│   │   │   │   ├── sustainability/  # LEED Platinum, R&D, Tool Room, Eco initiatives
│   │   │   │   ├── supply-chain/    # 9 Pillars, Logistics & Global Export
│   │   │   │   ├── media/           # Latest Stories, Press Clippings, News Reader
│   │   │   │   ├── rfq/             # Interactive B2B Request for Quote
│   │   │   │   ├── contact/         # Contact, Factory Maps, Inquiry Form
│   │   │   │   └── careers/         # Open positions & job application form
│   │   │   └── admin/               # Persistent Sidebar Admin Dashboard
│   │   │       ├── layout.tsx       # Sidebar navigation shell (Desktop + Mobile drawer)
│   │   │       ├── page.tsx         # Dashboard Analytics & KPI Overview
│   │   │       ├── products/        # Manage products, specifications & categories
│   │   │       ├── inquiries/       # RFQ submissions & contact inquiries
│   │   │       ├── media/           # Press stories & blog articles
│   │   │       ├── careers/         # Received CVs & candidate applications
│   │   │       ├── slider/          # Manage homepage hero slides & banners
│   │   │       └── settings/        # Company metadata, contacts & certificate settings
│   │   ├── components/              # Shared UI components
│   │   │   ├── layout/              # Navbar, MegaMenu, Footer, AdminSidebar
│   │   │   ├── home/                # HeroSlider, FacilityShowcase, ProductGrid, PressStories
│   │   │   ├── products/            # ProductCard, SpecSheetModal, CategoryFilter
│   │   │   ├── rfq/                 # MultiStepQuoteModal, CustomCanCalculator
│   │   │   └── ui/                  # Buttons, Badges, Dialogs, Inputs, Tooltips
│   │   ├── context/                 # State management (RFQContext, AuthContext, UIContext)
│   │   ├── lib/                     # Utilities (cn, api-client, validators)
│   │   └── data/                    # Rich realistic mock datasets for instant preview
│   ├── package.json
│   ├── tsconfig.json
│   └── tailwind.config.ts
│
├── backend/                         # Express + TypeScript REST API
│   ├── prisma/
│   │   ├── schema.prisma            # PostgreSQL relational schema
│   │   └── seed.ts                  # Comprehensive initial database seeder
│   ├── src/
│   │   ├── config/                  # Environment, Prisma client, Cloudinary
│   │   ├── middlewares/             # Auth, role-guard, Zod validation, error handler
│   │   ├── modules/                 # Feature modules
│   │   │   ├── auth/                # Admin authentication & session management
│   │   │   ├── products/            # Product catalog & specifications API
│   │   │   ├── categories/          # Product categories & material classifications
│   │   │   ├── rfq/                 # Quotation & sample requests API
│   │   │   ├── media/               # Press clippings & news stories API
│   │   │   ├── careers/             # Job postings & applicant submissions API
│   │   │   └── inquiries/           # General contact & plant visit inquiries API
│   │   ├── utils/                   # Response helpers, formatters, logger
│   │   ├── app.ts                   # Express application setup & middleware pipeline
│   │   ├── routes.ts                # Main API route aggregator (/api/v1/...)
│   │   └── server.ts                # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                            # Project specifications & architecture documentation
│   ├── PROJECT_OVERVIEW.md
│   ├── IMPLEMENTATION_PLAN.md
│   ├── DESIGN_SYSTEM.md
│   ├── DATABASE_DESIGN.md
│   └── CLIENT_HANDOVER.md
│
├── Infoimages/                      # 13 Verified Client Reference Screenshots
├── .gitignore
├── instruction.md                   # This Master Super Prompt
└── README.md
```

---

### 4. Brand Identity & "Hard & Modern" Industrial Visual Design

#### Visual Direction: "Industrial Precision & Sustainable Engineering"
The brand represents industrial heavy manufacturing, food-grade cleanliness, and LEED Platinum sustainability. It must look authoritative, ultra-modern, and technically competent.

#### Color Palette:
- **Primary Navy / Deep Obsidian:** `#060D17` (Deepest Charcoal/Black) & `#0A192F` (Industrial Cobalt Steel)
- **Primary Industrial Blue:** `#0052CC` / `#0066FF` (Authoritative corporate manufacturing)
- **Electric Cyan / Liquid Accent:** `#00D2FF` / `#00F0FF` (Precision fluids, high-tech engineering)
- **LEED Platinum Emerald Green:** `#10B981` / `#059669` (Eco-friendly sustainability, green plant)
- **Neutral Light Surfaces:** `#F8FAFC` (Clean room white), `#F1F5F9`, `#E2E8F0`
- **Text & Borders:** `#0F172A` (Headings), `#475569` (Body), `#CBD5E1` / `rgba(255,255,255,0.12)` (Borders)

#### Typography:
- **Headings:** Bold geometric grotesque (e.g. `Plus Jakarta Sans` / `InterDisplay` with tight tracking `-0.02em`)
- **Body & Data:** Clean, readable technical sans-serif (`Inter`) with monospace numbers (`font-mono`) for technical specifications, dimensions, and capacities.

#### Micro-Interactions & Styling Rules:
- Frosted glassmorphism (`backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border border-white/20`) for floating headers and sticky quick-access widgets.
- Clean technical gridlines and subtle radial glow effects to elevate industrial authority.
- Interactive hover cards with subtle upward translation (`-translate-y-1`), shadow expansion, and border illumination.
- Never use cheesy gradients, childish cartoon icons, or excessive bouncy animations.

---

### 5. Detailed Page Breakdown (Elevating the 13 Screenshots)

#### 1. Global Navigation Bar & MegaMenu (Screenshots 1-5)
- **Top Utility Bar:** Direct contact numbers (Sales, Procurement, Foreign Purchase), email, and plant location indicator (Gazipur & Tongi).
- **Main Bar:** Crisp logo, main links with rich mega-menu dropdowns:
  - **About Us:** Our Business, Our Story, Q Pail Brand, Manufacturing Facilities, Leadership, Careers.
  - **Sustainability:** LEED Platinum Factory, R&D Department, Precision Tool Room, Circular Economy.
  - **Products:** Metal Packaging (Tin Cans, Aerosol, Food Cans) & Plastic Packaging (PET, HDPE, Pails).
  - **Knowledge Hub:** FAQs, Case Studies, Industry Insights & Blog.
  - **Achievements:** Awards & Certificates, Brands We Work With (Dulux, Berger, Marico, etc.).
  - **Media & Contact:** Press Clippings, Factory Locations, Inquiries.
- **Action Button:** Bold high-contrast `"Request a Quote"` CTA triggering the RFQ Drawer.

#### 2. Hero Carousel & Showcase (Screenshots 1-5)
- **Dynamic Headline Engine:** `"Beyond Packaging, We Craft Solutions"` / `"Beyond Packaging, We Shape the Future"` / `"Beyond Packaging, We Drive Innovation"`.
- **Interactive 3D-Feel Product Stage:** High-resolution product renders with interactive hot-spot specs.
- **Video Showreel Modal:** Sleek play button with pulse ring opening the factory walkthrough video.
- **Live Industrial Stat Tickers:**
  - `30+ Years` of Manufacturing Excellence (Est. 1992)
  - `500M+` Containers Produced Annually
  - `100%` Recyclable & Circular Materials
  - `LEED Platinum` Certified Green Building

#### 3. About Us & LEED Platinum Facility (Screenshot 6)
- **Headline:** `"Custom-Engineered Tin & Plastic Packaging That Gives Your Brand a Competitive Edge"`.
- **Dual Visual Presentation:** Real photograph of the lush Gazipur factory campus with interactive facility facts (Square footage, clean-room standards, automated production lines).
- **Interactive Metrics:** Tabbed switcher between "Green Building", "Production Capacity", and "Global Certifications".

#### 4. Supply Chain Excellence & 9 Core Operational Pillars (Screenshot 7)
- **Headline:** `"Managing Supply Chain & Business Challenges with Total Precision"`.
- **Interactive 9-Pillar Matrix:**
  1. *Logistics & Distribution:* Seamless multi-hub fleet delivery across Bangladesh and ports.
  2. *Punctuality:* Just-In-Time (JIT) dispatch schedules minimizing client warehouse downtime.
  3. *Continuous Innovation:* In-house R&D developing high-barrier lightweight containers.
  4. *Quality Control:* 100% leak testing, pressure resistance, and coating thickness audits.
  5. *Eco & Recycling:* 100% recyclable tinplate and food-grade PCR/PET plastic blends.
  6. *Precision Tool Room:* In-house mold fabrication, CNC machining, and rapid tooling.
  7. *Supply Security:* Redundant raw material buffer stock preventing supply chain disruptions.
  8. *Skilled Workforce:* ISO-trained packaging engineers and technical operators.
  9. *Engineering Accuracy:* Micrometer-calibrated seaming, necking, and blow-molding precision.

#### 5. Product Catalog & Technical Specification Inspector (Screenshot 8)
- **Interactive Category Filter:**
  - Tin Cans (3-Piece, Aerosol, Food Cans, Decorative)
  - Plastic Bottles (PET, HDPE, Droppers, Jars)
  - Industrial Pails & Buckets (Paint Pails, Lubricant Buckets, Q Pail)
  - Jerrycans & Drums
  - Closures, Caps & Handles
- **Interactive Spec Cards:** Showing image, material badge (e.g. `Tinplate`, `HDPE Food Grade`), capacity range (e.g. `50ml - 25L`), and actions (`View Technical Data Sheet`, `Request Sample`).
- **Quick Spec Drawer/Modal:** Detailed CAD diagram preview, neck size, brimful volume, decoration options (Litho printing, IML, shrink sleeve).

#### 6. Latest Stories & National Media Coverage (Screenshot 9)
- **Headline:** `"National Recognition & Industrial Milestones"`.
- **Interactive Press Hub:**
  - Newspaper clipping cards featuring articles from leading national dailies (The Daily Star, Prothom Alo, Financial Express, Bonik Barta).
  - Zoomable article viewer modal with high-res clipping, English/Bengali excerpt, date, and publication badge.
  - Featured story: *"Nasir's 100-Crore Packaging Revolution: Building Bangladesh's Greenest Factory"*.

#### 7. B2B Call to Action Banner (Screenshot 10)
- **Tagline:** `"Packaging Solutions Always Made Right®"`.
- **Interactive Features:** Instant sample dispatch request, bulk volume quote calculator, direct hotline for corporate procurement officers.

#### 8. Company Overview & Strategic Advantages (Screenshots 10-11)
- **Headquartered in Gazipur & Tongi:** Strategic proximity to raw material terminals and export shipping routes.
- **Accreditations:** ISO 22000, HACCP, GMP, and LEED Platinum certifications explained with interactive expandable accordions.
- **Circular Economy Commitment:** Zero-waste manufacturing protocols and 100% metal scrap recycling loop.

#### 9. Explore More Navigation Hub (Screenshot 12)
- Re-architect the 13 quick cards into high-tech interactive cards with category tags, custom icons, micro-descriptions, and hover illumination.

#### 10. Enterprise Footer & Accreditation Badges (Screenshot 13)
- **Plant Addresses:**
  - *Plant 1 (Gazipur):* Plot#53/1, Block#B, Kaligonj Road, Majukhan, Gazipur, Dhaka, Bangladesh.
  - *Plant 2 (Tongi):* Plot#B 196, BSCIC I/A, Tongi, Gazipur, Dhaka, Bangladesh.
- **Direct Contacts:** Sales (+8801819343635), Procurement (+8801818950946), Foreign Purchase (+8801841984208), Emails (`marketing@qpail.com`, `commercial@qpail.com`).
- **Accreditation Badges:** LEED Platinum, Intertek ISO 9001:2015, FSSC 22000, GMP Certified.
- **Interactive Footer Elements:** Download Full Product Catalog (PDF), Google Maps route button, newsletter/market update signup.

---

### 6. Mandatory Sidebar-Based Admin Dashboard (`/admin`)

The admin dashboard is a core requirement of this platform. It allows client management to control all dynamic content and incoming business inquiries without touching code.

#### Sidebar Navigation Items:
1. **Overview / KPI Dashboard:** Live counters for New RFQs, Pending Sample Requests, Active Products, Career Applications, Recent Inquiries, and Traffic Analytics.
2. **Product Catalog Manager:** Add, edit, archive products with photo uploads, category tagging, capacity, dimensions, and technical data sheets.
3. **Category & Material Manager:** Manage product categories, material types (Tinplate, PET, HDPE), and industrial sectors.
4. **RFQ & Quotation Inquiries:** View incoming RFQs with company name, volume, required specs, attached artwork, status pipeline (New, Quoted, Sample Sent, Closed).
5. **Media & Press Stories:** Add and manage newspaper clippings, press releases, publication dates, and scanned articles.
6. **Hero Slider & Banners:** Reorder, edit, and toggle homepage hero slides, headlines, and video links.
7. **Career Applications:** Review incoming job applications, candidate resumes, and filter by department.
8. **Factory & Certifications:** Update plant information, audit dates, and certification badges.
9. **Website Settings:** Contact numbers, department emails, social links, and SEO metadata.

#### Admin Shell Design:
- Persistent desktop sidebar with collapsible toggle.
- Full mobile drawer with smooth slide-over navigation.
- Consistent breadcrumbs, active states, search bar, and admin profile dropdown.
- Fully functional with realistic demo data during frontend development.

---

### 7. Phase-by-Phase Implementation Plan

#### **Phase 1: Project Initialization & Architectural Foundation**
- Create folder structure (`frontend`, `backend`, `docs`).
- Initialize `docs/` (`PROJECT_OVERVIEW.md`, `DESIGN_SYSTEM.md`, `IMPLEMENTATION_PLAN.md`, `DATABASE_DESIGN.md`).
- Configure root `.gitignore` and `README.md`.

#### **Phase 2: Frontend Scaffolding & Design System Setup**
- Initialize Next.js 15+ App Router with TypeScript and Tailwind CSS.
- Configure Tailwind tokens: Industrial Navy (`#060D17`, `#0A192F`), Electric Cyan (`#00D2FF`), LEED Emerald (`#10B981`), fonts, and glassmorphism utilities.
- Build reusable UI primitives: Button, Badge, Modal, Drawer, Tabs, Tooltip, Input, Select.
- Populate rich mock data in `src/data/` (products, 9 pillars, press stories, certifications).

#### **Phase 3: Public Website Implementation (Homepage & Core Sections)**
- Build the sticky Frosted Glassmorphism Header with Mega-Menu & mobile responsive drawer.
- Build the dynamic Hero Carousel with video modal and live KPI stats.
- Build About Us & LEED Platinum Facility Showcase.
- Build the Supply Chain & 9 Operational Pillars interactive section.
- Build the Filterable Product Catalog with Spec Sheet Drawer.
- Build the "Latest Stories" Press Coverage Hub with reader modal.
- Build the B2B Call to Action Banner & Explore More Grid.
- Build the Enterprise Footer with factory addresses and certification badges.

#### **Phase 4: B2B RFQ & Sample Request System**
- Implement multi-step Request for Quotation (RFQ) modal and drawer.
- Support container specification input (Material, Capacity, Closure type, Estimated annual volume).
- Client-side validation using Zod and React Hook Form.

#### **Phase 5: Mandatory Sidebar-Based Admin Dashboard (`/admin`)**
- Build the persistent sidebar dashboard layout (desktop sidebar + mobile drawer).
- Implement Overview page with KPI cards and recent inquiry tables.
- Implement Product Management CRUD interface with spec sheet editor.
- Implement RFQ & Inquiry Management pipeline with status badges.
- Implement Press & Media story manager.

#### **Phase 6: Backend REST API & PostgreSQL Database**
- Initialize Express.js + TypeScript backend.
- Set up Prisma schema for Products, Categories, RFQs, PressStories, Inquiries, and Admins.
- Implement modular controllers, services, and Zod validators.
- Implement JWT authentication and secure session handling.
- Create database seed script with rich production-ready data.

#### **Phase 7: End-to-End Integration & Verification**
- Wire frontend services with backend endpoints.
- Test RFQ submission and verify in Admin Dashboard.
- Verify full responsiveness (mobile, tablet, desktop) and accessibility.
- Perform production build audits (`npm run build` on both frontend and backend).

---

### 8. Quality & Verification Standards

- **Strict TypeScript:** No `any` types; all API responses and component props must be fully typed.
- **Zero Console Errors:** Clean hydration, no layout shifts, responsive image sizing.
- **Security:** Sanitized inputs, CORS whitelist, parameter validation with Zod.
- **Maintainability:** Clear code comments, modular file layout, and documented environment variables.
