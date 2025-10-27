import HorizontalCard from "@/commonComponents/HorizontalCard";
import { Box, Typography } from "@mui/material";
import React from "react";

function CategoryRight({ trendingData,viewControl }) {
  // const TRENDING = trendingData?.at(0)?.data ?? [];
  return (
    <Box top={170}>
      <Typography
        component={"h5"}
        textTransform={"uppercase"}
        fontWeight={"bold"}
        borderLeft={"6px solid #ff992c"}
        mb={0.5}
        pl={"12px"}
        lineHeight={2}
        fontSize={20}
      >
        Trending News
      </Typography>
      {Array.isArray(trendingData) &&
        trendingData?.slice(0, 10)?.map((list) => (
          <React.Fragment key={list._id}>
            <HorizontalCard list={list} viewControl={viewControl} />
            <Box display={"grid"} sx={{ placeItems: "center" }}>
              <hr
                style={{
                  width: "98%",
                  border: "0.5px solid #666666",
                  margin: "-3px 0 6px 0",
                }}
              />
            </Box>
          </React.Fragment>
        ))}
    </Box>
  );
}

export default CategoryRight;
