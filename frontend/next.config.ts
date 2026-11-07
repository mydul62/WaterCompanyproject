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
    ],
  },
  async redirects() {
    return [
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
