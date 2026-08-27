import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/content/schema";

export function ProjectCollection({ projects, title, description }: { projects: Project[]; title: string; description: string }) {
  return (
    <section className="project-collection-section">
      <div className="page-shell">
        <div className="resource-section-heading"><div><span>PROJECT INDEX</span><h2>{title}</h2></div><p>{description}</p></div>
        <div className="project-card-grid">{projects.map((project) => <ProjectCard project={project} key={project.slug} />)}</div>
        <div className="project-license-note"><span>IMAGE POLICY</span><p>Project downloads contain documentation, addressing, and configuration placeholders only. No proprietary appliance images are distributed.</p><Link href="/gns3">Review GNS3 licensing guidance <ArrowRight aria-hidden="true" /></Link></div>
      </div>
    </section>
  );
}
