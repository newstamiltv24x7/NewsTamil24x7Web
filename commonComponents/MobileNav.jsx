import {
  AppBar,
  Box,
  Button,
  Drawer,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import Logo from "../public/newsTamilIcons/icons/main-logo-mobile.png";
import ShortNews from "../public/newsTamilIcons/icon-pack/short1.png";
import { IoMdPlayCircle } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import Sun from "../public/newsTamilIcons/icons/sun.svg";
import Moon from "../public/newsTamilIcons/icons/moon.svg";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MobileDrawer from "./MobileDrawer";
import { useTheme } from "@/theme/ThemeContext";
import { useRouter } from "next/router";
import QuickLinkSection from "./QuickLinkSection";
import { getQuickLinks } from "./WebApiFunction/ApiFunctions";
import { CryptoFetcher } from "@/utils/libs";

function MobileNav(props) {
  const router = useRouter();
  const { menuData, trendingData, type,breakingControl,quickControl } = props;
  // const Trending = Array.isArray(trendingData) && trendingData?.at(0)?.data;

  const { mode, toggleTheme } = useTheme();

  const [open, setOpen] = React.useState(false);
  const [mainPath, setMainPath] = React.useState("");
  const [list1, setList1] = React.useState([]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const [subArr, setSubArr] = React.useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [parentName, setParentName] = React.useState([]);

  const handleClick = (event, item) => {
    setAnchorEl(event.currentTarget); // Set the anchor element for the dropdown
    setSubArr(item?.c_sub_categories);
    setParentName(item?.c_category_slug_english_name);
  };

    const GetQuickLinkResults = async () => {
      try {
        const results = await getQuickLinks();
        const data = CryptoFetcher(results?.payloadJson);
        setList1(data);
      } catch (err) {
        console.log(err);
      }
    };
  const handleClose = () => {
    setAnchorEl(null); // Close the dropdown
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

  useEffect(() => {
    const path = router.asPath?.split("/");
    if (path.length === 3) {
      setMainPath(path?.at(-1));
    } else {
      setMainPath(path?.at(-2));
    }
  }, [router]);
   React.useEffect(() => {
      GetQuickLinkResults();
    }, []);

  return (
    <div>
      <AppBar sx={{ bgcolor: "#313131" }}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          px={1}
        >
          <Box
            display={"flex"}
            justifyContent={"start"}
            alignItems={"center"}
            gap={1}
          >
            <HiMenuAlt1 fontSize={30} onClick={toggleDrawer(true)} />
            {/* <Link href={"/short-news"}>
              <Image
              fetchPriority="high" 
              rel="preload"
                src={ShortNews}
                alt="news-tamil-shorts-news"
                width={120}
                height={30}
                style={{
                  objectFit: "contain",
                  height: "20px",
                  width:"100%",
                  position: "relative",
                  top: 3,
                  // left: -12,
                }}
              />
            </Link> */}
          </Box>
          <Box>
            <Link href={"/"}>
              <Image
              fetchPriority="high" 
              rel="preload"
                src={Logo}
                alt="news-tamil-logo"
                width={100}
                height={65}
                style={{
                  objectFit: "contain",
                  height: "100%",
                  position: "relative",
                  top: 3,
                  // left: -12,
                }}
              />
            </Link>
            
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
          >
            <Box position={"relative"} top={4}>
              {mode === "dark" ? (
                <Image
                fetchPriority="high" 
                rel="preload"
                  src={Sun}
                  alt="dark-image"
                  width={30}
                  height={30}
                  onClick={() => toggleTheme("light")}
                  // onClick={toggleTheme}
                />
              ) : (
                <Image
                fetchPriority="high" 
                rel="preload"
                  src={Moon}
                  alt="light-image"
                  width={30}
                  height={30}
                  onClick={() => toggleTheme("dark")}
                  // onClick={toggleTheme}
                />
              )}
            </Box>
            {/* <Link href={`/videos/live`}>
              <Button
                sx={{
                  bgcolor: "#fb6002",
                  py: 0.5,
                  px: 1,
                  color: "#000",
                  fontWeight: 700,
                  fontSize: 15,
                  fontFamily: "var(--anek-font)",
                  "&:hover": {
                    bgcolor: "#fb6002",
                    color: "#FFF",
                  },
                }}
                startIcon={<IoMdPlayCircle />}
              >
                Live Tv 
              </Button>
            </Link> */}
          </Box>
        </Box>
      </AppBar>
      
    <Box
      className="mobile-nav"
      role="navigation"
      position="fixed"
      top={50}
      right={0}
      left={0}
      bgcolor="#121212"
      zIndex={3}
    >
      <Box
        display="flex"
        width="100%"
        whiteSpace="nowrap"
        py={0.5}
        borderBottom="1px solid #fff"
        alignItems="center"
        sx={{
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
          msOverflowStyle: "auto",
          overscrollBehaviorX: "auto",
          "& .MuiButton-root": { flex: "0 0 auto", whiteSpace: "nowrap" },
        }}
      >
        <Link href="/short-news" passHref>
          <div style={{ display: 'inline-block', minWidth: 120 }}>
            <Image
              fetchPriority="high"
              src={ShortNews}
              alt="news-tamil-shorts-news"
              width={120}
              height={30}
              style={{
                objectFit: 'contain',
                height: '20px',
                width: '100%',
                position: 'relative',
                top: 3,
              }}
            />
          </div>
        </Link>
        {menuData?.map((item) => (
          <React.Fragment key={item?._id}>
            <Link href={getNavLink(item?.c_category_slug_english_name)} passHref>
              <Button
                sx={{
                  color: mainPath === item?.c_category_slug_english_name ? "#ff992c" : "#fff",
                  fontFamily: "var(--anek-font)",
                  fontSize: "15px",
                  fontWeight: 500,
                  transition: "all 200ms ease-in-out",
                  textDecoration: mainPath === item?.c_category_slug_english_name ? "underline" : "none",
                  textDecorationColor: mainPath === item?.c_category_slug_english_name ? "#ff992c" : "none",
                  textUnderlineOffset: mainPath === item?.c_category_slug_english_name ? "12px" : "",
                  textDecorationThickness: mainPath === item?.c_category_slug_english_name ? "3px" : "",
                  paddingBottom: 0,
                  flex: "0 0 auto",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    color: "#fb6002",
                    textDecoration: "underline",
                    textDecorationColor: "#fb6002",
                    textUnderlineOffset: "12px",
                    textDecorationThickness: "3px",
                  },
                }}
              >
                {item?.c_category_name}
              </Button>
            </Link>
            {item?.c_sub_categories?.length > 0 && (
              <Box position="relative" top={9} mr={1}>
                <FaChevronDown
                  style={{ width: 12 }}
                  color="#fff"
                  onClick={(e) => handleClick(e, item)}
                />
              </Box>
            )}
          </React.Fragment>
        ))}
      </Box>
        <Menu
          anchorEl={anchorEl} // Attach menu to the button
          open={Boolean(anchorEl)} // Open based on anchor element state
          onClose={handleClose} // Close menu on item click or outside click
          sx={{ height: 500, overflow: "auto" }}
        >
          {Array.isArray(subArr) &&
            subArr.map((list) => (
              <Link
                key={list?._id}
                href={`/news/${parentName}/${list?.c_category_slug_english_name}`}
                onClick={handleClose}
              >
                <MenuItem
                  style={{
                    cursor: "pointer",
                    fontFamily: "var(--anek-font)",
                  }}
                >
                  {list?.c_category_name}
                </MenuItem>
              </Link>
            ))}
        </Menu>
        {/* Menu end */}
                {/* Quick links start */}

        {quickControl === "yes" &&  list1?.length > 0 && (
                <Box
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={0}
                  p={0}
                  px={2}
                  mb={0}
                  bgcolor={"#c1c1c1"}
                  borderRadius={"6px"}
                  whiteSpace={"nowrap"}
                  overflow={"auto hidden"}
                >
                  <QuickLinkSection list={list1} />
                </Box>
              )}



              {/* Quick links end */}

      {/* Breaking news start */}
        {breakingControl === "yes" && (
        type !== "mobile" && (
          <Box>
            <Swiper
              autoplay={{ delay: 5000 }} // Autoplay with a delay
              loop={true}
              modules={[Autoplay]}
              slidesPerView={1}
              spaceBetween={20}
            >
              {Array.isArray(trendingData) &&
                trendingData?.slice(0, 10)?.map((list) => (
                  <SwiperSlide key={list?._id}>
                    <Box
                      m={1}
                      p={1}
                      border={"1px solid #313131"}
                      borderRadius={"6px"}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={3}>
                          <Link
                            href={`/article/${list?.story_desk_created_name}`}
                          >
                            <Image
                            fetchPriority="high" 
                            rel="preload"
                              src={list?.story_cover_image_url}
                              alt={list?.story_subject_name}
                              width={1200}
                              height={800}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "6px",
                              }}
                            />
                          </Link>
                        </Grid>
                        <Grid
                          item
                          xs={9}
                          display={"grid"}
                          sx={{ placeItems: "center" }}
                        >
                          <Link
                            href={`/article/${list?.story_desk_created_name}`}
                          >
                            <Typography
                              fontSize={14}
                              className="textWrapperTwo"
                              fontFamily={"var(--anek-font)"}
                              color={"#fff"}
                            >
                              {list?.story_title_name}
                            </Typography>
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </SwiperSlide>
                ))}
            </Swiper>
          </Box>
        )
        )}

        {/* Breaking news end */}

      </Box>
     
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "60%",
            bgcolor: "#313131",
            color: "#fff",
          },
        }}
      >
        <MobileDrawer menuData={menuData} close={() => setOpen(false)} />
      </Drawer>
    </div>
  );
}

export default MobileNav;
