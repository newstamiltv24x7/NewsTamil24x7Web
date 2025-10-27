import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function LiveTvPop() {
  const HomePageNews = useSelector((state) => state.HomePageLiveReducer?.data);

  return (
    <Box width={"100%"} height={190}>
      <iframe
        width="100%"
        height="100%"
        src={`${HomePageNews?.c_url_web_link}?rel=0&amp;autoplay=1&mute=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </Box>
  );
}

export default LiveTvPop;
