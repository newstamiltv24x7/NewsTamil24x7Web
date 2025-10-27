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
import { convertTime, shareNews } from "@/utils/libs";
import { IoMdMail } from "react-icons/io";
import dayjs from "dayjs";

function MobileLiveBlog({ liveBlogData }) {
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
        
      </Box>
      <Box my={2}>
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
        <Typography
          fontFamily={"var(--arial-font)"}
          className=""
          fontSize={12}
          lineHeight={1.3}
          component={"p"}
          fontWeight={400}
          my={1}
        >
          Created: {convertTime(liveBlogData?.createdAt)}
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
      </Box>
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
              top={25}
              left={-5}
              bgcolor={"#282727"}
              borderRadius={"8px"}
              px={1.5}
            >
              <Typography
                fontFamily={"var(--anek-font)"}
                className=""
                fontSize={10}
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
              left={-5}
              bgcolor={"#282727"}
              borderRadius={"8px"}
              px={1.5}
            >
              <Typography
                fontFamily={"var(--anek-font)"}
                className=""
                fontSize={8}
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
  );
}

export default MobileLiveBlog;
