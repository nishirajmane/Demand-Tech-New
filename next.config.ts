import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  // Allow production builds to succeed even if there are ESLint issues
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
