// pages/sitemap/[year]/[month].js

import { getSitemapList } from "@/commonComponents/WebApiFunction/ApiFunctions";

const formatToIST = (utcDate) => {
  const date = new Date(utcDate);
  const offsetIST = 5.5 * 60 * 60 * 1000; // +05:30 in milliseconds
  const istDate = new Date(date.getTime() + offsetIST);

  // Format the date to 'YYYY-MM-DDTHH:mm:ss+05:30'
  return istDate.toISOString().slice(0, 19) + "+05:30";
};

export async function getServerSideProps(context) {
  const { year, month } = context.params; // Access dynamic route parameters
  const inputData = `${year}/${month}`;

  // Fetch data from your API based on year and month
  const res = await getSitemapList(inputData);
  const result = res.payloadJson; // Ensure this returns an array of objects with url and lastModified properties

  // Create the sitemap XML
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    `;

  // Check if result is valid
  if (Array.isArray(result) && result.length > 0) {
    sitemap += result
      .map(
        (slug) => `
            <url>
                <loc>${slug?.url}</loc>
                <lastmod>${formatToIST(slug.updatedAt)}</lastmod>
                <changefreq>hourly</changefreq>
                <priority>0.8</priority>
            </url>
        `
      )
      .join("");
  }

  sitemap += `
    </urlset>
    `;

  // Set the response headers to indicate XML content
  context.res.setHeader("Content-Type", "application/xml");
  context.res.setHeader("Cache-Control", "public, max-age=60"); // Adjust caching as needed

  // Send the XML response
  context.res.write(sitemap);
  context.res.end();

  // Return an empty object as props since we're not rendering a component
  return {
    props: {},
  };
}

// Default export to prevent Next.js errors
const Sitemap = () => null;

export default Sitemap;
