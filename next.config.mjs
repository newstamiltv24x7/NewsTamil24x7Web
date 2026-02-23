/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    largePageDataBytes: 256 * 1024,
  },
  // swcMinify: true,
  i18n: {
    locales: ["en-US", "fr", "es"],
    defaultLocale: "en-US",
  },
  poweredByHeader: false,
  compress: true,
  transpilePackages: ["mui-one-time-password-input"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev-news-image.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dev-news-image.s3.ap-southeast-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "newsmalayalam.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "newsmalayalam.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "newstamil-tv.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "newstamil-tv.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
    ],
    // Serve WebP first, AVIF for supporting browsers — best compression+quality
    formats: ["image/webp", "image/avif"],
    loader: "default",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 86400, // Cache optimised images for 24 h
  },
  rewrites: () => [
    {
      source: "/:path*.(jpg|jpeg|png|webp|avif|ico|gif|svg)",
      destination: "/:path*",
    },
  ],
  webpack(config) {
    config.optimization.splitChunks = {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    };
    return config;
  },
};

export default nextConfig;
