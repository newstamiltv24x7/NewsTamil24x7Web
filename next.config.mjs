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
    // Prefer AVIF (30-50% smaller than WebP) when the browser supports it;
    // fall back to WebP for older browsers.
    formats: ["image/avif", "image/webp"],
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
  // ── HTTP response headers ────────────────────────────────────────────
  // Next.js already sets immutable Cache-Control on /_next/static/* in
  // production.  Add security headers and a generous cache for media.
  async headers() {
    return [
      {
        // All routes — security hardening
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Optimised images served by Next.js image optimizer
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
  webpack(config) {
    config.optimization.splitChunks = {
      chunks: "all",
      maxInitialRequests: 25,
      minSize: 20000,
      cacheGroups: {
        // ── Heavy libraries that should NOT be in the main bundle ──
        firebase: {
          test: /[\\/]node_modules[\\/](firebase|@firebase)[\\/]/,
          name: "firebase",
          // Firebase is always dynamically imported (lazy), so "async" keeps it
          // out of the initial JS bundles served on first page load.
          chunks: "async",
          priority: 40,
        },
        mui: {
          test: /[\\/]node_modules[\\/](@mui|@emotion)[\\/]/,
          name: "mui",
          chunks: "all",
          priority: 30,
        },
        swiper: {
          test: /[\\/]node_modules[\\/](swiper|react-multi-carousel|embla-carousel)[\\/]/,
          name: "swiper",
          // Swiper/embla/carousel are only used in dynamic-imported sections
          chunks: "async",
          priority: 20,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          priority: 10,
        },
      },
    };
    return config;
  },
};

export default nextConfig;
