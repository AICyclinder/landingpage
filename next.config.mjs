/** @type {import('next').NextConfig} */
const nextConfig = {
  // Increase timeout for network operations
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Disable image optimization if not needed
  images: {
    unoptimized: true,
  },
  // Increase timeout for webpack
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig; 