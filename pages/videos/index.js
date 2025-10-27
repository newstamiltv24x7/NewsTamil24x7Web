import VideosPageContainer from "@/components/videos/VideosPageContainer";
import {
  getAllCardSection,
  getBreakingNews,
  getControls,
  getHomeLatest,
  getHomeMenuApi,
  getYoutubeVideos,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import { CryptoFetcher } from "@/utils/libs";
import MobileVideoPage from "@/components/Mobile/MobileVideoPage";
import Head from "next/head";
import { usePathname } from "next/navigation";

export async function getServerSideProps(response) {
  try {
    const UA = response.req.headers["user-agent"];
    const isMobile = Boolean(
      UA.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );

    const res = await getHomeMenuApi();
    const decrypted = CryptoFetcher(res?.payloadJson);

    const cardsRes = await getAllCardSection();
    const decryptedCard = CryptoFetcher(cardsRes?.payloadJson);

    const body = {
      n_page: 1,
      n_limit: 6,
      trending_news: 1,
    };
    const trendingResponse = await getHomeLatest(body);
    const decryptedTrend = CryptoFetcher(trendingResponse?.payloadJson);
    const youtubeResults = await getYoutubeVideos()?.then((res) => res.items);

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
        cardData: decryptedCard?.length > 0 ? decryptedCard : [],
        youtubeData: youtubeResults?.length > 0 ? youtubeResults : [],
        breakingData: breakingData?.length > 0 ? breakingData : [],
        breakingControl: breakingControl,
        viewControl: viewControl,
        quickControl: quickControl,
        deviceType: isMobile ? "mobile" : "desktop",
      },
    };
  } catch (err) {
    return {
      props: {
        menuData: [],
        trendingData: [],
        cardData: [],
        youtubeData: [],
        breakingData: [],
        quickControl: "no",
        breakingControl: "no",
        viewControl: "no",
        deviceType: "desktop",
      },
    };
  }
}

export default function Page({
  menuData,
  trendingData,
  cardData,
  youtubeData,
  breakingData,
  quickControl,
  breakingControl,
  viewControl,
  deviceType,
}) {
  const pathname = usePathname(); 
  return (
    <>
    <Head>
        <title>News Tamil 24x7 | Videos</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${pathname}`} />
      </Head>
      {deviceType === "mobile" ? (
        <MobileVideoPage menuData={menuData} trendingData={trendingData} breakingControl={breakingControl} viewControl={viewControl} quickControl={quickControl}/>
      ) : (
        <VideosPageContainer
          menuData={menuData}
          trendingData={trendingData}
          cardData={cardData}
          youtubeData={youtubeData}
          breakingData={breakingData}
          quickControl={quickControl}
          breakingControl={breakingControl}
          viewControl={viewControl}
        />
      )}
    </>
  );
}
