import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const SITE_URL = "https://newstamil.tv";

const escapeXml = (str) =>
  str
    ? String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;")
    : "";

/**
 * Normalize URL:
 * - Remove www
 * - Force https
 * - Remove query params/hash
 * - Remove trailing slash
 */
const normaliseUrl = (raw) => {
  try {
    const u = new URL(raw);

    u.hostname = u.hostname.replace(/^www\./, "");
    u.protocol = "https:";
    u.search = "";
    u.hash = "";

    return u.toString().replace(/\/$/, "") || SITE_URL;
  } catch {
    return raw || SITE_URL;
  }
};

/**
 * Extract YouTube video ID from:
 * - Full watch URL
 * - Embed URL
 * - youtu.be URL
 * - Direct video ID
 */
const extractVideoId = (input) => {
  if (!input) return null;

  const value = String(input).trim();

  // Direct YouTube ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) {
    return value;
  }

  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = value.match(pattern);

    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
};

export async function getServerSideProps({ res }) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/web/sitemap/news`
    );

    const articles = Array.isArray(response?.data?.payloadJson)
      ? response.data.payloadJson
      : [];

    // Google News accepts only last 48 hours
    const cutoff = new Date(
      Date.now() - 48 * 60 * 60 * 1000
    );

    const recentArticles = articles.filter((article) => {
      const published = article?.createdAt
        ? new Date(article.createdAt)
        : null;

      return published && published >= cutoff;
    });

    const urlEntries = recentArticles
      .map((article) => {
        const rawUrl =
          article.url ||
          `${SITE_URL}/article/${article.story_desk_created_name}`;

        const url = normaliseUrl(rawUrl);

        const publishedISO = article.createdAt
          ? new Date(article.createdAt).toISOString()
          : new Date().toISOString();

        const title = escapeXml(
          article.story_title_name || ""
        );

        /**
         * Detect YouTube video
         */
        const candidateSources = [
          article.youtube_embed_id,
          article.video_url,
          article.video_id,
          article.videoId,
          article.embed,
          article.story_video_url,
          article.story_html,
          article.body,
        ];

        let videoId = null;

        for (const source of candidateSources) {
          videoId = extractVideoId(source);

          if (videoId) {
            break;
          }
        }

        let videoBlock = "";

        if (videoId) {
          const thumbnailUrl =
            article.story_img_name ||
            article.story_image ||
            article.image ||
            article.thumbnail ||
            `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

          const description =
            article.meta_description ||
            article.story_description ||
            article.story_dek ||
            article.story_subtitle ||
            article.summary ||
            article.story_title_name ||
            "";

          videoBlock = `
    <video:video>
      <video:thumbnail_loc>${escapeXml(
        thumbnailUrl
      )}</video:thumbnail_loc>
      <video:title>${title}</video:title>
      <video:description>${escapeXml(
        description
      )}</video:description>
      <video:player_loc allow_embed="yes">
        https://www.youtube.com/embed/${videoId}
      </video:player_loc>
      <video:publication_date>${publishedISO}</video:publication_date>
    </video:video>`;
        }

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
    </news:news>${videoBlock}
  </url>`;
      })
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urlEntries}
</urlset>`;

    res.setHeader(
      "Content-Type",
      "application/xml; charset=utf-8"
    );

    res.setHeader(
      "Cache-Control",
      "public, max-age=1800, stale-while-revalidate=3600"
    );

    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error("News sitemap generation error:", error);

    res.statusCode = 500;
    res.setHeader(
      "Content-Type",
      "application/xml; charset=utf-8"
    );

    res.write(`<?xml version="1.0" encoding="UTF-8"?>
<error>
  <message>Failed to generate sitemap</message>
</error>`);

    res.end();

    return {
      props: {},
    };
  }
}

export default function NewsSitemap() {
  return null;
}
