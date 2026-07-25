import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Cherika Kaushal builds software for healthcare studies, data-quality experiments, and interactive systems."
        />
        <meta property="og:title" content="Cherika Kaushal — Software & Research" />
        <meta property="og:description" content="Building useful systems around complex data." />
        <meta name="theme-color" content="#F8F6F3" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='16' fill='%23111111'/><text x='50' y='64' text-anchor='middle' fill='%23F8F6F3' font-size='42' font-family='Arial'>CK</text></svg>"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
