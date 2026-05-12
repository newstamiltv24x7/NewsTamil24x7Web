/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  // Tamil-only website — single locale prevents Next.js from generating
  // duplicate /fr/* and /es/* shadow routes that create duplicate-content issues.
  i18n: {
    locales: ["ta"],
    defaultLocale: "ta",
  },
  poweredByHeader: false,
  compress: true,
  transpilePackages: ["mui-one-time-password-input"],
  images: {
    // NOTE: "unoptimized: true" was removed — it was overriding the AVIF/WebP
    // formats, deviceSizes and minimumCacheTTL settings below, effectively
    // serving all images at full size with no transcoding (major LCP hit).
    // All external image hostnames are already listed in remotePatterns so the
    // built-in Next.js Image Optimization will work correctly.
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
      {
        protocol: "https",
        hostname: "**.r2.dev",
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
  output: "standalone",
  productionBrowserSourceMaps: false,

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
  experimental: {
    optimizePackageImports: [
      "@mui/material",
      "@mui/icons-material",
      "react-icons",
    ],
  },
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
          // Force HTTPS for 1 year; include sub-domains; allow preload registration
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
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
          chunks: "async",
          priority: 30,
        },
        swiper: {
          test: /[\\/]node_modules[\\/](swiper|react-multi-carousel|embla-carousel)[\\/]/,
          name: "swiper",
          // Swiper/embla/carousel are only used in dynamic-imported sections
          chunks: "async",
          priority: 20,
        },
        framer: {
          test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
          name: "framer",
          chunks: "async",
          priority: 25,
        },

        icons: {
          test: /[\\/]node_modules[\\/](react-icons)[\\/]/,
          name: "icons",
          chunks: "async",
          priority: 24,
        },

        lodash: {
          test: /[\\/]node_modules[\\/](lodash|lodash-es)[\\/]/,
          name: "lodash",
          chunks: "async",
          priority: 23,
        },
      },
    };
    return config;
  },
};

export default nextConfig;
