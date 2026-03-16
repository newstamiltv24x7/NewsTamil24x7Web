import React from "react";

const DESKTOP_ADS = [
  {
    id: "desktop-970x250",
    src: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1773666738/970_x_250_copy_sjlklr.jpg",
    width: 970,
    height: 250,
    alt: "Desktop ad 970x250",
  },
];

const MOBILE_ADS = [
  {
    id: "mobile-320x480",
    src: "https://res.cloudinary.com/dtwcgfmar/image/upload/v1773666738/320_x_480_inaej5.jpg",
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
            <img
              src={ad.src}
              width={ad.width}
              height={ad.height}
              alt={ad.alt}
              loading="lazy"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
              }}
              onError={(event) => {
                const adCard = event.currentTarget.closest("a");
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