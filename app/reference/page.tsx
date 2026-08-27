import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitBranch, Network, ShieldCheck, TerminalSquare, Workflow } from "lucide-react";

import { ReferenceBrowser } from "@/components/reference-browser";
import { ResourceHero } from "@/components/resource-hero";
import { referenceCommands, referencePlatforms } from "@/content/reference";

export const metadata: Metadata = {
  title: "Network Engineering Command Reference",
  description: "Search 600+ Linux, Cisco IOS, PAN-OS, FortiOS, Git, and Ansible command references with modes, examples, cautions, and engineering context.",
  alternates: { canonical: "/reference" },
};

const platformIcons = [TerminalSquare, Network, ShieldCheck, ShieldCheck, GitBranch, Workflow];

export default async function ReferencePage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  return <main>
    <ResourceHero eyebrow="REFERENCE CENTER / SIX OPERATING SYSTEMS" title="Command context, not command dumps." description="Search the operating vocabulary of network engineering across infrastructure, firewalls, source control, and automation. Expand only the entry you need; verify every change on the target platform." metrics={[{ value: String(referenceCommands.length), label: "STRUCTURED ENTRIES" }, { value: "06", label: "PLATFORMS" }, { value: "LIVE", label: "FILTER INDEX" }]} />
    <section className="reference-platform-section">
      <div className="page-shell">
        <div className="resource-section-heading"><div><span>01 / PLATFORM INDEX</span><h2>Choose an operating surface.</h2></div><p>Each collection is sourced from official documentation and organized around practical network engineering workflows. Legacy and potentially disruptive commands are marked explicitly.</p></div>
        <div className="reference-platform-grid">{referencePlatforms.map((definition, index) => { const Icon = platformIcons[index]; return <Link href={`/reference/${definition.slug}`} key={definition.slug}><span>REF-{String(index + 1).padStart(2, "0")}<i className="status-dot" /></span><Icon aria-hidden="true" /><div><small>{definition.commands.length} COMMANDS</small><h2>{definition.shortTitle}</h2><p>{definition.description}</p></div><ArrowRight aria-hidden="true" /></Link>; })}</div>
      </div>
    </section>
    <section className="reference-library-section">
      <div className="page-shell">
        <div className="resource-section-heading"><div><span>02 / UNIFIED INDEX</span><h2>Search every platform.</h2></div><p>Filter by platform, workflow category, experience level, command mode, or lifecycle status. Search also covers examples, aliases, and tags.</p></div>
        <ReferenceBrowser commands={referenceCommands} initialQuery={q} />
      </div>
    </section>
  </main>;
}
