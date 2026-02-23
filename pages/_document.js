import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google site Verification */}
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />

        {/* ── Font performance — preconnect then load all weights in one request ──
            Loading fonts via <link> instead of CSS @import avoids a render-blocking
            round-trip and lets the browser discover the resource earlier (LCP + FCP). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Combined stylesheet — single network request for all three font families.
            display=optional prevents invisible text during font load (CLS fix). */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Anek+Tamil:wght@100..800&family=New+Amsterdam&family=Oswald:wght@200..700&display=optional"
        />

        {/* GTM + GA scripts are intentionally NOT placed here.
            They are injected via next/script in pages/_app.js with
            strategy="afterInteractive" so they never block first paint. */}
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W4MVHNC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </body>
    </Html>
  );
}
