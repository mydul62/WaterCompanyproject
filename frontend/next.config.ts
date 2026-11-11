import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "api.xclusivecanltd.com",
      },
      {
        protocol: "https",
        hostname: "www.xclusivecanltd.com",
      },
    ],
  },
  async rewrites() {
    const apiBase = (
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"
    ).replace(/\/api\/v1\/?$/, "");
    return [
      {
        source: "/uploads/:path*",
        destination: `${apiBase}/uploads/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/q-pail",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/find-our-product",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/achievements",
        destination: "/certificates",
        permanent: true,
      },
      {
        source: "/career",
        destination: "/careers",
        permanent: true,
      },
      {
        source: "/brands",
        destination: "/brands-we-work-with",
        permanent: true,
      },
      {
        source: "/clients",
        destination: "/brands-we-work-with",
        permanent: true,
      },
    ];
  },
  experimental: {
    cpus: 1,
  },
};

export default nextConfig;
