"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, FlaskConical, Search } from "lucide-react";

import { labs } from "@/content/labs";

const platforms = ["All", "Packet Tracer", "GNS3", "Linux", "Ansible"] as const;

export function LabLibrary() {
  const [platform, setPlatform] = useState<(typeof platforms)[number]>("All");
  const [query, setQuery] = useState("");
  const results = useMemo(() => labs.filter((lab) => {
    const matchesPlatform = platform === "All" || lab.platform === platform;
    const needle = query.trim().toLowerCase();
    return matchesPlatform && (!needle || `${lab.title} ${lab.description} ${lab.skills.join(" ")}`.toLowerCase().includes(needle));
  }), [platform, query]);

  return (
    <main>
      <section className="lab-library-hero"><div className="page-shell"><span><FlaskConical aria-hidden="true" />PRACTICE / VALIDATE / EXPLAIN</span><h1>Hands-on lab library.</h1><p>Start with a goal and an addressing plan. Reveal the completed configuration only when you are ready to compare evidence.</p><div className="lab-library-search"><Search aria-hidden="true" /><label className="sr-only" htmlFor="lab-search">Search labs</label><input id="lab-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search OSPF, VLAN, Linux, backup…" /></div></div></section>
      <section className="lab-library-section"><div className="page-shell"><div className="lab-filter-row">{platforms.map((item) => <button type="button" key={item} className={platform === item ? "is-active" : ""} onClick={() => setPlatform(item)}>{item}</button>)}<span>{results.length} LAB{results.length === 1 ? "" : "S"}</span></div><div className="lab-library-grid">{results.map((lab) => (
        <Link href={`/labs/${lab.slug}`} className="lab-library-card" key={lab.slug}>
          <div><span>{lab.index}</span><em>{lab.platform}</em></div><div className="lab-card-topology" aria-hidden="true">{lab.topology.nodes.map((node) => <i key={node} />)}</div><h2>{lab.title}</h2><p>{lab.description}</p><div className="lab-card-meta"><span>{lab.level}</span><span>{lab.duration}</span><span>{lab.devices}</span></div><div className="lab-card-skills">{lab.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><strong>Open practice mode <ArrowRight aria-hidden="true" /></strong>
        </Link>
      ))}</div></div></section>
    </main>
  );
}
