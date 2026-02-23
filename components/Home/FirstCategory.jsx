import BigCard from "@/commonComponents/BigCard";
import CommonHeader from "@/commonComponents/CommonHeader";
import HorizontalCard from "@/commonComponents/HorizontalCard";
import { getHomeTN } from "@/commonComponents/WebApiFunction/ApiFunctions";
import { useTheme } from "@/theme/ThemeContext";
import { Box, Button, Grid, Skeleton } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const CryptoJS = require("crypto-js");
const secretPassphrase = `${process.env.NEXT_PUBLIC_DECODER}`;

function FirstCategory({viewControl}) {
  const HomePageNews = useSelector((state) => state.HomePageNewsReducer?.data);
  const FirstCategoryId = HomePageNews?.at(0)?.c_category_id;
  const [newsList, setNewsList] = useState([]);
  const [loader, setLoader] = useState(false);
  const { mode } = useTheme();

  const GetFirstCategory = async () => {
    if (HomePageNews?.length > 0) {
      setLoader(true);
      try {
        const body = {
          n_page: 1,
          n_limit: 15,
          main_category_id: FirstCategoryId,
        };
       
        const response = await getHomeTN(body);


        if (response?.payloadJson?.length > 0) {
          const firstNews = CryptoJS.AES.decrypt(response?.payloadJson,secretPassphrase).toString(CryptoJS.enc.Utf8);
         
          const result = JSON.parse(firstNews);
          setLoader(false);
          // setNewsList(result?.at(0)?.data);
          setNewsList(result?.docs);
        } else {
          setLoader(false);
          setNewsList([]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    GetFirstCategory();
  }, [HomePageNews]);

  return (
    <Box my={3}>
      <Box pr={1.3}>
        <CommonHeader
          title={HomePageNews?.at(0)?.c_category_name}
          engTitle={`More ${HomePageNews?.at(0)?.c_category_name} News`}
          url={HomePageNews?.at(0)?.c_category_slug_english_name}
        />
      </Box>
      <Grid container mt={2} spacing={1}>
        {loader ? (
          <>
            {[0, 1, 2].map((list) => (
              <Grid item xs={4} key={list}>
                <Skeleton variant="rectangular" width={325} height={280} />
              </Grid>
            ))}
          </>
        ) : (
          <>
            {Array.isArray(newsList) &&
              newsList?.slice(0, 3)?.map((list, index) => (
                <Grid
                  item
                  md={4}
                  xs={12}
                  sm={12}
                  position={"relative"}
                  // pr={1.2}
                  key={list?._id}
                >
                  <Box
                    className={(index + 1) % 3 !== 0 && "border-class"}
                    position={"relative"}
                    pr={2}
                  >
                    <BigCard section="first" list={list} index={index} viewControl={viewControl}/>
                    <Box display={"grid"} sx={{ placeItems: "center" }}>
                      <hr
                        style={{
                          width: "100%",
                          border: "0.5px solid #666666",
                          margin: "2px 0 0px 0",
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              ))}
          </>
        )}
      </Grid>
      <>
      {Array.isArray(newsList) &&
        newsList.slice(3, 21).map((item, index) => {
          if (index % 3 === 0) {
            return (
              <Grid container spacing={0.5} key={`row-${index / 3}`} mt={0}>
                {[0, 1, 2].map((colIndex, cardIndex) => {
                  const currentItem = newsList[index + 3 + colIndex]; // Adjust index to account for slicing offset
                  return (
                    currentItem && (
                      <Grid
                        item
                        md={4}
                        xs={12}
                        sm={12}
                        position={"relative"}
                        // pr={1.2}
                        key={currentItem._id}
                      >
                        <Box
                          className={
                            (colIndex + 1) % 3 !== 0 && "border-class-two"
                          }
                          position={"relative"}
                          pr={2}
                          pl={colIndex === 0 ? 0 : 1}
                        >
                          <HorizontalCard list={currentItem} viewControl={viewControl}/>
                          <Box display={"grid"} sx={{ placeItems: "center" }}>
                            <hr
                              style={{
                                width: "99%",
                                border: "0.5px solid #666666",
                                margin: "4px 0 0px 0",
                              }}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    )
                  );
                })}
              </Grid>
            );
          }
          return null;
        })}                
      </>
      
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        mt={2}
        bgcolor={mode === "dark" ? "#272626" : "#f1f1f1"}
      >
        <Link href={`/news/${HomePageNews?.at(0)?.c_category_slug_english_name || '#'}`}>
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
  );
}

export default FirstCategory;
