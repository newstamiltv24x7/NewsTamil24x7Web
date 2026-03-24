export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/',
      permanent: true,
    },
  };
}

export default function NewsRedirect() {
  return null;
}

  const pathname = usePathname(); 

  const jsonArticleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${seoResponse?.story_title_name}`,
    image: `${seoResponse?.story_cover_image_url}`,  
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
    datePublished: `${seoResponse?.createdAt}`,
    dateModified: `${seoResponse?.updatedAt}`,
  }

  const jsonBreadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: `${seoResponse?.story_sub_title_name}`,
        item: `${seoResponse?.redirect_url}`,
      },
    ],
  };

  const jsonImageLd = {
    headline: `${seoResponse?.story_title_name}`,
    image: {
      "@type": "ImageObject",
      url: `${seoResponse?.story_cover_image_url}`,
      width: "1200",
      height: "675",
    },
    url: `${seoResponse?.redirect_url}`,
    datePublished: `${seoResponse?.createdAt}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${seoResponse?.redirect_url}`,
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
    keywords: `${seoResponse?.seo_keywords}`,
    thumbnailUrl: `${seoResponse?.story_cover_image_url}`,
    articleBody: `${seoResponse?.story_details}`,
    dateCreated: `${seoResponse?.createdAt}`,
    dateModified: `${seoResponse?.updatedAt}`,
    name: `${seoResponse?.story_sub_title_name}`,
    isPartOf: {
      "@type": "WebPage",
      url: `${seoResponse?.redirect_url}`,
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${seoResponse?.story_cover_image_url}`,
        width: "1200",
        height: "675",
      },
    },
    articleSection: `${seoResponse?.story_subject_name}`,
    "@type": "Article",
    "@context": "https://schema.org",
  };
  return (
    <>
      <Head>
        <title>{seoResponse?.c_seo_page_title}</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${pathname}`} />
        <meta
          name="description"
          content={seoResponse?.c_seo_page_description}
        />
        <meta name="keywords" content={seoResponse?.c_seo_page_keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <MobileView
          menuData={menuData}
          orderedMenu={orderedMenu}
          photosData={photosData}
          webstoriesData={webstoriesData}
          viewControl={viewControl}
          breakingControl={breakingControl}
          quickControl={quickControl}
        />
      ) : (
        <HomepageMainSection
          menuData={menuData}
          photosData={photosData}
          webstoriesData={webstoriesData}
          orderedMenu={orderedMenu}
          breakingData={breakingData}
          quickControl={quickControl}
          breakingControl={breakingControl}
          viewControl={viewControl}
        />
      )}
    </>
  );
