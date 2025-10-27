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
import { useTheme } from "@/theme/ThemeContext";

function ListiclePage({ listicleRes }) {



  console.log(listicleRes,"<<< listicleRes")
const { mode } = useTheme();

  return (
    <Box>
      <Box
        component={"h4"}
        fontFamily={"var(--anek-font)"}
        fontSize={20}
        lineHeight={1.8}
        my={1}
      >
        {listicleRes?.c_listicles_title}
      </Box>
      <Typography
        fontFamily={"var(--arial-font)"}
        className=""
        fontSize={12}
        lineHeight={1.3}
        component={"p"}
        fontWeight={400}
      >
        Created: {convertTime(listicleRes?.createdAt)}
      </Typography>
      <Box
        width={"100%"}
        // height={520}
        borderRadius={"6px"}
        overflow={"hidden"}
        sx={{
          "& img": {
            filter: "brightness(0.9)",
          },
        }}
        position={"relative"}
        mt={2}
      >
        <Image
        fetchPriority="high" rel="preload"
          src={listicleRes?.c_listicles_img}
          alt="newstamil-listicle-image"
          height={900}
          width={1200}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "6px",
          }}
        />
      </Box>
      <Box mt={1}>
        <Box
          component={"h4"}
          fontFamily={"var(--anek-font)"}
          fontSize={18}
          lineHeight={1.8}
          fontWeight={500}
        >
          {listicleRes?.c_listicles_content}
        </Box>
      </Box>
      {Array.isArray(listicleRes?.c_listicles_continue_item) &&
        listicleRes?.c_listicles_continue_item?.map((list, index) => (
          <Box
            key={list?._id}
            borderBottom={"2px solid #313131"}
            pb={2}
            display={"grid"}
            sx={{ placeItems: "center" }}
          >
            <Box
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              gap={2}
              mt={2}
            >
              <Box
                textAlign={"center"}
                component={"h4"}
                fontSize={20}
                border={"1px solid"}
                p={1.5}
                borderRadius={"50%"}
                width={60}
                fontWeight={700}
                bgcolor={"#fb6002"}
                m={0}
              >
                {index + 1}
              </Box>
              <Typography
                className=""
                fontSize={18}
                lineHeight={1.5}
                component={"h5"}
                fontWeight={600}
                fontFamily={"var(--anek-font)"}
                my={1}
              >
                {list?.c_listicles_continue_sub_title}
              </Typography>
            </Box>
            <Box
              width={"100%"}
              // height={520}
              borderRadius={"6px"}
              overflow={"hidden"}
              my={2}
              px={6}
              pl={9}
            >
              <Image
              fetchPriority="high" rel="preload"
                src={list?.c_listicles_continue_img}
                alt="newstamil-listicle-image"
                height={900}
                width={1200}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
            </Box>
            <Box></Box>
            <Typography
              className=""
              component={"h5"}
              fontFamily={"var(--anek-font)"}
              my={1}
              fontSize={14}
              lineHeight={1.8}
              fontWeight={500}
            >
              {list?.c_listicles_continue_content}
            </Typography>
          </Box>
        ))}
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
                                 onClick={() =>
                                   shareNews("x", NEWSDATA?.at(0)?.story_title_name)
                                 }
                               />
                               <IoMdMail
                                 fontSize={34}
                                 onClick={() =>
                                   shareNews("mail", NEWSDATA?.at(0)?.story_title_name)
                                 }
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

export default ListiclePage;
