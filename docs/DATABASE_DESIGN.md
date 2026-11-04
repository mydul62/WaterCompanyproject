# Database Design: Xclusive Can Limited

## Technology
- **Engine:** PostgreSQL
- **ORM:** Prisma ORM

## Relational Data Model (Draft Schema)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(ADMIN)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  SUPER_ADMIN
  ADMIN
  SALES_MANAGER
}

model Category {
  id          String    @id @default(uuid())
  name        String    @unique
  slug        String    @unique
  description String?
  icon        String?
  material    MaterialType
  products    Product[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

enum MaterialType {
  TINPLATE
  PET_PLASTIC
  HDPE_PLASTIC
  PP_PLASTIC
  ALUMINUM
  CLOSURE_METAL_PLASTIC
}

model Product {
  id             String       @id @default(uuid())
  name           String
  slug           String       @unique
  sku            String?      @unique
  description    String
  categoryId     String
  category       Category     @relation(fields: [categoryId], references: [id])
  material       MaterialType
  capacityMin    Float?       // in ml or Liters
  capacityMax    Float?
  unit           String       @default("ml") // ml, L, kg, oz
  neckSize       String?      // e.g. "38mm", "Bericap 48"
  height         Float?       // in mm
  diameter       Float?       // in mm
  weight         Float?       // in grams
  barrierType    String?      // e.g. "Triple-layer", "Epoxy-Phenolic Lacquer"
  features       String[]     // Food-grade, Tamper-evident, UN-Certified
  imageUrl       String
  galleryUrls    String[]
  cadDrawingUrl  String?
  tdsPdfUrl      String?      // Technical Data Sheet
  isFeatured     Boolean      @default(false)
  isActive       Boolean      @default(true)
  quoteRequests  QuoteItem[]
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
}

model QuoteRequest {
  id              String      @id @default(uuid())
  quoteNumber     String      @unique // e.g. RFQ-2026-0001
  companyName     String
  contactPerson   String
  email           String
  phone           String
  industry        String      // Food, Paint, Pharma, Chemical, etc.
  estimatedVolume Int         // e.g. 50,000 units
  targetDelivery  DateTime?
  customPrinting  Boolean     @default(false)
  artworkUrl      String?
  notes           String?
  status          QuoteStatus @default(PENDING)
  items           QuoteItem[]
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

model QuoteItem {
  id             String       @id @default(uuid())
  quoteRequestId String
  quoteRequest   QuoteRequest @relation(fields: [quoteRequestId], references: [id], onDelete: Cascade)
  productId      String?
  product        Product?     @relation(fields: [productId], references: [id])
  customSpecs    String?
  quantity       Int
}

enum QuoteStatus {
  PENDING
  REVIEWING
  QUOTED
  SAMPLE_DISPATCHED
  CLOSED_WON
  REJECTED
}

model PressStory {
  id             String   @id @default(uuid())
  title          String
  slug           String   @unique
  publisher      String   // The Daily Star, Prothom Alo, Bonik Barta, etc.
  publishDate    DateTime
  clippingUrl    String   // Scan or photo
  summary        String
  fullArticle    String?
  featured       Boolean  @default(false)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model Inquiry {
  id          String   @id @default(uuid())
  name        String
  email       String
  phone       String?
  subject     String
  message     String
  isRead      Boolean  @default(false)
  createdAt   DateTime @default(now())
}

model CareerApplication {
  id             String   @id @default(uuid())
  fullName       String
  email          String
  phone          String
  position       String
  experienceYrs  Int
  resumeUrl      String
  coverLetter    String?
  status         String   @default("SUBMITTED")
  createdAt      DateTime @default(now())
}
```

