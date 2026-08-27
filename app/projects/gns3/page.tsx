import type { Metadata } from "next";

import { ProjectCollection } from "@/components/project-collection";
import { ResourceHero } from "@/components/resource-hero";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "GNS3 Network Projects", description: "Production-shaped GNS3 project architectures for routing, security, IPv6, VPN, and enterprise design.", alternates: { canonical: "/projects/gns3" } };
export default function GNS3ProjectsPage() { const items = projects.filter((project) => project.platform === "GNS3"); return <main><ResourceHero eyebrow="PROJECTS / GNS3" title="Production-shaped practice." description="Complex routed, secured, and service-aware topologies presented as documented engineering work—not just device files." metrics={[{ value: String(items.length).padStart(2, "0"), label: "PROJECTS" }, { value: "GNS3", label: "PLATFORM" }, { value: "DRAFT", label: "SAFE PLACEHOLDERS" }]} /><ProjectCollection projects={items} title="GNS3 engineering case studies" description="Presentation architecture is complete. Add your legally obtained appliances and configuration files when authoring each project." /></main>; }
