import {
  Box,
  ClickAwayListener,
  Fade,
  Grid,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import ShareIcon from "../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../public/newsTamilIcons/icons/dark-share.svg";
import Link from "next/link";
import { getHours, shareCards } from "@/utils/libs";
import { useTheme } from "@/theme/ThemeContext";
import { FaRegEye } from "react-icons/fa6";
import PlayBtn from "../public/newsTamilIcons/icons/play-btn.svg";
import FacebookNew from "../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../public/newsTamilIcons/icon-pack/Frame 4.svg";

function HorizontalCard({ list, type ,viewControl }) {
  const { mode } = useTheme();
  const [shareOpen, setShareOpen] = React.useState(false);
  const [newsId, setNewsId] = React.useState("");

  const handleSetId = (id) => {
    if (id === newsId) {
      setShareOpen(!shareOpen);
    } else {
      setNewsId(id);
      setShareOpen(!shareOpen);
    }
  };

  return (
    <>
      <Grid container py={1} position={"relative"}>
        <Grid item xs={type !== "secondaryCat" ? 7 : 8}>
          <Box pr={1}>
            <Link href={`/article/${list?.story_desk_created_name}`}>
              <Typography
                fontFamily={"var(--anek-font)"}
                className="textWrapper"
                fontSize={type !== "secondaryCat" ? 14 : 18}
                lineHeight={1.5}
                component={"h1"}
                fontWeight={550}
                height={type !== "secondaryCat" ? 62 : "fit-content"}
                sx={{ wordBreak: "break-word" }}
              >
                {list?.story_title_name}
              </Typography>
            </Link>

            <Box>
              {type === "secondaryCat" && (
                <Box display={{ xs: "none", sm: "none", md: "block" }}>
                  <Typography
                    fontFamily={"var(--anek-font)"}
                    className="textWrapper"
                    fontSize={12}
                    lineHeight={1.5}
                    component={"h2"}
                    fontWeight={500}
                    height={55}
                    mt={1}
                  >
                    {list?.story_sub_title_name}
                  </Typography>
                  <Typography
                    fontFamily={"var(--anek-font)"}
                    className=""
                    fontSize={14}
                    lineHeight={1.3}
                    component={"p"}
                    fontWeight={550}
                    sx={{
                      color: "#fb6002",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    mt={1.1}
                    // width={"40%"}
                  >
                    {list?.story_subject_name}
                  </Typography>
                </Box>
              )}

              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                mt={1}
              >
                 {viewControl === "yes" && 
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={1}
                  fontFamily={"var(--anek-font)"}
                  fontSize={14}
                  fontWeight={300}
                >
                  <FaRegEye style={{ opacity: 0.8, position: "relative", top: -1 }} /> {list?.view_count}
                </Box>
                }

                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={1}
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
                    {getHours(list?.updatedAt)}
                  </Typography>
                  <Image
                  fetchPriority="high" 
                  rel="preload"
                    src={mode === "light" ? DarkShareIcon : ShareIcon}
                    alt="share"
                    width={18}
                    height={18}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSetId(list?._id)}
                  />
                  {list?._id === newsId && shareOpen && (
                    <ClickAwayListener onClickAway={() => setShareOpen(false)}>
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
                        bottom={10}
                        left={type !== "secondaryCat" ? 30 : "42%"}
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
                              shareCards("fb", list?.story_desk_created_name)
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
                              shareCards("wp", list?.story_desk_created_name)
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
                                list?.story_sub_title_name
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
                                list?.story_sub_title_name
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
                              shareCards("lk", list?.story_desk_created_name)
                            }
                          />
                        </Box>
                      </Box>
                    </ClickAwayListener>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={type !== "secondaryCat" ? 5 : 4}>
          <Box
            borderRadius={"6px"}
            overflow={"hidden"}
            height={type !== "secondaryCat" ? 80 : 130}
            position={"relative"}
          >
            {/* {list?.youtube_embed_id === "" ? ( */}
            <Link href={`/article/${list?.story_desk_created_name}`}>
              <Image
              fetchPriority="high" 
              rel="preload"
                src={list?.story_cover_image_url}
                alt={list?.news_image_caption}
                width={1200}
                height={400}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  // height: "fit-content",
                  objectFit: "fill",
                  borderRadius: "6px",
                }}
              />
              {list?.youtube_embed_id !== "" && (
                <Image
                fetchPriority="high" 
                rel="preload"
                  src={PlayBtn}
                  alt="button"
                  width={32}
                  height={56}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    left: 10,
                    bottom: 0,
                  }}
                />
              )}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default HorizontalCard;
