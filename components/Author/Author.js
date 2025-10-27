import { Box, Grid, Skeleton } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "../../public/newsTamilIcons/icons/main-logo.png";
import Link from "next/link";

function Author({SlugName}) {
  return (
    <Box mt={1}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={12}
          sm={12}
          display={"flex"}
          marginTop={"150px"}
          alignItems={"center"}
          marg
        >
          <Grid item md={6} xs={6} sm={6}>
            <Box>
              <h1>{SlugName}</h1>
            </Box>
          </Grid>
          <Grid item md={6} xs={6} sm={6} sx={{ placeItems: "center" }}>
            <div style={{background:"#000000"}}>
              <Image
              fetchPriority="high" 
              rel="preload"
                src={Logo}
                alt="news-tamil-logo"
                width={480}
                height={180}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Author;
