import {
  Box,
  ClickAwayListener,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import Link from "next/link";
import { getHours, shareCards } from "@/utils/libs";
import { useTheme } from "@/theme/ThemeContext";
import { FaChevronLeft, FaChevronRight, FaRegEye } from "react-icons/fa6";
import AdUnit from "../Ads/AdUnit";
import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";
import CommonHeader from "@/commonComponents/CommonHeader";

function BannerRightSection({ trendingData, liveData, loading, trendLoading, viewControl }) {
  const { mode } = useTheme();

  const [shareOpen, setShareOpen] = React.useState(false);
  const [newsId, setNewsId] = React.useState("");

  const handleSetId = (id) => {
    if (id === newsId) {
      setShareOpen(!shareOpen);
    } else {
      setNewsId(id);
      setShareOpen(true);
    }
  };
const [current, setCurrent] = useState(0);
const intervalRef = useRef(null);
  const goPrev = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const goNext = () => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

    const images = [
  {alt:"Cine Snacks",image:"https://res.cloudinary.com/dnttrjr2x/image/upload/v1764738184/CINE-SNACKS_dica3m.jpg",url:"https://www.youtube.com/playlist?list=PLRn1jCNh27ChrEdKka8CpSVJmg0zHO4an"},
  {alt:"Spot Light",image:"https://res.cloudinary.com/dnttrjr2x/image/upload/v1764738184/SPOTLIGHT_ndmg9p.jpg",url:"https://www.youtube.com/playlist?list=PLRn1jCNh27CgTt7cgU3fQ4gss5nfWVtUG"},
  {alt:"ARVR",image:"https://res.cloudinary.com/dnttrjr2x/image/upload/v1764738184/AR-VR_y83asr.jpg",url:"https://www.youtube.com/playlist?list=PLRn1jCNh27ChvCb2Mlu-E40meHQEm2q-r"},
{alt:"News Focus",image:"https://res.cloudinary.com/dnttrjr2x/image/upload/v1764738184/TOP-STORIES_jqoaes.jpg",url:"https://www.youtube.com/playlist?list=PLRn1jCNh27ChtH2xNJC1zW2sW9QnDpbya"},
  {alt:"Nigazhthagavu",image:"https://res.cloudinary.com/dnttrjr2x/image/upload/v1764738184/NIGAZHTHAGAVU_hwinpu.jpg",url:"https://www.youtube.com/playlist?list=PLRn1jCNh27CieyLWFltaxSeTqmbfVqgh0"},
{alt:"Kazhugu",image:"https://res.cloudinary.com/dnttrjr2x/image/upload/v1764738183/KAZHUGU_hvp9ge.jpg",url:"https://www.youtube.com/playlist?list=PLRn1jCNh27ChU2d2FxnH81NgW48SPz6Ev"},
];

useEffect(() => {
    // Start the interval on mount
    intervalRef.current = setInterval(goNext, 3000); // Change 3000 to desired ms
    // Clean up on unmount
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [images.length]);
  return (
    <Box>
      <Box display={{ xs: "none", sm: "none", md: "block" }}>
        {/* <Box width={"100%"} height={190}>
          {loading ? (
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={190}
              sx={{ bgcolor: "#c7c7c7" }}
            />
          ) : (
            <iframe
              width="100%"
              height="100%"
              src={`${liveData?.c_url_web_link}?rel=0&amp;autoplay=1&mute=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
        </Box> */}
        <CommonHeader
                            title="Special Programmes"
                            engTitle=""
                            url="#"
                          />
         <Box style={{ minWidth: 0, position: "relative"}}><Link href={images[current].url}>
  <img
    src={images[current].image}
    alt="Live event"
    style={{ width: "100%", height: "100%",borderRadius:"10px" }}
  /></Link>
  <Box
    style={{
      position: "absolute",
      right: 20,
      bottom: 10,
      display: "flex",
      gap: 8, // spacing between buttons
    }}
  >
    <IconButton
      onClick={goPrev}
      style={{ background: "rgba(255,255,255,0.6)" }}
      aria-label="previous"
    >
      <FaChevronLeft />
    </IconButton>
    <IconButton
      onClick={goNext}
      style={{ background: "rgba(255,255,255,0.6)" }}
      aria-label="next"
    >
      <FaChevronRight />
    </IconButton>
  </Box>
</Box>
      </Box>

      <Box mt={2}>
        <Box>
          <Typography
            fontFamily={"var(--anek-font)"}
            className="textWrapper"
            fontSize={26}
            lineHeight={1.3}
            p={0.5}
            borderRadius={"8px"}
            component={"p"}
            fontWeight={700}
            sx={{ color: "#fb6002" }}
            textAlign={"center"}
            bgcolor={"#272626"}
            textTransform={"uppercase"}
          >
            Trending News
          </Typography>
        </Box>
        {trendLoading &&
          [0, 1, 2, 3, 4, 5].map((list) => (
            <Skeleton
              key={list}
              variant="rectangular"
              width={"100%"}
              height={120}
              sx={{ bgcolor: "#cbcbcb", my: 1 }}
            />
          ))}
        {!trendLoading &&
          trendingData?.map((list) => (
            <React.Fragment key={list?._id}>
              <Grid container spacing={1} mt={"2px"} position={"relative"}>
                <Grid item xs={8} pr={1}>
                  <Typography
                    fontFamily={"var(--anek-font)"}
                    className="textWrapper"
                    fontSize={14}
                    lineHeight={1.35}
                    component={"h2"}
                    fontWeight={550}
                    height={54}
                  >
                    <Link href={`/article/${list?.story_desk_created_name}`}>
                      {list?.story_title_name}
                    </Link>
                  </Typography>

                  <Box
                    display={"flex"}
                    gap={1}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    mt={"7px"}
                  >
                    { viewControl === "yes" && 
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap={1}
                      fontFamily={"var(--anek-font)"}
                      fontSize={14}
                      fontWeight={300}
                      sx={{ opacity: 1 }}
                    >
                      <FaRegEye
                        style={{ opacity: 0.8, position: "relative", top: -1 }}
                      />{" "}
                      {list?.view_count}
                    </Box>
                    }


                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap={1}
                    >
                      <Typography
                        fontFamily={"var(--anek-font)"}
                        className="textWrapper"
                        fontSize={12}
                        lineHeight={1.3}
                        component={"span"}
                        fontWeight={300}
                      >
                        {getHours(list?.updatedAt)}
                      </Typography>
                      <Image
                      fetchPriority="high" rel="preload"
                        src={mode === "light" ? DarkShareIcon : ShareIcon}
                        alt="share"
                        width={16}
                        height={16}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSetId(list?._id)}
                      />
                      {list?._id === newsId && shareOpen && (
                        <ClickAwayListener
                          onClickAway={() => setShareOpen(false)}
                        >
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"flex-start"}
                            flexDirection={"column"}
                            gap={1}
                            p={1}
                            // height={30}
                            borderRadius={"6px"}
                            position={"absolute"}
                            bottom={5}
                            left={"18%"}
                            bgcolor={"#dedede"}
                            border={"1px solid #fff"}
                            boxShadow={"0px 0px 10px 0px rgba(0,0,0,0.75)"}
                            sx={{
                              "& img": {
                                cursor: "pointer",
                              },
                            }}
                          >
                            <Box display={"flex"} gap={1}>
                              <Image
                              fetchPriority="high" rel="preload"
                                src={FacebookNew}
                                alt="fb"
                                width={24}
                                height={24}
                                onClick={() =>
                                  shareCards(
                                    "fb",
                                    list?.story_desk_created_name
                                  )
                                }
                              />
                              <Image
                              fetchPriority="high" rel="preload"
                                src={WhatsAppNew}
                                alt="wp"
                                width={24}
                                height={24}
                                onClick={() =>
                                  shareCards(
                                    "wp",
                                    list?.story_desk_created_name
                                  )
                                }
                              />
                              <Image
                              fetchPriority="high" rel="preload"
                                src={TwitterNew}
                                alt="wp"
                                width={24}
                                height={24}
                                onClick={() =>
                                  shareCards(
                                    "x",
                                    list?.story_desk_created_name,
                                    list?.story_sub_title_name
                                  )
                                }
                              />
                              <Image
                              fetchPriority="high" rel="preload"
                                src={YoutubeNew}
                                alt="wp"
                                width={24}
                                height={24}
                                onClick={() => shareCards("yt")}
                              />
                            </Box>
                            <Box display={"flex"} gap={1}>
                              <Image
                              fetchPriority="high" rel="preload"
                                src={TelegramNew}
                                alt="wp"
                                width={24}
                                height={24}
                                onClick={() =>
                                  shareCards(
                                    "tele",
                                    list?.story_desk_created_name,
                                    list?.story_sub_title_name
                                  )
                                }
                              />
                              <Image
                              fetchPriority="high" rel="preload"
                                src={InstagramNew}
                                alt="wp"
                                width={24}
                                height={24}
                                onClick={() => shareCards("insta")}
                              />
                              <Image
                              fetchPriority="high" rel="preload"
                                src={ThreadsNew}
                                alt="wp"
                                width={24}
                                height={24}
                                onClick={() => shareCards("td")}
                              />
                              <Image
                              fetchPriority="high" rel="preload"
                                src={LinkedinNew}
                                alt="wp"
                                width={24}
                                height={24}
                                onClick={() =>
                                  shareCards(
                                    "lk",
                                    list?.story_desk_created_name
                                  )
                                }
                              />
                            </Box>
                          </Box>
                        </ClickAwayListener>
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box borderRadius={"6px"} overflow={"hidden"}>
                    <Link href={`/article/${list?.story_desk_created_name}`}>
                      <Image
                      fetchPriority="high" rel="preload"
                        src={list?.story_cover_image_url}
                        alt="newstamil-banner-image"
                        width={1200}
                        height={400}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "80px",
                          objectFit: "contain",
                          borderRadius: "6px",
                        }}
                      />
                    </Link>
                  </Box>
                </Grid>
              </Grid>
              <Box display={"grid"} sx={{ placeItems: "center" }}>
                <hr
                  style={{
                    width: "100%",
                    border: "0.5px solid #666666",
                    margin: "0px 0 0px 0",
                    opacity: 0.4,
                  }}
                />
              </Box>
            </React.Fragment>
          ))}
      </Box>
      <Box mt={2}>
        <AdUnit />
        <AdUnit />
        <AdUnit />
      </Box>
    </Box>
  );
}

export default BannerRightSection;
