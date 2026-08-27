import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, Network, ShieldCheck } from "lucide-react";

import { DownloadCard } from "@/components/download-card";
import { TopologyPanel } from "@/components/topology-panel";
import type { Project } from "@/content/schema";

const sectionOrder = ["switching", "routing", "security", "services", "automation", "validation", "troubleshooting"] as const;

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <main className="project-detail-page">
      <section className="project-detail-hero">
        <div className="page-shell">
          <Link href={`/projects/${project.platform.toLowerCase().replace(/ /g, "-")}`} className="back-link"><ArrowLeft aria-hidden="true" /> {project.platform} projects</Link>
          <div className="project-detail-hero-grid">
            <div>
              <span className="phase3-eyebrow"><i className="status-dot" />ENTERPRISE LAB / {project.platform.toUpperCase()}</span>
              <h1>{project.title}</h1>
              <p>{project.summary}</p>
              <div className="project-detail-technologies">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
            </div>
            <dl className="project-spec-block">
              <div><dt>{project.devices}</dt><dd>DEVICES</dd></div><div><dt>{project.sites}</dt><dd>SITES</dd></div>
              <div><dt>{project.level}</dt><dd>LEVEL</dd></div><div><dt>{project.estimatedMinutes}m</dt><dd>BUILD TIME</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="project-detail-content">
        <div className="page-shell project-detail-layout">
          <aside className="project-detail-index" aria-label="Project sections">
            <span>CASE STUDY</span>
            {["architecture", "objectives", "addressing", ...sectionOrder, "downloads"].map((section, index) => <a href={`#${section}`} key={section}><b>{String(index + 1).padStart(2, "0")}</b>{section}</a>)}
          </aside>
          <div className="project-detail-main">
            <TopologyPanel label={`${project.platform.toUpperCase()} / TOPOLOGY PREVIEW`} caption={project.topology.caption} nodes={project.topology.nodes} links={project.topology.links} />

            <section id="architecture" className="project-doc-section"><span>01 / ARCHITECTURE</span><h2>Design before configuration.</h2>{project.architecture.map((item) => <p key={item}>{item}</p>)}</section>
            <section id="objectives" className="project-doc-section two-column-doc"><div><span>02 / OBJECTIVES</span><h2>Engineering outcomes</h2><ul>{project.objectives.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" />{item}</li>)}</ul></div><div><span>SKILLS PRACTICED</span><ul>{project.skills.map((item) => <li key={item}><Network aria-hidden="true" />{item}</li>)}</ul></div></section>
            <section id="addressing" className="project-doc-section"><span>03 / ADDRESSING</span><h2>Documented allocation</h2><div className="address-table"><table><thead><tr><th>Segment</th><th>Prefix</th><th>Purpose</th></tr></thead><tbody>{project.addressing.map((row) => <tr key={row.segment}><td>{row.segment}</td><td><code>{row.prefix}</code></td><td>{row.purpose}</td></tr>)}</tbody></table></div></section>

            <div className="project-engineering-grid">
              {sectionOrder.map((section, index) => <section id={section} className="project-engineering-section" key={section}><span>{String(index + 4).padStart(2, "0")} / {section.toUpperCase()}</span><h2>{section === "troubleshooting" ? "Failure analysis" : `${section[0].toUpperCase()}${section.slice(1)} plan`}</h2><ul>{project.sections[section].map((item) => <li key={item}>{item}</li>)}</ul></section>)}
            </div>

            <section id="downloads" className="project-doc-section project-download-section">
              <span>11 / DOWNLOADS</span><h2>Practice first. Compare when ready.</h2>
              <div className="project-download-grid">
                <div><strong><Clock3 aria-hidden="true" /> PRACTICE VERSION</strong><p>Topology, addressing plan, requirements, and a minimal configuration starting point.</p><DownloadCard title="Practice manifest" description="Safe project scaffold—no appliance images." href={project.downloads.practice} format="TXT" /></div>
                <div><strong><ShieldCheck aria-hidden="true" /> COMPLETED VERSION</strong><p>Completed configuration checklist, verification evidence, and troubleshooting notes.</p><DownloadCard title="Completed manifest" description="Documentation and validation checklist." href={project.downloads.solution} format="TXT" /></div>
              </div>
            </section>

            <section className="related-resource-row"><div><span>RELATED LESSONS</span>{project.relatedLessons.map((item) => <Link href={item.href} key={item.href}>{item.label}<ArrowRight aria-hidden="true" /></Link>)}</div><div><span>RELATED LABS</span>{project.relatedLabs.map((item) => <Link href={item.href} key={item.href}>{item.label}<ArrowRight aria-hidden="true" /></Link>)}</div></section>
          </div>
        </div>
      </section>
    </main>
  );
}
