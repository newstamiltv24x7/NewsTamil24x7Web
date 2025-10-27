import { getHomeTopSection } from "@/commonComponents/WebApiFunction/ApiFunctions";
import { CryptoFetcher, converDayJsDate, shareCards } from "@/utils/libs";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import FlipPage from "react-flip-page";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
import {
  FaLinkedin,
  FaSquareFacebook,
  FaSquareThreads,
  FaYoutube,
} from "react-icons/fa6";
import { IoMdShareAlt } from "react-icons/io";
import { RiWhatsappFill } from "react-icons/ri";
import { TbArrowBigUpLinesFilled } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/router";
import { AiOutlineHome } from "react-icons/ai";

const fadeInAnimation = `
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `;

const FlipBookVertical = () => {
  const navigate = useRouter();
  const [newsData, setNewsData] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [sharePop, setSharePop] = useState(false);


  const GetNews = async () => {
    const dummyArray =[];
    try {
      const trendingResponse = await getHomeTopSection({
        n_page: 1,
        n_limit: 50,
        main_category_id: "cf336f838e81",
      });
      const decryptedTrend = CryptoFetcher(trendingResponse?.payloadJson);
      decryptedTrend?.docs.map(data => {
        dummyArray.push({
          _id: data._id,
          story_title_name: data.story_title_name,
          story_sub_title_name: data.story_sub_title_name,
          story_cover_image_url: data.story_cover_image_url,
          story_desk_created_name: data.story_desk_created_name,
          story_subject_name: data.story_subject_name,          
          createdAt: data.createdAt,
        })
      })
      setNewsData(dummyArray)
      setCurrentData(dummyArray[0])
    } catch (err) {
      console.log(err);
    }
  };



 
  
  useEffect(() => {
    GetNews();
        // Prevent default touchmove behavior globally
        const preventDefaultHandler = (e) => {
          if (e.cancelable) {
            e.preventDefault();
          }
        };
        document.addEventListener("touchmove", preventDefaultHandler, {
          passive: false,
        });
    
        return () => {
          document.removeEventListener("touchmove", preventDefaultHandler);
        };

  }, []);

  const handleFlip = (index) => {
    const arr = [...newsData];
    setCurrentData(arr[index]);
    setSharePop(false)
  };

  const closeSwipe =()=>{
    navigate.push(`/`);
  }

  return (
    <>
      <style>{fadeInAnimation}</style>
      <div style={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
      <FlipPage
        className="flip-page-main"
        uncutPages={false}
        onPageChange={(index) => {
          handleFlip(index);
        }}
      >
        {Array.isArray(newsData) &&
          newsData.map((list) => (
            <Box
              position={"relative"}
              display={"flex"}
              justifyContent={"space-between"}
              flexDirection={"column"}
              height={"100dvh"}
              key={list?._id}
            >
              <Box height={"auto"}>
                <Image 
                  fetchPriority="high" 
                  rel="preload"
                  src={list?.story_cover_image_url}
                  alt="newstamil-cover-image"
                  width={1200}
                  height={580}
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
              {/* <Box
                width={"100%"}
                height={10}
                bgcolor={"#fff"}
                borderRadius={"14px 14px 0 0 "}
                position={"relative"}
                top={-6}
              ></Box> */}
              <Box
                position={"relative"}
                display={"flex"}
                justifyContent={"space-between"}
                flexDirection={"column"}
                height={"100%"}
              >
                <Box
                  bgcolor={"#fff"}
                  p={2}
                  pt={0}
                  borderRadius={"14px 14px 0 0"}
                >
                  <Typography
                    fontFamily={"var(--anek-font)"}
                    fontSize={16}
                    lineHeight={1.5}
                    component="p"
                    fontWeight={600}
                    className="textWrapperOne"
                    color={"#fb6002"}
                    my={1}
                  >
                    {list?.story_subject_name}
                  </Typography>
                  <Typography
                    fontFamily={"var(--anek-font)"}
                    fontSize={14}
                    lineHeight={1.5}
                    component="p"
                    fontWeight={400}
                    className="textWrapperOne"
                    my={1}
                  >
                    {converDayJsDate(list?.createdAt)}
                   </Typography>

                  <Typography
                    fontFamily={"var(--anek-font)"}
                    fontSize={18}
                    lineHeight={1.5}
                    component="p"
                    fontWeight={700}
                    className="textWrapperThree"
                    my={1}                                        
                  >
                    {list?.story_title_name}
                    
                  </Typography>

                  <Typography
                    fontFamily={"var(--anek-font)"}
                    fontSize={16}
                    lineHeight={1.5}
                    component="p"
                    fontWeight={500}
                    className="textWrappersix"
                    my={1}
                    pt={"10%"}
                  >
                    {list?.story_sub_title_name}
                  </Typography>
                 
                </Box>
                
                <Box
                  bgcolor={"#fff"}
                  p={2}
                  pt={2}
                  borderRadius={"14px 14px 0 0"}
                >
               

                  </Box>

                  <Box
                  position={"absolute"}
                  bottom={"20%"}
                  left={"50%"}
                  display={"grid"}
                  sx={{
                    placeItems: "center",
                    opacity: 0.3,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <TbArrowBigUpLinesFilled fontSize={30} />
                  <Typography
                    fontFamily={"var(--anek-font)"}
                    fontSize={16}
                    lineHeight={1.5}
                    component="p"
                    fontWeight={500}
                    className="textWrapperSix"
                    my={1}
                  >
                    Swipe Up
                  </Typography>
                 
                 
                </Box>


               
                <Box 
                 position={"absolute"}
                 bottom={"15%"}
                 left={"50%"}
                 display={"grid"}
                 sx={{
                   placeItems: "center",
                   transform: "translate(-50%, -50%)",
                 }}>
                <Button
                    endIcon={<AiOutlineHome />}
                    sx={{
                      color: "#810103",
                      fontFamily: "var(--anek-font)",
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                    onClick={() => closeSwipe()}
                  >
                    Return to Home
                  </Button>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={1}
                  borderTop={"1px solid #cbcbcb"}
                  marginBottom={3}
                >
                  <Link
                    href={`/article/${currentData?.story_desk_created_name}`}
                  >
                    <Typography
                      fontFamily={"var(--arial-font)"}
                      fontSize={16}
                      lineHeight={1.5}
                      component="p"
                      fontWeight={600}
                      my={1}
                     
                    >
                      Read Full Story
                    </Typography>
                  </Link>
                  <Button
                    endIcon={<IoMdShareAlt />}
                    sx={{
                      color: "#000",
                      fontFamily: "var(--anek-font)",
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                    onClick={() => setSharePop(!sharePop)}
                  >
                    Share
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
      </FlipPage>

        </div>
    

      {sharePop && (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
          flexDirection={"column"}
          position={"fixed"}
          right={10}
          top={"36%"}
          bgcolor={"#fff"}
          p={1}
          border={"1px solid #cbcbcb"}
        >
          <Box
            sx={{
              animation: "fadeIn 0.5s ease forwards",
              animationDelay: "0.1s",
              opacity: 0,
            }}
          >
            <FaSquareFacebook
              fontSize={30}
              onClick={() =>
                shareCards("fb", currentData?.story_desk_created_name)
              }
            />
          </Box>
          <Box
            sx={{
              animation: "fadeIn 0.5s ease forwards",
              animationDelay: "0.2s",
              opacity: 0,
            }}
          >
            <BsTwitterX
              fontSize={30}
              onClick={() =>
                shareCards(
                  "x",
                  currentData?.story_desk_created_name,
                  currentData?.story_title_name
                )
              }
            />
          </Box>
          <Box
            sx={{
              animation: "fadeIn 0.5s ease forwards",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            <RiWhatsappFill
              fontSize={30}
              onClick={() =>
                shareCards("wp", currentData?.story_desk_created_name, "mobile")
              }
            />
          </Box>
          <Box
            sx={{
              animation: "fadeIn 0.5s ease forwards",
              animationDelay: "0.4s",
              opacity: 0,
            }}
          >
            <FaYoutube fontSize={30} onClick={() => shareCards("yt")} />
          </Box>
          <Box
            sx={{
              animation: "fadeIn 0.5s ease forwards",
              animationDelay: "0.5s",
              opacity: 0,
            }}
          >
            <AiFillInstagram
              fontSize={30}
              onClick={() => shareCards("insta")}
            />
          </Box>
          <Box
            sx={{
              animation: "fadeIn 0.5s ease forwards",
              animationDelay: "0.6s",
              opacity: 0,
            }}
          >
            <FaLinkedin
              fontSize={30}
              onClick={() =>
                shareCards(
                  "tele",
                  currentData?.story_desk_created_name,
                  currentData?.story_title_name
                )
              }
            />
          </Box>
          <Box
            sx={{
              animation: "fadeIn 0.5s ease forwards",
              animationDelay: "0.7s",
              opacity: 0,
            }}
          >
            <FaSquareThreads fontSize={30} onClick={() => shareCards("td")} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default FlipBookVertical;