import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuMore from "../public/newsTamilIcons/icons/menu-more.svg";
import Search from "../public/newsTamilIcons/icons/search.svg";
import User from "../public/newsTamilIcons/icons/user.svg";
import PlayStore from "../public/newsTamilIcons/icons/playstore.png";
import AppStore from "../public/newsTamilIcons/icons/ios.png";
import Image from "next/image";
import {
  Avatar,
  Checkbox,
  ClickAwayListener,
  Fade,
  FormControlLabel,
  Grid,
  ListItem,
  Popper,
  Switch,
} from "@mui/material";
import Logo from "../public/newsTamilIcons/icons/main-logo.png";
import GoogleNews from "../public/newsTamilIcons/icon-pack/image 4.png";
import Dailyhunt from "../public/newsTamilIcons/icon-pack/Frame 10.png";
import RssLogo from "../public/newsTamilIcons/icon-pack/image 5.png";
import { GoDotFill } from "react-icons/go";
import { useTheme } from "@/theme/ThemeContext";
import Link from "next/link";
import { FaChevronDown, FaRegQuestionCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaMoon, FaSquareRss, FaSun, FaUser } from "react-icons/fa6";
import { CgLogOut, CgMenuLeft } from "react-icons/cg";
import QuickLinkSection from "./QuickLinkSection";
import { useSelector } from "react-redux";
import { CryptoFetcher, stringAvatar } from "@/utils/libs";
import FacebookNew from "../public/newsTamilIcons/icon-pack/Frame 1.svg";
import WhatsAppNew from "../public/newsTamilIcons/icon-pack/Frame 7.svg";
import TwitterNew from "../public/newsTamilIcons/icon-pack/Frame 2.svg";
import YoutubeNew from "../public/newsTamilIcons/icon-pack/Frame 6.svg";
import TelegramNew from "../public/newsTamilIcons/icon-pack/Frame 8.svg";
import InstagramNew from "../public/newsTamilIcons/icon-pack/Frame 3.svg";
import ThreadsNew from "../public/newsTamilIcons/icon-pack/Frame 5.svg";
import LinkedinNew from "../public/newsTamilIcons/icon-pack/Frame 4.svg";
import ShortNewsIcon from "../public/newsTamilIcons/icon-pack/image_latest_sn.png";
import { useRouter } from "next/router";
import { getQuickLinks } from "./WebApiFunction/ApiFunctions";

function Navbar(props) {
  const router = useRouter();
  const { menuData, quickControl } = props;
  const { mode, toggleTheme } = useTheme();
  const EndUserData = useSelector((state) => state.UserDataReducer?.data);
  const token = EndUserData?.tokenAccess ?? "";
  const [loginPop, setLoginPop] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [subArr, setSubArr] = React.useState([]);
  const [parentName, setParentName] = React.useState("");
  const [mainPath, setMainPath] = React.useState("");
  const [list, setList] = React.useState([]);


  const GetQuickLinkResults = async () => {
    try {
      const results = await getQuickLinks();
      const data = CryptoFetcher(results?.payloadJson);
      setList(data);
    } catch (err) {
      console.log(err);
    }
  };

const dateString = new Date().toLocaleString();


  const handleClick = (event, item) => {
    
    if(item.c_sub_categories.length > 0){
      setAnchorEl(event.currentTarget);
    setOpen(true);
    setParentName(item?.c_category_slug_english_name);
    setSubArr(item?.c_sub_categories);
    }else{
      setOpen(false);
    }
  };

  const canBeOpen1 = open && Boolean(anchorEl);
  const id1 = canBeOpen1 ? "transition-popper" : undefined;

  const [open2, setOpen2] = React.useState(false);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [subArr2, setSubArr2] = React.useState([]);

  const handle2Click = (event) => {
    setAnchorEl2(event.currentTarget);
    setOpen2(true);
    const arr = menuData?.slice(8, menuData?.length);
    setSubArr2(arr);
  };

  const getNavLink = (val, cat) => {
    if (cat === "dist") {
      return `/news/${parentName}/${val}`;
    } else {
      if (val?.toLowerCase() === "home") {
        return `/`;
      } else if (val?.toLowerCase() === "news") {
        return `/news`;
      } else if (val?.toLowerCase() === "photos") {
        return `/photos`;
      } else if (val?.toLowerCase() === "videos") {
        return `/videos`;
      } else if (val?.toLowerCase() === "cards") {
        return `/cards`;
      }else if (val?.toLowerCase() === "web-stories") {
        return `/web-story`;
      } else {
        return `/news/${val}`;
      }
    }
  };

  const canBeOpen2 = open && Boolean(anchorEl2);
  const id2 = canBeOpen2 ? "transition-popper" : undefined;

  React.useEffect(() => {
    const path = router.asPath?.split("/");
    if (path.length === 3) {
      setMainPath(path?.at(-1));
    } else {
      setMainPath(path?.at(-2));
    }
  }, [router]);
  React.useEffect(() => {
    GetQuickLinkResults();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        sx={{
          display: { xs: "block", md: "none", sm: "block" },
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"start"}
          gap={16}
          alignItems={"center"}
        >
          <Box pl={2}>
            <CgMenuLeft fontSize={40} onClick={() => handleDrawerToggle()} />
          </Box>
          <Box>
            <Link
              href={"/"}
              style={{
                display: "grid",
                placeItems: "start",
                marginInline: "auto",
              }}
            >
              <Image fetchPriority="high" rel="preload"
                src={Logo}
                alt="news-tamil-logo"
                width={225}
                height={75}
                style={{ marginLeft: -80 }}
              />
            </Link>
          </Box>
        </Box>
      </AppBar>

      <AppBar
  sx={{
    pb: 1,
    bgcolor: "#121212",
    backgroundImage: "none",
    py: 1,
  }}
>
  <Box
    maxWidth={1440}
    px={2}
    mx={"auto"}
    width={"100%"}
    onMouseEnter={() => {
      setOpen(false);
      setOpen2(false);
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // Space out left, center, right
        width: "100%",
      }}
    >
      {/* LEFT: Date and Time */}
      <Box>
        <Typography sx={{ fontWeight: 600, fontSize: 16}}>
          {dateString} 
        </Typography>
      </Box>

      {/* CENTER: Logo */}
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <Link href="/">
          <Image
            src={Logo}
            alt="news-tamil-logo"
            width={225}
            height={75}
            style={{ marginBottom: 10 }}
          />
        </Link>
      </Box>

      {/* RIGHT: Toggle */}
      <Box>
        <FormControlLabel
          control={
            <Switch
              checked={mode === "dark"}
              onChange={(e) => toggleTheme(e.target.checked ? "dark" : "light")}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#ffffffff",
                },
                "& .MuiSwitch-track": {
                  backgroundColor: "#bfbfbf",
                },
              }}
            />
          }
          label={
            <Typography>
              {mode === "dark" ? <FaMoon size={20} /> : <FaSun size={20} />}
            </Typography>
          }
        />
      </Box>
    </Box>
  </Box>
</AppBar>
      <AppBar
        component="nav"
        sx={{
          top: quickControl === "no" ? 90 : list?.length > 0 ? 105 : 90,
          background: "linear-gradient(165deg, #ff6600ff 0%, #ff992c 100%)",
          py: 0,
          boxShadow: "0px 0px 1.5px 0px #fff",
          display: { xs: "none", md: "block", sm: "block" },
        }}
        elevation={1}
      >
        <Box
          maxWidth={1440}
          width={"100%"}
          mx={{ md: "inherit", lg: "auto" }}
          px={2}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            width={"100%"}
            position={"relative"}
          >
            <Box
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                    // whiteSpace: "nowrap",
                    // textOverflow: "ellipsis",
                    // overflow: "hidden",
                  },
                  // ml: "-10px",
                }}
              >
                {menuData?.slice(0, 8)?.map((item) => (
                  <Link
                    href={getNavLink(item?.c_category_slug_english_name)}
                    key={item?._id}
                  >
                    <Button
                      endIcon={
                        item?.c_sub_categories?.length > 0 && (
                          <FaChevronDown style={{ width: 12 }} />
                        )
                      }
                      sx={{
                        color: "#ebebeb",
                        fontFamily: "var(--anek-font)",
                        transition: "all 200ms ease-in-out",
                        "&:hover": {
                          color: "#572300ff",
                          textDecoration: "underline",
                          textDecorationColor: "#000000ff",
                          textUnderlineOffset: "12px",
                          textDecorationThickness: "3px",
                          bgcolor: "rgba(249, 182, 144, 0.08)",
                          // borderBottom: "3px solid #ff992c"
                          // borderBottom: "2px solid #f79907",
                        },
                        fontSize: "16px",
                        fontWeight: 600,
                        marginRight:2,
                        color:
                          mainPath === item?.c_category_slug_english_name
                            ? "#572300ff"
                            : "inherit",
                        textDecoration:
                          mainPath === item?.c_category_slug_english_name
                            ? "underline"
                            : "none",
                        textDecorationColor:
                          mainPath === item?.c_category_slug_english_name
                            ? "#ff992c"
                            : "none",
                        textUnderlineOffset:
                          mainPath === item?.c_category_slug_english_name
                            ? "12px"
                            : "",
                        textDecorationThickness:
                          mainPath === item?.c_category_slug_english_name
                            ? "3px"
                            : "",
                      }}
                      onMouseEnter={(e) => {
                        handleClick(e, item);
                        setOpen2(false);
                      }}
                      
                    >
                      {item?.c_category_name}
                    </Button>
                  </Link>
                ))}
           
                <Box
                  component={"span"}
                  position={"relative"}
                  top={12}
                  left={12}
                  onMouseEnter={(e) => handle2Click(e)}
                >
                  <Image fetchPriority="high" rel="preload" src={MenuMore} alt="more" width={32} height={32} />
                </Box>
              
              </Box>
            </Box>
            <Box  p={0.5}
              component={"span"}
              sx={{
                img: {
                  cursor: "pointer",
                },
              }}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={1.5}
              onMouseEnter={() => {
                setOpen(false);
                setOpen2(false);
              }}
            >
              <Link href={"/search"} style={{ position: "relative", top: 3 }}>
                <Image fetchPriority="high" rel="preload" src={Search} alt="more" width={24} height={24} />
              </Link>
              <Box
    p={"0px 0px 0px 0px"}
    borderRadius={"0 0 8px 8px"}
    color={"#000"}
  >
    <Link href={"/short-news"}>
      <Image fetchPriority="high" rel="preload"
        src={ShortNewsIcon}
        alt="shorts-news-logo"
        width={120}
        style={{
          objectFit: "contain",
          width: "130px",
          height: "40px",
          position: "relative",
        }}
      />
    </Link>
  </Box>
              {token ? (
                <Avatar
                  sx={{ textTransform: "uppercase", cursor: "pointer" }}
                  {...stringAvatar(`${EndUserData?.user_name}`)}
                  onClick={() => setLoginPop(true)}
                >
                  {EndUserData?.user_name?.at(0)?.toUpperCase()}
                  {EndUserData?.user_name
                    ?.split(" ")
                    ?.at(1)
                    ?.at(0)
                    ?.toUpperCase()}
                </Avatar>
              ) : (
                <Box position={"relative"} top={2}>
                  {/* <Image fetchPriority="high" rel="preload"
                    src={User}
                    alt="more"
                    width={28}
                    height={28}
                    className="user-profile-img"
                    onMouseOver={() => setLoginPop(true)}
                    // onMouseLeave={() => setLoginPop(false)}
                  /> */}
                  <FaUser fetchPriority="high" rel="preload"
                    src={User}
                    alt="more"
                    width={30}
                    height={30}
                    className="user-profile-img"
                    onMouseOver={() => setLoginPop(true)}/>
                </Box>
              )}
            </Box>
            {loginPop && (
              <ClickAwayListener onClickAway={() => setLoginPop(false)}>
                <Box
                  bgcolor={"#dedede"}
                  position={"absolute"}
                  top={50}
                  right={-10}
                  width={300}
                  p={2}
                  border={"2px solid #000"}
                  borderRadius={"14px"}
                  className="tooltip-arrow"
                >
                  <Box position={"absolute"} right={6} top={10}>
                    <IoClose
                      color="#000"
                      fontSize={20}
                      style={{ cursor: "pointer" }}
                      onClick={() => setLoginPop(false)}
                    />
                  </Box>
                  {token === "" && (
                    <Typography
                      color={"#000"}
                      fontWeight={550}
                      textAlign={"center"}
                    >
                      Sign In with News Tamil Tv to stay connected
                    </Typography>
                  )}

                  <Box textAlign={"center"} pt={1}>
                    {token === "" ? (
                      <Link href={"/login"}>
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: "#ffffffff",
                            fontWeight: 550,
                            border: "1px solid #ffffffff",
                            color: "#ff992c",
                            "&:hover": {
                              bgcolor: "#000000ff",
                            },
                            textTransform: "capitalize",
                            fontSize: 16,
                          }}
                        >
                          Login
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Box
                          borderBottom={"1px solid #cbcbcb"}
                          display={"grid"}
                          sx={{ placeItems: "center" }}
                        >
                          <Typography
                            fontFamily={"var(--anek-font)"}
                            fontSize={16}
                            lineHeight={1.3}
                            component={"span"}
                            fontWeight={"bold"}
                            sx={{
                              color: "#000",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                            width={"80%"}
                            display={"block"}
                            position={"relative"}
                            top={-10}
                          >
                            Hi,{" "}
                            <span
                              style={{
                                color: "#fb6002",
                                fontWeight: 700,
                                fontSize: 18,
                              }}
                            >
                              {EndUserData?.user_name}
                            </span>
                          </Typography>
                        </Box>

                        {/* <Button
                          variant="contained"
                          sx={{
                            bgcolor: "#fc6002",
                            fontWeight: 550,
                            border: "1px solid #000",
                            color: "#000",
                            "&:hover": {
                              bgcolor: "#fc6002",
                            },
                            textTransform: "capitalize",
                            fontSize: 16,
                            mt: 2,
                          }}
                          onClick={() => {
                            sessionStorage.clear();
                            window.location.reload();
                          }}
                        >
                          Logout
                        </Button> */}
                        <ListItem
                          sx={{
                            color: "#000",
                            display: "flex",
                            justifyContent: "start",
                            fontWeight: 600,
                            fontFamily: "var(--anek-font)",
                            fontSize: 16,
                            cursor: "pointer",
                            width: "fit-content",
                          }}
                        >
                          <Link href={"/change_password"}>
                            <FaRegQuestionCircle
                              style={{
                                marginRight: "8px",
                                position: "relative",
                                top: 5,
                              }}
                              fontSize={20}
                            />
                            Change Password ?
                          </Link>
                        </ListItem>
                        <ListItem
                          sx={{
                            color: "#000",
                            display: "flex",
                            justifyContent: "start",
                            fontWeight: 600,
                            fontFamily: "var(--anek-font)",
                            fontSize: 16,
                            cursor: "pointer",
                            width: "fit-content",
                          }}
                          onClick={() => {
                            sessionStorage.clear();
                            window.location.reload();
                          }}
                        >
                          <CgLogOut
                            style={{ marginRight: "8px" }}
                            fontSize={20}
                          />
                          Logout
                        </ListItem>
                      </>
                    )}
                  </Box>
                </Box>
              </ClickAwayListener>
            )}
          </Box>
          {/* </Toolbar> */}
        </Box>
      </AppBar>

      <Box
        className="mobile-nav"
        display={{ xs: "block", sm: "block", md: "none" }}
      >
        <Box
          display={"flex"}
          position={"relative"}
          top={90}
          width={"100vw"}
          whiteSpace={"nowrap"}
          overflow={"auto hidden"}
        >
          {menuData?.slice(0, 11)?.map((item) => (
            <Link
              href={getNavLink(item?.c_category_slug_english_name)}
              key={item?._id}
            >
              <Button
                endIcon={
                  item?.c_sub_categories?.length > 0 && (
                    <FaChevronDown style={{ width: 12 }} />
                  )
                }
                sx={{
                  color: "#ebebeb",
                  fontFamily: "var(--anek-font)",
                  transition: "all 200ms ease-in-out",
                  "&:hover": {
                    color: "#ff992c",
                    textDecoration: "underline",
                    textDecorationColor: "#ff992c",
                    textUnderlineOffset: "12px",
                    textDecorationThickness: "3px",
                    // borderBottom: "3px solid #ff992c"
                    // borderBottom: "2px solid #f79907",
                  },
                  fontSize: "16px",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => {
                  handleClick(e, item);
                  setOpen2(false);
                }}
              >
                {item?.c_category_name}
              </Button>
            </Link>
          ))}
          {/* {subArr2?.length > 0 && ( */}
          <Box
            component={"span"}
            position={"relative"}
            top={4}
            left={12}
            onMouseEnter={(e) => handle2Click(e)}
          >
            <Image fetchPriority="high" rel="preload" src={MenuMore} alt="more" width={32} height={32} />
          </Box>
          {/* )} */}

       
          <Popper
            id={id1}
            open={open && subArr.length > 0}
            anchorEl={anchorEl}
            transition
            sx={{ zIndex: 1200 }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Box
                  sx={{
                    // border: 1,
                    p: 1,
                    bgcolor: "background.paper",
                    height: subArr.length > 10 ? 400 : "auto",
                    overflow: "auto",
                    li: {
                      listStyleType: "none",
                      p: 1,
                      borderBottom: "1px solid #666666a1",
                    },
                    "& li:hover ": {
                      color: "#fff",
                      fontWeight: 600,
                      bgcolor: "#ff992c",
                    },
                  }}
                  onMouseLeave={() => {
                    setOpen(false);
                    setOpen2(false);
                  }}
                >
                  {Array.isArray(subArr) &&
                    subArr.map((list) => (
                      <Link
                        key={list?._id}
                        href={getNavLink(
                          list?.c_category_slug_english_name,
                          "dist"
                        )}
                      >
                        <li
                          key={list?._id}
                          style={{
                            cursor: "pointer",
                            fontFamily: "var(--anek-font)",
                          }}
                        >
                          {list?.c_category_name}
                        </li>
                      </Link>
                    ))}
                </Box>
              </Fade>
            )}
          </Popper>
         
          


          <Popper
            id={id2}
            open={open2 && subArr2.length > 0}
            anchorEl={anchorEl2}
            transition
            sx={{ zIndex: 1200 }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Box
                  sx={{
                    // border: 1,
                    p: 1,
                    bgcolor: "background.paper",
                    height: "auto",
                    marginLeft:"85px",
                    height: subArr2.length > 10 ? 400 : "auto",
                    overflow: "auto",
                    li: {
                      listStyleType: "none",
                      p: 1,
                      borderBottom: "1px solid #666666a1",
                    },
                    "& li:hover ": {
                      color: "#fff",
                      fontWeight: 600,
                      bgcolor: "#ff992c",
                    },
                  }}
                  onMouseLeave={() => {
                    setOpen2(false);
                  }}
                >
                  {Array.isArray(subArr2) &&
                    subArr2.map((list) => (
                      <Link
                        href={getNavLink(list?.c_category_slug_english_name)}
                        key={list?._id}
                      >
                        <li
                          style={{
                            cursor: "pointer",
                            fontFamily: "var(--anek-font)",
                          }}
                        >
                          {list?.c_category_name}
                        </li>
                      </Link>
                    ))}
                </Box>
              </Fade>
            )}
          </Popper>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
