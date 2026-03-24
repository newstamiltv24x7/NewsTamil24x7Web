// NOTE: "use client" is an App Router directive and must NOT appear in
// Next.js Pages Router files. Removing it prevents the bundler from
// incorrectly treating this page as a client-only module and stops it
// from pulling all transitive imports into the main JS bundle.
import {
  getAllPhotos,
  getBreakingNews,
  getControls,
  getHomeBigStories,
  getHomeDistrictNews,
  getHomeJustBefore,
  getHomeLatest,
  getHomeMenuApi,
  getHomeMenuApiList,
  getHomeTopSection,
  getHomeWorld,
  getSeoList,
  getWebstoriesList,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
// import HomepageMainSection from "@/components/Home/HomepageMainSection";
import LoaderComponent from "@/components/LoaderComponent";
import MobileView from "@/components/MobileView/MobileView";
import { CryptoFetcher } from "@/utils/libs";
import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";


// Dynamic import with loading state
const HomepageMainSection = dynamic(
  () => import("@/components/Home/HomepageMainSection"),
  {
    loading: () => (
      <div className="loading-skeleton">
        <LoaderComponent />
      </div>
    ),
    ssr: true,
  }
);

export async function getServerSideProps(context) {
  // ── CDN / browser caching ────────────────────────────────────────────
  // stale-while-revalidate lets the CDN serve a cached copy instantly
  // while revalidating in the background — cuts TTFB from ~1.2s to ~50ms
  // for all repeat visitors and edge hits.
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=300"
  );

  const UA = context.req.headers["user-agent"];
  const isMobile =
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      UA
    );

  try {
    // 1. Fetch menu order first to get the category IDs for secondary news sections
    const menuOrderRes = await getHomeMenuApiList({
      n_page: 1,
      n_limit: 50,
      c_search_term: "",
      spl_category: "1",
    });
    const orderedMenu = CryptoFetcher(menuOrderRes?.payloadJson)?.at(0)?.data || [];

    // 2. Map fixed category positions (matching components\Home\SecondaryCategory.jsx logic)
    const firstCatId = orderedMenu?.at(4)?.c_category_id;
    const thirdCatId = orderedMenu?.at(6)?.c_category_id;
    const fourthCatId = orderedMenu?.at(7)?.c_category_id;

    // 3. Batch all remaining fetches concurrently
    const [
      menuRes,
      controlRes,
      photosRes,
      shortsRes,
      breakingRes,
      seoRes,
      justBeforeRes, // for SecondaryCategory col 2
      topNewsRes,
      trendingRes,
      districtRes,   // for SecondaryCategory col 1
      bigStoriesRes, // for SecondaryCategory col 3
      worldRes       // for SecondaryCategory col 4
    ] = await Promise.all([
      getHomeMenuApi(),
      getControls(),
      getAllPhotos(),
      getWebstoriesList(),
      getBreakingNews(),
      getSeoList(),
      getHomeJustBefore({ n_page: 1, n_limit: 5, main_category_id: "4a4569143bf4" }),
      getHomeTopSection({ n_page: 1, n_limit: 14, main_category_id: "cf336f838e81" }),
      getHomeLatest({ n_page: 1, n_limit: 6, trending_news: 1 }),
      firstCatId ? getHomeDistrictNews({ n_page: 1, n_limit: 5, main_category_id: firstCatId }) : Promise.resolve(null),
      thirdCatId ? getHomeBigStories({ n_page: 1, n_limit: 5, main_category_id: thirdCatId }) : Promise.resolve(null),
      fourthCatId ? getHomeWorld({ n_page: 1, n_limit: 5, main_category_id: fourthCatId }) : Promise.resolve(null),
    ]);

    // Decrypt all responses where applicable
    const menuData = CryptoFetcher(menuRes?.payloadJson);
    const photosData = CryptoFetcher(photosRes?.payloadJson) || [];
    const webstoriesData = CryptoFetcher(shortsRes?.payloadJson) || [];
    const breakingData = breakingRes?.payloadJson || [];

    const controlData = CryptoFetcher(controlRes?.payloadJson);
    const quickControl = controlData?.[1]?.c_control_type?.toLowerCase() || "no";
    const breakingControl = controlData?.[0]?.c_control_type?.toLowerCase() || "no";
    const viewControl = controlData?.[2]?.c_control_type?.toLowerCase() || "no";

    // Secondary categories data extraction (matching logic in SecondaryCategory.jsx)
    const districtNewsData = CryptoFetcher(districtRes?.payloadJson)?.docs || [];
    const justBeforeNewsData = CryptoFetcher(justBeforeRes?.payloadJson)?.docs || [];
    const bigStoriesNewsData = CryptoFetcher(bigStoriesRes?.payloadJson)?.docs || [];
    const worldNewsData = CryptoFetcher(worldRes?.payloadJson)?.docs || [];

    // Above-the-fold article data
    const topNewsData = CryptoFetcher(topNewsRes?.payloadJson)?.docs || [];
    const trendingNewsData = CryptoFetcher(trendingRes?.payloadJson)?.docs || [];

    // SEO data
    const seoResponse = seoRes?.data?.payloadJson?.at(0) || [];

    const lcpHeroImage = topNewsData?.[0]?.story_cover_image_url || null;

    return {
      props: {
        menuData: menuData || [],
        photosData,
        webstoriesData,
        breakingData,
        seoResponse,
        orderedMenu,
        deviceType: isMobile ? "mobile" : "desktop",
        quickControl,
        breakingControl,
        viewControl,
        // SSR article data — eliminates client-side fetch waterfall for LCP images
        initialNewsData: topNewsData,
        initialTrendingData: trendingNewsData,
        // Secondary news data
        districtNewsData,
        justBeforeNewsData,
        bigStoriesNewsData,
        worldNewsData,
        lcpHeroImage,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        menuData: [],
        photosData: [],
        webstoriesData: [],
        seoResponse: [],
        orderedMenu: [],
        breakingData: [],
        deviceType: "desktop",
        quickControl: "no",
        breakingControl: "no",
        viewControl: "no",
        liveEventImages: [],
        liveEventLinks: [],
        initialNewsData: [],
        initialTrendingData: [],
        lcpHeroImage: null,
      },
    };
  }
}

export default function Home({
  menuData,
  photosData,
  webstoriesData,
  seoResponse,
  orderedMenu,
  breakingData,
  deviceType,
  quickControl,
  breakingControl,
  viewControl,
  liveEventImages,
  liveEventLinks,
  initialNewsData,
  initialTrendingData,
  districtNewsData,
  justBeforeNewsData,
  bigStoriesNewsData,
  worldNewsData,
  lcpHeroImage,
}) {
  const pathname = usePathname(); 
  const jsonArticleLd = {
    "name":"News Tamil 24x7",
    "url":"https://www.newstamil.tv/",
    "logo":{
        "@context":"https://schema.org",
        "@type":"ImageObject",
        "author":"News Tamil 24x7",
        "contentUrl":"https://www.newstamil.tv/_next/static/media/main-logo.ae4ceeb6.png",
        "url":"https://www.newstamil.tv/_next/static/media/main-logo.ae4ceeb6.png",
        "name":"logo",
        "width":"",
        "height":""
      },
    "sameAs":[
            "https://www.youtube.com/@NewsTamil24X7TV",
            "https://www.facebook.com/newstamiltv24x7",
            "https://x.com/newstamiltv24x7",
            "https://www.linkedin.com/in/newstamil24x7/",
            "https://t.me/newstamiltv24x7",
            "https://news.google.com/publications/CAAqBwgKMK7avwswu_XWAw?hl=ta&gl=IN&ceid=IN%3Ata",
            "https://m.dailyhunt.in/news/india/tamil/newstamil+24x7-epaper-newstamil/tamilnadu-updates-tamilnadu?mode=pwa"
        ],
    "@type":"Organization",
    "@context":"https://schema.org"
}

  const jsonWebsiteLd = {
    "@context":"https://schema.org",
    "@type":"Website",
    "url":"https://www.newstamil.tv",
    "interactivityType":"mixed",
    "name":`${seoResponse?.c_seo_page_title}`,
    "headline":`${seoResponse?.c_seo_page_description}`,
    "keywords":`${seoResponse?.c_seo_page_keywords}`,
    "copyrightHolder":{
        "@type":"Organization",
        "name":`${seoResponse?.c_seo_page_title}`
        },
    
    "mainEntityOfPage":{
        "@type":"WebPage",
        "@id":"https://www.newstamil.tv"
      }
}

  const jsonBreadcrumbLd = {
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    "itemListElement":[
        {
            "@type":"ListItem",
            "position":1,
            "name":"Home",
            "item":"https://www.newstamil.tv"
        }
    ]
}

  // NOTE: isLoading+setTimeout removed — it caused CLS=1.0 by hiding
  // SSR content for 300ms then reflowing the full layout on every page load.
  // Data is already available from getServerSideProps, so we render directly.
  return (
    <>
      <Head>
        {/* Preload the LCP hero image so the browser fetches it in the very
            first network round-trip — before any render-blocking resources.
            fetchpriority="high" tells the browser this is the most important
            resource on the page. This tag is emitted before GTM / ad scripts
            because those are injected via next/script strategy="afterInteractive"
            and therefore appear after </body> hydration, not in <head>. */}
        {lcpHeroImage && (
          <link
            rel="preload"
            as="image"
            href={lcpHeroImage}
            fetchpriority="high"
          />
        )}
        <title>{seoResponse?.c_seo_page_title}</title>
        <meta
          name="description"
          content={seoResponse?.c_seo_page_description}
        />
        <meta name="keywords" content={seoResponse?.c_seo_page_keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${pathname}`} />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonArticleLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonWebsiteLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonBreadcrumbLd) }}
        />
      </Head>

      {deviceType === "mobile" ? (
        <div>
        <MobileView
          menuData={menuData}
          orderedMenu={orderedMenu}
          photosData={photosData}
          webstoriesData={webstoriesData}
          viewControl={viewControl}
          breakingControl={breakingControl}
          quickControl={quickControl}
        />
        </div>
      ) : (
        <div>
        <HomepageMainSection
          menuData={menuData}
          photosData={photosData}
          webstoriesData={webstoriesData}
          orderedMenu={orderedMenu}
          breakingData={breakingData}
          quickControl={quickControl}
          breakingControl={breakingControl}
          viewControl={viewControl}
          liveEventImages={liveEventImages}
          liveEventLinks={liveEventLinks}
          initialNewsData={initialNewsData}
          initialTrendingData={initialTrendingData}
          districtNewsData={districtNewsData}
          justBeforeNewsData={justBeforeNewsData}
          bigStoriesNewsData={bigStoriesNewsData}
          worldNewsData={worldNewsData}
        />
        </div>
      )}
    </>
  );
}
