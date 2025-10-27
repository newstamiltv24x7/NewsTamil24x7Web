"use client";

import {
  AppBar,
  Box,
  Button,
  ClickAwayListener,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Logo from "../public/newsTamilIcons/icons/main-logo.png";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { getHomeTopSection } from "@/commonComponents/WebApiFunction/ApiFunctions";
import { converDayJsDate, CryptoFetcher, shareCards } from "@/utils/libs";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import ShortNewsIcon from "../public/newsTamilIcons/icon-pack/image_latest_sn.png";
import ShareIcon from "../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../public/newsTamilIcons/icons/dark-share.svg";

import FacebookNew from "../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../public/newsTamilIcons/icon-pack/Frame 4.svg";
import { useTheme } from "@/theme/ThemeContext";
import { FiChevronsUp } from "react-icons/fi";
import { Navigation } from "swiper/modules";

function NewsPresso() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { mode } = useTheme();

  const GetNews = async () => {
    try {
      const trendingResponse = await getHomeTopSection({
        n_page: 1,
        n_limit: 30,
        main_category_id: "cf336f838e81",
      });
      const decryptedTrend = CryptoFetcher(trendingResponse?.payloadJson);
      setNewsData(decryptedTrend?.docs);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    GetNews();
  }, []);

  const [shareOpen, setShareOpen] = React.useState(false);
  const [newsId, setNewsId] = React.useState("");

  const handleSetId = (id) => {
    if (id === newsId) {
      setShareOpen(!shareOpen);
    } else {
      setNewsId(id);
      setShareOpen(true);
    }
  };

  return (
    <Box bgcolor={"#eff3f6"} minHeight={"90vh"}>
      <AppBar
        sx={{
          pb: 0,
          bgcolor: "#121212",
          backgroundImage: "none",
          py: 1,
        }}
      >
        <Box maxWidth={1440} px={2} mx={"auto"} width={"100%"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Link
                href={"/"}
                style={{
                  display: "grid",
                  placeItems: "start",
                  marginInline: "auto",
                }}
              >
                <Image
                fetchPriority="high" 
                rel="preload"
                  src={Logo}
                  alt="newstamil-logo"
                  width={225}
                  height={75}
                  style={{ marginLeft: -60 }}
                />
              </Link>
            </Box>
            <Box>
              <Link href={"/short-news"}>
                <Image
                fetchPriority="high" 
                rel="preload"
                  src={ShortNewsIcon}
                  alt="shorts-news"
                  width={180}
                  height={"auto"}
                  style={{
                    objectFit: "contain",
                    height: "100%",
                    position: "relative",
                    top: 5,
                    left: 0,
                    width:"100%",
                    height:"60px"
                  }}
                />
              </Link>
            </Box>
          </Box>
        </Box>
      </AppBar>
      <Box
        maxWidth={1440}
        px={2}
        mx={"auto"}
        width={"100%"}
        mt={6}
        py={3}
        position={"relative"}
      >
        {loading ? (
          <Box display={"grid"} sx={{ placeItems: "center" }}>
            <Skeleton variant="rectangular" width={500} height={560} />
          </Box>
        ) : (
          <Box>
            <Swiper
              direction="vertical"
              centeredSlides={true}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              modules={[Navigation]}
              slidesPerView={1}
              style={{ height: "640px", position: "relative" }}
            >
              {Array.isArray(newsData) &&
                newsData.map((list, index) => (
                  <SwiperSlide
                    key={index}
                    style={{ display: "grid", placeItems: "center" }}
                  >
                    <Box
                      bgcolor={"#fff"}
                      borderRadius={"6px"}
                      border={"0.1px solid #cbcbcb"}
                    >
                      <Box position={"relative"}>
                        <Box width={420} overflow={"hidden"}>
                          <Image
                          fetchPriority="high" 
                          rel="preload"
                            src={list?.story_cover_image_url}
                            alt="newstamil-cover-image"
                            width={1200}
                            height={800}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "0",
                            }}
                          />
                        </Box>
                        <Typography
                          fontFamily={"var(--anek-font)"}
                          fontSize={16}
                          lineHeight={1.5}
                          component="p"
                          fontWeight={600}
                          className="textWrapper"
                          color={"#fff"}
                          my={1}
                          sx={{
                            position: "absolute",
                            bottom: -15,
                            bgcolor: "#fb6002",
                            left: 5,
                            p: 1,
                            borderRadius: "8px",
                            zIndex: 12,
                          }}
                        >
                          {list?.story_subject_name}
                        </Typography>
                      </Box>
                      <Box width={400} px={1}>
                        <Box textAlign={"right"}>
                          <Typography
                            fontFamily={"var(--anek-font)"}
                            fontSize={16}
                            lineHeight={1.5}
                            component="p"
                            fontWeight={400}
                            position={"relative"}
                            top={6}
                            color={"#000"}
                          >
                            {converDayJsDate(list?.createdAt)}
                          </Typography>
                        </Box>
                        <Typography
                          fontFamily={"var(--anek-font)"}
                          fontSize={18}
                          lineHeight={1.5}
                          component="h1"
                          fontWeight={700}
                          color={"#000"}
                          my={1}
                          pt={2}
                          className="textWrapper"
                        >
                          {list?.story_title_name}
                        </Typography>
                        <Box height={160}>
                          <Typography
                            fontFamily={"var(--anek-font)"}
                            fontSize={16}
                            lineHeight={1.5}
                            component="p"
                            fontWeight={500}
                            color={"#000"}
                            my={1}
                            className="textWrapperSix"
                          >
                            {list?.story_sub_title_name}
                          </Typography>
                        </Box>
                        <Box textAlign={"center"}>
                          <Link
                            href={`/article/${list?.story_desk_created_name}`}
                          >
                            <Button
                              sx={{
                                bgcolor: "#fb6002",
                                color: "#fff",
                                fontFamily: "var(--anek-font)",
                                ml: 2,
                                "&:hover": {
                                  color: "#fff",
                                  bgcolor: "#fb6002",
                                },
                              }}
                            >
                              Read More
                            </Button>
                          </Link>
                        </Box>
                        <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          position={"relative"}
                        >
                          <Typography
                            fontFamily={"var(--anek-font)"}
                            fontSize={16}
                            lineHeight={1.5}
                            component="p"
                            fontWeight={500}
                            my={1}
                            className="textWrapper"
                            color={"#000"}
                          >
                            {index + 1} / 30
                          </Typography>
                          <Box display={"grid"} sx={{ placeItems: "center" }}>
                            <FiChevronsUp className="shake-vertical" color="#000" />
                            <Typography
                              fontFamily={"var(--anek-font)"}
                              fontSize={16}
                              lineHeight={1.5}
                              component="p"
                              fontWeight={500}
                              my={1}
                              className="textWrapperSix"
                              color={"#000"}
                            >
                              Swipe Up
                            </Typography>
                          </Box>
                          <Image
                          fetchPriority="high" 
                          rel="preload"
                            src={DarkShareIcon}
                            alt="share-icon"
                            width={22}
                            height={22}
                            onClick={() => handleSetId(list?._id)}
                            style={{ cursor: "pointer" }}
                          />
                          {list?._id === newsId && shareOpen && (
                            <ClickAwayListener
                              onClickAway={() => setShareOpen(false)}
                            >
                              <Box
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"flex-start"}
                                flexDirection={"column"}
                                gap={2}
                                p={1}
                                // height={30}
                                borderRadius={"6px"}
                                position={"absolute"}
                                bottom={35}
                                right={10}
                                bgcolor={"#dedede"}
                                border={"1px solid #fff"}
                                boxShadow={"0px 0px 10px 0px rgba(0,0,0,0.75)"}
                                sx={{
                                  "& img": {
                                    cursor: "pointer",
                                  },
                                }}
                              >
                                <Box display={"flex"} gap={1}>
                                  <Image
                                  fetchPriority="high" 
                                  rel="preload"
                                    src={FacebookNew}
                                    alt="fb"
                                    width={24}
                                    height={24}
                                    onClick={() =>
                                      shareCards(
                                        "fb",
                                        list?.story_desk_created_name
                                      )
                                    }
                                  />
                                  <Image
                                  fetchPriority="high" 
                                  rel="preload"
                                    src={WhatsAppNew}
                                    alt="wp"
                                    width={24}
                                    height={24}
                                    onClick={() =>
                                      shareCards(
                                        "wp",
                                        list?.story_desk_created_name
                                      )
                                    }
                                  />
                                  <Image
                                  fetchPriority="high" 
                                  rel="preload"
                                    src={TwitterNew}
                                    alt="wp"
                                    width={24}
                                    height={24}
                                    onClick={() =>
                                      shareCards(
                                        "x",
                                        list?.story_desk_created_name,
                                        list?.story_title_name
                                      )
                                    }
                                  />
                                  <Image
                                  fetchPriority="high" 
                                  rel="preload"
                                    src={YoutubeNew}
                                    alt="wp"
                                    width={24}
                                    height={24}
                                    onClick={() => shareCards("yt")}
                                  />
                                </Box>
                                <Box display={"flex"} gap={1}>
                                  <Image
                                  fetchPriority="high" 
                                  rel="preload"
                                    src={TelegramNew}
                                    alt="wp"
                                    width={24}
                                    height={24}
                                    onClick={() =>
                                      shareCards(
                                        "tele",
                                        list?.story_desk_created_name,
                                        list?.story_title_name
                                      )
                                    }
                                  />
                                  <Image
                                  fetchPriority="high" 
                                  rel="preload"
                                    src={InstagramNew}
                                    alt="wp"
                                    width={24}
                                    height={24}
                                    onClick={() => shareCards("insta")}
                                  />
                                  <Image
                                  fetchPriority="high" 
                                  rel="preload"
                                    src={ThreadsNew}
                                    alt="wp"
                                    width={24}
                                    height={24}
                                    onClick={() => shareCards("td")}
                                  />
                                  <Image
                                  fetchPriority="high" 
                                  rel="preload"
                                    src={LinkedinNew}
                                    alt="wp"
                                    width={24}
                                    height={24}
                                    onClick={() =>
                                      shareCards(
                                        "lk",
                                        list?.story_desk_created_name
                                      )
                                    }
                                  />
                                </Box>
                              </Box>
                            </ClickAwayListener>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </SwiperSlide>
                ))}
            </Swiper>
          </Box>
        )}
        {!loading && (
          <>
            <div className="custom-prev">
              <FaArrowUp />
            </div>
            <div className="custom-next">
              <FaArrowDown />
            </div>

            <div className="custom-pagination"></div>
          </>
        )}
      </Box>
    </Box>
  );
}

export default NewsPresso;
