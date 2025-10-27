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

const firebaseApp = initializeApp(firebaseConfig);

let messaging;

try {
  if (typeof window !== "undefined") {
    messaging = getMessaging(firebaseApp);

    // Request permission to send notifications
    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          // Get the token
          return getToken(messaging, {
            vapidKey:
              "BPsjKQ_p9OFPObRS9fYePd_t9xE8BMWyJEcDE8lVslRlwUvvQc2PC0lKLNFq366g0FfiUKV3Yc4r9yrVVL4sRUU",
          }); // Replace with your VAPID key
        } else {
          console.error("Unable to get permission to notify.");
        }
      })
      .then((token) => {
        if (token) {
          // Send the token to your server or use it as needed
        }
      })
      .catch((error) => {
        console.error("Error getting token:", error);
      });
  }
} catch (err) {
  console.error("Firebase initialization error:", err);
}

export { messaging, getToken };
