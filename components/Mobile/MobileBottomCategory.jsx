import MobileCard from "@/commonComponents/MobileCard";
import ViewAllBtn from "@/commonComponents/ViewAllBtn";
import { getAllNewsList } from "@/commonComponents/WebApiFunction/ApiFunctions";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegCaretSquareDown } from "react-icons/fa";
import { useSelector } from "react-redux";
const CryptoJS = require("crypto-js");
const secretPassphrase = `${process.env.NEXT_PUBLIC_DECODER}`;
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import { useTheme } from "@/theme/ThemeContext";
import { FaRegEye } from "react-icons/fa6";
import { getHours, shareCards } from "@/utils/libs";

import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";

function MobileBottomCategory({viewControl}) {
  const HomePageNews = useSelector((state) => state.HomePageNewsReducer?.data);
  console.log()
  const SeventhCategoryId = HomePageNews?.at(10)?.c_category_id;
  const EighthCategoryId = HomePageNews?.at(11)?.c_category_id;
  const NinethCategoryId = HomePageNews?.at(12)?.c_category_id;
  const TenthCategoryId = HomePageNews?.at(13)?.c_category_id;

  const [newsList, setNewsList] = useState([]);
  const [seventhNewsList, setSeventhNewsList] = useState([]);
  const [eighthNewsList, setEighthNewsList] = useState([]);
  const [ninethNewsList, setNinethNewsList] = useState([]);
  const [tenthNewsList, setTenthNewsList] = useState([]);

  const { mode } = useTheme();

  const [shareOpen, setShareOpen] = useState(false);
  const [newsId, setNewsId] = useState("");

  const handleSetId = (id) => {
    if (id === newsId) {
      setShareOpen(!shareOpen);
    } else {
      setNewsId(id);
      setShareOpen(true);
    }
  };


  const GetSeventhCategory = async () => {
    if (HomePageNews?.length > 0) {
      try {
        const body = {
          n_page: 1,
          n_limit: 4,
          main_category_id: SeventhCategoryId,
        };
        const response = await getAllNewsList(body);
        if (response?.payloadJson?.length > 0) {
          const firstNews = CryptoJS.AES.decrypt(response?.payloadJson,secretPassphrase).toString(CryptoJS.enc.Utf8);
          const result = JSON.parse(firstNews);
          setSeventhNewsList(result?.at(0)?.data);
        } else {
          setSeventhNewsList([]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const GetEighthCategory = async () => {
    if (HomePageNews?.length > 0) {
      try {
        const body = {
          n_page: 1,
          n_limit: 4,
          main_category_id: EighthCategoryId,
        };
        const response = await getAllNewsList(body);
        if (response?.payloadJson?.length > 0) {
          const firstNews = CryptoJS.AES.decrypt(response?.payloadJson,secretPassphrase).toString(CryptoJS.enc.Utf8);
          const result = JSON.parse(firstNews);
          setEighthNewsList(result?.at(0)?.data);
        } else {
          setEighthNewsList([]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const GetNinethCategory = async () => {
    if (HomePageNews?.length > 0) {
      try {
        const body = {
          n_page: 1,
          n_limit: 4,
          main_category_id: NinethCategoryId,
        };
        const response = await getAllNewsList(body);
        if (response?.payloadJson?.length > 0) {
          const firstNews = CryptoJS.AES.decrypt(response?.payloadJson,secretPassphrase).toString(CryptoJS.enc.Utf8);
          const result = JSON.parse(firstNews);
          setNinethNewsList(result?.at(0)?.data);
        } else {
          setNinethNewsList([]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const GetTenthCategory = async () => {
    if (HomePageNews?.length > 0) {
      try {
        const body = {
          n_page: 1,
          n_limit: 4,
          main_category_id: TenthCategoryId,
        };
        const response = await getAllNewsList(body);
        if (response?.payloadJson?.length > 0) {
          const firstNews = CryptoJS.AES.decrypt(response?.payloadJson,secretPassphrase).toString(CryptoJS.enc.Utf8);
          const result = JSON.parse(firstNews);
          setTenthNewsList(result?.at(0)?.data);
        } else {
          setTenthNewsList([]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    // GetFirstCategory();
    // GetSecondCategory();
    // GetThirdCategory();
    // GetFourthCategory();
    // GetFifthCategory();
    // GetSixthCategory();
    GetSeventhCategory();
    GetEighthCategory();
    GetNinethCategory();
    //GetTenthCategory();
  }, [HomePageNews]);

  return (
    <div>
  

      {seventhNewsList?.length > 0 && (
        <Accordion
          defaultExpanded
          sx={{ bgcolor: "transparent", backgroundImage: "none" }}
        >
          <AccordionSummary
            expandIcon={<FaRegCaretSquareDown />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="accordion-content"
            sx={{
              "&MuiAccordionSummary-content": {
                m: 0,
              },
            }}
          >
            <Box
              borderLeft={"4px solid #fb6002"}
              pl={1}
              fontWeight={700}
              textTransform={"uppercase"}
              fontFamily={"var(--anek-font)"}
            >
              {HomePageNews?.at(6)?.c_category_name}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Box
                pb={newsId === seventhNewsList?.at(0)?._id && shareOpen ? 0 : 2}
                pt={1}
                borderBottom={"1px solid #313131"}
              >
                <Link
                  href={`/article/${
                    seventhNewsList?.at(0)?.story_desk_created_name || seventhNewsList?.at(0)?._id || '#'
                  }`}
                >
                  <Box position={"relative"}>
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={seventhNewsList?.at(0)?.story_cover_image_url}
                      alt={seventhNewsList?.at(0)?.story_subject_name}
                      width={1800}
                      height={900}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        cursor: "pointer",
                      }}
                    />
                    {viewControl === "yes" && 
                    <Box
                      position={"absolute"}
                      bottom={5}
                      right={0}
                      bgcolor={"#000"}
                      p={0.5}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap={1}
                      fontFamily={"var(--anek-font)"}
                      fontSize={16}
                      fontWeight={600}
                      color={"#fff"}
                    >
                      <FaRegEye /> {seventhNewsList?.at(0)?.view_count}
                    </Box>
                    }
                  </Box>
                </Link>

                <Typography
                  fontFamily={"var(--anek-font)"}
                  // className="textWrapperTwo"
                  fontSize={15}
                  lineHeight={1.5}
                  component={"h2"}
                  fontWeight={600}
                  // height={64}
                  mt={"2px"}
                  overflow={"hidden"}
                  sx={{ cursor: "pointer" }}
                >
                  <Link
                    href={`/article/${
                      seventhNewsList?.at(0)?.story_desk_created_name
                    }`}
                  >
                    {seventhNewsList?.at(0)?.story_title_name}
                  </Link>
                </Typography>
                <Typography
                  fontFamily={"var(--anek-font)"}
                  className="textWrapper"
                  fontSize={13}
                  lineHeight={1.5}
                  component={"p"}
                  fontWeight={400}
                  pt={"10px"}
                  sx={{ cursor: "pointer" }}
                >
                  <Link
                    href={`/article/${
                      seventhNewsList?.at(0)?.story_desk_created_name
                    }`}
                  >
                    {seventhNewsList?.at(0)?.story_sub_title_name}
                  </Link>
                </Typography>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  mt={1}
                  flexWrap={"wrap"}
                >
                  <Typography
                    fontFamily={"var(--anek-font)"}
                    fontSize={13}
                    lineHeight={1.3}
                    component={"span"}
                    fontWeight={"bold"}
                    sx={{
                      color: "#fb6002",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    width={"50%"}
                    // sx={{ color: "#fff" }}
                  >
                    {seventhNewsList?.at(0)?.story_subject_name}
                  </Typography>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={2}
                  >
                    <Typography
                      fontFamily={"var(--anek-font)"}
                      className="textWrapper"
                      fontSize={13}
                      lineHeight={1.3}
                      component={"span"}
                      fontWeight={300}
                      sx={{ opacity: 0.5 }}
                    >
                      {/* {`${dayjs(seventhNewsList?.at(0)?.updatedAt).format(
                        "MMM DD, YYYY"
                      )} - ${dayjs(seventhNewsList?.at(0)?.updatedAt).format(
                        "HH: mm"
                      )}`} */}
                      {getHours(seventhNewsList?.at(0)?.updatedAt)}
                    </Typography>
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={mode === "dark" ? ShareIcon : DarkShareIcon}
                      alt="share"
                      width={20}
                      height={20}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSetId(seventhNewsList?.at(0)?._id)}
                    />
                  </Box>
                </Box>
                {seventhNewsList?.at(0)?._id === newsId && shareOpen && (
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-evenly"}
                    // my={1}
                    // px={1}
                    py={1}
                    // mt={-1}
                    // height={30}
                    borderRadius={"0 0 4px 4px"}
                    // position={"relative"}
                    // top={0}
                    bgcolor={"#e3e2e2"}
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
                        cursor: "pointer",
                      },
                      "& img": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={YoutubeNew}
                      alt="wp"
                      width={24}
                      height={24}
                      onClick={() => shareCards("yt")}
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={FacebookNew}
                      alt="wp"
                      width={24}
                      height={24}
                      onClick={() =>
                        shareCards(
                          "fb",
                          seventhNewsList?.at(0).story_desk_created_name
                        )
                      }
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={WhatsAppNew}
                      alt="wp"
                      width={24}
                      height={24}
                      onClick={() =>
                        shareCards(
                          "wp",
                          seventhNewsList?.at(0).story_desk_created_name,
                          "mobile"
                        )
                      }
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={TwitterNew}
                      alt="wp"
                      width={24}
                      height={24}
                      onClick={() =>
                        shareCards(
                          "x",
                          seventhNewsList?.at(0).story_desk_created_name,
                          seventhNewsList?.at(0).story_sub_title_name
                        )
                      }
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={InstagramNew}
                      alt="insta"
                      width={24}
                      height={24}
                      onClick={() => shareCards("insta")}
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={ThreadsNew}
                      alt="insta"
                      width={24}
                      height={24}
                      onClick={() => shareCards("td")}
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={LinkedinNew}
                      alt="insta"
                      width={24}
                      height={24}
                      onClick={() =>
                        shareCards(
                          "lk",
                          seventhNewsList?.at(0).story_desk_created_name
                        )
                      }
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={TelegramNew}
                      alt="insta"
                      width={24}
                      height={24}
                      onClick={() =>
                        shareCards(
                          "tele",
                          seventhNewsList?.at(0).story_desk_created_name,
                          seventhNewsList?.at(0).story_sub_title_name
                        )
                      }
                    />
                  </Box>
                )}
              </Box>
              <Box pt={1} pb={0}>
                {Array.isArray(seventhNewsList) &&
                  seventhNewsList.slice(1, 15).map((list) => (
                    <Box
                      key={list?._id}
                      borderBottom={"1px solid #313131"}
                      mb={1}
                      pt={0.1}
                    >
                      <MobileCard
                        mode={mode}
                        list={list}
                        handleSetId={handleSetId}
                        newsId={newsId}
                        shareOpen={shareOpen}
                        viewControl={viewControl}
                      />
                    </Box>
                  ))}
              </Box>
            </Box>
            <ViewAllBtn
              link={HomePageNews?.at(6)?.c_category_slug_english_name}
            />
          </AccordionDetails>
        </Accordion>
      )}

      {eighthNewsList?.length > 0 && (
        <Accordion
          defaultExpanded
          sx={{ bgcolor: "transparent", backgroundImage: "none" }}
        >
          <AccordionSummary
            expandIcon={<FaRegCaretSquareDown />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="accordion-content"
            sx={{
              "&MuiAccordionSummary-content": {
                m: 0,
              },
            }}
          >
            <Box
              borderLeft={"4px solid #fb6002"}
              pl={1}
              fontWeight={700}
              textTransform={"uppercase"}
              fontFamily={"var(--anek-font)"}
            >
              {HomePageNews?.at(7)?.c_category_name}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Box
                pb={newsId === eighthNewsList?.at(0)?._id && shareOpen ? 0 : 2}
                pt={1}
                borderBottom={"1px solid #313131"}
              >
                <Link
                  href={`/article/${
                    eighthNewsList?.at(0)?.story_desk_created_name
                  }`}
                >
                  <Box position={"relative"}>
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={eighthNewsList?.at(0)?.story_cover_image_url}
                      alt={eighthNewsList?.at(0)?.story_subject_name}
                      width={1800}
                      height={900}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        cursor: "pointer",
                      }}
                    />
                    {viewControl === "yes" && 
                    <Box
                      position={"absolute"}
                      bottom={5}
                      right={0}
                      bgcolor={"#000"}
                      p={0.5}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap={1}
                      fontFamily={"var(--anek-font)"}
                      fontSize={16}
                      fontWeight={600}
                      color={"#fff"}
                    >
                      <FaRegEye /> {eighthNewsList?.at(0)?.view_count}
                    </Box>
                  }
                  </Box>
                </Link>

                <Typography
                  fontFamily={"var(--anek-font)"}
                  // className="textWrapperTwo"
                  fontSize={15}
                  lineHeight={1.5}
                  component={"h2"}
                  fontWeight={600}
                  // height={64}
                  mt={"2px"}
                  overflow={"hidden"}
                  sx={{ cursor: "pointer" }}
                >
                  <Link
                    href={`/article/${
                      eighthNewsList?.at(0)?.story_desk_created_name
                    }`}
                  >
                    {eighthNewsList?.at(0)?.story_title_name}
                  </Link>
                </Typography>
                <Typography
                  fontFamily={"var(--anek-font)"}
                  className="textWrapper"
                  fontSize={13}
                  lineHeight={1.5}
                  component={"p"}
                  fontWeight={400}
                  pt={"10px"}
                  sx={{ cursor: "pointer" }}
                >
                  <Link
                    href={`/article/${
                      eighthNewsList?.at(0)?.story_desk_created_name
                    }`}
                  >
                    {eighthNewsList?.at(0)?.story_sub_title_name}
                  </Link>
                </Typography>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  mt={1}
                  flexWrap={"wrap"}
                >
                  <Typography
                    fontFamily={"var(--anek-font)"}
                    fontSize={13}
                    lineHeight={1.3}
                    component={"span"}
                    fontWeight={"bold"}
                    sx={{
                      color: "#fb6002",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    width={"50%"}
                    // sx={{ color: "#fff" }}
                  >
                    {eighthNewsList?.at(0)?.story_subject_name}
                  </Typography>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={2}
                  >
                    <Typography
                      fontFamily={"var(--anek-font)"}
                      className="textWrapper"
                      fontSize={13}
                      lineHeight={1.3}
                      component={"span"}
                      fontWeight={300}
                      sx={{ opacity: 0.5 }}
                    >
                      {/* {`${dayjs(eighthNewsList?.at(0)?.updatedAt).format(
                        "MMM DD, YYYY"
                      )} - ${dayjs(eighthNewsList?.at(0)?.updatedAt).format(
                        "HH: mm"
                      )}`} */}
                      {getHours(eighthNewsList?.at(0)?.updatedAt)}
                    </Typography>
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={mode === "dark" ? ShareIcon : DarkShareIcon}
                      alt="share"
                      width={20}
                      height={20}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSetId(eighthNewsList?.at(0)?._id)}
                    />
                  </Box>
                </Box>
                {eighthNewsList?.at(0)?._id === newsId && shareOpen && (
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-evenly"}
                    // my={1}
                    // px={1}
                    py={1}
                    // mt={-1}
                    // height={30}
                    borderRadius={"0 0 4px 4px"}
                    // position={"relative"}
                    // top={0}
                    bgcolor={"#e3e2e2"}
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
                        cursor: "pointer",
                      },
                      "& img": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={YoutubeNew}
                      alt="wp"
                      width={24}
                      height={24}
                      onClick={() => shareCards("yt")}
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={FacebookNew}
                      alt="wp"
                      width={24}
                      height={24}
                      onClick={() =>
                        shareCards(
                          "fb",
                          eighthNewsList?.at(0).story_desk_created_name
                        )
                      }
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={WhatsAppNew}
                      alt="wp"
                      width={24}
                      height={24}
                      onClick={() =>
                        shareCards(
                          "wp",
                          eighthNewsList?.at(0).story_desk_created_name,
                          "mobile"
                        )
                      }
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={TwitterNew}
                      alt="wp"
                      width={24}
                      height={24}
                      onClick={() =>
                        shareCards(
                          "x",
                          eighthNewsList?.at(0).story_desk_created_name,
                          eighthNewsList?.at(0).story_sub_title_name
                        )
                      }
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={InstagramNew}
                      alt="insta"
                      width={24}
                      height={24}
                      onClick={() => shareCards("insta")}
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={ThreadsNew}
                      alt="insta"
                      width={24}
                      height={24}
                      onClick={() => shareCards("td")}
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={LinkedinNew}
                      alt="insta"
                      width={24}
                      height={24}
                      onClick={() =>
                        shareCards(
                          "lk",
                          eighthNewsList?.at(0).story_desk_created_name
                        )
                      }
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={TelegramNew}
                      alt="insta"
                      width={24}
                      height={24}
                      onClick={() =>
                        shareCards(
                          "tele",
                          eighthNewsList?.at(0).story_desk_created_name,
                          eighthNewsList?.at(0).story_sub_title_name
                        )
                      }
                    />
                  </Box>
                )}
              </Box>
              <Box pt={1} pb={0}>
                {Array.isArray(eighthNewsList) &&
                  eighthNewsList.slice(1, 15).map((list) => (
                    <Box
                      key={list?._id}
                      borderBottom={"1px solid #313131"}
                      mb={1}
                      pt={0.1}
                    >
                      <MobileCard
                        mode={mode}
                        list={list}
                        handleSetId={handleSetId}
                        newsId={newsId}
                        shareOpen={shareOpen}
                        viewControl={viewControl}
                      />
                    </Box>
                  ))}
              </Box>
            </Box>
            <ViewAllBtn
              link={HomePageNews?.at(7)?.c_category_slug_english_name}
            />
          </AccordionDetails>
        </Accordion>
      )}

      {ninethNewsList?.length > 0 && (
        <Accordion
          defaultExpanded
          sx={{ bgcolor: "transparent", backgroundImage: "none" }}
        >
          <AccordionSummary
            expandIcon={<FaRegCaretSquareDown />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="accordion-content"
            sx={{
              "&MuiAccordionSummary-content": {
                m: 0,
              },
            }}
          >
            <Box
              borderLeft={"4px solid #fb6002"}
              pl={1}
              fontWeight={700}
              textTransform={"uppercase"}
              fontFamily={"var(--anek-font)"}
            >
              {HomePageNews?.at(8)?.c_category_name}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Box
                pb={newsId === ninethNewsList?.at(0)?._id && shareOpen ? 0 : 2}
                pt={1}
                borderBottom={"1px solid #313131"}
              >
                <Link
                  href={`/article/${
                    ninethNewsList?.at(0)?.story_desk_created_name
                  }`}
                >
                  <Box position={"relative"}>
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={ninethNewsList?.at(0)?.story_cover_image_url}
                      alt={ninethNewsList?.at(0)?.story_subject_name}
                      width={1800}
                      height={900}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        cursor: "pointer",
                      }}
                    />
                    {viewControl === "yes" && 
                    <Box
                      position={"absolute"}
                      bottom={5}
                      right={0}
                      bgcolor={"#000"}
                      p={0.5}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap={1}
                      fontFamily={"var(--anek-font)"}
                      fontSize={16}
                      fontWeight={600}
                      color={"#fff"}
                    >
                      <FaRegEye /> {ninethNewsList?.at(0)?.view_count}
                    </Box>
                }
                  </Box>
                </Link>

                <Typography
                  fontFamily={"var(--anek-font)"}
                  // className="textWrapperTwo"
                  fontSize={15}
                  lineHeight={1.5}
                  component={"h2"}
                  fontWeight={600}
                  // height={64}
                  mt={"2px"}
                  overflow={"hidden"}
                  sx={{ cursor: "pointer" }}
                >
                  <Link
                    href={`/article/${
                      ninethNewsList?.at(0)?.story_desk_created_name
                    }`}
                  >
                    {ninethNewsList?.at(0)?.story_title_name}
                  </Link>
                </Typography>
                <Typography
                  fontFamily={"var(--anek-font)"}
                  className="textWrapper"
                  fontSize={13}
                  lineHeight={1.5}
                  component={"p"}
                  fontWeight={400}
                  pt={"10px"}
                  sx={{ cursor: "pointer" }}
                >
                  <Link
                    href={`/article/${
                      ninethNewsList?.at(0)?.story_desk_created_name
                    }`}
                  >
                    {ninethNewsList?.at(0)?.story_sub_title_name}
                  </Link>
                </Typography>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  mt={1}
                  flexWrap={"wrap"}
                >
                  <Typography
                    fontFamily={"var(--anek-font)"}
                    fontSize={13}
                    lineHeight={1.3}
                    component={"span"}
                    fontWeight={"bold"}
                    sx={{
                      color: "#fb6002",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    width={"50%"}
                    // sx={{ color: "#fff" }}
                  >
                    {ninethNewsList?.at(0)?.story_subject_name}
                  </Typography>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={2}
                  >
                    <Typography
                      fontFamily={"var(--anek-font)"}
                      className="textWrapper"
                      fontSize={13}
                      lineHeight={1.3}
                      component={"span"}
                      fontWeight={300}
                      sx={{ opacity: 0.5 }}
                    >
                      {/* {`${dayjs(ninethNewsList?.at(0)?.updatedAt).format(
                        "MMM DD, YYYY"
                      )} - ${dayjs(ninethNewsList?.at(0)?.updatedAt).format(
                        "HH: mm"
                      )}`} */}
                      {getHours(ninethNewsList?.at(0)?.updatedAt)}
                    </Typography>
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={mode === "dark" ? ShareIcon : DarkShareIcon}
                      alt="share"
                      width={20}
                      height={20}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSetId(ninethNewsList?.at(0)?._id)}
                    />
                  </Box>
                </Box>
                {ninethNewsList?.at(0)?._id === newsId && shareOpen && (
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-evenly"}
                    // my={1}
                    // px={1}
                    py={1}
                    // mt={-1}
                    // height={30}
                    borderRadius={"0 0 4px 4px"}
                    // position={"relative"}
                    // top={0}
                    bgcolor={"#e3e2e2"}
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
                        cursor: "pointer",
                      },
                      "& img": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={YoutubeNew}
                      alt="wp"
                      width={24}
                      height={24}
                      onClick={() => shareCards("yt")}
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={FacebookNew}
                      alt="wp"
                      width={24}
                      height={24}
                      onClick={() =>
                        shareCards(
                          "fb",
                          ninethNewsList?.at(0).story_desk_created_name
                        )
                      }
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={WhatsAppNew}
                      alt="wp"
                      width={24}
                      height={24}
                      onClick={() =>
                        shareCards(
                          "wp",
                          ninethNewsList?.at(0).story_desk_created_name,
                          "mobile"
                        )
                      }
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={TwitterNew}
                      alt="wp"
                      width={24}
                      height={24}
                      onClick={() =>
                        shareCards(
                          "x",
                          ninethNewsList?.at(0).story_desk_created_name,
                          ninethNewsList?.at(0).story_sub_title_name
                        )
                      }
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={InstagramNew}
                      alt="insta"
                      width={24}
                      height={24}
                      onClick={() => shareCards("insta")}
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={ThreadsNew}
                      alt="insta"
                      width={24}
                      height={24}
                      onClick={() => shareCards("td")}
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={LinkedinNew}
                      alt="insta"
                      width={24}
                      height={24}
                      onClick={() =>
                        shareCards(
                          "lk",
                          ninethNewsList?.at(0).story_desk_created_name
                        )
                      }
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={TelegramNew}
                      alt="insta"
                      width={24}
                      height={24}
                      onClick={() =>
                        shareCards(
                          "tele",
                          ninethNewsList?.at(0).story_desk_created_name,
                          ninethNewsList?.at(0).story_sub_title_name
                        )
                      }
                    />
                  </Box>
                )}
              </Box>
              <Box pt={1} pb={0}>
                {Array.isArray(ninethNewsList) &&
                  ninethNewsList.slice(1, 15).map((list) => (
                    <Box
                      key={list?._id}
                      borderBottom={"1px solid #313131"}
                      mb={1}
                      pt={0.1}
                    >
                      <MobileCard
                        mode={mode}
                        list={list}
                        handleSetId={handleSetId}
                        newsId={newsId}
                        shareOpen={shareOpen}
                        viewControl={viewControl}
                      />
                    </Box>
                  ))}
              </Box>
            </Box>
            <ViewAllBtn
              link={HomePageNews?.at(8)?.c_category_slug_english_name}
            />
          </AccordionDetails>
        </Accordion>
      )}

      {tenthNewsList?.length > 0 && (
        <Accordion
          defaultExpanded
          sx={{ bgcolor: "transparent", backgroundImage: "none" }}
        >
          <AccordionSummary
            expandIcon={<FaRegCaretSquareDown />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="accordion-content"
            sx={{
              "&MuiAccordionSummary-content": {
                m: 0,
              },
            }}
          >
            <Box
              borderLeft={"4px solid #fb6002"}
              pl={1}
              fontWeight={700}
              textTransform={"uppercase"}
              fontFamily={"var(--anek-font)"}
            >
              {HomePageNews?.at(9)?.c_category_name}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Box
                pb={newsId === tenthNewsList?.at(0)?._id && shareOpen ? 0 : 2}
                pt={1}
                borderBottom={"1px solid #313131"}
              >
                <Link
                  href={`/article/${
                    tenthNewsList?.at(0)?.story_desk_created_name
                  }`}
                >
                  <Box position={"relative"}>
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={tenthNewsList?.at(0)?.story_cover_image_url}
                      alt={tenthNewsList?.at(0)?.story_subject_name}
                      width={1800}
                      height={900}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        cursor: "pointer",
                      }}
                    />
                    {viewControl === "yes" && 
                    <Box
                      position={"absolute"}
                      bottom={5}
                      right={0}
                      bgcolor={"#000"}
                      p={0.5}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap={1}
                      fontFamily={"var(--anek-font)"}
                      fontSize={16}
                      fontWeight={600}
                      color={"#fff"}
                    >
                      <FaRegEye /> {tenthNewsList?.at(0)?.view_count}
                    </Box>
                  }
                  </Box>
                </Link>

                <Typography
                  fontFamily={"var(--anek-font)"}
                  // className="textWrapperTwo"
                  fontSize={15}
                  lineHeight={1.5}
                  component={"h2"}
                  fontWeight={600}
                  // height={64}
                  mt={"2px"}
                  overflow={"hidden"}
                  sx={{ cursor: "pointer" }}
                >
                  <Link
                    href={`/article/${
                      tenthNewsList?.at(0)?.story_desk_created_name
                    }`}
                  >
                    {tenthNewsList?.at(0)?.story_title_name}
                  </Link>
                </Typography>
                <Typography
                  fontFamily={"var(--anek-font)"}
                  className="textWrapper"
                  fontSize={13}
                  lineHeight={1.5}
                  component={"p"}
                  fontWeight={400}
                  pt={"10px"}
                  sx={{ cursor: "pointer" }}
                >
                  <Link
                    href={`/article/${
                      tenthNewsList?.at(0)?.story_desk_created_name
                    }`}
                  >
                    {tenthNewsList?.at(0)?.story_sub_title_name}
                  </Link>
                </Typography>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  mt={1}
                  flexWrap={"wrap"}
                >
                  <Typography
                    fontFamily={"var(--anek-font)"}
                    fontSize={13}
                    lineHeight={1.3}
                    component={"span"}
                    fontWeight={"bold"}
                    sx={{
                      color: "#fb6002",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    width={"50%"}
                    // sx={{ color: "#fff" }}
                  >
                    {tenthNewsList?.at(0)?.story_subject_name}
                  </Typography>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={2}
                  >
                    <Typography
                      fontFamily={"var(--anek-font)"}
                      className="textWrapper"
                      fontSize={13}
                      lineHeight={1.3}
                      component={"span"}
                      fontWeight={300}
                      sx={{ opacity: 0.5 }}
                    >
                      {/* {`${dayjs(tenthNewsList?.at(0)?.updatedAt).format(
                        "MMM DD, YYYY"
                      )} - ${dayjs(tenthNewsList?.at(0)?.updatedAt).format(
                        "HH: mm"
                      )}`} */}
                      {getHours(tenthNewsList?.at(0)?.updatedAt)}
                    </Typography>
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={mode === "dark" ? ShareIcon : DarkShareIcon}
                      alt="share"
                      width={20}
                      height={20}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSetId(tenthNewsList?.at(0)?._id)}
                    />
                  </Box>
                </Box>
                {tenthNewsList?.at(0)?._id === newsId && shareOpen && (
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-evenly"}
                    // my={1}
                    // px={1}
                    py={1}
                    // mt={-1}
                    // height={30}
                    borderRadius={"0 0 4px 4px"}
                    // position={"relative"}
                    // top={0}
                    bgcolor={"#e3e2e2"}
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
                        cursor: "pointer",
                      },
                      "& img": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={YoutubeNew}
                      alt="wp"
                      width={24}
                      height={24}
                      onClick={() => shareCards("yt")}
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={FacebookNew}
                      alt="wp"
                      width={24}
                      height={24}
                      onClick={() =>
                        shareCards(
                          "fb",
                          tenthNewsList?.at(0).story_desk_created_name
                        )
                      }
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={WhatsAppNew}
                      alt="wp"
                      width={24}
                      height={24}
                      onClick={() =>
                        shareCards(
                          "wp",
                          tenthNewsList?.at(0).story_desk_created_name,
                          "mobile"
                        )
                      }
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={TwitterNew}
                      alt="wp"
                      width={24}
                      height={24}
                      onClick={() =>
                        shareCards(
                          "x",
                          tenthNewsList?.at(0).story_desk_created_name,
                          tenthNewsList?.at(0).story_sub_title_name
                        )
                      }
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={InstagramNew}
                      alt="insta"
                      width={24}
                      height={24}
                      onClick={() => shareCards("insta")}
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={ThreadsNew}
                      alt="insta"
                      width={24}
                      height={24}
                      onClick={() => shareCards("td")}
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={LinkedinNew}
                      alt="insta"
                      width={24}
                      height={24}
                      onClick={() =>
                        shareCards(
                          "lk",
                          tenthNewsList?.at(0).story_desk_created_name
                        )
                      }
                    />
                    <Image 
                    fetchPriority="high" rel="preload"
                      src={TelegramNew}
                      alt="insta"
                      width={24}
                      height={24}
                      onClick={() =>
                        shareCards(
                          "tele",
                          tenthNewsList?.at(0).story_desk_created_name,
                          tenthNewsList?.at(0).story_sub_title_name
                        )
                      }
                    />
                  </Box>
                )}
              </Box>
              <Box pt={1} pb={0}>
                {Array.isArray(tenthNewsList) &&
                  tenthNewsList.slice(1, 15).map((list) => (
                    <Box
                      key={list?._id}
                      borderBottom={"1px solid #313131"}
                      mb={1}
                      pt={0.1}
                    >
                      <MobileCard
                        mode={mode}
                        list={list}
                        handleSetId={handleSetId}
                        newsId={newsId}
                        shareOpen={shareOpen}
                        viewControl={viewControl}
                      />
                    </Box>
                  ))}
              </Box>
            </Box>
            <ViewAllBtn
              link={HomePageNews?.at(9)?.c_category_slug_english_name}
            />
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}

export default MobileBottomCategory;
