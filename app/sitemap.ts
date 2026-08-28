import type { MetadataRoute } from "next";

import { ccnaModulePath } from "@/content/cisco/ccna";
import { ccnaModules } from "@/content/cisco/ccna/modules";
import { linuxModulePath, linuxModules } from "@/content/linux/network-engineering";
import { lessons } from "@/lib/lessons";
import { hubs } from "@/content/hubs";
import { labs } from "@/content/labs";
import { projectHref, projects } from "@/content/projects";
import { referencePlatforms } from "@/content/reference";
import { troubleshootingScenarios } from "@/content/troubleshooting";
import { siteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...new Set([
    "", "/roadmap", "/learn", "/labs", "/reference", "/automation", "/firewalls",
    "/firewalls/palo-alto", "/firewalls/fortigate", "/gns3", "/gns3/install/windows",
    "/gns3/install/linux", "/gns3/install/macos", "/packet-tracer", "/projects",
    "/projects/gns3", "/projects/packet-tracer", "/troubleshooting", "/interview",
    "/job-ready", "/tools", "/tools/subnet-calculator", "/tools/vlsm-planner",
    "/tools/ipv6-helper", "/tools/wildcard-calculator", "/tools/ospf-cost-calculator",
    "/tools/eigrp-calculator", "/tools/acl-builder",
    "/glossary", "/about",
    ...hubs.map((hub) => `/learn/${hub.slug.join("/")}`),
    ...ccnaModules.map((moduleEntry) => ccnaModulePath(moduleEntry.id)),
    ...linuxModules.map((moduleEntry) => linuxModulePath(moduleEntry.id)),
    ...lessons.map((lesson) => `/learn/${lesson.slug.join("/")}`),
    ...labs.map((lab) => `/labs/${lab.slug}`),
    ...projects.map(projectHref),
    ...referencePlatforms.map((definition) => `/reference/${definition.slug}`),
    ...troubleshootingScenarios.map((scenario) => `/troubleshooting/${scenario.slug}`),
  ])];
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/roadmap" ? 0.9 : 0.8,
  }));
}
