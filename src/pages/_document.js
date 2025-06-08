import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Learn about Omar Siddiqui, aspiring software engineer." />

        <meta property="og:title" content="Omar Siddiqui's Portfolio" />
        <meta property="og:description" content="Learn about Omar Siddiqui, aspiring software engineer." />
        <meta property="og:url" content="https://www.osid.dev" />
        <meta property="og:site_name" content="Omar Siddiqui's Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.osid.dev/assets/osid-portfolio.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}