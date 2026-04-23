import {
  getBreakingNews,
  getControls,
  getHomeMenuApi,
} from "@/commonComponents/WebApiFunction/ApiFunctions";
import MobilepageLayout from "@/layouts/MobilepageLayout";
import { CryptoFetcher } from "@/utils/libs";
import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import { usePathname } from "next/navigation";
import React from "react";

const HomepageLayout = dynamic(() => import("@/layouts/HomepageLayout"));

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
    const breakingData = results?.payloadJson;

    const control = await getControls();
    const controlData = CryptoFetcher(control?.payloadJson);
    const quickControl = controlData?.at(1)?.c_control_type?.toLowerCase();
    const breakingControl = controlData?.at(0)?.c_control_type?.toLowerCase();

    return {
      props: {
        menuData: decrypted?.length > 0 ? decrypted : [],
        breakingData: breakingData?.length > 0 ? breakingData : [],
        breakingControl: breakingControl,
        quickControl: quickControl,
        deviceType: isMobile ? "mobile" : "desktop",
      },
    };
  } catch (err) {
    return {
      props: {
        menuData: [],
        breakingData: [],
        quickControl: "no",
        breakingControl: "no",
        deviceType: "desktop",
      },
    };
  }
}

const content = (
  <Box px={2} m="5%" sx={{ paddingTop: { xs: "90px", sm: 0 } }}>
    <Typography
      color="#fb6002"
      fontFamily="var(--anek-font)"
      fontWeight={600}
      fontSize={24}
      mb={1}
    >
      CONTACT US
    </Typography>

    <Typography fontSize={30} fontWeight={700} textAlign="center" my={3}>
      Get In Touch
    </Typography>

    <p
      style={{
        margin: "0 0 1rem",
        fontFamily: "var(--noto-sans)",
        color: "#000",
        lineHeight: "38px",
        fontSize: 20,
        textAlign: "justify",
      }}
    >
      We value your feedback, queries, and suggestions. Whether you are a
      reader, advertiser, or media professional, our team is available to assist
      you. Please reach out to us through any of the channels listed below.
    </p>

    <Typography
      color="#fb6002"
      fontFamily="var(--anek-font)"
      fontWeight={600}
      fontSize={20}
      mt={3}
      mb={1}
    >
      Editorial Office
    </Typography>
    <p
      style={{
        fontFamily: "var(--noto-sans)",
        color: "#000",
        lineHeight: "34px",
        fontSize: 18,
      }}
    >
      <strong>SPLUS MEDIA LIMITED</strong>
      <br />
      Chennai, Tamil Nadu, India.
      <br />
      <strong>Email:</strong>{" "}
      <a href="mailto:news@newstamil.tv" style={{ color: "#fb6002" }}>
        news@newstamil.tv
      </a>
      <br />
      <strong>Website:</strong>{" "}
      <a href="https://newstamil.tv" style={{ color: "#fb6002" }}>
        www.newstamil.tv
      </a>
      <br />
      <strong>Phone:</strong>{" "}
      <a href="tel:+914442423737" style={{ color: "#fb6002" }}>
        044 42423737
      </a>
      {/* {" "}/ {" "}
      <a href="tel:+917305080222" style={{ color: "#fb6002" }}>
        +91 7305080222
      </a> */}
    </p>

    <Typography
      color="#fb6002"
      fontFamily="var(--anek-font)"
      fontWeight={600}
      fontSize={20}
      mt={3}
      mb={1}
    >
      For Advertisements
    </Typography>
    <p
      style={{
        fontFamily: "var(--noto-sans)",
        color: "#000",
        lineHeight: "34px",
        fontSize: 18,
      }}
    >
      For advertising inquiries and partnership opportunities, please contact our
      marketing team at{" "}
      <a href="mailto:ads@newstamil.tv" style={{ color: "#fb6002" }}>
        ads@newstamil.tv
      </a>
      .
    </p>

    <Typography
      color="#fb6002"
      fontFamily="var(--anek-font)"
      fontWeight={600}
      fontSize={20}
      mt={3}
      mb={1}
    >
      For Grievances
    </Typography>
    <p
      style={{
        fontFamily: "var(--noto-sans)",
        color: "#000",
        lineHeight: "34px",
        fontSize: 18,
      }}
    >
      If you have complaints or concerns regarding our editorial content, please
      refer to our{" "}
      <a href="/grievance-officer" style={{ color: "#fb6002" }}>
        Grievance Officer
      </a>{" "}
      page for the designated point of contact.
    </p>

    <Typography
      color="#fb6002"
      fontFamily="var(--anek-font)"
      fontWeight={600}
      fontSize={20}
      mt={3}
      mb={1}
    >
      Follow Us
    </Typography>
    <p
      style={{
        fontFamily: "var(--noto-sans)",
        color: "#000",
        lineHeight: "34px",
        fontSize: 18,
      }}
    >
      Stay connected with News Tamil 24x7 on social media for the latest updates
      and breaking news.
      <br />
      <strong><a href="https://www.youtube.com/@NewsTamil24X7TV">YouTube</a></strong> · <strong><a href="https://www.facebook.com/newstamiltv24x7">Facebook</a></strong> ·{" "}
      <strong><a href="https://www.instagram.com/newstamil24x7digital">Instagram</a></strong> · <strong><a href="https://x.com/newstamiltv24x7">Twitter / X</a></strong>
    </p>
  </Box>
);

function page({
  menuData,
  breakingData,
  quickControl,
  breakingControl,
  deviceType,
}) {
  const pathname = usePathname();
  return (
    <div>
      <Head>
        <title>Contact Us | News Tamil 24x7</title>
        <meta
          name="description"
          content="Get in touch with News Tamil 24x7. Contact our editorial team, advertising department, or grievance officer."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_WEB_URL}${pathname}`}
        />
      </Head>
      {deviceType === "mobile" ? (
        <MobilepageLayout
          menuData={menuData}
          type={deviceType}
          breakingControl={breakingControl}
          quickControl={quickControl}
        >
          {content}
        </MobilepageLayout>
      ) : (
        <HomepageLayout
          menuData={menuData}
          breakingData={breakingData}
          quickControl={quickControl}
          breakingControl={breakingControl}
        >
          {content}
        </HomepageLayout>
      )}
    </div>
  );
}

export default page;
