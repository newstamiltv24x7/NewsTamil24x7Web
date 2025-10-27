import { getAllYoutubeVideos } from "@/commonComponents/WebApiFunction/ApiFunctions";
import { CryptoFetcher, shareShorts, shareShortsection } from "@/utils/libs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  ClickAwayListener,
  Grid,
  Typography,
} from "@mui/material";
import WhitePlay from "../../public/newsTamilIcons/icons/whitePlay.svg";
import dayjs from "dayjs";
import { useTheme } from "@/theme/ThemeContext";
import { FaArrowRight } from "react-icons/fa6";

import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";

function MobileShorts() {
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
    <div>
      <Box mt={2}>
        <Box
          borderLeft={"4px solid #fb6002"}
          pl={1}
          ml={2}
          mt={2}
          mb={2}
          fontWeight={700}
          textTransform={"uppercase"}
          fontFamily={"var(--anek-font)"}
        >
          Shorts
        </Box>

        <Grid container spacing={1} pl={1}>
          {Array.isArray(shortsData) &&
            shortsData?.slice(0, 6)?.map((list) => (
              <Grid xs={6} key={list?._id}>
                <div style={{ position: "relative", margin: 8 }}>
                  <Card sx={{ px: 1 }}>
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
                          height: "250px",
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
                    <CardContent sx={{ p: 0.4 }}>
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
                        {list?._id === newsId && shareOpen && (
                          <ClickAwayListener
                            onClickAway={() => setShareOpen(false)}
                          >
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
                          </ClickAwayListener>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            ))}
        </Grid>
        <Box textAlign={"center"} border={"1px solid #fb6002"} mx={1}>
          <Link href={`/shorts`}>
            <Button
              sx={{
                fontSize: 12,
                textTransform: "capitalize",
                fontFamily: "var(--arial-font)",
                fontWeight: 600,
                color: "#fb6002",
              }}
              endIcon={<FaArrowRight style={{ fontSize: 14 }} />}
            >
              View More
            </Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
}

export default MobileShorts;
