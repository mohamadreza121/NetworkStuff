"use client";

import { useMemo, useState } from "react";
import { Check, Clipboard, Search, Terminal } from "lucide-react";

import { commandCategories, linuxCommands } from "@/content/commands";

export function LinuxCommandReference() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [copied, setCopied] = useState<string | null>(null);
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return linuxCommands.filter((item) => {
      const categoryMatch = category === "All" || item.category === category;
      const queryMatch = !needle || `${item.command} ${item.purpose} ${item.example} ${item.next.join(" ")}`.toLowerCase().includes(needle);
      return categoryMatch && queryMatch;
    });
  }, [category, query]);

  const copy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(null), 1400);
  };

  return (
    <main>
      <section className="reference-hero">
        <div className="page-shell reference-hero-grid">
          <div><span><Terminal aria-hidden="true" />LINUX / FIELD REFERENCE</span><h1>Commands in context.</h1><p>Search the operating sequence, understand what healthy output looks like, and know which command to run next.</p></div>
          <div className="reference-search"><Search aria-hidden="true" /><label htmlFor="command-search" className="sr-only">Search Linux commands</label><input id="command-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search command, purpose, or next step…" /><kbd>{results.length} / {linuxCommands.length}</kbd></div>
        </div>
      </section>
      <section className="command-library">
        <div className="page-shell">
          <div className="command-filters" aria-label="Command categories">{commandCategories.map((item) => <button type="button" key={item} className={category === item ? "is-active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
          {results.length > 0 ? <div className="command-reference-grid">{results.map((item) => (
            <article className="command-reference-card" key={item.command}>
              <div className="command-card-top"><span>{item.category}</span><button type="button" onClick={() => copy(item.example)} aria-label={`Copy ${item.command} example`}>{copied === item.example ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}{copied === item.example ? "Copied" : "Copy"}</button></div>
              <h2>{item.command}</h2><p>{item.purpose}</p><pre><code>{item.example}</code></pre>
              <div className="command-expected"><span>EXPECTED SIGNAL</span><p>{item.expected}</p></div>
              <div className="command-next"><span>NEXT</span>{item.next.map((next) => <button type="button" key={next} onClick={() => setQuery(next)}>{next}</button>)}</div>
            </article>
          ))}</div> : <div className="empty-reference"><Terminal aria-hidden="true" /><h2>No command matched.</h2><p>Clear the query or choose another category.</p><button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Reset reference</button></div>}
        </div>
      </section>
    </main>
  );
}
