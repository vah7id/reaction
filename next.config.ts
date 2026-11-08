import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old .html URLs from the static version keep working.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/:page(ai-ugc-video-ads|tiktok-hook-generator|viral-video-hooks|b-roll-reaction-clips|how-to-make-a-reaction-video|characters).html", destination: "/:page", permanent: true },
      { source: "/:page(library|login|account).html", destination: "/#pricing", permanent: false },
    ];
  },
};

export default nextConfig;
