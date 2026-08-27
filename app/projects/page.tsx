import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Braces, Building2, Network, Router } from "lucide-react";

import { ProjectCard } from "@/components/project-card";
import { ResourceHero } from "@/components/resource-hero";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Network Engineering Projects", description: "Portfolio-ready GNS3, Packet Tracer, automation, and enterprise network engineering case studies.", alternates: { canonical: "/projects" }, openGraph: { title: "Network Engineering Projects | NetPath", description: "Design, build, validate, troubleshoot, and document real network architectures." } };

const destinations = [
  { title: "GNS3", description: "Production-shaped routing, security, services, and multi-site architecture.", href: "/projects/gns3", icon: Network, count: projects.filter((project) => project.platform === "GNS3").length },
  { title: "Packet Tracer", description: "CCNA-focused switching, routing, IPv6, security, and branch builds.", href: "/projects/packet-tracer", icon: Router, count: projects.filter((project) => project.platform === "Packet Tracer").length },
  { title: "Automation", description: "Configuration, validation, and documentation workflows designed for repeatability.", href: "/automation", icon: Braces, count: 4 },
  { title: "Enterprise Designs", description: "Case studies that connect architecture decisions to operational evidence.", href: "/projects/gns3/enterprise-dual-site", icon: Building2, count: 3 },
];

export default function ProjectsPage() {
  const featured = projects.filter((project) => project.featured);
  return <main><ResourceHero eyebrow="PROJECT SHOWCASE / PORTFOLIO SYSTEM" title="Build networks worth explaining." description="Engineering case studies that connect design intent, addressing, configuration, validation, troubleshooting, and documentation." metrics={[{ value: String(projects.length), label: "PROJECT ARCHITECTURES" }, { value: "02", label: "LAB PLATFORMS" }, { value: "NO", label: "PROPRIETARY IMAGES" }]} />
    <section className="featured-projects-section"><div className="page-shell"><div className="resource-section-heading"><div><span>FEATURED PROJECTS</span><h2>From topology to evidence.</h2></div><p>Each project is structured as an engineering case study that can grow with your own configurations, diagrams, and verification captures.</p></div><div className="featured-project-grid">{featured.map((project, index) => <ProjectCard project={project} featured={index === 0} key={project.slug} />)}</div></div></section>
    <section className="project-destinations"><div className="page-shell"><div className="resource-section-heading"><div><span>PROJECT SYSTEMS</span><h2>Choose a build environment.</h2></div><p>Start with the platform that matches your current layer, then move toward complete enterprise documentation.</p></div><div>{destinations.map((item) => { const Icon = item.icon; return <Link href={item.href} key={item.title}><span><Icon aria-hidden="true" />{String(item.count).padStart(2, "0")}</span><h2>{item.title}</h2><p>{item.description}</p><b>Open system <ArrowRight aria-hidden="true" /></b></Link>; })}</div></div></section>
  </main>;
}
