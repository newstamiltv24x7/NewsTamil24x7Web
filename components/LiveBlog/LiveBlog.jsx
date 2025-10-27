import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import Facebook from "../../public/newsTamilIcons/icons/fb.svg";
import WhatsApp from "../../public/newsTamilIcons/icons/whatsapp.svg";
import Instagram from "../../public/newsTamilIcons/icons/insta.png";
import Youtube from "../../public/newsTamilIcons/icons/youtube.svg";
import Linkedin from "../../public/newsTamilIcons/icons/linkedin.svg";
import Thread from "../../public/newsTamilIcons/icons/threads.svg";
import Twitter from "../../public/newsTamilIcons/icons/twitter.svg";

import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";

import { convertTime, shareNews } from "@/utils/libs";
import { IoMdMail } from "react-icons/io";
import dayjs from "dayjs";
import { useTheme } from "@/theme/ThemeContext";

function LiveBlog({ liveBlogData }) {
  const { mode } = useTheme();
  return (
    <Box>
      <Box
        width={"fit-content"}
        display={"flex"}
        justifyContent={"start"}
        alignItems={"center"}
        borderRadius={"6px"}
      >
        <Box
          width={25}
          height={25}
          ml={1}
          mr={2}
          bgcolor={"red"}
          borderRadius={"50%"}
          className="ping"
        ></Box>
        <Box
          bgcolor={"#fb6002"}
          width={"fit-content"}
          display={"flex"}
          justifyContent={"start"}
          alignItems={"center"}
          borderRadius={"6px"}
        >
          <Typography
            component={"h3"}
            fontSize={22}
            fontFamily={"var(--arial-font)"}
            py={0.5}
            px={1.5}
            color={"#fff"}
            fontWeight={700}
            textTransform={"uppercase"}
          >
            Live
          </Typography>
        </Box>
        <Box
          ml={5}
          width={"fit-content"}
          display={"flex"}
          justifyContent={"start"}
          alignItems={"center"}
          borderRadius={"6px"}
        >
          <Typography
            fontFamily={"var(--anek-font)"}
            className=""
            fontSize={24}
            lineHeight={1.5}
            component={"p"}
            fontWeight={600}
            sx={{ wordBreak: "break-word" }}
          >
            {liveBlogData?.c_live_blog_title}
          </Typography>
        </Box>
      </Box>
      {/* <Box>
        
        <Typography
          fontFamily={"var(--arial-font)"}
          className=""
          fontSize={12}
          lineHeight={1.3}
          component={"p"}
          fontWeight={400}
          my={1}
        >
          Created1: {convertTime(liveBlogData?.createdAt)}
        </Typography>
        <Box height={"570px"} borderRadius={"6px"} overflow={"hidden"} mt={1.5}>
          <Image
          fetchPriority="high" rel="preload"
            alt="newstamil-live-blo-image"
            src={liveBlogData?.c_live_blog_image_url}
            width={1200}
            height={900}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
        <Typography
          fontFamily={"var(--anek-font)"}
          className=""
          fontSize={18}
          lineHeight={1.6}
          component={"p"}
          fontWeight={500}
          sx={{ wordBreak: "break-word" }}
          mt={2}
        >
          {liveBlogData?.c_live_blog_content}
        </Typography>
      </Box> */}

      <Box
      >
        {Array.isArray(liveBlogData?.c_live_sub_blog) &&
          liveBlogData?.c_live_sub_blog?.map((list) => (
            <Box
              border={"1px solid #f1f1f1"}
              p={2}
              borderRadius={"6px"}
              borderRight={"6px solid #fb6002"}
              key={list?._id}
              my={2}
              pl={8}
              position={"relative"}
            >
              <Box
                position={"absolute"}
                p={1}
                top={10}
                left={-40}
                bgcolor={"#282727"}
                borderRadius={"8px"}
                px={3}
              >
                <Typography
                  fontFamily={"var(--anek-font)"}
                  className=""
                  fontSize={16}
                  lineHeight={1.6}
                  component={"p"}
                  fontWeight={600}
                  sx={{ wordBreak: "break-word" }}
                  color={"#fb6002"}
                  textAlign={"center"}
                >
                  {dayjs(list?.c_live_sub_blog_create_date).format("MMM")}
                </Typography>
                <Typography
                  fontFamily={"var(--anek-font)"}
                  className=""
                  fontSize={16}
                  lineHeight={1.6}
                  component={"p"}
                  fontWeight={600}
                  sx={{ wordBreak: "break-word" }}
                  textAlign={"center"}
                  color={"#fb6002"}
                >
                  {dayjs(list?.c_live_sub_blog_create_date).format("DD")}
                </Typography>
                <Typography
                  fontFamily={"var(--anek-font)"}
                  className=""
                  fontSize={16}
                  lineHeight={1.6}
                  component={"p"}
                  fontWeight={600}
                  sx={{ wordBreak: "break-word" }}
                  textAlign={"center"}
                  color={"#fb6002"}
                >
                  {dayjs(list?.c_live_sub_blog_create_date).format("YYYY")}
                </Typography>
              </Box>
              <Box
                position={"absolute"}
                p={1}
                top={110}
                left={-37}
                bgcolor={"#282727"}
                borderRadius={"8px"}
                px={1.2}
              >
                <Typography
                  fontFamily={"var(--anek-font)"}
                  className=""
                  fontSize={14}
                  lineHeight={1.6}
                  component={"p"}
                  fontWeight={600}
                  sx={{ wordBreak: "break-word" }}
                  textAlign={"center"}
                  color={"#fb6002"}
                >
                  {dayjs(list?.c_live_sub_blog_create_date).format("hh:mm A")}
                </Typography>
              </Box>
              <Typography
                fontFamily={"var(--anek-font)"}
                className=""
                fontSize={18}
                lineHeight={1.5}
                component={"p"}
                fontWeight={600}
                sx={{ wordBreak: "break-word" }}
                mt={1}
              >
                {list?.c_live_sub_blog_title}
              </Typography>
              <Box
                sx={{
                  "& div": {
                    fontFamily: "var(--anek-font) !important",
                  },
                }}
              >
                <div
                  className="news-content"
                  dangerouslySetInnerHTML={{
                    __html: list?.c_live_sub_blog_content,
                  }}
                ></div>
              </Box>
            </Box>
          ))}
      </Box>

      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
        border={"1px solid #cbcbcb"}
        p={1}
        borderRadius={"6px"}
        sx={{
          img: {
            cursor: "pointer",
          },
          svg: {
            cursor: "pointer",
          },
          img: {
            cursor: "pointer",
          },
          "img:hover": {
            transform: "scale(1.1)",
            filter: "drop-shadow(0px 0px 3px #fff)",
          },
          "svg:hover": {
            transform: "scale(1.1)",
            filter: "drop-shadow(0px 0px 3px #fff)",
          },
        }}
      >
        <Typography
          fontFamily={"var(--anek-font)"}
          className="textWrapper"
          fontSize={20}
          component={"p"}
          fontWeight={"bold"}
        >
          SHARE :
        </Typography>
        <Image
          fetchPriority="high"
          rel="preload"
          src={FacebookNew}
          alt="fb"
          width={26}
          height={26}
          onClick={() => shareNews("fb")}
        />
        <Image
          fetchPriority="high"
          rel="preload"
          src={WhatsAppNew}
          alt="wp"
          width={26}
          height={26}
          onClick={() => shareNews("wp")}
        />
        <Image
          fetchPriority="high"
          rel="preload"
          src={InstagramNew}
          alt="insta"
          width={26}
          height={26}
          onClick={() => shareNews("insta")}
        />
        <Image
          fetchPriority="high"
          rel="preload"
          src={TelegramNew}
          alt="telegrams"
          width={26}
          height={26}
          onClick={() => shareNews("tele")}
          style={{
            filter: mode === "dark" && "invert(1)",
          }}
        />
        <Image
          fetchPriority="high"
          rel="preload"
          src={YoutubeNew}
          alt="insta"
          width={26}
          height={26}
          onClick={() => shareNews("yt")}
        />
        <Image
          fetchPriority="high"
          rel="preload"
          src={LinkedinNew}
          alt="insta"
          width={26}
          height={26}
          onClick={() => shareNews("lk")}
        />
        <Image
          fetchPriority="high"
          rel="preload"
          src={ThreadsNew}
          alt="insta"
          width={26}
          height={26}
          onClick={() => shareNews("td")}
          style={{
            filter: mode === "dark" && "invert(1)",
          }}
        />
        <Image
          fetchPriority="high"
          rel="preload"
          src={TwitterNew}
          alt="insta"
          width={26}
          height={26}
          style={{
            filter: mode === "dark" && "invert(1)",
          }}
          onClick={() => shareNews("x", NEWSDATA?.at(0)?.story_title_name)}
        />
        <IoMdMail
          fontSize={34}
          onClick={() => shareNews("mail", NEWSDATA?.at(0)?.story_title_name)}
        />
      </Box>
      <Box my={2}>
        <Typography
          component={"h5"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
          mb={1}
          fontSize={"1.2rem"}
          pl={"4px"}
          fontFamily={"var(--anek-font)"}
          textAlign={"center"}
          p={2}
        >
          புதிய செய்திகளுக்கு நியூஸ் தமிழ் 24x7 சேனலை SUBSCRIBE செய்யுங்கள்
        </Typography>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignContent={"center"}
          gap={2}
          pb={2}
        >
          <Button
            startIcon={<FaYoutube />}
            sx={{
              fontSize: 12,
              color: "inherit",
              bgcolor: "#ff0302",
              textTransform: "uppercase",
              fontFamily: "var(--oswald-font)",
              "&:hover": {
                bgcolor: "#ff0302",
              },
            }}
          >
            Subscribe
          </Button>
          <Button
            startIcon={<FaFacebook />}
            sx={{
              color: "inherit",
              bgcolor: "#3b5999",
              textTransform: "uppercase",
              fontFamily: "var(--oswald-font)",
              fontSize: 12,
              "&:hover": {
                bgcolor: "#3b5999",
              },
            }}
          >
            Follow
          </Button>
          <Button
            startIcon={<FaXTwitter color="#fff" />}
            sx={{
              fontSize: 12,
              color: "#fff",
              textTransform: "uppercase",
              fontFamily: "var(--oswald-font)",
              bgcolor: "#121212",
              "&:hover": {
                bgcolor: "#121212",
              },
            }}
          >
            Follow
          </Button>
          <Button
            startIcon={<RiInstagramFill />}
            sx={{
              fontSize: 12,
              textTransform: "uppercase",
              fontFamily: "var(--oswald-font)",
              color: "inherit",
              bgcolor: "#e2306c",
              "&:hover": {
                bgcolor: "#e2306c",
              },
            }}
          >
            Follow
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default LiveBlog;
