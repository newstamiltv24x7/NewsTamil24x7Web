"use client";

import MobilepageLayout from "@/layouts/MobilepageLayout";
import React, { useEffect, useState } from "react";
import { addMainNews } from "@/redux/reducer/homePageReducer";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import {
  getHomeLatest,
  getHomeTopSection,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import { CryptoFetcher } from "@/utils/libs";
import MobileBottomCategory from "../Mobile/MobileBottomCategory";
const MobileHomeCategory = dynamic(() =>
  import("../Mobile/MobileHomeCategory")
);
const MobileCards = dynamic(() => import("../Mobile/MobileCards"));
const MobilePhotos = dynamic(() => import("../Mobile/MobilePhotos"));
const MobileShorts = dynamic(() => import("../Mobile/MobileShorts"));
const MobileVideos = dynamic(() => import("../Mobile/MobileVideos"));
const MobileHomePage = dynamic(() => import("../Mobile/MobileHomePage"));
const MobileWebStories = dynamic(() => import("../Mobile/MobileWebStories"));

function MobileView({
  menuData,
  orderedMenu,
  cardData,
  photosData,
  webstoriesData,
  viewControl,
  breakingControl,
  quickControl
}) {
  const dispatch = useDispatch();
  const [newsData, setNewsData] = useState(false);
  const [trendingData, setTrendingData] = useState(false);
  const [newsLoading, setNewsLoading] = useState(true);
  const [trendLoading, setTrendLoading] = useState(true);

  useEffect(() => {
    dispatch(addMainNews(orderedMenu));
    GetHomeTopNews();
    GetHomeTrendingNews();
  }, []);

  const GetHomeTopNews = async () => {
    try {
      const result = await getHomeTopSection({
        n_page: 1,
        n_limit: 6,
        main_category_id: "cf336f838e81",
      });
      const news = CryptoFetcher(result?.payloadJson) || [];
      setNewsData(news?.docs);
      setNewsLoading(false);
    } catch (err) {
      setNewsLoading(false);
      console.log(err);
    }
  };

  const GetHomeTrendingNews = async () => {
    try {
      const result = await getHomeLatest({
        n_page: 1,
        n_limit: 6,
        trending_news: 1,
      });
      const news = CryptoFetcher(result?.payloadJson) || [];
      setTrendingData(news?.docs);
      setTrendLoading(false);
    } catch (err) {
      console.log(err);
      setTrendLoading(false);
    }
  };

  return (
    <MobilepageLayout menuData={menuData} trendingData={trendingData} breakingControl={breakingControl} quickControl={quickControl}>
      <MobileHomePage
        newsData={!newsLoading ? newsData : []}
        newsLoading={newsLoading}
        viewControl={viewControl}
      />
      <MobileHomeCategory viewControl={viewControl} />
      <MobileWebStories webstoriesData={webstoriesData} />
      <MobileShorts />
      <MobileVideos />
      <MobileCards cardData={cardData} viewControl={viewControl} />
      <MobilePhotos photosData={photosData} />
      <MobileBottomCategory viewControl={viewControl} />
    </MobilepageLayout>
  );
}

export default MobileView;
