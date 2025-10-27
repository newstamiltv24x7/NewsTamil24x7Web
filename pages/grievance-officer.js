import {
    getBreakingNews,
    getControls,
    getHomeMenuApi,
  } from "@/commonComponents/WebApiFunction/ApiFunctions";
  import MobilepageLayout from "@/layouts/MobilepageLayout";
  import { CryptoFetcher } from "@/utils/libs";
  import { Box, Typography } from "@mui/material";
  import dynamic from "next/dynamic";
  import Head from "next/head";
  import Link from "next/link";
  import { usePathname } from "next/navigation";
  import React from "react";
  const HomepageLayout = dynamic(() => import("@/layouts/HomepageLayout"));
  
  export async function getServerSideProps(context) {
    const UA = context.req.headers["user-agent"];
    const isMobile = Boolean(
      UA.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
    try {
      const res = await getHomeMenuApi();
      const decrypted = CryptoFetcher(res?.payloadJson);
  
      const results = await getBreakingNews();
      // const breakingData = CryptoFetcher(results?.payloadJson);
      const breakingData = results?.payloadJson;
  
      const control = await getControls();
      const controlData = CryptoFetcher(control?.payloadJson);
      const quickControl = controlData?.at(1)?.c_control_type?.toLowerCase();
      const breakingControl = controlData?.at(0)?.c_control_type?.toLowerCase();
  
      return {
        props: {
          menuData: decrypted?.length > 0 ? decrypted : [],
          breakingData: breakingData?.length > 0 ? breakingData : [],
          breakingControl: breakingControl,
          quickControl: quickControl,
          deviceType: isMobile ? "mobile" : "desktop",
        },
      };
    } catch (err) {
      return {
        props: {
          menuData: [],
          breakingData: [],
          quickControl: "no",
          breakingControl: "no",
          deviceType: "desktop",
        },
      };
    }
  }
  
  const content = (
    <Box px={2} maxWidth={1440} mx={"auto"} height={"54vh"}>
      <Typography
        color={"#fb6002"}
        fontFamily={"var(--anek-font)"}
        fontWeight={600}
        fontSize={24}
      >
       Grievance Officer
      </Typography>
        {/* <h1 style={{
          fontWeight: 600,
          fontFamily: "var(--anek-font)",
          wordSpacing: 2,
          fontSize: 20,
        }}>Grievance officer :</h1> */}
        <p
        style={{
            fontWeight: 600,
            fontFamily: "var(--anek-font)",
            wordSpacing: 2,
            fontSize: 18,
          }}
        >Name: Mr. Krishnamoorthy</p>
    <p
        style={{
            fontWeight: 600,
            fontFamily: "var(--anek-font)",
            wordSpacing: 2,
            fontSize: 18,
          }}
        >Email: grievance@newstamil.tv</p>

    
    </Box>
  );
  
  function page({
    menuData,
    breakingData,
    quickControl,
    breakingControl,
    deviceType
  }) {
    const pathname = usePathname(); 
    return (
      <div>
        <Head>
          <title>Grievance Officer</title>
          <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${pathname}`} />
        </Head>
        {deviceType === "mobile" ? (
          <MobilepageLayout menuData={menuData} type={deviceType} breakingControl={breakingControl} quickControl={quickControl}>
             <Box mt={breakingControl === "yes" ?  25 : quickControl === "no" ? 25 : 12}>
                    <Box p={0.5} pb={1} pt={3.5}>
                    {content}
                    </Box>
                    </Box>
           
          </MobilepageLayout>
        ) : (
          <HomepageLayout
            menuData={menuData}
            breakingData={breakingData}
            quickControl={quickControl}
            breakingControl={breakingControl}
          >
            {content}
          </HomepageLayout>
        )}
      </div>
    );
  }
  
  export default page;
  