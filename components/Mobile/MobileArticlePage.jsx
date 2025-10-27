import MobileCard from "@/commonComponents/MobileCard";
import MobilepageLayout from "@/layouts/MobilepageLayout";
import { convertTime, shareNews } from "@/utils/libs";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { IoMdMail } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import { FaRegEye, FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { useTheme } from "@/theme/ThemeContext";
import Link from "next/link";

import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";
import Custom404 from "@/pages/404";

function MobileArticlePage({ menuData,trendingData, newsData, singleNews, viewControl, breakingControl,quickControl }) {
  // const NewsData = newsData?.at(0)?.data;
  const { mode } = useTheme();

  const [shareOpen, setShareOpen] = useState(false);
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
    <MobilepageLayout menuData={menuData} trendingData={trendingData} type="mobile" breakingControl={breakingControl} quickControl={quickControl}>

{singleNews?.length === 0 ? (
        <>
        <Custom404 />
        </>
      ) :(
        <>
       <Box mt={breakingControl === "yes" ?  25 : quickControl === "no" ? 20 : 12}> 
     <Box p={0.5} pb={1} pt={2}>
          <Typography
           fontWeight={"bold"}
           bgcolor={"#ff992c"}
           borderRadius={"6px"}
           color={"#000"}
           fontFamily={"var(--anek-font)"}
           textTransform={"uppercase"}
           fontSize={18}
           alignItems={"center"}
           justifyItems={"center"}
           pt={1}
           pb={0.5}
           pl={1}
          >
            {singleNews?.at(0)?.c_category_name}
          </Typography>
          <Typography
            fontFamily={"var(--anek-font)"}
            className=""
            fontSize={20}
            lineHeight={1.5}
            component={"h1"}
            fontWeight={600}
            sx={{ wordBreak: "break-word" }}
          >
            {singleNews?.at(0)?.story_title_name}
          </Typography>
          <Typography
            fontFamily={"var(--anek-font)"}
            className=""
            fontSize={13}
            lineHeight={1.3}
            component={"p"}
            fontWeight={"bold"}
            sx={{
              color: "#fb6002",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            mt={0.5}
          >
            {singleNews?.at(0)?.story_subject_name}
          </Typography>

          <Box
            my={1}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            // gap={2}
            px={1}
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
            fetchPriority="high" rel="preload"
              src={FacebookNew}
              alt="fb"
              width={24}
              height={24}
              onClick={() => shareNews("fb")}
            />
            <Image
            fetchPriority="high" rel="preload"
              src={WhatsAppNew}
              alt="wp"
              width={24}
              height={24}
              onClick={() => shareNews("wp", "mobile")}
            />
            <Image
            fetchPriority="high" rel="preload"
              src={InstagramNew}
              alt="insta"
              width={24}
              height={24}
              onClick={() => shareNews("insta")}
            />
            <Image
            fetchPriority="high" rel="preload"
              src={YoutubeNew}
              alt="insta"
              width={24}
              height={24}
              onClick={() => shareNews("yt")}
            />
            <Image
            fetchPriority="high" rel="preload"
              src={LinkedinNew}
              alt="insta"
              width={24}
              height={24}
              onClick={() => shareNews("lk")}
            />
            <Image
            fetchPriority="high" rel="preload"
              src={ThreadsNew}
              alt="insta"
              width={24}
              height={24}
              onClick={() => shareNews("td")}
              style={{
                filter: mode === "dark" && "invert(1)",
              }}
            />
            <Image
            fetchPriority="high" rel="preload"
              src={TwitterNew}
              alt="insta"
              width={24}
              height={24}
              style={{
                filter: mode === "dark" && "invert(1)",
              }}
              onClick={() =>
                shareNews("x", singleNews?.at(0)?.story_title_name)
              }
            />
            <Image
            fetchPriority="high" rel="preload"
              src={TelegramNew}
              alt="insta"
              width={24}
              height={24}
              style={{
                filter: mode === "dark" && "invert(1)",
              }}
              onClick={() =>
                shareNews("tele", singleNews?.at(0)?.story_title_name)
              }
            />
            <IoMdMail
              fontSize={30}
              onClick={() =>
                shareNews("mail", singleNews?.at(0)?.story_title_name)
              }
            />
          </Box>

          <Box borderRadius={"6px"} overflow={"hidden"} height={"auto"} mb={2}>
            {singleNews?.at(0)?.youtube_embed_id === "" ? (
              <Box borderRadius={"6px"} overflow={"hidden"} py={1}>
                <Image
                fetchPriority="high" rel="preload"
                  src={singleNews?.at(0)?.story_cover_image_url}
                  alt={singleNews?.at(0)?.story_subject_name}
                  // width={100}
                  // height={100}
                  // style={{
                  //   width: "100%",
                  //   height: "auto",
                  //   borderRadius: "6px",
                  // }}
                  width={1200}
            loading="lazy"
            height={800}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "6px",
              cursor: "pointer",
              objectFit: "fill",
            }}
                />
              </Box>
            ) : (
              <Box height={200}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`${
                    singleNews?.at(0)?.youtube_embed_id
                  }?rel=0&amp;autoplay=1&mute=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </Box>
            )}
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              fontFamily={"var(--arial-font)"}
              className=""
              fontSize={13}
              lineHeight={1.3}
              component={"p"}
              fontWeight={400}
              sx={{ opacity: 1 }}
            >
              Updated: {convertTime(singleNews?.at(0)?.updatedAt)}
            </Typography>
            {viewControl === "yes" && 
            <Box
              p={0.5}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={1}
              fontFamily={"var(--anek-font)"}
              fontSize={16}
              fontWeight={600}
            >
              <FaRegEye /> {singleNews?.at(0)?.view_count + 1}
            </Box>
            }
          </Box>
          <Box
            sx={{
              "& div": {
                fontFamily: "var(--anek-font) !important",
                fontSize: "1rem !important",
                lineHeight: "22px !important",
              },
              "& p": {
                fontFamily: "var(--anek-font) !important",
                fontSize: "1rem !important",
                lineHeight: "22px !important",
              },
              "& span": {
                fontFamily: "var(--anek-font) !important",
                fontSize: "1rem !important",
                lineHeight: "22px !important",
              },
              "& iframe": {
                height: "200px !important",
              },
            }}
          >
            <div
              className="news-content"
              dangerouslySetInnerHTML={{
                __html: singleNews?.at(0)?.story_details,
              }}
            ></div>
          </Box>
        </Box>
        <Box
          m={1}
          bgcolor={mode === "dark" ? "#272626" : "#f1f1f1"}
          p={1}
          borderRadius={"6px"}
          // display={"flex"}
          // justifyContent={"space-between"}
          // alignItems={"center"}
          // flexWrap={"wrap"}
        >
          <Button
            sx={{
              textTransform: "capitalize",
              fontSize: 18,
              color: "inherit",
              bgcolor: "transparent",
              "&:hover": {
                bgcolor: "transparent",
              },
              mr: 2,
            }}
          >
            Tags :
          </Button>
          {singleNews?.at(0)?.seo_tag?.map((item, index) => (
            <Link
              key={index}
              href={{
                pathname: `/search`,
                query: {
                  tag: item,
                },
              }}
            >
              <Button
                sx={{
                  textTransform: "lowercase",
                  fontSize: 14,
                  color: "inherit",
                  // bgcolor: "#272626",
                  border: "1px solid #c1c1c1",
                  py: "2px",
                  px: "6px",
                  m: 0.6,
                  fontWeight: 500,
                  bgcolor: mode === "light" && "#f1f1f1",
                  "&:hover": {
                    // bgcolor: "#fb6002",
                    color: "#fb6002",
                  },
                  // mr: 2,
                }}
              >
                {item}
              </Button>
            </Link>
          ))}
        </Box>
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
          fetchPriority="high" rel="preload"
            src={FacebookNew}
            alt="fb"
            width={24}
            height={24}
            onClick={() => shareNews("fb")}
          />
          <Image
          fetchPriority="high" rel="preload"
            src={WhatsAppNew}
            alt="wp"
            width={24}
            height={24}
            onClick={() => shareNews("wp", "mobile")}
          />
          <Image
          fetchPriority="high" rel="preload"
            src={InstagramNew}
            alt="insta"
            width={24}
            height={24}
            onClick={() => shareNews("insta")}
          />
          <Image
          fetchPriority="high" rel="preload"
            src={YoutubeNew}
            alt="insta"
            width={24}
            height={24}
            onClick={() => shareNews("yt")}
          />
          <Image
          fetchPriority="high" rel="preload"
            src={LinkedinNew}
            alt="insta"
            width={24}
            height={24}
            onClick={() => shareNews("lk")}
          />
          <Image
          fetchPriority="high" rel="preload"
            src={ThreadsNew}
            alt="insta"
            width={24}
            height={24}
            onClick={() => shareNews("td")}
            style={{
              filter: mode === "dark" && "invert(1)",
            }}
          />
          <Image
          fetchPriority="high" rel="preload"
            src={TwitterNew}
            alt="insta"
            width={24}
            height={24}
            style={{
              filter: mode === "dark" && "invert(1)",
            }}
            onClick={() => shareNews("x", singleNews?.at(0)?.story_title_name)}
          />
          <Image
          fetchPriority="high" rel="preload"
            src={TelegramNew}
            alt="insta"
            width={24}
            height={24}
            style={{
              filter: mode === "dark" && "invert(1)",
            }}
            onClick={() =>
              shareNews("tele", singleNews?.at(0)?.story_title_name)
            }
          />
          <IoMdMail
            fontSize={30}
            onClick={() =>
              shareNews("mail", singleNews?.at(0)?.story_title_name)
            }
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
        <Box p={1}>
          <Typography
            borderLeft={"4px solid #fb6002"}
            pl={1}
            fontFamily={"var(--arial-font)"}
            fontWeight={700}
            textTransform={"uppercase"}
          >
            Related Stories
          </Typography>
          {Array.isArray(newsData) &&
            newsData.slice(0, 15).map((list) => (
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
        </Box>
      </Box>
        </>
      )}



      
    </MobilepageLayout>
  );
}

export default MobileArticlePage;
