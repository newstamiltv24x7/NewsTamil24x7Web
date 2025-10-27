import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { converDayJsDate } from "@/utils/libs";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

function MobileWebStories({ webstoriesData }) {
  return (
    <div className="web-story">
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
        Web Stories
      </Box>
      <Swiper
        autoplay={{ delay: 5000 }} // Autoplay with a delay
        loop={true} // Enable looping
        modules={[Autoplay, Navigation, Pagination]} // Include all necessary modules
        slidesPerView={1}
        spaceBetween={20}
        navigation={true}
      >
        {Array.isArray(webstoriesData) &&
          webstoriesData?.slice(0, 15).map((list) => (
            <SwiperSlide key={list?._id}>
              <Link
                href={{
                  pathname: `/web-story/${list?.c_web_story_slug_name}`,
                  query: {
                    web_id: list?.c_web_story_id,
                  },
                }}
                target="_blank"
              >
                <Box
                  width={"auto"}
                  height={"fit-content"}
                  p={2}
                  border={"1px solid #cbcbcb"}
                  m={2}
                  borderRadius={"8px"}
                >
                  <Image
                  fetchPriority="high" rel="preload"
                    src={list?.c_web_story_cover_img}
                    alt="newstamil-cover-image"
                    height={800}
                    width={1200}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "8px",
                    }}
                  />
                  <Typography
                    textAlign={"center"}
                    fontSize={16}
                    fontWeight={600}
                    className="textWrapperTwo"
                    textTransform={"uppercase"}
                    fontFamily={"var(--anek-font)"}
                  >
                    {list?.c_web_story_title}
                  </Typography>
                  <Typography
                    textAlign={"center"}
                    fontSize={13}
                    fontWeight={500}
                    className="textWrapperTwo"
                    textTransform={"uppercase"}
                    fontFamily={"var(--anek-font)"}
                  >
                    {converDayJsDate(list?.createdAt)}
                  </Typography>
                </Box>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
      <Box textAlign={"center"} border={"1px solid #fb6002"} mx={1}>
          <Link href={`/web-story`} replace>
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
    </div>
  );
}

export default MobileWebStories;
