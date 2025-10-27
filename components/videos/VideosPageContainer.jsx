import React from "react";
import VideosPage from "./VideosPage";
import HomepageLayout from "@/layouts/HomepageLayout";

function VideosPageContainer({
  menuData,
  trendingData,
  cardData,
  youtubeData,
  breakingData,
  quickControl,
  breakingControl,
}) {
  return (
    <HomepageLayout
      menuData={menuData}
      breakingData={breakingData}
      quickControl={quickControl}
      breakingControl={breakingControl}
    >
      <VideosPage
        trendingData={trendingData}
        cardData={cardData}
        youtubeData={youtubeData}
      />
    </HomepageLayout>
  );
}

export default VideosPageContainer;
