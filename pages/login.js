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
import { loginUser } from "@/commonComponents/WebApiFunction/ApiFunctions";
import { toast } from "react-toastify";
import { CryptoFetcher } from "@/utils/libs";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

function login() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [error, setError] = useState([]);
  const [show, setShow] = useState(false);
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  const handleInputs = (e) => {
    setError([]);
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    var arr = [];
    Object.entries(inputs).map(([key, val]) => {
      if (key === "email") {
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
      }
    });
    setError(arr);
    if (arr.length === 0) {
      Login();
    }
  };

  const Login = async () => {
    const body = {
      email: inputs.email,
      password: inputs.password,
    };
    const result = await loginUser(body);
    if (result.appStatusCode === 4) {
      toast.error(result?.error);
    } else if (result?.code === "ERR_NETWORK") {
      toast.error("Network Error");
    } else {
      const token = CryptoFetcher(result?.payloadJson);
      const stringedTok = JSON.stringify(token);
      sessionStorage.setItem("Token", stringedTok);
      toast.success("Login Successfully");
      setTimeout(() => {
        router.push("/");
      }, 2000);
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
          <Box width={"275px"} height={"95px"}>
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
        <Box className="welcome-text">
          <h6 style={{ fontFamily: "var(--anek-font)" }}>
            Please login to continue
          </h6>
        </Box>
        <form onSubmit={handleLogin}>
          <Box mb={2}>
            <TextField
              className="login-field"
              fullWidth
              autoComplete="off"
              label="Email"
              name="email"
              onChange={handleInputs}
              value={inputs.email}
              sx={{
                mt: 3,
                ".MuiFormHelperText-root": {
                  marginTop: "12px",
                },
              }}
              error={error.email}
              helperText={error.email && "please enter valid email"}
            />
            <TextField
              className="login-field"
              fullWidth
              autoComplete="off"
              label="Password"
              name="password"
              type={show ? "text" : "password"}
              onChange={handleInputs}
              value={inputs.password}
              sx={{
                mt: 3,
                ".MuiFormHelperText-root": {
                  marginTop: "12px",
                },
              }}
              InputProps={{
                endAdornment: (
                  <Box position={"relative"} top={10}>
                    {show ? (
                      <FaEyeSlash
                        style={{ cursor: "pointer" }}
                        onClick={() => setShow(false)}
                      />
                    ) : (
                      <FaEye
                        style={{ cursor: "pointer" }}
                        onClick={() => setShow(true)}
                      />
                    )}
                  </Box>
                ),
              }}
              error={error.password}
              helperText={error.password && "please enter valid password"}
            />
          </Box>
          <Box
            display={"flex"}
            justifyContent={"end"}
            alignItems={"center"}
            mt={3}
            mb={3}
          >
            {/* <FormGroup
              sx={{
                "& svg": {
                  color: "#fb6002",
                },
              }}
            >
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember Me"
                className="checkbox-text"
              />
            </FormGroup> */}
            <Link
              href={{
                pathname: "/forget-password",
              }}
              className="forget-password-text"
            >
              Forget Password ?
            </Link>
          </Box>
          <Box>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: "#fb6002 !important" }}
              type="submit"
            >
              Login
            </Button>
          </Box>
        </form>

        <p style={{ textAlign: "center" }}>
          Don't have account ?
          <span style={{ color: "#fb6002" }}>
            <Link href={"/signup"}> Create an Account</Link>{" "}
          </span>
        </p>
        <p style={{ textAlign: "center" }}>
          <Link href={"/"} style={{ color: "#fb6002" }}>
            {" "}
            Back to Home
          </Link>{" "}
        </p>
      </Box>
    </Box>
  );
}

export default login;
