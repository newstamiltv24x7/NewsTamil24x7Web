import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Typography } from "@mui/material";
import {
  IoCaretBackCircle,
  IoCaretForwardCircle,
  IoCloseCircleOutline,
} from "react-icons/io5";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PhotosViewerPop({ photosImg, open, close, data, title }) {

  return (
    <React.Fragment>
      <Dialog
      
        // fullScreen
        fullWidth
        maxWidth={"md"}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            fontSize: 16,
            fontWeight: 550,
            textAlign: "center",
            fontFamily: "var(--anek-font)",
          }}
        >
          {title}
        </DialogTitle>
        <IoCloseCircleOutline
          onClick={close}
          fontSize={28}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            cursor: "pointer",
          }}
        />
        <DialogContent sx={{ height: "fit-content", px: 0, py: 0 }}>
          <Swiper
            autoplay={true}
            loop={true}
            modules={[Autoplay, Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            navigation={{
              prevEl: ".custom-button-prev",
              nextEl: ".custom-button-next",
            }}
            // onSlideChange={(swiper) => handleSlideChange(swiper)}
          >
            {Array.isArray(photosImg) &&
              photosImg?.map((list,index) => (
                <SwiperSlide key={index}>
                  <Box p={0}>
                    <Box position={"relative"}>
                      <Image
                      fetchPriority="high" 
                      rel="preload"
                        src={list?.c_photos_continue_img}
                        alt={list?.c_photos_continue_sub_title}
                        width={1800}
                        height={600}
                        style={{
                          width: "950px",
                          height: "auto",
                          borderRadius: "6px",
                          // objectFit: "contain",
                        }}
                      />
                      <p style={{textAlign:"center",fontWeight:"600"}}>{list?.c_photos_continue_sub_title}</p>
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}
            <div
              className="custom-button-prev"
              style={{
                cursor: "pointer",
                width: "fit-content",
                position: "absolute",
                top: "50%",
                zIndex: 1,
                left: 0,
              }}
            >
              <IoCaretBackCircle fontSize={52} color="#fb6002" />
            </div>
            <div
              className="custom-button-next"
              style={{
                cursor: "pointer",
                width: "fit-content",
                position: "absolute",
                top: "50%",
                zIndex: 1,
                right: 0,
              }}
            >
              <IoCaretForwardCircle fontSize={52} color="#fb6002" />
            </div>
          </Swiper>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default PhotosViewerPop;
