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

function MainAdSection({viewControl, orderedMenu = []}) {
  const FirstCategoryId = orderedMenu?.at(1)?.c_category_id;
  const SecondCategoryId = orderedMenu?.at(2)?.c_category_id;
  const ThirdCategoryId = orderedMenu?.at(3)?.c_category_id;
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
    if (!FirstCategoryId) return;
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
        setNewsList(result?.docs);
      } else {
        setNewsList([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const GetSecondCategory = async () => {
    if (!SecondCategoryId) return;
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
        setSecondNewsList(result?.docs);
      } else {
        setSecondNewsList([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const GetThirdCategory = async () => {
    if (!ThirdCategoryId) return;
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
        setThirdNewsList(result?.docs);
      } else {
        setThirdNewsList([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetFirstCategory();
    GetSecondCategory();
    GetThirdCategory();
  }, [FirstCategoryId]);

  return (
    <Box>
      <Box 
        display={"flex"}
        alignItems={"flex-start"}
        gap={2}
        flexDirection={{ xs: "column", sm: "column", md: "row" }}
      >
        <Box flex={1} minWidth={0}>
          <Box
            pt={1}
            paddingRight={3}
            height={{ xs: "auto", sm: "auto", md: 450 }}
            display={"flex"}
            flexDirection={"column"}
          >
            <CommonHeader
              title={orderedMenu?.at(1)?.c_category_name}
              engTitle={`More ${orderedMenu?.at(1)?.c_category_name} News`}
              url={orderedMenu?.at(1)?.c_category_slug_english_name}
            />
            <Box
              mt={2}
              flex={1}
              minHeight={0}
              display={"grid"}
              gridTemplateColumns={{ xs: "1fr", sm: "1fr", md: "0.9fr 1.1fr" }}
              gap={1}
              alignItems={"stretch"}
            >
              <Card
                sx={{
                  boxShadow:
                    mode === "dark"
                      ? "0px 0px 4px 0px #fff"
                      : "0px 0px 4px 0px #000",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 0,
                }}
              >
                <Link
                  href={`/article/${
                    newsList?.at(0)?.story_desk_created_name || newsList?.at(0)?._id || "#"
                  }`}
                >
                  <Box borderRadius={"6px"} overflow={"hidden"} height={{ xs: 220, md: 320 }}>
                    <Image
                      priority
                      src={newsList?.at(0)?.story_cover_image_url || "/assets/images/default-news.png"}
                      alt="newstamil-cover-image"
                      width={1200}
                      height={600}
                      unoptimized
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Link>
                <CardContent sx={{ px: 0.8, py: 1, "&.MuiCardContent-root:last-child": { pb: 1.2 } }}>
                  <Link
                    href={`/article/${
                      newsList?.at(0)?.story_desk_created_name || newsList?.at(0)?._id || "#"
                    }`}
                  >
                    <Typography
                      fontFamily={"var(--anek-font)"}
                      fontSize={18}
                      lineHeight={1.4}
                      component={"h2"}
                      fontWeight={600}
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {newsList?.at(0)?.story_title_name}
                    </Typography>
                  </Link>
                  <Typography
                    fontFamily={"var(--anek-font)"}
                    fontSize={12}
                    lineHeight={1.3}
                    component={"span"}
                    fontWeight={400}
                    mt={0.7}
                    display={"block"}
                  >
                    {getHours(newsList?.at(0)?.updatedAt)}
                  </Typography>
                </CardContent>
              </Card>

              <Box display={"flex"} flexDirection={"column"} gap={1} minHeight={0}>
                {Array.isArray(newsList) &&
                  newsList?.slice(1, 5)?.map((list) => {
                    const articleUrl = `/article/${list?.story_desk_created_name || list?._id || "#"}`;
                    
                    return (
                      <Box
                        key={list?._id}
                        p={1}
                        borderRadius={"8px"}
                        onClick={() => window.location.href = articleUrl}  // ✅ fallback click handler
                        sx={{
                          cursor: "pointer",  // ✅ shows pointer cursor
                          boxShadow:
                            mode === "dark"
                              ? "0px 0px 4px 0px #fff"
                              : "0px 0px 4px 0px #000",
                        }}
                      >
                        <Grid container spacing={1} alignItems={"center"}>
                          <Grid item xs={8}>
                            <Typography
                              fontFamily={"var(--anek-font)"}
                              fontSize={14}
                              lineHeight={1.35}
                              component={"h3"}
                              fontWeight={550}
                              sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {list?.story_title_name}
                            </Typography>
                            <Typography
                              fontFamily={"var(--anek-font)"}
                              fontSize={11}
                              lineHeight={1.2}
                              component={"span"}
                              fontWeight={400}
                              mt={0.5}
                              display={"block"}
                            >
                              {getHours(list?.updatedAt)}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Box height={76} borderRadius={"6px"} overflow={"hidden"}>
                              <Image
                                src={list?.story_cover_image_url || "/assets/images/default-news.png"}
                                alt="newstamil-cover-image"
                                width={240}
                                height={160}
                                loading="lazy"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    );
                  })}

                <Box
                  mt={"auto"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  bgcolor={mode === "dark" ? "#272626" : "#f1f1f1"}
                >
                  <Link
                    href={`/news/${
                      orderedMenu?.at(1)?.c_category_slug_english_name
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
            </Box>
          </Box>
        </Box>
        <Box
          width={320}
          minWidth={320}
          height={480}
          paddingLeft={1}
          overflow={"hidden"}
          display={{ xs: "none", sm: "none", md: "block" }}
        >
          <img
            src="https://res.cloudinary.com/dtwcgfmar/image/upload/v1777374741/320_x_480_copy_e3vmzf.jpg"
            width="320"
            height="480"
            alt="Advertisement"
            loading="lazy"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
            }}
            onError={(event) => {
              const adCard = event.currentTarget.closest("a");
              if (adCard) adCard.style.display = "none";
            }}
          />
        </Box>
      </Box>
      <Box mt={6}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12} sm={12}>
            <Box
              position={"relative"}
              className="border-class-category-sep"
              pr={1}
            >
              <CommonHeader
                title={orderedMenu?.at(2)?.c_category_name}
                engTitle={`More ${orderedMenu?.at(2)?.c_category_name} News`}
                url={orderedMenu?.at(2)?.c_category_slug_english_name}
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
                title={orderedMenu?.at(3)?.c_category_name}
                engTitle={`More ${orderedMenu?.at(3)?.c_category_name} News`}
                url={orderedMenu?.at(3)?.c_category_slug_english_name}
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
