import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC3yzSg9dh73whBAR4KkkBFMFNt1tVCIng",
  authDomain: "newstamil24x7-86268.firebaseapp.com",
  projectId: "newstamil24x7-86268",
  storageBucket: "newstamil24x7-86268.appspot.com",
  messagingSenderId: "936063248193",
  appId: "1:936063248193:web:6633c632ef73c1e6f963c0"
};

let firebaseApp;
let messaging;

/**
 * Lazily initialise Firebase + Messaging only when first requested.
 * This prevents the ~200 kB Firebase SDK from executing at module-load
 * time (which was adding ~300 ms to TTI / TBT on every page).
 *
 * The old code also called Notification.requestPermission() at the
 * top-level — that is now handled exclusively by NotificationSetup.
 */
function getFirebaseMessaging() {
  if (messaging) return messaging;
  try {
    if (typeof window !== "undefined") {
      if (!firebaseApp) {
        firebaseApp = initializeApp(firebaseConfig);
      }
      messaging = getMessaging(firebaseApp);
    }
  } catch (err) {
    console.error("Firebase initialization error:", err);
  }
  return messaging;
}

export { getFirebaseMessaging as messaging, getToken, getFirebaseMessaging };
