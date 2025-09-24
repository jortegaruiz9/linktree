import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 15 optimized formats
    formats: ['image/webp', 'image/avif'],
    // Mobile-first device sizes (Next.js 15 best practice)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Quality settings optimized for mobile (handled per image)
    minimumCacheTTL: 60, // Cache for 1 minute for better mobile performance
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Enable built-in loader for optimal performance
    loader: 'default',
    // Use remotePatterns (recommended over domains in Next.js 15)
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'backend-linktree-1.onrender.com',
        pathname: '/uploads/**',
      },
    ],
  },
  // Next.js 15 experimental features for better performance
  experimental: {
    optimizePackageImports: ['@/components/ui'],
    serverComponentsExternalPackages: ['sharp'],
  },
};

export default nextConfig;
