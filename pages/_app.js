import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Next.js CRUD</title>
        <meta name="description" content="Welcome to My Awesome Website" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
