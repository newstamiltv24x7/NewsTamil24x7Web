import React from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Box,
  Card,
  CardContent,
  ClickAwayListener,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { IoImageOutline } from "react-icons/io5";
import { getHours, sharePhotos } from "@/utils/libs";
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import { useTheme } from "@/theme/ThemeContext";

import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";

function MobilePhotos({ photosData }) {
  const { mode } = useTheme();

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
    <>
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
        Photos
      </Box>
      <Swiper
        autoplay={{ delay: 5000 }} // Autoplay with a delay
        loop={true}
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        spaceBetween={20}
        navigation={true}
        className="mob-cards"
      >
        {Array.isArray(photosData) &&
          photosData?.slice(0, 9)?.map((list) => (
            <SwiperSlide>
              <Box
                className="photo-card"
                position={"relative"}
                m={1}
                mb={3}
                mt={2}
                key={list?._id}
              >
                <Card
                  sx={{
                    ".MuiCardContent-root:last-child": { pb: "12px" },
                    p: "12px 12px 4px 12px ",
                    //   border: "2px solid #666666",
                  }}
                >
                  <Box position={"relative"}>
                    <Link
                      href={{
                        pathname: `/photos/${list?.c_photos_slug_title}`,
                        // query: {
                        //   id: list?.c_listicles_id,
                        // },
                      }}
                    >
                      <Image 
                      fetchPriority="high" rel="preload"
                        src={list?.c_photos_img}
                        alt="News"
                        width={1200}
                        unoptimized
                        height={800}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                    <Box
                      display={"flex"}
                      justifyContent={"flex-end"}
                      alignItems={"center"}
                      position={"absolute"}
                      bottom={6}
                      p={"6px"}
                      right={0}
                      bgcolor={"#fb6002"}
                      borderRadius={"0 0 6px 0"}
                    >
                      <IoImageOutline />
                      <Typography
                        fontFamily={"var(--anek-font)"}
                        className="textWrapper"
                        fontSize={12}
                        lineHeight={1.3}
                        component={"span"}
                        fontWeight={600}
                        // sx={{ color: "#fff" }}
                      >
                        {`+ ${list?.c_photos_continue_item?.length} ${
                          list?.c_photos_continue_item?.length > 0
                            ? "Images"
                            : "Image"
                        }`}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent
                    sx={{
                      p: 1,
                      px: 0,
                      pb: "2px",
                      "&.MuiCardContent-root:last-child": {
                        paddingBottom: 1,
                      },
                    }}
                  >
                    <Typography
                      fontFamily={"var(--anek-font)"}
                      className="textWrapperTwo"
                      fontSize={16}
                      lineHeight={1.4}
                      component={"p"}
                      fontWeight={550}
                    >
                      <Link
                        href={{
                          pathname: `/photos/${list?.c_photos_slug_title}`,
                          // query: {
                          //   id: list?.c_listicles_id,
                          // },
                        }}
                      >
                        {list?.c_photos_title}
                      </Link>
                    </Typography>
                    <Box
                      mt={1.4}
                      display={"flex"}
                      gap={1}
                      alignItems={"center"}
                      justifyContent={"space-between"}
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
                          {getHours(list?.createdAt)}
                        </Typography>
                      </Box>
                      <Image 
                      fetchPriority="high" rel="preload"
                        src={mode === "dark" ? ShareIcon : DarkShareIcon}
                        alt="share"
                        width={16}
                        height={16}
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
                            // flexDirection={"column"}
                            gap={1}
                            p={1}
                            // height={30}
                            borderRadius={"6px"}
                            position={"absolute"}
                            bottom={10}
                            right={35}
                            bgcolor={"#dedede"}
                            border={"1px solid #fff"}
                            boxShadow={"0px 0px 10px 0px rgba(0,0,0,0.75)"}
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
                                sharePhotos(
                                  "fb",
                                  list?.c_photos_title,
                                  list?.c_photos_slug_title
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
                                sharePhotos(
                                  "wp",
                                  list?.c_photos_title,
                                  list?.c_photos_slug_title,
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
                                sharePhotos(
                                  "x",
                                  list?.c_photos_title,
                                  list?.c_photos_slug_title
                                )
                              }
                            />
                            <Image 
                            fetchPriority="high" rel="preload"
                              src={YoutubeNew}
                              alt="wp"
                              width={24}
                              height={24}
                              onClick={() => sharePhotos("yt")}
                            />

                            <Image 
                            fetchPriority="high" rel="preload"
                              src={TelegramNew}
                              alt="wp"
                              width={24}
                              height={24}
                              onClick={() => sharePhotos("tele")}
                            />
                            <Image 
                            fetchPriority="high" rel="preload"
                              src={InstagramNew}
                              alt="wp"
                              width={24}
                              height={24}
                              onClick={() => sharePhotos("insta")}
                            />
                            <Image 
                            fetchPriority="high" rel="preload"
                              src={ThreadsNew}
                              alt="wp"
                              width={24}
                              height={24}
                              onClick={() => sharePhotos("td")}
                            />
                            <Image 
                            fetchPriority="high" rel="preload"
                              src={LinkedinNew}
                              alt="wp"
                              width={24}
                              height={24}
                              onClick={() =>
                                sharePhotos(
                                  "lk",
                                  list?.c_photos_title,
                                  list?.c_photos_slug_title
                                )
                              }
                            />
                          </Box>
                        </ClickAwayListener>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

export default MobilePhotos;
