import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="/img/brand/favicon.png"
        ></link>

        <title>Airtrip</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
