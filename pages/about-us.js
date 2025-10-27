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
  <Box px={2} maxWidth={1440} mx={"auto"}>
    <Typography
      color={"#fb6002"}
      fontFamily={"var(--anek-font)"}
      fontWeight={600}
      fontSize={24}
    >
      ABOUT US
    </Typography>
    <p
      style={{
        fontWeight: 600,
        fontFamily: "var(--anek-font)",
        wordSpacing: 2,
        fontSize: 18,
      }}
    >
      The company SPLUS MEDIA LIMITED is incorporated under Indian Companies Act
      1956 and their registered address is No: No 145, Rukmani Lakshmipathy
      Road, Pudhupet, Chennai-600008. The company launched satellite TV channel
      “NEWS TAMIL 24 X 7” On 23rd January 2022 with it’s tag line being
      “Meiporul Kanbathu Arivu” (Knowledge is seeing reality). News Tamil 24x7
      is an Indian television channel based in Tamil Nadu Chennai, India.The
      channel has shown tremendous growth in terms of viewership and grown to be
      strong challenger brand in the Tamil News genre. We are the No.1 News
      channel in Chennai.
      <br />
      <br />
      This growth in viewership was made possible mainly due to high quality
      content and exposés that we disseminate to the discerning viewer along
      with our strong distribution network. Use of latest technology also plays
      a very important role in the way news is presented which gives the viewer
      a great visual effect.
      <br />
      <br />
      This online news media aims to make the people as journalists participate
      in the creation of news and report the events truthfully and quickly.
      Messages, videos and photos sent by users will be used after verifying
      their authenticity. Through this, News Tamil 24x7 channel is Tamil
      connects people not only with our media but also with news editors and
      journalists. More than a thousand journalists from all corners of the
      country provide news 24 hours a day.
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
