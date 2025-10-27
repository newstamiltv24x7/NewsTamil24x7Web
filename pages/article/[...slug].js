import dynamic from "next/dynamic";
import {
  getParticularNews,
  getControls,
  getHomeMenuApi,
  getBreakingNews,
  getAllYoutubeVideos,
  getNewsSeo,
  getHomeLatest,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import { CryptoFetcher } from "@/utils/libs";
import Head from "next/head";
import React from "react";
import Custom404 from "../404";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// Dynamic imports for lazy loading
const ArticlePageContainer = dynamic(
  () => import("@/components/Article/ArticlePageContainer"),
  { ssr: false }
);
const MobileArticlePage = dynamic(
  () => import("@/components/Mobile/MobileArticlePage"),
  { ssr: false }
);

export async function getServerSideProps(response) {
  const slugify = response.params?.slug?.join("/");
  const UA = response.req.headers["user-agent"];
  const isMobile = Boolean(
    UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  try {
    const [
      menuRes,
      trendingResponse,
      controlRes,
      seoRes,
      newsRes,
      slugRes,
      youtubeRes,
      breakingRes,
    ] = await Promise.all([
      getHomeMenuApi(),
      getHomeLatest({
        n_page: 1,
        n_limit: 6,
        trending_news: 1
      }),
      getControls(),
      getNewsSeo(slugify),
      getHomeLatest({ n_page: 1, n_limit: 10, trending_news: 1 }),
      getParticularNews(slugify),
      getAllYoutubeVideos({
        n_page: 1,
        n_limit: 20,
        c_search_term: "",
        c_video_type: "posted",
        c_youtube_type: "video",
      }),
      getBreakingNews(),
    ]);

    const decrypted = CryptoFetcher(menuRes?.payloadJson);
    const decryptedTrend = CryptoFetcher(trendingResponse?.payloadJson);
    const controlData = CryptoFetcher(controlRes?.payloadJson);
    const decryptedSlug = CryptoFetcher(slugRes?.payloadJson);
    const decryptedNews = CryptoFetcher(newsRes?.payloadJson);
    const decryptedVideos = CryptoFetcher(youtubeRes?.payloadJson)?.at(0)?.data;
    // const breakingData = CryptoFetcher(breakingRes?.payloadJson);
    const breakingData = breakingRes?.payloadJson;

    return {
      props: {
        menuData: decrypted?.length > 0 ? decrypted : [],
        trendingData: decryptedTrend?.docs ?? [],
        newsData: decryptedNews?.docs ?? [],
        singleNews: decryptedSlug?.length > 0 ? decryptedSlug : [],
        youtubeData: decryptedVideos?.length > 0 ? decryptedVideos : [],
        breakingData: breakingData?.length > 0 ? breakingData : [],
        seoData:
          seoRes?.payloadJson?.length > 0 ? seoRes?.payloadJson?.at(0) : [],
        deviceType: isMobile ? "mobile" : "desktop",
        quickControl: controlData?.at(1)?.c_control_type?.toLowerCase() || "no",
        breakingControl:
          controlData?.at(0)?.c_control_type?.toLowerCase() || "no",
        viewControl: controlData?.at(2)?.c_control_type?.toLowerCase() || "no",
      },
    };
  } catch (err) {
    return {
      props: {
        menuData: [],
        trendingData: [],
        newsData: [],
        singleNews: [],
        youtubeData: [],
        seoData: [],
        breakingData: [],
        deviceType: "desktop",
        quickControl: "no",
        breakingControl: "no",
        viewControl: "no",

      },
    };
  }
}

function Page({
  menuData,
  trendingData,
  newsData,
  singleNews,
  youtubeData,
  seoData,
  breakingData,
  deviceType,
  quickControl,
  breakingControl,
  viewControl,
}) {

  console.log(trendingData,"<<< TRRRR DATAAAA")


  const navigate = useRouter();
  const pathname = usePathname(); 


  const jsonArticleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${seoData?.story_title_name}`,
    image: `${seoData?.story_cover_image_url}`,  
    author: {
      "@type": "Person",
      name: "NT WEB",
      url:"https://www.newstamil.tv/author/newstamil-web"
    },  
    publisher: {
      "@type": "Organization",
      name: "News Tamil 24x7",
      logo: {
        "@type": "ImageObject",
        url: "https://www.newstamil.tv/_next/static/media/main-logo.ae4ceeb6.png"
      }
    },
    datePublished: `${seoData?.createdAt}`,
    dateModified: `${seoData?.updatedAt}`,
  }

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

  const jsonImageLd = {
    headline: `${seoData?.story_title_name}`,
    image: {
      "@type": "ImageObject",
      url: `${seoData?.story_cover_image_url}`,
      width: "1200",
      height: "675",
    },
    url: `${seoData?.redirect_url}`,
    datePublished: `${seoData?.createdAt}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${seoData?.redirect_url}`,
    },
    publisher: {
      "@type": "Organization",
      "@context": "https://schema.org",
      name: "News Tamil 24x7",
      url: "https://www.newstamil.tv",
      logo: {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        author: "News Tamil 24x7",
        contentUrl:
          "https://www.newstamil.tv/_next/static/media/main-logo.ae4ceeb6.png",
        url: "https://www.newstamil.tv/_next/static/media/main-logo.ae4ceeb6.png",
        name: "logo",
        width: "",
        height: "",
      },
      sameAs: [
        "https://www.youtube.com/@NewsTamil24X7TV",
        "https://www.facebook.com/newstamiltv24x7",
        "https://x.com/newstamiltv24x7",
        "https://www.linkedin.com/in/newstamil24x7/",
        "https://t.me/newstamiltv24x7",
        "https://news.google.com/publications/CAAqBwgKMK7avwswu_XWAw?hl=ta&gl=IN&ceid=IN%3Ata",
        "https://m.dailyhunt.in/news/india/tamil/newstamil+24x7-epaper-newstamil/tamilnadu-updates-tamilnadu?mode=pwa",
      ],
      id: "https://www.newstamil.tv",
    },
    author:[{
      "@type":"Person",
      givenName:"NT WEB",
      name:"NT WEB",
      url:"https://www.newstamil.tv/author/newstamil-web"
      }],
    keywords: `${seoData?.seo_keywords}`,
    thumbnailUrl: `${seoData?.story_cover_image_url}`,
    articleBody: `${seoData?.story_details}`,
    dateCreated: `${seoData?.createdAt}`,
    dateModified: `${seoData?.updatedAt}`,
    name: `${seoData?.story_sub_title_name}`,
    isPartOf: {
      "@type": "WebPage",
      url: `${seoData?.redirect_url}`,
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${seoData?.story_cover_image_url}`,
        width: "1200",
        height: "675",
      },
    },
    articleSection: `${seoData?.story_subject_name}`,
    "@type": "Article",
    "@context": "https://schema.org",
  };


useEffect(() => {
  if(seoData?.length === 0){
    // navigate.push("/404");
  }
}, [seoData])




  return (
    <>
      <Head>
        <meta charSet="utf-8" />

        <title>{seoData?.story_title_name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="article:publisher" content="https://www.newstamil.tv" />
        <meta property="og:site_name" content="news Tamil 24x7" />
        <meta name="description" content={seoData?.story_sub_title_name} />
        <meta name="keywords" content={seoData?.seo_tag} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seoData?.story_title_name} />
        <meta
          property="og:description"
          content={seoData?.story_sub_title_name}
        />
        <meta property="og:image" content={seoData?.story_cover_image_url} />
        <meta property="og:url" content={seoData?.redirect_url} />
        <meta property="og:image:width" content="750" />
        <meta property="og:image:height" content="430" />
        <meta name="twitter:creator" content="@newstamil" />
        <meta name="twitter:site" content="@newstamil" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData?.story_title_name} />
        <meta
          name="twitter:description"
          content={seoData?.story_sub_title_name}
        />
        <meta name="twitter:image" content={seoData?.story_cover_image_url} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${pathname}`} />
        {/* <link rel="canonical" href={seoData?.redirect_url} /> */}
        <link rel="icon" href="/favicon.ico" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonArticleLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonBreadcrumbLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonImageLd) }}
        />
      </Head>

      {deviceType === "mobile" ? (
        <MobileArticlePage
          menuData={menuData}
          newsData={newsData}
          trendingData={trendingData}
          singleNews={singleNews}
          viewControl={viewControl}
          breakingControl={breakingControl}
          quickControl={quickControl}
        />
      ) : (
        <ArticlePageContainer
          menuData={menuData}
          newsData={newsData}
          singleNews={singleNews}
          youtubeData={youtubeData}
          breakingData={breakingData}
          quickControl={quickControl}
          breakingControl={breakingControl}
          viewControl={viewControl}
          title={seoData?.story_title_name}
        />
      )}
    </>
  );
}

export default Page;
