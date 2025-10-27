import CardSection from "@/commonComponents/CardSection";
import { getAllNewsList } from "@/commonComponents/WebApiFunction/ApiFunctions";
import HomepageLayout from "@/layouts/HomepageLayout";
import { CryptoFetcher } from "@/utils/libs";
import {
  Box,
  Button,
  CircularProgress, // Import loader
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import NoData from "../../public/newsTamilIcons/icons/no-data.png";
import { useTheme } from "@/theme/ThemeContext";

function SearchPageContainer(props) {
  const { tag, trendingData, deviceType,viewControl } = props;

  const { mode } = useTheme();

  const [search, setSearch] = useState(tag || "");
  const [searchData, setSearchData] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState("");
  const [loader, setLoader] = useState(false); // Manage loader state
  const [flag, setFlag] = useState(false);

  // Handle loading more data on "Read More" button click
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Fetch search news
  const GetSearchNews = async () => {
    setLoader(true); // Show loader before the API call
    try {
      const response = await getAllNewsList({
        n_page: page,
        n_limit: 20,
        main_category_id: "",
        tags: search,
      });
      const resData = CryptoFetcher(response?.payloadJson);

      if (response?.appStatusCode === 0 && resData) {
        setCount(resData?.at(0)?.total_count?.at(0)?.count);
        setSearchData((prevData) => [...prevData, ...resData?.at(0)?.data]);
      }
    } catch (err) {
      console.log(err);
      setSearchData([]);
    } finally {
      setLoader(false); // Hide loader after the API call
    }
  };

  // Fetch more news when the page number increases
  useEffect(() => {
    if (page > 1) {
      GetSearchNews();
    }
  }, [page]);

  // Fetch news based on search with debounce
  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeoutId = setTimeout(() => {
      setPage(1); // Reset page to 1 on new search
      setSearchData([]); // Clear existing data
      GetSearchNews();
    }, 600);

    setDebounceTimeout(timeoutId);

    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    if (flag) {
      GetSearchNews();
    }
  }, [flag]);

  // Fetch initial news on first render
  useEffect(() => {
    setFlag(true);
    if (tag !== "") {
      GetSearchNews();
    }
  }, []);

  return (
    <Box
      mt={2}
      maxWidth={1440}
      width={"100%"}
      mx={{ md: "inherit", lg: "auto" }}
      px={2}
    >
      <Box px={deviceType === "mobile" ? "0" : "15%"} mb={2}>
        <TextField
          fullWidth
          placeholder="Search using tags or relevant keywords"
          size="medium"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <FiSearch fontSize={24} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {loader ? ( // Display loader when data is being fetched
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : Array.isArray(searchData) && searchData.length > 0 ? (
        <>
          <Typography
            borderLeft={"4px solid #fb6002"}
            pl={1}
            ml={2}
            fontFamily={"var(--anek-font)"}
            fontWeight={700}
            textTransform={"uppercase"}
            fontSize={18}
          >
            {search === "" ? "Also Read" : "Search Results"}
          </Typography>
          <Grid container my={1}>
            {searchData.map((list) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={list?._id}>
                <Box className="border-class" m={1}>
                  <CardSection data={list} cardHeight={178} viewControl={viewControl}/>
                  <Box display={"grid"} sx={{ placeItems: "center" }}>
                    <hr
                      style={{
                        width: "94%",
                        border: "0.5px solid #666666",
                        margin: "6px 0 0px 0",
                        opacity: 0.4,
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        !loader && (
          <Box display={"grid"} sx={{ placeItems: "center" }}>
            <Box width={500} sx={{ aspectRatio: "3/2" }}>
              <Image
              fetchPriority="high" rel="preload"
                alt="No Data"
                src={NoData}
                width={1200}
                height={800}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Box>
        )
      )}
      {!loader && search !== "" && (
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
            disabled={searchData?.length >= count}
          >
            Read More
          </Button>
        </Box>
      )}

      <Typography
        borderLeft={"4px solid #fb6002"}
        pl={1}
        ml={2}
        fontFamily={"var(--anek-font)"}
        fontWeight={700}
        textTransform={"uppercase"}
        fontSize={18}
      >
        Trending News
      </Typography>
      <Grid container my={1}>
        {Array.isArray(trendingData) &&
          trendingData?.map((list) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={list?._id}>
              <Box className="border-class" m={1}>
                <CardSection data={list} cardHeight={178} viewControl={viewControl} />
                <Box display={"grid"} sx={{ placeItems: "center" }}>
                  <hr
                    style={{
                      width: "94%",
                      border: "0.5px solid #666666",
                      margin: "6px 0 0px 0",
                      opacity: 0.4,
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default SearchPageContainer;
