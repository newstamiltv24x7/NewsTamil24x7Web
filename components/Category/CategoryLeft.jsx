import CardSection from "@/commonComponents/CardSection";
import {
  Box,
  Button,
  ClickAwayListener,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import { getHours, shareCards } from "@/utils/libs";
import PlayBtn from "../../public/newsTamilIcons/icons/play-btn.svg";
import { useTheme } from "@/theme/ThemeContext";
import { FaRegEye } from "react-icons/fa6";
import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";

function CategoryLeft({
  newsList,
  categoryName,
  count,
  loader,
  handleLoadMore,
  viewControl
}) {
  const { mode } = useTheme();

  const [shareOpen, setShareOpen] = React.useState(false);
  const [newsId, setNewsId] = React.useState("");

  const handleSetId = (id, data) => {
    if (id === newsId) {
      setShareOpen(!shareOpen);
    } else {
      setNewsId(id);
      setShareOpen(true);
    }
  };

  return (
    <Box className="border-class-cat" position={"relative"}>
      {categoryName?.toLowerCase() !== "cinema" && (
        <Grid container spacing={1}>
          <Grid item md={8} xs={12} sm={12}>
            <Box
              className="primary-border-class"
              position={"relative"}
              pr={2}
              pt={1}
            >
              <Link
                href={`/article/${newsList?.at(0)?.story_desk_created_name}`}
              >
                {loader ? (
                  <Skeleton variant="rectangular" width={"100%"} height={344} />
                ) : (
                  <Box
                    overflow={"hidden"}
                    height={380}
                    borderRadius={"6px"}
                    position={"relative"}
                  >
                    {/* {newsList?.at(0)?.youtube_embed_id === "" ? ( */}
                    <Image
                    fetchPriority="high" rel="preload"
                      src={newsList?.at(0)?.story_cover_image_url}
                      alt="newstamil-cover-image"
                      width={1200}
                      height={800}
                      // unoptimized
                      loading="lazy"
                      style={{
                        width: "100%",
                        objectFit: "fill",
                        height: "100%",
                        cursor: "pointer",
                        borderRadius: "6px",
                      }}
                    />
                    {newsList?.at(0)?.youtube_embed_id !== "" && (
                      <Image
                      fetchPriority="high" rel="preload"
                        src={PlayBtn}
                        alt="buton"
                        width={32}
                        height={56}
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          left: 10,
                          bottom: 10,
                        }}
                      />
                    )}
                  </Box>
                )}
              </Link>
              
                <Link
                  href={`/article/${newsList?.at(0)?.story_desk_created_name}`}
                >
                  <Typography
                fontFamily={"var(--anek-font)"}
                className="textWrapperTwo"
                fontSize={18}
                lineHeight={1.5}
                component={"h1"}
                fontWeight={650}
                height={56}
                mt={"24px"}
                sx={{ cursor: "pointer" }}
              >
                  {loader ? (
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={56}
                    />
                  ) : (
                    <>{newsList?.at(0)?.story_title_name}</>
                  )}
                   </Typography>
                </Link>
             
              <Typography
                fontFamily={"var(--anek-font)"}
                className="textWrapper"
                fontSize={15}
                lineHeight={1.5}
                component={"p"}
                fontWeight={550}
                mt={"10px"}
                height={68}
                sx={{ cursor: "pointer" }}
              >
                <Link
                  href={`/article/${newsList?.at(0)?.story_desk_created_name}`}
                >
                  {loader ? (
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={68}
                    />
                  ) : (
                    <>{newsList?.at(0)?.story_sub_title_name}</>
                  )}
                </Link>
              </Typography>

              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={2}
                my={2}
              >
                <Typography
                  fontFamily={"var(--anek-font)"}
                  fontSize={16}
                  lineHeight={1.3}
                  component={"span"}
                  fontWeight={"bold"}
                  sx={{
                    color: "#fb6002",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  // sx={{ color: "#fff" }}
                >
                  {newsList?.at(0)?.story_subject_name}
                </Typography>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={2}
                  position={"relative"}
                >
            {viewControl === "yes" && 
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={1}
                    fontFamily={"var(--anek-font)"}
                    fontSize={14}
                    fontWeight={300}
                  >
                    <FaRegEye /> {newsList?.at(0)?.view_count}
                  </Box>
              }
                  <Typography
                    fontFamily={"var(--anek-font)"}
                    className="textWrapper"
                    fontSize={14}
                    lineHeight={1.3}
                    component={"span"}
                    fontWeight={300}
                    // sx={{ color: "#fff" }}
                  >
                    {getHours(newsList?.at(0)?.updatedAt)}
                  </Typography>
                  <Image
                  fetchPriority="high" rel="preload"
                    src={mode === "dark" ? ShareIcon : DarkShareIcon}
                    alt="dark-share-icon"
                    width={24}
                    height={24}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSetId(newsList?.at(0)?._id)}
                  />
                  {newsList?.at(0)?._id === newsId && shareOpen && (
                    <ClickAwayListener onClickAway={() => setShareOpen(false)}>
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"flex-start"}
                        // flexDirection={"column"}
                        gap={1}
                        p={1}
                        // height={30}
                        borderRadius={"6px"}
                        position={"absolute"}
                        bottom={5}
                        right={22}
                        bgcolor={"#dedede"}
                        border={"1px solid #fff"}
                        boxShadow={"0px 0px 10px 0px rgba(0,0,0,0.75)"}
                        sx={{
                          "& img": {
                            cursor: "pointer",
                          },
                        }}
                      >
                        <Box display={"flex"} gap={1}>
                          <Image
                          fetchPriority="high" rel="preload"
                            src={FacebookNew}
                            alt="fb"
                            width={24}
                            height={24}
                            onClick={() =>
                              shareCards(
                                "fb",
                                newsList?.at(0)?.story_desk_created_name
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
                                newsList?.at(0)?.story_desk_created_name
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
                                newsList?.at(0)?.story_desk_created_name,
                                newsList?.at(0)?.story_sub_title_name
                              )
                            }
                          />
                          <Image
                          fetchPriority="high" rel="preload"
                            src={YoutubeNew}
                            alt="wp"
                            width={24}
                            height={24}
                            onClick={() => shareCards("yt")}
                          />
                        </Box>
                        <Box display={"flex"} gap={1}>
                          <Image
                          fetchPriority="high" rel="preload"
                            src={TelegramNew}
                            alt="wp"
                            width={24}
                            height={24}
                            onClick={() =>
                              shareCards(
                                "tele",
                                newsList?.at(0)?.story_desk_created_name,
                                newsList?.at(0)?.story_sub_title_name
                              )
                            }
                          />
                          <Image
                          fetchPriority="high" rel="preload"
                            src={InstagramNew}
                            alt="wp"
                            width={24}
                            height={24}
                            onClick={() => shareCards("insta")}
                          />
                          <Image
                          fetchPriority="high" rel="preload"
                            src={ThreadsNew}
                            alt="wp"
                            width={24}
                            height={24}
                            onClick={() => shareCards("td")}
                          />
                          <Image
                          fetchPriority="high" rel="preload"
                            src={LinkedinNew}
                            alt="wp"
                            width={24}
                            height={24}
                            onClick={() =>
                              shareCards(
                                "lk",
                                newsList?.at(0)?.story_desk_created_name
                              )
                            }
                          />
                        </Box>
                      </Box>
                    </ClickAwayListener>
                  )}
                </Box>
              </Box>
              <hr
                style={{
                  width: "100%",
                  border: "0.5px solid #666666",
                  margin: "30px 0 0px 0",
                }}
              />
            </Box>
          </Grid>
          <Grid item md={4} xs={12} sm={12}>
            {loader ? (
              <Skeleton variant="rectangular" width={"100%"} height={150} />
            ) : (
              <>
                {[
                  Array.isArray(newsList) &&
                    newsList?.slice(1, 3)?.map((list) => (
                      <Box className="" position={"relative"} pr={1.2}>
                        <CardSection data={list} cardHeight={180} viewControl={viewControl} />
                        <Box display={"grid"} sx={{ placeItems: "center" }}>
                          <hr
                            style={{
                              width: "97%",
                              border: "0.5px solid #666666",
                              margin: "6px 0 6px 0",
                            }}
                          />
                        </Box>
                      </Box>
                    )),
                ]}
              </>
            )}
          </Grid>
          {[
            Array.isArray(newsList) &&
              newsList?.slice(3, newsList.length)?.map((list, index) => (
                <Grid item xs={12} sm={12} md={4} key={list?._id}>
                  <Box
                    className={(index + 1) % 3 !== 0 && "border-class"}
                    position={"relative"}
                    pr={1.2}
                  >
                    <CardSection data={list} cardHeight={180} viewControl={viewControl} />
                    <Box display={"grid"} sx={{ placeItems: "center" }}>
                      <hr
                        style={{
                          width: "97%",
                          border: "0.5px solid #666666",
                          margin: "6px 0 6px 0",
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              )),
          ]}
        </Grid>
      )}

      {categoryName?.toLowerCase() === "cinema" && (
        <Grid container spacing={1}>
          <Grid item md={8} xs={12} sm={12}>
            <Box
              className="primary-border-class"
              position={"relative"}
              pr={2}
              pt={1}
            >
              <Link
                href={`/article/${newsList?.at(0)?.story_desk_created_name}`}
              >
                {/* {newsList?.at(0)?.youtube_embed_id === "" ? ( */}
                <Image
                fetchPriority="high" rel="preload"
                  src={newsList?.at(0)?.story_cover_image_url}
                  alt="newstamil-story=cover-image"
                  width={1200}
                  height={800}
                  // unoptimized
                  loading="lazy"
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    height: "336px",
                    cursor: "pointer",
                    borderRadius: "6px",
                  }}
                />
                {newsList?.at(0)?.youtube_embed_id !== "" && (
                  <Image
                  fetchPriority="high" rel="preload"
                    src={PlayBtn}
                    alt="newstamil-button"
                    width={32}
                    height={56}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      left: 10,
                      bottom: 10,
                    }}
                  />
                )}
              </Link>
              <Typography
                fontFamily={"var(--anek-font)"}
                className="textWrapperTwo"
                fontSize={18}
                lineHeight={1.5}
                component={"h2"}
                fontWeight={650}
                height={54}
                mt={"2px"}
                sx={{ cursor: "pointer" }}
              >
                <Link
                  href={`/article/${newsList?.at(0)?.story_desk_created_name}`}
                >
                  {newsList?.at(0)?.story_title_name}
                </Link>
              </Typography>
              <Typography
                fontFamily={"var(--anek-font)"}
                className="textWrapper"
                fontSize={15}
                lineHeight={1.5}
                component={"p"}
                fontWeight={550}
                mt={"10px"}
                height={68}
                sx={{ cursor: "pointer" }}
              >
                <Link
                  href={`/article/${newsList?.at(0)?.story_desk_created_name}`}
                >
                  {newsList?.at(0)?.story_sub_title_name}
                </Link>
              </Typography>

              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={2}
                my={2}
              >
                <Typography
                  fontFamily={"var(--anek-font)"}
                  fontSize={16}
                  lineHeight={1.3}
                  component={"span"}
                  fontWeight={"bold"}
                  sx={{
                    color: "#fb6002",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  width={"70%"}
                  // sx={{ color: "#fff" }}
                >
                  {newsList?.at(0)?.story_subject_name}
                </Typography>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"cenetr"}
                  gap={1}
                >
                  <Typography
                    fontFamily={"var(--anek-font)"}
                    className="textWrapper"
                    fontSize={14}
                    lineHeight={1.3}
                    component={"span"}
                    fontWeight={300}
                    // sx={{ color: "#fff" }}
                  >
                    {getHours(newsList?.at(0)?.updatedAt)}
                  </Typography>
                  <Image
                  fetchPriority="high" rel="preload"
                    src={mode === "dark" ? ShareIcon : DarkShareIcon}
                    alt="share"
                    width={18}
                    height={18}
                    style={{ paddingLeft: "5px" }}
                  />
                </Box>
              </Box>
              <hr
                style={{
                  width: "100%",
                  border: "0.5px solid #666666",
                  margin: "40px 0 0px 0",
                }}
              />
            </Box>
          </Grid>
          <Grid item md={4} xs={12} sm={12}>
            <Grid container spacing={1}>
              {[
                Array.isArray(newsList) &&
                  newsList?.slice(1, 3)?.map((list) => (
                    <Grid item md={12} xs={12} sm={12}>
                      <Box
                        className="border-class"
                        position={"relative"}
                        pr={1.2}
                      >
                        <CardSection
                          data={list}
                          title="cinema"
                          cardHeight={180}
                          viewControl={viewControl}
                        />
                        <Box display={"grid"} sx={{ placeItems: "center" }}>
                          <hr
                            style={{
                              width: "97%",
                              border: "0.5px solid #666666",
                              margin: "6px 0 6px 0",
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  )),
              ]}
            </Grid>
          </Grid>
          {[
            Array.isArray(newsList) &&
              newsList?.slice(4, newsList?.length)?.map((list, index) => (
                <Grid item xs={12} sm={12} md={4} key={list?._id}>
                  <Box
                    className={(index + 1) % 3 !== 0 && "border-class"}
                    position={"relative"}
                    pr={1.2}
                  >
                    <CardSection data={list} cardHeight={180} viewControl={viewControl} />
                    <Box display={"grid"} sx={{ placeItems: "center" }}>
                      <hr
                        style={{
                          width: "97%",
                          border: "0.5px solid #666666",
                          margin: "6px 0 6px 0",
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              )),
          ]}
        </Grid>
      )}

      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        bgcolor={mode === "dark" ? "#272626" : "#f1f1f1"}
      >
        <Button
          variant="outlined"
          sx={{
            border: "1px solid transparent",
            color: "#fb6307",
            fontWeight: "bold",
            "&:hover": {
              color: mode === "dark" ? "#fff" : "#000 !important",
              border: "1px solid transparent",
              bgcolor: "transparent",
            },
          }}
          onClick={handleLoadMore}
          disabled={newsList?.length >= count}
        >
          Read More
        </Button>
      </Box>
    </Box>
  );
}

export default CategoryLeft;
