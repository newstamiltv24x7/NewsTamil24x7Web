import {
  getAllPhotos,
  getAllPhotosList,
  getBreakingNews,
  getControls,
  getHomeLatest,
  getHomeMenuApi,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import MainPhotosPage from "@/components/Mobile/MainPhotosPage";
import PhotosPageContainer from "@/components/Photos/PhotosPageContainer";
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
      n_limit: 6,
      trending_news: 1,
    };
    const trendingResponse = await getHomeLatest(body);
    const decryptedTrend = CryptoFetcher(trendingResponse?.payloadJson);

    const photosRes = await getAllPhotos();

    const decryptedPhotos = CryptoFetcher(photosRes?.payloadJson);

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
        photosData: decryptedPhotos?.length > 0 ? decryptedPhotos : [],
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
        photosData: [],
        breakingData: [],
        quickControl: "no",
        breakingControl: "no",
        viewControl: "no",        
        deviceType: "desktop",
      },
    };
  }
}

function photos({
  menuData,
  trendingData,
  photosData,
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
        <title>News Tamil 24x7 | Photos</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${pathname}`} />
      </Head>
      {deviceType === "mobile" ? (
        <MainPhotosPage
          menuData={menuData}
          trendingData={trendingData}
          photosData={photosData}
          breakingControl={breakingControl}
          viewControl={viewControl}
          quickControl={quickControl}
        />
      ) : (
        <PhotosPageContainer
          menuData={menuData}
          trendingData={trendingData}
          photosData={photosData}
          breakingData={breakingData}
          quickControl={quickControl}
          breakingControl={breakingControl}
          viewControl={viewControl}
        />
      )}
    </>
  );
}

export default photos;
