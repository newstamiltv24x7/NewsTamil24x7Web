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

function MobileListiclePage({ listicleRes }) {


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
            // sx={{ placeItems: "center" }}
            
          >
            <Box
              display={"flex"}
              justifyContent={"flex-start"}
            //   alignItems={"center"}
              gap={2}
              mt={2}
            >
              <Box
                textAlign={"center"}
                component={"h4"}
                fontSize={14}
                border={"1px solid"}
                p={1.5}
                borderRadius={"50%"}
                width={50}
                fontWeight={700}
                bgcolor={"#fb6002"}
                m={0}
              >
                {index + 1}
              </Box>
              <Typography
                className="textWrapperOne"
                fontSize={18}
                lineHeight={1.5}
                component={"h5"}
                fontWeight={700}
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
            //   px={6}
            //   pl={9}
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
    </Box>
  );
}

export default MobileListiclePage;
