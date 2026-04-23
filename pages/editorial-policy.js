import Head from "next/head";
import React from "react";
import Link from "next/link";

export default function EditorialPolicy() {
  return (
    <>
      <Head>
        <title>Editorial Policy - News Tamil 24x7</title>
        <meta name="description" content="Editorial policy, corrections, ownership and transparency." />
      </Head>
      <main style={{ maxWidth: 900, margin: '40px auto', padding: 16 }}>
        <h1>Editorial Policy</h1>
        <p>
          Our editorial policy governs how we gather, verify and publish news.
          We are committed to accuracy, impartiality and transparency. Corrections
          will be published promptly when errors are identified.
        </p>

        <h2>Corrections</h2>
        <p>
          If you believe we have published incorrect information, please contact
          us via the <Link href="/contact">Contact</Link> page with details.
        </p>

        <h2>Conflicts of Interest</h2>
        <p>
          Journalists and contributors must declare any conflicts of interest.
        </p>

        <h2>Ownership Transparency</h2>
        <p>
          News Tamil 24x7 is owned by NewsTamil Media Group. For full ownership
          disclosure and leadership details visit the <Link href="/about-us">About Us</Link> page.
        </p>
      </main>
    </>
  );
}
