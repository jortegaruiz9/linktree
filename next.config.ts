// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Formatos optimizados
    formats: ["image/avif", "image/webp"],
    // Breakpoints recomendados
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // ❗️No existe "qualities" a nivel global: la calidad se maneja por imagen (prop "quality" de <Image />)
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // "loader: 'default'" es el predeterminado; puedes omitirlo, pero lo dejo explícito
    loader: "default",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "backend-linktree-1.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@/components/ui"],
    serverComponentsExternalPackages: ["sharp"],
  },
};

export default nextConfig;

