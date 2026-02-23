import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

function VerticalSwiper({ breakingData }) {


    useEffect(() => {
        // Ensure Swiper initializes after DOM is ready
        setTimeout(() => {
          document.querySelector(".swiper-button-prev").classList.remove("swiper-button-disabled");
          document.querySelector(".swiper-button-next").classList.remove("swiper-button-disabled");
        }, 1000);
      }, []);


  function getFirst120Chars(text) {
    return text.slice(0, 100);
  }
  return (
    <Box sx={{ height: "50px", position: "relative" }} >
     {/* Custom navigation buttons */}
     <div className="swiper-button-prev swiper-button-custom"></div>
      <div className="swiper-button-next swiper-button-custom"></div>
      <Swiper
        // modules={[Pagination, Mousewheel]}
        direction="vertical"
        autoplay={{ delay: 2500 }}
        loop={true}
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        spaceBetween={20}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        style={{ height: "100%" }} 
      >
        {Array.isArray(breakingData) && breakingData?.length > 0 && breakingData.map((list, index) => (
          <SwiperSlide
          key={index}
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              color: "#000",
            }}
          >
            <Link href={`/article/${list?.redirect_url || list?.story_desk_created_name || list?._id || '#'}`}>
              <Typography
                color={"#000"}
                textTransform={"uppercase"}
                textAlign={"center"}
                fontWeight={700}
                fontSize={15}
                lineHeight={1.5}
                px={3}
                sx={{
                  wordSpacing: "2px",
                }}
                fontFamily={"var(--anek-font)"}
                borderRadius={"0 6px 6px 0"}
                className="textWrapperOne"
              >
                {getFirst120Chars(list?.title)}
              </Typography>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default VerticalSwiper;
