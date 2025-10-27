import HorizontalCard from "@/commonComponents/HorizontalCard";
import {
  getAllYoutubeVideos,
  getHomePageNews,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import HomepageLayout from "@/layouts/HomepageLayout";
import { useTheme } from "@/theme/ThemeContext";
import { CryptoFetcher, shareShorts } from "@/utils/libs";
import {
  Box,
  Card,
  CardContent,
  ClickAwayListener,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import WhitePlay from "../../public/newsTamilIcons/icons/whitePlay.svg";
import dayjs from "dayjs";
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import BigCard from "@/commonComponents/BigCard";

import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";

function ShortsPageContainer(props) {
  const {
    menuData,
    trendingData,
    breakingData,
    quickControl,
    breakingControl,
    viewControl
  } = props;

  const { mode } = useTheme();

  // const NewsArr = trendingData?.at(0)?.data;

  const [shortsData, setShortsData] = useState([]);
  const [bigStory, setBigStory] = useState([]);

  const [currentData, setCurrentData] = React.useState({});

  const [shareOpen, setShareOpen] = React.useState(false);
  const [newsId, setNewsId] = React.useState("");

  const handleSetId = (id, data) => {
    setCurrentData(data);
    if (id === newsId) {
      setShareOpen(!shareOpen);
    } else {
      setNewsId(id);
      setShareOpen(true);
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

  const BigStory = async () => {
    try {
      const body = {
        n_page: 1,
        n_limit: 10,
        main_category_name: "bigstoriesnews",
      };
      const response = await getHomePageNews(body);
      if (response?.payloadJson?.length > 0) {
        const firstNews = CryptoFetcher(response?.payloadJson);
        setBigStory(firstNews?.at(0)?.data);
      } else {
        setBigStory([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetYoutubeShorts();
    BigStory();
  }, []);

  return (
    <HomepageLayout
      menuData={menuData}
      breakingData={breakingData}
      quickControl={quickControl}
      breakingControl={breakingControl}
    >
      <Box
        mt={2}
        maxWidth={1440}
        width={"100%"}
        mx={{ md: "inherit", lg: "auto" }}
        px={2}
      >
        <Grid container spacing={2}>
          <Grid item md={3} xs={12} sm={12}>
            <Box position={"sticky"} top={170}>
              <Typography
                component={"h5"}
                textTransform={"uppercase"}
                fontWeight={"bold"}
                borderLeft={"4px solid #ff992c"}
                mb={1}
                pl={"4px"}
                fontSize={18}
              >
                Trending News
              </Typography>
              {Array.isArray(trendingData) &&
                trendingData?.slice(0, 8)?.map((list) => (
                  <React.Fragment key={list._id}>
                    <HorizontalCard list={list} viewControl={viewControl}/>
                    <Box display={"grid"} sx={{ placeItems: "center" }}>
                      <hr
                        style={{
                          width: "100%",
                          border:
                            mode === "dark"
                              ? "0.5px solid #f1f1f1"
                              : "0.5px solid #000",
                          margin: "0px 0 6px 0",
                        }}
                      />
                    </Box>
                  </React.Fragment>
                ))}
            </Box>
          </Grid>
          <Grid item md={6} xs={12} sm={12}>
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
              Shorts
            </Box>
            <Grid container spacing={2}>
              {Array.isArray(shortsData) &&
                shortsData?.map((list) => (
                  <Grid item xs={4}>
                    <div
                      key={list?._id}
                      style={{ margin: "6px 0", position: "relative" }}
                    >
                      <Card>
                        <Link href={list?.c_url_link} target="_blank">
                          <Image
                          fetchPriority="high" rel="preload"
                            src={list?.c_thumbanail_image}
                            alt="newstamil-image"
                            width={100}
                            unoptimized
                            height={100}
                            style={{
                              width: "100%",
                              height: "400px",
                              objectFit: "fill",
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
                              top: "40%",
                              left: "45%",
                              cursor: "pointer",
                            }}
                          />
                        </Link>
                        <CardContent sx={{ p: 1 }}>
                          <Link href={list?.c_url_link} target="_blank">
                            <Typography
                              fontFamily={"var(--anek-font)"}
                              className="textWrapper"
                              fontSize={16}
                              lineHeight={1.3}
                              component={"p"}
                              fontWeight={550}
                              height={65}
                            >
                              {list?.c_url_title}
                            </Typography>
                          </Link>
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            pt={2}
                          >
                            <Typography
                              fontFamily={"var(--anek-font)"}
                              className="textWrapper"
                              fontSize={12}
                              lineHeight={1.3}
                              component={"span"}
                              fontWeight={300}
                              // sx={{ color: "#fff" }}
                            >
                              {dayjs(list?.updatedAt).format("MMM DD, YYYY")}
                            </Typography>
                            <Image
                            fetchPriority="high" rel="preload"
                              src={mode === "dark" ? ShareIcon : DarkShareIcon}
                              alt="share"
                              width={16}
                              height={16}
                              onClick={() => handleSetId(list?._id, list)}
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
                                  gap={1}
                                  p={1}
                                  // height={30}
                                  borderRadius={"6px"}
                                  position={"absolute"}
                                  bottom={50}
                                  right={-5}
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
                                  <Box display={"flex"} gap={1}>
                                    <Image
                                    fetchPriority="high" rel="preload"
                                      src={FacebookNew}
                                      alt="fb"
                                      width={24}
                                      height={24}
                                      onClick={() =>
                                        shareShorts(
                                          "fb",
                                          currentData?.c_url_title,
                                          currentData?.c_url_link
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
                                        shareShorts(
                                          "wp",
                                          currentData?.c_url_title,
                                          currentData?.c_url_link
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
                                        shareShorts(
                                          "x",
                                          currentData?.c_url_link,
                                          currentData?.c_url_title
                                        )
                                      }
                                    />
                                    <Image
                                    fetchPriority="high" rel="preload"
                                      src={YoutubeNew}
                                      alt="wp"
                                      width={24}
                                      height={24}
                                      onClick={() => shareShorts("yt")}
                                    />
                                  </Box>
                                  <Box display={"flex"} gap={1}>
                                    <Image
                                    fetchPriority="high" rel="preload"
                                      src={TelegramNew}
                                      alt="wp"
                                      width={24}
                                      height={24}
                                      onClick={() =>
                                        shareShorts(
                                          "tele",
                                          currentData?.c_url_title,
                                          currentData?.c_url_link
                                        )
                                      }
                                    />
                                    <Image
                                    fetchPriority="high" rel="preload"
                                      src={InstagramNew}
                                      alt="wp"
                                      width={24}
                                      height={24}
                                      onClick={() => shareShorts("insta")}
                                    />
                                    <Image
                                    fetchPriority="high" rel="preload"
                                      src={ThreadsNew}
                                      alt="wp"
                                      width={24}
                                      height={24}
                                      onClick={() => shareShorts("td")}
                                    />
                                    <Image
                                    fetchPriority="high" rel="preload"
                                      src={LinkedinNew}
                                      alt="wp"
                                      width={24}
                                      height={24}
                                      onClick={() =>
                                        shareShorts(
                                          "lk",
                                          currentData?.c_url_title,
                                          currentData?.c_url_link
                                        )
                                      }
                                    />
                                  </Box>
                                </Box>
                              </ClickAwayListener>
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </div>
                  </Grid>
                ))}
            </Grid>
          </Grid>
          <Grid item md={3} xs={12} sm={12}>
            <Box position={"sticky"} top={160}>
              <Typography
                component={"h5"}
                textTransform={"uppercase"}
                fontWeight={"bold"}
                borderLeft={"4px solid #ff992c"}
                mb={2}
                pl={"4px"}
                fontSize={18}
              >
                Big Stories
              </Typography>
              <Box position={"relative"}>
                <BigCard list={bigStory?.at(0)} page={"india"} />
                <Box display={"grid"} sx={{ placeItems: "center" }}>
                  <hr
                    style={{
                      width: "100%",
                      border: "0.5px solid #666666",
                      margin: "0px 0 6px 0",
                    }}
                  />
                </Box>
              </Box>
              {Array.isArray(bigStory) &&
                bigStory?.slice(1, 10)?.map((list) => (
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
        </Grid>
      </Box>
    </HomepageLayout>
  );
}

export default ShortsPageContainer;
