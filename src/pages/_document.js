import { Html, Head, Main, NextScript } from "next/document";
import { Analytics } from "@vercel/analytics/next"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Learn about Omar Siddiqui, aspiring software engineer." />
        <meta property="og:title" content="Omar Siddiqui's Portfolio" />
        <meta property="og:description" content="Learn about Omar Siddiqui, aspiring software engineer." />
        <meta property="og:url" content="https://www.osid.dev" />
        <meta property="og:site_name" content="Omar Siddiqui" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.osid.dev/assets/osid-portfolio.png" />
        <meta property="og:locale" content="en_US" />
        <meta name="theme-color" content="#AA6344" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Analytics />

      </body>
    </Html>
  );
}
