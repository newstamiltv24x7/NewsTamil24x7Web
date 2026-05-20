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
import { usePathname, useSearchParams } from "next/navigation";

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

  // Cache category pages at the CDN/edge for 2 min; serve stale for 5 min
  // while revalidating in the background — keeps TTFB fast for repeat visitors.
  response.res.setHeader(
    "Cache-Control",
    "public, s-maxage=120, stale-while-revalidate=300"
  );

  try {
    // Run all independent fetches in parallel with the menu fetch.
    // Only getCategorySeo depends on the menu result (needs filterPath),
    // so everything else runs concurrently in one shot.
    const [res, trendingResponse, control, results] = await Promise.all([
      getHomeMenuApi(),
      getHomeLatest({ n_page: 1, n_limit: 10, trending_news: 1 }),
      getControls(),
      getBreakingNews(),
    ]);

    const decrypted = CryptoFetcher(res?.payloadJson);

    const filterPath = decrypted
      ?.filter((list) => list.c_category_slug_english_name === slug?.at(0))
      ?.at(0)?.c_category_english_name;

    // Category not found in menu — serve 404 instead of crashing on undefined
    if (!filterPath) {
      return { notFound: true };
    }

    // Now fetch category SEO — this is the only call that needs filterPath
    const seoRes = await getCategorySeo(filterPath);

    const decryptedTrend = CryptoFetcher(trendingResponse?.payloadJson);
    const controlData = CryptoFetcher(control?.payloadJson);
    const quickControl = controlData?.at(1)?.c_control_type?.toLowerCase();
    const breakingControl = controlData?.at(0)?.c_control_type?.toLowerCase();
    const viewControl = controlData?.at(2)?.c_control_type?.toLowerCase();
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
  const pathname = usePathname(); 
  // const searchParams = useSearchParams();

  const jsonBreadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: `${seoData?.story_sub_title_name}`,
        item: `${seoData?.redirect_url}`,
      },
    ],
  };

  


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
        <meta property="og:locale" content="ta_IN" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="News Tamil 24x7" />
        <meta property="og:title" content={seoData?.c_category_meta_title} />
        <meta property="og:description" content={seoData?.c_category_meta_description} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_WEB_URL || "https://newstamil.tv"}${pathname}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@newstamil" />
        <meta name="twitter:title" content={seoData?.c_category_meta_title} />
        <meta name="twitter:description" content={seoData?.c_category_meta_description} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL || "https://newstamil.tv"}${pathname}`} />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonBreadcrumbLd) }}
        />
        
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
            <CategoryPageContainer
              menuData={menuData}
              categoryName={slugName}
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
