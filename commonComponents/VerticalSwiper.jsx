"use client";

import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
// CSS is already imported globally in pages/_app.js — no duplicate imports here.
import Link from "next/link";

function VerticalSwiper({ breakingData }) {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Immediately stop autoplay that Swiper starts on mount.
    // Re-enable it only when the browser has spare CPU cycles so the
    // Swiper animation never blocks the initial page render.
    const swiper = swiperRef.current;
    if (swiper && !swiper.destroyed) {
      swiper.autoplay.stop();
    }

    const rIC = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 300));
    const cIC = window.cancelIdleCallback   ?? clearTimeout;

    const handle = rIC(
      () => {
        const s = swiperRef.current;
        if (s && !s.destroyed) s.autoplay.start();
      },
      { timeout: 2000 } // fall back after 2 s even if CPU stays busy
    );

    return () => cIC(handle);
  }, []);


  function getFirst120Chars(text) {
    return text.slice(0, 100);
  }
  return (
    /*
     * CLS fix: give the Swiper container a fixed, explicit height and
     * aspect-ratio so the browser can reserve the exact space before the
     * Swiper JS bundle is parsed and the component hydrates.
     * aspect-ratio keeps the reserve alive even at varying viewport widths.
     */
    <Box
      sx={{
        position: "relative",
        height: "50px",
        minHeight: "50px",          // never collapses to 0 during hydration
        /* approx 28:1 (full-width header at ~1440 px / 50 px tall) */
        aspectRatio: "28 / 1",
        overflow: "hidden",
        contain: "layout style",    // prevent this subtree from causing reflows
      }}
    >
      {/* Custom navigation buttons */}
      <div className="swiper-button-prev swiper-button-custom" />
      <div className="swiper-button-next swiper-button-custom" />
      <Swiper
        onSwiper={(swiper) => {
          // Capture the imperative instance so the rIC effect can call
          // swiper.autoplay.start() / stop() without a re-render.
          swiperRef.current = swiper;
        }}
        direction="vertical"
        autoplay={{ delay: 2500, disableOnInteraction: false }}
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
