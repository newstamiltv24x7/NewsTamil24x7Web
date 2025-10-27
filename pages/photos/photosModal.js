import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HomepageLayout from "@/layouts/HomepageLayout";
import { Button, Grid } from "@mui/material";
import HorizontalCard from "@/commonComponents/HorizontalCard";
import { IoGridOutline } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";
import Image from "next/image";
import { convertTime, shareNews } from "@/utils/libs";
import Facebook from "../../public/newsTamilIcons/icons/fb.svg";
import WhatsApp from "../../public/newsTamilIcons/icons/whatsapp.svg";
import Instagram from "../../public/newsTamilIcons/icons/insta.png";
import Youtube from "../../public/newsTamilIcons/icons/youtube.svg";
import Linkedin from "../../public/newsTamilIcons/icons/linkedin.svg";
import Thread from "../../public/newsTamilIcons/icons/threads.svg";
import Twitter from "../../public/newsTamilIcons/icons/twitter.svg";
import { IoMdMail } from "react-icons/io";
import { useTheme } from "@/theme/ThemeContext";
import { RiInstagramFill } from "react-icons/ri";
import {
  FaAnglesRight,
  FaFacebook,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import Link from "next/link";
import PhotosViewerPop from "@/components/PhotosViewerPop";

export default function PhotosModal({
  menuData,
  trendingData,
  photos,
  breakingData,
  quickControl,
  breakingControl,
  viewControl
}) {
  const photosImg = photos?.at(0)?.c_photos_continue_item;
  // const TRENDING = trendingData?.at(0)?.data ?? [];
  const [gridView, setGridView] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(false);
  const [photosImgSlider, setPhotosImgSlider] = React.useState([]);

  const { mode } = useTheme();

  const handlePopUp = (list) => {
    setOpen(true);
    setData(list);
    setPhotosImgSlider(photosImg)
  };
  const handlePopUpClose = (list) => {
    setOpen(false);
    setPhotosImgSlider([])

  }

  return (
    <HomepageLayout
      menuData={menuData}
      breakingData={breakingData}
      quickControl={quickControl}
      breakingControl={breakingControl}
    >
      <Box maxWidth={1440} px={2} mx={"auto"} width={"100%"}>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box
                fontWeight={"bold"}
                bgcolor={"#ff992c"}
                borderRadius={"6px"}
                width={"90%"}
                p={1}
                mb={1}
                color={"#000"}
                fontFamily={"var(--anek-font)"}
                textTransform={"uppercase"}
                fontSize={18}
              >
                {`PHOTOS - ${photos?.at(0)?.c_photos_title}`}
              </Box>
              <Box
                // bgcolor={"#000"}
                p={0.5}
                borderRadius={"50%"}
                width={40}
                height={40}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {gridView ? (
                  <IoGridOutline
                    color="#000"
                    fontSize={30}
                    fontWeight={600}
                    onClick={() => setGridView(false)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <CiBoxList
                    color="#000"
                    fontSize={30}
                    fontWeight={600}
                    onClick={() => setGridView(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </Box>
            </Box>
            <Typography
              fontFamily={"var(--arial-font)"}
              className=""
              fontSize={12}
              lineHeight={1.3}
              component={"p"}
              fontWeight={400}
              mb={1}
            >
             {photos?.at(0)?.updatedAt ? "Updated" : "Created" }  : {photos?.at(0)?.updatedAt ? convertTime(photos?.at(0)?.updatedAt) : convertTime(photos?.at(0)?.createdAt)}
            </Typography>
            <Box>
              {!gridView ? (
                <Grid container spacing={1} mt={1}>
                  {Array.isArray(photosImg) &&
                    photosImg.map((list) => (
                      <Grid item xs={4}>
                        <Box
                          position={"relative"}
                          onClick={() => handlePopUp(list?._id)}
                          sx={{ cursor: "pointer" }}
                        >
                          <Box
                            width={"100%"}
                            height={"auto"}
                            border={"1px solid #c1c1c1"}
                          >
                            <Image
                            fetchPriority="high" rel="preload"
                              src={list?.c_photos_continue_img}
                              alt={list?.c_photos_continue_img}
                              width={800}
                              height={800}
                              loading="lazy"
                              style={{ width: "100%", height: "100%" }}
                              className="photos-photo"
                            />
                          </Box>
                          <Typography
                            bgcolor={"#000"}
                            color={"#fff"}
                            position={"absolute"}
                            bottom={0}
                            p={2}
                            width={"100%"}
                            className="textWrapper"
                            fontFamily={"var(--anek-font)"}
                            fontSize={16}
                          >
                            {list?.c_photos_continue_sub_title}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              ) : (
                <Box mt={2}>
                  {Array.isArray(photosImg) &&
                    photosImg.map((list) => (
                      <Box
                        position={"relative"}
                        my={1}
                        onClick={() => handlePopUp(list?._id)}
                        sx={{ cursor: "pointer" }}
                      >
                        <Box
                          width={"100%"}
                          height={"auto"}
                          border={"1px solid #c1c1c1"}
                        >
                          <Image
                          fetchPriority="high" rel="preload"
                            src={list?.c_photos_continue_img}
                            alt={list?.c_photos_continue_img}
                            width={800}
                            height={800}
                            loading="lazy"
                            style={{ width: "100%", height: "100%" }}
                            className="photos-photo"
                          />
                        </Box>
                        <Typography
                          bgcolor={"#000"}
                          color={"#fff"}
                          position={"absolute"}
                          bottom={0}
                          p={2}
                          width={"100%"}
                          className="textWrapper"
                          fontFamily={"var(--anek-font)"}
                          fontSize={16}
                        >
                          {list?.c_photos_continue_sub_title}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              )}
            </Box>
            <Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={2}
                border={"1px solid #cbcbcb"}
                p={1}
                mt={2}
                borderRadius={"6px"}
                sx={{
                  img: {
                    cursor: "pointer",
                  },
                  svg: {
                    cursor: "pointer",
                  },
                  img: {
                    cursor: "pointer",
                  },
                  "img:hover": {
                    transform: "scale(1.1)",
                    filter: "drop-shadow(0px 0px 3px #fff)",
                  },
                  "svg:hover": {
                    transform: "scale(1.1)",
                    filter: "drop-shadow(0px 0px 3px #fff)",
                  },
                }}
              >
                <Typography
                  fontFamily={"var(--arial-font)"}
                  className="textWrapper"
                  fontSize={20}
                  component={"p"}
                  fontWeight={"bold"}
                >
                  Share :
                </Typography>
                <Image
                fetchPriority="high" rel="preload"
                  src={Facebook}
                  alt="fb"
                  width={24}
                  height={24}
                  onClick={() => shareNews("fb")}
                />
                <Image
                fetchPriority="high" rel="preload"
                  src={WhatsApp}
                  alt="wp"
                  width={31}
                  height={31}
                  onClick={() => shareNews("wp")}
                />
                <Image
                fetchPriority="high" rel="preload"
                  src={Instagram}
                  alt="insta"
                  width={35}
                  height={35}
                  onClick={() => shareNews("insta")}
                />
                <Image
                fetchPriority="high" rel="preload"
                  src={Youtube}
                  alt="insta"
                  width={28}
                  height={28}
                  onClick={() => shareNews("yt")}
                />
                <Image
                fetchPriority="high" rel="preload"
                  src={Linkedin}
                  alt="insta"
                  width={23}
                  height={23}
                  onClick={() => shareNews("lk")}
                />
                <Image
                fetchPriority="high" rel="preload"
                  src={Thread}
                  alt="insta"
                  width={25}
                  height={25}
                  onClick={() => shareNews("td")}
                  style={{
                    filter: mode === "dark" && "invert(1)",
                  }}
                />
                <Image
                fetchPriority="high" rel="preload"
                  src={Twitter}
                  alt="insta"
                  width={25}
                  height={25}
                  style={{
                    filter: mode === "dark" && "invert(1)",
                  }}
                  onClick={() => shareNews("x", photos?.at(0)?.c_photos_title)}
                />
                <IoMdMail
                  fontSize={28}
                  onClick={() =>
                    shareNews("mail", photos?.at(0)?.c_photos_title)
                  }
                />
              </Box>
              <Box bgcolor={mode === "dark" ? "#272626" : "#f1f1f1"} my={2}>
                <Typography
                  component={"h5"}
                  textTransform={"uppercase"}
                  fontWeight={"bold"}
                  mb={1}
                  fontSize={"1.2rem"}
                  pl={"4px"}
                  fontFamily={"var(--anek-font)"}
                  textAlign={"center"}
                  p={2}
                >
                  புதிய செய்திகளுக்கு நியூஸ் தமிழ் 24x7 சேனலை SUBSCRIBE
                  செய்யுங்கள்
                </Typography>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignContent={"center"}
                  gap={2}
                  pb={2}
                >
                  <Button
                    startIcon={<FaYoutube />}
                    sx={{
                      fontSize: 12,
                      color: "#fff",
                      bgcolor: "#ff0302",
                      textTransform: "uppercase",
                      fontFamily: "var(--oswald-font)",
                      "&:hover": {
                        bgcolor: "#ff0302",
                      },
                    }}
                    onClick={() => shareNews("yt")}
                  >
                    Subscribe
                  </Button>
                  <Link
                    href={"https://www.facebook.com/newstamiltv24x7"}
                    target="_blank"
                  >
                    <Button
                      startIcon={<FaFacebook />}
                      sx={{
                        color: "#fff",
                        bgcolor: "#3b5999",
                        textTransform: "uppercase",
                        fontFamily: "var(--oswald-font)",
                        fontSize: 12,
                        "&:hover": {
                          bgcolor: "#3b5999",
                        },
                      }}
                    >
                      Follow
                    </Button>
                  </Link>
                  <Link
                    href={"https://www.twitter.com/newstamiltv24x7"}
                    target="_blank"
                  >
                    <Button
                      startIcon={<FaXTwitter />}
                      sx={{
                        fontSize: 12,
                        color: "#fff",
                        textTransform: "uppercase",
                        fontFamily: "var(--oswald-font)",
                        bgcolor: "#121212",
                        "&:hover": {
                          bgcolor: "#121212",
                        },
                      }}
                    >
                      Follow
                    </Button>
                  </Link>
                  <Link
                    href={"https://www.instagram.com/newstamiltv24x7"}
                    target="_blank"
                  >
                    <Button
                      startIcon={<RiInstagramFill />}
                      sx={{
                        fontSize: 12,
                        textTransform: "uppercase",
                        fontFamily: "var(--oswald-font)",
                        color: "#fff",
                        bgcolor: "#e2306c",
                        "&:hover": {
                          bgcolor: "#e2306c",
                        },
                      }}
                    >
                      Follow
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box position={"sticky"} top={150} mt={1}>
              <Typography
                component={"h5"}
                textTransform={"uppercase"}
                fontWeight={"bold"}
                borderLeft={"4px solid #fb6002"}
                mb={2}
                pl={"8px"}
                fontSize={24}
                fontFamily={"var(--anek-font)"}
              >
                Trending News
              </Typography>
              {Array.isArray(trendingData) &&
                trendingData?.slice(0, 8)?.map((list) => (
                  <React.Fragment key={list._id}>
                    <HorizontalCard list={list} viewControl={viewControl} />
                    <Box display={"grid"} sx={{ placeItems: "center" }}>
                      <hr
                        style={{
                          width: "98%",
                          border: "0.5px solid #666666",
                          margin: "0px 0 16px 0",
                        }}
                      />
                    </Box>
                  </React.Fragment>
                ))}
            </Box>
          </Grid>
        </Grid>
        <PhotosViewerPop
          photosImg={photosImgSlider}
          open={open}
          close={handlePopUpClose}
          data={data}
          title={photos?.at(0)?.c_photos_title}
        />
      </Box>
    </HomepageLayout>
  );
}
