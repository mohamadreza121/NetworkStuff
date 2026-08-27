"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";

import type { GlossaryTerm } from "@/content/schema";

export function GlossaryBrowser({ terms }: { terms: GlossaryTerm[] }) {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => { const needle = query.trim().toLowerCase(); return terms.filter((entry) => !needle || `${entry.term} ${entry.expanded} ${entry.definition} ${entry.relatedTerms.join(" ")}`.toLowerCase().includes(needle)); }, [query, terms]);
  const alphabet = Array.from(new Set(terms.map((entry) => entry.term[0])));
  return <section className="glossary-section"><div className="page-shell"><label className="resource-search"><Search aria-hidden="true" /><span className="sr-only">Filter glossary</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter terms, definitions, or related concepts…" /><kbd>{visible.length} TERMS</kbd></label><div className="glossary-alphabet" aria-label="Glossary letters">{alphabet.map((letter) => <button type="button" key={letter} onClick={() => setQuery(letter)}>{letter}</button>)}<button type="button" onClick={() => setQuery("")}>ALL</button></div><div className="glossary-list">{visible.map((entry) => <article key={entry.term}><div className="glossary-term"><strong>{entry.term}</strong><span>{entry.expanded}</span></div><div className="glossary-definition"><p>{entry.definition}</p><div><span>WHY IT MATTERS</span><p>{entry.whyItMatters}</p></div></div><div className="glossary-related"><span>RELATED</span><p>{entry.relatedTerms.join(" · ")}</p>{entry.relatedLesson && <Link href={entry.relatedLesson.href}>Related lesson <ArrowRight aria-hidden="true" /></Link>}</div></article>)}</div>{visible.length === 0 && <div className="resource-empty"><strong>NO TERM MATCH</strong><p>Clear the filter to return to the full glossary.</p><button type="button" onClick={() => setQuery("")}>Clear search</button></div>}</div></section>;
}
