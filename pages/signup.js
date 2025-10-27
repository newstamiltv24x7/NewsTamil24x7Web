import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
// import "./css/LoginStyles.css";
// import MainLogo from "../common/assets/images/kblogo.jpg";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { adminLogin } from "../common/api/KrBakesApi";
// import AutohideSnackbar from "../components/Snackbar";
import Logo from "../public/newsTamilIcons/icons/main-logo.png";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  createUser,
  sendOtpApi,
  verifyOtpApi,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import { useRouter } from "next/navigation";
import EmailSuccessPop from "@/components/EmailSuccessPop";
import VerifyOtpPage from "@/components/VerifyOtpPage";
import RegisterSuccessPop from "@/components/RegisterSuccessPop";

function page() {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cfpassword: "",
  });
  const [error, setError] = useState([]);
  const [viewPop, setViewPop] = useState(false);
  const [successPop, setSuccessPop] = useState(false);
  const [otpPage, setOtpPage] = useState(false);
  const [otp, setOtp] = useState("");
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  const router = useRouter();

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const handleSubmit = async () => {
    try {
      const body = {
        email: inputs.email,
        otp: otp,
      };
      const result = await verifyOtpApi(body);
      if (result?.appStatusCode === 4) {
        toast.error(result?.message);
      } else if (result?.appStatusCode === 0) {
        toast.success("OTP Verified Successfully");
        setTimeout(() => {
          Login();
        }, 500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputs = (e) => {
    setError([]);
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    var arr = [];
    Object.entries(inputs).map(([key, val]) => {
      if (key === "firstName") {
        if (val?.length < 3) {
          arr.push(key);
        }
      } else if (key === "lastName") {
        if (val?.length < 3) {
          arr.push(key);
        }
      } else if (key === "email") {
        if (
          !/^(?!.*([A-Za-z0-9])\1{3})[A-Za-z0-9._%+-]{2,}\@[A-Za-z0-9-]{3,}\.[A-Za-z]{2,4}$/.test(
            val
          )
        ) {
          arr.push(key);
        }
      } else if (key === "password") {
        if (!val.match(passRegex) || val === "") {
          arr.push(key);
        }
      } else if (key === "cfpassword") {
        if (inputs.password !== inputs.cfpassword) {
          arr.push(key);
        }
      }
    });
    setError(arr);
    if (arr.length === 0) {
      SendOtp();
    }
  };

  const SendOtp = async () => {
    try {
      const result = await sendOtpApi({ email: inputs.email });
      if (result?.appStatusCode === 4) {
        toast.error(result?.error);
      } else if (result?.appStatusCode === 0) {
        setViewPop(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setViewPop(false);
    setOtpPage(true);
  };

  const Login = async () => {
    const body = {
      first_name: inputs.firstName,
      last_name: inputs.lastName,
      //   google_id: "101098032586923790535",
      email: inputs.email,
      password: inputs.password,
      c_password: inputs.cfpassword,
      //   c_user_img_url: "",
    };
    const result = await createUser(body);
    if (result?.appStatusCode === 4) {
      toast.error(result?.message);
    } else if (result?.code === "ERR_NETWORK") {
      toast.error("Network Error");
    } else {
      // toast.success(result?.message);
      setSuccessPop(true);
    }
  };

  useEffect(() => {
    document.title = "News Tamil 24x7 | Login";
    sessionStorage.clear();
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
        {otpPage ? (
          <VerifyOtpPage
            otp={otp}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          <>
            <Box className="welcome-text">
              <h6>Sign Up</h6>
            </Box>
            <form onSubmit={handleLogin}>
              <Box mb={2}>
                <TextField
                  className="login-field"
                  autoComplete="off"
                  label="First Name"
                  name="firstName"
                  onChange={handleInputs}
                  value={inputs.firstName}
                  sx={{
                    mt: 3,
                    ".MuiFormHelperText-root": {
                      marginTop: "12px",
                      ml: 0,
                    },
                    width: 550,
                  }}
                  error={error.includes("firstName")}
                  helperText={
                    error.includes("firstName") &&
                    "please enter valid first name"
                  }
                />
                <br />
                <TextField
                  className="login-field"
                  autoComplete="off"
                  label="Last Name"
                  name="lastName"
                  onChange={handleInputs}
                  value={inputs.lastName}
                  sx={{
                    mt: 3,
                    ".MuiFormHelperText-root": {
                      marginTop: "12px",
                      ml: 0,
                    },
                    width: 550,
                  }}
                  error={error.includes("lastName")}
                  helperText={
                    error.includes("lastName") && "please enter valid last name"
                  }
                />
                <br />
                <TextField
                  className="login-field"
                  autoComplete="off"
                  label="Email"
                  name="email"
                  onChange={handleInputs}
                  value={inputs.email}
                  sx={{
                    mt: 3,
                    ".MuiFormHelperText-root": {
                      marginTop: "12px",
                      ml: 0,
                    },
                    width: 550,
                  }}
                  error={error.includes("email")}
                  helperText={
                    error.includes("email") && "please enter valid email id"
                  }
                />
                <br />
                <TextField
                  className="login-field"
                  autoComplete="off"
                  label="Password"
                  name="password"
                  onChange={handleInputs}
                  value={inputs.password}
                  sx={{
                    mt: 3,
                    ".MuiFormHelperText-root": {
                      marginTop: "12px",
                      ml: 0,
                    },
                    width: 550,
                  }}
                  error={error.includes("password")}
                  helperText={
                    error.includes("password") &&
                    "please enter atleast min 8 letters with one special character, one Uppercase and one Lowercase"
                  }
                />
                <br />
                <TextField
                  className="login-field"
                  autoComplete="off"
                  label="Conform Password"
                  name="cfpassword"
                  onChange={handleInputs}
                  value={inputs.cfpassword}
                  sx={{
                    mt: 3,
                    ".MuiFormHelperText-root": {
                      marginTop: "12px",
                      ml: 0,
                    },
                    width: 550,
                  }}
                  error={error.includes("cfpassword")}
                  helperText={
                    error.includes("cfpassword") &&
                    "password and conform password is not matching"
                  }
                />
              </Box>
              <Box>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ bgcolor: "#fb6002 !important", mt: 2 }}
                  type="submit"
                >
                  Sign Up
                </Button>
              </Box>
            </form>

            <p style={{ textAlign: "center", color: "#000" }}>
              Already an user?
              <span style={{ color: "#fb6002" }}>
                <Link href={"/login"}> Login here</Link>{" "}
              </span>
            </p>
          </>
        )}
      </Box>
      <EmailSuccessPop open={viewPop} handleClose={handleClose} />
      <RegisterSuccessPop
        open={successPop}
        handleClose={() => {
          setSuccessPop(false);
          router.push("/login");
        }}
      />
    </Box>
  );
}

export default page;
