import { getHours, shareCards } from "@/utils/libs";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ShareIcon from "../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../public/newsTamilIcons/icons/dark-share.svg";
import { FaRegEye } from "react-icons/fa6";

import FacebookNew from "../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../public/newsTamilIcons/icon-pack/Frame 4.svg";

function MobileCard({ list, mode, handleSetId, newsId, shareOpen, viewControl }) {
  return (
    <>
      <Grid container py={1} spacing={2}>
        <Grid item xs={5}>
          <Box
            borderRadius={"6px"}
            overflow={"hidden"}
            sx={{ position: "relative", width: "100%", aspectRatio: "16/9" }}
          >
            <Link href={`/article/${list?.story_desk_created_name}`}>
              <Image
                src={list?.story_cover_image_url}
                alt="cover_image"
                fill
                sizes="(max-width:600px) 50vw, (max-width:900px) 33vw, 261px"
                quality={60}
                loading="lazy"
                style={{
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
            </Link>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box pr={1}>
            <Link href={`/article/${list?.story_desk_created_name}`}>
              <Typography
                fontFamily={"var(--anek-font)"}
                className="textWrapper"
                fontSize={14}
                lineHeight={1.4}
                component={"h2"}
                fontWeight={550}
                sx={{ wordBreak: "break-word" }}
              >
                {list?.story_title_name}
              </Typography>
            </Link>

            <Box>
              <Box>
                <Typography
                  fontFamily={"var(--anek-font)"}
                  className=""
                  fontSize={13}
                  lineHeight={1.3}
                  component={"p"}
                  fontWeight={550}
                  sx={{
                    color: "#fb6002",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  mt={0.7}
                  // width={"40%"}
                >
                  {list?.story_subject_name}
                </Typography>
              </Box>

              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                mt={1}
              >
                 {viewControl === "yes" && 
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={1}
                  fontFamily={"var(--anek-font)"}
                  fontSize={14}
                  fontWeight={300}
                >
                  <FaRegEye /> {list?.view_count}
                </Box>
                }
                <Typography
                  fontFamily={"var(--anek-font)"}
                  className="textWrapper"
                  fontSize={12}
                  lineHeight={1.3}
                  component={"span"}
                  fontWeight={500}
                  sx={{ opacity: 0.7 }}
                  // sx={{ color: "#fff" }}
                >
                  {getHours(list?.updatedAt)}
                </Typography>
                <Image
                fetchPriority="high" 
                rel="preload"
                  src={mode === "dark" ? ShareIcon : DarkShareIcon}
                  alt="share"
                  width={20}
                  height={20}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSetId(list?._id)}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {list?._id === newsId && shareOpen && (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
          // my={1}
          // px={1}
          py={1}
          // mt={-1}
          // height={30}
          borderRadius={"0 0 4px 4px"}
          // position={"relative"}
          // top={0}
          bgcolor={"#e3e2e269"}
          sx={{
            button: {
              cursor: "pointer",
              p: "0px 8px",
              fontSize: { xs: 12, sm: 10, md: 12, lg: 14 },
              fontFamily: "var(--oswald-font)",
              borderRadius: "10px",
              textTransform: "uppercase",
            },
            "& svg": {
              width: 20,
              height: 20,
              cursor: "pointer",
            },
            "& img": {
              cursor: "pointer",
            },
          }}
        >
          <Image
          fetchPriority="high" 
          rel="preload"
            src={YoutubeNew}
            alt="wp"
            width={24}
            height={24}
            onClick={() => shareCards("yt")}
          />
          <Image
          fetchPriority="high" 
          rel="preload"
            src={FacebookNew}
            alt="wp"
            width={24}
            height={24}
            onClick={() => shareCards("fb", list.story_desk_created_name)}
          />
          <Image
          fetchPriority="high" 
          rel="preload"
            src={WhatsAppNew}
            alt="wp"
            width={24}
            height={24}
            onClick={() =>
              shareCards("wp", list.story_desk_created_name, "mobile")
            }
          />
          <Image
          fetchPriority="high" 
          rel="preload"
            src={TwitterNew}
            alt="wp"
            width={24}
            height={24}
            onClick={() =>
              shareCards(
                "x",
                list.story_desk_created_name,
                list.story_sub_title_name
              )
            }
          />
          <Image
          fetchPriority="high" 
          rel="preload"
            src={InstagramNew}
            alt="insta"
            width={24}
            height={24}
            onClick={() => shareCards("insta")}
          />
          <Image
          fetchPriority="high" 
          rel="preload"
            src={ThreadsNew}
            alt="insta"
            width={24}
            height={24}
            onClick={() => shareCards("td")}
          />
          <Image
          fetchPriority="high" 
          rel="preload"
            src={LinkedinNew}
            alt="insta"
            width={24}
            height={24}
            onClick={() => shareCards("lk", list.story_desk_created_name)}
          />
          <Image
          fetchPriority="high" 
          rel="preload"
            src={TelegramNew}
            alt="insta"
            width={24}
            height={24}
            onClick={() =>
              shareCards(
                "tele",
                list.story_desk_created_name,
                list.story_sub_title_name
              )
            }
          />
        </Box>
      )}
    </>
  );
}

export default MobileCard;
