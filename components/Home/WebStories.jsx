import CommonHeader from "@/commonComponents/CommonHeader";
import {
  Box,
  Card,
  CardContent,
  ClickAwayListener,
  Fade,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import LeftArrow from "../../public/newsTamilIcons/icons/caret-right.svg";
import RightArrow from "../../public/newsTamilIcons/icons/Right.svg";
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import Carousel from "react-multi-carousel";
import Link from "next/link";
import dayjs from "dayjs";
import { useTheme } from "@/theme/ThemeContext";
import { shareWebstories } from "@/utils/libs";

import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";

function WebStories({ webstoriesData }) {
  const { mode } = useTheme();

  const [currentData, setCurrentData] = React.useState("");
  const [shareOpen, setShareOpen] = React.useState(false);
  const [newsId, setNewsId] = React.useState("");

  const handleSetId = (id, data) => {
    setCurrentData(`${data.c_web_story_title}?web_id=${data.c_web_story_id}`);
    if (id === newsId) {
      setShareOpen(!shareOpen);
    } else {
      setNewsId(id);
      setShareOpen(true);
    }
  };

  const CustomRightArrow = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="custom-right-arrow"
        style={{
          position: "absolute",
          right: 10,
          background: "transparent",
          border: "1px solid #fb6002",
          padding: 0,
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        <Image fetchPriority="high" rel="preload" src={LeftArrow} alt="newstamil-left-aero" width={32} height={56} />
      </button>
    );
  };

  const CustomLeftArrow = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="custom-left-arrow"
        style={{
          position: "absolute",
          left: 10,
          background: "transparent",
          border: "1px solid #fb6002",
          padding: 0,
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        <Image fetchPriority="high" rel="preload" src={RightArrow} alt="newstamil-right-aero" width={32} height={56} />
      </button>
    );
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Box my={0}>
      <CommonHeader title={"Web-Stories"} engTitle={"More Web Stories"} url={`web-story`} />
      <Box className="shorts-shadow" mt={2}>
        {webstoriesData && (
          <Carousel
            responsive={responsive}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            autoPlaySpeed={5000}
            autoPlay={false}
            ssr={true}
            infinite={true}
          >
            {Array.isArray(webstoriesData) &&
              webstoriesData?.map((list) => (
                <div
                  key={list?._id}
                  style={{ margin: "6px 12px", position: "relative" }}
                >
                  <Card sx={{ cursor: "pointer" }}>
                    <Box position={"relative"}>
                      <Link
                        href={{
                          pathname: `/web-story/${list?.c_web_story_slug_name}`,
                        }}
                        target="_blank"
                      >
                        <Image fetchPriority="high" rel="preload"
                          src={list?.c_web_story_cover_img ?? ""}
                          alt="newstamil-cover-image"
                          width={100}
                          unoptimized
                          height={100}
                          style={{
                            width: "100%",
                            height: "400px",
                            objectFit: "cover",
                          }}
                        />
                      </Link>
                      <Box
                        width={"100%"}
                        position={"absolute"}
                        left={0}
                        right={0}
                        bottom={22}
                        display={"flex"}
                        justifyContent={"space-between"}
                        gap={1}
                        px={1}
                      >
                        {list?.c_web_story_images?.map((item) => (
                          <Box
                            key={item?._id}
                            width={"50%"}
                            height={"4px"}
                            borderRadius={"25px"}
                            bgcolor={"#fff"}
                          ></Box>
                        ))}
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 1 }}>
                      <Link
                        href={{
                          pathname: `/web-story/${list?.c_web_story_slug_name}`,
                        }}
                        target="_blank"
                      >
                        <Typography
                          fontFamily={"var(--anek-font)"}
                          className="textWrapper-four"
                          fontSize={16}
                          lineHeight={1.3}
                          component={"p"}
                          fontWeight={550}
                          height={62}
                        >
                          {list?.c_web_story_title}
                        </Typography>
                      </Link>
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
                          fontSize={14}
                          lineHeight={1.3}
                          component={"span"}
                          fontWeight={300}
                          // sx={{ color: "#fff" }}
                        >
                          { list?.updatedAt ? dayjs(list?.updatedAt).format("MMM DD, YYYY") : dayjs(list?.createdAt).format("MMM DD, YYYY")}
                        </Typography>
                        <Image fetchPriority="high" rel="preload"
                          src={mode === "dark" ? ShareIcon : DarkShareIcon}
                          alt="share"
                          width={18}
                          height={18}
                          onClick={() => handleSetId(list?._id, list)}
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
                              bottom={25}
                              right={-5}
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
                                <Image fetchPriority="high" rel="preload"
                                  src={FacebookNew}
                                  alt="fb"
                                  width={24}
                                  height={24}
                                  onClick={() =>
                                    shareWebstories("fb", currentData)
                                  }
                                />
                                <Image fetchPriority="high" rel="preload"
                                  src={WhatsAppNew}
                                  alt="wp"
                                  width={24}
                                  height={24}
                                  onClick={() =>
                                    shareWebstories("wp", currentData)
                                  }
                                />
                                <Image fetchPriority="high" rel="preload"
                                  src={TwitterNew}
                                  alt="wp"
                                  width={24}
                                  height={24}
                                  onClick={() =>
                                    shareWebstories(
                                      "x",
                                      list?.c_web_story_title,
                                      currentData
                                    )
                                  }
                                />
                                <Image fetchPriority="high" rel="preload"
                                  src={YoutubeNew}
                                  alt="wp"
                                  width={24}
                                  height={24}
                                  onClick={() => shareWebstories("yt")}
                                />
                              </Box>
                              <Box display={"flex"} gap={1}>
                                <Image fetchPriority="high" rel="preload"
                                  src={TelegramNew}
                                  alt="wp"
                                  width={24}
                                  height={24}
                                  onClick={() =>
                                    shareWebstories(
                                      "tele",
                                      currentData,
                                      list?.c_web_story_title
                                    )
                                  }
                                />
                                <Image fetchPriority="high" rel="preload"
                                  src={InstagramNew}
                                  alt="wp"
                                  width={24}
                                  height={24}
                                  onClick={() => shareWebstories("insta")}
                                />
                                <Image fetchPriority="high" rel="preload"
                                  src={ThreadsNew}
                                  alt="wp"
                                  width={24}
                                  height={24}
                                  onClick={() => shareWebstories("td")}
                                />
                                <Image fetchPriority="high" rel="preload"
                                  src={LinkedinNew}
                                  alt="wp"
                                  width={24}
                                  height={24}
                                  onClick={() =>
                                    shareWebstories("lk", currentData)
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
              ))}
          </Carousel>
        )}
      </Box>
    </Box>
  );
}

export default WebStories;
