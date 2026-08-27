import type { MetadataRoute } from "next";

import { lessons } from "@/lib/lessons";
import { hubs } from "@/content/hubs";
import { labs } from "@/content/labs";
import { projectHref, projects } from "@/content/projects";
import { troubleshootingScenarios } from "@/content/troubleshooting";
import { siteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "", "/roadmap", "/learn", "/labs", "/reference/linux", "/automation", "/firewalls",
    "/firewalls/palo-alto", "/firewalls/fortigate", "/gns3", "/gns3/install/windows",
    "/gns3/install/linux", "/gns3/install/macos", "/packet-tracer", "/projects",
    "/projects/gns3", "/projects/packet-tracer", "/troubleshooting", "/interview",
    "/job-ready", "/tools", "/tools/subnet-calculator", "/tools/wildcard-calculator",
    "/glossary", "/about",
    ...hubs.map((hub) => `/learn/${hub.slug.join("/")}`),
    ...lessons.map((lesson) => `/learn/${lesson.slug.join("/")}`),
    ...labs.map((lab) => `/labs/${lab.slug}`),
    ...projects.map(projectHref),
    ...troubleshootingScenarios.map((scenario) => `/troubleshooting/${scenario.slug}`),
  ];
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/roadmap" ? 0.9 : 0.8,
  }));
}
