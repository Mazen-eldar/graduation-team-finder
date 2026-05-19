import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'recharts'],
  },
}

export default nextConfig
