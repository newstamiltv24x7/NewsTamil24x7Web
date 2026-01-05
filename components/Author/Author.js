import { Box, Grid, Skeleton } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "../../public/newsTamilIcons/icons/main-logo.png";
import Link from "next/link";

import { getAuthorByName, getAuthorByUrl } from "@/commonComponents/WebApiFunction/ApiFunctions";

function Author({ SlugName }) {
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchAuthor = async () => {
      if (!SlugName) return;
      setLoading(true);
      // Try by display name first, then try as a slug/url (e.g. newstamil-web)
      let res = await getAuthorByName(SlugName);
      // if nothing useful returned, try url/slug param
      const isEmpty = (r) => !r || (r.payloadJson && r.payloadJson.length === 0) || (Array.isArray(r) && r.length === 0);
      if (isEmpty(res)) {
        const slug = SlugName?.toString()?.toLowerCase()?.replace(/\s+/g, "-");
        res = await getAuthorByUrl(slug);
      }
      setLoading(false);
      if (!mounted) return;
      // API returns payloadJson or payloadJson[0].data depending on implementation
      const payload = res?.payloadJson ?? res;
      // try common shapes
      const user = Array.isArray(payload?.docs) ? payload.docs[0] : (payload?.at ? payload.at(0) : payload?.[0]) || payload?.data?.[0] || payload?.[0];
      const aboutText = user?.c_about_user ?? user?.c_about_user?.toString() ?? "";
      setAbout(aboutText || "");
    };

    fetchAuthor();
    return () => {
      mounted = false;
    };
  }, [SlugName]);

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
        >
          <Grid item md={6} xs={6} sm={6}>
            <Box>
              <h1>{SlugName}</h1>
              {loading ? (
                <Skeleton variant="text" width={300} />
              ) : (
                about && <div dangerouslySetInnerHTML={{ __html: about }} />
              )}
            </Box>
          </Grid>
          <Grid item md={6} xs={6} sm={6} sx={{ placeItems: "center" }}>
            <div style={{ background: "#000000" }}>
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