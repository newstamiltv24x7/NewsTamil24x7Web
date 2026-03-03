import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google site Verification */}
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />

        {/* ── Font performance ──────────────────────────────────────────
            1. preconnect to Google Fonts servers
            2. Preload the CSS as a high-priority fetch
            3. Load the stylesheet asynchronously via media="print" hack
               so it never blocks first paint (saves ~200 ms FCP).
            display=swap shows fallback text immediately (no FOIT).
           ─────────────────────────────────────────────────────────── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Anek+Tamil:wght@100..800&family=New+Amsterdam&family=Oswald:wght@200..700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Anek+Tamil:wght@100..800&family=New+Amsterdam&family=Oswald:wght@200..700&display=swap"
          media="print"
          onLoad="this.media='all'"
        />
        {/* Fallback for no-JS */}
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Anek+Tamil:wght@100..800&family=New+Amsterdam&family=Oswald:wght@200..700&display=swap"
          />
        </noscript>
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
