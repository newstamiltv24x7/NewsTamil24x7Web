import React, { useEffect, useState } from "react";
import Logo from "../public/newsTamilIcons/icons/main-logo.png";
import Image from "next/image";
import { Box, Button, TextField } from "@mui/material";
import Link from "next/link";
import { forgetPasswordApi } from "@/commonComponents/WebApiFunction/ApiFunctions";
import { toast } from "react-toastify";
import EmailSuccessPop from "@/components/EmailSuccessPop";

function page() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [viewPop, setViewPop] = useState(false);
  const [flag, setFlag] = useState(false);

  const ForgetPassword = async () => {
    try {
      const body = {
        email: email,
        c_redirect: `${window.location.origin}/change_password`,
      };
      const res = await forgetPasswordApi(body);
      if (res?.appStatusCode === 4) {
        toast.error(res?.message);
      } else if (res?.code === "ERR_NETWORK") {
        toast.error("Network Error");
      } else {
        setViewPop(true);
        setFlag(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      !/^(?!.*([A-Za-z0-9])\1{3})[A-Za-z0-9._%+-]{2,}\@[A-Za-z0-9-]{3,}\.[A-Za-z]{2,4}$/.test(
        email
      )
    ) {
      setError(true);
    } else {
      ForgetPassword();
    }
    // if (arr.length === 0) {
    //   Login();
    // }
  };

  useEffect(() => {
    document.title = "News Tamil 24x7 | Forget Password";
  }, []);

  return (
    <Box className="Login-screen">
      <Box className="login-screen-container">
        <Box display={"grid"} sx={{ placeItems: "center" }}>
          <Box width={"175px"} height={"70px"}>
            <Image
            fetchPriority="high" rel="preload"
              src={Logo}
              alt="newstamil-logo"
              width={800}
              height={800}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        </Box>
        <Box className="welcome-text" mt={2}>
          <h6
            style={{
              margin: 0,
              textAlign: "center",
              fontFamily: "var(--anek-font)",
            }}
          >
            Forgot Password ?
          </h6>
          <p
            style={{
              margin: 0,
              textAlign: "center",
              fontFamily: "var(--anek-font)",
            }}
          >
            Reset Your Password Here
          </p>
        </Box>
        <form onSubmit={handleLogin}>
          <Box mb={2}>
            <TextField
              className="login-field"
              autoComplete="off"
              label="Email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
              value={email}
              sx={{
                mt: 1,
                width: 400,
                ".MuiFormHelperText-root": {
                  marginTop: "12px",
                  ml: 0,
                },
              }}
              error={error}
              helperText={error && "please enter valid email"}
            />
          </Box>
          <Box mt={3}>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: "#fb6002 !important" }}
              type="submit"
              disabled={flag}
            >
              Send Link
            </Button>
          </Box>
        </form>

        <p style={{ textAlign: "center" }}>
          <span style={{ color: "#fb6002" }}>
            <Link href={"/login"}> Back to Login</Link>{" "}
          </span>
        </p>
      </Box>
      <EmailSuccessPop
        open={viewPop}
        handleClose={() => setViewPop(false)}
        page={"forget"}
      />
    </Box>
  );
}

export default page;
