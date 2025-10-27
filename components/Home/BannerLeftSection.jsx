"use client";

import {
  Box,
  ClickAwayListener,
  Fade,
  Grid,
  Paper,
  Popper,
  Skeleton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import CardSection from "@/commonComponents/CardSection";
import Link from "next/link";
import { getHours, shareCards } from "@/utils/libs";
import { useTheme } from "@/theme/ThemeContext";
import { FaRegEye } from "react-icons/fa6";

import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";
import CommonHeader from "@/commonComponents/CommonHeader";

function BannerLeftSection({ newsData, loading,viewControl }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const { mode } = useTheme();

  const handleClick = (newPlacement, id) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <Box className="primary-news">
      {loading && (
        // <Grid container spacing={2}>
        //   <Grid item xs={12} sm={12} md={6}>
        //     <Skeleton
        //       variant="rectangular"
        //       height={286}
        //       width={"100%"}
        //       sx={{ bgcolor: "#cbcbcb" }}
        //     />
        //   </Grid>
        //   <Grid item xs={12} sm={12} md={6} px={2}>
        //     <Grid container spacing={2}>
        //       {[0, 1, 2, 3].map((list) => (
        //         <Grid item xs={12} sm={12} md={6} key={list}>
        //           <Skeleton
        //             variant="rectangular"
        //             height={137}
        //             width={"100%"}
        //             sx={{ bgcolor: "#cbcbcb" }}
        //           />
        //         </Grid>
        //       ))}
        //     </Grid>
        //   </Grid>
        //   <Grid item xs={12} sm={12} md={12} pr={2}>
        //     <Grid container spacing={2}>
        //       {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((list) => (
        //         <Grid item xs={12} sm={12} md={3} key={list}>
        //           <Skeleton
        //             variant="rectangular"
        //             height={150}
        //             width={"100%"}
        //             sx={{ bgcolor: "#cbcbcb" }}
        //           />
        //         </Grid>
        //       ))}
        //     </Grid>
        //   </Grid>
        // </Grid>
        <Grid container spacing={2}>
          
        </Grid>
      )}
      <Box pr={1.3}>
                  <CommonHeader
                    title="NewsRoom"
                    engTitle=""
                    url="#"
                  />
                </Box>
      {!loading && Array.isArray(newsData) && (
        <Grid container spacing={1}>
          
          <Grid item xs={12} sm={12} md={6}>
            <Box display={{ xs: "block", sm: "block", md: "none" }}>
              <Box width={"100%"} height={{ xs: 222 }} mb={3}>
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/OpRSTmkeO_U?si=pk-aRmYDUfG0MMy2?autoplay=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </Box>
            </Box>
            {Array.isArray(newsData) && (
              <Box
                className="primary-border-class"
                position={"relative"}
                pr={3}
                borderRadius={"6px"}
              >
                {Array.isArray(newsData) &&
                newsData?.at(0)?.youtube_embed_id === "" ? (
                  <Link
                    href={`/article/${
                      newsData?.at(0)?.story_desk_created_name
                    }`}
                  >
                    <Box overflow={"hidden"} height={286} borderRadius={"6px"}>
                      <Image
                      fetchPriority="high" rel="preload"
                        src={newsData?.at(0)?.story_cover_image_url}
                        alt={newsData?.at(0)?.news_image_caption}
                        width={1800}
                        height={900}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "fill",
                          cursor: "pointer",
                          borderRadius: "6px",
                        }}
                      />
                    </Box>
                  </Link>
                ) : (
                  <Box height={286}>
                    <iframe
                      width="100%"
                      height="100%"
                      src={
                        Array.isArray(newsData) &&
                        newsData?.at(0)?.youtube_embed_id
                      }
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </Box>
                )}

                <Typography
                  fontFamily={"var(--anek-font)"}
                  className="textWrapperTwo"
                  fontSize={21}
                  lineHeight={1.6}
                  component={"h1"}
                  fontWeight={600}
                  height={64}
                  mt={"2px"}
                  overflow={"hidden"}
                  sx={{ cursor: "pointer" }}
                >
                  <Link
                    href={`/article/${
                      newsData?.at(0)?.story_desk_created_name
                    }`}
                  >
                    {newsData?.at(0)?.story_title_name}
                  </Link>
                </Typography>
                <Typography
                  fontFamily={"var(--anek-font)"}
                  className="textWrapperTwo"
                  fontSize={15}
                  lineHeight={1.5}
                  component={"h2"}
                  fontWeight={550}
                  pt={"10px"}
                  height={56}
                  sx={{ cursor: "pointer" }}
                >
                  <Link
                    href={`/article/${
                      newsData?.at(0)?.story_desk_created_name
                    }`}
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
                    fontSize={14}
                    lineHeight={1.3}
                    component={"span"}
                    fontWeight={"bold"}
                    sx={{
                      color: "#fb6002",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    width={"60%"}
                    // sx={{ color: "#fff" }}
                  >
                    {newsData?.at(0)?.story_subject_name}
                  </Typography>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    gap={2}
                    alignItems={"center"}
                  >
                     { viewControl === "yes" &&   
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap={1}
                      fontFamily={"var(--anek-font)"}
                      fontSize={14}
                      fontWeight={300}
                      sx={{ opacity: 1 }}
                    >
                     
                      <FaRegEye
                        style={{ opacity: 0.8, position: "relative", top: -1 }}
                      />
                      {newsData?.at(0)?.view_count}
                    </Box>
                    }
                    <Typography
                      fontFamily={"var(--anek-font)"}
                      className="textWrapper"
                      fontSize={14}
                      lineHeight={1.3}
                      component={"span"}
                      fontWeight={300}
                      // sx={{ color: "#fff" }}
                    >
                      {getHours(newsData?.at(0)?.updatedAt)}
                    </Typography>
                    <Box position={"relative"} top={3}>
                      <Image
                      fetchPriority="high" rel="preload"
                        src={mode === "light" ? DarkShareIcon : ShareIcon}
                        alt="share"
                        width={17}
                        height={17}
                        style={{ cursor: "pointer" }}
                        onClick={handleClick("left", newsData?.at(0)?._id)}
                      />
                    </Box>
                  </Box>
                  <Popper
                    sx={{ zIndex: 10 }}
                    open={open}
                    anchorEl={anchorEl}
                    placement={placement}
                    transition
                  >
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                          <ClickAwayListener onClickAway={() => setOpen(false)}>
                            <Box
                              display={"flex"}
                              alignItems={"center"}
                              justifyContent={"flex-start"}
                              gap={1}
                              px={1}
                              py={1}
                              mt={-1}
                              // height={30}
                              borderRadius={"0 0 4px 4px"}
                              width={"fit-content"}
                              position={"relative"}
                              top={0}
                              bgcolor={"#dedede"}
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
                                  shareCards(
                                    "fb",
                                    newsData?.at(0)?.story_desk_created_name
                                  )
                                }
                              />
                              <Image
                              fetchPriority="high" rel="preload"
                                src={WhatsAppNew}
                                alt="watsapp-image"
                                width={24}
                                height={24}
                                onClick={() =>
                                  shareCards("wp", newsData?.at(0)?.story_desk_created_name)
                                }
                              />
                              <Image
                              fetchPriority="high" rel="preload"
                                src={TwitterNew}
                                alt="twitter-image"
                                width={24}
                                height={24}
                                onClick={() =>
                                  shareCards(
                                    "x",
                                    newsData?.at(0)?.story_desk_created_name,
                                    newsData?.at(0)?.story_sub_title_name
                                  )
                                }
                              />
                              <Image
                              fetchPriority="high" rel="preload"
                                src={YoutubeNew}
                                alt="youtube-image"
                                width={24}
                                height={24}
                                onClick={() => shareCards("yt")}
                              />
                              <Image
                              fetchPriority="high" rel="preload"
                                src={TelegramNew}
                                alt="telegram-image"
                                width={24}
                                height={24}
                                onClick={() =>
                                  shareCards(
                                    "tele",
                                    newsData?.at(0)?.story_desk_created_name,
                                    newsData?.at(0)?.story_sub_title_name
                                  )
                                }
                              />
                              <Image
                              fetchPriority="high" rel="preload"
                                src={InstagramNew}
                                alt="instagram-image"
                                width={24}
                                height={24}
                                onClick={() => shareCards("insta")}
                              />
                              <Image
                              fetchPriority="high" rel="preload"
                                src={ThreadsNew}
                                alt="threads-image"
                                width={24}
                                height={24}
                                onClick={() => shareCards("td")}
                              />
                              <Image
                              fetchPriority="high" rel="preload"
                                src={LinkedinNew}
                                alt="linked-image"
                                width={24}
                                height={24}
                                onClick={() =>
                                  shareCards(
                                    "lk",
                                    newsData?.at(0)?.story_desk_created_name
                                  )
                                }
                              />
                            </Box>
                          </ClickAwayListener>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </Box>
                <hr
                  style={{
                    width: "100%",
                    border: "0.5px solid #666666",
                    margin: "24px 0 0px 0",
                    opacity: 0.4,
                  }}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Grid container spacing={1}>
              {newsData?.slice(1, 5).map((list, index) => (
                <Grid item xs={6} key={list?._id}>
                  <Box
                    position={"relative"}
                    // className={`${index % 2 === 0 && "border-class"}`}
                    pr={1.2}
                    // pt={index === 1 ? "6px" : 0}
                    className={(index + 1) % 2 !== 0 && "border-class"}
                  >
                    <CardSection data={list} section="home" cardHeight={137} viewControl={viewControl} />
                    <Box display={"grid"} sx={{ placeItems: "center" }}>
                      <hr
                        style={{
                          width: "94%",
                          border: "0.5px solid #666666",
                          margin: "6px 0 0px 0",
                          opacity: 0.4,
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container spacing={1}>
              {newsData?.slice(6, 18).map((list, index) => (
                <Grid
                  item
                  md={3}
                  xs={12}
                  sm={12}
                  key={list?._id}
                  position={"relative"}
                  // borderRight={"1px solid #666666"}
                  // className="border-class"
                >
                  <Box
                    position={"relative"}
                    className={(index + 1) % 4 !== 0 && "border-class"}
                    pr={1.2}
                  >
                    <CardSection data={list} id={index} cardHeight={125} viewControl={viewControl}/>
                    {/* {index === 10 ||
                    index === 11 ||
                    (index === 12 && ( */}
                    <hr
                      style={{
                        width: "100%",
                        border: "0.5px solid #666666",
                        margin: "0px 0 0px 0",
                        opacity: 0.4,
                      }}
                    />
                    {/* ))} */}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default BannerLeftSection;
