import Link from "next/link";
import { ArrowUpRight, Boxes, Clock3, MapPin } from "lucide-react";

import type { Project } from "@/content/schema";
import { projectHref } from "@/content/projects";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={featured ? "project-card is-featured" : "project-card"}>
      <div className="project-card-rail"><span>{project.platform.toUpperCase()}</span><i data-status={project.status.toLowerCase()} />{project.status}</div>
      <div className="project-card-body">
        <div className="project-card-index">{project.category.toUpperCase()} / {project.level}</div>
        <h2>{project.title}</h2>
        <p>{project.summary}</p>
        <dl>
          <div><Boxes aria-hidden="true" /><dt>{project.devices}</dt><dd>Devices</dd></div>
          <div><MapPin aria-hidden="true" /><dt>{project.sites}</dt><dd>Sites</dd></div>
          <div><Clock3 aria-hidden="true" /><dt>{Math.round(project.estimatedMinutes / 60 * 10) / 10}h</dt><dd>Build</dd></div>
        </dl>
        <div className="project-technology-line" aria-label="Technologies">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
      </div>
      <Link href={projectHref(project)} className="project-card-action">View project <ArrowUpRight aria-hidden="true" /></Link>
    </article>
  );
}
