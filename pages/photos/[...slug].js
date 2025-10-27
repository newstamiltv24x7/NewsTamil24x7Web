import {
  getAllPhotos,
  getAllPhotosList,
  getControls,
  getHomeLatest,
  getHomeMenuApi,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import PhotosPageContainer from "@/components/Photos/PhotosPageContainer";
import { CryptoFetcher } from "@/utils/libs";
import React from "react";
import PhotosModal from "./photosModal";
import PhotosMobilePage from "@/components/Mobile/PhotosMobilePage";
import Head from "next/head";
import { usePathname } from "next/navigation";

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

    const photosRes = await getAllPhotos(context?.params?.slug?.at(0));

    const decryptedPhotos = CryptoFetcher(photosRes?.payloadJson);

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
  quickControl,
  breakingControl,
  viewControl,
  deviceType,
}) {
  const pathname = usePathname(); 
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{photosData?.at(0)?.c_photos_title}</title>
        <meta
          name="description"
          content={photosData?.at(0)?.c_photos_content}
        />
        <meta property="og:title" content={photosData?.at(0)?.c_photos_title} />
        <meta
          property="og:description"
          content={photosData?.at(0)?.c_photos_content}
        />
        <meta property="og:image" content={photosData?.at(0)?.c_photos_img} />
        <meta
          name="twitter:title"
          content={photosData?.at(0)?.c_photos_title}
        />
        <meta
          name="twitter:description"
          content={photosData?.at(0)?.c_photos_content}
        />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${pathname}`} />
      </Head>
      {deviceType === "mobile" ? (
        <PhotosMobilePage
          menuData={menuData}
          trendingData={trendingData}
          photos={photosData}
          breakingControl={breakingControl}
          quickControl={quickControl}
          viewControl={viewControl}
        />
      ) : (
        <PhotosModal
          photos={photosData}
          menuData={menuData}
          trendingData={trendingData}
          quickControl={quickControl}
          breakingControl={breakingControl}
          viewControl={viewControl}
        />
      )}
    </>
  );
}

export default photos;
