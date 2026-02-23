// components/AdSense.js
import Script from "next/script";

const AdSense = () => {
  // Only load AdSense in production on the Live server.
  // strategy="lazyOnload" defers until the page is fully idle —
  // guarantees it never contributes to FCP / LCP / TBT.
  if (process.env.NEXT_PUBLIC_SERVER !== "Live") return null;

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6708033438621783"
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
};

export default AdSense;
