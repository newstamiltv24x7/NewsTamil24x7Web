"use client";

import { useEffect } from "react";

const ClientErrorHandler = () => {
  useEffect(() => {
    const onError = (event) => {
      // Log full event for debugging
      console.error("Global error event:", event.error || event.message || event);
    };

    const onRejection = (event) => {
      console.error("Unhandled promise rejection:", event.reason || event);
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
};

export default ClientErrorHandler;
