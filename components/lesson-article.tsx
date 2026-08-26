import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpenCheck, CheckCircle2, ChevronRight, Clock3, FlaskConical, ShieldAlert } from "lucide-react";

import { ContentCallout } from "@/components/content-callout";
import { CurriculumNavigation, MobileDocsNavigation, OnThisPage, type TocItem } from "@/components/docs-navigation";
import { DownloadCard } from "@/components/download-card";
import { TerminalBlock } from "@/components/terminal-block";
import { TopologyPanel } from "@/components/topology-panel";
import { VideoPlaceholder } from "@/components/video-placeholder";
import type { Lesson } from "@/content/schema";

const toc: TocItem[] = [
  { id: "prerequisites", label: "Prerequisites" }, { id: "objectives", label: "Objectives" },
  { id: "overview", label: "Overview" }, { id: "terminology", label: "Terminology" },
  { id: "diagram", label: "Diagram" }, { id: "field-notes", label: "Field notes" },
  { id: "configuration", label: "Configuration" }, { id: "command-notes", label: "Command notes" },
  { id: "verification", label: "Verification" }, { id: "troubleshooting", label: "Troubleshooting" },
  { id: "real-world", label: "Real-world use" }, { id: "interview", label: "Interview questions" },
  { id: "lab", label: "Practice lab" }, { id: "resources", label: "Resources" },
];

export function LessonArticle({ lesson }: { lesson: Lesson }) {
  const currentPath = `/learn/${lesson.slug.join("/")}`;
  return <><MobileDocsNavigation currentPath={currentPath} toc={toc} /><div className="docs-layout"><aside className="docs-sidebar"><CurriculumNavigation currentPath={currentPath} /></aside><article className="lesson-article">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/learn">Learn</Link><ChevronRight aria-hidden="true" /><Link href={`/learn/${lesson.slug[0]}`}>{lesson.technology}</Link><ChevronRight aria-hidden="true" /><span>{lesson.title}</span></nav>
    <header className="lesson-header"><div className="lesson-eyebrow"><span className="status-dot" />{lesson.eyebrow}</div><h1>{lesson.title}</h1><p>{lesson.description}</p><div className="lesson-meta"><span>{lesson.level}</span>{lesson.certification && <span>{lesson.certification}</span>}<span><Clock3 aria-hidden="true" />{lesson.estimatedTime}</span><span className="placeholder-status">{lesson.status}</span></div></header>
    <section id="prerequisites" className="lesson-prerequisites"><div><BookOpenCheck aria-hidden="true" /><strong>Prerequisites</strong></div><p>{lesson.prerequisites.join(" · ")}</p></section>
    <section id="objectives" className="lesson-section"><div className="lesson-section-label"><span>02</span>OBJECTIVES</div><h2>What you will be able to do</h2><ul className="objective-list">{lesson.objectives.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" />{item}</li>)}</ul></section>
    <section id="overview" className="lesson-section"><div className="lesson-section-label"><span>03</span>OVERVIEW</div><h2>Build the mental model first</h2>{lesson.overview.map((item) => <p key={item}>{item}</p>)}</section>
    <section id="terminology" className="lesson-section"><div className="lesson-section-label"><span>04</span>TERMINOLOGY</div><h2>Terms you need in the room</h2><dl className="terminology-grid">{lesson.terminology.map((item) => <div key={item.term}><dt>{item.term}</dt><dd>{item.definition}</dd></div>)}</dl></section>
    {lesson.diagram && <section id="diagram" className="lesson-section"><div className="lesson-section-label"><span>05</span>DIAGRAM</div><h2>See the operating path</h2><TopologyPanel {...lesson.diagram} /></section>}
    <section id="field-notes" className="lesson-section lesson-callout-stack"><div className="lesson-section-label"><span>06</span>FIELD NOTES</div>{lesson.callouts?.map((item) => <ContentCallout key={item.title} tone={item.tone} title={item.title}>{item.body}</ContentCallout>)}</section>
    <section id="configuration" className="lesson-section"><div className="lesson-section-label"><span>07</span>CONFIGURATION</div><h2>Configure with intent</h2><TerminalBlock {...lesson.command} /></section>
    <section id="command-notes" className="lesson-section command-notes-section"><div className="lesson-section-label"><span>08</span>COMMAND NOTES</div><h2>Understand each decision</h2><div className="command-explanation-grid">{lesson.command.explanation.map((item) => <div key={item.label}><strong>{item.label}</strong><p>{item.text}</p></div>)}</div></section>
    <section id="verification" className="lesson-section"><div className="lesson-section-label"><span>09</span>VERIFICATION</div><h2>Prove the result</h2><p>{lesson.verification.intro}</p><TerminalBlock title={`${lesson.technology} · verification`} prompt={lesson.verification.prompt} code={lesson.verification.code} variant={lesson.command.variant} /><ol className="verification-list">{lesson.verification.checks.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></section>
    <section id="troubleshooting" className="lesson-section"><div className="lesson-section-label"><span>10</span>TROUBLESHOOTING</div><h2>Work from evidence</h2><div className="troubleshooting-table" role="table" aria-label="Troubleshooting scenarios"><div role="row" className="troubleshooting-head"><span role="columnheader">Symptom</span><span role="columnheader">Check</span><span role="columnheader">Why</span></div>{lesson.troubleshooting.map((item) => <div role="row" key={item.symptom}><strong role="cell"><ShieldAlert aria-hidden="true" />{item.symptom}</strong><span role="cell">{item.check}</span><span role="cell">{item.reason}</span></div>)}</div></section>
    <section id="real-world" className="lesson-section real-world-panel"><div className="lesson-section-label"><span>11</span>REAL-WORLD USE</div><h2>Where this earns its place</h2><p>{lesson.realWorld}</p></section>
    <section id="interview" className="lesson-section"><div className="lesson-section-label"><span>12</span>INTERVIEW QUESTIONS</div><h2>Explain it under pressure</h2><div className="interview-list">{lesson.interviewQuestions.map((item, index) => <details key={item.question}><summary><span>Q{index + 1}</span>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>
    {lesson.lab && <section id="lab" className="lesson-section lab-callout"><div className="lab-callout-icon"><FlaskConical aria-hidden="true" /></div><div><div className="lesson-section-label"><span>13</span>PRACTICE LAB</div><h2>{lesson.lab.title}</h2><p>{lesson.lab.description}</p><ul>{lesson.lab.tasks.map((item) => <li key={item}>{item}</li>)}</ul>{lesson.lab.href && <Link href={lesson.lab.href}>Open lab in practice mode <ArrowRight aria-hidden="true" /></Link>}</div></section>}
    <section id="resources" className="lesson-section"><div className="lesson-section-label"><span>14</span>RESOURCES</div><h2>Download and continue</h2><div className="lesson-resource-grid"><div>{lesson.downloads?.map((item) => <DownloadCard key={item.href} {...item} />)}</div>{lesson.video && <VideoPlaceholder {...lesson.video} />}</div></section>
    <nav className="lesson-pagination" aria-label="Adjacent lessons">{lesson.previous ? <Link href={lesson.previous.href}><ArrowLeft aria-hidden="true" /><span><small>PREVIOUS</small><strong>{lesson.previous.label}</strong><em>{lesson.previous.meta}</em></span></Link> : <span />}{lesson.next && <Link href={lesson.next.href}><span><small>NEXT</small><strong>{lesson.next.label}</strong><em>{lesson.next.meta}</em></span><ArrowRight aria-hidden="true" /></Link>}</nav>
  </article><aside className="docs-toc"><OnThisPage toc={toc} /></aside></div></>;
}
