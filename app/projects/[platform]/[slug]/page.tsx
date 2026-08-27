import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/project-detail";
import { getProject, projectHref, projects } from "@/content/projects";

export function generateStaticParams() { return projects.map((project) => ({ platform: project.platform.toLowerCase().replace(/ /g, "-"), slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ platform: string; slug: string }> }): Promise<Metadata> { const { platform, slug } = await params; const project = getProject(platform, slug); return project ? { title: project.title, description: project.summary, alternates: { canonical: projectHref(project) }, openGraph: { title: `${project.title} | NetPath Projects`, description: project.summary, type: "article" } } : { title: "Project not found" }; }
export default async function ProjectPage({ params }: { params: Promise<{ platform: string; slug: string }> }) { const { platform, slug } = await params; const project = getProject(platform, slug); if (!project) notFound(); return <ProjectDetail project={project} />; }
