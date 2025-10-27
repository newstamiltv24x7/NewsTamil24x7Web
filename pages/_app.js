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

export default function App({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <Provider store={store}>
        <AdSense />
        <NotificationSetup />
        <Component {...pageProps} />
      </Provider>
      <ToastContainer />
    </ThemeContextProvider>
  );
}
