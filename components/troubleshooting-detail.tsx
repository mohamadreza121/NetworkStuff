"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Eye, Lightbulb, ShieldCheck } from "lucide-react";

import { TerminalBlock } from "@/components/terminal-block";
import { TopologyPanel } from "@/components/topology-panel";
import type { TroubleshootingScenario } from "@/content/schema";

export function TroubleshootingDetail({ scenario }: { scenario: TroubleshootingScenario }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <main className="incident-detail-page">
      <section className="incident-detail-hero"><div className="page-shell"><Link href="/troubleshooting" className="back-link"><ArrowLeft aria-hidden="true" /> Incident library</Link><span className="phase3-eyebrow"><i className="status-dot amber" />INCIDENT / {scenario.category.toUpperCase()}</span><h1>{scenario.title}</h1><div className="incident-symptom-block"><span>SYMPTOMS</span>{scenario.symptoms.map((item) => <p key={item}>{item}</p>)}</div><div className="incident-meta-line"><span>{scenario.difficulty}</span><span>{scenario.technology}</span><span>SOLUTION PROTECTED</span></div></div></section>
      <section className="incident-detail-content"><div className="page-shell incident-detail-layout"><aside><span>RESPONSE SEQUENCE</span>{["Known information", "Topology", "Possible causes", "Investigation", "Commands", "Evidence", "Diagnosis", "Fix", "Verification", "Root cause"].map((item, index) => <a href={`#incident-${index + 1}`} key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</a>)}</aside><div>
        <section id="incident-1" className="incident-doc-section"><span>01 / KNOWN INFORMATION</span><h2>What is established?</h2><ul>{scenario.knownInformation.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section id="incident-2" className="incident-doc-section"><span>02 / TOPOLOGY</span><TopologyPanel label="INCIDENT PATH" caption={scenario.topology.caption} nodes={scenario.topology.nodes} links={scenario.topology.links} /></section>
        <section id="incident-3" className="incident-doc-section"><span>03 / POSSIBLE CAUSES</span><h2>Build hypotheses before commands.</h2><ol>{scenario.possibleCauses.map((item, index) => <li key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</li>)}</ol></section>
        <section id="incident-4" className="incident-doc-section"><span>04 / INVESTIGATION</span><h2>Reduce the failure domain.</h2>{scenario.investigation.map((item) => <p key={item}>{item}</p>)}</section>
        <section id="incident-5" className="incident-doc-section"><span>05 / COMMANDS</span><TerminalBlock title={scenario.commands.title} prompt={scenario.commands.prompt} code={scenario.commands.code} variant={scenario.commands.variant} /></section>
        <section id="incident-6" className="incident-doc-section evidence-panel"><span>06 / EVIDENCE</span><h2>Observed state</h2>{scenario.evidence.map((item) => <p key={item}><Eye aria-hidden="true" />{item}</p>)}</section>
        {!revealed ? <section className="solution-protection"><Lightbulb aria-hidden="true" /><span>STOP AND FORM A DIAGNOSIS</span><h2>What single cause best explains all evidence?</h2><p>State the failure domain, the configuration or state you expect, and the least disruptive change that would prove your hypothesis.</p><button type="button" onClick={() => setRevealed(true)}><Eye aria-hidden="true" />Reveal diagnosis and fix</button></section> : <div className="incident-solution" aria-live="polite">
          <section id="incident-7" className="incident-doc-section"><span>07 / DIAGNOSIS</span><h2>{scenario.diagnosis}</h2></section>
          <section id="incident-8" className="incident-doc-section"><span>08 / FIX</span><h2>Restore intended state.</h2><p>{scenario.fix}</p></section>
          <section id="incident-9" className="incident-doc-section"><span>09 / VERIFICATION</span><ul>{scenario.verification.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" />{item}</li>)}</ul></section>
          <section id="incident-10" className="incident-doc-section root-cause-panel"><ShieldCheck aria-hidden="true" /><div><span>10 / ROOT CAUSE</span><h2>{scenario.rootCause}</h2><p>{scenario.remember}</p></div></section>
        </div>}
      </div></div></section>
    </main>
  );
}
