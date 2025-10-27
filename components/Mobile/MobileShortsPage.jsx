import { getAllYoutubeVideos } from "@/commonComponents/WebApiFunction/ApiFunctions";
import MobilepageLayout from "@/layouts/MobilepageLayout";
import { useTheme } from "@/theme/ThemeContext";
import { CryptoFetcher, shareShorts } from "@/utils/libs";
import {
  Box,
  Card,
  CardContent,
  ClickAwayListener,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import WhitePlay from "../../public/newsTamilIcons/icons/whitePlay.svg";
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import dayjs from "dayjs";
import MobileCard from "@/commonComponents/MobileCard";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";

function MobileShortsPage(props) {
  const { menuData, trendingData,breakingControl,viewControl,quickControl } = props;
  // const Trending = trendingData?.at(0)?.data;
  const [shortsData, setShortsData] = useState([]);

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

  const { mode } = useTheme();

  useEffect(() => {
    GetYoutubeShorts();
  }, []);

  return (
    <MobilepageLayout menuData={menuData} trendingData={trendingData} breakingControl={breakingControl} quickControl={quickControl}>
      <Box p={1}>
        <Typography
          bgcolor={"#ff992c"}
          p={1}
          mb={1}
          fontSize={15}
          fontWeight={600}
          borderRadius={"0 6px 0 0"}
          // width={"fit-content"}
          textAlign={"center"}
          fontFamily={"var(--anek-font)"}
        >
          SHORTS
        </Typography>

        <Swiper
          direction="vertical"
          modules={[Autoplay, Navigation, Pagination]}
          // Autoplay settings
          // autoplay={{
          //   delay: 15000,
          //   disableOnInteraction: false,
          // }}
          centeredSlides={true}
          navigation={{
            nextEl: ".custom-next", // Link to the custom 'next' button
            prevEl: ".custom-prev", // Link to the custom 'prev' button
          }}
          pagination={{
            clickable: true,
            el: ".custom-pagination", // Link to the custom pagination container
            bulletClass: "custom-bullet", // Custom class for each bullet
            bulletActiveClass: "custom-bullet-active", // Custom active bullet class
          }}
          slidesPerView={1}
          style={{ height: "550px", position: "relative" }}
        >
          {Array.isArray(shortsData) &&
            shortsData?.slice(0, 6)?.map((list) => (
              <SwiperSlide key={list?._id}>
                <div style={{ position: "relative" }}>
                  <Card>
                    <Link href={list?.c_url_link} target="_blank">
                      <Image 
                      fetchPriority="high" rel="preload"
                        src={list?.c_thumbanail_image}
                        alt="newstamil-thumb-image"
                        width={100}
                        unoptimized
                        height={100}
                        style={{
                          width: "100%",
                          height: "394px",
                          objectFit: "contain",
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
                    <CardContent sx={{ p: 1, pl: 2 }}>
                      <Link href={list?.c_url_link} target="_blank">
                        <Typography
                          fontFamily={"var(--anek-font)"}
                          className="textWrapper"
                          fontSize={16}
                          lineHeight={1.3}
                          component={"p"}
                          fontWeight={550}
                          // height={70}
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
                          onClick={() => handleSetId(list?._id)}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                  {list?._id === newsId && shareOpen && (
                    <ClickAwayListener onClickAway={() => setShareOpen(false)}>
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-evenly"}
                        flexDirection={"column"}
                        gap={1}
                        // my={1}
                        // px={1}
                        p={1}
                        // mt={-1}
                        // height={30}
                        borderRadius={"0 0 4px 4px"}
                        position={"absolute"}
                        bottom={40}
                        right={10}
                        bgcolor={"#e3e2e2"}
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
                        <Box display={"flex"} gap={1}>
                          <Image 
                          fetchPriority="high" rel="preload"
                            src={YoutubeNew}
                            alt="wp"
                            width={24}
                            height={24}
                            onClick={() => shareShorts("yt")}
                          />
                          <Image 
                          fetchPriority="high" rel="preload"
                            src={FacebookNew}
                            alt="wp"
                            width={24}
                            height={24}
                            onClick={() =>
                              shareShorts(
                                "fb",
                                list?.c_url_title,
                                list.c_url_link
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
                                list?.c_url_title,
                                list.c_url_link,
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
                              shareShorts(
                                "x",
                                list?.c_url_link,
                                list?.c_url_title
                              )
                            }
                          />
                        </Box>
                        <Box display={"flex"} gap={1}>
                          <Image 
                          fetchPriority="high" rel="preload"
                            src={InstagramNew}
                            alt="insta"
                            width={24}
                            height={24}
                            onClick={() => shareShorts("insta")}
                          />
                          <Image 
                          fetchPriority="high" rel="preload"
                            src={ThreadsNew}
                            alt="insta"
                            width={24}
                            height={24}
                            onClick={() => shareShorts("td")}
                          />
                          <Image 
                          fetchPriority="high" rel="preload"
                            src={LinkedinNew}
                            alt="insta"
                            width={24}
                            height={24}
                            onClick={() =>
                              shareShorts(
                                "lk",
                                list?.c_url_title,
                                list.c_url_link
                              )
                            }
                          />
                          <Image 
                          fetchPriority="high" rel="preload"
                            src={TelegramNew}
                            alt="insta"
                            width={24}
                            height={24}
                            onClick={() =>
                              shareShorts(
                                "tele",
                                list.c_url_link,
                                list.c_url_title
                              )
                            }
                          />
                        </Box>
                      </Box>
                    </ClickAwayListener>
                  )}
                </div>
              </SwiperSlide>
            ))}
        </Swiper>

        <Box p={1} my={1}>
          <Typography
            borderLeft={"4px solid #fb6002"}
            pl={1}
            mb={1}
            fontFamily={"var(--arial-font)"}
            fontWeight={700}
            textTransform={"uppercase"}
          >
            Trending News
          </Typography>
          {Array.isArray(trendingData) &&
            trendingData.slice(0, 6).map((list) => (
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
    </MobilepageLayout>
  );
}

export default MobileShortsPage;
