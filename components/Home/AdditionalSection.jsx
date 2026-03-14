import BigCard from "@/commonComponents/BigCard";
import CommonHeader from "@/commonComponents/CommonHeader";
import HorizontalCard from "@/commonComponents/HorizontalCard";
import {  getHomeSports, getHomeTechnology } from "@/commonComponents/WebApiFunction/ApiFunctions";
import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

const CryptoJS = require("crypto-js");
const secretPassphrase = `${process.env.NEXT_PUBLIC_DECODER}`;

function AdditionalSection({viewControl, orderedMenu = []}) {
  const SecondCategoryId = orderedMenu?.at(8)?.c_category_id;
  const ThirdCategoryId = orderedMenu?.at(9)?.c_category_id;
  const [secondNewsList, setSecondNewsList] = useState([]);
  const [thirdNewsList, setThirdNewsList] = useState([]);

  const GetSecondCategory = async () => {
    if (!SecondCategoryId) return;
    try {
      const body = {
        n_page: 1,
        n_limit: 5,
        main_category_id: SecondCategoryId,
      };
      
      const response = await getHomeSports(body);
      if (response?.payloadJson?.length > 0) {
        const firstNews = CryptoJS.AES.decrypt(response?.payloadJson,secretPassphrase).toString(CryptoJS.enc.Utf8);
        const result = JSON.parse(firstNews);
        setSecondNewsList(result?.docs);
      } else {
        setSecondNewsList([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const GetThirdCategory = async () => {
    if (!ThirdCategoryId) return;
    try {
      const body = {
        n_page: 1,
        n_limit: 5,
        main_category_id: ThirdCategoryId,
      };
       
      const response = await getHomeTechnology(body);
      if (response?.payloadJson?.length > 0) {
        const firstNews = CryptoJS.AES.decrypt(response?.payloadJson,secretPassphrase).toString(CryptoJS.enc.Utf8);
        const result = JSON.parse(firstNews);
        setThirdNewsList(result?.docs);
      } else {
        setThirdNewsList([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetSecondCategory();
    GetThirdCategory();
  }, [SecondCategoryId]);

  return (
    <Box mt={6}>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12} sm={12}>
          <Box
            position={"relative"}
            className="border-class-category-sep"
            pr={1}
          >
            <CommonHeader
              title={orderedMenu?.at(8)?.c_category_name}
              engTitle={`More ${orderedMenu?.at(8)?.c_category_name} News`}
              url={orderedMenu?.at(8)?.c_category_slug_english_name}
            />
            <Grid container spacing={2} position={"relative"}>
              <Grid item md={6} xs={12} sm={12} mt={2}>
                <Box pr={3} className="border-class" position={"relative"}>
                  {secondNewsList?.at(0) && (
                  <BigCard list={secondNewsList?.at(0)} type="mainAd" viewControl={viewControl} />
                  )}
                  <Box display={"grid"} sx={{ placeItems: "center" }}>
                    <hr
                      style={{
                        width: "100%",
                        border: "0.5px solid #666666",
                        margin: "14px 0 0px 4px",
                        opacity: 0.4,
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              {/* <Divider
            orientation="vertical"
            sx={{ position: "absolute", left: "0px" }}
          /> */}
              <Grid
                item
                md={6}
                xs={12}
                sm={12}
                mt={0.8}
                // className="border-class-big"
                position={"relative"}
              >
                {Array.isArray(secondNewsList) &&
                  secondNewsList?.slice(2, 8)?.map((list) => (
                    <Box
                      // py={0.94}
                      // className="border-class-two"
                      position={"relative"}
                      pr={2}
                      key={list?._id}
                    >
                      <HorizontalCard list={list} type="mainAd" viewControl={viewControl} />
                      <Box display={"grid"} sx={{ placeItems: "center" }}>
                        <hr
                          style={{
                            width: "100%",
                            border: "0.5px solid #666666",
                            margin: "3px 0 3px 0",
                            opacity: 0.4,
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {thirdNewsList?.length > 0 && (
          <Grid item md={6} xs={12} sm={12}>
            <Box
              position={"relative"}
              className="border-class-category-sep"
              pr={1}
            >
              <CommonHeader
                title={orderedMenu?.at(9)?.c_category_name}
                engTitle={`More ${orderedMenu?.at(9)?.c_category_name} News`}
                url={orderedMenu?.at(9)?.c_category_slug_english_name}
              />
              <Grid container spacing={2} position={"relative"}>
                <Grid item md={6} xs={12} sm={12} mt={2}>
                  {thirdNewsList?.at(0) && (
                    <Box pr={3} className="border-class" position={"relative"}>
                      <BigCard list={thirdNewsList?.at(0)} type="mainAd" viewControl={viewControl}/>
                      <Box display={"grid"} sx={{ placeItems: "center" }}>
                        <hr
                          style={{
                            width: "100%",
                            border: "0.5px solid #666666",
                            margin: "14px 0 0px 4px",
                            opacity: 0.4,
                          }}
                        />
                      </Box>
                    </Box>
                  )}
                </Grid>
                {/* <Divider
            orientation="vertical"
            sx={{ position: "absolute", left: "0px" }}
          /> */}
                <Grid
                  item
                  md={6}
                  xs={12}
                  sm={12}
                  mt={0.8}
                  // className="border-class-big"
                  position={"relative"}
                >
                  {Array.isArray(thirdNewsList) &&
                    thirdNewsList?.length > 2 &&
                    thirdNewsList?.slice(2, 8)?.map((list) => (
                      <Box
                        // py={0.94}
                        // className="border-class-two"
                        position={"relative"}
                        pr={2}
                        key={list?._id}
                      >
                        <HorizontalCard list={list} type="mainAd"  viewControl={viewControl}/>
                        <Box display={"grid"} sx={{ placeItems: "center" }}>
                          <hr
                            style={{
                              width: "100%",
                              border: "0.5px solid #666666",
                              margin: "3px 0 3px 0",
                              opacity: 0.4,
                            }}
                          />
                        </Box>
                      </Box>
                    ))}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default AdditionalSection;
