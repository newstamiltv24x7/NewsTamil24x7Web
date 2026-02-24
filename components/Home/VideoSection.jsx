import CommonHeader from "@/commonComponents/CommonHeader";
import {
  Box,
  ClickAwayListener,
  Fade,
  Grid,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import React from "react";
import PlayBtn from "../../public/newsTamilIcons/icons/play-btn.svg";
import Image from "next/image";
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import Link from "next/link";
import { useTheme } from "@/theme/ThemeContext";
import { converDayJsDate, shareVideos } from "@/utils/libs";

import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";

function VideoSection({ postedData, postedLoading }) {
  const { mode } = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [currentData, setCurrentData] = React.useState({});

  const handleClick = (newPlacement, id, data) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
    setCurrentData(data);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={9} xs={12} sm={12}>
          <CommonHeader
            title={"Videos"}
            engTitle={"More Videos"}
            url={`videos`}
          />
          <Grid container spacing={2}>
            <Grid item md={8} xs={12} sm={12}>
              <Box
                my={2}
                bgcolor={mode === "dark" ? "#f1f1f1" : "#c7c7c7"}
                pb={1}
              >
                {Array.isArray(postedData) &&
                  postedData?.slice(0, 1)?.map((list) => (
                    <>
                      <Link href={list?.c_url_link} target="_blank">
                        <div key={list?._id} className="video-section-wrapper">
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
                              height: "390px",
                              objectFit: "fill",
                            }}
                          />
                        </div>
                      </Link>
                      <Box
                        display={"flex"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        m={"12px 12px 0 12px"}
                        gap={2}
                        // position={"absolute"}
                        // bottom={0}
                      >
                        <Link href={list?.c_url_link} target="_blank">
                          <Image
                          fetchPriority="high" rel="preload"
                            src={PlayBtn}
                            alt="newstamil-button"
                            width={32}
                            height={56}
                            style={{ cursor: "pointer" }}
                          />
                        </Link>
                        <Box>
                          <Link href={list?.c_url_link} target="_blank">
                            <Typography
                              component={"p"}
                              fontSize={20}
                              fontWeight={700}
                              className="textWrapper"
                              fontFamily={"var(--anek-font) !important"}
                              color={"#000"}
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
                        m={"12px 22px"}
                      >
                        <Typography
                          fontFamily={"var(--anek-font)"}
                          className="textWrapper"
                          fontSize={12}
                          lineHeight={1.3}
                          component={"span"}
                          fontWeight={500}
                          color={"#000"}
                          // sx={{ color: "#fff" }}
                        >
                          {converDayJsDate(list?.createdAt)}
                        </Typography>
                        <Image
                        fetchPriority="high" rel="preload"
                          src={DarkShareIcon}
                          alt="share"
                          width={24}
                          height={24}
                          style={{ cursor: "pointer" }}
                          onClick={handleClick("left", list?._id, list)}
                        />

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
                                <ClickAwayListener
                                  onClickAway={() => setOpen(false)}
                                >
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
                                    bgcolor={"#e3e2e2"}
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
                                        shareVideos(
                                          "wp",
                                          currentData?.c_url_title,
                                          currentData?.c_url_link,
                                          "desktop"
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
                                          currentData?.c_url_title,
                                          currentData?.c_url_link
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
                    </>
                  ))}
              </Box>
            </Grid>
            <Grid item my={2} md={4} xs={12} sm={12}>
              <Box
                // height={600}
                pb={2}
                overflow={"auto"}
                className="videos-container"
              >
                {Array.isArray(postedData) &&
                  postedData?.slice(1, 5)?.map((item) => (
                    <Grid
                      container
                      spacing={1}
                      mb={3.2}
                      key={item?._id}
                      borderBottom={"1px solid #666666"}
                    >
                      <Grid item xs={4} position={"relative"}>
                        <Link href={item?.c_url_link} target="_blank">
                          <Box width={100} height={84}>
                            <Image
                            fetchPriority="high" rel="preload"
                              src={item?.c_thumbanail_image}
                              alt="newstamil-thumb-image"
                              width={800}
                              height={700}
                              unoptimized
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                          <Image
                          fetchPriority="high" rel="preload"
                            src={PlayBtn}
                            alt="newstamil-button"
                            width={32}
                            height={56}
                            style={{
                              position: "absolute",
                              bottom: "8%",
                              cursor: "pointer",
                            }}
                          />
                        </Link>
                      </Grid>
                      <Grid item xs={8} pr={1}>
                        <Link href={item?.c_url_link} target="_blank">
                          <Typography
                            fontFamily={"var(--anek-font)"}
                            className="textWrapper"
                            fontSize={16}
                            lineHeight={1.5}
                            component={"p"}
                            fontWeight={550}
                          >
                            {item?.c_url_title}
                          </Typography>
                        </Link>
                        <Box
                          mt={1.4}
                          display={"flex"}
                          gap={1}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                          pb={1}
                        >
                          <Box display={"flex"} gap={1} alignItems={"center"}>
                            {/* <Typography
                            fontFamily={"var(--anek-font)"}
                            className="textWrapper"
                            fontSize={12}
                            lineHeight={1.3}
                            component={"p"}
                            fontWeight={550}
                            sx={{ color: "#fb6002" }}
                          >
                            Bridge Collapse
                          </Typography> */}
                            <Typography
                              fontFamily={"var(--anek-font)"}
                              className="textWrapper"
                              fontSize={12}
                              lineHeight={1.3}
                              component={"span"}
                              fontWeight={300}
                              // sx={{ color: "#fff" }}
                            >
                              {converDayJsDate(item?.createdAt)}
                            </Typography>
                          </Box>
                          <Image
                          fetchPriority="high" rel="preload"
                            src={mode === "light" ? DarkShareIcon : ShareIcon}
                            alt="share"
                            width={18}
                            height={18}
                            style={{ cursor: "pointer" }}
                            onClick={handleClick("left", item?._id, item)}
                          />
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
                                  <ClickAwayListener
                                    onClickAway={() => setOpen(false)}
                                  >
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
                                      bgcolor={"#e3e2e2"}
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
                                          shareVideos(
                                            "wp",
                                            currentData?.c_url_title,
                                            currentData?.c_url_link,
                                            "desktop"
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
                                            currentData?.c_url_title,
                                            currentData?.c_url_link
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
                      </Grid>
                    </Grid>
                  ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} display={{ xs: "none", sm: "none", md: "block" }}>
          <Box
            width={"100%"}
            height={"92%"}
            bgcolor={"#c7c7c7"}
            p={2}
            my={2}
          ></Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default VideoSection;
