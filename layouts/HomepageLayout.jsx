import Footer from "@/commonComponents/Footer";
import LiveTvPop from "@/commonComponents/LiveTvPop";
import Navbar from "@/commonComponents/Navbar";
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  MdOutlineKeyboardDoubleArrowDown,
  MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";
import { AiOutlineYoutube } from "react-icons/ai";
import Link from "next/link";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { addUserData } from "@/redux/reducer/userReducer";
import { useDispatch } from "react-redux";
import { getDeviceId } from "@/commonComponents/WebApiFunction/ApiFunctions";

import VerticalSwiper from "@/commonComponents/VerticalSwiper";

function HomepageLayout({
  children,
  menuData,
  page,
  breakingData,
  quickControl,
  breakingControl,
  viewControl
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(true);
  const [subPop, setSubPop] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  const [path, setPath] = useState("");

  const AddDevice = async () => {
    try {
      const results = await getDeviceId();
      results && localStorage.setItem("_id", results["device-tracker-id"]);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    setTimeout(() => {
      setLoading(false);
    }, 100);

    window.location.pathname === "/" &&
      setTimeout(() => {
        setSubPop(true);
      }, 6000);

    window.addEventListener("scroll", toggleVisibility);
    setPath(window.location.pathname);

    const getToken = sessionStorage.getItem("Token");
    const userData = JSON.parse(getToken) ?? {};
    dispatch(addUserData(userData));
    setFlag(true);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  useEffect(() => {
    flag && AddDevice();
  }, [flag]);

  return (
    <div>
      <Navbar menuData={menuData} quickControl={quickControl} />
      {breakingControl !== "no" && (
        // position={"fixed"} zIndex={999} backgroundColor={"#fff"} width={"100%"}
           <Box   borderBottom={"0.5px solid #3b3b3b"}>
          <Box
            px={2}
            maxWidth={1440}
            mt={quickControl === "no" ? 19 : 21}
            mx={"auto"}
          >
            {loading ? (
              <Skeleton variant="rectangular" width={"100%"} height={50} />
            ) : (
              <>
                {Array.isArray(breakingData) && breakingData?.length > 0 && (
                  <Box
                    bgcolor={"#fff"}
                    borderRadius={"6px"}
                    borderLeft={"6px solid red"}
                    mb={"13px"}
                  >
                    <Grid container>
                      <Grid item xs={2.5}>
                        <Box
                          display={"grid"}
                          sx={{ placeItems: "center" }}
                          bgcolor={"#504343"}
                          borderRight={"6px solid red"}
                          borderRadius={"0 4px 4px 0"}
                        >
                          <Typography
                            color={"#fff"}
                            textAlign={"center"}
                            textTransform={"uppercase"}
                            fontWeight={800}
                            fontSize={{ xs: 10, sm: 10, md: 15, lg: 22 }}
                            // position={"relative"}
                            // top={5}
                            py={1}
                            sx={{ textShadow: "2px 2px 2px #000" }}
                          >
                            Breaking News
                          </Typography>
                        </Box>
                      </Grid>




                      <Grid
                        item
                        xs={9.5}
                        display={"grid"}
                        sx={{ placeItems: "center", bgcolor: "#cbcbcba1" }}
                        className="breaking-btn-wrapper"
                      >
                        <VerticalSwiper breakingData={breakingData} />
                        {/* <Box
                          sx={{
                            height: "48px",
                            overflow: "hidden",
                          }}
                          position={"relative"}
                        >
                          <div className="swiper-button-prev swiper-button-custom"></div>
                          <div className="swiper-button-next swiper-button-custom"></div>
                          <Swiper
                            direction="vertical"
                            autoplay={{ delay: 7500 }}
                            loop={true}
                            modules={[Autoplay, Navigation]}
                            slidesPerView={1}
                            spaceBetween={20}
                            style={{ height: "100%" }}
                            navigation={{
                              prevEl: ".swiper-button-prev",
                              nextEl: ".swiper-button-next",
                            }}
                          >
                            {Array.isArray(breakingData) && breakingData?.length > 0 &&
                              breakingData.map((item, index) => (
                                <SwiperSlide
                                  key={index}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#000",
                                  }}
                                >
                                  <Link href={`/article/${item?.redirect_url}`}>
                                    <Typography
                                      color={"#000"}
                                      textTransform={"uppercase"}
                                      textAlign={"center"}
                                      fontWeight={700}
                                      fontSize={15}
                                      lineHeight={1.5}
                                      px={3}
                                      sx={{
                                        wordSpacing: "2px",
                                      }}
                                      fontFamily={"var(--anek-font)"}
                                      borderRadius={"0 6px 6px 0"}
                                      className="textWrapperOne"
                                    >
                                      {item?.title}
                                    </Typography>
                                  </Link>
                                </SwiperSlide>
                              ))}
                          </Swiper>
                        </Box> */}
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
        
       
      )}

      {isVisible && (
        <Box
          position={"fixed"}
          bottom={150}
          right={{ xs: 10, sm: 10, md: 50 }}
          borderRadius={"50%"}
          bgcolor={"#fff"}
          width={40}
          height={40}
          border={"2px solid"}
          display={"grid"}
          sx={{ placeItems: "center", cursor: "pointer" }}
          zIndex={10}
          onClick={() => {
            window.scroll({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <MdOutlineKeyboardDoubleArrowUp color="#000" fontSize={30} />
        </Box>
      )}
      {!isVisible && (
        <Box
          position={"fixed"}
          bottom={150}
          left={20}
          borderRadius={"50%"}
          bgcolor={"#fff"}
          width={40}
          height={40}
          border={"2px solid"}
          display={"grid"}
          sx={{ placeItems: "center", cursor: "pointer" }}
          zIndex={10}
          onClick={() => {
            window.scroll({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          }}
        >
          <MdOutlineKeyboardDoubleArrowDown color="#000" fontSize={30} />
        </Box>
      )}
      {page === "category" ? (
        <Box position={"relative"} mt={breakingControl === "no" ? 21 : 1.3}>
          {children}
        </Box>
      ) : (
        <Box position={"relative"} mt={breakingControl === "no" ? 21 : 1.3}>
          {children}
        </Box>
      )}
{/* 
      {path === "/" && isVisible && open && (
        <Box position={"fixed"} left={10} bottom={10} zIndex={10}>
          <Box position={"relative"}>
            <Box position={"absolute"} top={-10} right={-10}>
              <AiFillCloseCircle
                fontSize={32}
                cursor={"pointer"}
                onClick={() => setOpen(false)}
                color="#000"
                style={{ backgroundColor: "#fff", borderRadius: "50%" }}
                // style={{ border: "2px solid #000", borderRadius: "50%" }}
              />
            </Box>
            <LiveTvPop />
          </Box>
        </Box>
      )}

      {subPop && (
        <Box
          position={"fixed"}
          right={100}
          top={225}
          className="bounce-in-right"
        >
          <Box position={"relative"}>
            <Box position={"absolute"} top={-10} right={-10} zIndex={3}>
              <AiFillCloseCircle
                fontSize={26}
                cursor={"pointer"}
                onClick={() => setSubPop(false)}
                color="#000"
                style={{ backgroundColor: "#fff", borderRadius: "50%" }}
                // style={{border: "2px solid #000", borderRadius: "50%"}}
              />
            </Box>
          </Box>
          <Link
            href="https://www.youtube.com/@NewsTamil24X7TV?sub_confirmation=1"
            target="_blank"
          >
            <Button
              startIcon={<AiOutlineYoutube style={{ fontSize: 32 }} />}
              sx={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 18,
                fontFamily: "var(--oswald-font)",
                bgcolor: "red",
                "&:hover": {
                  bgcolor: "red",
                },
              }}
            >
              Subscribe
            </Button>
          </Link>
        </Box>
      )} */}

      <Footer />
    </div>
  );
}

export default HomepageLayout;
