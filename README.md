# XCLUSIVE CAN LIMITED (waterWeb)

> **Tagline:** Beyond Packaging, We Craft Solutions  
> **Brand Mission:** Bangladesh's premier manufacturer of custom-engineered tin cans, aerosol containers, and plastic packaging solutions with LEED Platinum manufacturing facilities in Gazipur and Tongi.

---

## 🛠️ Architecture & Technology Stack

- **Frontend:** Next.js (App Router), React 19, TypeScript, Tailwind CSS (v4), Lucide React, Radix UI / shadcn/ui.
- **Backend:** Node.js, Express.js, TypeScript, RESTful API architecture, Zod validation.
- **Database:** PostgreSQL with Prisma ORM.
- **Design Tokens:** Deep Obsidian (`#060D17`), Cobalt Navy (`#0A192F`), Industrial Blue (`#0066FF`), Electric Cyan (`#00D2FF`), LEED Emerald (`#10B981`).

---

## 📁 Repository Structure

```text
waterWeb/
├── frontend/          # Next.js App Router customer storefront & sidebar admin dashboard
├── backend/           # Express + TypeScript REST API with Prisma ORM
├── docs/              # Architecture, implementation plan, design tokens, and decisions
│   ├── PROJECT_OVERVIEW.md
│   ├── IMPLEMENTATION_PLAN.md
│   ├── DESIGN_SYSTEM.md
│   └── DATABASE_DESIGN.md
├── Infoimages/        # 13 verified client reference screenshots
├── .gitignore
├── instruction.md     # Master Super Prompt & Project Blueprint
└── README.md
```

---

## 🚀 Getting Started

### 1. Frontend Development
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the public storefront and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin dashboard.

### 2. Backend Development
```bash
cd backend
npm install
npm run dev
```
API runs on [http://localhost:5000](http://localhost:5000).
