import CommonHeader from "@/commonComponents/CommonHeader";
import {
  Box,
  Button,
  Card,
  CardContent,
  ClickAwayListener,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import HorizontalCard from "@/commonComponents/HorizontalCard";
import BigCard from "@/commonComponents/BigCard";
import { useSelector } from "react-redux";
import {  getHomeCinema, getHomeIN, getHomePolitics } from "@/commonComponents/WebApiFunction/ApiFunctions";
import Link from "next/link";
import { getHours, shareCards } from "@/utils/libs";
import { useTheme } from "@/theme/ThemeContext";
import { FaRegEye } from "react-icons/fa6";
import AdUnit from "../Ads/AdUnit";

import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";

const CryptoJS = require("crypto-js");
const secretPassphrase = `${process.env.NEXT_PUBLIC_DECODER}`;

function MainAdSection({viewControl}) {
  const HomePageNews = useSelector((state) => state.HomePageNewsReducer?.data);
  const FirstCategoryId = HomePageNews?.at(1)?.c_category_id;
  const SecondCategoryId = HomePageNews?.at(2)?.c_category_id;
  const ThirdCategoryId = HomePageNews?.at(3)?.c_category_id;
  const [newsList, setNewsList] = useState([]);
  const [secondNewsList, setSecondNewsList] = useState([]);
  const [thirdNewsList, setThirdNewsList] = useState([]);
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

  const GetFirstCategory = async () => {
    if (HomePageNews?.length > 0) {
      try {
        const body = {
          n_page: 1,
          n_limit: 10,
          main_category_id: FirstCategoryId,
        };
       
        const response = await getHomeIN(body);
        if (response?.payloadJson?.length > 0) {
          const firstNews = CryptoJS.AES.decrypt(response?.payloadJson,secretPassphrase).toString(CryptoJS.enc.Utf8);
          const result = JSON.parse(firstNews);
          // setNewsList(result?.at(0)?.data);
          setNewsList(result?.docs);
        } else {
          // setLoader(false);
          setNewsList([]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const GetSecondCategory = async () => {
    if (HomePageNews?.length > 0) {
      try {
        const body = {
          n_page: 1,
          n_limit: 10,
          main_category_id: SecondCategoryId,
        };
      
        const response = await getHomeCinema(body);
        if (response?.payloadJson?.length > 0) {
          const firstNews = CryptoJS.AES.decrypt(response?.payloadJson,secretPassphrase).toString(CryptoJS.enc.Utf8);
          const result = JSON.parse(firstNews);
          // setSecondNewsList(result?.at(0)?.data);
          setSecondNewsList(result?.docs);
        } else {
          setSecondNewsList([]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const GetThirdCategory = async () => {
    if (HomePageNews?.length > 0) {
      try {
        const body = {
          n_page: 1,
          n_limit: 10,
          main_category_id: ThirdCategoryId,
        };
       
        const response = await getHomePolitics(body);
        if (response?.payloadJson?.length > 0) {
          const firstNews = CryptoJS.AES.decrypt(response?.payloadJson,secretPassphrase).toString(CryptoJS.enc.Utf8);
          const result = JSON.parse(firstNews);
          // setThirdNewsList(result?.at(0)?.data);
          setThirdNewsList(result?.docs);
        } else {
          setThirdNewsList([]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    GetFirstCategory();
    GetSecondCategory();
    GetThirdCategory();
  }, [HomePageNews]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid
          item
          md={3}
          xs={12}
          sm={12}
          display={{ xs: "none", sm: "none", md: "block" }}
        >
          <AdUnit />
        </Grid>
        <Grid item md={6} xs={12} sm={12}>
          <Box pt={1}>
            <CommonHeader
              title={HomePageNews?.at(1)?.c_category_name}
              engTitle={`More ${HomePageNews?.at(1)?.c_category_name} News`}
              url={HomePageNews?.at(1)?.c_category_slug_english_name}
            />
            <Box mt={2}>
              <Card
                sx={{
                  boxShadow: "none",
                  backgroundImage: "none",
                  boxShadow:
                    mode === "dark"
                      ? "0px 0px 4px 0px #fff"
                      : "0px 0px 4px 0px #000",
                }}
              >
                <Box borderRadius={"6px"} overflow={"hidden"}>
                  <Link
                    href={`/article/${
                      newsList?.at(0)?.story_desk_created_name
                    }`}
                  >
                    <Box borderRadius={"6px"} overflow={"hidden"} height={400}>
                      <Image
                      fetchPriority="high" rel="preload"
                        src={newsList?.at(0)?.story_cover_image_url}
                        alt="newstamil-cover-image"
                        width={100}
                        height={400}
                        unoptimized
                        style={{
                          width: "100%",
                          objectFit: "cover",
                          borderRadius: "8px 8px 0 0 ",
                        }}
                      />
                    </Box>
                  </Link>
                </Box>
                <CardContent
                  sx={{
                    pt: 1.4,
                    px: 1,
                    pb: "2px",
                    "&.MuiCardContent-root:last-child": {
                      paddingBottom: 2,
                    },
                  }}
                >
                  <Link
                    href={`/article/${
                      newsList?.at(0)?.story_desk_created_name
                    }`}
                  >
                    <Typography
                      fontFamily={"var(--anek-font)"}
                      className="textWrapper"
                      fontSize={18}
                      lineHeight={1.5}
                      component={"h1"}
                      fontWeight={550}
                    >
                      {newsList?.at(0)?.story_title_name}
                    </Typography>
                    <Typography
                      fontFamily={"var(--anek-font)"}
                      className="textWrapper"
                      fontSize={14}
                      lineHeight={1.5}
                      component={"h2"}
                      fontWeight={400}
                      pt={1.4}
                      height={72}
                    >
                      {newsList?.at(0)?.story_sub_title_name}
                    </Typography>
                  </Link>
                  <Box
                    display={"flex"}
                    gap={1}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    mt={1}
                  >
                    <Typography
                      fontFamily={"var(--anek-font)"}
                      className="textWrapper"
                      fontSize={14}
                      lineHeight={1.3}
                      component={"p"}
                      fontWeight={650}
                      sx={{
                        color: "#fb6002",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {newsList?.at(0)?.story_subject_name}
                    </Typography>
                    <Box
                      display={"flex"}
                      justifyContent={"start"}
                      alignItems={"center"}
                      gap={2}
                      position={"relative"}
                    >
                       {viewControl === "yes" && 
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={1}
                        fontFamily={"var(--anek-font)"}
                        fontSize={14}
                        fontWeight={300}
                      >
                        <FaRegEye
                          style={{
                            opacity: 0.8,
                            position: "relative",
                            top: -1,
                          }}
                        />{" "}
                        {newsList?.at(0)?.view_count}
                      </Box>
                      }
                      <Typography
                        fontFamily={"var(--anek-font)"}
                        className="textWrapper"
                        fontSize={12}
                        lineHeight={1.3}
                        component={"span"}
                        fontWeight={300}
                        // sx={{ color: "#fff" }}
                      >
                        {getHours(newsList?.at(0)?.updatedAt)}
                      </Typography>
                      <Image
                      fetchPriority="high" rel="preload"
                        src={mode === "light" ? DarkShareIcon : ShareIcon}
                        alt="share"
                        width={18}
                        height={18}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSetId(newsList?.at(0)?._id)}
                      />
                      {newsList?.at(0)?._id === newsId && shareOpen && (
                        <ClickAwayListener
                          onClickAway={() => setShareOpen(false)}
                        >
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"flex-start"}
                            // flexDirection={"column"}
                            gap={1}
                            p={1}
                            // height={30}
                            borderRadius={"6px"}
                            position={"absolute"}
                            bottom={10}
                            right={"13%"}
                            bgcolor={"#dedede"}
                            border={"1px solid #fff"}
                            boxShadow={"0px 0px 10px 0px rgba(0,0,0,0.75)"}
                            sx={{
                              "& img": {
                                cursor: "pointer",
                              },
                            }}
                          >
                            <Image
                            fetchPriority="high" rel="preload"
                              src={FacebookNew}
                              alt="fb"
                              width={24}
                              height={24}
                              onClick={() =>
                                shareCards(
                                  "fb",
                                  newsList?.at(0)?.story_desk_created_name
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
                                  newsList?.at(0)?.story_desk_created_name
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
                                  newsList?.at(0)?.story_desk_created_name,
                                  newsList?.at(0)?.story_sub_title_name
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

                            <Image
                            fetchPriority="high" rel="preload"
                              src={TelegramNew}
                              alt="wp"
                              width={24}
                              height={24}
                              onClick={() =>
                                shareCards(
                                  "tele",
                                  newsList?.at(0)?.story_desk_created_name,
                                  newsList?.at(0)?.story_sub_title_name
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
                                  newsList?.at(0)?.story_desk_created_name
                                )
                              }
                            />
                          </Box>
                        </ClickAwayListener>
                      )}
                    </Box>
                  </Box>
                  {/* <Box display={"grid"} sx={{ placeItems: "center" }}>
                    <hr
                      style={{
                        width: "100%",
                        border: "0.5px solid #666666",
                        margin: "16px 0 0px 0",
                      }}
                    />
                  </Box> */}
                </CardContent>
              </Card>
            </Box>
            <>
            {Array.isArray(newsList) &&
              newsList?.slice(1, 6)?.map((list) => (
                <Grid
                  container
                  mt={2}
                  p={1}
                  borderRadius={"8px"}
                  key={list?._id}
                  // border={"1px solid #666666"}
                  sx={{
                    boxShadow:
                      mode === "dark"
                        ? "0px 0px 4px 0px #fff"
                        : "0px 0px 4px 0px #000",
                  }}
                  // boxShadow={"0px 0px 4px 0px rgba(0,0,0,0.75)"}
                >
                  <Grid item md={9} xs={7} pr={{ xs: 1, sm: 1, md: 1 }}>
                    <Link href={`/article/${list?.story_desk_created_name || list?._id || '#'}`}>
                      <Typography
                        fontFamily={"var(--anek-font)"}
                        className="textWrapper"
                        fontSize={18}
                        lineHeight={1.5}
                        component={"h2"}
                        fontWeight={550}
                      >
                        {list?.story_title_name}
                      </Typography>
                      <Box display={{ xs: "none", sm: "none", md: "block" }}>
                        <Typography
                          fontFamily={"var(--anek-font)"}
                          className="textWrapperTwo"
                          fontSize={14}
                          lineHeight={1.5}
                          component={"p"}
                          fontWeight={500}
                          height={42}
                          mt={1}
                        >
                          {list?.story_sub_title_name}
                        </Typography>
                      </Box>
                    </Link>
                    <Box
                      display={"flex"}
                      gap={1}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      mt={1}
                      flexWrap={"wrap"}
                    >
                      <Box>
                        <Typography
                          fontFamily={"var(--anek-font)"}
                          // className="textWrapper"
                          fontSize={14}
                          lineHeight={1.3}
                          component={"p"}
                          fontWeight={650}
                          sx={{
                            color: "#fb6002",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {list?.story_subject_name}
                        </Typography>
                      </Box>
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={2}
                        position={"relative"}
                      >
                         {viewControl === "yes" && 
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          gap={1}
                          fontFamily={"var(--anek-font)"}
                          fontSize={14}
                          fontWeight={300}
                        >
                          <FaRegEye style={{ opacity: 0.8, position: "relative", top: -1 }} />{" "}
                          {list?.view_count}
                        </Box>
                        }
                        <Typography
                          fontFamily={"var(--anek-font)"}
                          className="textWrapper"
                          fontSize={12}
                          lineHeight={1.3}
                          component={"span"}
                          fontWeight={300}
                          // sx={{ color: "#fff" }}
                        >
                          {getHours(list?.updatedAt)}
                        </Typography>
                        <Image
                        fetchPriority="high" rel="preload"
                          src={mode === "light" ? DarkShareIcon : ShareIcon}
                          alt="share"
                          width={18}
                          height={18}
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
                              // flexDirection={"column"}
                              gap={1}
                              p={1}
                              // height={30}
                              borderRadius={"6px"}
                              position={"absolute"}
                              bottom={5}
                              right={"13%"}
                              bgcolor={"#dedede"}
                              border={"1px solid #fff"}
                              boxShadow={"0px 0px 10px 0px rgba(0,0,0,0.75)"}
                              sx={{
                                "& img": {
                                  cursor: "pointer",
                                },
                              }}
                            >
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
                          </ClickAwayListener>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item md={3} xs={5}>
                    <Box
                      height={{ xs: 100, sm: 100, md: "auto" }}
                      borderRadius={"6px"}
                      overflow={"hidden"}
                    >
                      <Link href={`/article/${list?.story_desk_created_name || list?._id || '#'}`}>
                        <Image
                        fetchPriority="high" rel="preload"
                          src={list?.story_cover_image_url}
                          alt="newstamil-cover-image"
                          width={1200}
                          height={300}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      </Link>
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </>
           
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              mt={2}
              bgcolor={mode === "dark" ? "#272626" : "#f1f1f1"}
            >
              <Link
                href={`/news/${
                  HomePageNews?.at(1)?.c_category_slug_english_name
                }`}
              >
                <Button
                  variant="outlined"
                  sx={{
                    border: "1px solid transparent",
                    color: "#fb6002",
                    fontWeight: "bold",
                    "&:hover": {
                      color: mode === "dark" ? "#fff" : "#000 !important",
                      border: "1px solid transparent",
                      bgcolor: "transparent",
                    },
                  }}
                >
                  Read More
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          md={3}
          sm={12}
          xs={12}
          display={{ xs: "none", sm: "none", md: "block" }}
        >
          <Box width={"100%"} height={"100%"} bgcolor={"#c7c7c7"} mt={2}></Box>
        </Grid>
      </Grid>
      <Box mt={6}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12} sm={12}>
            <Box
              position={"relative"}
              className="border-class-category-sep"
              pr={1}
            >
              <CommonHeader
                title={HomePageNews?.at(2)?.c_category_name}
                engTitle={`More ${HomePageNews?.at(2)?.c_category_name} News`}
                url={HomePageNews?.at(2)?.c_category_slug_english_name}
              />
              <Grid container spacing={2} position={"relative"}>
                <Grid item md={6} xs={12} sm={12} mt={2}>
                  <Box pr={3} className="border-class" position={"relative"}>
                    <BigCard list={secondNewsList?.at(0)} type="mainAd" viewControl={viewControl} />
                    <Box display={"grid"} sx={{ placeItems: "center" }}>
                      <hr
                        style={{
                          width: "100%",
                          border: "0.5px solid #666666",
                          margin: "14px 0 0px 4px",
                          opacity: 0.4,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    pr={3}
                    mt={2}
                    className="border-class"
                    position={"relative"}
                  >
                    <BigCard list={secondNewsList?.at(1)} type="mainAd" viewControl={viewControl}/>
                    <Box display={"grid"} sx={{ placeItems: "center" }}>
                      <hr
                        style={{
                          width: "100%",
                          border: "0.5px solid #666666",
                          margin: "14px 0 0px 4px",
                          opacity: 0.4,
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
                {/* <Divider
                orientation="vertical"
                sx={{ position: "absolute", left: "0px" }}
              /> */}
                <Grid
                  item
                  mt={0.8}
                  md={6}
                  xs={12}
                  sm={12}
                  // className="border-class-big"
                  position={"relative"}
                >
                  {Array.isArray(secondNewsList) &&
                    secondNewsList?.slice(2, 8)?.map((list) => (
                      <Box
                        // py={0.94}
                        // className="border-class-two"
                        position={"relative"}
                        pr={2}
                        key={list?._id}
                      >
                        <HorizontalCard list={list} type="mainAd" viewControl={viewControl} />
                        <Box display={"grid"} sx={{ placeItems: "center" }}>
                          <hr
                            style={{
                              width: "100%",
                              border: "0.5px solid #666666",
                              margin: "3px 0 3px 0",
                              opacity: 0.4,
                            }}
                          />
                        </Box>
                      </Box>
                    ))}
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item md={6} xs={12} sm={12}>
            <Box
              position={"relative"}
              className="border-class-category-sep"
              pr={1}
            >
              <CommonHeader
                title={HomePageNews?.at(3)?.c_category_name}
                engTitle={`More ${HomePageNews?.at(3)?.c_category_name} News`}
                url={HomePageNews?.at(3)?.c_category_slug_english_name}
              />
              <Grid container spacing={2} position={"relative"}>
                <Grid item md={6} xs={12} sm={12} mt={2}>
                  <Box pr={3} className="border-class" position={"relative"}>
                    <BigCard list={thirdNewsList?.at(0)} type="mainAd" viewControl={viewControl} />
                    <Box display={"grid"} sx={{ placeItems: "center" }}>
                      <hr
                        style={{
                          width: "100%",
                          border: "0.5px solid #666666",
                          margin: "14px 0 0px 4px",
                          opacity: 0.4,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    pr={3}
                    mt={2}
                    className="border-class"
                    position={"relative"}
                  >
                    <BigCard list={thirdNewsList?.at(1)} type="mainAd"  viewControl={viewControl}/>
                    <Box display={"grid"} sx={{ placeItems: "center" }}>
                      <hr
                        style={{
                          width: "100%",
                          border: "0.5px solid #666666",
                          margin: "14px 0 0px 4px",
                          opacity: 0.4,
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
                {/* <Divider
                orientation="vertical"
                sx={{ position: "absolute", left: "0px" }}
              /> */}
                <Grid
                  item
                  md={6}
                  xs={12}
                  sm={12}
                  mt={0.8}
                  // className="border-class-big"
                  position={"relative"}
                >
                  {Array.isArray(thirdNewsList) &&
                    thirdNewsList?.slice(2, 8)?.map((list) => (
                      <Box
                        // py={0.94}
                        // className="border-class-two"
                        position={"relative"}
                        pr={2}
                        key={list?._id}
                      >
                        <HorizontalCard list={list} type="mainAd" viewControl={viewControl} />
                        <Box display={"grid"} sx={{ placeItems: "center" }}>
                          <hr
                            style={{
                              width: "100%",
                              border: "0.5px solid #666666",
                              margin: "3px 0 3px 0",
                              opacity: 0.4,
                            }}
                          />
                        </Box>
                      </Box>
                    ))}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default MainAdSection;
