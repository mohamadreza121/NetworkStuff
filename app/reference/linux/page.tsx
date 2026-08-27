import type { Metadata } from "next";
import { ReferenceBrowser } from "@/components/reference-browser";
import { ResourceHero } from "@/components/resource-hero";
import { referencePlatformBySlug } from "@/content/reference";

const definition = referencePlatformBySlug.linux;

export const metadata: Metadata = { title: definition.title, description: definition.description, alternates: { canonical: "/reference/linux" } };
export default async function LinuxReferencePage({ searchParams }: { searchParams: Promise<{ q?: string }> }) { const { q = "" } = await searchParams; return <main><ResourceHero eyebrow="LINUX / COMMAND REFERENCE" title={definition.title} description={definition.description} metrics={[{ value: String(definition.commands.length), label: "STRUCTURED ENTRIES" }, { value: String(new Set(definition.commands.map((command) => command.category)).size).padStart(2, "0"), label: "WORKFLOW GROUPS" }, { value: "LIVE", label: "SEARCH + FILTER" }]} /><section className="reference-library-section"><div className="page-shell"><ReferenceBrowser commands={definition.commands} fixedPlatform={definition.platform} initialQuery={q} /></div></section></main>; }
