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
  <Box px={2} m="5%" sx={{ paddingTop: { xs: "90px", sm: 0 } }}>
  <Typography
    color="#fb6002"
    fontFamily="var(--anek-font)"
    fontWeight={600}
    fontSize={24}
    mb={1}
  >
    ABOUT US
  </Typography>
<Typography
  fontSize={30}
  fontWeight={700}
  textAlign="center"
  my={3}
>
  Who We Are
</Typography>


  <p
    className="about-content"
    style={{
      margin: "0 0 1rem",
      fontFamily: "var(--noto-sans)",
      color: "#000",
      lineHeight: "38px",
      fontSize: 24,
      textAlign: "justify",
    }}
  >
    This Tamil news channel is operated by SPLUS MEDIA LIMITED, a company
    incorporated under the Indian Companies Act, 1956. The platform operates
    under the brand name News Tamil 24x7 and functions within the news media
    industry, covering television and digital news. The organization began its
    broadcast journey on January 23, 2022, with the tagline “Meiporul Kanbathu
    Arivu”.
    <br />
    Operating as an online news portal, the newsroom serves readers across the
    Tamil language space with a clear focus on credibility, clarity, and public
    relevance. Editorial operations are rooted in Tamil Nadu, with strong
    newsroom presence in Chennai and Madurai. As a news channel online,
    structured newsroom operations guide content creation, verification, and
    publishing workflows.
    <br />
    <br />

{/* SEO-friendly internal backlink */}
<button
  onClick={() => {
    window.location.href = "https://newstamil.tv";
  }}
  style={{
    marginTop: "16px",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: 600,
    backgroundColor: "#fb6002",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Explore More
</button>

<br />
<br />


    <Typography
  fontSize={30}
  fontWeight={700}
  textAlign="center"
  my={3}
>
  What We Cover
</Typography>

    <br />
    ● District level reporting and state wide updates that reflect local realities
    <br />
    ● Breaking news coverage supported by live information updates
    <br />
    ● Political reporting, sports coverage, and education updates
    <br />
    ● Public interest stories supported by structured reports
    <br />
    <br />

 <Typography
  fontSize={30}
  fontWeight={700}
  textAlign="center"
  my={3}
>
  Ethics and Responsibility
</Typography>
    <br />
    Every report follows a documented fact-checking process, source validation,
    and editorial independence before publication. Errors, when identified, are
    addressed transparently to ensure accountability.
    <br />
    <br />
 <Typography
  fontSize={30}
  fontWeight={700}
  textAlign="center"
  my={3}
>
  Our Mission
</Typography>
    <br />
    To serve society through journalism that informs, empowers, and reflects
    diverse communities while strengthening democratic values.
    <br />
    <br />

    <strong>Registered Office</strong>
    <br />
    Chennai, Tamil Nadu, India.
    <br />
    <br />

    <strong>Official Website</strong>
    <br />
    News Tamil functions as the primary online news platform delivering verified
    and responsible journalism for Tamil-speaking audiences.
  </p>
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
        <title>About Us</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${pathname}`} />
      </Head>
      {deviceType === "mobile" ? (
        <MobilepageLayout menuData={menuData} type={deviceType} breakingControl={breakingControl} quickControl={quickControl}>
          {content}
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
