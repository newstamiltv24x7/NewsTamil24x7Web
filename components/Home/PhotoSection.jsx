import CommonHeader from "@/commonComponents/CommonHeader";
import {
  Box,
  Card,
  CardContent,
  ClickAwayListener,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import Link from "next/link";
import { getHours, sharePhotos } from "@/utils/libs";
import { IoImageOutline } from "react-icons/io5";
import { useTheme } from "@/theme/ThemeContext";

import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";

function PhotoSection({ photosData }) {
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
    <Box>
      <CommonHeader title={"Photos"} engTitle={"More Photos"} url={`photos`} />
      <Grid item md={12} xs={12} sm={12} mt={2}>
        <Grid container spacing={1}>
          {Array.isArray(photosData) &&
            photosData?.slice(0, 4)?.map((list) => (
              <Grid item md={3} xs={12} sm={12} key={list}>
                <Box className="photo-card" position={"relative"} mb={1}>
                  <Card
                    sx={{
                      ".MuiCardContent-root:last-child": { pb: "12px" },
                      p: "12px 12px 4px 12px ",
                      border: "2px solid #666666",
                    }}
                  >
                    <Box
                      position={"relative"}
                      display={"grid"}
                      sx={{ placeItems: "center" }}
                    >
                      <Link
                        href={{
                          pathname: `/photos/${list?.c_photos_slug_title}`,
                          // query: {
                          //   id: list?.c_listicles_id,
                          // },
                        }}
                      >
                        <Box height={350}>
                          <Image
                          fetchPriority="high" rel="preload"
                            src={list?.c_photos_img}
                            alt="News"
                            width={800}
                            loading="lazy"
                            height={925}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                      </Link>
                      <Box
                        display={"flex"}
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                        position={"absolute"}
                        bottom={0}
                        p={"6px"}
                        right={5}
                        bgcolor={"#fb6002"}
                        borderRadius={"3px"}
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
                        lineHeight={1.5}
                        component={"p"}
                        fontWeight={550}
                        height={48}
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
                          width={18}
                          height={18}
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
                                    list?.c_photos_slug_title
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
                                onClick={() =>
                                  sharePhotos(
                                    "tele",
                                    list?.c_photos_title,
                                    list?.c_photos_slug_title
                                  )
                                }
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
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default PhotoSection;
