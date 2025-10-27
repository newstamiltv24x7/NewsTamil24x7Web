// components/AdUnit.js

import { useEffect } from "react";

const AdUnit = () => {
  useEffect(() => {
    // Push the ad request after the component mounts
    try {
      if (window && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-6708033438621783"
      data-ad-slot="6423242113"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default AdUnit;
