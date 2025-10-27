import React, { useEffect, useState } from "react";
import Logo from "../../public/newsTamilIcons/icons/main-logo.png";
import Image from "next/image";
import { Box, Button, TextField } from "@mui/material";
import Link from "next/link";
import { changePasswordApi } from "@/commonComponents/WebApiFunction/ApiFunctions";
import { toast } from "react-toastify";
import EmailSuccessPop from "@/components/EmailSuccessPop";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

function page() {
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  const [error, setError] = useState([]);
  const [viewPop, setViewPop] = useState(false);
  const [flag, setFlag] = useState(false);
  const [inputs, setInputs] = useState({
    password: "",
    cfpassword: "",
    newPassword: "",
  });
  const EndUserData = useSelector((state) => state.UserDataReducer?.data);
  const router = useRouter();

  const handleInputs = (e) => {
    setError([]);
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const ChangePassword = async () => {
    try {
      const token = EndUserData?.tokenAccess ?? "";
      const body = {
        c_old_pass: inputs.password,
        c_new_pass: inputs.newPassword,
        c_confirm_pass: inputs.cfpassword,
      };
      const res = await changePasswordApi(body, token);
      if (res?.appStatusCode === 4) {
        toast.error(`${res.error} please login to change password`);
      } else if (res?.code === "ERR_NETWORK") {
        toast.error("Network Error");
      } else {
        setViewPop(true);
        setFlag(true);
      }
    } catch (err) {
      console.log(err);
      toast.error("please login to change password");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    var arr = [];
    Object.entries(inputs).map(([key, val]) => {
      if (key === "password") {
        if (!val.match(passRegex) || val === "") {
          arr.push(key);
        }
      } else if (key === "newPassword") {
        if (!val.match(passRegex) || val === "") {
          arr.push(key);
        }
      } else if (key === "cfpassword") {
        if (inputs.newPassword !== inputs.cfpassword) {
          arr.push(key);
        }
      }
    });
    setError(arr);
    if (arr.length === 0) {
      ChangePassword();
    }
  };

  useEffect(() => {
    document.title = "News Tamil 24x7 | Change Password";
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
            Change Your Password Here
          </h6>
        </Box>
        <form onSubmit={handleLogin}>
          <Box mb={2}>
            <TextField
              className="login-field"
              autoComplete="off"
              label="Old Password"
              name="password"
              onChange={(e) => handleInputs(e)}
              value={inputs.password}
              sx={{
                mt: 1,
                width: 400,
                ".MuiFormHelperText-root": {
                  marginTop: "12px",
                  ml: 0,
                },
              }}
              error={error?.includes("password")}
              helperText={
                error?.includes("password") &&
                "please enter atleast min 8 letters with one special character, one Uppercase and one Lowercase"
              }
            />
            <br />
            <br />
            <TextField
              className="login-field"
              autoComplete="off"
              label="New Password"
              name="newPassword"
              onChange={(e) => handleInputs(e)}
              value={inputs.newPassword}
              sx={{
                mt: 1,
                width: 400,
                ".MuiFormHelperText-root": {
                  marginTop: "12px",
                  ml: 0,
                },
              }}
              error={error?.includes("newPassword")}
              helperText={
                error?.includes("newPassword") &&
                "please enter atleast min 8 letters with one special character, one Uppercase and one Lowercase"
              }
            />
            <br />
            <br />
            <TextField
              className="login-field"
              autoComplete="off"
              label="Conform Password"
              name="cfpassword"
              onChange={(e) => handleInputs(e)}
              value={inputs.cfpassword}
              sx={{
                mt: 1,
                width: 400,
                ".MuiFormHelperText-root": {
                  marginTop: "12px",
                  ml: 0,
                },
              }}
              error={error?.includes("cfpassword")}
              helperText={
                error?.includes("cfpassword") &&
                "password and conform password is not matching"
              }
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
              Change Password
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
        handleClose={() => {
          setViewPop(false);
          router.push("/");
        }}
        page={"password"}
      />
    </Box>
  );
}

export default page;
