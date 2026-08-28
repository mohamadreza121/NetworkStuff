import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpenCheck, CheckCircle2, ChevronRight, Clock3, FlaskConical } from "lucide-react";

import { LinuxCurriculumNavigation } from "@/components/linux-learning-navigation";
import { getLinuxModuleLessons, linuxLessonPath, linuxModulePath } from "@/content/linux/network-engineering";
import { linuxModules } from "@/content/linux/network-engineering/modules";
import type { LinuxModule } from "@/content/linux/network-engineering/types";

export function LinuxLearningModulePage({ moduleEntry }: { moduleEntry: LinuxModule }) {
  const currentPath = linuxModulePath(moduleEntry.id);
  const lessons = getLinuxModuleLessons(moduleEntry.id);
  const capabilityIds = [...new Set(lessons.flatMap((lesson) => lesson.capabilityIds))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const previousModule = linuxModules[moduleEntry.order - 2];
  const nextModule = linuxModules[moduleEntry.order];
  return (
    <main className="ccna-module-page linux-module-page">
      <div className="ccna-module-layout">
        <aside className="ccna-module-sidebar"><LinuxCurriculumNavigation currentPath={currentPath} /></aside>
        <div className="ccna-module-main">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/learn">Learn</Link><ChevronRight aria-hidden="true" />
            <Link href="/learn/linux">Linux</Link><ChevronRight aria-hidden="true" /><span>{moduleEntry.title}</span>
          </nav>
          <header className="ccna-module-header">
            <span>MODULE {String(moduleEntry.order).padStart(2, "0")} / LINUX NETWORK OPERATIONS 2026</span>
            <h1>{moduleEntry.title}</h1>
            <p>{moduleEntry.description}</p>
            <div><span>{lessons.length} lessons</span><span>{capabilityIds.length} capabilities</span><span>{lessons.reduce((sum, lesson) => sum + lesson.estimatedMinutes, 0)} minutes</span></div>
          </header>
          <section className="ccna-module-outcome">
            <CheckCircle2 aria-hidden="true" /><div><span>MODULE OUTCOME</span><p>{moduleEntry.outcome}</p></div>
          </section>
          <section className="ccna-module-objectives" aria-labelledby="module-capabilities-title">
            <div><span>OPERATIONS COVERAGE</span><h2 id="module-capabilities-title">Capabilities in this module</h2></div>
            <div>{capabilityIds.map((id) => <span key={id}>{id}</span>)}</div>
          </section>
          <section className="ccna-lesson-rows" aria-labelledby="module-lessons-title">
            <div className="ccna-module-list-heading"><span>LESSON</span><h2 id="module-lessons-title">Work through the operating sequence.</h2><p>Each lesson includes a model, commands, verification, failure shapes, safety notes, and practice.</p></div>
            {lessons.map((lesson) => (
              <Link href={linuxLessonPath(lesson)} key={lesson.id}>
                <span className="ccna-lesson-index">{String(lesson.order).padStart(2, "0")}</span>
                <span className="ccna-lesson-row-copy"><small>{lesson.capabilityIds.join(" · ")}</small><strong>{lesson.title}</strong><em>{lesson.summary}</em></span>
                <span className="ccna-lesson-row-meta"><small><Clock3 aria-hidden="true" />{lesson.estimatedMinutes} min</small><b data-level={lesson.practice.level}><FlaskConical aria-hidden="true" />{lesson.practice.level}</b></span>
                <ArrowRight aria-hidden="true" />
              </Link>
            ))}
          </section>
          <section className="ccna-module-sources">
            <BookOpenCheck aria-hidden="true" />
            <div><span>PRIMARY SOURCE MAP</span><h2>Original teaching, manual-aligned behavior.</h2><p>{moduleEntry.sourceLinks.map((source) => source.label).join(" · ")}</p><small>Commands are explained from intent through evidence. Vendor and project documentation anchors behavior; NetPath prose, diagrams, faults, checks, and labs are original.</small></div>
          </section>
          <nav className="ccna-module-pagination" aria-label="Adjacent Linux modules">
            {previousModule ? <Link href={linuxModulePath(previousModule.id)}><ArrowLeft aria-hidden="true" /><span><small>PREVIOUS MODULE</small><strong>{previousModule.title}</strong></span></Link> : <Link href="/learn/linux"><ArrowLeft aria-hidden="true" /><span><small>PATH HUB</small><strong>Linux network operations</strong></span></Link>}
            {nextModule && <Link href={linuxModulePath(nextModule.id)}><span><small>NEXT MODULE</small><strong>{nextModule.title}</strong></span><ArrowRight aria-hidden="true" /></Link>}
          </nav>
        </div>
      </div>
    </main>
  );
}
