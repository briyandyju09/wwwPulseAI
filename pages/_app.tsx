import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from 'react-hot-toast';
import Head from 'next/head'
import Script from 'next/script'
import { Analytics } from "@vercel/analytics/react"


export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>PulseAI, Your Consumer Rights Companion</title>
      <meta name="description" content="Welcome to Pulse, the ultimate tool for making informed and smart food choices!" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://pulseconsumer.vercel.app" />
      <meta property="og:title" content="PulseAI" />
      <meta property="og:description" content="Welcome to Pulse, the ultimate tool for making informed and smart food choices!" />
      <meta property="og:image" content="" />
      <meta property="og:image:secure_url" content="" />
      <meta property="og:image:alt" content="PulseAI" />
    </Head>
    {/* For Local Development, disable */}
    <Script strategy="afterInteractive" src="https://umami.hrichik.xyz/script.js" data-website-id="0a20bdb6-769c-432a-9d10-b60eca839914"></Script>

  <Component {...pageProps} />
  <Analytics/>
  <Toaster/>
  </>;
}
