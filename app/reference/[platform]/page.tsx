import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ReferenceBrowser } from "@/components/reference-browser";
import { ResourceHero } from "@/components/resource-hero";
import { referencePlatformBySlug, referencePlatforms } from "@/content/reference";

export function generateStaticParams() {
  return referencePlatforms.filter((definition) => definition.slug !== "linux").map((definition) => ({ platform: definition.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ platform: string }> }): Promise<Metadata> {
  const { platform } = await params;
  const definition = referencePlatformBySlug[platform];
  return definition ? { title: definition.title, description: definition.description, alternates: { canonical: `/reference/${definition.slug}` } } : { title: "Reference platform not found" };
}

export default async function PlatformReferencePage({ params, searchParams }: { params: Promise<{ platform: string }>; searchParams: Promise<{ q?: string }> }) {
  const { platform } = await params;
  const { q = "" } = await searchParams;
  const definition = referencePlatformBySlug[platform];
  if (!definition) notFound();
  return <main>
    <ResourceHero eyebrow={`${definition.shortTitle.toUpperCase()} / COMMAND REFERENCE`} title={definition.title} description={definition.description} metrics={[{ value: String(definition.commands.length), label: "STRUCTURED ENTRIES" }, { value: String(new Set(definition.commands.map((command) => command.category)).size).padStart(2, "0"), label: "WORKFLOW GROUPS" }, { value: "LIVE", label: "SEARCH + FILTER" }]} />
    <section className="reference-library-section"><div className="page-shell"><ReferenceBrowser commands={definition.commands} fixedPlatform={definition.platform} initialQuery={q} /></div></section>
  </main>;
}
