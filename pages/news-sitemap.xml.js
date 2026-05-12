/**
 * Google News Sitemap — /news-sitemap.xml
 *
 * Google News requires a dedicated News sitemap with <news:news> elements.
 * Articles must be published within the last 48 hours to qualify for inclusion.
 * Ref: https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap
 */

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const SITE_URL = "https://www.newstamil.tv";

const escapeXml = (str) =>
  str
    ? String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;")
    : "";

export async function getServerSideProps({ res }) {
  try {
    // Fetch the most recent articles — last 48 hours is the Google News window
    const response = await axios.get(
      `${BASE_URL}/api/v1/web/sitemap/list?limit=1000`
    );

    const articles = Array.isArray(response?.data?.payloadJson)
      ? response.data.payloadJson
      : [];

    // Filter to articles published within 48 hours
    const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const recentArticles = articles.filter((a) => {
      const published = a.createdAt ? new Date(a.createdAt) : null;
      return published && published >= cutoff;
    });

    const urlEntries = recentArticles
      .map((article) => {
        const url = article.url || `${SITE_URL}/article/${article.story_desk_created_name}`;
        const publishedISO = article.createdAt
          ? new Date(article.createdAt).toISOString()
          : new Date().toISOString();
        const title = escapeXml(article.story_title_name || "");
        return `
  <url>
    <loc>${escapeXml(url)}</loc>
    <news:news>
      <news:publication>
        <news:name>News Tamil 24x7</news:name>
        <news:language>ta</news:language>
      </news:publication>
      <news:publication_date>${publishedISO}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>
  </url>`;
      })
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urlEntries}
</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=1800, stale-while-revalidate=3600");
    res.write(sitemap);
    res.end();
    return { props: {} };
  } catch (error) {
    console.error("Error generating Google News sitemap:", error);
    res.status(500).end("Error generating sitemap");
    return { props: {} };
  }
}

export default function NewsSitemap() {
  return null;
}
