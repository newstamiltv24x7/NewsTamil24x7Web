import MobileCard from "@/commonComponents/MobileCard";
import MobilepageLayout from "@/layouts/MobilepageLayout";
import { useTheme } from "@/theme/ThemeContext";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import { BiLogoTelegram } from "react-icons/bi";
import { IoLogoLinkedin } from "react-icons/io5";
import { sharePhotos } from "@/utils/libs";
import { BsFillThreadsFill } from "react-icons/bs";
import { FaFacebook, FaXTwitter, FaYoutube } from "react-icons/fa6";
import WhatsApp from "../../public/newsTamilIcons/icons/whatsapp.svg";
import Instagram from "../../public/newsTamilIcons/icons/insta.png";

function MainWebStoryPage({ menuData, trendingData,viewControl,breakingControl,quickControl,webStoryData,type  }) {
  // const NewsData = trendingData?.at(0)?.data;
  const { mode } = useTheme();

  const [shareOpen, setShareOpen] = useState(false);
  const [newsId, setNewsId] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const handleSetId = (id) => {
    if (id === newsId) {
      setShareOpen(!shareOpen);
    } else {
      setNewsId(id);
      setShareOpen(true);
    }
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page > 1) {
      GetYoutubePostedVideos();
    }
  }, [page]);

  return (
    <MobilepageLayout menuData={menuData} trendingData={trendingData} breakingControl={breakingControl} quickControl={quickControl} >
      
       <Box mt={breakingControl === "yes" ?  25 : quickControl === "no" ? 25 : 12}>
        <Box p={0.5} pb={1} pt={1.5}>
      <Box
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
          {`WEB STORIES`}
        </Box>
      </Box>
      <Box p={1.5} pb={0} pt={0}>
      <Grid container spacing={1}>
        {Array.isArray(webStoryData) &&
          webStoryData?.map((list) => (
          <Grid item md={12} xs={6} sm={6}>
            <Box key={list?._id} p={0} pt={1} m={0}>
              <Box height={"auto"} border={"1px solid #cbcbcb"}>
                <Link href={`/web-story/${list?.c_web_story_slug_name || list?._id || '#'}`} target="_blank" replace>
                  <Image
                  fetchPriority="high" rel="preload"
                    src={list?.c_web_story_cover_img}
                    alt="newstamil-image"
                    width={800}
                    height={800}
                    loading="lazy"
                    style={{ width: "100%", height: "100%" }}
                    className="photos-photo"
                  />
                </Link>
                <Box
                  bgcolor={"#000"}
                  color={"#fff"}
                  p={2}
                  display={"flex"}
                  justifyContent={"space-between"}
                  position={"relative"}
                  top={-6}
                  alignItems={"center"}
                >
                  <Typography
                    pl={1}
                    // mb={1}
                    fontFamily={"var(--anek-font)"}
                    fontWeight={400}
                    height={40}
                    className="textWrapperTwo"
                    style={{fontSize:"14px"}}
                  >
                    {list?.c_web_story_title}
                  </Typography>

                  <Image
                  fetchPriority="high" rel="preload"
                    src={ShareIcon}
                    alt="share"
                    width={16}
                    height={16}
                    onClick={() => handleSetId(list?._id)}
                  />
                </Box>
              </Box>
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
                  bgcolor={"#e3e2e2"}
                  sx={{
                    button: {
                      cursor: "pointer",
                      p: "0px 8px",
                      fontSize: { xs: 12, sm: 10, md: 12, lg: 14 },
                      fontFamily: "var(--oswald-font)",
                      borderRadius: "4px",
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
                  <FaYoutube
                    color="#ff0302"
                    onClick={() => sharePhotos("yt")}
                  />
                  <FaFacebook
                    color="#3b5999"
                    onClick={() =>
                      sharePhotos(
                        "fb",
                        list?.c_web_story_title,
                        list?.c_web_story_slug_name
                      )
                    }
                  />
                  <Image
                  fetchPriority="high" rel="preload"
                    src={WhatsApp}
                    alt="wp"
                    width={20}
                    height={20}
                    onClick={() =>
                      sharePhotos(
                        "wp",
                        list?.c_web_story_title,
                        list?.c_web_story_slug_name,
                        "mobile"
                      )
                    }
                  />
                  <FaXTwitter
                    color="#121212"
                    onClick={() =>
                      sharePhotos(
                        "x",
                        list?.c_web_story_title,
                        list.c_web_story_slug_name
                      )
                    }
                  />
                  <Image
                  fetchPriority="high" rel="preload"
                    src={Instagram}
                    alt="insta"
                    width={22}
                    height={22}
                    onClick={() => sharePhotos("insta")}
                  />
                  <BsFillThreadsFill
                    color="#000"
                    onClick={() => sharePhotos("td")}
                  />
                  <IoLogoLinkedin
                    color="#0a66c2"
                    onClick={() =>
                      sharePhotos(
                        "lk",
                        list?.c_web_story_title,
                        list.c_web_story_slug_name
                      )
                    }
                  />
                  <BiLogoTelegram
                    color="#2ba5e0"
                    onClick={() =>
                      sharePhotos(
                        "tele",
                        list.c_web_story_title,
                        list.c_web_story_slug_name
                      )
                    }
                  />
                </Box>
              )}
            </Box>
          </Grid>
          ))}
          </Grid>

</Box>


      </Box>
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
      </Box>
    </MobilepageLayout>
  );
}

export default MainWebStoryPage;
