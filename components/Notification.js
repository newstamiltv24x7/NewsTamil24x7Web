// components/NotificationSetup.js

import {
  addDeviceNotify,
  getDeviceId,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import { useEffect, useState, useCallback } from "react";

/**
 * Notification setup is deferred to idle time so it never competes
 * with LCP/FCP rendering or hydration.  Firebase is imported lazily
 * (dynamic import) so its ~200 kB bundle isn't in the critical path.
 */
const NotificationSetup = () => {
  const [device, setDevice] = useState("");
  const [fcmToken, setFcmToken] = useState("");

  const AddDevice = useCallback(async () => {
    try {
      const results = await getDeviceId();
      results && setDevice(results["device-tracker-id"]);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    // Defer notification setup to idle time so it never blocks interaction
    const schedule = typeof requestIdleCallback !== "undefined"
      ? requestIdleCallback
      : (cb) => setTimeout(cb, 3000);

    const idleId = schedule(async () => {
      if (typeof window === "undefined" || !("Notification" in window)) return;
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          // Lazy-import Firebase only when actually needed
          const { getFirebaseMessaging, getToken } = await import("@/utils/firebaseConfig");
          const messagingInstance = getFirebaseMessaging();
          if (!messagingInstance) return;
          const token = await getToken(messagingInstance, {
            vapidKey:
              "BPsjKQ_p9OFPObRS9fYePd_t9xE8BMWyJEcDE8lVslRlwUvvQc2PC0lKLNFq366g0FfiUKV3Yc4r9yrVVL4sRUU",
          });
          if (token) {
            AddDevice();
            setFcmToken(token);
          }
        }
      } catch (error) {
        console.error("Error requesting permission:", error);
      }
    });

    return () => {
      if (typeof cancelIdleCallback !== "undefined") cancelIdleCallback(idleId);
    };
  }, [AddDevice]);

  const GetToken = useCallback(async () => {
    try {
      const body = {
        c_fcm_device_id: device,
        c_fcm_device_type: "web",
        c_fcm_device_token: fcmToken,
      };
      await addDeviceNotify(body);
    } catch (err) {
      console.log(err);
    }
  }, [device, fcmToken]);

  useEffect(() => {
    if (fcmToken !== "" && device !== "") {
      GetToken();
    }
  }, [fcmToken, device, GetToken]);

  return null;
};

export default NotificationSetup;
