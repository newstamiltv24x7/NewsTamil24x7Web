"use client";

import {
  Box,
  ClickAwayListener,
  Fade,
  Paper,
  Popper,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { shareCards } from "@/utils/libs";
import { useTheme } from "@/theme/ThemeContext";

import ShareIcon from "../../public/newsTamilIcons/icons/share.svg";
import DarkShareIcon from "../../public/newsTamilIcons/icons/dark-share.svg";
import FacebookNew from "../../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../../public/newsTamilIcons/icon-pack/Frame 4.svg";

/**
 * BannerShareButton — client-only component.
 * Isolated here so BannerLeftSection can remain a Server Component.
 *
 * Props:
 *   slug      — story slug used for all share URLs
 *   subTitle  — story sub-title passed to Twitter / Telegram share
 */
export default function BannerShareButton({ slug, subTitle }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const { mode } = useTheme();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <Box position="relative" top={3}>
      <Image
        fetchPriority="high"
        src={mode === "light" ? DarkShareIcon : ShareIcon}
        alt="share"
        width={17}
        height={17}
        style={{ cursor: "pointer" }}
        onClick={handleClick("left")}
      />
      <Popper
        sx={{ zIndex: 10 }}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap={1}
                  px={1}
                  py={1}
                  mt={-1}
                  borderRadius="0 0 4px 4px"
                  width="fit-content"
                  position="relative"
                  top={0}
                  bgcolor="#dedede"
                  sx={{ "& img": { cursor: "pointer" } }}
                >
                  <Image
                    fetchPriority="high"
                    src={FacebookNew}
                    alt="fb"
                    width={24}
                    height={24}
                    onClick={() => shareCards("fb", slug)}
                  />
                  <Image
                    fetchPriority="high"
                    src={WhatsAppNew}
                    alt="whatsapp-image"
                    width={24}
                    height={24}
                    onClick={() => shareCards("wp", slug)}
                  />
                  <Image
                    fetchPriority="high"
                    src={TwitterNew}
                    alt="twitter-image"
                    width={24}
                    height={24}
                    onClick={() => shareCards("x", slug, subTitle)}
                  />
                  <Image
                    fetchPriority="high"
                    src={YoutubeNew}
                    alt="youtube-image"
                    width={24}
                    height={24}
                    onClick={() => shareCards("yt")}
                  />
                  <Image
                    fetchPriority="high"
                    src={TelegramNew}
                    alt="telegram-image"
                    width={24}
                    height={24}
                    onClick={() => shareCards("tele", slug, subTitle)}
                  />
                  <Image
                    fetchPriority="high"
                    src={InstagramNew}
                    alt="instagram-image"
                    width={24}
                    height={24}
                    onClick={() => shareCards("insta")}
                  />
                  <Image
                    fetchPriority="high"
                    src={ThreadsNew}
                    alt="threads-image"
                    width={24}
                    height={24}
                    onClick={() => shareCards("td")}
                  />
                  <Image
                    fetchPriority="high"
                    src={LinkedinNew}
                    alt="linked-image"
                    width={24}
                    height={24}
                    onClick={() => shareCards("lk", slug)}
                  />
                </Box>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}
