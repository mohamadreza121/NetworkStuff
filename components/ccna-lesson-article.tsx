import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpenCheck, CheckCircle2, ChevronRight, Clock3, FlaskConical, Lightbulb, ShieldAlert, Wrench } from "lucide-react";

import { CcnaCurriculumNavigation, CcnaMobileNavigation } from "@/components/ccna-navigation";
import { ContentCallout } from "@/components/content-callout";
import { OnThisPage, type TocItem } from "@/components/docs-navigation";
import { TerminalBlock } from "@/components/terminal-block";
import { TopologyPanel } from "@/components/topology-panel";
import { ccnaLessonPath, ccnaLessons, ccnaModulePath } from "@/content/cisco/ccna";
import { ccnaModuleById } from "@/content/cisco/ccna/modules";
import { ccnaObjectiveById } from "@/content/cisco/ccna/objectives";
import type { CcnaLesson } from "@/content/cisco/ccna/types";

const toc: TocItem[] = [
  { id: "outcomes", label: "Outcomes" },
  { id: "understand", label: "Understand" },
  { id: "terms", label: "Key terms" },
  { id: "see", label: "See the path" },
  { id: "configure", label: "Configure" },
  { id: "verify", label: "Verify" },
  { id: "break-fix", label: "Break + fix" },
  { id: "exam", label: "Exam + field" },
  { id: "practice", label: "Practice" },
  { id: "check", label: "Check understanding" },
  { id: "resources", label: "References" },
];

function SmartLink({ href, children }: { href: string; children: React.ReactNode }) {
  return href.startsWith("http") ? <a href={href}>{children}</a> : <Link href={href}>{children}</Link>;
}

export function CcnaLessonArticle({ lesson }: { lesson: CcnaLesson }) {
  const moduleEntry = ccnaModuleById.get(lesson.moduleId);
  if (!moduleEntry) return null;
  const currentPath = ccnaLessonPath(lesson);
  const currentIndex = ccnaLessons.findIndex((item) => item.id === lesson.id);
  const previous = ccnaLessons[currentIndex - 1];
  const next = ccnaLessons[currentIndex + 1];
  const variant = lesson.command.prompt === "$" ? "automation" : "cisco";
  return (
    <>
      <CcnaMobileNavigation currentPath={currentPath} toc={toc} />
      <div className="docs-layout ccna-lesson-layout">
        <aside className="docs-sidebar ccna-lesson-sidebar"><CcnaCurriculumNavigation currentPath={currentPath} /></aside>
        <article className="lesson-article ccna-lesson-article">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/learn">Learn</Link><ChevronRight aria-hidden="true" />
            <Link href="/learn/cisco/ccna">CCNA</Link><ChevronRight aria-hidden="true" />
            <Link href={ccnaModulePath(moduleEntry.id)}>{moduleEntry.shortTitle}</Link><ChevronRight aria-hidden="true" /><span>{lesson.title}</span>
          </nav>
          <header className="lesson-header ccna-lesson-header">
            <div className="lesson-eyebrow"><span className="status-dot" />MODULE {String(moduleEntry.order).padStart(2, "0")} · LESSON {String(lesson.order).padStart(2, "0")}</div>
            <h1>{lesson.title}</h1>
            <p>{lesson.summary}</p>
            <div className="lesson-meta">
              <span>{lesson.level}</span><span>CCNA {lesson.examVersion}</span><span><Clock3 aria-hidden="true" />{lesson.estimatedMinutes} min</span><span className="ccna-practice-meta"><FlaskConical aria-hidden="true" />{lesson.practice.level}</span>
            </div>
            <div className="ccna-objective-tags" aria-label="Cisco exam objectives">
              {lesson.examObjectives.map((id) => <span key={id}><b>{id}</b>{ccnaObjectiveById.get(id)?.verb}</span>)}
            </div>
          </header>

          <section className="lesson-prerequisites ccna-prerequisites"><div><BookOpenCheck aria-hidden="true" /><strong>Prerequisites</strong></div><p>{lesson.prerequisites.join(" · ")}</p></section>

          <section id="outcomes" className="lesson-section">
            <div className="lesson-section-label"><span>01</span>OUTCOMES</div><h2>What you will be able to do</h2>
            <ul className="objective-list">{lesson.outcomes.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" />{item}</li>)}</ul>
          </section>

          <section id="understand" className="lesson-section">
            <div className="lesson-section-label"><span>02</span>UNDERSTAND</div><h2>Build the operating model</h2>
            <p>{lesson.whyItMatters}</p>
            <div className="ccna-mental-model"><Lightbulb aria-hidden="true" /><div><span>MENTAL MODEL</span><p>{lesson.mentalModel}</p></div></div>
            <div className="ccna-mechanics-grid">{lesson.mechanics.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div>
          </section>

          <section id="terms" className="lesson-section">
            <div className="lesson-section-label"><span>03</span>KEY TERMS</div><h2>Use exact engineering language</h2>
            <dl className="terminology-grid">{lesson.terminology.map((item) => <div key={item.term}><dt>{item.term}</dt><dd>{item.definition}</dd></div>)}</dl>
          </section>

          <section id="see" className="lesson-section">
            <div className="lesson-section-label"><span>04</span>SEE</div><h2>Trace the decision path</h2>
            <TopologyPanel {...lesson.diagram} />
          </section>

          <section id="configure" className="lesson-section">
            <div className="lesson-section-label"><span>05</span>CONFIGURE + INTERPRET</div><h2>Work from intent</h2>
            <TerminalBlock title={lesson.command.title} prompt={lesson.command.prompt} code={lesson.command.code} variant={variant} />
            <div className="command-explanation-grid">{lesson.command.explanation.map((item) => <div key={item.label}><strong>{item.label}</strong><p>{item.text}</p></div>)}</div>
          </section>

          <section id="verify" className="lesson-section">
            <div className="lesson-section-label"><span>06</span>VERIFY</div><h2>Prove the result</h2>
            <p>{lesson.verification.intro}</p>
            <TerminalBlock title={`${moduleEntry.shortTitle} · verification`} prompt={lesson.command.prompt} code={lesson.verification.code} variant={variant} />
            <div className="ccna-expected-output"><span>EXPECTED SIGNALS</span><ul>{lesson.verification.expected.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" />{item}</li>)}</ul></div>
            <ol className="verification-list">{lesson.verification.checks.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
          </section>

          <section id="break-fix" className="lesson-section">
            <div className="lesson-section-label"><span>07</span>BREAK + FIX</div><h2>Recognize the common failure shapes</h2>
            <div className="ccna-mistakes"><span>COMMON MISTAKES</span><ul>{lesson.mistakes.map((item) => <li key={item}><ShieldAlert aria-hidden="true" />{item}</li>)}</ul></div>
            <div className="troubleshooting-table ccna-troubleshooting" role="table" aria-label="Troubleshooting scenarios">
              <div role="row" className="troubleshooting-head"><span role="columnheader">Symptom</span><span role="columnheader">Check</span><span role="columnheader">Smallest fix</span></div>
              {lesson.troubleshooting.map((item) => <div role="row" key={item.symptom}><strong role="cell"><Wrench aria-hidden="true" />{item.symptom}</strong><span role="cell">{item.check}</span><span role="cell">{item.fix}</span></div>)}
            </div>
          </section>

          <section id="exam" className="lesson-section ccna-focus-grid">
            <ContentCallout tone="note" title={`Exam focus · ${lesson.examObjectives.join(", ")}`}>{lesson.examFocus}</ContentCallout>
            <ContentCallout tone="success" title="Real-world use">{lesson.realWorld}</ContentCallout>
          </section>

          <section id="practice" className="lesson-section ccna-practice-panel">
            <div className="ccna-practice-icon"><FlaskConical aria-hidden="true" /></div>
            <div>
              <div className="lesson-section-label"><span>08</span>{lesson.practice.level.toUpperCase()} · {lesson.practice.durationMinutes} MIN</div>
              <h2>{lesson.practice.title}</h2><p>{lesson.practice.scenario}</p>
              {lesson.practice.injectedFault && <div className="ccna-fault-chip"><ShieldAlert aria-hidden="true" /><span><b>Injected fault</b>{lesson.practice.injectedFault}</span></div>}
              <ol>{lesson.practice.tasks.map((task, index) => <li key={task}><span>{String(index + 1).padStart(2, "0")}</span>{task}</li>)}</ol>
              <div className="ccna-success-criteria"><span>SUCCESS CRITERIA</span>{lesson.practice.successCriteria.map((item) => <p key={item}><CheckCircle2 aria-hidden="true" />{item}</p>)}</div>
              {lesson.practice.href && <Link href={lesson.practice.href}>Open related practice resource <ArrowRight aria-hidden="true" /></Link>}
            </div>
          </section>

          <section id="check" className="lesson-section">
            <div className="lesson-section-label"><span>09</span>CHECK UNDERSTANDING</div><h2>Explain it without the notes</h2>
            <div className="interview-list ccna-check-list">{lesson.checkUnderstanding.map((item, index) => <details key={item.question}><summary><span>Q{index + 1}</span>{item.question}</summary><p>{item.answer}</p></details>)}</div>
          </section>

          <section id="resources" className="lesson-section">
            <div className="lesson-section-label"><span>10</span>REFERENCES + NEXT ACTIONS</div><h2>Continue from an authoritative source</h2>
            <div className="ccna-reference-list">
              {lesson.references.map((reference, index) => reference.href ? (
                <SmartLink href={reference.href} key={`${reference.label}-${index}`}><span>{reference.kind.toUpperCase()}</span><strong>{reference.label}</strong><ArrowRight aria-hidden="true" /></SmartLink>
              ) : <div key={`${reference.label}-${index}`}><span>{reference.kind.toUpperCase()}</span><strong>{reference.label}</strong><small>Attached source used for topic depth; content is original.</small></div>)}
              {lesson.related.map((item) => <SmartLink href={item.href} key={item.href}><span>{item.kind.toUpperCase()}</span><strong>{item.label}</strong><ArrowRight aria-hidden="true" /></SmartLink>)}
            </div>
          </section>

          <nav className="lesson-pagination ccna-lesson-pagination" aria-label="Adjacent CCNA lessons">
            {previous ? <Link href={ccnaLessonPath(previous)}><ArrowLeft aria-hidden="true" /><span><small>PREVIOUS</small><strong>{previous.title}</strong><em>{ccnaModuleById.get(previous.moduleId)?.shortTitle}</em></span></Link> : <Link href="/learn/cisco/ccna"><ArrowLeft aria-hidden="true" /><span><small>PATH HUB</small><strong>CCNA learning path</strong></span></Link>}
            {next && <Link href={ccnaLessonPath(next)}><span><small>NEXT</small><strong>{next.title}</strong><em>{ccnaModuleById.get(next.moduleId)?.shortTitle}</em></span><ArrowRight aria-hidden="true" /></Link>}
          </nav>
        </article>
        <aside className="docs-toc"><OnThisPage toc={toc} /></aside>
      </div>
    </>
  );
}
