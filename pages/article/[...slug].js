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
import ArticlePageContainer from "@/components/Article/ArticlePageContainer";

const SITE_ORIGIN = "https://newstamil.tv";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
/**
 * Normalise a URL to the canonical form accepted by Google News:
 *   - https://newstamil.tv  (no www, no trailing slash, no query/hash)
 */
const buildCanonical = (raw, pathnameFallback) => {
  const base = raw || `${SITE_ORIGIN}${pathnameFallback}`;
  try {
    const u = new URL(base);
    u.hostname = u.hostname.replace(/^www\./, "");
    u.protocol = "https:";
    u.search = "";
    u.hash = "";
    const str = u.toString();
    // Remove trailing slash unless it is the bare root
    return str.length > SITE_ORIGIN.length + 1 ? str.replace(/\/$/, "") : str;
  } catch {
    return base;
  }
};

// MobileArticlePage is client-only (uses browser APIs at module level)
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

  // Allow CDN/edge caches to serve the page for 5 min and revalidate in the
  // background for up to 10 min — dramatically reduces origin TTFB for
  // returning visitors and crawlers without sacrificing content freshness.
  response.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=600"
  );

  try {
    const [
      menuRes,
      trendingResponse,
      controlRes,
      seoRes,
      slugRes,
      youtubeRes,
      breakingRes,
    ] = await Promise.all([
      getHomeMenuApi(),
      getHomeLatest({
        n_page: 1,
        n_limit: 10,
        trending_news: 1
      }),
      getControls(),
      getNewsSeo(slugify),
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
    const decryptedVideos = CryptoFetcher(youtubeRes?.payloadJson)?.at(0)?.data;
    const breakingData = breakingRes?.payloadJson;

    return {
      props: {
        menuData: decrypted?.length > 0 ? decrypted : [],
        trendingData: decryptedTrend?.docs ?? [],
        newsData: decryptedTrend?.docs ?? [],
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

  const navigate = useRouter();
  const pathname = usePathname();

  // Build a clean, normalised canonical once — used in both Head and JSON-LD
  const canonicalUrl = buildCanonical(seoData?.redirect_url, pathname);

  const jsonArticleLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": canonicalUrl,
    headline: `${seoData?.story_title_name}`,
    description: seoData?.story_sub_title_name || undefined,
    image: {
      "@type": "ImageObject",
      url: `${seoData?.story_cover_image_url}`,
      width: 1200,
      height: 675
    },
    inLanguage: "ta",
    author: {
      "@type": "Person",
      name: singleNews?.at(0)?.c_createdName || "NT WEB",
      url: `${process.env.NEXT_PUBLIC_WEB_URL || "https://newstamil.tv"}/author/${singleNews?.at(0)?.c_slugName || "newstamil-web"}`,
      jobTitle: singleNews?.at(0)?.role || singleNews?.at(0)?.author_role || singleNews?.at(0)?.c_role || undefined,
      description: singleNews?.at(0)?.c_about_user || seoData?.author_bio || undefined,
    },  
    publisher: {
      "@type": "Organization",
      name: "News Tamil 24x7",
      logo: {
        "@type": "ImageObject",
        url: "https://newstamil.tv/main-logo.png"
      }
    },
    datePublished: seoData?.createdAt
      ? new Date(seoData.createdAt).toISOString()
      : seoData?.createdAt,
    dateModified: seoData?.updatedAt
      ? new Date(seoData.updatedAt).toISOString()
      : seoData?.updatedAt,
    url: canonicalUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  }

  // articleSection and structured keywords (prefer article data, fall back to seo tags)
  const articleSection =
    singleNews?.at(0)?.c_category ||
    singleNews?.at(0)?.c_category_name ||
    seoData?.story_category ||
    seoData?.category ||
    seoData?.section ||
    "Politics";

  const keywordsArray = seoData?.seo_tag
    ? String(seoData.seo_tag)
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    : [];

  // add accessibility, speakable and structured keywords
  if (articleSection) jsonArticleLd.articleSection = articleSection;
  jsonArticleLd.isAccessibleForFree = true;
  jsonArticleLd.speakable = {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".articleBody"],
  };
  if (keywordsArray.length > 0) jsonArticleLd.keywords = keywordsArray;

  const stripHtml = (html) =>
    html ? String(html).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";

  // include a plain-text articleBody stripped of any HTML for schema
  jsonArticleLd.articleBody = stripHtml(seoData?.story_details);

  const jsonBreadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://newstamil.tv",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: singleNews?.at(0)?.story_desk_created_name?.split("/")?.[0] || seoData?.story_category || "News",
        item: `https://newstamil.tv/news/${singleNews?.at(0)?.story_desk_created_name?.split("/")?.[0] || ""}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${seoData?.story_title_name}`,
        item: canonicalUrl,
      },
    ],
  };

  // keep a simple ImageObject for the cover image to avoid duplicating Article schema
  const jsonImageLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: `${seoData?.story_cover_image_url}`,
    url: `${seoData?.story_cover_image_url}`,
    width: "1200",
    height: "675",
    caption: `${seoData?.story_title_name}`,
  };

    const mergedJsonLd = {
      "@context": "https://schema.org",
      "@graph": [jsonArticleLd, jsonBreadcrumbLd, jsonImageLd].map((obj) => {
        const copy = { ...obj };
        delete copy["@context"];
        return copy;
      }),
    };

  // Add VideoObject schema when article has a YouTube embed
  const articleEmbedBase = (singleNews?.at(0)?.youtube_embed_id || "").split("?")[0];
  if (articleEmbedBase) {
  const videoId = articleEmbedBase.split("/").pop();

  mergedJsonLd["@graph"].push({
    "@type": "VideoObject",
    name: seoData?.story_title_name || "",
    description: seoData?.story_sub_title_name || "",
    thumbnailUrl:
      seoData?.story_cover_image_url ||
      `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    uploadDate: seoData?.createdAt
      ? new Date(seoData.createdAt).toISOString()
      : undefined,
  });
}

  // Redirect to 404 when article data is missing
  useEffect(() => {
    if (Array.isArray(seoData) && seoData.length === 0 && Array.isArray(singleNews) && singleNews.length === 0) {
      navigate.replace("/404");
    }
  }, [seoData, singleNews]);




  return (
    <>
      <Head>
        <meta charSet="utf-8" />

        <title>{seoData?.story_title_name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="article:publisher" content="https://newstamil.tv" />
        <meta property="og:site_name" content="news Tamil 24x7" />
        <meta name="description" content={seoData?.story_sub_title_name} />
        <meta name="keywords" content={seoData?.seo_tag} />
        <meta property="og:locale" content="ta_IN" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seoData?.story_title_name} />
        <meta
          property="og:description"
          content={seoData?.story_sub_title_name}
        />
        <meta property="og:image" content={seoData?.story_cover_image_url} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta name="twitter:creator" content="@newstamil" />
        <meta name="twitter:site" content="@newstamil" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData?.story_title_name} />
        <meta
          name="twitter:description"
          content={seoData?.story_sub_title_name}
        />
        <meta name="twitter:image" content={seoData?.story_cover_image_url} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hreflang="x-default" href={canonicalUrl} />
        <link rel="alternate" hreflang="ta" href={canonicalUrl} />
        <link rel="alternate" hreflang="ta-IN" href={canonicalUrl} />
        {/* Preload the hero image so the browser fetches it as early as possible
            — critical for LCP on both mobile and desktop */}
        {seoData?.story_cover_image_url && (
          <link
            rel="preload"
            as="image"
            href={seoData.story_cover_image_url}
            // @ts-ignore — fetchpriority is valid but not yet in all TS defs
            fetchpriority="high"
          />
        )}
        <link rel="icon" href="/favicon.ico" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(mergedJsonLd) }}
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
