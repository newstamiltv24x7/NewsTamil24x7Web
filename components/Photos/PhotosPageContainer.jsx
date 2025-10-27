import HorizontalCard from "@/commonComponents/HorizontalCard";
import {
  Box,
  Card,
  CardContent,
  ClickAwayListener,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import { IoImageOutline } from "react-icons/io5";
import HomepageLayout from "@/layouts/HomepageLayout";
import dayjs from "dayjs";
import { useTheme } from "@/theme/ThemeContext";
import { sharePhotos } from "@/utils/libs";

import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";

function PhotosPageContainer({
  menuData,
  trendingData,
  photosData,
  breakingData,
  quickControl,
  breakingControl,
  viewControl,
}) {
  const PhotoData = photosData ?? [];
  // const TRENDING = trendingData?.at(0)?.data ?? [];
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
    <HomepageLayout
      menuData={menuData}
      breakingData={breakingData}
      quickControl={quickControl}
      breakingControl={breakingControl}
      viewControl={viewControl}
    >
      <Box maxWidth={1440} px={2} mx={"auto"} width={"100%"}>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <Box
              fontWeight={"bold"}
              bgcolor={"#ff992c"}
              borderRadius={"6px"}
              p={1}
              mb={1}
              color={"#000"}
              fontFamily={"var(--anek-font)"}
              textTransform={"uppercase"}
              fontSize={18}
            >
              PHOTOS
            </Box>
            <Grid container spacing={1}>
              {Array.isArray(PhotoData) &&
                PhotoData?.slice(0, 15)?.map((data) => (
                  <Grid item xs={4} key={data?._id}>
                    <Card
                      sx={{
                        boxShadow: "none",
                        backgroundImage: "none",
                        p: 1,
                        border: "1px solid #666666",
                      }}
                    >
                      <Box position={"relative"}>
                        <Link
                          href={{
                            pathname: `/photos/${data?.c_photos_slug_title}`,
                            // query: {
                            //   id: data?.c_listicles_id,
                            // },
                          }}
                        >
                          <Image
                          fetchPriority="high" rel="preload"
                            src={data?.c_photos_img}
                            alt="News"
                            width={100}
                            unoptimized
                            height={105}
                            style={{
                              width: "100%",
                              height: "400px",
                              borderRadius: "6px",
                              cursor: "pointer",
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
                          <IoImageOutline color="#fff" />
                          <Typography
                            fontFamily={"var(--anek-font)"}
                            className="textWrapper"
                            fontSize={12}
                            lineHeight={1.3}
                            component={"span"}
                            fontWeight={400}
                            sx={{ color: "#fff" }}
                          >
                            {`+ ${data?.c_photos_continue_item?.length} ${
                              data?.c_photos_continue_item?.length > 0
                                ? "Images"
                                : "Image"
                            }`}
                          </Typography>
                        </Box>
                      </Box>
                      <CardContent
                        sx={{
                          pt: 0,
                          px: 0,
                          pb: 0,
                          "&.MuiCardContent-root:last-child": {
                            paddingBottom: 1,
                          },
                        }}
                      >
                        <Typography
                          fontFamily={"var(--anek-font)"}
                          className="textWrapperTwo"
                          fontSize={12}
                          lineHeight={1.5}
                          component={"p"}
                          fontWeight={550}
                          sx={{ cursor: "pointer" }}
                          overflow={"hidden"}
                          height={35}
                        >
                          <Link
                            href={{
                              pathname: `/photos/${data?.c_photos_title}`,
                              query: {
                                id: data?.c_photos_id,
                              },
                            }}
                          >
                            {/* <Link href={`/news/${data?.story_desk_created_name}`}> */}
                            {data?.c_photos_title}
                          </Link>
                          {/* </Link> */}
                        </Typography>

                        <Box>
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            mt={0.4}
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
                              {/* 2 Mins Ago */}
                              {dayjs(data?.createdAt).format("MMM DD, YYYY")}
                            </Typography>
                            <Image
                            fetchPriority="high" rel="preload"
                              src={mode === "dark" ? ShareIcon : DarkShareIcon}
                              alt="share"
                              width={16}
                              height={16}
                              onClick={() => handleSetId(data?._id)}
                              style={{ cursor: "pointer" }}
                            />
                            {data?._id === newsId && shareOpen && (
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
                                  bottom={10}
                                  right={25}
                                  bgcolor={"#dedede"}
                                  border={"1px solid #fff"}
                                  boxShadow={
                                    "0px 0px 10px 0px rgba(0,0,0,0.75)"
                                  }
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
                                        sharePhotos(
                                          "fb",
                                          data?.c_photos_title,
                                          data?.c_photos_slug_title
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
                                          data?.c_photos_title,
                                          data?.c_photos_slug_title
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
                                          data?.c_photos_title,
                                          data?.c_photos_slug_title
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
                                  </Box>
                                  <Box display={"flex"} gap={1}>
                                    <Image
                                    fetchPriority="high" rel="preload"
                                      src={TelegramNew}
                                      alt="wp"
                                      width={24}
                                      height={24}
                                      onClick={() =>
                                        sharePhotos(
                                          "tele",
                                          data?.c_photos_title,
                                          data?.c_photos_slug_title
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
                                          data?.c_photos_title,
                                          data?.c_photos_slug_title
                                        )
                                      }
                                    />
                                  </Box>
                                </Box>
                              </ClickAwayListener>
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Box position={"sticky"} top={100}>
              <Typography
                component={"h5"}
                textTransform={"uppercase"}
                fontWeight={"bold"}
                borderLeft={"4px solid #fb6002"}
                mb={2}
                pl={"4px"}
              >
                Trending News
              </Typography>
              {Array.isArray(trendingData) &&
                trendingData?.slice(0, 8)?.map((list) => (
                  <React.Fragment key={list._id}>
                    <HorizontalCard list={list} viewControl={viewControl} />
                    <Box display={"grid"} sx={{ placeItems: "center" }}>
                      <hr
                        style={{
                          width: "98%",
                          border: "0.5px solid #666666",
                          margin: "0px 0 16px 0",
                        }}
                      />
                    </Box>
                  </React.Fragment>
                ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </HomepageLayout>
  );
}

export default PhotosPageContainer;
