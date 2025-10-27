import HomepageLayout from "@/layouts/HomepageLayout";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CategoryPage from "./CategoryPage";
import { FaAnglesRight } from "react-icons/fa6";
import Link from "next/link";
import { useTheme } from "@/theme/ThemeContext";
import Custom404 from "@/pages/404";





function CategoryPageContainer({
  menuData,
  categoryName,
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


  function subTitleFunction(data){
    if(menuData ){
      const dataVal = menuData.find(user => user?.c_category_slug_english_name === data);
      return dataVal?.c_category_meta_title;
    }else{
      return "";
    }
  }

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
      


<Box bgcolor={mode === "dark" ? "#cbcbcb" : "#3e3e3e"}>
        <Box
          maxWidth={1440}
          width={"100%"}
          mx={{ md: "inherit", lg: "auto" }}
          px={2}
        >
          <Typography
            fontFamily={"var(--anek-font)"}
            fontSize={14}
            lineHeight={1.3}
            component={"span"}
            fontWeight={600}
            textTransform={"uppercase"}
            color={mode === "dark" ? "#000" : "#fff"}
            // py={1}
            // sx={{ color: "#fff" }}
          >
            <Link href={"/"}>Home</Link>{" "}
            <FaAnglesRight style={{ position: "relative", top: 3 }} />{" "}
            {title === undefined ? subTitleFunction(categoryName) : title}
            {subCategory !== "" && (
              <>
                <FaAnglesRight style={{ position: "relative", top: 3 }} />{" "}
                {/* {subCategory} */}
                {subTitleFunction(categoryName)}
              </>
            )}
          </Typography>
        </Box>
      </Box>

      <Box maxWidth={1440} mx={"auto"} px={2}>
        <CategoryPage
          categoryName={categoryName}
          subCategory={subCategory}
          trendingData={trendingData}
          title={title}
          parentPath={parentPath}
          childPath={childPath}
          viewControl={viewControl}
          menuData={menuData}
        />
      </Box>



      
    </HomepageLayout>
  );
}

export default CategoryPageContainer;
