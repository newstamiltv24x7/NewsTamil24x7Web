import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ShareIcon from "../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../public/newsTamilIcons/icons/dark-share.svg";
import Image from "next/image";
import { Box, ClickAwayListener } from "@mui/material";
import Link from "next/link";
import { getHours, shareCards } from "@/utils/libs";
import { useTheme } from "@/theme/ThemeContext";
import PlayBtn from "../public/newsTamilIcons/icons/play-btn.svg";
import { FaRegEye } from "react-icons/fa6";
import FacebookNew from "../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../public/newsTamilIcons/icon-pack/Frame 4.svg";

function BigCard({ list, index, type, page, viewControl }) {
  const { mode } = useTheme();
  const [shareOpen, setShareOpen] = React.useState(false);
  const [newsId, setNewsId] = React.useState("");

  const handleSetId = (id) => {
    if (id === newsId) {
      setShareOpen(!shareOpen);
    } else {
      setNewsId(id);
      setShareOpen(true);
    }
  };

  return (
    <Card
      sx={{
        boxShadow: "none",
        backgroundImage: "none",
        pl: index !== 0 ? 1 : 0,
      }}
    >
      <Box
        height={{
          xs: "fit-content",
          sm: "fit-content",
          md: type === "mainAd" ? 172 : 200,
        }}
        borderRadius={"6px"}
        overflow={"hidden"}
        position={"relative"}
      >
        {/* {list?.youtube_embed_id === "" ? ( */}
        <Link href={`/article/${list?.story_desk_created_name || list?._id || '#'}`}>
          <Image
            src={list?.story_cover_image_url}
            alt={list?.news_image_caption}
            width={1200}
            height={type === "mainAd" ? 419 : 800}
            loading="lazy"
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            style={{
              width: "100%",
              height: "100%",
              objectFit: type === "mainAd" ? "contain" : "fill",
              borderRadius: "6px",
            }}
          />
          {list?.youtube_embed_id !== "" && (
            <Image
              fetchPriority="high"
              rel="preload"
              src={PlayBtn}
              alt="play-button"
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
      </Box>
      <CardContent
        sx={{
          p: 1,
          px: 0,
          pb: "2px",
          "&.MuiCardContent-root:last-child": {
            paddingBottom: 1,
          },
        }}
      >
        <Link href={`/article/${list?.story_desk_created_name || list?._id || '#'}`}>
          <Typography
            fontFamily={"var(--anek-font)"}
            className="textWrapper"
            fontSize={16}
            lineHeight={1.5}
            component={"h2"}
            fontWeight={550}
            height={{ xs: "fit-content", sm: "fit-content", md: 70 }}
          >
            {list?.story_title_name}
          </Typography>
        </Link>
        <Box>
          <Typography
            fontFamily={"var(--anek-font)"}
            className=""
            fontSize={14}
            lineHeight={1.3}
            component={"h2"}
            pt={1.3}
            fontWeight={"bold"}
            sx={{
              color: "#fb6002",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {list?.story_subject_name}
          </Typography>
          <Box
            display={"flex"}
            gap={1}
            alignItems={"center"}
            justifyContent={"space-between"}
            mt={1}
          >
            {viewControl === "yes" && (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={1}
                fontFamily={"var(--anek-font)"}
                fontSize={14}
                fontWeight={300}
              >
                <FaRegEye
                  style={{ opacity: 0.8, position: "relative", top: -1 }}
                />{" "}
                {list?.view_count}
              </Box>
            )}
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={1}
            >
              <Typography
                fontFamily={"var(--anek-font)"}
                className="textWrapper"
                fontSize={12}
                lineHeight={1.3}
                component={"span"}
                fontWeight={300}
                // sx={{ color: "#fff" }}
              >
                {getHours(list?.updatedAt)}
              </Typography>
              <Image
                fetchPriority="high"
                rel="preload"
                src={mode === "light" ? DarkShareIcon : ShareIcon}
                alt="share"
                width={18}
                height={18}
                style={{ cursor: "pointer" }}
                onClick={() => handleSetId(list?._id)}
              />
            </Box>
          </Box>
        </Box>

        {list?._id === newsId && shareOpen && (
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
              bottom={page === "india" ? 20 : 10}
              right={page === "india" ? "6%" : "13%"}
              bgcolor={"#dedede"}
              border={"1px solid #fff"}
              boxShadow={"0px 0px 10px 0px rgba(0,0,0,0.75)"}
              sx={{
                "& img": {
                  cursor: "pointer",
                },
              }}
            >
              <Image
                fetchPriority="high"
                rel="preload"
                src={FacebookNew}
                alt="fb"
                width={24}
                height={24}
                onClick={() => shareCards("fb", list?.story_desk_created_name)}
              />
              <Image
                fetchPriority="high"
                rel="preload"
                src={WhatsAppNew}
                alt="wp"
                width={24}
                height={24}
                onClick={() => shareCards("wp", list?.story_desk_created_name)}
              />
              <Image
                fetchPriority="high"
                rel="preload"
                src={TwitterNew}
                alt="wp"
                width={24}
                height={24}
                onClick={() =>
                  shareCards(
                    "x",
                    list?.story_desk_created_name,
                    list?.story_title_name
                  )
                }
              />
              <Image
                fetchPriority="high"
                rel="preload"
                src={YoutubeNew}
                alt="wp"
                width={24}
                height={24}
                onClick={() => shareCards("yt")}
              />

              <Image
                fetchPriority="high"
                rel="preload"
                src={TelegramNew}
                alt="wp"
                width={24}
                height={24}
                onClick={() =>
                  shareCards(
                    "tele",
                    list?.story_desk_created_name,
                    list?.story_title_name
                  )
                }
              />
              <Image
                fetchPriority="high"
                rel="preload"
                src={InstagramNew}
                alt="wp"
                width={24}
                height={24}
                onClick={() => shareCards("insta")}
              />
              <Image
                fetchPriority="high"
                rel="preload"
                src={ThreadsNew}
                alt="wp"
                width={24}
                height={24}
                onClick={() => shareCards("td")}
              />
              <Image
                fetchPriority="high"
                rel="preload"
                src={LinkedinNew}
                alt="wp"
                width={24}
                height={24}
                onClick={() => shareCards("lk", list?.story_desk_created_name)}
              />
            </Box>
          </ClickAwayListener>
        )}
      </CardContent>
    </Card>
  );
}

export default BigCard;
