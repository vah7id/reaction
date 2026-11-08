import type { MetadataRoute } from "next";
import { siteUrl } from "@/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/characters", "/ai-ugc-video-ads", "/tiktok-hook-generator", "/viral-video-hooks", "/b-roll-reaction-clips", "/how-to-make-a-reaction-video"]
    .map((p) => ({ url: siteUrl + p, lastModified: new Date("2026-11-07") }));
}
