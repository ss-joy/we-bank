import MainHeader from "@/components/ui/MainHeader";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>we Bank | A part of weBuy</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/ui-images/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/ui-images/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/ui-images/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/ui-images/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/ui-images/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <SessionProvider session={session}>
        <MainHeader />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
