import { Box, Button, Typography } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import React, { useState, useEffect } from "react";

function VerifyOtpPage(props) {
  const { otp, handleChange, handleSubmit } = props;

  // State to manage the timer
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timer, setTimer] = useState(30);

  // Effect to handle the countdown
  useEffect(() => {
    let interval = null;

    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setIsTimerActive(false);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  // Function to handle OTP submission
  const handleVerifyOtp = () => {
    handleSubmit();
    setIsTimerActive(true); // Start the timer when OTP is submitted
  };

  // Function to reset the timer and allow retry
  const handleRetry = () => {
    setTimer(30); // Reset the timer
    setIsTimerActive(true); // Restart the timer
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={2}
      sx={{
        "& input": {
          width: 30,
        },
      }}
    >
      <Typography
        component={"p"}
        fontSize={20}
        fontWeight={550}
        textAlign={"center"}
        fontFamily={"var(--anek-font)"}
        my={2}
      >
        Please Enter OTP To Continue
      </Typography>
      <MuiOtpInput
        value={otp}
        onChange={handleChange}
        numInputs={4}
        shouldAutoFocus
      />

      <Button
        variant="contained"
        sx={{
          bgcolor: "#fb6002",
          mt: 2,
          "&:hover": {
            bgcolor: "#fb6002",
          },
        }}
        onClick={handleVerifyOtp}
        disabled={isTimerActive} // Disable button while timer is active
      >
        Verify OTP
      </Button>

      {/* Retry button */}
      {timer === 0 && (
        <Typography
          sx={{
            mt: 2,
            color: "#fb6002",
          }}
          onClick={handleRetry}
        >
          Resend OTP
        </Typography>
      )}

      {/* Timer display */}
      {isTimerActive && (
        <Typography sx={{ mt: 2 }}>Resend OTP in {timer} seconds...</Typography>
      )}
    </Box>
  );
}

export default VerifyOtpPage;
