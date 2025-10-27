import axios from "axios";
import { decode } from "html-entities";
import RSS from "rss";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const redirectUrl = "https://www.newstamil.tv";

function formatCustomDate(date) {
  const d = new Date(date);
  const pad = (num) => num.toString().padStart(2, "0");

  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}



export async function getServerSideProps({ params, res }) {
  const { rss } = params;
  
const fisrtValue = rss?.[0]; 
const secondValue = rss?.[1]; 




  const currentDate = new Date();

  const feed = new RSS({
    title: "News Tamil",
    description: "Latest News from Tamil Nadu",
    site_url: redirectUrl,
    feed_url: `${redirectUrl}/rss-feed.xml`,
    image_url:
      "https://www.newstamil.tv/_next/static/media/main-logo.ae4ceeb6.png",
    copyright: `© ${currentDate.getFullYear()} News Tamil`,
    language: "en-US",
    pubDate: formatCustomDate(currentDate),
    ttl: 60,
    custom_namespaces: {
      media: "http://search.yahoo.com/mrss/",
      atom: "http://www.w3.org/2005/Atom",
      dc: "http://purl.org/dc/elements/1.1/",
      content: "http://purl.org/rss/1.0/modules/content/",
    },
    custom_elements: [
      {
        "atom:link": {
          _attr: {
            href: `${redirectUrl}/rss-feed.xml`,
            rel: "self",
            type: "application/rss+xml",
          },
        },
      },
      {
        image: [
          {
            url: "https://www.newstamil.tv/_next/static/media/main-logo.ae4ceeb6.png",
          },
          { title: "News Tamil" },
          { link: redirectUrl },
          { description: "Feed provided by News Tamil" },
        ],
      },
    ],
  });

  try {    
    const response = await axios.get(
      (secondValue) ?
        `${baseURL}/api/v1/web/rss_xml/list?sub=${secondValue}` : 
        `${baseURL}/api/v1/web/rss_xml/list?url=${fisrtValue}`
      
      
    );
    const items = response.data?.payloadJson;

    if (items && items.length > 0) {
      items.forEach((list) => {
        const imageUrl = list?.story_cover_image_url || "";
        const articleUrl = `${redirectUrl}/article/${list?.story_desk_created_name}`;
        const title = list?.story_title_name || "No Title";
        const author = list?.author || "News Tamil";
        const categories = [
          list?.c_category_name || "General",
          "Latest",
          "lift",
          "mirror",
        ];
        const createdDate = formatCustomDate(list?.createdAt);
        const decodedDescription = decode(list?.story_details || "");

        const articleContent = `
            <div>
              <img width="820" height="450" src="${imageUrl}" class="attachment-full size-full" alt="newstamil" style="margin-bottom: 15px;" decoding="async" loading="lazy"/>
            </div>
            <p>${decodedDescription}</p>
            <p>The post <a href="${articleUrl}">${title}</a> appeared first on <a href="${redirectUrl}">${redirectUrl}</a>.</p>
        `.trim();

        feed.item({
          title,
          description: articleContent,
          url: articleUrl,
          guid: `${articleUrl}#${list?.createdAt}`,
          author,
          date: list?.createdAt,
          pubDate: createdDate,
          category: categories,
          custom_elements: [
            { "content:encoded": { _cdata: articleContent } },
            {
              "media:content": {
                _attr: {
                  url: imageUrl,
                  medium: "image",
                  type: "image/jpeg",
                },
              },
            },
            {
              "atom:link": {
                _attr: {
                  href: articleUrl,
                  rel: "alternate",
                  type: "text/html",
                },
              },
            },
          ],
        });
      });
    } else {
      console.error("No items available for RSS feed.");
    }
  } catch (error) {
    console.error("Error fetching RSS data:", error);
    // res.statusCode = 500;
    // res.end();
    // return { props: {} };
    return {
      redirect: {
        destination: "/404", // Redirects to the 404 page on error
        permanent: false,
      },
    };


  }

  const feedXml = feed.xml({ indent: true });

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.write(feedXml);
  res.end();
  return { props: {} };
}

export default function RSSPage() {
  return null;
}
