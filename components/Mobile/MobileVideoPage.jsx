import { getAllYoutubeVideos } from "@/commonComponents/WebApiFunction/ApiFunctions";
import MobilepageLayout from "@/layouts/MobilepageLayout";
import { converDayJsDate, CryptoFetcher, shareVideos } from "@/utils/libs";
import {
  Box,
  Button,
  Card,
  CardContent,
  ClickAwayListener,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import WhitePlay from "../../public/newsTamilIcons/icons/whitePlay.svg";
import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import { useTheme } from "@/theme/ThemeContext";
import MobileCard from "@/commonComponents/MobileCard";

function MobileVideoPage({ menuData, trendingData,breakingControl,viewControl,quickControl }) {
  const [liveData, setLiveData] = useState({});
  const [loading, setLoading] = useState(true);
  const [postedData, setPostedData] = useState({});
  const [shareOpen, setShareOpen] = React.useState(false);
  const [newsId, setNewsId] = React.useState("");
  const [path, setPath] = useState("");
  const { mode } = useTheme();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  // const Trending = trendingData?.at(0)?.data;

  const handleSetId = (id) => {
    if (id === newsId) {
      setShareOpen(!shareOpen);
    } else {
      setNewsId(id);
      setShareOpen(true);
    }
  };

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

  const GetYoutubePostedVideos = async () => {
    try {
      const body = {
        n_page: page,
        n_limit: 10,
        c_search_term: "",
        c_video_type: "posted",
        c_youtube_type: "video",
      };
      const results = await getAllYoutubeVideos(body);
      const resData = CryptoFetcher(results?.payloadJson);
      setCount(resData?.at(0)?.total_count?.at(0)?.count);
      if (page === 1) {
        setPostedData(resData?.at(0)?.data);
      } else {
        setPostedData((prevData) => [...prevData, ...resData?.at(0)?.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetYoutubeLiveVideos();
    GetYoutubePostedVideos();
    setPath(window.location.pathname?.split("/")?.at(-1));
  }, []);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page > 1) {
      GetYoutubePostedVideos();
    }
  }, [page]);

  return (
    <MobilepageLayout menuData={menuData} trendingData={trendingData} breakingControl={breakingControl} quickControl={quickControl}>
    <Box mt={breakingControl === "yes" ?  25 : quickControl === "no" ? 25 : 12}>
     
      {path === "live" && (
        <Box>
          {loading ? (
            <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
          ) : (
            <Box height={250}>
              <iframe
                width="100%"
                height="100%"
                src={`${liveData?.c_url_web_link}?rel=0&amp;autoplay=1&mute=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </Box>
          )}
        </Box>
      )}

      
        {path === "live" ? (
           <Box p={1} pb={1} pt={1.5}>
            <Box
           fontWeight={"bold"}
           bgcolor={"#ff992c"}
           borderRadius={"6px"}
           color={"#000"}
           fontFamily={"var(--anek-font)"}
           textTransform={"uppercase"}
           fontSize={18}
           alignItems={"center"}
           justifyItems={"center"}
           pt={1}
           pb={0.5}
           pl={1}
          >
            Related Videos
          </Box>
           </Box>

          
        ) : (
          <Box p={0.5} pb={1} pt={1.5}>
            <Box
            fontWeight={"bold"}
            bgcolor={"#ff992c"}
            borderRadius={"6px"}
            color={"#000"}
            fontFamily={"var(--anek-font)"}
            textTransform={"uppercase"}
            fontSize={18}
            alignItems={"center"}
            justifyItems={"center"}
            pt={1}
            pb={0.5}
            pl={1}
          >
            Videos 
          </Box>
          </Box>
          
        )}
  <Box p={1} mb={1} pt={0}>
  {Array.isArray(postedData) &&
          postedData?.map((list) => (
            <Grid item md={6} xs={12} sm={6} key={list?._id} >
              <Box mb={2}  border={"1px solid #666666"} borderRadius={"6px"}>
                <Card
                  sx={{
                    boxShadow: "none",
                    backgroundImage: "none",
                    position: "relative",
                  }}
                >
                  <Link href={list?.c_url_link} target="_blank">
                    <Image
                    fetchPriority="high" rel="preload"
                      src={list?.c_thumbanail_image}
                      height={420}
                      width={750}
                      loading="lazy"
                      sizes="100vw"
                      alt={list?.c_url_title}
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "contain",
                        borderRadius: "6px",
                        filter: "brightness(0.9)",
                      }}
                    />
                    <Image
                    fetchPriority="high" rel="preload"
                      src={WhitePlay}
                      alt="newstamil-button"
                      width={32}
                      height={56}
                      style={{
                        position: "absolute",
                        top: "37%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        cursor: "pointer",
                      }}
                    />
                  </Link>
                  <CardContent
                    sx={{
                      pt: 0,
                      px: 0,
                      pb: 0,
                      "&.MuiCardContent-root:last-child": {
                        paddingBottom: 1,
                      },
                    }}
                  >
                    <Typography
                      fontFamily={"var(--anek-font)"}
                      className="textWrapper"
                      fontSize={14}
                      lineHeight={1.5}
                      component={"p"}
                      fontWeight={550}
                      sx={{ cursor: "pointer" }}
                      height={62}
                      pl={1}
                    >
                      {list?.c_url_title}
                    </Typography>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      mt={1}
                      gap={1}
                      p={0}
                      position={"relative"}
                    >
                      <Typography
                        fontFamily={"var(--anek-font)"}
                        className="textWrapper"
                        fontSize={12}
                        lineHeight={1.3}
                        component={"span"}
                        fontWeight={300}
                        sx={{ whiteSpace: "nowrap" }}
                        pl={1}
                      >
                        {converDayJsDate(list?.createdAt)}
                      </Typography>
                      <Image
                      fetchPriority="high" rel="preload"
                        src={mode === "light" ? DarkShareIcon : ShareIcon}
                        alt="share"
                        width={17}
                        height={17}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSetId(list?._id)}
                      />
                      {list?._id === newsId && shareOpen && (
                        <ClickAwayListener
                          onClickAway={() => setShareOpen(false)}
                        >
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"flex-start"}
                            // flexDirection={"column"}
                            gap={1}
                            p={1}
                            // height={30}
                            borderRadius={"6px"}
                            position={"absolute"}
                            bottom={0}
                            right={20}
                            bgcolor={"#dedede"}
                            border={"1px solid #fff"}
                            boxShadow={"0px 0px 10px 0px rgba(0,0,0,0.75)"}
                            sx={{
                              "& img": {
                                cursor: "pointer",
                              },
                            }}
                          >
                            <Image
                            fetchPriority="high" rel="preload"
                              src={FacebookNew}
                              alt="fb"
                              width={24}
                              height={24}
                              onClick={() =>
                                shareVideos(
                                  "fb",
                                  list?.c_url_title,
                                  list?.c_url_link
                                )
                              }
                            />
                            <Image
                            fetchPriority="high" rel="preload"
                              src={WhatsAppNew}
                              alt="wp"
                              width={24}
                              height={24}
                              onClick={() =>
                                shareVideos(
                                  "wp",
                                  list?.c_url_title,
                                  list?.c_url_link,
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
                                shareVideos(
                                  "x",
                                  list?.c_url_link,
                                  list?.c_url_title
                                )
                              }
                            />
                            <Image
                            fetchPriority="high" rel="preload"
                              src={YoutubeNew}
                              alt="wp"
                              width={24}
                              height={24}
                              onClick={() => shareVideos("yt")}
                            />

                            <Image
                            fetchPriority="high" rel="preload"
                              src={TelegramNew}
                              alt="wp"
                              width={24}
                              height={24}
                              onClick={() =>
                                shareVideos(
                                  "tele",
                                  list?.c_url_link,
                                  list?.c_url_title
                                )
                              }
                            />
                            <Image
                            fetchPriority="high" rel="preload"
                              src={InstagramNew}
                              alt="wp"
                              width={24}
                              height={24}
                              onClick={() => shareVideos("insta")}
                            />
                            <Image
                            fetchPriority="high" rel="preload"
                              src={ThreadsNew}
                              alt="wp"
                              width={24}
                              height={24}
                              onClick={() => shareVideos("td")}
                            />
                            <Image
                            fetchPriority="high" rel="preload"
                              src={LinkedinNew}
                              alt="wp"
                              width={24}
                              height={24}
                              onClick={() =>
                                shareVideos(
                                  "lk",
                                  list?.c_url_title,
                                  list?.c_url_link
                                )
                              }
                            />
                          </Box>
                        </ClickAwayListener>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
  </Box>
  <Box p={1} pb={1} pt={1}>
  <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          bgcolor={mode === "dark" ? "#272626" : "#f1f1f1"}
        >
          <Button
            variant="outlined"
            sx={{
              border: "1px solid transparent",
              color: "#fb6307",
              fontWeight: "bold",
              "&:hover": {
                color: mode === "dark" ? "#fff" : "#000 !important",
                border: "1px solid transparent",
                bgcolor: "transparent",
              },
            }}
            onClick={handleLoadMore}
            disabled={postedData?.length >= count}
          >
            Read More
          </Button>
        </Box>                       
    </Box>
    <Box p={1} pb={1} pt={1}>
        <Box >
          <Typography
            borderLeft={"4px solid #fb6002"}
            p={1}
            mt={1}
            fontFamily={"var(--arial-font)"}
            fontWeight={700}
            textTransform={"uppercase"}
          >
            Trending News
          </Typography>
          {Array.isArray(trendingData) &&
            trendingData.slice(0, 15).map((list) => (
              <Box
                key={list?._id}
                borderBottom={"1px solid #313131"}
                mb={1}
                pt={0.1}
              >
                <MobileCard
                  list={list}
                  handleSetId={handleSetId}
                  newsId={newsId}
                  shareOpen={shareOpen}
                  mode={mode}
                  viewControl={viewControl}
                />
              </Box>
            ))}
        </Box>
        </Box>
      </Box>
    </MobilepageLayout>
  );
}

export default MobileVideoPage;
