import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import LeftArrow from "../../public/newsTamilIcons/icons/arrow-circle-left.svg";
import RightArrow from "../../public/newsTamilIcons/icons/arrow-circle-right.svg";
import Book from "../../public/newsTamilIcons/icons/book-open.svg";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import HorizontalCard from "@/commonComponents/HorizontalCard";
import ListiclePage from "./ListiclePage";

function ListiclePageContainer({ newsData, trendData, listicleRes ,viewControl }) {
  const NewsArr = newsData?.at(0)?.data;
  const TRENDING = trendData?.at(0)?.data ?? [];
  return (
    <Box maxWidth={1440} px={2} margin={"auto"}>
      <Grid container spacing={3}>
        <Grid item xs={8.5}>
          <ListiclePage listicleRes={listicleRes} />
        </Grid>
        <Grid item xs={3.5}>
          <Box border={"1px solid #666666"} p={2} borderRadius={"8px"} my={1}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={1}
            >
              <Box
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                gap={1}
              >
                <Image fetchPriority="high" rel="preload" src={Book} alt="tv" width={30} height={30} />
                <Typography
                  fontFamily={"var(--arial-font)"}
                  fontSize={18}
                  component={"p"}
                  fontWeight={"bold"}
                  textTransform={"uppercase"}
                >
                  Recent News
                </Typography>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={1}
              >
                <div
                  className="custom-button-prev2"
                  style={{ cursor: "pointer" }}
                >
                  <Image fetchPriority="high" rel="preload" src={LeftArrow} alt="left" width={24} height={24} />
                </div>
                <div
                  className="custom-button-next2"
                  style={{ cursor: "pointer" }}
                >
                  <Image fetchPriority="high" rel="preload" src={RightArrow} alt="left" width={24} height={24} />
                </div>
              </Box>
            </Box>

            <Swiper
              autoplay={true}
              loop={true}
              modules={[Autoplay, Navigation, Pagination]}
              slidesPerView={1.5}
              spaceBetween={20}
              navigation={{
                prevEl: ".custom-button-prev2",
                nextEl: ".custom-button-next2",
              }}
            >
              {Array.isArray(NewsArr) &&
                NewsArr.map((list) => (
                  <SwiperSlide key={list?._id}>
                    <Box>
                      <Box borderRadius={"6px"} overflow={"hidden"}>
                        <Link href={`/article/${list?.story_desk_created_name || list?._id || '#'}`}>
                          <Image fetchPriority="high" rel="preload"
                            src={list?.story_cover_image_url}
                            alt={list?.story_subject_name}
                            width={100}
                            height={100}
                            style={{
                              width: "100%",
                              height: "160px",
                              borderRadius: "6px",
                              objectFit: "cover",
                            }}
                          />
                        </Link>
                      </Box>
                      <Typography
                        fontFamily={"var(--anek-font)"}
                        className="textWrapper"
                        fontSize={14}
                        lineHeight={1.3}
                        component={"h1"}
                        fontWeight={550}
                        sx={{ wordBreak: "break-word" }}
                      >
                        {list?.story_title_name}
                      </Typography>
                    </Box>
                  </SwiperSlide>
                ))}
            </Swiper>
          </Box>
          <Box position={"sticky"} top={170}>
            <Typography
              component={"h5"}
              textTransform={"uppercase"}
              fontWeight={"bold"}
              borderLeft={"6px solid #fb6002"}
              mb={0.5}
              pl={"12px"}
              lineHeight={2}
              fontSize={20}
            >
              Trending News
            </Typography>
            {Array.isArray(TRENDING) &&
              TRENDING?.slice(0, 8)?.map((list) => (
                <React.Fragment key={list._id}>
                  <HorizontalCard list={list} viewControl={viewControl} />
                  <Box display={"grid"} sx={{ placeItems: "center" }}>
                    <hr
                      style={{
                        width: "98%",
                        border: "0.5px solid #666666",
                        margin: "-3px 0 6px 0",
                      }}
                    />
                  </Box>
                </React.Fragment>
              ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ListiclePageContainer;
