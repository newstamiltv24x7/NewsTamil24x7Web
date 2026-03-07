import Footer from "@/commonComponents/Footer";
import Navbar from "@/commonComponents/Navbar";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState, memo } from "react";
import {
  MdOutlineKeyboardDoubleArrowDown,
  MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";
import dynamic from "next/dynamic";
import { addUserData } from "@/redux/reducer/userReducer";
import { useDispatch } from "react-redux";
import { getDeviceId } from "@/commonComponents/WebApiFunction/ApiFunctions";

/**
 * VerticalSwiper is loaded client-side only (ssr: false) so the ~120 kB
 * Swiper bundle is never blocking the server render or the main thread
 * during initial page load.
 *
 * The loading placeholder reserves the identical 50 px height so the
 * browser never needs to re-flow the breaking-news bar — eliminating the
 * CLS shift that occurs when the real Swiper mounts.
 */
const VerticalSwiper = dynamic(
  () => import("@/commonComponents/VerticalSwiper"),
  {
    ssr: false,
    loading: () => (
      <Box
        sx={{
          height: "50px",
          minHeight: "50px",
          aspectRatio: "28 / 1",
          display: "flex",
          alignItems: "center",
          px: 3,
        }}
      >
        <Skeleton variant="text" width="100%" height={20} sx={{ bgcolor: "#cbcbcb" }} />
      </Box>
    ),
  }
);

function HomepageLayout({
  children,
  menuData,
  page,
  breakingData,
  quickControl,
  breakingControl,
  viewControl,
  disableSpacer = false // control navbar spacer from parent
}) {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);

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
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });

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
      <Navbar menuData={menuData} quickControl={quickControl} disableSpacer={disableSpacer} />
      {breakingControl !== "no" &&
        Array.isArray(breakingData) &&
        breakingData.length > 0 && (
          <Box borderBottom={"0.5px solid #3b3b3b"} sx={{ minHeight: 50 }}>
            <Box
              px={2}
              maxWidth={1440}
              mt={quickControl === "no" ? 19 : 21}
              mx={"auto"}
            >
              <>
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
                      </Grid>
                    </Grid>
                </Box>
            </>
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
