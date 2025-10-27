// components/NotificationSetup.js

import {
  addDeviceNotify,
  getDeviceId,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import { messaging } from "@/utils/firebaseConfig";
import { getToken } from "firebase/messaging";
import { useEffect, useState } from "react";

const NotificationSetup = () => {
  const [device, setDevice] = useState("");
  const [fcmToken, setFcmToken] = useState("");

  const AddDevice = async () => {
    try {
      const results = await getDeviceId();
      results && setDevice(results["device-tracker-id"]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const requestPermission = async () => {
      if (typeof window !== "undefined" && "Notification" in window) {
        try {
          const permission = await Notification.requestPermission();
          if (permission === "granted") {
            const token = await getToken(messaging, {
              // vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY, // Ensure you have this in your .env file
              vapidKey:
                "BPsjKQ_p9OFPObRS9fYePd_t9xE8BMWyJEcDE8lVslRlwUvvQc2PC0lKLNFq366g0FfiUKV3Yc4r9yrVVL4sRUU",
            });
            if (token) {
              AddDevice();
              setFcmToken(token);
              // You can send this token to your server to save it for sending notifications later
            } else {
              console.error("Failed to generate token.");
            }
          } else {
          }
        } catch (error) {
          console.error("Error requesting permission:", error);
        }
      }
    };

    requestPermission();
  }, []);

  const GetToken = async () => {
    try {
      const body = {
        c_fcm_device_id: device,
        c_fcm_device_type: "web",
        c_fcm_device_token: fcmToken,
      };

      const results = await addDeviceNotify(body);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      if (fcmToken !== "" && device !== "") {
        GetToken();
      }
    } catch (err) {
      console.log(err);
    }
  }, [fcmToken, device]);

  return null;
};

export default NotificationSetup;
