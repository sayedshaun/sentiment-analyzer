import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a standalone build so Next emits `.next/standalone/server.js`
  // which the Docker image expects to run in production.
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ignored: ['**/*'],
      };
    }
    return config;
  },
  // Turbopack is enabled by default in Next.js 16+. Provide an
  // explicit empty turbopack config to silence the runtime error
  // when a custom webpack configuration is present.
  turbopack: {},
};

export default nextConfig;
