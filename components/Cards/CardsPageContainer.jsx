import BigCard from "@/commonComponents/BigCard";
import HorizontalCard from "@/commonComponents/HorizontalCard";
import {
  getAllCardSection,
  getHomePageNews,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import HomepageLayout from "@/layouts/HomepageLayout";
import { useTheme } from "@/theme/ThemeContext";
import { CryptoFetcher, shareCardSection } from "@/utils/libs";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";

function CardsPageContainer(props) {
  const {
    menuData,
    trendingData,
    breakingData,
    quickControl,
    breakingControl,
    viewControl
  } = props;

  const { mode } = useTheme();

  // const NewsArr = trendingData?.at(0)?.data;

  const [bigStory, setBigStory] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

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

  const GetAllCards = async () => {
    try {
      const body = {
        n_page: page,
        n_limit: 10,
        c_search_term: "",
      };
      const results = await getAllCardSection(body);
      const resData = CryptoFetcher(results?.payloadJson);
      setCount(resData?.total_count?.at(0)?.count);
      if (page === 1) {
        setCardData(resData?.data);
      } else {
        setCardData((prevData) => [...prevData, ...resData?.data]);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    BigStory();
    GetAllCards();
  }, []);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page > 1) {
      GetAllCards();
    }
  }, [page]);

  return (
    <HomepageLayout
      menuData={menuData}
      breakingData={breakingData}
      quickControl={quickControl}
      breakingControl={breakingControl}
    >
      <Box
        mt={2}
        maxWidth={1440}
        width={"100%"}
        mx={{ md: "inherit", lg: "auto" }}
        px={2}
      >
        <Grid container spacing={2}>
          <Grid item md={3} xs={12} sm={12}>
            <Box position={"sticky"} top={170}>
              <Typography
                component={"h5"}
                textTransform={"uppercase"}
                fontWeight={"bold"}
                borderLeft={"4px solid #ff992c"}
                mb={1}
                pl={"4px"}
                fontSize={18}
              >
                Trending News
              </Typography>
              {Array.isArray(trendingData) &&
                trendingData?.slice(0, 8)?.map((list) => (
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
          <Grid item md={6} xs={12} sm={12}>
            <Box
              fontWeight={"bold"}
              bgcolor={"#ff992c"}
              borderRadius={"6px"}
              p={1}
              mb={1}
              color={"#000"}
              fontFamily={"var(--anek-font)"}
              textTransform={"uppercase"}
              fontSize={18}
            >
              Cards
            </Box>
            <Grid container spacing={2} my={1}>
              {cardData?.map((list) => (
                <Grid item md={6} xs={12} sm={6} key={list?._id}>
                  <Box
                    width={"auto"}
                    height={"fit-content"}
                    p={2}
                    border={"1px solid #cbcbcb"}
                    borderRadius={"8px"}
                  >
                    <Link
                      href={
                        list?.c_cards_share_url !== ""
                          ? list?.c_cards_share_url
                          : ""
                      }
                      target={list?.c_cards_share_url !== "" ? "_blank" : ""}
                    >
                      <Image
                      fetchPriority="high" 
                      rel="preload"
                        src={list?.c_cards_img_url}
                        alt="newstamil-cards"
                        height={800}
                        width={1200}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "8px",
                        }}
                      />
                    </Link>
                    <Box
                      sx={{
                        "& button": {
                          fontSize: 12,
                          textTransform: "capitalize",
                          color: mode === "dark" ? "#fff" : "#000",
                          border: "1px solid #cbcbcb",
                        },
                      }}
                      mt={1}
                      display={"flex"}
                      justifyContent={"space-between"}
                      gap={1}
                    >
                      <Button
                        startIcon={<FaFacebookSquare />}
                        onClick={() =>
                          shareCardSection(
                            "fb",
                            list?.c_cards_title,
                            list?.c_cards_share_url
                          )
                        }
                      >
                        Share
                      </Button>
                      <Button
                        startIcon={<BsTwitterX />}
                        onClick={() =>
                          shareCardSection(
                            "x",
                            list?.c_cards_share_url,
                            list?.c_cards_title
                          )
                        }
                      >
                        Share
                      </Button>
                      <Button
                        startIcon={<FaWhatsapp />}
                        onClick={() =>
                          shareCardSection(
                            "wp",
                            list?.c_cards_title,
                            list?.c_cards_share_url
                          )
                        }
                      >
                        Share
                      </Button>
                      <Button
                        startIcon={<FaInstagram />}
                        onClick={() => shareCardSection("insta")}
                      >
                        Share
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
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
                  color: "#fb6307",
                  fontWeight: "bold",
                  "&:hover": {
                    color: mode === "dark" ? "#fff" : "#000 !important",
                    border: "1px solid transparent",
                    bgcolor: "transparent",
                  },
                }}
                onClick={handleLoadMore}
                disabled={cardData?.length >= count}
              >
                Read More
              </Button>
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
                fontSize={18}
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
                      margin: "0px 0 6px 0",
                    }}
                  />
                </Box>
              </Box>
              {Array.isArray(bigStory) &&
                bigStory?.slice(1, 10)?.map((list) => (
                  <React.Fragment key={list._id}>
                    <HorizontalCard list={list}  viewControl={viewControl}/>
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

export default CardsPageContainer;
