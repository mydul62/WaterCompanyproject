import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xclusive Can Limited | Beyond Packaging, We Craft Solutions",
  description:
    "Bangladesh's premier manufacturer of custom-engineered tin cans, aerosol containers, and plastic packaging solutions since 1992. LEED Platinum certified manufacturing in Gazipur & Tongi.",
  keywords: [
    "Xclusive Can",
    "Q Pail",
    "Tin Cans Bangladesh",
    "Packaging Manufacturer",
    "Aerosol Cans",
    "Plastic Bottles PET HDPE",
    "LEED Platinum Factory",
    "Industrial Packaging Gazipur",
  ],
  authors: [{ name: "Xclusive Can Limited" }],
  openGraph: {
    title: "Xclusive Can Limited | Industrial Packaging Solutions",
    description: "Beyond packaging, we craft solutions. LEED Platinum Certified manufacturer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white text-slate-900 antialiased selection:bg-cyan-500 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
