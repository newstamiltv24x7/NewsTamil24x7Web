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
import { BiSolidAnalyse } from "react-icons/bi";
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
    // const breakingData = CryptoFetcher(results?.payloadJson);
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

const subcriberContent = [
  {
    id: 1,
    text: (
      <p
        style={{
          fontWeight: 600,
          fontFamily: "var(--anek-font)",
          wordSpacing: 2,
          fontSize: 18,
        }}
      >
        <BiSolidAnalyse
          color="#fb6002"
          style={{ position: "relative", top: 3, marginRight: 12 }}
        />
        Subscriber shall use the NEWS TAMIL 24X7 Sites for lawful purposes only.
      </p>
    ),
  },
  {
    id: 2,
    text: (
      <p
        style={{
          fontWeight: 600,
          fontFamily: "var(--anek-font)",
          wordSpacing: 2,
          fontSize: 18,
        }}
      >
        <BiSolidAnalyse
          color="#fb6002"
          style={{ position: "relative", top: 3, marginRight: 12 }}
        />
        Subscriber shall not post or transmit through the NEWS TAMIL 24X7 Sites
        any material which violates or infringes in any way upon the rights of
        others, which is unlawful, threatening, abusive, defamatory, invasive of
        privacy or publicity rights, vulgar, obscene, profane or otherwise
        objectionable, which encourages conduct that would constitute a criminal
        offence, give rise to civil liability or otherwise violate any law, or
        which, without the Company's express prior approval, contains
        advertising or any solicitation with respect to products or services.
        Any conduct by a Subscriber that in the Company's discretion restricts
        or inhibits any other Subscriber from using or enjoying NEWS TAMIL 24X7
        Sites will not be permitted .
      </p>
    ),
  },
  {
    id: 3,
    text: (
      <p
        style={{
          fontWeight: 600,
          fontFamily: "var(--anek-font)",
          wordSpacing: 2,
          fontSize: 18,
        }}
      >
        <BiSolidAnalyse
          color="#fb6002"
          style={{ position: "relative", top: 3, marginRight: 12 }}
        />
        Subscriber shall not use NEWS TAMIL 24X7 Sites to advertise or perform
        any commercial solicitation, including, but not limited to, the
        solicitation of users to become subscribers of other on-line information
        services competitive with the NEWS TAMIL 24X7 Sites. NEWS TAMIL 24X7
        Sites contain copyrighted material, trademarks and other proprietary
        information, including, but not limited to, text, software, photos,
        video, graphics, music or sound, and the entire contents of NEWS TAMIL
        24X7 Sites are copyrighted as a collective or severable work under
        applicable copyright laws. The Company and/or its affiliates own or have
        acquired a copyright in the selection, coordination, arrangement and
        enhancement of such content, as well as in the content original to it.
      </p>
    ),
  },
  {
    id: 4,
    text: (
      <p
        style={{
          fontWeight: 600,
          fontFamily: "var(--anek-font)",
          wordSpacing: 2,
          fontSize: 18,
        }}
      >
        <BiSolidAnalyse
          color="#fb6002"
          style={{ position: "relative", top: 3, marginRight: 12 }}
        />
        Subscriber may not modify, publish, transmit, participate in the
        transfer or sale, create derivative works, or in any way exploit, any of
        the content, in whole or in part. Subscriber may download copyrighted
        material for Subscriber's personal use only. Subscriber shall be solely
        liable for any damage resulting from any infringement of copyrights,
        proprietary rights, or any other harm resulting from such a submission.
        By submitting material to any public area of NEWS TAMIL 24X7 Sites,
        Subscriber automatically grants, or warrants that the owner of such
        material has expressly granted the Company the royalty fee, perpetual,
        irrevocable, non-exclusive right and license to use, reproduce, modify,
        adapt, publish, translate and distribute such material (in whole or in
        part) worldwide and/or to incorporate it in other works in any form,
        media or technology now known or hereafter developed for the full term
        of any copyright that may exist in such material.
      </p>
    ),
  },
  {
    id: 5,
    text: (
      <p
        style={{
          fontWeight: 600,
          fontFamily: "var(--anek-font)",
          wordSpacing: 2,
          fontSize: 18,
        }}
      >
        <BiSolidAnalyse
          color="#fb6002"
          style={{ position: "relative", top: 3, marginRight: 12 }}
        />
        Subscriber also permits any other Subscriber to access, view, store or
        reproduce the material for that Subscriber's personal use. Subscriber
        hereby grants the Company the right to edit, copy, publish and
        distribute any material made available on NEWS TAMIL 24X7 Sites by
        subscriber The foregoing provisions are for the benefit of the Company,
        its subsidiaries, affiliates and its third party content providers and
        licensors and each shall have the right to assert and enforce such
        provisions directly or on its own behalf .
      </p>
    ),
  },
];

const limitations = [
  {
    id: 1,
    text: (
      <p
        style={{
          fontWeight: 600,
          fontFamily: "var(--anek-font)",
          wordSpacing: 2,
          fontSize: 18,
        }}
      >
        <BiSolidAnalyse
          color="#fb6002"
          style={{ position: "relative", top: 3, marginRight: 12 }}
        />
        You expressly agree that use of the website is at your sole risk. The
        contents, information, software, products, features and services
        published on this website may include inaccuracies or typographical
        errors. Changes are periodically added to the contents herein. The
        Company, NEWS TAMIL 24X7 sites and/or its respective content providers
        may make improvements and/or changes in this web site at any time this
        web site may be temporarily unavailable from time to time due to
        required maintenance, telecommunications interruptions, or other
        disruptions.
      </p>
    ),
  },
  {
    id: 2,
    text: (
      <p
        style={{
          fontWeight: 600,
          fontFamily: "var(--anek-font)",
          wordSpacing: 2,
          fontSize: 18,
        }}
      >
        <BiSolidAnalyse
          color="#fb6002"
          style={{ position: "relative", top: 3, marginRight: 12 }}
        />
        NEWS TAMIL 24X7 (and its owners, suppliers, consultants, advertisers,
        affiliates, partners, employees or any other associated entities, all
        collectively referred to as associated entities) shall not be liable to
        user or member or any third party, www.newstamil.tv exercise its right
        to modify or discontinue any or all of the contents, information,
        software, products, features and services published on this website.
      </p>
    ),
  },
  {
    id: 3,
    text: (
      <p
        style={{
          fontWeight: 600,
          fontFamily: "var(--anek-font)",
          wordSpacing: 2,
          fontSize: 18,
        }}
      >
        <BiSolidAnalyse
          color="#fb6002"
          style={{ position: "relative", top: 3, marginRight: 12 }}
        />
        In no event shall NEWS TAMIL 24X7 and/or its associated entities be
        liable for any direct, indirect, punitive, incidental, special or
        consequential damages arising out of or in any way connected with the
        use of this web site or with the delay or inability to use this website,
        or for any contents, information, software, products, features and
        services obtained through this web site, or otherwise arising out of the
        use of this web site.
      </p>
    ),
  },
];

const trademark = [
  {
    id: 1,
    text: (
      <p
        style={{
          fontWeight: 600,
          fontFamily: "var(--anek-font)",
          wordSpacing: 2,
          fontSize: 18,
        }}
      >
        <BiSolidAnalyse
          color="#fb6002"
          style={{ position: "relative", top: 3, marginRight: 12 }}
        />
        “NEWSTAMIL”, “www.newstamil.tv”, and/or any other trademarks and trade
        names being shown or used on the NEWS TAMIL 24X7 Sites are the property
        of their respective owners. Unless otherwise stated, copyright and all
        intellectual property rights in all material presented on the Site
        (including but not limited to text, audio, video or graphical images),
        trademarks and logos appearing on this Site are the property of NEWS
        TAMIL 24X7, its parent, affiliates and associates and are protected
        under applicable Indian laws.
      </p>
    ),
  },
  {
    id: 2,
    text: (
      <p
        style={{
          fontWeight: 600,
          fontFamily: "var(--anek-font)",
          wordSpacing: 2,
          fontSize: 18,
        }}
      >
        <BiSolidAnalyse
          color="#fb6002"
          style={{ position: "relative", top: 3, marginRight: 12 }}
        />
        You agree not to use any framing techniques to enclose any trademark or
        logo or other proprietary information of NEWS TAMIL; or remove, conceal
        or obliterate any copyright or other proprietary notice or any
        credit-line or date-line on other mark or source identifier included on
        the Site / Service, including without limitation, the size, color,
        location or style of all proprietary marks. Any infringement shall be
        vigorously defended and pursued to the fullest extent permitted by law.
      </p>
    ),
  },
];

const content = (
  <Box px={2} maxWidth={1440} mx={"auto"}>
    <Typography
      color={"#fb6002"}
      fontFamily={"var(--anek-font)"}
      fontWeight={600}
      fontSize={24}
    >
      Terms And Conditions
    </Typography>
    <Typography
      color={"#fb6002"}
      fontFamily={"var(--anek-font)"}
      fontWeight={600}
      fontSize={24}
    >
      General
    </Typography>
    <p
      style={{
        fontWeight: 600,
        fontFamily: "var(--anek-font)",
        wordSpacing: 2,
        fontSize: 18,
      }}
    >
      This Agreement, sets forth the terms and conditions that apply to use of
      this website, (www.newstamil.tv), and all sub sites that reside under the
      site (collectively ," NEWS TAMIL 24X7 Sites"), by a Subscriber.
      "Subscriber" means each person who establishes or accesses a connection
      ("Account") for access to and use of the NEWS TAMIL 24X7 Sites.
    </p>
    <Typography
      color={"#fb6002"}
      fontFamily={"var(--anek-font)"}
      fontWeight={600}
      fontSize={24}
    >
      Restrictions on use:
    </Typography>
    <p
      style={{
        fontWeight: 600,
        fontFamily: "var(--anek-font)",
        wordSpacing: 2,
        fontSize: 18,
      }}
    >
      <BiSolidAnalyse
        color="#fb6002"
        style={{ position: "relative", top: 3, marginRight: 12 }}
      />
      The www.newstamil.tv Sites are owned and operated by by News Tamil. ("the
      Company"), and contains material which is derived in whole or in part from
      material supplied by the Company, various news agencies and other sources
      and is protected by international copyright and trademark laws. Except
      where specifically authorized , the Subscriber may not modify, copy,
      reproduce, republish, upload, post, transmit or distribute in any way any
      material from the NEWS TAMIL 24X7 Sites including code and software. By
      visiting our site you are agreeing to be bound by the terms and conditions
      hereof.
    </p>
    <p
      style={{
        fontWeight: 600,
        fontFamily: "var(--anek-font)",
        wordSpacing: 2,
        fontSize: 18,
      }}
    >
      <BiSolidAnalyse
        color="#fb6002"
        style={{ position: "relative", top: 3, marginRight: 12 }}
      />
      he Company shall have the right at any time to change or discontinue any
      aspect or feature of NEWS TAMIL 24X7 Sites, including, but not limited to,
      content, hours of availability and equipment needed for access or use,
      adding fees and charges for use. Your continued use of NEWS TAMIL 24X7
      sites means that you accept any new or modified terms and conditions that
      we come up with ubscriber Conduct.
    </p>
    <Typography
      color={"#fb6002"}
      fontFamily={"var(--anek-font)"}
      fontWeight={600}
      fontSize={24}
    >
      Subscriber Conduct:
    </Typography>
    {subcriberContent.map((list) => list.text)}
    <Typography
      color={"#fb6002"}
      fontFamily={"var(--anek-font)"}
      fontWeight={600}
      fontSize={24}
    >
      Limitation of Liability:
    </Typography>
    {limitations.map((list) => list.text)}
    <Typography
      color={"#fb6002"}
      fontFamily={"var(--anek-font)"}
      fontWeight={600}
      fontSize={24}
    >
      Trademarks:
    </Typography>
    {trademark.map((list) => list.text)}
    <Typography
      color={"#fb6002"}
      fontFamily={"var(--anek-font)"}
      fontWeight={600}
      fontSize={24}
    >
      Termination of Account :
    </Typography>
    <p
      style={{
        fontWeight: 600,
        fontFamily: "var(--anek-font)",
        wordSpacing: 2,
        fontSize: 18,
      }}
    >
      NEWS TAMIL 24X7 reserves its right to refuse service, restrict, suspend,
      terminate your account; (Terminate this Agreement; Terminate or suspend
      your access to the NEWS TAMIL 24X7 Websites; Refuse, move or remove for
      any reason any Content / Image that you submit on or through the Services;
      Refuse, move, or remove any Content / Image that is available on or
      through the Services; Deactivate or delete your accounts and all related
      information and files in your account; Establish general practices and
      limits concerning use of the Services) at any time and, remove or edit
      contents or cancel orders (entered by you) in its sole discretion with or
      without cause, and with or without any prior notice for any violation of
      the Terms of Use. Upon such termination or suspension, your right to use
      the NEWS TAMIL 24X7 Websites will immediately cease. You can also
      terminate your account at any time but your information may remain stored
      in archive on our servers even after the deletion or the termination of
      your account.
    </p>
    <Typography
      color={"#fb6002"}
      fontFamily={"var(--anek-font)"}
      fontWeight={600}
      fontSize={24}
    >
      Advertising Material :
    </Typography>
    <p
      style={{
        fontWeight: 600,
        fontFamily: "var(--anek-font)",
        wordSpacing: 2,
        fontSize: 18,
      }}
    >
      Part of the Site contains advertising information or promotion material or
      other material submitted to NEWS TAMIL 24X7 by third parties.
      Responsibility for ensuring that material submitted for inclusion on Site
      complies with applicable International and National law is exclusively on
      the party providing the information/material. Your correspondence or
      business dealings with, or participation in promotions of, advertisers
      other than NEWS TAMIL 24X7 found on or through the Website, including
      payment and delivery of related goods or services, and any other terms,
      conditions, warranties or representations associated with such dealings,
      are solely between you and such advertiser. NEWS TAMIL 24X7 will not be
      responsible or liable for any claim, error, omission, inaccuracy in
      advertising material or any loss or damage of any sort incurred as the
      result of any such dealings or as the result of the presence of such non-
      NEWS TAMIL 24X7 advertisers on the Website. NEWS TAMIL 24X7 reserves the
      right to omit, suspend or change the position of any advertising material
      submitted for insertion. Acceptance of advertisements on the Site will be
      subject to these terms and conditions.
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
    <>
      <Head>
        <title>Terms of Use</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${pathname}`} />
      </Head>
      {deviceType === "mobile" ? (
        <MobilepageLayout menuData={menuData} type={deviceType} breakingControl={breakingControl} quickControl={quickControl}>
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
    </>
  );
}

export default page;
