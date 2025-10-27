import MobileCard from "@/commonComponents/MobileCard";
import MobilepageLayout from "@/layouts/MobilepageLayout";
import { useTheme } from "@/theme/ThemeContext";
import { shareNews, sharePhotos } from "@/utils/libs";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import {
  FaLinkedin,
  FaSquareFacebook,
  FaSquareThreads,
  FaYoutube,
  FaFacebook,
  FaXTwitter,
} from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";
import { RiInstagramFill, RiWhatsappFill } from "react-icons/ri";
// import Facebook from "../../public/newsTamilIcons/icons/fb.svg";
// import WhatsApp from "../../public/newsTamilIcons/icons/whatsapp.svg";
// import Instagram from "../../public/newsTamilIcons/icons/insta.png";
// import Youtube from "../../public/newsTamilIcons/icons/youtube.svg";
// import Linkedin from "../../public/newsTamilIcons/icons/linkedin.svg";
// import Thread from "../../public/newsTamilIcons/icons/threads.svg";
// import Twitter from "../../public/newsTamilIcons/icons/twitter.svg";


import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";




import { IoMdMail } from "react-icons/io";
import Link from "next/link";
const fadeInAnimation = `
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `;

function PhotosMobilePage({
  menuData,
  trendingData,
  photos,
  breakingControl,
  quickControl,
  viewControl
}) {
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
    <MobilepageLayout
      menuData={menuData}
      trendingData={trendingData}
      breakingControl={breakingControl}
      quickControl={quickControl}
    >
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
          <Box position={"relative"} m={1} mt={0} key={list?._id}>
            <Box width={"100%"} height={"auto"} border={"1px solid #c1c1c1"}>
              <Image
                fetchPriority="high" 
                rel="preload"
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
         <Box
          mb={1}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          // gap={2}
          px={2}
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
          {/* <Typography
            fontFamily={"var(--anek-font)"}
            className="textWrapper"
            fontSize={16}
            component={"p"}
            fontWeight={"bold"}
          >
            Share :
          </Typography> */}
          <Image
            fetchPriority="high" 
            rel="preload"
            src={FacebookNew}
            alt="fb"
            width={24}
            height={24}
            // onClick={() => shareNews("fb")}
            onClick={()=> shareNews("fb")}
          />
          <Image
            fetchPriority="high" 
            rel="preload"
            src={WhatsAppNew}
            alt="wp"
            width={24}
            height={24}
            // onClick={() => shareNews("wp", "mobile")}
            onClick={()=> shareNews("wp", "mobile")}
          />
          <Image
            fetchPriority="high" 
            rel="preload"
            src={InstagramNew}
            alt="insta"
            width={24}
            height={24}
            // onClick={() => shareNews("insta")}
            onClick={()=> shareNews("insta")}
          />
          <Image
            fetchPriority="high" 
            rel="preload"
            src={YoutubeNew}
            alt="insta"
            width={24}
            height={24}
            // onClick={() => shareNews("yt")}
            onClick={()=> shareNews("yt")}
          />
          <Image
            fetchPriority="high" 
            rel="preload"
            src={LinkedinNew}
            alt="insta"
            width={24}
            height={24}
            // onClick={() => shareNews("lk")}
            onClick={()=> shareNews("lk")}
          />
          <Image
            fetchPriority="high" 
            rel="preload"
            src={ThreadsNew}
            alt="insta"
            width={24}
            height={24}
            // onClick={() => shareNews("td")}
            onClick={()=> shareNews("td")}
            style={{
              filter: mode === "dark" && "invert(1)",
            }}
          />
          <Image
            fetchPriority="high" 
            rel="preload"
            src={TwitterNew}
            alt="insta"
            width={24}
            height={24}
            style={{
              filter: mode === "dark" && "invert(1)",
            }}
            onClick={()=> shareNews("x", singleNews?.at(0)?.story_title_name)}
            // onClick={() => shareNews("x", singleNews?.at(0)?.story_title_name)}
          />
          <Image
            fetchPriority="high" 
            rel="preload"
            src={TelegramNew}
            alt="insta"
            width={24}
            height={24}
            style={{
              filter: mode === "dark" && "invert(1)",
            }}
            // onClick={() =>
            //   shareNews("tele", singleNews?.at(0)?.story_title_name)
            // }
              onClick={()=> shareNews("tele", singleNews?.at(0)?.story_title_name)}
          />
          <IoMdMail
            fontSize={30}
            onClick={()=> shareNews("mail", singleNews?.at(0)?.story_title_name)}
            // onClick={() =>
            //   shareNews("mail", singleNews?.at(0)?.story_title_name)
            // }
          />
        </Box>
        <Box
          bgcolor={mode === "dark" ? "#272626" : "#f1f1f1"}
          m={1}
          borderRadius={"8px"}
        >
          <Typography
            component={"h5"}
            textTransform={"uppercase"}
            fontWeight={"bold"}
            mb={1}
            fontSize={"1rem"}
            pl={"4px"}
            fontFamily={"var(--anek-font)"}
            textAlign={"center"}
            p={1.2}
          >
            புதிய செய்திகளுக்கு நியூஸ் தமிழ் 24x7 சேனலை SUBSCRIBE செய்யுங்கள்
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignContent={"center"}
            flexWrap={"wrap"}
            gap={2}
            pb={2}
          >
            <Button
              startIcon={<FaYoutube />}
              sx={{
                fontSize: 12,
                color: "#fff",
                bgcolor: "#ff0302",
                textTransform: "uppercase",
                fontFamily: "var(--oswald-font)",
                "&:hover": {
                  bgcolor: "#ff0302",
                },
              }}
              onClick={() => shareNews("yt")}
            >
              Subscribe
            </Button>
            <Link
              href={"https://www.facebook.com/newstamiltv24x7"}
              target="_blank"
            >
              <Button
                startIcon={<FaFacebook />}
                sx={{
                  color: "#fff",
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
            </Link>
            <Link
              href={"https://www.twitter.com/newstamiltv24x7"}
              target="_blank"
            >
              <Button
                startIcon={<FaXTwitter />}
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
            </Link>
            <Link
              href={"https://www.instagram.com/newstamiltv24x7"}
              target="_blank"
            >
              <Button
                startIcon={<RiInstagramFill />}
                sx={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  fontFamily: "var(--oswald-font)",
                  color: "#fff",
                  bgcolor: "#e2306c",
                  "&:hover": {
                    bgcolor: "#e2306c",
                  },
                }}
              >
                Follow
              </Button>
            </Link>
          </Box>
        </Box>

        {/* <Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
            border={"1px solid #cbcbcb"}
            p={1}
            mt={2}
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
            <Box>
              <Typography
                fontFamily={"var(--arial-font)"}
                className="textWrapper"
                fontSize={20}
                component={"p"}
                fontWeight={"bold"}
              >
                Share :
              </Typography>
            </Box>
            <Box></Box>
            <Box>
              <Image
                fetchPriority="high" 
                rel="preload"
                src={Facebook}
                alt="fb"
                width={24}
                height={24}
                onClick={() => shareNews("fb")}
                
              />
              <Image
                fetchPriority="high" 
                rel="preload"
                src={WhatsApp}
                alt="wp"
                width={31}
                height={31}
                onClick={() => shareNews("wp")}
                
              />
              <Image
                fetchPriority="high" 
                rel="preload"
                src={Instagram}
                alt="insta"
                width={35}
                height={35}
                onClick={() => shareNews("insta")}
                
              />
              <Image
                fetchPriority="high" 
                rel="preload"
                src={Youtube}
                alt="insta"
                width={28}
                height={28}
                onClick={() => shareNews("yt")}
                
              />
            </Box>
            <Box>
              <Image
                fetchPriority="high" 
                rel="preload"
                src={Linkedin}
                alt="insta"
                width={23}
                height={23}
                onClick={() => shareNews("lk")}
                
              />
              <Image
                fetchPriority="high" 
                rel="preload"
                src={Thread}
                alt="insta"
                width={25}
                height={25}
                onClick={() => shareNews("td")}
                style={{
                  filter: mode === "dark" && "invert(1)",
                }}
                
              />
              <Image
                fetchPriority="high" 
                rel="preload"
                src={Twitter}
                alt="insta"
                width={25}
                height={25}
                style={{
                  filter: mode === "dark" && "invert(1)",
                }}
                onClick={() => shareNews("x", photos?.at(0)?.c_photos_title)}
                
              />
              <IoMdMail
                fontSize={28}
                onClick={() => shareNews("mail", photos?.at(0)?.c_photos_title)}
              />
            </Box>
          </Box>
          <Box bgcolor={mode === "dark" ? "#272626" : "#f1f1f1"} my={2}>
            <Box>
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
            </Box>

            <Box
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
              gap={1}
              pb={2}
            >
              <Button
                startIcon={<FaYoutube />}
                sx={{
                  fontSize: 12,
                  color: "#fff",
                  bgcolor: "#ff0302",
                  textTransform: "uppercase",
                  fontFamily: "var(--oswald-font)",
                  "&:hover": {
                    bgcolor: "#ff0302",
                  },
                }}
                onClick={() => shareNews("yt")}
              >
                Subscribe
              </Button>
              <Link
                href={"https://www.facebook.com/newstamiltv24x7"}
                target="_blank"
              >
                <Button
                  startIcon={<FaFacebook />}
                  sx={{
                    color: "#fff",
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
              </Link>
              <Link
                href={"https://www.twitter.com/newstamiltv24x7"}
                target="_blank"
              >
                <Button
                  startIcon={<FaXTwitter />}
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
              </Link>
              <Link
                href={"https://www.instagram.com/newstamiltv24x7"}
                target="_blank"
              >
                <Button
                  startIcon={<RiInstagramFill />}
                  sx={{
                    fontSize: 12,
                    textTransform: "uppercase",
                    fontFamily: "var(--oswald-font)",
                    color: "#fff",
                    bgcolor: "#e2306c",
                    "&:hover": {
                      bgcolor: "#e2306c",
                    },
                  }}
                >
                  Follow
                </Button>
              </Link>
            </Box>
          </Box>
        </Box> */}

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

export default PhotosMobilePage;
