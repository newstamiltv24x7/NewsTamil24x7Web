import { Box, Button, Typography } from "@mui/material";
import React from "react";
import MoreIcon from "../public/newsTamilIcons/icons/more.svg";
import Image from "next/image";
import Link from "next/link";

function CommonHeader({ title, engTitle, url }) {
  return (
    <Box
      display={"flex"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      // gap={2}
    >
      <Typography
        component={"h5"}
        // borderLeft={"8px solid #fb6002"}
        py={0.7}
        px={2}
        fontFamily={"var(--anek-font)"}
        fontWeight={700}
        whiteSpace={"nowrap"}
        textTransform={"uppercase"}
        fontSize={20}
        textAlign={"left"}
        bgcolor={"#fb6002"}
        color={"#fff"}
        borderRadius={"0 12px 0 0 "}
        // borderRadius={"8% 24% 25% 0% / 0% 67% 0% 25%"}
        // width={150}
      >
        {title}
      </Typography>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"end"}
        alignItems={"cenetr"}
        paddingBlock={engTitle === "" ? "19px" : "3px"}
        borderBottom={"3px solid #fb6002"}
      >
        {title === "Cards" && (
          <Link href={`/cards`}>
            <Button
              endIcon={<Image fetchPriority="high" rel="preload" src={MoreIcon} alt="more-icon" />}
              sx={{
                fontFamily: "var(--arial-font)",
                color: "inherit",
                textTransform: "capitalize",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {engTitle}
            </Button>
          </Link>
        )}
        {title === "Shorts" && (
          <Link href={`/shorts`}>
            <Button
              endIcon={<Image fetchPriority="high" rel="preload" src={MoreIcon} alt="more-icon" />}
              sx={{
                fontFamily: "var(--arial-font)",
                color: "inherit",
                textTransform: "capitalize",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {engTitle}
            </Button>
          </Link>
        )}
        {title === "Videos" && (
          <Link
            href={`/videos`}
            // href={`https://www.youtube.com/@NewsTamil24X7TV/videos`}
          >
            <Button
              endIcon={<Image fetchPriority="high" rel="preload" src={MoreIcon} alt="more-icon" />}
              sx={{
                fontFamily: "var(--arial-font)",
                color: "inherit",
                textTransform: "capitalize",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {engTitle}
            </Button>
          </Link>
        )}
        {title === "Web-Stories" && (
          <Link
            href={`/web-story`}
          >
            <Button
              endIcon={<Image fetchPriority="high" rel="preload" src={MoreIcon} alt="more-icon" />}
              sx={{
                fontFamily: "var(--arial-font)",
                color: "inherit",
                textTransform: "capitalize",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {engTitle}
            </Button>
          </Link>
        )}
        {title === "Photos" && (
          <Link
            href={`/photos`}
          >
            <Button
              endIcon={<Image fetchPriority="high" rel="preload" src={MoreIcon} alt="more-icon" />}
              sx={{
                fontFamily: "var(--arial-font)",
                color: "inherit",
                textTransform: "capitalize",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {engTitle}
            </Button>
          </Link>
        )}
        {engTitle !== "" &&
          title !== "Shorts" &&
          title !== "Videos" &&
          title !== "Cards" &&
          title !== "Photos" &&
          title !== "Web-Stories" && (
            <Link href={`/news/${url}`}>
              <Button
                endIcon={<Image fetchPriority="high" rel="preload" src={MoreIcon} alt="more-icon" />}
                sx={{
                  fontFamily: "var(--arial-font)",
                  color: "inherit",
                  textTransform: "capitalize",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {engTitle}
              </Button>
            </Link>
          )}
      </Box>
    </Box>
  );
}

export default CommonHeader;
