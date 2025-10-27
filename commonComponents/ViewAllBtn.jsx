import { Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

function ViewAllBtn({ link }) {
  return (
    <Box textAlign={"center"} border={"1px solid #fb6002"}>
      <Link href={`/news/${link}`}>
        <Button
          sx={{
            fontSize: 12,
            textTransform: "capitalize",
            fontFamily: "var(--arial-font)",
            fontWeight: 600,
            color: "#fb6002",
          }}
          endIcon={<FaArrowRight style={{ fontSize: 14 }} />}
        >
          View More
        </Button>
      </Link>
    </Box>
  );
}
export default ViewAllBtn;
