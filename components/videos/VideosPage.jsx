import HorizontalCard from "@/commonComponents/HorizontalCard";
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
import React, { useEffect, useState } from "react";
import {
  getAllCardSection,
  getAllYoutubeVideos,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import Link from "next/link";
import {
  converDayJsDate,
  CryptoFetcher,
  shareCardSection,
  shareVideos,
} from "@/utils/libs";
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import { useTheme } from "@/theme/ThemeContext";

import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";
import { FaFacebookSquare } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";

function VideosPage({ trendingData }) {
  // const NewsArr = trendingData?.at(0)?.data;
  const { mode } = useTheme();

  // --------------------------

  const [liveData, setLiveData] = useState({});
  const [postedData, setPostedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState("");
  const [cardData, setCardData] = useState([]);
  const [shareOpen, setShareOpen] = React.useState(false);
  const [newsId, setNewsId] = React.useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  // --------------------------

  const GetYoutubeLiveVideos = async () => {
    try {
      const body = {
        n_page: 1,
        n_limit: 3,
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
    GetAllCards();
    setPath(window.location.pathname?.split("/")?.at(-1));
  }, []);

  const handleSetId = (id) => {
    if (id === newsId) {
      setShareOpen(!shareOpen);
    } else {
      setNewsId(id);
      setShareOpen(true);
    }
  };

  const GetAllCards = async () => {
    try {
      const body = {
        n_page: 1,
        n_limit: 5,
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

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page > 1) {
      GetYoutubePostedVideos();
    }
  }, [page]);

  return (
    <Box maxWidth={1440} px={2} mx={"auto"} width={"100%"}>
      {path === "live" && (
        <Box height={510} mb={2} px={"10%"}>
          {loading ? (
            <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
          ) : (
            <iframe
              width="100%"
              height="100%"
              src={`${liveData?.c_url_web_link}?rel=0&amp;autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
        </Box>
      )}

      <Grid container spacing={2}>
        <Grid
          item
          md={3}
          xs={12}
          sm={12}
          display={{ xs: "none", sm: "none", md: "block" }}
        >
          <Box position={"sticky"} top={100}>
            <Typography
              component={"h5"}
              textTransform={"uppercase"}
              fontWeight={"bold"}
              borderLeft={"4px solid #fb6002"}
              mb={2}
              pl={"4px"}
            >
              Recent News
            </Typography>
            {Array.isArray(trendingData) &&
              trendingData?.slice(0, 8)?.map((list) => (
                <React.Fragment key={list._id}>
                  <HorizontalCard list={list} />
                  <Box display={"grid"} sx={{ placeItems: "center" }}>
                    <hr
                      style={{
                        width: "100%",
                        border: "0.5px solid #666666",
                        margin: "0px 0 6px 0",
                      }}
                    />
                  </Box>
                </React.Fragment>
              ))}
          </Box>
        </Grid>
        <Grid item md={6} xs={12} sm={12}>
          <Box>
            <Box mb={2}>
              {path !== "live" && (
                <Box>
                  <Box
                    fontWeight={"bold"}
                    bgcolor={"#ff992c"}
                    borderRadius={"6px"}
                    p={1}
                    mb={1}
                    color={"#000"}
                    fontFamily={"var(--anek-font)"}
                    textTransform={"uppercase"}
                    fontSize={18}
                  >
                    Videos
                  </Box>
                  <Box bgcolor={"#ededed"}>
                    <Box height={400} mb={2}>
                      {postedData?.length > 0 && (
                        <iframe
                          width="100%"
                          height="100%"
                          src={`${
                            postedData?.at(0)?.c_url_web_link
                          }?rel=0&amp;autoplay=1&mute=1`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      )}
                    </Box>
                    <Typography
                      fontFamily={"var(--anek-font)"}
                      className="textWrapper"
                      fontSize={18}
                      lineHeight={1.5}
                      component={"p"}
                      fontWeight={550}
                      mt={2}
                      p={2}
                      pt={0}
                    >
                      {postedData?.length > 0 && postedData?.at(0)?.c_url_title}
                    </Typography>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      gap={1}
                      position={"relative"}
                      p={1}
                      pt={0}
                    >
                      <Typography
                        fontFamily={"var(--anek-font)"}
                        className="textWrapper"
                        fontSize={12}
                        lineHeight={1.3}
                        component={"span"}
                        fontWeight={300}
                        pl={2}
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        {Array.isArray(postedData) &&
                          converDayJsDate(postedData?.at(0)?.createdAt)}
                      </Typography>
                      <Image
                      fetchPriority="high" rel="preload"
                        src={mode === "light" ? DarkShareIcon : ShareIcon}
                        alt="share"
                        width={17}
                        height={17}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSetId(postedData?.at(0)?._id)}
                      />
                      {Array.isArray(postedData) &&
                        postedData?.at(0)?._id === newsId &&
                        shareOpen && (
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
                                    postedData?.at(0)?.c_url_title,
                                    postedData?.at(0)?.c_url_link
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
                                    postedData?.at(0)?.c_url_title,
                                    postedData?.at(0)?.c_url_link
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
                                    postedData?.at(0)?.c_url_link,
                                    postedData?.at(0)?.c_url_title
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
                                    postedData?.at(0)?.c_url_title,
                                    postedData?.at(0)?.c_url_link
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
                                    postedData?.at(0)?.c_url_title,
                                    postedData?.at(0)?.c_url_link
                                  )
                                }
                              />
                            </Box>
                          </ClickAwayListener>
                        )}
                    </Box>
                  </Box>
                </Box>
              )}
              <Grid container spacing={1} mt={2}>
                {Array.isArray(postedData) &&
                  postedData?.slice(1, 6)?.map((list) => (
                    <Grid item md={6} xs={12} sm={6} key={list?._id}>
                      <Box
                        p={1}
                        border={"1px solid #666666"}
                        borderRadius={"6px"}
                      >
                        <Card
                          sx={{
                            boxShadow: "none",
                            backgroundImage: "none",
                          }}
                        >
                          <Link href={list?.c_url_link || '#'} target="_blank">
                            <Image
                            fetchPriority="high" rel="preload"
                              src={list?.c_thumbanail_image}
                              height={900}
                              width={1000}
                              alt={list?.c_url_title}
                              style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "contain",
                                borderRadius: "6px",
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
                            >
                              <Link href={list?.c_url_link || '#'} target="_blank">
                                {list?.c_url_title}
                              </Link>
                            </Typography>

                            <Box
                              display={"flex"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              mt={0.4}
                              gap={1}
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
                              >
                                {converDayJsDate(list?.createdAt)}
                              </Typography>
                              <Image
                              fetchPriority="high" rel="preload"
                                src={
                                  mode === "light" ? DarkShareIcon : ShareIcon
                                }
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
                                    boxShadow={
                                      "0px 0px 10px 0px rgba(0,0,0,0.75)"
                                    }
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
                                          list?.c_url_link
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
                                          list?.c_url_title,
                                          list?.c_url_link
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
              </Grid>
              {/* <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                my={1}
              >
                {!redirectYoutube && (
                  <Button
                    variant="outlined"
                    sx={{ border: "1px solid #fff", color: "inherit" }}
                    onClick={loadMoreVideos}
                  >
                    Read More
                  </Button>
                )}
                {redirectYoutube && (
                  <Link
                    href={`https://www.youtube.com/@NewsTamil24X7TV?sub_confirmation=1`}
                    target="_blank"
                  >
                    <Button
                      variant="outlined"
                      sx={{ border: "1px solid #fff", color: "inherit" }}
                    >
                      Visit our Youtube Channel
                    </Button>
                  </Link>
                )}
              </Box> */}
            </Box>
          </Box>
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
        </Grid>
        <Grid item md={3} xs={12} sm={12}>
          <Box position={"sticky"} top={100} mt={0}>
            {/* <Box border={"1px solid #666666"} p={2} borderRadius={"8px"}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                mb={1}
              >
                <Box
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  gap={1}
                >
                  <Image
                  fetchPriority="high" rel="preload" src={TV} alt="tv" width={30} height={30} />
                  <Typography
                    fontFamily={"var(--arial-font)"}
                    fontSize={18}
                    component={"p"}
                    textTransform={"uppercase"}
                    fontWeight={"bold"}
                  >
                    Also Watch
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={1}
                >
                  <div
                    className="custom-button-prev"
                    style={{ cursor: "pointer" }}
                  >
                    <Image
                    fetchPriority="high" rel="preload" src={LeftArrow} alt="left" width={24} height={24} />
                  </div>
                  <div
                    className="custom-button-next"
                    style={{ cursor: "pointer" }}
                  >
                    <Image
                    fetchPriority="high" rel="preload" src={RightArrow} alt="left" width={24} height={24} />
                  </div>
                </Box>
              </Box>

              <Swiper
                autoplay={true}
                loop={true}
                modules={[Autoplay, Navigation, Pagination]}
                slidesPerView={1.5}
                spaceBetween={20}
                navigation={{
                  prevEl: ".custom-button-prev",
                  nextEl: ".custom-button-next",
                }}
              >
                {Array.isArray(youtubeData) &&
                  youtubeData?.slice(0, 15)?.map((list) => (
                    <SwiperSlide key={list?._id}>
                      <Box>
                        <Link
                          href={`https://www.youtube.com/watch?v=${list?.id?.videoId}`}
                          target="_blank"
                        >
                          <Box position={"relative"}>
                            <Image
                            fetchPriority="high" rel="preload"
                              src={list?.snippet?.thumbnails?.high?.url}
                              alt={list?.snippet?.title}
                              width={100}
                              height={100}
                              style={{
                                width: "100%",
                                height: "160px",
                                borderRadius: "6px",
                                objectFit: "cover",
                              }}
                            />
                            <Image
                            fetchPriority="high" rel="preload"
                              src={PlayBtn}
                              alt="button"
                              width={32}
                              height={56}
                              style={{
                                cursor: "pointer",
                                position: "absolute",
                                left: 10,
                                bottom: 10,
                              }}
                            />
                          </Box>
                          <Typography
                            fontFamily={"var(--anek-font)"}
                            className="textWrapper"
                            fontSize={14}
                            lineHeight={1.3}
                            component={"p"}
                            fontWeight={550}
                            sx={{ wordBreak: "break-word" }}
                          >
                            {list?.snippet?.title}
                          </Typography>
                        </Link>
                      </Box>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </Box> */}

            <Box mt={0}>
              <Typography
                component={"h5"}
                textTransform={"uppercase"}
                fontWeight={"bold"}
                borderLeft={"4px solid #fb6002"}
                mb={2}
                pl={"4px"}
              >
                Cards
              </Typography>
              {cardData?.slice(0, 5)?.map((list) => (
                <Box
                  width={"auto"}
                  height={"fit-content"}
                  p={2}
                  border={"1px solid #cbcbcb"}
                  borderRadius={"8px"}
                  my={1}
                >
                  <Link
                    // href={
                    //   list?.c_cards_share_url !== ""
                    //     ? list?.c_cards_share_url
                    //     : ""
                    // }
                    href={list?.c_cards_share_url || '#'}
                    target={list?.c_cards_share_url !== "" ? "_blank" : ""}
                  >
                    <Image
                    fetchPriority="high" rel="preload"
                      src={list?.c_cards_img_url}
                      alt="newstamil-cards-image"
                      height={800}
                      width={1200}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "8px",
                      }}
                    />
                  </Link>
                  <Box
                    sx={{
                      "& button": {
                        fontSize: 12,
                        textTransform: "capitalize",
                        color: mode === "dark" ? "#fff" : "#000",
                        border: "1px solid #cbcbcb",
                      },
                    }}
                    mt={1}
                    display={"flex"}
                    justifyContent={"space-between"}
                    gap={1}
                  >
                    <Button
                      startIcon={<FaFacebookSquare />}
                      onClick={() =>
                        shareCardSection(
                          "fb",
                          list?.c_cards_title,
                          list?.c_cards_share_url
                        )
                      }
                    >
                      Share
                    </Button>
                    <Button
                      startIcon={<BsTwitterX />}
                      onClick={() =>
                        shareCardSection(
                          "x",
                          list?.c_cards_share_url,
                          list?.c_cards_title
                        )
                      }
                    >
                      Share
                    </Button>
                    <Button
                      startIcon={<FaWhatsapp />}
                      onClick={() =>
                        shareCardSection(
                          "wp",
                          list?.c_cards_title,
                          list?.c_cards_share_url
                        )
                      }
                    >
                      Share
                    </Button>
                    <Button
                      startIcon={<FaInstagram />}
                      onClick={() => shareCardSection("insta")}
                    >
                      Share
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default VideosPage;
