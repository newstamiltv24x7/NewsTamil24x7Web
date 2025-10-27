import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardDoubleArrowDown,
  MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";
const MobileNav = dynamic(() => import("@/commonComponents/MobileNav"));
const MobileFooter = dynamic(() => import("@/commonComponents/MobileFooter"));

function MobilepageLayout({ children, menuData, trendingData, type, breakingControl, quickControl }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <div>
      <MobileNav menuData={menuData} trendingData={trendingData} type={type} breakingControl={breakingControl} quickControl={quickControl} />
      <Box mt={type === "mobile" ? 1 : breakingControl === "no" ? 15 : 21}>{children}</Box>
      <MobileFooter />

      {isVisible ? (
        <Box
          position={"fixed"}
          bottom={20}
          right={20}
          borderRadius={"50%"}
          bgcolor={"#fff"}
          width={40}
          height={40}
          border={"2px solid"}
          display={"grid"}
          sx={{ placeItems: "center", cursor: "pointer" }}
          zIndex={10}
          onClick={() => {
            window.scroll({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <MdOutlineKeyboardDoubleArrowUp color="#000" fontSize={30} />
        </Box>
      ) : (
        <Box
          position={"fixed"}
          bottom={20}
          left={20}
          borderRadius={"50%"}
          bgcolor={"#fff"}
          width={40}
          height={40}
          border={"2px solid"}
          display={"grid"}
          sx={{ placeItems: "center", cursor: "pointer" }}
          zIndex={10}
          onClick={() => {
            window.scroll({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          }}
        >
          <MdOutlineKeyboardDoubleArrowDown color="#000" fontSize={30} />
        </Box>
      )}
    </div>
  );
}

export default MobilepageLayout;
