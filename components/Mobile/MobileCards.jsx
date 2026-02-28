import React, { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { getAllCardSection } from "@/commonComponents/WebApiFunction/ApiFunctions";
import { CryptoFetcher } from "@/utils/libs";

function MobileCards() {
  const [cardData, setCardData] = useState([]);

  const GetAllCards = async () => {
    try {
      const body = {
        n_page: 1,
        n_limit: 5,
        c_search_term: "",
      };
      const results = await getAllCardSection(body);
      const resData = CryptoFetcher(results?.payloadJson);
      setCardData(resData?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetAllCards();
  }, []);

  return (
    <>
      <Box
        borderLeft={"4px solid #fb6002"}
        pl={1}
        ml={2}
        mt={2}
        mb={0}
        fontWeight={700}
        textTransform={"uppercase"}
        fontFamily={"var(--anek-font)"}
      >
        Cards
      </Box>
      <Swiper
        autoplay={{ delay: 5000 }} // Autoplay with a delay
        loop={true} // Enable looping
        modules={[Autoplay, Navigation]} // Include all necessary modules
        slidesPerView={1}
        spaceBetween={20}
        simulateTouch={true}
        navigation={true}
        className="mob-cards"
      >
        {Array.isArray(cardData) &&
          cardData.slice(0, 5).map((list) => (
            <SwiperSlide key={list?._id}>
              {/* <Box overflow={"auto"} width={"100%"}>
                <Box
                  p={1}
                  borderRadius={"6px"}
                  dangerouslySetInnerHTML={{
                    __html: list?.c_cards_embed_code,
                  }}
                ></Box>
              </Box> */}
              <Box
                width={"auto"}
                height={"fit-content"}
                p={2}
                border={"1px solid #cbcbcb"}
                m={2}
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
                  fetchPriority="high" rel="preload"
                    src={list?.c_cards_img_url}
                    alt="newstamil-cards"
                    height={800}
                    width={1200}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "8px",
                    }}
                  />
                </Link>
              </Box>
            </SwiperSlide>
          ))}
      </Swiper>
      <Box textAlign={"center"} border={"1px solid #fb6002"} mx={1}>
        <Link href={`/cards`}>
          <Button
            sx={{
              fontSize: 12,
              textTransform: "capitalize",
              fontFamily: "var(--arial-font)",
              fontWeight: 600,
              color: "#fb6002",
            }}
            endIcon={<FaArrowRight style={{ fontSize: 14 }} />}
          >
            View More
          </Button>
        </Link>
      </Box>
    </>
  );
}

export default MobileCards;
