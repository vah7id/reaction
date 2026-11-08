import type { Metadata } from "next";
import "./globals.css";
import { Nav, Footer } from "@/components/Chrome";
import ClipModalProvider from "@/components/ClipModal";
import Reveal from "@/components/Reveal";
import { siteUrl } from "@/config";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "AI UGC Reaction Clips & UGC Reaction Video Library for Ads — UGCLibrary", template: "%s | UGCLibrary" },
  description: "UGCLibrary is a UGC video library of AI UGC reaction clips. Open TikTok, Reels, Shorts and Meta ads with a UGC reaction video hook, then cut to your product demo. Vertical MP4 originals, commercial-use license, one payment.",
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%23151513'/><circle cx='22' cy='22' r='4' fill='%23E8461E'/></svg>" },
  openGraph: { type: "website", siteName: "UGCLibrary" },
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
