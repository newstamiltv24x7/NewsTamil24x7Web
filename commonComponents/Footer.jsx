import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Logo from "../public/newsTamilIcons/icons/main-logo.png";
import Image from "next/image";
import ShortNewsIcon from "../public/newsTamilIcons/icon-pack/image_latest_sn.png";
import { BsFillRssFill } from "react-icons/bs";
import PlayStore from "../public/newsTamilIcons/icons/playstore.png";
import AppStore from "../public/newsTamilIcons/icons/ios.png";
import Link from "next/link";
import FacebookNew from "../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../public/newsTamilIcons/icon-pack/Frame 4.svg";
import GoogleNews from "../public/newsTamilIcons/icon-pack/image 4.png";
import Dailyhunt from "../public/newsTamilIcons/icon-pack/Frame 10.png";
import RssLogo from "../public/newsTamilIcons/icon-pack/image 5.png";
import { FaFacebook, FaSquareThreads, FaXTwitter } from "react-icons/fa6";
import {
  FaInstagram,
  FaLinkedin,
  FaTelegramPlane,
  FaYoutube,
} from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";

function Footer() {
  const List = [
    {
      id: 1,
      icon: (
        <FaFacebook fontSize={22} style={{ position: "relative", top: 3 }} />
      ),
      link: "https://www.facebook.com/newstamiltv24x7",
    },
    {
      id: 2,
      icon: (
        <FaInstagram fontSize={22} style={{ position: "relative", top: 3 }} />
      ),
      link: "https://www.instagram.com/newstamiltv24x7",
    },
    {
      id: 3,
      icon: (
        <FaXTwitter fontSize={22} style={{ position: "relative", top: 3 }} />
      ),
      link: "https://www.twitter.com/newstamiltv24x7",
    },
    {
      id: 4,
      icon: (
        <FaSquareThreads
          fontSize={22}
          style={{ position: "relative", top: 3 }}
        />
      ),
      link: "https://www.threads.net/@newstamiltv24x7",
    },
    {
      id: 5,
      icon: (
        <FaTelegramPlane
          fontSize={22}
          style={{ position: "relative", top: 3 }}
        />
      ),
      link: "#",
    },
    {
      id: 6,
      icon: (
        <FaLinkedin fontSize={22} style={{ position: "relative", top: 3 }} />
      ),
      link: "https://www.linkedin.com/in/newstamil24x7/",
    },
    {
      id: 7,
      icon: (
        <FaYoutube fontSize={22} style={{ position: "relative", top: 3 }} />
      ),
      link: "https://www.youtube.com/@NewsTamil24X7TV",
    },
    {
      id: 8,
      icon: (
        <IoLogoWhatsapp
          fontSize={22}
          style={{ position: "relative", top: 3 }}
        />
      ),
      link: "https://www.whatsapp.com/channel/0029Va4vPaK2kNFqBXHBgy2t",
    },
    {
      id: 9,
      icon: (
        <BsFillRssFill fontSize={22} style={{ position: "relative", top: 3 }} />
      ),
      link: `/rss`,
    },
  ];

  const getLink = (link) => {
    if (link === "Privacy Policy") {
      return `/privacy-policy`;
    } else if (link === "About Us") {
      return `/about-us`;
    }
      else if (link === "Terms of Use") {
      return `/terms-of-use`;
    } else if (link === "Grievance Officer") {
      return `/grievance-officer`;
    }else {
      return `#`;
    }
  };

  return (
    <Box
      width={"100%"}
      // height={100}
      mt={4}
      borderBottom={"1px solid #666666"}
      borderTop={"1px solid #666666"}
      bgcolor={"#121212"}
      color={"#fff"}
    >
      <Box
        maxWidth={1440}
        width={"100%"}
        mx={{ md: "inherit", lg: "auto" }}
        px={2}
        mt={1}
      >
        <Grid container spacing={1}>
          <Grid
            item
            md={3}
            xs={12}
            sm={12}
            display={"grid"}
            sx={{ placeItems: "center" }}
          >
            <Box
              component="div"
              // sx={{ display: { xs: "none", sm: "block" } }}
              position="relative"
              // top={10}
            >
               <Link href={"/"}>
               <Image src={Logo} alt="news-tamil-logo" width={280} height={95} />
               </Link>
             
            </Box>
             <Box
                
                p={"0px 0px 0px 0px"}
                borderRadius={"0 0 8px 8px"}
                bgcolor={"#000000ff"}
                color={"#000"}
                
                >
                  <Link href={"/short-news"}>
                    <Image
                      src={ShortNewsIcon}
                      alt="shorts-news-logo"
                      width={120}
                      // height={20}
                      style={{
                        objectFit: "contain",
                        width: "120px",
                        height: "25px",
                        position: "relative",
                        top: 2,
                        left: 0,
                      }}
                    />
                  </Link>
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={1}
                  px={1}
                  py={1}
                  // mt={-1}
                  // height={30}
                  borderRadius={"0 0 4px 4px"}
                  width={"fit-content"}
                  position={"relative"}
                  top={0}
                  sx={{
                    button: {
                      cursor: "pointer",
                      p: "0px 8px",
                      fontSize: { xs: 12, sm: 10, md: 12, lg: 14 },
                      fontFamily: "var(--oswald-font)",
                      borderRadius: "4px",
                      textTransform: "uppercase",
                    },
                    "& svg": {
                      width: 20,
                      height: 20,
                    },
                    "& a": {
                      position: "relative",
                      top: 3,
                    },
                  }}
                >
                  <Link
                    href={
                      "https://www.youtube.com/@NewsTamil24X7TV?sub_confirmation=1"
                    }
                    target="_blank"
                  >
                    <Image src={YoutubeNew} alt="fb" width={22} height={22} />
                  </Link>
                  <Link
                    href={"https://www.facebook.com/newstamiltv24x7"}
                    target="_blank"
                  >
                    <Image src={FacebookNew} alt="fb" width={22} height={22} />
                  </Link>
                  <Link
                    href={
                      "https://www.whatsapp.com/channel/0029Va4vPaK2kNFqBXHBgy2t"
                    }
                    target="_blank"
                  >
                    <Image src={WhatsAppNew} alt="fb" width={22} height={22} />
                  </Link>
                  <Link
                    href={"https://www.twitter.com/newstamiltv24x7"}
                    target="_blank"
                  >
                    <Image src={TwitterNew} alt="fb" width={22} height={22} />
                  </Link>
                  <Link
                    href={"https://www.instagram.com/newstamiltv24x7"}
                    target="_blank"
                  >
                    <Image
                      src={InstagramNew}
                      alt="insta"
                      width={22}
                      height={22}
                    />
                  </Link>
                  <Link
                    href={"https://www.threads.net/@newstamiltv24x7"}
                    target="_blank"
                  >
                    <Image
                      src={ThreadsNew}
                      alt="insta"
                      width={22}
                      height={22}
                    />
                  </Link>
                  <Link href={`https://www.linkedin.com/in/newstamil24x7/`}>
                    <Image
                      src={LinkedinNew}
                      alt="insta"
                      width={22}
                      height={22}
                    />
                  </Link>
                  <Link href={"https://t.me/newstamiltv24x7"} target="_blank">
                  <Image src={TelegramNew} alt="insta" width={22} height={22} />
                  </Link>
                  
                  <Link href={"/rss"} target="_blank">
                    <Image src={RssLogo} alt="gn" width={22} height={22} />
                  </Link>
                  <Link
                    href={"https://news.google.com/publications/CAAqBwgKMK7avwswu_XWAw?ceid=IN:ta&oc=3"}
                    target="_blank"
                  >
                     <Image src={GoogleNews} alt="gn" width={22} height={22} />
                  </Link>
                 
                  <Link
                    href={"https://m.dailyhunt.in/news/india/tamil/newstamil+24x7-epaper-newstamil/district-updates-district?mode=pwa&action=click"}
                    target="_blank"
                  >
                     <Image src={Dailyhunt} alt="dh" width={22} height={22} />
                  </Link>
                 
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={1}
                  px={1}
                  mb={1}
                  // height={30}
                  borderRadius={"0 0 4px 4px"}
                  width={"fit-content"}
                  position={"relative"}
                  top={0}
                  lineHeight={0}
                >
                  <Link href={"https://play.google.com/store/apps/details?id=com.news.tamil24X7&hl=en"} target="_blank"><Image src={PlayStore} alt="play" width={100} height={28} /></Link>
                  <Link href={"#"} target="_blank"><Image src={AppStore} alt="app" width={100} height={28}/></Link>
                  
                </Box>
          </Grid>
          <Grid item md={9} xs={12} sm={12}>
            <Box
              display={"flex"}
              justifyContent={{ xs: "center", sm: "center", md: "flex-end" }}
              alignItems={"center"}
              gap={2}
              p={"12px 18px 6px 0"}
              flexWrap={"wrap"}
              sx={{
                "& svg": {
                  cursor: "pointer",
                },
                "& img": {
                  cursor: "pointer",
                },
              }}
            >
              <Typography
                fontFamily={"var(--anek-font)"}
                borderRight={"4px solid #666666"}
                pr={2}
              >
                <Link href={"/videos/live"}>Live</Link>
              </Typography>
              <Typography fontFamily={"var(--anek-font)"}>
                Follows News Tamil
              </Typography>
              {List.map((list) => (
                <React.Fragment key={list.id}>
                  {/* {list.id === 9 ? ( */}
                  <Link href={list.link} target="_blank">
                    {list.icon}
                  </Link>
                </React.Fragment>
              ))}
            </Box>
            <Box
              display={"flex"}
              justifyContent={{ xs: "center", sm: "center", md: "flex-end" }}
              alignItems={"center"}
              gap={2}
              p={"12px 18px 6px 0"}
              flexWrap={"wrap"}
            >
              {[
                "About Us",
                "Careers",
                "Newsletters",
                "Terms of Use",
                "Privacy Policy",
                "Grievance Officer",
              ].map((list, index) => (
                <Link href={getLink(list)}>
                  <Typography
                    fontFamily={"var(--anek-font)"}
                    borderRight={"4px solid #666666"}
                    pr={2}
                    key={index}
                  >
                    {list}
                  </Typography>
                </Link>
              ))}
            </Box>
            <Box
              display={"flex"}
              justifyContent={{ xs: "center", sm: "center", md: "end" }}
              alignItems={"center"}
              gap={{ xs: 2, sm: 2, md: 12 }}
              p={"12px 18px 6px 0"}
            >
              <Typography fontFamily={"var(--anek-font)"}>
                © Copyright <b>Newstamil 24x7</b> {new Date().getFullYear()}. All
                rights reserved
              </Typography>
              {/* <Typography fontFamily={"var(--anek-font)"}>
                Hand-crafted & made with - <b>Datasense Technologies</b>
              </Typography> */}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Footer;
