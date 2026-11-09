import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Nav, Footer } from "@/components/Chrome";
import ClipModalProvider from "@/components/ClipModal";
import Reveal from "@/components/Reveal";
import { siteUrl } from "@/config";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "ReactionUGC — AI UGC Reaction Clips to Open Your Video Ads", template: "%s | ReactionUGC" },
  description: "Hundreds of AI UGC reaction clips — shocked, surprised, laughing, confused — to put in the first seconds of your TikTok, Reels, Shorts and Meta ads. Clean vertical MP4s, commercial license, pay once.",
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%23151513'/><circle cx='22' cy='22' r='4' fill='%23E8461E'/></svg>" },
  openGraph: { type: "website", siteName: "ReactionUGC" },
};

// Google Tag Manager container. Loads for all visitors (no consent banner yet) and only in production,
// so local testing doesn't pollute analytics. Set NEXT_PUBLIC_GTM_ID to override, or "" to turn it off.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-TGN6RX8C";
const gtmOn = process.env.NODE_ENV === "production" && !!GTM_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {gtmOn && (
          <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} /></noscript>
        )}
        <ClipModalProvider>
          <Nav />
          {children}
          <Footer />
        </ClipModalProvider>
        <Reveal />
        {gtmOn && (
          <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}</Script>
        )}
      </body>
    </html>
  );
}
