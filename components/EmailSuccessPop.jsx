import { Box, Button, Modal, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Success from "../public/newsTamilIcons/icons/success.gif";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 3,
  display: "grid",
  placeItems: "center",
  borderRadius: "16px",
};

function EmailSuccessPop({ open, handleClose, page }) {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box width={150} height={"auto"}>
          <Image 
          fetchPriority="high" 
          rel="preload"
            src={Success}
            alt="success"
            width={900}
            height={800}
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
          />
        </Box>
        <Typography
          component={"p"}
          fontSize={18}
          fontWeight={600}
          fontFamily={"var(--anek-font)"}
        >
          🎉{" "}
          {page === "password"
            ? "Password Changed Successfully"
            : "Almost There!"}{" "}
          🎉
        </Typography>
        <Typography
          component={"p"}
          fontSize={16}
          fontWeight={550}
          sx={{ opacity: 0.7 }}
          textAlign={"center"}
          fontFamily={"var(--anek-font)"}
          mt={2}
          display={page === "password" && "none"}
        >
          {page === "forget"
            ? "Password Change has been sent to your email. Please check your inbox (and spam folder) for the code."
            : "An OTP has been sent to your email. Please check your inbox (and spam folder) for the code."}
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#fb6002",
            mt: 2,
            "&:hover": {
              bgcolor: "#fb6002",
            },
          }}
          onClick={handleClose}
        >
          Okay
        </Button>
      </Box>
    </Modal>
  );
}

export default EmailSuccessPop;
