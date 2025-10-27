import React from "react";
import { Box, Button, Grid } from "@mui/material";
import CommonHeader from "@/commonComponents/CommonHeader";
import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { shareCardSection } from "@/utils/libs";
import { useTheme } from "@/theme/ThemeContext";
import Link from "next/link";

function CardsPage({ cardData }) {
  const { mode } = useTheme();
  return (
    <Box>
      <CommonHeader title={"Cards"} engTitle={"More Cards"} />

      <Grid container spacing={2} my={1}>
        {cardData?.slice(0, 8)?.map((list) => (
          <Grid item md={3} xs={12} sm={6} key={list?._id}>
  <Box
    width="100%"
    height="370px" // <-- Fixed height
    overflow="hidden"
    px={2}
    pt={2}
    border="1px solid #cbcbcb"
    borderRadius="8px"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
  >
    <Link
      href={list?.c_cards_share_url !== "" ? list?.c_cards_share_url : ""}
      target={list?.c_cards_share_url !== "" ? "_blank" : ""}
    >
      <Image
        fetchPriority="high"
        rel="preload"
        src={list?.c_cards_img_url}
        alt="newstamil-cards-image"
        height={800}
        width={1200}
        style={{
          width: "100%",
          height: "300px", // <-- Image gets fixed height too
          objectFit: "cover",
          borderRadius: "8px"
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
    </Box>
  );
}

export default CardsPage;
