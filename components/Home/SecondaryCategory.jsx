import BigCard from "@/commonComponents/BigCard";
import CommonHeader from "@/commonComponents/CommonHeader";
import HorizontalCard from "@/commonComponents/HorizontalCard";
import {  getHomeBigStories, getHomeDistrictNews, getHomeJustBefore, getHomeWorld } from "@/commonComponents/WebApiFunction/ApiFunctions";
import { useTheme } from "@/theme/ThemeContext";
import { Box, Button, Grid } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
const CryptoJS = require("crypto-js");
const secretPassphrase = `${process.env.NEXT_PUBLIC_DECODER}`;

const initialState = {
  firstCategoryNews: [],
  secondCategoryNews: [],
  thirdCategoryNews: [],
  fourthCategoryNews: [],
};

const newsReducer = (state, action) => {
  switch (action.type) {
    case "SET_ARRAY1":
      return { ...state, firstCategoryNews: action.payload };
    case "SET_ARRAY2":
      return { ...state, secondCategoryNews: action.payload };
    case "SET_ARRAY3":
      return { ...state, thirdCategoryNews: action.payload };
    case "SET_ARRAY4":
      return { ...state, fourthCategoryNews: action.payload };
    default:
      return state;
  }
};

function SecondaryCategory({viewControl}) {
  const HomePageNews = useSelector((state) => state.HomePageNewsReducer?.data);
  const FirstCategoryId = HomePageNews?.at(4)?.c_category_id;
  const SecondCategoryId = HomePageNews?.at(5)?.c_category_id;
  const ThirdCategoryId = HomePageNews?.at(6)?.c_category_id;
  const FourthCategoryId = HomePageNews?.at(7)?.c_category_id;

  const [state, dispatch] = useReducer(newsReducer, initialState);
  const [titleArr, setTitleArr] = useState([]);
  const [mergedArr, setMergedArr] = useState([]);
  const { mode } = useTheme();

  const GetFirstCategory = async () => {
    if (HomePageNews?.length > 0) {
      try {
        const body = {
          n_page: 1,
          n_limit: 5,
          main_category_id: FirstCategoryId,
        };
       
        const response = await getHomeDistrictNews(body);
        if (response?.payloadJson?.length > 0) {
          const firstNews = CryptoJS.AES.decrypt(response?.payloadJson,secretPassphrase).toString(CryptoJS.enc.Utf8);
          const result = JSON.parse(firstNews);
          dispatch({ type: "SET_ARRAY1", payload: result?.docs });
        } else {
          // setLoader(false);
          dispatch({ type: "SET_ARRAY1", payload: [] });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const GetSecondCategory = async () => {
    if (HomePageNews?.length > 0) {
      try {
        const body = {
          n_page: 1,
          n_limit: 5,
          main_category_id: SecondCategoryId,
        };
        const response = await getHomeJustBefore(body);
        if (response?.payloadJson?.length > 0) {
          const firstNews = CryptoJS.AES.decrypt(response?.payloadJson,secretPassphrase).toString(CryptoJS.enc.Utf8);
          const result = JSON.parse(firstNews);
          dispatch({ type: "SET_ARRAY2", payload: result?.docs });
        } else {
          dispatch({ type: "SET_ARRAY2", payload: [] });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const GetThirdCategory = async () => {
    if (HomePageNews?.length > 0) {
      try {
        const body = {
          n_page: 1,
          n_limit: 5,
          main_category_id: ThirdCategoryId,
        };
        
        const response = await getHomeBigStories(body);
        if (response?.payloadJson?.length > 0) {
          const firstNews = CryptoJS.AES.decrypt(response?.payloadJson,secretPassphrase).toString(CryptoJS.enc.Utf8);
          const result = JSON.parse(firstNews);
          dispatch({ type: "SET_ARRAY3", payload: result?.docs });
        } else {
          dispatch({ type: "SET_ARRAY3", payload: [] });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const GetFourthCategory = async () => {
    if (HomePageNews?.length > 0) {
      try {
        const body = {
          n_page: 1,
          n_limit: 5,
          main_category_id: FourthCategoryId,
        };
        
        const response = await getHomeWorld(body);
        if (response?.payloadJson?.length > 0) {
          const firstNews = CryptoJS.AES.decrypt(response?.payloadJson,secretPassphrase).toString(CryptoJS.enc.Utf8);
          const result = JSON.parse(firstNews);
          dispatch({ type: "SET_ARRAY4", payload: result?.docs });
        } else {
          dispatch({ type: "SET_ARRAY4", payload: [] });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    GetFirstCategory();
    GetSecondCategory();
    GetThirdCategory();
    GetFourthCategory();
  }, [HomePageNews]);

  useEffect(() => {
    const List = [
      {
        id: 1,
        title: state.firstCategoryNews?.at(0)?.c_category_name ?? "",
      },
      {
        id: 2,
        title: state.secondCategoryNews?.at(0)?.c_category_name ?? "",
      },
      {
        id: 3,
        title: state.thirdCategoryNews?.at(0)?.c_category_name ?? "",
      },
      {
        id: 4,
        title: state.fourthCategoryNews?.at(0)?.c_category_name ?? "",
      },
    ];
    const combinedData = [
      state.firstCategoryNews,
      state.secondCategoryNews,
      state.thirdCategoryNews,
      state.fourthCategoryNews,
    ];
    setMergedArr(combinedData);
    setTitleArr(List);
  }, [state]);

  const getTitle = (index) => {
    if (index === 0) {
      return `${HomePageNews?.at(4)?.c_category_name}`;
    } else if (index === 1) {
      return `${HomePageNews?.at(5)?.c_category_name}`;
    } else if (index === 2) {
      return `${HomePageNews?.at(6)?.c_category_name}`;
    } else if (index === 3) {
      return `${HomePageNews?.at(7)?.c_category_name}`;
    } else {
      return ``;
    }
  };

  const getRedirectLink = (index) => {
    if (index === 0) {
      return `${HomePageNews?.at(4)?.c_category_slug_english_name}`;
    } else if (index === 1) {
      return `${HomePageNews?.at(5)?.c_category_slug_english_name}`;
    } else if (index === 2) {
      return `${HomePageNews?.at(6)?.c_category_slug_english_name}`;
    } else if (index === 3) {
      return `${HomePageNews?.at(7)?.c_category_slug_english_name}`;
    } else {
      return ``;
    }
  };

  return (
    <Grid
      mt={4}
      container
      spacing={2}
      // className="border-class-add"
      position={"relative"}
    >
      {mergedArr.map((column, colIndex) => (
        <Grid item xs={12} md={3} sm={6} key={colIndex}>
          <Box
            position={"relative"}
            className="border-class-category-secondary"
            pr={1}
          >
            <CommonHeader title={getTitle(colIndex)} engTitle={""} />
            <Box
              mt={2}
              // className={colIndex !== 3 && "border-class"}
              position={"relative"}
              pr={2}
            >
              <BigCard list={column?.at(0)} type={"secondaryCat"} viewControl={viewControl}/>
              <Box display={"grid"} sx={{ placeItems: "center" }}>
                <hr
                  style={{
                    width: "95%",
                    border: "0.5px solid #666666",
                    margin: "6px 0 0 0",
                  }}
                />
              </Box>
            </Box>
            {column?.slice(1, 9)?.map((item) => (
              <Box key={item._id} mb={0}>
                <Box
                  mt={0}
                  // pl={0.5}
                  pl={colIndex !== 1 ? 0 : 0}
                  pr={2}
                  py={0.5}
                  // className="border-class-two"
                  // className={colIndex !== 3 && "border-class-two"}
                  position={"relative"}
                >
                  <HorizontalCard list={item}  viewControl={viewControl}/>
                  <Box display={"grid"} sx={{ placeItems: "center" }}>
                    <hr
                      style={{
                        width: "100%",
                        border: "0.5px solid #666666",
                        margin: "0px 0 0 0",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            ))}
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              mt={2}
              bgcolor={mode === "dark" ? "#272626" : "#f1f1f1"}
            >
              <Link href={`/news/${getRedirectLink(colIndex)}`}>
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
        </Grid>
      ))}
    </Grid>
  );
}

export default SecondaryCategory;
