import { Box, Grid, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";

import {
  getHomePageNews,
  getYoutubeVideos,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import { CryptoFetcher } from "@/utils/libs";
import CategoryRight from "../Category/CategoryRight";
import CategoryLeft from "../Category/CategoryLeft";
import SubCategory from "../Category/SubCategory";
import Author from "./Author";
// import CategoryRight from "./CategoryRight";
// import CategoryLeft from "./CategoryLeft";
// import SubCategory from "./SubCategory";

function AuthorPage({
  SlugName,
  trendingData,
  childPath,
  viewControl,
}) {




  return (
    <Box mt={1}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9} sm={12}>
          {childPath === "" ? (
            <Author SlugName={SlugName} />
          ) : (
            <Author SlugName={SlugName} />
          )}
        </Grid>
        <Grid item xs={12} md={3} sm={12}>
          <CategoryRight
            trendingData={trendingData}
            viewControl={viewControl}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AuthorPage;
