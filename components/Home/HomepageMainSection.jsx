import HomepageLayout from "@/layouts/HomepageLayout";
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { addMainNews } from "@/redux/reducer/homePageReducer";
import { useDispatch } from "react-redux";
import {
  getAllCardSection,
  getAllYoutubeVideos,
  getHomeLatest,
  getHomeTopSection,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import { CryptoFetcher } from "@/utils/libs";
import { addLiveVideo } from "@/redux/reducer/liveVideoReducer";
import AdUnit from "../Ads/AdUnit";
import ThirdCategory from "./ThirdCategory";

/**
 * LiveEventSlider is code-split with ssr:false so its ~80 kB bundle is
 * never on the critical render path → eliminates the long task that was
 * the primary driver of the 28 s TBT.
 *
 * The LCP image is rendered separately (below) as a plain next/image with
 * priority/fetchPriority/loading="eager" so it is discoverable in the
 * initial HTML without waiting for any JavaScript.
 */
const LiveEventSlider = dynamic(() => import("./LiveEventSlider"), {
  ssr: false,
  loading: () => null, // static LCP image below acts as the placeholder
});

// Dynamically import components with lazy loading.
// Each loading() stub reserves the component's approximate height so the
// browser never needs to reflow when the real component mounts → CLS = 0.
const BannerLeftSection = dynamic(() => import("./BannerLeftSection"), {
  loading: () => <Box sx={{ height: "700px", width: "100%" }} />,
});
const BannerRightSection = dynamic(() => import("./BannerRightSection"), {
  loading: () => <Box sx={{ height: "700px", width: "100%" }} />,
});
const FirstCategory = dynamic(() => import("./FirstCategory"), {
  loading: () => <Box sx={{ height: "500px", width: "100%" }} />,
});
const SecondaryCategory = dynamic(() => import("./SecondaryCategory"), {
  ssr: false,
  loading: () => <Box sx={{ height: "400px", width: "100%" }} />,
});
const MainAdSection = dynamic(() => import("./MainAdSection"), {
  loading: () => <Box sx={{ height: "100px", width: "100%" }} />,
});
// VideoSection = the "VideoGrid" — client-only with fixed height placeholder
const VideoSection = dynamic(() => import("./VideoSection"), {
  ssr: false,
  loading: () => <Box sx={{ height: "450px", width: "100%" }} />,
});
const ShortSection = dynamic(() => import("./ShortSection"), {
  ssr: false,
  loading: () => <Box sx={{ height: "350px", width: "100%" }} />,
});
const WebStories = dynamic(() => import("./WebStories"), {
  ssr: false,
  loading: () => <Box sx={{ height: "250px", width: "100%" }} />,
});
const AdditionalSection = dynamic(() => import("./AdditionalSection"), {
  ssr: false,
  loading: () => <Box sx={{ height: "500px", width: "100%" }} />,
});
const PhotoSection = dynamic(() => import("./PhotoSection"), {
  ssr: false,
  loading: () => <Box sx={{ height: "400px", width: "100%" }} />,
});
const CardsPage = dynamic(() => import("./CardsPage"), {
  ssr: false,
  loading: () => <Box sx={{ height: "350px", width: "100%" }} />,
});

function HomepageMainSection({
  menuData,
  photosData,
  webstoriesData,
  orderedMenu,
  breakingData,
  quickControl,
  breakingControl,
  viewControl,
  // Pre-fetched server-side; consumed by LiveEventSlider (client component)
  liveEventImages = [],
  liveEventLinks = [],
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

  return (
    <HomepageLayout
      menuData={menuData}
      breakingData={breakingData}
      quickControl={quickControl}
      breakingControl={breakingControl}
      viewControl={viewControl}
    >
      {/*
       * ── Breaking-news banner / LCP section ──────────────────────────────
       *
       * Layout:
       *   ┌─────────────────────────────────────────────────────────────┐
       *   │  Outer Box  (aspect-ratio: 16/9, max-height: 400px)         │
       *   │  ┌──────────────────────────┐  ┌──────────────────────────┐ │
       *   │  │  Static priority <Image> │  │  YouTube placeholder      │ │
       *   │  │  (z-index 0 — SSR LCP)   │  │  (z-index 0)              │ │
       *   │  └──────────────────────────┘  └──────────────────────────┘ │
       *   │  ┌─────────────────────────────────────────────────────────┐ │
       *   │  │  Dynamic <LiveEventSlider>  (z-index 1 — client only)   │ │
       *   │  └─────────────────────────────────────────────────────────┘ │
       *   └─────────────────────────────────────────────────────────────┘
       *
       * The static image is in the initial HTML → browser pre-fetches it
       * immediately → LCP fires as soon as the image arrives.
       * The dynamic slider loads later and overlays it; because both reference
       * the same URL the browser serves it from the in-memory cache — no
       * duplicate network request.
       *
       * The fixed aspect-ratio outer wrapper reserves exactly the right amount
       * of vertical space on every viewport width → CLS = 0.
       * ──────────────────────────────────────────────────────────────────── */}
      <Box
        mx={{ md: "inherit", lg: "auto" }}
        maxWidth={1440}
        sx={{
          position: "relative",
          width: "100%",
          /* aspect-ratio reserves the banner height before JS loads → 0 CLS */
          aspectRatio: "16/9",
          maxHeight: "400px",
          overflow: "hidden",
          mb: 3,
        }}
      >
        {/* ── Static SSR LCP image ──────────────────────────────────────
             Rendered in the initial server HTML so the browser starts
             downloading it immediately, without waiting for JS to run.
             priority / fetchPriority="high" / loading="eager" are all
             required for the browser to treat this as the LCP element.
             ────────────────────────────────────────────────────────── */}
        {liveEventImages[0] && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              zIndex: 0,
            }}
          >
            {/* Left panel: LCP image */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                position: "relative",
                border: "5px solid #ff6600",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Image
                src={liveEventImages[0]}
                alt="Breaking news — top story"
                fill
                priority
                fetchPriority="high"
                loading="eager"
                sizes="(max-width:600px) 100vw, (max-width:1200px) 50vw, 720px"
                style={{ objectFit: "cover" }}
              />
            </Box>
            {/* Right panel: placeholder while YouTube embed JS loads */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                border: "5px solid red",
                borderRadius: "10px",
                background: "#111",
              }}
            />
          </Box>
        )}

        {/* ── Interactive slider (client-only) ──────────────────────────
             Positioned absolutely so it overlays the static image above.
             Because ssr:false, this renders only on the client and its JS
             bundle is excluded from the main-thread critical path.
             ────────────────────────────────────────────────────────── */}
        <Box sx={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <LiveEventSlider images={liveEventImages} youtubeLinks={liveEventLinks} />
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
