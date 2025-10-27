import HorizontalCard from "@/commonComponents/HorizontalCard";
import { convertTime, shareNews, stringAvatar } from "@/utils/libs";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TV from "../../public/newsTamilIcons/icons/tv.svg";
import PlayBtn from "../../public/newsTamilIcons/icons/play-btn.svg";
import Book from "../../public/newsTamilIcons/icons/book-open.svg";
import GoogleNews from "../../public/newsTamilIcons/icons/follow_google_news.png";
import { RiInstagramFill } from "react-icons/ri";
import WhatsAppJoin from "../../public/newsTamilIcons/icons/whatsapp.svg";
import { IoMdMail } from "react-icons/io";

import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";

// Swiper components, modules and styles
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaAnglesRight, FaEye, FaXTwitter } from "react-icons/fa6";
import HomepageLayout from "@/layouts/HomepageLayout";
import { useTheme } from "@/theme/ThemeContext";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  addComent,
  getNewsComment,
  getNewsVisitCount,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import AdUnit from "../Ads/AdUnit";
import dayjs from "dayjs";
import Custom404 from "@/pages/404";

function ArticlePageContainer({
  menuData,
  newsData,
  singleNews,
  youtubeData,
  breakingData,
  quickControl,
  breakingControl,
  viewControl,
  title,
}) {
  const NEWSDATA = singleNews;
  // const NewsArr = newsData?.at(0)?.data;
  const { mode } = useTheme();
  const EndUserData = useSelector((state) => state.UserDataReducer?.data);
  const [comment, setComment] = useState("");
  const navigate = useRouter();
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const [toast, setToast] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [device, setDevice] = useState("");

  const handleChange = (e) => {
    const checkUser = Object.entries(EndUserData).length;
    if (checkUser) {
      setComment(e.target.value);
    } else {
      navigate.push(`/login`);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleAddComment = async () => {
    const token = EndUserData?.tokenAccess ?? "";
    if (comment === "") {
      alert("Please enter a comment");
    } else {
      const body = {
        story_id: NEWSDATA?.story_id,
        c_user_comment: comment,
      };
      try {
        const results = await addComent(body, token);
        if (results?.appStatusCode !== 0) {
          setOpen(true);
          setComment("");
          setToast(results?.message);
        } else {
          setOpen(true);
          setToast("🎉 Thanks for your comment!");
          setComment("");
          GetAllComment();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const GetAllComment = async () => {
    try {
      const result = await getNewsComment(NEWSDATA?.at(0)?.story_id);
      if (result.appStatusCode === 0) {
        setAllComments(result.payloadJson);
      } else {
        setAllComments([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetAllComment();
    GetNewsCount();
  }, [singleNews]);

  const GetNewsCount = async () => {
    try {
      const body = {
        c_story_id: singleNews?.at(0)?.story_id,
      };
      const results = await getNewsVisitCount(body);
    } catch (err) {
      console.log(err,"RRRORORORO");
    }
  };

  useEffect(() => {
    setFlag(true);
    setDevice(localStorage.getItem("_id"));
  }, []);

  // useEffect(() => {
  //   flag && device !== "" && GetNewsCount();
  // }, [flag, device]);

  return (
    <HomepageLayout
      menuData={menuData}
      breakingData={breakingData}
      quickControl={quickControl}
      breakingControl={breakingControl}
      viewControl={viewControl}
    >

      {singleNews?.length === 0 ? (
        <>
        <Custom404 />
        </>
      ) :(
        <>
         <Box bgcolor={mode === "light" ? "#3E3E3E54" : "#c1c1c1a1"}>
        <Box
          maxWidth={1440}
          width={"100%"}
          mx={{ md: "inherit", lg: "auto" }}
          px={2}
        >
          <Typography
            fontFamily={"var(--anek-font)"}
            fontSize={16}
            lineHeight={1.3}
            component={"span"}
            fontWeight={400}
            py={1}
            // sx={{ color: "#fff" }}
          >
            <Link href={"/"}>Home</Link>{" "}
            <FaAnglesRight
              style={{ position: "relative", top: 3, paddingLeft: 6 }}
            />{" "}
            {singleNews?.at(0)?.story_desk_created_name?.split("/")?.at(0)}
            <FaAnglesRight
              style={{ position: "relative", top: 3, paddingLeft: 6 }}
            />{" "}
            {/* {singleNews
              ?.at(0)
              ?.story_desk_created_name?.split("/")
              ?.at(1)
              ?.replaceAll("-", " ")} */}
            <span
              style={{ color: mode === "light" && "#000", fontWeight: 600 }}
            >
              {title}
            </span>
          </Typography>
        </Box>
      </Box>
      <Box
        mt={2}
        maxWidth={1440}
        width={"100%"}
        mx={{ md: "inherit", lg: "auto" }}
        px={2}
      >
        <Grid container spacing={0}>
          <Grid
            item
            md={3}
            xs={12}
            sm={12}
            display={{ xs: "none", sm: "none", md: "block" }}
          >
            <Box position={"sticky"} top={170}>
              <Box border={"1px solid #666666"} p={2} borderRadius={"8px"}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mb={1}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    gap={1}
                  >
                    <Image  fetchPriority="high" rel="preload" src={TV} alt="tv" width={30} height={30} />
                    <Typography
                      fontFamily={"var(--anek-font)"}
                      fontSize={18}
                      component={"p"}
                      textTransform={"uppercase"}
                      fontWeight={"bold"}
                    >
                      Also Watch
                    </Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={1}
                  >
                    <div
                      className="custom-button-prev"
                      style={{ cursor: "pointer" }}
                    >
                      {/* <Image 
                      fetchPriority="high" 
                      rel="preload"
                        src={LeftArrow}
                        alt="left"
                        width={24}
                        height={24}
                      /> */}
                      <FiArrowLeftCircle fontSize={24} color="#fb6002" />
                    </div>
                    <div
                      className="custom-button-next"
                      style={{ cursor: "pointer" }}
                    >
                      {/* <Image 
                      fetchPriority="high" 
                      rel="preload"
                        src={RightArrow}
                        alt="left"
                        width={24}
                        height={24}
                      /> */}
                      <FiArrowRightCircle fontSize={24} color="#fb6002" />
                    </div>
                  </Box>
                </Box>

                <Swiper
                  autoplay={true}
                  loop={true}
                  modules={[Autoplay, Navigation, Pagination]}
                  slidesPerView={1}
                  spaceBetween={20}
                  navigation={{
                    prevEl: ".custom-button-prev",
                    nextEl: ".custom-button-next",
                  }}
                >
                  {Array.isArray(youtubeData) &&
                    youtubeData?.slice(0, 10)?.map((list) => (
                      <SwiperSlide key={list?._id}>
                        <Box>
                          <Link href={list.c_url_link} target="_blank">
                            <Box position={"relative"} height={180}>
                              <Image 
                              fetchPriority="high" 
                              rel="preload"
                                src={list?.c_thumbanail_image}
                                alt={list?.c_url_title}
                                width={1200}
                                height={900}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  borderRadius: "6px",
                                  objectFit: "fill",
                                }}
                              />
                              <Image 
                              fetchPriority="high" 
                              rel="preload"
                                src={PlayBtn}
                                alt="button"
                                width={32}
                                height={56}
                                style={{
                                  cursor: "pointer",
                                  position: "absolute",
                                  left: 10,
                                  bottom: 10,
                                }}
                              />
                            </Box>
                            <Typography
                              fontFamily={"var(--anek-font)"}
                              className="textWrapper"
                              fontSize={14}
                              lineHeight={1.3}
                              component={"h1"}
                              fontWeight={550}
                              sx={{ wordBreak: "break-word" }}
                              pt={1}
                            >
                              {list?.c_url_title}
                            </Typography>
                          </Link>
                        </Box>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </Box>
              <Box
                border={"1px solid #666666"}
                p={2}
                borderRadius={"8px"}
                my={1}
              >
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mb={1}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    gap={1}
                  >
                    <Image 
                    fetchPriority="high" 
                    rel="preload" src={Book} alt="tv" width={30} height={30} />
                    <Typography
                      fontFamily={"var(--arial-font)"}
                      fontSize={18}
                      component={"p"}
                      fontWeight={"bold"}
                      textTransform={"uppercase"}
                    >
                      Read this
                    </Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={1}
                  >
                    <div
                      className="custom-button-prev2"
                      style={{ cursor: "pointer" }}
                    >
                      <FiArrowLeftCircle fontSize={24} color="#fb6002" />
                    </div>
                    <div
                      className="custom-button-next2"
                      style={{ cursor: "pointer" }}
                    >
                      <FiArrowRightCircle fontSize={24} color="#fb6002" />
                    </div>
                  </Box>
                </Box>

                <Swiper
                  autoplay={true}
                  loop={true}
                  modules={[Autoplay, Navigation, Pagination]}
                  slidesPerView={1}
                  spaceBetween={20}
                  navigation={{
                    prevEl: ".custom-button-prev2",
                    nextEl: ".custom-button-next2",
                  }}
                >
                  {Array.isArray(newsData) &&
                    newsData.map((list) => (
                      <SwiperSlide key={list?._id}>
                        <Box>
                          <Box
                            borderRadius={"6px"}
                            overflow={"hidden"}
                            height={180}
                          >
                            <Link
                              href={`/article/${list?.story_desk_created_name}`}
                            >
                              <Image 
                              fetchPriority="high" 
                              rel="preload"
                                src={list?.story_cover_image_url}
                                alt={list?.news_image_caption}
                                width={1200}
                                height={800}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  borderRadius: "6px",
                                  objectFit: "fill",
                                }}
                              />
                            </Link>
                          </Box>
                          <Link
                            href={`/article/${list?.story_desk_created_name}`}
                          >
                            <Typography
                              fontFamily={"var(--anek-font)"}
                              className="textWrapper"
                              fontSize={14}
                              lineHeight={1.3}
                              component={"h1"}
                              fontWeight={550}
                              sx={{ wordBreak: "break-word" }}
                              mt={1}
                            >
                              {list?.story_title_name}
                            </Typography>
                          </Link>
                        </Box>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </Box>
            </Box>
          </Grid>
          <Grid item md={6} xs={12} sm={12}>
            <Box px={2}>
              <Typography
                fontFamily={"var(--anek-font)"}
                className=""
                fontSize={24}
                lineHeight={1.5}
                component={"h1"}
                fontWeight={600}
                sx={{ wordBreak: "break-word", userSelect: "none" }}
              >
                {NEWSDATA?.at(0)?.story_title_name}
              </Typography>
              <Box
                mt={1}
                display={"flex"}
                justifyContent={"flex-start"}
                gap={2}
                alignItems={"center"}
                flexWrap={"wrap"}
              >
                <Typography
                  fontFamily={"var(--anek-font)"}
                  className=""
                  fontSize={18}
                  lineHeight={1.3}
                  component={"h2"}
                  fontWeight={"bold"}
                  sx={{
                    color: "#fb6002",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    userSelect: "none",
                  }}
                >
                  {NEWSDATA?.at(0)?.story_subject_name}
                </Typography>
                <Typography
                  fontFamily={"var(--arial-font)"}
                  className=""
                  fontSize={12}
                  lineHeight={1.3}
                  component={"p"}
                  fontWeight={400}
                >
                  Updated: {convertTime(NEWSDATA?.at(0)?.updatedAt)}
                </Typography>
                {viewControl === "yes" && 
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{ opacity: 0.5 }}
                  fontSize={16}
                  fontFamily={"var(--anek-font)"}
                >
                    <FaEye style={{ marginRight: "4px" }} />
                    {NEWSDATA?.at(0)?.view_count + 1}
                </Box>
                  }
              </Box>
              <Box my={1}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mb={1}
                  gap={1}
                  flexWrap={"wrap"}
                  border={"1px solid #cbcbcb"}
                  p={1}
                  borderRadius={"6px"}
                >
                  <Box width={100}>
                  <Link
                    href={"https://news.google.com/publications/CAAqBwgKMK7avwswu_XWAw?ceid=IN:ta&oc=3"}
                    target="_blank"
                  >
                    <Image 
                    fetchPriority="high" 
                    rel="preload"
                      src={GoogleNews}
                      alt="google-icon"
                      width={1200}
                      height={900}
                      loading="lazy"
                      style={{ width: "100%", height: "100%" }}
                    />
                    </Link>
                  </Box>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={1}
                    sx={{
                      img: {
                        cursor: "pointer",
                      },
                      "img:hover": {
                        transform: "scale(1.1)",
                        filter: "drop-shadow(0px 0px 3px #fff)",
                      },
                    }}
                  >
                    <Typography
                      fontFamily={"var(--anek-font)"}
                      className="textWrapper"
                      fontSize={14}
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
                      width={22}
                      height={22}
                      onClick={() => shareNews("fb")}
                    />
                    <Image 
                    fetchPriority="high" 
                    rel="preload"
                      src={WhatsAppNew}
                      alt="wp"
                      width={22}
                      height={22}
                      onClick={() => shareNews("wp")}
                    />
                    <Image 
                    fetchPriority="high" 
                    rel="preload"
                      src={InstagramNew}
                      alt="insta"
                      width={22}
                      height={22}
                      onClick={() => shareNews("insta")}
                    />
                     <Image 
                     fetchPriority="high" 
                     rel="preload"
                      src={TelegramNew}
                      alt="telegrams"
                      width={22}
                      height={22}
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
                      width={22}
                      height={22}
                      onClick={() => shareNews("yt")}
                    />
                    <Image 
                    fetchPriority="high" 
                    rel="preload"
                      src={LinkedinNew}
                      alt="insta"
                      width={22}
                      height={22}
                      onClick={() => shareNews("lk")}
                    />
                    <Image 
                    fetchPriority="high" 
                    rel="preload"
                      src={ThreadsNew}
                      alt="insta"
                      width={22}
                      height={22}
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
                      width={22}
                      height={22}
                      style={{
                        filter: mode === "dark" && "invert(1)",
                      }}
                      onClick={() =>
                        shareNews("x", NEWSDATA?.at(0)?.story_title_name)
                      }
                    />
                  </Box>
                  <Link
                    href={
                      "https://www.whatsapp.com/channel/0029Va4vPaK2kNFqBXHBgy2t"
                    }
                    target="_blank"
                  >
                    <Button
                      endIcon={
                        <Image 
                        fetchPriority="high" 
                        rel="preload"
                          src={WhatsAppJoin}
                          alt="google"
                          width={100}
                          height={30}
                          style={{ width: "100%", height: "auto" }}
                        />
                      }
                      sx={{
                        color: "#fff",
                        textTransform: "capitalize",
                        fontWeight: 700,
                        bgcolor: "#368a41",
                        "&:hover": {
                          bgcolor: "#368a41",
                          boxShadow:
                            mode === "light"
                              ? "0px 0px 10px 0px rgba(0,0,0,0.75)"
                              : "0px 0px 10px 0px rgba(255,255,255,0.75)",
                        },
                        fontSize: 13,
                      }}
                    >
                      Join our whatsapp channel
                    </Button>
                  </Link>
                </Box>

                <Box
                  borderRadius={"6px"}
                  overflow={"hidden"}
                  height={378}
                  mb={2}
                >
                  {NEWSDATA?.at(0)?.youtube_embed_id === "" ? (
                    <Image 
                    fetchPriority="high" 
                    rel="preload"
                      src={NEWSDATA?.at(0)?.story_cover_image_url}
                      alt={NEWSDATA?.at(0)?.news_image_caption}
                      width={1200}
                      height={800}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "6px",
                      }}
                    />
                  ) : (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`${
                        NEWSDATA?.at(0)?.youtube_embed_id
                      }?rel=0&amp;autoplay=1&mute=1`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  )}
                </Box>

                {/* <Box
                  // bgcolor={"#212121"}
                  borderRadius={"8px"}
                  border={"1px solid #666666a1"}
                  p={1}
                  my={1}
                >
                  {List.map((list, index) => (
                    <li className="article-list" key={index}>
                      {list}
                    </li>
                  ))}
                </Box> */}
                <Box
                  sx={{
                    "& div": {
                      fontFamily: "var(--anek-font) !important",
                      fontSize: "1.1rem",
                      fontWeight: 400,
                    },
                    "& p": {
                      fontFamily: "var(--anek-font) !important",
                      fontSize: "1.1rem",
                      fontWeight: 400,
                    },
                    "& span": {
                      fontFamily: "var(--anek-font) !important",
                      fontSize: "1.1rem",
                      fontWeight: 400,
                    },
                    userSelect: "none",
                  }}
                >
                  <div
                    className="news-content"
                    dangerouslySetInnerHTML={{
                      __html: singleNews?.at(0)?.story_details,
                    }}
                  ></div>
                </Box>
                <Box mt={2}>
                  <AdUnit />
                </Box>
                <Box
                  mb={1}
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
                      color: mode === "dark" ? "#f1f1f1" : "#272626",
                      bgcolor: "transparent",
                      "&:hover": {
                        bgcolor: "transparent",
                      },
                      mr: 2,
                    }}
                  >
                    Tags :
                  </Button>
                  {NEWSDATA?.at(0)?.seo_tag?.map((item, index) => (
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
                          color: mode === "dark" ? "#f1f1f1" : "#272626",
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
                  {/* {["Tags :", "Madurai", "Meenakshi Temple"]?.map(
                    (list, index) => (
                      <Button
                        key={index}
                        sx={{
                          textTransform: "capitalize",
                          fontSize: 18,
                          color: "inherit",
                          bgcolor: index !== 0 ? "#272626" : "transparent",
                          "&:hover": {
                            bgcolor: index !== 0 ? "#272626" : "transparent",
                          },
                          mr: 2,
                        }}
                      >
                        {list}
                      </Button>
                    )
                  )} */}
                </Box>
                <Box>
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
                  <Box bgcolor={mode === "dark" ? "#272626" : "#f1f1f1"} my={2}>
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
                      புதிய செய்திகளுக்கு நியூஸ் தமிழ் 24x7 சேனலை SUBSCRIBE
                      செய்யுங்கள்
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
                  <Box my={2} textAlign={"center"}>
                    <TextField
                      size="large"
                      multiline
                      rows={1}
                      fullWidth
                      sx={{
                        bgcolor: "#fff",
                        "& textarea": {
                          color: "#666666",
                        },
                        borderRadius: "8px",
                      }}
                      placeholder="Share your thoughts"
                      onChange={handleChange}
                      value={comment}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // Prevents new line creation
                          handleAddComment(); // Call the function to add comment
                        }
                      }}
                    />

                    <Button
                      sx={{
                        my: 2,
                        color: "#ebebeb",
                        bgcolor: "#666666",
                        "&:hover": {
                          bgcolor: "#666666",
                        },
                      }}
                      onClick={handleAddComment}
                    >
                      Post a comment
                    </Button>
                  </Box>
                </Box>
              </Box>
              {Array.isArray(allComments) && allComments.length > 0 && (
                <Box bgcolor={"#f1f1f1"}>
                  <Typography
                    fontSize={16}
                    fontWeight={600}
                    py={1.4}
                    pl={1}
                    borderBottom={"1px solid #cbcbcb"}
                  >
                    COMMENTS
                  </Typography>
                  {Array.isArray(allComments) &&
                    allComments.map((list) => (
                      <Box
                        display={"flex"}
                        justifyContent={"flex-start"}
                        alignItems={"baseline"}
                        mt={2}
                        gap={1}
                        px={1}
                        key={list?._id}
                      >
                        <Box>
                          <Avatar
                            sx={{ textTransform: "uppercase" }}
                            {...stringAvatar(`${list?.user_name}`)}
                          >
                            {list?.user_name?.at(0)}
                            {list?.user_name?.split(" ")?.at(1)?.at(0)}
                          </Avatar>
                        </Box>
                        <Box position={"relative"} top={-10} width={"100%"}>
                          <Typography
                            fontSize={15}
                            fontWeight={600}
                            fontFamily={"var(--anek-font)"}
                          >
                            {`${list?.user_name}`}
                          </Typography>
                          <Typography
                            fontSize={12}
                            fontWeight={400}
                            fontFamily={"var(--anek-font)"}
                          >
                            {list?.c_user_comment}
                          </Typography>
                        </Box>
                        <Box fontSize={12} textAlign={"right"} width={"100%"}>
                          {dayjs(list?.createdAt).format(
                            "MMM DD, YYYY  hh:mm A"
                          )}
                        </Box>
                      </Box>
                    ))}
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item md={3} xs={12} sm={12}>
            <Box position={"sticky"} top={170}>
              <Typography
                component={"h5"}
                textTransform={"uppercase"}
                fontWeight={"bold"}
                borderLeft={"4px solid #fb6002"}
                mb={2}
                pl={"4px"}
              >
                Recent News
              </Typography>
              {Array.isArray(newsData) &&
                newsData?.slice(0, 8)?.map((list) => (
                  <React.Fragment key={list._id}>
                    <HorizontalCard list={list} viewControl={viewControl} />
                    <Box display={"grid"} sx={{ placeItems: "center" }}>
                      <hr
                        style={{
                          width: "100%",
                          border:
                            mode === "dark"
                              ? "0.5px solid #f1f1f1"
                              : "0.5px solid #000",
                          margin: "0px 0 6px 0",
                        }}
                      />
                    </Box>
                  </React.Fragment>
                ))}
            </Box>
          </Grid>
        </Grid>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message={toast}
          // action={action}
        />
      </Box>


        </>
      )}

     
     
    </HomepageLayout>
  );
}

export default ArticlePageContainer;
