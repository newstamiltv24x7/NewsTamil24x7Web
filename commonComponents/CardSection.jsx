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
import { FaRegEye } from "react-icons/fa6";
import PlayBtn from "../public/newsTamilIcons/icons/play-btn.svg";

import FacebookNew from "../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../public/newsTamilIcons/icon-pack/Frame 4.svg";

export default function CardSection({
  data,
  section,
  id,
  title,
  cardHeight,
  viewControl,
}) {
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
console.log("hello",data);

  return (
    <Card
      sx={{
        boxShadow: "none",
        backgroundImage: "none",
        pt: section !== "home" ? 1 : 0.5,
        // pr: 2,
        pl: id % 3 === 0 ? 0 : 2,
        px: 1,
        position: "relative",
      }}
    >
      <Box
        height={cardHeight}
        borderRadius={"6px"}
        overflow={"hidden"}
        position={"relative"}
      >
        {/* {data?.youtube_embed_id === "" ? ( */}
        <Link
          href={`/article/${data?.story_desk_created_name}`}
          style={{ position: "relative" }}
        >
          <Image
            fetchPriority="high"
            rel="preload"
            src={data?.story_cover_image_url}
            alt={data?.news_image_caption}
            width={1200}
            loading="lazy"
            height={800}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "6px",
              cursor: "pointer",
              objectFit: "fill",
            }}
          />
          {viewControl === "yes" && (
            <Box
              position={"absolute"}
              bottom={0}
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
              <FaRegEye /> {data?.view_count}
            </Box>
          )}
          {data?.youtube_embed_id !== "" && (
            <Image
              fetchPriority="high"
              rel="preload"
              src={PlayBtn}
              alt="button"
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
          pt: 1,
          px: 0,
          pb: 0,
          "&.MuiCardContent-root:last-child": {
            paddingBottom: 1,
          },
        }}
      >
        <Typography
          fontFamily={"var(--anek-font)"}
          // className={title === "cinema" ? "textWrapperTwo" : "textWrapper"}
          className={section === "home" ? "textWrappertwo" : "textWrapper"}
          fontSize={15}
          lineHeight={1.5}
          component={"h2"}
          fontWeight={550}
          sx={{ cursor: "pointer" }}
          overflow={"hidden"}
          height={section === "home" ? 46 : 66}
        >
          <Link href={`/article/${data?.story_desk_created_name}`}>
            {data?.story_title_name}
          </Link>
        </Typography>

        <Box
          display={"flex"}
          justifyContent={"space-between"}
          mb={0}
          mt={section === "home" ? 0 : 1}
          alignItems={"center"}
        >
          {title !== "cinema" && (
            <Typography
              fontFamily={"var(--anek-font)"}
              className=""
              fontSize={14}
              lineHeight={1.3}
              component={"p"}
              fontWeight={"bold"}
              sx={{
                color: "#fb6002",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              width={"60%"}
            >
              {data?.story_subject_name}
            </Typography>
          )}

          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={0.4}
            gap={1}
          >
            <Typography
              fontFamily={"var(--anek-font)"}
              className="textWrapper"
              fontSize={12}
              lineHeight={1.3}
              component={"span"}
              fontWeight={300}
              sx={{ whiteSpace: "nowrap" }}
            >
              {getHours(data?.updatedAt)}
            </Typography>
            <Image
              fetchPriority="high"
              rel="preload"
              src={mode === "light" ? DarkShareIcon : ShareIcon}
              alt="share"
              width={17}
              height={17}
              style={{ cursor: "pointer" }}
              onClick={() => handleSetId(data?._id)}
            />
          </Box>
        </Box>
        {data?._id === newsId && shareOpen && (
          <ClickAwayListener onClickAway={() => setShareOpen(false)}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              flexDirection={"column"}
              gap={1}
              p={1}
              // height={30}
              borderRadius={"6px"}
              position={"absolute"}
              bottom={5}
              right={32}
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
                  fetchPriority="high"
                  rel="preload"
                  src={FacebookNew}
                  alt="fb"
                  width={24}
                  height={24}
                  onClick={() =>
                    shareCards("fb", data?.story_desk_created_name)
                  }
                />
                <Image
                  fetchPriority="high"
                  rel="preload"
                  src={WhatsAppNew}
                  alt="wp"
                  width={24}
                  height={24}
                  onClick={() =>
                    shareCards("wp", data?.story_desk_created_name)
                  }
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
                      data?.story_desk_created_name,
                      data?.story_sub_title_name
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
              </Box>
              <Box display={"flex"} gap={1}>
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
                      data?.story_desk_created_name,
                      data?.story_sub_title_name
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
                  onClick={() =>
                    shareCards("lk", data?.story_desk_created_name)
                  }
                />
              </Box>
            </Box>
          </ClickAwayListener>
        )}
      </CardContent>
    </Card>
  );
}
