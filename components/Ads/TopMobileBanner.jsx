import React from "react";
import Image from "next/image";

const BANNER = {
  id: "mobile-banner-970x250",
  src: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1773666738/970_x_250_copy_sjlklr.jpg",
  width: 320,
  height: 50,
  alt: "Mobile top banner",
};

function TopMobileBanner({ href = "#", ariaLabel = "Top mobile banner" }) {
  return (
    <div style={{ width: "100%" }} aria-label={ariaLabel}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", width: "100%", borderRadius: 0, overflow: "hidden", margin: 0, padding: 0 }}
      >
        <Image
          src={BANNER.src}
          alt={BANNER.alt}
          width={BANNER.width}
          height={BANNER.height}
          sizes="(max-width: 480px) 100vw, 320px"
          style={{ display: "block", width: "100%", height: "auto", margin: 0 }}
          loading="eager"
        />
      </a>
    </div>
  );
}

export default TopMobileBanner;
