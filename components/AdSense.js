// components/AdSense.js
import Script from "next/script";

const AdSense = () => {
  return (
    <>
      {typeof window !== "undefined" && process.env.NEXT_PUBLIC_SERVER  === "Live" && (
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6708033438621783"
          crossorigin="anonymous"
        ></Script>
      )}
    </>
  );
};

export default AdSense;
