import { getWebstoriesList } from "@/commonComponents/WebApiFunction/ApiFunctions";
import InstaStoriesPage from "@/components/InstaStoriesPage";
import { CryptoFetcher } from "@/utils/libs";
import Head from "next/head";
import { usePathname } from "next/navigation";
import React from "react";

export async function getServerSideProps(request) {
  const { query } = request;
  const UA = request.req.headers["user-agent"];
  const isMobile = Boolean(
    UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  try {
    const shortsResults = await getWebstoriesList(query.slug?.at(0));
    const shortsData = CryptoFetcher(shortsResults?.payloadJson);
    return {
      props: {
        webData: shortsData?.length > 0 ? shortsData : [],
        deviceType: isMobile ? "mobile" : "desktop",
      },
    };
  } catch (err) {
    return {
      props: {
        webData: [],
        deviceType: "desktop",
      },
    };
  }
}

function page({ webData, deviceType }) {
  const pathname = usePathname(); 

  return (
    <>
      <Head>

      <meta charSet="utf-8" />
      <title>{webData?.at(0)?.c_web_story_title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="article:publisher"
          content="https://www.newstamil.tv/"
        />
        <meta property="og:site_name" content="NEWS Tamil 24x7" />
        {/* <meta name="description" content={webData?.at(0)?.story_sub_title_name} /> */}
        {/* <meta name="keywords" content={webData?.at(0)?.seo_tag} /> */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={webData?.at(0)?.c_web_story_title} />
        {/* <meta property="og:description" content={webData?.at(0)?.story_sub_title_name}/> */}
        <meta
          property="og:image"
          content={webData?.at(0)?.c_web_story_cover_img}
        />
        {/* <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_API_WEB_URL}/dnews/${singleNews?.story_desk_created_name}`}
        /> */}
        <meta property="og:image:width" content="750" />
        <meta property="og:image:height" content="430" />
        <meta name="twitter:creator" content="@newstamil" />
        <meta name="twitter:site" content="@newstamil" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={(webData?.at(0)?.c_web_story_title)}
        />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${pathname}`} />
        {/* <meta
          name="twitter:description"
          content={singleNews?.story_sub_title_name}
        /> */}
        {/* <meta
          name="twitter:image"
          content={`https://d3dqrx874ys9wo.cloudfront.net/uploads/web/images/750x430/${singleNews?.story_cover_image_url}`}
        /> */}
        {/* <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_API_WEB_URL}/dnews/${singleNews?.story_desk_created_name}`}
        /> */}
        <link rel="icon" href="/favicon.ico" />





      </Head>
      <InstaStoriesPage shortsData={webData} deviceType={deviceType} />
    </>
  );
}

export default page;
