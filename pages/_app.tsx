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
      </Head>
      <SessionProvider session={session}>
        <MainHeader />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
