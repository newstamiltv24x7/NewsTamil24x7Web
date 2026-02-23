import "@/styles/globals.css";
import ThemeContextProvider from "@/theme/ThemeContext";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdSense from "@/components/AdSense";
import NotificationSetup from "@/components/Notification";
import "react-multi-carousel/lib/styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SessionProvider } from "next-auth/react";
import ErrorBoundary from "@/components/ErrorBoundary";
import ClientErrorHandler from "@/components/ClientErrorHandler";
import Script from "next/script";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
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
