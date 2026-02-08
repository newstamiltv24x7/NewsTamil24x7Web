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

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ThemeContextProvider>
      <SessionProvider session={session}>
        <ErrorBoundary>
          <ClientErrorHandler />
          <Provider store={store}>
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
