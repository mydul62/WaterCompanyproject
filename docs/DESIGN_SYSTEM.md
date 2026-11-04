# Design System: "Hard & Modern Industrial Precision"

## Brand Aesthetic Philosophy
A bold, modern, precision-engineered industrial digital design system for **Xclusive Can Limited**. The visual language draws inspiration from precision tooling, polished metal, cleanroom plastics, and sustainable green manufacturing.

---

## 1. Color Palette

### Brand Primaries
- **Obsidian Industrial Dark:** `#060D17` (Deep background surfaces, dark mode shells, high-contrast footers)
- **Cobalt Navy Core:** `#0A192F` (Card backgrounds, container sections, headers)
- **Industrial Precision Blue:** `#0066FF` (Primary actions, corporate accents, interactive elements)
- **Electric Cyan Glow:** `#00D2FF` (Highlight badges, focus rings, tech accents, hover illuminations)

### Eco & Sustainability Accents
- **LEED Platinum Emerald:** `#10B981` (Sustainability indicators, green building badges, eco highlights)
- **Emerald Deep:** `#047857` (Subtle eco borders, badge backgrounds)

### Neutral Surfaces & Typography
- **Cleanroom White:** `#FFFFFF` (Card surfaces, clean backgrounds)
- **Slate Light:** `#F8FAFC` (Section backgrounds, input fields)
- **Slate Border:** `#E2E8F0` / `rgba(255, 255, 255, 0.12)` (Technical gridlines, cards, dividers)
- **Muted Slate:** `#64748B` (Secondary descriptions, metadata, timestamps)
- **Deep Slate Text:** `#0F172A` (Headings, primary typography)

---

## 2. Typography Hierarchy

- **Primary Font:** Inter / Plus Jakarta Sans (Modern geometric sans-serif)
- **Headings:**
  - `h1`: 3rem - 4.5rem (48px - 72px), Bold / Extra Bold, Tracking `-0.03em`
  - `h2`: 2.25rem - 3rem (36px - 48px), Bold, Tracking `-0.02em`
  - `h3`: 1.5rem - 2rem (24px - 32px), SemiBold, Tracking `-0.01em`
  - `h4`: 1.25rem - 1.5rem (20px - 24px), SemiBold
- **Body:**
  - Large Body: 1.125rem (18px), Line Height 1.7
  - Regular Body: 1rem (16px), Line Height 1.6
  - Small / Metadata: 0.875rem (14px), Medium
- **Technical Specs / Numbers:**
  - Monospace font (`font-mono`) for capacities (e.g. `20 Liters`, `Ø 65mm`, `300 GSM`)

---

## 3. UI Component Tokens

### Buttons
- **Primary B2B:** Electric Cyan or Precision Blue solid button with dark text or white text, subtle glow hover effect (`hover:shadow-[0_0_20px_rgba(0,102,255,0.4)]`).
- **Secondary Technical:** Frosted glass or Slate border button with high contrast text.
- **Icon / Action:** Circular or squircle technical buttons with Lucide icons.

### Cards & Surfaces
- **Frosted Glass Cards:** `backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800`
- **Hover Micro-interaction:** `-translate-y-1 transition-all duration-300 shadow-lg shadow-slate-900/5`
- **Technical Spec Badges:** Pill-shaped badges with subtle background tint and high-contrast text (`bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300`).
