import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpenCheck, CheckCircle2, ChevronRight, Clock3, FlaskConical, Lightbulb, ShieldAlert, Wrench } from "lucide-react";

import { ContentCallout } from "@/components/content-callout";
import { OnThisPage, type TocItem } from "@/components/docs-navigation";
import { LinuxCurriculumNavigation, LinuxMobileNavigation } from "@/components/linux-learning-navigation";
import { TerminalBlock } from "@/components/terminal-block";
import { TopologyPanel } from "@/components/topology-panel";
import { linuxLessonPath, linuxLessons, linuxModulePath } from "@/content/linux/network-engineering";
import { linuxCapabilityById, linuxModuleById } from "@/content/linux/network-engineering/modules";
import type { LinuxLesson } from "@/content/linux/network-engineering/types";

const toc: TocItem[] = [
  { id: "outcomes", label: "Outcomes" },
  { id: "understand", label: "Understand" },
  { id: "terms", label: "Key terms" },
  { id: "see", label: "See the path" },
  { id: "configure", label: "Operate" },
  { id: "verify", label: "Verify" },
  { id: "break-fix", label: "Break + fix" },
  { id: "field-safety", label: "Field + safety" },
  { id: "practice", label: "Practice" },
  { id: "check", label: "Check understanding" },
  { id: "resources", label: "References" },
];

function SmartLink({ href, children }: { href: string; children: React.ReactNode }) {
  return href.startsWith("http") ? <a href={href}>{children}</a> : <Link href={href}>{children}</Link>;
}

export function LinuxLearningLessonArticle({ lesson }: { lesson: LinuxLesson }) {
  const moduleEntry = linuxModuleById.get(lesson.moduleId);
  if (!moduleEntry) return null;
  const currentPath = linuxLessonPath(lesson);
  const currentIndex = linuxLessons.findIndex((item) => item.id === lesson.id);
  const previous = linuxLessons[currentIndex - 1];
  const next = linuxLessons[currentIndex + 1];
  return (
    <>
      <LinuxMobileNavigation currentPath={currentPath} toc={toc} />
      <div className="docs-layout ccna-lesson-layout linux-lesson-layout">
        <aside className="docs-sidebar ccna-lesson-sidebar"><LinuxCurriculumNavigation currentPath={currentPath} /></aside>
        <article className="lesson-article ccna-lesson-article linux-lesson-article">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/learn">Learn</Link><ChevronRight aria-hidden="true" />
            <Link href="/learn/linux">Linux</Link><ChevronRight aria-hidden="true" />
            <Link href={linuxModulePath(moduleEntry.id)}>{moduleEntry.shortTitle}</Link><ChevronRight aria-hidden="true" /><span>{lesson.title}</span>
          </nav>
          <header className="lesson-header ccna-lesson-header">
            <div className="lesson-eyebrow"><span className="status-dot" />MODULE {String(moduleEntry.order).padStart(2, "0")} · LESSON {String(lesson.order).padStart(2, "0")}</div>
            <h1>{lesson.title}</h1>
            <p>{lesson.summary}</p>
            <div className="lesson-meta">
              <span>{lesson.level}</span><span>{lesson.curriculumVersion}</span><span><Clock3 aria-hidden="true" />{lesson.estimatedMinutes} min</span><span className="ccna-practice-meta"><FlaskConical aria-hidden="true" />{lesson.practice.level}</span>
            </div>
            <div className="ccna-objective-tags linux-capability-tags" aria-label="Linux network operations capabilities">
              {lesson.capabilityIds.map((id) => <span key={id}><b>{id}</b>{linuxCapabilityById.get(id)?.title}</span>)}
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
            <div className="lesson-section-label"><span>04</span>SEE</div><h2>Trace the packet or decision path</h2>
            <TopologyPanel {...lesson.diagram} />
          </section>

          <section id="configure" className="lesson-section">
            <div className="lesson-section-label"><span>05</span>OPERATE + INTERPRET</div><h2>Work from intent</h2>
            <TerminalBlock title={lesson.command.title} prompt={lesson.command.prompt} code={lesson.command.code} variant="linux" />
            <div className="command-explanation-grid">{lesson.command.explanation.map((item) => <div key={item.label}><strong>{item.label}</strong><p>{item.text}</p></div>)}</div>
          </section>

          <section id="verify" className="lesson-section">
            <div className="lesson-section-label"><span>06</span>VERIFY</div><h2>Prove the active result</h2>
            <p>{lesson.verification.intro}</p>
            <TerminalBlock title={`${moduleEntry.shortTitle} · verification`} prompt={lesson.command.prompt} code={lesson.verification.code} variant="linux" />
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

          <section id="field-safety" className="lesson-section ccna-focus-grid linux-focus-grid">
            <ContentCallout tone="warning" title="Safety boundary">{lesson.safetyNotes.join(" ")}</ContentCallout>
            <ContentCallout tone="success" title="Field use">{lesson.fieldUse}</ContentCallout>
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
            <div className="lesson-section-label"><span>10</span>REFERENCES + NEXT ACTIONS</div><h2>Continue from a primary source</h2>
            <div className="ccna-reference-list">
              {lesson.references.map((reference, index) => <SmartLink href={reference.href} key={`${reference.label}-${index}`}><span>{reference.kind.toUpperCase()}</span><strong>{reference.label}</strong><ArrowRight aria-hidden="true" /></SmartLink>)}
              {lesson.related.map((item) => <SmartLink href={item.href} key={item.href}><span>{item.kind.toUpperCase()}</span><strong>{item.label}</strong><ArrowRight aria-hidden="true" /></SmartLink>)}
            </div>
          </section>

          <nav className="lesson-pagination ccna-lesson-pagination" aria-label="Adjacent Linux lessons">
            {previous ? <Link href={linuxLessonPath(previous)}><ArrowLeft aria-hidden="true" /><span><small>PREVIOUS</small><strong>{previous.title}</strong><em>{linuxModuleById.get(previous.moduleId)?.shortTitle}</em></span></Link> : <Link href="/learn/linux"><ArrowLeft aria-hidden="true" /><span><small>PATH HUB</small><strong>Linux network operations</strong></span></Link>}
            {next && <Link href={linuxLessonPath(next)}><span><small>NEXT</small><strong>{next.title}</strong><em>{linuxModuleById.get(next.moduleId)?.shortTitle}</em></span><ArrowRight aria-hidden="true" /></Link>}
          </nav>
        </article>
        <aside className="docs-toc"><OnThisPage toc={toc} /></aside>
      </div>
    </>
  );
}
