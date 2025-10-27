import MobileCard from "@/commonComponents/MobileCard";
import { getHomePageNews } from "@/commonComponents/WebApiFunction/ApiFunctions";
import { CryptoFetcher, getHours, shareCards } from "@/utils/libs";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import { useTheme } from "@/theme/ThemeContext";

import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";

function MobileSubCategoryPage({ categoryName, parentPath, childPath,viewControl }) {
  const [newsList, setNewsList] = useState([]);
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [initflag, setInitFlag] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
  const [newsId, setNewsId] = useState("");

  const observer = useRef();
  const { mode } = useTheme();

  const GetHomeNews = async () => {
    if (initflag) {
      try {
        const body = {
          n_page: page,
          n_limit: 15,
          main_category_name: parentPath,
          sub_category_name: childPath,
        };
        const results = await getHomePageNews(body);
        const resultsData = CryptoFetcher(results?.payloadJson);
        if (results?.appStatusCode === 0) {
          if (resultsData) {
            setCount(resultsData?.at(0)?.total_count?.at(0)?.count);
            setNewsList((prevData) => [
              ...prevData,
              ...resultsData?.at(0)?.data,
            ]);
            setLoader(false);
          }
        }
      } catch (err) {
        console.log(err);
        setLoader(false);
      }
    }
  };

  useEffect(() => {
    setInitFlag(true);
  }, []);

  useEffect(() => {
    setNewsList([]);
    setPage(1);
  }, [childPath]);

  useEffect(() => {
    if (page > 1) {
      GetHomeNews();
    }
  }, [page]);

  useEffect(() => {
    GetHomeNews();
  }, [childPath, page === 1]);

  const handleSetId = (id) => {
    if (id === newsId) {
      setShareOpen(!shareOpen);
    } else {
      setNewsId(id);
      setShareOpen(true);
    }
  };

  const lastElementRef = useCallback(
    (node) => {
      if (initflag) {
        if (observer.current) observer.current.disconnect();
        setHasMore(true);
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage) => prevPage + 1);
          }
        });
        if (node) observer.current.observe(node);
      }
    },
    [hasMore]
  );

  return (
    <Box mt={12}>
      <Box p={1.5} pb={0} pt={0}>
        <Box
          pb={newsId === newsList?.at(0)?._id && shareOpen ? 0 : 2}
          borderBottom={"1px solid #313131"}
        >
          <Link href={`/article/${newsList?.at(0)?.story_desk_created_name}`}>
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
          </Link>

          <Typography
            fontFamily={"var(--anek-font)"}
            // className="textWrapperTwo"
            fontSize={15}
            lineHeight={1.5}
            component={"h5"}
            fontWeight={600}
            // height={64}
            mt={"2px"}
            overflow={"hidden"}
            sx={{ cursor: "pointer" }}
          >
            <Link href={`/article/${newsList?.at(0)?.story_desk_created_name}`}>
              {newsList?.at(0)?.story_title_name}
            </Link>
          </Typography>
          <Typography
            fontFamily={"var(--anek-font)"}
            className="textWrapper"
            fontSize={13}
            lineHeight={1.5}
            component={"h2"}
            fontWeight={400}
            pt={"10px"}
            sx={{ cursor: "pointer" }}
          >
            <Link href={`/article/${newsList?.at(0)?.story_desk_created_name}`}>
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
              // sx={{ color: "#fff" }}
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
                {/* {`${dayjs(newsList?.at(0)?.updatedAt).format(
            "MMM DD, YYYY"
          )} - ${dayjs(newsList?.at(0)?.updatedAt).format("HH: mm")}`} */}
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
        {Array.isArray(newsList) &&
          newsList.slice(1, newsList.length).map((list) => (
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
                viewControl={viewControl}
              />
            </Box>
          ))}
      </Box>
      {count !== newsList?.length && initflag && (
        <>
          <div
            ref={lastElementRef}
            style={{ height: "1px", backgroundColor: "transparent" }}
          />
          {hasMore && (
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
        </>
      )}
    </Box>
  );
}

export default MobileSubCategoryPage;
