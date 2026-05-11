import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://iamomor.com/sitemap.xml",
    host: "https://iamomor.com",
  };
}
