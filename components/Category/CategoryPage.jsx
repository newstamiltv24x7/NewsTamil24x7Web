import { Box, Grid, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import CategoryRight from "./CategoryRight";
import CategoryLeft from "./CategoryLeft";
import {
  getHomePageNews,
  getYoutubeVideos,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import { CryptoFetcher } from "@/utils/libs";
import SubCategory from "./SubCategory";
import Custom404 from "@/pages/404";

function CategoryPage({
  menuData,
  categoryName,
  trendingData,
  title,
  parentPath,
  childPath,
  viewControl
}) {
  const [newsList, setNewsList] = useState([]);
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [initflag, setInitFlag] = useState(true);
  const [subCatData, setSubCatData] = useState([]);
  const [subPage, setSubPage] = useState(1);
  const [subCount, setSubCount] = useState(1);
  const [subHasMore, setSubHasMore] = useState(false);
  const [subLoader, setSubLoader] = useState(true);
  const [extLoader, setExtLoader] = useState(false);

  function subTitleFunction(data){
    if(menuData){
      const dataVal = menuData.find(user => user?.c_category_slug_english_name === data);
      return dataVal?.c_category_meta_title;
    }else{
      return "";
    }
  }

  useEffect(() => {
    setInitFlag(true);
  }, []);

  useEffect(() => {
    setNewsList([]);
    setPage(1); // Reset page to 1 when categoryName changes
  }, [categoryName]);

  useEffect(() => {
    if (page > 1) {
      GetHomeNews();
    }
  }, [page]);

  useEffect(() => {
    if (page === 1) {
      setExtLoader(false)
      GetHomeNews();
    }
  }, [categoryName, page]);

  const GetHomeNews = async () => {
    if (initflag) {
      try {
        const body = {
          n_page: page,
          n_limit: 30,
          main_category_name: categoryName,
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

            if(resultsData?.at(0)?.data?.length === 0){
              setExtLoader(true)
            }else{
              setExtLoader(false)
            }
            
            setLoader(false);
          }
        }else{
          setExtLoader(true)
          setLoader(false);
        }
      } catch (err) {
        console.log(err);
        setLoader(false);
        setExtLoader(true)
      }
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // -----------------------------------------------------------

  const GetSubCat = async () => {
    try {
      const body = {
        n_page: subPage,
        n_limit: 30,
        main_category_name: parentPath,
        sub_category_name: childPath,
      };
      const results = await getHomePageNews(body);      
      const resultsData = CryptoFetcher(results?.payloadJson);
      if (results?.appStatusCode === 0) {
        if (resultsData) {
          setSubCount(resultsData?.at(0)?.total_count?.at(0)?.count);
          setSubCatData((prevData) => [
            ...prevData,
            ...resultsData?.at(0)?.data,
          ]);
          if(resultsData?.at(0)?.data?.length === 0){
            setExtLoader(true)
          }else{
            setExtLoader(false)
          }
          setSubLoader(false);
        }
      }else{
        setExtLoader(true)
        setLoader(false);
      }
    } catch (err) {
      setSubLoader(false);
      setSubCatData([]);
      setExtLoader(true)
    }
  };

  useEffect(() => {
    if (subPage > 1) {
      setExtLoader(false)
      GetSubCat();
    }
  }, [subPage]);

  useEffect(() => {
    if (subPage === 1) {
      setExtLoader(false)
      GetSubCat();
    }
  }, [childPath, subPage]);

  useEffect(() => {
    setSubCatData([]);
    setSubPage(1); // Reset page to 1 when categoryName changes
  }, [childPath]);

  const handleLoadMore2 = () => {
    setSubPage((prevPage) => prevPage + 1);
  };

  return (
    <Box mt={1}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9} sm={12}>
         

          {childPath === "" ? (

newsList?.length === 0 && extLoader ? (
        <>
          <Custom404 />
        </>
      ) : (
        <>
        <Box
       fontWeight={"bold"}
       bgcolor={"#ff992c"}
       borderRadius={"6px"}
       p={1}
       mb={1}
       color={"#000"}
       fontFamily={"var(--anek-font)"}
       textTransform={"uppercase"}
     >
       {subLoader ? (
         <Skeleton variant="rectangluar" width={"100%"} height={28} />
       ) : (
         title === undefined ? subTitleFunction(`${categoryName}`) :  `${title} ${
           childPath !== ""
             ? `- ${subCatData?.at(0)?.c_sub_category_name}`
             : ""
         }`

        
       )}
     </Box>
       <CategoryLeft
         newsList={newsList}
         categoryName={categoryName}
         page={page}
         initflag={initflag}
         hasMore={hasMore}
         setPage={setPage}
         setHasMore={setHasMore}
         count={count}
         loader={loader}
         handleLoadMore={handleLoadMore}
         viewControl={viewControl}
       />


       </>
          
        
      )

            
          ) : (

            subCatData?.length === 0 && extLoader ? (
              <>
                <Custom404 />
              </>
            ) : (
              
             <SubCategory
              newsList={subCatData}
              categoryName={categoryName}
              page={subPage}
              initflag={initflag}
              hasMore={subHasMore}
              setPage={setSubPage}
              setHasMore={setSubHasMore}
              count={subCount}
              loader={subLoader}
              handleLoadMore={handleLoadMore2}
              viewControl={viewControl}
            />
              
                
              
            )

            
          )}
        </Grid>
        <Grid item xs={12} md={3} sm={12}>
          <CategoryRight trendingData={trendingData} viewControl={viewControl} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default CategoryPage;
