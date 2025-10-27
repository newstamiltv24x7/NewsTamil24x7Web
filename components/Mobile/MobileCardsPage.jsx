import MobileCard from "@/commonComponents/MobileCard";
import {
  getAllCardSection,
  getAllYoutubeVideos,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import MobilepageLayout from "@/layouts/MobilepageLayout";
import { useTheme } from "@/theme/ThemeContext";
import { CryptoFetcher, shareCardSection, shareNews } from "@/utils/libs";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";

function MobileCardsPage(props) {
  const { menuData, trendingData,breakingControl,viewControl,quickControl } = props;
  const { mode } = useTheme();
  const [cardData, setCardData] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
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

  const GetAllCards = async () => {
    try {
      const body = {
        n_page: page,
        n_limit: 8,
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
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    GetAllCards();
  }, []);

  useEffect(() => {
    if (page > 1) {
      GetAllCards();
    }
  }, [page]);

  return (
    <MobilepageLayout menuData={menuData} trendingData={trendingData} breakingControl={breakingControl} quickControl={quickControl}>
       <Box mt={breakingControl === "yes" ?  25 : quickControl === "no" ? 25 : 12}>
        <Box p={0.5} pb={1} pt={1.5}>
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
          {`CARDS`}
        </Typography>
      </Box>
        
        <Box p={1.5} pb={0} pt={0}>
        {Array.isArray(cardData) &&
          cardData.slice(0, 10).map((list) => (
            <Box my={1} border={"1px solid #cbcbcb"} borderRadius={"8px"}>
              <Box width={"auto"} height={"fit-content"}>
                <Image
                fetchPriority="high" rel="preload"
                  src={list?.c_cards_img_url}
                  alt="newstamil-cards-image"
                  height={800}
                  width={1200}
                  style={{ width: "100%", height: "100%", borderRadius: "8px" }}
                />
              </Box>
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
              >
                <Button
                  startIcon={<FaFacebookSquare />}
                  onClick={() =>
                    shareCardSection("fb", list?.c_cards_share_url)
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
                    shareCardSection("wp", list?.c_cards_share_url)
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
          ))}
        </Box>
       
        <Box p={1.5} pb={0} pt={0}>
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
          </Box>          

          <Box p={1.5} pb={0} pt={0}> 
          <Box>
          <Typography
            borderLeft={"4px solid #fb6002"}
            pl={1}
            mb={1}
            fontFamily={"var(--arial-font)"}
            fontWeight={700}
            textTransform={"uppercase"}
          >
            Trending News
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
          </Box>    
        
        
      </Box>
    </MobilepageLayout>
  );
}

export default MobileCardsPage;
