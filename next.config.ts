import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "cdn1-production-images-kly.akamaized.net",
      },
    ],
    // Bypass Image Optimizer saat mode development agar tidak terblokir IP NAT64/IPv6 (USB Tethering)
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;