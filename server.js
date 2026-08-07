// Custom Next.js server for standalone mode
// Purpose: Properly serve static files (.next/static and public) in standalone builds.
// When output: "standalone" is used, Next.js does not include static files in the bundle,
// so a custom server must copy them from the built app and serve them.

const http = require("http");
const fs = require("fs");
const path = require("path");
const { parse } = require("url");
const next = require("next");

const port = parseInt(process.env.PORT || "3002", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// For standalone builds, ensure .next/static and public directories exist
// Copy them from the build output if running in production
const ensureStaticFiles = () => {
  if (!dev) {
    const publicPath = path.join(__dirname, "public");
    const staticPath = path.join(__dirname, ".next", "static");
    
    // Log warning if directories are missing (they should exist after build)
    if (!fs.existsSync(publicPath)) {
      console.warn(`⚠️  Warning: public directory not found at ${publicPath}`);
    }
    if (!fs.existsSync(staticPath)) {
      console.warn(`⚠️  Warning: .next/static directory not found at ${staticPath}`);
    }
  }
};

// Serve static files from public/ and .next/static/
const serveStatic = (res, filePath, pathname) => {
  try {
    const stats = fs.statSync(filePath);
    const mimeTypes = {
      ".js": "application/javascript",
      ".css": "text/css",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".woff": "font/woff",
      ".woff2": "font/woff2",
      ".ttf": "font/ttf",
      ".eot": "application/vnd.ms-fontobject",
      ".webp": "image/webp",
      ".map": "application/json",
      ".json": "application/json",
      ".html": "text/html",
    };
    
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";
    
    // Log successful static file serves in production for debugging
    if (!dev) {
      console.log(`[STATIC] ✓ Serving ${pathname} as ${contentType}`);
    }
    
    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": stats.size,
      // Cache static assets aggressively (1 year for hashed files)
      "Cache-Control": "public, max-age=31536000, immutable",
    });
    
    fs.createReadStream(filePath).pipe(res);
  } catch (err) {
    console.error(`[STATIC] ✗ Failed to serve ${pathname}: ${err.message}`);
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404 - Static File Not Found");
  }
};

app.prepare().then(() => {
  ensureStaticFiles();

  const server = http.createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    // Decode URI to handle URL-encoded characters (%20 for spaces, etc.)
    const pathname = decodeURIComponent(parsedUrl.pathname);

    // Serve files from .next/static/ (hashed assets: CSS, JS, images, fonts)
    if (pathname.startsWith("/_next/static/")) {
      const filePath = path.join(__dirname, ".next", pathname.slice(1)); // Remove leading /
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        return serveStatic(res, filePath, pathname);
      }
      // Log 404s for static files — may indicate build issues
      if (!dev) {
        console.error(`[STATIC] ✗ 404: ${pathname} not found at ${filePath}`);
      }
    }

    // Serve files from public/ directory (favicons, robots.txt, etc.)
    // Skip API and Next.js internal routes
    if (!pathname.startsWith("/api/") && !pathname.startsWith("/_next/") && !pathname.startsWith("/ta/")) {
      const publicFilePath = path.join(__dirname, "public", pathname);
      if (fs.existsSync(publicFilePath) && fs.statSync(publicFilePath).isFile()) {
        return serveStatic(res, publicFilePath, pathname);
      }
    }

    // Fall through to Next.js handler for dynamic routes, API, and locale-specific pages
    handle(req, res, parsedUrl);
  });

  // Suppress ECONNRESET / EPIPE — these fire when a client disconnects
  // before the server finishes responding (e.g. tab closed mid-upload).
  server.on("clientError", (err, socket) => {
    if (err.code === "ECONNRESET" || err.code === "EPIPE") {
      socket.destroy();
      return;
    }
    if (socket.writable) {
      socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
    }
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });

  // Graceful shutdown handlers
  const gracefulShutdown = (signal) => {
    console.log(`\nReceived ${signal}, initiating graceful shutdown...`);
    
    server.close(() => {
      console.log("HTTP server closed, exiting process");
      process.exit(0);
    });

    // Force exit after 5 seconds
    const shutdownTimeout = setTimeout(() => {
      console.error("Graceful shutdown timeout, forcing exit");
      process.exit(1);
    }, 5000);

    shutdownTimeout.unref();
  };

  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));

  process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
    process.exit(1);
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled rejection at:", promise, "reason:", reason);
    process.exit(1);
  });
});
