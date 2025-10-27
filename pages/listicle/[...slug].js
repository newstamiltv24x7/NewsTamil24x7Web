import {
  getAllNewsList,
  getBreakingNews,
  getControls,
  getHomeMenuApi,
  getQuickLinks,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import ListiclePageContainer from "@/components/Listicles/ListiclePageContainer";
import MobileListiclePageContainer from "@/components/Mobile/MobileListiclePageContainer";
import HomepageLayout from "@/layouts/HomepageLayout";
import MobilepageLayout from "@/layouts/MobilepageLayout";
import { CryptoFetcher } from "@/utils/libs";
import React from "react";

export async function getServerSideProps(req) {
  const url = req.resolvedUrl?.split("/");
  const type = url?.at(1);
  const slug = url?.at(2);
  const UA = req.req.headers["user-agent"];
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
    const viewControl = controlData?.at(2)?.c_control_type?.toLowerCase();

    const body = {
      n_page: 1,
      n_limit: 5,
      main_category_id: "",
    };
    const response = await getAllNewsList(body);
    const decryptedResponse = CryptoFetcher(response?.payloadJson);

    const body1 = {
      n_page: 1,
      n_limit: 10,
      main_category_id: "",
      tending_news: 1,
    };
    const trend = await getAllNewsList(body1);
    const trendingResponse = CryptoFetcher(trend?.payloadJson);

    const listicle = await getQuickLinks(slug, type);
    const listicleRes = CryptoFetcher(listicle?.payloadJson);

    return {
      props: {
        menuData: decrypted?.length > 0 ? decrypted : [],
        breakingData: breakingData?.length > 0 ? breakingData : [],
        newsData: decryptedResponse?.length > 0 ? decryptedResponse : [],
        trendData: trendingResponse?.length > 0 ? trendingResponse : [],
        listicleData: listicleRes?.length > 0 ? listicleRes?.at(0) : [],
        breakingControl: breakingControl,
        deviceType: isMobile ? "mobile" : "desktop",
        viewControl: viewControl,
        quickControl: quickControl,
      },
    };
  } catch (err) {
    return {
      props: {
        menuData: [],
        breakingData: [],
        deviceType: "desktop",
        newsData: [],
        trendData: [],
        listicleData: [],
        quickControl: "no",
        breakingControl: "no",
        viewControl: "no",
      },
    };
  }
}

function page({
  menuData,
  breakingData,
  newsData,
  trendData,
  listicleData,
  quickControl,
  breakingControl,
  viewControl,
  deviceType,
}) {
  return (
    <>
    {deviceType === "mobile" ? (
      <MobilepageLayout menuData={menuData} type={deviceType} breakingControl={breakingControl} 
      viewControl={viewControl} 
      quickControl={quickControl}>
        <MobileListiclePageContainer
        newsData={newsData}
        trendData={trendData}
        listicleRes={listicleData}
        viewControl={viewControl}
      />


      </MobilepageLayout>
      
    ):(
      <HomepageLayout
      menuData={menuData}
      breakingData={breakingData}
      quickControl={quickControl}
      breakingControl={breakingControl}
      viewControl={viewControl}
    >
      <ListiclePageContainer
        newsData={newsData}
        trendData={trendData}
        listicleRes={listicleData}
        viewControl={viewControl}
      />
    </HomepageLayout>
    )
    }
    </>
    


    
  );
}

export default page;
