import {
  getBreakingNews,
  getControls,
  getHomeMenuApi,
  getRssList,
  getRssLists,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import RssPageContainer from "@/components/Rss/RssPageContainer";
import HomepageLayout from "@/layouts/HomepageLayout";
import MobilepageLayout from "@/layouts/MobilepageLayout";
import { CryptoFetcher } from "@/utils/libs";
import { Box } from "@mui/material";

export async function getServerSideProps(context) {
  const UA = context.req.headers["user-agent"];
  const isMobile = Boolean(
    UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );
  try {
    const res = await getHomeMenuApi();
    const decrypted = CryptoFetcher(res?.payloadJson);
    const results = await getBreakingNews();
    // const breakingData = CryptoFetcher(results?.payloadJson);
    const breakingData = results?.payloadJson;
    const rssList = await getRssLists();

    const control = await getControls();
    const controlData = CryptoFetcher(control?.payloadJson);
    const quickControl = controlData?.at(1)?.c_control_type?.toLowerCase();
    const breakingControl = controlData?.at(0)?.c_control_type?.toLowerCase();

    return {
      props: {
        breakingData: breakingData?.length > 0 ? breakingData : [],
        menuData: decrypted?.length > 0 ? decrypted : [],
        rssData: rssList?.payloadJson?.length > 0 ? rssList?.payloadJson : [],
        breakingControl: breakingControl,
        quickControl: quickControl,
        deviceType: isMobile ? "mobile" : "desktop",
      },
    };
  } catch (err) {
    return {
      props: {
        breakingData: [],
        menuData: [],
        rssData: [],
        quickControl: "no",
        breakingControl: "no",
        deviceType: "desktop",
      },
    };
  }
}

function rss({
  breakingData,
  menuData,
  rssData,
  quickControl,
  breakingControl,
  deviceType,
}) {
  return (
    <>
      {deviceType === "mobile" ? (
        <MobilepageLayout menuData={menuData} type={deviceType} breakingControl={breakingControl} quickControl={quickControl}>
          <Box maxWidth={1440} px={2} m={"auto"}>
            <RssPageContainer rssData={rssData} />
          </Box>
        </MobilepageLayout>
      ) : (
        <HomepageLayout
          breakingData={breakingData}
          menuData={menuData}
          quickControl={quickControl}
          breakingControl={breakingControl}
        >
          <Box maxWidth={1440} px={2} m={"auto"}>
            <RssPageContainer rssData={rssData} />
          </Box>
        </HomepageLayout>
      )}
    </>
  );
}

export default rss;
