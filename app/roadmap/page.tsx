import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Flag, Route, Waypoints } from "lucide-react";

import { RoadmapExplorer } from "@/components/roadmap-explorer";
import { careerStages } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Network Engineering Career Roadmap",
  description: "A practical six-stage roadmap from networking foundations to senior network engineering.",
  alternates: { canonical: "/roadmap" },
};

export default function RoadmapPage() {
  return (
    <main>
      <section className="inner-hero roadmap-hero">
        <div className="page-shell">
          <div className="inner-hero-copy">
            <div className="hero-status"><span className="status-dot" />CAREER ROUTE · SIX STAGES</div>
            <h1>Your route into<br /><span>network engineering.</span></h1>
            <p>Every stage answers four questions: where you are now, what to learn next, why it matters on the job, and what you must know first.</p>
          </div>
          <div className="roadmap-summary-panel">
            <div><Route aria-hidden="true" /><span>ROUTE STATUS</span><strong>VALID</strong></div>
            <dl>
              <div><dt>Stages</dt><dd>06</dd></div>
              <div><dt>Mapped skills</dt><dd>{careerStages.reduce((total, stage) => total + stage.skills.length, 0)}</dd></div>
              <div><dt>Practice labs</dt><dd>{careerStages.reduce((total, stage) => total + stage.labs, 0)}</dd></div>
              <div><dt>End state</dt><dd>SENIOR</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="roadmap-control-section">
        <div className="page-shell">
          <div className="roadmap-control-heading">
            <span>INTERACTIVE PATH INSPECTOR</span>
            <h2>Select a stage to inspect its skills, prerequisites, and outcome.</h2>
          </div>
          <RoadmapExplorer />
        </div>
      </section>

      <section className="full-route-section">
        <div className="page-shell">
          <div className="full-route-heading">
            <div><Waypoints aria-hidden="true" /><span>FULL ROUTE TABLE</span></div>
            <h2>Progress compounds.<br />Nothing is a disconnected course.</h2>
          </div>
          <div className="full-route-table">
            {careerStages.map((stage, index) => (
              <article id={stage.id} data-tone={stage.tone} key={stage.id}>
                <div className="full-route-index"><span>{stage.number}</span><i />{index < careerStages.length - 1 && <b />}</div>
                <div className="full-route-main">
                  <div><small>{stage.level}</small><h3>{stage.title}</h3><p>{stage.description}</p></div>
                  <div className="full-route-outcome"><span>EXIT CAPABILITY</span><p>{stage.outcome}</p></div>
                </div>
                <div className="full-route-skills">{stage.skills.slice(0, 6).map((skill) => <span key={skill}>{skill}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="roadmap-principle-section">
        <div className="page-shell roadmap-principle-grid">
          <div>
            <span><Flag aria-hidden="true" /> THE NETPATH PRINCIPLE</span>
            <h2>Configuration is only one-third of the job.</h2>
          </div>
          <div className="principle-list">
            <p><CheckCircle2 aria-hidden="true" /><span><b>Understand</b> what the protocol or system is doing.</span></p>
            <p><CheckCircle2 aria-hidden="true" /><span><b>Verify</b> the result with evidence, not assumptions.</span></p>
            <p><CheckCircle2 aria-hidden="true" /><span><b>Troubleshoot</b> from the failure domain inward.</span></p>
          </div>
        </div>
        <div className="page-shell roadmap-next-cta">
          <span>READY TO ENTER THE PATH?</span>
          <Link className="np-button np-button-primary" href="/learn">Open learning systems <ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}

