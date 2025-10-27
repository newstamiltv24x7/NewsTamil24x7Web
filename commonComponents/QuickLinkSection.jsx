import React, { useEffect, useState } from "react";
import { TfiLayoutListThumb } from "react-icons/tfi";
import { GrBlog } from "react-icons/gr";
import { Box, Button } from "@mui/material";
import Link from "next/link";
// import Chat from "../public/newsTamilIcons/icons/live-1.gif";
// import Image from "next/image";

function QuickLinkSection({list}) {
  
  return (
    <Box component={"div"}>
      {Array.isArray(list) && list?.length > 0 &&
        list.slice(0, 5).map((item) => (
          <Button
            key={item?._id}
            startIcon={
              item?.type === "live-blog" ? (
                // <GrBlog color="red" />
                <Box
          width={16}
          height={16}
          ml={1}
          bgcolor={"red"}
          borderRadius={"50%"}
          className="ping"
        ></Box>

              ) : (
                <TfiLayoutListThumb color="#fb6002" />
              )
            }
            sx={{
              color: "#000",
              "&:hover": {
                color: "#fff",
                bgcolor: "#fb6002",
              },
              fontSize: 14,
              px: 0.5,
              fontWeight: 700,
              fontFamily: "var(--anek-font)",
              // bgcolor: "#fff",
              mr: 2,
            }}
          >
           {
            item.type === "live-blog" ? 
            (
              <Link href={`/live-blog/${item?.redirect_url}`} replace>
                {item.short_name}
              </Link>
            ) : (
              <Link href={`/listicle/${item?.redirect_url}`} replace>
                {item.short_name}
              </Link>
            )
           }
            
          </Button>
        ))}
    </Box>
  );
}

export default QuickLinkSection;
