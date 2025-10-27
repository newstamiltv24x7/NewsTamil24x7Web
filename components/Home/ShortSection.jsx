import CommonHeader from "@/commonComponents/CommonHeader";
import {
  Box,
  Card,
  CardContent,
  ClickAwayListener,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import WhitePlay from "../../public/newsTamilIcons/icons/whitePlay.svg";
import LeftArrow from "../../public/newsTamilIcons/icons/caret-right.svg";
import RightArrow from "../../public/newsTamilIcons/icons/Right.svg";
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import Carousel from "react-multi-carousel";
import { shareShorts } from "@/utils/libs";
import dayjs from "dayjs";
import Link from "next/link";
import { useTheme } from "@/theme/ThemeContext";
import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";

function ShortSection({ shortsData }) {
  const { mode } = useTheme();

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

  const CustomRightArrow = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="custom-right-arrow"
        style={{
          position: "absolute",
          right: 10,
          background: "#fff",
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
          background: "#fff",
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
      items: 5.5,
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
    <Box mt={4}>
      <CommonHeader title={"Shorts"} engTitle={"More Shorts"} />
      <Box className="shorts-shadow" mt={2}>
        <Carousel
          responsive={responsive}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          ssr={true}
        >
          {Array.isArray(shortsData) &&
            shortsData?.map((list) => (
              <div
                key={list?._id}
                style={{ margin: "6px 12px", position: "relative" }}
              >
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
                        height: "400px",
                        objectFit: "fill",
                        filter: "brightness(0.9)",
                      }}
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={WhitePlay}
                      alt="enwstamil-button"
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
                        className="textWrapperTwo"
                        fontSize={16}
                        lineHeight={1.3}
                        component={"p"}
                        fontWeight={550}
                        height={70}
                      >
                        {list?.c_url_title}
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
                        fontSize={12}
                        lineHeight={1.3}
                        component={"span"}
                        fontWeight={300}
                        // sx={{ color: "#fff" }}
                      >
                        {dayjs(list?.createdAt).format("MMM DD, YYYY")}
                      </Typography>
                      <Image 
                      fetchPriority="high" rel="preload"
                        src={mode === "dark" ? ShareIcon : DarkShareIcon}
                        alt="share"
                        width={18}
                        height={18}
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
            ))}
        </Carousel>
      </Box>
    </Box>
  );
}

export default ShortSection;
