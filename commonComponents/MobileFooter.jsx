import { Box, Typography } from "@mui/material";
import React from "react";
import Logo from "../public/newsTamilIcons/icons/main-logo.png";
import Image from "next/image";
import Link from "next/link";
import { BsFillRssFill } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io5";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSquareThreads,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import PlayStore from "../public/newsTamilIcons/icons/playstore.png";
import AppStore from "../public/newsTamilIcons/icons/ios.png";

function MobileFooter() {
  const List = [
    {
      id: 1,
      icon: (
        <FaFacebook
          fontSize={24}
          color="#fff"
          style={{ position: "relative", top: 3 }}
        />
      ),
      link: "https://www.facebook.com/newstamiltv24x7",
    },
    {
      id: 2,
      icon: (
        <FaInstagram
          fontSize={24}
          color="#fff"
          style={{ position: "relative", top: 3 }}
        />
      ),
      link: "https://www.instagram.com/newstamiltv24x7",
    },
    {
      id: 3,
      icon: (
        <FaXTwitter
          fontSize={24}
          color="#fff"
          style={{ position: "relative", top: 3 }}
        />
      ),
      link: "https://www.twitter.com/newstamiltv24x7",
    },
    {
      id: 4,
      icon: (
        <FaSquareThreads
          fontSize={24}
          color="#fff"
          style={{ position: "relative", top: 3 }}
        />
      ),
      link: "https://www.threads.net/@newstamiltv24x7",
    },
    {
      id: 5,
      icon: (
        <FaTelegramPlane
          fontSize={24}
          color="#fff"
          style={{ position: "relative", top: 3 }}
        />
      ),
      link: "#",
    },
    {
      id: 6,
      icon: (
        <FaLinkedin
          fontSize={24}
          color="#fff"
          style={{ position: "relative", top: 3 }}
        />
      ),
      link: "https://www.linkedin.com/in/newstamil24x7/",
    },
    {
      id: 7,
      icon: (
        <FaYoutube
          fontSize={24}
          color="#fff"
          style={{ position: "relative", top: 3 }}
        />
      ),
      link: "https://www.youtube.com/@NewsTamil24X7TV",
    },
    {
      id: 8,
      icon: (
        <IoLogoWhatsapp
          fontSize={24}
          color="#fff"
          style={{ position: "relative", top: 3 }}
        />
      ),
      link: "https://www.whatsapp.com/channel/0029Va4vPaK2kNFqBXHBgy2t",
    },
    {
      id: 9,
      icon: (
        <BsFillRssFill
          fontSize={24}
          color="#fff"
          style={{ position: "relative", top: 3 }}
        />
      ),
      link: `/rss`,
    },
  ];

  return (
    <Box bgcolor={"#121212"} p={2}>
      <Box display={"grid"} sx={{ placeItems: "center" }} mb={2}>
        <Image
          src={Logo}
          alt="news-tamil-footer-logo"
          width={200}
          height={400}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          style={{
            objectFit: "contain",
            height: "100%",
            position: "relative",
            top: 3,
          }}
        />
      </Box>

      <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={3}
                  px={1.5}
                  py={1.5}
                  // height={30}
                  // borderRadius={"0 0 4px 4px"}
                  position={"relative"}
                  top={0}
                  marginBottom={2}
                  // bgcolor={"#e3e2e2"}
                  textAlign={"center"}
                  width={"100%"}
                  lineHeight={0}
                >
                  <Box border={"1px solid #fff"} p={0.5} borderRadius={5}>
                  <Link href={"https://play.google.com/store/apps/details?id=com.news.tamil24X7&hl=en"} style={{lineHeight:0}} target="_blank"><Image src={PlayStore} alt="play" width={100} height={30} /></Link>
                  </Box>
                  <Box border={"1px solid #fff"} p={0.5} borderRadius={5}>
                  <Link href={"#"} target="_blank"><Image src={AppStore} alt="app" width={100} height={30} style={{lineHeight:0}} /></Link>
                  </Box>
                  
                  
                </Box>

      <Box display={"flex"} justifyContent={"space-around"}>
        {List.map((list) => (
          <React.Fragment key={list.id}>
            <Link href={list.link} target="_blank">
              {list.icon}
            </Link>
          </React.Fragment>
        ))}
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-around"}
        color={"#fff"}
        alignItems={"center"}
        flexWrap={"wrap"}
        mt={2}
      >
        <Typography
          fontFamily={"var(--anek-font)"}
          borderRight={"3px solid #cbcbcb"}
          pr={2}
        >
          <Link href={"/videos"}>Live</Link>
        </Typography>
        <Typography
          fontFamily={"var(--anek-font)"}
          borderRight={"3px solid #cbcbcb"}
          pr={2}
        >
          <Link href={"/about-us"}>About Us</Link>
        </Typography>
        <Typography
          fontFamily={"var(--anek-font)"}
          borderRight={"3px solid #cbcbcb"}
          pr={2}
        >
          Newsletters
        </Typography>
        <Typography
          fontFamily={"var(--anek-font)"}
          borderRight={"3px solid #cbcbcb"}
          pr={2}
        >
          <Link href={"/terms-of-use"}>Terms of Use</Link>
        </Typography>
        <Typography fontFamily={"var(--anek-font)"} mt={1} borderRight={"3px solid #cbcbcb"}pr={2}>
          <Link href={"/privacy-policy"}>Privacy policy</Link>
        </Typography>

        <Typography fontFamily={"var(--anek-font)"} mt={1} borderRight={"3px solid #cbcbcb"}pr={2}>
          <Link href={"/grievance-officer"}>Grievance Officer</Link>
        </Typography>
      </Box>

     
    </Box>
  );
}

export default MobileFooter;
