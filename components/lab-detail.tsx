"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Download, Eye, EyeOff, FlaskConical, Lightbulb, ShieldAlert } from "lucide-react";

import { DownloadCard } from "@/components/download-card";
import { TerminalBlock } from "@/components/terminal-block";
import { TopologyPanel } from "@/components/topology-panel";
import type { Lab } from "@/content/labs";

export function LabDetail({ lab }: { lab: Lab }) {
  const [solutionVisible, setSolutionVisible] = useState(false);
  const [hints, setHints] = useState<number[]>([]);
  const toggleHint = (index: number) => setHints((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);

  return (
    <main className="lab-detail-page">
      <section className="lab-detail-hero"><div className="page-shell"><Link href="/labs"><ArrowLeft aria-hidden="true" />Lab library</Link><div className="lab-detail-grid"><div><span>{lab.index} / {lab.platform}</span><h1>{lab.title}</h1><p>{lab.description}</p><div>{lab.skills.map((skill) => <em key={skill}>{skill}</em>)}</div></div><aside><span>LEVEL <b>{lab.level}</b></span><span>DURATION <b>{lab.duration}</b></span><span>TOPOLOGY <b>{lab.devices}</b></span><span>MODE <b>{solutionVisible ? "SOLUTION" : "PRACTICE"}</b></span></aside></div></div></section>
      <div className="page-shell lab-detail-layout">
        <article>
          <section className="lab-content-section"><div className="lab-section-label">01 / TOPOLOGY</div><h2>Know the system before the commands.</h2><TopologyPanel label={lab.title} caption={lab.topology.caption} nodes={lab.topology.nodes} links={lab.topology.links} /></section>
          <section className="lab-content-section"><div className="lab-section-label">02 / ADDRESSING</div><h2>Addressing plan</h2><div className="address-table" role="table" aria-label="Lab addressing"><div role="row"><span role="columnheader">Device</span><span role="columnheader">Interface</span><span role="columnheader">Address</span><span role="columnheader">Gateway</span></div>{lab.addressing.map((row) => <div role="row" key={`${row.device}-${row.interface}`}><strong role="cell">{row.device}</strong><span role="cell">{row.interface}</span><code role="cell">{row.address}</code><code role="cell">{row.gateway}</code></div>)}</div></section>
          <section className="lab-content-section"><div className="lab-section-label">03 / REQUIREMENTS</div><h2>Definition of done</h2><ul className="lab-requirements">{lab.requirements.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" />{item}</li>)}</ul></section>
          <section className="lab-content-section"><div className="lab-section-label">04 / TASKS</div><h2>Practice mode</h2><div className="lab-task-list">{lab.tasks.map((task, index) => <article key={task.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{task.title}</h3><p>{task.detail}</p>{hints.includes(index) && <aside><Lightbulb aria-hidden="true" />{task.hint}</aside>}<button type="button" onClick={() => toggleHint(index)}>{hints.includes(index) ? "Hide hint" : "Show hint"}</button></div></article>)}</div><TerminalBlock title={`${lab.platform} · starter`} prompt={lab.platform === "Packet Tracer" || lab.platform === "GNS3" ? "#" : "$"} code={lab.starter} variant={lab.platform === "Ansible" ? "automation" : lab.platform === "Linux" ? "linux" : "cisco"} /></section>
          <section className="solution-gate"><FlaskConical aria-hidden="true" /><div><span>05 / SOLUTION MODE</span><h2>{solutionVisible ? "Compare your evidence." : "Keep the answer protected."}</h2><p>{solutionVisible ? "Review the completed configuration, expected output, and failure analysis below." : "Attempt the tasks and capture your own verification first. Reveal only when the comparison will teach you something."}</p><button type="button" onClick={() => setSolutionVisible((value) => !value)}>{solutionVisible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}{solutionVisible ? "Hide solution" : "Reveal solution"}</button></div></section>
          {solutionVisible && <section className="lab-solution" aria-live="polite"><div className="lab-section-label">SOLUTION / EXPLAINED</div><h2>Completed configuration</h2><p>{lab.solution.explanation}</p><TerminalBlock title={`${lab.platform} · completed configuration`} prompt={lab.platform === "Linux" || lab.platform === "Ansible" ? "$" : "#"} code={lab.solution.configuration} variant={lab.platform === "Ansible" ? "automation" : lab.platform === "Linux" ? "linux" : "cisco"} /><h2>Expected verification</h2><TerminalBlock title="Expected output sequence" prompt={lab.platform === "Linux" || lab.platform === "Ansible" ? "$" : "#"} code={lab.solution.verification} variant={lab.platform === "Ansible" ? "automation" : lab.platform === "Linux" ? "linux" : "cisco"} /><h2>Failure analysis</h2><div className="solution-failures">{lab.solution.failures.map((item) => <article key={item.symptom}><ShieldAlert aria-hidden="true" /><div><strong>{item.symptom}</strong><p><b>Cause:</b> {item.cause}</p><p><b>Fix:</b> {item.fix}</p></div></article>)}</div></section>}
        </article>
        <aside className="lab-downloads"><span><Download aria-hidden="true" />LAB FILES</span>{lab.downloads.map((item) => <DownloadCard key={item.href} title={item.label} description={item.note} href={item.href} format={item.href.split(".").pop()?.toUpperCase() ?? "FILE"} />)}<p>Repository downloads are legal placeholders and editable text assets. Supply your own vendor images and project files.</p></aside>
      </div>
    </main>
  );
}
