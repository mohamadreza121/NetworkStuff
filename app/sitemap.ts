import type { MetadataRoute } from "next";

import { lessons } from "@/lib/lessons";
import { siteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/roadmap", "/learn", ...lessons.map((lesson) => `/learn/${lesson.slug.join("/")}`)];
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/roadmap" ? 0.9 : 0.8,
  }));
}
