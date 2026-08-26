import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Download,
  FlaskConical,
  Network,
  ShieldAlert,
} from "lucide-react";

import {
  CurriculumNavigation,
  MobileDocsNavigation,
  OnThisPage,
  type TocItem,
} from "@/components/docs-navigation";
import { TerminalBlock } from "@/components/terminal-block";
import type { Lesson } from "@/lib/lessons";

const toc: TocItem[] = [
  { id: "objectives", label: "Objectives" },
  { id: "overview", label: "Overview" },
  { id: "terminology", label: "Terminology" },
  { id: "diagram", label: "Diagram" },
  { id: "configuration", label: "Configuration" },
  { id: "verification", label: "Verification" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "real-world", label: "Real-world use" },
  { id: "interview", label: "Interview questions" },
  { id: "lab", label: "Lab" },
];

function LessonTopology({ lesson }: { lesson: Lesson }) {
  return (
    <figure className="lesson-topology">
      <div className="lesson-topology-toolbar">
        <span><i className="status-dot" />{lesson.diagram.label}</span>
        <small>TOPOLOGY PLACEHOLDER</small>
      </div>
      <div className="lesson-topology-canvas">
        {lesson.diagram.nodes.map((node, index) => (
          <div className="lesson-node-wrap" key={node}>
            <div className="lesson-node" data-node={index + 1}>
              <Network aria-hidden="true" />
              <span>{node}</span>
              <small>UP · AREA 0</small>
            </div>
            {index < lesson.diagram.nodes.length - 1 && (
              <div className="lesson-link" aria-hidden="true"><i /><span>{index + 1}0.0.{index + 1}.0/30</span></div>
            )}
          </div>
        ))}
      </div>
      <figcaption>{lesson.diagram.caption}</figcaption>
    </figure>
  );
}

export function LessonArticle({ lesson }: { lesson: Lesson }) {
  const currentPath = `/learn/${lesson.slug.join("/")}`;

  return (
    <>
      <MobileDocsNavigation currentPath={currentPath} toc={toc} />
      <div className="docs-layout">
        <aside className="docs-sidebar"><CurriculumNavigation currentPath={currentPath} /></aside>

        <article className="lesson-article">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/learn">Learn</Link><ChevronRight aria-hidden="true" />
            <Link href="/learn">{lesson.technology}</Link><ChevronRight aria-hidden="true" />
            <span>{lesson.title}</span>
          </nav>

          <header className="lesson-header">
            <div className="lesson-eyebrow"><span className="status-dot" />{lesson.eyebrow}</div>
            <h1>{lesson.title}</h1>
            <p>{lesson.description}</p>
            <div className="lesson-meta">
              <span>{lesson.level}</span>
              {lesson.certification && <span>{lesson.certification}</span>}
              <span><Clock3 aria-hidden="true" />{lesson.estimatedTime}</span>
              <span className="placeholder-status">{lesson.status}</span>
            </div>
          </header>

          <div className="lesson-prerequisites">
            <div><BookOpenCheck aria-hidden="true" /><strong>Prerequisites</strong></div>
            <p>{lesson.prerequisites.join(" · ")}</p>
          </div>

          <section id="objectives" className="lesson-section">
            <div className="lesson-section-label"><span>01</span>OBJECTIVES</div>
            <h2>What you will be able to do</h2>
            <ul className="objective-list">
              {lesson.objectives.map((objective) => (
                <li key={objective}><CheckCircle2 aria-hidden="true" />{objective}</li>
              ))}
            </ul>
          </section>

          <section id="overview" className="lesson-section">
            <div className="lesson-section-label"><span>02</span>OVERVIEW</div>
            <h2>Build the mental model first</h2>
            {lesson.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>

          <section id="terminology" className="lesson-section">
            <div className="lesson-section-label"><span>03</span>TERMINOLOGY</div>
            <h2>Terms you need in the room</h2>
            <dl className="terminology-grid">
              {lesson.terminology.map((item) => (
                <div key={item.term}><dt>{item.term}</dt><dd>{item.definition}</dd></div>
              ))}
            </dl>
          </section>

          <section id="diagram" className="lesson-section">
            <div className="lesson-section-label"><span>04</span>DIAGRAM</div>
            <h2>See the system</h2>
            <LessonTopology lesson={lesson} />
          </section>

          <section id="configuration" className="lesson-section">
            <div className="lesson-section-label"><span>05</span>CONFIGURATION</div>
            <h2>Configure with intent</h2>
            <TerminalBlock {...lesson.command} />
            <div className="command-explanation-grid">
              {lesson.command.explanation.map((item) => (
                <div key={item.label}><strong>{item.label}</strong><p>{item.text}</p></div>
              ))}
            </div>
          </section>

          <section id="verification" className="lesson-section">
            <div className="lesson-section-label"><span>06</span>VERIFICATION</div>
            <h2>Prove the result</h2>
            <p>{lesson.verification.intro}</p>
            <TerminalBlock
              title={`${lesson.technology} · verification`}
              prompt={lesson.verification.prompt}
              code={lesson.verification.code}
              variant={lesson.command.variant}
            />
            <ol className="verification-list">
              {lesson.verification.checks.map((check, index) => (
                <li key={check}><span>0{index + 1}</span>{check}</li>
              ))}
            </ol>
          </section>

          <section id="troubleshooting" className="lesson-section">
            <div className="lesson-section-label"><span>07</span>TROUBLESHOOTING</div>
            <h2>Work from evidence</h2>
            <div className="troubleshooting-table" role="table" aria-label="Troubleshooting scenarios">
              <div role="row" className="troubleshooting-head">
                <span role="columnheader">Symptom</span><span role="columnheader">Check</span><span role="columnheader">Why</span>
              </div>
              {lesson.troubleshooting.map((item) => (
                <div role="row" key={item.symptom}>
                  <strong role="cell"><ShieldAlert aria-hidden="true" />{item.symptom}</strong>
                  <span role="cell">{item.check}</span>
                  <span role="cell">{item.reason}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="real-world" className="lesson-section real-world-panel">
            <div className="lesson-section-label"><span>08</span>REAL-WORLD USE</div>
            <h2>Where this earns its place</h2>
            <p>{lesson.realWorld}</p>
          </section>

          <section id="interview" className="lesson-section">
            <div className="lesson-section-label"><span>09</span>INTERVIEW QUESTIONS</div>
            <h2>Explain it under pressure</h2>
            <div className="interview-list">
              {lesson.interviewQuestions.map((item, index) => (
                <details key={item.question}>
                  <summary><span>Q{index + 1}</span>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="lab" className="lesson-section lab-callout">
            <div className="lab-callout-icon"><FlaskConical aria-hidden="true" /></div>
            <div>
              <div className="lesson-section-label"><span>10</span>LAB</div>
              <h2>{lesson.lab.title}</h2>
              <p>{lesson.lab.description}</p>
              <ul>{lesson.lab.tasks.map((task) => <li key={task}>{task}</li>)}</ul>
              <button type="button" disabled title={lesson.lab.availability}><Download aria-hidden="true" /> Starter files · Phase 2</button>
            </div>
          </section>

          {lesson.next && (
            <Link className="next-lesson" href={lesson.next.href}>
              <span><small>NEXT ROUTE</small><strong>{lesson.next.label}</strong><em>{lesson.next.meta}</em></span>
              <ArrowRight aria-hidden="true" />
            </Link>
          )}
        </article>

        <aside className="docs-toc"><OnThisPage toc={toc} /></aside>
      </div>
    </>
  );
}

