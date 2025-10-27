import BigCard from "@/commonComponents/BigCard";
import HorizontalCard from "@/commonComponents/HorizontalCard";
import { CryptoFetcher, getHours, shareCards } from "@/utils/libs";
import {
  Box,
  Button,
  Card,
  CardContent,
  ClickAwayListener,
  Fade,
  Grid,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import { getHomePageNews } from "@/commonComponents/WebApiFunction/ApiFunctions";
import HomepageLayout from "@/layouts/HomepageLayout";
import { useTheme } from "@/theme/ThemeContext";
import { FaAnglesRight, FaRegEye } from "react-icons/fa6";

import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";

function SecondaryCategory({
  menuData,
  trendingData,
  categoryName,
  breakingData,
  quickControl,
  breakingControl,
  viewControl,
  title,
  subCategory,
}) {
  // const NewsArr = trendingData?.at(0)?.data;
  const [mainNewsArr, setMainNewsArr] = useState([]);
  const [loader, setLoader] = useState(false);
  const [initflag, setInitFlag] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [catName, setCatName] = useState(categoryName);
  const [bigStory, setBigStory] = useState([]);
  const { mode } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const [shareOpen, setShareOpen] = React.useState(false);
  const [newsId, setNewsId] = React.useState("");

  const handleSetId = (id) => {
    if (id === newsId) {
      setShareOpen(!shareOpen);
    } else {
      setNewsId(id);
      setShareOpen(!shareOpen);
    }
  };

  const handleClick = (newPlacement, id) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleChange = () => {
    setPage((prev) => prev + 1);
  };
  const GetFirstCategory = async () => {
    setLoader(true);
    try {
      const body = {
        n_page: page,
        n_limit: 15,
        main_category_name: categoryName,
      };
      setCatName(categoryName);
      const response = await getHomePageNews(body);
      if (response?.payloadJson?.length > 0) {
        const firstNews = CryptoFetcher(response?.payloadJson);
        setCount(firstNews?.at(0)?.total_count?.at(0)?.count);
        setLoader(false);
        setMainNewsArr((prevData) => [...prevData, ...firstNews?.at(0)?.data]);
      } else {
        setLoader(false);
        setMainNewsArr([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const BigStory = async () => {
    try {
      const body = {
        n_page: 1,
        n_limit: 10,
        main_category_name: "bigstoriesnews",
      };
      const response = await getHomePageNews(body);
      if (response?.payloadJson?.length > 0) {
        const firstNews = CryptoFetcher(response?.payloadJson);
        setBigStory(firstNews?.at(0)?.data);
      } else {
        setBigStory([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetFirstCategory();
    BigStory();
    setInitFlag(true);
  }, []);

  useEffect(() => {
    setMainNewsArr([]);
    GetFirstCategory();
  }, [categoryName]);

  useEffect(() => {
    if (initflag && page > 1) {
      GetFirstCategory();
    }
  }, [page]);

  return (
    <HomepageLayout
      menuData={menuData}
      breakingData={breakingData}
      quickControl={quickControl}
      breakingControl={breakingControl}
      viewControl={viewControl}
    >
      <Box bgcolor={mode === "dark" ? "#cbcbcb" : "#3e3e3e"} mb={2}>
        <Box
          maxWidth={1440}
          width={"100%"}
          mx={{ md: "inherit", lg: "auto" }}
          px={2}
        >
          <Typography
            fontFamily={"var(--anek-font)"}
            fontSize={14}
            lineHeight={1.3}
            component={"span"}
            fontWeight={600}
            textTransform={"uppercase"}
            color={mode === "dark" ? "#000" : "#fff"}
            // py={1}
            // sx={{ color: "#fff" }}
          >
            <Link href={"/"}>Home</Link>{" "}
            <FaAnglesRight style={{ position: "relative", top: 3 }} /> {title}
            {subCategory !== "" && (
              <>
                <FaAnglesRight style={{ position: "relative", top: 3 }} />{" "}
                {subCategory}
              </>
            )}
          </Typography>
        </Box>
      </Box>
      <Box maxWidth={1440} mx={"auto"} px={2}>
        <Grid container spacing={4}>
          <Grid item xs={3} display={{ xs: "none", sm: "none", md: "block" }}>
            <Box position={"sticky"} top={160}>
              <Typography
                component={"h5"}
                textTransform={"uppercase"}
                fontWeight={"bold"}
                borderLeft={"4px solid #ff992c"}
                mb={2}
                pl={"4px"}
              >
                Recent News
              </Typography>
              <Box position={"relative"}>
                <BigCard list={trendingData?.at(0)} index={0} page="india" />
                <Box display={"grid"} sx={{ placeItems: "center" }}>
                  <hr
                    style={{
                      width: "100%",
                      border: "0.5px solid #666666",
                      margin: "5px 0 12px 0",
                    }}
                  />
                </Box>
              </Box>
              {Array.isArray(trendingData) &&
                trendingData?.slice(1, 8)?.map((list) => (
                  <React.Fragment key={list._id}>
                    <HorizontalCard list={list} />
                    <Box display={"grid"} sx={{ placeItems: "center" }}>
                      <hr
                        style={{
                          width: "100%",
                          border: "0.5px solid #666666",
                          margin: "0px 0 6px 0",
                        }}
                      />
                    </Box>
                  </React.Fragment>
                ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sm={12} position={"relative"}>
            <Box className="india-category-line">
              <Box
                fontWeight={"bold"}
                bgcolor={"#ff992c"}
                borderRadius={"6px"}
                p={1}
                mb={1}
                color={"#000"}
                fontFamily={"var(--anek-font)"}
                textTransform={"uppercase"}
              >
                {`${title}`}
              </Box>
              <Card
                sx={{
                  boxShadow: "none",
                  backgroundImage: "none",
                  // pl: index !== 0 ? 1 : 0,
                }}
              >
                <Link
                  href={`/article/${
                    mainNewsArr?.at(0)?.story_desk_created_name
                  }`}
                >
                  <Image
                  fetchPriority="high" rel="preload"
                    src={mainNewsArr?.at(0)?.story_cover_image_url}
                    alt={mainNewsArr?.at(0)?.news_image_caption}
                    width={1200}
                    height={980}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                </Link>
                <CardContent
                  sx={{
                    p: 1,
                    px: 0,
                    pb: "2px",
                    "&.MuiCardContent-root:last-child": {
                      paddingBottom: 1,
                    },
                  }}
                >
                  <Link
                    href={`/article/${
                      mainNewsArr?.at(0)?.story_desk_created_name
                    }`}
                  >
                    <Typography
                      fontFamily={"var(--anek-font)"}
                      className="textWrapper"
                      fontSize={16}
                      lineHeight={1.3}
                      component={"h1"}
                      fontWeight={550}
                      height={64}
                    >
                      {mainNewsArr?.at(0)?.story_title_name}
                    </Typography>
                  </Link>
                  <Box
                    display={"flex"}
                    gap={1}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography
                      fontFamily={"var(--anek-font)"}
                      className=""
                      fontSize={14}
                      lineHeight={1.3}
                      component={"h2"}
                      fontWeight={500}
                      sx={{
                        color: "#fb6002",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {mainNewsArr?.at(0)?.story_subject_name}
                    </Typography>
                    <Box
                      display={"flex"}
                      gap={2}
                      alignItems={"center"}
                      position={"relative"}
                    >
                      {viewControl === "yes" && 
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={1}
                        fontFamily={"var(--anek-font)"}
                        fontSize={16}
                        fontWeight={600}
                      >
                        <FaRegEye /> {mainNewsArr?.at(0)?.view_count}
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
                        {getHours(mainNewsArr?.at(0)?.updatedAt)}
                      </Typography>
                      <Image
                      fetchPriority="high" rel="preload"
                        src={mode === "light" ? DarkShareIcon : ShareIcon}
                        alt="share"
                        width={16}
                        height={16}
                        onClick={() => handleSetId(mainNewsArr?.at(0)?._id)}
                        style={{ cursor: "pointer" }}
                      />
                      {mainNewsArr?.at(0)?._id === newsId && shareOpen && (
                        <ClickAwayListener
                          onClickAway={() => setShareOpen(false)}
                        >
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"flex-start"}
                            gap={1}
                            p={1}
                            // height={30}
                            borderRadius={"6px"}
                            position={"absolute"}
                            bottom={5}
                            right={20}
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
                                shareCards("fb", list?.story_desk_created_name)
                              }
                            />
                            <Image
                            fetchPriority="high" rel="preload"
                              src={WhatsAppNew}
                              alt="wp"
                              width={24}
                              height={24}
                              onClick={() =>
                                shareCards("wp", list?.story_desk_created_name)
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
                                shareCards("lk", list?.story_desk_created_name)
                              }
                            />
                          </Box>
                        </ClickAwayListener>
                      )}
                    </Box>
                  </Box>
                </CardContent>
                <Box display={"grid"} sx={{ placeItems: "center" }}>
                  <hr
                    style={{
                      width: "100%",
                      border: "0.5px solid #666666",
                      margin: "5px 0 12px 0",
                    }}
                  />
                </Box>
              </Card>
              {Array.isArray(mainNewsArr) &&
                mainNewsArr?.slice(1, mainNewsArr?.length)?.map((list) => (
                  <>
                    <HorizontalCard list={list} type={"secondaryCat"} />
                    <Box display={"grid"} sx={{ placeItems: "center" }}>
                      <hr
                        style={{
                          width: "100%",
                          border: "0.5px solid #666666",
                          margin: "5px 0 12px 0",
                        }}
                      />
                    </Box>
                  </>
                ))}
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                bgcolor={mode === "dark" ? "#272626" : "#f1f1f1"}
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
                  onClick={handleChange}
                  disabled={mainNewsArr?.length >= count}
                >
                  Read More
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item md={3} xs={12} sm={12}>
            <Box position={"sticky"} top={160}>
              <Typography
                component={"h5"}
                textTransform={"uppercase"}
                fontWeight={"bold"}
                borderLeft={"4px solid #ff992c"}
                mb={2}
                pl={"4px"}
              >
                Big Stories
              </Typography>
              <Box position={"relative"}>
                <BigCard list={bigStory?.at(0)} page={"india"} />
                <Box display={"grid"} sx={{ placeItems: "center" }}>
                  <hr
                    style={{
                      width: "100%",
                      border: "0.5px solid #666666",
                      margin: "5px 0 12px 0",
                    }}
                  />
                </Box>
              </Box>
              {Array.isArray(bigStory) &&
                bigStory?.slice(1, 10)?.map((list) => (
                  <React.Fragment key={list._id}>
                    <HorizontalCard list={list} />
                    <Box display={"grid"} sx={{ placeItems: "center" }}>
                      <hr
                        style={{
                          width: "100%",
                          border: "0.5px solid #666666",
                          margin: "0px 0 6px 0",
                        }}
                      />
                    </Box>
                  </React.Fragment>
                ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </HomepageLayout>
  );
}

export default SecondaryCategory;
