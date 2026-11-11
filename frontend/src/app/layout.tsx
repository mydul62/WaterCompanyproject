import type { Metadata } from "next";
import SmoothScroll from "@/components/common/SmoothScroll";
import ScrollRevealProvider from "@/components/common/ScrollRevealProvider";
import LivePageHydrator from "@/components/cms/LivePageHydrator";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noor Plastic | Noor Plastic Industries — Plastic Manufacturing & Supply",
  description:
    "Noor Plastic Industries (Proprietor: Nurul Islam) — Plastic manufacturing, import, supply & pure drinking water packaging in Latifpur, Kaliakoir-1750, Gazipur, Bangladesh. Trade License #242501300583.",
  keywords: [
    "Noor Plastic",
    "Noor Plastic Industries",
    "Kaliakoir Gazipur",
    "Plastic Manufacturer Bangladesh",
    "Pure Drinking Water Packaging",
    "PET HDPE Containers",
    "Trade License 242501300583",
  ],
  authors: [{ name: "Noor Plastic Industries" }],
  openGraph: {
    title: "Noor Plastic | Noor Plastic Industries",
    description:
      "Plastic manufacturing, import, supply & pure drinking water packaging in Kaliakoir, Gazipur, Bangladesh.",
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
