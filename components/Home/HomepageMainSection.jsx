import HomepageLayout from "@/layouts/HomepageLayout";
import { Box, Grid, IconButton } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { addMainNews } from "@/redux/reducer/homePageReducer";
import { useDispatch } from "react-redux";
import {
  getAllCardSection,
  getAllYoutubeVideos,
  getHomeJustBefore,
  getHomeLatest,
  getHomeTopSection,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import { CryptoFetcher } from "@/utils/libs";
import { addLiveVideo } from "@/redux/reducer/liveVideoReducer";
import AdUnit from "../Ads/AdUnit";
import ThirdCategory from "./ThirdCategory";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { BiBorderRadius } from "react-icons/bi";
import Link from "next/link";

// Dynamically import components with lazy loading
const BannerLeftSection = dynamic(() => import("./BannerLeftSection"));
const BannerRightSection = dynamic(() => import("./BannerRightSection"));
const FirstCategory = dynamic(() => import("./FirstCategory"));
const SecondaryCategory = dynamic(() => import("./SecondaryCategory"), {
  ssr: false,
});
const MainAdSection = dynamic(() => import("./MainAdSection"));
const VideoSection = dynamic(() => import("./VideoSection"), { ssr: false });
const ShortSection = dynamic(() => import("./ShortSection"), { ssr: false });
const WebStories = dynamic(() => import("./WebStories"), { ssr: false });
const AdditionalSection = dynamic(() => import("./AdditionalSection"), {
  ssr: false,
});
const PhotoSection = dynamic(() => import("./PhotoSection"), { ssr: false });
const CardsPage = dynamic(() => import("./CardsPage"), { ssr: false });

function HomepageMainSection({
  menuData,
  photosData,
  webstoriesData,
  orderedMenu,
  breakingData,
  quickControl,
  breakingControl,
  viewControl
}) {
  const dispatch = useDispatch();
  const [liveData, setLiveData] = useState({});
  const [postedData, setPostedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [postedLoading, setPostedLoading] = useState(true);
  const [shortsData, setShortsData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [newsData, setNewsData] = useState(false);
  const [trendingData, setTrendingData] = useState(false);
  const [newsLoading, setNewsLoading] = useState(true);
  const [trendLoading, setTrendLoading] = useState(true);

  // Refs for lazy-loaded components
  const videoSectionRef = useRef(null);
  const shortsSectionRef = useRef(null);

  useEffect(() => {
    dispatch(addMainNews(orderedMenu));
    GetHomeTopNews();
    GetYoutubeLiveVideos();
    GetYoutubePostedVideos();
    GetYoutubeShorts();
    GetAllCards();
    GetHomeTrendingNews();
  }, []);

  const GetHomeTopNews = async () => {
    try {
      setNewsLoading(true);
      const result = await getHomeTopSection({
        n_page: 1,
        n_limit: 14,
        main_category_id: "cf336f838e81",
      });
      const news = CryptoFetcher(result?.payloadJson) || [];
      setNewsData(news?.docs);
      setNewsLoading(false);
    } catch (err) {
      console.log(err);
      setNewsLoading(false);
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

  // IntersectionObserver for lazy loading sections
  useEffect(() => {
    const handleLazyLoad = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target.getAttribute("data-section");
          if (section === "video-section") {
            GetYoutubePostedVideos(); // Trigger video section data load
          }
          if (section === "shorts-section") {
            GetYoutubeShorts(); // Trigger shorts section data load
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleLazyLoad, {
      rootMargin: "0px",
      threshold: 0.1,
    });

    if (videoSectionRef.current) observer.observe(videoSectionRef.current);
    if (shortsSectionRef.current) observer.observe(shortsSectionRef.current);

    return () => {
      if (videoSectionRef.current) observer.unobserve(videoSectionRef.current);
      if (shortsSectionRef.current)
        observer.unobserve(shortsSectionRef.current);
    };
  }, []);

  const GetYoutubeLiveVideos = async () => {
    try {
      const body = {
        n_page: 1,
        n_limit: 5,
        c_search_term: "",
        c_video_type: "live",
      };
      const results = await getAllYoutubeVideos(body);
      const resData = CryptoFetcher(results?.payloadJson);
      setLiveData(resData?.at(0)?.data?.at(0));
      dispatch(addLiveVideo(resData?.at(0)?.data?.at(0)));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const GetAllCards = async () => {
    try {
      const body = {
        n_page: 1,
        n_limit: 4,
        c_search_term: "",
      };
      const results = await getAllCardSection(body);
      const resData = CryptoFetcher(results?.payloadJson);
      setCardData(resData?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const GetYoutubePostedVideos = async () => {
    try {
      const body = {
        n_page: 1,
        n_limit: 20,
        c_search_term: "",
        c_video_type: "posted",
        c_youtube_type: "video",
      };
      const results = await getAllYoutubeVideos(body);
      const resData = CryptoFetcher(results?.payloadJson);
      setPostedData(resData?.at(0)?.data);
      setPostedLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const GetYoutubeShorts = async () => {
    try {
      const body = {
        n_page: 1,
        n_limit: 15,
        c_search_term: "",
        c_video_type: "posted",
        c_youtube_type: "shorts",
      };
      const results = await getAllYoutubeVideos(body);
      const resData = CryptoFetcher(results?.payloadJson);
      setShortsData(resData?.at(0)?.data);
    } catch (err) {
      console.log(err);
    }
  };
  const [images, setImages] = useState([]);
  const [youtube_link, setYoutube_link] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const CryptoJS = require("crypto-js");
  const secretPassphrase = `${process.env.NEXT_PUBLIC_DECODER}`;
  
const GetJustNowCategory = async () => {
  try {
    const body = {
      n_page: 1,
      n_limit: 5,
      main_category_id: "4a4569143bf4",
    };
    const response = await getHomeJustBefore(body);
    if (response?.payloadJson?.length > 0) {
      const firstNews = CryptoJS.AES.decrypt(response?.payloadJson, secretPassphrase).toString(CryptoJS.enc.Utf8);
      const result = JSON.parse(firstNews);
      return result?.docs || [];
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

  useEffect(() => {
    const fetchImages = async () => {
      const newsArray = await GetJustNowCategory();
      // Assuming each news object has a "story_cover_image_url"
      const imgUrls = newsArray
        .map((item) => item.story_cover_image_url)
        .filter(Boolean); // Remove empty/undefined
      setImages(imgUrls);
      const youtubeUrls = newsArray
        .map((item) => item.youtube_embed_id)
        .filter(Boolean); // Remove empty/undefined
      setYoutube_link(youtubeUrls);
      setCurrent(0); // Reset to first image
    };
    fetchImages();
  }, []);

  const goPrev = () => setCurrent((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  const goNext = () => setCurrent((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  // Auto-slide to next image every 5s; pause while hovered
  useEffect(() => {
    if (!images || images.length <= 1) return;
    if (isHovered) return; // pause when hovered
    const id = setInterval(() => {
      setCurrent((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }, 5000);
    return () => clearInterval(id);
  }, [images, isHovered]);

  if (images.length === 0) return <div>Loading images...</div>;

return (
    <HomepageLayout
      menuData={menuData}
      breakingData={breakingData}
      quickControl={quickControl}
      breakingControl={breakingControl}
      viewControl={viewControl}
    >
      <Box mx={{ md: "inherit", lg: "auto" }} pb={3}
          style={{
            
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "400px",
        overflow: "hidden",
        gap:"10px",
      }} maxWidth={1440}>
         <Box onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ flex: 1, minWidth: 0, position: "relative", border: "5px solid #ff6600", borderRadius:"10px"}}>
        <Link href={youtube_link[current]}>
      <img
        src={images[current]}
        alt="Live event"
        style={{ width: "100%", height: "100%", borderRadius:"5px",transition: "none", transform: "scale(1)" }}
      />
        </Link>
      <Box
        style={{
          position: "absolute",
          right: 20,
          bottom: 10,
          display: "flex",
          gap: 8,
        }}
      >
        <IconButton
          onClick={goPrev}
          style={{ background: "rgba(255,255,255,0.6)" }}
          aria-label="previous"
        >
          <FaChevronLeft />
        </IconButton>
        <IconButton
          onClick={goNext}
          style={{ background: "rgba(255,255,255,0.6)" }}
          aria-label="next"
        >
          <FaChevronRight />
        </IconButton>
      </Box>
    </Box>
    {/* Right Side: YouTube Live Embed */}
      <Box style={{ flex: 1, minWidth: 0, position: "relative" }}>
  <div
    style={{
      position: "relative",
      borderRadius:"10px",
      width: "100%",
      height: "100%",
      paddingTop: "0",
      border: "5px solid red",
      overflow: "hidden",
    }}
  >
    {/* 🎥 YouTube iframe */}
    <iframe
  src="https://www.youtube.com/embed/gynWNinqmjw?autoplay=1&mute=1"
  title="🔴LIVE NEWS TODAY: இன்றைய முக்கிய செய்திகள் | Today Breaking News Tamil | NewsTamil 24X7"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "5px",
  }}
></iframe>


    {/* 🖼️ Image on bottom-left */}
    {/* <img
      src="https://cdn-icons-png.freepik.com/512/18429/18429788.png" // replace with your image path
      alt="Overlay logo"
      style={{
        position: "absolute",
        bottom: "0px", // distance from bottom
        left: "10px",   // distance from left
        width: "80px",  // adjust size
        height: "auto",
        zIndex: 5,      // ensures it appears above the iframe
        opacity: 0.9,   // optional: slight transparency
      }}
    /> */}
  </div>
</Box>

    </Box>
      <Box
        maxWidth={1440}
        width={"100%"}
        mx={{ md: "inherit", lg: "auto" }}
        px={2}
      >
        <Grid container spacing={2} maxHeight={"2000px"}>
          <Grid
            item
            md={9}
            xs={12}
            sm={12}
            className="border-class-big"
            position={"relative"}
          >
            <Box>
              <BannerLeftSection newsData={newsData} loading={newsLoading} viewControl={viewControl} />
            </Box>

             {/*<----------------------- FIRST CAEGORY SECTION START ----------------->*/}
            <FirstCategory viewControl ={viewControl}/>
             {/*<----------------------- FIRST CAEGORY SECTION END ----------------->*/}
          </Grid>



          <Grid item md={3} xs={12} sm={12}>
            <BannerRightSection
              trendingData={trendingData}
              liveData={liveData}
              loading={loading}
              trendLoading={trendLoading}
              viewControl={viewControl}
            />
            <Box mt={2}>
              <AdUnit />
            </Box>
          </Grid>



        </Grid>

        {/*<----------------------- COLUMN THREE/FOUR SECTION START ----------------->*/}
        <Box my={0}>
          <MainAdSection viewControl={viewControl} />
        </Box>
         {/*<----------------------- COLUMN THREE/FOUR SECTION END ----------------->*/}

        {/*<----------------------- VIDEOS SECTION START ----------------->*/}
        <Box my={4} ref={videoSectionRef} data-section="video-section">
          <VideoSection postedData={postedData} postedLoading={postedLoading} />
        </Box>
         {/*<----------------------- VIDEOS SECTION END ----------------->*/}

         {/*<----------------------- WEB STORIES SECTION START ----------------->*/}
        {Array.isArray(webstoriesData) && webstoriesData.length > 0 && (
          <Box my={1}>
            <WebStories webstoriesData={webstoriesData} />
          </Box>
        )}
        {/*<----------------------- WEB STORIES SECTION END ----------------->*/}

        {/*<----------------------- SORTS SECTION START ----------------->*/}
        <Box my={1} ref={shortsSectionRef} data-section="shorts-section">
          <ShortSection shortsData={shortsData} />
        </Box>
         {/*<----------------------- SORTS SECTION END ----------------->*/}


        {/*<----------------------- COLUMN FOUR SECTION START ----------------->*/}
        <Box my={1}>
          <SecondaryCategory viewControl={viewControl} />
        </Box>
        {/*<----------------------- COLUMN FOUR SECTION END ----------------->*/}

        {/*<----------------------- COLUMN TWO SECTION START ----------------->*/}
        <Box my={1}>
          <AdditionalSection viewControl={viewControl} />
        </Box>
        {/*<----------------------- COLUMN TWO SECTION END ----------------->*/}

        {/*<----------------------- CARDS SECTION START ----------------->*/}
        <Box my={1}>
          <CardsPage cardData={cardData} viewControl={viewControl} />
        </Box>
        {/*<----------------------- CARDS SECTION END ----------------->*/}

        {/*<----------------------- PHOTO SECTION START -----------------> */}
        <Box my={3}>
          <PhotoSection photosData={photosData} viewControl={viewControl} />
        </Box>
        {/*<----------------------- PHOTO SECTION END ----------------->*/}

        {/*<----------------------- COLUMN FOUR SECTION START ----------------->*/}
        <Box my={1}>
          <ThirdCategory viewControl={viewControl} />
        </Box>
        {/*<----------------------- COLUMN FOUR SECTION END ----------------->*/}


      </Box>
    </HomepageLayout>
  );
}

export default HomepageMainSection;
