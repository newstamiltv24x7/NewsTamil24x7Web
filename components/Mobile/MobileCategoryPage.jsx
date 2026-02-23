import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { getHomePageNews } from "@/commonComponents/WebApiFunction/ApiFunctions";
import { CryptoFetcher, getHours, shareCards } from "@/utils/libs";
import MobileCard from "@/commonComponents/MobileCard";
import { useTheme } from "@/theme/ThemeContext";
import MobileSubCategoryPage from "./MobileSubCategoryPage";
import MobilepageLayout from "@/layouts/MobilepageLayout";
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import { FaRegEye } from "react-icons/fa6";

import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";

function MobileCategoryPage({
  menuData,
  trendingData,
  categoryName,
  parentPath,
  childPath,
  viewControl,
  breakingControl,
  quickControl
}) {


  function subTitleFunction(data){
    if(menuData ){
      const dataVal = menuData.find(user => user.c_category_slug_english_name === data);
      return dataVal.c_category_meta_title;
    }else{
      return "";
    }
  }

  const [newsList, setNewsList] = useState([]);
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [newsId, setNewsId] = useState("");

  const observer = useRef();
  const { mode } = useTheme();

  // Reset states when categoryName changes
  useEffect(() => {
    resetStates();
    setPage(1); // Set page to 1 immediately
    GetHomeNews(); // Fetch new data for the new category
  }, [categoryName]);

  // Fetch new data when page changes
  useEffect(() => {
    if (page > 0) {
      GetHomeNews(); // Fetch only if page is greater than 1
    }
  }, [page]);

  // Reset all states
  const resetStates = () => {
    setNewsList([]);
    setHasMore(false);
    setLoader(false);
    setShareOpen(false);
    setNewsId("");
    setCount(0); // Reset count as well
  };

  const GetHomeNews = async () => {
    setLoader(true);
   
    try {
      const body = {
        n_page: page,
        n_limit: 15,
        main_category_name: categoryName,
      };

      const results = await getHomePageNews(body);
      const resultsData = CryptoFetcher(results?.payloadJson);

      if (results?.appStatusCode === 0 && resultsData) {
        setCount(resultsData?.at(0)?.total_count?.at(0)?.count);
        if (page === 1) {
          // If it's the first page, replace the news list
          setNewsList(resultsData?.at(0)?.data || []);
        } else {
          // Append new data for subsequent pages
          setNewsList((prevData) => [...prevData, ...resultsData?.at(0)?.data]);
        }
        setHasMore(resultsData?.at(0)?.data.length > 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // Increment page for infinite scroll
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

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
      {Boolean(childPath) ? (
        <MobileSubCategoryPage
          categoryName={categoryName}
          parentPath={parentPath}
          childPath={childPath}
          viewControl={viewControl}
        />
      ) : (
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
          {`${subTitleFunction(categoryName)}`}
        </Box>
        </Box>
        <Box p={1.5} pb={1} pt={0}>
          
            <Box
              pb={newsId === newsList?.at(0)?._id && shareOpen ? 0 : 2}
              borderBottom={"1px solid #313131"}
            >
              <Link
                href={`/article/${newsList?.at(0)?.story_desk_created_name || newsList?.at(0)?._id || '#'}`}
              >
                <Box position={"relative"}>
                  <Image 
                  fetchPriority="high" rel="preload"
                    src={newsList?.at(0)?.story_cover_image_url}
                    alt={newsList?.at(0)?.story_subject_name}
                    width={1800}
                    height={900}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      cursor: "pointer",
                    }}
                  />
                   {viewControl === "yes" && 
                  <Box
                    position={"absolute"}
                    bottom={10}
                    right={0}
                    bgcolor={"#000"}
                    p={0.5}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={1}
                    fontFamily={"var(--anek-font)"}
                    fontSize={16}
                    fontWeight={600}
                    color={"#fff"}
                  >
                    <FaRegEye /> {newsList?.at(0)?.view_count}
                  </Box>
                  }
                </Box>
              </Link>

              <Typography
                fontFamily={"var(--anek-font)"}
                fontSize={15}
                lineHeight={1.5}
                component={"h1"}
                fontWeight={600}
                mt={"2px"}
                overflow={"hidden"}
                sx={{ cursor: "pointer" }}
              >
                <Link
                  href={`/article/${newsList?.at(0)?.story_desk_created_name || newsList?.at(0)?._id || '#'}`}
                >
                  {newsList?.at(0)?.story_title_name}
                </Link>
              </Typography>
              <Typography
                fontFamily={"var(--anek-font)"}
                className="textWrapper"
                fontSize={13}
                lineHeight={1.5}
                component={"p"}
                fontWeight={400}
                pt={"10px"}
                sx={{ cursor: "pointer" }}
              >
                <Link
                  href={`/article/${newsList?.at(0)?.story_desk_created_name || newsList?.at(0)?._id || '#'}`}
                >
                  {newsList?.at(0)?.story_sub_title_name}
                </Link>
              </Typography>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                mt={1}
                flexWrap={"wrap"}
              >
                <Typography
                  fontFamily={"var(--anek-font)"}
                  fontSize={12}
                  lineHeight={1.3}
                  component={"span"}
                  fontWeight={"bold"}
                  sx={{
                    color: "#fb6002",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  width={"60%"}
                >
                  {newsList?.at(0)?.story_subject_name}
                </Typography>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={2}
                >
                  <Typography
                    fontFamily={"var(--anek-font)"}
                    className="textWrapper"
                    fontSize={12}
                    lineHeight={1.3}
                    component={"span"}
                    fontWeight={300}
                    sx={{ opacity: 0.5 }}
                  >
                    {getHours(newsList?.at(0)?.updatedAt)}
                  </Typography>
                  <Image 
                  fetchPriority="high" rel="preload"
                    src={mode === "dark" ? ShareIcon : DarkShareIcon}
                    alt="share"
                    width={20}
                    height={20}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSetId(newsList?.at(0)?._id)}
                  />
                </Box>
              </Box>
              {newsList?.at(0)?._id === newsId && shareOpen && (
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
                    src={FacebookNew}
                    alt="wp"
                    width={24}
                    height={24}
                    onClick={() =>
                      shareCards("fb", newsList?.at(0).story_desk_created_name)
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
                        newsList?.at(0).story_desk_created_name,
                        "mobile"
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
                        newsList?.at(0).story_desk_created_name,
                        newsList?.at(0).story_sub_title_name
                      )
                    }
                  />
                  <Image 
                  fetchPriority="high" rel="preload"
                    src={InstagramNew}
                    alt="insta"
                    width={24}
                    height={24}
                    onClick={() => shareCards("insta")}
                  />
                  <Image 
                  fetchPriority="high" rel="preload"
                    src={ThreadsNew}
                    alt="insta"
                    width={24}
                    height={24}
                    onClick={() => shareCards("td")}
                  />
                  <Image 
                  fetchPriority="high" rel="preload"
                    src={LinkedinNew}
                    alt="insta"
                    width={24}
                    height={24}
                    onClick={() =>
                      shareCards("lk", newsList?.at(0).story_desk_created_name)
                    }
                  />
                  <Image 
                  fetchPriority="high" rel="preload"
                    src={TelegramNew}
                    alt="insta"
                    width={24}
                    height={24}
                    onClick={() =>
                      shareCards(
                        "tele",
                        newsList?.at(0).story_desk_created_name,
                        newsList?.at(0).story_sub_title_name
                      )
                    }
                  />
                </Box>
              )}
            </Box>

            {/* Remaining News List */}
            {newsList.slice(1).map((list, index) => (
              <Box
                key={list?._id}
                borderBottom={"1px solid #313131"}
                mb={1}
                pt={0.1}
                ref={index === newsList.length - 2 ? lastElementRef : null} // Observe second last element
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

            {/* Loader */}
            {loader && hasMore && (
              <Box p={1} pt={0}>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={"100%"}
                      sx={{ borderRadius: "6px" }}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      sx={{ height: 30 }}
                    />
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      sx={{ height: 60, mt: 2 }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </MobilepageLayout>
  );
}

export default MobileCategoryPage;
