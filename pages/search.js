import {
  getBreakingNews,
  getControls,
  getHomeLatest,
  getHomeMenuApi,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import SearchPageContainer from "@/components/Search/SearchPageContainer";
import HomepageLayout from "@/layouts/HomepageLayout";
import MobilepageLayout from "@/layouts/MobilepageLayout";
import { CryptoFetcher } from "@/utils/libs";
import Head from "next/head";
import { usePathname } from "next/navigation";
import React from "react";

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

    const body = {
      n_page: 1,
      n_limit: 12,
      trending_news: 1,
    };
    const trendingResponse = await getHomeLatest(body);
    const decryptedTrend = CryptoFetcher(trendingResponse?.payloadJson);

    const results = await getBreakingNews();
    // const breakingData = CryptoFetcher(results?.payloadJson);
    const breakingData = results?.payloadJson;

    const control = await getControls();
    const controlData = CryptoFetcher(control?.payloadJson);
    const quickControl = controlData?.at(1)?.c_control_type?.toLowerCase();
    const breakingControl = controlData?.at(0)?.c_control_type?.toLowerCase();
    const viewControl = controlData?.at(2)?.c_control_type?.toLowerCase();

    return {
      props: {
        menuData: decrypted?.length > 0 ? decrypted : [],
        trendingData: decryptedTrend?.docs ?? [],
        breakingData: breakingData?.length > 0 ? breakingData : [],
        breakingControl: breakingControl,
        viewControl: viewControl,
        quickControl: quickControl,
        tag: context.query?.tag ?? "",
        deviceType: isMobile ? "mobile" : "desktop",
      },
    };
  } catch (err) {
    return {
      props: {
        menuData: [],
        trendingData: [],
        breakingData: [],
        quickControl: "no",
        breakingControl: "no",
        viewControl: "no",        
        tag: "",
        deviceType: "desktop",
      },
    };
  }
}

function photos({
  menuData,
  trendingData,
  breakingData,
  quickControl,
  breakingControl,
  viewControl,
  tag,
  deviceType,
}) {
  const pathname = usePathname(); 
  return (
    <>
      <Head>
        <title>News Tamil | Search</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${pathname}`} />
      </Head>

      {deviceType === "mobile" ? (
        <MobilepageLayout menuData={menuData} type={deviceType} breakingControl={breakingControl} quickControl={quickControl}>
          <SearchPageContainer
            trendingData={trendingData}
            tag={tag}
            deviceType={deviceType}
          />
        </MobilepageLayout>
      ) : (
        <HomepageLayout
          menuData={menuData}
          breakingData={breakingData}
          quickControl={quickControl}
          breakingControl={breakingControl}
          viewControl={viewControl}
        >
          <SearchPageContainer
            trendingData={trendingData}
            tag={tag}
            deviceType={deviceType}
            breakingControl={breakingControl}
            viewControl={viewControl}
          />
        </HomepageLayout>
      )}
    </>
  );
}

export default photos;
