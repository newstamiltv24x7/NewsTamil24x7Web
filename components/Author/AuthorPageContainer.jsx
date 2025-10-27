import HomepageLayout from "@/layouts/HomepageLayout";
import { Box, Typography } from "@mui/material";
import React from "react";
// import CategoryPage from "./CategoryPage";
import { FaAnglesRight } from "react-icons/fa6";
import Link from "next/link";
import { useTheme } from "@/theme/ThemeContext";
import AuthorPage from "./AuthorPage";

function AuthorPageContainer({
  menuData,
  SlugName,
  subCategory,
  trendingData,
  breakingData,
  title,
  quickControl,
  breakingControl,
  viewControl,
  parentPath,
  childPath,
}) {
  const { mode } = useTheme();
  return (
    <HomepageLayout
      menuData={menuData}
      breakingData={breakingData}
      quickControl={quickControl}
      breakingControl={breakingControl}
      viewControl={viewControl}
      page={"category"}
    >
     
      <Box maxWidth={1440} mx={"auto"} px={2}>
        <AuthorPage
          SlugName={SlugName}
          subCategory={subCategory}
          trendingData={trendingData}
          title={title}
          parentPath={parentPath}
          childPath={childPath}
          viewControl={viewControl}
        />
      </Box>
    </HomepageLayout>
  );
}

export default AuthorPageContainer;
