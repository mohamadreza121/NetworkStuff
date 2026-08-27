import type { Metadata } from "next";

import { ProjectCollection } from "@/components/project-collection";
import { ResourceHero } from "@/components/resource-hero";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Packet Tracer Projects", description: "Packet Tracer projects for CCNA foundations, switching, routing, IPv6, security, and troubleshooting.", alternates: { canonical: "/projects/packet-tracer" } };
export default function PacketTracerProjectsPage() { const items = projects.filter((project) => project.platform === "Packet Tracer"); return <main><ResourceHero eyebrow="PROJECTS / PACKET TRACER" title="Build the CCNA control plane." description="Focused project architectures for switching, routing, IPv6, security, troubleshooting, and small enterprise networks." metrics={[{ value: String(items.length).padStart(2, "0"), label: "PROJECTS" }, { value: "08", label: "CATEGORIES" }, { value: ".PKT", label: "FUTURE DOWNLOADS" }]} /><ProjectCollection projects={items} title="Packet Tracer project index" description="Every card is ready for future .pkt practice and completed files without changing the presentation layer." /></main>; }
