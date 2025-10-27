import React from "react";
import Logo from "../public/newsTamilIcons/icons/main-logo.png";
import Link from "next/link";
import Image from "next/image";
import { Box, List, ListItem } from "@mui/material";

import PlayStore from "../public/newsTamilIcons/icons/playstore.png";
import AppStore from "../public/newsTamilIcons/icons/ios.png";

function MobileDrawer({ menuData, close }) {


  const getNavLink1 = (val) => {
    // if (cat === "dist") {
    //   return `/news/${parentName}/${val}`;
    // } else {
    if (val?.toLowerCase() === "home") {
      return `/`;
    } else if (val?.toLowerCase() === "news") {
      return `/news`;
    } else if (val?.toLowerCase() === "photos") {
      return `/photos`;
    } else if (val?.toLowerCase() === "videos") {
      return `/videos`;
    } else if (val?.toLowerCase() === "cards") {
      return `/cards`;
    } else {
      return `/news/${val}`;
    }
    // }
  };


  const getNavLink = (val, cat) => {
    if (cat === "dist") {
      return `/news/${parentName}/${val}`;
    } else {
      if (val?.toLowerCase() === "home") {
        return `/`;
      } else if (val?.toLowerCase() === "news") {
        return `/news`;
      } else if (val?.toLowerCase() === "photos") {
        return `/photos`;
      } else if (val?.toLowerCase() === "videos") {
        return `/videos`;
      } else if (val?.toLowerCase() === "cards") {
        return `/cards`;
      } else if (val?.toLowerCase() === "web-stories") {
        return `/web-story`;
      } else {
        return `/news/${val}`;
      }
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Box p={1} position={"relative"}>
        <Box
          //   position={"fixed"}
          //   top={0}
          //   left={0}
          //   bgcolor={"#353535"}
          //   zIndex={2}
          //   right={220}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Link href={"/"}>
            <Image fetchPriority="high" rel="preload"
              src={Logo}
              alt="news-tamil-menu-logo"
              width={150}
              height={75}
              style={{ objectFit: "contain", height: "100%" }}
            />
          </Link>
          
          


        </Box>
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={0.3} marginTop={2}>
          <Link href={"https://play.google.com/store/apps/details?id=com.news.tamil24X7&hl=en"} target="_blank"><Image fetchPriority="high" rel="preload" src={PlayStore} alt="play" width={100} height={28} /></Link>
          <Link href={"#"} target="_blank"><Image fetchPriority="high" rel="preload" src={AppStore} alt="app" width={100} height={28} /></Link>
          </Box>
        <List>
          {Array.isArray(menuData) &&
            menuData.map((list) => (
              <ListItem
                key={list?._id}
                sx={{
                  fontFamily: "var(--anek-font)",
                  fontSize: 16,
                  pl: 0,
                  fontWeight: 300,
                  borderBottom: "1px solid #c1c1c1a1",
                }}
              >
                <Link
                  // href={`/news/${list?.c_category_slug_english_name}`}
                  onClick={close}
                  href={getNavLink(list?.c_category_slug_english_name)}
                >
                  {list?.c_category_name}
                </Link>
              </ListItem>
            ))}
        </List>
      </Box>
    </div>
  );
}

export default MobileDrawer;
