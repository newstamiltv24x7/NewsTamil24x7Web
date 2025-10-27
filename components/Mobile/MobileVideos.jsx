import { getAllYoutubeVideos } from "@/commonComponents/WebApiFunction/ApiFunctions";
import { CryptoFetcher, shareVideos } from "@/utils/libs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Button, ClickAwayListener, Typography } from "@mui/material";
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
import dayjs from "dayjs";
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import PlayBtn from "../../public/newsTamilIcons/icons/play-btn.svg";

function MobileVideos() {
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
        c_youtube_type: "video",
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
          mb={0}
          fontWeight={700}
          textTransform={"uppercase"}
          fontFamily={"var(--anek-font)"}
        >
          Videos
        </Box>

        {Array.isArray(shortsData) &&
          shortsData?.slice(0, 6)?.map((list) => (
            <Box
              p={1}
              m={1}
              key={list?._id}
              border={"1px solid #cbcbcb"}
              position={"relative"}
            >
              <div className="">
                <Link href={list?.c_url_link} target="_blank">
                  <Image
                  fetchPriority="high" rel="preload"
                    src={list?.c_thumbanail_image}
                    alt="newstamil-thumb-image"
                    width={1200}
                    // loading="lazy"
                    height={800}
                    // quality={80}
                    unoptimized
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "contain",
                      filter: "brightness(0.85)",
                    }}
                  />
                  <Image
                  fetchPriority="high" rel="preload"
                    src={PlayBtn}
                    alt="newstamil-button"
                    width={40}
                    height={56}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      left: 20,
                      bottom: "41%",
                    }}
                  />
                </Link>
              </div>
              <Box
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                // m={"12px 12px 0 12px"}
                gap={2}
                // position={"absolute"}
                // bottom={0}
              >
                <Box>
                  <Link href={list?.c_url_link} target="_blank">
                    <Typography
                      component={"p"}
                      fontSize={18}
                      fontWeight={700}
                      className="textWrapper"
                      fontFamily={"var(--anek-font) !important"}
                    >
                      {list?.c_url_title}
                    </Typography>
                  </Link>
                </Box>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                pt={2}
                position={"relative"}
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
                  <ClickAwayListener onClickAway={() => setShareOpen(false)}>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-evenly"}
                      // flexDirection={"column"}
                      gap={1}
                      // my={1}
                      // px={1}
                      p={1}
                      // mt={-1}
                      // height={30}
                      borderRadius={"0 0 4px 4px"}
                      position={"absolute"}
                      bottom={-10}
                      right={20}
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
                        src={FacebookNew}
                        alt="fb"
                        width={24}
                        height={24}
                        onClick={() =>
                          shareVideos("fb", list?.c_url_title, list?.c_url_link)
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
                          shareVideos("x", list?.c_url_link, list?.c_url_title)
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
                          shareVideos("lk", list?.c_url_title, list?.c_url_link)
                        }
                      />
                    </Box>
                  </ClickAwayListener>
                )}
              </Box>
            </Box>
          ))}
        <Box textAlign={"center"} border={"1px solid #fb6002"} mx={1}>
          <Link href={`/videos`}>
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

export default MobileVideos;
