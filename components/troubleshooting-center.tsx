"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search, ShieldAlert } from "lucide-react";

import type { TroubleshootingScenario } from "@/content/schema";

const diagnosticLayers = ["PHYSICAL", "LINK", "VLAN", "IP ADDRESS", "GATEWAY", "ARP", "ROUTING", "NAT", "FIREWALL", "DNS"];

export function TroubleshootingCenter({ scenarios }: { scenarios: TroubleshootingScenario[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [activeLayer, setActiveLayer] = useState(0);
  const categories = ["All", ...Array.from(new Set(scenarios.map((scenario) => scenario.category)))];
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return scenarios.filter((scenario) => (category === "All" || scenario.category === category) && (!needle || `${scenario.title} ${scenario.technology} ${scenario.symptoms.join(" ")}`.toLowerCase().includes(needle)));
  }, [category, query, scenarios]);

  return (
    <>
      <section className="diagnostic-flow-section">
        <div className="page-shell diagnostic-flow-layout">
          <div><span>ENGINEERING METHOD</span><h2>Find the last known-good layer.</h2><p>Start close to the signal. Confirm or eliminate one failure domain at a time, then move upward only when the evidence permits it.</p><strong>ACTIVE CHECK · {diagnosticLayers[activeLayer]}</strong></div>
          <div className="diagnostic-flow" role="group" aria-label="Connectivity diagnostic layers">
            {diagnosticLayers.map((layer, index) => <button type="button" key={layer} className={index === activeLayer ? "is-active" : index < activeLayer ? "is-complete" : ""} onClick={() => setActiveLayer(index)} aria-pressed={index === activeLayer}><span>{String(index + 1).padStart(2, "0")}</span>{layer}</button>)}
          </div>
        </div>
      </section>

      <section className="incident-index-section">
        <div className="page-shell">
          <div className="resource-section-heading"><div><span>INCIDENT LIBRARY</span><h2>Practice the investigation, not the guess.</h2></div><p>Each incident separates symptoms and evidence from diagnosis and repair. The answer stays behind a deliberate reveal.</p></div>
          <label className="resource-search"><Search aria-hidden="true" /><span className="sr-only">Search troubleshooting scenarios</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search symptom, protocol, or technology…" /><kbd>{visible.length} MATCHES</kbd></label>
          <div className="resource-filter-row" aria-label="Troubleshooting categories">{categories.map((item) => <button type="button" className={item === category ? "is-active" : ""} aria-pressed={item === category} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div>
          <div className="incident-grid">
            {visible.map((scenario, index) => <article key={scenario.slug}>
              <div className="incident-card-top"><span>INC-{String(index + 1).padStart(3, "0")}</span><span><i />{scenario.difficulty}</span></div>
              <ShieldAlert aria-hidden="true" />
              <small>{scenario.category.toUpperCase()} · {scenario.technology.toUpperCase()}</small>
              <h2>{scenario.title}</h2>
              <p>{scenario.symptoms[0]}</p>
              <div><b>{scenario.topology.nodes.length} NODES</b><b>{scenario.possibleCauses.length} HYPOTHESES</b></div>
              <Link href={`/troubleshooting/${scenario.slug}`}>Open incident <ArrowRight aria-hidden="true" /></Link>
            </article>)}
          </div>
          {visible.length === 0 && <div className="resource-empty"><strong>NO INCIDENT MATCH</strong><p>Try a broader symptom or reset the active category.</p><button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Reset filters</button></div>}
        </div>
      </section>
    </>
  );
}
