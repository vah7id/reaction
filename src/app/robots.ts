import type { MetadataRoute } from "next";
import { siteUrl } from "@/config";

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/download", "/get", "/admin", "/api/", "/account", "/login", "/auth/"] }], sitemap: siteUrl + "/sitemap.xml" };
}
