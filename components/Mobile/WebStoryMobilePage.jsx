import MobileCard from "@/commonComponents/MobileCard";
import MobilepageLayout from "@/layouts/MobilepageLayout";
import { useTheme } from "@/theme/ThemeContext";
import { sharePhotos } from "@/utils/libs";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import {
  FaLinkedin,
  FaSquareFacebook,
  FaSquareThreads,
  FaYoutube,
} from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";
import { RiWhatsappFill } from "react-icons/ri";

const fadeInAnimation = `
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `;

function WebStoryMobilePage({ menuData, trendingData, photos,breakingControl,viewControl,quickControl }) {
  const photosArr = photos?.at(0)?.c_photos_continue_item;
  // const NewsData = trendingData?.at(0)?.data;
  const { mode } = useTheme();

  const [shareOpen, setShareOpen] = useState(false);
  const [sharePop, setSharePop] = useState(false);
  const [newsId, setNewsId] = useState("");

  const handleSetId = (id) => {
    if (id === newsId) {
      setShareOpen(!shareOpen);
    } else {
      setNewsId(id);
      setShareOpen(true);
    }
  };
  return (
    <MobilepageLayout menuData={menuData} trendingData={trendingData} breakingControl={breakingControl} quickControl={quickControl}>
      <style>{fadeInAnimation}</style>
      <Box
        fontWeight={"bold"}
        bgcolor={"#ff992c"}
        borderRadius={"6px"}
        p={1}
        mb={1}
        mx={1}
        color={"#000"}
        fontFamily={"var(--anek-font)"}
        textTransform={"uppercase"}
        fontSize={18}
        mt={12}
      >
        {`PHOTOS - ${photos?.at(0)?.c_photos_title}`}
      </Box>
      {Array.isArray(photosArr) &&
        photosArr?.map((list) => (
          <Box position={"relative"} m={1} mt={2} key={list?._id}>
            <Box width={"100%"} height={"auto"} border={"1px solid #c1c1c1"}>
              <Image
              fetchPriority="high" rel="preload"
                src={list?.c_photos_continue_img}
                alt="newstamil-photo-news"
                width={800}
                height={800}
                loading="lazy"
                style={{ width: "100%", height: "100%" }}
                className="photos-photo"
              />
            </Box>
            <Typography
              bgcolor={"#000"}
              color={"#fff"}
              position={"absolute"}
              bottom={0}
              p={2}
              width={"100%"}
              className="textWrapper"
              fontFamily={"var(--anek-font)"}
              fontSize={16}
            >
              {list?.c_photos_continue_sub_title}
            </Typography>
          </Box>
        ))}
      <Box p={1} m={1}>
        <Typography
          borderLeft={"4px solid #fb6002"}
          pl={1}
          mb={1}
          fontFamily={"var(--arial-font)"}
          fontWeight={700}
          textTransform={"uppercase"}
        >
          Related Stories
        </Typography>
        {Array.isArray(trendingData) &&
          trendingData.slice(0, 15).map((list) => (
            <Box
              key={list?._id}
              borderBottom={"1px solid #313131"}
              mb={1}
              pt={0.1}
            >
              <MobileCard
                list={list}
                handleSetId={handleSetId}
                newsId={newsId}
                shareOpen={shareOpen}
                mode={mode}
                viewControl={viewControl}
              />
            </Box>
          ))}

        <Box
          bgcolor={"#000"}
          borderRadius={"50%"}
          width={45}
          height={45}
          display={"grid"}
          sx={{ placeItems: "center" }}
          position={"fixed"}
          left={10}
          bottom={10}
        >
          <IoMdShare
            color="#fff"
            fontSize={26}
            onClick={() => setSharePop(!sharePop)}
          />
        </Box>
        {sharePop && (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={2}
            flexDirection={"column"}
            position={"fixed"}
            left={10}
            top={"40%"}
            bgcolor={"#fff"}
            p={1}
            border={"1px solid #cbcbcb"}
          >
            <Box
              sx={{
                animation: "fadeIn 0.5s ease forwards",
                animationDelay: "0.1s",
                opacity: 0,
              }}
            >
              <FaSquareFacebook
                fontSize={30}
                onClick={() =>
                  sharePhotos(
                    "fb",
                    photos?.at(0)?.c_photos_title,
                    photos?.at(0)?.c_photos_slug_title
                  )
                }
              />
            </Box>
            <Box
              sx={{
                animation: "fadeIn 0.5s ease forwards",
                animationDelay: "0.2s",
                opacity: 0,
              }}
            >
              <BsTwitterX
                fontSize={30}
                onClick={() =>
                  sharePhotos(
                    "x",
                    photos?.at(0)?.c_photos_title,
                    photos?.at(0)?.c_photos_slug_title
                  )
                }
              />
            </Box>
            <Box
              sx={{
                animation: "fadeIn 0.5s ease forwards",
                animationDelay: "0.3s",
                opacity: 0,
              }}
            >
              <RiWhatsappFill
                fontSize={30}
                onClick={() =>
                  sharePhotos(
                    "wp",
                    photos?.at(0)?.c_photos_title,
                    photos?.at(0)?.c_photos_slug_title,
                    "mobile"
                  )
                }
              />
            </Box>
            <Box
              sx={{
                animation: "fadeIn 0.5s ease forwards",
                animationDelay: "0.4s",
                opacity: 0,
              }}
            >
              <FaYoutube fontSize={30} onClick={() => sharePhotos("yt")} />
            </Box>
            <Box
              sx={{
                animation: "fadeIn 0.5s ease forwards",
                animationDelay: "0.5s",
                opacity: 0,
              }}
            >
              <AiFillInstagram
                fontSize={30}
                onClick={() => sharePhotos("insta")}
              />
            </Box>
            <Box
              sx={{
                animation: "fadeIn 0.5s ease forwards",
                animationDelay: "0.6s",
                opacity: 0,
              }}
            >
              <FaLinkedin
                fontSize={30}
                onClick={() =>
                  sharePhotos(
                    "lk",
                    photos?.at(0)?.c_photos_title,
                    photos?.at(0)?.c_photos_slug_title
                  )
                }
              />
            </Box>
            <Box
              sx={{
                animation: "fadeIn 0.5s ease forwards",
                animationDelay: "0.7s",
                opacity: 0,
              }}
            >
              <FaSquareThreads
                fontSize={30}
                onClick={() => sharePhotos("td")}
              />
            </Box>
          </Box>
        )}
      </Box>
    </MobilepageLayout>
  );
}

export default WebStoryMobilePage;
