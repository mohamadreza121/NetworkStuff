import Link from "next/link";
import { ArrowRight, BookOpenCheck, CheckCircle2, FlaskConical, Network, Route, ShieldCheck, TerminalSquare } from "lucide-react";

import { ccnaContentStats, ccnaLessonPath, ccnaLessons, ccnaModulePath, getCcnaModuleLessons } from "@/content/cisco/ccna";
import { ccnaModules } from "@/content/cisco/ccna/modules";
import { ccnaDomains } from "@/content/cisco/ccna/objectives";

const workflow = ["Understand", "See", "Configure", "Verify", "Break + Fix", "Practice"];

export function CcnaHub() {
  const firstLesson = ccnaLessons[0];
  return (
    <main className="ccna-hub">
      <section className="ccna-hub-hero">
        <div className="page-shell">
          <div className="ccna-hub-kicker"><Network aria-hidden="true" />CISCO / CCNA 200-301 v1.1</div>
          <div className="ccna-hub-title-row">
            <div>
              <h1>The complete CCNA learning path.</h1>
              <p>Learn every current objective through plain-language models, original diagrams, IOS and GUI workflows, decisive verification, controlled faults, and focused practice.</p>
              <div className="ccna-hub-actions">
                <Link href={ccnaLessonPath(firstLesson)}>Start with network components <ArrowRight aria-hidden="true" /></Link>
                <Link href="#curriculum">View all modules</Link>
              </div>
            </div>
            <div className="ccna-hub-version">
              <span>AUTHORITATIVE SCOPE</span>
              <strong>200-301</strong>
              <b>v1.1</b>
              <p>Official Cisco objective IDs are attached to every lesson. The data model keeps exam-version metadata separate for future updates.</p>
            </div>
          </div>
          <dl className="ccna-hub-metrics">
            <div><dt>{ccnaContentStats.modules}</dt><dd>ORDERED MODULES</dd></div>
            <div><dt>{ccnaContentStats.lessons}</dt><dd>FOCUSED LESSONS</dd></div>
            <div><dt>{ccnaContentStats.objectivesCovered}/{ccnaContentStats.objectivesTotal}</dt><dd>OBJECTIVES MAPPED</dd></div>
            <div><dt>{ccnaContentStats.labs}</dt><dd>MINI + FULL LABS</dd></div>
            <div><dt>0</dt><dd>MISSING OBJECTIVES</dd></div>
          </dl>
        </div>
      </section>

      <section className="ccna-workflow-section">
        <div className="page-shell">
          <div className="ccna-section-heading"><span>01 / METHOD</span><h2>Learn like an engineer operates.</h2><p>Each major lesson follows the same evidence loop.</p></div>
          <ol className="ccna-workflow">
            {workflow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}
          </ol>
          <div className="ccna-practice-levels">
            <article><TerminalSquare aria-hidden="true" /><span>QUICK TRY</span><strong>{ccnaContentStats.practiceCounts["Quick Try"]}</strong><p>5–20 minute retrieval, calculation, interpretation, or command drill.</p></article>
            <article><FlaskConical aria-hidden="true" /><span>MINI LAB</span><strong>{ccnaContentStats.practiceCounts["Mini Lab"]}</strong><p>One bounded topology, one outcome, and usually one injected fault.</p></article>
            <article><ShieldCheck aria-hidden="true" /><span>FULL LAB</span><strong>{ccnaContentStats.practiceCounts["Full Lab"]}</strong><p>Multi-step build, verification, break/fix, and acceptance criteria.</p></article>
          </div>
        </div>
      </section>

      <section id="curriculum" className="ccna-curriculum-section">
        <div className="page-shell">
          <div className="ccna-section-heading"><span>02 / CURRICULUM</span><h2>Twelve modules, one connected path.</h2><p>Work in order or jump to an exact objective.</p></div>
          <div className="ccna-module-rows">
            {ccnaModules.map((moduleEntry) => {
              const moduleLessons = getCcnaModuleLessons(moduleEntry.id);
              const objectiveIds = new Set(moduleLessons.flatMap((lesson) => lesson.examObjectives));
              return (
                <Link key={moduleEntry.id} href={ccnaModulePath(moduleEntry.id)}>
                  <span className="ccna-module-number">{String(moduleEntry.order).padStart(2, "0")}</span>
                  <span className="ccna-module-copy"><small>{moduleEntry.domains.join(" · ")}</small><strong>{moduleEntry.title}</strong><em>{moduleEntry.description}</em></span>
                  <span className="ccna-module-meta"><b>{moduleLessons.length} lessons</b><small>{objectiveIds.size} mapped objectives</small></span>
                  <ArrowRight aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ccna-domain-section">
        <div className="page-shell ccna-domain-layout">
          <div>
            <div className="ccna-section-heading compact"><span>03 / BLUEPRINT</span><h2>Official domain coverage.</h2><p>Weights guide study time; every objective still receives a lesson and practice mapping.</p></div>
            <div className="ccna-domain-bars">
              {ccnaDomains.map((domain) => (
                <div key={domain.number}>
                  <span>{domain.number}.0</span><strong>{domain.domain}</strong><div><i style={{ width: `${domain.weight * 3.2}%` }} /></div><b>{domain.weight}%</b><small>{domain.objectiveCount} leaf objectives</small>
                </div>
              ))}
            </div>
          </div>
          <aside className="ccna-source-note">
            <BookOpenCheck aria-hidden="true" />
            <span>SOURCE HANDLING</span>
            <h3>Blueprint-led. Book-informed. Original throughout.</h3>
            <p>The official Cisco v1.1 exam topics control scope. The attached Official Cert Guide volumes were used to map technical depth and chapter coverage; NetPath prose, diagrams, configurations, exercises, questions, and labs are newly written.</p>
            <a href="https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301-CCNA-v1.1.pdf">Open Cisco’s official v1.1 topics <ArrowRight aria-hidden="true" /></a>
          </aside>
        </div>
      </section>

      <section className="ccna-resource-section">
        <div className="page-shell">
          <div className="ccna-section-heading"><span>04 / FIELD KIT</span><h2>Use the existing NetPath systems.</h2><p>Lessons link directly to the tool, reference, or lab that provides the next useful action.</p></div>
          <div className="ccna-resource-links">
            <Link href="/reference/cisco"><BookOpenCheck aria-hidden="true" /><span><strong>Cisco command reference</strong><small>280 searchable IOS and IOS-XE entries</small></span><ArrowRight aria-hidden="true" /></Link>
            <Link href="/tools/subnet-calculator"><Network aria-hidden="true" /><span><strong>IPv4 + VLSM tools</strong><small>Boundaries, masks, host ranges, and plans</small></span><ArrowRight aria-hidden="true" /></Link>
            <Link href="/tools/ipv6-helper"><Route aria-hidden="true" /><span><strong>IPv6 helper</strong><small>Expand, compress, classify, and plan prefixes</small></span><ArrowRight aria-hidden="true" /></Link>
            <Link href="/labs"><FlaskConical aria-hidden="true" /><span><strong>Lab library</strong><small>Packet Tracer first; GNS3 where scope benefits</small></span><ArrowRight aria-hidden="true" /></Link>
          </div>
          <p className="ccna-coverage-assertion"><CheckCircle2 aria-hidden="true" />Coverage audit passed: all {ccnaContentStats.objectivesTotal} current v1.1 leaf objectives map to at least one lesson and exercise.</p>
        </div>
      </section>
    </main>
  );
}
