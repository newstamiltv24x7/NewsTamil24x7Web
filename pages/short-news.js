import NewsPresso from "@/components/NewsPresso";
import dynamic from "next/dynamic";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router"; // Correct import for useRouter
import React, { useEffect } from "react";

const FlipBookVertical = dynamic(() => import("@/components/Flipbook"), {
  ssr: false,
});

export async function getServerSideProps(context) {
  try {
    const UA = context.req.headers["user-agent"];
    const isMobile = Boolean(
      UA.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
    return {
      props: {
        deviceType: isMobile ? "mobile" : "desktop",
      },
    };
  } catch (err) {
    return {
      props: {
        deviceType: "mobile",
      },
    };
  }
}

function Page({ deviceType }) {
  const router = useRouter();
  const pathname = usePathname(); 

  useEffect(() => {
    // if (deviceType === "desktop") {
    //   router.push("/"); // Redirect to home if desktop
    // }
  }, [deviceType, router]);

  return (
    <>
      <Head>
        <title>News Tamil 24x7 | News</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${pathname}`} />
      </Head>
      {deviceType === "mobile" ? <FlipBookVertical /> : <NewsPresso />}
    </>
  );
}

export default Page;
