import { getRssListFeeds } from "@/commonComponents/WebApiFunction/ApiFunctions";
import RSS from "rss";

export default async function handler(req, res) {
  const { category } = req.query;
  const feed = new RSS({
    title: "News Tamil 24x7",
    description: "Description of your website",
    site_url: "https://www.newstamil.tv/",
    feed_url: "https://www.newstamil.tv/api/feed",
    language: "en",
  });

  // Fetch your posts or data dynamically
  const posts = await getRssListFeeds(category); // Replace with your data fetching logic

  posts.payloadJson.forEach((post) => {
    feed.item({
      title: post.story_title_name,
      description: post.story_sub_title_name,
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${post.story_desk_created_name}`, // URL to the post
      guid: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${post.story_desk_created_name}`, // Unique identifier
      date: post.updatedAt, // Publication date
    });
  });

  res.setHeader("Content-Type", "application/xml");
  res.write(feed.xml({ indent: true }));
  res.end();
}
