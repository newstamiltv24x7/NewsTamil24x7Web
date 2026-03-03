import "@/styles/globals.css";
import ThemeContextProvider from "@/theme/ThemeContext";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import ErrorBoundary from "@/components/ErrorBoundary";
import ClientErrorHandler from "@/components/ClientErrorHandler";
import Script from "next/script";
import dynamic from "next/dynamic";
import { memo } from "react";

// ── Lazy-load non-critical components ──────────────────────────────────
// AdSense, NotificationSetup and ToastContainer are not part of the
// critical render path.  Loading them lazily removes their JS from the
// main bundle and prevents them from competing with LCP/FCP.
const AdSense = dynamic(() => import("@/components/AdSense"), { ssr: false });
const NotificationSetup = dynamic(() => import("@/components/Notification"), { ssr: false });
const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
);

// ── Carousel / Swiper CSS ──────────────────────────────────────────────
// Moved from global (blocking) imports to dynamic imports so these
// ~45 kB of CSS don't block first paint on pages that don't use them.
if (typeof window !== "undefined") {
  import("react-multi-carousel/lib/styles.css");
  import("swiper/css");
  import("swiper/css/navigation");
  import("swiper/css/pagination");
}

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ThemeContextProvider>
      <SessionProvider session={session}>
        <ErrorBoundary>
          <ClientErrorHandler />
          <Provider store={store}>
            {/* ── Google Analytics — afterInteractive: loads after page is interactive,
                never blocks first paint (FCP/LCP) ── */}
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-PRSM1C3X5Y"
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-PRSM1C3X5Y');
              `}
            </Script>
            {/* ── Google Tag Manager — afterInteractive ── */}
            <Script id="gtm-init" strategy="afterInteractive">
              {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-W4MVHNC');
              `}
            </Script>
            <AdSense />
            <NotificationSetup />
            <Component {...pageProps} />
          </Provider>
          <ToastContainer />
        </ErrorBoundary>
      </SessionProvider>
    </ThemeContextProvider>
  );
}

export default memo(App);
