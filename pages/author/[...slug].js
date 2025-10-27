import SecondaryCategory from "@/components/Category/SecondaryCategory";
import React from "react";
import { CryptoFetcher } from "@/utils/libs";
import {
  getBreakingNews,
  getCategorySeo,
  getControls,
  getHomeLatest,
  getHomeMenuApi,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import Head from "next/head";
import CategoryPageContainer from "@/components/Category/CategoryPageContainer";
import MobileCategoryPage from "@/components/Mobile/MobileCategoryPage";
import AuthorPageContainer from "@/components/Author/AuthorPageContainer";

export async function getServerSideProps(response) {
  const { slug } = response?.params;
  
  const parentPath = slug?.at(0) ?? "";
  const childPath = slug?.at(1) ?? "";
  const UA = response.req.headers["user-agent"];
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

    const filterPath = decrypted
      ?.filter((list) => list.c_category_slug_english_name === slug?.at(0))
      ?.at(0)?.c_category_english_name;
    const seoRes = await getCategorySeo(filterPath);

    const control = await getControls();
    const controlData = CryptoFetcher(control?.payloadJson);
    const quickControl = controlData?.at(1)?.c_control_type?.toLowerCase();
    const breakingControl = controlData?.at(0)?.c_control_type?.toLowerCase();
    const viewControl = controlData?.at(2)?.c_control_type?.toLowerCase();

    const results = await getBreakingNews();
    // const breakingData = CryptoFetcher(results?.payloadJson);
    const breakingData = results?.payloadJson;

    return {
      props: {
        menuData: decrypted?.length > 0 ? decrypted : [],
        trendingData: decryptedTrend?.docs ?? [],
        slugName: slug ? slug?.at(0) : "",
        breakingData: breakingData?.length > 0 ? breakingData : [],
        seoData:
          seoRes?.payloadJson?.length > 0 ? seoRes?.payloadJson?.at(0) : [],
        deviceType: isMobile ? "mobile" : "desktop",
        breakingControl: breakingControl,
        viewControl : viewControl,
        quickControl: quickControl,
        parentPath: parentPath,
        childPath: childPath,
      },
    };
  } catch (err) {
    return {
      props: {
        menuData: [],
        trendingData: [],
        slugName: "",
        seoData: [],
        breakingData: [],
        deviceType: "desktop",
        quickControl: "no",
        breakingControl: "no",
        viewControl: "no",
        parentPath: "",
        childPath: "",
      },
    };
  }
}

function page({
  menuData,
  trendingData,
  slugName,
  seoData,
  breakingData,
  deviceType,
  quickControl,
  breakingControl,
  viewControl,
  parentPath,
  childPath,
}) {

    
  return (
    <>
      <Head>
        <title>{seoData?.c_category_meta_title}</title>
        <meta
          name="description"
          content={seoData?.c_category_meta_description}
        />
        <meta name="keywords" content={seoData?.c_category_meta_keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>



      {deviceType === "mobile" ? (
        <MobileCategoryPage
          menuData={menuData}
          trendingData={trendingData}
          categoryName={slugName}
          parentPath={parentPath}
          childPath={childPath}
          viewControl={viewControl}
          breakingControl={breakingControl}
          quickControl={quickControl}
        />
      ) : (
        <>
          {slugName?.toLowerCase()?.includes("india") ? (
            <SecondaryCategory
              menuData={menuData}
              trendingData={trendingData}
              breakingData={breakingData}
              categoryName={slugName}
              quickControl={quickControl}
              breakingControl={breakingControl}
              viewControl={viewControl}
              title={seoData?.c_category_meta_title}
              subCategory={""}
            />
          ) : (
            <AuthorPageContainer
              menuData={menuData}
              SlugName={slugName}
              subCategory={""}
              trendingData={trendingData}
              breakingData={breakingData}
              title={seoData?.c_category_meta_title}
              quickControl={quickControl}
              breakingControl={breakingControl}
              viewControl={viewControl}
              parentPath={parentPath}
              childPath={childPath}
            />
          )}
        </>
      )}
    </>
  );
}

export default page;
