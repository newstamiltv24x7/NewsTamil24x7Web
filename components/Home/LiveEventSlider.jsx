"use client";

/**
 * LiveEventSlider — client component.
 *
 * Receives pre-fetched `images` and `youtubeLinks` from the server
 * (via getServerSideProps → HomepageMainSection props).
 *
 * Client-side responsibility is strictly limited to:
 *   - Tracking the current slide index (useState)
 *   - Pausing auto-advance on hover (useState)
 *   - Running the 5-second auto-advance timer (useEffect)
 *
 * The first image (index 0) is always the LCP candidate and therefore
 * receives priority={true}, fetchPriority="high", and loading="eager".
 * Subsequent slides are loaded lazily.
 */

import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function LiveEventSlider({ images = [], youtubeLinks = [] }) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance every 5 s; pause while hovered or only one image
  useEffect(() => {
    if (images.length <= 1 || isHovered) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }, 5000);
    return () => clearInterval(id);
  }, [images, isHovered]);

  const goPrev = () =>
    setCurrent((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  const goNext = () =>
    setCurrent((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  if (!images.length) return null;

  // Only the first (LCP) image needs the priority hints
  const isLCP = current === 0;

  return (
    <Box
      mx={{ md: "inherit", lg: "auto" }}
      pb={3}
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        /* aspect-ratio keeps the slider space consistent at every viewport
           width — eliminates the 0.582 CLS caused by the height changing
           between the static placeholder and the hydrated slider.
           maxHeight caps the banner on wide monitors. */
        aspectRatio: "16/9",
        maxHeight: "400px",
        height: "100%",
        overflow: "hidden",
        gap: "10px",
      }}
      maxWidth={1440}
    >
      {/* ── Left: image slider ─────────────────────────────────────────── */}
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          flex: 1,
          minWidth: 0,
          position: "relative",
          border: "5px solid #ff6600",
          borderRadius: "10px",
        }}
      >
        <Link href={youtubeLinks[current] || "#"}>
          {/* Wrapper div required for next/image fill mode */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <Image
              src={images[current]}
              alt="Live event"
              fill
              // LCP image: all three priority props required
              priority={isLCP}
              fetchPriority={isLCP ? "high" : "auto"}
              loading={isLCP ? "eager" : "lazy"}
              sizes="(max-width:600px) 100vw, (max-width:1200px) 50vw, 720px"
              style={{ objectFit: "cover", transition: "none", transform: "scale(1)" }}
            />
          </div>
        </Link>

        {/* Navigation arrows */}
        <Box
          style={{
            position: "absolute",
            right: 20,
            bottom: 10,
            display: "flex",
            gap: 8,
          }}
        >
          <IconButton
            onClick={goPrev}
            style={{ background: "rgba(255,255,255,0.6)" }}
            aria-label="previous"
          >
            <FaChevronLeft />
          </IconButton>
          <IconButton
            onClick={goNext}
            style={{ background: "rgba(255,255,255,0.6)" }}
            aria-label="next"
          >
            <FaChevronRight />
          </IconButton>
        </Box>
      </Box>

      {/* ── Right: YouTube live embed ───────────────────────────────────── */}
      <Box style={{ flex: 1, minWidth: 0, position: "relative" }}>
        <div
          style={{
            position: "relative",
            borderRadius: "10px",
            width: "100%",
            height: "100%",
            paddingTop: "0",
            border: "5px solid red",
            overflow: "hidden",
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/gynWNinqmjw?autoplay=1&mute=1"
            title="🔴LIVE NEWS TODAY: இன்றைய முக்கிய செய்திகள் | Today Breaking News Tamil | NewsTamil 24X7"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "5px",
            }}
          />
        </div>
      </Box>
    </Box>
  );
}
