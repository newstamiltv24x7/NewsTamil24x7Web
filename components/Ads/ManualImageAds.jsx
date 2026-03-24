import React from "react";
import Image from "next/image";

const DESKTOP_ADS = [
  {
    id: "desktop-970x250",
    src: "https://res.cloudinary.com/dtwcgfmar/image/upload/f_auto,q_auto,w_970/v1773666738/970_x_250_copy_sjlklr.jpg",
    width: 970,
    height: 250,
    alt: "Desktop ad 970x250",
  },
];

const MOBILE_ADS = [
  {
    id: "mobile-320x480",
    src: "https://res.cloudinary.com/dtwcgfmar/image/upload/f_auto,q_auto,w_320/v1773666738/320_x_480_inaej5.jpg",
    width: 320,
    height: 480,
    alt: "Mobile ad 320x480",
  }
];

function ManualImageAds({ device = "desktop", title = "Sponsored" }) {
  const ads = device === "mobile" ? MOBILE_ADS : DESKTOP_ADS;

  return (
    <section style={{ width: "100%", margin: "16px 0" }} aria-label={title}>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          alignItems: "center",
          width: "100%",
        }}
      >
        {ads.map((ad) => (
          <a
            key={ad.id}
            href="https://admissions.vit.ac.in/bsc-hons-agri-2026-applications/login"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              width: "100%",
              maxWidth: `${ad.width}px`,
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 1px 6px rgba(0,0,0,0.12)",
              background: "#f5f5f5",
            }}
          >
            <Image
              src={ad.src}
              alt={ad.alt}
              width={ad.width}
              height={ad.height}
              sizes="(max-width: 768px) 100vw, 320px"
              style={{ display: "block", width: "100%", height: "auto" }}
              loading="lazy"
              onError={(event) => {
                const adCard = event?.target?.closest?.("a");
                if (adCard) adCard.style.display = "none";
              }}
            />
          </a>
        ))}
      </div>
    </section>
  );
}

export default ManualImageAds;