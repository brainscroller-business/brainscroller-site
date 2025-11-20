// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow builds to succeed even if ESLint finds problems
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Allow builds to succeed even if TypeScript finds errors
  typescript: {
    ignoreBuildErrors: true,
  },

  // You can add additional config options below if needed
};

export default nextConfig;
