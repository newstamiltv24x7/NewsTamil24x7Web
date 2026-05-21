import { getRssListFeeds } from "@/commonComponents/WebApiFunction/ApiFunctions";
import RSS from "rss";

export default async function handler(req, res) {
  const { category } = req.query;
  const feed = new RSS({
    title: "News Tamil 24x7",
    description: "Description of your website",
    site_url: "https://newstamil.tv/",
    feed_url: "https://newstamil.tv/api/feed",
    language: "en",
  });

  let posts;
  try {
    posts = await getRssListFeeds(category);
  } catch (err) {
    console.error("getRssListFeeds error:", err);
    posts = null;
  }

  let items = [];
  if (posts) {
    if (Array.isArray(posts.payloadJson)) items = posts.payloadJson;
    else if (Array.isArray(posts)) items = posts;
  }

  items.forEach((post) => {
    feed.item({
      title: post.story_title_name,
      description: post.story_sub_title_name,
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${post.story_desk_created_name}`,
      guid: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${post.story_desk_created_name}`,
      date: post.updatedAt,
    });
  });

  res.setHeader("Content-Type", "application/xml");
  res.write(feed.xml({ indent: true }));
  res.end();
}