import type { Metadata } from "next";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ClipModalProvider>
          <Nav />
          {children}
          <Footer />
        </ClipModalProvider>
        <Reveal />
      </body>
    </html>
  );
}
