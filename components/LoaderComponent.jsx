import React from "react";
import mainLogo from "../public/main-logo.png";
import { Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

function LoaderComponent() {
  return (
    <Box
      bgcolor={"#222222"}
      minHeight={"100vh"}
      display={"grid"}
      sx={{ placeItems: "center" }}
    >
      <Box
        py={1}
        sx={{
          width: {
            xs: "180px",
            sm: "200px",
            md: "240px",
          },
          height: "auto",
          position: "relative",
          aspectRatio: "3/1",
        }}
      >
        <Link href="/" prefetch>
          <Image
            fetchPriority="high" 
            rel="preload"
            src={mainLogo}
            alt="newstamil-logo"
            fill
            sizes="(max-width: 600px) 180px,
                 (max-width: 900px) 200px,
                 240px"
            priority
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
            }}
          />
        </Link>
      </Box>
    </Box>
  );
}

export default LoaderComponent;
