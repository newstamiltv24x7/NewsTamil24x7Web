import { getAllYoutubeVideos, getHomeJustBefore } from "@/commonComponents/WebApiFunction/ApiFunctions";
import { CryptoFetcher, getHours, shareCards } from "@/utils/libs";
import { Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import MobileCard from "@/commonComponents/MobileCard";
import ViewAllBtn from "@/commonComponents/ViewAllBtn";
import { useTheme } from "@/theme/ThemeContext";
import { FaRegEye } from "react-icons/fa6";
import { Box } from '@mui/material';
import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";

function MobileHomePage({ newsData, newsLoading,viewControl }) {
  const [liveData, setLiveData] = useState({});
  const [loading, setLoading] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
  const [newsId, setNewsId] = useState("");
  const handleSetId = (id) => {
    if (id === newsId) {
      setShareOpen(!shareOpen);
    } else {
      setNewsId(id);
      setShareOpen(true);
    }
  };

  const { mode } = useTheme();

  const GetYoutubeLiveVideos = async () => {
    try {
      const body = {
        n_page: 1,
        n_limit: 15,
        c_search_term: "",
        c_video_type: "live",
      };
      const results = await getAllYoutubeVideos(body);
      const resData = CryptoFetcher(results?.payloadJson);
      setLiveData(resData?.at(0)?.data?.at(0));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetYoutubeLiveVideos();
  }, []);
const [images, setImages] = useState([]);
const [youtube_link, setYoutube_link] = useState([]);
  const [current, setCurrent] = useState(0);
  const [justNowNews, setJustNowNews] = useState([]);
  const CryptoJS = require("crypto-js");
  const secretPassphrase = `${process.env.NEXT_PUBLIC_DECODER}`;
  
const GetJustNowCategory = async () => {
  try {
    const body = {
      n_page: 1,
      n_limit: 10,
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
      setJustNowNews(newsArray || []);
      const imgUrls = newsArray
        .map((item) => item.story_cover_image_url)
        .filter(Boolean);
      setImages(imgUrls);
      const youtubeUrls = newsArray
        .map((item) => item.youtube_embed_id)
        .filter(Boolean);
      setYoutube_link(youtubeUrls);
      setCurrent(0);
    };
    fetchImages();
  }, []);

  // NOTE: Do NOT early-return here based on `images` — that hides the entire
  // page until the async fetch resolves and causes a CLS > 1.0 on mobile.

  return (
    <>
    {/* Blinking Just Now card (mobile) */}
      {justNowNews?.length > 0 && (
        <Box sx={{ px: 2, my: 1 }}>
          <Link href={`/article/${justNowNews?.[0]?.story_desk_created_name || justNowNews?.[0]?._id || '#'}`}>
            <Box
              sx={{
                textDecoration: 'none',
                bgcolor: '#fb6002',
                color: '#fff',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                py: 1,
                justifyContent: 'center',
                cursor: 'pointer',
                '@keyframes blinker': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.25 },
                  '100%': { opacity: 1 },
                },
                animation: 'blinker 1.2s linear infinite',
              }}
            >
              <Typography fontWeight={700} fontSize={14}>
                {justNowNews?.[0]?.story_title_name || 'Just Now'}
              </Typography>
            </Box>
          </Link>
        </Box>
      )}
    <Box
  sx={{
    position: 'relative',
    width: '100vw',
    aspectRatio: '16/9',
    maxWidth: '100%',
  }}
>
  {loading ? (
    <Skeleton
      variant="rectangular"
      width="100%"
      height="100%"
      sx={{ position: 'absolute', inset: 0 }}
    />
  ) : (
    <iframe
      width="100%"
      height="100%"
      src={`${liveData?.c_url_web_link}?rel=0&amp;autoplay=1&mute=1`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
      }}
    />
  )}
</Box>
      
      
      {newsLoading ? (
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={320}
          sx={{ bgcolor: "#cbcbcb" }}
        />
      ) : (
        <Box mt={1}>
          <Box borderBottom={"1px solid #313131"}>
            

            <Box p={"6px 10px 6px 10px"}>
              <Typography
                fontFamily={"var(--anek-font)"}
                // className="textWrapperTwo"
                fontSize={15}
                lineHeight={1.5}
                component={"h2"}
                fontWeight={700}
                // height={64}
                mt={"2px"}
                overflow={"hidden"}
                sx={{ cursor: "pointer" }}
              >
                <Link
                  href={`/article/${newsData?.at(0)?.story_desk_created_name || newsData?.at(0)?._id || '#'}`}
                >
                  {newsData?.at(0)?.story_title_name}
                </Link>
              </Typography>
              <Typography
                fontFamily={"var(--anek-font)"}
                className="textWrapper"
                fontSize={13}
                lineHeight={1.5}
                component={"p"}
                fontWeight={400}
                pt={"10px"}
                sx={{ cursor: "pointer" }}
              >
                <Link
                  href={`/article/${newsData?.at(0)?.story_desk_created_name || newsData?.at(0)?._id || '#'}`}
                >
                  {newsData?.at(0)?.story_sub_title_name}
                </Link>
              </Typography>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                mt={1}
                flexWrap={"wrap"}
              >
                <Typography
                  fontFamily={"var(--anek-font)"}
                  fontSize={13}
                  lineHeight={1.3}
                  component={"span"}
                  fontWeight={"bold"}
                  sx={{
                    color: "#fb6002",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  width={"50%"}
                  // sx={{ color: "#fff" }}
                >
                  {newsData?.at(0)?.story_subject_name}
                </Typography>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={2}
                >
                  <Typography
                    fontFamily={"var(--anek-font)"}
                    className="textWrapper"
                    fontSize={13}
                    lineHeight={1.3}
                    component={"span"}
                    fontWeight={500}
                    sx={{ opacity: 0.5 }}
                  >
                    {getHours(newsData?.at(0)?.updatedAt)}
                  </Typography>
                  <Image 
                  fetchPriority="high" rel="preload"
                    src={mode === "dark" ? ShareIcon : DarkShareIcon}
                    alt="share"
                    width={20}
                    height={20}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSetId(newsData?.at(0)?._id)}
                  />
                </Box>
              </Box>
            </Box>
{/* <Link href={`/article/${newsData?.at(0)?.story_desk_created_name || newsData?.at(0)?._id || '#'}`}>
  
              <Box position={"relative"} sx={{ aspectRatio: "16/9", width: "100%" }}>
                 {viewControl === "yes" && 
                <Box
                  position={"absolute"}
                  bottom={10}
                  right={0}
                  bgcolor={"#000"}
                  p={0.5}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={1}
                  fontFamily={"var(--anek-font)"}
                  fontSize={16}
                  fontWeight={600}
                  color={"#fff"}
                >
                  <FaRegEye /> {newsData?.at(0)?.view_count}
                </Box>
            }
            <Image 
                fetchPriority="high" rel="preload"
                  src={newsData?.at(0)?.story_cover_image_url}
                  alt={newsData?.at(0)?.story_subject_name}
                  width={721}
                  height={405}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              </Box>
            </Link> */}
            {newsData?.at(0)?._id === newsId && shareOpen && (
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-evenly"}
                // my={1}
                // px={1}
                py={1}
                // mt={-1}
                // height={30}
                borderRadius={"0 0 4px 4px"}
                // position={"relative"}
                // top={0}
                bgcolor={"#e3e2e269"}
                sx={{
                  button: {
                    cursor: "pointer",
                    p: "0px 8px",
                    fontSize: { xs: 12, sm: 10, md: 12, lg: 14 },
                    fontFamily: "var(--oswald-font)",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                  },
                  "& svg": {
                    width: 20,
                    height: 20,
                    cursor: "pointer",
                  },
                  "& img": {
                    cursor: "pointer",
                  },
                }}
              >
                <Image 
                fetchPriority="high" rel="preload"
                  src={YoutubeNew}
                  alt="wp"
                  width={24}
                  height={24}
                  onClick={() => shareCards("yt")}
                />
                <Image 
                fetchPriority="high" rel="preload"
                  src={FacebookNew}
                  alt="wp"
                  width={24}
                  height={24}
                  onClick={() =>
                    shareCards("fb", newsData?.at(0).story_desk_created_name)
                  }
                />
                <Image 
                fetchPriority="high" rel="preload"
                  src={WhatsAppNew}
                  alt="wp"
                  width={24}
                  height={24}
                  onClick={() =>
                    shareCards(
                      "wp",
                      newsData?.at(0).story_desk_created_name,
                      "mobile"
                    )
                  }
                />
                <Image 
                fetchPriority="high" rel="preload"
                  src={TwitterNew}
                  alt="wp"
                  width={24}
                  height={24}
                  onClick={() =>
                    shareCards(
                      "x",
                      newsData?.at(0).story_desk_created_name,
                      newsData?.at(0).story_sub_title_name
                    )
                  }
                />
                <Image 
                fetchPriority="high" rel="preload"
                  src={InstagramNew}
                  alt="insta"
                  width={24}
                  height={24}
                  onClick={() => shareCards("insta")}
                />
                <Image 
                fetchPriority="high" rel="preload"
                  src={ThreadsNew}
                  alt="insta"
                  width={24}
                  height={24}
                  onClick={() => shareCards("td")}
                />
                <Image 
                fetchPriority="high" rel="preload"
                  src={LinkedinNew}
                  alt="insta"
                  width={24}
                  height={24}
                  onClick={() =>
                    shareCards("lk", newsData?.at(0).story_desk_created_name)
                  }
                />
                <Image 
                fetchPriority="high" rel="preload"
                  src={TelegramNew}
                  alt="insta"
                  width={24}
                  height={24}
                  onClick={() =>
                    shareCards(
                      "tele",
                      newsData?.at(0).story_desk_created_name,
                      newsData?.at(0).story_sub_title_name
                    )
                  }
                />
              </Box>
            )}
          </Box>
          <Box p={2} pt={1} pb={0}>
            {Array.isArray(newsData) &&
              newsData.slice(1, 4).map((list) => (
                <Box
                  key={list?._id}
                  borderBottom={"1px solid #313131"}
                  mb={1}
                  pt={0.1}
                >
                  <MobileCard
                    list={list}
                    mode={mode}
                    handleSetId={handleSetId}
                    newsId={newsId}
                    shareOpen={shareOpen}
                    viewControl={viewControl}
                  />
                </Box>
              ))}
          </Box>
        </Box>
      )}
      {!newsLoading && (
        <Box m={2}>
          <ViewAllBtn link={""} />
        </Box>
      )}

    </>
  );
}

export default MobileHomePage;
