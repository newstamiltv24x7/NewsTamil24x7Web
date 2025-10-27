import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { PiShareFatDuotone } from "react-icons/pi";
import { TbReload } from "react-icons/tb";
import Stories from "react-insta-stories";

function InstaStoriesPage({ shortsData, deviceType }) {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [storyHeight, setStoryHeight] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mobileDevice, setMobileDevice] = useState(false);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  
 
  
  const DynamicZoomEffect = ({ url }) => {
    const [scale, setScale] = useState(1);
    
    const [zoomDirection, setZoomDirection] = useState(1);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setScale((prevScale) => {
          const newScale = prevScale + zoomDirection * 0.004;
          
          if (newScale >= 1.2 ) {
            setZoomDirection(-zoomDirection);
          }else if(newScale < 1.2){
            setZoomDirection(1);
          }
          return newScale;
        });
      }, 100);
  
      return () => clearInterval(interval);
    }, [zoomDirection]);
  
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          backgroundImage: `url(${url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(${scale})`,
          transition: 'transform 1s linear',
        }}
      />
    );
  };






  useEffect(() => {
    
    if (typeof window !== "undefined") {
      setStoryHeight(window.innerHeight);
      const handleResize = () => {
        setStoryHeight(window.innerHeight);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    const temp =
      shortsData?.at(0)?.c_web_story_images?.map((list) => ({
        url: list?.c_file_url,
        title: list?.c_web_story_content || "Default Title",
      })) || [];
    setData(temp);
  }, [shortsData]);

  const handleNext = () => {
    if (activeIndex < data.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex(activeIndex + 1);
        setIsAnimating(false);
      }, 500);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex(activeIndex - 1);
        setIsAnimating(false);
      }, 500);
    }
  };

  const handleRestart = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex(0);
      setIsAnimating(false);
    }, 500);
  };


  const storiesZoomEffect = data.map((list) => ({
    content: () => <DynamicZoomEffect url={list.url} />,
  }));

  const getDimensions = () => {
    if (typeof window !== "undefined") {
      const isMobile =  window?.innerWidth < 768;
      if(isMobile){
        
        setMobileDevice(true)
      }else{
      
        setMobileDevice(false)
      }
      
  
      return {
        width: isMobile ?  window?.innerWidth : "100vw", 
        height: isMobile ?  window.innerHeight : "120vh", 
      };
    }


  
  };
  useEffect(() => {
    const result = getDimensions();
    setHeight(result.height);
    setWidth(result.width)
  }, [])
  

 

  return (
    <>
      {/* Background with fade-in animation */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: data[activeIndex]
            ? `url(${data[activeIndex].url})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(100px)",
          zIndex: -1,
        }}
      />

<div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
<Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
        
      >
        <Box
          position={"relative"}
          sx={{
            img: {
              objectFit: "cover",
              width: "100% !important",
              height: "100% !important",
            },
          }}
          // height="650px"
        >
          {data.length > 0 && (
            <div className="img-zoom-in">
           
            <Stories
              stories={storiesZoomEffect}
              defaultInterval={5000}
              // width={450}
              width={ mobileDevice === true ? width : "30vw"}
			        height={mobileDevice === true  ? height: "100vh"}
              currentIndex={activeIndex}
              onAllStoriesEnd={handleNext}
              onStoryStart={(index) => setActiveIndex(index)}
              style={{ objectFit: "cover" }}
            />

            <Box
            key={activeIndex}
            className={isAnimating ? "fade-in" : ""}
            sx={{
              position: "absolute",
              bottom: mobileDevice ? 0 : 0,
              width: mobileDevice ? width : "30vw",
              padding: mobileDevice ? 10 : 8,
              // background: "linear-gradient(180deg, #00000000 5%, #171d28 100%)",
              background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.40948879551820727) 90%, rgba(0,0,0,0) 100%)",
              color: "white",
              textAlign: "center",
              // transform: "rotate(5deg)",
              // borderTopLeftRadius:"80px",
              // borderBottomRightRadius:"80px"
            }}
          >
            <Typography className="animated animatedFadeInUp fadeInUp" variant="h6" fontSize={"16px"} fontFamily={"var(--anek-font)"}>
              {data[activeIndex]?.title}
            </Typography>
          </Box>
            
            </div>
            
          )}
          

          <Box
            sx={{
              position: "absolute",
              top: 40,
              right: 10,
              zIndex: 1000,
            }}
          >
            <PiShareFatDuotone
              color="#fff"
              fontSize={32}
              style={{ cursor: "pointer" }}
              onClick={async () => {
                const shareData = {
                  title: "News Tamil",
                  text: "News Tamil",
                  url: `${window.location.href}`,
                };
                try {
                  await navigator.share(shareData);
                } catch (err) {
                  console.log(err);
                }
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            width: "45%",
            display: deviceType === "mobile" ? "none" : "flex",
            justifyContent: "space-between",
            transform: "translateY(-50%)",
          }}
        >
          <Button
            onClick={handlePrev}
            sx={{
              backgroundColor:
                activeIndex === 0 ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0)",
              color: "white !important",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
              minWidth: "48px",
              height: "48px",
              borderRadius: "50%",
            }}
            disabled={activeIndex === 0}
          >
            <FaChevronLeft fontWeight={600} fontSize={24} />
          </Button>

          <Button
            sx={{
              backgroundColor: "rgba(0, 0, 0)",
              color: "#fff",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
              minWidth: "48px",
              height: "48px",
              borderRadius: "50%",
            }}
            onClick={
              activeIndex === data.length - 1 ? handleRestart : handleNext
            }
          >
            {data.length - 1 === activeIndex ? (
              <TbReload fontWeight={600} fontSize={24} />
            ) : (
              <FaChevronRight fontWeight={600} fontSize={24} />
            )}
          </Button>
        </Box>
      </Box>
  </div>


      
    </>
  );
}

export default InstaStoriesPage;
