import { Box, Divider, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { PiRssFill } from "react-icons/pi";

function RssPageContainer({ rssData }) {
  console.log(rssData,"<<< RSS DATA111")
  return (
    <Box>
      <Typography
        fontSize={18}
        fontWeight={550}
        fontFamily={"var(--anek-font)"}
        letterSpacing={"1px"}
      >
        Discover the power of RSS! Stay updated with your favorite websites,
        blogs, and news sources all in one place. RSS (Really Simple
        Syndication) feeds bring the latest content directly to you, ensuring
        you never miss an update. Easily aggregate and customize your feed to
        suit your interests, making content consumption efficient and
        personalized. Embrace the convenience of RSS and streamline your digital
        life today!
      </Typography>
      <Divider sx={{ bgcolor: "#fff", my: 2 }} />
      <Grid container spacing={{ xs: 0, sm: 0, md: 2 }}>
        <Grid item xs={12} md={6} sm={6}>
          {rssData?.slice(0, Math.ceil(rssData.length / 3))?.map((list) => (
            list?.c_category_slug_english_name !== "news" && list?.c_category_slug_english_name !== "web-stories" && list?.c_category_slug_english_name !== "photos" && list?.c_category_slug_english_name !== "videos" && list?.c_category_slug_english_name !== "cards" &&
            <Box key={list?._id}>
              <Link
                style={{ width: "max-content" }}
                href={{
                  pathname: list?.c_category_slug_english_name || '#',
                  // query: {
                  //   category: list?.c_category_slug_english_name,
                  // },
                }}
              >
                <Box
                  key={list?.c_category_id}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  my={1}
                  fontFamily={"var(--anek-font)"}
                  fontWeight={600}
                  letterSpacing={1}
                  width={"max-content"}
                  sx={{
                    "&:hover": {
                      color: "#fb6002",
                      cursor: "pointer",
                      textDecoration: "underline",
                    },
                  }}
                >
                  <PiRssFill color="#fb6002" fontSize={28} />
                  {list?.c_category_name}
                </Box>
                <Box marginLeft={4}>
                {
                  list?.c_sub_categories.length > 0 && list?.c_sub_categories.map((data,index) =>(
                    <Link
                style={{ width: "max-content" }}
                href={{
                  pathname: `${list?.c_category_slug_english_name}/${data?.c_category_slug_english_name}`,
                }}
              >
                <Box
                  key={data?.c_category_id}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  my={1}
                  fontFamily={"var(--anek-font)"}
                  fontWeight={600}
                  letterSpacing={1}
                  width={"max-content"}
                  sx={{
                    "&:hover": {
                      color: "#fb6002",
                      cursor: "pointer",
                      textDecoration: "underline",
                    },
                  }}
                >
                  <PiRssFill color="#fb6002" fontSize={28} />
                  {data?.c_category_name}
                </Box>
              </Link>
                  ))

                }
                </Box>
                
                
                
              </Link>
            </Box>
          ))}
        </Grid>
        <Grid item xs={6}>
          {rssData
            ?.slice(Math.ceil(rssData.length / 3), rssData.length)
            ?.map((list) => (
              list?.c_category_slug_english_name !== "news" && list?.c_category_slug_english_name !== "web-stories" && list?.c_category_slug_english_name !== "photos" && list?.c_category_slug_english_name !== "videos" && list?.c_category_slug_english_name !== "cards" &&
              <Box key={list?._id}>
                <Link
                  href={{
                    pathname: list?.c_category_slug_english_name || '#',
                    // query: {
                    //   category: list?.c_category_slug_english_name,
                    // },
                  }}
                  style={{ width: "max-content" }}
                >
                  <Box
                    key={list?.c_category_id}
                    display={"flex"}
                    alignItems={"center"}
                    gap={1}
                    my={1}
                    fontFamily={"var(--anek-font)"}
                    fontWeight={600}
                    letterSpacing={1}
                    width={"max-content"}
                    sx={{
                      "&:hover": {
                        color: "#fb6002",
                        cursor: "pointer",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    <PiRssFill color="#fb6002" fontSize={28} />
                    {list?.c_category_name}
                  </Box>
                  <Box marginLeft={4}>
                {
                  list?.c_sub_categories.length > 0 && list?.c_sub_categories.map((data,index) =>(
                    <Link
                style={{ width: "max-content" }}
                href={{
                  pathname: `${list?.c_category_slug_english_name}/${data?.c_category_slug_english_name}`,
                }}
              >
                <Box
                  key={data?.c_category_id}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  my={1}
                  fontFamily={"var(--anek-font)"}
                  fontWeight={600}
                  letterSpacing={1}
                  width={"max-content"}
                  sx={{
                    "&:hover": {
                      color: "#fb6002",
                      cursor: "pointer",
                      textDecoration: "underline",
                    },
                  }}
                >
                  <PiRssFill color="#fb6002" fontSize={28} />
                  {data?.c_category_name}
                </Box>
              </Link>
                  ))

                }
                </Box>
                </Link>
              </Box>
            ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default RssPageContainer;
