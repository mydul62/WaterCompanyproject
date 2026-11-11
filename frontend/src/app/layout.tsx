import type { Metadata } from "next";
import SmoothScroll from "@/components/common/SmoothScroll";
import ScrollRevealProvider from "@/components/common/ScrollRevealProvider";
import LivePageHydrator from "@/components/cms/LivePageHydrator";
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bree+Serif&family=Sonsie+One&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased selection:bg-cyan-500 selection:text-white" style={{ fontFamily: "'Ubuntu', sans-serif" }}>
        <SmoothScroll>
          <ScrollRevealProvider>
            <LivePageHydrator />
            {children}
          </ScrollRevealProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
