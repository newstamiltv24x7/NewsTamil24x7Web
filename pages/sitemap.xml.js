// /pages/sitemap.xml.js
import { getSitemapList } from "@/commonComponents/WebApiFunction/ApiFunctions";

const formatToIST = (utcDate) => {
  const date = new Date(utcDate);
  const offsetIST = 5.5 * 60 * 60 * 1000; // +05:30 in milliseconds
  const istDate = new Date(date.getTime() + offsetIST);

  // Format the date to 'YYYY-MM-DDTHH:mm:ss+05:30'
  return istDate.toISOString().slice(0, 19) + "+05:30";
};

export async function getServerSideProps({ res }) {
  try {
    const response = await getSitemapList(); // Fetch the sitemap list
    const sitemapList = response.payloadJson; // Extract the array of sitemap data

    // Check if sitemapList is an array
    if (!Array.isArray(sitemapList)) {
      res.setHeader("Content-Type", "application/xml");
      return res.status(500).send("Error: sitemapList is not an array");
    }

    // Map over the sitemap list to create sitemap entries
    const sitemapEntries = sitemapList
      .map(
        (sitemap) => `
      <sitemap>
        <loc><![CDATA[ ${sitemap.monthData} ]]></loc>
        <lastmod><![CDATA[ ${formatToIST(sitemap.updatedAt)} ]]></lastmod>
      </sitemap>
    `
      )
      .join("");

    const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapEntries}
</sitemapindex>`;

    // Set the content type to XML
    res.setHeader("Content-Type", "application/xml");
    res.write(sitemapIndexContent);
    res.end();

    return { props: {} }; // Returning empty props since we are handling the response directly
  } catch (error) {
    console.error("Error generating sitemap index:", error);
    res.status(500).send("Error: Failed to generate sitemap");
    return { props: {} }; // Return empty props on error
  }
}

export default function Sitemap() {
  // This component is not used, but it is necessary to export a default function
  return null; // No need to render anything
}
