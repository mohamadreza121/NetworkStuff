import type { Metadata } from "next";

import { GlossaryBrowser } from "@/components/glossary-browser";
import { ResourceHero } from "@/components/resource-hero";
import { glossaryTerms } from "@/content/glossary";

export const metadata: Metadata = { title: "Network Engineering Glossary", description: "Fast definitions, operational relevance, related concepts, and lessons for essential network engineering terms.", alternates: { canonical: "/glossary" } };
export default function GlossaryPage() { return <main><ResourceHero eyebrow="REFERENCE / GLOSSARY" title="Terms connected to operations." description="Fast definitions that explain what each concept means, why it matters on a real network, and where to learn it in context." metrics={[{ value: String(glossaryTerms.length).padStart(2, "0"), label: "TERMS" }, { value: "A–Z", label: "FAST FILTER" }, { value: "LINKED", label: "CONCEPTS" }]} /><GlossaryBrowser terms={glossaryTerms} /></main>; }
